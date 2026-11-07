/* engine.js — 論理パズル: make a puzzle, and prove it is a fair one.
   ---------------------------------------------------------------------------
   Two promises are made to the student on the page: there is exactly one
   answer, and no guessing is ever needed. A generator that deals random
   clues keeps neither. So the generator here is built around a solver, and
   a puzzle only ships if the solver can finish it.

   The solver is a propagator and every rule in it is SOUND: it only ever
   rules out a value that cannot hold in any solution. That matters more
   than it sounds. A sound propagator that reaches a complete assignment has
   proved that assignment is forced, which proves the puzzle has one answer
   and needs no guessing, both at once. If it stalls, the puzzle would need
   a student to try something and back out of it, and we throw it away
   rather than ship it.

   Soundness is the one thing this file cannot check about itself, so
   tools/browser-check.js brute forces every puzzle against all n! by n!
   assignments and fails if the count is not exactly one, or if the single
   answer is not the one the solver found.

   Three categories: person, club, time. The state is the three pairwise
   grids, each cell 1 yes, -1 no, 0 unknown. Any two grids determine the
   third, and that is both the interesting step for a student and the rule
   that does most of the work here.                                       */
(function(){
  "use strict";

  var PC = 0, PT = 1, CT = 2;   /* person-club, person-time, club-time */

  /* A seeded generator, so a puzzle has a number. Two students can be given
     the same puzzle, and a student who wants yesterday's one back can have
     it. mulberry32: small, and good enough for dealing puzzles. */
  function rng(seed){
    var a = seed >>> 0;
    return function(){
      a = (a + 0x6D2B79F5) >>> 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffled(arr, rnd){
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(rnd() * (i + 1)), t = a[i];
      a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------------------------------------------------------------- state */
  function blank(n){
    var g = [[], [], []];
    for (var k = 0; k < 3; k++)
      for (var i = 0; i < n; i++){
        g[k][i] = [];
        for (var j = 0; j < n; j++) g[k][i][j] = 0;
      }
    return { n: n, g: g, dead: false };
  }
  function set(st, k, i, j, v){
    var cur = st.g[k][i][j];
    if (cur === v) return false;
    if (cur !== 0){ st.dead = true; return false; }
    st.g[k][i][j] = v;
    return true;
  }
  /* the rows of a grid are its first category, the columns its second */
  function can(st, k, i, j){ return st.g[k][i][j] !== -1; }
  function yes(st, k, i, j){ return st.g[k][i][j] === 1; }

  /* times a person or a club could still have, as indexes */
  function slots(st, k, i){
    var out = [];
    for (var j = 0; j < st.n; j++) if (can(st, k, i, j)) out.push(j);
    return out;
  }

  /* ---------------------------------------------------------------- clues */
  /* Each clue narrows the grids. Every one of these is a statement that is
     true of the answer, so everything it rules out is genuinely impossible. */
  var CLUE = {
    is:          function(st, c){ return set(st, PC, c.p, c.c, 1); },
    isnt:        function(st, c){ return set(st, PC, c.p, c.c, -1); },
    at:          function(st, c){ return set(st, PT, c.p, c.t, 1); },
    notat:       function(st, c){ return set(st, PT, c.p, c.t, -1); },
    clubtime:    function(st, c){ return set(st, CT, c.c, c.t, 1); },
    notclubtime: function(st, c){ return set(st, CT, c.c, c.t, -1); },
    neither:     function(st, c){
      var a = set(st, PC, c.p, c.c, -1);
      var b = set(st, PC, c.q, c.c, -1);
      return a || b;
    },
    either:      function(st, c){
      /* one of the two is in the club, so nobody else is, and ruling one
         out settles the other */
      var moved = false;
      for (var r = 0; r < st.n; r++)
        if (r !== c.p && r !== c.q) moved = set(st, PC, r, c.c, -1) || moved;
      if (st.g[PC][c.p][c.c] === -1) moved = set(st, PC, c.q, c.c, 1) || moved;
      if (st.g[PC][c.q][c.c] === -1) moved = set(st, PC, c.p, c.c, 1) || moved;
      return moved;
    },
    /* p is earlier than whoever is in club c. Neither can be the other,
       and the two time ranges push each other inwards. */
    earlier:     function(st, c){ return order(st, c.p, c.c, true); },
    later:       function(st, c){ return order(st, c.p, c.c, false); },
    between:     function(st, c){
      var a = order(st, c.p, c.c, true);
      var b = order(st, c.p, c.d, false);
      return a || b;
    }
  };

  function order(st, p, club, pEarlier){
    var moved = set(st, PC, p, club, -1);     /* nobody precedes themselves */
    var tp = slots(st, PT, p), tc = slots(st, CT, club);
    if (!tp.length || !tc.length){ st.dead = true; return moved; }
    var loP = tp[0], hiP = tp[tp.length - 1];
    var loC = tc[0], hiC = tc[tc.length - 1];
    var j;
    if (pEarlier){
      for (j = 0; j < st.n; j++){
        if (j >= hiC && can(st, PT, p, j)) moved = set(st, PT, p, j, -1) || moved;
        if (j <= loP && can(st, CT, club, j)) moved = set(st, CT, club, j, -1) || moved;
      }
    } else {
      for (j = 0; j < st.n; j++){
        if (j <= loC && can(st, PT, p, j)) moved = set(st, PT, p, j, -1) || moved;
        if (j >= hiP && can(st, CT, club, j)) moved = set(st, CT, club, j, -1) || moved;
      }
    }
    return moved;
  }

  /* ------------------------------------------------------------- the rules */
  /* one per row and one per column, in every grid */
  function lines(st){
    var moved = false, k, i, j, n = st.n;
    for (k = 0; k < 3; k++){
      for (i = 0; i < n; i++){
        var row = [], rowYes = -1;
        for (j = 0; j < n; j++){
          if (st.g[k][i][j] === 1) rowYes = j;
          if (can(st, k, i, j)) row.push(j);
        }
        if (!row.length){ st.dead = true; return moved; }
        if (rowYes < 0 && row.length === 1){ moved = set(st, k, i, row[0], 1) || moved; rowYes = row[0]; }
        if (rowYes >= 0)
          for (j = 0; j < n; j++)
            if (j !== rowYes && can(st, k, i, j)) moved = set(st, k, i, j, -1) || moved;
      }
      for (j = 0; j < n; j++){
        var col = [], colYes = -1;
        for (i = 0; i < n; i++){
          if (st.g[k][i][j] === 1) colYes = i;
          if (can(st, k, i, j)) col.push(i);
        }
        if (!col.length){ st.dead = true; return moved; }
        if (colYes < 0 && col.length === 1){ moved = set(st, k, col[0], j, 1) || moved; colYes = col[0]; }
        if (colYes >= 0)
          for (i = 0; i < n; i++)
            if (i !== colYes && can(st, k, i, j)) moved = set(st, k, i, j, -1) || moved;
      }
    }
    return moved;
  }

  /* Any two grids decide the third, and this is the step that makes three
     categories a puzzle rather than a table. Person p and time t can only
     go together through some club: if every club is ruled out for one or
     the other, p is not at t. And if p's club is settled, p inherits that
     club's row outright. */
  function across(st){
    var n = st.n, moved = false, p, c, t;
    for (p = 0; p < n; p++)
      for (t = 0; t < n; t++){
        if (!can(st, PT, p, t)) continue;
        var any = false, forced = false;
        for (c = 0; c < n; c++){
          if (!can(st, PC, p, c) || !can(st, CT, c, t)) continue;
          any = true;
          if (yes(st, PC, p, c) && yes(st, CT, c, t)) forced = true;
        }
        if (!any) moved = set(st, PT, p, t, -1) || moved;
        else if (forced) moved = set(st, PT, p, t, 1) || moved;
      }
    for (p = 0; p < n; p++)
      for (c = 0; c < n; c++){
        if (!can(st, PC, p, c)) continue;
        var any2 = false, forced2 = false;
        for (t = 0; t < n; t++){
          if (!can(st, PT, p, t) || !can(st, CT, c, t)) continue;
          any2 = true;
          if (yes(st, PT, p, t) && yes(st, CT, c, t)) forced2 = true;
        }
        if (!any2) moved = set(st, PC, p, c, -1) || moved;
        else if (forced2) moved = set(st, PC, p, c, 1) || moved;
      }
    for (c = 0; c < n; c++)
      for (t = 0; t < n; t++){
        if (!can(st, CT, c, t)) continue;
        var any3 = false, forced3 = false;
        for (p = 0; p < n; p++){
          if (!can(st, PC, p, c) || !can(st, PT, p, t)) continue;
          any3 = true;
          if (yes(st, PC, p, c) && yes(st, PT, p, t)) forced3 = true;
        }
        if (!any3) moved = set(st, CT, c, t, -1) || moved;
        else if (forced3) moved = set(st, CT, c, t, 1) || moved;
      }
    return moved;
  }

  function complete(st){
    var n = st.n, k, i, j, count;
    for (k = 0; k < 3; k++)
      for (i = 0; i < n; i++){
        count = 0;
        for (j = 0; j < n; j++) if (st.g[k][i][j] === 1) count++;
        if (count !== 1) return false;
      }
    return true;
  }

  /* Run to a standstill. `trace` records which clue first moved anything on
     each pass, which is what the hint button reads: it can name the clue to
     look at next without saying what it gives you. */
  function solve(n, clues){
    var st = blank(n), trace = [], guard = 0;
    while (!st.dead && guard++ < 400){
      var moved = false;
      for (var i = 0; i < clues.length; i++){
        var before = JSON.stringify(st.g);
        if (CLUE[clues[i].kind](st, clues[i])){
          moved = true;
          if (JSON.stringify(st.g) !== before) trace.push(i);
        }
        if (st.dead) break;
      }
      if (st.dead) break;
      if (lines(st)) moved = true;
      if (st.dead) break;
      if (across(st)) moved = true;
      if (!moved) break;
    }
    return { state: st, solved: !st.dead && complete(st), trace: trace };
  }

  /* ----------------------------------------------------------- the clues */
  function truth(sol, kind, a, b, c){
    /* is this statement true of the answer? */
    var club = sol.club, time = sol.time, owner = sol.owner;
    switch (kind){
      case "is":          return club[a] === b;
      case "isnt":        return club[a] !== b;
      case "at":          return time[a] === b;
      case "notat":       return time[a] !== b;
      case "clubtime":    return time[owner[b]] === c;
      case "notclubtime": return time[owner[b]] !== c;
      case "earlier":     return club[a] !== b && time[a] < time[owner[b]];
      case "later":       return club[a] !== b && time[a] > time[owner[b]];
      case "either":      return club[a] === c || club[b] === c;
      case "neither":     return club[a] !== c && club[b] !== c;
      default:            return false;
    }
  }

  function pool(n, kinds, sol, rnd){
    var out = [], p, q, c, t;
    function push(o){ out.push(o); }
    kinds.forEach(function(kind){
      if (kind === "is" || kind === "isnt")
        for (p = 0; p < n; p++) for (c = 0; c < n; c++)
          if (truth(sol, kind, p, c)) push({ kind: kind, p: p, c: c });
      if (kind === "at" || kind === "notat")
        for (p = 0; p < n; p++) for (t = 0; t < n; t++)
          if (truth(sol, kind, p, t)) push({ kind: kind, p: p, t: t });
      if (kind === "clubtime" || kind === "notclubtime")
        for (c = 0; c < n; c++) for (t = 0; t < n; t++)
          if (truth(sol, kind, null, c, t)) push({ kind: kind, c: c, t: t });
      if (kind === "earlier" || kind === "later")
        for (p = 0; p < n; p++) for (c = 0; c < n; c++)
          if (truth(sol, kind, p, c)) push({ kind: kind, p: p, c: c });
      if (kind === "either" || kind === "neither")
        for (p = 0; p < n; p++) for (q = p + 1; q < n; q++) for (c = 0; c < n; c++)
          if (truth(sol, kind, p, q, c)) push({ kind: kind, p: p, q: q, c: c });
      if (kind === "between")
        for (p = 0; p < n; p++) for (c = 0; c < n; c++) for (var d = 0; d < n; d++)
          if (c !== d && truth(sol, "earlier", p, c) && truth(sol, "later", p, d))
            push({ kind: "between", p: p, c: c, d: d });
    });
    return shuffled(out, rnd);
  }

  /* How many clues is too many is not a matter of taste here: a puzzle is
     meant to be read. The first version dealt 22 clues at five people and
     34 at six, which is a wall of Japanese rather than a puzzle, and the
     cause was the shape of the pool rather than the solver. There are n
     ways to say "the art club practises at four" and n squared ways to say
     "x is not in y", so a uniform shuffle deals mostly the weak ones and
     needs a pile of them to pin anything.

     So clues are drawn a kind at a time, which gives the informative kinds
     the same chance as the chatty ones, the set is then pared back until
     nothing more can go, and the whole thing is tried several times over
     with the smallest kept. */
  function build(n, kinds, sol, rnd){
    var byKind = {};
    pool(n, kinds, sol, rnd).forEach(function(c){
      (byKind[c.kind] = byKind[c.kind] || []).push(c);
    });
    var live = Object.keys(byKind).filter(function(k){ return byKind[k].length; });
    var use = [], r = null, guard = 0;
    var used = {};
    while (live.length && guard++ < 200){
      /* Prefer a kind this puzzle has not leaned on yet. Without this, six
         people came out 42 per cent "between" clues: solvable, correct,
         and four readings of the same long sentence. A student should meet
         は, より, か and も across one puzzle, not one of them four times. */
      var fewest = Math.min.apply(null, live.map(function(x){ return used[x] || 0; }));
      var open = live.filter(function(x){ return (used[x] || 0) === fewest; });
      var k = open[Math.floor(rnd() * open.length)];
      used[k] = (used[k] || 0) + 1;
      use.push(byKind[k].pop());
      if (!byKind[k].length) live = live.filter(function(x){ return x !== k; });
      r = solve(n, use);
      if (r.solved) break;
    }
    if (!r || !r.solved) return null;

    /* pare back until a pass changes nothing: one pass leaves clues that
       only became redundant once a later one was dropped */
    var changed = true;
    while (changed){
      changed = false;
      var order2 = shuffled(use.map(function(_, i){ return i; }), rnd);
      for (var i = 0; i < order2.length; i++){
        var without = use.filter(function(_, j){ return j !== order2[i]; });
        if (without.length === use.length) continue;
        if (solve(n, without).solved){ use = without; changed = true; break; }
      }
    }
    return use;
  }

  function make(n, kinds, seed){
    var rnd = rng(seed), best = null;
    for (var attempt = 0; attempt < 40; attempt++){
      var idx = [], i;
      for (i = 0; i < n; i++) idx.push(i);
      var club = shuffled(idx, rnd), time = shuffled(idx, rnd);
      var owner = [];
      for (i = 0; i < n; i++) owner[club[i]] = i;
      var sol = { club: club, time: time, owner: owner };

      var use = build(n, kinds, sol, rnd);
      if (!use) continue;
      if (!best || use.length < best.clues.length){
        best = { n: n, seed: seed, clues: use, solution: sol };
      }
      /* short enough to read in one go: stop looking */
      if (best.clues.length <= n + 3) break;
    }
    if (!best) return null;
    best.clues = shuffled(best.clues, rnd);
    var fin = solve(n, best.clues);
    if (!fin.solved) return null;
    best.steps = fin.trace.length;
    return best;
  }

  /* an independent count, for the check rather than the page */
  function countSolutions(n, clues, cap){
    var idx = [], i;
    for (i = 0; i < n; i++) idx.push(i);
    var found = 0, first = null;
    function perms(arr, k, cb){
      if (k === arr.length) return cb(arr);
      for (var j = k; j < arr.length; j++){
        var t = arr[k]; arr[k] = arr[j]; arr[j] = t;
        perms(arr, k + 1, cb);
        t = arr[k]; arr[k] = arr[j]; arr[j] = t;
      }
    }
    perms(idx.slice(), 0, function(club){
      var c2 = club.slice();
      perms(idx.slice(), 0, function(time){
        if (cap && found > cap) return;
        var owner = [];
        for (var i2 = 0; i2 < n; i2++) owner[c2[i2]] = i2;
        var sol = { club: c2, time: time.slice(), owner: owner };
        for (var j2 = 0; j2 < clues.length; j2++){
          var cl = clues[j2];
          var ok;
          if (cl.kind === "between")
            ok = truth(sol, "earlier", cl.p, cl.c) && truth(sol, "later", cl.p, cl.d);
          else if (cl.kind === "either" || cl.kind === "neither")
            ok = truth(sol, cl.kind, cl.p, cl.q, cl.c);
          else if (cl.kind === "clubtime" || cl.kind === "notclubtime")
            ok = truth(sol, cl.kind, null, cl.c, cl.t);
          else if (cl.kind === "at" || cl.kind === "notat")
            ok = truth(sol, cl.kind, cl.p, cl.t);
          else ok = truth(sol, cl.kind, cl.p, cl.c);
          if (!ok) return;
        }
        found++;
        if (!first) first = { club: c2.slice(), time: time.slice() };
      });
    });
    return { count: found, first: first };
  }

  window.RONRI_ENGINE = {
    make: make, solve: solve, countSolutions: countSolutions,
    truth: truth, blank: blank, complete: complete, rng: rng,
    /* the page's hint needs to apply one clue to the position a student is
       in. It uses these rather than keeping its own copy: two copies of
       the rules is two chances to disagree about what a clue means. */
    CLUE: CLUE, lines: lines, across: across
  };
})();
