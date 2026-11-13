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
  var schema_version = 1;
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
    '@media (max-width:620px){ .hubhelp{width:34px;min-height:34px} }',
    '@media (max-width:620px){',
    '  .hubhome{padding:0 8px;min-height:34px}',
    '  .hubhome b{font-size:13px}',
    '}',
    /* On a phone the bar is already two rows. The word goes and the roof
       stays: the link keeps its spoken label, so nothing is lost to anyone
       who cannot see the icon. */
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
    /* Both go at the start, together: they are the two ways out of the
       app and neither belongs among the app's own tools. The question
       mark at the far right would have sat against Reset, which is the
       one button a mis-tap must not find. */
    var bar = document.querySelector('.bar');
    if (bar){
      bar.insertBefore(a, bar.firstChild);
      if (q) bar.insertBefore(q, a.nextSibling);
    } else {
      a.className += ' loose';
      document.body.appendChild(a);
      if (q){ q.className += ' loose right'; document.body.appendChild(q); }
    }
    return true;
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', put);
  else put();
  return { schema_version: schema_version, put: put };
})();
