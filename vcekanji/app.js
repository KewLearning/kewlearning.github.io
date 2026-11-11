/* app.js — VCE漢字. The prescribed kanji, used rather than listed.

   Andrew asked for a VCE kanji app that puts the kanji into what students
   actually do: reading for meaning, writing accurately, the right reading
   in the right word. Not a flashcard deck. The list he keeps —
   VCE_KANJI_SEARCH_LIST_v4.xlsx, 200 kanji in fourteen groups with 559
   example words — is the whole of the content here, converted and not
   edited.

   WHAT IS IN THIS FIRST BUILD. Three rungs, all of them built from his own
   Japanese and nothing invented:

     さがす     the list itself, searchable by kanji, reading, meaning or
                word. A reference a student can keep open while writing.
     よみかた   which reading a kanji takes in which word, drilled across
                all 559. The thing the examiners' reports name every year.
     かく       the reading is given and the student produces the kanji:
                choose it from four that look or sound alike, then type it
                with the IME. Andrew's call, and the right one — a school
                iPad has no Japanese keyboard, and the written exam does.
     にゅうりょく  how to turn that keyboard on, the same module the exam
                apps carry.

   WHAT IS NOT HERE YET. よむ, reading for meaning in running Japanese,
   which is the rung Andrew wants leading. It needs sentences, and his list
   has words. The sentences are mine to draft and his to check before a
   student sees them, so they arrive in their own file and their own
   commit, after he has read them.

   NO ENGLISH IS INVENTED FOR HIS WORDS. The list glosses the kanji, not
   the words, so this app never shows an English meaning for 住所 or
   一日: it shows the kanji each word is made of and what those mean. A
   gloss nobody has checked is a wrong answer waiting to be marked right.

   The shell, the ledger and the fold-away rule box are ported from ひと
   and メガセンテンス rather than rewritten, so a student who has used one
   of those already knows this one.                                      */
"use strict";
(function(){
  var K = window.KANJI_VCE;
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
        seen[key] = { w: w.w, y: w.y, from: [k.k], cat: k.cat };
        WORDS.push(seen[key]);
      });
    });
  })();
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
  var S = { furi:true, en:true, pts:0, spent:0, won:{}, done:{}, howto:{} };
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
    $("ptsn").textContent = S.pts;
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; paintToggles(); save(); };
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
    { id:"find",  ja:"さがす",     en:"Look it up" },
    { id:"yomi",  ja:"よみかた",   en:"Which reading" },
    { id:"kaku",  ja:"かく",       en:"Write it" },
    { id:"nyuu",  ja:"にゅうりょく", en:"Typing Japanese" }
  ];
  var RULES = {
    find: "Search the whole list: type a kanji, a reading, a meaning or a "
        + "word. Filter by group with the buttons. Keep this open while you "
        + "write.",
    yomi: "Read the word and choose its reading. The wrong answers are the "
        + "readings the same kanji takes in other words, which is where the "
        + "marks go.",
    kaku: "Read the kana and choose the kanji word it writes. Then type it "
        + "with the Japanese keyboard. Choosing pays 1 point, typing pays 2.",
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
    if (fresh) award(5, "rung done");
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
    paintToggles(); paintSteps();
    TABS.keep(KEY, STEPS[at].id);
    TABS.inview($("steps"));
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
  }

  /* ================= 1. さがす =================
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
    $("cats").innerHTML =
      '<button data-c="" class="' + (findCat ? "" : "on") + '">ぜんぶ</button>'
      + K.cats.map(function(c){
          return '<button data-c="' + esc(c.id) + '" class="'
            + (findCat === c.id ? "on" : "") + '" title="' + esc(c.en) + '">'
            + esc(c.ja) + '</button>';
        }).join("");
    each($("cats"), "[data-c]", function(b){
      b.onclick = function(){ findCat = b.dataset.c; DRAW.find(); };
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
      $("sc").innerHTML = '<b>' + hits.length + '</b> of ' + K.kanji.length
        + ' kanji' + (findCat ? ' · ' + esc(CATNAME[findCat].en) : '')
        + ' · ' + hits.reduce(function(n, k){ return n + k.words.length; }, 0)
        + ' words';
    }
    function card(k){
      return '<div class="kcard">'
        + '<div class="top"><span class="big">' + esc(k.k) + '</span>'
        + '<span class="mean">' + esc(k.en) + '</span></div>'
        + '<div class="rds">'
        + (k.on.length ? '<s class="o"><i>on</i>' + esc(k.on.join("、")) + '</s>' : '')
        + (k.kun.length ? '<s class="k"><i>kun</i>' + esc(k.kun.join("、")) + '</s>' : '')
        + '</div>'
        + '<div class="ws">' + k.words.map(function(w){
            return '<span>' + ruby(w.w, w.y) + '</span>';
          }).join("") + '</div></div>';
    }
  };

  /* ================= 2. よみかた =================
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
  /* What the word is made of, in the list's own terms: each kanji, what
     it means, and the readings it owns. No English for the word itself,
     because the list does not gloss the words and this app does not
     invent. */
  function breakdown(word){
    var ps = partsOf(word.w);
    if (!ps.length) return "";
    return '<div class="parts">' + ps.map(function(k){
      return '<div class="part"><div class="pk">' + esc(k.k) + '</div>'
        + '<div class="pe">' + esc(k.en) + '</div>'
        + '<div class="pr">' + esc(k.on.concat(k.kun).join("、")) + '</div></div>';
    }).join("") + '</div>';
  }

  /* ================= 3. かく =================
     The reading is given and the student produces the kanji. Andrew's
     answer to how: choose it first, then type it. Choosing works on a
     school iPad with no Japanese keyboard and trains the discrimination
     the examination tests; typing is what the examination actually asks
     for, and it pays double.

     The three wrong choices are words that sound alike or share a kanji,
     never words picked at random: a question whose wrong answers are
     obviously wrong is a question about nothing.                        */
  var kakuDeck = null, kakuAt = 0;
  function dealKaku(){
    if (!kakuDeck || kakuAt >= kakuDeck.length){
      /* only words with kanji in them: asking a student to write つ in
         kanji is asking for nothing */
      kakuDeck = shuffle(WORDS.filter(function(w){ return hasKanji(w.w); }));
      kakuAt = 0;
    }
    return kakuDeck[kakuAt];
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
    var word = dealKaku();
    var opts = shuffle(lookalikes(word).concat([word]));
    var chosen = false, typed = false;
    $("main").innerHTML = ruleFor("kaku")
      + '<div class="work"><div class="ask">'
      + '<div class="qtag">write this in kanji</div>'
      + '<div class="prompt kana">' + esc(word.y) + '</div>'
      + '<div class="opts" id="opts">' + opts.map(function(o, i){
          return '<button class="opt" data-o="' + i + '">' + esc(o.w) + '</button>';
        }).join("") + '</div>'
      + '<div class="typebox" id="tb" hidden>'
      + '<input id="ta" inputmode="text" autocomplete="off" spellcheck="false"'
      + ' aria-label="Type the word in kanji" placeholder="' + esc(word.y) + '">'
      + '<button class="btn" id="go">たしかめる</button></div>'
      + '<div id="fb"></div></div></div>'
      + foot('<button class="btn ghost sm" id="skip">Another word</button>');
    paintScore();
    $("skip").onclick = function(){ kakuAt++; DRAW.kaku(); };
    each($("opts"), "[data-o]", function(b){
      b.onclick = function(){
        if (chosen) return;
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
          + '<p>Now type it. The keyboard is the examination’s, not '
          + 'this app’s: にゅうりょく says how to turn it on.</p></div>'
          + breakdown(word);
        $("tb").hidden = false;
        $("ta").focus();
        paintScore();
      };
    });
    $("go").onclick = check;
    $("ta").onkeydown = function(e){ if (e.key === "Enter") check(); };
    function check(){
      if (typed) return;
      var got = ($("ta").value || "").trim();
      if (!got) return;
      if (got === word.w){
        typed = true;
        first("kaku:type:" + word.w, 2, "typed");
        $("fb").innerHTML = '<div class="mark yes"><b>Typed</b>'
          + '<span class="jp">' + ruby(word.w, word.y) + '</span></div>'
          + breakdown(word);
        $("skip").textContent = "Next word";
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
        + '<p>The word is ' + ruby(word.w, word.y) + '. Check each kanji '
        + 'against it: the keyboard offers several and only one is this '
        + 'word.</p></div>' + breakdown(word);
    }
    function paintScore(){
      var pick = 0, type = 0;
      WORDS.forEach(function(w){
        if (S.won["kaku:pick:" + w.w]) pick++;
        if (S.won["kaku:type:" + w.w]) type++;
      });
      var all = WORDS.filter(function(w){ return hasKanji(w.w); }).length;
      $("sc").innerHTML = '<b>' + pick + '</b> chosen · <b>' + type
        + '</b> typed · of ' + all;
      if (type >= all) done("kaku");
    }
  };

  /* ================= 4. にゅうりょく =================
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
    alike: lookalikes
  };

  paintToggles();
  draw();
})();
