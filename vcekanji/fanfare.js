/* fanfare.js — 拍子木 and 太鼓, made in the browser, for the moments worth marking.
   ---------------------------------------------------------------------------
   Andrew wants kabuki at the points where a student has achieved something:
   the clapping sticks, the drum, and the 掛け声, the "Yooo!".

   TWO OF THE THREE ARE IN HERE AND NEITHER IS A FILE. 拍子木 is two blocks of
   hardwood struck together and 太鼓 is a drumhead, and both are simple enough
   in the spectrum that the browser can make them: a shaped burst of noise for
   the strike and a few decaying partials for the body. That means no
   download, no licence to track, nothing to upload, nothing to cache, and
   nothing that can be the wrong thing in somebody's repo. It is the same
   trick the ルーレット drum in メガセンテンス already uses for its clicks.

   THE THIRD ONE CANNOT BE MADE THIS WAY. A 掛け声 is a human voice with a
   century of convention in it. It needs a recording, and that recording has
   to be one we are allowed to use — not one lifted out of a video. See
   collab/AUDIO_SOURCES.md for what to upload and where it can honestly come
   from. Until a file exists, kakegoe() does nothing at all and the other two
   carry the moment.

       FANFARE.ki()            one clack of the sticks
       FANFARE.kiRun()         the accelerating run that ends a scene
       FANFARE.taiko()         one beat of the big drum
       FANFARE.kakegoe()       the call, if a recording has been given
       FANFARE.wake()          build the audio engine inside a tap
       FANFARE.mute(true)      silence, for a student with it switched off

   AUTOPLAY. A browser will not make a sound until the person has touched the
   page, so nothing here builds an audio context until wake() is called from
   inside a real tap or key press. An app calls wake() from its sound toggle
   and from its first tap, as メガセンテンス does.                           */
"use strict";
window.FANFARE = (function(){
  var schema_version = 1;
  var ctx = null, off = false, noise = null, voice = null, voiceSrc = null;
  /* true while render() has swapped in an offline context. An offline one
     is "suspended" until it is told to render, and asking it to resume
     throws — which is how the checks found this line. */
  var offline = false;

  /* ---- the room ----
     Andrew: deeper, and with a longer echo. The echo is a convolver fed a
     made-up impulse — a second and a half of noise decaying to nothing,
     with the top rolled off so the tail is dark rather than hissy. It is
     the inside of a wooden hall, which is where these sounds live.

     Each strike decides how much of itself to send into the room: the
     sticks a little, because a clack with a long tail stops being a clack,
     the drum a lot, because that is most of what a big drum is. */
  var wet = null, dry = null;
  function room(c){
    var secs = 1.8, n = Math.floor(c.sampleRate * secs);
    var ir = c.createBuffer(2, n, c.sampleRate);
    for (var ch = 0; ch < 2; ch++){
      var d = ir.getChannelData(ch), last = 0;
      for (var i = 0; i < n; i++){
        var t = i / n;
        /* a one-pole lowpass on the noise, so the tail darkens as it goes */
        last = last * 0.72 + (Math.random() * 2 - 1) * 0.28;
        d[i] = last * Math.pow(1 - t, 2.6);
      }
    }
    var conv = c.createConvolver();
    conv.buffer = ir;
    wet = c.createGain();
    wet.gain.value = 1;
    wet.connect(conv);
    conv.connect(c.destination);
    dry = c.destination;
  }
  /* half a second of flat noise, shaped at each strike rather than baked */
  function fillNoise(c){
    var n = Math.floor(c.sampleRate * 0.5);
    var b = c.createBuffer(1, n, c.sampleRate);
    var d = b.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  function wake(){
    if (off) return null;
    if (ctx){
      if (!offline && ctx.state === "suspended" && ctx.resume) ctx.resume();
      return ctx;
    }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    noise = fillNoise(ctx);
    room(ctx);
    return ctx;
  }
  /* ---- a seam, for the checks and for making samples to listen to ----
     Renders what these functions produce into a buffer instead of into the
     speakers, so a test can measure a clack rather than take its word for
     it, and so a sample can be exported for a teacher to hear before it
     goes anywhere near a classroom. */
  function render(secs, fn, rate){
    var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!OAC) return Promise.resolve(null);
    var keepCtx = ctx, keepNoise = noise, keepOff = off;
    rate = rate || 44100;
    off = false; offline = true;
    ctx = new OAC(2, Math.ceil((secs || 2) * rate), rate);
    noise = fillNoise(ctx);
    room(ctx);
    fn();
    return ctx.startRendering().then(function (buf){
      ctx = keepCtx; noise = keepNoise; off = keepOff; offline = false;
      return buf;
    });
  }
  /* every voice goes to the speakers and, by however much it asks for,
     into the room */
  function send(node, send){
    node.connect(dry);
    if (wet && send > 0){
      var g = ctx.createGain();
      g.gain.value = send;
      node.connect(g);
      g.connect(wet);
    }
  }
  function burst(at, dur, hz, q, gain, type, echo){
    var src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    var f = ctx.createBiquadFilter();
    f.type = type || "bandpass";
    f.frequency.value = hz;
    f.Q.value = q;
    var g = ctx.createGain();
    g.gain.setValueAtTime(gain, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(f); f.connect(g);
    send(g, echo || 0);
    src.start(at); src.stop(at + dur + 0.02);
  }
  function partial(at, hz, to, dur, gain, type, echo){
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(hz, at);
    if (to && to !== hz) o.frequency.exponentialRampToValueAtTime(to, at + dur * 0.45);
    g.gain.setValueAtTime(gain, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g);
    send(g, echo || 0);
    o.start(at); o.stop(at + dur + 0.02);
  }

  /* ---- 拍子木 ----
     Two pieces of hard wood, struck square. The crack is a few milliseconds
     of noise with the bottom taken off; the wood itself rings for about a
     tenth of a second in two bands. Every strike is a little different in
     pitch and level, because a dozen identical clacks in a row stop being
     wood and start being a buzzer. */
  function ki(when, loud){
    if (!wake()) return false;
    var at = (when || 0) + ctx.currentTime, v = loud === undefined ? 1 : loud;
    var j = 1 + (Math.random() * 0.08 - 0.04);
    /* kept under full scale on purpose: the strike and the partials land
       on the same sample and a clack that clips is a crackle. The pitches
       sit lower than the first build: Andrew wanted deeper, and heavier
       blocks ring lower. */
    burst(at, 0.012, 2700 * j, 0.7, 0.36 * v, "highpass", 0.18);
    burst(at, 0.035, 1900 * j, 2.2, 0.28 * v, "bandpass", 0.3);
    /* the wood keeps ringing after the crack. Cut that short and the
       sticks turn into a tick on a watch. */
    partial(at, 980 * j, 0, 0.17, 0.32 * v, "sine", 0.5);
    partial(at, 2150 * j, 0, 0.09, 0.13 * v, "sine", 0.35);
    partial(at, 620 * j, 0, 0.14, 0.14 * v, "sine", 0.5);
    return true;
  }
  /* The run that ends a scene: the strikes close up, then one more after a
     breath. A student hears it as "that is the end of that". */
  function kiRun(n){
    if (!wake()) return false;
    var count = n || 9, t = 0, gap = 0.30;
    for (var i = 0; i < count; i++){
      ki(t, 0.55 + 0.4 * (i / count));
      t += gap;
      gap = Math.max(0.075, gap * 0.78);
    }
    ki(t + 0.22, 1);
    return true;
  }
  /* ---- 太鼓 ----
     A big drumhead: the stick on the skin, then the body dropping in pitch
     as the head relaxes, then the shell ringing underneath. */
  function taiko(when, loud){
    if (!wake()) return false;
    var at = (when || 0) + ctx.currentTime, v = loud === undefined ? 1 : loud;
    /* deeper than the first build, and most of it goes into the room: a
       big drum in a hall is mostly the hall. */
    burst(at, 0.05, 700, 0.8, 0.26 * v, "lowpass", 0.5);
    partial(at, 96, 42, 1.15, 0.60 * v, "sine", 0.9);
    partial(at + 0.004, 150, 70, 0.5, 0.20 * v, "sine", 0.8);
    partial(at + 0.008, 250, 140, 0.2, 0.07 * v, "triangle", 0.6);
    /* the sub: felt more than heard, and the reason it reads as big */
    partial(at, 58, 36, 1.4, 0.30 * v, "sine", 0.7);
    return true;
  }
  /* ---- 掛け声 ----
     A recording or nothing. An app points this at a file it has been given;
     until then every call is a no-op, which is why the other two carry the
     moment rather than a silence where a voice should be. */
  function useVoice(url){ voiceSrc = url || null; voice = null; }
  function kakegoe(){
    if (off || !voiceSrc) return false;
    try {
      if (!voice){ voice = new Audio(voiceSrc); voice.preload = "auto"; }
      voice.currentTime = 0;
      var p = voice.play();
      if (p && p.catch) p.catch(function(){});
      return true;
    } catch (e){ return false; }
  }
  /* 一本締め, the one that ends a gathering: the call, then the strikes. */
  function shime(){
    var said = kakegoe();
    ki(said ? 0.75 : 0, 1);
    ki(said ? 0.90 : 0.15, 1);
    ki(said ? 1.05 : 0.30, 1);
    return true;
  }
  function mute(yes){
    off = !!yes;
    if (offline || !ctx) return;
    if (off && ctx.suspend) ctx.suspend();
    if (!off && ctx.resume) ctx.resume();
  }
  return { schema_version: schema_version, wake: wake, ki: ki, kiRun: kiRun,
           render: render,
           taiko: taiko, kakegoe: kakegoe, useVoice: useVoice, shime: shime,
           mute: mute, muted: function(){ return off; },
           ready: function(){ return !!ctx; } };
})();
