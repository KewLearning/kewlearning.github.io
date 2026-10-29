/* app.js — メガセンテンス. Unit 9, Year 7.

   One sentence, six parts, and every tab is a different way at it:

     〔day〕に　〔who〕は　〔who with〕と　〔transport〕で　〔place〕に　行きます。

   The frame is Andrew's own, lifted from question 6 of the 2025 test.
   The games sit on the left of the tab bar and the grammar and vocabulary
   on the right, which is his order: a Year 7 class that has just met the
   frame should arrive at it through a game.

   The shell, the drum, the arcade and the drag are ported from ひと and
   れきしの人 rather than rewritten, so a thumb that works in one works in
   all three.

   No romaji anywhere. Andrew: "the current cohort has become reliant on
   it." Where a student cannot read a word yet, the English flips up, and
   that costs a point rather than being free. */
"use strict";
(function(){
  var M = window.MEGA, CLIPS = (window.MEGA_AUDIO || {}).clips || {};
  var W = M.words, SLOTS = M.slots;
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }
  function each(scope, sel, fn){
    Array.prototype.forEach.call(scope.querySelectorAll(sel), fn);
  }

  /* 漢字[かんじ] in, ruby out. plain() keeps the kanji, kana() takes the
     reading: the marker needs both, because a student may type either. */
  var RUN = /([一-鿿々]+)\[([ぁ-ゟー]+)\]/g;
  function ruby(t){
    return esc(String(t || "")).replace(RUN, function(_, k, r){
      return "<ruby>" + k + "<rt>" + r + "</rt></ruby>";
    });
  }
  function plain(t){ return String(t || "").replace(RUN, "$1"); }
  function kana(t){ return String(t || "").replace(RUN, "$2"); }

  /* ---- the voice ---- */
  var SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYA"
              + "AESsAAACABAAZGF0YQAAAAA=";
  var el0 = null, woken = false;
  function sound(){ if (!el0){ el0 = new Audio(); el0.preload = "auto"; } return el0; }
  function wake(){
    if (woken) return; woken = true;
    var a = sound();
    try {
      a.src = SILENCE; a.muted = true;
      var r = a.play();
      if (r && r.then) r.then(function(){ try { a.pause(); } catch(e){} a.muted = false; })
                        .catch(function(){ a.muted = false; });
      else { try { a.pause(); } catch(e){} a.muted = false; }
    } catch (e){ a.muted = false; }
  }
  ["pointerdown","touchstart","keydown"].forEach(function(ev){
    document.addEventListener(ev, wake, { capture:true, once:true });
  });
  /* ---- は as わ, へ as え ----
     The topic particle は is said わ, and a recorded voice does not always
     work that out: in the oral exam app 高校生は came back with a HA in the
     middle of it. Which は is the particle is not guessed. The Japanese
     here is spaced at the phrase boundaries, so a は that ENDS one of those
     phrases is the particle, and ではなく is the one shape where it sits
     inside a phrase instead. That matters more than it sounds: はいています
     and はしります begin with a は that has to stay one, and a blanket swap
     would have wrecked both.

     Only the sound changes. は is still は everywhere a student can see it. */
  var CHUNKS = /[^\s\u3000、。！？!?「」『』]+/g;
  function particles(t){
    return String(t).replace(CHUNKS, function(c){
      c = c.replace(/では(?=[なあ])/g, "でわ");
      if (/は$/.test(c)) return c.slice(0, -1) + "わ";
      if (/へ$/.test(c)) return c.slice(0, -1) + "え";
      return c;
    });
  }
  /* ---- a word is not a phrase ----
     Andrew: "母 in the kanji tab is being read out as はわ not 2x は."
     The は→わ rule is about the particle, and a particle is what
     follows a word inside a sentence. はは is a word that happens to
     end in は, and running the sentence rule over it turns a mother
     into a topic marker.

     So a line can be asked for in two ways. A phrase keeps the rule,
     because わたしは really is said わたしわ. A word on its own is
     left exactly as it is written. The recorder and the sanity check
     know the same two ways, or the keys stop matching and the page
     goes quiet. */
  function speakable(t, lex){
    return (lex ? plain(t) : particles(plain(t))).replace(/[\s　]+/g, "");
  }
  /* onEnd is how the きせかえ step plays a whole outfit: one line, then
     the next when the first has finished. */
  function say(text, onEnd, lex){
    /* a key that is already a key is taken as it stands, which is how
       the ▶ buttons work: they carry the resolved key, and resolving
       it twice would put the rule through a second time */
    var clip = CLIPS[text] || CLIPS[speakable(text, lex)];
    var a = sound();
    try { a.pause(); } catch (e){}
    a.onended = null;
    if (!clip) return false;
    if (onEnd) a.onended = onEnd;
    a.src = "audio/" + clip;
    /* After the src and not before: changing the source resets the rate
       on Safari, which is most of the phones this runs on. */
    try { a.playbackRate = S.rate; } catch (e){}
    var r = a.play();
    if (r && r.catch) r.catch(function(){});
    return true;
  }
  /* ---- a sentence nobody recorded ----
     The eight sentences in the unit have a clip each. A sentence a
     student builds out of the palette is one of about half a million,
     so it is said out of the pieces that were recorded instead.

     Andrew, on the first way of doing that: "the voice that reads it
     does not read it smoothly. It's a bit stop and start." It was.
     Each clip arrives with silence recorded either side of the words,
     and playing them one after another on the ended event added a gap
     of its own on top, so five words came out as five announcements.

     So the parts are decoded, the silence at each end is measured and
     cut, and the pieces are scheduled on the audio clock one after the
     other with the join a speaker would make and nothing more. The
     clock is the point: a note scheduled for 1.284 seconds starts at
     1.284 seconds, where an ended event starts whenever the browser
     gets round to it.

     sayParts is the fallback, for a machine where the clips cannot be
     fetched and decoded (opening the page from a memory stick does
     that, since a file:// page may not fetch its own files). */
  function sayParts(list, i){
    i = i || 0;
    if (i >= list.length) return;
    var more = function(){ setTimeout(function(){ sayParts(list, i + 1); }, 90); };
    if (!say(list[i], more)) more();
  }
  var BUFS = {};
  function clipBuf(file, ctx){
    if (BUFS[file]) return BUFS[file];
    BUFS[file] = fetch("audio/" + file)
      .then(function(r){ return r.arrayBuffer(); })
      .then(function(b){
        return new Promise(function(ok, no){
          /* the callback form as well as the promise: Safari still
             answers the old one */
          var out = ctx.decodeAudioData(b, ok, no);
          if (out && out.then) out.then(ok, no);
        });
      })
      .then(function(buf){
        var d = buf.getChannelData(0), n = d.length, i = 0, j = n - 1;
        var TH = 0.006;                /* anything quieter is the room */
        while (i < n && Math.abs(d[i]) < TH) i++;
        while (j > i && Math.abs(d[j]) < TH) j--;
        /* a little air either side, so the first consonant is not
           shaved off and the last vowel is allowed to stop */
        i = Math.max(0, i - Math.round(buf.sampleRate * 0.02));
        j = Math.min(n - 1, j + Math.round(buf.sampleRate * 0.03));
        return { buf: buf, from: i / buf.sampleRate,
                 dur: Math.max(0.08, (j - i) / buf.sampleRate),
                 whole: buf.duration };
      });
    return BUFS[file];
  }
  /* the gap between one phrase and the next: enough to hear the join,
     far less than the silence the recordings carry */
  var JOIN = 0.055;
  function sayLine(texts, after){
    /* a sentence the unit does have a recording of is simply played */
    var whole = texts.join("");
    if (CLIPS[speakable(whole)]) return say(whole, after);
    var ctx = null;
    try { ctx = CLICK.wake(); } catch (e){}
    var files = texts.map(function(t){ return CLIPS[speakable(t)]; });
    if (!ctx || !window.fetch || files.some(function(f){ return !f; })){
      sayParts(texts);
      return false;
    }
    hush();
    Promise.all(files.map(function(f){ return clipBuf(f, ctx); }))
      .then(function(list){
        var rate = S.rate || 1, at = ctx.currentTime + 0.05, plan = [];
        list.forEach(function(x, i){
          var src = ctx.createBufferSource();
          src.buffer = x.buf;
          try { src.playbackRate.value = rate; } catch (e){}
          src.connect(ctx.destination);
          src.start(at, x.from, x.dur);
          plan.push({ at: +at.toFixed(3), dur: +(x.dur / rate).toFixed(3),
                      cut: +(x.whole - x.dur).toFixed(3) });
          at += x.dur / rate + (i === list.length - 1 ? 0 : JOIN);
          if (i === list.length - 1 && after) src.onended = after;
        });
        /* a seam for the check, which cannot listen: it reads the plan
           and adds up the gaps. Reading it changes nothing. */
        window.MEGA_SAID = { parts: texts.slice(), plan: plan, join: JOIN };
      })
      .catch(function(){ sayParts(texts); });
    return true;
  }
  function hush(){
    var a = sound();
    a.onended = null;
    try { a.pause(); } catch (e){}
  }
  document.body.classList.toggle("hasvoice", !!Object.keys(CLIPS).length);
  function saybtn(text, lex){
    return '<button class="say" data-say="' + esc(speakable(text, lex))
         + '" aria-label="Listen">▶</button>';
  }

  /* ---- what the device remembers, on this device only ---- */
  var KEY = "mega-v1";
  var S = { furi:true, en:true, sfx:true, rate:1,
            lvl:"pic", free:true,
            pts:0, spent:0, best:0, done:{}, won:{}, wrote:{}, howto:{} };
  try { var raw = localStorage.getItem(KEY); if (raw){
    var o = JSON.parse(raw); for (var k in S) if (o[k] !== undefined) S[k] = o[k];
  } } catch (e){}
  var saveT = null;
  function write(){
    clearTimeout(saveT); saveT = null;
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e){}
  }
  function save(){ clearTimeout(saveT); saveT = setTimeout(write, 200); }
  /* The write waits 200ms so that typing does not hit localStorage on
     every keystroke. That was harmless when the only thing at stake was
     a tick; with a score on the page it means a student who closes the
     tab the moment the number moves loses the point they just earned.
     So the wait is cut short on the way out. pagehide fires on a real
     navigation and visibilitychange is the one an iPad sends when the
     app is swiped away, so both are listened for. */
  window.addEventListener("pagehide", write);
  document.addEventListener("visibilitychange", function(){
    if (document.visibilityState === "hidden") write();
  });
  function paintToggles(){
    /* Twenty-five devices groaning at once is a classroom problem, so
       the noise has a switch. It governs the drum tick as well. */
    $("rateLabel").textContent = "\u00d7" + S.rate;
    $("rateBtn").classList.toggle("off", S.rate !== 1);
    $("sfxBtn").classList.toggle("off", !S.sfx);
    $("sfxBtn").setAttribute("aria-pressed", S.sfx ? "true" : "false");
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("noen", !S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
    $("ptsn").textContent = S.pts;
    $("pts").title = S.spent
      ? S.pts + " points. " + S.spent + " spent on support."
      : S.pts + " points, nothing spent on support yet.";
  }

  /* ---- the score ----
     The same rules as れきしの人, so a student who has used that app
     already knows this one: a point is paid for the first time an item
     is answered right and never again, every support costs, and nothing
     is ever locked. Points only leave through spend().

     Awarding once per item is the whole of it. The steps here deal from
     a deck and run forever, so a score that counted every right answer
     would measure patience and not Japanese: the fastest way to the top
     would be to answer the same six words all lesson.

     NOTHING IS RECORDED AND NOTHING IS SENT. The score lives in this
     browser. Save writes a line of text they can screenshot. */
  var tipT = null;
  function flash(cls, text){
    var t = $("ptstip");
    if (!t) return;
    t.className = cls;
    t.textContent = text;
    clearTimeout(tipT);
    tipT = setTimeout(function(){ t.textContent = ""; }, 4000);
  }
  function award(n, why){
    S.pts += n; save(); paintToggles();
    flash("up", "+" + n + (why ? " " + why : ""));
  }
  function spend(n, why){
    S.pts = Math.max(0, S.pts - n); S.spent += n; save(); paintToggles();
    flash("down", "\u2212" + n + " " + why);
  }
  /* Paid once, on the first time this exact item goes right. The ledger
     is saved, so a reload does not hand the same points over again. */
  function first(key, n, why){
    if (S.won[key]) return false;
    S.won[key] = 1; award(n, why); return true;
  }
  function once(key, n, why){
    if (S.won[key]) return false;
    S.won[key] = 1; spend(n, why); return true;
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; paintToggles(); save(); };
  $("enBtn").onclick = function(){ S.en = !S.en; paintToggles(); save(); };
  /* the footer's help line and a mark's translation arrive after the
     tab is drawn, so the button is asked again when they do */
  new MutationObserver(function(){ paintEn(); })
    .observe(document.getElementById("main"), { childList: true, subtree: true });
  /* Three speeds, in the bar rather than a settings page, because 0.7 is
     how you catch a word you missed at full speed and it gets reached for
     many times in a sitting. The recordings are one fixed voice, so the
     speed is the only thing about them left worth changing. */
  var RATES = [0.7, 1, 1.2];
  $("rateBtn").onclick = function(){
    S.rate = RATES[(RATES.indexOf(S.rate) + 1) % RATES.length] || 1;
    save(); paintToggles();
    /* Say something at the new speed, or the button is a number that
       changes and nothing else. It used to say whichever word happened
       to sit first in the list, which told a student the speed had
       changed but not what the change was for. はなすスピード names the
       thing it is demonstrating, and it is the same line in れきしの人
       and the oral exam app, so the button behaves the same way
       wherever a student meets it. */
    var line = ((W.ui || [])[0] || {}).ja;
    if (line) say(line);
  };
  $("sfxBtn").onclick = function(){
    S.sfx = !S.sfx; save(); paintToggles();
    if (S.sfx) CLICK.whoosh();          /* so you can hear what you turned on */
  };
  $("resetBtn").onclick = function(){
    if (!confirm("Clear your score, your ticks and anything typed on this device?")) return;
    S.pts = 0; S.spent = 0; S.best = 0; S.done = {}; S.won = {}; S.wrote = {};
    save(); draw();
  };
  /* Nothing is recorded anywhere, so the only way to show somebody is to
     take it with you. A line of text they can screenshot or paste. */
  $("saveBtn").onclick = function(){
    var rungs = 0;
    STEPS.forEach(function(st){ if (S.done[st.id]) rungs++; });
    var line = "\u3072\u3068 \u00b7 " + S.pts + " points"
      + (S.spent ? " (" + S.spent + " spent on support)" : " with no support used")
      + " \u00b7 " + rungs + " of " + STEPS.length + " steps done"
      + " \u00b7 " + new Date().toLocaleDateString("en-AU");
    var ta = document.createElement("textarea");
    ta.value = line;
    ta.style.cssText = "position:fixed;inset:auto 10px 10px 10px;z-index:90;"
      + "height:72px;font-size:15px;padding:9px;border:2px solid #16375e;border-radius:9px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e){}
    alert("Copied, and shown at the bottom of the screen so you can screenshot it:\n\n"
      + line + "\n\nNothing is sent anywhere. This is the only record there is.");
    setTimeout(function(){ ta.remove(); }, 20000);
  };

  function shuffle(a){
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }


  /* ================= the drum, and the creatures =================
     Both lifted from the oral examination app, which is where the drum
     was written and tuned. Nothing here is a second implementation: the
     physics, the tick and the reduced-motion path are the same code, so
     a fix in one is a fix the other should get too.

     Why a drum and not a Wheel of Fortune: on a wheel the labels sit at
     every angle and shrink to fit a wedge, which is the wrong thing to
     do to words a student is still learning to read. On a drum they
     stay horizontal and full size. */
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
        CLICK.ratchet(speed, 2 * H);
      }
      function done(){
        CLICK.clunk();
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

  var CLICK = (function(){
    var ctx = null, noise = null, hiss = null;
    function build(){
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      var n = Math.floor(ctx.sampleRate * 0.06);
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
    /* one tap, one click: the UI tick, not the wheel */
    function play(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        clack(c.currentTime + 0.004, 0.26);
      } catch (e){}
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
    /* ---- the warble ----
       The かさおばけ's voice: two detuned triangles sliding down with a
       slow wobble on top and everything above 1400Hz taken off.
       Triangles rather than saws, because a saw at that pitch is a
       horror film and this is a Year 8 classroom. Lifted from れきしの人,
       where the same yokai lives, so the two pages sound like one suite. */
    function warble(){
      if (!S.sfx) return;
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
    return { play: play, ratchet: ratchet, clunk: clunk, wake: wakeAudio,
             whoosh: whoosh, warble: warble, slurp: slurp, buzz: buzz,
             boom: boom, bonus: bonus, sadtrombone: sadtrombone,
             ctx: function(){ return ctx; } };
  })();
  /* One creature at a time. Answer two things quickly and the first one
     is still drifting up the screen when the second arrives, which leaves
     a ninja and a かさおばけ side by side and no way to tell which answer
     either of them is about. */
  function clearCreatures(){
    var old = document.querySelectorAll(".ninj,.yoka");
    for (var i = 0; i < old.length; i++) old[i].remove();
  }

  /* Neither creature checks for reduced motion any more. It used to
     return before either was drawn, which is why Andrew never saw one:
     a device with that setting on got the sound and nothing else. The
     setting is answered in the stylesheet instead, where the pair fade
     in place rather than crossing the screen. */
  /* ---- the ninja ----
     The かさおばけ needed an opposite. A ninja crosses rather than rises,
     and is gone in half the time the かさおばけ takes: right is
     acknowledged and then got out of the way of, which is the right
     proportion when being right is the thing you want to be unremarkable
     and repeatable.

     Same guards as the かさおばけ. It cannot be tapped, it never covers the
     feedback, and reduced motion gets the sound without the dash. */
  var nLast = 0;
  function ninja(near){
    CLICK.whoosh();
    var now = Date.now();
    if (now - nLast < 420) return;
    nLast = now;
    clearCreatures();
    var box = document.createElement("div");
    box.className = "ninj";
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top + r.height / 2 - 26 : innerHeight * 0.5) + "px";
    box.innerHTML =
        '<svg viewBox="0 0 64 52" width="64" height="52">'
      /* the scarf, trailing behind the direction of travel */
      + '<path d="M30 16 q-12 -4 -24 2 q10 1 14 4 q-9 1 -13 5 q12 -1 21 -3 z"'
      + ' fill="#b23a3a" opacity=".92"/>'
      /* a body folded forward, mid-dash */
      + '<path d="M28 18 q12 -3 19 6 q4 7 -3 11 q-9 5 -17 -1 q-6 -5 1 -16 z"'
      + ' fill="#20262f"/>'
      /* back leg kicked out */
      + '<path d="M34 34 q-6 7 -14 8 q6 -8 8 -12 z" fill="#20262f"/>'
      /* arm thrown forward */
      + '<path d="M44 22 q9 -2 14 3" stroke="#20262f" stroke-width="5"'
      + ' stroke-linecap="round" fill="none"/>'
      /* the head, and the eye slit that makes it a ninja */
      + '<circle cx="44" cy="17" r="10" fill="#262d37"/>'
      + '<path d="M38 15 h13 v4 h-13 z" fill="#f2e9d8"/>'
      + '<circle cx="42" cy="17" r="1.7" fill="#20262f"/>'
      + '<circle cx="48" cy="17" r="1.7" fill="#20262f"/>'
      /* two speed lines, which is the whole of the whoosh made visible */
      + '<path d="M2 24 h14 M6 31 h10" stroke="#20262f" stroke-width="2"'
      + ' stroke-linecap="round" opacity=".5"/>'
      + '</svg>';
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 1400);
  }

  /* ---- the かさおばけ ----
     Andrew asked for a creature on a wrong answer, and then asked for
     this one rather than a zombie: a yokai is Japanese, and a Year 8
     Japanese page that reaches for an American monster has passed up
     the better joke. It is the same umbrella that haunts れきしの人, so
     a student who meets it on one page knows it on the other.

     Drawn friendly rather than frightening, because a student who has
     just got something wrong does not need a fright as well. Built to
     be hard to farm: it rises once, takes a second and a half, never
     blocks the feedback that names the rule, and does not fire twice
     for the same mistake in quick succession. */
  var zLast = 0;
  function yokai(near){
    CLICK.warble();
    var now = Date.now();
    if (now - zLast < 900) return;
    zLast = now;
    clearCreatures();
    var box = document.createElement("div");
    box.className = "yoka";
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top : innerHeight * 0.6) + "px";
    box.innerHTML =
      '<svg viewBox="0 0 56 72" width="56" height="72">'
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
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 2600);
  }

  /* ---- a deck, so nothing comes up in the order it is written down ----
     Every stepped exercise used to walk its list with a counter: the six
     people in だれですか came up in file order, so the answer to round one
     was the first card, round two the second, and a student who noticed
     that never had to read the Japanese again. The same counter ran the
     part-by-part step and the wearing step, where it made the body part
     and the garment slot cycle in a fixed order too.

     A deck shuffles the whole list, deals it out, and reshuffles when it
     is spent, never repeating across the seam. It also counts which items
     have actually been answered correctly, because "you have seen the
     last one" stops meaning "you have seen them all" the moment the order
     is random. */
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
  /* Correct once is enough to count: a student who gets all six right has
     met all six, in whatever order the deck handed them over. */
  var TALLY = {};
  function tallyOf(key){ return TALLY[key] || (TALLY[key] = { right:0 }); }
  function gotRight(key, n, i, id){
    var d = deck(key, n);
    d.right[i] = 1;
    if (Object.keys(d.right).length >= n) done(id);
  }

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
      var c = CLICK.ctx(); if (!c || !on || !T) return;
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
        var c = CLICK.wake(); if (!c) return;
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
      if (S.sfx) CLICK.boom();
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
      if (S.sfx) CLICK.buzz();
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
      if (S.sfx) setTimeout(function(){ CLICK.sadtrombone(); }, 140);
      if (cfg.onOver) cfg.onOver(G.score);
      /* the question stays up: it is the one the next game starts on */
    }
    function begin(){
      G.mode = "play"; G.score = 0; G.lives = 3; G.speed = 24;
      G.falling = []; G.spawn = 0; G.bits = []; G.flyers = []; G.fly = 260;
      CLICK.wake();
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
              if (S.sfx) CLICK.bonus();
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
      /* what is in the air right now, as the student sees it. The
         browser check reads it to prove the script sets drop the other
         script; nothing in the app calls it. */
      falling: function(){ return G.falling.map(function(f){ return cfg.label(f.w); }); },
      /* every face this set can drop, which is what the browser check
         reads: the air at any one moment is only two or three of them */
      faces: function(){ return POOL.map(function(w){ return cfg.label(w); }); },
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

  /* Games on the left, grammar and vocabulary on the right. Andrew's
     order, and the reason is the room: a Year 7 class that has just met
     the frame will open the first tab, so the first tab should be the
     one that makes them want the second. */
  var STEPS = [
    { id:"katch", ja:"ことばキャッチ", en:"Catch the word" },
    { id:"spin",  ja:"ルーレット",     en:"Spin a slot" },
    { id:"make",  ja:"つくる",         en:"Build the sentence" },
    { id:"match", ja:"ことば",         en:"Words" },
    { id:"pairs", ja:"ペア",           en:"Memory" },
    { id:"karuta",ja:"かるた",         en:"Hear it, grab it" },
    { id:"kata",  ja:"カタカナ",       en:"Katakana" },
    { id:"kanji", ja:"かんじ",         en:"The kanji" },
    { id:"verb",  ja:"どうし",         en:"Change the verb" },
    { id:"fast",  ja:"はやく",         en:"Read it fast" },
    { id:"quiz",  ja:"クイズ",         en:"Team quiz" }
  ];
  var at = 0, DRAW = {};
  /* かるた listens on the document for its two buzzer keys, so the
     listener has to come off when another rung is drawn */
  var KEYOFF = null;

  function ruleFor(id, cls){
    var r = null;
    (M.rules || []).forEach(function(x){ if (x.step === id) r = x; });
    if (!r) return "";
    return '<div class="rule ' + (cls || "") + '"><b>' + esc(r.title_en) + '</b>'
      + esc(r.rule)
      + (r.eg || []).map(function(e){
          return '<div class="eg">' + ruby(e.ja) + '<em>' + esc(e.en) + '</em></div>';
        }).join("") + '</div>';
  }
  function paintSteps(){
    $("steps").innerHTML = STEPS.map(function(s, i){
      return '<button data-i="' + i + '"' + (i === at ? ' aria-current="step"' : '')
        + '><b>' + esc(s.ja) + '</b><i' + (S.done[s.id] ? ' class="done"' : '')
        + '>' + esc(s.en) + (S.done[s.id] ? " ✓" : "") + '</i></button>';
    }).join("");
    each($("steps"), "[data-i]", function(b){
      b.onclick = function(){ at = +b.dataset.i; draw(); };
    });
  }
  /* Finishing a step pays once. It is worth more than any single item in
     it, so the last word of a set is worth staying for. */
  function done(id){
    var fresh = !S.done[id];
    S.done[id] = 1; save(); paintSteps();
    if (fresh) award(5, "step done");
  }
  function wireSay(){
    each($("main"), "[data-say]", function(b){
      b.onclick = function(ev){ ev.stopPropagation(); say(b.dataset.say); };
    });
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
     the control never moves. Folding frees real height, which anything
     that sizes itself to the window needs to know, so a resize goes out
     when it happens.

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

  /* The EN button only governs English that is a prop. On a tab with
     none of it the button is flat and says why, because a control
     that silently does nothing is worse than no control. */
  function paintEn(){
    var any = $("main").querySelector(".box .ask, .foot .hint, .mark p, .en");
    $("enBtn").disabled = !any;
    $("enBtn").title = any
      ? "Hide the English captions and hints"
      : "Nothing on this tab is English that can be hidden";
  }
  function draw(){
    paintToggles(); paintSteps();
    /* The game runs on its own clock and its own audio. Leaving the rung
       has to stop both, or the chiptune follows you round the app. */
    if (GAME){ GAME.stop(); GAME = null; }
    if (KEYOFF){ document.removeEventListener("keydown", KEYOFF); KEYOFF = null; }
    if (onResize){ window.removeEventListener("resize", onResize); onResize = null; }
    document.body.classList.remove("gamefull");
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
    wireSay();
    paintEn();
  }
  /* ---- drag a chip onto a slot, or tap the chip and then the slot ----
     A school iPad does not do HTML5 drag-and-drop at all and a mouse is
     clumsy at tapping twice, so both gestures run one handler: if the
     pointer never travelled, it was a tap.

     This was written inside the ことば step and is out here because the
     きせかえ step needs the same gesture over an SVG. Two copies of a drag
     is two places for a thumb to stop working.

       grab(chip)        called the moment a chip is taken hold of
       open(slot)        false for a slot that will not take anything
       land(chip, slot)  the drop, however it was made
     The slot selector is matched with closest(), so it works on an SVG
     element as readily as on a div. */
  function dragdrop(scope, chipSel, slotSel, cfg){
    function clearOver(){
      each(scope, slotSel + ".over", function(x){ x.classList.remove("over"); });
    }
    function open(slot){ return !cfg.open || cfg.open(slot); }
    function clearPick(){
      each(scope, chipSel + ".pick", function(c){ c.classList.remove("pick"); });
    }
    each(scope, chipSel, function(chip){
      /* きせかえ redraws the figure after every drop, so the slots are new
         elements and have to be wired again while the chips are the same
         ones. Wiring a chip twice is worse than not wiring it: the second
         handler sees the class the first just added and takes it straight
         back off, so the chip can never stay armed and tap-then-tap stops
         working after the first drop. */
      if (chip.__dragWired) return;
      chip.__dragWired = true;
      var drag = null;
      chip.addEventListener("pointerdown", function(ev){
        if (cfg.grab) cfg.grab(chip);
        var r = chip.getBoundingClientRect();
        drag = { x:ev.clientX, y:ev.clientY, dx:ev.clientX - r.left,
                 dy:ev.clientY - r.top, w:r.width, h:r.height, moved:0 };
        try { chip.setPointerCapture(ev.pointerId); } catch (e){}
      });
      chip.addEventListener("pointermove", function(ev){
        if (!drag) return;
        drag.moved = Math.max(drag.moved,
          Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y));
        if (drag.moved < 7) return;
        ev.preventDefault();
        chip.classList.add("dragging");
        chip.style.width = drag.w + "px";
        chip.style.height = drag.h + "px";
        chip.style.left = (ev.clientX - drag.dx) + "px";
        chip.style.top = (ev.clientY - drag.dy) + "px";
        var over = document.elementFromPoint(ev.clientX, ev.clientY);
        over = over && over.closest ? over.closest(slotSel) : null;
        clearOver();
        if (over && open(over)){ over.classList.add("over"); drag.last = over; }
      });
      function drop(ev){
        if (!drag) return;
        var moved = drag.moved, last = drag.last || null;
        drag = null;
        clearOver();
        if (moved < 7){
          /* a tap: arm this chip, and the next tap on a slot drops it */
          var was = chip.classList.contains("pick");
          clearPick();
          if (!was) chip.classList.add("pick");
          return;
        }
        chip.classList.remove("dragging");
        chip.style.cssText = "";
        var el = document.elementFromPoint(ev.clientX, ev.clientY);
        var slot = el && el.closest ? el.closest(slotSel) : null;
        /* ---- a near miss still counts ----
           Andrew: "the top word on the left cannot be dragged down to
           its matching word on the list on the right if it is at the
           bottom. You can click on one and then the other sequentially
           and it works but drag does not."

           A row near the bottom of the window is half under the edge
           of it on a laptop with a bookmarks bar, and a pointer let go
           past the edge of the window is over nothing at all:
           elementFromPoint answers null and the drag is thrown away.
           The same happens in the gap beside a row. So the slot the
           drag was last over is remembered, and a drop that lands on
           nothing goes there if it was let go anywhere near it. */
        if (!slot && last){
          var r = last.getBoundingClientRect(), NEAR = 46;
          if (ev.clientX > r.left - NEAR && ev.clientX < r.right + NEAR
              && ev.clientY > r.top - NEAR && ev.clientY < r.bottom + NEAR)
            slot = last;
        }
        if (slot && open(slot)) cfg.land(chip, slot);
      }
      chip.addEventListener("pointerup", drop);
      chip.addEventListener("pointercancel", drop);
    });
    each(scope, slotSel, function(slot){
      if (slot.__dragWired) return;
      slot.__dragWired = true;
      slot.addEventListener("click", function(){
        var armed = scope.querySelector(chipSel + ".pick");
        if (!armed || !open(slot)) return;
        clearPick();
        cfg.land(armed, slot);
      });
    });
  }


  function foot(html){
    return '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span>' + (html || "") + '</div>';
  }

  /* ================= the sentence =================
     One builder, two faces. The pieces are pictures in えでつくる and
     words in ことばでつくる, and everything else about the task is the
     same: five boxes in the order the frame goes, the particle printed
     under each box because the particle is the lesson, and 行きます
     already sitting at the end because the verb is not what is being
     chosen here. */
  function sentenceOf(s){
    var out = [];
    SLOTS.forEach(function(sl){
      var w = byId(s[sl.id]);
      if (w) out.push({ slot: sl, w: w });
    });
    return out;
  }
  function byId(id){
    var hit = null;
    W.forEach(function(w){ if (w.id === id) hit = w; });
    return hit;
  }
  function partOf(sl, w){ return (w && w.part !== undefined) ? w.part : sl.part; }
  /* the sentence as it is said, which is what the clip was recorded from */
  function lineOf(parts){
    return parts.map(function(p){
      return plain(p.w.ja) + partOf(p.slot, p.w);
    }).join("　") + "　" + plain(M.verb.ja) + "。";
  }
  /* A person can be the one going and the one gone with, so one word
     carries both rather than the tray showing the same face twice with
     only one of them allowed in each box. 一人 is a companion only, and
     brings its own で. */
  function fits(w, id){ return w.slot === id || (id === "with" && w.with === true); }
  function slotWords(id){
    return W.filter(function(w){ return fits(w, id); });
  }

  /* A picture is a piece and a word is a piece. The difference is one
     line of HTML, so the two tabs cannot drift apart. */
  /* ---- a piece at each of the three levels ----
     絵         the picture alone
     絵＋ことば  the picture with the word under it, which is the rung
                between them: a student reads with the picture there
                to catch them
     ことば      the word alone, with the English face down behind the
                ？ in the corner, which costs a point

     Andrew: "I also wonder what the learning purpose of giving users a
     picture hint that limits it to only one correct card ... Maybe
     they could have the option to add pictures to make it easier?"
     This is that option, as a switch rather than as two tabs, so a
     student can move up or down in the middle of a sentence. */
  function pieceHTML(w, lvl, i){
    var pic = '<span class="pic" aria-hidden="true">' + w.icon + '</span>'
      + (w.badge ? '<span class="badge">' + esc(w.badge) + '</span>' : '');
    var ja = '<span class="pja">' + ruby(w.ja) + '</span>';
    var help = '<span class="pen">' + esc(w.en) + '</span>'
      + '<span class="qq" data-flip="' + esc(w.id) + '">？</span>';
    return '<button class="piece lvl-' + lvl + (lvl === "pic" ? "" : " word")
      + '" data-w="' + esc(w.id) + '" data-i="' + i + '">'
      + (lvl === "pic" ? pic : (lvl === "both" ? pic + ja + help : ja + help))
      + '</button>';
  }

  /* えでつくる is free. Andrew: "a graphical version that encourages
     students to explore vocab and sentence structure." So there is no
     target: every picture in the unit is on the table, a piece says its
     word as it is picked up and its word with its particle as it lands,
     and a full line is read back and translated. What is being learnt
     is which box a word belongs in, which is what the particles are
     for, and the app says so when a piece lands in the wrong one.

     ことばでつくる is the task. The English is given and the sentence
     has to be built from words rather than pictures, with the English
     on each piece face down behind a ？ that costs a point. */
  /* ---- one builder, three levels, free or set ----
     Andrew asked for the ghost picture out of the empty boxes and for
     the two builders to become one with a switch. Both are the same
     point: the picture was doing the work. A bus-shaped hole takes
     the bus piece without anybody reading anything, so the boxes now
     carry what the grammar carries and nothing else, the particle and
     the question, and on 絵 with EN off that leaves the particle on
     its own, which is the hardest and truest version of the task.

     じゆう is kept beside the levels rather than tied to one of them,
     so a student can explore with words and be set a sentence with
     pictures. The palette is every word in the unit; a set sentence
     deals its five answers and two more for each box. */
  function builder(){
    var lvl = S.lvl || "pic";
    var free = !!S.free;
    var S9 = M.sentences;
    var si = dealt("sent", S9.length);
    var want = free ? [] : sentenceOf(S9[si]);
    var placed = {};
    var checked = false;

    var tray;
    if (free) tray = shuffle(W.slice());
    else {
      /* the answer for each box plus two that fit the same box, so no
         box can be filled by elimination. A person can belong to two
         boxes, so the tray is deduped: the same face twice is a
         puzzle about the app rather than about the sentence. */
      tray = [];
      var inTray = {};
      want.forEach(function(p){ inTray[p.w.id] = 1; tray.push(p.w); });
      want.forEach(function(p){
        var others = shuffle(slotWords(p.slot.id).filter(function(w){
          return !inTray[w.id];
        })).slice(0, 2);
        others.forEach(function(w){ inTray[w.id] = 1; tray.push(w); });
      });
      tray = shuffle(tray);
    }

    function lvlBtn(id, ja, title){
      return '<button class="btn sm ' + (lvl === id ? "" : "ghost")
        + '" id="lv' + id + '" title="' + esc(title) + '">' + ja + '</button>';
    }
    $("main").innerHTML = ruleFor("make", "tight")
      + '<div class="work fit"><div class="col">'
      + (free ? '' : '<div class="target" id="target">' + esc(S9[si].en) + '</div>')
      + '<div class="frame" id="frame"></div>'
      + '<div class="tray' + (free ? ' palette' : '') + '" id="tray">'
      + tray.map(function(w, i){ return pieceHTML(w, lvl, i); }).join("")
      + '</div>'
      + '<div id="fb" class="fbslot"></div>'
      + '</div></div>'
      + foot(lvlBtn("pic", "絵", "Pictures only")
        + lvlBtn("both", "絵＋ことば", "The picture with the word under it")
        + lvlBtn("word", "ことば", "Words only, English behind the ？")
        + '<span class="gapsm"></span>'
        + '<button class="btn sm ' + (free ? "" : "ghost") + '" id="lvFree"'
        + ' title="Build anything you like, or be given a sentence">じゆう</button>'
        + '<span class="gapsm"></span>'
        + '<button class="btn sm" id="chk">' + (free ? "Say it" : "Check") + '</button>'
        + '<button class="btn ghost sm" id="clr">Start again</button>'
        + (free ? '' : '<button class="btn ghost sm" id="other">Another sentence</button>')
        + '<span class="hint" id="tip">'
        + (free ? "Build any sentence you like. Every word in the unit is here."
                : "Build the English sentence above.")
        + '</span>');
    ["pic", "both", "word"].forEach(function(id){
      $("lv" + id).onclick = function(){ S.lvl = id; save(); builder(); };
    });
    $("lvFree").onclick = function(){ S.free = !S.free; save(); builder(); };

    function frameSlots(){
      return free ? SLOTS : want.map(function(p){ return p.slot; });
    }
    function wantAt(id){
      var hit = null;
      want.forEach(function(p){ if (p.slot.id === id) hit = p.w; });
      return hit;
    }
    function inBox(w){
      var pic = '<span class="pic" aria-hidden="true">' + w.icon
        + (w.badge ? '<span class="badge">' + esc(w.badge) + '</span>' : '') + '</span>';
      var ja = '<span class="pja">' + ruby(w.ja) + '</span>';
      return lvl === "pic" ? pic : (lvl === "both" ? pic + ja : ja);
    }
    function paintFrame(){
      $("frame").innerHTML = frameSlots().map(function(sl){
        var got = placed[sl.id] ? byId(placed[sl.id]) : null;
        var right = !free && checked && got && got.id === (wantAt(sl.id) || {}).id;
        var wrong = !free && checked && got && got.id !== (wantAt(sl.id) || {}).id;
        /* ---- no ghost picture ----
           An empty box used to show a small grey picture of its own
           kind, so a bicycle went into the box with the bus in it and
           nothing was read or decided. What is left is what the
           grammar gives: the particle, and the question it answers. */
        return '<div class="box' + (right ? " right" : "") + (wrong ? " wrong" : "")
          + '" data-slot="' + esc(sl.id) + '">'
          + '<div class="hole">' + (got ? inBox(got) : '') + '</div>'
          + '<div class="part">' + esc(partOf(sl, got) || "—") + '</div>'
          + '<div class="ask">' + esc(sl.ask) + '</div></div>';
      }).join("")
        + '<div class="box verb"><div class="hole">'
        + '<span class="pja">' + ruby(M.verb.ja) + '</span></div>'
        + '<div class="part">。</div><div class="ask">' + esc(M.verb.en) + '</div></div>';
      wire();
    }
    function wire(){
      dragdrop($("main"), ".piece", "[data-slot]", {
        grab: function(chip){
          var w = byId(chip.dataset.w);
          if (w) say(w.ja, null, true);
        },
        land: function(chip, box){
          var w = byId(chip.dataset.w), id = box.dataset.slot;
          if (!w) return;
          if (!fits(w, id)){
            yokai(box);
            fb('<div class="mark no"><b>Not that box</b>'
              + '<span class="jp">' + ruby(w.ja) + '</span> is '
              + esc(w.en) + ', which does not answer <b>'
              + esc(slotById(id).ask) + '</b></div>');
            return;
          }
          placed[id] = w.id; checked = false;
          say(plain(w.ja) + partOf(slotById(id), w));
          fb("");
          paintFrame();
        }
      });
      each($("main"), "[data-flip]", function(q){
        if (q.__tap) return;
        q.__tap = true;
        q.addEventListener("pointerdown", function(ev){
          ev.stopPropagation(); ev.preventDefault();
          flip(q.parentNode, q.dataset.flip);
        });
      });
    }
    function flip(piece, id){
      if (!piece || piece.classList.contains("flipped")) return;
      piece.classList.add("flipped");
      spend(1, "English shown");
      var w = byId(id);
      if (w) say(w.ja, null, true);
      setTimeout(function(){ piece.classList.remove("flipped"); }, 4000);
    }
    function fb(html){ $("fb").innerHTML = html; wireSay(); }
    function slotById(id){
      var hit = null;
      SLOTS.forEach(function(s0){ if (s0.id === id) hit = s0; });
      return hit;
    }
    function built(){
      return frameSlots().map(function(sl){
        return { slot: sl, w: byId(placed[sl.id]) };
      });
    }
    paintFrame();
    paintScore();

    $("clr").onclick = function(){ placed = {}; checked = false; fb(""); paintFrame(); };
    if ($("other")) $("other").onclick = function(){
      advance("sent", S9.length); builder();
    };
    function paintScore(){
      if (free){
        var n = W.filter(function(w){ return S.won["said:" + w.id]; }).length;
        $("sc").innerHTML = '<b>' + n + '</b> of ' + W.length + ' words used';
      } else {
        var m = S9.filter(function(_, i){ return S.won["sent:" + i]; }).length;
        $("sc").innerHTML = '<b>' + m + '</b> of ' + S9.length + ' sentences';
      }
    }
    $("chk").onclick = function(){
      var empty = frameSlots().filter(function(sl){ return !placed[sl.id]; });
      if (empty.length){
        fb('<div class="mark hm"><b>Not finished</b>'
          + empty.length + ' box' + (empty.length > 1 ? 'es are' : ' is')
          + ' still empty.</div>');
        return;
      }
      var parts = built(), line = lineOf(parts);
      if (free){
        /* Nothing is wrong here, because nothing was asked. The page
           says what the student has just made, in Japanese and in
           English, and pays for words it has not heard from them
           before: the reward is for trying another word. */
        parts.forEach(function(p){ first("said:" + p.w.id, 1, "new word used"); });
        paintScore();
        var n = W.filter(function(w){ return S.won["said:" + w.id]; }).length;
        if (n >= 15) done("make");
        ninja($("fb"));
        fb('<div class="mark yes"><b>Your sentence</b>'
          + '<span class="jp">' + ruby(parts.map(function(p){
              return plain(p.w.ja) + partOf(p.slot, p.w);
            }).join("　") + "　" + plain(M.verb.ja) + "。") + '</span> '
          + '<button class="say" id="sayfree" aria-label="Say it again">\u25b6</button>'
          + '<p>' + esc(englishOf(parts)) + '</p></div>');
        $("sayfree").onclick = function(){
          sayLine(parts.map(function(p){
            return plain(p.w.ja) + partOf(p.slot, p.w);
          }).concat([plain(M.verb.ja)]));
        };
        sayLine(parts.map(function(p){
          return plain(p.w.ja) + partOf(p.slot, p.w);
        }).concat([plain(M.verb.ja)]));
        return;
      }
      checked = true;
      var wrong = want.filter(function(p){ return placed[p.slot.id] !== p.w.id; });
      paintFrame();
      if (wrong.length){
        yokai($("fb"));
        fb('<div class="mark no"><b>Nearly</b>'
          + wrong.length + ' box' + (wrong.length > 1 ? 'es are' : ' is')
          + ' not what the English says. The red ones are the ones to change.</div>');
        return;
      }
      ninja($("fb"));
      first("sent:" + si, 3, "sentence built");
      advance("sent", S9.length);
      fb('<div class="mark yes"><b>That is the sentence</b>'
        + '<span class="jp">' + ruby(want.map(function(p){
            return plain(p.w.ja) + partOf(p.slot, p.w);
          }).join("　") + "　" + plain(M.verb.ja) + "。") + '</span> '
        + saybtn(line)
        + '<p>' + esc(S9[si].en) + '</p>'
        + '<div class="btns"><button class="btn sm" id="next">Another one</button></div></div>');
      say(line);
      paintScore();
      var n2 = S9.filter(function(_, i){ return S.won["sent:" + i]; }).length;
      if (n2 >= 3) done("make");
      $("next").onclick = function(){ builder(); };
    };
  }
  /* The English of whatever was built, which is only ever shown after
     the Japanese has been said: it is a check on what they made, not
     a way of making it. */
  function englishOf(parts){
    var by = {};
    parts.forEach(function(p){ by[p.slot.id] = p.w; });
    var who = (by.who || {}).en || "";
    var out = "On " + ((by.day || {}).en || "") + " " + who + " will go to "
      + ((by.where || {}).en || "") + " " + ((by.how || {}).en || "");
    var w = (by["with"] || {}).en || "";
    out += (w === "on my own") ? " on my own" : (w ? " with " + w : "");
    return out.replace(/\s+/g, " ").trim() + ".";
  }
  DRAW.make = function(){ builder(); };

  /* ================= ことばキャッチ =================
     Ported from ひと, with this unit's words in it. The prompt sits
     outside the game screen because the question is the one thing here
     that is not a game. */
  var GAME = null, onResize = null;
  /* ---- what falls out of the sky ----
     Andrew: "make the pong/invaders video game have optional
     word/script themes. So students can choose to practice kana,
     kanji or topic vocab."

     Four sets, and the prompt changes with them. Vocabulary and kanji
     are asked in English, because the meaning is what is being
     practised. The two script sets are asked in the other script, so
     a student reads ひ and catches ヒ: no English at all, and no
     romaji either, which is the rule for this cohort. */
  var CATCH = "word";
  var CATCHERS = [
    { id: "word",  ja: "ことば",   en: "the unit's words, asked in English" },
    { id: "kanji", ja: "かんじ",   en: "this unit's kanji, asked in English" },
    { id: "hira",  ja: "ひらがな", en: "read the katakana, catch the hiragana" },
    { id: "kata",  ja: "カタカナ", en: "read the hiragana, catch the katakana" }
  ];
  function catchPool(kind){
    if (kind === "kanji")
      return (M.kanji || []).map(function(k){
        return { id: "k:" + k.k, ja: k.k, kana: k.yomi[0], en: k.en,
                 /* one kanji at 17px is readable; a compound is a smudge,
                    so those fall as their reading */
                 face: plain(k.k).length === 1 ? plain(k.k) : k.yomi[0] };
      });
    if (kind === "hira" || kind === "kata"){
      var want = kind === "hira" ? "hira" : "kata";
      var ask  = kind === "hira" ? "kata" : "hira";
      return (M.kana || []).map(function(k){
        return { id: "n:" + k.hira, ja: k[want], kana: k[want],
                 en: k[ask], face: k[want], script: true };
      });
    }
    return W.filter(function(w){ return w.en; }).map(function(w){
      return { id: "w:" + w.id, ja: w.ja, kana: kana(w.ja) || plain(w.ja),
               en: w.en, face: kana(w.ja) || plain(w.ja) };
    });
  }
  DRAW.katch = function(){
    var pool = catchPool(CATCH);
    $("main").innerHTML = ruleFor("katch", "tight")
      + '<div class="work fit arcadewrap">'
      + '<div class="prompt" id="prompt"><span class="lab">CATCH</span>'
      + '<b id="promptw">—</b></div>'
      + '<canvas id="arc" class="arcade" width="320" height="200"'
      + ' tabindex="0" aria-label="Catch the word: a word game"></canvas>'
      + '</div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span>'
      + CATCHERS.map(function(c){
          return '<button class="btn sm ' + (c.id === CATCH ? "" : "ghost")
            + '" data-set="' + c.id + '" title="' + esc(c.en) + '">' + c.ja + '</button>';
        }).join("")
      + '<button class="btn sm" id="go">Start</button></div>';
    function tally(){
      var n = 0;
      pool.forEach(function(w){ if (S.won["catch:" + w.id]) n++; });
      $("sc").innerHTML = '<b>' + n + '</b> of ' + pool.length + ' caught';
      return n;
    }
    tally();
    each($("main"), "[data-set]", function(b5){
      b5.onclick = function(){ CATCH = b5.dataset.set; draw(); };
    });
    if (GAME) GAME.stop();
    GAME = arcade({
      canvas: $("arc"),
      words: pool,
      tune: M.tune,
      best: (S.best && S.best["catch:" + CATCH]) || 0,
      /* a single character can be twice the size of a word and still
         fit the screen, and at this size it has to be */
      font: CATCH === "hira" || CATCH === "kata" ? 30 : 17,
      /* Kana at this size. A kanji with more than a few strokes is a
         smudge on a 320 pixel screen, and a smudge is not a reading
         task: Andrew's rule from ひと, and 電車 and 曜日 are exactly
         the words it was written for. */
      label: function(w){ return w.face; },
      onPrompt: function(w){
        $("promptw").textContent = w ? w.en : "—";
        /* the script sets ask in Japanese, so the prompt is set in the
           Japanese face at a size a room can read */
        $("promptw").className = w && w.script ? "jp big" : "";
        $("prompt").classList.toggle("live", !!w);
      },
      onCatch: function(w){
        first("catch:" + w.id, 1, "caught");
        if (tally() >= 12) done("katch");
      },
      onOver: function(score){
        S.best = S.best || {};
        if (typeof S.best !== "object") S.best = {};
        if (score > (S.best["catch:" + CATCH] || 0)){
          S.best["catch:" + CATCH] = score; save();
        }
      }
    });
    document.body.classList.add("gamefull");
    function fitGame(){
      var cv = $("arc"); if (!cv) return;
      var main = document.querySelector("main");
      var wrap = cv.parentNode;
      var foot = main.querySelector(".foot");
      var pr = $("prompt");
      if (!main || !wrap || !foot) return;
      var footH = foot.offsetHeight;
      var promptH = pr ? pr.offsetHeight + 8 : 0;
      wrap.style.minHeight = Math.max(160, main.clientHeight - footH) + "px";
      var room = main.clientHeight - footH - promptH - 16;
      var w = Math.min(wrap.clientWidth, 900, Math.max(220, room * 1.6));
      cv.style.width = Math.floor(w) + "px";
    }
    fitGame();
    onResize = fitGame;
    window.addEventListener("resize", fitGame);
    $("go").onclick = function(){
      $("arc").focus();
      var box = $("prompt");
      if (box && box.scrollIntoView) box.scrollIntoView({ block: "start" });
      GAME.start();
    };
    /* the one test seam: a game loop cannot be driven by clicking at
       pixels on a moving canvas. Reading it changes nothing. */
    window.MEGA_GAME = GAME;
  };

  /* ================= ルーレット =================
     The drum carries the five parts of the frame rather than words. It
     lands on one, and the student picks a word that answers it out of a
     tray drawn from all five, which is the thing the frame is for: a
     word belongs to a slot, and the slot brings its particle with it. */
  var spinR = null, spunSlot = null;
  DRAW.spin = function(){
    var doneN = SLOTS.filter(function(s){ return S.done["spin:" + s.id]; }).length;
    $("main").innerHTML = ruleFor("spin", "tight")
      + '<div class="work fit"><div class="col">'
      + '<div class="reel" id="reel">'
      + '<div class="rwin"><div class="rstrip"></div><div class="rmark"></div></div>'
      + '<button class="rspin" id="rgo" aria-label="Spin the wheel">'
      + '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
      + ' stroke="currentColor" stroke-width="2" stroke-linecap="round">'
      + '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3v4h-4"/>'
      + '</svg></button></div>'
      + '<div id="ask"></div></div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + foot('<span class="hint" id="tip">Flick the drum, or press the button.</span>');
    $("sc").innerHTML = '<b>' + doneN + '</b> of ' + SLOTS.length + ' parts';

    spinR = REEL.mount($("reel"), SLOTS.map(function(s){
      return { id: s.id, html: ruby(s.ja), sub: esc(s.ask) };
    }), function(it){ landed(it.id); });

    function clear(){ $("fb").innerHTML = ""; $("ask").innerHTML = ""; }
    $("rgo").onclick = function(){
      CLICK.wake();
      clear();
      $("tip").textContent = "Spinning…";
      spinR.spinTo(SLOTS[dealt("slot", SLOTS.length)].id);
    };
    $("reel").querySelector(".rwin").addEventListener("pointerdown", clear);

    function landed(id){
      var sl = null;
      SLOTS.forEach(function(s){ if (s.id === id) sl = s; });
      if (!sl) return;
      spunSlot = sl;
      if (SLOTS[dealt("slot", SLOTS.length)] === sl) advance("slot", SLOTS.length);
      $("tip").textContent = "Pick a word for this part.";
      /* three that fit and five that do not, so the tray is a choice
         and not a list */
      var right = shuffle(slotWords(sl.id)).slice(0, 3);
      var wrong = shuffle(W.filter(function(w){ return w.slot !== sl.id; })).slice(0, 5);
      var tray = shuffle(right.concat(wrong));
      $("ask").innerHTML =
          '<div class="mark yes"><b>' + esc(sl.ask) + '</b>'
        + '<span class="jp">〔　〕' + esc(sl.part) + '</span></div>'
        + '<div class="tray">' + tray.map(function(w){
            return '<button class="piece word" data-pick="' + esc(w.id) + '">'
              + '<span class="pja">' + ruby(w.ja) + '</span>'
              + '<span class="pic small" aria-hidden="true">' + w.icon + '</span>'
              + '</button>';
          }).join("") + '</div>';
      each($("ask"), "[data-pick]", function(b){
        b.onclick = function(){
          var w = byId(b.dataset.pick);
          if (!w) return;
          say(w.ja, null, true);
          if (!fits(w, sl.id)){
            b.classList.add("no");
            yokai(b);
            $("fb").innerHTML = '<div class="mark no"><b>Not this part</b>'
              + '<span class="jp">' + ruby(w.ja) + '</span> answers '
              + esc(slotAsk(w.slot)) + ', not ' + esc(sl.ask) + '</div>';
            return;
          }
          b.classList.add("ok");
          ninja(b);
          var part = partOf(sl, w);
          first("spin:" + sl.id + ":" + w.id, 1, "word placed");
          var got = W.filter(function(x){
            return x.slot === sl.id && S.won["spin:" + sl.id + ":" + x.id];
          }).length;
          if (got >= 3 && !S.done["spin:" + sl.id]){
            S.done["spin:" + sl.id] = 1; save();
            $("sc").innerHTML = '<b>'
              + SLOTS.filter(function(s){ return S.done["spin:" + s.id]; }).length
              + '</b> of ' + SLOTS.length + ' parts';
          }
          if (SLOTS.every(function(s){ return S.done["spin:" + s.id]; })) done("spin");
          $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
            + '<span class="jp">' + ruby(w.ja) + esc(part) + '</span> '
            + saybtn(plain(w.ja) + part)
            + '<p>' + esc(w.en)
            + (w.note ? '. ' + esc(w.note) : '')
            + '</p></div>';
          say(plain(w.ja) + part);
          wireSay();
        };
      });
    }
    function slotAsk(id){
      var hit = "";
      SLOTS.forEach(function(s){ if (s.id === id) hit = s.ask; });
      return hit;
    }
  };

  /* ================= ことば =================
     Matching, ported from ひと. The chip does not say what it is until
     it is picked up: a student has to listen, and listening is the part
     a worksheet cannot do. Eight at a time, dealt so the same eight do
     not come round twice. */
  DRAW.match = function(){
    var pool = W.filter(function(w){ return w.en; });
    /* Six, not eight. Eight rows plus the explanation and the two bars
       come to more than a 1366x700 laptop has, and the last row then
       sits under the bottom edge of the window, where a drag cannot
       reach it. Measured at four window sizes rather than guessed. */
    var PER = 6;
    var i0 = dealt("match", Math.ceil(pool.length / PER));
    var page = shuffle(pool).slice(0, PER);
    var left = shuffle(page), right = shuffle(page);
    var got = {};
    $("main").innerHTML = ruleFor("match", "tight")
      + '<div class="work"><div class="matchgrid">'
      + '<div class="mcol" id="mja">' + left.map(function(w){
          return '<button class="piece word chip" data-w="' + esc(w.id) + '">'
            + '<span class="pja">' + ruby(w.ja) + '</span></button>';
        }).join("") + '</div>'
      + '<div class="mcol" id="men">' + right.map(function(w){
          return '<div class="slot" data-slot="' + esc(w.id) + '">'
            + '<span class="pic small" aria-hidden="true">' + w.icon + '</span>'
            + '<span class="men">' + esc(w.en) + '</span></div>';
        }).join("") + '</div>'
      + '</div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + foot('<button class="btn ghost sm" id="again">Eight more</button>'
        + '<span class="hint">Tap a word to hear it, then drop it on its meaning.</span>');
    function score(){
      $("sc").innerHTML = '<b>' + Object.keys(got).length + '</b> of ' + PER + ' matched';
    }
    score();
    dragdrop($("main"), ".chip", "[data-slot]", {
      grab: function(chip){
        var w = byId(chip.dataset.w);
        if (w) say(w.ja, null, true);
      },
      open: function(slot){ return !slot.classList.contains("filled"); },
      land: function(chip, slot){
        var w = byId(chip.dataset.w);
        if (!w) return;
        if (slot.dataset.slot !== w.id){
          yokai(slot);
          $("fb").innerHTML = '<div class="mark no"><b>Not that one</b>'
            + 'Listen again: press the word.</div>';
          return;
        }
        got[w.id] = 1;
        slot.classList.add("filled");
        slot.insertAdjacentHTML("afterbegin",
          '<span class="pja">' + ruby(w.ja) + '</span>');
        chip.remove();
        first("match:" + w.id, 1, "matched");
        score();
        $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
          + '<span class="jp">' + ruby(w.ja) + '</span> ' + saybtn(w.ja, true)
          + '<p>' + esc(w.en) + '</p></div>';
        wireSay();
        if (Object.keys(got).length === PER){
          ninja($("fb"));
          advance("match", Math.ceil(pool.length / PER));
          done("match");
        }
      }
    });
    $("again").onclick = function(){
      advance("match", Math.ceil(pool.length / PER));
      draw();
    };
  };

  /* ================= カタカナ =================
     Andrew asked for katakana word recognition "from the katakana a-h
     lines", so every word here is readable with ア through ハ and
     nothing else: no ラ行, no ヤ行, no マ行, no ン. That rules out
     three words the unit itself uses (フェリー, トラム, コンサート),
     which is the right way round: the tab is for the katakana a class
     has, not for the words a topic wants.

     Three modes. みる is the words with their meanings, to be looked
     at and heard. テスト takes the English away and asks what the
     word says. きく is the one the other two cannot do: the word is
     spoken and the choice is between spellings that differ only by a
     ー or a small ッ, which is where katakana actually goes wrong. */
  var kataMode = "look";
  /* A misspelling a student would actually make: the long mark left
     out, the small ッ left out, or the ten-ten dropped. Generated
     rather than written down, so a new word cannot arrive without its
     traps. */
  var TEN = { "ガ":"カ","ギ":"キ","グ":"ク","ゲ":"ケ","ゴ":"コ",
              "ザ":"サ","ジ":"シ","ズ":"ス","ゼ":"セ","ゾ":"ソ",
              "ダ":"タ","ヂ":"チ","ヅ":"ツ","デ":"テ","ド":"ト",
              "バ":"ハ","ビ":"ヒ","ブ":"フ","ベ":"ヘ","ボ":"ホ",
              "パ":"ハ","ピ":"ヒ","プ":"フ","ペ":"ヘ","ポ":"ホ" };
  function traps(ka){
    var out = [];
    function push(text, why){
      if (text !== ka && !out.some(function(o){ return o.ka === text; }))
        out.push({ ka: text, why: why });
    }
    var i = ka.indexOf("ー");
    if (i >= 0) push(ka.slice(0, i) + ka.slice(i + 1), "the ー makes the sound long");
    var j = ka.indexOf("ッ");
    if (j >= 0) push(ka.slice(0, j) + ka.slice(j + 1), "the small ッ is the little stop");
    for (var k = 0; k < ka.length && out.length < 2; k++){
      if (TEN[ka[k]])
        push(ka.slice(0, k) + TEN[ka[k]] + ka.slice(k + 1),
             "the marks beside " + TEN[ka[k]] + " change the sound");
    }
    /* the pairs a beginner's eye slides between. Same stroke, different
       sound, and no amount of listening to the word helps unless the
       difference is looked for. */
    var LOOK = { "シ":"ツ", "ツ":"シ", "ク":"タ", "タ":"ク", "ス":"ヌ", "ヌ":"ス" };
    for (var m = 0; m < ka.length && out.length < 2; m++){
      if (LOOK[ka[m]])
        push(ka.slice(0, m) + LOOK[ka[m]] + ka.slice(m + 1),
             ka[m] + " and " + LOOK[ka[m]] + " are not the same letter");
    }
    /* and if a word has none of those, the long mark goes in where it
       does not belong, which is the other thing a beginner writes */
    for (var n = ka.length - 1; n > 0 && out.length < 2; n--)
      push(ka.slice(0, n) + "ー" + ka.slice(n), "there is no ー in this one");
    return out;
  }

  DRAW.kata = function(){
    var KA = (M.katakana || {}).words || [];
    var rows = ((M.katakana || {}).rows || []).join("");
    var met = KA.filter(function(w){ return S.won["kamet:" + w.ka]; }).length;
    var read = KA.filter(function(w){ return S.won["karead:" + w.ka]; }).length;
    var heard = KA.filter(function(w){ return S.won["kahear:" + w.ka]; }).length;
    $("main").innerHTML = ruleFor("kata", "tight")
      + '<div class="work"><div class="col" id="kabody"></div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + foot('<button class="btn sm ' + (kataMode === "look" ? "" : "ghost")
          + '" id="mLook">みる</button>'
        + '<button class="btn sm ' + (kataMode === "test" ? "" : "ghost")
          + '" id="mTest">テスト</button>'
        + '<button class="btn sm ' + (kataMode === "hear" ? "" : "ghost")
          + '" id="mHear">きく</button>'
        + '<span class="hint">' + esc(rows) + ' lines only.</span>');
    $("sc").innerHTML = kataMode === "look"
      ? '<b>' + met + '</b> of ' + KA.length + ' heard'
      : (kataMode === "test"
          ? '<b>' + read + '</b> of ' + KA.length + ' read'
          : '<b>' + heard + '</b> of ' + KA.length + ' spelled');
    $("mLook").onclick = function(){ kataMode = "look"; DRAW.kata(); };
    $("mTest").onclick = function(){ kataMode = "test"; DRAW.kata(); };
    $("mHear").onclick = function(){ kataMode = "hear"; DRAW.kata(); };
    if (kataMode === "look") look();
    else if (kataMode === "test") test();
    else hear();

    function score(key, n){
      var got = KA.filter(function(w){ return S.won[key + w.ka]; }).length;
      $("sc").innerHTML = '<b>' + got + '</b> of ' + KA.length + ' ' + n;
      return got;
    }
    function look(){
      $("kabody").innerHTML = '<div class="kagrid">' + KA.map(function(w, i){
        return '<button class="kacard' + (S.won["kamet:" + w.ka] ? " seen" : "")
          + '" data-i="' + i + '">'
          + '<span class="kaface">' + esc(w.ka) + '</span>'
          + '<span class="kaen">' + esc(w.en) + '</span></button>';
      }).join("") + '</div>';
      each($("kabody"), "[data-i]", function(b){
        b.onclick = function(){
          var w = KA[+b.dataset.i];
          say(w.ka, null, true);
          b.classList.add("open");
          first("kamet:" + w.ka, 1, "katakana heard");
          if (score("kamet:", "heard") === KA.length) done("kata");
        };
      });
    }
    function test(){
      var i = dealt("kata", KA.length), w = KA[i];
      var others = shuffle(KA.filter(function(x){ return x.ka !== w.ka; }))
        .slice(0, 2).map(function(x){ return x.en; });
      var opts = shuffle([w.en].concat(others));
      $("kabody").innerHTML =
          '<div class="kask"><span class="kabig">' + esc(w.ka) + '</span></div>'
        + '<div class="tray">' + opts.map(function(o){
            return '<button class="piece word wide" data-o="' + esc(o) + '">'
              + '<span class="pen open">' + esc(o) + '</span></button>';
          }).join("") + '</div>';
      each($("kabody"), "[data-o]", function(b){
        b.onclick = function(){
          if (b.dataset.o !== w.en){
            b.classList.add("no"); yokai(b);
            var was = null;
            KA.forEach(function(x){ if (x.en === b.dataset.o) was = x; });
            $("fb").innerHTML = '<div class="mark no"><b>Not that one</b>'
              + (was ? esc(b.dataset.o) + ' is <span class="jp">' + esc(was.ka)
                       + '</span>' : esc(b.dataset.o)) + '</div>';
            return;
          }
          b.classList.add("ok"); ninja(b);
          say(w.ka, null, true);
          first("karead:" + w.ka, 1, "katakana read");
          advance("kata", KA.length);
          $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
            + '<span class="jp">' + esc(w.ka) + '</span> ' + saybtn(w.ka, true)
            + '<p>' + esc(w.en) + '</p></div>';
          wireSay();
          if (score("karead:", "read") >= Math.ceil(KA.length * 0.6)) done("kata");
          setTimeout(function(){ if (kataMode === "test") test(); }, 1300);
        };
      });
    }
    function hear(){
      var i = dealt("katah", KA.length), w = KA[i];
      var wrong = traps(w.ka).slice(0, 2);
      var opts = shuffle([{ ka: w.ka, why: null }].concat(wrong));
      $("kabody").innerHTML =
          '<div class="kask"><button class="btn sm" id="again">\u25b6 Listen</button></div>'
        + '<div class="tray">' + opts.map(function(o){
            return '<button class="piece word wide" data-k="' + esc(o.ka) + '">'
              + '<span class="pja kaopt">' + esc(o.ka) + '</span></button>';
          }).join("") + '</div>';
      say(w.ka, null, true);
      $("again").onclick = function(){ say(w.ka, null, true); };
      each($("kabody"), "[data-k]", function(b){
        b.onclick = function(){
          if (b.dataset.k !== w.ka){
            b.classList.add("no"); yokai(b);
            var miss = null;
            wrong.forEach(function(o){ if (o.ka === b.dataset.k) miss = o; });
            $("fb").innerHTML = '<div class="mark no"><b>Listen again</b>'
              + (miss ? esc(miss.why) : "") + '</div>';
            say(w.ka, null, true);
            return;
          }
          b.classList.add("ok"); ninja(b);
          first("kahear:" + w.ka, 1, "katakana spelled");
          advance("katah", KA.length);
          $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
            + '<span class="jp">' + esc(w.ka) + '</span> ' + saybtn(w.ka, true)
            + '<p>' + esc(w.en) + '</p></div>';
          wireSay();
          if (score("kahear:", "spelled") >= Math.ceil(KA.length * 0.6)) done("kata");
          setTimeout(function(){ if (kataMode === "hear") hear(); }, 1300);
        };
      });
    }
  };

  /* ================= ペア, the memory game =================
     Andrew: "games like memory where you have to flip over two random
     cards in a face-down set of cards and remember where the matching
     pairs are to collect pairs and win. Could we make it with a two
     player option on one screen? Pairs could be katakana and hiragana
     matching pairs, kanji and their meaning, vocab and their meaning,
     pictures and their vocab."

     All four, and two players on one laptop, which is the point of it:
     a game two students play side by side is a game they talk to each
     other in. The turn passes on a miss and stays on a match, which is
     the rule that makes it worth remembering where a card was rather
     than guessing.

     A card says its Japanese when it is turned over, so a pair that is
     missed is still a word heard twice. */
  var PAIRS = { kind: "word", two: false, n: 12 };
  var KINDS = [
    { id: "word",  ja: "ことば・いみ",     en: "a word and its meaning" },
    { id: "kanji", ja: "かんじ・いみ",     en: "a kanji and its meaning" },
    { id: "kana",  ja: "ひらがな・カタカナ", en: "the two scripts" },
    { id: "pic",   ja: "え・ことば",       en: "a picture and its word" }
  ];
  function pairDeck(kind, n){
    var out = [];
    if (kind === "kana"){
      shuffle(M.kana || []).slice(0, n / 2).forEach(function(k, i){
        out.push({ id: "k" + i, face: k.hira, say: k.hira, jp: true });
        out.push({ id: "k" + i, face: k.kata, say: k.kata, jp: true });
      });
    } else if (kind === "kanji"){
      /* no two kanji on the board may share a meaning: a card reading
         "friend" that fits either 友 or 友だち has no right answer.
         Shuffled before the cull, so it is not always the same one of
         the pair that gets dropped. */
      var seenEn = {};
      shuffle(M.kanji || []).filter(function(k){
        if (seenEn[k.en]) return false;
        seenEn[k.en] = 1; return true;
      }).slice(0, n / 2).forEach(function(k, i){
        out.push({ id: "j" + i, face: k.k, say: k.yomi[0], jp: true });
        out.push({ id: "j" + i, face: k.en, say: k.yomi[0], jp: false });
      });
    } else if (kind === "pic"){
      shuffle(W.filter(function(w){ return w.icon; })).slice(0, n / 2)
        .forEach(function(w, i){
          out.push({ id: "p" + i, face: w.icon, say: w.ja, jp: false, pic: true });
          out.push({ id: "p" + i, face: ruby(w.ja), say: w.ja, jp: true });
        });
    } else {
      shuffle(W.filter(function(w){ return w.en; })).slice(0, n / 2)
        .forEach(function(w, i){
          out.push({ id: "w" + i, face: ruby(w.ja), say: w.ja, jp: true });
          out.push({ id: "w" + i, face: w.en, say: w.ja, jp: false });
        });
    }
    return shuffle(out);
  }

  DRAW.pairs = function(){
    var deck = pairDeck(PAIRS.kind, PAIRS.n);
    var up = [], done = {}, turn = 0, score = [0, 0], tries = 0, busy = false;
    var kindName = "";
    KINDS.forEach(function(k){ if (k.id === PAIRS.kind) kindName = k.en; });

    $("main").innerHTML = ruleFor("pairs", "tight")
      + '<div class="work fit"><div class="col">'
      + '<div class="scoreline" id="who"></div>'
      + '<div class="board" id="board"></div>'
      + '<div id="fb" class="fbslot"></div>'
      + '</div></div>'
      + foot(KINDS.map(function(k){
          return '<button class="btn sm ' + (k.id === PAIRS.kind ? "" : "ghost")
            + '" data-kind="' + k.id + '" title="' + esc(k.en) + '">' + k.ja + '</button>';
        }).join("")
        + '<span class="gapsm"></span>'
        + '<button class="btn sm ' + (PAIRS.two ? "" : "ghost") + '" id="two">ふたり</button>'
        + '<button class="btn ghost sm" id="size">' + PAIRS.n + 'まい</button>'
        + '<button class="btn ghost sm" id="again">もう一回[いっかい]</button>');
    each($("main"), "[data-kind]", function(b){
      b.onclick = function(){ PAIRS.kind = b.dataset.kind; DRAW.pairs(); };
    });
    $("two").onclick = function(){ PAIRS.two = !PAIRS.two; DRAW.pairs(); };
    $("size").onclick = function(){
      PAIRS.n = PAIRS.n === 12 ? 16 : (PAIRS.n === 16 ? 20 : 12);
      DRAW.pairs();
    };
    $("again").onclick = function(){ DRAW.pairs(); };
    $("again").innerHTML = ruby("もう一回[いっかい]");

    paintWho();
    /* a seam for the check, which has to know which two cards make a
       pair before it can turn them over. Reading it changes nothing,
       and a student with the console open has bigger problems. */
    window.MEGA_PAIRS = deck.map(function(c){ return c.id; });
    $("board").innerHTML = deck.map(function(c, i){
      return '<button class="card" data-c="' + i + '" aria-label="card ' + (i + 1) + '">'
        + '<span class="back">日</span>'
        + '<span class="front' + (c.pic ? " pic" : "") + (c.jp ? " jp" : "")
        + '">' + c.face + '</span></button>';
    }).join("");
    each($("board"), "[data-c]", function(b){
      b.onclick = function(){ flip(+b.dataset.c, b); };
    });

    function paintWho(){
      $("who").innerHTML = PAIRS.two
        ? '<span class="pl' + (turn === 0 ? " on" : "") + '">ひとりめ <b>'
          + score[0] + '</b></span>'
          + '<span class="pl' + (turn === 1 ? " on" : "") + '">ふたりめ <b>'
          + score[1] + '</b></span>'
        : '<span class="pl on">' + esc(kindName) + '</span>';
      $("sc").innerHTML = PAIRS.two
        ? '<b>' + (score[0] + score[1]) + '</b> of ' + (PAIRS.n / 2) + ' pairs'
        : '<b>' + tries + '</b> turns'
          + (S.best && S.best[PAIRS.kind + PAIRS.n]
              ? ' · best ' + S.best[PAIRS.kind + PAIRS.n] : '');
    }
    function flip(i, btn){
      if (busy || done[i] || up.indexOf(i) >= 0) return;
      var c = deck[i];
      btn.classList.add("up");
      if (c.jp) say(c.say, null, true);
      up.push(i);
      if (up.length < 2) return;
      tries++;
      busy = true;
      var a = deck[up[0]], b = deck[up[1]];
      if (a.id === b.id){
        up.forEach(function(k){ done[k] = 1; });
        each($("board"), "[data-c]", function(x){
          if (up.indexOf(+x.dataset.c) >= 0) x.classList.add("got");
        });
        score[turn]++;
        up = []; busy = false;
        paintWho();
        if (Object.keys(done).length === deck.length) over();
        return;
      }
      setTimeout(function(){
        each($("board"), "[data-c]", function(x){
          if (up.indexOf(+x.dataset.c) >= 0) x.classList.remove("up");
        });
        up = []; busy = false;
        if (PAIRS.two){ turn = 1 - turn; }
        paintWho();
      }, 1100);
    }
    function over(){
      ninja($("fb"));
      if (PAIRS.two){
        var win = score[0] === score[1] ? "ひきわけ"
          : (score[0] > score[1] ? "ひとりめのかち" : "ふたりめのかち");
        $("fb").innerHTML = '<div class="mark yes"><b>' + esc(win) + '</b>'
          + score[0] + ' : ' + score[1] + '</div>';
      } else {
        var key = PAIRS.kind + PAIRS.n;
        S.best = S.best || {};
        var best = S.best[key];
        if (!best || tries < best){ S.best[key] = tries; save(); }
        first("pairs:" + PAIRS.kind, 3, "a board cleared");
        $("fb").innerHTML = '<div class="mark yes"><b>Done in ' + tries + ' turns</b>'
          + (best && tries < best ? "Your best yet." : (best ? "Your best is " + best + "." : ""))
          + '</div>';
      }
      done("pairs");
    }
  };

  /* ================= クイズ, the team quiz =================
     The only rung here that is not for a student at a laptop. This one
     goes on the projector and the teacher drives it: a question big
     enough to read from the back row, teams answering out loud in the
     room, and the teacher saying who got it.

     So the buttons are the teacher's, not the class's. The device
     never decides who was first, because a room decides that faster
     and more fairly than a laptop at the front can. What the device
     does is hold the question, hide the answer until it is wanted,
     keep the score, and get out of the way.

     Everything it asks comes from banks already in this unit, so a
     quiz is never a separate set of content to maintain. Tick the
     rounds you want and it deals them shuffled together.

     The keyboard runs it, because a teacher standing at a board wants
     one hand on the laptop and their eyes on the room:
       space   show the answer, then move on
       1 2 3 4 give the point to that team
       0       nobody got it
       r       read the Japanese out again */
  var QUIZ = {
    teams: 3,
    banks: { word: 1, kanji: 1, kata: 0, verb: 0, sent: 0 },
    on: false
  };
  var QBANKS = [
    { id: "word",  ja: "ことば",   en: "words" },
    { id: "kanji", ja: "かんじ",   en: "kanji" },
    { id: "kata",  ja: "カタカナ", en: "katakana" },
    { id: "verb",  ja: "どうし",   en: "verbs" },
    { id: "sent",  ja: "ぶん",     en: "sentences" }
  ];
  var QFORM = [
    { id: "pos",     ja: "ます",           en: "will" },
    { id: "neg",     ja: "ません",         en: "will not" },
    { id: "past",    ja: "ました",         en: "did" },
    { id: "pastneg", ja: "ませんでした",   en: "did not" }
  ];
  function quizBank(){
    /* ans is the answer in the biggest type on the screen; sub is the
       gloss under it. A reading and a meaning are two different
       answers and must not run together on one line. */
    var out = [];
    if (QUIZ.banks.word)
      W.filter(function(w){ return w.en; }).forEach(function(w){
        out.push({ ask: w.en, ans: ruby(w.ja), say: w.ja, tag: "ことば" });
      });
    if (QUIZ.banks.kanji)
      (M.kanji || []).forEach(function(k){
        out.push({ ask: plain(k.k), askJp: true, ans: esc(k.yomi.join("・")),
                   sub: k.en, say: k.yomi[0], tag: "かんじ" });
      });
    if (QUIZ.banks.kata)
      ((M.katakana || {}).words || []).forEach(function(w){
        out.push({ ask: w.ka, askJp: true, ans: esc(w.en), ansEn: true,
                   say: w.ka, tag: "カタカナ" });
      });
    if (QUIZ.banks.verb)
      (M.verbs || []).forEach(function(v){
        QFORM.forEach(function(f){
          out.push({ ask: v.en + "  →  " + f.en + " (" + f.ja + ")",
                     ans: ruby(v.forms[f.id]), say: v.forms[f.id],
                     tag: "どうし" });
        });
      });
    if (QUIZ.banks.sent)
      (M.sentences || []).forEach(function(sn){
        var parts = sentenceOf(sn), ja = "";
        parts.forEach(function(x){ ja += x.w.ja + x.slot.part; });
        ja += "行[い]きます";
        out.push({ ask: sn.en, ans: ruby(ja), say: ja, tag: "ぶん" });
      });
    return shuffle(out);
  }
  DRAW.quiz = function(){
    if (!QUIZ.on) return quizSetup();
    var bank = quizBank();
    if (!bank.length){ QUIZ.on = false; return quizSetup(); }
    var i = 0, shown = false, score = [], q = null;
    for (var t = 0; t < QUIZ.teams; t++) score.push(0);

    document.body.classList.add("gamefull");
    $("main").innerHTML =
        '<div class="quiz">'
      + '<div class="qteams" id="qteams"></div>'
      + '<div class="qcard">'
      + '<div class="qtag" id="qtag"></div>'
      + '<div class="qask" id="qask"></div>'
      + '<div class="qans" id="qans" hidden></div>'
      + '<div class="qsub" id="qsub" hidden></div>'
      + '</div>'
      + '<div class="qbar" id="qbar"></div>'
      + '</div>'
      + foot('<button class="btn sm ghost" id="qend">やめる <span class="en">Finish</span></button>');
    $("qend").onclick = function(){ QUIZ.on = false; DRAW.quiz(); };

    /* a seam for the check: the question, whether the answer is out,
       and the score */
    window.MEGA_QUIZ = {
      ask: function(){ return q ? q.ask : null; },
      shown: function(){ return shown; },
      score: function(){ return score.slice(); },
      left: function(){ return bank.length - i; }
    };

    function onKey(e){
      var k = (e.key || "").toLowerCase();
      if (k === " " || k === "spacebar" || e.code === "Space"){
        e.preventDefault(); shown ? next() : reveal(); return;
      }
      if (k === "r"){ if (q) say(q.say, null, true); return; }
      if (k === "0"){ if (shown) award(-1); return; }
      var n = parseInt(k, 10);
      if (n >= 1 && n <= QUIZ.teams && shown) award(n - 1);
    }
    document.addEventListener("keydown", onKey);
    if (KEYOFF) document.removeEventListener("keydown", KEYOFF);
    KEYOFF = onKey;

    paintTeams(); ask();

    function paintTeams(){
      $("qteams").innerHTML = score.map(function(n, t){
        return '<div class="qteam"><b>' + (t + 1) + '</b><span>' + n + '</span></div>';
      }).join("");
      $("sc").innerHTML = '<b>' + (i + 1) + '</b> of ' + bank.length;
    }
    /* A sentence is twenty times the length of a kanji and cannot be
       set in the same type. The size steps down with the length, so
       the longest answer still fits above the buttons instead of
       pushing them off the bottom of the projector. */
    function fit(el, n){
      el.classList.remove("len2", "len3");
      if (n > 24) el.classList.add("len3");
      else if (n > 9) el.classList.add("len2");
    }
    function ask(){
      if (i >= bank.length) return over();
      q = bank[i]; shown = false;
      $("qtag").textContent = q.tag;
      $("qask").className = "qask" + (q.askJp ? " jp" : "");
      fit($("qask"), q.askJp ? q.ask.length : Math.ceil(q.ask.length / 2.2));
      $("qask").innerHTML = q.askJp ? esc(q.ask) : esc(q.ask);
      $("qans").hidden = true;
      $("qans").innerHTML = "";
      $("qsub").hidden = true;
      $("qsub").innerHTML = "";
      $("qbar").innerHTML =
          '<button class="btn big" id="qshow">こたえ <span class="en">Show the answer  (space)</span></button>';
      $("qshow").onclick = reveal;
      paintTeams();
    }
    function reveal(){
      if (shown) return;
      shown = true;
      $("qans").className = "qans" + (q.ansEn ? " en" : "");
      $("qans").hidden = false;
      $("qans").innerHTML = q.ans;
      fit($("qans"), q.ansEn ? Math.ceil($("qans").textContent.length / 2.2)
                             : plain($("qans").textContent).length);
      $("qsub").hidden = !q.sub;
      $("qsub").textContent = q.sub || "";
      if (q.say) say(q.say, null, true);
      $("qbar").innerHTML =
          '<span class="qwho">Who got it?</span>'
        + score.map(function(n, t){
            return '<button class="btn qpt" data-t="' + t + '">' + (t + 1) + '</button>';
          }).join("")
        + '<button class="btn ghost qpt" data-t="-1">だれも <span class="en">Nobody  (0)</span></button>'
        + '<button class="btn ghost sm" id="qsay">▶ <span class="en">Again  (r)</span></button>';
      each($("qbar"), "[data-t]", function(b){
        b.onclick = function(){ award(+b.dataset.t); };
      });
      $("qsay").onclick = function(){ say(q.say, null, true); };
    }
    function award(t){
      if (!shown) return;
      if (t >= 0){ score[t]++; CLICK.play ? CLICK.play() : 0; }
      next();
    }
    function next(){ i++; ask(); }
    function over(){
      var top = Math.max.apply(null, score);
      var winners = [];
      score.forEach(function(n, t){ if (n === top) winners.push(t + 1); });
      ninja($("qbar"));
      $("qtag").textContent = "";
      $("qask").className = "qask jp";
      $("qask").textContent = winners.length > 1
        ? "ひきわけ" : ("チーム " + winners[0] + " のかち");
      $("qsub").hidden = true;
      $("qans").className = "qans en";
      $("qans").hidden = false;
      $("qans").innerHTML = score.map(function(n, t){
        return '<span class="qfin">' + (t + 1) + ': <b>' + n + '</b></span>';
      }).join("");
      $("qbar").innerHTML =
          '<button class="btn big" id="qagain">もう一回 <span class="en">Play again</span></button>';
      $("qagain").onclick = function(){ DRAW.quiz(); };
      done("quiz");
    }
  };
  function quizSetup(){
    document.body.classList.remove("gamefull");
    var n = 0;
    QBANKS.forEach(function(b){ if (QUIZ.banks[b.id]) n++; });
    $("main").innerHTML = ruleFor("quiz", "tight")
      + '<div class="work fit"><div class="col qsetup">'
      + '<p class="qlead">Put this on the projector. Split the class into teams. '
      + 'Read the question out, let them answer in the room, then tap who got it.</p>'
      + '<div class="qrow"><span class="qlab">Teams</span>'
      + [2, 3, 4].map(function(t){
          return '<button class="btn sm ' + (QUIZ.teams === t ? "" : "ghost")
            + '" data-team="' + t + '">' + t + '</button>';
        }).join("")
      + '</div>'
      + '<div class="qrow"><span class="qlab">Ask about</span>'
      + QBANKS.map(function(b){
          return '<button class="btn sm ' + (QUIZ.banks[b.id] ? "" : "ghost")
            + '" data-bank="' + b.id + '" title="' + esc(b.en) + '">' + b.ja + '</button>';
        }).join("")
      + '</div>'
      + '<p class="qkeys">Space shows the answer and moves on. '
      + 'Press 1, 2, 3 or 4 to give the point, 0 for nobody, r to hear it again.</p>'
      + '<div class="qrow"><button class="btn big" id="qgo"'
      + (n ? "" : " disabled") + '>はじめ <span class="en">Start the quiz</span></button></div>'
      + '</div></div>'
      + foot("");
    each($("main"), "[data-team]", function(b){
      b.onclick = function(){ QUIZ.teams = +b.dataset.team; quizSetup(); };
    });
    each($("main"), "[data-bank]", function(b){
      b.onclick = function(){
        QUIZ.banks[b.dataset.bank] = QUIZ.banks[b.dataset.bank] ? 0 : 1;
        quizSetup();
      };
    });
    $("qgo").onclick = function(){ QUIZ.on = true; DRAW.quiz(); };
    $("sc").innerHTML = n ? (quizBank().length + " questions ready")
                          : "Pick at least one thing to ask about";
  }

  /* ================= かるた =================
     The game they already know, and the only one here that is pure
     listening under pressure. The app reads a word; the cards are
     face up; whoever finds it first takes it.

     Four sets, the same idea as ことばキャッチ: hear a word and tap
     the picture, the Japanese, the kanji, or the katakana. The call
     is always audio and never written, because a written call turns
     a listening race into a matching puzzle.

     Two players share one laptop, and a race on a shared screen needs
     a way to tell who got there first, so it is buzz then grab:
     ひだり claims with A, みぎ claims with L, and the player who
     claimed has the board to themselves until they tap. Tap the wrong
     card and the other player gets a free grab at the same call. That
     is how the argument gets settled at a real table too.

     Alone, it is the clock: clear the board, and the app remembers
     your best time for that set and that many cards. */
  var KARUTA = { kind: "pic", two: false, n: 9 };
  var KSETS = [
    { id: "pic",   ja: "え",       en: "hear a word, tap the picture" },
    { id: "word",  ja: "ことば",   en: "hear a word, tap the Japanese" },
    { id: "kanji", ja: "かんじ",   en: "hear a reading, tap the kanji" },
    { id: "kata",  ja: "カタカナ", en: "hear a word, tap the katakana" }
  ];
  /* An id names the word, not the square it landed on. The ledger pays
     the first time a word is taken and never again, so an index would
     pay nine times for nine squares however often the deck reshuffled. */
  function karutaDeck(kind, n){
    if (kind === "kanji")
      return shuffle(M.kanji || []).slice(0, n).map(function(k){
        return { id: "j:" + plain(k.k), face: ruby(k.k), say: k.yomi[0],
                 jp: true, en: k.en };
      });
    if (kind === "kata")
      return shuffle((M.katakana || {}).words || []).slice(0, n).map(function(w){
        return { id: "t:" + w.ka, face: esc(w.ka), say: w.ka, jp: true, en: w.en };
      });
    if (kind === "pic")
      return shuffle(W.filter(function(w){ return w.icon; })).slice(0, n)
        .map(function(w){
          return { id: "p:" + w.id, face: esc(w.icon), say: w.ja, pic: true, en: w.en };
        });
    return shuffle(W.filter(function(w){ return w.en; })).slice(0, n)
      .map(function(w){
        return { id: "w:" + w.id, face: ruby(w.ja), say: w.ja, jp: true, en: w.en };
      });
  }
  DRAW.karuta = function(){
    var deck = shuffle(karutaDeck(KARUTA.kind, KARUTA.n));
    var left = deck.slice(), call = null, score = [0, 0], claim = null,
        tried = {}, began = 0, overYet = false;
    var setName = "";
    KSETS.forEach(function(k){ if (k.id === KARUTA.kind) setName = k.en; });

    $("main").innerHTML = ruleFor("karuta", "tight")
      + '<div class="work fit"><div class="col">'
      + '<div class="scoreline" id="who"></div>'
      + '<div class="callbar"><button class="btn" id="again2">'
      + 'もう一度[いちど] <span class="en">Play it again</span></button>'
      + '<span class="callnote" id="note"></span></div>'
      + '<div class="board tori" id="board"></div>'
      + '<div class="buzz" id="buzz" hidden>'
      + '<button class="bz" data-p="0"><b>ひだり</b><i>press A</i></button>'
      + '<button class="bz" data-p="1"><b>みぎ</b><i>press L</i></button>'
      + '</div>'
      + '<div id="fb" class="fbslot"></div>'
      + '</div></div>'
      + foot(KSETS.map(function(k){
          return '<button class="btn sm ' + (k.id === KARUTA.kind ? "" : "ghost")
            + '" data-set="' + k.id + '" title="' + esc(k.en) + '">' + k.ja + '</button>';
        }).join("")
        + '<span class="gapsm"></span>'
        + '<button class="btn sm ' + (KARUTA.two ? "" : "ghost") + '" id="two2">ふたり</button>'
        + '<button class="btn ghost sm" id="size2">' + KARUTA.n + 'まい</button>'
        + '<button class="btn ghost sm" id="deal">はじめ</button>');
    $("again2").innerHTML = ruby("もう一度[いちど]") + ' <span class="en">Play it again</span>';

    each($("main"), "[data-set]", function(b){
      b.onclick = function(){ KARUTA.kind = b.dataset.set; DRAW.karuta(); };
    });
    $("two2").onclick = function(){ KARUTA.two = !KARUTA.two; DRAW.karuta(); };
    $("size2").onclick = function(){
      KARUTA.n = KARUTA.n === 9 ? 12 : (KARUTA.n === 12 ? 6 : 9);
      DRAW.karuta();
    };
    $("deal").onclick = function(){ DRAW.karuta(); };
    $("again2").onclick = function(){ if (call) say(call.say, null, true); };

    $("board").innerHTML = deck.map(function(c, i){
      return '<button class="card up" data-c="' + i + '">'
        + '<span class="front' + (c.pic ? " pic" : "") + (c.jp ? " jp" : "")
        + '">' + c.face + '</span></button>';
    }).join("");
    each($("board"), "[data-c]", function(b){
      b.onclick = function(){ grab(+b.dataset.c, b); };
    });
    $("buzz").hidden = !KARUTA.two;
    each($("buzz"), "[data-p]", function(b){
      b.onclick = function(){ buzz(+b.dataset.p); };
    });
    /* the keys matter more than the buttons: two students reaching for
       the same screen knock each other off it, and two keys at opposite
       ends of the keyboard are a fair race */
    function onKey(e){
      if (!KARUTA.two || overYet) return;
      var k = (e.key || "").toLowerCase();
      if (k === "a") buzz(0); else if (k === "l") buzz(1);
    }
    document.addEventListener("keydown", onKey);
    if (KEYOFF) document.removeEventListener("keydown", KEYOFF);
    KEYOFF = onKey;

    /* a seam for the check: what is on the table, and what is being
       asked for right now */
    window.MEGA_KARUTA = {
      cards: function(){ return deck.map(function(c){ return c.id; }); },
      call: function(){ return call ? call.id : null; },
      claim: function(){ return claim; }
    };

    paintWho();
    next();

    function paintWho(){
      $("who").innerHTML = KARUTA.two
        ? '<span class="pl' + (claim === 0 ? " on" : "") + '">ひだり <b>'
          + score[0] + '</b></span>'
          + '<span class="pl' + (claim === 1 ? " on" : "") + '">みぎ <b>'
          + score[1] + '</b></span>'
        : '<span class="pl on">' + esc(setName) + '</span>';
      var key = "karuta:" + KARUTA.kind + KARUTA.n;
      $("sc").innerHTML = KARUTA.two
        ? '<b>' + (score[0] + score[1]) + '</b> of ' + deck.length + ' taken'
        : '<b>' + (deck.length - left.length) + '</b> of ' + deck.length
          + (S.best && S.best[key] ? ' · best ' + S.best[key] + 's' : '');
      $("note").textContent = !KARUTA.two ? ""
        : (claim === null ? "Press A or L to claim it."
                          : (claim === 0 ? "ひだり, grab it." : "みぎ, grab it."));
    }
    function next(){
      if (!left.length) return over();
      claim = null; tried = {};
      call = left[Math.floor(Math.random() * left.length)];
      if (!began) began = Date.now();
      paintWho();
      say(call.say, null, true);
    }
    function buzz(p){
      if (claim !== null || tried[p] || !call) return;
      claim = p; paintWho();
    }
    function grab(i, btn){
      var c = deck[i];
      if (!call || btn.classList.contains("got")) return;
      if (KARUTA.two && claim === null) return;          /* claim it first */
      var who = KARUTA.two ? claim : 0;
      if (c.id === call.id){
        btn.classList.add("got");
        left = left.filter(function(x){ return x.id !== c.id; });
        score[who]++;
        if (!KARUTA.two) first("karuta:" + c.id, 1, "taken");
        paintWho();
        setTimeout(next, 420);
        return;
      }
      /* a wrong card is not taken off the table: it is still the right
         card for a later call, and removing it would hand the student
         the answer by elimination */
      btn.classList.add("miss");
      setTimeout(function(){ btn.classList.remove("miss"); }, 420);
      CLICK.clunk();
      if (KARUTA.two){
        tried[who] = 1;
        claim = tried[1 - who] ? null : 1 - who;
        paintWho();
        if (claim === null) setTimeout(function(){ say(call.say, null, true); }, 450);
      } else {
        setTimeout(function(){ say(call.say, null, true); }, 450);
      }
    }
    function over(){
      overYet = true;
      ninja($("fb"));
      if (KARUTA.two){
        var win = score[0] === score[1] ? "ひきわけ"
          : (score[0] > score[1] ? "ひだりのかち" : "みぎのかち");
        $("fb").innerHTML = '<div class="mark yes"><b>' + esc(win) + '</b>'
          + score[0] + ' : ' + score[1] + '</div>';
      } else {
        var secs = Math.max(1, Math.round((Date.now() - began) / 1000));
        var key = "karuta:" + KARUTA.kind + KARUTA.n;
        S.best = S.best || {};
        var best = S.best[key];
        if (!best || secs < best){ S.best[key] = secs; save(); }
        $("fb").innerHTML = '<div class="mark yes"><b>' + secs + ' seconds</b>'
          + (best && secs < best ? "Your best yet."
             : (best ? "Your best is " + best + "s." : "")) + '</div>';
      }
      done("karuta");
    }
  };

  /* ================= かんじ =================
     The unit's twenty-four, off Andrew's topic kanji list. Two modes,
     the same pair ことば uses in ひと: みる puts them in front of the
     student with their reading, their meaning and their sound, and
     テスト takes the reading away and asks for it.

     A card in みる pays once, the first time it is turned over, and
     テスト pays once per kanji read correctly, so a student who knows
     them already does not farm the grid.

     Readings are kana. Andrew: "We need to avoid romaji because the
     current cohort has become reliant on it." */
  var kanjiMode = "look";
  DRAW.kanji = function(){
    var K = M.kanji || [];
    /* declared up here and not beside the test: the dispatch at the
       bottom of this block runs before anything written below it, and
       a round of undefined questions is no round at all */
    var ROUND = 6, round = null;
    var met = K.filter(function(k){ return S.won["kmet:" + k.k]; }).length;
    var read = K.filter(function(k){ return S.won["kread:" + k.k]; }).length;
    $("main").innerHTML = ruleFor("kanji", "tight")
      + '<div class="work"><div class="col" id="kbody"></div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + foot('<button class="btn sm ' + (kanjiMode === "look" ? "" : "ghost")
          + '" id="mLook">みる</button>'
        + '<button class="btn sm ' + (kanjiMode === "test" ? "" : "ghost")
          + '" id="mTest">テスト</button>'
        + '<span class="hint">' + (kanjiMode === "look"
            ? "Tap a kanji to hear it." : "Six at a time, and the question changes.")
        + '</span>');
    $("sc").innerHTML = kanjiMode === "look"
      ? '<b>' + met + '</b> of ' + K.length + ' turned over'
      : '<b>' + read + '</b> of ' + K.length + ' read';
    $("mLook").onclick = function(){ kanjiMode = "look"; DRAW.kanji(); };
    $("mTest").onclick = function(){ kanjiMode = "test"; DRAW.kanji(); };
    if (kanjiMode === "look") look(); else test();

    function score(){
      var n = K.filter(function(k){ return S.won["kread:" + k.k]; }).length;
      $("sc").innerHTML = '<b>' + n + '</b> of ' + K.length + ' read';
      return n;
    }

    function look(){
      $("kbody").innerHTML = '<div class="kgrid">' + K.map(function(k, i){
        var seen = S.won["kmet:" + k.k];
        return '<button class="kcard' + (seen ? " seen" : "") + '" data-k="' + i + '">'
          + '<span class="kface">' + esc(k.k) + '</span>'
          + '<span class="kyomi">' + esc(k.yomi.join("・")) + '</span>'
          + '<span class="ken">' + esc(k.en) + '</span></button>';
      }).join("") + '</div>';
      each($("kbody"), "[data-k]", function(b){
        b.onclick = function(){
          var k = K[+b.dataset.k];
          b.classList.add("open");
          say(k.yomi[0], null, true);
          first("kmet:" + k.k, 1, "kanji met");
          var n = K.filter(function(x){ return S.won["kmet:" + x.k]; }).length;
          $("sc").innerHTML = '<b>' + n + '</b> of ' + K.length + ' turned over';
          if (n === K.length) done("kanji");
        };
      });
    }

    /* ---- the test, in rounds of six ----
       Andrew: "the kanji test is great but probably too long (and
       unengaging) with 24 kanji in a row. Can it be shorter, rotate
       different ones each time, involve another method of testing
       knowledge, use English meaning or other testing method
       variation to keep it interesting?"

       So: six questions, then a score and a new six. The deck deals
       them, so all twenty-four come round before any of them comes
       round twice, and the question changes shape as it goes:

         よみ     the kanji, and three readings
         いみ     the kanji, and three meanings
         かんじ   the meaning, and three kanji to choose between
         きく     the reading spoken, and three kanji

       The last two run the other way round, which is the half a
       recognition test leaves out: a student who can read 海 cannot
       necessarily find 海 among 店 and 町. */
    function newRound(){
      var list = [];
      for (var i = 0; i < ROUND; i++){
        var at = dealt("kanji", K.length);
        advance("kanji", K.length);
        list.push(K[at]);
      }
      var kinds = shuffle(["yomi", "imi", "kanji", "kiku", "yomi", "imi"]);
      round = { list: list, kinds: kinds, at: 0, right: 0 };
    }
    function test(){
      if (!round) newRound();
      if (round.at >= ROUND) return endRound();
      var k = round.list[round.at], kind = round.kinds[round.at];
      /* ---- a distractor has to be wrong ----
         It is not enough for it to be a different kanji. 友 and 友だち
         both mean "friend", so offering both under "What does it
         mean?" puts the same word in the tray twice and marks one of
         them wrong, and under "Which kanji?" it gives the question two
         right answers. So the two decoys must differ from the answer
         in whatever the question is actually asking about. */
      function decoys(field){
        var seen = {}, out = [];
        seen[field(k)] = 1;
        shuffle(K).forEach(function(x){
          if (x.k === k.k || out.length >= 2) return;
          var v = field(x);
          if (seen[v]) return;
          seen[v] = 1; out.push(x);
        });
        return out;
      }
      var yomiOf = function(x){ return x.yomi[0]; },
          enOf   = function(x){ return x.en; };
      var others;
      var ask, opts, key, shown;
      if (kind === "yomi"){
        others = decoys(yomiOf);
        ask = '<span class="kbig">' + esc(k.k) + '</span>'
            + '<span class="kq">Which reading?</span>';
        key = k.yomi[0];
        opts = [k.yomi[0]].concat(others.map(function(x){ return x.yomi[0]; }));
        shown = function(o){ return '<span class="pja">' + esc(o) + '</span>'; };
      } else if (kind === "imi"){
        others = decoys(enOf);
        ask = '<span class="kbig">' + esc(k.k) + '</span>'
            + '<span class="kq">What does it mean?</span>';
        key = k.en;
        opts = [k.en].concat(others.map(function(x){ return x.en; }));
        shown = function(o){ return '<span class="pen open">' + esc(o) + '</span>'; };
      } else if (kind === "kanji"){
        /* the question is the meaning, so a decoy that means the same
           thing would be a second right answer */
        others = decoys(enOf);
        ask = '<span class="kmean">' + esc(k.en) + '</span>'
            + '<span class="kq">Which kanji?</span>';
        key = k.k;
        opts = [k.k].concat(others.map(function(x){ return x.k; }));
        shown = function(o){ return '<span class="pja big">' + esc(o) + '</span>'; };
      } else {
        /* the question is the reading, spoken */
        others = decoys(yomiOf);
        ask = '<button class="btn sm" id="hear">▶ Listen</button>'
            + '<span class="kq">Which kanji is it?</span>';
        key = k.k;
        opts = [k.k].concat(others.map(function(x){ return x.k; }));
        shown = function(o){ return '<span class="pja big">' + esc(o) + '</span>'; };
      }
      $("kbody").innerHTML =
          '<div class="kround">' + (round.at + 1) + ' of ' + ROUND + '</div>'
        + '<div class="kask">' + ask + '</div>'
        + '<div class="tray" id="kopts">' + shuffle(opts).map(function(o){
            return '<button class="piece word wide" data-o="' + esc(o) + '">'
              + shown(o) + '</button>';
          }).join("") + '</div>';
      if (kind === "kiku"){
        say(k.yomi[0], null, true);
        $("hear").onclick = function(){ say(k.yomi[0], null, true); };
      }
      /* a seam for the check. The listening question cannot be answered
         from the page, which is the point of it, so the answer is put
         where a test can read it. Reading it changes nothing. */
      window.MEGA_KANJI = { kind: kind, answer: key, at: round.at, of: ROUND };
      each($("kbody"), "[data-o]", function(b){
        b.onclick = function(){
          var chosen = b.dataset.o;
          if (kind === "yomi") say(chosen, null, true);
          if (chosen !== key){
            b.classList.add("no"); yokai(b);
            var was = null;
            K.forEach(function(x){
              if (x.k === chosen || x.en === chosen || x.yomi[0] === chosen) was = x;
            });
            $("fb").innerHTML = '<div class="mark no"><b>Not that one</b>'
              + (was ? '<span class="jp">' + esc(was.k) + '</span> is '
                       + esc(was.yomi.join("・")) + ', ' + esc(was.en)
                     : esc(chosen)) + '</div>';
            return;
          }
          b.classList.add("ok"); ninja(b);
          say(k.yomi[0], null, true);
          round.right++;
          first("kread:" + k.k, 1, "kanji");
          $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
            + '<span class="jp">' + esc(k.k) + '　' + esc(k.yomi.join("・")) + '</span> '
            + saybtn(k.yomi[0], true) + '<p>' + esc(k.en) + '</p></div>';
          wireSay();
          score();
          round.at++;
          setTimeout(function(){ if (onTest()) test(); }, 1100);
        };
      });
    }
    function endRound(){
      var n = round.right;
      $("kbody").innerHTML =
          '<div class="kdone"><b>' + n + ' of ' + ROUND + '</b>'
        + '<p>' + (n === ROUND ? "Every one of them."
                   : (n >= ROUND - 1 ? "One to look at again."
                      : "The grid is under みる whenever you want it.")) + '</p>'
        + '<div class="row"><button class="btn sm" id="more">Six more</button>'
        + '<button class="btn ghost sm" id="grid">みる</button></div></div>';
      /* a clean round pays every time, because the six are never the
         same six: the deck has dealt them all before it deals any of
         them twice */
      if (n === ROUND) award(2, "a clean round");
      if (score() >= 18) done("kanji");
      $("more").onclick = function(){ newRound(); test(); };
      $("grid").onclick = function(){ kanjiMode = "look"; DRAW.kanji(); };
    }
    function onTest(){ return kanjiMode === "test"; }
  };

  /* ================= どうし =================
     Andrew's conjugation sheet, all eight verbs and all four boxes. The
     ます form is given, because the sheet gives it: the task is the
     ending, not the verb. Three choices, and the two wrong ones are
     always real endings off the same table, so a guess is a guess
     between forms rather than between a word and a noise. */
  DRAW.verb = function(){
    var V = M.verbs, B = M.boxes;
    var vi = dealt("verb", V.length), bi = dealt("box", B.length);
    var v = V[vi], box = B[bi];
    var right = v.forms[box.id];
    var others = shuffle(B.filter(function(b){ return b.id !== box.id; }))
      .slice(0, 2).map(function(b){ return v.forms[b.id]; });
    var opts = shuffle([right].concat(others));
    var tally = 0;
    V.forEach(function(x){
      B.forEach(function(b){ if (S.won["verb:" + x.id + ":" + b.id]) tally++; });
    });
    $("main").innerHTML = ruleFor("verb", "tight")
      + '<div class="work fit"><div class="col">'
      + '<div class="vcard">'
      + '<div class="vicon" aria-hidden="true">' + v.icon + '</div>'
      + '<div class="vask"><span class="jp big">' + ruby(v.forms.pos) + '</span> '
      + saybtn(plain(v.forms.pos), true)
      + '<p>' + esc(v.en) + '</p></div>'
      + '<div class="vwant"><b>' + esc(box.en) + '</b>'
      + '<span class="tag">' + esc(box.tag) + '</span></div></div>'
      + '<div class="tray" id="opts">' + opts.map(function(o){
          return '<button class="piece word wide" data-o="' + esc(plain(o)) + '">'
            + '<span class="pja">' + ruby(o) + '</span></button>';
        }).join("") + '</div>'
      + '</div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + foot('<button class="btn ghost sm" id="next">Another verb</button>'
        + '<span class="hint">The ending is the whole job.</span>');
    $("sc").innerHTML = '<b>' + tally + '</b> of ' + (V.length * B.length) + ' done';
    each($("opts"), "[data-o]", function(b){
      b.onclick = function(){
        var chosen = b.dataset.o;
        say(chosen, null, true);
        if (chosen !== plain(right)){
          b.classList.add("no");
          yokai(b);
          var was = null;
          B.forEach(function(x){ if (plain(v.forms[x.id]) === chosen) was = x; });
          $("fb").innerHTML = '<div class="mark no"><b>That is '
            + esc(was ? was.en : "another form") + '</b>'
            + 'The one wanted is ' + esc(box.en) + ', ' + esc(box.tag) + '.</div>';
          return;
        }
        b.classList.add("ok");
        ninja(b);
        first("verb:" + v.id + ":" + box.id, 1, "verb form");
        advance("verb", V.length); advance("box", B.length);
        $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
          + '<span class="jp">' + ruby(right) + '</span> ' + saybtn(plain(right), true)
          + '<p>' + esc(v.en) + ', ' + esc(box.en) + '</p></div>';
        wireSay();
        var n = 0;
        V.forEach(function(x){
          B.forEach(function(y){ if (S.won["verb:" + x.id + ":" + y.id]) n++; });
        });
        $("sc").innerHTML = '<b>' + n + '</b> of ' + (V.length * B.length) + ' done';
        if (n >= 12) done("verb");
        setTimeout(function(){ DRAW.verb(); }, 1400);
      };
    });
    $("next").onclick = function(){
      advance("verb", V.length); advance("box", B.length); DRAW.verb();
    };
  };

  /* ================= はやく =================
     Read the whole sentence out loud, then stop the clock. Nothing here
     can hear the student, and the app says so: the clock is the
     student's own, and the only thing it proves is that the sentence
     came out in one piece. すげー！ is Andrew's word for a good one. */
  DRAW.fast = function(){
    var S9 = M.sentences;
    var si = dealt("fast", S9.length);
    var parts = sentenceOf(S9[si]);
    var line = lineOf(parts);
    var best = S.wrote["fast:" + si] || 0;
    var t0 = 0, timer = null;
    $("main").innerHTML = ruleFor("fast", "tight")
      + '<div class="work fit"><div class="col">'
      + '<div class="bigline jp" id="line">' + ruby(parts.map(function(p){
          return plain(p.w.ja) + partOf(p.slot, p.w);
        }).join("　") + "　" + plain(M.verb.ja) + "。") + '</div>'
      + '<div class="icons" aria-hidden="true">' + parts.map(function(p){
          return '<span class="pic">' + p.w.icon + '</span>';
        }).join("") + '<span class="pic">' + M.verb.icon + '</span></div>'
      + '<div class="clock" id="clock">—</div>'
      + '<div id="fb" class="fbslot"></div>'
      + '</div></div>'
      + foot('<button class="btn sm" id="go">Start</button>'
        + '<button class="btn ghost sm" id="hear">Hear it</button>'
        + '<button class="btn ghost sm" id="other">Another sentence</button>');
    $("sc").innerHTML = best
      ? '<b>' + (best / 1000).toFixed(1) + 's</b> your best'
      : 'read it out loud';
    $("hear").onclick = function(){ say(line); };
    $("other").onclick = function(){ advance("fast", S9.length); DRAW.fast(); };
    $("go").onclick = function(){
      if (timer){
        clearInterval(timer); timer = null;
        var ms = Date.now() - t0;
        $("go").textContent = "Start";
        /* A floor as well as a ceiling. A megasentence spoken out loud
           takes about four seconds, so anything under that is two taps
           rather than a reading, and it pays nothing. */
        var tooQuick = ms < 3500, under = ms < 9000;
        var fresh = !tooQuick && (!best || ms < best);
        if (fresh){ S.wrote["fast:" + si] = ms; save(); }
        if (!tooQuick && under){ ninja($("fb")); first("fast:" + si, 2, "read fast"); }
        $("fb").innerHTML = '<div class="mark '
          + (tooQuick ? "hm" : (under ? "yes" : "hm")) + '"><b>'
          + (tooQuick ? "Out loud, all of it" : (under ? esc(M.ui.fast_praise) : "Again"))
          + '</b>' + (ms / 1000).toFixed(1) + ' seconds'
          + (fresh ? ', your best yet' : '')
          + (tooQuick ? '. Nobody says a whole megasentence in that.'
                      : (under ? '' : '. Nine seconds is the one to beat.'))
          + '</div>';
        var n = S9.filter(function(_, i){ return S.won["fast:" + i]; }).length;
        if (n >= 3) done("fast");
        return;
      }
      t0 = Date.now();
      $("go").textContent = "Done";
      $("fb").innerHTML = "";
      timer = setInterval(function(){
        $("clock").textContent = ((Date.now() - t0) / 1000).toFixed(1) + "s";
      }, 100);
    };
  };

  paintToggles();
  draw();
})();
