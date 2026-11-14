/* tabs.js — where an app opens, and keeping the current tab in view.
   ---------------------------------------------------------------------------
   Andrew asked whether students should be able to drag the tabs into their
   own order. The answer we settled on was no: the order is a teaching
   argument, not a layout — だれですか is first because the problem should
   arrive before the method — and a bar that differs on every screen costs
   you "open the fourth tab" in a room of twenty-five. Nothing is locked
   anyway: any tab can be tapped at any time, so reordering would only save
   a student some scrolling.

   So this file does the three things that reordering was really being asked
   to fix.

   1. THE APP OPENS WHERE THE STUDENT LEFT OFF. Each app already keeps its
      score and its ticks on the device; now it keeps the tab too.
   2. A LINK CAN OPEN ONE TAB.  ...../hito/?tab=yomu opens the reading step.
      Andrew puts that on a worksheet and a lesson starts where he wants it,
      without changing the order for anyone else. The rest of the bar stays
      exactly where it is, because the apps do not lock content.
   3. THE CURRENT TAB IS SCROLLED INTO VIEW. ひと has twelve tabs; on a
      phone the bar scrolls, and a tab the app has just opened could sit off
      the right-hand edge with nothing to say it was there.

   WHAT A LINK ACCEPTS. ?tab=yomu, case and spaces ignored; ?tab=9 for the
   ninth tab, one-based, for an app whose ids you cannot remember. A name
   that matches nothing is ignored rather than argued with: the student gets
   the tab they were on, which is the right failure.

   ONE FILE WITH SEVERAL COPIES ON PURPOSE, the same arrangement as lever.js
   and nyuuryoku.js. The canonical copy is this repo's root; each app's own
   tabs.js is a copy, so an app stays a folder you can delete or hand over
   whole. After editing this one, redistribute and check they match:

     node tools/tab-check.js --copy     (copies it into every app that uses it)
     node tools/tab-check.js            (and then drives every one of them)

   The checker refuses to run while any copy differs from this file. Note
   that no shell glob is written out in this comment: a star followed by a
   slash ends a block comment, and that typo once took four apps down.

   IT STORES ONE STRING PER APP and nothing else: the id of the tab last
   opened, under the app's own key. No names, no answers, no dates. Reset
   clears it wherever an app has a Reset. Every read and write is wrapped,
   because localStorage throws rather than returns null in a locked-down
   browser and a thrown exception at startup is a blank app.

   tools/tab-check.js drives every app in a real browser through this file,
   which is why start() records what it was given: a checker that had to be
   told each app's tabs by hand would be a second copy of the truth.      */

window.TABS = {
  schema_version: 1,

  /* set by start() and inview(), read by tools/tab-check.js */
  list: null,
  key: null,
  now: null,
  nav: null,
  sel: null,

  /* The id a link asked for, or null. ids is the app's tabs in order. */
  asked: function (ids) {
    var want = "";
    try {
      var q = String(window.location.search || "");
      var m = /[?&]tab=([^&#]*)/.exec(q);
      if (m) want = decodeURIComponent(m[1].replace(/\+/g, " "));
    } catch (e) { return null; }
    want = String(want).trim().toLowerCase();
    if (!want) return null;
    for (var i = 0; i < ids.length; i++)
      if (String(ids[i]).toLowerCase() === want) return ids[i];
    /* a one-based number, for an app whose ids nobody remembers */
    if (/^[0-9]+$/.test(want)) {
      var n = parseInt(want, 10);
      if (n >= 1 && n <= ids.length) return ids[n - 1];
    }
    return null;
  },

  /* The tab this device was last on, or null. */
  last: function (key, ids) {
    var got = null;
    try { got = window.localStorage.getItem(key + ":tab"); } catch (e) { return null; }
    if (!got) return null;
    for (var i = 0; i < ids.length; i++) if (ids[i] === got) return ids[i];
    return null;   /* a tab that no longer exists is not an error */
  },

  /* Where to open: the link, then the device, then the first tab. The link
     also becomes what the device remembers, so a student who follows one
     and then reloads stays where the worksheet sent them. */
  startId: function (key, ids) {
    this.list = ids.slice();
    this.key = key;
    var want = this.asked(ids);
    if (want) { this.keep(key, want); return want; }
    var seen = this.last(key, ids);
    this.now = seen || ids[0];
    return this.now;
  },

  /* The same answer as an index, for the apps that hold a number. */
  start: function (key, ids) {
    var id = this.startId(key, ids);
    var i = ids.indexOf(id);
    return i < 0 ? 0 : i;
  },

  /* For an app that already keeps its own tab inside its own saved state.
     ひっきしけん has done that since before this file existed, and two
     memories of one thing is one too many: this records the tabs for the
     checker, applies a link if there is one, and leaves the remembering
     where it already lives. */
  own: function (key, ids, current) {
    this.list = ids.slice();
    this.key = key;
    var want = this.asked(ids);
    this.now = want || current || ids[0];
    return this.now;
  },

  /* The tab changed, and this app stores it itself. */
  note: function (id) { this.now = id; },

  keep: function (key, id) {
    this.now = id;
    try { window.localStorage.setItem(key + ":tab", String(id)); } catch (e) {}
  },

  forget: function (key) {
    this.now = null;
    try { window.localStorage.removeItem(key + ":tab"); } catch (e) {}
  },

  /* Scroll the bar, never the page. A tab bar that scrolls sideways can
     leave the open tab off the edge, and scrollIntoView would fix that by
     scrolling the whole document as well, which on a phone throws the
     activity off the screen. So the bar's own scrollLeft is moved by the
     distance between the two centres, and nothing else moves.

     The current tab is whichever carries aria-current or .on: both are in
     use across these apps and neither is worth renaming for this. */
  inview: function (nav, sel) {
    try {
      if (!nav) return;
      this.nav = nav;
      this.sel = sel || "[aria-current], .on";
      var self = this;
      var put = function (){
        var b = nav.querySelector(self.sel);
        if (!b) return;
        if (nav.scrollWidth <= nav.clientWidth + 1) return;
        var nb = nav.getBoundingClientRect(), bb = b.getBoundingClientRect();
        nav.scrollLeft += (bb.left + bb.width / 2) - (nb.left + nb.width / 2);
      };
      put();
      /* ---- and again once the faces have arrived ----
         The apps now ship a Japanese face, and a webfont lands after the
         first layout: every tab changes width at that moment, so a bar
         scrolled to the right place a frame earlier is scrolled to the
         wrong one. れきしの人 has thirteen tabs and showed it first — the
         open tab sat off the edge of the bar. Doing it again when the
         fonts are ready costs nothing on a device that had them already. */
      if (document.fonts && document.fonts.ready && !this._fontsWired){
        this._fontsWired = true;
        document.fonts.ready.then(function (){
          try { put(); } catch (e) {}
        });
      }
    } catch (e) {}
  },
  _fontsWired: false
};
