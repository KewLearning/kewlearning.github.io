/* app.js — 論理パズル: the page.

   The engine deals the puzzle and proves it fair. This draws it and
   watches what the student does, under three rules.

   Do the clerical work, never the thinking. Putting ○ in a square means
   nobody else in that row or column can have it, which is bookkeeping, so
   the page crosses those out. Combining two grids to fill the third is the
   actual puzzle, so the page never does that, however easy it would be.

   Say where to look, never what to conclude. ヒント runs the solver from
   the squares the student has already filled and names the first clue that
   still has something in it. A student who is stuck gets a direction and
   keeps the deduction.

   Never reveal. たしかめる says whether anything so far contradicts a clue,
   and names the clue. It does not say which square is wrong, and there is
   no button that fills the answer in.                                     */
(function(){
  "use strict";

  var R = window.RONRI, E = window.RONRI_ENGINE;
  var PC = 0, PT = 1, CT = 2;

  var level = "b", puzzle = null, marks = null, furi = true, msg = null;
  var openClue = {};

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

  function lv(){
    var out = null;
    R.levels.forEach(function(x){ if (x.id === level) out = x; });
    return out;
  }
  function names(){ return R.people.slice(0, puzzle.n); }
  function clubs(){ return R.clubs.slice(0, puzzle.n); }
  function times(){ return R.times.slice(0, puzzle.n); }

  /* ---- a clue, in Japanese and in English ---- */
  function render(c, lang){
    var tpl = R.clues[c.kind][lang];
    var P = names(), C = clubs(), T = times();
    return tpl
      .replace("{p}", c.p != null ? P[c.p] : "")
      .replace("{q}", c.q != null ? P[c.q] : "")
      .replace("{c}", c.c != null ? C[c.c].ja : "")
      .replace("{ce}", c.c != null ? C[c.c].en : "")
      .replace("{d}", c.d != null ? C[c.d].ja : "")
      .replace("{de}", c.d != null ? C[c.d].en : "")
      .replace("{t}", c.t != null ? T[c.t].ja : "")
      .replace("{te}", c.t != null ? T[c.t].en : "");
  }

  /* ---- the student's squares ---- */
  function fresh(n){
    var g = [[], [], []];
    for (var k = 0; k < 3; k++)
      for (var i = 0; i < n; i++){
        g[k][i] = [];
        for (var j = 0; j < n; j++) g[k][i][j] = 0;
      }
    return g;
  }

  /* ○ in a square means nobody else in that row or column: clerical, so
     the page does it. The crosses it puts in are marked `auto` and are
     taken out again if the ○ goes, so a student can undo a mistake
     without clearing the grid by hand. */
  var autoMark = null;
  function place(k, i, j, v){
    var n = puzzle.n, x;
    marks[k][i][j] = v;
    if (v === 1){
      for (x = 0; x < n; x++){
        if (x !== j && marks[k][i][x] === 0){ marks[k][i][x] = -1; autoMark[k][i][x] = 1; }
        if (x !== i && marks[k][x][j] === 0){ marks[k][x][j] = -1; autoMark[k][x][j] = 1; }
      }
    } else {
      for (x = 0; x < n; x++){
        if (x !== j && autoMark[k][i][x]){ marks[k][i][x] = 0; autoMark[k][i][x] = 0; }
        if (x !== i && autoMark[k][x][j]){ marks[k][x][j] = 0; autoMark[k][x][j] = 0; }
      }
    }
    autoMark[k][i][j] = 0;
  }

  /* ---- is anything the student has marked impossible? ---- */
  function pinned(k, i){
    for (var j = 0; j < puzzle.n; j++) if (marks[k][i][j] === 1) return j;
    return -1;
  }
  function pinnedCol(k, j){
    for (var i = 0; i < puzzle.n; i++) if (marks[k][i][j] === 1) return i;
    return -1;
  }
  /* the time a person or a club has been pinned to, or -1 */
  function timeOf(who, k){ return pinned(k, who); }

  function breaks(c){
    var n = puzzle.n, i;
    function no(k, a, b){ return marks[k][a][b] === -1; }
    function yes(k, a, b){ return marks[k][a][b] === 1; }
    switch (c.kind){
      case "is":   return no(PC, c.p, c.c) || (pinned(PC, c.p) >= 0 && pinned(PC, c.p) !== c.c)
                        || (pinnedCol(PC, c.c) >= 0 && pinnedCol(PC, c.c) !== c.p);
      case "isnt": return yes(PC, c.p, c.c);
      case "at":   return no(PT, c.p, c.t) || (pinned(PT, c.p) >= 0 && pinned(PT, c.p) !== c.t);
      case "notat": return yes(PT, c.p, c.t);
      case "clubtime": return no(CT, c.c, c.t) || (pinned(CT, c.c) >= 0 && pinned(CT, c.c) !== c.t);
      case "notclubtime": return yes(CT, c.c, c.t);
      case "neither": return yes(PC, c.p, c.c) || yes(PC, c.q, c.c);
      case "either":
        if (no(PC, c.p, c.c) && no(PC, c.q, c.c)) return true;
        for (i = 0; i < n; i++) if (i !== c.p && i !== c.q && yes(PC, i, c.c)) return true;
        return false;
      case "earlier": return yes(PC, c.p, c.c) || orderBreaks(c.p, c.c, true);
      case "later":   return yes(PC, c.p, c.c) || orderBreaks(c.p, c.c, false);
      case "between": return yes(PC, c.p, c.c) || yes(PC, c.p, c.d)
                        || orderBreaks(c.p, c.c, true) || orderBreaks(c.p, c.d, false);
      default: return false;
    }
  }
  function orderBreaks(p, club, pEarlier){
    var a = timeOf(p, PT), b = timeOf(club, CT);
    if (a < 0 || b < 0) return false;
    return pEarlier ? a >= b : a <= b;
  }

  function twoInALine(){
    var n = puzzle.n, k, i, j, c;
    for (k = 0; k < 3; k++){
      for (i = 0; i < n; i++){
        c = 0;
        for (j = 0; j < n; j++) if (marks[k][i][j] === 1) c++;
        if (c > 1) return true;
      }
      for (j = 0; j < n; j++){
        c = 0;
        for (i = 0; i < n; i++) if (marks[k][i][j] === 1) c++;
        if (c > 1) return true;
      }
    }
    return false;
  }

  function finished(){
    var n = puzzle.n, p;
    for (p = 0; p < n; p++){
      if (pinned(PC, p) !== puzzle.solution.club[p]) return false;
      if (pinned(PT, p) !== puzzle.solution.time[p]) return false;
    }
    return true;
  }

  /* ---- drawing ---- */
  function drawClues(){
    var used = {};
    puzzle.clues.forEach(function(c, i){ if (!breaks(c)) used[i] = 0; });
    return '<div class="clues"><h2>てがかり · the clues</h2>'
      + '<p class="say">' + esc(R.ui.lede) + ' Tap a clue to read it in English.</p>'
      + puzzle.clues.map(function(c, i){
          return '<div class="clue' + (openClue[i] ? " open" : "")
            + (msg && msg.clue === i ? " flag" : "") + '" data-c="' + i + '">'
            + '<b>' + (i + 1) + '</b><div><div class="ja">' + ruby(render(c, "ja"))
            + '</div><div class="en">' + esc(render(c, "en")) + '</div></div></div>';
        }).join("")
      + '<ul class="how">' + R.ui.howto.map(function(l){
          return '<li>' + esc(l) + '</li>'; }).join("") + '</ul>'
      + '</div>';
  }

  function grid(k, rowLab, colLab, title){
    var n = puzzle.n, i, j;
    var h = '<div class="gw"><h3>' + title + '</h3><table><tr><th></th>';
    for (j = 0; j < n; j++) h += '<th>' + ruby(colLab[j]) + '</th>';
    h += '</tr>';
    for (i = 0; i < n; i++){
      h += '<tr><th class="rh">' + ruby(rowLab[i]) + '</th>';
      for (j = 0; j < n; j++){
        var v = marks[k][i][j];
        var cls = v === 1 ? "y" : (v === -1 ? (autoMark[k][i][j] ? "n auto" : "n") : "");
        h += '<td><button class="' + cls + '" data-k="' + k + '" data-i="' + i
          + '" data-j="' + j + '" aria-label="' + esc(plain(rowLab[i])) + ' '
          + esc(plain(colLab[j])) + '">'
          + (v === 1 ? "○" : v === -1 ? "×" : "") + '</button></td>';
      }
      h += '</tr>';
    }
    return h + '</table></div>';
  }

  function draw(){
    var P = names();
    var C = clubs().map(function(x){ return x.ja; });
    var T = times().map(function(x){ return x.ja; });
    var h = '<div class="wrap">' + drawClues() + '<div class="grids">'
      + grid(PC, P, C, "名前 と クラブ")
      + grid(PT, P, T, "名前 と 時間")
      + grid(CT, C, T, "クラブ と 時間")
      + '<div style="flex:1 1 100%">'
      + '<div class="acts">'
      + '<button class="btn" id="check">たしかめる</button>'
      + '<button class="btn ghost" id="hint">ヒント</button>'
      + '<button class="btn ghost" id="clear">けす</button>'
      + '</div>'
      + (msg ? '<div class="msg ' + (msg.tone || "") + '">' + msg.html + '</div>' : "")
      + (finished() ? done() : "")
      + '</div></div></div>';
    $("main").innerHTML = h;
    $("pno").textContent = "#" + puzzle.seed + " · " + puzzle.clues.length + " clues";
    document.querySelectorAll(".tool[data-lv]").forEach(function(b){
      b.classList.toggle("on", b.dataset.lv === level);
    });
  }

  function done(){
    var P = names(), C = clubs(), T = times();
    var rows = P.map(function(nm, i){
      return '<tr><td>' + esc(nm) + 'さん</td><td>' + ruby(C[puzzle.solution.club[i]].ja)
        + 'ぶ</td><td>' + ruby(T[puzzle.solution.time[i]].ja) + '</td></tr>';
    }).join("");
    return '<div class="done"><h3>' + esc(R.ui.solved) + '</h3>'
      + '<p style="font-size:13.5px;color:var(--muted)">' + esc(R.ui.checkDone)
      + ' Puzzle #' + puzzle.seed + ', ' + puzzle.clues.length + ' clues.</p>'
      + '<table>' + rows + '</table></div>';
  }

  /* ---- the two buttons that help ---- */
  function check(){
    if (twoInALine()){
      msg = { tone: "bad", html: "Two ○ in one row or column. "
        + "One person is in one club, at one time." };
      return;
    }
    for (var i = 0; i < puzzle.clues.length; i++){
      if (breaks(puzzle.clues[i])){
        msg = { tone: "bad", clue: i,
                html: esc(R.ui.checkBad) + " <b>" + (i + 1) + "</b>." };
        return;
      }
    }
    msg = finished()
      ? { tone: "good", html: esc(R.ui.checkDone) }
      : { tone: "good", html: esc(R.ui.checkOk) };
  }

  /* Run the clues against the position the student is actually in, and
     name the first one that still gives something. It never says what. */
  function hint(){
    var i;
    for (i = 0; i < puzzle.clues.length; i++)
      if (breaks(puzzle.clues[i])){
        msg = { tone: "bad", clue: i, html: "Before a hint: something you have "
          + "marked contradicts clue <b>" + (i + 1) + "</b>." };
        return;
      }
    var here = position();
    if (E.complete(here)){ msg = { tone: "good", html: esc(R.ui.checkDone) }; return; }

    for (i = 0; i < puzzle.clues.length; i++){
      var copy = position();
      var before = JSON.stringify(copy.g);
      E.CLUE[puzzle.clues[i].kind](copy, puzzle.clues[i]);
      if (!copy.dead && JSON.stringify(copy.g) !== before){
        msg = { tone: "", clue: i,
                html: "Read clue <b>" + (i + 1) + "</b> again. There is "
                    + "something in it you have not used yet." };
        return;
      }
    }
    /* No clue adds anything by itself, so the next step is one of the two
       moves the grids give you. Naming which is still not doing it. */
    var byLine = position(), byAcross = position();
    var l0 = JSON.stringify(byLine.g), a0 = JSON.stringify(byAcross.g);
    E.lines(byLine);
    E.across(byAcross);
    if (JSON.stringify(byLine.g) !== l0){
      msg = { tone: "", html: "No clue adds anything on its own now. Look "
        + "down a column or along a row: if a square is the only one left, "
        + "it is a \u25cb." };
      return;
    }
    if (JSON.stringify(byAcross.g) !== a0){
      msg = { tone: "", html: "No clue adds anything on its own now. Put two "
        + "grids together: if you know a person's club, and you know that "
        + "club's time, you know that person's time." };
      return;
    }
    msg = { tone: "bad", html: "Nothing follows from this position. Something "
      + "marked earlier must be wrong. Press \u3051\u3059 and start again." };
  }

  /* the student's squares, as an engine position */
  function position(){
    var st = E.blank(puzzle.n), k, i, j;
    for (k = 0; k < 3; k++)
      for (i = 0; i < puzzle.n; i++)
        for (j = 0; j < puzzle.n; j++)
          if (marks[k][i][j] !== 0) st.g[k][i][j] = marks[k][i][j];
    return st;
  }

  /* ---- the page ---- */
  function deal(keepSeed){
    var L = lv();
    var seedNo = keepSeed || (1000 + Math.floor(Math.random() * 9000));
    var tries = 0;
    do {
      puzzle = E.make(L.n, L.kinds, seedNo + tries * 101);
      tries++;
    } while (!puzzle && tries < 12);
    if (!puzzle){ $("main").innerHTML = '<p class="msg bad">Could not deal a '
      + 'puzzle. Try あたらしい again.</p>'; return; }
    puzzle.seed = seedNo + (tries - 1) * 101;
    marks = fresh(puzzle.n);
    autoMark = fresh(puzzle.n);
    openClue = {}; msg = null;
    draw();
  }

  document.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button, .clue") : null;
    if (!b) return;
    if (b.dataset && b.dataset.k !== undefined){
      var k = +b.dataset.k, i = +b.dataset.i, j = +b.dataset.j;
      var v = marks[k][i][j];
      place(k, i, j, v === 0 ? 1 : v === 1 ? -1 : 0);
      msg = null;
      if (finished()) msg = { tone: "good", html: esc(R.ui.checkDone) };
      return draw();
    }
    if (b.dataset && b.dataset.c !== undefined && b.classList.contains("clue")){
      openClue[+b.dataset.c] = !openClue[+b.dataset.c];
      return draw();
    }
    if (b.dataset && b.dataset.lv){ level = b.dataset.lv; return deal(); }
    if (b.id === "newBtn") return deal();
    if (b.id === "check"){ check(); return draw(); }
    if (b.id === "hint"){ hint(); return draw(); }
    if (b.id === "clear"){
      marks = fresh(puzzle.n); autoMark = fresh(puzzle.n); msg = null;
      return draw();
    }
    if (b.id === "furiBtn"){
      furi = !furi;
      document.body.classList.toggle("nofuri", !furi);
      b.classList.toggle("off", !furi);
      return;
    }
  });

  deal();

  window.RONRI_APP = {
    deal: function(lvId, seedNo){ if (lvId) level = lvId; deal(seedNo); },
    puzzle: function(){ return puzzle; },
    marks: function(){ return marks; },
    mark: function(k, i, j, v){ place(k, i, j, v); draw(); },
    solveIt: function(){
      var n = puzzle.n, p;
      marks = fresh(n); autoMark = fresh(n);
      for (p = 0; p < n; p++){
        place(PC, p, puzzle.solution.club[p], 1);
        place(PT, p, puzzle.solution.time[p], 1);
        place(CT, puzzle.solution.club[p], puzzle.solution.time[p], 1);
      }
      draw();
    },
    finished: function(){ return finished(); },
    msg: function(){ return msg; },
    render: render
  };
})();
