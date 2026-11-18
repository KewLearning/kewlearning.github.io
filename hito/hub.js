/* hub.js — the way back to ジャプリ, on every app.
   ---------------------------------------------------------------------------
   Andrew: a student should not need a bookmark to get from one app to the
   next. So every app carries one link home, in the same place, looking the
   same, and this module puts it there rather than fourteen index.html files
   each growing their own.

       <script src="hub.js?v=..."></script>

   It puts two links on the page: the way back to ジャプリ, and a question
   mark that opens the how-to page. Several apps ask a student to type in
   Japanese and only four of them carry the keyboard how-to; rather than
   bolt a tab onto each of the others, the advice lives once at /how/ and
   every app can reach it.

   It also puts a full screen button there. Andrew asked for one: a browser
   full of tabs, bookmarks and an address bar is a browser full of places
   to go instead of the task. Full screen hides all of it until a student
   presses Escape. It is not a lock, and nothing pretends it is one.

   The button appears only where the browser can do it. Safari on an iPhone
   cannot put a page full screen, so the button is not drawn there at all
   rather than drawn and dead; the way to a full screen on a phone is to
   save the app to the home screen, which /how/ explains. An app already
   running off the home screen has no browser frame to hide, so it gets no
   button either.

   WHERE IT GOES. Into the app's own bar if it has one, as the first thing in
   it, because the way out belongs at the start of the row and not among the
   tools a student is using. An app with no bar — the two unit maps — gets a
   chip in the top left corner instead.

   WHERE IT POINTS. One level up, which on the live site is the hub: an app
   lives at /mega/ and the hub at /. data-href on the script tag overrides
   that for anything that ends up somewhere else.

   WHAT IT IS. A real link, so a long press offers "open in a new tab" and a
   middle click works. It is not a button that runs code, and it is nowhere
   near Reset: leaving an app is safe — every app keeps its score in the
   browser, and it is still there when a student comes back.          */
"use strict";
window.HUB = (function(){
  var schema_version = 2;
  var CSS = [
    '.hubhome{display:inline-flex;align-items:center;gap:6px;flex:none;',
    '  text-decoration:none;border:2px solid var(--line,#ccd5e0);border-radius:9px;',
    '  background:var(--paper,#fff);color:var(--deep,#16375e);',
    '  font-family:var(--font,sans-serif);font-size:13px;font-weight:700;',
    '  padding:0 10px;min-height:38px;line-height:1;cursor:pointer;',
    '  transition:border-color .13s,background .13s}',
    '.hubhome:hover,.hubhome:focus{border-color:var(--deep,#16375e);outline:none;',
    '  background:var(--bg,#eef1f5)}',
    '.hubhome svg{width:15px;height:15px;flex:none}',
    '.hubhome b{font-family:var(--jp,sans-serif);font-weight:700;font-size:14px}',
    '.hubhome.loose{position:fixed;left:10px;top:10px;z-index:60;',
    '  box-shadow:0 2px 10px rgba(16,40,70,.12)}',
    '.hubhelp{display:inline-flex;align-items:center;justify-content:center;',
    '  flex:none;width:38px;min-height:38px;text-decoration:none;',
    '  border:2px solid var(--line,#ccd5e0);border-radius:9px;',
    '  background:var(--paper,#fff);color:var(--deep,#16375e);',
    '  font-family:var(--font,sans-serif);font-size:17px;font-weight:700;',
    '  line-height:1;cursor:pointer;transition:border-color .13s}',
    '.hubhelp:hover,.hubhelp:focus{border-color:var(--deep,#16375e);outline:none}',
    '.hubhelp.loose{position:fixed;top:10px;z-index:60;',
    '  box-shadow:0 2px 10px rgba(16,40,70,.12)}',
    '.hubhelp.loose.right{right:10px}',
    /* Full screen wears the help button's shape: same square, same box,
       so the row of chrome reads as one row and not three ideas. */
    '.hubfull{display:inline-flex;align-items:center;justify-content:center;',
    '  flex:none;width:38px;min-height:38px;padding:0;',
    '  border:2px solid var(--line,#ccd5e0);border-radius:9px;',
    '  background:var(--paper,#fff);color:var(--deep,#16375e);',
    '  cursor:pointer;transition:border-color .13s}',
    '.hubfull:hover,.hubfull:focus{border-color:var(--deep,#16375e);outline:none}',
    '.hubfull svg{width:17px;height:17px;flex:none;pointer-events:none}',
    '.hubfull.loose{position:fixed;top:10px;right:54px;z-index:60;',
    '  box-shadow:0 2px 10px rgba(16,40,70,.12)}',
    '@media (max-width:620px){ .hubfull{width:34px;min-height:34px} }',
    '@media (max-width:620px){ .hubfull.loose{right:50px} }',
    '@media (max-width:620px){ .hubhelp{width:34px;min-height:34px} }',
    '@media (max-width:620px){',
    '  .hubhome{padding:0 8px;min-height:34px}',
    '  .hubhome b{font-size:13px}',
    '}',
    /* On a phone the bar is already two rows. The word goes and the roof
       stays: the link keeps its spoken label, so nothing is lost to anyone
       who cannot see the icon.

       The sizes stay as they are. DESIGN_RULES §6 puts a 40px floor under
       a tap target and these squares already sit at 34px on a phone;
       shrinking them to buy room for one app would make that worse.
       オーラルしけん, whose row ran 5px over the day full screen joined
       it, closed its own gap instead. */
    '@media (max-width:430px){',
    '  .hubhome{padding:0 9px;gap:0}',
    '  .hubhome b{display:none}',
    '  .hubhome svg{width:17px;height:17px}',
    '}'
  ].join('\n');
  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
    + ' stroke="currentColor" stroke-width="2" stroke-linecap="round"'
    + ' stroke-linejoin="round"><path d="M3 11l9-8 9 8"/>'
    + '<path d="M5 10v10h14V10"/></svg>';

  /* Four corners pushing out, four corners pulling in. */
  var SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"'
    + ' stroke="currentColor" stroke-width="2.2" stroke-linecap="round"'
    + ' stroke-linejoin="round">';
  var OUT = SVG + '<path d="M9 4H4v5"/><path d="M15 4h5v5"/>'
    + '<path d="M15 20h5v-5"/><path d="M9 20H4v-5"/></svg>';
  var IN_ = SVG + '<path d="M4 9h5V4"/><path d="M20 9h-5V4"/>'
    + '<path d="M20 15h-5v5"/><path d="M4 15h5v5"/></svg>';

  /* Can this browser do it, and is there anything to hide? Safari on an
     iPhone answers no to the first; an app opened off the home screen
     answers no to the second. */
  function able(){
    var r = document.documentElement;
    if (!(r.requestFullscreen || r.webkitRequestFullscreen)) return false;
    if (document.fullscreenEnabled === false) return false;
    if (navigator.standalone) return false;
    try {
      if (window.matchMedia
          && window.matchMedia('(display-mode: standalone)').matches) return false;
      if (window.matchMedia
          && window.matchMedia('(display-mode: fullscreen)').matches) return false;
    } catch (e) {}
    return true;
  }
  function on(){
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }
  function toggle(){
    var r = document.documentElement;
    if (on()){
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      var go = r.requestFullscreen || r.webkitRequestFullscreen;
      /* A rejected promise is not an error worth a console: a browser is
         allowed to say no, and the button simply stays as it was. */
      try { var p = go.call(r); if (p && p.catch) p.catch(function(){}); }
      catch (e) {}
    }
  }

  var tag = document.currentScript;
  function put(){
    if (document.querySelector('.hubhome')) return false;
    var href = (tag && tag.getAttribute('data-href')) || '../';
    var help = (tag && tag.getAttribute('data-help')) || '../how/';
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    var a = document.createElement('a');
    a.className = 'hubhome';
    a.href = href;
    a.title = 'Back to ジャプリ';
    a.setAttribute('aria-label', 'Back to ジャプリ, the hub');
    a.innerHTML = ICON + '<b>ジャプリ</b>';
    /* the question mark: one page of advice, the same from every app */
    var q = null;
    if (!/\/how\/?$/.test(location.pathname)){
      q = document.createElement('a');
      q.className = 'hubhelp';
      q.href = help;
      q.title = 'How to use ジャプリ';
      q.setAttribute('aria-label', 'How to use ジャプリ: typing Japanese, '
        + 'where your score lives, getting around');
      q.textContent = '?';
    }
    /* Full screen. A button, not a link: it changes the window, it does
       not go anywhere. */
    var f = null;
    if (able()){
      f = document.createElement('button');
      f.type = 'button';
      f.className = 'hubfull';
      f.addEventListener('click', toggle);
      var sync = function(){
        var o = on();
        f.innerHTML = o ? IN_ : OUT;
        f.title = o ? 'Leave full screen' : 'Full screen';
        f.setAttribute('aria-label', o
          ? 'Leave full screen and show the browser again'
          : 'Fill the screen with this app and hide the browser');
        f.setAttribute('aria-pressed', o ? 'true' : 'false');
      };
      sync();
      document.addEventListener('fullscreenchange', sync);
      document.addEventListener('webkitfullscreenchange', sync);
    }
    /* Both go at the start, together: they are the two ways out of the
       app and neither belongs among the app's own tools. The question
       mark at the far right would have sat against Reset, which is the
       one button a mis-tap must not find. */
    var bar = document.querySelector('.bar');
    if (bar){
      bar.insertBefore(a, bar.firstChild);
      if (q) bar.insertBefore(q, a.nextSibling);
      /* After the question mark, and a long way from Reset. */
      if (f) bar.insertBefore(f, (q || a).nextSibling);
    } else {
      a.className += ' loose';
      document.body.appendChild(a);
      if (q){ q.className += ' loose right'; document.body.appendChild(q); }
      if (f){ f.className += ' loose'; document.body.appendChild(f); }
    }
    return true;
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', put);
  else put();
  return { schema_version: schema_version, put: put };
})();
