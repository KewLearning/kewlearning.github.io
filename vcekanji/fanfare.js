/* fanfare.js — 拍子木 and 太鼓, for the moments worth marking.
   ---------------------------------------------------------------------------
   Andrew wants kabuki at the points where a student has achieved something:
   the clapping sticks, the drum, and the 掛け声, the "Yooo!".

   TWO OF THE THREE ARE REAL RECORDINGS NOW. They were synthesised first,
   because a made-up sound needs no licence and no file; Andrew's note on
   that build was that they wanted to be deeper with a longer echo, which is
   the note you get when an approximation is close enough to be judged. The
   recordings are from 効果音ラボ (soundeffect-lab.info), who allow any use
   including commercial, ask for no credit, and name "embedding a sound in
   an app as an operation sound" as the thing that is NOT redistribution.
   What they forbid is hot-linking and handing the files out as material, so
   the app serves its own copies and is not a soundboard. Andrew approved the
   swap on 2026-11-16; see collab/AUDIO_SOURCES.md for the licence in full.

       audio/ki.mp3      拍子木, one strike        (hyoushigi1)
       audio/kirun.mp3   拍子木, the scene-end run (hyoushigi3)
       audio/taiko.mp3   和太鼓, one beat, 生録音   (drum-japanese1)

   Each is trimmed, made mono and peak-normalised to -3 dBFS so no one of
   them is louder than another, and each still plays through the convolver
   hall below, lightly, because a recording carries its own room and two
   rooms is mud.

   THE SYNTHESISED ONES ARE STILL HERE, as the fallback. A file can fail: a
   school filter, a cache miss, a browser that will not decode mp3, a page
   opened before the download finished. In every one of those cases the app
   makes the sound instead of going silent, which is the behaviour an app
   with sound in it has to have.

   THE THIRD ONE IS STILL MISSING. A 掛け声 is a human voice with a century
   of convention in it. Searched again on 2026-11-16: Wikimedia Commons does
   not have one, 効果音ラボ's 716 voice files are announcements and system
   lines, and the two libraries that might have one refuse traffic from a
   data centre. Until a recording exists, kakegoe() does nothing at all and
   the other two carry the moment.

       FANFARE.ki()            one clack of the sticks
       FANFARE.kiRun()         the accelerating run that ends a scene
       FANFARE.taiko()         one beat of the big drum
       FANFARE.kakegoe()       the call, if a recording has been given
       FANFARE.wake()          build the audio engine inside a tap
       FANFARE.mute(true)      silence, for a student with it switched off
       FANFARE.ready()         true once the engine exists
       FANFARE.loaded()        a promise: the recordings are decoded or gone
       FANFARE.using()         "recording" or "synth", per sound, for checks

   AUTOPLAY. A browser will not make a sound until the person has touched the
   page, so nothing here builds an audio context until wake() is called from
   inside a real tap or key press. An app calls wake() from its sound toggle
   and from its first tap, as メガセンテンス does. The recordings start
   downloading at that same moment, not before: a student who never turns the
   sound on never fetches them.                                            */
"use strict";
window.FANFARE = (function(){
  var schema_version = 2;
  var ctx = null, off = false, noise = null, voice = null, voiceSrc = null;

  /* ---- the recordings ----
     Raw bytes are kept, not just the decoded buffer, because render() does
     its work in a second, offline context and a buffer belongs to the one
     that decoded it. Bytes decode into either. */
  var base = "audio/";
  var FILES = { ki:"ki.mp3", kiRun:"kirun.mp3", taiko:"taiko.mp3" };
  var bytes = {};        // name -> ArrayBuffer, once fetched
  var buf = {};          // name -> AudioBuffer, for the live context
  var gone = {};         // name -> true once a fetch or a decode has failed
  var loading = null;    // the promise of the whole set

  function useSamples(dir){
    base = dir === undefined || dir === null ? "audio/" : String(dir);
    bytes = {}; buf = {}; gone = {}; loading = null;
  }
  /* Fetch and decode every recording. Any one that does not arrive is
     marked gone, and that sound falls back to the synthesised one for the
     rest of the session rather than being retried on every strike. */
  function loadAll(c){
    if (loading) return loading;
    if (!c || !window.fetch){ loading = Promise.resolve(); return loading; }
    var names = Object.keys(FILES);
    loading = Promise.all(names.map(function(name){
      if (buf[name] || gone[name]) return null;
      return fetch(base + FILES[name])
        .then(function(r){ if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
        .then(function(ab){
          bytes[name] = ab;
          /* decodeAudioData consumes the buffer it is handed, so it gets a
             copy and the original stays whole for the offline render */
          return decode(c, ab.slice(0)).then(function(b){ buf[name] = b; });
        })
        .catch(function(){ gone[name] = true; });
    })).then(function(){});
    return loading;
  }
  /* decodeAudioData is callback-style on older Safari and promise-style
     everywhere else. This wants a promise either way. */
  function decode(c, ab){
    return new Promise(function(ok, no){
      var p;
      try { p = c.decodeAudioData(ab, ok, no); } catch (e){ return no(e); }
      if (p && p.then) p.then(ok, no);
    });
  }
  /* Play a recording, if it is here. The send into the hall is small: the
     recordings were made in a room already, and two rooms is mud. */
  function sample(name, when, loud, echo){
    var b = buf[name];
    if (!b) return false;
    var src = ctx.createBufferSource();
    src.buffer = b;
    var g = ctx.createGain();
    g.gain.value = loud === undefined ? 1 : loud;
    src.connect(g);
    send(g, echo);
    src.start((when || 0) + ctx.currentTime);
    return true;
  }
  /* what each sound is actually doing, for the checks and for a bug report */
  function using(){
    var out = {};
    Object.keys(FILES).forEach(function(n){ out[n] = buf[n] ? "recording" : "synth"; });
    return out;
  }
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
    loadAll(ctx);
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
    var keepCtx = ctx, keepNoise = noise, keepOff = off, keepBuf = buf;
    rate = rate || 44100;
    off = false; offline = true;
    ctx = new OAC(2, Math.ceil((secs || 2) * rate), rate);
    noise = fillNoise(ctx);
    room(ctx);
    /* An AudioBuffer belongs to the context that decoded it, so the offline
       run decodes its own from the bytes already fetched. Anything not
       fetched renders as the synthesised sound, which is the right answer:
       it is what a student without the file would hear. */
    var c = ctx;
    buf = {};
    return Promise.all(Object.keys(bytes).map(function (name){
      return decode(c, bytes[name].slice(0))
        .then(function (b){ buf[name] = b; })
        .catch(function (){});
    })).then(function (){
      fn();
      return c.startRendering();
    }).then(function (out){
      ctx = keepCtx; noise = keepNoise; off = keepOff; buf = keepBuf;
      offline = false;
      return out;
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
    if (sample("ki", when, loud, 0.12)) return true;
    return synthKi(when, loud);
  }
  function synthKi(when, loud){
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
    /* The recording is a real run, so it is one sound rather than nine.
       The synthesised fallback builds the shape by hand: strikes closing
       up, then one more after a breath. */
    if (sample("kiRun", 0, 1, 0.12)) return true;
    var count = n || 9, t = 0, gap = 0.30;
    for (var i = 0; i < count; i++){
      synthKi(t, 0.55 + 0.4 * (i / count));
      t += gap;
      gap = Math.max(0.075, gap * 0.78);
    }
    synthKi(t + 0.22, 1);
    return true;
  }
  /* ---- 太鼓 ----
     A big drumhead: the stick on the skin, then the body dropping in pitch
     as the head relaxes, then the shell ringing underneath. */
  function taiko(when, loud){
    if (!wake()) return false;
    /* More of the drum goes into the hall than the sticks do, even as a
       recording: a big drum in a wooden room is mostly the room. */
    if (sample("taiko", when, loud, 0.25)) return true;
    return synthTaiko(when, loud);
  }
  function synthTaiko(when, loud){
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
           render: render, using: using, useSamples: useSamples,
           loaded: function(){ return loadAll(ctx); },
           taiko: taiko, kakegoe: kakegoe, useVoice: useVoice, shime: shime,
           mute: mute, muted: function(){ return off; },
           ready: function(){ return !!ctx; } };
})();
