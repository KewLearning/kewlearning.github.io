/* welcome.js — the neon sign an app opens with.
   ---------------------------------------------------------------------------
   Andrew asked メガセンテンス to open with a flashing multicoloured neon sign
   that floats, holds long enough to wake a room up and say where they are,
   and then gets out of the way. If it works there it goes on every app, so
   it lives here as a module and the apps carry copies, the way tabs.js and
   nyuuryoku.js do: canonical at the repo root, copied into each app, and
   tools/tab-check.js refuses to run while a copy has drifted.

       WELCOME.show({ ja: "メガセンテンス", en: "MEGASENTENCE" });

   WHAT IT DOES. Dims the room for about three and a half seconds, flickers
   the tubes on one character at a time, bobs the sign the way a title
   floats in a slide, then lifts it away and leaves the page exactly as it
   was. Nothing of it survives: the overlay is removed from the document,
   not hidden.

   WHAT IT NEVER DOES. It never takes a tap. The overlay is pointer-events:
   none from the first frame to the last, so a student who knows where they
   are going can tap straight through it, and that tap also ends the sign.
   It never runs twice on a page, never runs on a tab change, and never
   leaves an animation running behind the app.

   THE COLOURS ARE NOT THE APP'S COLOURS. Everywhere else in these apps a
   hue means something — a group, a rung, a right answer. Neon means
   nothing except welcome, which is why it lives in an overlay with its own
   palette and is gone before the first question.

   REDUCED MOTION gets the quiet version: the sign fades up, holds, fades
   out, with no flicker and no float. A welcome a student did not ask for
   is exactly what that setting is for.                                   */
"use strict";
window.WELCOME = (function(){
  var schema_version = 1;
  /* six tubes, repeated across however many characters there are */
  var HUES = ["#ff3d9a", "#2fe0ff", "#ffd23d", "#4dff88", "#ff8a3d", "#c47bff"];
  var CSS = [
    '.wel{position:fixed;inset:0;z-index:9000;pointer-events:none;',
    '  display:flex;align-items:center;justify-content:center;',
    '  background:rgba(9,12,20,.86);opacity:0;transition:opacity .45s ease}',
    '.wel.on{opacity:1}',
    '.wel.off{opacity:0}',
    '.wel-sign{text-align:center;padding:26px 34px;border-radius:18px;',
    '  border:2px solid rgba(255,255,255,.16);',
    '  box-shadow:0 0 22px rgba(255,255,255,.08) inset;',
    '  transform:translateY(26px) scale(.86);opacity:0;filter:blur(6px);',
    '  transition:transform .62s cubic-bezier(.2,.9,.25,1.15),opacity .5s,filter .5s}',
    '.wel.on .wel-sign{transform:translateY(0) scale(1);opacity:1;filter:none}',
    '.wel.off .wel-sign{transform:translateY(-16px) scale(1.07);opacity:0;',
    '  filter:blur(3px)}',
    '.wel.float .wel-sign{animation:wel-bob 2.4s ease-in-out infinite alternate}',
    '.wel-ja{font-family:var(--jp,sans-serif);font-weight:700;line-height:1.1;',
    '  font-size:clamp(38px,11vw,96px);white-space:nowrap}',
    '.wel-en{margin-top:10px;font-family:var(--font,sans-serif);font-weight:700;',
    '  letter-spacing:.3em;font-size:clamp(11px,2.4vw,19px);white-space:nowrap}',
    '.wel-c{display:inline-block;color:#fff;',
    '  text-shadow:0 0 4px #fff,0 0 12px var(--n),0 0 26px var(--n),0 0 48px var(--n)}',
    '.wel.flicker .wel-c{animation:wel-tube .9s steps(1,end) both}',
    '.wel-rule{height:2px;margin:16px auto 0;width:min(62vw,420px);border-radius:2px;',
    '  background:linear-gradient(90deg,#ff3d9a,#ffd23d,#4dff88,#2fe0ff,#c47bff);',
    '  box-shadow:0 0 12px rgba(255,255,255,.5)}',
    '@keyframes wel-bob{from{transform:translateY(-7px) rotate(-.6deg)}',
    '  to{transform:translateY(7px) rotate(.6deg)}}',
    '@keyframes wel-tube{0%{opacity:0}8%{opacity:1}12%{opacity:.15}',
    '  20%{opacity:1}26%{opacity:.3}32%{opacity:1}44%{opacity:.5}',
    '  52%{opacity:1}100%{opacity:1}}'
  ].join("\n");

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }
  function tubes(text, cls, lit){
    var out = "", n = 0;
    Array.prototype.forEach.call(String(text), function(ch){
      if (ch === " "){ out += '<span class="wel-c">&nbsp;</span>'; n++; return; }
      out += '<span class="wel-c" style="--n:' + HUES[n % HUES.length]
           + (lit ? ";animation-delay:" + (n * 0.055).toFixed(3) + "s" : "")
           + '">' + esc(ch) + '</span>';
      n++;
    });
    return '<div class="' + cls + '">' + out + '</div>';
  }

  var live = null;
  function show(opts){
    opts = opts || {};
    if (live || !document.body) return false;
    var quiet = window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hold = opts.hold || (quiet ? 1100 : 1900);

    var style = document.createElement("style");
    style.textContent = CSS;
    var box = document.createElement("div");
    box.className = "wel";
    box.setAttribute("aria-hidden", "true");
    box.innerHTML = '<div class="wel-sign">'
      + tubes(opts.ja || "", "wel-ja", !quiet)
      + '<div class="wel-rule"></div>'
      + (opts.en ? tubes(opts.en, "wel-en", !quiet) : "")
      + '</div>';
    document.head.appendChild(style);
    document.body.appendChild(box);
    live = { box: box, style: style, timers: [] };

    function later(fn, ms){ live.timers.push(setTimeout(fn, ms)); }
    requestAnimationFrame(function(){
      box.classList.add("on");
      if (!quiet) box.classList.add("flicker");
      /* the float starts once the tubes are all lit, so the sign settles
         before it begins to drift */
      if (!quiet) later(function(){ box.classList.add("float"); }, 950);
    });
    later(end, (quiet ? 500 : 1000) + hold);

    /* a tap anywhere goes to the page under it and also ends the sign */
    ["pointerdown", "keydown", "wheel"].forEach(function(ev){
      window.addEventListener(ev, end, { once: true, passive: true });
    });
    return true;
  }
  function end(){
    if (!live) return;
    var it = live;
    live = null;
    it.timers.forEach(clearTimeout);
    it.box.classList.remove("float", "flicker");
    it.box.classList.add("off");
    setTimeout(function(){
      if (it.box.parentNode) it.box.parentNode.removeChild(it.box);
      if (it.style.parentNode) it.style.parentNode.removeChild(it.style);
    }, 520);
  }
  return { schema_version: schema_version, show: show, end: end,
           showing: function(){ return !!live; } };
})();
