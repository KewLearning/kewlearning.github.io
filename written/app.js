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
            got:{}, wrote:{}, script:{}, howto:{} };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){}
  var saveT = null;
  function save(){
    clearTimeout(saveT);
    saveT = setTimeout(saveNow, 250);
  }
  function saveNow(){
    clearTimeout(saveT);
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
          got:{}, wrote:{}, script:{}, howto:{} };
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
    { id:"sakusen", ja:"さくせん",  en:"strategy" }
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
               dokkai:drawDokkai, sakubun:drawSakubun, sakusen:drawSakusen };

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
