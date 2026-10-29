/* app.js — しけん, exam practice.

   One engine, two papers. Year 10 and Year 11 sit different exams in
   November and they are not the same shape, but the work in front of a
   student is: read a text and answer in the language the question
   names, produce a grammar form on demand, read a kanji compound, and
   write 350 characters that hold together. So the tabs are built from
   the data file, and the data file is the paper.

   What this adds to the printed practice paper, and the only reason to
   open it instead:

     it names the pieces a marker is looking for, and ticks them off as
     they appear, so a student sees what they missed rather than only
     that they missed something;

     it keeps the model answer shut until something has been written;

     it counts the characters in an essay as it is written, which is
     where this cohort loses the most marks for the least reason.

   What it cannot do is mark Japanese, and it says so on every tab that
   takes writing. The shell, the score and the folding how-to box are
   ported from メガセンテンス. There is no sound in this app yet. */
"use strict";
(function(){
  var X = window.SHIKEN;
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

  var KEY = "shiken-v1";
  /* wrote holds everything typed, keyed by question, because this is
     revision: a student comes back to it across a fortnight and
     nobody should have to type an answer twice. */
  var S = { furi:true, en:true, topic:"", exam:false, slow:false,
            pts:0, spent:0, done:{}, won:{}, wrote:{}, checks:{}, plays:{}, howto:{} };
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
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("noen", !S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
    $("ptsn").textContent = S.pts;
    $("pts").title = S.spent
      ? S.pts + " points. " + S.spent + " spent on support."
      : S.pts + " points, nothing spent on support yet.";
  }

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

  var at = 0, DRAW = {};
  function ruleFor(id, cls){
    var r = null;
    (X.rules || []).forEach(function(x){ if (x.step === id) r = x; });
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
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
    paintEn();
  }
  function foot(html){
    return '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span>' + (html || "") + '</div>';
  }


  /* ---- what a marker is looking for ----
     An answer is not marked. What happens is narrower and honest: the
     pieces the question needs are listed, and each one is ticked when
     it turns up in what was written. Alternatives are separated by |
     because 読書 and どくしょ are the same answer, and a student who
     writes in kana has not got it wrong.

     Everything is compared with the kanji readings stripped out and
     the spaces gone, so a furigana bracket pasted out of the text
     still counts. */
  function flat(t){
    return plain(String(t || ""))
      .replace(/[\s　、。，．]/g, "")
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(c){
        return String.fromCharCode(c.charCodeAt(0) - 0xFEE0);
      })
      .toLowerCase();
  }
  /* ---- 朝の会 and あさの会 are the same answer ----
     A student writing by hand writes some of it in kanji and some in
     kana, and which half is which is not what Part A is marking. So
     every alternative in the data is written with its reading in
     brackets, 朝[あさ]の会[かい], and the matcher expands that into
     every mix of kanji and kana it could have been written as:
     朝の会, あさの会, 朝のかい, あさのかい. Four runs is sixteen
     spellings, which is where it stops. */
  function variants(text){
    var parts = [], re = /([一-鿿々]+)\[([ぁ-ゟー]+)\]/g, at = 0, m;
    while ((m = re.exec(text))){
      if (m.index > at) parts.push([text.slice(at, m.index)]);
      parts.push([m[1], m[2]]);
      at = m.index + m[0].length;
    }
    if (at < text.length) parts.push([text.slice(at)]);
    var out = [""];
    parts.forEach(function(p){
      var next = [];
      out.forEach(function(so){ p.forEach(function(x){ next.push(so + x); }); });
      out = next.slice(0, 16);
    });
    return out;
  }
  function hits(ans, look){
    var a = flat(ans);
    return (look || []).map(function(l){
      var got = String(l.any || "").split("|").some(function(alt){
        return alt && variants(alt).some(function(v){
          return a.indexOf(flat(v)) >= 0;
        });
      });
      return { says: l.says, got: got };
    });
  }
  function lookHTML(list){
    return '<div class="looks">' + list.map(function(h){
      return '<span class="look' + (h.got ? " got" : "") + '">'
        + (h.got ? "✓ " : "") + esc(h.says) + '</span>';
    }).join("") + '</div>';
  }
  function enough(list, need){
    var got = list.filter(function(h){ return h.got; }).length;
    return need ? got >= need : got === list.length;
  }
  /* a line that appears under every box that takes Japanese */
  var CANNOT = "The app looks for the pieces the marker needs. It cannot "
    + "judge your Japanese: check that with Sensei.";

  /* ================= the listening paper =================
     Two modes, and the difference between them is the whole point.
     れんしゅう plays as often as a student likes, line by line if they
     want, with the transcript there. 本番 plays the passage twice and
     then will not play it again, which is the exam, and the
     transcript stays shut until the questions have been answered.

     The passages are not the school's recordings. The ones Andrew has
     belong to Monash and are licensed for his classroom, not for a
     public site, so these were written to the same shape and recorded
     in the two voices the other apps use. Every one is marked draft
     and the page says so.

     Playing is line by line on the clip's own ended event rather than
     one file for the passage: two speakers need two voices, and a
     conversation read in one voice stops being a listening task. */
  var AUD = (window.SHIKEN_AUDIO || {}).clips || {};
  var el0 = null, seq = 0;
  function sound(){ if (!el0){ el0 = new Audio(); el0.preload = "auto"; } return el0; }
  function hush(){
    seq++;
    var a = sound();
    try { a.pause(); } catch (e){}
    a.onended = null;
  }
  /* mirrors tools/make-audio.py: the key is the voice and the line as
     it is said, with the readings dropped and は said わ */
  function spokenKey(voice, text){
    var t = plain(text).replace(/[\s　]/g, "");
    t = t.replace(/([^\s　、。！？!?「」『』]+)/g, function(c){
      c = c.replace(/では(?=[なあ])/, "でわ");
      if (/は$/.test(c)) return c.slice(0, -1) + "わ";
      if (/へ$/.test(c)) return c.slice(0, -1) + "え";
      return c;
    });
    return voice + "|" + t;
  }
  function playLine(voice, text, onEnd){
    var clip = AUD[spokenKey(voice, text)];
    var a = sound();
    try { a.pause(); } catch (e){}
    a.onended = onEnd || null;
    if (!clip) return false;
    a.src = "audio/" + clip;
    try { a.playbackRate = S.slow ? 0.8 : 1; } catch (e){}
    var r = a.play();
    if (r && r.catch) r.catch(function(){});
    return true;
  }

  DRAW.kiki = function(){
    var L = X.listening || [];
    if (!L.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var t = L[Math.min(S.wrote["kikiAt"] || 0, L.length - 1)];
    var exam = !!S.exam;
    var plays = S.plays || {};
    var left = exam ? Math.max(0, 2 - (plays[t.id] || 0)) : null;
    var open = !exam || allAnswered();
    var who = {};
    (t.speakers || []).forEach(function(sp){ who[sp.tag] = sp; });

    function allAnswered(){
      return t.questions.every(function(_, i){ return S.won["l:" + t.id + ":" + i]
        || (S.wrote["l:" + t.id + ":" + i] || "").trim(); });
    }
    $("main").innerHTML = ruleFor("kiki", "tight")
      + '<div class="work"><div class="col">'
      + '<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'
      + L.map(function(x, i){
          return '<button class="btn sm ' + (x === t ? "" : "ghost")
            + '" data-text="' + i + '">' + esc(x.section) + ' · ' + esc(x.title_en)
            + '</button>';
        }).join("") + '</div>'
      + '<div class="text" style="line-height:1.6">'
      + '<h3><span class="tt">' + ruby(t.title) + '</span><span class="mk">'
      + 'answer in ' + esc(t.answer_in) + ' · ' + t.marks + ' marks</span></h3>'
      + '<p style="font-family:var(--font);font-size:13.5px;color:var(--muted)">'
      + esc(t.setting) + '</p>'
      + '<div class="ansrow" style="margin-top:8px">'
      + '<button class="btn sm" id="play"' + (exam && !left ? ' disabled' : '') + '>'
      + (exam ? "Play (" + left + " left)" : "Play it") + '</button>'
      + '<button class="btn ghost sm" id="stop">Stop</button>'
      + '<button class="btn ' + (exam ? "" : "ghost") + ' sm" id="mode">'
      + (exam ? "本番" : "れんしゅう") + '</button>'
      + (exam ? '' : '<button class="btn ghost sm" id="slow">'
          + (S.slow ? "×0.8" : "×1") + '</button>')
      + '</div>'
      + '<div id="turns" style="margin-top:10px">'
      + (open
          ? (t.lines || []).map(function(l, i){
              var sp = who[l.sp] || {};
              return '<div class="turn" data-i="' + i + '">'
                + '<div class="whoami">' + ruby(sp.who || l.sp) + '</div>'
                + (exam ? '' : '<button class="btn ghost sm" data-play="' + i + '">▶</button>')
                + '<div class="jaline">' + ruby(l.ja) + '</div></div>';
            }).join("")
          : '<p class="hintbox">The transcript opens when you have written '
            + 'something for every question. In the exam there is no transcript '
            + 'at all, which is what the two plays are for.</p>')
      + '</div></div>'
      + '<div id="qs"></div></div></div>'
      + foot('<span class="hint">' + esc(CANNOT) + '</span>');
    each($("main"), "[data-text]", function(b2){
      b2.onclick = function(){ hush(); S.wrote["kikiAt"] = +b2.dataset.text; save(); draw(); };
    });
    $("mode").onclick = function(){ hush(); S.exam = !S.exam; save(); draw(); };
    if ($("slow")) $("slow").onclick = function(){ S.slow = !S.slow; save(); draw(); };
    $("stop").onclick = function(){ hush(); lit(-1); };
    $("play").onclick = function(){
      if (exam){
        var n = (S.plays[t.id] || 0) + 1;
        S.plays[t.id] = n; save();
        if (n >= 2) $("play").disabled = true;
        $("play").textContent = "Play (" + Math.max(0, 2 - n) + " left)";
      }
      playFrom(0, ++seq);
    };
    each($("turns"), "[data-play]", function(b3){
      b3.onclick = function(){
        var i = +b3.dataset.play;
        hush(); lit(i);
        var sp = who[t.lines[i].sp] || {};
        playLine(sp.voice, t.lines[i].ja, function(){ lit(-1); });
      };
    });
    function lit(i){
      each($("turns"), ".turn", function(d){
        d.classList.toggle("now", +d.dataset.i === i);
      });
    }
    /* In 本番 the transcript is shut. It opens when every question has
       been answered, and it opens in place: a redraw here would wipe
       the feedback the student has just been given, which is the part
       they were about to read. */
    function openScript(){
      if ($("turns").querySelector(".jaline")) return;
      $("turns").innerHTML = (t.lines || []).map(function(l, i){
        var sp = who[l.sp] || {};
        return '<div class="turn" data-i="' + i + '">'
          + '<div class="whoami">' + ruby(sp.who || l.sp) + '</div>'
          + '<button class="btn ghost sm" data-play="' + i + '">▶</button>'
          + '<div class="jaline">' + ruby(l.ja) + '</div></div>';
      }).join("");
      each($("turns"), "[data-play]", function(b7){
        b7.onclick = function(){
          var i = +b7.dataset.play;
          hush(); lit(i);
          var sp2 = who[t.lines[i].sp] || {};
          playLine(sp2.voice, t.lines[i].ja, function(){ lit(-1); });
        };
      });
    }
    function playFrom(i, mine){
      if (mine !== seq) return;
      if (i >= (t.lines || []).length){ lit(-1); return; }
      lit(i);
      var sp = who[t.lines[i].sp] || {};
      var ok = playLine(sp.voice, t.lines[i].ja, function(){
        setTimeout(function(){ playFrom(i + 1, mine); }, 260);
      });
      if (!ok) playFrom(i + 1, mine);
    }

    /* the questions, marked the same way as everywhere else */
    var done = 0;
    $("qs").innerHTML = '<div class="card">' + t.questions.map(function(q, i){
      var key = "l:" + t.id + ":" + i;
      if (S.won[key]) done++;
      return '<div class="qn" data-q="' + i + '">'
        + '<span class="mk">' + q.marks + '</span>'
        + '<div class="ask">' + (t.answer_in === "Japanese" ? ruby(q.q) : esc(q.q))
        + (q.ask_en ? '<em>' + esc(q.ask_en) + '</em>' : '') + '</div>'
        + '<textarea class="ans" data-k="' + esc(key) + '" rows="2"'
        + (t.answer_in === "Japanese" ? ' lang="ja"'
            : ' style="font-family:var(--font);font-size:15px"')
        + ' spellcheck="false">' + esc(S.wrote[key] || "") + '</textarea>'
        + '<div class="ansrow">'
        + '<button class="btn sm" data-check="' + i + '">Check</button>'
        + '<button class="btn ghost sm" data-model="' + i + '">Show the answer</button>'
        + (q.line !== undefined && !exam
            ? '<button class="btn ghost sm" data-hear="' + i + '">Hear that line</button>' : '')
        + '</div><div class="out"></div></div>';
    }).join("") + '</div>';
    $("sc").innerHTML = '<b>' + done + '</b> of ' + t.questions.length + ' answered';
    keepTyping();
    each($("qs"), "[data-hear]", function(b4){
      b4.onclick = function(){
        var q = t.questions[+b4.dataset.hear];
        var sp = who[(t.lines[q.line] || {}).sp] || {};
        hush(); lit(q.line);
        playLine(sp.voice, t.lines[q.line].ja, function(){ lit(-1); });
      };
    });
    each($("qs"), "[data-check]", function(b5){
      b5.onclick = function(){
        var i = +b5.dataset.check, q = t.questions[i];
        var box = b5.closest(".qn"), out = box.querySelector(".out");
        var ans = box.querySelector("textarea").value;
        if (!ans.trim()){
          out.innerHTML = '<div class="mark hm"><b>Nothing written yet</b>'
            + 'Write an answer in ' + esc(t.answer_in) + ' first.</div>';
          return;
        }
        var list = hits(ans, q.look_for), ok = enough(list, q.need);
        out.innerHTML = lookHTML(list)
          + '<div class="mark ' + (ok ? "yes" : "hm") + '"><b>'
          + (ok ? "Everything the marker wants is there" : "Not all of it yet")
          + '</b>' + (ok ? "" : "Play it again and listen for the ticks that are missing.")
          + '</div>';
        if (ok){
          ninja(out);
          first("l:" + t.id + ":" + i, q.marks, "listening answer");
          showL(box, q);
          var n = t.questions.filter(function(_, k){ return S.won["l:" + t.id + ":" + k]; }).length;
          $("sc").innerHTML = '<b>' + n + '</b> of ' + t.questions.length + ' answered';
          if (n === t.questions.length){ done2("kiki"); openScript(); }
        }
      };
    });
    each($("qs"), "[data-model]", function(b6){
      b6.onclick = function(){
        var i = +b6.dataset.model, box = b6.closest(".qn");
        if (!S.won["l:" + t.id + ":" + i]) spend(1, "answer shown");
        showL(box, t.questions[i]);
      };
    });
    function showL(box, q){
      if (box.querySelector(".model")) return;
      box.querySelector(".out").insertAdjacentHTML("beforeend",
        '<div class="model"' + (t.answer_in === "English"
          ? ' style="font-family:var(--font);font-size:14.5px"' : '') + '>'
        + (t.answer_in === "English" ? esc(q.model) : ruby(q.model)) + '</div>');
    }
  };

  /* ================= Part A, reading ================= */
  DRAW.read = function(){
    var texts = X.reading || [];
    var t = texts[Math.min(S.wrote["readAt"] || 0, texts.length - 1)];
    if (!t){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var pick = texts.length > 1
      ? '<div class="row" style="margin-bottom:8px">' + texts.map(function(x, i){
          return '<button class="btn sm ' + (x === t ? "" : "ghost")
            + '" data-text="' + i + '">' + esc(x.title_en) + '</button>';
        }).join("") + '</div>'
      : "";
    $("main").innerHTML = ruleFor("read", "tight")
      + '<div class="work"><div class="col">' + pick
      + '<div class="text"><h3><span class="tt">' + ruby(t.title) + '</span><span class="mk">'
      + 'answer in ' + esc(t.answer_in) + ' · ' + t.marks + ' marks</span></h3>'
      + ruby(t.body) + '</div>'
      + (t.gloss && t.gloss.length
          ? '<div class="gloss">' + t.gloss.map(function(g){
              return '<span><b>' + ruby(g.ja) + '</b> ' + esc(g.en) + '</span>';
            }).join("") + '</div>'
          : "")
      + (t.draft
          ? '<div class="mark hm"><b>The answers here are drafts</b>'
            + 'No answer guide came with this paper, so the model answers were '
            + 'written from the text. Treat them as a second opinion, not as '
            + 'the school\'s answers.</div>'
          : "")
      + '<div id="qs"></div></div></div>'
      + foot('<span class="hint">' + esc(CANNOT) + '</span>');
    each($("main"), "[data-text]", function(b){
      b.onclick = function(){ S.wrote["readAt"] = +b.dataset.text; save(); draw(); };
    });
    var done = 0;
    $("qs").innerHTML = t.questions.map(function(q, i){
      var key = "r:" + t.id + ":" + i;
      if (S.won[key]) done++;
      return '<div class="qn" data-q="' + i + '">'
        + '<span class="mk">' + q.marks + '</span>'
        + '<div class="ask">' + ruby(q.q)
        + (q.ask_en ? '<em>' + esc(q.ask_en) + '</em>' : '') + '</div>'
        + '<textarea class="ans" data-k="' + esc(key) + '" rows="2" lang="ja"'
        + ' spellcheck="false">' + esc(S.wrote[key] || "") + '</textarea>'
        + '<div class="ansrow">'
        + '<button class="btn sm" data-check="' + i + '">Check</button>'
        + '<button class="btn ghost sm" data-model="' + i + '">Show the answer</button>'
        + '</div><div class="out"></div></div>';
    }).join("");
    $("sc").innerHTML = '<b>' + done + '</b> of ' + t.questions.length + ' answered';
    keepTyping();
    each($("qs"), "[data-check]", function(b){
      b.onclick = function(){
        var i = +b.dataset.check, q = t.questions[i];
        var box = b.closest(".qn"), ta = box.querySelector("textarea");
        var out = box.querySelector(".out");
        if (!flat(ta.value)){
          out.innerHTML = '<div class="mark hm"><b>Nothing written yet</b>'
            + 'Write an answer in ' + esc(t.answer_in) + ' first.</div>';
          return;
        }
        var list = hits(ta.value, q.look_for);
        var ok = enough(list, q.need);
        out.innerHTML = lookHTML(list)
          + '<div class="mark ' + (ok ? "yes" : "hm") + '"><b>'
          + (ok ? "Everything the marker wants is there"
                : "Not all of it yet")
          + '</b>' + (ok ? "" : "The ticks above say what is there. "
              + (q.need ? "This one wants " + q.need + " of them." : "")) + '</div>';
        if (ok){
          ninja(out);
          first("r:" + t.id + ":" + i, q.marks, "reading answer");
          showModel(box, q);
          var n = t.questions.filter(function(_, k){
            return S.won["r:" + t.id + ":" + k]; }).length;
          $("sc").innerHTML = '<b>' + n + '</b> of ' + t.questions.length + ' answered';
          if (n === t.questions.length) done2("read");
        }
      };
    });
    each($("qs"), "[data-model]", function(b){
      b.onclick = function(){
        var i = +b.dataset.model, box = b.closest(".qn");
        if (!S.won["r:" + t.id + ":" + i]) spend(1, "answer shown");
        showModel(box, t.questions[i]);
      };
    });
    function showModel(box, q){
      var out = box.querySelector(".out");
      if (box.querySelector(".model")) return;
      out.insertAdjacentHTML("beforeend",
        '<div class="model">' + ruby(q.model) + '</div>');
    }
  };

  /* Everything typed is kept, so a student can come back to it
     tomorrow and see what they wrote today. */
  function keepTyping(){
    each($("main"), "[data-k]", function(ta){
      ta.oninput = function(){ S.wrote[ta.dataset.k] = ta.value; save(); };
    });
  }
  function done2(id){ done(id); }

  /* ================= Part B, grammar ================= */
  DRAW.gram = function(){
    var G = X.grammar || [];
    if (!G.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var fi = Math.min(S.wrote["gramAt"] || 0, G.length - 1), g = G[fi];
    var total = 0, got = 0;
    G.forEach(function(f, k){
      f.items.forEach(function(_, i){
        total++; if (S.won["g:" + k + ":" + i]) got++;
      });
    });
    $("main").innerHTML = ruleFor("gram", "tight")
      + '<div class="work"><div class="col">'
      + '<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'
      + G.map(function(f, k){
          var all = f.items.every(function(_, i){ return S.won["g:" + k + ":" + i]; });
          return '<button class="btn sm ' + (k === fi ? "" : "ghost")
            + '" data-form="' + k + '">' + ruby(f.form) + (all ? " ✓" : "") + '</button>';
        }).join("") + '</div>'
      + '<div class="form"><b>' + ruby(g.form) + '</b><i>' + esc(g.en) + '</i></div>'
      + '<div class="hintbox">' + ruby(g.hint) + '</div>'
      + '<div id="qs"></div></div></div>'
      + foot('<span class="hint">' + esc(CANNOT) + '</span>');
    $("sc").innerHTML = '<b>' + got + '</b> of ' + total + ' sentences';
    each($("main"), "[data-form]", function(b){
      b.onclick = function(){ S.wrote["gramAt"] = +b.dataset.form; save(); draw(); };
    });
    $("qs").innerHTML = g.items.map(function(it, i){
      var kj = "g:" + fi + ":" + i, ke = "ge:" + fi + ":" + i;
      return '<div class="qn" data-q="' + i + '">'
        + '<span class="mk">2</span>'
        + '<div class="prompt2">' + ruby(it.prompt) + '</div>'
        + '<textarea class="ans" data-k="' + esc(kj) + '" rows="2" lang="ja"'
        + ' spellcheck="false" placeholder="Write the sentence with '
        + esc(plain(g.form)) + '">' + esc(S.wrote[kj] || "") + '</textarea>'
        + '<input class="ans" data-k="' + esc(ke) + '" type="text"'
        + ' style="font-family:var(--font);font-size:14px;margin-top:5px"'
        + ' placeholder="And in English" value="' + esc(S.wrote[ke] || "") + '">'
        + '<div class="ansrow">'
        + '<button class="btn sm" data-check="' + i + '">Check</button>'
        + '<button class="btn ghost sm" data-model="' + i + '">Show the answer</button>'
        + '</div><div class="out"></div></div>';
    }).join("");
    keepTyping();
    each($("qs"), "[data-check]", function(b){
      b.onclick = function(){
        var i = +b.dataset.check, it = g.items[i];
        var box = b.closest(".qn"), out = box.querySelector(".out");
        var ja = box.querySelector("textarea").value;
        if (!flat(ja)){
          out.innerHTML = '<div class="mark hm"><b>Nothing written yet</b>'
            + 'Write the sentence in Japanese first.</div>';
          return;
        }
        /* The form itself, where the form is a string worth looking
           for on its own. と is not: it sits inside ともだち and
           every second word, so for that one the item's own pieces
           carry the test and no chip is shown for it. */
        var test = (g.need || []).length;
        var hasForm = !test
          || g.need.some(function(n){ return flat(ja).indexOf(flat(n)) >= 0; });
        var list = hits(ja, it.look_for);
        var ok = hasForm && enough(list, it.need);
        out.innerHTML = lookHTML(
            (test ? [{ says: plain(g.form) + " is in the sentence", got: hasForm }] : [])
            .concat(list))
          + '<div class="mark ' + (ok ? "yes" : "hm") + '"><b>'
          + (ok ? "That is the form, and the pieces are there"
                : (hasForm ? "The form is there, the sentence is not finished"
                           : "The form is missing"))
          + '</b>' + (ok ? "" : esc(g.hint)) + '</div>';
        if (ok){
          ninja(out);
          first("g:" + fi + ":" + i, 2, "grammar sentence");
          showAnswer(box, it);
          var n = 0;
          G.forEach(function(f, k){
            f.items.forEach(function(_, j){ if (S.won["g:" + k + ":" + j]) n++; });
          });
          $("sc").innerHTML = '<b>' + n + '</b> of ' + total + ' sentences';
          if (n >= Math.ceil(total * 0.7)) done("gram");
        }
      };
    });
    each($("qs"), "[data-model]", function(b){
      b.onclick = function(){
        var i = +b.dataset.model, box = b.closest(".qn");
        if (!S.won["g:" + fi + ":" + i]) spend(1, "answer shown");
        showAnswer(box, g.items[i]);
      };
    });
    function showAnswer(box, it){
      if (box.querySelector(".model")) return;
      box.querySelector(".out").insertAdjacentHTML("beforeend",
        '<div class="model">' + ruby(it.model)
        + '<em>' + esc(it.en) + '</em></div>');
    }
  };

  /* ================= Part A for Year 11, translation =================
     The same marking as the grammar tab, with the direction of the
     sentence deciding which language the box takes and what is looked
     for in it. One way is worth 1 mark and the other 2, which is the
     paper's own arithmetic: reading a form is easier than building
     one, and the exam pays accordingly. */
  DRAW.trans = function(){
    var T = X.translate || [];
    if (!T.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var fi = Math.min(S.wrote["transAt"] || 0, T.length - 1), g = T[fi];
    var total = 0, got = 0;
    T.forEach(function(f, k){
      f.items.forEach(function(_, i){ total++; if (S.won["t:" + k + ":" + i]) got++; });
    });
    $("main").innerHTML = ruleFor("trans", "tight")
      + '<div class="work"><div class="col">'
      + '<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'
      + T.map(function(f, k){
          var all = f.items.every(function(_, i){ return S.won["t:" + k + ":" + i]; });
          return '<button class="btn sm ' + (k === fi ? "" : "ghost")
            + '" data-form="' + k + '">' + ruby(f.form) + (all ? " ✓" : "") + '</button>';
        }).join("") + '</div>'
      + '<div class="form"><b>' + ruby(g.form) + '</b><i>' + esc(g.en) + '</i></div>'
      + '<div class="hintbox">' + ruby(g.hint) + '</div>'
      + '<div id="qs"></div></div></div>'
      + foot('<span class="hint">' + esc(CANNOT) + '</span>');
    $("sc").innerHTML = '<b>' + got + '</b> of ' + total + ' translated';
    each($("main"), "[data-form]", function(b2){
      b2.onclick = function(){ S.wrote["transAt"] = +b2.dataset.form; save(); draw(); };
    });
    $("qs").innerHTML = g.items.map(function(it, i){
      var k = "t:" + fi + ":" + i, en = it.dir === "ja2en";
      return '<div class="qn" data-q="' + i + '">'
        + '<span class="mk">' + (it.marks || 1) + '</span>'
        + '<div class="prompt2"' + (en ? '' : ' style="font-family:var(--font);font-size:15px"')
        + '>' + (en ? ruby(it.prompt) : esc(it.prompt)) + '</div>'
        + '<div style="font-size:12px;color:var(--muted);margin-top:3px">'
        + (en ? "into English" : "into Japanese") + '</div>'
        + '<textarea class="ans" data-k="' + esc(k) + '" rows="2"'
        + (en ? ' style="font-family:var(--font);font-size:15px"' : ' lang="ja"')
        + ' spellcheck="false">' + esc(S.wrote[k] || "") + '</textarea>'
        + '<div class="ansrow">'
        + '<button class="btn sm" data-check="' + i + '">Check</button>'
        + '<button class="btn ghost sm" data-model="' + i + '">Show the answer</button>'
        + '</div><div class="out"></div></div>';
    }).join("");
    keepTyping();
    each($("qs"), "[data-check]", function(b3){
      b3.onclick = function(){
        var i = +b3.dataset.check, it = g.items[i];
        var box = b3.closest(".qn"), out = box.querySelector(".out");
        var ans = box.querySelector("textarea").value;
        if (!flat(ans) && !ans.trim()){
          out.innerHTML = '<div class="mark hm"><b>Nothing written yet</b>'
            + 'Write the sentence first.</div>';
          return;
        }
        var list = hits(ans, it.look_for);
        var ok = enough(list, it.need);
        out.innerHTML = lookHTML(list)
          + '<div class="mark ' + (ok ? "yes" : "hm") + '"><b>'
          + (ok ? "Everything the marker wants is there" : "Not all of it yet")
          + '</b>' + (ok ? "" : esc(g.hint)) + '</div>';
        if (ok){
          ninja(out);
          first("t:" + fi + ":" + i, it.marks || 1, "translation");
          showT(box, it);
          var n = 0;
          T.forEach(function(f, k){
            f.items.forEach(function(_, j){ if (S.won["t:" + k + ":" + j]) n++; });
          });
          $("sc").innerHTML = '<b>' + n + '</b> of ' + total + ' translated';
          if (n >= Math.ceil(total * 0.7)) done("trans");
        }
      };
    });
    each($("qs"), "[data-model]", function(b4){
      b4.onclick = function(){
        var i = +b4.dataset.model, box = b4.closest(".qn");
        if (!S.won["t:" + fi + ":" + i]) spend(1, "answer shown");
        showT(box, g.items[i]);
      };
    });
    function showT(box, it){
      if (box.querySelector(".model")) return;
      box.querySelector(".out").insertAdjacentHTML("beforeend",
        '<div class="model"' + (it.dir === "ja2en"
          ? ' style="font-family:var(--font);font-size:14.5px"' : '') + '>'
        + (it.dir === "ja2en" ? esc(it.model) : ruby(it.model)) + '</div>');
    }
  };

  /* ================= Part C, kanji =================
     The paper's own three columns with one cell blank, which is the
     task as it will be sat. Six at a time, dealt so the ten come round
     before any of them comes round twice, and the blank moves: the
     reading, the meaning, or the kanji itself. */
  var kanjiRound = null;
  DRAW.kanji = function(){
    var K = X.kanji || [];
    if (!K.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var ROUND = Math.min(6, K.length);
    if (!kanjiRound || kanjiRound.at >= ROUND) newRound();
    function newRound(){
      var list = [], kinds = [];
      for (var i = 0; i < ROUND; i++){
        var at = dealt("kanji", K.length);
        advance("kanji", K.length);
        list.push(K[at]);
        kinds.push(["yomi", "en", "kanji"][i % 3]);
      }
      kanjiRound = { list: list, kinds: shuffle(kinds), at: 0, right: 0 };
    }
    var read = K.filter(function(k){ return S.won["k:" + k.k]; }).length;
    $("main").innerHTML = ruleFor("kanji", "tight")
      + '<div class="work"><div class="col" id="kbody"></div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + foot('<button class="btn ghost sm" id="kall">See all ten</button>'
        + '<span class="hint">The blank moves: the reading, the meaning, or the kanji.</span>');
    $("sc").innerHTML = '<b>' + read + '</b> of ' + K.length + ' known';
    $("kall").onclick = function(){ table(); };
    ask();

    function table(){
      $("kbody").innerHTML = '<table class="ktable"><tr><th>漢字</th>'
        + '<th>よみかた</th><th>英語</th></tr>'
        + K.map(function(k){
            return '<tr><td>' + ruby(k.k) + '</td><td>' + esc(k.yomi)
              + '</td><td class="en">' + esc(k.en) + '</td></tr>';
          }).join("") + '</table>';
      $("fb").innerHTML = '<div class="mark hm"><b>The whole list</b>'
        + 'Press a tab and come back to be asked again.</div>';
    }
    function ask(){
      var k = kanjiRound.list[kanjiRound.at], kind = kanjiRound.kinds[kanjiRound.at];
      var others = shuffle(K.filter(function(x){ return x.k !== k.k; })).slice(0, 2);
      var key = kind === "yomi" ? k.yomi : (kind === "en" ? k.en : plain(k.k));
      var opts = shuffle([key].concat(others.map(function(x){
        return kind === "yomi" ? x.yomi : (kind === "en" ? x.en : plain(x.k));
      })));
      $("kbody").innerHTML =
          '<div class="kround" style="text-align:center;font-size:11px;'
        + 'letter-spacing:.1em;color:var(--muted);text-transform:uppercase">'
        + (kanjiRound.at + 1) + ' of ' + ROUND + '</div>'
        + '<table class="ktable"><tr><th>漢字</th><th>よみかた</th><th>英語</th></tr>'
        + '<tr class="now"><td>' + (kind === "kanji" ? '<span class="gap">？</span>' : ruby(k.k))
        + '</td><td>' + (kind === "yomi" ? '<span class="gap">？</span>' : esc(k.yomi))
        + '</td><td class="en">' + (kind === "en" ? '<span class="gap">？</span>' : esc(k.en))
        + '</td></tr></table>'
        + '<div class="kchoices" id="kopts">' + opts.map(function(o){
            return '<button class="pick' + (kind === "en" ? " en" : "")
              + '" data-o="' + esc(o) + '">' + esc(o) + '</button>';
          }).join("") + '</div>';
      each($("kbody"), "[data-o]", function(b){
        b.onclick = function(){
          if (b.dataset.o !== key){
            b.classList.add("no"); yokai(b);
            $("fb").innerHTML = '<div class="mark no"><b>Not that one</b>'
              + ruby(k.k) + ' is ' + esc(k.yomi) + ', ' + esc(k.en) + '</div>';
            return;
          }
          b.classList.add("ok"); ninja(b);
          first("k:" + k.k, 1, "kanji");
          kanjiRound.right++; kanjiRound.at++;
          $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
            + ruby(k.k) + '　' + esc(k.yomi) + '　' + esc(k.en) + '</div>';
          var n = K.filter(function(x){ return S.won["k:" + x.k]; }).length;
          $("sc").innerHTML = '<b>' + n + '</b> of ' + K.length + ' known';
          if (n === K.length) done("kanji");
          setTimeout(function(){
            if (kanjiRound.at >= ROUND) endRound(); else ask();
          }, 900);
        };
      });
    }
    function endRound(){
      $("kbody").innerHTML = '<div class="kdone"><b>' + kanjiRound.right
        + ' of ' + ROUND + '</b><p>'
        + (kanjiRound.right === ROUND ? "Every one of them." : "Another six?")
        + '</p><div class="row" style="justify-content:center;gap:8px">'
        + '<button class="btn sm" id="more">Six more</button>'
        + '<button class="btn ghost sm" id="list">See all ten</button></div></div>';
      if (kanjiRound.right === ROUND) award(2, "a clean round");
      $("more").onclick = function(){ newRound(); ask(); };
      $("list").onclick = function(){ table(); };
    }
  };

  /* ================= Part D, the essay =================
     The part worth a third of the paper, and the part a student can
     practise worst on their own, because nobody is there to say
     whether it is any good. So the app does the parts that do not
     need a teacher: it holds the shape the topic asks for, it counts
     the characters as they are written, and it asks the seven
     questions Andrew's rubric asks in a form a student can answer
     about their own draft. Then it says, plainly, that the marking is
     Sensei's. */
  DRAW.essay = function(){
    var E = X.essay || {};
    var opts = E.options || [];
    var pick = null;
    opts.forEach(function(o){ if (o.id === S.topic) pick = o; });
    var shape = null;
    (E.shapes || []).forEach(function(sh){ if (pick && sh.kind === pick.kind) shape = sh; });
    var key = "essay:" + (pick ? pick.id : "none");
    var text = S.wrote[key] || "";
    var planKey = "plan:" + (pick ? pick.id : "none");
    var lo = (E.chars || [300, 400])[0], hi = (E.chars || [300, 400])[1];
    $("main").innerHTML = ruleFor("essay", "tight")
      + '<div class="work"><div class="col">'
      + '<div class="topics">' + opts.map(function(o){
          return '<button class="topic" data-topic="' + esc(o.id) + '"'
            + ' aria-pressed="' + (pick === o ? "true" : "false") + '">'
            + '<span class="ja">' + ruby(o.ja) + '</span>'
            + '<span class="en">' + esc(o.en) + '</span></button>';
        }).join("") + '</div>'
      + (pick ? body() : '<div class="mark hm"><b>Pick a topic</b>'
          + 'The exam gives you three and you write one. Choosing fast is '
          + 'worth marks: do it in the ten minutes of reading time.</div>')
      + '</div></div>'
      + foot('<span class="count" id="cnt"></span>'
        + '<span class="hint">' + esc(CANNOT) + '</span>');
    each($("main"), "[data-topic]", function(b){
      b.onclick = function(){ S.topic = b.dataset.topic; save(); draw(); };
    });
    if (!pick) return;
    keepTyping();
    count();
    $("essayBox").oninput = function(){
      S.wrote[key] = $("essayBox").value; save(); count();
    };
    each($("main"), "[data-check2]", function(c){
      c.checked = !!S.checks[(pick.id) + ":" + c.dataset.check2];
      c.onchange = function(){
        S.checks[(pick.id) + ":" + c.dataset.check2] = c.checked ? 1 : 0;
        save();
        var all = (E.check || []).every(function(ck){
          return S.checks[pick.id + ":" + ck.id];
        });
        if (all && flat(S.wrote[key] || "").length >= lo){
          first("essay:" + pick.id, 5, "an essay, checked over");
          done("essay");
          ninja($("cnt"));
        }
      };
    });

    function body(){
      return (shape
          ? '<div class="mark hm"><b>' + ruby(shape.ja) + ' · ' + esc(shape.en) + '</b>'
            + '<ol class="steps2">' + shape.steps.map(function(x){
                return '<li>' + ruby(x) + '</li>'; }).join("") + '</ol></div>'
          : "")
        + '<div class="form" style="margin-top:10px"><b>プラン</b>'
        + '<i>five minutes, before you write anything else</i></div>'
        + '<textarea class="ans" data-k="' + esc(planKey) + '" rows="4"'
        + ' style="font-family:var(--font);font-size:14px"'
        + ' placeholder="Introduction / Body 1 / Body 2 / Body 3 / Conclusion">'
        + esc(S.wrote[planKey] || "") + '</textarea>'
        + '<div class="form" style="margin-top:12px"><b>さくぶん</b>'
        + '<i>' + lo + ' to ' + hi + ' characters</i></div>'
        + '<textarea class="ans" id="essayBox" rows="10" lang="ja" spellcheck="false">'
        + esc(text) + '</textarea>'
        + '<div class="form" style="margin-top:12px"><b>チェック</b>'
        + '<i>read your own draft against these</i></div>'
        + '<div class="checks">' + (E.check || []).map(function(ck){
            return '<label><input type="checkbox" data-check2="' + esc(ck.id) + '">'
              + '<span>' + esc(ck.say) + '</span></label>';
          }).join("") + '</div>'
        + '<div class="form" style="margin-top:12px"><b>ルーブリック</b>'
        + '<i>what it is marked on, ' + (E.marks || 20) + ' marks</i></div>'
        + '<table class="rubric"><tr><th></th><th>1</th><th>2</th><th>3</th>'
        + '<th>4</th><th>5</th></tr>'
        + (E.rubric || []).map(function(r){
            return '<tr><td>' + esc(r.c) + '</td>'
              + r.bands.map(function(bd){ return '<td>' + esc(bd) + '</td>'; }).join("")
              + '</tr>';
          }).join("") + '</table>';
    }
    /* Characters, the way the paper counts them: one square on the
       genkouyoushi is one character, and spaces and full stops take a
       square too. Line breaks do not. */
    function count(){
      var n = (S.wrote[key] || "").replace(/[\r\n]/g, "").length;
      var c = $("cnt");
      c.textContent = n + " / " + lo + "–" + hi;
      c.className = "count " + (n >= lo && n <= hi ? "in" : "under");
    }
  };

  /* ================= the paper itself ================= */
  DRAW.plan = function(){
    var P = X.paper || {};
    $("main").innerHTML = ruleFor("plan", "tight")
      + '<div class="work"><div class="col">'
      + '<table class="plan"><tr><th>Part</th><th></th><th>Questions</th><th>Marks</th></tr>'
      + (P.sections || []).map(function(s){
          return '<tr><td>' + esc(s.id) + '</td><td class="ja">' + ruby(s.ja)
            + '<br><span style="font-size:12px;color:var(--muted)">' + esc(s.en)
            + '</span></td><td>' + s.q + '</td><td>' + s.marks + '</td></tr>';
        }).join("")
      + '<tr><td></td><td></td><td></td><td><b>' + (P.total || "") + '</b></td></tr>'
      + '</table>'
      + '<p class="hintbox" style="margin-top:10px">' + esc(P.when || "") + ' · '
      + (P.reading_time || 0) + ' minutes reading, ' + (P.writing_time || 0)
      + ' minutes writing · ' + esc(P.dictionary || "") + '</p>'
      + (P.note ? '<p class="hintbox">' + esc(P.note) + '</p>' : "")
      + (X.listening_paper
          ? '<table class="plan" style="margin-top:12px">'
            + '<tr><th>Listening</th><th></th><th>Questions</th><th>Marks</th></tr>'
            + (X.listening_paper.sections || []).map(function(s2){
                return '<tr><td>' + esc(s2.id) + '</td><td class="ja">' + ruby(s2.ja)
                  + '<br><span style="font-size:12px;color:var(--muted)">' + esc(s2.en)
                  + '</span></td><td>' + s2.q + '</td><td>' + s2.marks + '</td></tr>';
              }).join("")
            + '<tr><td></td><td></td><td></td><td><b>'
            + (X.listening_paper.total || "") + '</b></td></tr></table>'
            + (X.listening_paper.note
                ? '<p class="hintbox">' + esc(X.listening_paper.note) + '</p>' : "")
          : "")
      + '<div class="tips">' + (X.strategy || []).map(function(t){
          return '<div class="tip"><b>' + esc(t.head) + '</b><p>' + esc(t.body) + '</p></div>';
        }).join("") + '</div>'
      + '</div></div>'
      + foot('<span class="hint">The timer app is at /timer/ if you want to '
        + 'sit a part against the clock.</span>');
    $("sc").innerHTML = esc(X.year || "");
  };

  /* ---- the tabs, in the order the paper runs ----
     The data says which tabs this paper has and in what order,
     because the two papers do not run the same way round: Year 11
     opens on translation and Year 10 opens on a reading. A tab with
     nothing behind it is dropped rather than shown empty. */
  var TAB = {
    kiki:  { ja:"ききとり", en:"Listening",   has: function(){ return (X.listening || []).length; } },
    read:  { ja:"よむ",     en:"Reading",     has: function(){ return (X.reading || []).length; } },
    trans: { ja:"ほんやく", en:"Translation", has: function(){ return (X.translate || []).length; } },
    gram:  { ja:"ぶんぽう", en:"Grammar",     has: function(){ return (X.grammar || []).length; } },
    kanji: { ja:"かんじ",   en:"Kanji",       has: function(){ return (X.kanji || []).length; } },
    essay: { ja:"さくぶん", en:"Essay",       has: function(){ return !!X.essay; } },
    plan:  { ja:"しけん",   en:"The paper",   has: function(){ return true; } }
  };
  var STEPS = (X.tabs || ["kiki", "read", "trans", "gram", "kanji", "essay", "plan"])
    .filter(function(id){ return TAB[id] && TAB[id].has(); })
    .map(function(id){ return { id: id, ja: TAB[id].ja, en: TAB[id].en }; });

  $("sub").textContent = (X.year || "") + " · " + (X.title_en || "");
  document.title = (X.title_ja || "しけん") + " · " + (X.year || "");
  paintToggles();
  draw();
})();
