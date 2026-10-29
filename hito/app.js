/* app.js — ひと. Describing people, Year 8.

   Six steps. The first five are checks: they put the words in front of the
   student in different shapes so the vocabulary gets met from more than
   one side. The sixth is the only one that cannot be bluffed, because
   nothing on that screen is in Japanese except what the student types.

   What the marker can and cannot do is the important part. It knows the
   facts about each figure, so it can tell a true sentence from a false
   one and a grammatical one from a broken one, and it says which. It
   cannot tell whether a sentence is natural, interesting or well chosen,
   so when it meets something it does not recognise it says so and sends
   it to the teacher rather than calling it wrong. */
"use strict";
(function(){
  var W = window.HITO_WORDS, P = window.HITO_PEOPLE,
      OF = window.HITO_OUTFITS || { outfits: [] },
      CLIPS = (window.HITO_AUDIO || {}).clips || {};
  var $ = function(id){ return document.getElementById(id); };
  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }
  function each(scope, sel, fn){
    Array.prototype.forEach.call(scope.querySelectorAll(sel), fn);
  }

  /* 漢字[かんじ] in, ruby out. plain() keeps the kanji, kana() takes the
     reading: the marker needs both, because a student may type either. */
  var RUN = /([一-鿿々]+)\[([ぁ-ゟー]+)\]/g;
  function ruby(t){
    return esc(String(t || "")).replace(RUN, function(_, k, r){
      return "<ruby>" + k + "<rt>" + r + "</rt></ruby>";
    });
  }
  function plain(t){ return String(t || "").replace(RUN, "$1"); }
  function kana(t){ return String(t || "").replace(RUN, "$2"); }

  /* ---- the voice ---- */
  var SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYA"
              + "AESsAAACABAAZGF0YQAAAAA=";
  var el0 = null, woken = false;
  function sound(){ if (!el0){ el0 = new Audio(); el0.preload = "auto"; } return el0; }
  function wake(){
    if (woken) return; woken = true;
    var a = sound();
    try {
      a.src = SILENCE; a.muted = true;
      var r = a.play();
      if (r && r.then) r.then(function(){ try { a.pause(); } catch(e){} a.muted = false; })
                        .catch(function(){ a.muted = false; });
      else { try { a.pause(); } catch(e){} a.muted = false; }
    } catch (e){ a.muted = false; }
  }
  ["pointerdown","touchstart","keydown"].forEach(function(ev){
    document.addEventListener(ev, wake, { capture:true, once:true });
  });
  /* ---- は as わ, へ as え ----
     The topic particle は is said わ, and a recorded voice does not always
     work that out: in the oral exam app 高校生は came back with a HA in the
     middle of it. Which は is the particle is not guessed. The Japanese
     here is spaced at the phrase boundaries, so a は that ENDS one of those
     phrases is the particle, and ではなく is the one shape where it sits
     inside a phrase instead. That matters more than it sounds: はいています
     and はしります begin with a は that has to stay one, and a blanket swap
     would have wrecked both.

     Only the sound changes. は is still は everywhere a student can see it. */
  var CHUNKS = /[^\s\u3000、。！？!?「」『』]+/g;
  function particles(t){
    return String(t).replace(CHUNKS, function(c){
      c = c.replace(/では(?=[なあ])/g, "でわ");
      if (/は$/.test(c)) return c.slice(0, -1) + "わ";
      if (/へ$/.test(c)) return c.slice(0, -1) + "え";
      return c;
    });
  }
  function speakable(t){ return particles(plain(t)).replace(/[\s　]+/g, ""); }
  /* onEnd is how the きせかえ step plays a whole outfit: one line, then
     the next when the first has finished. */
  function say(text, onEnd){
    var clip = CLIPS[speakable(text)];
    var a = sound();
    try { a.pause(); } catch (e){}
    a.onended = null;
    if (!clip) return false;
    if (onEnd) a.onended = onEnd;
    a.src = "audio/" + clip;
    /* After the src and not before: changing the source resets the rate
       on Safari, which is most of the phones this runs on. */
    try { a.playbackRate = S.rate; } catch (e){}
    var r = a.play();
    if (r && r.catch) r.catch(function(){});
    return true;
  }
  function hush(){
    var a = sound();
    a.onended = null;
    try { a.pause(); } catch (e){}
  }
  document.body.classList.toggle("hasvoice", !!Object.keys(CLIPS).length);
  function saybtn(text){
    return '<button class="say" data-say="' + esc(speakable(text))
         + '" aria-label="Listen">▶</button>';
  }

  /* ---- what the device remembers, on this device only ---- */
  var KEY = "hito-v1";
  var S = { furi:true, en:true, sfx:true, rate:1, dressText:false,
            pts:0, spent:0, best:0, done:{}, won:{}, wrote:{}, howto:{} };
  try { var raw = localStorage.getItem(KEY); if (raw){
    var o = JSON.parse(raw); for (var k in S) if (o[k] !== undefined) S[k] = o[k];
  } } catch (e){}
  var saveT = null;
  function write(){
    clearTimeout(saveT); saveT = null;
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e){}
  }
  function save(){ clearTimeout(saveT); saveT = setTimeout(write, 200); }
  /* The write waits 200ms so that typing does not hit localStorage on
     every keystroke. That was harmless when the only thing at stake was
     a tick; with a score on the page it means a student who closes the
     tab the moment the number moves loses the point they just earned.
     So the wait is cut short on the way out. pagehide fires on a real
     navigation and visibilitychange is the one an iPad sends when the
     app is swiped away, so both are listened for. */
  window.addEventListener("pagehide", write);
  document.addEventListener("visibilitychange", function(){
    if (document.visibilityState === "hidden") write();
  });
  function paintToggles(){
    /* Twenty-five devices groaning at once is a classroom problem, so
       the noise has a switch. It governs the drum tick as well. */
    $("rateLabel").textContent = "\u00d7" + S.rate;
    $("rateBtn").classList.toggle("off", S.rate !== 1);
    $("sfxBtn").classList.toggle("off", !S.sfx);
    $("sfxBtn").setAttribute("aria-pressed", S.sfx ? "true" : "false");
    document.body.classList.toggle("nofuri", !S.furi);
    document.body.classList.toggle("noen", !S.en);
    $("furiBtn").classList.toggle("off", !S.furi);
    $("enBtn").classList.toggle("off", !S.en);
    $("ptsn").textContent = S.pts;
    $("pts").title = S.spent
      ? S.pts + " points. " + S.spent + " spent on support."
      : S.pts + " points, nothing spent on support yet.";
  }

  /* ---- the score ----
     The same rules as れきしの人, so a student who has used that app
     already knows this one: a point is paid for the first time an item
     is answered right and never again, every support costs, and nothing
     is ever locked. Points only leave through spend().

     Awarding once per item is the whole of it. The steps here deal from
     a deck and run forever, so a score that counted every right answer
     would measure patience and not Japanese: the fastest way to the top
     would be to answer the same six words all lesson.

     NOTHING IS RECORDED AND NOTHING IS SENT. The score lives in this
     browser. Save writes a line of text they can screenshot. */
  var tipT = null;
  function flash(cls, text){
    var t = $("ptstip");
    if (!t) return;
    t.className = cls;
    t.textContent = text;
    clearTimeout(tipT);
    tipT = setTimeout(function(){ t.textContent = ""; }, 4000);
  }
  function award(n, why){
    S.pts += n; save(); paintToggles();
    flash("up", "+" + n + (why ? " " + why : ""));
  }
  function spend(n, why){
    S.pts = Math.max(0, S.pts - n); S.spent += n; save(); paintToggles();
    flash("down", "\u2212" + n + " " + why);
  }
  /* Paid once, on the first time this exact item goes right. The ledger
     is saved, so a reload does not hand the same points over again. */
  function first(key, n, why){
    if (S.won[key]) return false;
    S.won[key] = 1; award(n, why); return true;
  }
  function once(key, n, why){
    if (S.won[key]) return false;
    S.won[key] = 1; spend(n, why); return true;
  }
  $("furiBtn").onclick = function(){ S.furi = !S.furi; paintToggles(); save(); };
  $("enBtn").onclick = function(){ S.en = !S.en; paintToggles(); save(); };
  /* Three speeds, in the bar rather than a settings page, because 0.7 is
     how you catch a word you missed at full speed and it gets reached for
     many times in a sitting. The recordings are one fixed voice, so the
     speed is the only thing about them left worth changing. */
  var RATES = [0.7, 1, 1.2];
  $("rateBtn").onclick = function(){
    S.rate = RATES[(RATES.indexOf(S.rate) + 1) % RATES.length] || 1;
    save(); paintToggles();
    /* Say something at the new speed, or the button is a number that
       changes and nothing else. It used to say whichever word happened
       to sit first in the list, which told a student the speed had
       changed but not what the change was for. はなすスピード names the
       thing it is demonstrating, and it is the same line in れきしの人
       and the oral exam app, so the button behaves the same way
       wherever a student meets it. */
    var line = ((W.ui || [])[0] || {}).ja;
    if (line) say(line);
  };
  $("sfxBtn").onclick = function(){
    S.sfx = !S.sfx; save(); paintToggles();
    if (S.sfx) CLICK.whoosh();          /* so you can hear what you turned on */
  };
  $("resetBtn").onclick = function(){
    if (!confirm("Clear your score, your ticks and anything typed on this device?")) return;
    S.pts = 0; S.spent = 0; S.best = 0; S.done = {}; S.won = {}; S.wrote = {};
    save(); draw();
  };
  /* Nothing is recorded anywhere, so the only way to show somebody is to
     take it with you. A line of text they can screenshot or paste. */
  $("saveBtn").onclick = function(){
    var rungs = 0;
    STEPS.forEach(function(st){ if (S.done[st.id]) rungs++; });
    var line = "\u3072\u3068 \u00b7 " + S.pts + " points"
      + (S.spent ? " (" + S.spent + " spent on support)" : " with no support used")
      + " \u00b7 " + rungs + " of " + STEPS.length + " steps done"
      + " \u00b7 " + new Date().toLocaleDateString("en-AU");
    var ta = document.createElement("textarea");
    ta.value = line;
    ta.style.cssText = "position:fixed;inset:auto 10px 10px 10px;z-index:90;"
      + "height:72px;font-size:15px;padding:9px;border:2px solid #16375e;border-radius:9px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e){}
    alert("Copied, and shown at the bottom of the screen so you can screenshot it:\n\n"
      + line + "\n\nNothing is sent anywhere. This is the only record there is.");
    setTimeout(function(){ ta.remove(); }, 20000);
  };

  function shuffle(a){
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---- the figures ----
     Drawn from the facts, so the picture and the answer key cannot drift
     apart. Nothing here is a photograph of anybody.

     A whole person: head, arms, hands, legs, shoes. The hair is a cap that
     sits on top of the skull and stops above the eyes, with long hair
     falling behind the shoulders in two masses drawn before the head so
     they pass behind it. Hair that wraps under the chin reads as a beard,
     which is how the first attempt went wrong.

     One drawing, scaled about the feet, so "tall" and "not tall" are the
     same person at two sizes rather than two different builds. The clothing
     slots take a colour each and default to plain grey. */
  var SKIN = "#f2d9c0", SKINL = "#d9b89a";
  /* opts.bare    an empty slot is drawn as an empty outline rather than
                   a grey garment, so a figure with nothing on reads as
                   undressed and not as dressed in grey.
     opts.zones    the six places something can be put, as hit targets
                   inside the drawing. A label goes on the ones that hold
                   something, because シャツ, Tシャツ and セーター draw the
                   same and no drawing is going to tell them apart. */
  function figure(p, h, opts){
    var f = p.facts, O = opts || {};
    var hair = f.colour === "black" ? "#2d2a28" : "#7a5230";
    var HEX = W.colour_hex || {};
    var c = f.clothes || {};
    function col(slot, fallback){
      return (c[slot] && HEX[c[slot][1]]) || fallback;
    }
    var EMPTY = "#ffffff";
    var top = col("top", O.bare && !c.top ? EMPTY : "#9aa9b8"),
        legs = col("bottom", O.bare && !c.bottom ? EMPTY : "#55606e"),
        shoe = col("shoes", O.bare && !c.shoes ? EMPTY : "#363d47");
    /* An empty outline is dashed, so it reads as a place for something
       rather than as a white garment. しろい is a colour in this unit. */
    function dash(slot){
      return (O.bare && !c[slot]) ? ' stroke-dasharray="5 4"' : "";
    }
    /* Every garment is outlined. Without it しろい disappears into the
       card and a white shirt cannot be described, let alone marked. */
    var E = ' stroke="rgba(20,25,32,.3)" stroke-width="1.2"';
    var skirt = c.bottom && /スカート/.test(c.bottom[0]);
    var cx = 60, foot = 232, g = [];

    /* behind everything: long hair down past the shoulders */
    if (f.hair === "long"){
      g.push('<path d="M36 44 q-9 60 -4 104 q14 7 18 -2 q-7 -48 -2 -98 z"'
        + ' fill="' + hair + '"/>');
      g.push('<path d="M84 44 q9 60 4 104 q-14 7 -18 -2 q7 -48 2 -98 z"'
        + ' fill="' + hair + '"/>');
    }
    /* legs, then shoes */
    if (skirt){
      g.push('<path d="M44 138 h32 l10 38 h-52 z" fill="' + legs + '"' + E
        + dash("bottom") + '/>');
      g.push('<rect x="48" y="174" width="9" height="50" rx="4.5" fill="'
        + SKIN + '"/>');
      g.push('<rect x="63" y="174" width="9" height="50" rx="4.5" fill="'
        + SKIN + '"/>');
    } else {
      g.push('<rect x="45" y="138" width="12" height="86" rx="6" fill="' + legs + '"'
        + E + dash("bottom") + '/>');
      g.push('<rect x="63" y="138" width="12" height="86" rx="6" fill="' + legs + '"'
        + E + dash("bottom") + '/>');
    }
    g.push('<ellipse cx="49" cy="' + foot + '" rx="11" ry="6" fill="' + shoe + '"'
      + E + dash("shoes") + '/>');
    g.push('<ellipse cx="71" cy="' + foot + '" rx="11" ry="6" fill="' + shoe + '"'
      + E + dash("shoes") + '/>');
    /* arms outside the body, not behind it, or all you see is hands */
    g.push('<rect x="24" y="84" width="11" height="60" rx="5.5" fill="' + top + '"'
      + E + dash("top") + '/>');
    g.push('<rect x="85" y="84" width="11" height="60" rx="5.5" fill="' + top + '"'
      + E + dash("top") + '/>');
    g.push('<circle cx="29.5" cy="148" r="6" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    g.push('<circle cx="90.5" cy="148" r="6" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    /* neck and body */
    g.push('<rect x="54" y="63" width="12" height="20" fill="' + SKIN
      + '" stroke="' + SKINL + '" stroke-width="1"/>');
    g.push('<path d="M37 142 q-1 -48 5 -55 q9 -5 18 -5 q9 0 18 5 q6 7 5 55 z"'
      + ' fill="' + top + '"' + E + dash("top") + '/>');
    /* head */
    g.push('<circle cx="' + cx + '" cy="44" r="25" fill="' + SKIN
      + '" stroke="' + SKINL + '" stroke-width="1.5"/>');
    /* ears */
    g.push('<circle cx="35.5" cy="46" r="5" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    g.push('<circle cx="84.5" cy="46" r="5" fill="' + SKIN + '" stroke="'
      + SKINL + '" stroke-width="1"/>');
    /* the hair cap: over the skull, stopping above the eyes */
    g.push('<path d="M35 44 a25 25 0 0 1 50 0 q-4 -6 -11 -7 q-14 5 -28 2'
      + ' q-7 1 -11 5 z" fill="' + hair + '"/>');
    if (f.hair === "short")
      g.push('<path d="M35 44 q0 8 2 12 q-5 -9 -2 -16 z M85 44 q0 8 -2 12'
        + ' q5 -9 2 -16 z" fill="' + hair + '"/>');
    /* face */
    var er = f.eyes === "big" ? 5 : 2.6;
    g.push('<circle cx="51" cy="47" r="' + er + '" fill="#242f3a"/>');
    g.push('<circle cx="69" cy="47" r="' + er + '" fill="#242f3a"/>');
    if (f.eyes === "big"){
      g.push('<circle cx="52.4" cy="45.4" r="1.6" fill="#fff"/>');
      g.push('<circle cx="70.4" cy="45.4" r="1.6" fill="#fff"/>');
    }
    g.push('<path d="M58 52 q2 3 4 0" fill="none" stroke="' + SKINL
      + '" stroke-width="1.6" stroke-linecap="round"/>');
    g.push('<path d="M53 58 q7 5 14 0" fill="none" stroke="#a9705c"'
      + ' stroke-width="2" stroke-linecap="round"/>');
    if (f.glasses){
      g.push('<g fill="none" stroke="#2f3b47" stroke-width="2">'
        + '<circle cx="51" cy="47" r="9"/><circle cx="69" cy="47" r="9"/>'
        + '<path d="M60 47h0.5"/><path d="M42 45 l-6 -2"/>'
        + '<path d="M78 45 l6 -2"/></g>');
    }
    if (c.hat){
      var hc = col("hat", "#8a5a2b");
      g.push('<path d="M36 30 a24 24 0 0 1 48 0 z" fill="' + hc + '"' + E + '/>'
        + '<rect x="29" y="28" width="62" height="5" rx="2.5" fill="' + hc + '"'
        + E + '/>');
    }
    /* a watch sits on the wrist, so it has somewhere to be seen */
    if (c.extra && /とけい/.test(c.extra[0]))
      g.push('<rect x="84" y="138" width="13" height="7" rx="2" fill="#2f3b47"/>'
        + '<circle cx="90.5" cy="141.5" r="3.4" fill="#d9dee4" stroke="#2f3b47"'
        + ' stroke-width="1"/>');

    /* ---- the six places something can go ----
       Inside the drawing rather than floating over it, so they scale with
       it and a finger lands where it looks like it is landing. The wrist
       comes last: it sits over the edge of the body and whichever is last
       is the one a drop finds. */
    if (O.zones){
      var Z = [
        { k:"body",  x:22, y:72,  w:76, h:66 },
        { k:"legs",  x:36, y:139, w:48, h:40 },
        { k:"feet",  x:31, y:219, w:58, h:24 },
        { k:"head",  x:28, y:13,  w:64, h:26 },
        { k:"eyes",  x:36, y:37,  w:48, h:22 },
        { k:"wrist", x:79, y:131, w:28, h:22 }
      ];
      var L = O.labels || {};
      Z.forEach(function(z){
        g.push('<rect class="zone' + (L[z.k] ? " full" : "") + '" data-zone="'
          + z.k + '" x="' + z.x + '" y="' + z.y + '" width="' + z.w
          + '" height="' + z.h + '" rx="7" fill="#16375e" fill-opacity="0"/>');
      });
      Z.forEach(function(z){
        if (!L[z.k]) return;
        var cxz = z.x + z.w / 2, cyz = z.y + z.h / 2;
        var wpx = Math.max(26, String(L[z.k]).length * 11 + 8);
        g.push('<rect class="ztag" x="' + (cxz - wpx / 2) + '" y="' + (cyz - 8)
          + '" width="' + wpx + '" height="16" rx="8"/>'
          + '<text class="ztxt" x="' + cxz + '" y="' + (cyz + 4) + '">'
          + esc(L[z.k]) + '</text>');
      });
    }

    /* tall and not tall are the same figure at two sizes, pinned at the
       feet so both stand on the same ground */
    var k = f.tall ? 1 : 0.84;
    return '<svg class="fig" viewBox="0 0 120 240" role="img" aria-label="'
      + esc(p.name) + '"' + (h ? ' style="max-height:' + h + 'px"' : '') + '>'
      + '<g transform="translate(' + cx + ' ' + foot + ') scale(' + k
      + ') translate(' + (-cx) + ' ' + (-foot) + ')">' + g.join("") + '</g>'
      + '</svg>';
  }

  /* ---- the facts, and the sentences that are true of them ----
     One table. The exercises read it, and so does the marker.

     Each fact says whether the drawing shows it. Hair, eyes, height,
     glasses and every garment are drawn; what someone is like is not,
     and no drawing of a face can say 親切 or まじめ. A step that asks a
     student to pick a person out of six from a personality is asking
     them to read character off a face, which is worse than merely
     unanswerable, so だれですか takes its clues from the seen facts only. */
  function factsOf(p){
    var f = p.facts, out = [];
    out.push({ id:"hair",
      ja: f.hair === "long" ? "かみが 長[なが]いです。" : "かみが 短[みじか]いです。",
      re: f.hair === "long" ? /かみが(ながい|長い)です/ : /かみが(みじかい|短い)です/,
      wrong: f.hair === "long" ? /かみが(みじかい|短い)です/ : /かみが(ながい|長い)です/,
      look: "the hair", seen: true });
    out.push({ id:"colour",
      ja: f.colour === "black" ? "かみが くろいです。" : "かみが ちゃいろいです。",
      re: f.colour === "black" ? /かみがくろいです/ : /かみがちゃいろいです/,
      wrong: f.colour === "black" ? /かみがちゃいろいです/ : /かみがくろいです/,
      look: "the colour of the hair", seen: true });
    out.push({ id:"eyes",
      ja: f.eyes === "big" ? "目[め]が 大[おお]きいです。" : "目[め]が 小[ちい]さいです。",
      re: f.eyes === "big" ? /(め|目)が(おおきい|大きい)です/ : /(め|目)が(ちいさい|小さい)です/,
      wrong: f.eyes === "big" ? /(め|目)が(ちいさい|小さい)です/ : /(め|目)が(おおきい|大きい)です/,
      look: "the eyes", seen: true });
    out.push({ id:"tall",
      ja: f.tall ? "せが 高[たか]いです。" : "せが 高[たか]くないです。",
      re: f.tall ? /せが(たかい|高い)です/ : /せが(たかくない|高くない)です/,
      wrong: f.tall ? /せが(たかくない|高くない)です/ : /せが(たかい|高い)です/,
      look: "how tall they are", seen: true });
    if (f.glasses)
      out.push({ id:"glasses", ja:"めがねを かけています。",
        re:/めがねをかけています/, wrong:null, look:"the glasses",
        seen: true });
    /* clothing. The phrase in front of the garment is the point: an
       い colour goes straight on, a noun colour needs の. Both spellings
       are accepted because the colour words are kana either way. */
    var cl = f.clothes || {};
    function colourKind(name){
      var found = null;
      W.words.forEach(function(x){ if (x.kana === name) found = x; });
      return found && found.kind === "i" ? "i" : "no";
    }
    function phrase(colour, item){
      return colour + (colourKind(colour) === "i" ? " " : "\u306e ") + item;
    }
    /* A clothing sentence cannot be matched with a pattern that makes the
       colour optional: that waves through both a stray の and the wrong
       colour, which is the one thing this step exists to catch. So read
       what sits immediately before the garment, and judge that. */
    var ALLCOL = W.words.filter(function(x){ return x.group === "colour"; })
                        .map(function(x){ return x.kana; })
                        .sort(function(a, b){ return b.length - a.length; });
    [["top", "kiru"], ["bottom", "haku"], ["shoes", "haku"],
     ["hat", "kaburu"], ["extra", "suru"]].forEach(function(pair){
      var slot = cl[pair[0]];
      if (!slot) return;
      var item = slot[0], colour = slot[1];
      var verb = (W.verbs[pair[1]] || {}).ja;
      var ja = (colour ? phrase(colour, item) : item) + "\u3092 " + verb + "\u3002";
      var tail = item + "\u3092" + verb;
      out.push({ id:"c-" + pair[0], ja: ja, look:"what they are wearing",
        seen: true,
        judge: function(ln){
          var i = ln.indexOf(tail);
          if (i < 0) return null;
          var before = ln.slice(0, i).replace(/^.*?\u306f/, "");
          if (!before || !colour) return true;
          for (var n = 0; n < ALLCOL.length; n++){
            var c = ALLCOL[n], isI = colourKind(c) === "i";
            if (before === c + "\u306e")
              return isI
                ? { msg: c + " is an \u3044 colour, so it goes straight in front "
                    + "of " + item + " with no \u306e." }
                : (c === colour ? true
                   : { msg: "Good Japanese, but look again: that " + item
                       + " is " + colour + ", not " + c + "." });
            if (before === c)
              return !isI
                ? { msg: c + " is a noun, so it needs \u306e before " + item + "." }
                : (c === colour ? true
                   : { msg: "Good Japanese, but look again: that " + item
                       + " is " + colour + ", not " + c + "." });
          }
          return { msg: "Something is in front of " + item
            + " that is not one of the colour words." };
        } });
    });
    p.traits.forEach(function(t){
      var tr = P.traits[t];
      out.push({ id:"t-" + t,
        ja: plain(tr.ja) + "です。",
        re: new RegExp("(" + kana(tr.ja) + "|" + plain(tr.ja) + ")です"),
        wrong: null, look:"what they are like", seen: false, en: tr.en });
    });
    return out;
  }

  /* ================= the steps ================= */
  /* だれですか opens, because the problem should arrive before the method:
     a student meets the six and tries to tell them apart before anybody
     has taught them a word. The writing step stays last. */
  /* ================= the drum, and the creatures =================
     Both lifted from the oral examination app, which is where the drum
     was written and tuned. Nothing here is a second implementation: the
     physics, the tick and the reduced-motion path are the same code, so
     a fix in one is a fix the other should get too.

     Why a drum and not a Wheel of Fortune: on a wheel the labels sit at
     every angle and shrink to fit a wedge, which is the wrong thing to
     do to words a student is still learning to read. On a drum they
     stay horizontal and full size. */
  var REEL = (function(){
    var H = 64, raf = 0;
    function cancel(){ if (raf) cancelAnimationFrame(raf); raf = 0; }

    function mount(box, items, onLand){
      var L = items.length, SPAN = L * H;
      var win = box.querySelector(".rwin"), strip = box.querySelector(".rstrip");
      var three = "";
      for (var c = 0; c < 3; c++){
        three += items.map(function(it){
          return '<div class="ritem"><b>' + it.html + '</b>'
               + (it.sub ? '<i>' + it.sub + '</i>' : '') + '</div>';
        }).join("");
      }
      strip.innerHTML = three;

      /* How long the drum runs is this pair of numbers and nothing else.
         It used to lose speed at 2.4 a second with 90 of friction on top,
         which brought even the hardest flick to rest in about 1.3 seconds:
         a flick, not a spin. At 0.8 and 45 the same throw runs for three
         to four seconds, which is what a wheel does. */
      /* ---- how it winds down ----
         0.8 and 45 threw away 56% of the speed in the first second and
         crawled through the rest, which is an air brake and not a wheel.
         A heavy thing that is spinning loses speed at close to a steady
         rate, so most of the friction here is the constant and only a
         quarter of it rises with the speed. From a middling throw the
         drum now reads 6000, 4050, 3243, 2532, 1904, 1350, 862, 431 at
         each half second: an even wind-down you can watch, instead of a
         lurch and a long crawl. */
      var SLOW = 0.25, DRAG = 700, CATCH = 300, K = 150, C = 16;
      var pos = 0, v = 0, target = null, last = 0;
      var spinning = false;

      function wrap(x){ return ((x % SPAN) + SPAN) % SPAN; }
      function paint(){
        strip.style.transform =
          "translate3d(0," + (H - SPAN - wrap(pos)).toFixed(2) + "px,0)";
      }
      function at(){ return Math.round(wrap(pos) / H) % L; }
      /* The sound is the speed. The drum hands over the speed and how far
         apart the notches are, and CLICK works out the rest: one click per
         two items, because a notch per item at six turns a second is 230
         clicks a second and the ear hears a tone, not a wheel. */
      function ticks(speed){
        if (!(speed > 1)) return;
        CLICK.ratchet(speed, 2 * H);
      }
      function done(){
        CLICK.clunk();
        spinning = false;
        box.classList.remove("spinning");
        if (onLand) onLand(items[at()], at());
      }
      /* ---- a fixed step ----
         The physics used to advance by however long the last frame took,
         which is the ordinary way to animate and the wrong way to do this.
         The speed that lands on a given slot is worked out by running the
         same sums forward at a sixtieth of a second a step; if the drum
         itself then advances in steps of whatever the browser gave it,
         1/60 here and 1/120 on a tablet and 1/40 under load, it travels a
         slightly different distance and stops a slot or two from where it
         was sent. Nothing looked wrong, which is the worst kind of wrong:
         the drum simply landed on a different topic from the one the deck
         had dealt, and the deck then dealt that topic again.

         So time is accumulated and spent in whole steps of a sixtieth,
         and what is left over waits for the next frame. The drum now lands
         exactly where it was thrown, on any screen, under any load. The
         guard stops a tab that has been asleep for a minute from
         fast-forwarding through a thousand steps when it wakes. */
      var STEP = 1 / 60, acc = 0;
      function step(dt){
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
          step(STEP); acc -= STEP;
          if (target !== null && Math.abs(pos - target) < 0.4 && Math.abs(v) < 8){
            pos = target; v = 0; acc = 0;
            paint(); done(); return;
          }
        }
        paint(); ticks(Math.abs(v));
        raf = requestAnimationFrame(frame);
      }
      function launch(v0){
        cancel();
        target = null; v = v0; last = 0; acc = 0;
        spinning = true;
        box.classList.add("spinning");
        /* ---- the drum spins for everybody ----
           This used to hand a device with reduced motion a three slot
           glide lasting under half a second. That one branch was why
           Andrew could not see a spin or hear the clicks however many
           times the physics and the sound were fixed: the branch never
           ran either of them. On a school laptop with the setting on
           system wide, the whole class gets the same dead control.

           Reduced motion is about movement a person did not ask for and
           cannot predict. A drum is a control whose entire function is
           to spin, and it moves because the student pressed it. So the
           spin stays, for everybody, with its clicks. The decoration
           that setting is actually for — the ninja and the かさおばけ
           crossing the screen — is where this app answers it, by fading
           them in place rather than flying them past. */
        raf = requestAnimationFrame(frame);
      }

      /* A flick, for a finger. The velocity is taken from the last few
         milliseconds rather than the whole gesture, so a slow drag that
         ends in a snap throws the drum and a slow drag that ends still
         does not. */
      var grab = null;
      win.addEventListener("pointerdown", function(ev){
        cancel(); spinning = false; box.classList.remove("spinning");
        v = 0; target = null;
        grab = { y:ev.clientY, pos:pos, t:performance.now(),
                 ly:ev.clientY, lt:performance.now(), v:0, moved:0 };
        try { win.setPointerCapture(ev.pointerId); } catch (e){}
      });
      win.addEventListener("pointermove", function(ev){
        if (!grab) return;
        ev.preventDefault();
        pos = grab.pos - (ev.clientY - grab.y);
        grab.moved += Math.abs(ev.clientY - grab.ly);
        var now = performance.now(), dt = now - grab.lt;
        if (dt > 4){
          grab.v = -(ev.clientY - grab.ly) / dt * 1000;
          grab.ly = ev.clientY; grab.lt = now;
          grab.mouse = ev.pointerType === "mouse";
        }
        paint(); ticks(Math.abs(grab.v));
      });
      function release(){
        if (!grab) return;
        /* A hand can flick; a mouse cannot. The same gesture drags a
           cursor at perhaps a third the speed of a thumb, so a mouse
           throw is scaled up to land in the same range. The button on the
           rim is there because even scaled, dragging a mouse is a poor way
           to throw anything. */
        var fling = grab.v * (grab.mouse ? 2.2 : 1);
        var stale = performance.now() - grab.lt > 130;
        grab = null;
        if (stale || Math.abs(fling) < 130){ launch(0); return; }
        launch(Math.max(-7000, Math.min(7000, fling)));
      }
      win.addEventListener("pointerup", release);
      win.addEventListener("pointercancel", release);

      /* ---- which word it stops on ----
         The button used to throw a random amount of energy from wherever
         the drum happened to be sitting, which is not the same thing as
         picking a word. The distance a throw covers barely varied, so one
         spin landed a fairly predictable way along from the last, a word
         could come up twice running, and a word could sit there all lesson
         and never come up at all.

         Two things fix that. The order of the drum is rebuilt at the start
         of every button spin, while it is already moving and nobody can
         read it. And the caller names the word it wants, which it takes
         from a deck, so every word comes up before any comes up twice.

         The throw is then solved rather than guessed: run the same physics
         forward for a few hundred candidate speeds, keep the ones that stop
         on the wanted word after three to four and a half seconds, and pick
         one of those at random. The drum is not steered or stopped early;
         it is thrown at exactly the speed that lands it there, the way a
         croupier learns to. */
      function reorder(){
        shuffle(items);
        var three = "";
        for (var c = 0; c < 3; c++){
          three += items.map(function(it){
            return '<div class="ritem"><b>' + it.html + '</b>'
                 + (it.sub ? '<i>' + it.sub + '</i>' : '') + '</div>';
          }).join("");
        }
        strip.innerHTML = three;
        paint();
      }
      /* the same integration as frame(), run forward with no drawing */
      function dryRun(v0){
        var p = 0, u = v0, t = 0, dt = 1 / 60;
        while (u > CATCH && t < 12){
          u -= (SLOW * u + DRAG) * dt;
          if (u < 0) u = 0;
          p += u * dt;
          t += dt;
        }
        return { slot: Math.round(p / H), secs: t + 0.3 };   /* 0.3 to settle */
      }
      /* The window the throw has to land in. Wide, because the speeds that
         stop on a given word come in clusters, one per extra turn of the
         drum: a narrow window leaves two or three of them and every spin
         takes the same time as the last. */
      var MINS = 2.8, MAXS = 5.0;
      function throwTo(slot){
        var from = Math.round(pos / H), want = ((slot % L) + L) % L, hits = [];
        /* Gentler friction means a four second spin starts slower, so the
           search starts lower, and in finer steps, because the speeds that
           stop on one word are rarer when fewer of them are in range. */
        for (var v0 = 1800; v0 <= 15000; v0 += 10){
          var r = dryRun(v0);
          if (r.secs < MINS || r.secs > MAXS) continue;
          if ((((from + r.slot) % L) + L) % L === want) hits.push(v0);
        }
        if (!hits.length) return launch(3400 + Math.random() * 3000);
        launch(hits[Math.floor(Math.random() * hits.length)]);
      }

      paint();
      return {
        /* A free spin, for when nothing has asked for a particular word. */
        spin: function(){ reorder(); launch(3200 + Math.random() * 3600); },
        /* Spin and land on this one. */
        spinTo: function(id){
          reorder();
          var i = 0;
          items.forEach(function(it, n){ if (it.id === id) i = n; });
          throwTo(i);
        },
        at: at,
        spinning: function(){ return spinning; }
      };
    }
    return { mount: mount, cancel: cancel };
  })();

  var CLICK = (function(){
    var ctx = null, noise = null, hiss = null;
    function build(){
      if (ctx) return ctx;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      var n = Math.floor(ctx.sampleRate * 0.06);
      noise = ctx.createBuffer(1, n, ctx.sampleRate);
      var d = noise.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      /* The clack's buffer has a fade baked in so it can be a strike.
         The whoosh needs the opposite: flat noise it can shape itself. */
      var hn = Math.floor(ctx.sampleRate * 0.5);
      hiss = ctx.createBuffer(1, hn, ctx.sampleRate);
      var hd = hiss.getChannelData(0);
      for (var j = 0; j < hn; j++) hd[j] = Math.random() * 2 - 1;
      return ctx;
    }
    /* ---- the clack ----
       One notch going past a pawl. It was a single band of noise at
       1750Hz, which is a hiss, not a click, and every one of them was
       identical, which is a machine and not a wheel.

       A real one is two things at once: the strike, which is a very short
       burst of noise with the low end taken off, and the body, which is
       the rim ringing for a few hundredths of a second after it. Both are
       needed. The strike alone is a tick on a watch; the body alone is a
       marimba.

       Every click is a little different. The pitch moves by up to a tone
       either way and the level by a fifth, because thirty identical clicks
       in a row stop sounding like wood and start sounding like a buzzer. */
    function clack(at, loud){
      var c = ctx; if (!c) return;
      /* Andrew could not hear these twice over. The first cause was the
         rate, and this is the other half: a 16ms click at 2600Hz through
         a laptop speaker at a third of full scale is not much. Half of
         full scale, and a clack decays long before the next one is due,
         so nothing stacks. */
      var vol = Math.max(0.08, Math.min(0.5, loud));
      var jit = 0.88 + Math.random() * 0.26;

      var src = c.createBufferSource(); src.buffer = noise;
      var hp = c.createBiquadFilter();
      hp.type = "bandpass"; hp.frequency.value = 2600 * jit; hp.Q.value = 2.2;
      var g1 = c.createGain();
      g1.gain.setValueAtTime(0.0001, at);
      g1.gain.exponentialRampToValueAtTime(vol, at + 0.001);
      g1.gain.exponentialRampToValueAtTime(0.0001, at + 0.016);
      src.connect(hp); hp.connect(g1); g1.connect(c.destination);
      src.start(at); src.stop(at + 0.02);

      var o = c.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(1150 * jit, at);
      o.frequency.exponentialRampToValueAtTime(820 * jit, at + 0.03);
      var g2 = c.createGain();
      g2.gain.setValueAtTime(0.0001, at);
      g2.gain.exponentialRampToValueAtTime(vol * 0.7, at + 0.002);
      g2.gain.exponentialRampToValueAtTime(0.0001, at + 0.034);
      o.connect(g2); g2.connect(c.destination);
      o.start(at); o.stop(at + 0.04);
    }
    /* ---- the ratchet ----
       The first attempt counted the notches a frame had crossed and
       booked that many clicks, each batch starting at "now" on the audio
       clock. Every frame therefore started a new batch on top of the one
       still playing, and at speed the batches overlapped into a mush that
       did not change as the drum slowed. Which is the whole point of the
       sound: you should hear it slowing before you see it.

       So there is one cursor on the audio clock and the clicks go on it
       in order, never on top of each other. The spacing is the time it
       actually takes a notch to pass the window, H over the speed, which
       is why the rate falls away exactly as the drum does: at 6000 a
       second that is a click every eleven milliseconds, at 600 a second
       one every hundred, and at walking pace they come one at a time.

       The floor is there because a notch every five milliseconds is a
       buzz rather than a ratchet, and the ceiling because a drum that
       has all but stopped should fall silent rather than tick once more
       a second later. */
    /* ---- how fast the clicks come ----
       It used to be one click per notch, floored at 62 a second. Two
       things were wrong with that. 62 a second is above the rate at which
       an ear stops hearing separate clicks and starts hearing a pitch, so
       the top of every spin was a buzz. And because the floor was a hard
       maximum, the rate sat ON it for the first two thirds of the spin and
       only began to change near the end: the drum visibly slowed for
       seconds while the sound did not move.

       So the floor is added rather than imposed. The gap is always the
       time a notch takes to cross the window PLUS a fixed minimum, which
       means the rate changes the whole way down and never passes about 20
       a second. From a middling throw it now runs 18, 16, 14, 12, 10, 8,
       6, 3 clicks a second: you hear it slowing from the first half
       second, which is the part Andrew asked for and the part that was
       missing. */
    var FLOOR = 0.03, CEIL = 0.55, NOTCH = 128, cursor = 0;
    function ratchet(speed, notch){
      if (!S.sfx || !(speed > 0)) return;
      var gap = FLOOR + (notch || NOTCH) / speed;
      if (gap > CEIL) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime;
        if (cursor < t) cursor = t + 0.004;
        /* quieter when it is flying, fuller as it comes to rest: a wheel
           is loudest at the end, which is where the ear is anyway */
        var loud = 0.5 - Math.min(0.22, (speed || 0) / 34000);
        /* only ever a frame or two ahead, so a drum that stops does not
           leave a queue of clicks still to play */
        for (var guard = 0; cursor < t + 0.05 && guard < 6; guard++){
          clack(cursor, loud);
          cursor += gap;
        }
      } catch (e){}
    }
    /* the one at the end, when it drops into the slot */
    function clunk(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = Math.max(c.currentTime + 0.004, cursor);
        clack(t, 0.4);
        cursor = t + 0.02;
      } catch (e){}
    }
    /* Built inside the press that starts the spin, not inside the frame
       loop that follows it: a browser is readier to start an audio engine
       during a gesture than a tenth of a second afterwards. */
    function wakeAudio(){
      try {
        var c = build();
        if (c && c.state === "suspended") c.resume();
        return c;
      } catch (e){ return null; }
    }
    /* one tap, one click: the UI tick, not the wheel */
    function play(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        clack(c.currentTime + 0.004, 0.26);
      } catch (e){}
    }
    /* ---- the whoosh and the warble ----
       Both synthesised rather than fetched: the page has to work on a
       tram, and two more files to download for two sound effects is not
       a trade worth making.

       The whoosh is noise through a bandpass whose centre frequency
       sweeps up and then falls away, which is what a thing moving past
       your ear actually does to the spectrum. Short, 220ms, because a
       ninja that takes a second is not a ninja.

       The warble is the かさおばけ, and it is below. */
    /* ---- the whoosh ----
       Third go, and this time it was measured rather than described.
       Rendered offline and compared with the drum's own click: the
       whoosh peaked at an RMS of 0.037 and was audible for a tenth of a
       second, against 0.067 for a single click. It was HALF the loudness
       of a click and barely longer than one, so through a laptop speaker
       it arrived as a soft tick, which is exactly what Andrew kept
       calling it. Nothing was wrong with the code; the sound was simply
       too small to be the thing it was named after.

       So: 550ms instead of 300, a wider sweep that starts lower and
       carries some low-mid rather than sitting up in the tick register,
       an attack over 90ms, and a quiet triangle gliding down underneath
       for the body that noise alone does not have. Measured again: RMS
       0.139, loudest sample 0.41, well short of clipping, audible for
       180ms with a tail past 400. Four times the old one and twice a
       click, which is the proportion a whoosh needs against a tick. */
    function whoosh(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime, D = 0.55;
        var src = c.createBufferSource(); src.buffer = hiss; src.loop = false;
        var hp = c.createBiquadFilter();
        hp.type = "highpass"; hp.frequency.value = 180;
        var bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.Q.value = 0.6;
        bp.frequency.setValueAtTime(300, t);
        bp.frequency.exponentialRampToValueAtTime(2400, t + 0.20);
        bp.frequency.exponentialRampToValueAtTime(420, t + D);
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.95, t + 0.09);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        src.connect(hp); hp.connect(bp); bp.connect(g); g.connect(c.destination);
        src.start(t); src.stop(t + D + 0.02);
        /* the body. Noise on its own is air; a thing going past has a
           pitch to it, and that is what makes this read as a movement
           rather than as static. */
        var o = c.createOscillator();
        o.type = "triangle";
        o.frequency.setValueAtTime(880, t);
        o.frequency.exponentialRampToValueAtTime(210, t + D * 0.9);
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 2000;
        var g2 = c.createGain();
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.11, t + 0.10);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + D);
        o.connect(lp); lp.connect(g2); g2.connect(c.destination);
        o.start(t); o.stop(t + D + 0.02);
      } catch (e){}
    }
    /* ---- the warble ----
       The かさおばけ's voice: two detuned triangles sliding down with a
       slow wobble on top and everything above 1400Hz taken off.
       Triangles rather than saws, because a saw at that pitch is a
       horror film and this is a Year 8 classroom. Lifted from れきしの人,
       where the same yokai lives, so the two pages sound like one suite. */
    function warble(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        if (c.state === "suspended") c.resume();
        var t = c.currentTime, D = 0.7;
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.17, t + 0.07);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 1400;
        var lfo = c.createOscillator(), lg = c.createGain();
        lfo.frequency.value = 6.5; lg.gain.value = 14;
        lfo.connect(lg);
        [0, 4].forEach(function(detune, i){
          var o = c.createOscillator();
          o.type = "triangle";
          o.detune.value = detune * 5;
          o.frequency.setValueAtTime(430 - i * 6, t);
          o.frequency.exponentialRampToValueAtTime(230 - i * 6, t + D);
          lg.connect(o.frequency);
          o.connect(lp);
          o.start(t); o.stop(t + D + 0.05);
        });
        lp.connect(g); g.connect(c.destination);
        lfo.start(t); lfo.stop(t + D + 0.05);
      } catch (e){}
    }
    /* ---- the slurp ----
       Andrew asked for "a bit of a sucking sound" when the bat absorbs a
       word. A suck is a swallow, which is the opposite shape to every
       other sound in here: the pitch RISES as the thing disappears and
       the noise closes rather than opens, so the ear hears something
       being drawn in rather than struck. A sharp little pop at the end
       is the mouth shutting. */
    function slurp(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime, D = 0.22;
        var src = c.createBufferSource(); src.buffer = hiss;
        var bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.Q.value = 5;
        bp.frequency.setValueAtTime(320, t);
        bp.frequency.exponentialRampToValueAtTime(2200, t + D);
        var g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + D);
        src.connect(bp); bp.connect(g); g.connect(c.destination);
        src.start(t); src.stop(t + D + 0.02);

        var o = c.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(180, t);
        o.frequency.exponentialRampToValueAtTime(1400, t + D * 0.9);
        var g2 = c.createGain();
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.16, t + 0.04);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + D);
        o.connect(g2); g2.connect(c.destination);
        o.start(t); o.stop(t + D + 0.02);
      } catch (e){}
    }
    /* A wrong catch, or a right word let through: the 1980 cabinet's
       "no", a harsh note falling a fourth. Sawtooth rather than square,
       and the ninja's bonus is a triangle, so that a square wave in
       this app always means a note of the tune. The browser check
       reads the notes off the oscillators to prove the melody is the
       one in the data, and it cannot do that if the sound effects are
       mixed in with it. */
    function buzz(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime;
        var o = c.createOscillator(), g = c.createGain();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(200, t);
        o.frequency.setValueAtTime(150, t + 0.09);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.13, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + 0.22);
      } catch (e){}
    }
    /* ---- a small explosion ----
       Andrew: "What about adding a small explosion sound when a word is
       caught?" It replaces the slurp rather than joining it: two sounds
       on every catch is mush, and twenty-five of them in a room is a
       reason to ban the game. A burst of noise with the top rolled off
       as it decays, over a low thud that gives it a body. */
    function boom(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime, D = 0.26;
        var src = c.createBufferSource(); src.buffer = hiss;
        var lp = c.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(5200, t);
        lp.frequency.exponentialRampToValueAtTime(380, t + D);
        var g1 = c.createGain();
        g1.gain.setValueAtTime(0.0001, t);
        g1.gain.exponentialRampToValueAtTime(0.3, t + 0.008);
        g1.gain.exponentialRampToValueAtTime(0.0001, t + D);
        src.connect(lp); lp.connect(g1); g1.connect(c.destination);
        src.start(t); src.stop(t + D + 0.02);

        var o = c.createOscillator(), g2 = c.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(220, t);
        o.frequency.exponentialRampToValueAtTime(48, t + 0.18);
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g2); g2.connect(c.destination);
        o.start(t); o.stop(t + 0.22);
      } catch (e){}
    }
    /* The ninja's bonus: the two rising notes every arcade machine has
       used for a pickup since 1985. */
    function bonus(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime;
        [[988, 0], [1319, 0.085]].forEach(function(n){
          var o = c.createOscillator(), g = c.createGain();
          o.type = "triangle";
          o.frequency.setValueAtTime(n[0], t + n[1]);
          g.gain.setValueAtTime(0.0001, t + n[1]);
          g.gain.exponentialRampToValueAtTime(0.16, t + n[1] + 0.008);
          g.gain.exponentialRampToValueAtTime(0.0001, t + n[1] + 0.13);
          o.connect(g); g.connect(c.destination);
          o.start(t + n[1]); o.stop(t + n[1] + 0.15);
        });
      } catch (e){}
    }
    /* ---- wah wah wah waaah ----
       Andrew asked for the comedic failure, and the comedy is all in
       the bend: four notes down a chromatic scale, each sliding into
       the next, the last one sagging a whole tone and taking its time
       about it. A sawtooth through a lowpass is near enough a muted
       trombone for a game that is drawn in squares. */
    function sadtrombone(){
      if (!S.sfx) return;
      try {
        var c = build(); if (!c) return;
        var t = c.currentTime;
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 1500; lp.Q.value = 1;
        lp.connect(c.destination);
        /* wah  wah  wah  waaaah */
        var N = [[311, 0.00, 0.22], [294, 0.24, 0.22],
                 [277, 0.48, 0.22], [262, 0.72, 0.85]];
        N.forEach(function(n, k){
          var f = n[0], at = t + n[1], d = n[2];
          var o = c.createOscillator(), g = c.createGain();
          o.type = "sawtooth";
          o.frequency.setValueAtTime(f * 1.06, at);
          o.frequency.linearRampToValueAtTime(f, at + 0.07);
          /* the last one sags away */
          if (k === 3) o.frequency.linearRampToValueAtTime(f * 0.84, at + d);
          /* the wobble that makes it a wah */
          var lfo = c.createOscillator(), lg = c.createGain();
          lfo.type = "sine"; lfo.frequency.value = k === 3 ? 5.5 : 7;
          lg.gain.value = f * 0.022;
          lfo.connect(lg); lg.connect(o.frequency);
          g.gain.setValueAtTime(0.0001, at);
          g.gain.exponentialRampToValueAtTime(0.2, at + 0.03);
          g.gain.setValueAtTime(0.2, at + d * 0.6);
          g.gain.exponentialRampToValueAtTime(0.0001, at + d);
          o.connect(g); g.connect(lp);
          o.start(at); o.stop(at + d + 0.03);
          lfo.start(at); lfo.stop(at + d + 0.03);
        });
      } catch (e){}
    }
    return { play: play, ratchet: ratchet, clunk: clunk, wake: wakeAudio,
             whoosh: whoosh, warble: warble, slurp: slurp, buzz: buzz,
             boom: boom, bonus: bonus, sadtrombone: sadtrombone,
             ctx: function(){ return ctx; } };
  })();
  /* The things that look pressable: the home panes, the tab row, and the
     tiles and move buttons inside a section. Not every button in the app:
     a clack on Next twenty times in a drill is a different thing. */

  /* One creature at a time. Answer two things quickly and the first one
     is still drifting up the screen when the second arrives, which leaves
     a ninja and a かさおばけ side by side and no way to tell which answer
     either of them is about. */
  function clearCreatures(){
    var old = document.querySelectorAll(".ninj,.yoka");
    for (var i = 0; i < old.length; i++) old[i].remove();
  }

  /* Neither creature checks for reduced motion any more. It used to
     return before either was drawn, which is why Andrew never saw one:
     a device with that setting on got the sound and nothing else. The
     setting is answered in the stylesheet instead, where the pair fade
     in place rather than crossing the screen. */
  /* ---- the ninja ----
     The かさおばけ needed an opposite. A ninja crosses rather than rises,
     and is gone in half the time the かさおばけ takes: right is
     acknowledged and then got out of the way of, which is the right
     proportion when being right is the thing you want to be unremarkable
     and repeatable.

     Same guards as the かさおばけ. It cannot be tapped, it never covers the
     feedback, and reduced motion gets the sound without the dash. */
  var nLast = 0;
  function ninja(near){
    CLICK.whoosh();
    var now = Date.now();
    if (now - nLast < 420) return;
    nLast = now;
    clearCreatures();
    var box = document.createElement("div");
    box.className = "ninj";
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top + r.height / 2 - 26 : innerHeight * 0.5) + "px";
    box.innerHTML =
        '<svg viewBox="0 0 64 52" width="64" height="52">'
      /* the scarf, trailing behind the direction of travel */
      + '<path d="M30 16 q-12 -4 -24 2 q10 1 14 4 q-9 1 -13 5 q12 -1 21 -3 z"'
      + ' fill="#b23a3a" opacity=".92"/>'
      /* a body folded forward, mid-dash */
      + '<path d="M28 18 q12 -3 19 6 q4 7 -3 11 q-9 5 -17 -1 q-6 -5 1 -16 z"'
      + ' fill="#20262f"/>'
      /* back leg kicked out */
      + '<path d="M34 34 q-6 7 -14 8 q6 -8 8 -12 z" fill="#20262f"/>'
      /* arm thrown forward */
      + '<path d="M44 22 q9 -2 14 3" stroke="#20262f" stroke-width="5"'
      + ' stroke-linecap="round" fill="none"/>'
      /* the head, and the eye slit that makes it a ninja */
      + '<circle cx="44" cy="17" r="10" fill="#262d37"/>'
      + '<path d="M38 15 h13 v4 h-13 z" fill="#f2e9d8"/>'
      + '<circle cx="42" cy="17" r="1.7" fill="#20262f"/>'
      + '<circle cx="48" cy="17" r="1.7" fill="#20262f"/>'
      /* two speed lines, which is the whole of the whoosh made visible */
      + '<path d="M2 24 h14 M6 31 h10" stroke="#20262f" stroke-width="2"'
      + ' stroke-linecap="round" opacity=".5"/>'
      + '</svg>';
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 1400);
  }

  /* ---- the かさおばけ ----
     Andrew asked for a creature on a wrong answer, and then asked for
     this one rather than a zombie: a yokai is Japanese, and a Year 8
     Japanese page that reaches for an American monster has passed up
     the better joke. It is the same umbrella that haunts れきしの人, so
     a student who meets it on one page knows it on the other.

     Drawn friendly rather than frightening, because a student who has
     just got something wrong does not need a fright as well. Built to
     be hard to farm: it rises once, takes a second and a half, never
     blocks the feedback that names the rule, and does not fire twice
     for the same mistake in quick succession. */
  var zLast = 0;
  function yokai(near){
    CLICK.warble();
    var now = Date.now();
    if (now - zLast < 900) return;
    zLast = now;
    clearCreatures();
    var box = document.createElement("div");
    box.className = "yoka";
    box.setAttribute("aria-hidden", "true");
    var r = near && near.getBoundingClientRect ? near.getBoundingClientRect() : null;
    box.style.left = (r ? r.left + r.width / 2 : innerWidth / 2) + "px";
    box.style.top  = (r ? r.top : innerHeight * 0.6) + "px";
    box.innerHTML =
      '<svg viewBox="0 0 56 72" width="56" height="72">'
      /* the canopy */
      + '<path d="M6 30 q22 -28 44 0 z" fill="#a83232"/>'
      + '<path d="M6 30 q22 -28 44 0" fill="none" stroke="#7a2525"'
      + ' stroke-width="1.5"/>'
      + '<path d="M28 4 v26 M14 20 v10 M42 20 v10" stroke="#f4efe6"'
      + ' stroke-width="1.6" opacity=".8"/>'
      /* the body of the umbrella, folded */
      + '<path d="M18 30 h20 l-3 16 h-14 z" fill="#c9a227"/>'
      /* one eye, which is the whole character of the thing */
      + '<circle cx="28" cy="37" r="6.5" fill="#f4efe6"/>'
      + '<circle cx="28" cy="37.5" r="3.2" fill="#15191f"/>'
      + '<circle cx="29.4" cy="36.2" r="1.1" fill="#fff"/>'
      /* the tongue, out and to one side, where the leg cannot hide it */
      + '<path d="M23 44 q5 11 10 1 q-5 4 -10 -1 z" fill="#d4647a"/>'
      /* one leg, one geta */
      + '<path d="M28 50 v10" stroke="#8a6d1f" stroke-width="4"'
      + ' stroke-linecap="round"/>'
      + '<rect x="18" y="60" width="20" height="5" rx="1.5" fill="#6b5417"/>'
      + '<rect x="21" y="65" width="3.5" height="5" fill="#6b5417"/>'
      + '<rect x="32" y="65" width="3.5" height="5" fill="#6b5417"/>'
      + '</svg>';
    document.body.appendChild(box);
    box.addEventListener("animationend", function(){ box.remove(); });
    setTimeout(function(){ if (box.parentNode) box.remove(); }, 2600);
  }

  /* ---- a deck, so nothing comes up in the order it is written down ----
     Every stepped exercise used to walk its list with a counter: the six
     people in だれですか came up in file order, so the answer to round one
     was the first card, round two the second, and a student who noticed
     that never had to read the Japanese again. The same counter ran the
     part-by-part step and the wearing step, where it made the body part
     and the garment slot cycle in a fixed order too.

     A deck shuffles the whole list, deals it out, and reshuffles when it
     is spent, never repeating across the seam. It also counts which items
     have actually been answered correctly, because "you have seen the
     last one" stops meaning "you have seen them all" the moment the order
     is random. */
  var DECKS = {};
  function deck(key, n){
    var d = DECKS[key];
    if (!d || d.n !== n){
      var order = [];
      for (var i = 0; i < n; i++) order.push(i);
      d = DECKS[key] = { n:n, order:shuffle(order), at:0, right:{} };
    }
    return d;
  }
  function dealt(key, n){ return deck(key, n).order[deck(key, n).at]; }
  function advance(key, n){
    var d = deck(key, n);
    d.at++;
    if (d.at >= d.n){
      var last = d.order[d.n - 1], tries = 0;
      do { d.order = shuffle(d.order); tries++; }
      while (d.n > 1 && d.order[0] === last && tries < 20);
      d.at = 0;
    }
  }
  /* Correct once is enough to count: a student who gets all six right has
     met all six, in whatever order the deck handed them over. */
  var TALLY = {};
  function tallyOf(key){ return TALLY[key] || (TALLY[key] = { right:0 }); }
  function gotRight(key, n, i, id){
    var d = deck(key, n);
    d.right[i] = 1;
    if (Object.keys(d.right).length >= n) done(id);
  }

  /* ================= ことばキャッチ =========================================
     Andrew asked for this one: "random topic vocabulary falls from the sky
     one word at a time in random order in Japanese script. Players have to
     recognise the correct word and move a horizontally moving bar at the
     bottom of the screen to absorb the word with a bit of a sucking sound.
     After they get a word correct, the words fall ever so slightly faster.
     The graphics are deliberately pixelated like 80s tabletop graphics
     games with a black background and the music is chiptune."

     The one thing a falling-word game has to get right is that catching is
     a DECISION and not a reflex. A word falls, and above it is an English
     meaning: catch the word if it is that meaning, let it fall if it is
     not. Reading is the whole of the game. Without the target the bat is
     just a thing you park under whatever is coming, which trains nothing.

     So: a life for catching the wrong word, a life for letting the right
     one land, three lives, and a fraction more speed every time a word is
     absorbed. The speed is the reward and the pressure at once.

     The pixels are real pixels. The canvas is 240 by 320 however big it is
     drawn, smoothing is off, and the browser blows each one up into a
     square. Nothing is a picture of a pixel; the text really is that
     coarse, which is why the kyokasho strokes come out blocky instead of
     smooth, and why it looks like the thing Andrew asked for rather than a
     filter over a modern page. */
  var JPFONT = getComputedStyle(document.documentElement)
    .getPropertyValue("--jp").trim() || "sans-serif";
  var PIXW = 320, PIXH = 200;
  var SEMI = Math.pow(2, 1 / 12);
  function hz(n){
    /* "A4" or "F#3" to a frequency, so the tune in the data file reads as
       notes rather than as numbers nobody can check against a score. */
    var m = /^([A-G])(#|b)?(-?\d)$/.exec(n || "");
    if (!m) return 0;
    var base = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 }[m[1]];
    if (m[2] === "#") base++;
    if (m[2] === "b") base--;
    return 440 * Math.pow(SEMI, base - 9 + (+m[3] - 4) * 12);
  }

  /* ---- the chiptune ----
     Two square waves and a bass pulse, scheduled on the audio clock a bar
     at a time rather than on a timer, because a setInterval melody wobbles
     audibly the moment the main thread is busy drawing. Nothing is
     downloaded: the tune is a list of notes in the data file.

     It is quiet on purpose. Twenty-five of these in a classroom is the
     thing that gets a game banned, so the music sits under the sound
     effects and the ♪ button turns the lot off. */
  var MUSIC = (function(){
    var timer = null, at = 0, i = 0, bi = 0, on = false, T = null, rate = 1;
    function voice(c, note, start, dur, type, vol, detune){
      if (!note) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = type;
      o.frequency.value = hz(note);
      if (detune) o.detune.value = detune;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(vol, start + 0.012);
      g.gain.setValueAtTime(vol, start + dur * 0.72);
      g.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.96);
      o.connect(g); g.connect(c.destination);
      o.start(start); o.stop(start + dur);
    }
    function pump(){
      try { pumpNow(); } catch (e){ stop(); }
    }
    function pumpNow(){
      var c = CLICK.ctx(); if (!c || !on || !T) return;
      /* The tune winds up with the game. Every word caught makes the
         words fall a little faster and the music follow them, which is
         most of what makes an arcade game feel like it is closing in. */
      var beat = 60 / ((T.tempo || 100) * rate);
      /* keep about a second and a half of music in front of the clock */
      while (at < c.currentTime + 1.5){
        if (at < c.currentTime) at = c.currentTime + 0.05;
        var n = T.melody[i % T.melody.length], d = n[1] * beat;
        voice(c, n[0], at, d, "square", 0.045, 0);
        var b = (T.bass || [])[bi % ((T.bass || []).length || 1)];
        if (b) voice(c, b[0], at, Math.min(d, b[1] * beat), "triangle", 0.05, 0);
        at += d;
        i++; bi++;
      }
    }
    function start(tune){
      if (on) return;
      /* Everything about the music is optional. A browser that refuses
         an AudioContext, a device with the output muted, an iPad that
         has not had its gesture yet: none of it may stop the game
         starting. The test harness found this by wrapping AudioContext
         and throwing inside it, and the game never dealt its first
         word. */
      try {
        var c = CLICK.wake(); if (!c) return;
        T = tune; on = true; rate = 1; at = c.currentTime + 0.08; i = 0; bi = 0;
        pump();
        timer = setInterval(pump, 400);
      } catch (e){ on = false; T = null; }
    }
    function stop(){
      on = false; T = null;
      clearInterval(timer); timer = null;
    }
    return { start: start, stop: stop, playing: function(){ return on; },
             rate: function(x){ rate = Math.max(1, Math.min(1.45, x)); },
             tempo: function(){ return (T ? T.tempo || 100 : 0) * rate; } };
  })();

  /* ---- the game ----
     Fixed 1/60 timestep with an accumulator, the same way the drum runs,
     so a word falls at the same speed on a 60Hz laptop and a 120Hz iPad
     and the difficulty is the difficulty rather than the refresh rate. */
  function arcade(cfg){
    var cv = cfg.canvas, g = cv.getContext("2d");
    cv.width = PIXW; cv.height = PIXH;
    var FONT = cfg.font || 18;
    g.imageSmoothingEnabled = false;
    var POOL = cfg.words;
    var stars = [];
    for (var s = 0; s < 26; s++)
      stars.push([Math.floor(Math.random() * PIXW), Math.floor(Math.random() * PIXH),
                  Math.random() < 0.3 ? 2 : 1]);

    /* falling is a LIST. Andrew, on the first version: "the screen needs
       to be wider or the falling words need to be smaller to fit multiple
       falling words on the screen at once." Both, in the end: the screen
       is landscape now and the words are two pixels smaller, and several
       are in the air at a time, which is what makes finding the right one
       a search rather than a yes-or-no on whatever is coming. */
    /* A question from the moment the rung opens. Andrew: "Where is the
       prompt word? Can't see it." The pill read CATCH — until somebody
       pressed Start, and on game over it went back to a dash, so for
       most of the time a student was looking at the screen there was no
       question on it to find. There is always one now. */
    var G = { mode:"ready", score:0, lives:3, best:cfg.best || 0,
              speed:24, bat:PIXW / 2, batW:56, falling:[], target:null,
              flash:0, flashOk:false, spawn:0, sinceTarget:0,
              bits:[], flyers:[], fly:260 };
    var raf = 0, last = 0, acc = 0, alive = true;

    function width(w){
      g.font = "bold " + FONT + "px " + JPFONT;
      return g.measureText(cfg.label(w)).width;
    }
    function newTarget(){
      var was = G.target;
      var t = POOL[Math.floor(Math.random() * POOL.length)], tries = 0;
      while (POOL.length > 1 && was && t.en === was.en && tries < 20){
        t = POOL[Math.floor(Math.random() * POOL.length)]; tries++;
      }
      G.target = t;
      G.sinceTarget = 0;
      /* The words already in the air stay: the question changed, so the
         student re-reads what is falling, which is the point. The only
         ones taken away are the ones too close to the floor to be
         reached, because losing a life to a word that was already past
         you when the question changed is not a thing you could have
         done anything about. */
      var reach = PIXH - 18 - 50;
      G.falling = G.falling.filter(function(f){ return f.y < reach; });
      /* The prompt lives outside the canvas, in the page, where it can be
         read at page-text size instead of in 15-pixel capitals. Andrew
         asked for that and he is right: the question is the one thing on
         this screen that is not meant to be a game. */
      if (cfg.onPrompt) cfg.onPrompt(G.target);
    }
    function spawn(force){
      /* Roughly two in five of the words in the air are the one being
         asked for. Below that the game is mostly dodging; above it, and
         catching everything works and nothing is read. The target is
         forced in if it has not been seen for a while, so a question can
         never become unanswerable. */
      function inAir(x){
        return G.falling.some(function(f){ return f.w.en === x.en; });
      }
      var w, tries = 0;
      if ((force || Math.random() < 0.4) && !inAir(G.target)) w = G.target;
      else {
        /* never two of the same word on the screen at once: two copies of
           the answer reads as a bug, and two copies of a distractor is
           one fewer word to read */
        do { w = POOL[Math.floor(Math.random() * POOL.length)]; tries++; }
        while (POOL.length > 1 && tries < 30
               && (inAir(w) || (!force && w.en === G.target.en)));
        if (inAir(w)) return;
      }
      var half = width(w) / 2 + 3;
      var span = Math.max(8, PIXW - 2 * half);
      /* Never one word above another. Andrew: "Definitely don't stack
         words on top of each other because it is too hard to catch
         them." Two words sharing a column arrive at the bat one after
         the other with no room to move between them, so a new word has
         to clear every word already in the air by both their widths.
         If there is nowhere to put it, it does not come: a thinner
         screen is better than an uncatchable one. */
      var x = null;
      for (var t2 = 0; t2 < 40 && x === null; t2++){
        var try_ = Math.round(half + Math.random() * span);
        var clear = G.falling.every(function(o){
          return Math.abs(o.x - try_) > o.half + half + 6;
        });
        if (clear) x = try_;
      }
      if (x === null) return;
      if (w === G.target) G.sinceTarget = 0;
      G.falling.push({ w: w, x: x, y: -2, half: half });
    }
    /* ---- the disintegration ----
       Andrew: "What about making the word disintegrate when it is
       caught?" The word is thrown outwards as a handful of its own
       pixels, which at this resolution is the only effect that looks
       like it belongs. */
    function burst(x, y, col, n){
      for (var k = 0; k < (n || 14); k++){
        var a = Math.random() * Math.PI * 2, sp = 0.4 + Math.random() * 1.5;
        G.bits.push({ x: x + (Math.random() * 20 - 10), y: y - 5 + Math.random() * 8,
                      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.5,
                      life: 16 + Math.floor(Math.random() * 12), col: col });
      }
    }
    function caught(f){
      burst(f.x, f.y, "#bfffbf", 18);
      G.score++;
      /* Andrew: "the words need to speed up a bit faster than they
           have been in order to keep it interesting." */
        G.speed = Math.min(175, G.speed * 1.085);
        MUSIC.rate(1 + (G.speed - 24) / 190);
      G.flash = 14; G.flashOk = true;
      if (cfg.onCatch) cfg.onCatch(f.w);
      if (S.sfx) CLICK.boom();
      newTarget();
      if (!G.falling.some(function(x){ return x.w.en === G.target.en; }))
        spawn(true);
    }
    function wrong(){
      /* Andrew: "Make sure that the game takes lives when the player
         catches the wrong word. I noticed that it wasn't working
         properly in the body app. I was getting away with wrong
         catches." It did not take one before: it stopped the bat for a
         third of a second instead, which was my call and not his.
         A wrong catch costs a life, the same as a missed one. */
      lose();
    }
    /* One life, whichever way it went. */
    function lose(){
      G.lives--;
      G.flash = 16; G.flashOk = false;
      if (S.sfx) CLICK.buzz();
      if (G.lives <= 0) return over();
      newTarget();
      if (!G.falling.some(function(x){ return x.w.en === G.target.en; }))
        spawn(true);
    }
    function missed(){ lose(); }
    /* ---- the ninja and the かさおばけ ----
       Andrew: "Add a random flying yokai that players have to avoid or
       lose a life. Also add a random flying ninja that players must hit
       to get a bonus point."

       They swoop rather than fall: in from one side near the top and
       down across the screen, so they cross the bat line once, at a
       place the player has to get to or get away from. Missing a ninja
       costs nothing; it is a bonus, not a fourth way to lose. */
    function flyer(){
      var ninja = Math.random() < 0.5;
      var fromLeft = Math.random() < 0.5;
      G.flyers.push({
        ninja: ninja,
        x: fromLeft ? -12 : PIXW + 12,
        y: 22 + Math.random() * 30,
        vx: (fromLeft ? 1 : -1) * (0.55 + Math.random() * 0.5),
        vy: 0.42 + Math.random() * 0.22,
        t: 0
      });
    }
    function over(){
      G.mode = "over";
      G.best = Math.max(G.best, G.score);
      MUSIC.stop();
      if (S.sfx) setTimeout(function(){ CLICK.sadtrombone(); }, 140);
      if (cfg.onOver) cfg.onOver(G.score);
      /* the question stays up: it is the one the next game starts on */
    }
    function begin(){
      G.mode = "play"; G.score = 0; G.lives = 3; G.speed = 24;
      G.falling = []; G.spawn = 0; G.bits = []; G.flyers = []; G.fly = 260;
      CLICK.wake();
      if (S.sfx && cfg.tune) MUSIC.start(cfg.tune);
      /* the question already on the pill is the one you start on */
      if (!G.target) newTarget();
      else if (cfg.onPrompt) cfg.onPrompt(G.target);
      spawn(true);
    }
    function step(){
      if (G.mode !== "play") return;
      if (G.flash > 0) G.flash--;
      G.sinceTarget++;
      /* A new word every so often, and sooner as the game speeds up, so
         the screen stays about as full however fast it is going. */
      G.spawn++;
      var every = Math.max(26, Math.round(3000 / G.speed));
      if (G.spawn >= every && G.falling.length < 5){
        G.spawn = 0;
        spawn(G.sinceTarget > 240);
      }
      var floor = PIXH - 18;

      /* the pixels of a word that has already gone */
      for (var bI = G.bits.length - 1; bI >= 0; bI--){
        var bt = G.bits[bI];
        bt.x += bt.vx; bt.y += bt.vy; bt.vy += 0.05; bt.life--;
        if (bt.life <= 0) G.bits.splice(bI, 1);
      }

      /* one swooping creature every ten seconds or so */
      G.fly--;
      if (G.fly <= 0 && G.flyers.length < 2){
        G.fly = 420 + Math.floor(Math.random() * 360);
        flyer();
      }
      for (var vI = G.flyers.length - 1; vI >= 0; vI--){
        var fl = G.flyers[vI];
        var wasAbove = fl.y < floor;
        fl.x += fl.vx * (G.speed / 24);
        fl.y += fl.vy * (G.speed / 24);
        fl.t++;
        if (fl.x < -24 || fl.x > PIXW + 24 || fl.y > PIXH + 20){
          G.flyers.splice(vI, 1);
          continue;
        }
        if (wasAbove && fl.y >= floor){
          var onIt = Math.abs(fl.x - G.bat) < G.batW / 2 + 7;
          if (onIt){
            G.flyers.splice(vI, 1);
            if (fl.ninja){
              /* a bonus point, and it is only ever a bonus: it is not
                 a word, so it pays no points towards the step and
                 cannot be farmed for them */
              G.score += 2;
              G.flash = 14; G.flashOk = true;
              burst(fl.x, fl.y, "#9fd4ff", 16);
              if (S.sfx) CLICK.bonus();
            } else {
              burst(fl.x, fl.y, "#d9a7ff", 16);
              lose();
            }
            continue;
          }
        }
      }

      for (var i = G.falling.length - 1; i >= 0; i--){
        var f = G.falling[i];
        f.y += G.speed / 60;
        if (f.y < floor) continue;
        /* The word's CENTRE has to be over the bat, not merely touching
           its edge. The old test counted any overlap, so a long word was
           caught from a fifth of the screen away on either side: fine
           when a wrong catch was free, unfair the moment it costs a
           life. Catching is a deliberate act now, which is what makes
           losing one always the player's own doing. */
        var onBat = Math.abs(f.x - G.bat) < G.batW / 2 + 6;
        var isTarget = f.w.en === G.target.en;
        G.falling.splice(i, 1);
        if (onBat){
          if (isTarget) return caught(f);
          wrong();
        } else if (isTarget){
          return missed();
        }
      }
    }

    function text(t, x, y, px, col, align){
      g.fillStyle = col;
      g.font = "bold " + px + "px " + JPFONT;
      g.textAlign = align || "center";
      g.textBaseline = "alphabetic";
      g.fillText(t, x, y);
    }
    function paint(){
      g.fillStyle = "#000";
      g.fillRect(0, 0, PIXW, PIXH);
      g.fillStyle = "#1b3b1b";
      stars.forEach(function(st){ g.fillRect(st[0], st[1], st[2], st[2]); });

      if (G.mode === "ready" || G.mode === "over"){
        text(G.mode === "over" ? "GAME OVER" : "ことばキャッチ",
             PIXW / 2, 70, G.mode === "over" ? 20 : 22,
             G.mode === "over" ? "#ff6a4a" : "#6cf06c");
        if (G.mode === "over"){
          text("SCORE " + G.score, PIXW / 2, 96, 13, "#fff");
          text("BEST " + G.best, PIXW / 2, 113, 10, "#8a8a8a");
        } else {
          text("Catch the word above the screen.", PIXW / 2, 96, 9, "#9a9a9a");
          text("Let the others fall.", PIXW / 2, 110, 9, "#9a9a9a");
        }
        text("PRESS START", PIXW / 2, 142, 12,
             (Math.floor(Date.now() / 420) % 2) ? "#6cf06c" : "#1d4a1d");
        text("drag, or ← →", PIXW / 2, 162, 8, "#5a5a5a");
      }

      if (G.mode === "play"){
        /* Every word the same colour. The target used to brighten as it
           neared the floor, which told a student which one to catch
           without their reading a thing: Andrew spotted it. */
        G.falling.forEach(function(f){
          text(cfg.label(f.w), f.x, Math.round(f.y), FONT, "#e8f2e8");
        });
      }

      /* ---- the two creatures, in pixels ----
         A ninja is dark, which on a black screen is nothing at all, so
         he is a grey hood with a bright headband and two white eyes.
         The かさおばけ is the one-eyed umbrella: a purple canopy, a
         single eye and one wooden leg. Both are drawn from rectangles
         rather than fetched, like everything else here. */
      G.flyers.forEach(function(fl){
        var x = Math.round(fl.x), y = Math.round(fl.y);
        var bob = Math.round(Math.sin(fl.t / 7) * 2);
        y += bob;
        if (fl.ninja){
          g.fillStyle = "#3a3f46";
          g.fillRect(x - 5, y - 7, 10, 9);          /* hood */
          g.fillRect(x - 7, y - 1, 14, 5);          /* shoulders */
          g.fillStyle = "#c8332f";
          g.fillRect(x - 6, y - 4, 12, 2);          /* headband */
          g.fillRect(x + 5, y - 4, 4, 1);           /* its tail, streaming */
          g.fillStyle = "#fff";
          g.fillRect(x - 3, y - 4, 2, 2);
          g.fillRect(x + 1, y - 4, 2, 2);           /* eyes */
          g.fillStyle = "#2a2e33";
          g.fillRect(x - 4, y + 4, 3, 3);
          g.fillRect(x + 1, y + 4, 3, 3);           /* legs, mid stride */
        } else {
          g.fillStyle = "#7a4a86";
          g.fillRect(x - 8, y - 5, 16, 3);          /* canopy */
          g.fillRect(x - 6, y - 7, 12, 2);
          g.fillStyle = "#9a66a8";
          g.fillRect(x - 8, y - 2, 16, 1);          /* its rim */
          g.fillStyle = "#e8d8f0";
          g.fillRect(x - 3, y, 6, 5);               /* face */
          g.fillStyle = "#1a1020";
          g.fillRect(x - 1, y + 1, 3, 3);           /* the one eye */
          g.fillStyle = "#c8332f";
          g.fillRect(x - 1, y + 5, 2, 3);           /* tongue */
          g.fillStyle = "#8a6a3a";
          g.fillRect(x - 1, y + 5, 1, 6);           /* the one leg */
        }
      });

      /* the pixels of a caught word, on their way out */
      G.bits.forEach(function(bt){
        g.fillStyle = bt.col;
        g.globalAlpha = Math.max(0, Math.min(1, bt.life / 16));
        g.fillRect(Math.round(bt.x), Math.round(bt.y), 2, 2);
      });
      g.globalAlpha = 1;

      /* the bat: a slab with a lighter lip, and a mouth when it eats */
      var by = PIXH - 12, bx = Math.round(G.bat - G.batW / 2);
      g.fillStyle = G.flash > 0
        ? (G.flashOk ? "#aaffaa" : "#ff6a4a") : "#6cf06c";
      g.fillRect(bx, by, G.batW, 5);
      g.fillStyle = "#2f8f2f";
      g.fillRect(bx, by + 5, G.batW, 3);
      g.fillStyle = "#000";
      g.fillRect(Math.round(bx + G.batW / 2 - 4), by, 8, 2);

      if (G.mode === "play"){
        g.fillStyle = "#2b2b2b";
        g.fillRect(0, PIXH - 8, PIXW, 1);
        text("SCORE " + G.score, 3, PIXH - 1, 8, "#6cf06c", "left");
        var hearts = "";
        for (var L = 0; L < G.lives; L++) hearts += "■";
        text(hearts, PIXW - 3, PIXH - 1, 8, "#ff6a4a", "right");
      }
    }
    function loop(t){
      if (!alive) return;
      if (!last) last = t;
      acc += Math.min(0.25, (t - last) / 1000);
      last = t;
      while (acc >= 1 / 60){ step(); acc -= 1 / 60; }
      paint();
      raf = requestAnimationFrame(loop);
    }

    /* ---- the bat ---- */
    function moveTo(clientX){
      var r = cv.getBoundingClientRect();
      var x = (clientX - r.left) / r.width * PIXW;
      G.bat = Math.max(G.batW / 2, Math.min(PIXW - G.batW / 2, x));
    }
    var dragging = false;
    function down(ev){
      cv.focus();
      if (G.mode !== "play"){ begin(); return; }
      dragging = true; moveTo(ev.clientX); ev.preventDefault();
    }
    function move(ev){ if (dragging) moveTo(ev.clientX); }
    function up(){ dragging = false; }
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    var keys = {};
    function keydown(ev){
      if (ev.key === "ArrowLeft" || ev.key === "ArrowRight"){
        keys[ev.key] = 1; ev.preventDefault();
      }
      if ((ev.key === " " || ev.key === "Enter") && G.mode !== "play"){
        begin(); ev.preventDefault();
      }
    }
    function keyup(ev){ keys[ev.key] = 0; }
    cv.addEventListener("keydown", keydown);
    cv.addEventListener("keyup", keyup);
    var kt = setInterval(function(){
      if (G.mode !== "play") return;
      if (keys.ArrowLeft) G.bat = Math.max(G.batW / 2, G.bat - 6);
      if (keys.ArrowRight) G.bat = Math.min(PIXW - G.batW / 2, G.bat + 6);
    }, 1000 / 60);

    newTarget();
    raf = requestAnimationFrame(loop);
    return {
      state: G,
      /* what the game would draw for a word. The browser check reads it
         to hold the kana rule in place; nothing in the app calls it. */
      label: function(w){ return cfg.label(w); },
      start: begin,
      stop: function(){
        alive = false;
        cancelAnimationFrame(raf);
        clearInterval(kt);
        MUSIC.stop();
        cv.removeEventListener("pointerdown", down);
        cv.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      }
    };
  }

  var STEPS = [
    { id:"who",   ja:"だれですか", en:"Who is it?" },
    { id:"match", ja:"ことば",     en:"Words" },
    { id:"sort",  ja:"い か な",   en:"い or な" },
    { id:"part",  ja:"〜が 〜です", en:"Part by part" },
    { id:"join",  ja:"〜くて",     en:"Joining" },
    { id:"colour",ja:"いろ",       en:"Colours" },
    { id:"wear",  ja:"きています", en:"Wearing" },
    { id:"dress", ja:"きせかえ",   en:"Dress them" },
    { id:"spin",  ja:"ルーレット", en:"Spin a word" },
    { id:"katch", ja:"ことばキャッチ", en:"Catch the word" },
    { id:"write", ja:"かいて",     en:"Write it" }
  ];
  var at = 0, DRAW = {};

  function ruleFor(id, cls){
    var r = null;
    P.rules.forEach(function(x){ if (x.step === id) r = x; });
    if (!r) return "";
    return '<div class="rule ' + (cls || "") + '"><b>' + esc(r.title_en) + '</b>'
      + esc(r.rule)
      + r.eg.map(function(e){
          return '<div class="eg">' + ruby(e.ja) + '<em>' + esc(e.en) + '</em></div>';
        }).join("") + '</div>';
  }
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
  /* Finishing a step pays once. It is worth more than any single item in
     it, so the last word of a set is worth staying for. */
  function done(id){
    var fresh = !S.done[id];
    S.done[id] = 1; save(); paintSteps();
    if (fresh) award(5, "step done");
  }
  function wireSay(){
    each($("main"), "[data-say]", function(b){
      b.onclick = function(ev){ ev.stopPropagation(); say(b.dataset.say); };
    });
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
    paintToggles(); paintSteps();
    /* The game runs on its own clock and its own audio. Leaving the rung
       has to stop both, or the chiptune follows you round the app. */
    if (GAME){ GAME.stop(); GAME = null; }
    if (onResize){ window.removeEventListener("resize", onResize); onResize = null; }
    document.body.classList.remove("gamefull");
    $("main").innerHTML = "";
    DRAW[STEPS[at].id]();
    wireSay();
  }
  $("legend").innerHTML =
    '<s class="k-i">い</s><s class="k-na">な</s><s class="k-noun">noun</s>';

  /* ---- drag a chip onto a slot, or tap the chip and then the slot ----
     A school iPad does not do HTML5 drag-and-drop at all and a mouse is
     clumsy at tapping twice, so both gestures run one handler: if the
     pointer never travelled, it was a tap.

     This was written inside the ことば step and is out here because the
     きせかえ step needs the same gesture over an SVG. Two copies of a drag
     is two places for a thumb to stop working.

       grab(chip)        called the moment a chip is taken hold of
       open(slot)        false for a slot that will not take anything
       land(chip, slot)  the drop, however it was made
     The slot selector is matched with closest(), so it works on an SVG
     element as readily as on a div. */
  function dragdrop(scope, chipSel, slotSel, cfg){
    function clearOver(){
      each(scope, slotSel + ".over", function(x){ x.classList.remove("over"); });
    }
    function open(slot){ return !cfg.open || cfg.open(slot); }
    function clearPick(){
      each(scope, chipSel + ".pick", function(c){ c.classList.remove("pick"); });
    }
    each(scope, chipSel, function(chip){
      /* きせかえ redraws the figure after every drop, so the slots are new
         elements and have to be wired again while the chips are the same
         ones. Wiring a chip twice is worse than not wiring it: the second
         handler sees the class the first just added and takes it straight
         back off, so the chip can never stay armed and tap-then-tap stops
         working after the first drop. */
      if (chip.__dragWired) return;
      chip.__dragWired = true;
      var drag = null;
      chip.addEventListener("pointerdown", function(ev){
        if (cfg.grab) cfg.grab(chip);
        var r = chip.getBoundingClientRect();
        drag = { x:ev.clientX, y:ev.clientY, dx:ev.clientX - r.left,
                 dy:ev.clientY - r.top, w:r.width, h:r.height, moved:0 };
        try { chip.setPointerCapture(ev.pointerId); } catch (e){}
      });
      chip.addEventListener("pointermove", function(ev){
        if (!drag) return;
        drag.moved = Math.max(drag.moved,
          Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y));
        if (drag.moved < 7) return;
        ev.preventDefault();
        chip.classList.add("dragging");
        chip.style.width = drag.w + "px";
        chip.style.height = drag.h + "px";
        chip.style.left = (ev.clientX - drag.dx) + "px";
        chip.style.top = (ev.clientY - drag.dy) + "px";
        var over = document.elementFromPoint(ev.clientX, ev.clientY);
        over = over && over.closest ? over.closest(slotSel) : null;
        clearOver();
        if (over && open(over)) over.classList.add("over");
      });
      function drop(ev){
        if (!drag) return;
        var moved = drag.moved;
        drag = null;
        clearOver();
        if (moved < 7){
          /* a tap: arm this chip, and the next tap on a slot drops it */
          var was = chip.classList.contains("pick");
          clearPick();
          if (!was) chip.classList.add("pick");
          return;
        }
        chip.classList.remove("dragging");
        chip.style.cssText = "";
        var el = document.elementFromPoint(ev.clientX, ev.clientY);
        var slot = el && el.closest ? el.closest(slotSel) : null;
        if (slot && open(slot)) cfg.land(chip, slot);
      }
      chip.addEventListener("pointerup", drop);
      chip.addEventListener("pointercancel", drop);
    });
    each(scope, slotSel, function(slot){
      if (slot.__dragWired) return;
      slot.__dragWired = true;
      slot.addEventListener("click", function(){
        var armed = scope.querySelector(chipSel + ".pick");
        if (!armed || !open(slot)) return;
        clearPick();
        cfg.land(armed, slot);
      });
    });
  }

  /* ---- ことば ----
     The chip does not say what it is. It plays. A student has to listen,
     decide, and put it somewhere, which is a different job from reading
     あかい and finding "red" in the next column: that one can be finished
     by elimination without knowing a word.

     Drag it, or tap the chip and then tap a meaning. Both work, because a
     trackpad and a thumb are not the same thing and neither is an excuse.

     The spelling is withheld until the chip lands, then shown: the written
     form is the reward for getting it right, not the clue. If the device
     has no recordings at all the chip shows the word instead, because a
     silent chip is not a question. */
  var mRound = 0, mOrder = null;
  var SPK = '<svg viewBox="0 0 24 24" aria-hidden="true">'
    + '<path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z"/>'
    + '<path fill="none" stroke="currentColor" stroke-width="2"'
    + ' stroke-linecap="round" d="M16.5 8.8a4.5 4.5 0 0 1 0 6.4"/></svg>';
  DRAW.match = function(){
    var per = 6, rounds = Math.ceil(W.words.length / per);
    mRound = mRound % rounds;
    if (!mOrder) mOrder = shuffle(W.words);
    var set = mOrder.slice(mRound * per, mRound * per + per);
    var silent = !Object.keys(CLIPS).length;
    var chips = shuffle(set), slots = shuffle(set);
    var left = set.length, miss = {};

    $("main").innerHTML = ruleFor("match")
      + '<div class="work"><div class="wslots" id="slots"></div></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<div class="wtray" id="tray"></div><span class="sp"></span>'
      + '<span class="hint">' + (silent
          ? 'Drag a word onto its meaning.'
          : 'Listen, then drag it onto its meaning.') + '</span>'
      + '<button class="btn ghost sm" id="next">Next six</button></div>';
    $("slots").innerHTML = slots.map(function(x){
      return '<div class="wslot" data-m="' + esc(x.kana) + '">'
        + '<span class="mean">' + esc(x.en) + '</span>'
        + '<span class="got"></span></div>';
    }).join("");
    $("tray").innerHTML = chips.map(function(x, i){
      return '<div class="wchip" data-w="' + esc(x.kana) + '" tabindex="0"'
        + ' role="button" aria-label="Word ' + (i + 1) + ', listen">'
        + '<span class="num">' + (i + 1) + '</span>'
        + (silent ? '<span class="jp" style="font-size:17px">' + ruby(x.ja)
                    + '</span>' : SPK) + '</div>';
    }).join("");
    function score(){
      $("sc").innerHTML = '<b>' + (set.length - left) + '</b> of ' + set.length
        + ' · set ' + (mRound + 1) + ' of ' + rounds;
    }
    score();
    function wordOf(kana){
      var f = null;
      set.forEach(function(x){ if (x.kana === kana) f = x; });
      return f;
    }
    function land(chip, slot){
      var kana = chip.dataset.w, ok = slot.dataset.m === kana, x = wordOf(kana);
      if (ok){
        slot.classList.add("yes");
        ninja(slot);
        slot.querySelector(".got").innerHTML = ruby(x.ja) + ' '
          + saybtn(x.ja);
        chip.remove();
        left--; score();
        wireSay();
        first("match:" + kana, 1, "word");
        if (!left) done("match");
      } else {
        slot.classList.add("no");
        yokai(slot);
        setTimeout(function(){ slot.classList.remove("no"); }, 700);
        miss[kana] = (miss[kana] || 0) + 1;
        /* Stuck twice on the same word: show the spelling. The rung is
           generous early and it comes off as soon as it is not needed.
           This one costs nothing, unlike the supports in the other steps,
           because the student did not ask for it: charging for help that
           arrives uninvited would make the score dishonest. */
        if (miss[kana] >= 2 && !silent && !chip.dataset.shown){
          chip.dataset.shown = "1";
          chip.innerHTML = '<span class="num">' + chip.querySelector(".num").textContent
            + '</span><span class="jp" style="font-size:16px">' + ruby(x.ja)
            + '</span>';
        }
      }
    }
    dragdrop($("main"), ".wchip", ".wslot", {
      grab: function(chip){ say(wordOf(chip.dataset.w).ja); },
      open: function(slot){ return !slot.classList.contains("yes"); },
      land: land
    });
    /* Reshuffle when the cycle is spent, so a second pass through the
       words is six different sets rather than the same seven again. */
    $("next").onclick = function(){
      mRound++;
      if (mRound >= rounds){ mRound = 0; mOrder = shuffle(W.words); }
      draw();
    };
  };

  /* ---- sorting, used by step 3 and step 6 ----
     Two columns, a pool of chips, and a rule that decides which side a
     word belongs on. What the first version did not do: it said nothing
     visible when the answer was wrong (it set a title attribute, which no
     thumb will ever hover over), and it stopped dead when the last chip
     landed, with no way on and nothing further to do.

     Both are fixed here. A right answer builds the phrase the word is
     actually for, so the payoff is the grammar and not a tick. A wrong one
     puts the phrase the student just asked for beside the one they meant,
     and hands the chip back. The end of a round names the words that
     needed a second go, and offers another round or the next step. */
  /* A round with only one kind in it is not a sort, so the deal takes as
     near to half of each as the lists allow instead of trusting a shuffle. */
  function deal(list, n, kindOf){
    var by = {}, keys = [];
    list.forEach(function(w){
      var k = kindOf(w);
      if (!by[k]){ by[k] = []; keys.push(k); }
      by[k].push(w);
    });
    keys.forEach(function(k){ by[k] = shuffle(by[k]); });
    var out = [], i = 0;
    while (out.length < n){
      var moved = false;
      for (var j = 0; j < keys.length; j++){
        var pool = by[keys[j]];
        if (i < pool.length && out.length < n){ out.push(pool[i]); moved = true; }
      }
      if (!moved) break;
      i++;
    }
    return shuffle(out);
  }

  function sortGame(cfg){
    var items = cfg.items, left = items.length, pick = null, again = {};
    var nxt = STEPS[at + 1];
    $("main").innerHTML = ruleFor(cfg.id)
      /* fit, not fill: on a laptop the columns sit under the pool and the
         feedback sits under them, instead of the two being driven to
         opposite ends of a half-empty screen. */
      + '<div class="work fit">'
      + '<div class="slot" id="pool" style="margin-bottom:10px"></div>'
      + '<div class="cols" style="height:auto;min-height:76px">'
      + cfg.cols.map(function(c){
          return '<div class="col ' + c.cls + '" data-c="' + c.key + '"'
            + ' role="button" tabindex="0"><h4>' + c.head + '</h4>'
            + '<div class="in"></div></div>';
        }).join("")
      + '</div></div>'
      /* The feedback sits outside the scrolling area, under it. Put
         it above the columns and every answer pushes the columns off
         the bottom of a phone, so the student has to go looking for
         the thing they were just tapping. */
      + '<div id="fb" class="fbslot"></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span><span id="tip"></span></div>';
    $("pool").innerHTML = items.map(function(w, i){
      return '<button class="chip" data-i="' + i + '">'
        + (cfg.chip ? cfg.chip(w) : ruby(w.ja)) + '</button>';
    }).join("");
    function score(){
      $("sc").innerHTML = '<b>' + (items.length - left) + '</b> of ' + items.length;
    }
    function tip(t){ $("tip").textContent = t; }
    score(); tip(cfg.hint);

    each($("main"), ".chip[data-i]", function(c){
      c.onclick = function(){
        each($("main"), ".chip.pick", function(x){ x.classList.remove("pick"); });
        pick = c; c.classList.add("pick"); tip(cfg.then);
      };
    });

    function finish(){
      done(cfg.id);
      var list = Object.keys(again);
      $("fb").innerHTML = '<div class="mark yes"><b>Round finished</b>'
        + 'All ' + items.length + ' sorted.'
        + (list.length ? ' Worth another look: <span class="jp-in">'
            + list.map(esc).join("\u3001") + '</span>.' : "")
        + '<p>' + esc(cfg.closing) + '</p>'
        + '<div class="btns">'
        + '<button class="btn sm ghost" id="again">Another round</button>'
        + (nxt ? '<button class="btn sm" id="onwards">Next: ' + esc(nxt.en)
                 + ' \u2192</button>' : "")
        + '</div></div>';
      tip("");
      $("again").onclick = function(){ if (cfg.next) cfg.next(); draw(); };
      if ($("onwards")) $("onwards").onclick = function(){ at++; draw(); };
    }

    function land(key, col){
      if (!pick) return;
      var c = pick, w = items[+c.dataset.i], ok = cfg.kindOf(w) === key;
      pick = null; c.classList.remove("pick");
      if (ok){
        c.classList.add("yes", "gone");
        ninja(c);
        col.querySelector(".in").appendChild(c);
        left--; score();
        /* Keyed on the word, not the round: いろ and いかな both deal a
           fresh handful every round out of a list of nine or twelve. */
        first(cfg.id + ":" + w.kana, 1, "sorted");
        $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
          + '<div class="ph">' + cfg.right(w) + '</div></div>';
        /* an empty dashed box is not worth the room it takes */
        if (!left){ $("pool").style.display = "none"; return finish(); }
        tip(cfg.hint);
      } else {
        c.classList.add("no");
        yokai(c);
        again[w.kana] = 1;
        var asked = cfg.wrong(w, key);
        /* No heading line: the red edge and the two labels already say it,
           and on a 320px phone every line costs a column header. */
        $("fb").innerHTML = '<div class="mark no">'
          + (asked ? '<div class="ph bad"><i>not</i>' + asked + '</div>' : "")
          + '<div class="ph"><i>yes</i>' + cfg.right(w) + '</div>'
          + '<p>' + esc(cfg.why(w)) + '</p></div>';
        setTimeout(function(){ c.classList.remove("no"); }, 1400);
        tip(cfg.hint);
      }
    }

    each($("main"), "[data-c]", function(col){
      function go(ev){
        if (ev && ev.target.closest(".chip")) return;
        land(col.dataset.c, col);
      }
      col.onclick = go;
      col.onkeydown = function(ev){
        if (ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); go(null); }
      };
    });
  }

  /* ---- 2. い か な ----
     Six at a time, drawn fresh each round, so "another round" is another
     exercise and not the same twelve reshuffled. Each adjective carries
     the noun it belongs in front of, because 長い goes with かみ and not with
     人, and a step that built 長い 人 would be teaching the wrong thing. */
  DRAW.sort = function(){
    var all = W.words.filter(function(x){
      return (x.kind === "i" || x.kind === "na") && x.group !== "colour";
    });
    sortGame({
      id: "sort",
      items: deal(all, 6, function(w){ return w.kind; }),
      hint: "Tap a word, then tap \u3044 or \u306a.",
      then: "Now tap \u3044 or \u306a.",
      closing: "An \u3044 adjective goes straight in front of the noun. A \u306a "
        + "adjective needs \u306a first.",
      cols: [{ key:"i",  cls:"i",  head:"\u3044" },
             { key:"na", cls:"na", head:"\u306a" }],
      kindOf: function(w){ return w.kind; },
      right: function(w){
        if (w.frame) return ruby(w.frame);
        return ruby(w.ja) + (w.kind === "na" ? '<b class="add">\u306a</b>' : "")
          + " " + ruby(w["with"]);
      },
      wrong: function(w){
        if (w.frame) return "";
        return w.kind === "na"
          ? ruby(w.ja) + " " + ruby(w["with"])
          : ruby(w.ja) + '<b class="add">\u306a</b> ' + ruby(w["with"]);
      },
      why: function(w){
        if (w.frame)
          return w.kana + " is an \u3044 adjective, but for a person it goes "
            + "with \u305b\u304c, not in front of a noun.";
        return w.kind === "na"
          ? w.kana + " is a \u306a adjective: it needs \u306a before a noun."
          : w.kana + " ends in \u3044 and goes straight in front of a noun, "
            + "with nothing added.";
      }
    });
  };

  /* ---- 3. 〜が 〜です ---- */
  DRAW.part = function(){
    var items = [];
    P.people.forEach(function(p){
      factsOf(p).forEach(function(f){
        if (f.id === "hair" || f.id === "eyes" || f.id === "tall")
          items.push({ p:p, f:f });
      });
    });
    var i = dealt("part", items.length);
    var it = items[i], p = it.p;
    /* Three pairs, each adjective next to the one it is really being
       told apart from. */
    var PAIRS = [["長[なが]い", "短[みじか]い"],
                 ["大[おお]きい", "小[ちい]さい"],
                 ["高[たか]い", "高[たか]くない"]];
    var all = [];
    PAIRS.forEach(function(pr){ all = all.concat(pr); });
    var want = it.f.ja.replace(/^[^が]*が /, "").replace(/です。$/, "");
    /* The opposite was drawn at random with everything else, so three
       times in five the one adjective the question is actually about was
       not among the four offered and the answer could be had without
       reading anything. It is always offered now. */
    var opp = null;
    PAIRS.forEach(function(pr){
      if (pr[0] === want) opp = pr[1];
      if (pr[1] === want) opp = pr[0];
    });
    var rest = shuffle(all.filter(function(a){
      return a !== want && a !== opp; })).slice(0, 2);
    var opts = shuffle([want].concat(opp ? [opp] : []).concat(rest));
    var head = it.f.ja.replace(/ [^ ]+です。$/, "");
    $("main").innerHTML = ruleFor("part")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 230) + '<div style="text-align:center"'
      + ' class="jp">' + esc(p.name) + 'さん</div></div>'
      + '<div class="q"><p class="jp">' + esc(p.name) + 'さんは '
      + ruby(head) + ' <u>　　　</u> です。</p>'
      + '<div class="grid cards" id="opts" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(deck("part", items.length).right).length + '</b> of '
      + items.length + '</span><span class="sp"></span>'
      + '<button class="btn sm" id="next">Next</button></div>';
    $("opts").innerHTML = opts.map(function(o){
      return '<button class="card" data-o="' + esc(o) + '">'
        + '<span class="ja k-i">' + ruby(o) + '</span></button>';
    }).join("");
    each($("main"), "[data-o]", function(b){
      b.onclick = function(){
        var ok = b.dataset.o === want;
        each($("main"), "[data-o]", function(x){
          x.classList.toggle("yes", x.dataset.o === want);
          if (x === b && !ok) x.classList.add("no");
        });
        if (ok) ninja(b); else yokai(b);
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + (ok ? "" : "Look at " + esc(it.f.look) + " again. ")
          + ruby(p.name + "さんは " + it.f.ja) + ' ' + saybtn(p.name + "さんは " + it.f.ja)
          + '</div>';
        wireSay();
        if (ok){
          first("part:" + p.id + ":" + it.f.id, 1, "right");
          gotRight("part", items.length, i, "part");
        }
      };
    });
    $("next").onclick = function(){ advance("part", items.length); draw(); };
  };

  /* ---- 4. 〜くて・〜で ---- */
  /* ---- 4. 〜くて・〜で ----
     Andrew, on the version before this one: "the くて tab I think gives
     away the answer once students notice the ending word has です."

     He found one of three. The step laid out three tiles and asked for
     them in order, and two of the three announced their own position:
     the person tile ended in は and the last tile ended in です. Worse
     than either, the middle tile arrived ALREADY CONJUGATED — あかるくて
     was printed on it — so the one thing this step exists to teach was
     done for the student before they touched it. What was left was
     putting the only unlabelled tile in the only empty slot.

     So the conjugating is now the task, in his own words: "Maybe don't
     conjugate. Ask the students to choose the correct conjugation from a
     few choices?"

     Two decisions a round, both of them real, both driven by reading the
     English rather than by reading the endings:

       1. WHICH ONE COMES FIRST. Both adjectives are offered in their
          dictionary form. Japanese is happy either way round — あかるくて
          親切です and 親切で あかるいです are both correct — so only the
          English settles it, and the student has to read it.
       2. WHICH FORM IT TAKES. Four forms of the word they chose. For an
          い adjective the stem plus くて against three near misses; for a
          な adjective, で against the くて a student reaches for out of
          habit.

     The frame carries は and です so that nothing on a tile gives away
     where it goes, and the distractors are built from the chosen word
     rather than listed in the data, so they cannot drift apart from it. */
  function joinForms(w){
    /* い adjectives drop the い and take くて; な adjectives take で. The
       wrong answers are the three mistakes a Year 8 actually makes, not
       noise: the two rules swapped, the two rules stacked, and no change
       at all. */
    var stem = w.ja.replace(/い$/, "");
    return w.kind === "i"
      ? [{ ja: stem + "くて", ok: true },
         { ja: w.ja + "で",   ok: false, why: "で joins a な adjective. "
             + w.kana + " ends in い." },
         { ja: stem + "くで",  ok: false, why: "Not くで. The い becomes くて." },
         { ja: w.ja,          ok: false, why: w.kana + " has to change before "
             + "it can join the next word." }]
      : [{ ja: w.ja + "で",    ok: true },
         { ja: w.ja + "くて",  ok: false, why: "くて joins an い adjective. "
             + w.kana + " is a な adjective." },
         { ja: w.ja + "いで",  ok: false, why: "Nothing is added to "
             + w.kana + " before で." },
         { ja: w.ja,          ok: false, why: w.kana + " has to change before "
             + "it can join the next word." }];
  }
  DRAW.join = function(){
    var nb = P.builder.length, i = dealt("join", nb);
    var b = P.builder[i];
    var p = null;
    P.people.forEach(function(x){ if (x.id === b.person) p = x; });
    /* The sentence in the data is the finished one. The two adjectives
       are taken back out of it in their dictionary form, so the data
       stays the thing Andrew wrote and the step does the undoing. */
    var parts = b.ja.replace(/。$/, "").split(" ");
    var joinedWord = parts[1], tailWord = parts[2].replace(/です$/, "");
    var first1 = null, second = null;
    W.words.forEach(function(w){
      if (w.ja === tailWord) second = w;
      if (joinedWord.indexOf(w.ja.replace(/い$/, "")) === 0
          && (w.kind === "i" || w.kind === "na")
          && (!first1 || w.ja.length > first1.ja.length)) first1 = w;
    });
    if (!first1 || !second){
      $("main").innerHTML = ruleFor("join") + '<div class="work"></div>';
      return;
    }
    var pair = shuffle([first1, second]);
    var chosen = null, formOk = false;

    $("main").innerHTML = ruleFor("join")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 190) + '</div>'
      + '<div class="q"><p class="en">' + esc(b.en) + '</p>'
      + '<div class="jline" id="line"></div>'
      + '<p class="hint" id="ask">Which one comes first? Read the English.</p>'
      + '<div class="tiles" id="pick"></div>'
      + '<div id="fb"></div></div>'
      + '</div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(deck("join", nb).right).length + '</b> of '
      + nb + '</span><span class="sp"></span>'
      + '<button class="btn ghost sm" id="clear">Start again</button>'
      + '<button class="btn ghost sm" id="next">Next</button></div>';

    function paintLine(){
      var a = chosen && formOk ? ruby(chosen.form)
            : (chosen ? '<u class="gap">' + ruby(chosen.w.ja) + ' ?</u>'
                      : '<u class="gap">　　　</u>');
      var c = chosen && formOk ? ruby(other(chosen.w).ja) : '<u class="gap">　　　</u>';
      $("line").innerHTML = '<span class="jp">' + esc(p.name) + 'さんは '
        + a + ' ' + c + 'です。</span>';
    }
    function other(w){ return w === first1 ? second : first1; }

    /* ---- decision 1: which adjective leads ---- */
    var glossed = false;
    function askWhich(){
      $("ask").textContent = "Which one comes first? Read the English.";
      /* The meanings are held back on the first go. Printing them next to
         the words turns reading the English into matching two words, and
         ことば is the step for meanings. They come out the moment a
         student gets it wrong, which is when they are help rather than
         the answer, and they cost nothing. */
      $("pick").innerHTML = pair.map(function(w, k){
        return '<button class="chip" data-w="' + k + '">' + ruby(w.ja)
          + (glossed ? '<i class="gl">' + esc(w.en) + '</i>' : '') + '</button>';
      }).join("");
      each($("pick"), "[data-w]", function(x){
        x.onclick = function(){
          var w = pair[+x.dataset.w];
          if (w !== first1){
            yokai(x);
            $("fb").innerHTML = '<div class="mark no"><b>The other way round</b>'
              + 'The English says <b>' + esc(b.en) + '</b> So '
              + esc(other(w).en.split(",")[0]) + ' comes first.</div>';
            glossed = true; askWhich();
            return;
          }
          chosen = { w: w, form: null };
          $("fb").innerHTML = "";
          paintLine(); askForm();
        };
      });
    }
    /* ---- decision 2: what it turns into ---- */
    function askForm(){
      var opts = shuffle(joinForms(chosen.w));
      $("ask").innerHTML = 'Now join <b class="jp">' + ruby(chosen.w.ja)
        + '</b> to the next word. Which form?';
      $("pick").innerHTML = opts.map(function(o, k){
        return '<button class="chip" data-f="' + k + '">' + ruby(o.ja) + '</button>';
      }).join("");
      each($("pick"), "[data-f]", function(x){
        x.onclick = function(){
          var o = opts[+x.dataset.f];
          if (!o.ok){
            x.classList.add("no");
            yokai(x);
            $("fb").innerHTML = '<div class="mark no"><b>Not that form</b>'
              + esc(o.why) + '</div>';
            setTimeout(function(){ x.classList.remove("no"); }, 1200);
            return;
          }
          chosen.form = o.ja; formOk = true;
          paintLine();
          ninja($("line"));
          $("ask").textContent = "";
          $("pick").innerHTML = "";
          $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
            + ruby(b.ja) + ' ' + saybtn(b.ja)
            + '<p>' + esc(chosen.w.kana) + ' is '
            + (chosen.w.kind === "i" ? 'an い adjective, so the い becomes くて.'
                                     : 'a な adjective, so it takes で.')
            + '</p></div>';
          wireSay();
          first("join:" + b.person + ":" + i, 3, "sentence");
          gotRight("join", nb, i, "join");
          each($("main"), ".score b", function(e){
            e.textContent = Object.keys(deck("join", nb).right).length;
          });
        };
      });
    }
    function restart(){
      chosen = null; formOk = false;
      $("fb").innerHTML = "";
      paintLine(); askWhich();
    }
    restart();
    $("clear").onclick = restart;
    $("next").onclick = function(){ advance("join", nb); draw(); };
  };

  /* ---- 5. だれですか ----
     Two things gave this away. The six cards were laid out in the order
     the people are written down and the answer walked through them one
     per round, so round three was the third card. And the clues were
     always the same three facts, so a student only ever read the hair
     and the eyes.

     Now the person comes off a shuffled deck, the cards are laid out in
     a fresh order each round, and the clues are picked at random and
     grown one at a time until they fit exactly one of the six.
     Sometimes that is the hair and the eyes, sometimes what they are
     wearing. */
  function cluesFor(p, all){
    var mine = factsOf(p).filter(function(f){ return f.seen; });
    var pool = shuffle(mine.slice()), picked = [];
    function fits(){
      return all.filter(function(q){
        if (q.id === p.id) return true;
        var theirs = factsOf(q).filter(function(f){ return f.seen; });
        return picked.every(function(f){
          return theirs.some(function(g){ return g.id === f.id && g.ja === f.ja; });
        });
      }).length;
    }
    for (var i = 0; i < pool.length; i++){
      picked.push(pool[i]);
      if (picked.length >= 2 && fits() === 1) break;
      if (picked.length >= 4) break;
    }
    /* A set that still fits two people is not a question. Fall back to
       the three the sanity check guarantees tell all six apart. */
    if (fits() !== 1) picked = [mine[0], mine[1], mine[2]];
    return picked;
  }
  DRAW.who = function(){
    var n = P.people.length, i = dealt("who", n), p = P.people[i];
    var clues = cluesFor(p, P.people), cards = shuffle(P.people.slice());
    var d = deck("who", n);
    $("main").innerHTML = ruleFor("who")
      + '<div class="work">'
      + clues.map(function(f){
          return '<p class="jp">' + ruby(f.ja) + ' ' + saybtn(f.ja) + '</p>';
        }).join("")
      + '<div class="grid cards" id="six" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(d.right).length + '</b> of ' + n + ' found'
      + '</span><span class="sp"></span>'
      + '<button class="btn sm" id="next">Next</button></div>';
    $("six").innerHTML = cards.map(function(x){
      return '<button class="card" data-p="' + esc(x.id) + '"'
        + ' style="text-align:center">' + figure(x, 130)
        + '<span class="ja">' + esc(x.name) + 'さん</span></button>';
    }).join("");
    each($("main"), "[data-p]", function(b){
      b.onclick = function(){
        var ok = b.dataset.p === p.id;
        b.classList.add(ok ? "yes" : "no");
        if (ok) ninja(b); else yokai(b);
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + (ok ? esc(p.name) + "さん." : "Check " + esc(clues[0].look)
                  + " and " + esc(clues[1].look) + ".") + '</div>';
        if (ok){
          first("who:" + p.id, 2, "found");
          gotRight("who", n, i, "who");
        }
      };
    });
    $("next").onclick = function(){ advance("who", n); draw(); };
  };

  /* ---- 7. いろ ----
     い colour or の colour, on a garment that changes every round, so
     the phrase built is a different phrase each time. The chip carries
     the colour as a swatch: that tells a student which colour it is
     without telling them which kind it is, which is the only thing the
     step is asking. */
  function swatch(k){
    var hex = (W.colour_hex || {})[k];
    return hex ? '<span class="sw" style="background:' + esc(hex) + '"></span>' : "";
  }
  DRAW.colour = function(){
    /* めがね sits first in the word list and is the one garment a
       colour reads oddly on, so it goes last rather than opening the step. */
    var all = W.words.filter(function(x){ return x.kind === "garment"; });
    var wear = all.filter(function(x){ return x.kana !== "めがね"; })
      .concat(all.filter(function(x){ return x.kana === "めがね"; }));
    var g = wear[dealt("colour", wear.length)];
    sortGame({
      id: "colour",
      items: deal(W.words.filter(function(x){ return x.group === "colour"; }),
                  9, function(w){ return w.kind === "i" ? "i" : "na"; }),
      hint: "Tap a colour, then tap the side it belongs on.",
      then: "Now tap a side.",
      closing: "No rule tells you which colour is which kind. Learn it with "
        + "the word, the way you learnt \u3044 and \u306a.",
      cols: [{ key:"i",  cls:"i",
               head:'\u3042\u304b\u3044 ' + ruby(g.ja) },
             { key:"na", cls:"na",
               head:'\u307f\u3069\u308a<b>\u306e</b> ' + ruby(g.ja) }],
      kindOf: function(w){ return w.kind === "i" ? "i" : "na"; },
      next: function(){ advance("colour", wear.length); },
      chip: function(w){ return swatch(w.kana) + ruby(w.ja); },
      right: function(w){
        return swatch(w.kana) + ruby(w.ja)
          + (w.kind === "i" ? "" : '<b class="add">\u306e</b>')
          + " " + ruby(g.ja);
      },
      wrong: function(w){
        return ruby(w.ja) + (w.kind === "i" ? '<b class="add">\u306e</b>' : "")
          + " " + ruby(g.ja);
      },
      why: function(w){
        return w.kind === "i"
          ? w.kana + " is an \u3044 adjective: nothing goes between it and "
            + kana(g.ja) + "."
          : w.kana + " is a noun: it needs \u306e before " + kana(g.ja) + ".";
      }
    });
  };

  /* ---- 8. きています ----
     The verb is chosen by where on the body the thing goes. The figure is
     on screen because the garment has to be found on it first. */
  DRAW.wear = function(){
    var items = [];
    P.people.forEach(function(p){
      var cl = p.facts.clothes || {};
      [["top","kiru"],["bottom","haku"],["shoes","haku"],
       ["hat","kaburu"],["extra","suru"]].forEach(function(pair){
        if (cl[pair[0]]) items.push({ p:p, item:cl[pair[0]][0], v:pair[1] });
      });
      if (p.facts.glasses) items.push({ p:p, item:"めがね", v:"kakeru" });
    });
    var i = dealt("wear", items.length);
    var it = items[i], V = W.verbs;
    var keys = Object.keys(V);
    $("main").innerHTML = ruleFor("wear")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(it.p, 220) + '</div>'
      + '<div class="q"><p class="jp">' + esc(it.p.name) + 'さんは '
      + ruby(it.item) + 'を <u>\u3000\u3000\u3000\u3000</u></p>'
      + '<div class="grid cards" id="opts" style="margin-top:10px"></div>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(deck("wear", items.length).right).length + '</b> of '
      + items.length + '</span><span class="sp"></span>'
      + '<button class="btn sm" id="next">Next</button></div>';
    $("opts").innerHTML = shuffle(keys).map(function(k){
      return '<button class="card" data-v="' + k + '">'
        + '<span class="ja">' + ruby(V[k].ja) + '</span></button>';
    }).join("");
    each($("main"), "[data-v]", function(b){
      b.onclick = function(){
        var ok = b.dataset.v === it.v;
        each($("main"), "[data-v]", function(x){
          x.classList.toggle("yes", x.dataset.v === it.v);
          if (x === b && !ok) x.classList.add("no");
        });
        if (ok) ninja(b); else yokai(b);
        var line = it.p.name + "さんは " + it.item + "を " + V[it.v].ja + "。";
        $("fb").innerHTML = '<div class="mark ' + (ok ? "yes" : "no") + '">'
          + '<b>' + (ok ? "Yes" : "Not that one") + '</b>'
          + esc(it.item) + " goes on " + esc(V[it.v].zone_en) + ", and that is "
          + esc(V[it.v].ja) + ". "
          + (ok ? "" : "You chose " + esc(V[b.dataset.v].ja) + ", which is for "
                  + esc(V[b.dataset.v].zone_en) + ".")
          + '<div class="jp" style="margin-top:4px">' + ruby(line) + ' '
          + saybtn(line) + '</div></div>';
        wireSay();
        if (ok){
          first("wear:" + it.p.id + ":" + it.item, 1, "right");
          gotRight("wear", items.length, i, "wear");
        }
      };
    });
    $("next").onclick = function(){ advance("wear", items.length); draw(); };
  };

  /* ---- きせかえ ----
     Andrew asked for this one: drag the clothes and the colours onto a
     figure to match what the voice says. It is the only step where the
     Japanese arrives by ear alone and has to come back out as something
     other than a tap, and it is the only one that asks for a whole
     outfit rather than one phrase.

     Three things it teaches that the other steps cannot.

     1. The verb is the zone. A garment dropped on the wrong part of the
        body is not a near miss, it is a different verb, and the marking
        says which.
     2. An い colour goes straight in front of the thing and a noun colour
        needs の. A student who hears みどりの セーター and puts a green
        jumper on has understood both halves.
     3. What was NOT said. Two of the outfits leave the feet bare, so a
        student who dresses the whole figure out of habit has added
        something the voice never mentioned.

     The text is off until it is asked for, because this is listening.
     The button that turns it on is right next to the one that plays the
     line, so nobody has to go looking for it, and what it shows is the
     same sentence the voice said, nothing more.

     The drawing shows position and colour. It cannot show the difference
     between シャツ, Tシャツ and セーター, which all draw the same, so
     whatever is on a zone is labelled with its name. The drawing carries
     what a drawing can carry and the label carries the rest. */
  var ZONE = {
    head:  { en:"the head",       slot:"hat",     verb:"kaburu" },
    eyes:  { en:"the eyes",       slot:"glasses", verb:"kakeru" },
    body:  { en:"the upper body", slot:"top",     verb:"kiru" },
    legs:  { en:"the lower body", slot:"bottom",  verb:"haku" },
    feet:  { en:"the feet",       slot:"shoes",   verb:"haku" },
    wrist: { en:"the wrist",      slot:"extra",   verb:"suru" }
  };
  var dressOn = {}, dressChecked = false;

  function wordBy(ja, kind){
    var hit = null;
    W.words.forEach(function(w){
      if (w.ja === ja && (!kind || w.kind === kind || w.group === kind)) hit = w;
    });
    return hit;
  }
  /* figure() draws a person. This hands it the outfit a student has
     built as if it were one, so there is one drawing and not two. */
  function dressFigure(on, h){
    var clothes = {}, labels = {};
    Object.keys(on).forEach(function(z){
      labels[z] = on[z][0];
      var slot = ZONE[z].slot;
      if (slot !== "glasses") clothes[slot] = [on[z][0], on[z][1] || ""];
    });
    return figure({ name:"", facts:{ hair:"short", colour:"black", eyes:"big",
      tall:true, glasses: !!on.eyes, clothes:clothes } },
      h, { bare:true, zones:true, labels:labels });
  }

  DRAW.dress = function(){
    var list = OF.outfits || [];
    if (!list.length){ $("main").innerHTML = '<div class="work"></div>'; return; }
    var n = list.length, i = dealt("dress", n), o = list[i];
    var d = deck("dress", n);
    /* dressOn and dressChecked outlive the step, which is what lets a
       half-dressed figure survive a repaint. It also froze the figure
       solid: check an outfit, go to another step, come back, and the
       zones still refused every drop because dressChecked was still
       true from last time and nothing clears it but Next and Start
       again. Coming back to a marked figure starts a fresh go at it. */
    if (dressChecked){ dressOn = {}; dressChecked = false; }
    var garments = W.words.filter(function(w){ return w.kind === "garment"; });
    var colours = W.words.filter(function(w){ return w.group === "colour"; });

    $("main").innerHTML = ruleFor("dress", "tight")
      + '<div class="work"><div class="who dress">'
      + '<div class="pic dressfig" id="fig"></div>'
      + '<div class="q">'
      + '<div class="row listen">'
      + '<button class="btn sm" id="playAll">▶ ' + o.items.length
      + (o.items.length === 1 ? ' sentence' : ' sentences') + '</button>'
      + o.items.map(function(_, k){
          return '<button class="say" data-line="' + k + '" aria-label="Line '
            + (k + 1) + '">' + (k + 1) + '</button>';
        }).join("")
      + '<span class="sp"></span>'
      + '<button class="tool" id="textBtn">' + (S.dressText ? "Hide text" : "Show text")
      + '</button></div>'
      + '<div id="script"></div>'
      + '<p class="hint">Drag a word onto the figure, or tap the word and then '
      + 'the place it goes. Clothes first, then a colour on top of them.</p>'
      + '<div class="tiles" id="gtray">'
      + garments.map(function(g){
          return '<button class="wchip" data-g="' + esc(g.ja) + '">'
            + '<span class="jp">' + ruby(g.ja) + '</span></button>';
        }).join("")
      + '</div>'
      + '<div class="tiles" id="ctray">'
      + colours.map(function(c){
          return '<button class="wchip cchip" data-c="' + esc(c.ja) + '">'
            + swatch(c.kana) + '<span class="jp">' + ruby(c.ja) + '</span></button>';
        }).join("")
      + '</div>'
      + '<div id="fb"></div>'
      + '</div></div></div>'
      + '<div class="foot"><span class="score"><b>'
      + Object.keys(d.right).length + '</b> of ' + n + ' dressed'
      + '</span><span class="sp"></span>'
      + '<button class="btn sm ghost" id="clear">Start again</button>'
      + '<button class="btn sm" id="check">Check</button>'
      + '<button class="btn sm" id="next">Next</button></div>';

    function paintScript(){
      $("textBtn").textContent = S.dressText ? "Hide text" : "Show text";
      /* This step is the only listening in the app, so the script is the
         answer and not a hint. Charged once per outfit, however many
         times it is turned on and off, and charged on the outfit being
         read rather than on the button, because the switch stays on when
         you press Next. */
      if (S.dressText) once("dtext:" + i, 2, "text shown");
      $("script").innerHTML = S.dressText
        ? o.items.map(function(it, k){
            return '<p class="jp">' + (k + 1) + '. ' + ruby(it.ja) + ' '
              + saybtn(it.ja) + '</p>';
          }).join("")
        : "";
      wireSay();
    }
    function paintFigure(){
      $("fig").innerHTML = dressFigure(dressOn, 0);
      wireZones();
    }
    function nudge(zone, msg){
      zone.classList.add("no");
      setTimeout(function(){ zone.classList.remove("no"); }, 700);
      $("fb").innerHTML = '<div class="mark no"><b>Not yet</b>' + esc(msg) + '</div>';
    }
    function wireZones(){
      dragdrop($("main"), ".wchip", "[data-zone]", {
        open: function(){ return !dressChecked; },
        land: function(chip, zone){
          var z = zone.getAttribute("data-zone");
          if (chip.dataset.g){
            /* Swapping the garment keeps the colour: a student who hears
               あかい シャツ, puts out あかい セーター and then fixes the
               garment should not have to find the colour again. */
            dressOn[z] = [chip.dataset.g, (dressOn[z] || [])[1] || null];
          } else {
            if (!dressOn[z])
              return nudge(zone, "Put the clothes on first, then the colour.");
            dressOn[z][1] = chip.dataset.c;
          }
          $("fb").innerHTML = "";
          paintFigure();
        }
      });
    }

    paintScript();
    paintFigure();

    var seq = 0;
    function playFrom(k, mine){
      if (mine !== seq || k >= o.items.length) return;
      if (!say(o.items[k].ja, function(){
            setTimeout(function(){ playFrom(k + 1, mine); }, 260);
          })) playFrom(k + 1, mine);
    }
    $("playAll").onclick = function(){ playFrom(0, ++seq); };
    each($("main"), "[data-line]", function(b){
      b.onclick = function(){ seq++; hush(); say(o.items[+b.dataset.line].ja); };
    });
    $("textBtn").onclick = function(){
      S.dressText = !S.dressText; save(); paintScript();
    };
    $("clear").onclick = function(){
      dressOn = {}; dressChecked = false;
      $("fb").innerHTML = ""; paintFigure();
    };
    $("next").onclick = function(){
      seq++; hush();
      dressOn = {}; dressChecked = false;
      advance("dress", n); draw();
    };

    /* ---- the marking ----
       Every zone the voice named, then every zone it did not. A garment
       in the wrong place is told what verb it just asked for, because
       that is the mistake and not the position. */
    $("check").onclick = function(){
      dressChecked = true;
      var V = W.verbs, rows = [], wrong = 0;
      /* The place you drop a thing IS the verb you have chosen, so a
         garment in the wrong place is told which verb it just asked for
         and which one it wanted. That is the whole of this step. */
      function verbNote(z, garment){
        var g = wordBy(garment, "garment");
        if (!g || ZONE[z].verb === g.verb) return "";
        return " " + esc(garment) + " is " + esc(V[g.verb].ja) + ", for "
          + esc(V[g.verb].zone_en) + ", and " + esc(ZONE[z].en) + " is "
          + esc(V[ZONE[z].verb].ja) + ".";
      }
      function mark(ok, head, body){
        rows.push('<div class="mark ' + (ok ? "yes" : "no") + '"><b>'
          + esc(head) + '</b>' + body + '</div>');
        if (!ok) wrong++;
      }
      o.items.forEach(function(it){
        var got = dressOn[it.zone], line = ruby(it.ja) + ' ' + saybtn(it.ja);
        if (!got)
          return mark(false, "Nothing on " + ZONE[it.zone].en.replace(/^the /, ""),
            '<div class="jp-in">' + line + '</div>');
        if (got[0] !== it.garment){
          return mark(false, "Not that one",
            esc(got[0]) + " is on " + esc(ZONE[it.zone].en) + ", and the voice said "
            + esc(it.garment) + "." + verbNote(it.zone, got[0])
            + '<div class="jp-in">' + line + '</div>');
        }
        if ((got[1] || null) !== (it.colour || null)){
          if (!it.colour)
            return mark(false, "No colour on this one",
              esc(it.garment) + " takes no colour here. The voice said "
              + '<span class="jp-in">' + esc(it.ja) + '</span>.');
          var c = wordBy(it.colour, "colour");
          return mark(false, "The right thing, the wrong colour",
            esc(it.garment) + " is in the right place. The colour is "
            + esc(it.colour) + (got[1] ? ", not " + esc(got[1]) : "") + "."
            + (c && c.kind === "noun"
                ? " " + esc(it.colour) + " is a noun, so it takes の before "
                  + esc(it.garment) + "."
                : "")
            + '<div class="jp-in">' + line + '</div>');
        }
        mark(true, "Yes", '<div class="jp-in">' + line + '</div>'
          + '<p>' + esc(it.garment) + " goes on " + esc(V[wordBy(it.garment, "garment").verb].zone_en)
          + ", and that is " + esc(V[wordBy(it.garment, "garment").verb].ja) + ".</p>");
      });
      /* Anything on a zone the voice never mentioned. */
      Object.keys(dressOn).forEach(function(z){
        var named = o.items.some(function(it){ return it.zone === z; });
        if (named) return;
        mark(false, "The voice never said this",
          esc(dressOn[z][0]) + " is on " + esc(ZONE[z].en)
          + ", and nothing was said about " + esc(ZONE[z].en) + "."
          + verbNote(z, dressOn[z][0]));
      });
      var ok = !wrong;
      $("fb").innerHTML = rows.join("");
      each($("main"), "[data-zone]", function(zel){
        var z = zel.getAttribute("data-zone");
        var want = null;
        o.items.forEach(function(it){ if (it.zone === z) want = it; });
        var got = dressOn[z];
        var right = want && got && got[0] === want.garment
          && (got[1] || null) === (want.colour || null);
        if (want || got) zel.classList.add(right ? "yes" : "no");
      });
      if (ok){
        ninja($("fig"));
        first("dress:" + i, 4, "outfit");
        gotRight("dress", n, i, "dress");
        /* The readout is in the footer and the footer is not redrawn by a
           check, so it is moved by hand. A student who has just dressed
           the figure should see the count go up without pressing Next. */
        each($("main"), ".score b", function(e){
          e.textContent = Object.keys(deck("dress", n).right).length;
        });
      }
      else yokai($("fig"));
      wireSay();
    };
  };

  /* ---- 9. ルーレット ----
     Andrew asked for a spinning wheel for random word practice. A wheel
     on its own is a picker, not a task, so the drum carries the English
     and the student types the Japanese. That way the thing it chooses is
     a question rather than an answer, and what they produce is checkable
     rather than self-marked.

     Kana or kanji both pass: the kanji are a draft set and a student who
     writes かみ for hair has not got it wrong. */
  var spinR = null, spinWord = null;
  DRAW.spin = function(){
    /* The words come off a deck, so every one of them comes up before any
       of them comes up twice. The drum rebuilds its own order on each
       spin and is thrown at the speed that lands on the dealt word, which
       is why no two spins look alike. */
    var pool = W.words.filter(function(w){ return w.kind !== "verb"; });
    var items = shuffle(pool);
    var N = items.length;
    var t = tallyOf("spin");
    $("main").innerHTML = ruleFor("spin")
      + '<div class="work fit">'
      + '<div class="reel" id="reel">'
      + '<div class="rwin"><div class="rstrip"></div><div class="rmark"></div></div>'
      + '<button class="rspin" id="rgo" aria-label="Spin">'
      + '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
      + ' stroke="currentColor" stroke-width="2" stroke-linecap="round">'
      + '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3v4h-4"/>'
      + '</svg></button></div>'
      + '<div id="ask"></div></div>'
      + '<div id="fb" class="fbslot"></div>'
      + '<div class="foot"><span class="score"><b>' + t.right
      + '</b> right</span><span class="sp"></span>'
      + '<span id="tip">Flick the drum, or press the button.</span></div>';
    var byId = {};
    items.forEach(function(w){ byId[w.en] = w; });
    spinR = REEL.mount($("reel"), items.map(function(w){
      return { id: w.en, html: esc(w.en), sub: "" };
    }), function(it){ landed(byId[it.id]); });
    /* The question from the last spin comes off the screen the moment the
       drum starts. It used to sit there for the whole four seconds, asking
       for a word that is no longer the word. */
    function clearAsk(){
      $("fb").innerHTML = "";
      $("ask").innerHTML = "";
      $("tip").textContent = "Spinning\u2026";
    }
    $("rgo").onclick = function(){
      CLICK.wake();          /* start the audio engine inside the gesture */
      clearAsk();
      /* dealt, not drawn at random: a word that has come up waits for the
         rest of them before it comes up again */
      spinR.spinTo(items[dealt("spin", N)].en);
    };
    $("reel").querySelector(".rwin").addEventListener("pointerdown", clearAsk);

    function landed(w){
      spinWord = w;
      /* The deck only moves on when the drum stopped on the word it dealt.
         A student who throws the drum by hand lands where physics puts
         them, and the dealt word waits its turn. */
      if (items[dealt("spin", N)] === w) advance("spin", N);
      $("tip").textContent = "Write it in Japanese.";
      $("ask").innerHTML =
          '<p class="ask-en">Say and write: <b>' + esc(w.en) + '</b></p>'
        + '<div class="row"><input id="sin" type="text" autocomplete="off"'
        + ' autocapitalize="off" spellcheck="false" lang="ja"'
        + ' aria-label="Write it in Japanese">'
        + '<button class="btn ghost sm" id="shint">First letter</button>'
        + '<button class="btn sm" id="sgo">Check</button></div>';
      $("sin").focus();
      $("sin").onkeydown = function(ev){ if (ev.key === "Enter") check(); };
      $("sgo").onclick = check;
      /* The one support in this step. A first kana is enough to unstick
         a word you half know and no help at all with one you do not, so
         it costs a point and the word is still typed by hand. */
      $("shint").onclick = function(){
        spend(1, "first letter");
        $("sin").value = w.kana.slice(0, 1);
        $("sin").focus();
        $("shint").disabled = true;
      };
    }
    function check(){
      var w = spinWord, got = ($("sin").value || "").replace(/[\s\u3000]+/g, "");
      if (!got) return;
      var ok = got === w.kana || got === plain(w.ja);
      if (ok){
        t.right++;
        first("spin:" + w.kana, 1, "word");
        if (t.right >= 8) done("spin");
        ninja($("sin"));
        $("fb").innerHTML = '<div class="mark yes"><b>Yes</b>'
          + '<div class="ph">' + ruby(w.ja) + ' ' + saybtn(w.ja)
          + '</div></div>';
        $("ask").innerHTML = "";
        $("tip").textContent = "Spin again.";
        wireSay();
        draw9();
      } else {
        yokai($("sin"));
        $("fb").innerHTML = '<div class="mark no">'
          + '<div class="ph bad"><i>not</i>' + esc(got) + '</div>'
          + '<div class="ph"><i>yes</i>' + ruby(w.ja) + ' ' + saybtn(w.ja)
          + '</div><p>' + esc(w.en) + ' is ' + esc(w.kana)
          + (plain(w.ja) !== w.kana ? ', written ' + esc(plain(w.ja)) : '')
          + '.</p></div>';
        $("sin").select();
        wireSay();
      }
    }
    function draw9(){
      $("main").querySelector(".score").innerHTML =
        '<b>' + t.right + '</b> right';
    }
  };

  var GAME = null, onResize = null;
  DRAW.katch = function(){
    /* Every word with an English meaning, which is all of them bar the
       wearing verbs: "to wear on the head" falling out of the sky is a
       phrase, not a word, and it does not read at 15 pixels. */
    var pool = W.words.filter(function(w){ return w.kind !== "verb" && w.en; });
    $("main").innerHTML = ruleFor("katch", "tight")
      + '<div class="work fit arcadewrap">'
      /* The prompt is OUTSIDE the game screen, at page-text size, which
         is where Andrew wanted it: the question is the one thing here
         that is not meant to be a game. */
      + '<div class="prompt" id="prompt"><span class="lab">CATCH</span>'
      + '<b id="promptw">—</b></div>'
      + '<canvas id="arc" class="arcade" width="320" height="200"'
      + ' tabindex="0" aria-label="Catch the word: a word game"></canvas>'
      + '</div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span>'
      + '<span class="hint">Drag the bar, or use the arrow keys.</span>'
      + '<button class="btn sm" id="go">Start</button></div>';
    function tally(){
      var n = 0;
      pool.forEach(function(w){ if (S.won["catch:" + w.kana]) n++; });
      $("sc").innerHTML = '<b>' + n + '</b> of ' + pool.length + ' caught';
      return n;
    }
    tally();
    if (GAME) GAME.stop();
    GAME = arcade({
      canvas: $("arc"),
      words: pool,
      tune: W.tune,
      best: S.best || 0,
      font: 18,
      /* Andrew: "words like 長い are not rendering properly with kanji so
         just show all words in kana unless they are single kanji like
         口、手、耳、目". At this size a kanji with more than a few strokes
         is a smudge, and a smudge is not a reading task. One character
         survives it; 長い does not, so it falls as ながい. In this list
         that leaves 目 as kanji and takes seven words to kana. */
      label: function(w){
        var ja = plain(w.ja);
        return (ja.length === 1 && /[\u4e00-\u9fff]/.test(ja)) ? ja : (w.kana || ja);
      },
      onPrompt: function(w){
        $("promptw").textContent = w ? w.en : "—";
        $("prompt").classList.toggle("live", !!w);
      },
      onCatch: function(w){
        /* The same rule as everywhere else in this app: a word pays the
           first time it is caught and never again, so a long run is its
           own reward and not a way of farming points. */
        first("catch:" + w.kana, 1, "caught");
        if (tally() >= 10) done("katch");
      },
      onOver: function(score){
        if (score > (S.best || 0)){ S.best = score; save(); }
      }
    });
    document.body.classList.add("gamefull");
    /* ---- how big the screen can be ----
       The game is given exactly the room that is left once the rung bar,
       the question and the footer have taken theirs, and the width
       follows from that rather than the other way round. Measured, not
       guessed: the bars wrap differently at different widths and with
       different fonts, and a calc() with three estimated heights put the
       bat and the score behind the footer on half the sizes tried.

       The explanation above the screen is left where it is and scrolls
       away, which is what Andrew asked for: the wrap is made exactly one
       screenful tall, so scrolling to the end of it brings the whole
       game into view and stops. */
    function fitGame(){
      var cv = $("arc"); if (!cv) return;
      var main = document.querySelector("main");
      var wrap = $("arc").parentNode;
      var foot = main.querySelector(".foot");
      var pr = $("prompt");
      if (!main || !wrap || !foot) return;
      var footH = foot.offsetHeight;
      var promptH = pr ? pr.offsetHeight + 8 : 0;
      wrap.style.minHeight = Math.max(160, main.clientHeight - footH) + "px";
      /* 16px of slack: the screen has a 3px border on each side, the
         wrap has padding, and a measurement that lands exactly on the
         footer puts the bat under it. Being a few pixels small is
         invisible; being a few pixels large hides the score. */
      var room = main.clientHeight - footH - promptH - 16;
      var w = Math.min(wrap.clientWidth, 900, Math.max(220, room * 1.6));
      cv.style.width = Math.floor(w) + "px";
    }
    fitGame();
    onResize = fitGame;
    window.addEventListener("resize", fitGame);

    $("go").onclick = function(){
      $("arc").focus();
      /* put the whole screen in view: the explanation above it has done
         its job by the time anybody presses this */
      var box = $("prompt");
      if (box && box.scrollIntoView) box.scrollIntoView({ block: "start" });
      GAME.start();
    };
    /* The only test seam in this app. Everything else here is driven
       through the real DOM, but a game loop cannot be: a test has to be
       able to put a known word at a known height and see what the rules
       do with it, and clicking at pixels on a moving canvas tests the
       test rather than the game. Reading it changes nothing. */
    window.HITO_GAME = GAME;
  };

  /* ---- 9. かいてみよう ----
     The only screen with no Japanese on it to copy. */
  DRAW.write = function(){
    var np = P.people.length, p = P.people[dealt("write", np)];
    var fs = factsOf(p);
    var prev = S.wrote[p.id] || "";
    $("main").innerHTML = ruleFor("write")
      + '<div class="work"><div class="who">'
      + '<div class="pic">' + figure(p, 300)
      + '<div style="text-align:center" class="jp">' + esc(p.name) + 'さん</div>'
      /* The drawing shows the hair, the eyes, the height and the clothes.
         It cannot show 親切, so the two personality words are handed over
         in English: the student still has to produce the Japanese, which
         is the whole job of this step, and nothing Japanese is on screen
         to copy. Without this the marker was calling a guess true. */
      + '<div class="brief">What they are like: <b>'
      + fs.filter(function(f){ return !f.seen; })
          .map(function(f){ return esc(f.en); }).join('</b>, <b>')
      + '</b></div></div>'
      + '<div class="q"><textarea id="ta" rows="7" spellcheck="false"'
      + ' aria-label="Write three sentences"></textarea>'
      + '<div id="fb"></div></div></div></div>'
      + '<div class="foot"><span class="score" id="sc"></span>'
      + '<span class="sp"></span>'
      + '<button class="btn sm" id="check">Check</button>'
      + '<button class="btn ghost sm" id="next">Another person</button></div>';
    $("ta").value = prev;
    $("next").onclick = function(){ advance("write", np); draw(); };
    $("ta").oninput = function(){ S.wrote[p.id] = $("ta").value; save(); };
    $("check").onclick = function(){
      var raw = $("ta").value;
      S.wrote[p.id] = raw; save();
      var lines = raw.split(/[。\n]/).map(function(x){
        return x.replace(/[\s　]+/g, "");
      }).filter(function(x){ return x.length; });
      var out = [], right = 0, joined = false;
      lines.forEach(function(ln){
        var hit = null, bad = null, note = null;
        fs.forEach(function(f){
          if (hit) return;
          if (f.judge){
            var v = f.judge(ln);
            if (v === true) hit = f;
            else if (v && v.msg && !note) note = v.msg;
          } else if (f.re && f.re.test(ln)) hit = f;
        });
        fs.forEach(function(f){ if (!bad && f.wrong && f.wrong.test(ln)) bad = f; });
        if (/くて|で(?!す)/.test(ln)) joined = true;
        if (hit){
          right++;
          out.push('<div class="mark yes"><b>True</b>' + esc(ln) + '</div>');
        } else if (note){
          out.push('<div class="mark no"><b>Nearly</b>' + esc(note) + '</div>');
        } else if (bad){
          out.push('<div class="mark no"><b>Good Japanese, not this person</b>'
            + 'Look at ' + esc(bad.look) + ' again.</div>');
        } else if (!/[぀-ヿ一-鿿]/.test(ln)){
          out.push('<div class="mark no"><b>Not Japanese</b>'
            + esc(ln) + '</div>');
        } else {
          out.push('<div class="mark hm"><b>Cannot check this one</b>'
            + esc(ln) + '<p>This app knows the hair, eyes, height, glasses '
            + 'and personality, and nothing else. Ask your teacher whether '
            + 'this is good Japanese.</p></div>');
        }
      });
      if (!lines.length) out.push('<div class="mark no"><b>Nothing yet</b>'
        + 'Three sentences about the person on the left.</div>');
      if (lines.length && !joined)
        out.push('<div class="mark hm"><b>Still to do</b>Join two '
          + 'descriptions in one sentence with くて or で.</div>');
      $("fb").innerHTML = out.join("");
      $("sc").innerHTML = '<b>' + right + '</b> true of ' + esc(p.name) + 'さん';
      /* This screen marks the whole thing at once rather than line by
         line, so it gets one creature rather than three: the ninja when
         the three sentences are there and joined, the かさおばけ when the
         student has written something and none of it is true of this
         person. Nothing at all for a half-finished answer, because a
         creature every time somebody pauses to think is a nag. */
      if (right >= 3 && joined){
        ninja($("sc"));
        first("write:" + p.id, 3, "person");
        done("write");
      }
      else if (lines.length && !right) yokai($("sc"));
    };
  };

  paintToggles();
  draw();
})();
