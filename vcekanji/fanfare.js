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
    ctx = new OAC(1, Math.ceil((secs || 2) * rate), rate);
    noise = fillNoise(ctx);
    fn();
    return ctx.startRendering().then(function (buf){
      ctx = keepCtx; noise = keepNoise; off = keepOff; offline = false;
      return buf;
    });
  }
  function burst(at, dur, hz, q, gain, type){
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
    src.connect(f); f.connect(g); g.connect(ctx.destination);
    src.start(at); src.stop(at + dur + 0.02);
  }
  function partial(at, hz, to, dur, gain, type){
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(hz, at);
    if (to && to !== hz) o.frequency.exponentialRampToValueAtTime(to, at + dur * 0.45);
    g.gain.setValueAtTime(gain, at);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g); g.connect(ctx.destination);
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
    /* kept under full scale on purpose: the strike and the three partials
       land on the same sample and a clack that clips is a crackle. */
    burst(at, 0.012, 3200 * j, 0.7, 0.42 * v, "highpass");
    burst(at, 0.035, 2400 * j, 2.2, 0.30 * v);
    /* the wood keeps ringing for about a tenth of a second after the
       crack. Cut that short and the sticks turn into a tick on a watch. */
    partial(at, 1180 * j, 0, 0.13, 0.32 * v);
    partial(at, 2640 * j, 0, 0.075, 0.15 * v);
    partial(at, 760 * j, 0, 0.10, 0.10 * v);
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
    burst(at, 0.045, 900, 0.8, 0.30 * v, "lowpass");
    partial(at, 128, 58, 0.78, 0.62 * v);
    partial(at + 0.005, 196, 92, 0.34, 0.20 * v);
    partial(at + 0.01, 320, 180, 0.16, 0.07 * v, "triangle");
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
