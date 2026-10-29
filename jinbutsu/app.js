/* app.js — れきしの人, Year 9 Unit 12.

   Six rungs over six articles. Each rung is one of the things the paper
   test actually asks for, in the order a student can get at them: the
   words, the article, the questions, the translation, the re-read
   against their own record, and the six side by side.

   THE SCORE ONLY GOES DOWN. It starts at what a rung is worth and every
   support spends from it. Nothing is locked: a student who needs the
   meaning of every word can have it and still finish. The top score is
   only reachable unaided, which is the incentive for the ones who want
   one, and the student who needs help is never stopped.

   NOTHING IS RECORDED AND NOTHING IS SENT. The score lives in this
   browser. Save writes a line of text they can screenshot. */
(function(){
  "use strict";
  var K = window.KIJI, CLIPS = (window.KIJI_AUDIO || {}).clips || {};
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }
  function each(scope, sel, fn){
    Array.prototype.forEach.call((scope || document).querySelectorAll(sel), fn);
  }
  function shuffle(a){
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random()*(i+1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  var RUN = /([一-鿿々]+)\[([ぁ-ゟー]+)\]/g;
  function plain(t){ return String(t||"").replace(RUN,"$1").replace(/[《》]/g,""); }
  function kana(t){ return String(t||"").replace(RUN,"$2").replace(/[《》]/g,""); }
  /* ---- は as わ, へ as え ----
     The topic particle は is said わ, and the recorded voice does not always
     work that out: in the oral exam app 高校生は came back with a HA in the
     middle of it. Which は is the particle is not guessed. Andrew spaces his
     Japanese at the phrase boundaries, so a は that ENDS one of those phrases
     is the particle, and ではなく is the one shape where it sits inside a
     phrase instead. That is the whole rule, and it matters that it is this
     narrow: はこ and はしります begin with a は that has to stay one.

     Only the sound changes. は is still は everywhere on the screen. */
  var CHUNKS = /[^\s\u3000、。！？!?「」『』《》]+/g;
  function particles(t){
    return String(t).replace(CHUNKS, function(c){
      c = c.replace(/では(?=[なあ])/g, "でわ");
      if (/は$/.test(c)) return c.slice(0, -1) + "わ";
      if (/へ$/.test(c)) return c.slice(0, -1) + "え";
      return c;
    });
  }
  function speakable(t){ return particles(plain(t)).replace(/[\s　]+/g,""); }

  /* ---- furigana the worksheets left off ----
     A worksheet rubies a kanji once and leaves it bare after that. On
     paper that is fine; on a screen, for a student who needs the ruby,
     it is the difference between reading the line and stopping at it.
     So the page remembers every reading an article gives and puts it
     back on every later occurrence, and falls back to the unit's table
     for the two the worksheets never ruby at all. */
  function rubify(text, learnt){
    var FB = K.readings || {};
    var out = "", i = 0;
    while (i < text.length){
      var m = /^([一-鿿々]+)\[([ぁ-ゟー]+)\]/.exec(text.slice(i));
      if (m){
        for (var c = 0; c < m[1].length; c++) learnt[m[1][c]] = true;
        out += "<ruby>" + esc(m[1]) + "<rt>" + esc(m[2]) + "</rt></ruby>";
        i += m[0].length; continue;
      }
      var ch = text[i];
      if (/[一-鿿々]/.test(ch)){
        /* 何ですか is なん and 何を is なに, which is a rule and not a
           lookup, so it is read off what follows. */
        var r = FB[ch];
        if (ch === "何") r = /^[でだ]/.test(text.slice(i+1)) ? "なん" : "なに";
        out += r ? "<ruby>" + esc(ch) + "<rt>" + esc(r) + "</rt></ruby>" : esc(ch);
        i++; continue;
      }
      out += esc(ch); i++;
    }
    return out;
  }
  function ruby(t){ return rubify(String(t||"").replace(/[《》]/g,""), {}); }

  /* ---- sound ---- */
  var SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYA"
    + "AESsAAACABAAZGF0YQAAAAA=";
  var el0 = null, woken = false;
  function sound(){ if (!el0){ el0 = new Audio(); el0.preload = "auto"; } return el0; }
  ["pointerdown","touchstart","keydown"].forEach(function(ev){
    document.addEventListener(ev, function(){
      if (woken) return; woken = true;
      try { var a = sound(); a.src = SILENCE; a.play().catch(function(){}); } catch(e){}
    }, { once:true, passive:true });
  });
  function say(text){
    var f = CLIPS[speakable(text)];
    if (!f) return false;
    var a = sound();
    try { a.pause(); a.currentTime = 0; } catch(e){}
    a.src = "audio/" + f;
    try { a.playbackRate = S.rate; } catch(e){}
    a.play().catch(function(){});
    return true;
  }
  function hasvoice(t){ return !!CLIPS[speakable(t)]; }
  function saybtn(t){
    if (!hasvoice(t)) return "";
    return '<button class="tool" style="min-height:30px;padding:0 8px"'
      + ' data-say="' + esc(speakable(t)) + '" aria-label="Listen">▶</button>';
  }
  document.body.classList.toggle("hasvoice", !!Object.keys(CLIPS).length);

  /* ---- what the page remembers ---- */
  var KEY = "jinbutsu-v1";
  var S = { furi:true, en:true, rate:1, sfx:true,
            pts:0, spent:0, arcade:0, hard:false,
            done:{}, best:{}, wrote:{}, howto:{} };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){}
  var saveT = null;
  function write(){
    clearTimeout(saveT); saveT = null;
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){}
  }
  function save(){ clearTimeout(saveT); saveT = setTimeout(write, 250); }
  /* The write waits 250ms so that typing does not hit localStorage on
     every keystroke, which means a student who closes the tab the moment
     the score moves loses the point they just earned. So the wait is cut
     short on the way out. pagehide fires on a real navigation and
     visibilitychange is the one an iPad sends when the app is swiped
     away, so both are listened for. */
  window.addEventListener("pagehide", write);
  document.addEventListener("visibilitychange", function(){
    if (document.visibilityState === "hidden") write();
  });
  function paintToggles(){
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("noen", !S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
    $("rateLabel").textContent = "×" + S.rate;
    $("sfxBtn").classList.toggle("off", !S.sfx);
    $("rateBtn").classList.toggle("off", S.rate !== 1);
    $("ptsn").textContent = S.pts;
    $("pts").title = S.spent
      ? S.pts + " points. " + S.spent + " spent on support."
      : S.pts + " points, nothing spent on support yet.";
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; save(); paintToggles(); };
  $("enBtn").onclick = function(){ S.en = !S.en; save(); paintToggles(); };
  $("sfxBtn").onclick = function(){
    S.sfx = !S.sfx; save(); paintToggles();
    if (S.sfx) ninja($("sfxBtn"));      /* so you can see what you turned on */
  };
  var RATES = [0.7, 1, 1.2];
  $("rateBtn").onclick = function(){
    S.rate = RATES[(RATES.indexOf(S.rate)+1) % RATES.length] || 1;
    save(); paintToggles();
    /* It used to say whichever unit word sat first in the list, which
       told a student the speed had changed but not what for. はなすスピード
       names the thing it is demonstrating, and it is the same line in
       ひと and the oral exam app. */
    var line = ((K.ui || [])[0] || {}).ja;
    if (line) say(line);
  };
  $("resetBtn").onclick = function(){
    if (!confirm("Clear your score, your records and anything typed on this device?")) return;
    S = { furi:true, en:true, rate:1, sfx:true,
          pts:0, spent:0, arcade:0, hard:false,
          done:{}, best:{}, wrote:{}, howto:{} };
    try { localStorage.removeItem(KEY); } catch(e){}
    draw();
  };
  /* Nothing is recorded anywhere, so the only way to show somebody is to
     take it with you. A line of text they can screenshot or paste. */
  $("saveBtn").onclick = function(){
    var best = Object.keys(S.best).map(function(k){
      return k + " " + (S.best[k]/1000).toFixed(1) + "s";
    }).join(", ");
    var rungs = 0, total = 0;
    STEPS.forEach(function(st){
      if (st.whole){ total++; if (S.done[st.id]) rungs++; }
      else K.people.forEach(function(p){
        total++; if (S.done[st.id + ":" + p.id]) rungs++;
      });
    });
    var line = "れきしの人 · " + S.pts + " points"
      + (S.spent ? " (" + S.spent + " spent on support)" : " with no support used")
      + " · " + rungs + " of " + total + " rungs done"
      + (best ? " · best reads: " + best : "")
      + " · " + new Date().toLocaleDateString("en-AU");
    var ta = document.createElement("textarea");
    ta.value = line;
    ta.style.cssText = "position:fixed;inset:auto 10px 10px 10px;z-index:90;"
      + "height:84px;font-size:15px;padding:9px;border:2px solid #16375e;border-radius:9px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch(e){}
    alert("Copied, and shown at the bottom of the screen so you can screenshot it:\n\n"
      + line + "\n\nNothing is sent anywhere. This is the only record there is.");
    setTimeout(function(){ ta.remove(); }, 20000);
  };

  /* ---- the ninja and the かさおばけ ----
     Andrew asked for these in the brief for this unit: "yokai and ninjas
     popping up". A right answer sends a ninja across the screen; a wrong
     one floats a かさおばけ up past it.

     They are drawn here rather than fetched, like everything else in this
     suite: two more files to download for two bits of fun is not a trade
     worth making on a school connection. Both are off in one press, and
     neither carries any information the marking has not already given,
     so a student who turns them off loses nothing but the joke.

     A device asking for less movement gets them faded in place rather
     than crossing the screen. It used to get nothing at all, which is
     how a feature Andrew asked for three times stayed invisible on the
     machine he was asking from. */
  var sfxLast = 0;
  function creature(kind, near, build){
    /* No reduced-motion check here any more: it returned before either
       creature was drawn, so a device with that setting on got the sound
       and nothing else. The stylesheet answers the setting instead, by
       fading them in place rather than flying them past. */
    var now = Date.now();
    if (now - sfxLast < 420) return;      /* no pile-ups on a fast run */
    sfxLast = now;
    var box = document.createElement("div");
    box.className = kind;
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top + r.height / 2 - 26 : innerHeight * 0.5) + "px";
    box.innerHTML = build();
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 1800);
  }
  function ninja(near){
    if (!S.sfx) return;
    SFX.whoosh();
    creature("ninj", near, function(){
      return '<svg viewBox="0 0 64 52" width="64" height="52">'
        /* the scarf, trailing behind the direction of travel */
        + '<path d="M30 16 q-12 -4 -24 2 q10 1 14 4 q-9 1 -13 5 q12 -1 21 -3 z"'
        + ' fill="#a83232" opacity=".92"/>'
        + '<path d="M28 18 q12 -3 19 6 q4 7 -3 11 q-9 5 -17 -1 q-6 -5 1 -16 z"'
        + ' fill="#16375e"/>'
        + '<path d="M34 34 q-6 7 -14 8 q6 -8 8 -12 z" fill="#16375e"/>'
        + '<path d="M44 22 q9 -2 14 3" stroke="#16375e" stroke-width="5"'
        + ' stroke-linecap="round" fill="none"/>'
        + '<circle cx="44" cy="17" r="10" fill="#1b2b40"/>'
        + '<path d="M38 15 h13 v4 h-13 z" fill="#f4efe6"/>'
        + '<circle cx="42" cy="17" r="1.7" fill="#16375e"/>'
        + '<circle cx="48" cy="17" r="1.7" fill="#16375e"/>'
        + '<path d="M2 24 h14 M6 31 h10" stroke="#16375e" stroke-width="2"'
        + ' stroke-linecap="round" opacity=".5"/>'
        + '</svg>';
    });
  }
  function yokai(near){
    if (!S.sfx) return;
    SFX.warble();
    creature("yoka", near, function(){
      /* かさおばけ: a paper umbrella with one eye, one tongue and one
         wooden leg. Drawn friendly rather than frightening, because a
         student who has just got something wrong does not need a fright
         as well. */
      return '<svg viewBox="0 0 56 72" width="56" height="72">'
        /* the canopy */
        + '<path d="M6 30 q22 -28 44 0 z" fill="#a83232"/>'
        + '<path d="M6 30 q22 -28 44 0" fill="none" stroke="#7a2525"'
        + ' stroke-width="1.5"/>'
        + '<path d="M28 4 v26 M14 20 v10 M42 20 v10" stroke="#f4efe6"'
        + ' stroke-width="1.6" opacity=".8"/>'
        /* the body of the umbrella, folded */
        + '<path d="M18 30 h20 l-3 16 h-14 z" fill="#c9a227"/>'
        /* one eye, which is the whole character of the thing */
        + '<circle cx="28" cy="37" r="6.5" fill="#f4efe6"/>'
        + '<circle cx="28" cy="37.5" r="3.2" fill="#15191f"/>'
        + '<circle cx="29.4" cy="36.2" r="1.1" fill="#fff"/>'
        /* the tongue, out and to one side, where the leg cannot hide it */
        + '<path d="M23 44 q5 11 10 1 q-5 4 -10 -1 z" fill="#d4647a"/>'
        /* one leg, one geta */
        + '<path d="M28 50 v10" stroke="#8a6d1f" stroke-width="4"'
        + ' stroke-linecap="round"/>'
        + '<rect x="18" y="60" width="20" height="5" rx="1.5" fill="#6b5417"/>'
        + '<rect x="21" y="65" width="3.5" height="5" fill="#6b5417"/>'
        + '<rect x="32" y="65" width="3.5" height="5" fill="#6b5417"/>'
        + '</svg>';
    });
  }
  /* Two sounds, synthesised for the same reason the drawings are drawn.
     The whoosh is noise through a band-pass that sweeps up and falls
     away, which is what a thing passing your ear does to the spectrum.
     The warble is the yokai: two detuned triangles sliding down with a
     wobble on top, which is a cartoon ghost and not a horror film. */
  var SFX = (function(){
    var ctx = null, noise = null, hiss = null;
    function build(){
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      var n = Math.floor(ctx.sampleRate * 0.4);
      noise = ctx.createBuffer(1, n, ctx.sampleRate);
      var d = noise.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      /* The clack's buffer has a fade baked in so it can be a strike.
         The whoosh needs the opposite: flat noise it can shape itself. */
      var hn = Math.floor(ctx.sampleRate * 0.5);
      hiss = ctx.createBuffer(1, hn, ctx.sampleRate);
      var hd = hiss.getChannelData(0);
      for (var j = 0; j < hn; j++) hd[j] = Math.random() * 2 - 1;
      return ctx;
    }
    /* ---- the clack ----
       One notch going past a pawl. It was a single band of noise at
       1750Hz, which is a hiss, not a click, and every one of them was
       identical, which is a machine and not a wheel.

       A real one is two things at once: the strike, which is a very short
       burst of noise with the low end taken off, and the body, which is
       the rim ringing for a few hundredths of a second after it. Both are
       needed. The strike alone is a tick on a watch; the body alone is a
       marimba.

       Every click is a little different. The pitch moves by up to a tone
       either way and the level by a fifth, because thirty identical clicks
       in a row stop sounding like wood and start sounding like a buzzer. */
    function clack(at, loud){
      var c = ctx; if (!c) return;
      /* Andrew could not hear these twice over. The first cause was the
         rate, and this is the other half: a 16ms click at 2600Hz through
         a laptop speaker at a third of full scale is not much. Half of
         full scale, and a clack decays long before the next one is due,
         so nothing stacks. */
      var vol = Math.max(0.08, Math.min(0.5, loud));
      var jit = 0.88 + Math.random() * 0.26;

      var src = c.createBufferSource(); src.buffer = noise;
      var hp = c.createBiquadFilter();
      hp.type = "bandpass"; hp.frequency.value = 2600 * jit; hp.Q.value = 2.2;
      var g1 = c.createGain();
      g1.gain.setValueAtTime(0.0001, at);
      g1.gain.exponentialRampToValueAtTime(vol, at + 0.001);
      g1.gain.exponentialRampToValueAtTime(0.0001, at + 0.016);
      src.connect(hp); hp.connect(g1); g1.connect(c.destination);
      src.start(at); src.stop(at + 0.02);

      var o = c.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(1150 * jit, at);
      o.frequency.exponentialRampToValueAtTime(820 * jit, at + 0.03);
      var g2 = c.createGain();
      g2.gain.setValueAtTime(0.0001, at);
      g2.gain.exponentialRampToValueAtTime(vol * 0.7, at + 0.002);
      g2.gain.exponentialRampToValueAtTime(0.0001, at + 0.034);
      o.connect(g2); g2.connect(c.destination);
      o.start(at); o.stop(at + 0.04);
    }
    /* ---- the ratchet ----
       The first attempt counted the notches a frame had crossed and
       booked that many clicks, each batch starting at "now" on the audio
       clock. Every frame therefore started a new batch on top of the one
       still playing, and at speed the batches overlapped into a mush that
       did not change as the drum slowed. Which is the whole point of the
       sound: you should hear it slowing before you see it.

       So there is one cursor on the audio clock and the clicks go on it
       in order, never on top of each other. The spacing is the time it
       actually takes a notch to pass the window, H over the speed, which
       is why the rate falls away exactly as the drum does: at 6000 a
       second that is a click every eleven milliseconds, at 600 a second
       one every hundred, and at walking pace they come one at a time.

       The floor is there because a notch every five milliseconds is a
       buzz rather than a ratchet, and the ceiling because a drum that
       has all but stopped should fall silent rather than tick once more
       a second later. */
    /* ---- how fast the clicks come ----
       It used to be one click per notch, floored at 62 a second. Two
       things were wrong with that. 62 a second is above the rate at which
       an ear stops hearing separate clicks and starts hearing a pitch, so
       the top of every spin was a buzz. And because the floor was a hard
       maximum, the rate sat ON it for the first two thirds of the spin and
       only began to change near the end: the drum visibly slowed for
       seconds while the sound did not move.

       So the floor is added rather than imposed. The gap is always the
       time a notch takes to cross the window PLUS a fixed minimum, which
       means the rate changes the whole way down and never passes about 20
       a second. From a middling throw it now runs 18, 16, 14, 12, 10, 8,
       6, 3 clicks a second: you hear it slowing from the first half
       second, which is the part Andrew asked for and the part that was
       missing. */
    var FLOOR = 0.03, CEIL = 0.55, NOTCH = 128, cursor = 0;
    function ratchet(speed, notch){
      if (!S.sfx || !(speed > 0)) return;
      var gap = FLOOR + (notch || NOTCH) / speed;
      if (gap > CEIL) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime;
        if (cursor < t) cursor = t + 0.004;
        /* quieter when it is flying, fuller as it comes to rest: a wheel
           is loudest at the end, which is where the ear is anyway */
        var loud = 0.5 - Math.min(0.22, (speed || 0) / 34000);
        /* only ever a frame or two ahead, so a drum that stops does not
           leave a queue of clicks still to play */
        for (var guard = 0; cursor < t + 0.05 && guard < 6; guard++){
          clack(cursor, loud);
          cursor += gap;
        }
      } catch (e){}
    }
    /* the one at the end, when it drops into the slot */
    function clunk(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = Math.max(c.currentTime + 0.004, cursor);
        clack(t, 0.4);
        cursor = t + 0.02;
      } catch (e){}
    }
    /* Built inside the press that starts the spin, not inside the frame
       loop that follows it: a browser is readier to start an audio engine
       during a gesture than a tenth of a second afterwards. */
    function wakeAudio(){
      try {
        var c = build();
        if (c && c.state === "suspended") c.resume();
        return c;
      } catch (e){ return null; }
    }
    /* ---- the whoosh and the warble ----
       Both synthesised rather than fetched: the page has to work on a
       tram, and two more files to download for two sound effects is not
       a trade worth making.

       The whoosh is noise through a bandpass whose centre frequency
       sweeps up and then falls away, which is what a thing moving past
       your ear actually does to the spectrum. Short, 220ms, because a
       ninja that takes a second is not a ninja.

       The warble is the かさおばけ, and it is below. */
    /* ---- the whoosh ----
       Third go, and this time it was measured rather than described.
       Rendered offline and compared with the drum's own click: the
       whoosh peaked at an RMS of 0.037 and was audible for a tenth of a
       second, against 0.067 for a single click. It was HALF the loudness
       of a click and barely longer than one, so through a laptop speaker
       it arrived as a soft tick, which is exactly what Andrew kept
       calling it. Nothing was wrong with the code; the sound was simply
       too small to be the thing it was named after.

       So: 550ms instead of 300, a wider sweep that starts lower and
       carries some low-mid rather than sitting up in the tick register,
       an attack over 90ms, and a quiet triangle gliding down underneath
       for the body that noise alone does not have. Measured again: RMS
       0.139, loudest sample 0.41, well short of clipping, audible for
       180ms with a tail past 400. Four times the old one and twice a
       click, which is the proportion a whoosh needs against a tick. */
    function whoosh(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime, D = 0.55;
        var src = c.createBufferSource(); src.buffer = hiss; src.loop = false;
        var hp = c.createBiquadFilter();
        hp.type = "highpass"; hp.frequency.value = 180;
        var bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.Q.value = 0.6;
        bp.frequency.setValueAtTime(300, t);
        bp.frequency.exponentialRampToValueAtTime(2400, t + 0.20);
        bp.frequency.exponentialRampToValueAtTime(420, t + D);
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.95, t + 0.09);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        src.connect(hp); hp.connect(bp); bp.connect(g); g.connect(c.destination);
        src.start(t); src.stop(t + D + 0.02);
        /* the body. Noise on its own is air; a thing going past has a
           pitch to it, and that is what makes this read as a movement
           rather than as static. */
        var o = c.createOscillator();
        o.type = "triangle";
        o.frequency.setValueAtTime(880, t);
        o.frequency.exponentialRampToValueAtTime(210, t + D * 0.9);
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 2000;
        var g2 = c.createGain();
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.11, t + 0.10);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + D);
        o.connect(lp); lp.connect(g2); g2.connect(c.destination);
        o.start(t); o.stop(t + D + 0.02);
      } catch (e){}
    }
    function warble(){
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime, D = 0.7;
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.17, t + 0.07);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 1400;
        var lfo = c.createOscillator(), lg = c.createGain();
        lfo.frequency.value = 6.5; lg.gain.value = 14;
        lfo.connect(lg);
        [0, 4].forEach(function(detune, i){
          var o = c.createOscillator();
          o.type = "triangle";
          o.detune.value = detune * 5;
          o.frequency.setValueAtTime(430 - i * 6, t);
          o.frequency.exponentialRampToValueAtTime(230 - i * 6, t + D);
          lg.connect(o.frequency);
          o.connect(lp);
          o.start(t); o.stop(t + D + 0.05);
        });
        lp.connect(g); g.connect(c.destination);
        lfo.start(t); lfo.stop(t + D + 0.05);
      } catch (e){}
    }
    /* ---- the slurp ----
       Andrew asked for "a bit of a sucking sound" when the bat absorbs a
       word. A suck is a swallow, which is the opposite shape to every
       other sound in here: the pitch RISES as the thing disappears and
       the noise closes rather than opens, so the ear hears something
       being drawn in rather than struck. A sharp little pop at the end
       is the mouth shutting. */
    function slurp(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime, D = 0.22;
        var src = c.createBufferSource(); src.buffer = hiss;
        var bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.Q.value = 5;
        bp.frequency.setValueAtTime(320, t);
        bp.frequency.exponentialRampToValueAtTime(2200, t + D);
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        src.connect(bp); bp.connect(g); g.connect(c.destination);
        src.start(t); src.stop(t + D + 0.02);

        var o = c.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(180, t);
        o.frequency.exponentialRampToValueAtTime(1400, t + D * 0.9);
        var g2 = c.createGain();
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.16, t + 0.04);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + D);
        o.connect(g2); g2.connect(c.destination);
        o.start(t); o.stop(t + D + 0.02);
      } catch (e){}
    }
    /* A wrong catch, or a right word let through: the 1980 cabinet's
       "no", a harsh note falling a fourth. Sawtooth rather than square,
       and the ninja's bonus is a triangle, so that a square wave in
       this app always means a note of the tune. The browser check
       reads the notes off the oscillators to prove the melody is the
       one in the data, and it cannot do that if the sound effects are
       mixed in with it. */
    function buzz(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime;
        var o = c.createOscillator(), g = c.createGain();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(200, t);
        o.frequency.setValueAtTime(150, t + 0.09);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.13, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + 0.22);
      } catch (e){}
    }
    /* ---- a small explosion ----
       Andrew: "What about adding a small explosion sound when a word is
       caught?" It replaces the slurp rather than joining it: two sounds
       on every catch is mush, and twenty-five of them in a room is a
       reason to ban the game. A burst of noise with the top rolled off
       as it decays, over a low thud that gives it a body. */
    function boom(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime, D = 0.26;
        var src = c.createBufferSource(); src.buffer = hiss;
        var lp = c.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(5200, t);
        lp.frequency.exponentialRampToValueAtTime(380, t + D);
        var g1 = c.createGain();
        g1.gain.setValueAtTime(0.0001, t);
        g1.gain.exponentialRampToValueAtTime(0.3, t + 0.008);
        g1.gain.exponentialRampToValueAtTime(0.0001, t + D);
        src.connect(lp); lp.connect(g1); g1.connect(c.destination);
        src.start(t); src.stop(t + D + 0.02);

        var o = c.createOscillator(), g2 = c.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(220, t);
        o.frequency.exponentialRampToValueAtTime(48, t + 0.18);
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g2); g2.connect(c.destination);
        o.start(t); o.stop(t + 0.22);
      } catch (e){}
    }
    /* The ninja's bonus: the two rising notes every arcade machine has
       used for a pickup since 1985. */
    function bonus(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime;
        [[988, 0], [1319, 0.085]].forEach(function(n){
          var o = c.createOscillator(), g = c.createGain();
          o.type = "triangle";
          o.frequency.setValueAtTime(n[0], t + n[1]);
          g.gain.setValueAtTime(0.0001, t + n[1]);
          g.gain.exponentialRampToValueAtTime(0.16, t + n[1] + 0.008);
          g.gain.exponentialRampToValueAtTime(0.0001, t + n[1] + 0.13);
          o.connect(g); g.connect(c.destination);
          o.start(t + n[1]); o.stop(t + n[1] + 0.15);
        });
      } catch (e){}
    }
    /* ---- wah wah wah waaah ----
       Andrew asked for the comedic failure, and the comedy is all in
       the bend: four notes down a chromatic scale, each sliding into
       the next, the last one sagging a whole tone and taking its time
       about it. A sawtooth through a lowpass is near enough a muted
       trombone for a game that is drawn in squares. */
    function sadtrombone(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime;
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 1500; lp.Q.value = 1;
        lp.connect(c.destination);
        /* wah  wah  wah  waaaah */
        var N = [[311, 0.00, 0.22], [294, 0.24, 0.22],
                 [277, 0.48, 0.22], [262, 0.72, 0.85]];
        N.forEach(function(n, k){
          var f = n[0], at = t + n[1], d = n[2];
          var o = c.createOscillator(), g = c.createGain();
          o.type = "sawtooth";
          o.frequency.setValueAtTime(f * 1.06, at);
          o.frequency.linearRampToValueAtTime(f, at + 0.07);
          /* the last one sags away */
          if (k === 3) o.frequency.linearRampToValueAtTime(f * 0.84, at + d);
          /* the wobble that makes it a wah */
          var lfo = c.createOscillator(), lg = c.createGain();
          lfo.type = "sine"; lfo.frequency.value = k === 3 ? 5.5 : 7;
          lg.gain.value = f * 0.022;
          lfo.connect(lg); lg.connect(o.frequency);
          g.gain.setValueAtTime(0.0001, at);
          g.gain.exponentialRampToValueAtTime(0.2, at + 0.03);
          g.gain.setValueAtTime(0.2, at + d * 0.6);
          g.gain.exponentialRampToValueAtTime(0.0001, at + d);
          o.connect(g); g.connect(lp);
          o.start(at); o.stop(at + d + 0.03);
          lfo.start(at); lfo.stop(at + d + 0.03);
        });
      } catch (e){}
    }
    return { whoosh: whoosh, warble: warble,
             ratchet: ratchet, clunk: clunk, wake: wakeAudio,
             slurp: slurp, buzz: buzz,
             boom: boom, bonus: bonus, sadtrombone: sadtrombone,
             ctx: function(){ return ctx; } };
  })();

  /* ---- the score ----
     spend() is the only way points leave. Every support calls it, which
     is what makes the top score mean "unaided" rather than "fast". */
  function award(n){ S.pts += n; save(); paintToggles(); }
  function spend(n, why){
    S.pts = Math.max(0, S.pts - n); S.spent += n; save(); paintToggles();
    var t = $("spenttip");
    if (t) t.textContent = "−" + n + " " + why;
  }

  /* ---- the kana chart ----
     For the students who have trained themselves to need romaji. There
     is none here. Tap a kana in the article and the grid opens with
     that kana lit in its row and column, so they have to see where it
     sits in あいうえお to find it. Being shown "ka" teaches nothing;
     finding か in the か row is the thing that transfers.

     It costs a point, like every other support. */
  var GYO = [
    ["", "あ","い","う","え","お"],
    ["か","か","き","く","け","こ"],
    ["さ","さ","し","す","せ","そ"],
    ["た","た","ち","つ","て","と"],
    ["な","な","に","ぬ","ね","の"],
    ["は","は","ひ","ふ","へ","ほ"],
    ["ま","ま","み","む","め","も"],
    ["や","や","","ゆ","","よ"],
    ["ら","ら","り","る","れ","ろ"],
    ["わ","わ","","","","を"],
    ["ん","ん","","","",""]
  ];
  var DAKU = { "が":"か","ぎ":"き","ぐ":"く","げ":"け","ご":"こ",
    "ざ":"さ","じ":"し","ず":"す","ぜ":"せ","ぞ":"そ",
    "だ":"た","ぢ":"ち","づ":"つ","で":"て","ど":"と",
    "ば":"は","び":"ひ","ぶ":"ふ","べ":"へ","ぼ":"ほ",
    "ぱ":"は","ぴ":"ひ","ぷ":"ふ","ぺ":"へ","ぽ":"ほ" };
  function toHira(ch){
    var c = ch.charCodeAt(0);
    if (c >= 0x30a1 && c <= 0x30f6) return String.fromCharCode(c - 0x60); /* katakana */
    return ch;
  }
  function kanaChart(ch, free){
    var h = toHira(ch), base = DAKU[h] || h;
    if (!free) spend(1, "kana chart");
    var box = document.createElement("div");
    box.className = "sheet";
    box.innerHTML = '<div class="card"><h3>'
      + esc(ch) + (h !== ch ? '　<span style="font-size:.8em;color:var(--muted)">'
          + esc(h) + '</span>' : '')
      + '</h3><p>Find it in the grid. Its row is the sound it starts with and '
      + 'its column is the vowel. No romaji: knowing where it sits is what '
      + 'makes it stick.</p><div class="kgrid" id="kg"></div>'
      + '<div class="row" style="margin-top:12px">'
      + '<button class="btn ghost sm" id="kclose">Close</button>'
      + (hasvoice(h) ? '<button class="btn sm" data-say="' + esc(h) + '">Hear it</button>' : '')
      + '</div></div>';
    document.body.appendChild(box);
    var cells = [];
    GYO.forEach(function(row){
      row.slice(1).forEach(function(k){
        cells.push('<button' + (k ? "" : " disabled")
          + (k && k === base ? ' class="hit"' : '') + '>' + esc(k) + '</button>');
      });
    });
    box.querySelector("#kg").innerHTML = cells.join("");
    box.querySelector("#kclose").onclick = function(){ box.remove(); };
    box.onclick = function(ev){ if (ev.target === box) box.remove(); };
    each(box, "[data-say]", function(b){ b.onclick = function(){ say(b.dataset.say); }; });
  }

  /* ---- the words of this unit, looked up from the article ----

     Andrew, on the old version: "The selected sections tend to not match
     clauses, words or phrases exactly. Instead they start mid-sentence,
     mid-clause or mid idea and often bleed into the next idea."

     He was right, and the cause was in two lines. A tappable span was
     everything between two spaces, and Andrew's articles are spaced for
     reading breath, not for words: he does not put a space after a full
     stop. So 41 per cent of the spans ran straight past the end of a
     sentence — 生[う]まれました。とさに was ONE tappable thing — and 62
     more ran past a comma.

     Then lookup() glossed a span by its longest matching PREFIX, so that
     one span lit up and answered "was born". Worse, the prefix could
     come from a different word entirely: しょう来[らい]、外国[がいこく]に
     answered "prize", because ノーベルしょう is on the list and しょう is
     a prefix of しょう来. お金[かね]を answered "to write", because the
     span it had been glued to began 書[か]きます。

     Three rules replace it.

       1. PUNCTUATION ENDS A SPAN. 。、！？「」 are rendered between
          spans, never inside one, so nothing a student can tap crosses
          into the next idea.
       2. NO PREFIX GUESSING. A span is matched whole, or matched as a
          word plus ONE known trailing particle, or it is not matched.
          An unmatched span is drawn as ordinary text and says so when
          tapped: a wrong meaning is worse than no meaning.
       3. A GRAMMAR ENDING ANSWERS WITH THE GRAMMAR. 話[はな]したり is
          not a word and never will be on a word list, so it answers
          with Andrew's own 〜たり entry instead of with nothing.

     The old loop also stopped at two characters, so 人[ひと]、今[いま]、
     本[ほん]、父[ちち] and 時[とき] could never be found at all once a
     particle was attached to them. Single characters match now. */
  var VBY = {};
  function enrol(list, kind){
    (list || []).forEach(function(v){
      var k = plain(v.ja).replace(/[\s　〜]/g,"");
      if (k && !VBY[k]) VBY[k] = { ja:v.ja, en:v.en, note:v.note, kind:kind };
    });
  }
  /* Unit vocabulary first: where a word is on Andrew's own list, his
     gloss is the one that shows. */
  enrol(K.vocab, "word");
  enrol(K.kanji, "kanji");
  enrol(K.names, "name");
  enrol(K.extras, "word");
  enrol(K.counters, "counter");
  var PBY = {};
  (K.particles || []).forEach(function(v){ PBY[v.ja] = v; });
  /* Endings that are not particles and not words: the copula, the
     politeness tail and the name suffix. They get their own class
     because what a student needs to be told about です is not a
     meaning but which of Andrew's patterns it belongs to. */
  var TAILW = {};
  (K.endings || []).forEach(function(v){ TAILW[v.ja] = v; });
  /* longest first, so から is tried before か */
  var PKEYS = Object.keys(PBY).sort(function(a, b){ return b.length - a.length; });

  function lookup(word){
    var w = plain(word).replace(/[\s　、。！？]/g,"");
    return VBY[w] || null;
  }
  /* The grammar entry a word's ending names, if any. The sentence it sits
     in is passed too, because ことが is 〜ことが好[す]きです in five of the
     articles and 〜たことがありません in one, and only the rest of the
     sentence tells them apart. */
  function patternOf(word, sentence){
    var w = plain(word).replace(/[\s　、。！？]/g,"");
    var hit = null;
    (K.patterns || []).some(function(pt){
      if (pt.sentence && !new RegExp(pt.sentence).test(plain(sentence || ""))) return false;
      return (pt.ends || []).some(function(e){
        if (w.length > e.length && w.slice(-e.length) === e){ hit = pt.id; return true; }
        return false;
      });
    });
    if (!hit) return null;
    var g = null;
    (K.grammar || []).forEach(function(x){ if (x.id === hit) g = x; });
    return g;
  }
  /* ---- covering a span ----
     A bit of text between two boundaries is split only when EVERY piece
     of it is something the page can name: a unit word, a kanji, a name,
     a particle, a copula ending, a counter or a number. All of it, or
     none of it.

     That is the whole safety rule. A parser that covers four fifths of a
     word and guesses the rest is how しょう来[らい] came to mean "prize";
     one that must account for every character either succeeds honestly
     or stands back and says nothing. 青[あお]いLEDを comes apart into
     青[あお]い・LED・を because all three are on a list. むずかしかった
     からです does not come apart at all, and is drawn as plain text.

     Four pieces is the ceiling, which is enough for 千八百四十九年に
     (number・年・に) and for 赤崎[あかさき]さんと (name・さん・と) and
     stops the search from wandering. */
  var NUMBER = /^[0-9０-９一二三四五六七八九十百千万]+$/;
  var NUMK = /^[0-9０-９一二三四五六七八九十百千万]+/;
  function atoms(bit){
    /* 漢字[よみ] travels as one atom so that a split never lands inside
       a furigana bracket and leaves half of it on the screen.

       With one exception, which cost an hour: Andrew writes a year as
       千八百四十九年[ねん], and the kanji run in front of the bracket is
       greedy, so the whole of 千八百四十九年 arrived as a single atom and
       nothing could be made of it. The reading belongs to 年 alone. So a
       run that starts in numerals and does not end in them is cut at the
       join: the numerals become their own atoms and the bracket stays
       with the character it reads. */
    var out = [], i = 0;
    while (i < bit.length){
      var m = /^([一-鿿々]+)\[([ぁ-ゟー]+)\]/.exec(bit.slice(i));
      if (m){
        var run = m[1], lead = NUMK.exec(run);
        if (lead && lead[0].length < run.length){
          for (var k = 0; k < lead[0].length; k++) out.push({ raw:lead[0][k], p:lead[0][k] });
          var rest = run.slice(lead[0].length);
          out.push({ raw: rest + "[" + m[2] + "]", p: rest });
        } else {
          out.push({ raw:m[0], p:run });
        }
        i += m[0].length;
      }
      else { out.push({ raw:bit[i], p:bit[i] }); i++; }
    }
    return out;
  }
  function namePiece(w){
    if (VBY[w]) return { kind:"w", v:VBY[w] };
    if (PBY[w]) return { kind:"p", v:PBY[w] };
    if (TAILW[w]) return { kind:"t", v:TAILW[w] };
    if (NUMBER.test(w)) return { kind:"n", v:{ ja:w, en:"a number" } };
    return null;
  }
  function cover(bit){
    var A = atoms(bit), N = A.length, best = null;
    function plainOf(a, b){
      var t = ""; for (var k = a; k < b; k++) t += A[k].p; return t;
    }
    function rawOf(a, b){
      var t = ""; for (var k = a; k < b; k++) t += A[k].raw; return t;
    }
    (function walk(i, acc){
      if (best || acc.length > 4) return;
      if (i >= N){ if (acc.length > 1) best = acc.slice(); return; }
      for (var j = N; j > i; j--){
        var hit = namePiece(plainOf(i, j));
        if (!hit) continue;
        acc.push({ raw: rawOf(i, j), kind: hit.kind, v: hit.v });
        walk(j, acc);
        acc.pop();
        if (best) return;
      }
    })(0, []);
    return best;
  }

  /* ---- the rungs ---- */
  /* Two groups, and the bar shows the join. The first five are about
     whichever person is chosen and change when the chips below change;
     the last three are about the unit and stand on their own. Grammar
     sat second, in the middle of the person's own sequence, which read
     as though it belonged to that person. It does not. */
  var REEL = (function(){
    var H = 64, raf = 0;
    function cancel(){ if (raf) cancelAnimationFrame(raf); raf = 0; }

    function mount(box, items, onLand){
      var L = items.length, SPAN = L * H;
      var win = box.querySelector(".rwin"), strip = box.querySelector(".rstrip");
      var three = "";
      for (var c = 0; c < 3; c++){
        three += items.map(function(it){
          return '<div class="ritem"><b>' + it.html + '</b>'
               + (it.sub ? '<i>' + it.sub + '</i>' : '') + '</div>';
        }).join("");
      }
      strip.innerHTML = three;

      /* How long the drum runs is this pair of numbers and nothing else.
         It used to lose speed at 2.4 a second with 90 of friction on top,
         which brought even the hardest flick to rest in about 1.3 seconds:
         a flick, not a spin. At 0.8 and 45 the same throw runs for three
         to four seconds, which is what a wheel does. */
      /* ---- how it winds down ----
         0.8 and 45 threw away 56% of the speed in the first second and
         crawled through the rest, which is an air brake and not a wheel.
         A heavy thing that is spinning loses speed at close to a steady
         rate, so most of the friction here is the constant and only a
         quarter of it rises with the speed. From a middling throw the
         drum now reads 6000, 4050, 3243, 2532, 1904, 1350, 862, 431 at
         each half second: an even wind-down you can watch, instead of a
         lurch and a long crawl. */
      var SLOW = 0.25, DRAG = 700, CATCH = 300, K = 150, C = 16;
      var pos = 0, v = 0, target = null, last = 0;
      var spinning = false;

      function wrap(x){ return ((x % SPAN) + SPAN) % SPAN; }
      function paint(){
        strip.style.transform =
          "translate3d(0," + (H - SPAN - wrap(pos)).toFixed(2) + "px,0)";
      }
      function at(){ return Math.round(wrap(pos) / H) % L; }
      /* The sound is the speed. The drum hands over the speed and how far
         apart the notches are, and CLICK works out the rest: one click per
         two items, because a notch per item at six turns a second is 230
         clicks a second and the ear hears a tone, not a wheel. */
      function ticks(speed){
        if (!(speed > 1)) return;
        SFX.ratchet(speed, 2 * H);
      }
      function done(){
        SFX.clunk();
        spinning = false;
        box.classList.remove("spinning");
        if (onLand) onLand(items[at()], at());
      }
      /* ---- a fixed step ----
         The physics used to advance by however long the last frame took,
         which is the ordinary way to animate and the wrong way to do this.
         The speed that lands on a given slot is worked out by running the
         same sums forward at a sixtieth of a second a step; if the drum
         itself then advances in steps of whatever the browser gave it,
         1/60 here and 1/120 on a tablet and 1/40 under load, it travels a
         slightly different distance and stops a slot or two from where it
         was sent. Nothing looked wrong, which is the worst kind of wrong:
         the drum simply landed on a different topic from the one the deck
         had dealt, and the deck then dealt that topic again.

         So time is accumulated and spent in whole steps of a sixtieth,
         and what is left over waits for the next frame. The drum now lands
         exactly where it was thrown, on any screen, under any load. The
         guard stops a tab that has been asleep for a minute from
         fast-forwarding through a thousand steps when it wakes. */
      var STEP = 1 / 60, acc = 0;
      function step(dt){
        if (target === null){
          var sgn = v < 0 ? -1 : 1;
          v -= (SLOW * v + DRAG * sgn) * dt;
          if (v * sgn < 0) v = 0;
          pos += v * dt;
          if (Math.abs(v) < CATCH) target = Math.round(pos / H) * H;
        } else {
          v += (-K * (pos - target) - C * v) * dt;
          pos += v * dt;
        }
      }
      function frame(now){
        acc += last ? Math.min(0.25, (now - last) / 1000) : STEP;
        last = now;
        for (var guard = 0; acc >= STEP && guard < 30; guard++){
          step(STEP); acc -= STEP;
          if (target !== null && Math.abs(pos - target) < 0.4 && Math.abs(v) < 8){
            pos = target; v = 0; acc = 0;
            paint(); done(); return;
          }
        }
        paint(); ticks(Math.abs(v));
        raf = requestAnimationFrame(frame);
      }
      function launch(v0){
        cancel();
        target = null; v = v0; last = 0; acc = 0;
        spinning = true;
        box.classList.add("spinning");
        /* ---- the drum spins for everybody ----
           This used to hand a device with reduced motion a three slot
           glide lasting under half a second. That one branch was why
           Andrew could not see a spin or hear the clicks however many
           times the physics and the sound were fixed: the branch never
           ran either of them. On a school laptop with the setting on
           system wide, the whole class gets the same dead control.

           Reduced motion is about movement a person did not ask for and
           cannot predict. A drum is a control whose entire function is
           to spin, and it moves because the student pressed it. So the
           spin stays, for everybody, with its clicks. The decoration
           that setting is actually for — the ninja and the かさおばけ
           crossing the screen — is where this app answers it, by fading
           them in place rather than flying them past. */
        raf = requestAnimationFrame(frame);
      }

      /* A flick, for a finger. The velocity is taken from the last few
         milliseconds rather than the whole gesture, so a slow drag that
         ends in a snap throws the drum and a slow drag that ends still
         does not. */
      var grab = null;
      win.addEventListener("pointerdown", function(ev){
        cancel(); spinning = false; box.classList.remove("spinning");
        v = 0; target = null;
        grab = { y:ev.clientY, pos:pos, t:performance.now(),
                 ly:ev.clientY, lt:performance.now(), v:0, moved:0 };
        try { win.setPointerCapture(ev.pointerId); } catch (e){}
      });
      win.addEventListener("pointermove", function(ev){
        if (!grab) return;
        ev.preventDefault();
        pos = grab.pos - (ev.clientY - grab.y);
        grab.moved += Math.abs(ev.clientY - grab.ly);
        var now = performance.now(), dt = now - grab.lt;
        if (dt > 4){
          grab.v = -(ev.clientY - grab.ly) / dt * 1000;
          grab.ly = ev.clientY; grab.lt = now;
          grab.mouse = ev.pointerType === "mouse";
        }
        paint(); ticks(Math.abs(grab.v));
      });
      function release(){
        if (!grab) return;
        /* A hand can flick; a mouse cannot. The same gesture drags a
           cursor at perhaps a third the speed of a thumb, so a mouse
           throw is scaled up to land in the same range. The button on the
           rim is there because even scaled, dragging a mouse is a poor way
           to throw anything. */
        var fling = grab.v * (grab.mouse ? 2.2 : 1);
        var stale = performance.now() - grab.lt > 130;
        grab = null;
        if (stale || Math.abs(fling) < 130){ launch(0); return; }
        launch(Math.max(-7000, Math.min(7000, fling)));
      }
      win.addEventListener("pointerup", release);
      win.addEventListener("pointercancel", release);

      /* ---- which word it stops on ----
         The button used to throw a random amount of energy from wherever
         the drum happened to be sitting, which is not the same thing as
         picking a word. The distance a throw covers barely varied, so one
         spin landed a fairly predictable way along from the last, a word
         could come up twice running, and a word could sit there all lesson
         and never come up at all.

         Two things fix that. The order of the drum is rebuilt at the start
         of every button spin, while it is already moving and nobody can
         read it. And the caller names the word it wants, which it takes
         from a deck, so every word comes up before any comes up twice.

         The throw is then solved rather than guessed: run the same physics
         forward for a few hundred candidate speeds, keep the ones that stop
         on the wanted word after three to four and a half seconds, and pick
         one of those at random. The drum is not steered or stopped early;
         it is thrown at exactly the speed that lands it there, the way a
         croupier learns to. */
      function reorder(){
        shuffle(items);
        var three = "";
        for (var c = 0; c < 3; c++){
          three += items.map(function(it){
            return '<div class="ritem"><b>' + it.html + '</b>'
                 + (it.sub ? '<i>' + it.sub + '</i>' : '') + '</div>';
          }).join("");
        }
        strip.innerHTML = three;
        paint();
      }
      /* the same integration as frame(), run forward with no drawing */
      function dryRun(v0){
        var p = 0, u = v0, t = 0, dt = 1 / 60;
        while (u > CATCH && t < 12){
          u -= (SLOW * u + DRAG) * dt;
          if (u < 0) u = 0;
          p += u * dt;
          t += dt;
        }
        return { slot: Math.round(p / H), secs: t + 0.3 };   /* 0.3 to settle */
      }
      /* The window the throw has to land in. Wide, because the speeds that
         stop on a given word come in clusters, one per extra turn of the
         drum: a narrow window leaves two or three of them and every spin
         takes the same time as the last. */
      var MINS = 2.8, MAXS = 5.0;
      function throwTo(slot){
        var from = Math.round(pos / H), want = ((slot % L) + L) % L, hits = [];
        /* Gentler friction means a four second spin starts slower, so the
           search starts lower, and in finer steps, because the speeds that
           stop on one word are rarer when fewer of them are in range. */
        for (var v0 = 1800; v0 <= 15000; v0 += 10){
          var r = dryRun(v0);
          if (r.secs < MINS || r.secs > MAXS) continue;
          if ((((from + r.slot) % L) + L) % L === want) hits.push(v0);
        }
        if (!hits.length) return launch(3400 + Math.random() * 3000);
        launch(hits[Math.floor(Math.random() * hits.length)]);
      }

      paint();
      return {
        /* A free spin, for when nothing has asked for a particular word. */
        spin: function(){ reorder(); launch(3200 + Math.random() * 3600); },
        /* Spin and land on this one. */
        spinTo: function(id){
          reorder();
          var i = 0;
          items.forEach(function(it, n){ if (it.id === id) i = n; });
          throwTo(i);
        },
        at: at,
        spinning: function(){ return spinning; }
      };
    }
    return { mount: mount, cancel: cancel };
  })();

  /* ================= ことばキャッチ =========================================
     Andrew asked for this one: "random topic vocabulary falls from the sky
     one word at a time in random order in Japanese script. Players have to
     recognise the correct word and move a horizontally moving bar at the
     bottom of the screen to absorb the word with a bit of a sucking sound.
     After they get a word correct, the words fall ever so slightly faster.
     The graphics are deliberately pixelated like 80s tabletop graphics
     games with a black background and the music is chiptune."

     The one thing a falling-word game has to get right is that catching is
     a DECISION and not a reflex. A word falls, and above it is an English
     meaning: catch the word if it is that meaning, let it fall if it is
     not. Reading is the whole of the game. Without the target the bat is
     just a thing you park under whatever is coming, which trains nothing.

     So: a life for catching the wrong word, a life for letting the right
     one land, three lives, and a fraction more speed every time a word is
     absorbed. The speed is the reward and the pressure at once.

     The pixels are real pixels. The canvas is 240 by 320 however big it is
     drawn, smoothing is off, and the browser blows each one up into a
     square. Nothing is a picture of a pixel; the text really is that
     coarse, which is why the kyokasho strokes come out blocky instead of
     smooth, and why it looks like the thing Andrew asked for rather than a
     filter over a modern page. */
  var JPFONT = getComputedStyle(document.documentElement)
    .getPropertyValue("--jp").trim() || "sans-serif";
  var PIXW = 320, PIXH = 200;
  var SEMI = Math.pow(2, 1 / 12);
  function hz(n){
    /* "A4" or "F#3" to a frequency, so the tune in the data file reads as
       notes rather than as numbers nobody can check against a score. */
    var m = /^([A-G])(#|b)?(-?\d)$/.exec(n || "");
    if (!m) return 0;
    var base = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 }[m[1]];
    if (m[2] === "#") base++;
    if (m[2] === "b") base--;
    return 440 * Math.pow(SEMI, base - 9 + (+m[3] - 4) * 12);
  }

  /* ---- the chiptune ----
     Two square waves and a bass pulse, scheduled on the audio clock a bar
     at a time rather than on a timer, because a setInterval melody wobbles
     audibly the moment the main thread is busy drawing. Nothing is
     downloaded: the tune is a list of notes in the data file.

     It is quiet on purpose. Twenty-five of these in a classroom is the
     thing that gets a game banned, so the music sits under the sound
     effects and the ♪ button turns the lot off. */
  var MUSIC = (function(){
    var timer = null, at = 0, i = 0, bi = 0, on = false, T = null, rate = 1;
    function voice(c, note, start, dur, type, vol, detune){
      if (!note) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = type;
      o.frequency.value = hz(note);
      if (detune) o.detune.value = detune;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(vol, start + 0.012);
      g.gain.setValueAtTime(vol, start + dur * 0.72);
      g.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.96);
      o.connect(g); g.connect(c.destination);
      o.start(start); o.stop(start + dur);
    }
    function pump(){
      try { pumpNow(); } catch (e){ stop(); }
    }
    function pumpNow(){
      var c = SFX.ctx(); if (!c || !on || !T) return;
      /* The tune winds up with the game. Every word caught makes the
         words fall a little faster and the music follow them, which is
         most of what makes an arcade game feel like it is closing in. */
      var beat = 60 / ((T.tempo || 100) * rate);
      /* keep about a second and a half of music in front of the clock */
      while (at < c.currentTime + 1.5){
        if (at < c.currentTime) at = c.currentTime + 0.05;
        var n = T.melody[i % T.melody.length], d = n[1] * beat;
        voice(c, n[0], at, d, "square", 0.045, 0);
        var b = (T.bass || [])[bi % ((T.bass || []).length || 1)];
        if (b) voice(c, b[0], at, Math.min(d, b[1] * beat), "triangle", 0.05, 0);
        at += d;
        i++; bi++;
      }
    }
    function start(tune){
      if (on) return;
      /* Everything about the music is optional. A browser that refuses
         an AudioContext, a device with the output muted, an iPad that
         has not had its gesture yet: none of it may stop the game
         starting. The test harness found this by wrapping AudioContext
         and throwing inside it, and the game never dealt its first
         word. */
      try {
        var c = SFX.wake(); if (!c) return;
        T = tune; on = true; rate = 1; at = c.currentTime + 0.08; i = 0; bi = 0;
        pump();
        timer = setInterval(pump, 400);
      } catch (e){ on = false; T = null; }
    }
    function stop(){
      on = false; T = null;
      clearInterval(timer); timer = null;
    }
    return { start: start, stop: stop, playing: function(){ return on; },
             rate: function(x){ rate = Math.max(1, Math.min(1.45, x)); },
             tempo: function(){ return (T ? T.tempo || 100 : 0) * rate; } };
  })();

  /* ---- the game ----
     Fixed 1/60 timestep with an accumulator, the same way the drum runs,
     so a word falls at the same speed on a 60Hz laptop and a 120Hz iPad
     and the difficulty is the difficulty rather than the refresh rate. */
  function arcade(cfg){
    var cv = cfg.canvas, g = cv.getContext("2d");
    cv.width = PIXW; cv.height = PIXH;
    var FONT = cfg.font || 18;
    g.imageSmoothingEnabled = false;
    var POOL = cfg.words;
    var stars = [];
    for (var s = 0; s < 26; s++)
      stars.push([Math.floor(Math.random() * PIXW), Math.floor(Math.random() * PIXH),
                  Math.random() < 0.3 ? 2 : 1]);

    /* falling is a LIST. Andrew, on the first version: "the screen needs
       to be wider or the falling words need to be smaller to fit multiple
       falling words on the screen at once." Both, in the end: the screen
       is landscape now and the words are two pixels smaller, and several
       are in the air at a time, which is what makes finding the right one
       a search rather than a yes-or-no on whatever is coming. */
    /* A question from the moment the rung opens. Andrew: "Where is the
       prompt word? Can't see it." The pill read CATCH — until somebody
       pressed Start, and on game over it went back to a dash, so for
       most of the time a student was looking at the screen there was no
       question on it to find. There is always one now. */
    var G = { mode:"ready", score:0, lives:3, best:cfg.best || 0,
              speed:24, bat:PIXW / 2, batW:56, falling:[], target:null,
              flash:0, flashOk:false, spawn:0, sinceTarget:0,
              bits:[], flyers:[], fly:260 };
    var raf = 0, last = 0, acc = 0, alive = true;

    function width(w){
      g.font = "bold " + FONT + "px " + JPFONT;
      return g.measureText(cfg.label(w)).width;
    }
    function newTarget(){
      var was = G.target;
      var t = POOL[Math.floor(Math.random() * POOL.length)], tries = 0;
      while (POOL.length > 1 && was && t.en === was.en && tries < 20){
        t = POOL[Math.floor(Math.random() * POOL.length)]; tries++;
      }
      G.target = t;
      G.sinceTarget = 0;
      /* The words already in the air stay: the question changed, so the
         student re-reads what is falling, which is the point. The only
         ones taken away are the ones too close to the floor to be
         reached, because losing a life to a word that was already past
         you when the question changed is not a thing you could have
         done anything about. */
      var reach = PIXH - 18 - 50;
      G.falling = G.falling.filter(function(f){ return f.y < reach; });
      /* The prompt lives outside the canvas, in the page, where it can be
         read at page-text size instead of in 15-pixel capitals. Andrew
         asked for that and he is right: the question is the one thing on
         this screen that is not meant to be a game. */
      if (cfg.onPrompt) cfg.onPrompt(G.target);
    }
    function spawn(force){
      /* Roughly two in five of the words in the air are the one being
         asked for. Below that the game is mostly dodging; above it, and
         catching everything works and nothing is read. The target is
         forced in if it has not been seen for a while, so a question can
         never become unanswerable. */
      function inAir(x){
        return G.falling.some(function(f){ return f.w.en === x.en; });
      }
      var w, tries = 0;
      if ((force || Math.random() < 0.4) && !inAir(G.target)) w = G.target;
      else {
        /* never two of the same word on the screen at once: two copies of
           the answer reads as a bug, and two copies of a distractor is
           one fewer word to read */
        do { w = POOL[Math.floor(Math.random() * POOL.length)]; tries++; }
        while (POOL.length > 1 && tries < 30
               && (inAir(w) || (!force && w.en === G.target.en)));
        if (inAir(w)) return;
      }
      var half = width(w) / 2 + 3;
      var span = Math.max(8, PIXW - 2 * half);
      /* Never one word above another. Andrew: "Definitely don't stack
         words on top of each other because it is too hard to catch
         them." Two words sharing a column arrive at the bat one after
         the other with no room to move between them, so a new word has
         to clear every word already in the air by both their widths.
         If there is nowhere to put it, it does not come: a thinner
         screen is better than an uncatchable one. */
      var x = null;
      for (var t2 = 0; t2 < 40 && x === null; t2++){
        var try_ = Math.round(half + Math.random() * span);
        var clear = G.falling.every(function(o){
          return Math.abs(o.x - try_) > o.half + half + 6;
        });
        if (clear) x = try_;
      }
      if (x === null) return;
      if (w === G.target) G.sinceTarget = 0;
      G.falling.push({ w: w, x: x, y: -2, half: half });
    }
    /* ---- the disintegration ----
       Andrew: "What about making the word disintegrate when it is
       caught?" The word is thrown outwards as a handful of its own
       pixels, which at this resolution is the only effect that looks
       like it belongs. */
    function burst(x, y, col, n){
      for (var k = 0; k < (n || 14); k++){
        var a = Math.random() * Math.PI * 2, sp = 0.4 + Math.random() * 1.5;
        G.bits.push({ x: x + (Math.random() * 20 - 10), y: y - 5 + Math.random() * 8,
                      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.5,
                      life: 16 + Math.floor(Math.random() * 12), col: col });
      }
    }
    function caught(f){
      burst(f.x, f.y, "#bfffbf", 18);
      G.score++;
      /* Andrew: "the words need to speed up a bit faster than they
           have been in order to keep it interesting." */
        G.speed = Math.min(175, G.speed * 1.085);
        MUSIC.rate(1 + (G.speed - 24) / 190);
      G.flash = 14; G.flashOk = true;
      if (cfg.onCatch) cfg.onCatch(f.w);
      if (S.sfx) SFX.boom();
      newTarget();
      if (!G.falling.some(function(x){ return x.w.en === G.target.en; }))
        spawn(true);
    }
    function wrong(){
      /* Andrew: "Make sure that the game takes lives when the player
         catches the wrong word. I noticed that it wasn't working
         properly in the body app. I was getting away with wrong
         catches." It did not take one before: it stopped the bat for a
         third of a second instead, which was my call and not his.
         A wrong catch costs a life, the same as a missed one. */
      lose();
    }
    /* One life, whichever way it went. */
    function lose(){
      G.lives--;
      G.flash = 16; G.flashOk = false;
      if (S.sfx) SFX.buzz();
      if (G.lives <= 0) return over();
      newTarget();
      if (!G.falling.some(function(x){ return x.w.en === G.target.en; }))
        spawn(true);
    }
    function missed(){ lose(); }
    /* ---- the ninja and the かさおばけ ----
       Andrew: "Add a random flying yokai that players have to avoid or
       lose a life. Also add a random flying ninja that players must hit
       to get a bonus point."

       They swoop rather than fall: in from one side near the top and
       down across the screen, so they cross the bat line once, at a
       place the player has to get to or get away from. Missing a ninja
       costs nothing; it is a bonus, not a fourth way to lose. */
    function flyer(){
      var ninja = Math.random() < 0.5;
      var fromLeft = Math.random() < 0.5;
      G.flyers.push({
        ninja: ninja,
        x: fromLeft ? -12 : PIXW + 12,
        y: 22 + Math.random() * 30,
        vx: (fromLeft ? 1 : -1) * (0.55 + Math.random() * 0.5),
        vy: 0.42 + Math.random() * 0.22,
        t: 0
      });
    }
    function over(){
      G.mode = "over";
      G.best = Math.max(G.best, G.score);
      MUSIC.stop();
      if (S.sfx) setTimeout(function(){ SFX.sadtrombone(); }, 140);
      if (cfg.onOver) cfg.onOver(G.score);
      /* the question stays up: it is the one the next game starts on */
    }
    function begin(){
      G.mode = "play"; G.score = 0; G.lives = 3; G.speed = 24;
      G.falling = []; G.spawn = 0; G.bits = []; G.flyers = []; G.fly = 260;
      SFX.wake();
      if (S.sfx && cfg.tune) MUSIC.start(cfg.tune);
      /* the question already on the pill is the one you start on */
      if (!G.target) newTarget();
      else if (cfg.onPrompt) cfg.onPrompt(G.target);
      spawn(true);
    }
    function step(){
      if (G.mode !== "play") return;
      if (G.flash > 0) G.flash--;
      G.sinceTarget++;
      /* A new word every so often, and sooner as the game speeds up, so
         the screen stays about as full however fast it is going. */
      G.spawn++;
      var every = Math.max(26, Math.round(3000 / G.speed));
      if (G.spawn >= every && G.falling.length < 5){
        G.spawn = 0;
        spawn(G.sinceTarget > 240);
      }
      var floor = PIXH - 18;

      /* the pixels of a word that has already gone */
      for (var bI = G.bits.length - 1; bI >= 0; bI--){
        var bt = G.bits[bI];
        bt.x += bt.vx; bt.y += bt.vy; bt.vy += 0.05; bt.life--;
        if (bt.life <= 0) G.bits.splice(bI, 1);
      }

      /* one swooping creature every ten seconds or so */
      G.fly--;
      if (G.fly <= 0 && G.flyers.length < 2){
        G.fly = 420 + Math.floor(Math.random() * 360);
        flyer();
      }
      for (var vI = G.flyers.length - 1; vI >= 0; vI--){
        var fl = G.flyers[vI];
        var wasAbove = fl.y < floor;
        fl.x += fl.vx * (G.speed / 24);
        fl.y += fl.vy * (G.speed / 24);
        fl.t++;
        if (fl.x < -24 || fl.x > PIXW + 24 || fl.y > PIXH + 20){
          G.flyers.splice(vI, 1);
          continue;
        }
        if (wasAbove && fl.y >= floor){
          var onIt = Math.abs(fl.x - G.bat) < G.batW / 2 + 7;
          if (onIt){
            G.flyers.splice(vI, 1);
            if (fl.ninja){
              /* a bonus point, and it is only ever a bonus: it is not
                 a word, so it pays no points towards the step and
                 cannot be farmed for them */
              G.score += 2;
              G.flash = 14; G.flashOk = true;
              burst(fl.x, fl.y, "#9fd4ff", 16);
              if (S.sfx) SFX.bonus();
            } else {
              burst(fl.x, fl.y, "#d9a7ff", 16);
              lose();
            }
            continue;
          }
        }
      }

      for (var i = G.falling.length - 1; i >= 0; i--){
        var f = G.falling[i];
        f.y += G.speed / 60;
        if (f.y < floor) continue;
        /* The word's CENTRE has to be over the bat, not merely touching
           its edge. The old test counted any overlap, so a long word was
           caught from a fifth of the screen away on either side: fine
           when a wrong catch was free, unfair the moment it costs a
           life. Catching is a deliberate act now, which is what makes
           losing one always the player's own doing. */
        var onBat = Math.abs(f.x - G.bat) < G.batW / 2 + 6;
        var isTarget = f.w.en === G.target.en;
        G.falling.splice(i, 1);
        if (onBat){
          if (isTarget) return caught(f);
          wrong();
        } else if (isTarget){
          return missed();
        }
      }
    }

    function text(t, x, y, px, col, align){
      g.fillStyle = col;
      g.font = "bold " + px + "px " + JPFONT;
      g.textAlign = align || "center";
      g.textBaseline = "alphabetic";
      g.fillText(t, x, y);
    }
    function paint(){
      g.fillStyle = "#000";
      g.fillRect(0, 0, PIXW, PIXH);
      g.fillStyle = "#1b3b1b";
      stars.forEach(function(st){ g.fillRect(st[0], st[1], st[2], st[2]); });

      if (G.mode === "ready" || G.mode === "over"){
        text(G.mode === "over" ? "GAME OVER" : "ことばキャッチ",
             PIXW / 2, 70, G.mode === "over" ? 20 : 22,
             G.mode === "over" ? "#ff6a4a" : "#6cf06c");
        if (G.mode === "over"){
          text("SCORE " + G.score, PIXW / 2, 96, 13, "#fff");
          text("BEST " + G.best, PIXW / 2, 113, 10, "#8a8a8a");
        } else {
          text("Catch the word above the screen.", PIXW / 2, 96, 9, "#9a9a9a");
          text("Let the others fall.", PIXW / 2, 110, 9, "#9a9a9a");
        }
        text("PRESS START", PIXW / 2, 142, 12,
             (Math.floor(Date.now() / 420) % 2) ? "#6cf06c" : "#1d4a1d");
        text("drag, or ← →", PIXW / 2, 162, 8, "#5a5a5a");
      }

      if (G.mode === "play"){
        /* Every word the same colour. The target used to brighten as it
           neared the floor, which told a student which one to catch
           without their reading a thing: Andrew spotted it. */
        G.falling.forEach(function(f){
          text(cfg.label(f.w), f.x, Math.round(f.y), FONT, "#e8f2e8");
        });
      }

      /* ---- the two creatures, in pixels ----
         A ninja is dark, which on a black screen is nothing at all, so
         he is a grey hood with a bright headband and two white eyes.
         The かさおばけ is the one-eyed umbrella: a purple canopy, a
         single eye and one wooden leg. Both are drawn from rectangles
         rather than fetched, like everything else here. */
      G.flyers.forEach(function(fl){
        var x = Math.round(fl.x), y = Math.round(fl.y);
        var bob = Math.round(Math.sin(fl.t / 7) * 2);
        y += bob;
        if (fl.ninja){
          g.fillStyle = "#3a3f46";
          g.fillRect(x - 5, y - 7, 10, 9);          /* hood */
          g.fillRect(x - 7, y - 1, 14, 5);          /* shoulders */
          g.fillStyle = "#c8332f";
          g.fillRect(x - 6, y - 4, 12, 2);          /* headband */
          g.fillRect(x + 5, y - 4, 4, 1);           /* its tail, streaming */
          g.fillStyle = "#fff";
          g.fillRect(x - 3, y - 4, 2, 2);
          g.fillRect(x + 1, y - 4, 2, 2);           /* eyes */
          g.fillStyle = "#2a2e33";
          g.fillRect(x - 4, y + 4, 3, 3);
          g.fillRect(x + 1, y + 4, 3, 3);           /* legs, mid stride */
        } else {
          g.fillStyle = "#7a4a86";
          g.fillRect(x - 8, y - 5, 16, 3);          /* canopy */
          g.fillRect(x - 6, y - 7, 12, 2);
          g.fillStyle = "#9a66a8";
          g.fillRect(x - 8, y - 2, 16, 1);          /* its rim */
          g.fillStyle = "#e8d8f0";
          g.fillRect(x - 3, y, 6, 5);               /* face */
          g.fillStyle = "#1a1020";
          g.fillRect(x - 1, y + 1, 3, 3);           /* the one eye */
          g.fillStyle = "#c8332f";
          g.fillRect(x - 1, y + 5, 2, 3);           /* tongue */
          g.fillStyle = "#8a6a3a";
          g.fillRect(x - 1, y + 5, 1, 6);           /* the one leg */
        }
      });

      /* the pixels of a caught word, on their way out */
      G.bits.forEach(function(bt){
        g.fillStyle = bt.col;
        g.globalAlpha = Math.max(0, Math.min(1, bt.life / 16));
        g.fillRect(Math.round(bt.x), Math.round(bt.y), 2, 2);
      });
      g.globalAlpha = 1;

      /* the bat: a slab with a lighter lip, and a mouth when it eats */
      var by = PIXH - 12, bx = Math.round(G.bat - G.batW / 2);
      g.fillStyle = G.flash > 0
        ? (G.flashOk ? "#aaffaa" : "#ff6a4a") : "#6cf06c";
      g.fillRect(bx, by, G.batW, 5);
      g.fillStyle = "#2f8f2f";
      g.fillRect(bx, by + 5, G.batW, 3);
      g.fillStyle = "#000";
      g.fillRect(Math.round(bx + G.batW / 2 - 4), by, 8, 2);

      if (G.mode === "play"){
        g.fillStyle = "#2b2b2b";
        g.fillRect(0, PIXH - 8, PIXW, 1);
        text("SCORE " + G.score, 3, PIXH - 1, 8, "#6cf06c", "left");
        var hearts = "";
        for (var L = 0; L < G.lives; L++) hearts += "■";
        text(hearts, PIXW - 3, PIXH - 1, 8, "#ff6a4a", "right");
      }
    }
    function loop(t){
      if (!alive) return;
      if (!last) last = t;
      acc += Math.min(0.25, (t - last) / 1000);
      last = t;
      while (acc >= 1 / 60){ step(); acc -= 1 / 60; }
      paint();
      raf = requestAnimationFrame(loop);
    }

    /* ---- the bat ---- */
    function moveTo(clientX){
      var r = cv.getBoundingClientRect();
      var x = (clientX - r.left) / r.width * PIXW;
      G.bat = Math.max(G.batW / 2, Math.min(PIXW - G.batW / 2, x));
    }
    var dragging = false;
    function down(ev){
      cv.focus();
      if (G.mode !== "play"){ begin(); return; }
      dragging = true; moveTo(ev.clientX); ev.preventDefault();
    }
    function move(ev){ if (dragging) moveTo(ev.clientX); }
    function up(){ dragging = false; }
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    var keys = {};
    function keydown(ev){
      if (ev.key === "ArrowLeft" || ev.key === "ArrowRight"){
        keys[ev.key] = 1; ev.preventDefault();
      }
      if ((ev.key === " " || ev.key === "Enter") && G.mode !== "play"){
        begin(); ev.preventDefault();
      }
    }
    function keyup(ev){ keys[ev.key] = 0; }
    cv.addEventListener("keydown", keydown);
    cv.addEventListener("keyup", keyup);
    var kt = setInterval(function(){
      if (G.mode !== "play") return;
      if (keys.ArrowLeft) G.bat = Math.max(G.batW / 2, G.bat - 6);
      if (keys.ArrowRight) G.bat = Math.min(PIXW - G.batW / 2, G.bat + 6);
    }, 1000 / 60);

    newTarget();
    raf = requestAnimationFrame(loop);
    return {
      state: G,
      /* what the game would draw for a word. The browser check reads it
         to hold the kana rule in place; nothing in the app calls it. */
      label: function(w){ return cfg.label(w); },
      start: begin,
      stop: function(){
        alive = false;
        cancelAnimationFrame(raf);
        clearInterval(kt);
        MUSIC.stop();
        cv.removeEventListener("pointerdown", down);
        cv.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      }
    };
  }

  var STEPS = [
    { id:"kotoba", ja:"ことば",   en:"The words" },
    { id:"yomu",   ja:"よむ",     en:"Read it" },
    { id:"toi",    ja:"しつもん", en:"Questions" },
    { id:"yaku",   ja:"やくす",   en:"Translate" },
    { id:"hayaku", ja:"はやく",   en:"Read it again" },
    { id:"bunpou", ja:"ぶんぽう", en:"Grammar", whole:true },
    { id:"roulette", ja:"ルーレット", en:"Spin a pattern", whole:true },
    { id:"katch", ja:"ことばキャッチ", en:"Catch the kanji", whole:true },
    { id:"nyuu", ja:"にゅうりょく", en:"Japanese keyboard", whole:true },
    { id:"jibun",  ja:"じぶんで", en:"Write your own", whole:true },
    { id:"kuraberu", ja:"くらべる", en:"All six", whole:true }
  ];
  var at = 0, who = 0, DRAW = {};
  function P(){ return K.people[who % K.people.length]; }
  function tag(){ return STEPS[at].id + ":" + P().id; }

  function paintSteps(){
    var lastWhole = false;
    $("steps").innerHTML = STEPS.map(function(s,i){
      var all = s.whole
        ? S.done[s.id] : K.people.every(function(p){ return S.done[s.id+":"+p.id]; });
      var head = "";
      if (!i) head = '<span class="grp">この人<em>this person</em></span>';
      else if (s.whole && !lastWhole)
        head = '<span class="grp">ユニット<em>the whole unit</em></span>';
      lastWhole = !!s.whole;
      return head + '<button data-i="'+i+'"'+(i===at?' aria-current="step"':'')
        + '><b>'+esc(s.ja)+'</b><i'+(all?' class="done"':'')+'>'
        + esc(s.en)+(all?" ✓":"")+'</i></button>';
    }).join("");
    each($("steps"),"[data-i]",function(b){
      b.onclick = function(){ at = +b.dataset.i; draw(); };
    });
    var hide = !!STEPS[at].whole;
    $("whobar").style.display = hide ? "none" : "";
    $("whobar").innerHTML = hide ? "" : K.people.map(function(p,i){
      return '<button data-w="'+i+'"'+(i===who?' aria-current="true"':'')+'>'
        + esc(plain(p.name_ja)) + (S.done[STEPS[at].id+":"+p.id] ? " ✓" : "") + '</button>';
    }).join("");
    each($("whobar"),"[data-w]",function(b){
      b.onclick = function(){ who = +b.dataset.w; draw(); };
    });
  }
  function done(){ S.done[tag()] = 1; save(); paintSteps(); }
  function wireSay(){
    each($("main"),"[data-say]",function(b){
      b.onclick = function(ev){ ev.stopPropagation(); say(b.dataset.say); };
    });
  }
  function foot(html){
    return '<div class="foot"><span class="score" id="spenttip"></span>'
      + '<span class="sp"></span>' + (html||"") + '</div>';
  }
  /* ---- the how-to box gets out of the way ----
     Andrew: "the yellow speech bubble containing the instructions for
     each tab/activity takes up screen real estate that reduces the fun
     and usefulness of the activity ... make it fade after 10 seconds
     and/or recede into a small clickable 'How to' pop-up when students
     need it." It does both. The box fades ten seconds after the rung
     opens and leaves a chip where it stood, and a rung whose box has
     folded once opens folded from then on, so a student who already
     knows the activity never waits for it again.

     The chip is in the same place whether the box is open or shut, so
     the control never moves. Folding frees real height, which the game
     measures, so a resize goes out when it happens.

     An observer rather than a line in draw(): several rungs rewrite
     main themselves when the student changes mode, and each of those
     is a fresh box that needs the same treatment. */
  var foldT = null;
  function howto(){
    var main = $("main"), box = main.querySelector(".rule");
    /* Putting the chip in is itself a change to main, so this runs again
       on its own chip. It has to leave on tiptoe: clearing the timer
       here would cancel the fold the first pass just set. */
    if (!box || main.querySelector(".howto")) return;
    clearTimeout(foldT); foldT = null;
    var id = STEPS[at].id;
    var chip = document.createElement("button");
    chip.className = "howto"; chip.type = "button";
    main.insertBefore(chip, box);
    function show(open){
      main.classList.toggle("folded", !open);
      chip.textContent = open ? "Hide" : "How to";
      chip.setAttribute("aria-expanded", open ? "true" : "false");
      window.dispatchEvent(new Event("resize"));
    }
    function fold(){
      clearTimeout(foldT); foldT = null;
      box.classList.remove("fading");
      if (!S.howto[id]){ S.howto[id] = 1; save(); }
      show(false);
    }
    chip.onclick = function(){
      if (main.classList.contains("folded")) show(true); else fold();
    };
    if (S.howto[id]){ show(false); return; }
    show(true);
    /* reduced motion gets the fold without the fade */
    var slow = window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    foldT = setTimeout(function(){
      if (slow){ fold(); return; }
      box.classList.add("fading");
      foldT = setTimeout(fold, 420);
    }, 10000);
  }
  new MutationObserver(howto).observe($("main"), { childList: true });

  function draw(){
    paintToggles(); paintSteps();
    /* The game runs on its own clock and its own audio. Leaving the rung
       has to stop both, or さくらさくら follows you round the app. */
    if (GAME){ GAME.stop(); GAME = null; }
    if (onResize){ window.removeEventListener("resize", onResize); onResize = null; }
    document.body.classList.remove("gamefull");
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
    wireSay();
  }

  /* ---- 1. ことば, in three passes ----
     Andrew: "if the words are new to a student, how are they supposed
     to learn them? Do they just guess until they get them right?" They
     did. A six-item match is self-solving — get three and the rest fall
     out by elimination — and matching only ever tests. A student
     meeting 生まれました for the first time had nowhere to learn it.

     So the rung has a meet before the test and a produce after it.

       みる    the word, its meaning, its sound, and the sentence from
               the article where it actually turns up. Nothing to get
               wrong. You press through.
       えらぶ  the match, but only over words already met, and the
               distractors come from the same group so "it must be the
               last one" stops working.
       かく    English on screen, type the Japanese. Nothing to eliminate.

     A word you get wrong comes back. A word you get right twice drops
     out. That is the whole of the spacing and it is enough at this
     scale. */
  var kPhase = "miru", kAt = 0, kPool = null;
  function wordsFor(p){
    return (K.vocab || []).filter(function(v){
      return v.group !== "led" || p.id === "led";
    });
  }
  /* where this word turns up in this person's article, so it is met in
     a sentence rather than on a flashcard */
  function inContext(p, v){
    var needle = plain(v.ja).replace(/[\s\u3000〜]/g, "");
    var best = null;
    p.paras.forEach(function(para){
      plain(para).split(/(?<=。)/).forEach(function(sv){
        if (!best && needle && sv.replace(/[\s\u3000]/g,"").indexOf(needle) >= 0) best = sv.trim();
      });
    });
    return best;
  }
  function kstate(v){
    return (S.wrote["k:" + v.ja] | 0);   /* 0 unseen, 1 met, 2+ right */
  }
  function kbump(v, n){
    S.wrote["k:" + v.ja] = Math.max(0, kstate(v) + n); save();
  }
  DRAW.kotoba = function(){
    var p = P(), all = wordsFor(p);
    var unmet = all.filter(function(v){ return kstate(v) < 1; });
    var met   = all.filter(function(v){ return kstate(v) >= 1 && kstate(v) < 3; });
    var known = all.filter(function(v){ return kstate(v) >= 3; });
    var tabs = [["miru","みる","Meet them", unmet.length],
                ["erabu","えらぶ","Match them", met.length],
                ["kaku","かく","Write them", met.length]];
    if (kPhase === "miru" && !unmet.length) kPhase = "erabu";
    $("main").innerHTML =
        '<div class="rule"><b>The words</b>Meet each word first, then match '
      + 'it, then write it. Guessing through a matching task does not teach '
      + 'you the word.</div>'
      + '<div class="row" style="margin-bottom:9px" id="ph">'
      + tabs.map(function(t){
          return '<button class="btn ' + (kPhase === t[0] ? "sm" : "ghost sm")
            + '" data-p="' + t[0] + '"><span style="font-family:var(--jp)">'
            + esc(t[1]) + '</span> <span class="en">' + esc(t[2]) + '</span>'
            + ' · ' + t[3] + '</button>';
        }).join("")
      + '</div><div class="work" id="kw"></div>'
      + foot('<span class="score">' + known.length + ' of ' + all.length
        + ' known</span>');
    each($("main"),"[data-p]",function(b){
      b.onclick = function(){ kPhase = b.dataset.p; kAt = 0; kPool = null; draw(); };
    });
    if (kPhase === "miru") return miru(p, unmet.length ? unmet : all);
    if (kPhase === "kaku") return kaku(p, met.length ? met : all);
    return erabu(p, met.length >= 4 ? met : all);
  };
  function miru(p, pool){
    kAt = kAt % pool.length;
    var v = pool[kAt], ctx = inContext(p, v);
    $("kw").innerHTML = '<div class="col" style="text-align:center">'
      + '<p class="para" style="font-size:30px;margin-bottom:4px">' + ruby(v.ja) + '</p>'
      + '<p style="font-size:19px;margin-bottom:10px">' + esc(v.en) + '</p>'
      + '<p>' + saybtn(v.ja) + '</p>'
      + (ctx ? '<div class="mark yes" style="text-align:left;margin-top:14px">'
          + '<b>in the article</b><span class="jp">' + ruby(ctx) + '</span> '
          + saybtn(ctx) + '</div>'
        : '<p class="hint" style="margin-top:14px">This one is on the unit '
          + 'list but does not appear in this article.</p>')
      + '<div class="row" style="justify-content:center;margin-top:16px">'
      + '<button class="btn" id="got">I have met it</button></div>'
      + '<p class="hint" style="margin-top:8px">' + (kAt+1) + ' of ' + pool.length
      + '</p></div>';
    wireSay();
    say(v.ja);
    $("got").onclick = function(){
      if (kstate(v) < 1) kbump(v, 1);
      kAt++;
      if (kAt >= pool.length){ kPhase = "erabu"; kAt = 0; }
      draw();
    };
  }
  function erabu(p, pool){
    /* six from one group where there are six, so elimination is not a
       strategy: all the distractors are the same kind of word */
    if (!kPool || !kPool.length){
      var byg = {};
      pool.forEach(function(v){ (byg[v.group] = byg[v.group] || []).push(v); });
      var big = Object.keys(byg).filter(function(g){ return byg[g].length >= 4; });
      kPool = big.length ? shuffle(byg[big[Math.floor(Math.random()*big.length)]]).slice(0,6)
                         : shuffle(pool).slice(0,6);
    }
    var set = kPool, chips = shuffle(set), slots = shuffle(set), left = set.length;
    var pick = null;
    $("kw").innerHTML = '<div class="col"><div id="slots"></div></div>';
    $("slots").innerHTML = slots.map(function(x){
      return '<div class="qrow" data-m="'+esc(x.ja)+'" style="border:2px dashed '
        + 'var(--line);border-radius:9px;padding:8px 11px;cursor:pointer">'
        + '<span class="en">'+esc(x.en)+'</span><span class="got"></span></div>';
    }).join("");
    var tray = document.createElement("div");
    tray.className = "row";
    tray.style.cssText = "flex-wrap:wrap;margin-top:10px";
    tray.innerHTML = chips.map(function(x,i){
      return '<button class="btn ghost sm" data-w="'+esc(x.ja)+'">'
        + (hasvoice(x.ja) ? (i+1) + ' ▶' : esc(plain(x.ja))) + '</button>';
    }).join("");
    $("kw").querySelector(".col").appendChild(tray);
    each($("kw"),"[data-w]",function(b){
      b.onclick = function(){
        say(b.dataset.w);
        each($("kw"),"[data-w]",function(x){ x.className = "btn ghost sm"; });
        b.className = "btn sm"; pick = b;
      };
    });
    each($("kw"),"[data-m]",function(slot){
      slot.onclick = function(){
        if (!pick || slot.dataset.got) return;
        var v = set.filter(function(x){ return x.ja === pick.dataset.w; })[0];
        if (slot.dataset.m === pick.dataset.w){
          slot.dataset.got = "1";
          slot.style.borderStyle = "solid"; slot.style.borderColor = "var(--ok)";
          slot.querySelector(".got").innerHTML = ' <span style="font-family:var(--jp);'
            + 'font-size:18px">' + ruby(v.ja) + '</span> ' + saybtn(v.ja);
          pick.remove(); pick = null; left--; award(1); kbump(v, 1); wireSay();
          if (!left){ kPool = null; done(); draw(); }
        } else {
          /* wrong: the word goes back to unmet, because a word you
             cannot pick is a word you have not met */
          kbump(v, -1);
          slot.style.borderColor = "var(--accent)";
          setTimeout(function(){ slot.style.borderColor = "var(--line)"; }, 600);
        }
      };
    });
  }
  function kaku(p, pool){
    kAt = kAt % pool.length;
    var v = pool[kAt];
    $("kw").innerHTML = '<div class="col" style="text-align:center">'
      + '<p style="font-size:22px;margin:18px 0 12px">' + esc(v.en) + '</p>'
      + '<div class="row"><input class="ans" id="kin" lang="ja" autocomplete="off"'
      + ' autocapitalize="off" spellcheck="false">'
      + '<button class="btn sm" id="kgo">Check</button></div>'
      + '<div id="kfb"></div>'
      + '<div class="row" style="justify-content:center;margin-top:12px">'
      + '<button class="btn ghost sm" id="khint">Show the first letter</button>'
      + '<button class="btn ghost sm" id="knext">Skip</button></div></div>';
    $("kin").focus();
    function check(){
      var got = ($("kin").value||"").replace(/[\s\u3000]/g,"");
      if (!got) return;
      var want = [plain(v.ja), kana(v.ja)].map(function(x){
        return x.replace(/[\s\u3000〜]/g,""); });
      if (want.indexOf(got) >= 0){
        award(2); kbump(v, 1);
        ninja($("kin"));
        $("kfb").innerHTML = '<div class="mark yes"><b>Yes</b><span class="jp">'
          + ruby(v.ja) + '</span> ' + saybtn(v.ja) + '</div>';
        wireSay();
        setTimeout(function(){ kAt++; draw(); }, 900);
      } else {
        kbump(v, -1);
        yokai($("kin"));
        $("kfb").innerHTML = '<div class="mark no"><b>Not yet</b>'
          + '<span class="jp">' + esc(got) + '</span> is not it. '
          + 'Go back to みる and meet it again.</div>';
      }
    }
    $("kgo").onclick = check;
    $("kin").onkeydown = function(ev){ if (ev.key === "Enter") check(); };
    $("khint").onclick = function(){
      spend(1, "first letter");
      $("kin").value = kana(v.ja).replace(/[\s\u3000〜]/g,"").slice(0,1);
      $("kin").focus();
      $("khint").disabled = true;
    };
    $("knext").onclick = function(){ kAt++; draw(); };
  }

  /* ---- 2. ぶんぽう ----
     Andrew's own list of the patterns this unit turns on, plus
     住んでいます, which is in all six articles and belongs with them.

     A pattern is explained once, shown in sentences taken out of the
     articles the student is about to read, and then practised. The
     practice is a gapfill, and the tile goes into the gap by drag or by
     two taps: a school iPad does not do HTML5 drag-and-drop at all and a
     mouse is clumsy at tapping twice, so both gestures run the same
     handler.

     The distractors are the forms the answer is confusable with: です
     against でした, に against で. A student who guesses is choosing
     between two tenses, not between a verb and a particle, so guessing
     gets them a coin toss and not a pass. */
  var gAt = 0;
  /* ---- practised, not finished ----
     This records that a gap has been answered right once, which is what
     the tick in the index and the count in the footer are for. It is NOT
     a reason to stop offering the exercise. The screen used to read this
     and hand the answer straight back: three patterns in, every gap a
     student returned to was already filled in and its tiles were gone,
     so the rung could be done once and never again. A pattern a student
     wants a second go at is the whole point of a grammar drill. */
  function gkey(g, i){ return "g:" + g.id + ":" + i; }
  function gdone(g){
    return (g.items || []).length > 0
      && (g.items || []).every(function(_, i){ return S.wrote[gkey(g, i)]; });
  }
  /* Drag with a pointer, or tap and tap. One handler for both: if the
     pointer never travelled, it was a tap. */
  function dragdrop(scope, onDrop){
    var ghost = null;
    function clearOver(){
      each(scope, "[data-gap]", function(g){ g.classList.remove("over"); });
    }
    each(scope, "[data-tile]", function(t){
      var held = false, x0 = 0, y0 = 0, moved = false;
      t.onpointerdown = function(ev){
        if (t.classList.contains("spent")) return;
        held = true; moved = false; x0 = ev.clientX; y0 = ev.clientY;
        try { t.setPointerCapture(ev.pointerId); } catch(e){}
      };
      t.onpointermove = function(ev){
        if (!held) return;
        if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
        if (!moved){
          moved = true;
          ghost = t.cloneNode(true);
          ghost.style.cssText += ";position:fixed;z-index:80;pointer-events:none;"
            + "margin:0;opacity:.92;box-shadow:0 5px 16px rgba(0,0,0,.28)";
          document.body.appendChild(ghost);
          t.style.opacity = ".35";
        }
        ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + "px";
        ghost.style.top  = (ev.clientY - ghost.offsetHeight / 2) + "px";
        var over = document.elementFromPoint(ev.clientX, ev.clientY);
        var gap = over && over.closest && over.closest("[data-gap]");
        clearOver();
        if (gap) gap.classList.add("over");
      };
      t.onpointerup = function(ev){
        if (!held) return;
        held = false;
        if (ghost){ ghost.remove(); ghost = null; }
        t.style.opacity = "";
        clearOver();
        if (moved){
          /* A near miss still counts. On a 320px screen the gap and its
             tiles only just fit together, and a drag let go beside the
             gap rather than on it is the commonest thing a finger does.
             Dropping anywhere in the item takes it to that item's gap,
             and a drop that lands nowhere leaves the tile armed so the
             gesture is not simply lost. */
          var over = document.elementFromPoint(ev.clientX, ev.clientY);
          var gap = over && over.closest && (over.closest("[data-gap]")
            || (over.closest("[data-it]")
                && over.closest("[data-it]").querySelector("[data-gap]")));
          if (gap) onDrop(t, gap);
          else t.classList.add("armed");
          return;
        }
        /* a tap arms the tile; the next tap on a gap drops it there */
        var was = t.classList.contains("armed");
        each(scope, "[data-tile]", function(x){ x.classList.remove("armed"); });
        if (!was) t.classList.add("armed");
      };
      t.onpointercancel = t.onpointerup;
    });
    each(scope, "[data-gap]", function(gap){
      gap.onclick = function(){
        var armed = scope.querySelector("[data-tile].armed");
        if (armed) onDrop(armed, gap);
      };
    });
  }
  DRAW.bunpou = function(){
    var G = K.grammar || [];
    if (!G.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    gAt = ((gAt % G.length) + G.length) % G.length;
    var g = G[gAt], finished = G.filter(gdone).length;
    $("main").innerHTML =
        '<div class="rule"><b>Grammar</b>Drag a tile into the gap, or tap the '
      + 'tile and then the gap. These ' + G.length + ' patterns build every '
      + 'sentence in the unit, and the examples come from the six '
      + 'articles.</div>'
      + '<div class="row gidx" id="gidx">'
      + G.map(function(x, i){
          return '<button data-g="' + i + '"' + (i === gAt ? ' aria-current="true"' : '')
            + (gdone(x) ? ' class="done"' : '') + '>' + ruby(x.pat)
            + (gdone(x) ? " ✓" : "") + '</button>';
        }).join("")
      + '</div>'
      + '<div class="work"><div class="col" id="gw"></div></div>'
      + foot('<span class="score"><b>' + finished + '</b> of ' + G.length
          + ' practised</span>'
        + '<button class="btn ghost sm" id="gprev">Back</button>'
        + '<button class="btn sm" id="gnext">Next pattern</button>');
    each($("gidx"), "[data-g]", function(b){
      b.onclick = function(){ gAt = +b.dataset.g; draw(); };
    });
    $("gprev").onclick = function(){ gAt--; draw(); };
    $("gnext").onclick = function(){ gAt++; draw(); };

    $("gw").innerHTML =
        '<p class="para" style="margin-bottom:2px">' + ruby(g.pat) + '</p>'
      + '<p style="font-size:17px;font-weight:700;margin-bottom:6px" class="en">'
      + esc(g.title_en) + '</p>'
      + '<div class="mark yes"><b>how it works</b>' + esc(g.rule) + '</div>'
      + '<div class="mark"><b>the shape</b><span class="jp">' + ruby(g.form)
      + '</span></div>'
      + '<h3 class="sub">In the articles</h3>'
      + (g.egs || []).map(function(e){
          return '<div class="qrow" style="margin-bottom:7px">'
            + '<div class="q">' + ruby(e.ja) + ' ' + saybtn(e.ja) + '</div>'
            + '<div class="en" style="font-size:14px;color:var(--muted)">'
            + esc(e.en) + (e.mine ? ' <i>(not from the articles: this one is '
              + 'here to show the contrast)</i>' : '') + '</div></div>';
        }).join("")
      + '<h3 class="sub">Now you</h3>'
      + '<div id="gits"></div>';

    /* Every gap starts empty and every tray starts full, whether or not
       this one has been answered before. A tick in the index says which
       patterns have been done; the exercise itself is always offered. */
    $("gits").innerHTML = (g.items || []).map(function(it, i){
      var parts = String(it.ja).split(/＿+/);
      return '<div class="qrow" data-it="' + i + '">'
        + '<div class="q">' + ruby(parts[0] || "")
        + '<span class="gap" data-gap="' + i + '">　</span>'
        + ruby(parts.slice(1).join("")) + '</div>'
        + '<div class="row" style="flex-wrap:wrap;margin-top:6px" data-tray="' + i
        + '">' + shuffle((it.options || []).slice()).map(function(o){
            return '<button class="tile" data-tile="' + esc(plain(o)) + '" data-for="'
              + i + '">' + ruby(o) + '</button>';
          }).join("") + '</div>'
        + '<div data-gfb="' + i + '"></div></div>';
    }).join("");

    dragdrop($("gits"), function(tile, gap){
      var i = +gap.dataset.gap, it = g.items[i];
      if (String(tile.dataset.for) !== String(i)) return;   /* another item's tile */
      if (gap.classList.contains("ok")) return;             /* already answered here */
      var fb = $("gits").querySelector('[data-gfb="' + i + '"]');
      if (tile.dataset.tile === plain(it.answer)){
        /* The points are for getting it right the first time. A second go
           at a pattern is welcome and free; it is not worth two more
           points, or the score becomes a measure of patience. */
        var first = !S.wrote[gkey(g, i)];
        S.wrote[gkey(g, i)] = 1; save();
        if (first) award(2);
        gap.innerHTML = ruby(it.answer);
        gap.classList.remove("bad"); gap.classList.add("ok");
        ninja(gap);
        each($("gits"), '[data-tray="' + i + '"] .tile', function(x){ x.remove(); });
        fb.innerHTML = '<div class="mark yes"><b>Yes</b><span class="jp">'
          + ruby(String(it.ja).replace(/＿+/, plain(it.answer))) + '</span></div>';
        wireSay();
        /* The tick and the count move without redrawing. A redraw here
           used to wipe the gaps the student had just filled, which on the
           last item of a pattern looked like the screen giving up. */
        if (gdone(g)){
          var tick = $("gidx").querySelector('[data-g="' + gAt + '"]');
          if (tick && !tick.classList.contains("done")){
            tick.classList.add("done");
            tick.innerHTML = ruby(g.pat) + " \u2714";
          }
          var sc = $("main").querySelector(".score b");
          if (sc) sc.textContent = G.filter(gdone).length;
          if (G.every(gdone) && !S.done["bunpou"]){
            S.done["bunpou"] = 1; save(); paintSteps();
          }
        }
      } else {
        gap.classList.add("bad");
        yokai(gap);
        tile.classList.remove("armed");
        setTimeout(function(){ gap.classList.remove("bad"); }, 700);
        fb.innerHTML = '<div class="mark no"><b>Not that one</b>'
          + 'Read the shape again: <span class="jp">' + ruby(g.form)
          + '</span></div>';
      }
    });
    wireSay();
    if (G.every(gdone) && !S.done["bunpou"]){
      S.done["bunpou"] = 1; save(); paintSteps();
    }
  };

  /* ---- 3. よむ ----
     The article, in a narrow column, with the support one tap away and
     costing a point. Tap a word for its meaning; tap a kana for the
     chart. Nothing is hidden and nothing is free. */
  function article(p, opts){
    opts = opts || {};
    var learnt = {};
    /* Punctuation is laid down BETWEEN spans and never inside one. Andrew
       spaces his articles for reading breath rather than for words and
       does not put a space after a full stop, so whitespace alone used to
       hand a student 生[う]まれました。とさに as one tappable thing. */
    var PUNCT = /[、。！？!?「」『』]/;
    return p.paras.map(function(para){
      var out = "", ul = false;
      /* sentence first, because ことが needs to see the rest of its own
         sentence before it can say which pattern it is. Split by hand
         rather than with a lookbehind: a school iPad may be on an iOS
         older than the one that learnt them, and a regex that throws
         takes the whole article with it. */
      var sentences = [], from = 0, c;
      for (c = 0; c < para.length; c++){
        if ("。！？".indexOf(para[c]) >= 0){
          sentences.push(para.slice(from, c + 1)); from = c + 1;
        }
      }
      if (from < para.length) sentences.push(para.slice(from));
      sentences.forEach(function(sentence){
        var i = 0;
        while (i < sentence.length){
          var ch = sentence[i];
          if (ch === "《"){ ul = true; out += '<span class="ul">'; i++; continue; }
          if (ch === "》"){ ul = false; out += '</span>'; i++; continue; }
          if (PUNCT.test(ch)){ out += '<span class="pt">' + esc(ch) + '</span>'; i++; continue; }
          if (/[\s　]/.test(ch)){ out += ch; i++; continue; }
          var m = /^[^\s　《》、。！？!?「」『』]+/.exec(sentence.slice(i));
          if (!m){ out += esc(ch); i++; continue; }
          out += span(m[0], sentence);
          i += m[0].length;
        }
      });
      if (ul) out += '</span>';
      return '<p class="para">' + out + '</p>';
    }).join("");

    /* One bit of text between two boundaries, drawn as what it actually
       is: a word, a word with its particle, a grammar ending, or nothing
       the page can name. Only the first three are lit. */
    function span(bit, sentence){
      if (lookup(bit)) return one(bit, "known", "w");
      /* です on its own is a whole span in three places */
      if (TAILW[plain(bit)] || PBY[plain(bit)]) return one(bit, "part", "p");
      /* A grammar ending is read before the pieces are: 話[はな]したり
         would otherwise come apart into 話[はな]し・たり and lose the
         pattern that is the point of it. */
      if (patternOf(bit, sentence)) return one(bit, "gram", "g");
      var cv = cover(bit);
      if (cv) return cv.map(function(piece){
        return piece.kind === "w" || piece.kind === "n"
          ? one(piece.raw, "known", "w")
          : one(piece.raw, "part", "p");
      }).join("");
      return one(bit, "", "w");
    }
    function one(text, cls, kind){
      return '<span class="w' + (cls ? " " + cls : "") + '" data-word="'
        + esc(text) + '" data-kind="' + kind + '">' + rubify(text, learnt) + '</span>';
    }
  }
  /* ---- tapping a word ----
     Four answers, and the span says in advance which one is coming: a
     lit word has a meaning, a dimmed particle has a job, a grammar
     ending has one of Andrew's rules behind it, and plain text has
     nothing and says so. A student should never tap hoping. */
  function wireArticle(scope){
    each(scope, "[data-word]", function(sp){
      sp.onclick = function(ev){
        ev.stopPropagation();
        var word = sp.dataset.word, kind = sp.dataset.kind;
        /* Tapping a single kana asks about that kana; tapping a word
           asks about the word. A student does one or the other and the
           page should not make them choose from a menu. */
        var bare = plain(word).replace(/[、。]/g,"");
        if (kind !== "p" && bare.length === 1 && /[ぁ-ヿ]/.test(bare)) return kanaChart(bare);
        each(scope, ".w.lit", function(x){ x.classList.remove("lit"); });
        sp.classList.add("lit");
        var tip = $("tip");
        if (!tip) return;
        if (kind === "p"){
          /* A particle is free. It is one character, it is the same
             character every time, and charging a point for it would
             teach a student to guess it rather than ask. */
          var pa = PBY[plain(word)] || TAILW[plain(word)];
          tip.innerHTML = '<div class="mark hm"><b>' + esc(plain(word)) + '</b>'
            + esc(pa ? pa.en : "a particle")
            + (pa && pa.note ? ' <i>' + esc(pa.note) + '</i>' : '') + '</div>';
          return;
        }
        var v = lookup(word);
        if (v){
          spend(1, "word meaning");
          tip.innerHTML = '<div class="mark yes"><b>' + esc(plain(v.ja)) + '</b>'
            + esc(v.en) + ' ' + saybtn(v.ja) + '</div>';
          wireSay();
          return;
        }
        var g = patternOf(word, word);
        if (!g){
          /* the sentence is not to hand here, so ask again with the
             paragraph the span sits in */
          var para = sp.closest(".para");
          g = patternOf(word, para ? para.textContent : "");
        }
        if (g){
          spend(1, "grammar shown");
          tip.innerHTML = '<div class="mark yes"><b>' + esc(plain(g.pat)) + '</b>'
            + esc(g.title_en) + '. ' + esc(g.form)
            + '<p>Open <b>ぶんぽう</b> for the rule and the practice.</p></div>';
          return;
        }
        /* Not on any list. Say so rather than inventing a gloss: a wrong
           meaning is worse than no meaning, and the old prefix guess was
           answering しょう来[らい] with "prize". */
        tip.innerHTML = '<div class="mark hm"><b>Not on the word list</b>'
          + esc(plain(word)) + ' is not one of the unit words. '
          + 'Tap a single kana for the chart, or ask your teacher.</div>';
      };
    });
  }
  /* ---- the portrait ----
     Andrew's idea, and a good one: six names on a page are six names,
     and a face makes them six people. The files live in art/ and each
     card in kiji.js names its own, so the page works with none of them,
     some of them, or all six. A file that is not there hides its own
     frame rather than leaving a broken-image icon on a classroom
     screen, which is the one way a missing picture could make the page
     look broken rather than plain.

     Not on だれですか, deliberately. That rung asks a student to tell six
     people apart by reading Japanese, and a portrait beside the clues
     turns a reading task into a picture-matching one. */
  function portrait(p, cls){
    var a = p.art;
    /* ready is false until the file is actually in art/. Naming a file
       that is not there would have every student's browser ask for six
       pictures that do not exist, on every page view, and answer itself
       with six 404s. The slot stays empty and silent until the picture
       exists. */
    if (!a || !a.file || !a.ready) return "";
    /* A caption only where the picture needs one. The LED article names
       three scientists and the picture is of one of them, so the page
       says which rather than letting one face stand for three. */
    /* The table gets its own square, cut to the face. Six faces sit at
       six different heights in six pictures, so one crop rule could not
       frame them all, and a 54px thumbnail has no business downloading a
       900px portrait six times over. The squares are 4KB each. */
    var file = (cls === "thumb" && a.thumb) ? a.thumb : a.file;
    return '<figure class="art ' + (cls || "") + '">'
      + '<img src="art/' + esc(file) + '" alt="' + esc(a.alt || "") + '"'
      + ' loading="lazy" decoding="async" data-art="' + esc(p.id) + '">'
      + (a.caption && cls !== "thumb"
          ? '<figcaption>' + esc(a.caption) + '</figcaption>' : "")
      + '</figure>';
  }
  /* A file that is not there takes its own frame with it. */
  document.addEventListener("error", function(ev){
    var t = ev.target;
    if (t && t.tagName === "IMG" && t.hasAttribute("data-art")){
      var f = t.closest("figure");
      if (f) f.remove();
    }
  }, true);

  DRAW.yomu = function(){
    var p = P();
    $("main").innerHTML =
        '<div class="rule"><b>Read it</b>Tap any word for its meaning, or a '
      + 'single kana for the kana chart. Each one costs 1 point, and you can '
      + 'use as many as you need. The paper asks you to translate the '
      + 'underlined parts.</div>'
      + '<div class="work"><div class="col">'
      + portrait(p, "wide")
      + '<p class="score" style="margin-bottom:8px">' + esc(p.name_en)
      + ' · <span class="en">' + esc(p.what_en) + '</span></p>'
      + article(p) + '</div></div>'
      + '<div id="tip"></div>'
      + foot('<button class="btn sm" id="read">I have read it</button>');
    wireArticle($("main"));
    $("read").onclick = function(){ award(3); done(); $("read").disabled = true; };
  };

  /* ---- 4. しつもん ----
     The paper's own questions, in the paper's own language. The marker
     looks for the content the answer turns on, never an exact string: a
     short Japanese answer has too many right forms for a match to be
     fair, and 大阪です and 大阪に住んでいます are both right.

     Where a question cannot be answered from the article at all —
     question 8 on Iwasaki asks what Mitsubishi makes today — it says so
     instead of marking a student wrong for not finding it. */
  function norm(s){
    return String(s||"").toLowerCase()
      .replace(/[\s　.,。、!?？！'"’”]/g,"");
  }
  function judge(q, got){
    var n = norm(got);
    if (!n) return null;
    if (q.note) return { kind:"hm", msg:"This one is not in the article. " + q.note };
    function hit(list){
      return (list||[]).some(function(k){ return n.indexOf(norm(k)) >= 0; });
    }
    var a = hit(q.key), b = !q.key2 || hit(q.key2);
    if (a && b) return { kind:"yes" };
    if (a || b) return { kind:"part", msg:"Half of it. The answer has two parts." };
    return { kind:"no" };
  }
  DRAW.toi = function(){
    var p = P(), qs = p.questions;
    $("main").innerHTML =
        '<div class="rule"><b>Questions</b>Answer each question in the '
      + 'language it asks you in, the way the paper does. Show the article '
      + 'if you need it: that costs 2 points.</div>'
      + '<div class="work"><div class="col" id="qs"></div></div>'
      + '<div id="tip"></div>'
      + foot('<span class="score" id="sc"></span>'
        + '<button class="btn ghost sm" id="peek">Show the article</button>'
        + '<button class="btn sm" id="chk">Check</button>');
    $("qs").innerHTML = qs.map(function(q,i){
      return '<div class="qrow"><div class="q'+(q.lang==="en"?" en":"")+'">'
        + (i+1) + '. ' + (q.lang==="ja" ? ruby(q.q) : esc(q.q))
        + ' ' + (q.lang==="ja" ? saybtn(q.q) : "") + '</div>'
        + '<input class="ans'+(q.lang==="en"?" en":"")+'" data-q="'+i+'"'
        + ' autocomplete="off" autocapitalize="off" spellcheck="false"'
        + (q.lang==="ja" ? ' lang="ja"' : '') + '>'
        + '<div class="fb" data-fb="'+i+'"></div></div>';
    }).join("");
    each($("main"),"[data-q]",function(inp){
      inp.value = (S.wrote[p.id+":"+inp.dataset.q] || "");
      inp.oninput = function(){ S.wrote[p.id+":"+inp.dataset.q] = inp.value; save(); };
      inp.onkeydown = function(ev){ if (ev.key === "Enter") check(); };
    });
    /* ---- what counts as finished ----
       A question carrying `note` is one the article does not answer, and
       judge() always returns "not in the article" for it, on purpose. It
       therefore can never be right, and counting it towards the total
       made いわさき's set impossible to finish: seven of eight for ever,
       no tick, and はやく locked behind it saying go and answer the
       questions you have already answered. A question the page will not
       mark is not a question the student has to get right. */
    var markable = qs.filter(function(q){ return !q.note; }).length;
    function check(){
      var right = 0, asked = 0;
      qs.forEach(function(q,i){
        var inp = $("main").querySelector('[data-q="'+i+'"]');
        var fb = $("main").querySelector('[data-fb="'+i+'"]');
        var v = judge(q, inp.value);
        if (!v){ fb.innerHTML = ""; return; }
        asked++;
        if (v.kind === "yes"){
          right++;
          fb.innerHTML = '<div class="mark yes"><b>Yes</b>'
            + (q.lang==="ja" ? '<span class="jp">'+ruby(q.model)+'</span> '+saybtn(q.model)
                             : esc(q.model)) + '</div>';
          if (!inp.dataset.paid){ inp.dataset.paid = "1"; award(2); }
        } else if (v.kind === "part"){
          fb.innerHTML = '<div class="mark hm"><b>Half</b>'+esc(v.msg)+'</div>';
        } else if (v.kind === "hm"){
          fb.innerHTML = '<div class="mark hm"><b>Not in the article</b>'
            + esc(v.msg) + ' ' + esc(q.model) + '</div>';
        } else {
          fb.innerHTML = '<div class="mark no"><b>Not yet</b>Look again. '
            + 'The answer is in the article.</div>';
        }
      });
      $("sc").innerHTML = '<b>'+right+'</b> of '+markable
        + (markable < qs.length ? ' <span class="hint">(one of them is not in '
           + 'the article, so it is not counted)</span>' : '');
      /* The whole page is marked in one press, so one creature for the
         lot rather than eight at once: the ninja when every question is
         right, the yokai when a student has answered and none of them
         is. Nothing in between, because a creature every time somebody
         checks their working halfway is a nag. */
      if (markable && right === markable){ ninja($("sc")); done(); }
      else if (asked && !right) yokai($("sc"));
      wireSay();
    }
    $("chk").onclick = check;
    $("peek").onclick = function(){
      spend(2, "article shown");
      $("tip").innerHTML = '<div class="work" style="max-height:34vh"><div class="col">'
        + article(p) + '</div></div>';
      wireArticle($("tip"));
      $("peek").disabled = true;
    };
    check();
  };

  /* ---- 5. やくす ----
     The underlined spans, which are the ones the paper asks for. There
     is no machine here that can mark a translation, and pretending
     otherwise would be the worst thing this app could do. So it takes
     the English, keeps it, and then shows the Japanese broken into its
     words with the unit meanings beside them, for the student to mark
     themselves against. */
  function spans(p){
    var out = [], re = /《([^》]*)》/g, m;
    p.paras.forEach(function(t){ while ((m = re.exec(t))) out.push(m[1]); });
    return out;
  }
  DRAW.yaku = function(){
    var p = P(), sp = spans(p);
    if (!sp.length){
      $("main").innerHTML = '<div class="rule"><b>Translate</b>The worksheet '
        + 'underlines nothing in this article, so there is nothing to '
        + 'translate here. The CAT asks for the Iwasaki passage.</div>'
        + '<div class="work"></div>' + foot("");
      return;
    }
    $("main").innerHTML =
        '<div class="rule"><b>Translate</b>The paper underlines these parts. '
      + 'Write your English, open the words, then mark it yourself. No app '
      + 'can mark a translation honestly, so this one does not try.</div>'
      + '<div class="work"><div class="col" id="sp"></div></div>'
      + foot('<button class="btn sm" id="dn">Done</button>');
    $("sp").innerHTML = sp.map(function(t,i){
      return '<div class="qrow"><div class="q">' + ruby(t) + ' ' + saybtn(t) + '</div>'
        + '<textarea class="ans en" rows="2" data-t="'+i+'"></textarea>'
        + '<div class="row" style="margin-top:5px">'
        + '<button class="btn ghost sm" data-open="'+i+'">Show the words</button></div>'
        + '<div data-words="'+i+'"></div></div>';
    }).join("");
    each($("main"),"[data-t]",function(ta){
      ta.value = S.wrote["t:"+p.id+":"+ta.dataset.t] || "";
      ta.oninput = function(){ S.wrote["t:"+p.id+":"+ta.dataset.t] = ta.value; save(); };
    });
    each($("main"),"[data-open]",function(b){
      b.onclick = function(){
        var i = b.dataset.open;
        spend(2, "words shown");
        var box = $("main").querySelector('[data-words="'+i+'"]');
        var seen = {}, rows = [];
        plain(sp[i]).split(/[\s　]+/).forEach(function(chunk){
          if (!chunk) return;
          var v = lookup(chunk);
          if (v && !seen[v.ja]){ seen[v.ja] = 1;
            rows.push('<tr><td class="jp">'+ruby(v.ja)+'</td><td>'+esc(v.en)+'</td></tr>'); }
        });
        box.innerHTML = rows.length
          ? '<table class="cmp" style="margin-top:6px">'+rows.join("")+'</table>'
          : '<div class="mark hm"><b>Nothing on the list</b>None of these are '
            + 'on the unit word list. Ask your teacher.</div>';
        b.disabled = true;
      };
    });
    $("dn").onclick = function(){ award(3); done(); $("dn").disabled = true; };
  };

  /* ---- 6. はやく ----
     The pacer. A line travels down the column at the speed of the
     student's own best run of this article, the way the invisible
     world-record line travels down a swimming pool.

     It only runs on the RE-READ, after the questions, and the rung says
     so. A student racing a line on a first read will skim, and a race
     you can win by not reading is a race that teaches skimming. On a
     text they have already understood, speed is fluency, which is the
     thing worth chasing.

     There is no record to beat the first time, so the first run just
     sets one. */
  DRAW.hayaku = function(){
    var p = P(), key = p.id;
    var best = S.best[key] || 0;
    var ready = !!S.done["toi:" + p.id];
    $("main").innerHTML =
        '<div class="rule"><b>Read it again</b>' + (ready
          ? 'Read the article again, as fast as you can still understand '
            + 'it. The line shows your best run. Beat it.'
          : 'Answer the questions first, then come back and race '
            + 'yourself.')
        + '</div>'
      + '<div class="work"><div class="col readwrap" id="rw">'
      + '<div class="pacer" id="pacer" style="display:none;top:0"></div>'
      + article(p) + '</div></div>'
      + '<div id="tip"></div>'
      + foot('<span class="score" id="sc"></span>'
        + '<button class="btn sm" id="go"' + (ready ? "" : " disabled") + '>'
        + (best ? "Race your record" : "Start") + '</button>'
        + '<button class="btn ghost sm" id="stop" disabled>Finished reading</button>');
    function show(){
      $("sc").innerHTML = best
        ? 'your record <b>' + (best/1000).toFixed(1) + 's</b>'
        : 'no record yet';
    }
    show();
    var t0 = 0, raf = 0;
    function stopRace(){
      if (raf) cancelAnimationFrame(raf);
      raf = 0; $("pacer").style.display = "none";
    }
    $("go").onclick = function(){
      t0 = performance.now();
      $("go").disabled = true; $("stop").disabled = false;
      $("tip").innerHTML = "";
      if (best){
        var wrap = $("rw"), h = wrap.scrollHeight;
        $("pacer").style.display = "";
        (function step(now){
          var k = Math.min(1, (now - t0) / best);
          $("pacer").style.top = (k * h) + "px";
          if (k < 1) raf = requestAnimationFrame(step);
          else stopRace();
        })(performance.now());
      }
    };
    $("stop").onclick = function(){
      var ms = performance.now() - t0;
      stopRace();
      $("go").disabled = false; $("stop").disabled = true;
      /* A time nobody could have read in is not a record. The floor is
         based on the length of this article, not on a guess. */
      var chars = p.paras.join("").replace(RUN,"$1").replace(/[\s　《》]/g,"").length;
      var floor = chars * 60;   /* 60ms a character is already very fast */
      if (ms < floor){
        $("tip").innerHTML = '<div class="mark hm"><b>Too fast to be reading</b>'
          + 'That is ' + (ms/1000).toFixed(1) + 's for ' + chars + ' characters. '
          + 'The record only counts if you actually read it.</div>';
        return;
      }
      var beat = best && ms < best;
      if (!best || ms < best){ S.best[key] = Math.round(ms); best = S.best[key]; save(); }
      show();
      award(beat ? 3 : 1);
      done();
      $("tip").innerHTML = '<div class="mark ' + (beat ? "yes" : "hm") + '">'
        + '<b>' + (beat ? "New record" : (best ? "Not this time" : "Record set")) + '</b>'
        + (ms/1000).toFixed(1) + 's for ' + chars + ' characters'
        + (beat ? '.' : (best ? ', against ' + (best/1000).toFixed(1) + 's.' : '.'))
        + '</div>';
    };
  };

  /* ---- 7. じぶんで ----
     The same frame, twelve slots, about themselves. This is the paper
     task: the CAT asks for a self-introduction built on the articles,
     and a student who can fill these twelve lines has written it.

     What the page checks is the GRAMMAR AND NOTHING ELSE. It can see
     whether a sentence has に and 生まれました in it. It cannot see
     whether the year is the right year, and no checker could, so it says
     so on every tick rather than letting a student think the machine has
     marked their Japanese. The model sentence is one of Andrew's own, out
     of the article named beside it, and showing it costs a point like
     every other support.

     At the end it puts the twelve lines together as one paragraph,
     because twelve ticked boxes do not look like a piece of writing and
     the paragraph does. */
  function fslot(i){ return (K.frame || [])[i]; }
  /* the slot credits a person, and an id is not a name */
  function whoName(id){
    var p = (K.people || []).filter(function(x){ return x.id === id; })[0];
    return p ? p.name_en.split(" ")[0] : id;
  }
  function fkey(i){ return "f:" + (fslot(i) || {}).id; }
  /* a need group is satisfied by any one of its spellings: 好きです and
     すきです are the same answer and both are on the worksheet */
  function fmiss(f, got){
    /* plain() first: what comes in here is sometimes a student's typing,
       which carries no furigana, and sometimes a line of tiles cut from
       an article, which does. 好[す]きです does not contain 好き. */
    var n = plain(String(got || "")).replace(/[\s　]/g, "");
    if (!n) return null;
    var missing = [];
    (f.need || []).forEach(function(grp){
      var ok = grp.some(function(k){
        return n.indexOf(plain(k).replace(/[\s　]/g, "")) >= 0;
      });
      if (!ok) missing.push(grp[0]);
    });
    return missing;
  }
  /* ---- ルーレット ----
     Andrew asked for a wheel here, and the thing this page is missing is
     not more vocabulary practice: ことば already spins words in its かく
     mode. What ぶんぽう cannot do is ask a student to PRODUCE a pattern.
     Choosing the right tile out of three is recognition, and a student
     can clear every pattern in the unit without once writing one.

     So the drum carries the thirteen patterns and the page names a
     person, and the student writes one sentence about that person using
     that pattern. Two things come off decks rather than at random: the
     pattern, so all thirteen come up before any comes up twice, and the
     person, so nobody writes six sentences about さかもと.

     What the marker checks is the SHAPE AND NOTHING ELSE, the same rule
     じぶんで runs on, and it says so every time. It can see whether a
     sentence has に and 生まれました in it. It cannot see whether the year
     is the right year, and no checker could, so it does not pretend to. */
  function gmiss(g, got){
    var missing = fmiss(g, got);
    if (missing === null || missing.length) return missing;
    /* A couple of the patterns are about a shape rather than a word:
       〜たり〜たり needs two of them, and しかし needs a sentence in front
       of it. Those carry a regular expression as well as a word list. */
    if (g.re && !new RegExp(g.re).test(plain(got))) return [g.pat];
    return [];
  }
  /* ---- a deck, so nothing comes up in the order it is written down ----
     Lifted from ひと. The wheel deals the pattern it is about to be
     thrown at, and a second deck deals the person, so all thirteen
     patterns and all six people come up before any of them comes up
     twice. */
  var DECKS = {};
  function deck(key, n){
    var d = DECKS[key];
    if (!d || d.n !== n){
      var order = [];
      for (var i = 0; i < n; i++) order.push(i);
      d = DECKS[key] = { n:n, order:shuffle(order), at:0, right:{} };
    }
    return d;
  }
  function dealt(key, n){ return deck(key, n).order[deck(key, n).at]; }
  function advance(key, n){
    var d = deck(key, n);
    d.at++;
    if (d.at >= d.n){
      var last = d.order[d.n - 1], tries = 0;
      do { d.order = shuffle(d.order); tries++; }
      while (d.n > 1 && d.order[0] === last && tries < 20);
      d.at = 0;
    }
  }

  var spinR = null, spunG = null;
  /* ---- the sentence bank ----
     Andrew: "I think the sentence formation will be more accessible if
     words/phrases are click and drag to form sentences."

     So the rung builds sentences out of tiles instead of asking for them
     to be typed, which on a school Windows machine with no Japanese
     keyboard installed was asking for something most students could not
     do at all. Free typing has not gone anywhere: じぶんで is still a
     blank box, and にゅうりょく now explains how to set the keyboard up.

     The sentences are Andrew's own, harvested from the six articles
     rather than written here, so the tiles a student arranges are from
     text they have already read. A pattern that needs two sentences to
     exist at all — しかし joins one to the next — gets the pair, because
     no single sentence can ever show it.

     Tiled at the phrase boundaries Andrew already spaces his text at,
     and also at every comma and full stop, because a tile holding
     食[た]べた後[あと]、しごとに is two ideas in one piece and hands over
     half the answer. */
  var BANK = null;
  function tilesOf(ja){
    return String(ja).replace(/。\s*$/, "").split(/[\s　]+/)
      .reduce(function(a, c){
        var buf = "";
        for (var i = 0; i < c.length; i++){
          buf += c[i];
          if ("、。".indexOf(c[i]) >= 0){ a.push(buf); buf = ""; }
        }
        if (buf) a.push(buf);
        return a;
      }, [])
      .filter(function(x){ return x.length; });
  }
  function sentenceBank(){
    if (BANK) return BANK;
    BANK = {};
    var singles = [], pairs = [];
    (K.people || []).forEach(function(p){
      (p.paras || []).forEach(function(para){
        var list = [], from = 0;
        for (var i = 0; i < para.length; i++){
          if ("。！？".indexOf(para[i]) >= 0){
            list.push(para.slice(from, i + 1).trim()); from = i + 1;
          }
        }
        list.forEach(function(sn, i){
          if (sn) singles.push({ who: p.id, ja: sn });
          if (i) pairs.push({ who: p.id, ja: list[i - 1] + " " + sn });
        });
      });
    });
    (K.grammar || []).forEach(function(g){
      var seen = {}, list = [];
      function take(from){
        from.forEach(function(c){
          var ja = c.ja;
          if (!ja) return;
          var miss = gmiss(g, ja);
          if (miss === null || miss.length) return;
          var t = tilesOf(ja);
          if (t.length < 3 || t.length > 9) return;
          var k = plain(ja).replace(/[\s　]/g, "");
          if (seen[k]) return;
          seen[k] = 1;
          list.push({ ja: ja, who: c.who || null, en: c.en || null });
        });
      }
      take(g.egs || []);
      take(singles);
      /* Pairs only where nothing single can carry the pattern, so an
         ordinary sentence is never glued to an unrelated neighbour. */
      if (!list.length) take(pairs);
      BANK[g.id] = list;
    });
    return BANK;
  }

  DRAW.roulette = function(){
    var BK = sentenceBank();
    /* Only patterns the articles can actually build. A pattern whose
       sentences all come apart into fewer than three tiles has nothing
       to drag, and landing on one would spend a spin on an apology. */
    var G = (K.grammar || []).filter(function(g){ return (BK[g.id] || []).length; });
    if (!G.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var done13 = G.filter(function(g){ return S.done["rl:" + g.id]; }).length;
    $("main").innerHTML =
        '<div class="rule"><b>Spin a pattern</b>Spin for a pattern, then build '
      + 'a sentence from the articles out of the tiles. Drag a tile onto the '
      + 'line, or tap the tile and then the line; tap a tile on the line to '
      + 'take it back. On <b>hard</b> there are more tiles than you need.</div>'
      + '<div class="work fit"><div class="col">'
      + '<div class="reel" id="reel">'
      + '<div class="rwin"><div class="rstrip"></div><div class="rmark"></div></div>'
      + '<button class="rspin" id="rgo" aria-label="Spin the wheel">'
      + '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
      + ' stroke="currentColor" stroke-width="2" stroke-linecap="round">'
      + '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3v4h-4"/>'
      + '</svg></button></div>'
      + '<div id="ask"></div></div></div>'
      + '<div id="rfb" class="fbslot"></div>'
      + foot('<span class="score"><b>' + done13 + '</b> of ' + G.length
          + ' built</span>'
        + '<button class="btn sm ' + (S.hard ? "ghost" : "") + '" id="lvEasy">easy</button>'
        + '<button class="btn sm ' + (S.hard ? "" : "ghost") + '" id="lvHard">hard</button>'
        + '<span id="rtip" class="hint">Flick the drum, or press the button.</span>');

    $("lvEasy").onclick = function(){ S.hard = false; save(); draw(); };
    $("lvHard").onclick = function(){ S.hard = true; save(); draw(); };

    spinR = REEL.mount($("reel"), G.map(function(g){
      return { id: g.id, html: ruby(g.pat), sub: esc(g.title_en) };
    }), function(it){ landed(it.id); });

    function clearAsk(){
      $("rfb").innerHTML = ""; $("ask").innerHTML = "";
      $("rtip").textContent = "Spinning…";
    }
    $("rgo").onclick = function(){
      SFX.wake();
      clearAsk();
      spinR.spinTo(G[dealt("rl", G.length)].id);
    };
    $("reel").querySelector(".rwin").addEventListener("pointerdown", clearAsk);

    function landed(id){
      var g = null;
      G.forEach(function(x){ if (x.id === id) g = x; });
      if (!g) return;
      spunG = g;
      if (G[dealt("rl", G.length)] === g) advance("rl", G.length);
      var bank = BK[g.id] || [];
      if (!bank.length){
        $("ask").innerHTML = '<div class="mark hm"><b>Nothing to build</b>'
          + 'No sentence in the articles carries this pattern in a form that '
          + 'comes apart into tiles. Spin again.</div>';
        return;
      }
      var bi = dealt("rb:" + g.id, bank.length);
      advance("rb:" + g.id, bank.length);
      var target = bank[bi];
      var want = tilesOf(target.ja);

      /* hard adds tiles from the OTHER sentences this pattern lives in,
         so a wrong choice is the same register and the same unit rather
         than obvious padding */
      var extra = [];
      if (S.hard){
        var pool = {};
        function feed(list, skip){
          list.forEach(function(b, i){
            if (i === skip) return;
            tilesOf(b.ja).forEach(function(t){ pool[t] = 1; });
          });
        }
        feed(bank, bi);
        /* A pattern the articles use once has no other sentence to lend
           tiles, and hard would then be easy. Top up from the rest of
           the unit: still this unit's words, in this unit's register. */
        if (Object.keys(pool).length < 8){
          shuffle(Object.keys(BK)).forEach(function(k){
            if (k !== g.id) feed(BK[k], -1);
          });
        }
        want.forEach(function(t){ delete pool[t]; });
        extra = shuffle(Object.keys(pool)).slice(0, 4);
      }
      var tray = shuffle(want.concat(extra));
      var line = [];

      var who = null;
      (K.people || []).forEach(function(p){ if (p.id === target.who) who = p; });

      $("rtip").textContent = "Build the sentence.";
      $("ask").setAttribute("data-pat", g.id);
      /* A test seam, like the one the game carries. The browser check has
         to know which sentence was dealt before it can build it, and
         reading the answer off the page is not possible by design.
         Reading it changes nothing. */
      window.KIJI_SPIN = { pattern: g.id, ja: target.ja, want: want.slice(),
                           extra: extra.slice() };
      $("ask").innerHTML =
          '<div class="mark yes"><b>the shape</b><span class="jp">'
        + ruby(g.form) + '</span></div>'
        + '<p class="ask-en">Build a sentence that uses <span class="jp">'
        + ruby(g.pat) + '</span>'
        + (who ? ', from <b>' + esc(plain(who.name_ja)) + '</b>’s article' : "")
        + (target.en ? '<br><i>' + esc(target.en) + '</i>' : "") + '</p>'
        + '<div class="sline" data-gap="line" id="rline"></div>'
        + '<div class="tiles" id="rtray"></div>'
        + '<div class="row" style="margin-top:7px">'
        + '<button class="btn sm" id="rchk">Check</button>'
        + '<button class="btn ghost sm" id="rclr">Start again</button>'
        + '<button class="btn ghost sm" id="reg">Show an example</button></div>';

      function paint(){
        $("rline").innerHTML = line.length
          ? line.map(function(t, i){
              return '<button class="tile" data-line="' + i + '">' + ruby(t) + '</button>';
            }).join("")
          : '<span class="hint">Drop the tiles here, in order.</span>';
        $("rtray").innerHTML = tray.map(function(t, i){
          return '<button class="tile" data-tile="' + esc(t) + '" data-tray="' + i
            + '">' + ruby(t) + '</button>';
        }).join("");
        each($("rline"), "[data-line]", function(b){
          b.onclick = function(){
            /* A tile already on the line comes off when it is tapped. But
               once the line has tiles in it, most of the line IS tiles,
               so a student with a tile armed and aiming at the line hits
               one of them and takes it off instead of putting theirs on.
               If something is armed the tap is a drop: do nothing here
               and let it bubble to the line, which appends it. */
            if ($("rtray").querySelector("[data-tile].armed")) return;
            tray.push(line.splice(+b.dataset.line, 1)[0]); paint();
          };
        });
        dragdrop($("ask"), function(tile){
          var i = +tile.dataset.tray;
          if (isNaN(i) || !tray[i]) return;
          line.push(tray.splice(i, 1)[0]); paint();
        });
      }
      paint();

      $("rclr").onclick = function(){
        tray = shuffle(want.concat(extra)); line = [];
        $("rfb").innerHTML = ""; paint();
      };
      $("reg").onclick = function(){
        spend(1, "example shown");
        var e = (g.egs || [])[0] || { ja:"", en:"" };
        $("rfb").innerHTML = '<div class="mark hm"><b>one from the articles</b>'
          + '<span class="jp">' + ruby(e.ja) + '</span> ' + saybtn(e.ja)
          + '<p>' + esc(e.en) + '</p></div>';
        $("reg").disabled = true;
        wireSay();
      };
      $("rchk").onclick = function(){
        if (!line.length){
          $("rfb").innerHTML = '<div class="mark hm"><b>Nothing there yet</b>'
            + 'Put some tiles on the line first.</div>';
          return;
        }
        var got = line.join(" ");
        var exact = line.join("") === want.join("");
        var missing = gmiss(g, got) || [];
        if (exact || !missing.length){
          if (!S.done["rl:" + g.id]){
            S.done["rl:" + g.id] = 1; award(exact ? 3 : 1); save();
          }
          ninja($("rfb"));
          $("rfb").innerHTML = exact
            ? '<div class="mark yes"><b>That is the sentence</b>'
              + '<span class="jp">' + ruby(target.ja) + '</span> '
              + saybtn(target.ja) + '</div>'
            : '<div class="mark hm"><b>The pattern is there</b>'
              + '<span class="jp">' + esc(plain(got)) + '</span>'
              + '<p>That is the grammar the wheel asked for, but it is not the '
              + 'sentence from the article, which is:</p><span class="jp">'
              + ruby(target.ja) + '</span> ' + saybtn(target.ja) + '</div>';
          var n = G.filter(function(x){ return S.done["rl:" + x.id]; }).length;
          var sc = $("main").querySelector(".score b");
          if (sc) sc.textContent = n;
          if (n === G.length && !S.done["roulette"]){
            S.done["roulette"] = 1; award(4); save(); paintSteps();
          }
          wireSay();
        } else {
          yokai($("rfb"));
          $("rfb").innerHTML = '<div class="mark no"><b>Not yet</b>'
            + 'There is no <span class="jp">' + esc(plain(missing[0]))
            + '</span> on the line'
            + (missing.length > 1 ? ', and ' + (missing.length - 1) + ' other part'
                + (missing.length > 2 ? 's are' : ' is') + ' missing too' : '')
            + '. The shape is <span class="jp">' + esc(plain(g.form))
            + '</span>.</div>';
        }
      };
    }
  };

  DRAW.jibun = function(){
    var F = K.frame || [];
    var okCount = F.filter(function(_, i){ return S.done["jb:" + i]; }).length;
    $("main").innerHTML =
        '<div class="rule"><b>Write your own</b>Write 12 sentences about '
      + 'yourself using patterns from the six historical-figure articles.'
      + '<br>The app checks grammar patterns only. Check the meaning, '
      + 'vocabulary and accuracy yourself or with your teacher.</div>'
      + '<div class="work"><div class="col" id="fw"></div></div>'
      + '<div id="tip"></div>'
      + foot('<span class="score" id="fsc"><b>' + okCount + '</b> of ' + F.length
          + '</span>'
        + '<button class="btn sm" id="fshow">Show my paragraph</button>');
    $("fw").innerHTML = F.map(function(f, i){
      return '<div class="qrow" data-f="' + i + '">'
        + '<div class="q en"><b>' + (i + 1) + '.</b> ' + esc(f.en) + '</div>'
        + '<p class="hint" style="margin-bottom:5px">' + esc(f.note) + '</p>'
        + '<input class="ans" lang="ja" data-fi="' + i + '" autocomplete="off"'
        + ' autocapitalize="off" spellcheck="false">'
        + '<div class="row" style="margin-top:5px;flex-wrap:wrap">'
        + '<button class="btn ghost sm" data-model="' + i + '">Show how '
        + esc(whoName(f.from)) + ' says it</button>'
        + '<button class="btn sm" data-check="' + i + '">Check the pattern</button>'
        + '</div><div data-ffb="' + i + '"></div></div>';
    }).join("");
    each($("fw"), "[data-fi]", function(inp){
      var i = +inp.dataset.fi;
      inp.value = S.wrote[fkey(i)] || "";
      inp.oninput = function(){ S.wrote[fkey(i)] = inp.value; save(); };
      inp.onkeydown = function(ev){ if (ev.key === "Enter") check(i); };
    });
    each($("fw"), "[data-model]", function(b){
      b.onclick = function(){
        var i = +b.dataset.model, f = F[i];
        spend(1, "model sentence");
        $("fw").querySelector('[data-ffb="' + i + '"]').innerHTML =
            '<div class="mark"><b>' + esc(whoName(f.from)) + '&rsquo;s own sentence</b>'
          + '<span class="jp">' + ruby(f.model) + '</span> ' + saybtn(f.model)
          + '</div>';
        b.disabled = true;
        wireSay();
      };
    });
    each($("fw"), "[data-check]", function(b){
      b.onclick = function(){ check(+b.dataset.check); };
    });
    function check(i){
      var f = F[i], fb = $("fw").querySelector('[data-ffb="' + i + '"]');
      var got = ($("fw").querySelector('[data-fi="' + i + '"]').value || "");
      var missing = fmiss(f, got);
      if (missing === null){
        fb.innerHTML = '<div class="mark hm"><b>Nothing there yet</b>Write the '
          + 'sentence first.</div>';
        return;
      }
      if (!missing.length){
        if (!S.done["jb:" + i]){ S.done["jb:" + i] = 1; award(3); save(); }
        ninja(fb);
        fb.innerHTML = '<div class="mark yes"><b>The pattern is there</b>'
          + '<span class="jp">' + esc(got) + '</span><br>'
          + 'That is the grammar this slot wanted. Whether it is true, and '
          + 'whether the words are the right words, this page cannot tell '
          + 'you.</div>';
        var okNow = F.filter(function(_, j){ return S.done["jb:" + j]; }).length;
        $("fsc").innerHTML = '<b>' + okNow + '</b> of ' + F.length;
        if (okNow === F.length && !S.done["jibun"]){
          S.done["jibun"] = 1; award(4); save(); paintSteps();
        }
      } else {
        yokai(fb);
        fb.innerHTML = '<div class="mark no"><b>Not yet</b>'
          + 'There is no <span class="jp">' + esc(plain(missing[0])) + '</span> '
          + 'in your sentence' + (missing.length > 1 ? ', and ' + (missing.length - 1)
              + ' other part' + (missing.length > 2 ? 's are' : ' is') + ' missing too'
            : '') + '. ' + esc(f.note) + '</div>';
      }
    }
    $("fshow").onclick = function(){
      var lines = F.map(function(f, i){ return (S.wrote[fkey(i)] || "").trim(); })
                   .filter(Boolean);
      if (!lines.length){
        $("tip").innerHTML = '<div class="mark hm"><b>Nothing to show</b>Write a '
          + 'sentence or two first.</div>';
        return;
      }
      var para = lines.join("");
      $("tip").innerHTML = '<div class="work fit" style="max-height:38vh">'
        + '<div class="col"><p class="para">' + esc(para) + '</p>'
        + '<p class="hint">' + lines.length + ' of ' + F.length
        + ' sentences, exactly as you typed them, uncorrected. This device '
        + 'is the only place they exist, so copy them or take a photo to '
        + 'keep them.</p>'
        + '<div class="row"><button class="btn ghost sm" id="fcopy">Copy it</button>'
        + '</div></div></div>';
      $("fcopy").onclick = function(){
        var ta = document.createElement("textarea");
        ta.value = para;
        ta.style.cssText = "position:fixed;left:-9999px";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch(e){}
        ta.remove();
        $("fcopy").textContent = "Copied";
      };
    };
  };

  /* ---- 8. くらべる ----
     All six at once. This is where the English videos land: a student
     who has watched the clip on Saigō has something to put in the row
     that reading alone would not give them. It is also the only screen
     that shows the frame as a frame, one slot per column, which is the
     thing that makes the sixth article easy once the first five are
     known. */
  /* ---- ことばキャッチ ----
     The same game as ひと, over the thirty topic kanji rather than the
     Year 8 word list, because recognising 住[す]んでいます at a glance is
     exactly what this unit's reading asks for and exactly what a falling
     word drills. The kanji fall bare: furigana on a falling word would
     make it a kana-reading game, which is a different and easier one. */
  var GAME = null, onResize = null;
  DRAW.katch = function(){
    var pool = (K.kanji || []).filter(function(w){ return w.en; });
    $("main").innerHTML =
        '<div class="rule"><b>Catch the kanji</b>Read the word above the '
      + 'screen, then catch the one falling word that means it. Let the '
      + 'others fall. Catch the ninja for a bonus and keep away from the '
      + '\u304b\u3055\u304a\u3070\u3051. Three mistakes and the game ends.</div>'
      + '<div class="work fit arcadewrap">'
      + '<div class="prompt" id="prompt"><span class="lab">CATCH</span>'
      + '<b id="promptw">—</b></div>'
      + '<canvas id="arc" class="arcade" width="320" height="200"'
      + ' tabindex="0" aria-label="Catch the kanji: a word game"></canvas>'
      + '</div>'
      + foot('<span class="score" id="asc"></span>'
        + '<span class="sp"></span>'
        + '<button class="btn sm" id="go">Start</button>');
    function tally(){
      var n = 0;
      pool.forEach(function(w){ if (S.done["catch:" + plain(w.ja)]) n++; });
      $("asc").innerHTML = '<b>' + n + '</b> of ' + pool.length + ' caught';
      return n;
    }
    tally();
    if (GAME) GAME.stop();
    GAME = arcade({
      canvas: $("arc"),
      words: pool,
      tune: K.tune,
      best: S.arcade || 0,
      /* The kanji stay here, because this rung exists to drill them:
         Andrew's kana rule would take 21 of the 30 topic kanji off the
         screen and leave a reading game with nothing to read. What the
         rule was really about is legibility, so the glyphs are bigger
         instead. Drawn at 15 pixels, 歴史 was a smudge and 上手 was
         unreadable; at 21 every one of the thirty is clear, with the
         pixels still as coarse as they were. */
      font: 21,
      label: function(w){ return plain(w.ja); },
      onPrompt: function(w){
        $("promptw").textContent = w ? w.en : "—";
        $("prompt").classList.toggle("live", !!w);
      },
      onCatch: function(w){
        var key = "catch:" + plain(w.ja);
        if (!S.done[key]){ S.done[key] = 1; award(1); save(); }
        if (tally() >= 10 && !S.done["katch"]){
          S.done["katch"] = 1; award(4); save(); paintSteps();
        }
      },
      onOver: function(score){
        if (score > (S.arcade || 0)){ S.arcade = score; save(); }
      }
    });
    document.body.classList.add("gamefull");
    /* ---- how big the screen can be ----
       The game is given exactly the room that is left once the rung bar,
       the question and the footer have taken theirs, and the width
       follows from that rather than the other way round. Measured, not
       guessed: the bars wrap differently at different widths and with
       different fonts, and a calc() with three estimated heights put the
       bat and the score behind the footer on half the sizes tried.

       The explanation above the screen is left where it is and scrolls
       away, which is what Andrew asked for: the wrap is made exactly one
       screenful tall, so scrolling to the end of it brings the whole
       game into view and stops. */
    function fitGame(){
      var cv = $("arc"); if (!cv) return;
      var main = document.querySelector("main");
      var wrap = $("arc").parentNode;
      var foot = main.querySelector(".foot");
      var pr = $("prompt");
      if (!main || !wrap || !foot) return;
      var footH = foot.offsetHeight;
      var promptH = pr ? pr.offsetHeight + 8 : 0;
      wrap.style.minHeight = Math.max(160, main.clientHeight - footH) + "px";
      /* 16px of slack: the screen has a 3px border on each side, the
         wrap has padding, and a measurement that lands exactly on the
         footer puts the bat under it. Being a few pixels small is
         invisible; being a few pixels large hides the score. */
      var room = main.clientHeight - footH - promptH - 16;
      var w = Math.min(wrap.clientWidth, 900, Math.max(220, room * 1.6));
      cv.style.width = Math.floor(w) + "px";
    }
    fitGame();
    onResize = fitGame;
    window.addEventListener("resize", fitGame);

    $("go").onclick = function(){
      $("arc").focus();
      /* put the whole screen in view: the explanation above it has done
         its job by the time anybody presses this */
      var box = $("prompt");
      if (box && box.scrollIntoView) box.scrollIntoView({ block: "start" });
      GAME.start();
    };
    /* the one test seam, as in ひと: a game loop cannot be driven
       through the DOM. Reading it changes nothing. */
    window.KIJI_GAME = GAME;
  };

  /* ---- にゅうりょく ----
     Andrew: "provide a new tab with a 'how to' to show students, working
     with Windows 11, how to install the Japanese Language package,
     toggle to hiragana input and get it working properly."

     The whole tutorial is on the page rather than behind a link, because
     a link is one more thing to be blocked by a school filter and one
     more thing to rot. The steps live in data/kiji.js so they can be
     corrected without touching code, and so can a video link if Andrew
     finds one he likes: nothing here invents a URL it has not seen.

     The last step is the useful one. A student who has followed four
     steps still does not know whether it worked, so the box reads what
     came out and says which of the three states they are in: still
     typing rōmaji, kana at last, or kana converted to kanji. */
  DRAW.nyuu = function(){
    var N = K.nyuuryoku || { steps: [] };
    $("main").innerHTML =
        '<div class="rule"><b>Japanese keyboard</b>' + esc(N.intro) + '</div>'
      + '<div class="work"><div class="howto">'
      + N.steps.map(function(st){
          return '<div class="hstep"><div class="hnum">' + st.n + '</div>'
            + '<div class="hbody"><h4>' + esc(st.head) + '</h4>'
            + '<ol>' + st.lines.map(function(l){
                return '<li>' + esc(l) + '</li>'; }).join("") + '</ol>'
            + ((st.keys || []).length
                ? '<p class="hkeys">' + st.keys.map(function(k){
                    return '<kbd>' + esc(k) + '</kbd>'; }).join('<span>+</span>')
                  + '</p>' : "")
            + (st.note ? '<p class="hnote">' + esc(st.note) + '</p>' : "")
            + '</div></div>';
        }).join("")
      + '<div class="hstep"><div class="hnum">✓</div><div class="hbody">'
      + '<h4>' + esc((N.check || {}).head || "Check it is working") + '</h4>'
      + '<p class="hnote" style="margin-top:0">' + esc((N.check || {}).say || "") + '</p>'
      + '<input id="nin" class="ans" type="text" autocomplete="off"'
      + ' autocapitalize="off" spellcheck="false" lang="ja"'
      + ' placeholder="ここにかいてください"'
      + ' aria-label="Type something in Japanese to check the keyboard">'
      + '<div id="nfb"></div></div></div>'
      + ((N.links || []).length
          ? '<div class="hstep"><div class="hnum">→</div><div class="hbody">'
            + '<h4>Read more, or watch somebody do it</h4>'
            + N.links.map(function(l){
                return '<p><a href="' + esc(l.url) + '" target="_blank"'
                  + ' rel="noopener">' + esc(l.name) + '</a><br>'
                  + '<span class="hnote">' + esc(l.what) + '</span></p>';
              }).join("") + '</div></div>'
          : "")
      + '</div></div>'
      + foot('<span class="hint">Nothing typed here is kept or sent.</span>');

    var inp = $("nin");
    inp.oninput = function(){
      var v = inp.value;
      if (!v){ $("nfb").innerHTML = ""; return; }
      var kana  = /[ぁ-ゟ゠-ヿ]/.test(v);
      var kanji = /[一-鿿]/.test(v);
      var latin = /[A-Za-z]/.test(v);
      var cls, head, say;
      if (kanji && kana){
        cls = "yes"; head = "That is it";
        say = "Kana and kanji together, which is what a Japanese keyboard "
            + "typing properly looks like.";
      } else if (kanji){
        cls = "yes"; head = "Kanji";
        say = "Converted. Press Space on a word to convert it and Enter to keep it.";
      } else if (kana && !latin){
        cls = "yes"; head = "Kana";
        say = "The keyboard is on and in hiragana. Press Space while a word is "
            + "underlined to turn it into kanji.";
      } else if (kana && latin){
        cls = "hm"; head = "Half and half";
        say = "Some kana, some English letters. The indicator near the clock "
            + "has been flipped between あ and A partway through.";
      } else {
        cls = "no"; head = "Still English letters";
        say = "Nothing has come out as kana. Either the taskbar still says ENG "
            + "(Windows key and Space) or it says JPN with an A beside it "
            + "(Alt and the ` key, above Tab).";
      }
      $("nfb").innerHTML = '<div class="mark ' + cls + '"><b>' + head + '</b>'
        + esc(say) + '</div>';
      if (cls === "yes" && !S.done["nyuu"]){
        S.done["nyuu"] = 1; award(2); save(); paintSteps();
      }
    };
  };

  DRAW.kuraberu = function(){
    var rows = K.people.map(function(p){
      var whole = p.paras.join("");
      function grab(re){ var m = re.exec(whole); return m ? m[1] : "—"; }
      return '<tr><td class="jp">' + portrait(p, "thumb") + ruby(p.name_ja) + '<br>'
        + '<span class="en" style="font-size:12px;color:var(--muted)">'
        + esc(p.name_en) + '</span></td>'
        + '<td>' + (p.born || "—") + '</td>'
        + '<td class="jp">' + esc(grab(/(?:今[^。]*は|今は)[^。]*?([ぁ-ヿ一-鿿]{2,6})に　?住/) ) + '</td>'
        + '<td class="en">' + esc(p.what_en) + '</td>'
        + '<td class="jp">' + (/しょう[来らい]/.test(whole)
            ? esc((/しょう(?:来\[らい\]|らい)、?([^。]{0,24})/.exec(whole)||[,"—"])[1]
                  .replace(RUN,"$1")) : "—") + '</td></tr>';
    }).join("");
    $("main").innerHTML =
        '<div class="rule"><b>All six</b>All six people in one frame. Fill '
      + 'the gaps from the videos as you watch them. Once you know the '
      + 'slots, a new person is only new facts in slots you already '
      + 'know.</div>'
      + '<div class="work"><table class="cmp"><tr>'
      + '<th>だれ</th><th>生まれた年</th><th>今どこ</th>'
      + '<th class="en">What they are</th><th>しょうらい</th></tr>'
      + rows + '</table>'
      + '<p class="hint" style="margin-top:10px">The last two columns are '
      + 'pulled out of the articles automatically, so check them against the '
      + 'text rather than trusting them.</p>'
      + '<h3 class="sub">The videos</h3>'
      + '<p class="hint">English clips, one a person. They open on YouTube in '
      + 'a new tab: nothing is embedded in this page, so the page itself stays '
      + 'fast and makes no requests of its own. Watch one, then come back and '
      + 'fill its row above.</p>'
      + '<div id="vids"></div>'
      + '</div>'
      + foot('<button class="btn sm" id="dn">Done</button>');
    /* The videos are links, never embeds, and the clip with questions
       against it gets them as a written task: they are the ones the
       class works through on paper, so the answers stay on the device
       and go nowhere. */
    var byp = {};
    K.people.forEach(function(p){ byp[p.id] = p; });
    $("vids").innerHTML = (K.videos || []).map(function(v, i){
      var p = byp[v.person] || {};
      return '<div class="qrow" style="margin-bottom:9px">'
        + '<a class="vid" href="' + esc(v.url) + '" target="_blank" rel="noopener">'
        + '<span class="jp" style="font-family:var(--jp)">'
        + esc(plain(p.name_ja || v.person)) + '</span> &middot; ' + esc(v.title)
        + ' &nearr;</a>'
        + ((v.questions || []).length
            ? '<button class="btn ghost sm" data-vq="' + i + '">'
              + (v.questions.length) + ' questions on this one</button>'
              + '<div data-vqb="' + i + '"></div>'
            : '<span class="hint">No question sheet for this one yet.</span>')
        + '</div>';
    }).join("");
    each($("vids"), "[data-vq]", function(b){
      b.onclick = function(){
        var i = +b.dataset.vq, v = K.videos[i];
        var box = $("vids").querySelector('[data-vqb="' + i + '"]');
        if (box.innerHTML){ box.innerHTML = ""; return; }
        box.innerHTML = '<ol style="margin:7px 0 0 20px">'
          + v.questions.map(function(q, j){
              return '<li style="margin-bottom:8px"><div class="en" '
                + 'style="font-size:14.5px">' + esc(q) + '</div>'
                + '<textarea class="ans en" rows="2" data-vqa="' + i + ':' + j
                + '"></textarea></li>';
            }).join("")
          + '</ol><p class="hint">The timestamps say where in the clip to '
          + 'listen. Your answers stay on this device and are sent nowhere.</p>';
        each(box, "[data-vqa]", function(ta){
          var key = "v:" + ta.dataset.vqa;
          ta.value = S.wrote[key] || "";
          ta.oninput = function(){ S.wrote[key] = ta.value; save(); };
        });
      };
    });
    $("dn").onclick = function(){ S.done["kuraberu"] = 1; award(2); save();
      paintSteps(); $("dn").disabled = true; };
  };

  paintToggles();
  draw();
})();
