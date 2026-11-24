/* app.js — VCE漢字. The prescribed kanji, used rather than listed.

   Andrew asked for a VCE kanji app that puts the kanji into what students
   actually do: reading for meaning, writing accurately, the right reading
   in the right word. Not a flashcard deck. The list he keeps —
   VCE_KANJI_SEARCH_LIST_v4.xlsx, 200 kanji in fourteen groups with 559
   example words — is the whole of the content here, converted and not
   edited.

   THE RUNGS, in the order Andrew wanted them:

     よむ       reading for meaning. Fifteen passages at two levels — the
                core nine, one per prescribed topic, and six longer ones
                with harder compounds — with no furigana: tap any word for
                its reading and its English, then answer three questions in
                English. The rung he wanted leading, and the only part of
                the app whose Japanese is not his: data/yomu.js says so,
                and he has the draft.
     さがす     the list itself, searchable by kanji, reading, meaning or
                word. A reference a student can keep open while writing.
                Each of his fourteen groups owns a colour here and keeps it
                everywhere else in the app.
     カード     flashcards a student aims: tick the kanji, tick what goes
                on each face, flip, and then take the ルーレット test on the
                set. Flipping is unmarked; the spinner is the marked part.
     よみかた   which reading a kanji takes in which word, drilled across
                all 559. The thing the examiners' reports name every year.
     かく       the student produces the kanji, prompted by the reading one
                turn and by the English meaning the next. Andrew's reading
                of the build before this one: kana plus an IME that offers
                the kanji is copying, so every second turn asks what the
                word means first. They type it, which is what the
                examination asks for and pays 2. Stuck, or on a school iPad
                with no Japanese keyboard, they ask for four words that
                look or sound alike and choose, which pays 1. Asking comes
                second on purpose: choosing first put the answer on the
                screen and left nothing to type.
     にゅうりょく  how to turn that keyboard on, the same module the exam
                apps carry.

   TAPPING A WORD IN よむ IS FREE, unlike ひと, where a gloss costs a
   point. The examination lets a student carry a printed dictionary in, so
   charging for a meaning here would drill a habit the examination does not
   ask for. One line changes it if Andrew wants it charged.

   HIS LIST GLOSSES THE KANJI, NOT THE WORDS. Two files here add English
   he has not written: data/words-en.js, a meaning for each of the 458
   words, and data/yomu.js, the passages and their glossary. Both say so at
   the top of themselves, both have a page he can read them from, and the
   app says where its English comes from wherever a student meets it. His
   own data is untouched.

   The shell, the ledger and the fold-away rule box are ported from ひと
   and メガセンテンス rather than rewritten, so a student who has used one
   of those already knows this one.                                      */
"use strict";
(function(){
  var K = window.KANJI_VCE;
  var EN = window.KANJI_WORDS_EN || {};
  var LV = (window.KANJI_LEVELS && window.KANJI_LEVELS.grade) || {};
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }
  function each(scope, sel, fn){
    if (!scope) return;
    Array.prototype.forEach.call(scope.querySelectorAll(sel), fn);
  }
  function shuffle(a){
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1)), t = a[i];
      a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  /* A word and its reading are two fields in Andrew's list, so the ruby is
     whole-word: 一日 over ついたち, which is what the reading actually is.
     Nothing here guesses which kana belongs to which character. */
  function ruby(w, y){
    return '<ruby>' + esc(w) + '<rt>' + esc(y) + '</rt></ruby>';
  }
  function kanaOnly(s){ return /^[぀-ゟ゠-ヿー・\s]+$/.test(s); }
  function hasKanji(s){ return /[一-鿿]/.test(s); }

  /* ---- everything the list knows, indexed once ---- */
  var BYK = {};
  K.kanji.forEach(function(k){ BYK[k.k] = k; });
  var CATNAME = {};
  K.cats.forEach(function(c){ CATNAME[c.id] = c; });
  /* Every example word, with the kanji it came from. A word can be listed
     under more than one of its kanji — 一日 sits under 一 and under 日 —
     so they are merged here and keep every parent. */
  var WORDS = [];
  (function(){
    var seen = {};
    K.kanji.forEach(function(k){
      k.words.forEach(function(w){
        var key = w.w + "|" + w.y;
        if (seen[key]){
          if (seen[key].from.indexOf(k.k) < 0) seen[key].from.push(k.k);
          return;
        }
        seen[key] = { w: w.w, y: w.y, en: EN[key] || "", from: [k.k], cat: k.cat };
        WORDS.push(seen[key]);
      });
    });
  })();
  /* the first word on the list written exactly this way */
  function wordNamed(w){
    var hit = null;
    WORDS.forEach(function(x){ if (!hit && x.w === w) hit = x; });
    return hit;
  }
  /* the kanji inside a word, in order, as far as the list knows them */
  function partsOf(word){
    var out = [];
    Array.prototype.forEach.call(word, function(ch){
      if (BYK[ch]) out.push(BYK[ch]);
    });
    return out;
  }

  /* ================= the ledger =================
     The same rules as every other app here: a point the first time an
     item goes right and never again, supports cost, nothing is locked,
     and all of it lives in this browser. */
  var KEY = "vcekanji-v1";
  var S = { furi:true, en:true, sfx:true, pts:0, spent:0, won:{}, done:{}, howto:{} };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) S = Object.assign(S, JSON.parse(raw) || {});
  } catch (e){}
  var saveT = null;
  function write(){
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e){}
  }
  function save(){ clearTimeout(saveT); saveT = setTimeout(write, 200); }
  window.addEventListener("pagehide", write);
  document.addEventListener("visibilitychange", function(){
    if (document.visibilityState === "hidden") write();
  });

  var tipT = null;
  function flash(cls, text){
    var t = $("ptstip");
    if (!t) return;
    t.className = cls; t.textContent = text;
    clearTimeout(tipT);
    tipT = setTimeout(function(){ t.textContent = ""; }, 4000);
  }
  function award(n, why){
    S.pts += n; save(); paintToggles();
    flash("up", "+" + n + (why ? " " + why : ""));
  }
  function spend(n, why){
    S.pts = Math.max(0, S.pts - n); S.spent += n; save(); paintToggles();
    flash("down", "−" + n + " " + why);
  }
  function first(key, n, why){
    if (S.won[key]) return false;
    S.won[key] = 1; award(n, why); return true;
  }
  function once(key, n, why){
    if (S.won[key]) return false;
    S.won[key] = 1; spend(n, why); return true;
  }
  function paintToggles(){
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("showen", !!S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
    $("sfxBtn").classList.toggle("off", !S.sfx);
    $("sfxBtn").setAttribute("aria-pressed", S.sfx ? "true" : "false");
    if (window.FANFARE) FANFARE.mute(!S.sfx);
    $("ptsn").textContent = S.pts;
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; paintToggles(); save(); };
  /* ---- the sounds of getting somewhere ----
     拍子木 marks a thing done, 太鼓 marks a rung finished, and the
     accelerating run of the sticks ends the whole app. A browser will not
     make a sound before it has been touched, so the engine is built inside
     this tap and inside the first tap anywhere on the page. */
  $("sfxBtn").onclick = function(){
    S.sfx = !S.sfx; paintToggles(); save();
    if (S.sfx && window.FANFARE){ FANFARE.wake(); FANFARE.ki(0, 0.9); }
  };
  window.addEventListener("pointerdown", function once(){
    window.removeEventListener("pointerdown", once);
    if (S.sfx && window.FANFARE) FANFARE.wake();
  });
  /* ---- when a sound is allowed ----
     Andrew, after hearing the first build: a sound on every right answer
     is a nuisance, not a reward. So nothing marks a single item. A sound
     means a set or a long task is finished and nothing else:

        拍子木   a passage answered in full, a flashcard set finished
        太鼓     a rung finished
        the run  every rung finished

     And nothing at all for a student marking their own work. Got it and
     Again later are a student talking to themselves, and a fanfare for
     that teaches the wrong lesson about what counts. */
  window.VCE_SFX = [];
  function sfx(what){
    window.VCE_SFX.push(what);
    if (!S.sfx || !window.FANFARE) return;
    if (what === "ki") FANFARE.ki();
    else if (what === "taiko") FANFARE.taiko();
    else if (what === "finale"){ FANFARE.kakegoe(); FANFARE.kiRun(); }
  }
  $("enBtn").onclick = function(){ S.en = !S.en; paintToggles(); save(); };
  $("resetBtn").onclick = function(){
    if (!confirm("Clear your score and your ticks on this device?")) return;
    S.pts = 0; S.spent = 0; S.won = {}; S.done = {};
    TABS.forget(KEY);
    save(); draw();
  };
  $("saveBtn").onclick = function(){
    var rungs = 0;
    STEPS.forEach(function(st){ if (S.done[st.id]) rungs++; });
    var line = "VCE漢字 · " + S.pts + " points, " + S.spent
      + " spent on support · " + rungs + " of " + STEPS.length + " rungs done";
    try {
      navigator.clipboard.writeText(line);
      flash("up", "copied");
    } catch (e){ window.prompt("Copy this", line); }
  };

  /* ================= the rungs ================= */
  var STEPS = [
    { id:"yomu",  ja:"よむ",       en:"Read it" },
    /* しんだん sits second, not first. A diagnostic is the thing you do
       once in February before anything else, so first was the tempting
       place for it — but よむ is the rung Andrew asked to lead and the
       app opens on it, which tools/browser-check.js holds him to. One
       line moves it if he wants it leading. */
    { id:"shin",  ja:"しんだん",   en:"What do you know?" },
    { id:"find",  ja:"さがす",     en:"Look it up" },
    { id:"cards", ja:"カード",     en:"Flashcards" },
    { id:"yomi",  ja:"よみかた",   en:"Which reading" },
    { id:"kaku",  ja:"かく",       en:"Write it" },
    { id:"ateru", ja:"あてる",     en:"Guess the kanji" },
    { id:"nyuu",  ja:"にゅうりょく", en:"Typing Japanese" }
  ];
  var RULES = {
    shin: "Tap every kanji you can read, easiest first. Then answer five "
        + "questions about eight of them. You get a page showing how many "
        + "of the 200 you know, where your kanji thin out, and what to "
        + "open next. Nothing is marked and nothing is sent anywhere.",
    yomu: "Read the passage. Tap any word for its reading and its meaning, "
        + "free and as often as you like. Then answer the three questions. "
        + "There is no furigana: working the reading out is the task.",
    cards: "Tap a Quick start, or open a list and tick your own. Then tick "
         + "what goes on the front of the card and what goes on the back. "
         + "Flip each card to check yourself, and the spinner tests you on "
         + "the set at the end. The word meanings are a draft, not from the "
         + "kanji list.",
    find: "Search the whole list: type a kanji, a reading, a meaning or a "
        + "word. Filter by group with the buttons. Keep this open while you "
        + "write.",
    yomi: "Pick how many words, then read each one and choose its reading. "
        + "The wrong answers are the readings the same kanji takes in other "
        + "words, which is where the marks go. At the end of the set you "
        + "get your score and the ones to look at again.",
    kaku: "Pick how many words, then write each one in kanji and type it. "
        + "The prompt alternates: the reading one turn, the English meaning "
        + "the next, so it asks what the word means as well as how it is "
        + "written. Typing pays 2. Stuck? Tap Show four choices and pick "
        + "one, which pays 1. At the end of the set you get your score and "
        + "the ones to look at again.",
    ateru: "A kanji comes out from behind its tiles, a few at a time. "
         + "Say what it means, or how it is read, before you can see all "
         + "of it: the fewer tiles you use, the more it pays. The four "
         + "answers belong to the four kanji that look most like it. Add "
         + "clues, change how it appears, or set it running on a clock "
         + "before you start.",
    nyuu: "Turn the Japanese keyboard on once and the laptop types かな and "
        + "漢字 all year. The written examination needs it."
  };
  var at = TABS.start(KEY, STEPS.map(function(s){ return s.id; })), DRAW = {};

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
  function done(id){
    var fresh = !S.done[id];
    S.done[id] = 1; save(); paintSteps();
    if (!fresh) return;
    award(5, "rung done");
    /* every rung done is the end of the whole thing, and gets the run of
       the sticks rather than one beat of the drum */
    var all = STEPS.every(function(st){ return S.done[st.id]; });
    sfx(all ? "finale" : "taiko");
  }
  /* Finishing the diagnostic marks the rung done and stops there. The
     ledger pays for getting something right, and a student who ticked all
     200 boxes has not got anything right — paying for that would put them
     top of the class for optimism. Same reason there is no drum. */
  function doneQuiet(id){
    if (S.done[id]) return;
    S.done[id] = 1; save(); paintSteps();
  }
  function ruleFor(id){
    return '<div class="rule"><b>' + esc(STEPS[at].en) + '</b>'
      + esc(RULES[id] || "") + '</div>';
  }
  function foot(html){
    return '<div class="foot"><span class="hint" id="sc"></span>'
      + '<span class="sp"></span>' + (html || "") + '</div>';
  }

  /* ---- the rule box gets out of the way ----
     Andrew's rule from ひと: the yellow box takes room the activity wants,
     so it fades after ten seconds and leaves a chip where it stood, and a
     rung whose box has folded once opens folded from then on. */
  var foldT = null;
  function howto(){
    var main = $("main"), box = main.querySelector(".rule");
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
    document.onkeydown = null;
    /* a clock left running in a rung nobody is looking at would go on
       revealing a kanji that is no longer on the screen */
    ateruStop();
    /* the page takes the rung's wash, and the rung's tab lights up in it */
    document.body.dataset.rung = STEPS[at].id;
    paintToggles(); paintSteps();
    TABS.keep(KEY, STEPS[at].id);
    TABS.inview($("steps"));
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
  }

  /* ================= 1. よむ =================
     Reading for meaning, which is the rung Andrew asked to lead. Nine
     passages, one for each of the nine prescribed topics, and every kanji
     in them is one of his 200 — everything else is in kana, even words a
     textbook would write in kanji, so a student never meets a kanji the
     list has not taught them.

     NO FURIGANA IN THE PASSAGE. Working the reading out is the task. A tap
     gives the reading, the English and the kanji the word is made of, free
     and as often as the student likes, because the examination lets them
     carry a dictionary in.

     The Japanese here is the one thing in this app that is not Andrew's,
     and data/yomu.js says so at the top of itself. He read the draft and
     said to go ahead, so it is live while he checks it sentence by
     sentence; DRAFT_YOMU.md is what he checks it from.                  */
  var Y = window.KANJI_YOMU || null;
  var YKEYS = Y ? Object.keys(Y.words).sort(function(a, b){
    return b.length - a.length;
  }) : [];
  var yomuOn = null;                 /* which passage is open, null = the list */

  function qkey(p, i){ return "yomu:q:" + p.id + ":" + i; }
  function pGot(p){
    var n = 0;
    p.asks.forEach(function(a, i){ if (S.won[qkey(p, i)]) n++; });
    return n;
  }
  function yomuGot(){
    var n = 0, all = 0;
    Y.passages.forEach(function(p){ all += p.asks.length; n += pGot(p); });
    return { n: n, all: all };
  }
  /* The passage, drawn as tap targets: longest match against the
     glossary, so every kanji on the page sits inside a word that can be
     tapped. tools/yomu-check.js proves that holds for all nine. */
  function readable(line){
    var out = "", i = 0;
    while (i < line.length){
      var hit = null;
      for (var n = 0; n < YKEYS.length; n++){
        if (line.substr(i, YKEYS[n].length) === YKEYS[n]){ hit = YKEYS[n]; break; }
      }
      if (hit){
        out += '<button class="wd" type="button" data-w="' + esc(hit) + '">'
             + esc(hit) + '</button>';
        i += hit.length;
      } else {
        out += esc(line.charAt(i));
        i++;
      }
    }
    return out;
  }
  /* The gloss writes the reading as plain kana rather than as ruby, so
     that turning ふりがな off cannot hide the one thing a tap is for. */
  function wireRead(scope){
    each(scope, "[data-w]", function(b){
      b.onclick = function(){
        var w = Y.words[b.dataset.w], tip = $("tip");
        each(scope, ".wd.lit", function(x){ x.classList.remove("lit"); });
        b.classList.add("lit");
        if (!tip || !w) return;
        var bits = partsOf(b.dataset.w);
        tip.innerHTML = '<div class="gloss"><b>' + esc(b.dataset.w)
          + '<u>' + esc(w.y) + '</u><i>' + esc(w.en) + '</i></b>'
          + (bits.length ? '<div class="bits">' + bits.map(function(k){
              return '<span class="bit"><s>' + esc(k.k) + '</s>'
                + esc(k.en) + '</span>';
            }).join("") + '</div>' : '')
          + '</div>';
      };
    });
  }
  DRAW.yomu = function(){
    if (!Y || !Y.passages || !Y.passages.length){
      $("main").innerHTML = ruleFor("yomu")
        + '<div class="work"><div class="none">No passages in this build.'
        + '</div></div>' + foot("");
      return;
    }
    if (yomuOn === null || !Y.passages[yomuOn]) pickOne();
    else readOne(Y.passages[yomuOn]);

    function pickOne(){
      /* Two levels, named on the card rather than hidden in the data: the
         core nine, one for each prescribed topic, and the stretch set with
         longer sentences and the compounds a Unit 3 and 4 text carries.
         Nothing is locked; a student picks. */
      $("main").innerHTML = ruleFor("yomu")
        + '<div class="work">'
        + ["core", "stretch"].map(function(lv){
            var set = Y.passages.filter(function(p){ return p.level === lv; });
            if (!set.length) return "";
            return '<h2 class="lvl">' + (lv === "core"
                ? "The nine topics" : "Longer, with harder compounds")
              + '<i>' + set.length + '</i></h2>'
              + '<div class="plist">' + set.map(function(p){
                  var i = Y.passages.indexOf(p), n = pGot(p), all = p.asks.length;
                  return '<button type="button" class="pcard lv-' + esc(lv)
                    + '" data-p="' + i + '">'
                    + '<b>' + esc(p.ja) + '</b>'
                    + '<div class="pe">' + esc(p.en) + '</div>'
                    + '<div class="pt2">' + esc(p.topic) + '</div>'
                    + '<div class="pq' + (n >= all ? " all" : "") + '">' + n
                    + ' of ' + all + ' questions right' + (n >= all ? " ✓" : "")
                    + '</div></button>';
                }).join("") + '</div>';
          }).join("") + '</div>' + foot("");
      each($("main"), "[data-p]", function(b){
        b.onclick = function(){ yomuOn = +b.dataset.p; DRAW.yomu(); };
      });
      var g = yomuGot();
      $("sc").innerHTML = '<b>' + g.n + '</b> of ' + g.all
        + ' questions right · ' + Y.passages.length + ' passages';
      window.VCE_YOMU = { on: null, passages: Y.passages.length };
    }

    function readOne(p){
      var answered = {}, qopts = {};
      $("main").innerHTML = ruleFor("yomu")
        + '<div class="work">'
        + '<div class="read" id="read">' + p.text.map(function(line){
            return '<p>' + readable(line) + '</p>';
          }).join("") + '</div>'
        + '<p class="hint" style="margin-top:10px">Tap any word for its '
        + 'reading and meaning. Answer in English.</p>'
        + '<div id="ask">' + p.asks.map(function(a, i){
            var opts = shuffle([a.a].concat(a.opts.slice()));
            qopts[i] = opts;
            return '<div class="qbox" data-q="' + i + '">'
              + '<div class="qn">' + (i + 1) + '. ' + esc(a.q) + '</div>'
              + '<div class="opts">' + opts.map(function(o, j){
                  return '<button class="opt lat" data-o="' + j + '">'
                    + esc(o) + '</button>';
                }).join("") + '</div></div>';
          }).join("") + '</div></div>'
        + '<div id="tip" class="tip"></div>'
        + foot('<button class="btn ghost sm" id="back">All passages</button>'
             + '<button class="btn ghost sm" id="nextp">Next passage</button>');
      wireRead($("read"));
      $("back").onclick = function(){ yomuOn = null; DRAW.yomu(); };
      $("nextp").onclick = function(){
        yomuOn = (yomuOn + 1) % Y.passages.length; DRAW.yomu();
      };
      each($("ask"), "[data-q]", function(box){
        var i = +box.dataset.q, a = p.asks[i], opts = qopts[i];
        each(box, "[data-o]", function(b){
          b.onclick = function(){
            if (answered[i]) return;
            answered[i] = 1;
            var right = opts[+b.dataset.o] === a.a;
            b.classList.add(right ? "yes" : "no");
            if (!right) each(box, "[data-o]", function(x){
              if (opts[+x.dataset.o] === a.a) x.classList.add("yes");
            });
            each(box, "[data-o]", function(x){ x.disabled = true; });
            if (right){
              var was = pGot(p);
              first(qkey(p, i), 1, "question");
              /* the passage finished, which is a set */
              if (was < p.asks.length && pGot(p) >= p.asks.length) sfx("ki");
            }
            paintScore();
          };
        });
      });
      paintScore();
      function paintScore(){
        var g = yomuGot();
        $("sc").innerHTML = '<b>' + pGot(p) + '</b> of ' + p.asks.length
          + ' right here · ' + g.n + ' of ' + g.all + ' in all';
        if (g.n >= g.all) done("yomu");
      }
      window.VCE_YOMU = { on: p.id, passages: Y.passages.length, asks: p.asks };
    }
  };

  /* ================= 2. さがす =================
     The list, whole, and searchable four ways at once: by the kanji, by
     either reading, by the English, or by any of the 559 words. A student
     writing an essay needs "how do I write ほうもん" answered in one box,
     not in four tabs. */
  var findQ = "", findCat = "";
  DRAW.find = function(){
    $("main").innerHTML = ruleFor("find")
      + '<div class="find">'
      + '<input id="q" type="search" placeholder="漢字、よみかた、meaning or word"'
      + ' autocomplete="off" spellcheck="false" value="' + esc(findQ) + '">'
      + '<button class="btn ghost sm" id="clear">Clear</button></div>'
      + '<div class="cats" id="cats"></div>'
      + '<div class="work"><div class="kgrid" id="grid"></div></div>'
      + foot("");
    /* The group buttons read in English. Andrew's call: the groups are
       how a student finds a kanji, not something they are being tested on,
       so かぞえかた sits beside Counters rather than instead of it. */
    $("cats").innerHTML =
      '<button data-c="*all" class="' + (findCat ? "" : "on") + '">All'
      + '<span>ぜんぶ</span></button>'
      + K.cats.map(function(c){
          return '<button data-c="' + esc(c.id) + '" class="cat-' + esc(c.id)
            + (findCat === c.id ? " on" : "") + '">' + esc(c.en)
            + '<span>' + esc(c.ja) + '</span></button>';
        }).join("");
    each($("cats"), "[data-c]", function(b){
      b.onclick = function(){
        findCat = b.dataset.c === "*all" ? "" : b.dataset.c;
        DRAW.find();
      };
    });
    $("clear").onclick = function(){ findQ = ""; findCat = ""; DRAW.find(); };
    $("q").oninput = function(){ findQ = $("q").value; list(); };
    list();
    function list(){
      var q = findQ.trim().toLowerCase();
      var hits = K.kanji.filter(function(k){
        if (findCat && k.cat !== findCat) return false;
        if (!q) return true;
        if (k.k === q || k.k.indexOf(q) >= 0) return true;
        if (k.en.toLowerCase().indexOf(q) >= 0) return true;
        if (k.on.concat(k.kun).some(function(r){ return r.indexOf(q) >= 0; })) return true;
        return k.words.some(function(w){
          return w.w.indexOf(q) >= 0 || w.y.indexOf(q) >= 0;
        });
      });
      $("grid").innerHTML = hits.length ? hits.map(card).join("")
        : '<div class="none">Nothing matches that. Try a single kanji, a '
          + 'reading in kana, or an English word.</div>';
      /* A card grows under the pointer on its own, in CSS. A tap has to
         say so, because a touch screen has no pointer: one card stays
         open at a time and tapping it again closes it. */
      each($("grid"), ".kcard", function(b){
        b.onclick = function(){
          var open = b.classList.contains("open");
          each($("grid"), ".kcard.open", function(x){ x.classList.remove("open"); });
          if (!open) b.classList.add("open");
        };
      });
      $("sc").innerHTML = '<b>' + hits.length + '</b> of ' + K.kanji.length
        + ' kanji' + (findCat ? ' · ' + esc(CATNAME[findCat].en) : '')
        + ' · ' + hits.reduce(function(n, k){ return n + k.words.length; }, 0)
        + ' words';
    }
    function card(k){
      return '<button type="button" class="kcard cat-' + esc(k.cat) + '">'
        + '<div class="top"><span class="big">' + esc(k.k) + '</span>'
        + '<span class="mean">' + esc(k.en) + '</span></div>'
        + '<div class="rds">'
        + (k.on.length ? '<s class="o"><i>on</i>' + esc(k.on.join("、")) + '</s>' : '')
        + (k.kun.length ? '<s class="k"><i>kun</i>' + esc(k.kun.join("、")) + '</s>' : '')
        + '</div>'
        + '<div class="ws">' + k.words.map(function(w){
            return '<span>' + ruby(w.w, w.y) + '</span>';
          }).join("") + '</div></button>';
    }
  };

  /* ================= the drum =================
     The same reel ひと and メガセンテンス use, carried here as those apps
     carry it: a copy, because these apps share no runtime. Two things are
     left out. The clicks, because this app has no audio engine and a
     silent drum is better than half a sound one. And the flick, because
     the four answers are on the screen before the drum is thrown — Andrew
     asked for that, so a student can read them while it spins — which
     means the drum has to land on the kanji those answers were built for.
     A hand throw lands where physics puts it; the button lands where it
     is sent, so the button is the only way to throw this one.

     The throw is solved, not guessed: the same sums are run forward for a
     few hundred candidate speeds, the ones that stop on the wanted kanji
     inside the time window are kept, and one of those is picked. The drum
     is never steered or stopped early. */
  var REEL = (function(){
    var H = 76, raf = 0;
    function cancel(){ if (raf) cancelAnimationFrame(raf); raf = 0; }

    function mount(box, items, onLand){
      var L = items.length, SPAN = L * H;
      var strip = box.querySelector(".rstrip");
      function draw(){
        var three = "";
        for (var c = 0; c < 3; c++){
          three += items.map(function(it){
            return '<div class="ritem"><b>' + it.html + '</b></div>';
          }).join("");
        }
        strip.innerHTML = three;
      }
      draw();
      var SLOW = 0.25, DRAG = 700, CATCH = 300, K = 150, C = 16;
      var pos = 0, v = 0, target = null, last = 0;

      function wrap(x){ return ((x % SPAN) + SPAN) % SPAN; }
      function paint(){
        strip.style.transform =
          "translate3d(0," + (H - SPAN - wrap(pos)).toFixed(2) + "px,0)";
      }
      function at(){ return Math.round(wrap(pos) / H) % L; }
      function landed(){
        box.classList.remove("spinning");
        if (onLand) onLand(items[at()], at());
      }
      /* a fixed step, so the drum lands where it was thrown on any screen
         and under any load */
      var STEP = 1 / 60, acc = 0;
      function move(dt){
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
          move(STEP); acc -= STEP;
          if (target !== null && Math.abs(pos - target) < 0.4 && Math.abs(v) < 8){
            pos = target; v = 0; acc = 0;
            paint(); landed(); return;
          }
        }
        paint();
        raf = requestAnimationFrame(frame);
      }
      function launch(v0){
        cancel();
        target = null; v = v0; last = 0; acc = 0;
        box.classList.add("spinning");
        raf = requestAnimationFrame(frame);
      }
      function dryRun(v0){
        var p = 0, u = v0, t = 0, dt = 1 / 60;
        while (u > CATCH && t < 12){
          u -= (SLOW * u + DRAG) * dt;
          if (u < 0) u = 0;
          p += u * dt;
          t += dt;
        }
        return { slot: Math.round(p / H), secs: t + 0.3 };
      }
      var MINS = 1.8, MAXS = 3.4;
      function throwTo(slot){
        var from = Math.round(pos / H), want = ((slot % L) + L) % L, hits = [];
        for (var v0 = 1200; v0 <= 15000; v0 += 10){
          var r = dryRun(v0);
          if (r.secs < MINS || r.secs > MAXS) continue;
          if ((((from + r.slot) % L) + L) % L === want) hits.push(v0);
        }
        if (!hits.length) return launch(2600 + Math.random() * 1800);
        launch(hits[Math.floor(Math.random() * hits.length)]);
      }
      paint();
      return {
        spinTo: function(id){
          var i = 0;
          items.forEach(function(it, n){ if (it.id === id) i = n; });
          throwTo(i);
        },
        /* for a set of one, and for a device that cannot animate */
        settleOn: function(id){
          cancel();
          var i = 0;
          items.forEach(function(it, n){ if (it.id === id) i = n; });
          pos = i * H; v = 0; target = null;
          box.classList.remove("spinning");
          paint();
          if (onLand) onLand(items[i], i);
        },
        stop: cancel
      };
    }
    return { mount: mount };
  })();

  /* ================= 3. カード =================
     Andrew asked for flashcards a student aims at what they need: tick
     whole groups or single kanji, then tick what belongs on the front of
     the card and what belongs on the back. Everything on a card comes off
     his list — the kanji, his English, his readings, his example words.

     Flipping is not marked. A student who says they knew it is talking to
     themselves, and this app does not pay for that. The spinner at the end
     of a set is the marked part: it asks, the student answers, and the
     app can see whether the answer is right.                            */
  var FIELDS = [
    { id:"kanji", ja:"漢字",   en:"The kanji" },
    { id:"on",    ja:"音読み", en:"On reading" },
    { id:"kun",   ja:"訓読み", en:"Kun reading" },
    { id:"mean",  ja:"いみ",   en:"English meaning" },
    { id:"words", ja:"ことば", en:"Words it is in" },
    { id:"wen",   ja:"ことばのいみ", en:"Words with their meanings" }
  ];
  function cardsState(){
    if (!S.cards) S.cards = { pick:{}, front:{ kanji:1 }, back:{ mean:1, on:1, kun:1 } };
    if (!S.cards.pick) S.cards.pick = {};
    if (!S.cards.front) S.cards.front = { kanji:1 };
    if (!S.cards.back) S.cards.back = { mean:1, on:1, kun:1 };
    if (!S.cards.open) S.cards.open = {};
    return S.cards;
  }
  /* ---- what the app means by hard ----
     Andrew's answer to Q34: the year level each kanji is taught. His own
     sequence is not written down anywhere the hub can read, so the bands
     use the year a kanji is taught in Japanese primary school, which is a
     published fact and not a judgement — data/levels.js says where it
     comes from and that it is not the Kew sequence.

        easy    taught in year 1   (65 of his 200)
        medium  taught in year 2   (91)
        hard    year 3 and above   (43)

     々 is the repeat sign rather than a kanji, so it has no year and sits
     in no band; Any 20 can still deal it.

     If levels.js is ever missing, the bands fall back to how much there is
     to keep straight about a kanji — its readings plus its words — which
     is what this used to do before he answered. A band is never silently
     empty.

     Inside a band, the ones a student has not yet answered right on the
     spinner come first, so Quick start aims at what is left. */
  function loadOf(k){ return k.on.length + k.kun.length + k.words.length; }
  function bands(){
    var graded = K.kanji.filter(function(k){ return LV[k.k]; });
    if (graded.length > K.kanji.length / 2){
      return { easy: graded.filter(function(k){ return LV[k.k] <= 1; }),
               medium: graded.filter(function(k){ return LV[k.k] === 2; }),
               hard: graded.filter(function(k){ return LV[k.k] >= 3; }) };
    }
    var all = K.kanji.slice().sort(function(a, b){
      return loadOf(a) - loadOf(b) || a.k.localeCompare(b.k);
    });
    var third = Math.floor(all.length / 3);
    return { easy: all.slice(0, third),
             medium: all.slice(third, third * 2),
             hard: all.slice(third * 2) };
  }
  function quickPick(band, n){
    var pool = band ? bands()[band] : K.kanji.slice();
    var fresh = pool.filter(function(k){ return !S.won["cards:test:" + k.k]; });
    var out = shuffle(fresh.slice()).slice(0, n);
    if (out.length < n){
      shuffle(pool.filter(function(k){ return out.indexOf(k) < 0; }))
        .slice(0, n - out.length).forEach(function(k){ out.push(k); });
    }
    return out;
  }
  function bandLine(){
    var b = bands();
    if (!K.kanji.filter(function(k){ return LV[k.k]; }).length)
      return "Easy, medium and hard here mean how much there is to keep "
           + "straight about a kanji: its readings and the words it turns up in.";
    return "Easy, medium and hard here mean the year a kanji is taught in "
         + "Japanese primary school: year 1 is easy (" + b.easy.length
         + " of them), year 2 medium (" + b.medium.length + "), year 3 and "
         + "above hard (" + b.hard.length + "). That is the Japanese school "
         + "order, not the order you meet them at school here.";
  }
  var QUICK = [
    { id:"any",    en:"Any 20",        ja:"どれでも 20",  n:20, band:null },
    { id:"hard",   en:"10 hard ones",  ja:"むずかしい 10", n:10, band:"hard" },
    { id:"medium", en:"10 medium ones", ja:"ふつう 10",   n:10, band:"medium" },
    { id:"easy",   en:"10 easy ones",  ja:"やさしい 10",  n:10, band:"easy" }
  ];
  function picked(){
    var C = cardsState();
    return K.kanji.filter(function(k){ return C.pick[k.k]; });
  }
  function sideOf(which){
    var C = cardsState();
    return FIELDS.filter(function(f){ return C[which][f.id]; });
  }
  function faceHTML(k, fields){
    /* Both word rows ticked shows the glossed one only: the same words
       twice over is not two things to learn. */
    var ids = fields.map(function(f){ return f.id; });
    if (ids.indexOf("wen") >= 0)
      fields = fields.filter(function(f){ return f.id !== "words"; });
    return fields.map(function(f){
      if (f.id === "kanji")
        return '<div class="fkanji">' + esc(k.k) + '</div>';
      if (f.id === "mean")
        return '<div class="fmean">' + esc(k.en) + '</div>';
      if (f.id === "on")
        return k.on.length
          ? '<div class="frd o"><i>on</i>' + esc(k.on.join("、")) + '</div>'
          : '<div class="frd none"><i>on</i>none on the list</div>';
      if (f.id === "kun")
        return k.kun.length
          ? '<div class="frd k"><i>kun</i>' + esc(k.kun.join("、")) + '</div>'
          : '<div class="frd none"><i>kun</i>none on the list</div>';
      if (f.id === "words")
        return '<div class="fwords">' + k.words.map(function(w){
          return '<span>' + ruby(w.w, w.y) + '</span>';
        }).join("") + '</div>';
      /* the meanings are the drafted ones, and a word with none says so
         rather than showing an empty line */
      return '<div class="fwords glossed">' + k.words.map(function(w){
        var en = EN[w.w + "|" + w.y];
        return '<span>' + ruby(w.w, w.y)
          + '<i>' + esc(en || "no meaning drafted yet") + '</i></span>';
      }).join("") + '</div>';
    }).join("");
  }
  var cardQueue = null, cardAt = 0, cardFlipped = false, cardTest = null;

  DRAW.cards = function(){
    if (cardTest) return testScreen();
    if (cardQueue) return practise();
    setUp();

    /* ---- the two tick-box panels ---- */
    function setUp(){
      var C = cardsState();
      /* Andrew: most of a sitting is spent scrolling past two hundred
         chips to reach the faces. So the two long panels fold away and
         Quick start is first, because a student who just wants twenty
         cards should never have to open either of them. */
      $("main").innerHTML = ruleFor("cards")
        + '<div class="work">'
        + '<div class="panel"><h2>Quick start</h2>'
        + '<div class="quick" id="cquick">' + QUICK.map(function(q){
            return '<button data-q="' + esc(q.id) + '"><b>' + esc(q.en)
              + '</b><span>' + esc(q.ja) + '</span></button>';
          }).join("") + '</div>'
        + '<p class="hint">' + esc(bandLine()) + '</p></div>'
        + '<details class="fold" id="fcats"' + (C.open.cats ? " open" : "") + '>'
        + '<summary>Choose by category<i id="ncats"></i></summary>'
        + '<div class="cats" id="ccats"></div></details>'
        + '<details class="fold" id="fall"' + (C.open.all ? " open" : "") + '>'
        + '<summary>Choose from all kanji<i id="nall"></i></summary>'
        + '<div class="chips" id="cchips"></div></details>'
        + '<div class="sides">'
        + '<div class="panel"><h2>Front of the card</h2>'
        + '<div class="ticks" id="cfront"></div></div>'
        + '<div class="panel"><h2>Back of the card</h2>'
        + '<div class="ticks" id="cback"></div></div>'
        + '</div></div>'
        + foot('<button class="btn" id="go">Start</button>');
      $("ccats").innerHTML = K.cats.map(function(c){
        return '<button data-c="' + esc(c.id) + '" class="cat-' + esc(c.id)
          + '"><b></b>' + esc(c.en) + '<span>' + esc(c.ja) + '</span></button>';
      }).join("")
        + '<button data-c="*all">Tick all</button>'
        + '<button data-c="*none">Clear</button>';
      $("cchips").innerHTML = K.kanji.map(function(k){
        return '<button class="chip cat-' + esc(k.cat) + '" data-k="' + esc(k.k)
          + '" title="' + esc(k.en) + '">' + esc(k.k) + '</button>';
      }).join("");
      ["front", "back"].forEach(function(which){
        $("c" + which).innerHTML = FIELDS.map(function(f){
          return '<button class="tick" data-f="' + esc(f.id) + '">'
            + '<b></b>' + esc(f.en) + '<span>' + esc(f.ja) + '</span></button>';
        }).join("");
      });
      /* a fold remembers whether it was open, per device */
      ["cats", "all"].forEach(function(which){
        var box = $(which === "cats" ? "fcats" : "fall");
        box.addEventListener("toggle", function(){
          C.open[which] = box.open ? 1 : 0; save();
        });
      });

      /* ---- ticking changes classes, never the page ----
         Andrew: the options jumped back to the top on every tick. They did,
         because every tick redrew the whole rung and the scroller started
         again at nothing. Nothing is redrawn here: a tick flips the
         classes on what is already on the screen, so the page stays
         exactly where the student left it. */
      function paint(){
        var mine = picked();
        each($("cchips"), "[data-k]", function(b){
          b.classList.toggle("on", !!C.pick[b.dataset.k]);
        });
        each($("ccats"), "[data-c]", function(b){
          var c = b.dataset.c;
          if (c.charAt(0) === "*") return;
          var all = K.kanji.filter(function(k){ return k.cat === c; });
          var on = all.filter(function(k){ return C.pick[k.k]; }).length;
          b.classList.toggle("on", on === all.length);
          b.classList.toggle("some", on > 0 && on < all.length);
          b.querySelector("b").textContent =
            on === all.length ? "✓" : (on ? "–" : "");
        });
        ["front", "back"].forEach(function(which){
          each($("c" + which), "[data-f]", function(b){
            var on = !!C[which][b.dataset.f];
            b.classList.toggle("on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
            b.querySelector("b").textContent = on ? "✓" : "";
          });
        });
        /* a folded panel still says how much is chosen inside it */
        var cats = K.cats.filter(function(c){
          return K.kanji.some(function(k){ return k.cat === c.id && C.pick[k.k]; });
        }).length;
        $("ncats").textContent = cats ? cats + " of " + K.cats.length + " touched" : "";
        $("nall").textContent = mine.length ? mine.length + " chosen" : "";
        var ready = mine.length && sideOf("front").length && sideOf("back").length;
        $("go").disabled = !ready;
        $("go").textContent = mine.length ? "Start · " + mine.length + " cards"
                                          : "Start";
        $("sc").innerHTML = ready
          ? '<b>' + mine.length + '</b> kanji chosen · front: '
            + sideOf("front").map(function(f){ return f.en.toLowerCase(); }).join(", ")
            + ' · back: '
            + sideOf("back").map(function(f){ return f.en.toLowerCase(); }).join(", ")
          : (mine.length ? "Tick at least one thing for each side of the card."
                         : "Pick a Quick start, or open a list and tick your own.");
        save();
      }
      function begin(){
        cardQueue = shuffle(picked().slice());
        cardAt = 0; cardFlipped = false;
        DRAW.cards();
      }
      /* Quick start deals and starts in one tap. A student who has cleared
         both faces gets the usual ones back rather than a dead button:
         the point of the tap is to be reading a card a second later. */
      each($("cquick"), "[data-q]", function(b){
        b.onclick = function(){
          var q = null;
          QUICK.forEach(function(x){ if (x.id === b.dataset.q) q = x; });
          if (!q) return;
          C.pick = {};
          quickPick(q.band, q.n).forEach(function(k){ C.pick[k.k] = 1; });
          if (!sideOf("front").length) C.front = { kanji:1 };
          if (!sideOf("back").length) C.back = { mean:1, on:1, kun:1 };
          save();
          begin();
        };
      });
      each($("ccats"), "[data-c]", function(b){
        b.onclick = function(){
          var c = b.dataset.c;
          if (c === "*all") K.kanji.forEach(function(k){ C.pick[k.k] = 1; });
          else if (c === "*none") C.pick = {};
          else {
            var all = K.kanji.filter(function(k){ return k.cat === c; });
            var every = all.every(function(k){ return C.pick[k.k]; });
            all.forEach(function(k){
              if (every) delete C.pick[k.k]; else C.pick[k.k] = 1;
            });
          }
          paint();
        };
      });
      each($("cchips"), "[data-k]", function(b){
        b.onclick = function(){
          if (C.pick[b.dataset.k]) delete C.pick[b.dataset.k];
          else C.pick[b.dataset.k] = 1;
          paint();
        };
      });
      ["front", "back"].forEach(function(which){
        each($("c" + which), "[data-f]", function(b){
          b.onclick = function(){
            if (C[which][b.dataset.f]) delete C[which][b.dataset.f];
            else C[which][b.dataset.f] = 1;
            paint();
          };
        });
      });
      $("go").onclick = function(){
        if ($("go").disabled) return;
        begin();
      };
      paint();
    }

    /* ---- one card, two sides ---- */
    function practise(){
      if (cardAt >= cardQueue.length){
        cardTest = { pool: shuffle(picked().slice()), at: 0, asked: 0, spun: false };
        cardQueue = null;
        DRAW.cards();
        return;
      }
      var k = cardQueue[cardAt], front = sideOf("front"), back = sideOf("back");
      $("main").innerHTML = ruleFor("cards")
        + '<div class="work"><div class="cardwrap">'
        + '<button class="flip cat-' + esc(k.cat) + '" id="flip" type="button">'
        + '<div class="face">' + faceHTML(k, cardFlipped ? back : front) + '</div>'
        + '<div class="side">' + (cardFlipped ? "back" : "front")
        + ' · tap to turn</div></button></div></div>'
        + foot('<button class="btn ghost sm" id="again">Again later</button>'
             + '<button class="btn ghost sm" id="next">Got it</button>'
             + '<button class="btn ghost sm" id="stop">Change the set</button>');
      $("flip").onclick = function(){ cardFlipped = !cardFlipped; DRAW.cards(); };
      $("again").onclick = function(){
        cardQueue.push(k); cardAt++; cardFlipped = false; DRAW.cards();
      };
      $("next").onclick = function(){
        cardAt++; cardFlipped = false; DRAW.cards();
      };
      $("stop").onclick = function(){
        cardQueue = null; cardFlipped = false; DRAW.cards();
      };
      document.onkeydown = function(e){
        if (e.key === " " || e.key === "Enter"){
          e.preventDefault(); cardFlipped = !cardFlipped; DRAW.cards();
        }
      };
      $("sc").innerHTML = '<b>' + (cardAt + 1) + '</b> of ' + cardQueue.length
        + ' · the spinner tests you at the end';
    }

    /* ---- ルーレット, the marked part ----
       It spins through the set and stops on one, and then asks something
       the app can mark: the kanji when the front does not carry it, and
       otherwise a reading or the meaning. Four answers, one of them its
       own, and the wrong three come off the same list. */
    function testScreen(){
      var t = cardTest;
      if (t.at >= t.pool.length){
        var got = t.pool.filter(function(k){ return S.won["cards:test:" + k.k]; }).length;
        $("main").innerHTML = ruleFor("cards")
          + '<div class="work"><div class="ask"><div class="qtag">set finished</div>'
          + '<div class="prompt lat">' + got + ' of ' + t.pool.length + '</div>'
          + '<p class="hint">Answered right across this set and every set '
          + 'before it. Change the set to aim at what is left.</p></div></div>'
          + foot('<button class="btn" id="redo">Go again</button>'
               + '<button class="btn ghost sm" id="stop">Change the set</button>');
        /* the spinner finished. done() beats the drum the first time the
           rung is ticked off; after that this does, because finishing a
           set is its own thing. Never both: two drums at once is a fault,
           not a fanfare. */
        var ticked = !!S.done["cards"];
        done("cards");
        /* the set finished. done() beats the drum the first time the rung
           is ticked off; after that the sticks mark the set, because a set
           is a smaller thing than a rung. Never both. */
        if (ticked) sfx("ki");
        $("redo").onclick = function(){
          cardTest = null; cardQueue = shuffle(picked().slice());
          cardAt = 0; cardFlipped = false; DRAW.cards();
        };
        $("stop").onclick = function(){ cardTest = null; DRAW.cards(); };
        $("sc").textContent = "";
        return;
      }
      var k = t.pool[t.at], q = askFor(k), answered = false;
      /* The four are on the screen before the drum is thrown, which is
         what Andrew asked for: read them while it spins, and the kanji
         arrives to a student who already knows what the choices are.
         They cannot be tapped until the drum lands, because answering a
         question whose subject has not arrived is guessing. */
      $("main").innerHTML = ruleFor("cards")
        + '<div class="work"><div class="ask">'
        + '<div class="qtag">ルーレット · ' + esc(q.tag) + '</div>'
        + '<div class="reel" id="reel">'
        + '<div class="rwin"><div class="rstrip"></div><div class="rmark"></div></div>'
        + '<button class="rspin" id="rgo" aria-label="Spin the drum">'
        + '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
        + ' stroke="currentColor" stroke-width="2" stroke-linecap="round">'
        + '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3v4h-4"/>'
        + '</svg></button></div>'
        + '<p class="hint" id="rtip">Read the four, then spin.</p>'
        + '<div class="opts" id="opts">' + q.opts.map(function(o, i){
            return '<button class="opt' + (q.optsEn ? " lat" : "")
              + '" data-o="' + i + '" disabled>' + esc(o) + '</button>';
          }).join("") + '</div><div id="fb"></div></div></div>'
        + foot('<button class="btn ghost sm" id="stop">Change the set</button>');
      $("stop").onclick = function(){ cardTest = null; cardQueue = null; DRAW.cards(); };
      $("sc").innerHTML = '<b>' + (t.at + 1) + '</b> of ' + t.pool.length + ' spun';

      /* the drum carries the whole set, so what it passes is what the
         student has been revising */
      var reel = REEL.mount($("reel"), t.pool.map(function(x){
        return { id: x.k, html: esc(x.k) };
      }), function(it){
        if (it.id !== k.k) return;
        $("rtip").textContent = q.ask;
        $("rgo").disabled = true;
        each($("opts"), "[data-o]", function(x){ x.disabled = false; });
      });
      $("rgo").onclick = function(){
        $("rgo").disabled = true;
        $("rtip").textContent = "Spinning\u2026";
        if (t.pool.length < 2) reel.settleOn(k.k); else reel.spinTo(k.k);
      };
      each($("opts"), "[data-o]", function(b){
        b.onclick = function(){
          if (answered) return;
          answered = true;
          var right = q.opts[+b.dataset.o] === q.answer;
          b.classList.add(right ? "yes" : "no");
          if (!right) each($("opts"), "[data-o]", function(x){
            if (q.opts[+x.dataset.o] === q.answer) x.classList.add("yes");
          });
          each($("opts"), "[data-o]", function(x){ x.disabled = true; });
          if (right) first("cards:test:" + k.k, 1, "spun right");
          $("fb").innerHTML = '<div class="mark ' + (right ? "yes" : "no") + '">'
            + '<b>' + (right ? "Yes" : "Not that one") + '</b>'
            + '<span class="jp">' + esc(k.k) + '</span> ' + esc(k.en)
            + '<p>' + esc(readingLine(k)) + '</p></div>';
          setTimeout(function(){ reel.stop(); t.at++; DRAW.cards(); }, 1400);
        };
      });
    }
    function readingLine(k){
      var bits = [];
      if (k.on.length) bits.push("on " + k.on.join("、"));
      if (k.kun.length) bits.push("kun " + k.kun.join("、"));
      return bits.join(" · ");
    }
    function askFor(k){
      var C = cardsState(), pool = cardTest.pool;
      var others = pool.filter(function(x){ return x.k !== k.k; });
      if (others.length < 3)
        others = K.kanji.filter(function(x){ return x.k !== k.k; });
      /* the front does not show the kanji, so the kanji is the question */
      if (!C.front.kanji){
        return { tag:"which kanji", ask:"Which kanji is it?",
                 answer: k.k, optsEn: false,
                 opts: shuffle(shuffle(others.slice()).slice(0, 3)
                        .map(function(x){ return x.k; }).concat([k.k])) };
      }
      /* it does show the kanji, so ask for whatever the back promised */
      var rds = k.on.concat(k.kun);
      if ((C.back.on || C.back.kun) && rds.length){
        var want = (C.back.on && k.on.length) ? k.on[0] : rds[0];
        var wrong = [];
        shuffle(others.slice()).forEach(function(x){
          if (wrong.length >= 3) return;
          var r = x.on.concat(x.kun)[0];
          if (r && r !== want && wrong.indexOf(r) < 0) wrong.push(r);
        });
        return { tag:"which reading", ask:"Which reading does it take?",
                 answer: want, optsEn: false, opts: shuffle(wrong.concat([want])) };
      }
      return { tag:"which meaning", ask:"What does it mean?",
               answer: k.en, optsEn: true,
               opts: shuffle(shuffle(others.slice()).slice(0, 3)
                      .map(function(x){ return x.en; }).concat([k.en])) };
    }
  };

  /* ================= 4. よみかた =================
     A word, four readings, and the wrong ones are the readings the same
     kanji takes somewhere else: 一日 against いちにち, 日曜日 against
     にちようび. That is the mistake worth drilling, and it is the one the
     examiners' reports name. Where the list cannot supply three such
     readings the round falls back to readings of other words the same
     length, which at least keeps the shape of the question.             */
  /* ================= a drill is a set, not a stream =================
     Andrew opened よみかた, answered eighty words, and stopped because he
     was tired: "there was no instruction on how many kanji and no
     progress bar. As a result I kept clicking answers until I got tired
     (on the 80th word!)."

     He is right, and it was not a small thing. A task with no end is not
     a task, it is a tap you leave running: no reason to start, no reason
     to stop, no idea whether you did well, and the one number on the
     screen counted every word on the list, so a good session moved it
     from 74 to 80 and looked like nothing. The flashcards already knew
     this and deal a set of ten or twenty; よみかた and かく did not.

     So both of them run through this. A student picks how many, works
     that many, and gets told how it went and which ones to look at
     again. The lifetime count stays, because 80 of 458 is worth knowing,
     but it is the second line now, not the only one.

     The missed words are the point of the end screen. "Do the 6 I
     missed" is the button a student should press, so it is first and it
     is the filled one.                                                  */
  var SIZES = [10, 20, 40];
  var RUN = {};   /* rung id -> the set in progress, or null */

  function runOf(id){ return RUN[id] || null; }
  function runStart(id, list){
    RUN[id] = { list: list.slice(), i: 0, right: 0, missed: [], marked: -1 };
    return RUN[id];
  }
  function runStop(id){ RUN[id] = null; }
  /* the words to put in a set: ones not read correctly before come first,
     the same rule the flashcards' Quick start uses */
  function freshFirst(pool, n, keyOf){
    var fresh = pool.filter(function(w){ return !S.won[keyOf(w)]; });
    var out = shuffle(fresh.slice()).slice(0, n);
    if (out.length < n)
      shuffle(pool.filter(function(w){ return out.indexOf(w) < 0; }))
        .slice(0, n - out.length).forEach(function(w){ out.push(w); });
    return out;
  }
  /* ---- and a set can be one group ----
     Andrew: "let a set be one category — 20 from 自然, say — rather than
     always drawing from all 458." The words already carry the group of
     the kanji they came from, so this is a filter rather than new data.
     The group is remembered per rung, because a student revising 動物 is
     revising it for more than one set. */
  var CATOF = {};   /* rung id -> cat id, or "" for everything */
  function catPool(pool, cat){
    if (!cat) return pool;
    return pool.filter(function(w){ return w.cat === cat; });
  }
  function catName(cat){
    var c = null;
    (K.cats || []).forEach(function(x){ if (x.id === cat) c = x; });
    return c;
  }
  /* the screen a rung shows when no set is running */
  function startPanel(id, lead, pool, keyOf, redraw){
    var cat = CATOF[id] || "";
    var mine = catPool(pool, cat);
    var left = mine.filter(function(w){ return !S.won[keyOf(w)]; }).length;
    var cats = (K.cats || []).filter(function(c){
      return pool.some(function(w){ return w.cat === c.id; });
    });
    return '<div class="work"><div class="ask">'
      + '<p class="startlead">' + esc(lead) + '</p>'
      + '<div class="catrow" id="cats">'
      + '<button data-cat=""' + (cat ? "" : ' class="on"')
      + '><b>Everything</b><span>ぜんぶ</span></button>'
      + cats.map(function(c){
          return '<button data-cat="' + esc(c.id) + '"'
            + (cat === c.id ? ' class="on"' : "")
            + '><b>' + esc(c.en) + '</b><span>' + esc(c.ja) + '</span></button>';
        }).join("")
      + '</div>'
      + '<div class="quick" id="sizes">'
      + SIZES.map(function(n){
          var few = mine.length < n;
          return '<button data-n="' + n + '"' + (few ? ' class="ghosty"' : "")
            + '><b>' + (few ? mine.length : n) + ' word'
            + ((few ? mine.length : n) === 1 ? "" : "s") + '</b>'
            + '<span>' + (few ? mine.length : n) + 'ご</span></button>';
        }).join("")
      + '</div>'
      + '<p class="startnote">' + left + ' of ' + mine.length + ' '
      + (cat ? esc((catName(cat) || {}).en || "") + " words" : "words")
      + ' still to get right. A set takes the ones you have not had right yet.'
      + '</p></div></div>';
  }
  function wireStart(id, pool, keyOf, redraw){
    each($("cats") || document.createElement("div"), "[data-cat]", function(b){
      b.onclick = function(){ CATOF[id] = b.dataset.cat; redraw(); };
    });
    var el = $("sizes");
    if (!el) return;
    each(el, "[data-n]", function(b){
      b.onclick = function(){
        var mine = catPool(pool, CATOF[id] || "");
        if (!mine.length) return;
        runStart(id, freshFirst(mine, Math.min(+b.dataset.n, mine.length), keyOf));
        redraw();
      };
    });
  }
  /* the bar across the top of a set, so a student can see the end */
  function runBar(id){
    var r = runOf(id);
    if (!r) return "";
    var pct = Math.round((r.i / r.list.length) * 100);
    return '<div class="runbar"><div class="runfill" style="width:' + pct + '%"></div>'
      + '<span class="runsay">' + Math.min(r.i + 1, r.list.length) + ' of '
      + r.list.length + '</span></div>';
  }
  /* the end of a set */
  function runEnd(id, title, redraw){
    var r = runOf(id);
    var missed = r.missed.slice();
    var n = r.list.length, got = r.right;
    sfx("ki");
    return { html: '<div class="work"><div class="ask">'
        + '<div class="mark ' + (got === n ? "yes" : "") + '">'
        + '<b>' + got + ' of ' + n + ' first time</b></div>'
        + (missed.length
            ? '<p class="startlead">Look at these again:</p>'
              + '<div class="misslist">' + missed.map(function(w){
                  return '<span class="missw">' + esc(w.w)
                    + '<i>' + esc(w.y) + '</i></span>';
                }).join("") + '</div>'
            : '<p class="startlead">Every one of them, first time.</p>')
        + '<div class="quick endq">'
        + (missed.length
            ? '<button data-again="1"><b>Do the ' + missed.length
              + ' I missed</b><span>もう一度</span></button>' : "")
        /* ---- and the missed ones can go to the cards ----
           Andrew: "the missed words should feed the flashcards." Doing
           the same question again asks the same question again; a card
           puts the kanji in front of the student with its readings and
           its meaning, which is the other half of knowing it. Cards are
           per kanji, so what goes across is the kanji those words are
           built from: miss 子馬 and you get 子 and 馬. */
        + (missed.length
            ? '<button data-cards="1" class="ghosty"><b>Put them on flashcards</b>'
              + '<span>カードにする</span></button>' : "")
        + '<button data-new="1"' + (missed.length ? ' class="ghosty"' : "")
        + '><b>Another ' + n + '</b><span>つぎのセット</span></button>'
        + '</div></div></div>',
      wire: function(){
        each($("main"), "[data-again]", function(b){
          b.onclick = function(){ runStart(id, missed); redraw(); };
        });
        each($("main"), "[data-cards]", function(b){
          b.onclick = function(){ toCards(missed); };
        });
        each($("main"), "[data-new]", function(b){
          b.onclick = function(){ runStop(id); redraw(); };
        });
      } };
  }
  /* Tick the kanji behind these words on the cards, clear whatever was
     ticked before so the deck is the missed ones and nothing else, and
     open カード at it. Andrew's loop: get it wrong here, revise it there. */
  function toCards(words){
    var C = cardsState();
    C.pick = {};
    words.forEach(function(w){
      (w.from || []).forEach(function(ch){ if (BYK[ch]) C.pick[ch] = 1; });
    });
    save();
    var i = -1;
    STEPS.forEach(function(st, n){ if (st.id === "cards") i = n; });
    if (i >= 0){ at = i; draw(); }
  }
  /* called when a question in a set has been answered */
  /* One mark per question. かく can reach this twice for the same word —
     four choices first, then typing it — and a word counted twice would
     show up as two misses in a set of twenty. The first answer is the one
     that counts, which is also the honest one. */
  function runMark(id, word, right){
    var r = runOf(id);
    if (!r || r.marked === r.i) return;
    r.marked = r.i;
    if (right) r.right++; else r.missed.push(word);
  }
  function runNext(id){
    var r = runOf(id);
    if (r) r.i++;
  }
  function runOver(id){
    var r = runOf(id);
    return !!r && r.i >= r.list.length;
  }

  var yomiDeck = null, yomiAt = 0;
  function dealYomi(){
    if (!yomiDeck || yomiAt >= yomiDeck.length){
      yomiDeck = shuffle(WORDS.slice()); yomiAt = 0;
    }
    return yomiDeck[yomiAt];
  }
  function readingsNear(word){
    /* every reading the word's own kanji take in other words */
    var pool = {};
    word.from.forEach(function(ch){
      var k = BYK[ch];
      if (!k) return;
      k.words.forEach(function(w){ if (w.y !== word.y) pool[w.y] = 1; });
      k.on.concat(k.kun).forEach(function(r){
        var bare = r.replace(/[（(].*$/, "");
        if (bare && bare !== word.y) pool[bare] = 1;
      });
    });
    var near = shuffle(Object.keys(pool));
    /* and, if that is thin, readings of words of the same length */
    if (near.length < 3){
      var same = WORDS.filter(function(w){
        return w.w.length === word.w.length && w.y !== word.y;
      });
      shuffle(same).slice(0, 6).forEach(function(w){
        if (near.indexOf(w.y) < 0) near.push(w.y);
      });
    }
    return near.slice(0, 3);
  }
  var YKEY = function(w){ return "yomi:" + w.w + w.y; };
  DRAW.yomi = function(){
    /* no set running: ask how many, and say how many are left */
    if (!runOf("yomi")){
      $("main").innerHTML = ruleFor("yomi")
        + startPanel("yomi", "How many words this time?", WORDS, YKEY)
        + foot("");
      wireStart("yomi", WORDS, YKEY, DRAW.yomi);
      paintScore();
      return;
    }
    /* the set is finished: say how it went before anything else */
    if (runOver("yomi")){
      var end = runEnd("yomi", "Which reading", DRAW.yomi);
      $("main").innerHTML = ruleFor("yomi") + end.html + foot("");
      end.wire();
      paintScore();
      return;
    }
    var run = runOf("yomi");
    var word = run.list[run.i];
    var opts = shuffle(readingsNear(word).concat([word.y]));
    var answered = false;
    $("main").innerHTML = ruleFor("yomi")
      + runBar("yomi")
      + '<div class="work"><div class="ask">'
      + '<div class="qtag">how is it read</div>'
      + '<div class="prompt">' + esc(word.w) + '</div>'
      + '<div class="opts" id="opts">' + opts.map(function(o, i){
          return '<button class="opt" data-o="' + i + '">' + esc(o) + '</button>';
        }).join("") + '</div>'
      + '<div id="fb"></div></div></div>'
      + foot('<button class="btn ghost sm" id="skip">Skip this one</button>');
    paintScore();
    $("skip").onclick = function(){
      runMark("yomi", word, false); runNext("yomi"); DRAW.yomi();
    };
    each($("opts"), "[data-o]", function(b){
      b.onclick = function(){
        if (answered) return;
        var pick = opts[+b.dataset.o], right = pick === word.y;
        b.classList.add(right ? "yes" : "no");
        if (!right){
          /* show the right one as well: a wrong answer with no answer
             beside it teaches nothing */
          each($("opts"), "[data-o]", function(x){
            if (opts[+x.dataset.o] === word.y) x.classList.add("yes");
          });
        }
        answered = true;
        each($("opts"), "[data-o]", function(x){ x.disabled = true; });
        if (right) first(YKEY(word), 1, "reading");
        runMark("yomi", word, right);
        $("fb").innerHTML = '<div class="mark ' + (right ? "yes" : "no") + '">'
          + '<b>' + (right ? "Yes" : "Not that one") + '</b>'
          + '<span class="jp">' + ruby(word.w, word.y) + '</span>'
          + meaning(word)
          + '</div>' + breakdown(word);
        paintScore();
        $("skip").textContent = "Next word";
        $("skip").onclick = function(){ nextKaku(); runNext("kaku"); DRAW.kaku(); };
        $("skip").onclick = function(){ runNext("yomi"); DRAW.yomi(); };
      };
    });
    function paintScore(){
      var got = WORDS.filter(function(w){ return S.won[YKEY(w)]; }).length;
      $("sc").innerHTML = '<b>' + got + '</b> of ' + WORDS.length
        + ' words read, all time';
      if (got >= WORDS.length) done("yomi");
    }
  };
  /* Andrew, on かく: you can get the word right from the kana and still
     not know what it means. So a marked answer carries the meaning —
     except where the meaning was the question, which would be handing
     back the prompt. The gloss is the drafted one, and it says so, because
     a meaning nobody has checked should not pass for his. */
  function meaning(word){
    if (!word.en) return "";
    return '<em class="gl">' + esc(word.en) + '<i>drafted meaning</i></em>';
  }
  /* What the word is made of, in the list's own terms: each kanji, what
     it means, and the readings it owns. */
  function breakdown(word){
    var ps = partsOf(word.w);
    if (!ps.length) return "";
    return '<div class="parts">' + ps.map(function(k){
      return '<div class="part"><div class="pk">' + esc(k.k) + '</div>'
        + '<div class="pe">' + esc(k.en) + '</div>'
        + '<div class="pr">' + esc(k.on.concat(k.kun).join("、")) + '</div></div>';
    }).join("") + '</div>';
  }

  /* ================= 5. かく =================
     The reading is given and the student produces the kanji. The first
     build asked them to choose it from four and then type it, which
     Andrew read and saw straight through: once the right word is on the
     screen, typing it is copying it. So the box comes first and the four
     choices come only when asked for.

     Typing it unaided pays 2, because that is what the examination asks
     for. Asking for the four and choosing pays 1, which keeps the rung
     usable on a school iPad with no Japanese keyboard and still drills
     the discrimination the examination tests. Typing after asking pays
     nothing extra: the answer is already on the screen.

     The three wrong choices are words that sound alike or share a kanji,
     never words picked at random: a question whose wrong answers are
     obviously wrong is a question about nothing.                        */
  /* Two decks, dealt turn and turn about, so every second word is asked
     in English. Andrew's point: a kana prompt plus an IME that offers the
     kanji is a copying task, and copying is not knowing. The English turn
     asks what the word means before it asks how it is written.

     The English comes from data/words-en.js, which is a draft nobody has
     checked, so a word with no gloss simply never takes an English turn
     rather than being asked with a guess. */
  var kakuDeck = null, kakuAt = 0, kakuEnDeck = null, kakuEnAt = 0, kakuTurn = 0;
  function kakuPool(en){
    return WORDS.filter(function(w){
      return hasKanji(w.w) && (!en || (w.en && w.en.length));
    });
  }
  function dealKaku(){
    if (kakuTurn % 2 === 1 && kakuPool(true).length){
      if (!kakuEnDeck || kakuEnAt >= kakuEnDeck.length){
        kakuEnDeck = shuffle(kakuPool(true)); kakuEnAt = 0;
      }
      return kakuEnDeck[kakuEnAt];
    }
    if (!kakuDeck || kakuAt >= kakuDeck.length){
      /* only words with kanji in them: asking a student to write つ in
         kanji is asking for nothing */
      kakuDeck = shuffle(kakuPool(false));
      kakuAt = 0;
    }
    return kakuDeck[kakuAt];
  }
  function kakuAsksEnglish(){
    return kakuTurn % 2 === 1 && kakuPool(true).length > 0;
  }
  function nextKaku(){
    if (kakuAsksEnglish()) kakuEnAt++; else kakuAt++;
    kakuTurn++;
  }
  /* A meaning can be written more than one way — 友だち and 友人 are both
     a friend — so a word typed for an English prompt is right if it is the
     word dealt, or any other word the draft glosses the same way. */
  function sameMeaning(got, word){
    if (got === word.w) return true;
    if (!word.en) return false;
    return WORDS.some(function(w){
      return w.w === got && w.en === word.en;
    });
  }
  function lookalikes(word){
    var out = [], seen = {};
    seen[word.w] = 1;
    /* words that share a kanji with this one */
    WORDS.forEach(function(w){
      if (seen[w.w] || !hasKanji(w.w)) return;
      var shares = Array.prototype.some.call(word.w, function(ch){
        return BYK[ch] && w.w.indexOf(ch) >= 0;
      });
      if (shares){ seen[w.w] = 1; out.push(w); }
    });
    shuffle(out);
    /* then words whose reading starts the same way, which is the other
       half of the confusion */
    if (out.length < 3){
      WORDS.forEach(function(w){
        if (seen[w.w] || !hasKanji(w.w)) return;
        if (w.y.charAt(0) === word.y.charAt(0)){ seen[w.w] = 1; out.push(w); }
      });
    }
    if (out.length < 3){
      shuffle(WORDS.slice()).forEach(function(w){
        if (seen[w.w] || !hasKanji(w.w)) return;
        seen[w.w] = 1; out.push(w);
      });
    }
    return out.slice(0, 3);
  }
  /* かく had the same fault as よみかた and gets the same answer. The
     prompt still alternates between the reading and the English, so the
     set is dealt from the words that carry kanji and the turn counter
     decides which way each one is asked. */
  var KKEY = function(w){ return "kaku:type:" + w.w; };
  DRAW.kaku = function(){
    var KPOOL = kakuPool(false);
    if (!runOf("kaku")){
      $("main").innerHTML = ruleFor("kaku")
        + startPanel("kaku", "How many words this time?", KPOOL, KKEY)
        + foot("");
      wireStart("kaku", KPOOL, KKEY, DRAW.kaku);
      paintScore();
      return;
    }
    if (runOver("kaku")){
      var end = runEnd("kaku", "Write it", DRAW.kaku);
      $("main").innerHTML = ruleFor("kaku") + end.html + foot("");
      end.wire();
      paintScore();
      return;
    }
    var run = runOf("kaku");
    var word = run.list[run.i], inEnglish = kakuAsksEnglish() && !!(word.en && word.en.length);
    var opts = shuffle(lookalikes(word).concat([word]));
    var shown = false, chosen = false, typed = false;
    $("main").innerHTML = ruleFor("kaku")
      + runBar("kaku")
      + '<div class="work"><div class="ask">'
      + '<div class="qtag">' + (inEnglish ? "write this word in Japanese"
                                          : "write this in kanji") + '</div>'
      + (inEnglish
         ? '<div class="prompt lat">' + esc(word.en) + '</div>'
           + '<p class="hint">The English here is a draft, not from the '
           + 'kanji list. Say so if a meaning reads wrong.</p>'
         : '<div class="prompt kana">' + esc(word.y) + '</div>')
      + '<div class="typebox" id="tb">'
      + '<input id="ta" inputmode="text" autocomplete="off" spellcheck="false"'
      + ' aria-label="Type the word in kanji">'
      + '<button class="btn" id="go">たしかめる</button></div>'
      + '<div class="help" id="helprow">'
      + '<button class="btn ghost sm" id="show">Show four choices</button></div>'
      + '<div class="opts" id="opts" hidden>' + opts.map(function(o, i){
          return '<button class="opt" data-o="' + i + '">' + esc(o.w) + '</button>';
        }).join("") + '</div>'
      + '<div id="fb"></div></div></div>'
      + foot('<button class="btn ghost sm" id="skip">Skip this one</button>');
    paintScore();
    $("skip").onclick = function(){
      runMark("kaku", word, false); nextKaku(); runNext("kaku"); DRAW.kaku();
    };
    $("ta").focus();

    /* Asking for the four is the support, so it says what it costs
       before it is tapped and not after. */
    $("show").onclick = function(){
      shown = true;
      $("helprow").hidden = true;
      $("opts").hidden = false;
      $("fb").innerHTML = '<div class="mark hm"><b>Choose one</b>'
        + 'These four look or sound alike. Choosing the right one pays 1 '
        + 'point instead of the 2 for typing it.</div>';
    };
    each($("opts"), "[data-o]", function(b){
      b.onclick = function(){
        if (chosen || typed) return;
        var pick = opts[+b.dataset.o], right = pick.w === word.w;
        b.classList.add(right ? "yes" : "no");
        if (!right) each($("opts"), "[data-o]", function(x){
          if (opts[+x.dataset.o].w === word.w) x.classList.add("yes");
        });
        chosen = true;
        each($("opts"), "[data-o]", function(x){ x.disabled = true; });
        if (right) first("kaku:pick:" + word.w, 1, "chosen");
        runMark("kaku", word, false);   /* four choices is not writing it */
        $("fb").innerHTML = '<div class="mark ' + (right ? "yes" : "no") + '">'
          + '<b>' + (right ? "That is the one" : "Not that one") + '</b>'
          + '<span class="jp">' + ruby(word.w, word.y) + '</span>'
          + (inEnglish ? "" : meaning(word))
          + '<p>Type it as well if you have the keyboard on. It pays '
          + 'nothing now the word is on the screen, and it is still the '
          + 'thing the examination asks you to do.</p></div>'
          + breakdown(word);
        paintScore();
      };
    });
    $("go").onclick = check;
    $("ta").onkeydown = function(e){ if (e.key === "Enter") check(); };
    function check(){
      if (typed) return;
      var got = ($("ta").value || "").trim();
      if (!got) return;
      if (sameMeaning(got, word)){
        typed = true;
        if (got !== word.w) word = wordNamed(got) || word;
        /* 2 for typing it unaided, 1 for typing it with the four on
           screen, nothing if the choice already paid. */
        if (!shown){ first("kaku:type:" + word.w, 2, "typed"); runMark("kaku", word, true); }
        else { S.won["kaku:type:" + word.w] = 1; save();
               first("kaku:pick:" + word.w, 1, "typed with help"); }
        $("fb").innerHTML = '<div class="mark yes"><b>Typed</b>'
          + '<span class="jp">' + ruby(word.w, word.y) + '</span>'
          + (inEnglish ? "" : meaning(word)) + '</div>'
          + breakdown(word);
        $("skip").textContent = "Next word";
        $("helprow").hidden = true;
        paintScore();
        return;
      }
      if (kanaOnly(got)){
        $("fb").innerHTML = '<div class="mark hm"><b>That is the reading</b>'
          + 'Convert it: type it in kana and press space, then choose the '
          + 'kanji from the list the keyboard offers.</div>';
        return;
      }
      $("fb").innerHTML = '<div class="mark no"><b>Not quite</b>'
        + '<span class="jp">' + esc(got) + '</span>'
        + '<p>Try again, or tap Show four choices.</p></div>';
    }
    function paintScore(){
      var pick = 0, type = 0, got = 0;
      WORDS.forEach(function(w){
        var pk = S.won["kaku:pick:" + w.w], tp = S.won["kaku:type:" + w.w];
        if (pk) pick++;
        if (tp) type++;
        if (pk || tp) got++;
      });
      var all = WORDS.filter(function(w){ return hasKanji(w.w); }).length;
      $("sc").innerHTML = '<b>' + type + '</b> typed · <b>' + pick
        + '</b> chosen · of ' + all + ', all time';
      if (got >= all) done("kaku");
    }
  };

  /* ================= 6. にゅうりょく =================
     The same module the Year 10, 11 and 12 examination apps carry, with
     its own styles. A student cannot type an answer to the written
     examination until this is done, and this app asks them to type. */
  /* ================= あてる =================
     Andrew's idea: "slowly reveal a kanji (like a puzzle) until the
     student can guess which kanji it is ... These parameters should be
     student-customisable."

     WHAT COMES OUT OF THE FOG. There is no stroke-order data in this
     repo and none that can be fetched, so a stroke-by-stroke reveal is
     not available. What is available is the glyph itself, and three
     honest ways to take it away and give it back: blur it, pixelate it
     on a canvas, or draw a curtain down it. All three are the real
     character the whole time, which matters: a student is learning to
     recognise the shape, so the shape has to be the thing they see.

     AND THE CLUES, which are the part that teaches. Each step hands over
     one more fact — the group it belongs to, the year it is taught, a
     word it appears in with the kanji blanked out, the on reading, the
     kun reading, the English. A student who guesses from the group and
     one word has done something harder, and worth more, than one who
     waited for the meaning.

     EVERY ONE OF THOSE IS A TICK BOX, because Andrew asked for that and
     because the right ladder is different for a Year 7 and a Year 12: a
     junior might want the picture to sharpen fast with the meaning early,
     and a VCE student might turn the glyph off altogether and work from
     the readings alone. Turn the kanji off and it is a different game
     with the same furniture, which is the point of making it a setting
     rather than two apps.

     SCORING. The round starts at as many points as there are steps and
     loses one with each reveal, so guessing early pays. A wrong answer
     ends the round and shows the kanji: a guess is a guess.            */
  /* ---- the clock ----
     Andrew asked for a mode that reveals on its own. It is a setting, not
     a mode: the same round, with the steps arriving by themselves. Off is
     the default, because a student who has not met the game yet should
     set the pace, and a clock that starts without being asked for is the
     same fault as a word read out on arrival.

     Pause is not a nicety. The whole task is looking at a shape and
     thinking, and a countdown nobody can stop turns thinking into
     hurrying. It also stops on its own when the page is hidden, so a
     student who switches to another tab does not come back to the
     answer. */
  var CLOCKS = [
    { secs: 0, ja:"じぶんで",  en:"I'll press it" },
    { secs: 8, ja:"ゆっくり",  en:"Every 8 seconds" },
    { secs: 5, ja:"ふつう",    en:"Every 5 seconds" },
    { secs: 3, ja:"はやい",    en:"Every 3 seconds" }
  ];
  var ateruTimer = null;
  function ateruStop(){
    if (ateruTimer){ clearInterval(ateruTimer); ateruTimer = null; }
  }

  /* ---- what the student is actually asked ----
     Andrew, after playing it: the four kanji underneath gave it away.
     He was right, and the fault was deeper than the buttons. The clues
     name the kanji — group, a word it is in, its readings — so by the
     time the picture had cleared enough to matter the answer was already
     on the screen, and the reveal was decoration.

     So the shape is the question now. The student is asked what it MEANS
     or how it is READ, the four answers belong to the four kanji that
     look most like this one, and the clues are off until somebody turns
     them on. Tell 日 from 目 from 白 from 自 and you have done the thing
     the activity is for.                                              */
  var ANSWERS = [
    { id:"mean", ja:"いみ",   en:"What does it mean?" },
    { id:"read", ja:"よみかた", en:"How is it read?" }
  ];
  var CLUES = [
    { id:"cat",   ja:"グループ", en:"Its group" },
    { id:"grade", ja:"がくねん", en:"The year it is taught" },
    { id:"word",  ja:"ことば",   en:"A word it is in" },
    { id:"on",    ja:"音読み",   en:"The on reading" },
    { id:"kun",   ja:"訓読み",   en:"The kun reading" },
    { id:"mean",  ja:"いみ",     en:"The English meaning" }
  ];
  /* ---- how the kanji comes out ----
     Jigsaw leads, because Andrew asked for it and because it is the only
     one of the four that is honestly partial: a blurred or half-curtained
     kanji still shows its silhouette, which for 200 characters is most of
     the answer. Sixteen tiles arriving in a random order show real
     fragments of real strokes and nothing else.

     Pixels start at 2 blocks across, which is four grey squares, and the
     curtain still exists for anyone who likes it. Both were too generous
     on the first step; both now clear on a curve that does most of its
     work at the end. */
  var VEILS = [
    { id:"jigsaw",  ja:"パズル",   en:"Jigsaw pieces", steps:8 },
    { id:"pixel",   ja:"モザイク", en:"Pixels",        steps:6 },
    { id:"curtain", ja:"カーテン", en:"A curtain",     steps:6 },
    { id:"off",     ja:"なし",     en:"No kanji at all", steps:0 }
  ];
  /* ---- how many pieces ----
     Andrew asked to try eight. The round stays eight steps either way,
     so the same fraction of the kanji is uncovered at the same point and
     the scoring is comparable: what changes is the size of what arrives.
     Eight pieces hand over a quarter of a stroke at a time instead of an
     eighth, which is the easier and sharper game, and it is one piece per
     step, which is what a jigsaw actually feels like. */
  var PIECES = [
    { n: 8,  cols: 4, ja:"8ピース",  en:"8 pieces" },
    { n: 16, cols: 4, ja:"16ピース", en:"16 pieces" }
  ];
  function piecesOf(){
    var want = ateruState().pieces;
    var p = PIECES[0];
    PIECES.forEach(function(x){ if (x.n === want) p = x; });
    return p;
  }
  function veilOf(id){
    var v = VEILS[0];
    VEILS.forEach(function(x){ if (x.id === id) v = x; });
    return v;
  }
  function ateruState(){
    if (!S.ateru) S.ateru = {};
    var A = S.ateru;
    /* Clues start OFF. The picture is the question; a clue is help a
       student asks for, and a round that hands over the readings before
       anybody looks at the shape is the fault Andrew found. */
    if (!A.clues) A.clues = {};
    if (!A.veil) A.veil = "jigsaw";
    if (!A.pieces) A.pieces = 8;
    if (!A.ask) A.ask = "mean";
    if (A.auto === undefined) A.auto = 0;
    return A;
  }
  function ateruLadder(){
    var A = ateruState();
    /* whatever is being asked for cannot also be a clue */
    return CLUES.filter(function(c){
      if (A.ask === "mean" && c.id === "mean") return false;
      if (A.ask === "read" && (c.id === "on" || c.id === "kun")) return false;
      return A.clues[c.id];
    });
  }
  function ateruSteps(){
    return Math.max(2, veilOf(ateruState().veil).steps + ateruLadder().length);
  }
  function clueText(k, id){
    if (id === "cat"){ var c = catName(k.cat); return c ? c.en + " · " + c.ja : ""; }
    if (id === "grade"){
      var g = (window.KANJI_LEVELS && KANJI_LEVELS.grade) ? KANJI_LEVELS.grade[k.k] : null;
      return g ? ("Taught in year " + g + " in Japan") : "Not in the primary six hundred";
    }
    if (id === "word"){
      var w = (k.words || [])[0];
      if (!w) return "";
      /* The kanji blanked out, and no reading beside it. 夏休み as
         〇休み (なつやすみ) hands over なつ, which is the kun reading and
         a later rung of the ladder: a clue that gives away the clue
         after it is not a ladder. */
      return w.w.split(k.k).join("〇");
    }
    if (id === "on") return (k.on || []).join("・") || "no on reading in use";
    if (id === "kun") return (k.kun || []).join("・") || "no kun reading in use";
    if (id === "mean") return k.en || "";
    return "";
  }

  /* ================= which kanji look alike =================
     Andrew: "unless using kanji that are very similar in shape, students
     will easily guess." Quite so, and the old version picked the other
     three out of the same topic group, which is a similarity of meaning
     and no help at all when the question is a shape.

     There is no stroke data here, but there is the font, and the font
     knows exactly what each character looks like. So each of the 200 is
     drawn once into a 16x16 square and kept as 256 numbers, and two
     kanji are alike when those numbers are. It finds 日 目 白 自, 人 入
     八, 土 士, 大 犬 太, 未 末 — the pairs a student actually confuses,
     worked out from the shapes themselves rather than from a list
     somebody would have to maintain.

     Built once, on the first round, after the font has loaded: asking
     before that measures the fallback face and gets the wrong answer.
     If there is no canvas at all it falls back to the topic group, which
     is the old behaviour and still a game.                            */
  var SHAPES = null;
  function buildShapes(){
    if (SHAPES) return SHAPES;
    var N = 16, out = {};
    var cv = document.createElement("canvas");
    cv.width = cv.height = N;
    var g = cv.getContext && cv.getContext("2d");
    if (!g) return (SHAPES = {});
    K.kanji.forEach(function(k){
      g.fillStyle = "#fff"; g.fillRect(0, 0, N, N);
      g.fillStyle = "#000";
      g.textAlign = "center"; g.textBaseline = "middle";
      g.font = Math.round(N * 0.92) + 'px "Klee One", serif';
      g.fillText(k.k, N / 2, N / 2 + N * 0.04);
      var d = g.getImageData(0, 0, N, N).data, v = new Float32Array(N * N), sum = 0;
      for (var i = 0, j = 0; i < d.length; i += 4, j++){
        v[j] = (255 - d[i]) / 255;      /* ink, not paper */
        sum += v[j];
      }
      out[k.k] = { v: v, ink: sum };
    });
    return (SHAPES = out);
  }
  function shapeGap(a, b){
    var A = SHAPES[a], B = SHAPES[b];
    if (!A || !B) return 1e9;
    var d = 0;
    for (var i = 0; i < A.v.length; i++){
      var x = A.v[i] - B.v[i];
      d += x * x;
    }
    /* a character with far more ink than another is not a look-alike
       however the squares fall */
    return d + Math.abs(A.ink - B.ink) * 0.6;
  }
  function lookalikeKanji(k, n){
    buildShapes();
    if (!SHAPES[k.k]){
      var same = K.kanji.filter(function(x){ return x.cat === k.cat && x.k !== k.k; });
      return shuffle(same).slice(0, n);
    }
    var rest = K.kanji.filter(function(x){ return x.k !== k.k; });
    rest.sort(function(x, y){ return shapeGap(k.k, x.k) - shapeGap(k.k, y.k); });
    /* the nearest six, three of them taken at random, so the same kanji
       does not come with the same three every time */
    return shuffle(rest.slice(0, Math.max(n, 6))).slice(0, n);
  }
  /* The four answers, which are what those look-alikes MEAN or how they
     are READ. Duplicates are dropped: two kanji glossed the same way
     would be two right answers. */
  function ateruOpts(k){
    var A = ateruState();
    var say = function(x){
      return A.ask === "mean" ? (x.en || "")
           : ((x.on || []).concat(x.kun || []).join("・") || "");
    };
    var mine = say(k);
    var out = [], seen = {};
    seen[mine] = 1;
    lookalikeKanji(k, 8).forEach(function(x){
      var t = say(x);
      if (!t || seen[t] || out.length >= 3) return;
      seen[t] = 1; out.push({ k: x, text: t });
    });
    /* if the look-alikes glossed thin, fill from anywhere rather than
       asking a question with two answers on it */
    if (out.length < 3)
      shuffle(K.kanji.slice()).forEach(function(x){
        var t = say(x);
        if (!t || seen[t] || out.length >= 3) return;
        seen[t] = 1; out.push({ k: x, text: t });
      });
    return shuffle(out.concat([{ k: k, text: mine }]));
  }

  /* ---- the glyph, as far out as the round has got ----
     show runs 0 to 1. The two old veils cleared in a straight line and
     were readable a third of the way in, so both now sit on a curve that
     does most of its work at the end. */
  function veilEase(show){ return Math.pow(show, 2.2); }
  function veilHtml(k, show, order){
    var A = ateruState();
    if (A.veil === "off")
      return '<div class="veil"><span class="noglyph">？</span></div>';
    if (A.veil === "pixel")
      return '<div class="veil"><canvas id="pxl" width="240" height="240"></canvas></div>';
    if (A.veil === "curtain")
      return '<div class="veil"><span class="glyph" style="clip-path:inset(0 0 '
        + Math.round((1 - veilEase(show)) * 100) + '% 0)">' + esc(k.k) + '</span></div>';
    if (A.veil === "jigsaw"){
      /* tiles over the kanji; the ones already turned over are holes in
         the cover, in the order this round shuffled them */
      var P = piecesOf();
      var openN = Math.round(show * P.n);
      var cells = [];
      for (var i = 0; i < P.n; i++){
        var at = order.indexOf(i);
        cells.push('<span class="jcell' + (at < openN ? " off" : "") + '"></span>');
      }
      return '<div class="veil jig"><span class="glyph">' + esc(k.k) + '</span>'
        + '<span class="jgrid" style="grid-template-columns:repeat(' + P.cols
        + ',1fr);grid-template-rows:repeat(' + (P.n / P.cols) + ',1fr)">'
        + cells.join("") + '</span></div>';
    }
    return '<div class="veil"><span class="glyph" style="filter:blur('
      + (26 * (1 - veilEase(show))).toFixed(1) + 'px)">' + esc(k.k) + '</span></div>';
  }
  function paintPixels(k, show){
    var c = $("pxl");
    if (!c || !c.getContext) return;
    var g = c.getContext("2d");
    /* Andrew: the first step gave too much away. It starts at two blocks
       across now and stays coarse for longer, so the early steps are four
       grey squares rather than a readable character behind a filter. */
    var n = Math.max(2, Math.round(2 + veilEase(show) * 58));
    var off = document.createElement("canvas");
    off.width = off.height = n;
    var og = off.getContext("2d");
    og.fillStyle = "#ffffff";
    og.fillRect(0, 0, n, n);
    og.fillStyle = "#1a1a1a";
    og.textAlign = "center";
    og.textBaseline = "middle";
    og.font = Math.round(n * 0.92) + 'px "Klee One", serif';
    og.fillText(k.k, n / 2, n / 2 + n * 0.04);
    g.imageSmoothingEnabled = false;
    g.clearRect(0, 0, 240, 240);
    g.drawImage(off, 0, 0, n, n, 0, 0, 240, 240);
  }

  DRAW.ateru = function(){
    var A = ateruState();
    var pool = K.kanji;
    var KEY = function(k){ return "ateru:" + k.k; };

    /* ---- the set-up, which is most of what Andrew asked for ---- */
    if (!runOf("ateru")){
      var cat = CATOF.ateru || "";
      var mine = cat ? pool.filter(function(k){ return k.cat === cat; }) : pool;
      var left = mine.filter(function(k){ return !S.won[KEY(k)]; }).length;
      $("main").innerHTML = ruleFor("ateru")
        + '<div class="work"><div class="ask">'
        + '<p class="startlead">What is the question?</p>'
        + '<div class="catrow" id="asks">'
        + ANSWERS.map(function(x){
            return '<button data-ask="' + x.id + '"' + (A.ask === x.id ? ' class="on"' : "")
              + '><b>' + esc(x.en) + '</b><span>' + esc(x.ja) + '</span></button>';
          }).join("")
        + '</div>'
        + '<p class="startlead">How does the kanji appear?</p>'
        + '<div class="catrow" id="veils">'
        + VEILS.map(function(v){
            return '<button data-veil="' + v.id + '"' + (A.veil === v.id ? ' class="on"' : "")
              + '><b>' + esc(v.en) + '</b><span>' + esc(v.ja) + '</span></button>';
          }).join("")
        + '</div>'
        + (A.veil === "jigsaw"
            ? '<div class="catrow" id="pieces">'
              + PIECES.map(function(x){
                  return '<button data-pieces="' + x.n + '"'
                    + (A.pieces === x.n ? ' class="on"' : "")
                    + '><b>' + esc(x.en) + '</b><span>' + esc(x.ja) + '</span></button>';
                }).join("")
              + '</div>'
            : "")
        + '<p class="startlead">Who turns the steps over?</p>'
        + '<div class="catrow" id="clocks">'
        + CLOCKS.map(function(c){
            return '<button data-secs="' + c.secs + '"'
              + (A.auto === c.secs ? ' class="on"' : "")
              + '><b>' + esc(c.en) + '</b><span>' + esc(c.ja) + '</span></button>';
          }).join("")
        + '</div>'
        + '<p class="startlead">Which clues are in play?</p>'
        + '<div class="catrow" id="clues">'
        + CLUES.filter(function(c){
            /* what is being asked for is not offered as a clue to itself */
            if (A.ask === "mean" && c.id === "mean") return false;
            if (A.ask === "read" && (c.id === "on" || c.id === "kun")) return false;
            return true;
          }).map(function(c){
            return '<button data-clue="' + c.id + '"' + (A.clues[c.id] ? ' class="on"' : "")
              + '><b>' + esc(c.en) + '</b><span>' + esc(c.ja) + '</span></button>';
          }).join("")
        + '</div>'
        + '<p class="startlead">Which kanji?</p>'
        + '<div class="catrow" id="cats">'
        + '<button data-cat=""' + (cat ? "" : ' class="on"')
        + '><b>Everything</b><span>ぜんぶ</span></button>'
        + (K.cats || []).map(function(c){
            return '<button data-cat="' + esc(c.id) + '"' + (cat === c.id ? ' class="on"' : "")
              + '><b>' + esc(c.en) + '</b><span>' + esc(c.ja) + '</span></button>';
          }).join("")
        + '</div>'
        + '<div class="quick" id="sizes">'
        + SIZES.map(function(n){
            var few = mine.length < n;
            return '<button data-n="' + n + '"' + (few ? ' class="ghosty"' : "")
              + '><b>' + (few ? mine.length : n) + ' kanji</b>'
              + '<span>' + (few ? mine.length : n) + 'じ</span></button>';
          }).join("")
        + '</div>'
        + '<p class="startnote">The four answers belong to the four kanji '
        + 'that look most like it, so the shape is the question. '
        + left + ' of ' + mine.length
        + ' not guessed yet. Each round is ' + ateruSteps()
        + ' steps and starts at ' + ateruSteps() + ' points: every reveal costs one.'
        + (A.auto ? ' The steps turn over by themselves every ' + A.auto
                    + ' seconds, and Pause stops the clock.' : "")
        + '</p></div></div>'
        + foot("");
      each($("asks"), "[data-ask]", function(b){
        b.onclick = function(){ A.ask = b.dataset.ask; save(); DRAW.ateru(); };
      });
      each($("veils"), "[data-veil]", function(b){
        b.onclick = function(){ A.veil = b.dataset.veil; save(); DRAW.ateru(); };
      });
      each($("pieces") || document.createElement("div"), "[data-pieces]", function(b){
        b.onclick = function(){ A.pieces = +b.dataset.pieces; save(); DRAW.ateru(); };
      });
      each($("clocks"), "[data-secs]", function(b){
        b.onclick = function(){ A.auto = +b.dataset.secs; save(); DRAW.ateru(); };
      });
      each($("clues"), "[data-clue]", function(b){
        b.onclick = function(){
          A.clues[b.dataset.clue] = A.clues[b.dataset.clue] ? 0 : 1;
          /* with no kanji AND no clues there is nothing to go on, so the
             last one off stays on */
          if (!ateruLadder().length && A.veil === "off") A.clues[b.dataset.clue] = 1;
          save(); DRAW.ateru();
        };
      });
      each($("cats"), "[data-cat]", function(b){
        b.onclick = function(){ CATOF.ateru = b.dataset.cat; DRAW.ateru(); };
      });
      each($("sizes"), "[data-n]", function(b){
        b.onclick = function(){
          if (!mine.length) return;
          runStart("ateru", freshFirst(mine, Math.min(+b.dataset.n, mine.length), KEY));
          DRAW.ateru();
        };
      });
      ateruScore();
      return;
    }

    if (runOver("ateru")){
      var end = runEnd("ateru", "Guess the kanji", DRAW.ateru);
      $("main").innerHTML = ruleFor("ateru") + end.html + foot("");
      end.wire();
      ateruScore();
      return;
    }

    /* ---- one round ---- */
    var run = runOf("ateru");
    var k = run.list[run.i];
    var steps = ateruSteps(), step = 0, over = false;
    var opts = ateruOpts(k);
    var ladder = ateruLadder();
    var asking = ateruState().ask;
    var secs = ateruState().auto || 0;   /* 0 means the student turns them */
    var left = secs, paused = false;
    /* which tile of the jigsaw turns over when: shuffled per round, so
       the same kanji does not uncover the same way twice */
    var order = shuffle((function(){
      var a = [], n = piecesOf().n;
      for (var i = 0; i < n; i++) a.push(i);
      return a;
    })());
    ateruStop();

    $("main").innerHTML = ruleFor("ateru")
      + runBar("ateru")
      + '<div class="work"><div class="ask">'
      + '<div id="veilbox"></div>'
      + '<div class="clues" id="cluebox"></div>'
      + '<div class="qtag">' + (asking === "mean" ? "what does it mean"
                                                     : "how is it read") + '</div>'
      + '<div class="opts" id="opts">' + opts.map(function(o, i){
          return '<button class="opt' + (asking === "read" ? " jp" : " lat")
            + '" data-o="' + i + '">' + esc(o.text) + '</button>';
        }).join("") + '</div>'
      + '<div id="fb"></div></div></div>'
      + foot('<span class="worth" id="worth"></span>'
        + (secs ? '<button class="btn ghost sm" id="hold">Pause</button>' : "")
        + '<button class="btn sm" id="more">Show more</button>'
        + '<button class="btn ghost sm" id="skip">Skip this one</button>');

    function paint(){
      var show = steps <= 1 ? 1 : step / (steps - 1);
      $("veilbox").innerHTML = veilHtml(k, show, order);
      if (ateruState().veil === "pixel") paintPixels(k, show);
      /* a clue per step, once the picture has had the first few to
         itself: the shape is meant to be looked at before help arrives */
      var head = Math.max(0, steps - ladder.length);
      var told = ladder.slice(0, Math.max(0, step - head + 1));
      $("cluebox").innerHTML = told.map(function(c){
        return '<div class="clue"><i>' + esc(c.en) + '</i><b>'
          + esc(clueText(k, c.id)) + '</b></div>';
      }).join("");
      $("worth").innerHTML = over ? "" :
        '<b>' + Math.max(1, steps - step) + '</b> point'
        + (Math.max(1, steps - step) === 1 ? "" : "s") + ' if you get it now'
        + (secs && !over && step < steps - 1
            ? '<i class="tick">' + (paused ? "paused"
                : "next in " + left + "s") + '</i>' : "");
      $("more").disabled = over || step >= steps - 1;
      if ($("hold")) $("hold").disabled = over || step >= steps - 1;
    }
    function reveal(){
      if (over || step >= steps - 1) return;
      step++;
      left = secs;
      paint();
      if (step >= steps - 1) ateruStop();
    }
    /* one tick a second, so the line under the button counts down rather
       than sitting still and then jumping */
    function runClock(){
      ateruStop();
      if (!secs || over) return;
      left = secs;
      ateruTimer = setInterval(function(){
        if (over || paused || document.hidden) return;
        left--;
        if (left <= 0) reveal(); else paint();
      }, 1000);
    }
    function finish(right, picked){
      if (over) return;
      over = true;
      ateruStop();
      each($("opts"), "[data-o]", function(x){
        x.disabled = true;
        if (opts[+x.dataset.o].k.k === k.k) x.classList.add("yes");
        else if (picked && opts[+x.dataset.o].k.k === picked.k.k) x.classList.add("no");
      });
      /* what it was worth when they answered, not after the reveal that
         the answer itself triggers */
      var pay = right ? Math.max(1, steps - finish.at) : 0;
      step = steps - 1;
      paint();
      /* first() pays once per kanji ever, so a kanji already banked adds
         nothing — and saying "Yes, 4 points" over a score that did not
         move is a small lie the student can see. */
      var banked = right && first(KEY(k), pay, "guessed");
      runMark("ateru", k, right);
      $("fb").innerHTML = '<div class="mark ' + (right ? "yes" : "no") + '">'
        + '<b>' + (!right ? "It was"
                   : banked ? "Yes, " + pay + " point" + (pay === 1 ? "" : "s")
                   : "Yes, and you had this one already") + '</b>'
        + '<span class="jp">' + esc(k.k) + '</span>'
        + '<em class="gl">' + esc(k.en) + '<i>'
        + ((k.on || []).join("・") || "—") + ' · ' + ((k.kun || []).join("・") || "—")
        + '</i></em></div>';
      $("skip").textContent = "Next kanji";
      $("skip").onclick = function(){ runNext("ateru"); DRAW.ateru(); };
      ateruScore();
    }
    finish.at = 0;

    each($("opts"), "[data-o]", function(b){
      b.onclick = function(){
        if (over) return;
        finish.at = step;
        finish(opts[+b.dataset.o].k.k === k.k, opts[+b.dataset.o]);
      };
    });
    $("more").onclick = reveal;
    if ($("hold")) $("hold").onclick = function(){
      paused = !paused;
      $("hold").textContent = paused ? "Go" : "Pause";
      if (!paused) left = secs;
      paint();
    };
    $("skip").onclick = function(){
      ateruStop();
      runMark("ateru", k, false); runNext("ateru"); DRAW.ateru();
    };
    paint();
    runClock();
    ateruScore();

    /* hoisted, so the set-up and the end screen use it too */
    function ateruScore(){
      var got = K.kanji.filter(function(x){ return S.won[KEY(x)]; }).length;
      $("sc").innerHTML = '<b>' + got + '</b> of ' + K.kanji.length
        + ' guessed, all time';
      if (got >= K.kanji.length) done("ateru");
    }
    /* a seam for the check */
    window.VCE_ATERU = {
      kanji: function(){ return k.k; },
      step: function(){ return step; },
      steps: function(){ return steps; },
      clues: function(){ return $("cluebox").children.length; },
      opts: function(){ return opts.map(function(o){ return o.text; }); },
      optKanji: function(){ return opts.map(function(o){ return o.k.k; }); },
      over: function(){ return over; },
      veil: function(){ return ateruState().veil; },
      answer: function(){
        var me = null;
        opts.forEach(function(o){ if (o.k.k === k.k) me = o.text; });
        return me;
      },
      /* how far the three wrong answers are from this kanji by shape,
         against four taken at random, so a check can tell a look-alike
         from a coincidence */
      gaps: function(){
        buildShapes();
        if (!SHAPES[k.k]) return null;
        var near = 0, n = 0;
        opts.forEach(function(o){
          if (o.k.k === k.k) return;
          near += shapeGap(k.k, o.k.k); n++;
        });
        var rnd = 0, m = 0;
        shuffle(K.kanji.slice()).slice(0, 40).forEach(function(x){
          if (x.k === k.k) return;
          rnd += shapeGap(k.k, x.k); m++;
        });
        return { near: n ? near / n : 0, random: m ? rnd / m : 0 };
      },
      pieces: function(){ return piecesOf().n; },
      secs: function(){ return secs; },
      left: function(){ return left; },
      paused: function(){ return paused; },
      ticking: function(){ return !!ateruTimer; }
    };
  };

  /* ================= 0. しんだん =================
     The kanji half of the Head Start booklet, on a screen. Andrew's paper
     version asks five things about each of the 200 — meaning, can write,
     音読み, 訓読み, and a word it appears in — and he wants all five kept.
     Five times two hundred is a thousand decisions and nobody finishes
     that, so this asks them in two passes:

       pass 1   every kanji, one tap: can you read this one at all?
       pass 2   eight of the ones ticked, all five questions each

     Pass 1 gives the number that matters for VCE, which is a count out of
     200 and needs no arithmetic. Pass 2 gives the shape of what a tick
     means for this student, because "I know 一" covers everything from
     recognising it to writing いち、ひと（つ）、一日 from memory.

     THE ORDER IS EASIEST FIRST, and easiest means the school year a kanji
     is taught in Japan, out of data/levels.js. It is a published fact
     rather than anyone's judgement, it is not the order Andrew teaches
     them in, and the page says so where a student reads it. Q34 would
     replace it with his own sequence.

     NO POINTS AND NO SOUND. The ledger pays for getting something right,
     and ticking a box you marked yourself is not that: a student who
     ticked all 200 would be the highest scorer in the class. Finishing
     marks the rung done and nothing else.

     EVERY RUN IS KEPT. Andrew, 2026-11-24: "sit the March run beside the
     one now (do not overwrite)." So the store holds a list of dated runs
     from the start, because history cannot be added to a single record
     after the fact — by the time anyone wants it, the early runs are gone.
     localStorage still forgets when a browser is cleared, so the report
     says to print it.                                                   */
  var SHIN_SAMPLE = 8;      /* how many kanji pass 2 asks all five about */
  var SHIN_WIN = 10;        /* the window the ceiling is measured over */

  var FACETS = [
    { id:"mean",  ja:"いみ",    en:"what it means" },
    { id:"write", ja:"かく",    en:"how to write it" },
    { id:"on",    ja:"音読み",  en:"its 音読み" },
    { id:"kun",   ja:"訓読み",  en:"its 訓読み" },
    { id:"word",  ja:"ことば",  en:"a word it is in" }
  ];
  /* A kanji with no 音読み on Andrew's list cannot be asked for one, and
     counting it as a gap would mark a student down for his data. */
  function facetFits(k, f){
    if (f === "on") return k.on.length > 0;
    if (f === "kun") return k.kun.length > 0;
    if (f === "word") return k.words.length > 0;
    return true;
  }
  var GRADE_EN = { 1:"Year 1 in Japan", 2:"Year 2 in Japan",
                   3:"Year 3 in Japan", 4:"Year 4 in Japan",
                   5:"Year 5 in Japan", 6:"Year 6 in Japan",
                   8:"Junior high in Japan", 0:"Not a kanji" };
  function gradeOf(k){ return LV[k.k] || 0; }
  /* The 200 in order, easiest first; 々 has no year and goes last. */
  var SHIN_ORDER = K.kanji.slice().sort(function(a, b){
    var ga = gradeOf(a) || 99, gb = gradeOf(b) || 99;
    return ga - gb || K.kanji.indexOf(a) - K.kanji.indexOf(b);
  });
  function shinBands(){
    var out = [], last = null;
    SHIN_ORDER.forEach(function(k){
      var g = gradeOf(k);
      if (!last || last.g !== g){ last = { g: g, list: [] }; out.push(last); }
      last.list.push(k);
    });
    return out;
  }

  var shinState = null;     /* null = not started; else the run in progress */
  function shinStore(){
    if (!S.shin || !S.shin.runs) S.shin = { runs: [] };
    return S.shin;
  }
  function shinToday(){
    var d = new Date();
    function two(n){ return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate());
  }
  /* Where the ticks thin out: the first place in the ordered list where
     fewer than half of the next ten are ticked. That is a ceiling in the
     running-record sense — the point where a reader stops being fluent —
     and it is more use to a student than a raw total. */
  function shinCeiling(known){
    var n = SHIN_ORDER.length;
    for (var i = 0; i + SHIN_WIN <= n; i++){
      var hit = 0;
      for (var j = i; j < i + SHIN_WIN; j++)
        if (known[SHIN_ORDER[j].k]) hit++;
      if (hit * 2 < SHIN_WIN) return i;
    }
    return n;
  }
  /* Eight spread across what they ticked, not eight from the front: a
     sample taken off the easy end would say everybody can write anything. */
  function shinSample(known){
    var yes = SHIN_ORDER.filter(function(k){ return known[k.k]; });
    if (yes.length <= SHIN_SAMPLE) return yes.slice();
    var out = [], step = yes.length / SHIN_SAMPLE;
    for (var i = 0; i < SHIN_SAMPLE; i++) out.push(yes[Math.floor(i * step)]);
    return out;
  }

  DRAW.shin = function(){
    var st = shinState;
    if (!st) return shinStart();
    if (st.phase === "pick") return shinPick();
    if (st.phase === "five") return shinFive();
    return shinReport();
  };

  function shinStart(){
    var runs = shinStore().runs;
    var last = runs.length ? runs[runs.length - 1] : null;
    $("main").innerHTML = ruleFor("shin")
      + '<div class="work"><div class="ask">'
      + '<p class="startlead">Tap every kanji you can read. Then answer five '
      + 'questions about eight of them. It takes about three minutes.</p>'
      + (last
          ? '<p class="startnote">Last time, on ' + esc(last.at) + ', you ticked '
            + last.n + ' of ' + SHIN_ORDER.length + '. This run sits beside '
            + 'that one and does not replace it.</p>'
          : '<p class="startnote">Nothing here is marked and nothing is sent '
            + 'anywhere. The result is yours.</p>')
      + '<div class="quick"><button id="shingo"><b>Start</b>'
      + '<span>はじめる</span></button></div>'
      + (runs.length ? shinHistory() : "")
      + '</div></div>' + foot("");
    $("shingo").onclick = function(){
      shinState = { phase:"pick", known:{}, at:0, facets:{}, sample:[] };
      DRAW.shin();
    };
  }

  function shinPick(){
    var st = shinState;
    $("main").innerHTML = ruleFor("shin")
      + '<div class="work"><div class="shinwrap" id="bands"></div></div>'
      + foot('<button class="btn sm" id="shindone">See my result</button>');
    $("bands").innerHTML = shinBands().map(function(b){
      return '<div class="shinband"><div class="lvl">'
        + esc(GRADE_EN[b.g] || "No year") + ' <i>' + b.list.length + '</i></div>'
        + '<div class="chips">' + b.list.map(function(k){
            return '<button class="chip cat-' + esc(k.cat)
              + (st.known[k.k] ? " on" : "") + '" data-k="' + esc(k.k)
              + '" aria-pressed="' + (st.known[k.k] ? "true" : "false")
              + '" title="' + esc(k.en) + '">' + esc(k.k) + '</button>';
          }).join("") + '</div></div>';
    }).join("")
      + '<p class="startnote">Easiest first. The order is the school year '
      + 'each kanji is taught in Japan, which is the only published measure '
      + 'of difficulty. It is not the order you met them in class.</p>';
    each($("bands"), "[data-k]", function(b){
      b.onclick = function(){
        var k = b.dataset.k;
        if (st.known[k]) delete st.known[k]; else st.known[k] = 1;
        b.classList.toggle("on", !!st.known[k]);
        b.setAttribute("aria-pressed", st.known[k] ? "true" : "false");
        count();
      };
    });
    count();
    function count(){
      $("sc").innerHTML = '<b>' + Object.keys(st.known).length + '</b> of '
        + SHIN_ORDER.length + ' ticked';
    }
    $("shindone").onclick = function(){
      st.sample = shinSample(st.known);
      st.at = 0;
      st.phase = st.sample.length ? "five" : "report";
      DRAW.shin();
    };
  }

  function shinFive(){
    var st = shinState, k = st.sample[st.at];
    var fits = FACETS.filter(function(f){ return facetFits(k, f.id); });
    $("main").innerHTML = ruleFor("shin")
      + '<div class="work"><div class="ask">'
      + '<div class="runbar"><div class="runfill" style="width:'
      + Math.round((st.at / st.sample.length) * 100) + '%"></div>'
      + '<span class="runsay">' + (st.at + 1) + ' of ' + st.sample.length
      + '</span></div>'
      + '<p class="startlead">Which of these do you have for this kanji?</p>'
      + '<div class="shinbig cat-' + esc(k.cat) + '">' + esc(k.k) + '</div>'
      + '<div class="ticks">' + fits.map(function(f){
          var on = (st.facets[k.k] || {})[f.id];
          return '<button class="tick' + (on ? " on" : "") + '" data-f="'
            + esc(f.id) + '" aria-pressed="' + (on ? "true" : "false") + '">'
            + '<b>' + esc(f.ja) + '</b><span>I know ' + esc(f.en)
            + '</span></button>';
        }).join("") + '</div>'
      + '<div class="quick"><button id="shinnext"><b>'
      + (st.at + 1 >= st.sample.length ? "See my result" : "Next")
      + '</b><span>' + (st.at + 1 >= st.sample.length ? "けっか" : "つぎ")
      + '</span></button></div>'
      + '</div></div>' + foot("");
    each($("main"), "[data-f]", function(b){
      b.onclick = function(){
        var box = st.facets[k.k] || (st.facets[k.k] = {});
        var f = b.dataset.f;
        if (box[f]) delete box[f]; else box[f] = 1;
        b.classList.toggle("on", !!box[f]);
        b.setAttribute("aria-pressed", box[f] ? "true" : "false");
      };
    });
    $("shinnext").onclick = function(){
      st.at++;
      if (st.at >= st.sample.length){ st.phase = "report"; shinSave(); }
      DRAW.shin();
    };
  }

  /* The run goes in as a dated entry of its own. Nothing is overwritten. */
  function shinSave(){
    var st = shinState, store = shinStore();
    var known = SHIN_ORDER.filter(function(k){ return st.known[k.k]; })
                          .map(function(k){ return k.k; });
    var tally = {}, asked = {};
    FACETS.forEach(function(f){ tally[f.id] = 0; asked[f.id] = 0; });
    st.sample.forEach(function(k){
      FACETS.forEach(function(f){
        if (!facetFits(k, f.id)) return;
        asked[f.id]++;
        if ((st.facets[k.k] || {})[f.id]) tally[f.id]++;
      });
    });
    store.runs.push({ at: shinToday(), n: known.length, known: known.join(""),
                      sample: st.sample.map(function(k){ return k.k; }).join(""),
                      tally: tally, asked: asked,
                      ceil: shinCeiling(st.known) });
    save();
    doneQuiet("shin");
  }

  function shinHistory(){
    var runs = shinStore().runs;
    if (!runs.length) return "";
    return '<div class="shinruns"><b>Every run you have done</b>'
      + runs.map(function(r){
          return '<span class="shinrun">' + esc(r.at) + '<i>' + r.n + ' of '
            + SHIN_ORDER.length + '</i></span>';
        }).join("") + '</div>';
  }

  function shinReport(){
    var st = shinState;
    var runs = shinStore().runs, r = runs[runs.length - 1];
    var prev = runs.length > 1 ? runs[runs.length - 2] : null;
    var ceilAt = r.ceil, n = SHIN_ORDER.length;
    var ahead = SHIN_ORDER.filter(function(k){ return !st.known[k.k]; });
    var band = ceilAt < n ? GRADE_EN[gradeOf(SHIN_ORDER[ceilAt])] : null;

    /* The five facets, measured on the sample and carried across the
       whole tick list as a proportion. The sample is eight, so the figure
       is a rough one and the page says the sample size next to it rather
       than printing a number that looks surveyed. */
    var prof = FACETS.map(function(f){
      var got = r.tally[f.id], ask = r.asked[f.id];
      var across = ask ? Math.round((got / ask) * r.n) : null;
      return { f: f, got: got, ask: ask, across: across };
    }).filter(function(p){ return p.ask > 0; });
    var weakest = prof.slice().sort(function(a, b){
      return (a.got / a.ask) - (b.got / b.ask);
    })[0];

    $("main").innerHTML = ruleFor("shin")
      + '<div class="work"><div class="ask shinrep" id="rep">'
      + '<div class="shinhead"><b>' + r.n + '</b><span>of ' + n
      + ' VCE kanji ticked</span>'
      + (prev ? '<i>' + (r.n - prev.n >= 0 ? "+" : "") + (r.n - prev.n)
                + ' since ' + esc(prev.at) + '</i>' : '')
      + '</div>'
      + '<p class="startlead">'
      + (band
          ? 'Your ticks thin out around <b>' + esc(band) + '</b>. That is where '
            + 'to start, not the beginning of the list.'
          : 'You ticked your way to the end of the list without thinning out.')
      + '</p>'
      + '<div class="lvl">What a tick means for you <i>sample of '
      + r.sample.length + '</i></div>'
      + '<div class="shinprof">' + prof.map(function(p){
          var pc = Math.round((p.got / p.ask) * 100);
          return '<div class="shinrow"><b>' + esc(p.f.ja) + '</b>'
            + '<span class="shinbar"><i style="width:' + pc + '%"></i></span>'
            + '<u>' + p.got + ' of ' + p.ask + '</u>'
            + '<em>about ' + p.across + ' of your ' + r.n + '</em></div>';
        }).join("") + '</div>'
      + (weakest
          ? '<p class="startnote">Weakest of the five is <b>'
            + esc(weakest.f.ja) + '</b> — ' + esc(weakest.f.en) + '. '
            + esc(shinNext(weakest.f.id)) + '</p>'
          : "")
      + '<div class="lvl">Still ahead of you <i>' + ahead.length + '</i></div>'
      + '<div class="chips shinahead">' + ahead.slice(0, 60).map(function(k){
          return '<span class="chip cat-' + esc(k.cat) + '" title="'
            + esc(k.en) + '">' + esc(k.k) + '</span>';
        }).join("")
        + (ahead.length > 60
            ? '<span class="shinmore">and ' + (ahead.length - 60) + ' more</span>'
            : "")
      + '</div>'
      + shinHistory()
      + '<p class="startnote">This page lives in this browser only. Clearing '
      + 'your browser, or using a different device, loses it. Print it or '
      + 'save it as a PDF if you want it in March.</p>'
      + '</div></div>'
      + foot('<button class="btn ghost sm" id="shinprint">Print</button>'
             + '<button class="btn sm" id="shinagain">Do it again</button>');
    $("shinprint").onclick = function(){ window.print(); };
    $("shinagain").onclick = function(){ shinState = null; DRAW.shin(); };
  }
  /* Which rung fixes which gap. The diagnostic is only worth doing if it
     ends by naming the next thing to open. */
  function shinNext(id){
    if (id === "write") return "かく asks you to produce the kanji, not pick it.";
    if (id === "on" || id === "kun")
      return "よみかた drills which reading a kanji takes in which word.";
    if (id === "word") return "さがす lists every word each kanji appears in.";
    return "カード puts the ones you did not tick on flashcards.";
  }

  DRAW.nyuu = function(){
    $("main").innerHTML = ruleFor("nyuu")
      + '<div class="work">' + NYUURYOKU.html() + '</div>' + foot("");
    NYUURYOKU.wire();
    $("sc").textContent = "Once per laptop, and it lasts all year.";
  };

  /* a seam for tools/browser-check.js: the list as the app reads it, and
     what is being asked right now */
  window.VCE_KANJI = {
    kanji: function(){ return K.kanji.length; },
    words: function(){ return WORDS.length; },
    /* every word with the kanji behind it, so a check can work out for
       itself which cards a set of missed words should produce rather
       than asking the app the same sum twice */
    wordlist: function(){
      return WORDS.map(function(w){
        return { w: w.w, y: w.y, cat: w.cat, from: w.from.slice() };
      });
    },
    at: function(){ return STEPS[at].id; },
    /* the word on the screen now, which since 2026-11-16 is the one the
       set is up to rather than the next off an endless deck */
    word: function(){
      var r = runOf(STEPS[at].id);
      if (r && r.i < r.list.length) return r.list[r.i];
      return STEPS[at].id === "yomi" ? dealYomi()
           : (STEPS[at].id === "kaku" ? dealKaku() : null);
    },
    /* the set in progress, for the check: how many, how far, how it went */
    set: function(){
      var r = runOf(STEPS[at].id);
      return r ? { n: r.list.length, at: r.i, right: r.right,
                   missed: r.missed.length, over: r.i >= r.list.length } : null;
    },
    near: readingsNear,
    alike: lookalikes,
    yomu: function(){ return Y ? Y.passages.length : 0; },
    chosen: function(){ return picked().map(function(k){ return k.k; }); },
    cards: function(){ return { picked: picked().length,
                                front: sideOf("front").map(function(f){ return f.id; }),
                                back: sideOf("back").map(function(f){ return f.id; }),
                                testing: !!cardTest }; },
    english: function(){ return kakuAsksEnglish(); },
    read: function(i){ yomuOn = i; draw(); },
    shin: function(){
      var st = shinState;
      return { phase: st ? st.phase : null,
               order: SHIN_ORDER.map(function(k){ return k.k; }),
               grades: SHIN_ORDER.map(gradeOf),
               ticked: st ? Object.keys(st.known).length : 0,
               sample: st ? st.sample.map(function(k){ return k.k; }) : [],
               runs: (S.shin && S.shin.runs ? S.shin.runs : []).map(function(r){
                 return { at: r.at, n: r.n, ceil: r.ceil,
                          tally: r.tally, asked: r.asked };
               }),
               ceiling: st ? shinCeiling(st.known) : null };
    },
    shinTick: function(ks){
      if (!shinState) return false;
      ks.split("").forEach(function(c){ shinState.known[c] = 1; });
      return true;
    },
    tokens: function(line){ return readable(line); }
  };

  paintToggles();
  draw();
})();
