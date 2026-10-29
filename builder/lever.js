/* ============================================================
   lever.js — the language lever, shared by every page of the hub
   ------------------------------------------------------------
   The whole site is Japanese-first. Any page includes this one
   file, hands it a dictionary of four-form strings, and gets:

     - a big page lever mounted in the margin (fixed, follows you
       down the page), pulling kanji -> +kana -> English. The lever
       has three stops. The romaji form (index 2) is still carried
       in every string so old data keeps working, but the lever
       never stops there: the top of the track is English.
     - small section levers for sub-sections, which are MORE
       FORGIVING: they recoil far slower, and they pause entirely
       while your pointer is inside the section you are reading
     - four-form text swapping on any [data-jt] element
     - per-label tap bumps on .jt-tap elements

   The lever holds wherever it is held. On release the recoil is a
   spring-loaded catch, not a slide: hold, creep under tension,
   snap onto the notch, wobble. The applied stage changes on the
   snap, because that is when the mechanism actually moves.

   No dependencies, no build step. It injects its own CSS so a
   page needs exactly one script tag. Forms are always
   [kanji, kana, romaji, English]; form() reports a FORM index
   (0, 1 or 3), never a stop index, so consumers can keep indexing
   their four-form arrays.
   ============================================================ */
window.HubLever = (function () {
  "use strict";

  var STAGE_NAMES = ["漢字", "かな", "EN"];
  /* The stops are deliberately UNEVEN. Adding furigana is a nudge;
     English is a long stretch to the bottom of the track. The mechanic
     then says what the pedagogy says: the further you reach from
     Japanese, the more work it takes and the harder the spring pulls
     you back. Percentages down the track. */
  var STOPS = [10, 26, 90];
  var FORMS = [0, 1, 3];   // stop index -> form index in a four-form string
  var LAST = STOPS.length - 1;
  var SPAN = STOPS[LAST] - STOPS[0];
  var STAGE_ARIA = ["kanji", "kana", "English"];
  // the stop a form index sits on (form 2, romaji, rounds down to kana)
  function stopOf(f) {
    var i = 0;
    for (var k = 0; k < FORMS.length; k++) if (FORMS[k] <= f) i = k;
    return i;
  }

  var STR = {};        // key -> [kanji, kana, romaji, English]
  var RUBY = {};       // key -> kanji with <ruby> furigana, for stage 1
  var form = 0;        // the page FORM index: 0 kanji, 1 kana, 3 English
  var onChange = null;
  var page = null;
  var sections = [];

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------------- CSS (injected once) ---------------- */
  var CSS = [
    ".lever{position:absolute;z-index:60;display:flex;flex-direction:column;align-items:center;",
    "  gap:3px;user-select:none;touch-action:none}",
    /* the page lever: a machine bolted to the side of the page */
    ".lever-page{position:fixed;top:50%;right:14px;transform:translateY(-50%);",
    "  background:var(--paper);border:2px solid var(--line);border-radius:18px;",
    "  padding:13px 13px 9px 50px;box-shadow:0 4px 18px rgba(0,0,0,.13);gap:6px}",
    ".lever-cap{font-size:9.5px;font-weight:800;letter-spacing:.14em;color:var(--muted);",
    "  text-transform:uppercase;line-height:1.1;text-align:center}",
    ".lever-mini{position:relative;top:auto;right:auto;display:inline-flex;vertical-align:middle;margin-left:10px}",
    ".lever-track{position:relative;width:26px;border-radius:15px;",
    "  background:linear-gradient(180deg,var(--bg),var(--line-soft));",
    "  border:2px solid var(--line);box-shadow:inset 0 2px 5px rgba(0,0,0,.13)}",
    ".lever-page .lever-track{height:196px;width:30px}",
    ".lever-mini .lever-track{height:74px;width:19px;border-width:1px}",
    ".lever-notch{position:absolute;left:50%;transform:translate(-50%,-50%);width:9px;height:9px;",
    "  border-radius:50%;background:var(--line);box-shadow:inset 0 1px 1px rgba(0,0,0,.15)}",
    ".lever-mini .lever-notch{width:5px;height:5px}",
    "@keyframes lever-hit{0%{transform:translate(-50%,-50%) scale(2.1);background:var(--accent)}",
    "  100%{transform:translate(-50%,-50%) scale(1);background:var(--line)}}",
    ".lever-notch.hit{animation:lever-hit .38s ease-out}",
    ".lever-notch-label{position:absolute;right:calc(100% + 11px);transform:translateY(-50%);",
    "  font-size:11.5px;font-weight:800;letter-spacing:.4px;color:var(--muted);white-space:nowrap;",
    "  opacity:.5;transition:opacity .2s,color .2s;pointer-events:none}",
    ".lever-notch-label.on{opacity:1;color:var(--accent)}",
    /* the knob */
    ".lever-handle{position:absolute;left:50%;transform:translate(-50%,-50%);width:34px;height:34px;",
    "  border-radius:50%;cursor:grab;border:2px solid #7c2424;",
    "  background:radial-gradient(circle at 32% 28%, #d96a5a, var(--accent) 55%, #7c2424);",
    "  box-shadow:0 3px 6px rgba(0,0,0,.25), inset 0 -3px 5px rgba(0,0,0,.18);",
    "  transition:top .45s cubic-bezier(.34,1.56,.64,1), transform .15s ease}",
    ".lever-page .lever-handle{width:46px;height:46px;border-width:3px;",
    "  box-shadow:0 5px 10px rgba(0,0,0,.28), inset 0 -4px 7px rgba(0,0,0,.2)}",
    ".lever-handle::after{content:\"\";position:absolute;top:5px;left:8px;width:9px;height:6px;",
    "  border-radius:50%;background:rgba(255,255,255,.55);transform:rotate(-25deg)}",
    ".lever-page .lever-handle::after{top:7px;left:11px;width:13px;height:8px}",
    ".lever-mini .lever-handle{width:19px;height:19px;border-width:1px}",
    ".lever-mini .lever-handle::after{top:3px;left:5px;width:6px;height:4px}",
    "@keyframes lever-wobble{0%{transform:translate(-50%,-50%) scale(1.18,.84)}",
    "  28%{transform:translate(-50%,-50%) scale(.90,1.13)}",
    "  52%{transform:translate(-50%,-50%) scale(1.07,.95)}",
    "  74%{transform:translate(-50%,-50%) scale(.97,1.03)}",
    "  100%{transform:translate(-50%,-50%) scale(1,1)}}",
    ".lever-handle.wobble{animation:lever-wobble .40s cubic-bezier(.3,.7,.4,1)}",
    ".lever.dragging .lever-handle{cursor:grabbing;animation:none;transition:transform .15s ease;",
    "  transform:translate(-50%,-50%) scale(1.12,.94)}",
    ".lever-handle:hover,.lever:focus-visible .lever-handle{border-color:#5d1a1a;",
    "  box-shadow:0 3px 8px rgba(0,0,0,.3), inset 0 -3px 5px rgba(0,0,0,.18)}",
    ".lever:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:16px}",
    ".lever-stage{font-size:13px;font-weight:800;letter-spacing:.3px;color:var(--accent);",
    "  min-height:17px;text-align:center}",
    ".lever-mini .lever-stage{font-size:8.5px;min-height:11px;color:var(--muted)}",
    /* a section lever that is resting because you are reading inside it */
    ".lever-mini.resting .lever-handle{border-color:#5d1a1a}",
    /* four-form text */
    ".jt-tap{cursor:pointer}",
    ".jt-tap:hover{text-decoration:underline dashed var(--line);text-underline-offset:4px}",
    ".jt-sub{display:block;font-size:.55em;font-weight:400;color:var(--muted);letter-spacing:.4px;margin-top:2px}",
    "[data-jt] rt{font-size:.5em;font-weight:400;color:var(--muted)}",
    "@media (max-width:1100px){",
    "  .lever-page{top:12px;right:10px;transform:none;padding:9px 9px 6px 42px;border-radius:14px}",
    "  .lever-page .lever-track{height:120px;width:24px}",
    "  .lever-page .lever-handle{width:32px;height:32px;border-width:2px}",
    "  .lever-page .lever-handle::after{top:5px;left:8px;width:9px;height:6px}",
    "  .lever-notch-label{font-size:9.5px;right:calc(100% + 8px)}",
    "  .lever-cap{display:none}",
    "  .lever-page .lever-stage{font-size:10.5px;min-height:13px}}",
    /* the way back to the main hub, from anywhere */
    ".hub-home{position:fixed;top:10px;left:10px;z-index:70;font-size:11.5px;font-weight:800;letter-spacing:.3px;",
    "  color:var(--muted);background:var(--paper);border:1px solid var(--line);border-radius:20px;padding:5px 12px;",
    "  text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,.08)}",
    ".hub-home:hover{color:var(--accent);border-color:var(--accent)}",
    "@media (prefers-reduced-motion: reduce){.lever-handle{transition:none}",
    "  .lever-handle.wobble,.lever-notch.hit{animation:none}}"
  ].join("\n");

  function injectCss() {
    if (document.getElementById("hublever-css")) return;
    var s = document.createElement("style");
    s.id = "hublever-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---------------- four-form text ---------------- */
  function tForm(arr, stage) {
    if (!arr) return null;
    var f = stage === undefined ? form : stage;
    return arr[f] || arr[3];
  }
  // stage is a FORM index. 0 kanji. 1 kanji + furigana where authored,
  // else the kana form. Anything above 1 is English: stacked UNDER the
  // Japanese on .jt-tap labels, replacing it outright on plain buttons
  // where space is tight.
  function jtHtml(key, stage, stacked) {
    var f = STR[key];
    if (!f) return null;
    if (stage === 0) return esc(f[0]);
    if (stage === 1) return RUBY[key] || esc(f[1]);
    if (stacked) return (RUBY[key] || esc(f[1])) + '<span class="jt-sub">' + esc(f[3]) + "</span>";
    return esc(f[3]);
  }
  function apply(root) {
    (root || document).querySelectorAll("[data-jt]").forEach(function (el) {
      var key = el.dataset.jt;
      if (!STR[key]) return;
      var own = el.dataset.form !== undefined ? parseInt(el.dataset.form, 10) : undefined;
      var stage = own === undefined ? form : own;
      var html = jtHtml(key, stage, el.classList.contains("jt-tap"));
      if (html !== null) el.innerHTML = html;
      el.title = STR[key][3];   // English is always one hover away
    });
  }

  /* ---------------- the mechanism ---------------- */
  function createLever(root, opts) {
    if (!root) return null;
    var track = root.querySelector(".lever-track");
    var stageEl = root.querySelector(".lever-stage");
    var pct = function (i) { return STOPS[i]; };
    // how much longer this stop's recoil takes, given how far it has to travel
    var gapWeight = function (from) {
      return (STOPS[from] - STOPS[from - 1]) / (SPAN / LAST);
    };
    var notchLabels = [];
    var i, n, lab;
    for (i = 0; i < STOPS.length; i++) {
      n = document.createElement("span");
      n.className = "lever-notch";
      n.style.top = pct(i) + "%";
      track.appendChild(n);
      if (root.classList.contains("lever-page")) {
        lab = document.createElement("span");
        lab.className = "lever-notch-label";
        lab.style.top = pct(i) + "%";
        lab.textContent = STAGE_NAMES[i];
        track.appendChild(lab);
        notchLabels.push(lab);
      }
    }
    var handle = document.createElement("span");
    handle.className = "lever-handle";
    track.appendChild(handle);

    // stage is a STOP index here; opts.floor and opts.onStage speak stops too
    var stage = 0, timer = null, timer2 = null, dragging = false, resting = false;
    var floor = opts.floor || function () { return 0; };
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function place(topPct, ms, ease) {
      handle.style.transition = calm ? "none" : "top " + ms + "ms " + ease;
      handle.style.top = topPct + "%";
    }
    function wobble() {
      if (calm) return;
      handle.classList.remove("wobble");
      void handle.offsetWidth;
      handle.classList.add("wobble");
      var hit = track.querySelectorAll(".lever-notch")[stage];
      if (hit) { hit.classList.remove("hit"); void hit.offsetWidth; hit.classList.add("hit"); }
    }
    function render() {
      root.setAttribute("aria-valuenow", stage);
      root.setAttribute("aria-valuetext", STAGE_ARIA[stage]);
      if (stageEl) stageEl.textContent = stage > 0 ? STAGE_NAMES[stage] : "";
      notchLabels.forEach(function (l, i2) { l.classList.toggle("on", i2 === stage); });
    }
    function set(s, fromRecoil, snapped) {
      s = Math.max(floor(), Math.min(LAST, s));
      if (s === stage) { if (!fromRecoil) armRecoil(); return; }
      stage = s;
      render();
      if (!snapped) { place(pct(stage), 110, "cubic-bezier(.2,.9,.3,1.5)"); wobble(); }
      opts.onStage(stage);
      if (!fromRecoil) armRecoil();
    }
    /* hold on the notch, creep back under tension, then the catch lets go */
    function armRecoil() {
      clearTimeout(timer); clearTimeout(timer2);
      if (dragging || resting || stage <= floor()) return;
      // a long stretch takes longer to come back than a nudge does
      var span = Math.round(opts.stepMs * gapWeight(stage));
      var holdMs = Math.round(span * 0.28);
      var creepMs = span - holdMs;
      timer2 = setTimeout(function () {
        var from = pct(stage), to = pct(stage - 1);
        place(from + (to - from) * 0.3, creepMs, "cubic-bezier(.7,0,.9,.2)");
        timer = setTimeout(function () {
          place(to, 90, "cubic-bezier(.2,.9,.3,1.6)");
          set(stage - 1, true, true);
          wobble();
          armRecoil();
        }, creepMs);
      }, holdMs);
    }
    function onMove(e) {
      if (!dragging) return;
      var r = track.getBoundingClientRect();
      var pos = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)) * 100;
      var best = 0;
      for (var k = 1; k < STOPS.length; k++) {
        if (Math.abs(pos - STOPS[k]) < Math.abs(pos - STOPS[best])) best = k;
      }
      set(best);
    }
    root.addEventListener("pointerdown", function (e) {
      dragging = true;
      root.classList.add("dragging");
      try { root.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      clearTimeout(timer); clearTimeout(timer2);
      onMove(e);
      e.preventDefault();
    });
    root.addEventListener("pointermove", onMove);
    var release = function () {
      if (!dragging) return;
      dragging = false;
      root.classList.remove("dragging");
      armRecoil();
    };
    root.addEventListener("pointerup", release);
    root.addEventListener("pointercancel", release);
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { set(stage + 1); e.preventDefault(); }
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { set(stage - 1); e.preventDefault(); }
      else if (e.key === "End") { set(LAST); e.preventDefault(); }
      else if (e.key === "Home" || e.key === "Escape") { set(floor()); e.preventDefault(); }
    });
    render();
    place(pct(0), 0, "linear");
    return {
      set: function (s) { set(s); },
      get: function () { return stage; },
      // forgiving mode: while you are reading inside the section, the
      // spring waits for you instead of counting down
      rest: function (on) {
        resting = on;
        root.classList.toggle("resting", on);
        if (on) { clearTimeout(timer); clearTimeout(timer2); } else { armRecoil(); }
      },
      floorChanged: function () { if (stage < floor()) set(floor(), true); armRecoil(); }
    };
  }

  /* ---------------- per-label taps ---------------- */
  var tapTimers = new WeakMap();
  function tapBump(el) {
    var own = el.dataset.form !== undefined ? parseInt(el.dataset.form, 10) : form;
    el.dataset.form = FORMS[Math.min(LAST, stopOf(own) + 1)];
    apply();
    clearTimeout(tapTimers.get(el));
    var decay = function () {
      var cur = parseInt(el.dataset.form, 10);
      if (isNaN(cur) || cur <= form) { delete el.dataset.form; apply(); return; }
      el.dataset.form = FORMS[Math.max(0, stopOf(cur) - 1)];
      apply();
      tapTimers.set(el, setTimeout(decay, 1667));
    };
    tapTimers.set(el, setTimeout(decay, 1667));
  }

  /* ---------------- mounting ---------------- */
  function plateHtml(cap) {
    return (cap ? '<div class="lever-cap" aria-hidden="true">Language<br>lever</div>' : "") +
      '<div class="lever-track"></div><div class="lever-stage"></div>';
  }
  function mountPage(opts) {
    var host = document.createElement("div");
    host.className = "lever lever-page";
    host.id = "pageLever";
    host.tabIndex = 0;
    host.setAttribute("role", "slider");
    host.setAttribute("aria-label", "Language support lever for the whole page");
    host.setAttribute("aria-valuemin", "0");
    host.setAttribute("aria-valuemax", String(LAST));
    host.setAttribute("aria-valuenow", "0");
    host.title = "Pull down: kanji, kana, English. It springs back, and arrow keys work too.";
    host.innerHTML = plateHtml(true);
    document.body.appendChild(host);
    return createLever(host, {
      stepMs: opts.pageStepMs || 845,
      onStage: function (s) {
        form = FORMS[s];
        document.querySelectorAll("[data-jt]").forEach(function (el) { delete el.dataset.form; });
        apply();
        sections.forEach(function (sec) { sec.api.floorChanged(); });
        if (onChange) onChange(form);
      }
    });
  }
  /* A section lever is any element with data-scope="#id". It only ever
     shows MORE support than the page (its floor is the page stage), and
     it is deliberately slow to let go. */
  function mountSections(opts) {
    document.querySelectorAll("[data-scope]").forEach(function (host) {
      var scope = document.querySelector(host.dataset.scope);
      if (!scope) return;
      host.classList.add("lever", "lever-mini");
      host.tabIndex = 0;
      host.setAttribute("role", "slider");
      host.setAttribute("aria-label", "Language support lever for this section");
      host.setAttribute("aria-valuemin", "0");
      host.setAttribute("aria-valuemax", String(LAST));
      host.setAttribute("aria-valuenow", "0");
      if (!host.title) host.title = "Pull down for more help with this section. It lets go slowly.";
      host.innerHTML = plateHtml(false);
      var api = createLever(host, {
        stepMs: opts.sectionStepMs || 4000,
        floor: function () { return stopOf(form); },
        onStage: function (s) {
          var f = FORMS[s];
          scope.querySelectorAll("[data-jt]").forEach(function (el) {
            if (f <= form) delete el.dataset.form; else el.dataset.form = f;
          });
          apply();
        }
      });
      // forgiving: reading inside the section pauses the spring entirely
      scope.addEventListener("mouseenter", function () { api.rest(true); });
      scope.addEventListener("mouseleave", function () { api.rest(false); });
      host.addEventListener("mouseenter", function () { api.rest(true); });
      host.addEventListener("mouseleave", function () { api.rest(false); });
      sections.push({ host: host, scope: scope, api: api });
    });
  }

  /* Every tool page carries the same fixed chip back to the hub landing
     page. Tools live one folder down, so the link is always "../". */
  function mountHub() {
    if (document.querySelector(".hub-home")) return;
    var a = document.createElement("a");
    a.className = "hub-home";
    a.href = "../";
    a.textContent = "⌂ ジャプリ";
    a.title = "Back to ジャプリ";
    document.body.appendChild(a);
  }
  function init(opts) {
    opts = opts || {};
    STR = opts.strings || {};
    RUBY = opts.ruby || {};
    onChange = opts.onChange || null;
    injectCss();
    if (opts.hub !== false) mountHub();
    if (opts.pageLever !== false) page = mountPage(opts);
    mountSections(opts);
    document.querySelectorAll(".jt-tap").forEach(function (el) {
      el.addEventListener("click", function () { tapBump(el); });
    });
    apply();
    return page;
  }

  return {
    init: init,
    apply: apply,
    createLever: createLever,
    tForm: tForm,
    jtHtml: jtHtml,
    form: function () { return form; },
    strings: function () { return STR; },
    STAGE_NAMES: STAGE_NAMES,
    STAGE_ARIA: STAGE_ARIA,
    STOPS: STOPS,
    FORMS: FORMS
  };
})();
