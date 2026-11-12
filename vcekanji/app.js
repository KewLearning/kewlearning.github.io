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
    { id:"find",  ja:"さがす",     en:"Look it up" },
    { id:"cards", ja:"カード",     en:"Flashcards" },
    { id:"yomi",  ja:"よみかた",   en:"Which reading" },
    { id:"kaku",  ja:"かく",       en:"Write it" },
    { id:"nyuu",  ja:"にゅうりょく", en:"Typing Japanese" }
  ];
  var RULES = {
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
    yomi: "Read the word and choose its reading. The wrong answers are the "
        + "readings the same kanji takes in other words, which is where the "
        + "marks go.",
    kaku: "Write the word in kanji and type it. The prompt alternates: the "
        + "reading one turn, the English meaning the next, so it asks what "
        + "the word means as well as how it is written. Typing pays 2. "
        + "Stuck? Tap Show four choices and pick one, which pays 1.",
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
  DRAW.yomi = function(){
    var word = dealYomi();
    var opts = shuffle(readingsNear(word).concat([word.y]));
    var answered = false;
    $("main").innerHTML = ruleFor("yomi")
      + '<div class="work"><div class="ask">'
      + '<div class="qtag">how is it read</div>'
      + '<div class="prompt">' + esc(word.w) + '</div>'
      + '<div class="opts" id="opts">' + opts.map(function(o, i){
          return '<button class="opt" data-o="' + i + '">' + esc(o) + '</button>';
        }).join("") + '</div>'
      + '<div id="fb"></div></div></div>'
      + foot('<button class="btn ghost sm" id="skip">Another word</button>');
    paintScore();
    $("skip").onclick = function(){ yomiAt++; DRAW.yomi(); };
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
        if (right) first("yomi:" + word.w + word.y, 1, "reading");
        $("fb").innerHTML = '<div class="mark ' + (right ? "yes" : "no") + '">'
          + '<b>' + (right ? "Yes" : "Not that one") + '</b>'
          + '<span class="jp">' + ruby(word.w, word.y) + '</span>'
          + meaning(word)
          + '</div>' + breakdown(word);
        paintScore();
        $("skip").textContent = "Next word";
      };
    });
    function paintScore(){
      var got = WORDS.filter(function(w){
        return S.won["yomi:" + w.w + w.y];
      }).length;
      $("sc").innerHTML = '<b>' + got + '</b> of ' + WORDS.length + ' words read';
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
  DRAW.kaku = function(){
    var word = dealKaku(), inEnglish = kakuAsksEnglish();
    var opts = shuffle(lookalikes(word).concat([word]));
    var shown = false, chosen = false, typed = false;
    $("main").innerHTML = ruleFor("kaku")
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
      + foot('<button class="btn ghost sm" id="skip">Another word</button>');
    paintScore();
    $("skip").onclick = function(){ nextKaku(); DRAW.kaku(); };
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
        if (!shown) first("kaku:type:" + word.w, 2, "typed");
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
        + '</b> chosen · of ' + all;
      if (got >= all) done("kaku");
    }
  };

  /* ================= 6. にゅうりょく =================
     The same module the Year 10, 11 and 12 examination apps carry, with
     its own styles. A student cannot type an answer to the written
     examination until this is done, and this app asks them to type. */
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
    at: function(){ return STEPS[at].id; },
    word: function(){ return STEPS[at].id === "yomi" ? dealYomi()
                           : (STEPS[at].id === "kaku" ? dealKaku() : null); },
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
    tokens: function(line){ return readable(line); }
  };

  paintToggles();
  draw();
})();
