/* app.js — じょし, the particles.

   Seven panels, each with three modes: what the particle marks and
   examples of it working, a gap to fill, and somebody else's sentence
   to judge.

   なおす is the one that is not just a second drill. It shows a whole
   sentence and asks for the particle it should carry, with
   このままでいい among the options, so a student has to decide whether
   anything is wrong before deciding what. That is the skill the VCAA
   oral reports keep naming, and a gap-fill cannot practise it: a gap
   tells you where the fault is before you start.

   The shell, the helpers and the round machinery are きほん's, copied
   rather than shared, because a tool here is a folder you can hand
   over or delete whole.                                              */
(function(){
  "use strict";

  var J = window.JOSHI || { panels: [], ok: "" };
  var PANELS = J.panels, OK = J.ok;

  var panelAt = 0, mode = "table", furi = true, showEn = true, sfx = true;
  /* The table sits in the first position and hands over the answers, so
     the drill is no test for a student who flips back to it. かくす
     empties the meaning column, and a card gives up its own line when it
     is tapped. Same reason, same button, as きほん. */
  var hide = false;
  var round = null;

  function $(id){ return document.getElementById(id); }
  function esc(t){
    return String(t == null ? "" : t).replace(/[&<>"]/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c];
    });
  }
  function lead(base){
    var n = 0;
    for (var i = base.length - 1; i >= 0; i--){
      if (/[一-鿿々]/.test(base[i])) n++; else break;
    }
    return n || base.length;
  }
  function ruby(t){
    return esc(t).replace(/([^\[\]]+?)\[([^\]]+)\]/g, function(m, base, read){
      return base.slice(0, -lead(base)) + "<ruby>" + base.slice(-lead(base))
        + "<rt>" + read + "</rt></ruby>";
    });
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

  function startRound(){
    var p = PANELS[panelAt];
    round = { items: shuffle(mode === "fix" ? p.fix : p.drill),
              at: 0, hit: 0, miss: 0, done: false, opts: null, picked: null };
    laySlot();
  }
  /* built once per item, so a re-render cannot reshuffle the options
     under the student's finger */
  function laySlot(){
    var it = round.items[round.at];
    if (!it){ round.done = true; return; }
    round.opts = shuffle([it.a].concat(it.wrong || []).slice(0, 4));
    round.picked = null;
  }

  function drawPanels(){
    $("panels").innerHTML = PANELS.map(function(p, i){
      return '<button data-p="' + i + '" class="' + (i === panelAt ? "on" : "")
        + '">' + esc(p.ja) + '<i>' + esc(p.en) + '</i></button>';
    }).join("");
  }

  function drawModes(){
    var p = PANELS[panelAt];
    var ms = [["table", "みる", "What it marks, with examples"],
              ["drill", "ドリル", "Fill the gap"],
              ["fix", "なおす", "Judge somebody else's sentence"]];
    $("modes").innerHTML = ms.map(function(m){
      return '<button data-m="' + m[0] + '" class="' + (mode === m[0] ? "on" : "")
        + '" title="' + esc(m[2]) + '">' + esc(m[1]) + '</button>';
    }).join("")
      + (mode === "table"
         ? '<button data-h="1" class="' + (hide ? "on" : "")
           + '" title="Empty the English column and tap a card to check">'
           + 'かくす</button>'
         : "")
      + '<div class="sp"></div><div class="lede">' + esc(p.lede) + '</div>';
  }

  function sheet(title, rows, big){
    return '<div class="sheet' + (big ? " big" : "") + '"><h3>' + esc(title)
      + '</h3><div class="grid' + (big ? " one" : "") + '">'
      + rows.map(function(r){
          return '<button class="cell" data-say="' + esc(plain(r[0])) + '"'
            + ' data-ans="' + esc(r[1]) + '">'
            + '<b>' + ruby(r[0]) + '</b><s>'
            + (hide ? "" : esc(r[1])) + '</s></button>';
        }).join("")
      + '</div></div>';
  }

  function drawTable(){
    var p = PANELS[panelAt];
    $("main").innerHTML = '<div class="sheets">'
      + sheet("What it marks", p.marks)
      + sheet("Examples", p.egs, true)
      + '</div>'
      + '<p class="key">' + (hide
          ? 'The English is hidden. Tap a card to check one.'
          : 'Tap かくす above to hide the English and test yourself.')
      + '</p>';
  }

  function drawRound(){
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
      + '<div class="ask"><div class="en">' + esc(it.en) + '</div>';
    if (mode === "drill"){
      h += '<div class="fr">' + ruby(it.s[0]) + '<u>'
        + (round.picked ? esc(round.picked) : "&nbsp;") + '</u>'
        + ruby(it.s[1]) + '</div>';
    } else {
      /* the whole sentence, with nothing marking where to look */
      h += '<div class="fr">' + ruby(it.s) + '</div>'
        + '<div class="asknote">Right as it is, or which particle should it be?</div>';
    }
    h += '</div><div class="opts">'
      + round.opts.map(function(o, i){
          var cls = "";
          if (round.picked !== null){
            if (o === it.a) cls = " right";
            else if (o === round.picked) cls = " wrong";
          }
          return '<button class="opt' + (o === OK ? " keep" : "") + cls
            + '" data-o="' + i + '"'
            + (round.picked !== null ? " disabled" : "") + '>' + esc(o) + '</button>';
        }).join("")
      + '</div>';
    if (round.picked !== null){
      h += '<div class="why"><b>' + esc(it.a) + '</b> ' + esc(it.why) + '</div>'
        + '<div class="nextrow"><div class="sp"></div>'
        + '<button class="btn" id="next">Next</button></div>';
    }
    $("main").innerHTML = h + '</div>';
  }

  function drawDone(){
    var n = round.items.length;
    $("main").innerHTML = '<div class="round"><div class="done">'
      + '<b>' + round.hit + ' of ' + n + '</b>'
      + '<p style="margin-top:6px;color:var(--muted)">'
      + (round.miss ? 'Run it again. The ones you missed come back.'
                    : 'All of them. Try another particle.') + '</p>'
      + '<div class="nextrow"><div class="sp"></div>'
      + '<button class="btn ghost" id="again">Run it again</button>'
      + '<div class="sp"></div></div></div></div>';
  }

  function draw(){
    drawPanels(); drawModes();
    if (mode === "table") drawTable(); else drawRound();
  }

  document.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button") : null;
    if (!b) return;

    if (b.dataset.p !== undefined){ panelAt = +b.dataset.p; round = null; return draw(); }
    if (b.dataset.m){ mode = b.dataset.m; round = null; return draw(); }
    if (b.dataset.h){ hide = !hide; return draw(); }
    if (b.dataset.say){
      if (hide && !b.classList.contains("shown")){
        b.classList.add("shown");
        b.querySelector("s").textContent = b.dataset.ans;
        return;
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
      /* read the sentence as it should be, not the particle on its own:
         a particle out of context tells a student nothing */
      say(mode === "drill" ? item.s[0] + item.a + item.s[1]
                           : (item.a === OK ? item.s : ""));
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
    if (b.id === "sayBtn"){ sfx = !sfx; b.classList.toggle("off", !sfx); return; }
  });

  draw();

  window.JOSHI_APP = {
    panels: function(){ return PANELS.map(function(p){ return p.id; }); },
    go: function(i, m){ panelAt = i; mode = m || "table"; round = null; draw(); },
    hide: function(v){ hide = v; draw(); },
    hidden: function(){ return hide; },
    round: function(){ return round; },
    item: function(){ return round && round.items[round.at]; },
    opts: function(){ return round && round.opts; },
    ok: function(){ return OK; },
    plain: plain, kana: kana, ruby: ruby
  };
})();
