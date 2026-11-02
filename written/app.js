/* app.js — ひっきしけん, the Units 3 and 4 written examination.

   Six rungs, and each one is a thing the paper asks for rather than a
   thing that was easy to build:

     ぶんぽう   particles, tense and patterns, one item at a time
     まちがい   find the mistake, in sentences the reports named
     ききとり   listening, two voices, transcript hidden until you ask
     どっかい   reading, with the strategy on every question
     さくぶん   text types, plans and two models pulled apart
     さくせん   the paper itself, the criteria, and what the assessors said

   NOT ONE LINE OF JAPANESE HERE COMES FROM A VCAA PAPER. Every text,
   every drill and every model is written for this app. For the real
   papers and the real audio the さくせん rung links out to VCAA's own
   page, which is where they belong.

   NOTHING IS RECORDED AND NOTHING IS SENT. What you type and what you
   get right live in this browser and nowhere else. */
(function(){
  "use strict";
  var EX = window.HIKKI_EXAM, DR = window.HIKKI_DRILLS,
      TX = window.HIKKI_TEXTS, WR = window.HIKKI_WRITING,
      RD = window.HIKKI_READINGS || { overrides: [], not_particle: [] },
      AU = window.HIKKI_AUDIO || { clips: {}, voices: {} };
  var CLIPS = AU.clips || {};

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
  function plain(t){ return String(t||"").replace(RUN, "$1"); }

  /* ---- は as わ, へ as え ----
     The topic particle は is said わ, and a recorded voice does not work
     that out on its own: in the oral app 高校生は came back with a HA in
     the middle of it. Which は is the particle is not guessed. Andrew
     spaces his Japanese at the phrase boundaries, so a は that ENDS one
     of those phrases is the particle, and ではなく is the one shape where
     it sits inside a phrase instead.

     This is the same transform as tools/make-audio.py's spoken() and
     tools/validate.js's. All three have to agree or the clip keys stop
     matching, and validate.js checks that they do.

     Only the sound changes. は is still は everywhere on the screen. */
  var CHUNKS = /[^\s\u3000、。！？!?「」『』]+/g;
  var NOTWA = {};
  (RD.not_particle || []).forEach(function(w){ NOTWA[w] = 1; });
  var OVER = (RD.overrides || []).slice().sort(function(a, b){
    return b.ja.length - a.ja.length;
  });
  function particles(t){
    return String(t).replace(CHUNKS, function(c){
      if (NOTWA[c]) return c;
      c = c.replace(/では(?=[なあ])/g, "でわ");
      if (/は$/.test(c)) return c.slice(0, -1) + "わ";
      if (/へ$/.test(c)) return c.slice(0, -1) + "え";
      return c;
    });
  }
  function speakable(t){
    var out = particles(plain(t)).replace(/[\s　]+/g, "");
    OVER.forEach(function(o){ out = out.split(o.ja).join(o.say); });
    return out;
  }
  function clipKey(voice, t){ return voice + "|" + speakable(t); }

  /* ---- furigana ----
     A reading is written once, on the first time the word appears, which
     is how Andrew writes a worksheet. On paper that is right. On screen,
     for the student who needs the reading, it is the difference between
     reading the line and stopping at it, so a reading given once in a
     text is put back on every later occurrence of the SAME WORD. Whole
     words only: 日 is にち in 十日 and き in 今日, and a per-character
     table gets that wrong. */
  function rubify(text, learnt){
    var out = "", i = 0, s = String(text || "");
    while (i < s.length){
      var m = /^([一-鿿々]+)(\[([ぁ-ゟー]+)\])?/.exec(s.slice(i));
      if (m && m[1]){
        var run = m[1], r = m[3] || learnt[run];
        if (m[3]) learnt[run] = m[3];
        out += r ? "<ruby>" + esc(run) + "<rt>" + esc(r) + "</rt></ruby>" : esc(run);
        i += m[0].length; continue;
      }
      out += esc(s[i]); i++;
    }
    return out;
  }
  function ruby(t){ return rubify(t, {}); }

  /* ---- sound ---- */
  var SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYA"
    + "AESsAAACABAAZGF0YQAAAAA=";
  var el0 = null, woken = false;
  function sound(){ if (!el0){ el0 = new Audio(); el0.preload = "auto"; } return el0; }
  ["pointerdown","touchstart","keydown"].forEach(function(ev){
    document.addEventListener(ev, function(){
      if (woken) return; woken = true;
      /* A phone will not play a clip that no gesture asked for, so the
         element the app reuses is played once, silently, inside the first
         press. It is then emptied: left holding the silent clip, its next
         src is asked for a byte range past the end of a file that has
         none, and the first real clip of the lesson never plays. */
      try {
        var a = sound();
        a.src = SILENCE;
        var done = function(){
          try { a.pause(); a.removeAttribute("src"); } catch(e2){}
        };
        var pr = a.play();
        if (pr && pr.then) pr.then(done, done); else done();
      } catch(e){}
    }, { once:true, passive:true });
  });
  function say(voice, text, onEnd){
    var f = CLIPS[clipKey(voice, text)];
    var a = sound();
    try { a.pause(); if (a.readyState > 0) a.currentTime = 0; } catch(e){}
    a.onended = null;
    if (!f) return false;
    a.src = "audio/" + f;
    /* Without this the element keeps the position it had on the clip
       before and asks the next file for a byte range that is past its
       end, which on a local file is an error and a clip that never
       plays. load() is what resets the resource and the position. */
    try { a.load(); } catch(e){}
    try { a.playbackRate = S.rate; } catch(e){}
    if (onEnd) a.onended = onEnd;
    a.play().catch(function(){});
    return true;
  }
  function stopSound(){
    var a = sound();
    a.onended = null;
    try { a.pause(); if (a.readyState > 0) a.currentTime = 0; } catch(e){}
  }

  /* ---- what the page remembers ---- */
  var KEY = "hikki-v1";
  var S = { furi:true, rate:1, step:"bunpou", pick:{}, right:0, tried:0,
            got:{}, wrote:{}, script:{}, howto:{}, runs:[], run:null };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){}
  if (!S.runs) S.runs = [];
  /* The Japanese-only error option became one that covers both
     languages, since a student answering Section 1 Part A in English
     had nothing to tick. A tick already saved under the old name is
     moved across rather than left pointing at an option that no
     longer exists. */
  S.runs.forEach(function(r){
    (r.rows || []).forEach(function(q){
      var at = (q.errs || []).indexOf("ja");
      if (at >= 0) q.errs[at] = "expr";
    });
  });
  /* ---- a throttle, not a debounce ----
     It was a 250ms debounce, which never fires at all while somebody
     types steadily: every keystroke pushed it back, so everything
     since the last pause lived in memory only. Fine when the most
     that could be lost was a half-typed answer; not fine for きろく,
     where a student enters a whole marked exam question by question
     and would be furious to type it twice. pagehide covers a tidy
     close. It does not cover a crash.

     So a change now guarantees a write within 400ms, whatever else
     is happening. The first change schedules it; changes during the
     window are free, because the write stringifies the state as it
     is when it fires, not as it was when it was asked for. */
  var saveT = null, lastWrite = 0;
  function save(){
    if (saveT) return;
    saveT = setTimeout(saveNow, Math.max(0, 400 - (Date.now() - lastWrite)));
  }
  function saveNow(){
    clearTimeout(saveT);
    saveT = null;
    lastWrite = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){}
  }
  window.addEventListener("pagehide", saveNow);
  document.addEventListener("visibilitychange", function(){
    if (document.visibilityState === "hidden") saveNow();
  });

  function paintToggles(){
    document.body.classList.toggle("nofuri", !S.furi);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("rateLabel").textContent = "×" + S.rate;
    $("rateBtn").classList.toggle("off", S.rate !== 1);
    $("ptsn").textContent = S.right;
    $("pts").title = S.tried
      ? S.right + " right out of " + S.tried + " tried on this device."
      : "Nothing tried yet on this device.";
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; save(); paintToggles(); };
  var RATES = [0.8, 1, 1.15];
  $("rateBtn").onclick = function(){
    S.rate = RATES[(RATES.indexOf(S.rate)+1) % RATES.length] || 1;
    save(); paintToggles();
  };
  $("resetBtn").onclick = function(){
    if (!confirm("Clear your score and everything typed on this device?")) return;
    S = { furi:true, rate:1, step:"bunpou", pick:{}, right:0, tried:0,
          got:{}, wrote:{}, script:{}, howto:{}, runs:[], run:null };
    try { localStorage.removeItem(KEY); } catch(e){}
    draw();
  };
  /* Nothing is recorded anywhere, so the only way to show somebody is to
     take it with you. A line of text to screenshot or paste. */
  $("saveBtn").onclick = function(){
    var g = 0, e = 0;
    Object.keys(S.got).forEach(function(k){
      if (/^g:/.test(k)) g++; else if (/^e:/.test(k)) e++;
    });
    var line = "ひっきしけん · " + S.right + " right of " + S.tried + " tried"
      + " · grammar " + g + "/" + (DR.grammar||[]).length
      + " · spot the error " + e + "/" + (DR.errors||[]).length
      + " · " + new Date().toLocaleDateString("en-AU");
    var ta = document.createElement("textarea");
    ta.value = line;
    ta.style.cssText = "position:fixed;inset:auto 10px 10px 10px;z-index:90;"
      + "height:84px;font-size:15px;padding:9px;border:2px solid #16375e;border-radius:9px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch(e2){}
    alert("Copied, and shown at the bottom of the screen so you can screenshot it:\n\n"
      + line + "\n\nNothing is sent anywhere. This is the only record there is.");
    setTimeout(function(){ ta.remove(); }, 20000);
  };

  /* ---- scoring ---- */
  function scored(id, right){
    S.tried++;
    if (right && !S.got[id]){ S.got[id] = 1; S.right++; }
    save(); paintToggles();
  }

  /* ---- what the assessors said ---- */
  function said(rep){
    if (!rep) return "";
    return '<div class="said"><span class="yr">' + esc(rep.year) + ' report</span>'
      + '<em>' + esc(rep.note) + '</em></div>';
  }

  /* ---- a saved text box ---- */
  function box(key, cls, rows){
    return '<textarea class="ans ' + (cls || "") + '" data-keep="' + esc(key) + '"'
      + ' rows="' + (rows || 2) + '" spellcheck="false">'
      + esc(S.wrote[key] || "") + '</textarea>';
  }
  function wireBoxes(scope){
    each(scope, "textarea[data-keep]", function(t){
      t.addEventListener("input", function(){
        S.wrote[t.getAttribute("data-keep")] = t.value;
        save();
      });
    });
  }

  /* ================================================================ rungs */
  var STEPS = [
    { id:"bunpou",  ja:"ぶんぽう",  en:"grammar" },
    { id:"machigai",ja:"まちがい",  en:"find the error" },
    { id:"kikitori",ja:"ききとり",  en:"listening" },
    { id:"dokkai",  ja:"どっかい",  en:"reading" },
    { id:"sakubun", ja:"さくぶん",  en:"writing" },
    { id:"sakusen", ja:"さくせん",  en:"strategy" },
    { id:"kiroku",  ja:"きろく",    en:"your practice exams" }
  ];

  function chips(items, chosen, onPick, label){
    var p = $("pick");
    if (!items.length){ p.style.display = "none"; return; }
    p.style.display = "flex";
    p.innerHTML = (label ? '<span class="lbl">' + esc(label) + '</span>' : "")
      + items.map(function(it){
        return '<button data-k="' + esc(it.k) + '"'
          + (it.k === chosen ? ' aria-current="true"' : '') + '>'
          + esc(it.t) + '</button>';
      }).join("");
    each(p, "button", function(b){
      b.onclick = function(){ onPick(b.getAttribute("data-k")); };
    });
  }

  /* ---------------------------------------------------------- ぶんぽう */
  var FOCUS = { particle:"じょし", tense:"テンス", adjective:"けいようし",
                verb:"どうし", pattern:"ぶんけい", counter:"じょすうし",
                vocab:"ことば", katakana:"カタカナ", kanji:"かんじ",
                texttype:"テキストタイプ" };
  var decks = {};
  function deckFor(name, pool){
    /* One pass through the pool in a fresh order, and the ones already
       right stay in it: a student who wants the whole set gets the whole
       set, and the readout in the bar is what tracks progress. */
    if (!decks[name] || !decks[name].length) decks[name] = shuffle(pool);
    return decks[name];
  }

  function drawBunpou(){
    var all = DR.grammar || [];
    var fs = [];
    all.forEach(function(g){ if (fs.indexOf(g.focus) < 0) fs.push(g.focus); });
    var sel = S.pick.bunpou || "all";
    if (sel !== "all" && fs.indexOf(sel) < 0) sel = "all";
    chips([{ k:"all", t:"ぜんぶ" }].concat(fs.map(function(f){
      return { k:f, t:FOCUS[f] || f };
    })), sel, function(k){ S.pick.bunpou = k; save(); draw(); }, "focus");

    var pool = all.filter(function(g){ return sel === "all" || g.focus === sel; });
    var deck = deckFor("g:" + sel, pool);
    var item = deck[0];
    var done = pool.filter(function(g){ return S.got["g:" + g.id]; }).length;

    $("main").innerHTML =
      '<div class="rule"><b>Fill the gap</b>'
      + 'Pick the right option. The reason underneath says why the other '
      + 'three are wrong. Examiner reports name most of these mistakes, and '
      + 'the year sits beside the quote.</div>'
      + '<div class="work"><div class="col">'
      + '<div class="card" id="item"></div></div></div>'
      + '<div class="foot"><span>' + done + ' of ' + pool.length
      + ' right so far in this focus</span><span class="sp"></span>'
      + '<button class="btn ghost sm" id="skip">Skip</button>'
      + '<button class="btn" id="next" disabled>Next</button></div>';

    function paint(){
      var stem = ruby(item.ja).replace(/＿/g,
        '<span class="gap" id="gap">＿＿</span>');
      $("item").setAttribute("data-id", item.id);
      $("item").innerHTML =
        '<div class="cap">' + esc(FOCUS[item.focus] || item.focus) + '</div>'
        + '<div class="stem">' + stem + '</div>'
        + '<div class="opts" id="opts">'
        + shuffle(item.options).map(function(o){
            return '<button data-o="' + esc(o) + '">' + esc(o) + '</button>';
          }).join("")
        + '</div><div id="fb"></div>';
      each($("opts"), "button", function(b){
        b.onclick = function(){ answer(b, b.getAttribute("data-o")); };
      });
    }
    function answer(btn, o){
      var right = o === item.answer;
      each($("opts"), "button", function(b){ b.disabled = true; });
      btn.className = right ? "yes" : "no";
      if (!right){
        each($("opts"), "button", function(b){
          if (b.getAttribute("data-o") === item.answer) b.className = "yes";
        });
      }
      var g = $("gap"); if (g){ g.textContent = item.answer; g.className = "gap filled"; }
      $("fb").innerHTML =
        '<div class="mark ' + (right ? "yes" : "no") + '"><b>'
        + (right ? "right" : "not that one") + '</b>'
        + '<div>' + ruby(item.why) + '</div></div>'
        + said(item.report);
      scored("g:" + item.id, right);
      $("next").disabled = false;
      $("next").focus();
    }
    function advance(){
      deck.shift();
      if (!deck.length) decks["g:" + sel] = shuffle(pool);
      draw();
    }
    $("next").onclick = advance;
    $("skip").onclick = advance;
    paint();
  }

  /* --------------------------------------------------------- まちがい
     The sentence is cut at Andrew's own phrase spacing, and the student
     taps the phrase they think is wrong. The span in the data can run
     across more than one of those phrases, so the run is found by
     comparing the text with the spaces taken out. */
  var PUNCT = "、。！？!?「」『』（）";
  var TOKEN = /[\s\u3000]+|[、。！？!?「」『』（）]|[^\s\u3000、。！？!?「」『』（）]+/g;
  function chunksOf(s){
    var out = [], m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(s))) out.push(m[0]);
    return out;
  }
  function isSpace(t){ return /^[\s\u3000]+$/.test(t); }
  function isPunct(t){ return t.length === 1 && PUNCT.indexOf(t) >= 0; }
  /* Where the right sentence differs from the wrong one: the common start
     and the common end come off, and what is left is the correction. The
     data does not carry it as a field because a field is a second place
     to get it wrong; the two sentences already say it. */
  function fixRun(wrong, right){
    var A = chunksOf(wrong), B = chunksOf(right), i = 0, j = 0;
    while (i < A.length && i < B.length && A[i] === B[i]) i++;
    while (j < A.length - i && j < B.length - i
           && A[A.length-1-j] === B[B.length-1-j]) j++;
    return { parts:B, from:i, to:B.length - 1 - j };
  }
  function spanRun(wrong, span){
    var parts = chunksOf(wrong);
    var want = String(span).replace(/[\s\u3000]/g, "");
    for (var i = 0; i < parts.length; i++){
      if (isSpace(parts[i])) continue;
      var acc = "";
      for (var j = i; j < parts.length; j++){
        acc += parts[j].replace(/[\s\u3000]/g, "");
        if (acc === want) return { from:i, to:j, parts:parts };
        if (acc.length > want.length) break;
      }
    }
    return { from:-1, to:-1, parts:parts };
  }

  function drawMachigai(){
    var all = DR.errors || [];
    var fs = [];
    all.forEach(function(e){ if (fs.indexOf(e.focus) < 0) fs.push(e.focus); });
    var sel = S.pick.machigai || "all";
    if (sel !== "all" && fs.indexOf(sel) < 0) sel = "all";
    chips([{ k:"all", t:"ぜんぶ" }].concat(fs.map(function(f){
      return { k:f, t:FOCUS[f] || f };
    })), sel, function(k){ S.pick.machigai = k; save(); draw(); }, "focus");

    var pool = all.filter(function(e){ return sel === "all" || e.focus === sel; });
    var deck = deckFor("e:" + sel, pool);
    var item = deck[0];
    var done = pool.filter(function(e){ return S.got["e:" + e.id]; }).length;
    var run = spanRun(item.wrong, item.span);

    $("main").innerHTML =
      '<div class="rule"><b>One sentence, one mistake</b>'
      + 'Tap the part you think is wrong. An examiner report named every '
      + 'mistake here, and the year sits under the answer.</div>'
      + '<div class="work"><div class="col">'
      + '<div class="card" id="item"></div></div></div>'
      + '<div class="foot"><span>' + done + ' of ' + pool.length
      + ' found so far in this focus</span><span class="sp"></span>'
      + '<button class="btn ghost sm" id="skip">Show me</button>'
      + '<button class="btn" id="next" disabled>Next</button></div>';

    var learnt = {};
    var html = run.parts.map(function(p, i){
      if (isSpace(p)) return p === " " ? " " : "&#12288;";
      /* Punctuation is never the mistake, so it is not something to tap.
         It still lights up when the answer is shown, because the phrase it
         belongs to is what the student is looking at. */
      return '<span class="' + (isPunct(p) ? "pn" : "ch") + '" data-i="' + i + '">'
        + rubify(p, learnt) + '</span>';
    }).join("");
    $("item").setAttribute("data-id", item.id);
    $("item").innerHTML =
      '<div class="cap">' + esc(FOCUS[item.focus] || item.focus) + '</div>'
      + '<div class="hunt" id="hunt">' + html + '</div>'
      + '<div id="fb"></div>';

    var answered = false;
    function reveal(found){
      answered = true;
      each($("hunt"), ".ch,.pn", function(sp){
        var i = +sp.getAttribute("data-i");
        if (i >= run.from && i <= run.to) sp.classList.add("hit");
      });
      var fix = fixRun(item.wrong, item.right), L = {};
      $("fb").innerHTML =
        '<div class="mark ' + (found ? "yes" : "no") + '"><b>'
        + (found ? "found it" : "that was the one") + '</b>'
        + '<div class="fixline">'
        + fix.parts.map(function(w, i){
            if (isSpace(w)) return "&#12288;";
            var r = rubify(w, L);
            return (i >= fix.from && i <= fix.to)
              ? '<span class="now">' + r + '</span>' : r;
          }).join("")
        + '</div></div>'
        + '<div class="mark"><b>why</b><div>' + ruby(item.why) + '</div></div>'
        + said(item.report);
      $("next").disabled = false;
      $("next").focus();
    }
    each($("hunt"), ".ch", function(sp){
      sp.onclick = function(){
        if (answered) return;
        var i = +sp.getAttribute("data-i");
        var found = i >= run.from && i <= run.to;
        if (!found) sp.classList.add("pick");
        scored("e:" + item.id, found);
        reveal(found);
      };
    });
    function advance(){
      deck.shift();
      if (!deck.length) decks["e:" + sel] = shuffle(pool);
      draw();
    }
    $("next").onclick = advance;
    $("skip").onclick = function(){
      if (!answered){ scored("e:" + item.id, false); reveal(false); }
      else advance();
    };
  }

  /* --------------------------------------------------------- ききとり */
  function questionBlock(t, prefix){
    return (t.questions || []).map(function(q){
      var jp = q.lang === "ja";
      return '<div class="qrow" data-q="' + esc(q.id) + '">'
        + '<div class="mk">' + q.marks + (q.marks === 1 ? " mark" : " marks") + '</div>'
        + '<div class="q' + (jp ? " jp" : "") + '">' + (jp ? ruby(q.q) : esc(q.q)) + '</div>'
        + box(prefix + ":" + q.id, jp ? "" : "en", 2)
        + '<div class="foot" style="margin-top:5px">'
        + '<button class="btn ghost sm" data-show="' + esc(q.id) + '">Show the answer</button>'
        + (q.line !== undefined
            ? '<button class="btn ghost sm" data-line="' + q.line + '">Where it is</button>'
            : "")
        + '</div><div id="' + prefix + '-' + esc(q.id) + '"></div></div>';
    }).join("");
  }
  function wireQuestions(scope, t, prefix, onLine){
    wireBoxes(scope);
    each(scope, "[data-show]", function(b){
      b.onclick = function(){
        var id = b.getAttribute("data-show");
        var q = t.questions.filter(function(x){ return x.id === id; })[0];
        var into = $(prefix + "-" + id);
        if (into.innerHTML){ into.innerHTML = ""; return; }
        into.innerHTML =
          '<div class="mark yes"><b>an answer that gets the marks</b><div'
          + (q.lang === "ja" ? ' class="jp" style="font-size:19px"' : "") + '>'
          + (q.lang === "ja" ? ruby(q.answer) : esc(q.answer)) + '</div></div>'
          + '<div class="mark"><b>how to get at it</b><div>' + esc(q.tip) + '</div></div>';
      };
    });
    each(scope, "[data-line]", function(b){
      b.onclick = function(){ onLine(+b.getAttribute("data-line")); };
    });
  }

  function drawKikitori(){
    var texts = TX.listening || [];
    var sel = S.pick.kikitori || texts[0].id;
    if (!texts.some(function(t){ return t.id === sel; })) sel = texts[0].id;
    chips(texts.map(function(t){
      return { k:t.id, t:t.title };
    }), sel, function(k){ stopSound(); S.pick.kikitori = k; save(); draw(); }, "text");

    var t = texts.filter(function(x){ return x.id === sel; })[0];
    var sec = (EX.sections || []).filter(function(x){ return x.id === t.section; })[0] || {};
    var who = {};
    (t.speakers || []).forEach(function(sp){ who[sp.tag] = sp; });
    var hidden = S.script[t.id] !== "open";
    document.body.classList.toggle("hidescript", hidden);

    var learnt = {};
    $("main").innerHTML =
      '<div class="rule"><b>' + esc(sec.name || "") + ' &middot; ' + esc(sec.what || "")
      + '</b>' + esc(t.setting) + '<br>' + esc(t.note) + '</div>'
      + '<div class="work"><div class="col">'
      + '<div class="card">'
      + '<div class="foot" style="margin:0 0 8px">'
      + '<button class="btn sm" id="playAll">Play the whole thing</button>'
      + '<button class="btn ghost sm" id="stop">Stop</button>'
      + '<span class="sp"></span>'
      + '<button class="btn ghost sm" id="script">'
      + (hidden ? "Show the transcript" : "Hide the transcript") + '</button></div>'
      + '<div id="turns">'
      + (t.lines || []).map(function(l, i){
          var sp = who[l.sp] || {};
          return '<div class="turn ' + esc(l.sp) + '" data-i="' + i + '">'
            + '<div class="who">' + ruby(sp.who || l.sp) + '</div>'
            + '<div class="pl"><button class="btn ghost sm" data-play="' + i + '">&#9654;</button></div>'
            + '<div class="ja">' + rubify(l.ja, learnt) + '</div></div>';
        }).join("")
      + '</div></div>'
      + '<div class="card"><h3>Questions <span class="cap">answer in '
      + esc(t.answer_in) + '</span></h3>'
      + questionBlock(t, "k:" + t.id) + '</div>'
      + '</div></div>';

    function lit(i){
      each($("turns"), ".turn", function(d){
        d.classList.toggle("now", +d.getAttribute("data-i") === i);
      });
    }
    var seq = 0;
    function playFrom(i, mine){
      if (mine !== seq) return;
      var lines = t.lines || [];
      if (i >= lines.length){ lit(-1); return; }
      lit(i);
      var sp = who[lines[i].sp] || {};
      var ok = say(sp.voice, lines[i].ja, function(){
        setTimeout(function(){ playFrom(i + 1, mine); }, 240);
      });
      if (!ok) playFrom(i + 1, mine);
      var el = $("turns").querySelector('.turn[data-i="' + i + '"]');
      if (el) el.scrollIntoView({ block:"nearest" });
    }
    $("playAll").onclick = function(){ playFrom(0, ++seq); };
    $("stop").onclick = function(){ seq++; stopSound(); lit(-1); };
    $("script").onclick = function(){
      S.script[t.id] = (S.script[t.id] === "open") ? "shut" : "open";
      save(); draw();
    };
    each($("turns"), "[data-play]", function(b){
      b.onclick = function(){
        var i = +b.getAttribute("data-play");
        seq++; stopSound(); lit(i);
        var sp = who[t.lines[i].sp] || {};
        say(sp.voice, t.lines[i].ja, function(){ lit(-1); });
      };
    });
    wireQuestions($("main"), t, "k:" + t.id, function(i){
      /* A student who has not heard it yet should hear the line, not read
         it, so this plays the line and only lifts the blur on that one. */
      seq++; stopSound(); lit(i);
      var el = $("turns").querySelector('.turn[data-i="' + i + '"]');
      if (el) el.scrollIntoView({ block:"center" });
      var sp = who[t.lines[i].sp] || {};
      say(sp.voice, t.lines[i].ja);
    });
  }

  /* ---------------------------------------------------------- どっかい */
  function drawDokkai(){
    document.body.classList.remove("hidescript");
    var texts = TX.reading || [];
    var sel = S.pick.dokkai || texts[0].id;
    if (!texts.some(function(t){ return t.id === sel; })) sel = texts[0].id;
    chips(texts.map(function(t){ return { k:t.id, t:t.title }; }),
      sel, function(k){ S.pick.dokkai = k; save(); draw(); }, "text");

    var t = texts.filter(function(x){ return x.id === sel; })[0];
    var sec = (EX.sections || []).filter(function(x){ return x.id === t.section; })[0] || {};
    var learnt = {};
    $("main").innerHTML =
      '<div class="rule"><b>' + esc(sec.name || "") + ' &middot; ' + esc(t.kind)
      + '</b>' + esc(t.note) + '</div>'
      + '<div class="work"><div class="col">'
      + '<div class="card" id="body">'
      + (t.body || []).map(function(p, i){
          return '<div class="para" data-i="' + i + '">' + rubify(p, learnt) + '</div>';
        }).join("")
      + '</div>'
      + '<div class="card"><h3>Questions <span class="cap">answer in '
      + esc(t.answer_in) + '</span></h3>'
      + questionBlock(t, "d:" + t.id) + '</div>'
      + '</div></div>';
    wireQuestions($("main"), t, "d:" + t.id, function(i){
      each($("body"), ".para", function(d){
        d.style.background = (+d.getAttribute("data-i") === i) ? "#fffbe9" : "";
      });
      var el = $("body").querySelector('.para[data-i="' + i + '"]');
      if (el) el.scrollIntoView({ block:"center" });
    });
  }

  /* --------------------------------------------------------- さくぶん */
  function drawSakubun(){
    document.body.classList.remove("hidescript");
    var tts = WR.text_types || [];
    var sel = S.pick.sakubun || tts[0].id;
    if (!tts.some(function(x){ return x.id === sel; })) sel = tts[0].id;
    chips(tts.map(function(x){ return { k:x.id, t:x.ja }; }),
      sel, function(k){ S.pick.sakubun = k; save(); draw(); }, "text type");

    var tt = tts.filter(function(x){ return x.id === sel; })[0];
    var plan = (WR.plans || []).filter(function(p){ return p.tt === sel; })[0];
    var model = (WR.models || []).filter(function(m){ return m.tt === sel; })[0];

    $("main").innerHTML =
      '<div class="rule"><b>Plan it, do not write it</b>'
      + 'Fill the slots below, then read the model and find which of your '
      + 'slots it answers. Four minutes of planning beats four minutes of '
      + 'extra sentences.</div>'
      + '<div class="work"><div class="col">'
      + '<div class="card"><h3><span class="jp">' + esc(tt.ja) + '</span> &middot; '
      + esc(tt.en) + ' <span class="cap">' + esc(tt.style) + '</span></h3>'
      + '<p style="font-size:14px;color:var(--muted);margin-bottom:7px">You are '
      + 'writing for ' + esc(tt.who) + '.</p>'
      + (tt.features || []).map(function(f){
          return '<div class="feat"><div class="f">' + ruby(f.f) + '</div>'
            + '<div class="w">' + esc(f.what) + '</div></div>';
        }).join("")
      + (tt.avoid || []).map(function(a){
          return '<div class="mark no"><b>not this</b><div class="jp" '
            + 'style="font-size:17px">' + ruby(a.f) + '</div>'
            + '<div style="font-size:13.5px;color:var(--muted);margin-top:3px">'
            + esc(a.why) + '</div></div>';
        }).join("")
      + '</div>'
      + (plan ? '<div class="card"><h3>A question of this type</h3>'
          + '<p style="margin-bottom:5px">' + esc(plan.prompt) + '</p>'
          + '<p class="jp" style="font-size:18px;line-height:1.95;margin-bottom:10px">'
          + ruby(plan.prompt_ja) + '</p>'
          + (plan.slots || []).map(function(s, i){
              return '<div class="slot"><div class="q">' + (i+1) + '. ' + esc(s.q) + '</div>'
                + '<div class="h">' + esc(s.hint) + '</div>'
                + box("p:" + plan.id + ":" + i, "en", 2) + '</div>';
            }).join("")
          + '</div>' : "")
      + (model ? '<div class="card" id="model"><h3>' + esc(model.title) + '</h3>'
          + '<p style="font-size:14px;color:var(--muted);margin-bottom:8px">'
          + esc(model.prompt) + ' Tap a line to see what it is doing.</p>'
          + (model.lines || []).map(function(l, i){
              return '<div class="mline" data-i="' + i + '">'
                + '<div class="ja">' + rubify(l.ja, {}) + '</div>'
                + '<div class="tg">' + esc(l.tag) + '</div></div>';
            }).join("")
          + '</div>'
        : '<div class="card"><p>No model for this text type yet. The '
          + (WR.models || []).map(function(m){
              var o = tts.filter(function(x){ return x.id === m.tt; })[0];
              return o ? o.en.toLowerCase() : m.tt;
            }).join(" and the ")
          + ' both have one, and every move in them works here too.</p></div>')
      + '</div></div>';

    wireBoxes($("main"));
    if (model) each($("model"), ".mline", function(d){
      d.onclick = function(){
        var i = +d.getAttribute("data-i");
        if (d.classList.contains("open")){
          d.classList.remove("open");
          var n = d.querySelector(".nt"); if (n) n.remove();
          return;
        }
        d.classList.add("open");
        var nt = document.createElement("div");
        nt.className = "nt";
        nt.textContent = model.lines[i].note;
        d.querySelector(".ja").appendChild(nt);
      };
    });
  }

  /* --------------------------------------------------------- さくせん */
  function drawSakusen(){
    document.body.classList.remove("hidescript");
    chips([], null, function(){});
    var total = (EX.sections || []).reduce(function(n, s){ return n + s.marks; }, 0);
    $("main").innerHTML =
      '<div class="rule"><b>The paper</b><ul>'
      + (EX.about || []).map(function(a){ return '<li>' + esc(a) + '</li>'; }).join("")
      + '</ul></div>'
      + '<div class="work"><div class="col">'
      + '<div class="card"><table class="sec"><tr><th>Section</th><th>What it asks</th>'
      + '<th class="m">Marks</th></tr>'
      + (EX.sections || []).map(function(s){
          return '<tr><td><b>' + esc(s.name) + '</b><br><span style="color:var(--muted)">'
            + esc(s.detail) + '</span></td><td>' + esc(s.what)
            + '<ul style="margin:4px 0 0 16px;color:var(--muted);font-size:13px">'
            + (s.criteria || []).map(function(c){ return '<li>' + esc(c) + '</li>'; }).join("")
            + '</ul></td><td class="m">' + s.marks + '</td></tr>';
        }).join("")
      + '<tr><td colspan="2"></td><td class="m">' + total + '</td></tr></table>'
      + '<p style="font-size:12.5px;color:var(--muted);margin-top:7px">The criteria '
      + 'are quoted from VCAA\u2019s own assessment specifications, word for word, '
      + 'because that is what the assessors mark against.</p></div>'
      + (EX.advice || []).map(function(a){
          return '<div class="card"><h3>' + esc(a.head) + '</h3>'
            + '<p>' + esc(a.say) + '</p>'
            + (a.quotes || []).map(function(q){
                return '<div class="said"><span class="yr">' + esc(q.year)
                  + ' report</span><em>' + esc(q.text) + '</em></div>';
              }).join("")
            + '</div>';
        }).join("")
      + '<div class="card"><h3>Where to go next</h3>'
      + (EX.links || []).map(function(l){
          return '<p style="margin-bottom:7px"><a class="out" href="' + esc(l.url)
            + '" target="_blank" rel="noopener">' + esc(l.name) + '</a><br>'
            + '<span style="font-size:13.5px;color:var(--muted)">' + esc(l.what)
            + '</span></p>';
        }).join("")
      + '</div></div></div>';
  }

  /* ---------------------------------------------------------------- draw */
  var DRAW = { bunpou:drawBunpou, machigai:drawMachigai, kikitori:drawKikitori,
               dokkai:drawDokkai, sakubun:drawSakubun, sakusen:drawSakusen,
               kiroku:drawKiroku };

  /* ================= きろく, your practice exams =================
     Andrew: "a tool into which students can enter practice exam data and
     receive curated feedback ... Data entry should be question by question
     for granularity ... As we don't know exactly how VCAA assessors will
     grade a paper, the entry format should allow a range of marks ... We
     can work with a 'conservative' score and a 'best case scenario' score.
     But I think the main feedback should include an analysis of what the
     question was asking the student to do and how they could score highly."

     Two marks per question, then. A low and a high, and the gap between
     them is not noise: a question a student cannot score themselves is a
     question they half answered, which is a different problem from one
     they got wrong, and the reading says so.

     What it gives back comes in three layers:
       the question   what it asked you to do, and what a good answer does
       the pattern    which kinds of mark keep going missing
       the paper      receptive against productive, which is where the
                      hours should go

     The first layer needs the real papers and their examiner's reports.
     Until those are in the repo, a question carries a skill the student
     picks and the advice comes off the skill. Nothing here paraphrases an
     examiner's report, because there is no report in the repo to
     paraphrase.

     Nothing is sent anywhere. The marks sit in this browser, the same as
     everything else this app remembers, and Reset clears them. */
  var PAP = window.HIKKI_PAPERS || { errors: [], skills: [], papers: [] };
  var SEC = (window.HIKKI_EXAM || {}).sections || [];
  /* Which sections are a test of understanding. Section 1 is listening
     in both its parts and Section 2 Part A is reading plus listening;
     2B and 3 are what the student produces. Part B answers in Japanese
     and so is marked on language too, but what it tests first is
     whether the text was understood, and grouping it with the writing
     sections hides exactly the pattern this tool exists to show.
     Andrew's own reading of the sample paper: "Priority should be
     listening/comprehension, precise detail extraction, and turning
     understood information into accurate answers." */
  var RECEPTIVE = { s1a: 1, s1b: 1, s2a: 1 };

  var SHORT = { s1a: "S1A", s1b: "S1B", s2a: "S2A", s2b: "S2B", s3: "S3" };
  function secOf(id){
    var out = null;
    SEC.forEach(function(x){ if (x.id === id) out = x; });
    return out;
  }
  function blankRun(){
    return { when: new Date().toISOString().slice(0, 10), paper: "", pid: "", rows: [] };
  }
  function paperOf(id){
    var out = null;
    (PAP.papers || []).forEach(function(x){ if (String(x.year) === String(id)) out = x; });
    return out;
  }
  function qOf(run, sec, q){
    var pp = paperOf(run.pid);
    if (!pp) return null;
    var out = null;
    pp.questions.forEach(function(x){ if (x.sec === sec && x.q === q) out = x; });
    return out;
  }
  /* Laying a real paper out: every question except the Section 3 four,
     which are alternatives. The student adds the one they answered. */
  function layOut(run, pp){
    run.rows = [];
    pp.questions.forEach(function(x){
      if ((pp.choice || []).indexOf(x.q) >= 0) return;
      run.rows.push({ sec: x.sec, q: x.q, max: String(x.marks), low: "", high: "",
                      skill: x.skill, errs: [] });
    });
  }
  function curRun(){
    if (S.run === null || !S.runs[S.run]){
      S.runs.push(blankRun());
      S.run = S.runs.length - 1;
    }
    return S.runs[S.run];
  }
  function runTotals(run){
    var t = { low: 0, high: 0, max: 0, bySec: {} };
    SEC.forEach(function(x){ t.bySec[x.id] = { low: 0, high: 0, max: 0, n: 0 }; });
    (run.rows || []).forEach(function(r){
      var b = t.bySec[r.sec];
      if (!b) return;
      b.low += (+r.low || 0); b.high += (+r.high || 0); b.max += (+r.max || 0); b.n++;
      t.low += (+r.low || 0); t.high += (+r.high || 0); t.max += (+r.max || 0);
    });
    return t;
  }
  function pc(n, d){ return d ? Math.round((n / d) * 100) : 0; }

  function drawKiroku(){
    /* this rung has no focus chips, and the row is shared, so the
       previous rung's chips would otherwise stay on screen */
    chips([], null, null, "");
    var run = curRun(), T = runTotals(run);
    var papers = PAP.papers || [];
    $("main").innerHTML =
        '<div class="rule"><b>Your practice exams</b>'
      + 'Pick a paper, or add your own questions one at a time. '
      /* not <b>: in this box a b is the heading and is set on its own
         line, which cuts the sentence into pieces */
      + 'For each question enter <i>Worth</i>, the marks it was out of; '
      + '<i>Sure of</i>, the mark you are confident a marker would give you; '
      + 'and <i>At best</i>, the most you think it could get. '
      + 'Put the same number in both if you already know the mark. '
      + 'The gap between them is useful, so do not guess it away. '
      + 'Everything stays in this browser and is never sent anywhere.</div>'
      /* Andrew: "sometimes scrolling becomes disabled and you can't
         click into fields that are half appearing from the bottom of
         the screen." The body is overflow:hidden and the scrolling
         region in this app is .work; this rung was writing straight
         into main and so had no scroller at all. Everything below the
         how-to now sits in one. */
      + '<div class="work kwork">'
      + '<div class="krow khead">'
      + '<label>Paper <select id="kpick">'
      + '<option value="">School practice exam</option>'
      + (PAP.papers || []).map(function(x){
          return '<option value="' + esc(x.year) + '"'
            + (String(run.pid) === String(x.year) ? " selected" : "") + '>'
            + esc(x.name) + '</option>';
        }).join("")
      + '</select></label>'
      + (run.pid ? '' : '<label>Name <input id="kpaper" value="' + esc(run.paper || "")
          + '" placeholder="School trial" autocomplete="off"></label>')
      + '<label>Date <input id="kwhen" type="date" value="' + esc(run.when || "") + '"></label>'
      + '<span class="sp"></span>'
      + '<button class="btn ghost sm" id="kruns">' + S.runs.length + ' saved</button>'
      + '<button class="btn ghost sm" id="knew">Start another</button>'
      + '</div>'
      + '<div id="ksecs"></div>'
      + '<div id="kread"></div>'
      + '</div>';

    if ($("kpaper")) $("kpaper").oninput = function(){ run.paper = this.value; save(); };
    $("kpick").onchange = function(){
      var id = this.value;
      var used = (run.rows || []).some(function(r){ return r.low !== "" || r.high !== ""; });
      if (used && !confirm("Change the paper and clear the marks you have entered?")){
        this.value = run.pid || ""; return;
      }
      run.pid = id;
      var pp = paperOf(id);
      if (pp){ run.paper = pp.name; layOut(run, pp); }
      else { run.paper = ""; run.rows = []; }
      save(); drawKiroku();
    };
    $("kwhen").oninput  = function(){ run.when  = this.value; save(); };
    $("knew").onclick = function(){
      S.runs.push(blankRun()); S.run = S.runs.length - 1; save(); draw();
    };
    $("kruns").onclick = function(){ listRuns(); };

    $("ksecs").innerHTML = SEC.map(function(sc){
      var b = T.bySec[sc.id] || { low:0, high:0, max:0, n:0 };
      return '<section class="ksec" data-sec="' + esc(sc.id) + '">'
        + '<h3>' + esc(sc.name) + ' <small>' + esc(sc.what) + '</small>'
        + '<span class="ktot">' + b.low + (b.high !== b.low ? "\u2013" + b.high : "")
        + ' of ' + sc.marks + '</span></h3>'
        + '<div class="qlist" data-list="' + esc(sc.id) + '"></div>'
        + addFor(sc)
        + '</section>';
    }).join("");

    function addFor(sc){
      var pp = paperOf(run.pid);
      var choice = pp && sc.id === "s3" ? (pp.choice || []) : null;
      if (pp && !choice) return '';     /* a real paper's questions are fixed */
      if (!choice || !choice.length)
        return '<button class="btn ghost sm" data-add="' + esc(sc.id) + '">Add a question</button>';
      var taken = {};
      (run.rows || []).forEach(function(r){ if (r.sec === "s3") taken[r.q] = 1; });
      /* one of four, so the four are offered and the chosen one sticks */
      return '<span class="hint">Which did you answer? </span>'
        + choice.map(function(q){
            return '<button class="btn ghost sm" data-pick3="' + esc(q) + '"'
              + (taken[q] ? " disabled" : "") + '>Q' + esc(q) + '</button>';
          }).join("");
    }
    SEC.forEach(function(sc){ paintRows(sc.id); });
    each($("ksecs"), "[data-pick3]", function(b){
      b.onclick = function(){
        var pp = paperOf(run.pid), q = b.dataset.pick3, src = null;
        (pp.questions || []).forEach(function(x){ if (x.q === q) src = x; });
        if (!src) return;
        run.rows = (run.rows || []).filter(function(r){ return r.sec !== "s3"; });
        run.rows.push({ sec: "s3", q: src.q, max: String(src.marks), low: "", high: "",
                        skill: src.skill, errs: [] });
        save(); drawKiroku();
      };
    });
    each($("ksecs"), "[data-add]", function(b){
      b.onclick = function(){
        var sec = b.dataset.add;
        var n = (run.rows || []).filter(function(r){ return r.sec === sec; }).length + 1;
        run.rows.push({ sec: sec, q: String(n), max: "", low: "", high: "",
                        skill: "", errs: [] });
        save(); drawKiroku();
        /* and land in it, rather than leaving a half-visible row at
           the bottom of the screen for somebody to go hunting for */
        var fresh = $("main").querySelectorAll('[data-list="' + sec + '"] .qrow');
        var last = fresh[fresh.length - 1];
        if (last){
          last.scrollIntoView({ block: "center", behavior: "smooth" });
          var first = last.querySelector(".qn") || last.querySelector(".qm");
          if (first) first.focus();
        }
      };
    });
    reading();

    /* the error chips, put in or taken out without touching the rest
       of the row */
    function chipsFor(el, r){
      var have = el.querySelector(".errs");
      if (!lostOn(r)){ if (have) have.remove(); return; }
      if (have) return;
      var box = document.createElement("div");
      box.className = "errs";
      box.innerHTML = (PAP.errors || []).map(function(e){
        return '<button class="echip' + (r.errs.indexOf(e.id) >= 0 ? " on" : "")
          + '" data-e="' + esc(e.id) + '" title="' + esc(e.note) + '">'
          + esc(e.en) + '</button>';
      }).join("");
      el.appendChild(box);
      wireChips(el, r);
    }
    function wireChips(el, r){
      each(el, "[data-e]", function(b){
        b.onclick = function(){
          var id = b.dataset.e, at = r.errs.indexOf(id);
          if (at >= 0) r.errs.splice(at, 1); else r.errs.push(id);
          b.classList.toggle("on", at < 0);
          save(); reading();
        };
      });
    }
    function lostOn(r){
      if ((r.errs || []).length) return true;
      if (r.max === "" || r.low === "") return false;
      return +r.low < +r.max;
    }
    function paintRows(sec){
      var list = $("main").querySelector('[data-list="' + sec + '"]');
      var rows = [];
      (run.rows || []).forEach(function(r, i){ if (r.sec === sec) rows.push([r, i]); });
      if (!rows.length){
        list.innerHTML = '<p class="hint">No questions yet.</p>';
        return;
      }
      var skills = (PAP.skills || []).filter(function(k){
        return k.sections.indexOf(sec) >= 0;
      });
      list.innerHTML = rows.map(function(pair){
        var r = pair[0], i = pair[1], src = qOf(run, r.sec, r.q);
        return '<div class="qrow' + (src ? " fixed" : "") + '" data-i="' + i + '">'
          /* Andrew: "I don't know what the third and fourth boxes are
             asking for." Each box now says what it wants above
             itself, rather than relying on the words between them. */
          + (src
             ? '<span class="qfix">Q' + esc(r.q) + '</span>'
             : '<label class="fld"><span>Question</span>'
               + '<input class="qn" value="' + esc(r.q) + '" aria-label="Question number"></label>')
          + '<label class="fld"><span>Worth</span>'
          + '<input class="qm" inputmode="numeric" value="' + esc(r.max)
          + '" aria-label="Marks available for this question"></label>'
          + '<label class="fld"><span>Sure of</span>'
          + '<input class="ql" inputmode="numeric" value="' + esc(r.low)
          + '" aria-label="The mark you are sure you would get"></label>'
          + '<label class="fld"><span>At best</span>'
          + '<input class="qh" inputmode="numeric" value="' + esc(r.high)
          + '" aria-label="The best mark this answer could get"></label>'
          + (src ? ''
             : '<select class="qs" aria-label="What the question asked you to do">'
               + '<option value="">What did it ask for?</option>'
               + skills.map(function(k){
                   return '<option value="' + esc(k.id) + '"'
                     + (r.skill === k.id ? " selected" : "") + '>' + esc(k.en) + '</option>';
                 }).join("")
               + '</select>')
          + (src ? '' : '<button class="x" aria-label="Remove this question">\u00d7</button>')
          + (src ? '<p class="qasks">' + esc(src.asks) + '</p>' : '')
          /* Six chips on every row is ninety chips on a full paper, and
             they only mean anything where a mark went missing. They
             appear when one does, and stay while any is ticked. */
          + (lostOn(r)
             ? '<div class="errs">' + (PAP.errors || []).map(function(e){
                 return '<button class="echip' + (r.errs.indexOf(e.id) >= 0 ? " on" : "")
                   + '" data-e="' + esc(e.id) + '" title="' + esc(e.note) + '">'
                   + esc(e.en) + '</button>';
               }).join("") + '</div>'
             : '')
          + '</div>';
      }).join("");
      each(list, ".qrow", function(el){
        var r = run.rows[+el.dataset.i];
        function bind(sel, key, num){
          var inp = el.querySelector(sel);
          inp.oninput = function(){
            var v = this.value;
            if (num){
              v = v.replace(/[^0-9.]/g, "");
              this.value = v;
            }
            var had = lostOn(r);
            r[key] = v;
            /* the high mark is never below the low one: a student who
               types the sure mark and moves on has said both */
            if (key === "low" && (r.high === "" || +r.high < +v)) {
              r.high = v;
              el.querySelector(".qh").value = v;
            }
            save(); totals(); reading();
            /* ---- do not rebuild the row under the cursor ----
               Andrew: "when you enter data in the Sure of field, the
               form ... skips to comment selection or add question."
               It did. Crossing below full marks flipped the chips on,
               which repainted the whole section, which threw away the
               input the student was typing in and left focus on the
               body. The chips are added and removed in place now and
               nothing else moves. */
            if (lostOn(r) !== had) chipsFor(el, r);
          };
        }
        if (el.querySelector(".qn")) bind(".qn", "q", false);
        bind(".qm", "max", true);
        bind(".ql", "low", true);
        bind(".qh", "high", true);
        /* At best is filled in from Sure of, so tabbing into it has to
           let the student type straight over the top rather than
           having to clear it first */
        each(el, "input[inputmode=numeric]", function(inp){
          inp.onfocus = function(){ try { inp.select(); } catch (e){} };
        });
        if (el.querySelector(".qs"))
          el.querySelector(".qs").onchange = function(){
            r.skill = this.value; save(); reading();
          };
        if (el.querySelector(".x")) el.querySelector(".x").onclick = function(){
          run.rows.splice(+el.dataset.i, 1); save(); drawKiroku();
        };
        wireChips(el, r);
      });
    }
    function totals(){
      var t = runTotals(run);
      each($("ksecs"), ".ksec", function(el){
        var sc = secOf(el.dataset.sec), b = t.bySec[el.dataset.sec];
        el.querySelector(".ktot").textContent =
          b.low + (b.high !== b.low ? "\u2013" + b.high : "") + " of " + sc.marks;
      });
    }
    function reading(){
      var t = runTotals(run);
      var any = (run.rows || []).some(function(r){ return r.low !== "" || r.high !== ""; });
      if (!any){
        $("kread").innerHTML = '<p class="hint">Add a question and a mark, '
          + 'and the reading appears here.</p>';
        return;
      }
      /* ---- the paper ---- */
      var secs = SEC.map(function(sc){
        var b = t.bySec[sc.id];
        return { sc: sc, b: b, mid: b.max ? (b.low + b.high) / 2 / sc.marks : null };
      }).filter(function(x){ return x.b.n; });
      var weakest = secs.slice().sort(function(a, b){ return a.mid - b.mid; })[0];
      var rec = secs.filter(function(x){ return RECEPTIVE[x.sc.id]; });
      var pro = secs.filter(function(x){ return !RECEPTIVE[x.sc.id]; });
      function avg(list){
        if (!list.length) return null;
        var n = 0; list.forEach(function(x){ n += x.mid; });
        return n / list.length;
      }
      var ra = avg(rec), pa = avg(pro);

      /* ---- the pattern ---- */
      var tally = {};
      (run.rows || []).forEach(function(r){
        (r.errs || []).forEach(function(e){ tally[e] = (tally[e] || 0) + 1; });
      });
      var top = Object.keys(tally).sort(function(a, b){ return tally[b] - tally[a]; });

      /* ---- the questions ---- */
      /* Advise on anything that did not certainly score full marks,
         which means reading the low mark and not the high one. A
         question marked 0 to 2 out of 2 is not safe: it is a question
         the student could not score, and the advice for it is exactly
         what they need. It shows up under Borderline as well, because
         it is both things at once. */
      var lost = (run.rows || []).filter(function(r){
        return r.max !== "" && r.low !== "" && r.skill && (+r.low < +r.max);
      });
      var bySkill = {};
      lost.forEach(function(r){
        var k = r.skill;
        bySkill[k] = bySkill[k] || { n: 0, marks: 0, qs: [], sec: {} };
        bySkill[k].n++;
        bySkill[k].marks += (+r.max - (+r.low || 0));
        bySkill[k].qs.push(r.q);
        bySkill[k].sec[r.q] = r.sec;
      });
      var skillOrder = Object.keys(bySkill).sort(function(a, b){
        return bySkill[b].marks - bySkill[a].marks;
      });
      var wide = (run.rows || []).filter(function(r){
        return r.high !== "" && r.low !== "" && (+r.high - +r.low) >= 2;
      });

      $("kread").innerHTML =
          '<h3 class="kh">The paper</h3>'
        + '<p class="ksum"><b>' + t.low + (t.high !== t.low ? "\u2013" + t.high : "")
        + ' of ' + t.max + '</b>'
        + (t.max ? ' \u00b7 ' + pc(t.low, t.max) + '\u2013' + pc(t.high, t.max) + '%' : '')
        + '</p>'
        + '<div class="kbars">' + secs.map(function(x){
            return '<div class="kbar"><span class="kbn">' + esc(SHORT[x.sc.id] || x.sc.id)
              + '</span><span class="ktrack"><i style="width:'
              + Math.round(x.mid * 100) + '%"></i></span><span class="kbv">'
              + Math.round(x.mid * 100) + '%</span></div>';
          }).join("") + '</div>'
        + (ra !== null && pa !== null
            ? '<p class="knote">' + (Math.abs(ra - pa) < 0.1
                ? 'Understanding and writing are running level.'
                : (ra < pa
                   ? 'Understanding the texts is behind producing them. Work on Section 1 and Section 2 Part A before you work on your writing.'
                   : 'Producing Japanese is behind understanding it. Work on Section 2 Part B and Section 3.')) + '</p>'
            : '')
        + (weakest ? '<p class="knote">Weakest section: <b>' + esc(weakest.sc.name)
            + '</b> at ' + Math.round(weakest.mid * 100) + '%.</p>' : '')
        + (wide.length
            ? '<h3 class="kh">Borderline</h3><p class="knote">'
              + wide.length + ' question' + (wide.length === 1 ? "" : "s")
              + ' you could not score yourself (' + wide.map(function(r){ return esc(r.q); }).join(", ")
              + '). A mark you cannot call is usually a half answer: the idea arrived '
              + 'and something the marker needed did not. Go back to those first, '
              + 'and work out what was missing rather than whether it was right.</p>'
            : '')
        + (top.length
            ? '<h3 class="kh">What keeps happening</h3><ul class="klist">'
              + top.slice(0, 3).map(function(id){
                  var e = null;
                  (PAP.errors || []).forEach(function(x){ if (x.id === id) e = x; });
                  return e ? '<li><b>' + esc(e.en) + '</b> \u00d7 ' + tally[id]
                    + '<span>' + esc(e.note) + '</span></li>' : '';
                }).join("") + '</ul>'
            : '')
        + (skillOrder.length
            ? '<h3 class="kh">What those questions were asking for</h3>'
              + skillOrder.slice(0, 4).map(function(id){
                  var k = null;
                  (PAP.skills || []).forEach(function(x){ if (x.id === id) k = x; });
                  if (!k) return "";
                  var b = bySkill[id];
                  /* A question off a real paper has advice of its own,
                     written against that question and quoting its
                     examination report. Where there is none, the skill
                     advice stands in. */
                  var own = b.qs.map(function(qq){ return qOf(run, b.sec[qq], qq); })
                             .filter(Boolean);
                  return '<div class="kskill"><b>' + esc(k.en) + '</b>'
                    + '<span class="kq">Q' + b.qs.join(", Q") + ' \u00b7 '
                    + b.marks + ' mark' + (b.marks === 1 ? "" : "s") + ' lost</span>'
                    + (own.length
                       /* Every question a mark was lost on, because that
                          is the feedback. The quotation folds away so the
                          page stays something a student can scan: seven
                          questions times three paragraphs is a wall, and a
                          wall does not get read. */
                       ? own.map(function(o){
                           return '<div class="kq1"><p class="kasks"><b>Q' + esc(o.q)
                             + '</b> ' + esc(o.asks) + '</p>'
                             + '<p class="khigh">' + esc(o.high) + '</p>'
                             + '<details class="krep"><summary>What the assessors said</summary>'
                             + '<p class="kquote">\u201c' + esc(o.report) + '\u201d'
                             + '<span class="ksrc">VCAA examination report</span></p>'
                             + '</details></div>';
                         }).join("")
                       : '<p class="kasks">' + esc(k.asks) + '</p>'
                         + '<p class="khigh">' + esc(k.high) + '</p>')
                    + '<p class="kcrit">Marked on: ' + esc(k.criterion) + '</p></div>';
                }).join("")
            : '<p class="hint">Tag a question with what it asked for, and the '
              + 'advice for that kind of question appears here.</p>');
    }
    function listRuns(){
      $("kread").innerHTML = '<h3 class="kh">Saved papers</h3>'
        + '<div class="kruns">' + S.runs.map(function(r, i){
            var t = runTotals(r);
            return '<button class="krun' + (i === S.run ? " on" : "") + '" data-r="' + i + '">'
              + '<b>' + esc(r.paper || "Untitled") + '</b>'
              + '<span>' + esc(r.when || "") + ' \u00b7 ' + t.low
              + (t.high !== t.low ? "\u2013" + t.high : "") + ' of ' + t.max + '</span>'
              + '</button>';
          }).join("") + '</div>';
      each($("kread"), "[data-r]", function(b){
        b.onclick = function(){ S.run = +b.dataset.r; save(); drawKiroku(); };
      });
    }
    /* a seam for the browser check */
    window.HIKKI_KIROKU = {
      run:    function(){ return curRun(); },
      totals: function(){ return runTotals(curRun()); },
      reading: function(){ return $("kread").innerText; }
    };
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
    var id = S.step;
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
    if (!DRAW[S.step]) S.step = "bunpou";
    $("steps").innerHTML = STEPS.map(function(st){
      return '<button data-s="' + st.id + '"'
        + (st.id === S.step ? ' aria-current="true"' : '') + '>'
        + '<b>' + esc(st.ja) + '</b><i>' + esc(st.en) + '</i></button>';
    }).join("");
    each($("steps"), "button", function(b){
      b.onclick = function(){
        stopSound();
        S.step = b.getAttribute("data-s"); save(); draw();
      };
    });
    if (S.step !== "kikitori") document.body.classList.remove("hidescript");
    DRAW[S.step]();
    paintToggles();
  }

  paintToggles();
  draw();
})();
