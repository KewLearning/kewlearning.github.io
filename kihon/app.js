/* app.js — きほん, the small print.

   Six panels, each with three modes: the table to read or project, a
   drill, and the same words put into a sentence.

   The drill is the part that has to be right. These systems are mostly
   regular with a handful of exceptions, and the exceptions are where the
   marks go, so a round is dealt 7 parts irregular to 3 parts regular
   rather than evenly. The regular third is not filler: a student who
   only ever sees よじ and くじ starts believing every hour is odd.

   A wrong option is never random. The authored items carry the readings
   students actually produce (よんがつ, きゅうじ, いちにん, はちふん), and
   a generated item draws its wrong options from its own table, so every
   distractor is a real reading of a real neighbouring form.           */
(function(){
  "use strict";

  var K = window.KIHON || { panels: [] };
  var PANELS = K.panels;

  var panelAt = 0, mode = "table", furi = true, showEn = true, sfx = true;
  /* Andrew: the table sits in the first position and hands over every
     answer, so the drill is no test for a student who flips back to it.
     かくす empties the answer column. A cell then gives up its own
     answer when it is tapped, one at a time, which is what a flashcard
     does and what reading the whole table does not. */
  var hide = false;
  var round = null;

  /* ---------- the small helpers the suite shares ---------- */
  function $(id){ return document.getElementById(id); }
  function esc(t){
    return String(t == null ? "" : t).replace(/[&<>"]/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c];
    });
  }
  /* 漢字[かんじ] -> <ruby>漢字<rt>かんじ</rt></ruby> */
  function ruby(t){
    return esc(t).replace(/([^\[\]]+?)\[([^\]]+)\]/g, function(m, base, read){
      var head = base.slice(0, -lead(base)), stem = base.slice(-lead(base));
      return head + "<ruby>" + stem + "<rt>" + read + "</rt></ruby>";
    });
  }
  /* how many trailing characters the bracket belongs to: the kanji run */
  function lead(base){
    var n = 0;
    for (var i = base.length - 1; i >= 0; i--){
      if (/[一-鿿々]/.test(base[i])) n++; else break;
    }
    return n || base.length;
  }
  function plain(t){ return String(t == null ? "" : t).replace(/\[[^\]]*\]/g, ""); }
  function kana(t){
    return String(t == null ? "" : t)
      .replace(/([^\[\]]+?)\[([^\]]+)\]/g, function(m, base, read){
        return base.slice(0, -lead(base)) + read;
      });
  }
  function say(t){
    if (!sfx || !window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(kana(t));
      u.lang = "ja-JP"; u.rate = 0.9;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function shuffle(a){
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- building a round ---------- */

  /* Every reading table is also a question bank: the form is the
     question, its reading is the answer, and the other readings in the
     same table are the distractors. Nothing is invented for it. */
  function fromTables(p){
    var out = [];
    p.tables.forEach(function(t){
      if (!t.rows) return;
      var reads = t.rows.map(function(r){ return r[1]; });
      t.rows.forEach(function(r){
        var others = reads.filter(function(x){ return x !== r[1]; });
        out.push({
          q: r[0], a: r[1], wrong: shuffle(others).slice(0, 3),
          why: "", odd: !!r[2], src: "table"
        });
      });
    });
    return out;
  }

  function drillPool(p){
    var authored = (p.read || []).concat(p.pick || []).map(function(it){
      var c = {}; for (var k in it) c[k] = it[k];
      c.odd = true; c.src = "authored";
      return c;
    });
    var generated = fromTables(p).filter(function(g){
      /* an authored item already teaches this form, and better */
      return !authored.some(function(a){ return plain(a.q) === plain(g.q); });
    });
    return authored.concat(generated);
  }

  /* 7 parts irregular, 3 parts regular, no repeats inside a round */
  function deal(pool, want){
    var odd = shuffle(pool.filter(function(i){ return i.odd; }));
    var reg = shuffle(pool.filter(function(i){ return !i.odd; }));
    var n = Math.min(want, pool.length);
    var wantOdd = Math.min(odd.length, Math.ceil(n * 0.7));
    var picked = odd.slice(0, wantOdd);
    picked = picked.concat(reg.slice(0, n - picked.length));
    if (picked.length < n) picked = picked.concat(odd.slice(wantOdd, wantOdd + n - picked.length));
    return shuffle(picked);
  }

  function startRound(){
    var p = PANELS[panelAt];
    var items;
    if (mode === "drill") items = deal(drillPool(p), 12);
    else items = shuffle(p.build || []);
    round = { items: items, at: 0, hit: 0, miss: 0, done: false, opts: null };
    laySlot();
  }

  /* options are built once per item so a re-render cannot reshuffle them
     under the student's finger */
  function laySlot(){
    var it = round.items[round.at];
    if (!it) { round.done = true; return; }
    round.opts = shuffle([it.a].concat(it.wrong || []).slice(0, 4));
    round.picked = null;
  }

  /* ---------- drawing ---------- */

  function drawPanels(){
    $("panels").innerHTML = PANELS.map(function(p, i){
      return '<button data-p="' + i + '" class="' + (i === panelAt ? "on" : "")
        + '">' + esc(p.ja) + '<i>' + esc(p.en) + '</i></button>';
    }).join("");
  }

  function drawModes(){
    var p = PANELS[panelAt];
    var ms = [["table", "みる", "The table"], ["drill", "ドリル", "Drill"],
              ["build", "ぶん", "In a sentence"]];
    $("modes").innerHTML = ms.map(function(m){
      return '<button data-m="' + m[0] + '" class="' + (mode === m[0] ? "on" : "")
        + '" title="' + esc(m[2]) + '">' + esc(m[1]) + '</button>';
    }).join("")
      + (mode === "table"
         ? '<button data-h="1" class="' + (hide ? "on" : "")
           + '" title="Empty the answer column and tap a card to check">'
           + 'かくす</button>'
         : "")
      + '<div class="sp"></div><div class="lede">' + esc(p.lede) + '</div>';
  }

  function drawTable(){
    var p = PANELS[panelAt];
    var odd = 0;
    var h = '<div class="sheets">' + p.tables.map(function(t){
      var rows = t.rows || t.gloss || [];
      var isRead = !!t.rows;
      return '<div class="sheet"><h3>' + esc(t.title) + '</h3>'
        + (t.note ? '<p class="note">' + esc(t.note) + '</p>' : "")
        + '<div class="grid">' + rows.map(function(r){
            if (r[2]) odd++;
            var wide = !isRead && plain(r[0]).length > 8;
            return '<button class="cell' + (r[2] ? " odd" : "") + (wide ? " wide" : "")
              + '" data-say="' + esc(plain(r[0])) + '"'
              + ' data-ans="' + esc(r[1]) + '">'
              + '<b>' + ruby(r[0]) + '</b><s>'
              + (hide ? "" : esc(r[1])) + '</s></button>';
          }).join("") + '</div></div>';
    }).join("") + '</div>';
    if (odd) h += '<p class="key"><b>Red</b> marks an irregular reading. '
      + 'The drill deals those far more often than the regular ones.</p>';
    h += '<p class="key">' + (hide
      ? 'Answers are hidden. Tap a card to check one.'
      : 'Tap かくす above to hide the answers and test yourself.') + '</p>';
    $("main").innerHTML = h;
  }

  function drawRound(){
    var p = PANELS[panelAt];
    if (!round || round.mode !== mode || round.panel !== panelAt){
      startRound();
      round.mode = mode; round.panel = panelAt;
    }
    if (round.done) return drawDone();
    var it = round.items[round.at];
    var h = '<div class="round">'
      + '<div class="step">' + (round.at + 1) + ' of ' + round.items.length
      + ' &middot; <span class="tally">' + round.hit + ' right'
      + (round.miss ? ", " + round.miss + " to come back to" : "") + '</span></div>'
      + '<div class="ask">';
    if (mode === "drill"){
      h += '<div class="q">' + ruby(it.q) + '</div>';
    } else {
      h += '<div class="en">' + esc(it.en) + '</div>'
        + '<div class="fr">' + ruby(it.frame[0]) + '<u>'
        + (round.picked ? esc(round.picked) : "&nbsp;") + '</u>'
        + ruby(it.frame[1]) + '</div>';
    }
    h += '</div><div class="opts">'
      + round.opts.map(function(o, i){
          var cls = "";
          if (round.picked !== null){
            if (o === it.a) cls = " right";
            else if (o === round.picked) cls = " wrong";
          }
          return '<button class="opt' + cls + '" data-o="' + i + '"'
            + (round.picked !== null ? " disabled" : "") + '>' + esc(o) + '</button>';
        }).join("")
      + '</div>';
    if (round.picked !== null){
      var right = round.picked === it.a;
      h += '<div class="why"><b>' + esc(it.a) + '</b> '
        + esc(it.why || (right ? "" : "That is the one to learn."))
        + '</div>'
        + '<div class="nextrow"><div class="sp"></div>'
        + '<button class="btn" id="next">Next</button></div>';
    }
    h += '</div>';
    $("main").innerHTML = h;
  }

  function drawDone(){
    var n = round.items.length;
    $("main").innerHTML = '<div class="round"><div class="done">'
      + '<b>' + round.hit + ' of ' + n + '</b>'
      + '<p style="margin-top:6px;color:var(--muted)">'
      + (round.miss ? 'Run it again. The ones you missed come back.'
                    : 'All of them. Try another panel.') + '</p>'
      + '<div class="nextrow"><div class="sp"></div>'
      + '<button class="btn ghost" id="again">Run it again</button>'
      + '<div class="sp"></div></div></div></div>';
  }

  function draw(){
    drawPanels(); drawModes();
    if (mode === "table") drawTable(); else drawRound();
  }

  /* ---------- what the student does ---------- */

  document.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button") : null;
    if (!b) return;

    if (b.dataset.p !== undefined){
      panelAt = +b.dataset.p; round = null; return draw();
    }
    if (b.dataset.m){
      mode = b.dataset.m; round = null; return draw();
    }
    if (b.dataset.h){ hide = !hide; return draw(); }
    if (b.dataset.say){
      /* while the answers are hidden a tap gives up this one only, and
         says the answer rather than the form, because the answer is the
         thing being checked */
      if (hide && !b.classList.contains("shown")){
        b.classList.add("shown");
        b.querySelector("s").textContent = b.dataset.ans;
        return say(b.dataset.ans);
      }
      return say(b.dataset.say);
    }
    if (b.id === "again"){ round = null; return draw(); }
    if (b.id === "next"){
      var it = round.items[round.at];
      if (round.picked !== it.a) round.items.push(it);   /* a miss comes back */
      round.at++;
      if (round.at >= round.items.length) round.done = true; else laySlot();
      return draw();
    }
    if (b.dataset.o !== undefined && round && round.picked === null){
      var item = round.items[round.at];
      round.picked = round.opts[+b.dataset.o];
      if (round.picked === item.a) round.hit++; else round.miss++;
      say(item.a);
      return draw();
    }
    if (b.id === "furiBtn"){
      furi = !furi;
      document.body.classList.toggle("nofuri", !furi);
      b.classList.toggle("off", !furi);
      return;
    }
    if (b.id === "enBtn"){
      showEn = !showEn;
      document.body.classList.toggle("noen", !showEn);
      b.classList.toggle("off", !showEn);
      return;
    }
    if (b.id === "sayBtn"){
      sfx = !sfx;
      b.classList.toggle("off", !sfx);
      return;
    }
  });

  draw();

  /* the seam the browser check drives the app through */
  window.KIHON_APP = {
    panels: function(){ return PANELS.map(function(p){ return p.id; }); },
    go: function(i, m){ panelAt = i; mode = m || "table"; round = null; draw(); },
    pool: function(i){ return drillPool(PANELS[i]); },
    hide: function(v){ hide = v; draw(); },
    hidden: function(){ return hide; },
    deal: function(i, n){ return deal(drillPool(PANELS[i]), n); },
    round: function(){ return round; },
    item: function(){ return round && round.items[round.at]; },
    opts: function(){ return round && round.opts; },
    plain: plain, kana: kana, ruby: ruby
  };
})();
