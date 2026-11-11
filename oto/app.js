/* app.js — おとのきまり: the student writes a rule and the page runs it.
   ---------------------------------------------------------------------------
   Four stages, and the order is the point.

     データ    verbs with their て-forms, in the order they came. Sorting
               them by ending is the insight, so there is a button for it
               and the page does not arrive sorted.
     きまり    the rule, as a table: for each ending, what happens. This is
               the stage that makes the difference. A rule a page can run
               has to be precise enough to be wrong, which a rule in a
               student's head does not.
     ためす    the page runs THEIR rule on verbs they have never seen and
               says what it got. Right answers prove nothing on their own;
               the one it misses is 行く, every time, because that is the
               only verb the rule does not cover.
     れいがい  having found the exception by being wrong about it, they add
               it, and the rule goes to ten out of ten.

   One rule that matters here: a failed prediction becomes data. Verbs the
   student's rule got wrong are added to the table they can look at when
   they revise. That is what happens in a lab and it is the opposite of
   being told the answer.

   Nothing on this page states the rule before the student does.          */
(function(){
  "use strict";

  var O = window.OTO;
  /* Which investigation, and where it opens: the one a worksheet link
     asked for, then the one this device was last on, then the first. */
  var TABKEY = "oto-v1";
  var at = TABS.start(TABKEY, O.investigations.map(function(I){ return I.id; }));
  var stage = "data";
  var rule = {}, exceptions = [], extra = [], result = null;
  var sorted = false, phase = "main";   /* main | transfer | anomaly */

  function $(id){ return document.getElementById(id); }
  function esc(t){
    return String(t == null ? "" : t).replace(/[&<>"]/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c];
    });
  }
  function inv(){ return O.investigations[at]; }

  /* ---- the rule, executed ---- */
  function keyOf(I, item){
    if (I.keyBy === "verb") return item.type === "ru" ? "ru" : item.ja.slice(-1);
    return item.ja;
  }
  function pat(list, id){
    var out = null;
    list.forEach(function(p){ if (p.id === id) out = p; });
    return out;
  }
  function predict(I, item, patterns){
    for (var i = 0; i < exceptions.length; i++){
      var e = exceptions[i];
      if (e.ja === item.ja && (e.type || null) === (item.type || null)) return e.ans;
    }
    var p = pat(patterns, rule[keyOf(I, item)]);
    if (!p) return null;
    return item.ja.slice(0, item.ja.length - p.drop) + p.add;
  }
  function complete(I){
    return I.keys.every(function(k){ return !!rule[k.id]; });
  }

  function run(I, items, patterns){
    var rows = items.map(function(it){
      var got = predict(I, it, patterns);
      return { item: it, got: got, ok: got === it.ans };
    });
    return { rows: rows, hit: rows.filter(function(r){ return r.ok; }).length,
             of: rows.length };
  }

  /* a miss that is a declared exception is not a fault in the rule */
  function isException(I, it){
    return (I.exceptions || []).some(function(e){
      return e.ja === it.ja && (e.type || null) === (it.type || null);
    });
  }
  function known(I){
    var map = {};
    exceptions.forEach(function(e){ map[e.ja + "|" + (e.type || "")] = 1; });
    return map;
  }

  /* ---- drawing ---- */
  function tabs(){
    return '<nav class="invs">' + O.investigations.map(function(I, i){
      return '<button data-inv="' + i + '" class="' + (i === at ? "on" : "") + '">'
        + esc(I.ja) + '<i>' + esc(I.en) + '</i></button>';
    }).join("") + '</nav>';
  }

  function steps(){
    var order = ["data", "rule", "test"];
    return '<div class="steps">' + order.map(function(s, i){
      return '<span class="' + (s === stage ? "on" : "")
        + (order.indexOf(stage) > i ? " past" : "") + '">'
        + esc(O.ui.stages[i]) + '</span>';
    }).join('<b>→</b>') + '</div>';
  }

  function dataTable(I){
    var rows = I.shown.concat(extra);
    if (sorted){
      rows = rows.slice().sort(function(a, b){
        var ka = keyOf(I, a), kb = keyOf(I, b);
        if (ka === kb) return 0;
        return ka < kb ? -1 : 1;
      });
    }
    var isVerb = I.keyBy === "verb";
    return '<table class="dt"><tr><th>' + (isVerb ? "verb" : "number")
      + '</th>' + (isVerb ? '<th>type</th>' : '<th></th>')
      + '<th>' + (isVerb ? "て-form" : "with 本") + '</th><th></th></tr>'
      + rows.map(function(it){
          var isNew = extra.indexOf(it) >= 0;
          return '<tr' + (isNew ? ' class="new"' : '') + '><td class="ja">'
            + esc(it.kanji || it.ja) + '</td>'
            + '<td class="ty">' + (isVerb ? esc(it.type === "ru" ? "る-verb" : "う-verb") : "") + '</td>'
            + '<td class="ja ans">' + esc(it.ans) + '</td>'
            + '<td class="en">' + esc(it.en) + (isNew ? ' &middot; from your test' : '') + '</td></tr>';
        }).join("")
      + '</table>';
  }

  function drawData(I){
    return '<div class="card"><h2>' + esc(I.ask) + '</h2>'
      + '<p class="lede">' + esc(I.lede) + '</p>'
      + (I.keyNote ? '<p class="note">' + esc(I.keyNote) + '</p>' : "")
      + '<div class="acts">'
      + '<button class="btn ghost" id="sort">'
      + esc(sorted ? O.ui.unsorted : O.ui.sortIt) + '</button>'
      + '<div class="sp"></div>'
      + '<button class="btn" id="toRule">' + esc(O.ui.nextStage) + '</button>'
      + '</div>'
      + dataTable(I) + '</div>';
  }

  function drawRule(I){
    var h = '<div class="card"><h2>Write your rule</h2>'
      + '<p class="lede">For each one, choose what happens to the end of the '
      + 'word. The page will run exactly what you write here.</p>'
      + '<table class="rt">';
    I.keys.forEach(function(k){
      h += '<tr><th>' + esc(k.ja) + '<i>' + esc(k.en) + '</i></th><td>'
        + I.patterns.map(function(p){
            return '<button class="chip' + (rule[k.id] === p.id ? " on" : "")
              + '" data-key="' + esc(k.id) + '" data-pat="' + esc(p.id) + '">'
              + esc(p.ja) + '</button>';
          }).join("")
        + '</td></tr>';
    });
    h += '</table>';
    if (exceptions.length)
      h += '<p class="note">Exceptions you have added: '
        + exceptions.map(function(e){ return esc(e.ja + " → " + e.ans); }).join(", ")
        + '</p>';
    h += '<div class="acts"><button class="btn ghost" id="toData">Back to the data</button>'
      + '<div class="sp"></div>'
      + '<button class="btn" id="runIt"' + (complete(I) ? "" : " disabled") + '>'
      + esc(O.ui.runIt) + '</button></div>'
      + (complete(I) ? "" : '<p class="note">Every line needs an answer before '
          + 'it can run.</p>')
      + '</div>' + '<div class="card sub"><h3>The data, still here</h3>'
      + dataTable(I) + '</div>';
    return h;
  }

  function resultTable(res, I){
    return '<table class="dt res"><tr><th>'
      + (I.keyBy === "verb" ? "verb" : "number")
      + '</th><th>your rule says</th><th>it is</th><th></th></tr>'
      + res.rows.map(function(r){
          return '<tr class="' + (r.ok ? "ok" : "no") + '"><td class="ja">'
            + esc(r.item.kanji || r.item.ja)
            + (I.keyBy === "verb" ? ' <i>' + esc(r.item.type === "ru" ? "る" : "う") + '</i>' : '')
            + '</td><td class="ja">' + esc(r.got || "—") + '</td>'
            + '<td class="ja">' + (r.ok ? "" : esc(r.item.ans)) + '</td>'
            + '<td>' + (r.ok ? "○" : "×") + '</td></tr>';
        }).join("") + '</table>';
  }

  function ruleInWords(I){
    return '<ul class="words">' + I.keys.map(function(k){
      var p = pat(I.patterns, rule[k.id]);
      if (!p) return "";
      return '<li>' + esc(k.en) + ': '
        + (p.drop ? 'take off the last kana and add ' : 'add ')
        + '<b>' + esc(p.add) + '</b></li>';
    }).join("")
      + exceptions.map(function(e){
          return '<li>except <b>' + esc(e.ja) + '</b>, which gives <b>'
            + esc(e.ans) + '</b></li>';
        }).join("")
      + '</ul>';
  }

  function drawTest(I){
    var res = result;
    var misses = res.rows.filter(function(r){ return !r.ok; });
    var onlyEx = misses.length > 0 && misses.every(function(r){ return isException(I, r.item); });
    var h = '<div class="card"><h2>' + res.hit + ' of ' + res.of + '</h2>';

    if (phase === "transfer"){
      h += '<p class="lede">' + esc(I.transfer.say) + '</p>';
    } else if (phase === "anomaly"){
      h += '<p class="lede">' + esc(I.anomaly.say) + '</p>';
    } else if (res.hit === res.of){
      h += '<p class="lede good">Every one. Your rule is the rule.</p>';
    } else if (onlyEx){
      h += '<p class="lede good">Your rule got everything it covers. '
        + 'The one it missed is the one no rule covers.</p>';
      misses.forEach(function(r){
        var e = (I.exceptions || []).filter(function(x){ return x.ja === r.item.ja; })[0];
        if (e) h += '<p class="note">' + esc(e.say) + '</p>';
      });
    } else {
      h += '<p class="lede">Some of these your rule gets wrong. They are in '
        + 'the data now. Look at what they have in common.</p>';
    }

    h += resultTable(res, I);

    if (phase === "anomaly" && misses.length){
      h += '<p class="note">' + esc(I.anomaly.say2) + '</p>';
    }
    if (phase === "transfer" && res.hit === res.of){
      h += '<p class="note good">' + esc(I.transfer.win) + '</p>';
    }

    h += '<div class="acts">';
    if (onlyEx && phase === "main")
      h += '<button class="btn" id="addEx">' + esc(O.ui.addEx) + '</button>';
    if (phase === "main" && res.hit === res.of && I.transfer)
      h += '<button class="btn" id="toTransfer">Try it on ' + esc(I.transfer.ja) + '</button>';
    if (phase === "transfer" && res.hit === res.of && I.anomaly)
      h += '<button class="btn" id="toAnomaly">Try it on ' + esc(I.anomaly.ja) + '</button>';
    h += '<button class="btn ghost" id="toRule">' + esc(O.ui.again) + '</button>'
      + '</div>';

    if (res.hit === res.of && phase === "main"){
      h += '<div class="won"><h3>Your rule, in words</h3>' + ruleInWords(I)
        + (I.after ? '<p class="note">' + esc(I.after) + '</p>' : '') + '</div>';
    }
    return h + '</div>';
  }

  function draw(){
    var I = inv();
    var body = stage === "data" ? drawData(I)
             : stage === "rule" ? drawRule(I)
             : drawTest(I);
    $("main").innerHTML = tabs() + steps() + '<div class="wrap">' + body + '</div>';
    /* Remember the investigation, and keep its tab on the screen. */
    TABS.keep(TABKEY, O.investigations[at].id);
    TABS.inview($("main").querySelector(".invs"));
  }

  /* ---- what the student does ---- */
  function reset(){
    stage = "data"; rule = {}; exceptions = []; extra = [];
    result = null; sorted = false; phase = "main";
  }

  document.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button") : null;
    if (!b) return;
    var I = inv();

    if (b.dataset.inv !== undefined){ at = +b.dataset.inv; reset(); return draw(); }
    if (b.dataset.key){
      rule[b.dataset.key] = b.dataset.pat;
      return draw();
    }
    if (b.id === "sort"){ sorted = !sorted; return draw(); }
    if (b.id === "toRule"){ stage = "rule"; phase = "main"; return draw(); }
    if (b.id === "toData"){ stage = "data"; return draw(); }
    if (b.id === "runIt"){
      if (!complete(I)) return;
      var set = exceptions.length ? (I.retest || I.test) : I.test;
      result = run(I, set, I.patterns);
      /* a failed prediction is data now */
      result.rows.forEach(function(r){
        if (!r.ok && extra.indexOf(r.item) < 0 && !isException(I, r.item))
          extra.push(r.item);
      });
      stage = "test"; phase = "main";
      return draw();
    }
    if (b.id === "addEx"){
      (I.exceptions || []).forEach(function(x){
        if (!exceptions.some(function(y){ return y.ja === x.ja; })) exceptions.push(x);
      });
      result = run(I, I.retest || I.test, I.patterns);
      stage = "test"; phase = "main";
      return draw();
    }
    if (b.id === "toTransfer"){
      phase = "transfer";
      result = run(I, I.transfer.items, I.transfer.patterns);
      return draw();
    }
    if (b.id === "toAnomaly"){
      phase = "anomaly";
      result = run(I, I.anomaly.items, I.anomaly.patterns);
      return draw();
    }
  });

  draw();

  window.OTO_APP = {
    go: function(i){ at = i; reset(); draw(); },
    stage: function(){ return { stage: stage, phase: phase }; },
    rule: function(){ return rule; },
    setRule: function(r){ rule = {}; Object.keys(r).forEach(function(k){ rule[k] = r[k]; }); draw(); },
    correct: function(){
      /* the rule this investigation's data actually follows, worked out from
         the shown items rather than written down anywhere */
      var I = inv(), out = {};
      I.shown.concat(I.test, I.retest || []).forEach(function(it){
        if (isException(I, it)) return;
        var k = keyOf(I, it);
        I.patterns.forEach(function(p){
          if (it.ja.slice(0, it.ja.length - p.drop) + p.add === it.ans) out[k] = p.id;
        });
      });
      return out;
    },
    result: function(){ return result; },
    predict: function(item, patterns){ return predict(inv(), item, patterns || inv().patterns); },
    exceptions: function(){ return exceptions; },
    extra: function(){ return extra; },
    click: function(id){ var el = $(id); if (el) el.click(); return !!el; },
    reset: reset, draw: draw
  };
})();
