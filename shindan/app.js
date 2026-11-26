/* app.js — しんだん, the Year 10 into Year 11 self-check.

   Andrew's paper Head Start booklet, on a screen. A Year 10 about to start
   Unit 1 works through it, finds out where they are, and gets one page
   back that says what to do next. The paper version gets filled in once
   and lost; this one marks itself and can be done again in March.

   SIX SECTIONS ARE PLANNED. Two are here:

     ぶんぽう   the booklet's Grammar summary, all 65 patterns in his seven
                groups, with his own two ticks: Understand and Use. The gap
                between them is the whole point — a student who understands
                sixty patterns and uses twenty does not need more grammar
                taught, they need to write.
     けっか     the report. It ranks the sections rather than naming a
                worst one, keeps every run beside the last, and copies as
                plain text.

   The kanji section is built and lives in VCE漢字 as its own しんだん rung,
   because the 200 kanji, their readings and 559 example words are already
   there and a second copy would drift from the first. The report links to
   it rather than repeating it.

   Particles, kana, the map and the goals page are still to come.

   NOTHING IS MARKED AND NOTHING IS SCORED. This is a student telling you
   what they know; there is no ledger in this app and no sound. Everything
   stays in this browser.                                                */
"use strict";
(function(){
  var G = window.SHINDAN_GRAMMAR;
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

  /* ---- every pattern, flat, for counting ---- */
  var ALL = [];
  G.groups.forEach(function(g){
    g.items.forEach(function(it){ ALL.push({ g: g, it: it }); });
  });

  /* ================= what this browser remembers =================
     Andrew, 2026-11-24: "sit the March run beside the one now (do not
     overwrite)". So runs is a list from the first commit. History cannot
     be added to a store that only ever kept the latest: by the time
     anyone wants it, the early runs are gone.                          */
  var KEY = "shindan-v1";
  var S = { en:true, now:{ und:{}, use:{} }, runs:[] };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) S = Object.assign(S, JSON.parse(raw) || {});
  } catch (e){}
  if (!S.now) S.now = { und:{}, use:{} };
  if (!S.now.und) S.now.und = {};
  if (!S.now.use) S.now.use = {};
  if (!S.runs) S.runs = [];
  var saveT = null;
  function write(){
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e){}
  }
  function save(){ clearTimeout(saveT); saveT = setTimeout(write, 200); }
  window.addEventListener("pagehide", write);
  document.addEventListener("visibilitychange", function(){
    if (document.visibilityState === "hidden") write();
  });

  function today(){
    var d = new Date();
    function two(n){ return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate());
  }
  function countOf(map, list){
    var n = 0;
    (list || ALL).forEach(function(x){ if (map[x.it.id]) n++; });
    return n;
  }

  /* ================= the sections ================= */
  var STEPS = [
    { id:"bunpou", ja:"ぶんぽう", en:"Grammar" },
    { id:"kekka",  ja:"けっか",   en:"Your result" }
  ];
  var RULES = {
    bunpou: "Go through the patterns and tick what you can do. Understand "
          + "means you know what it means when you read it. Use means you "
          + "can write it yourself without looking it up. Tick a whole "
          + "group at once with the buttons, then untick what you cannot "
          + "do. Nothing is marked and nothing is sent anywhere.",
    kekka: "Your result, with every run you have done. Copy it into a "
         + "document or an email if you want it later: this page lives in "
         + "this browser and clearing the browser loses it."
  };
  var at = TABS.start(KEY, STEPS.map(function(s){ return s.id; }));
  var DRAW = {};

  function paintSteps(){
    $("steps").innerHTML = STEPS.map(function(s, i){
      return '<button data-i="' + i + '"' + (i === at ? ' aria-current="step"' : '')
        + '><b>' + esc(s.ja) + '</b><i>' + esc(s.en) + '</i></button>';
    }).join("");
    each($("steps"), "[data-i]", function(b){
      b.onclick = function(){ at = +b.dataset.i; draw(); };
    });
  }
  function ruleFor(id){
    return '<div class="rule"><b>' + esc(STEPS[at].en) + '</b>'
      + esc(RULES[id] || "") + '</div>';
  }
  function foot(html){
    return '<div class="foot"><span class="hint" id="sc"></span>'
      + '<span class="sp"></span>' + (html || "") + '</div>';
  }
  function draw(){
    document.body.dataset.rung = STEPS[at].id;
    paintSteps();
    TABS.keep(KEY, STEPS[at].id);
    TABS.inview($("steps"));
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
  }

  /* ================= 1. ぶんぽう ================= */
  DRAW.bunpou = function(){
    $("main").innerHTML = ruleFor("bunpou")
      + '<div class="work">'
      + '<div class="allrow">'
      + '<b>Quick way in</b>'
      + '<button class="btn sm" id="allund">Understand all ' + ALL.length + '</button>'
      + '<button class="btn sm" id="alluse">Use all ' + ALL.length + '</button>'
      + '<button class="btn ghost sm" id="allnone">Clear all</button>'
      + '<span>Tick the lot, then untick what you cannot do. Or work down '
      + 'the groups one at a time.</span>'
      + '</div>'
      + '<div id="groups"></div></div>'
      + foot('<button class="btn sm" id="gdone">See my result</button>');

    $("groups").innerHTML = G.groups.map(function(g, gi){
      return '<section class="grp"><h2>' + esc(g.en)
        + '<i>' + g.items.length + '</i>'
        + '<button class="grpall" data-g="' + gi + '" data-w="und"></button>'
        + '<button class="grpall" data-g="' + gi + '" data-w="use"></button>'
        + '</h2>'
        + '<div class="rows">' + g.items.map(function(it){
            return row(it);
          }).join("") + '</div></section>';
    }).join("");

    function row(it){
      var eg = it.egs[0] || { ja:"", en:"" };
      return '<div class="prow" data-id="' + esc(it.id) + '">'
        + '<div class="pat"><b>' + esc(it.p) + '</b>'
          + (it.mean ? '<span>' + esc(it.mean) + '</span>' : "")
          + (it.note ? '<em>' + esc(it.note) + '</em>' : "")
        + '</div>'
        + '<div class="eg">' + it.egs.map(function(e){
            return '<p lang="ja">' + esc(e.ja) + '</p><p class="een">'
              + esc(e.en) + '</p>';
          }).join("") + '</div>'
        + '<div class="pticks">'
        + '<button class="ptick" data-w="und" data-k="' + esc(it.id) + '">'
          + '<b></b>Understand</button>'
        + '<button class="ptick" data-w="use" data-k="' + esc(it.id) + '">'
          + '<b></b>Use</button>'
        + '</div></div>';
    }

    each($("groups"), "[data-k]", function(b){
      b.onclick = function(){
        var map = S.now[b.dataset.w], k = b.dataset.k;
        if (map[k]) delete map[k]; else map[k] = 1;
        /* Use without Understand is not a thing a student means. Ticking
           Use ticks Understand with it, and unticking Understand takes Use
           away, so the pair can never say "I can write it but I cannot
           read it". */
        if (b.dataset.w === "use" && map[k]) S.now.und[k] = 1;
        if (b.dataset.w === "und" && !map[k]) delete S.now.use[k];
        save(); paint();
      };
    });
    each($("groups"), "[data-g]", function(b){
      b.onclick = function(){
        var g = G.groups[+b.dataset.g], w = b.dataset.w;
        var all = g.items.every(function(it){ return S.now[w][it.id]; });
        g.items.forEach(function(it){
          if (all){
            delete S.now[w][it.id];
            if (w === "und") delete S.now.use[it.id];
          } else {
            S.now[w][it.id] = 1;
            if (w === "use") S.now.und[it.id] = 1;
          }
        });
        save(); paint();
      };
    });
    $("allund").onclick = function(){
      ALL.forEach(function(x){ S.now.und[x.it.id] = 1; });
      save(); paint();
    };
    $("alluse").onclick = function(){
      ALL.forEach(function(x){ S.now.und[x.it.id] = 1; S.now.use[x.it.id] = 1; });
      save(); paint();
    };
    $("allnone").onclick = function(){
      S.now = { und:{}, use:{} }; save(); paint();
    };
    $("gdone").onclick = function(){ bank(); at = 1; draw(); };
    paint();

    function paint(){
      each($("groups"), ".prow", function(r){
        var k = r.dataset.id;
        each(r, "[data-w]", function(b){
          var on = !!S.now[b.dataset.w][k];
          b.classList.toggle("on", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });
      each($("groups"), "[data-g]", function(b){
        var g = G.groups[+b.dataset.g], w = b.dataset.w;
        var n = g.items.filter(function(it){ return S.now[w][it.id]; }).length;
        b.textContent = (n === g.items.length ? "Untick " : "All ")
          + (w === "und" ? "understand" : "use");
        b.setAttribute("aria-pressed", n === g.items.length ? "true" : "false");
      });
      $("sc").innerHTML = '<b>' + countOf(S.now.und) + '</b> understand &middot; <b>'
        + countOf(S.now.use) + '</b> use &middot; of ' + ALL.length;
    }
  };

  /* the run goes in as a dated entry of its own; nothing is overwritten */
  function bank(){
    var per = {};
    G.groups.forEach(function(g){
      var list = ALL.filter(function(x){ return x.g === g; });
      per[g.id] = { n: g.items.length,
                    und: countOf(S.now.und, list),
                    use: countOf(S.now.use, list) };
    });
    S.runs.push({ at: today(), n: ALL.length,
                  und: countOf(S.now.und), use: countOf(S.now.use),
                  per: per,
                  gaps: ALL.filter(function(x){
                    return S.now.und[x.it.id] && !S.now.use[x.it.id];
                  }).map(function(x){ return x.it.id; }) });
    save();
  }

  /* ---- the kanji half, read from where it already is ----
     The kanji self-check is a rung in VCE漢字, because the 200 kanji and
     their readings live there. Both apps sit on one site, so they share
     this browser's storage, and しんだん can read the run VCE漢字 saved
     instead of making a student do it twice or asking them to copy a
     number across. It only ever reads: the kanji rung owns that key.

     If the key is missing, malformed, or from a browser where the kanji
     check has never been opened, this returns null and the report says
     so with a link. It never throws: a student who has done the grammar
     and not the kanji still gets their grammar page. */
  var KANJI_KEY = "vcekanji-v1";
  var KANJI_TOTAL = 200;
  function kanjiRun(){
    try {
      var raw = localStorage.getItem(KANJI_KEY);
      if (!raw) return null;
      var k = JSON.parse(raw);
      var runs = k && k.shin && k.shin.runs;
      if (!runs || !runs.length) return null;
      var last = runs[runs.length - 1];
      if (!last || typeof last.n !== "number") return null;
      return { at: last.at, n: last.n, runs: runs.length };
    } catch (e){ return null; }
  }
  function kanjiCard(){
    var k = kanjiRun();
    if (!k)
      return '<div class="hand"><b>Kanji</b>'
        + '<p>Not done yet. The kanji check is a tab in VCE漢字, because '
        + 'the 200 kanji live there. Do it and your result shows up here.</p>'
        + '<a class="btn" href="../vce-kanji/index.html">Open VCE漢字</a></div>';
    return '<div class="hand"><b>Kanji</b>'
      + '<p>' + k.n + ' of ' + KANJI_TOTAL + ' VCE kanji ticked on '
      + esc(k.at) + '.' + (k.runs > 1 ? ' ' + k.runs + ' runs so far.' : '')
      + '</p>'
      + '<a class="btn ghost" href="../vce-kanji/index.html">Open VCE漢字</a></div>';
  }

  /* ================= 2. けっか ================= */
  DRAW.kekka = function(){
    if (!S.runs.length){
      $("main").innerHTML = ruleFor("kekka")
        + '<div class="work"><div class="ask">'
        + '<p class="lead">No grammar run yet. Go through the grammar and '
        + 'press See my result.</p>'
        + '<div class="quick"><button id="togram"><b>Start the grammar</b>'
        + '<span>ぶんぽう</span></button></div>'
        + kanjiCard() + toCome() + '</div></div>' + foot("");
      $("togram").onclick = function(){ at = 0; draw(); };
      return;
    }
    var r = S.runs[S.runs.length - 1];
    var prev = S.runs.length > 1 ? S.runs[S.runs.length - 2] : null;
    /* ranked, not judged. Andrew, 2026-11-24: "Rank the six". A ranking
       shows the same thing as naming a worst subject and leaves a
       sixteen-year-old somewhere to stand. */
    var ranked = G.groups.map(function(g){
      var p = r.per[g.id];
      return { g: g, p: p, share: p.n ? p.use / p.n : 0 };
    }).sort(function(a, b){ return b.share - a.share; });

    $("main").innerHTML = ruleFor("kekka")
      + '<div class="work"><div class="ask" id="rep">'
      + '<div class="head"><b>' + r.use + '</b><span>of ' + r.n
      + ' grammar patterns you can use</span>'
      + (prev ? '<i>' + (r.use - prev.use >= 0 ? "+" : "") + (r.use - prev.use)
                + ' since ' + esc(prev.at) + '</i>' : "")
      + '</div>'
      + '<p class="lead">You understand ' + r.und + ' of them. '
      + (r.und > r.use
          ? 'The ' + (r.und - r.use) + ' you understand but cannot use yet are '
            + 'where the marks are: reading them is not the same as writing them.'
          : 'You can use everything you understand.')
      + '</p>'
      + '<div class="lvl">Your groups, strongest first</div>'
      + '<div class="prof">' + ranked.map(function(x){
          var pc = Math.round(x.share * 100);
          return '<div class="prow2"><b>' + esc(x.g.en) + '</b>'
            + '<span class="meter"><i style="width:' + pc + '%"></i></span>'
            + '<u>' + x.p.use + ' of ' + x.p.n + '</u></div>';
        }).join("") + '</div>'
      + '<div class="hand"><b>What to do next</b>'
      + '<p>Open the Grammar Hub and practise the patterns you understand '
      + 'but cannot use yet.</p>'
      + '<a class="btn" href="../../index.html">Grammar Hub</a>'
      + '</div>'
      + kanjiCard()
      + toCome()
      + runList()
      + '<p class="note">This page lives in this browser only. Clearing '
      + 'your browser, or using a different device, loses it. Copy it into '
      + 'a document or an email if you want it in March.</p>'
      + '</div></div>'
      + foot('<button class="btn ghost sm" id="copy">Copy my result</button>'
             + '<button class="btn sm" id="again">Do it again</button>');

    $("again").onclick = function(){ at = 0; draw(); };
    $("copy").onclick = function(){
      var txt = asText(r, ranked);
      function fallback(){ window.prompt("Copy this", txt); }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(txt).then(function(){
            var c = $("copy"); c.textContent = "Copied";
            setTimeout(function(){ c.textContent = "Copy my result"; }, 2500);
          }, fallback);
        } else fallback();
      } catch (e){ fallback(); }
    };
  };

  /* Say what is not here yet, so a student does not go looking for it. */
  function toCome(){
    return '<p class="note">Particles, kana, the map of Japan and your goals '
      + 'page are still being built. They will show up here.</p>';
  }
  function runList(){
    if (S.runs.length < 2) return "";
    return '<div class="runs"><b>Every run you have done</b>'
      + S.runs.map(function(x){
          return '<span class="run">' + esc(x.at) + '<i>' + x.use + ' of '
            + x.n + '</i></span>';
        }).join("") + '</div>';
  }

  /* Plain text, padded with spaces rather than tabs: a tab lands
     differently in every editor a student might paste into. */
  function asText(r, ranked){
    function pad(s, n){
      s = String(s);
      while (s.length < n) s += " ";
      return s;
    }
    var out = [];
    out.push("しんだん · grammar · " + r.at);
    out.push(r.use + " of " + r.n + " patterns you can use");
    out.push(r.und + " of " + r.n + " you understand");
    if (r.und > r.use)
      out.push((r.und - r.use) + " you understand but cannot use yet");
    out.push("");
    out.push("Your groups, strongest first:");
    ranked.forEach(function(x){
      out.push("  " + pad(x.p.use + " of " + x.p.n, 10) + x.g.en);
    });
    var k = kanjiRun();
    out.push("");
    out.push(k ? "Kanji: " + k.n + " of " + KANJI_TOTAL + " ticked on " + k.at
               : "Kanji: not done yet");
    if (S.runs.length > 1){
      out.push("");
      out.push("Every run:");
      S.runs.forEach(function(x){
        out.push("  " + x.at + "  " + x.use + " of " + x.n);
      });
    }
    return out.join("\n");
  }

  /* ---- a seam, so a check can drive this without clicking 65 rows ---- */
  window.SHINDAN = {
    patterns: function(){ return ALL.length; },
    groups: function(){
      return G.groups.map(function(g){ return { en: g.en, n: g.items.length }; });
    },
    now: function(){
      return { und: countOf(S.now.und), use: countOf(S.now.use) };
    },
    tick: function(w, ids){
      ids.forEach(function(k){
        S.now[w][k] = 1;
        if (w === "use") S.now.und[k] = 1;
      });
      save();
      return countOf(S.now[w]);
    },
    ids: function(){ return ALL.map(function(x){ return x.it.id; }); },
    runs: function(){ return S.runs.slice(); },
    at: function(){ return STEPS[at].id; },
    kanji: function(){ return kanjiRun(); }
  };

  draw();
})();
