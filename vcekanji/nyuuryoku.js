/* nyuuryoku.js — how to turn Japanese typing on, and a box that checks it.
   ---------------------------------------------------------------------------
   Andrew: put the keyboard how-to in the Year 10, 11 and 12 exam preparation
   apps, in case a student does not have Japanese text enabled. A student
   sitting a practice paper cannot type an answer at all until this is done,
   so it belongs inside the app rather than on a sheet somewhere.

   ONE FILE WITH SEVERAL COPIES ON PURPOSE, the same arrangement as
   lever.js. The canonical copy is this repo's root; apps/<name>/nyuuryoku.js
   are copies of it, so each app stays a folder you can delete or hand over
   whole. After editing the canonical one, redistribute and check they match:

     for d in apps/exam10 apps/exam11 apps/hikki apps/jinbutsu; do \
       cp nyuuryoku.js "$d/"; done
     md5sum nyuuryoku.js apps/exam10/nyuuryoku.js apps/exam11/nyuuryoku.js \
       apps/hikki/nyuuryoku.js | awk '{print $1}' | sort -u | wc -l

   That must print 1.

   It carries its own styles, scoped under .nyuu, and every colour reads a
   token with a fallback, so it looks right in an app whose palette it has
   never seen. It adds no dependency and stores nothing.

   The last step is the useful one. A student who has followed four steps
   still does not know whether it worked, so the box reads what came out and
   says which of the three states they are in: still typing rōmaji, kana at
   last, or kana converted to kanji. It keeps nothing and sends nothing.

   The links are real pages, checked by eye. Nothing here invents a URL.    */

window.NYUURYOKU = {
  schema_version: 1,

  intro: "Turn this on once and the laptop types かな and 漢字 all year. "
       + "Windows 11 can do it and will not until you ask.",

  steps: [
    {
      n: 1,
      head: "Add Japanese to Windows",
      lines: [
        "Press the Windows key and I together to open Settings.",
        "Go to Time & language, then Language & region.",
        "Beside Preferred languages, choose Add a language.",
        "Type Japanese or 日本語, pick it, then Next and Install."
      ],
      note: "Leave the Windows display language as English. You are adding a "
          + "keyboard, not turning the computer into Japanese.",
      keys: ["⊞ Win", "I"]
    },
    {
      n: 2,
      head: "Switch the keyboard to Japanese",
      lines: [
        "Look at the bottom right of the taskbar, near the clock. It says ENG or JPN.",
        "Hold the Windows key and tap Space to move between them.",
        "Choose JPN."
      ],
      note: "The switch is per window. A new window can come back as ENG, so "
          + "check the taskbar before you start typing.",
      keys: ["⊞ Win", "Space"]
    },
    {
      n: 3,
      head: "Turn hiragana on",
      lines: [
        "With JPN chosen, the taskbar shows either A or あ.",
        "A means it is still typing English letters.",
        "あ means it is typing kana. Click the letter to change it."
      ],
      note: "Most people miss this step. JPN is chosen, the indicator still "
          + "says A, and nothing comes out in kana. The shortcut is Alt and "
          + "the ` key, above Tab.",
      keys: ["Alt", "`"]
    },
    {
      n: 4,
      head: "Type, then convert",
      lines: [
        "Type the sounds in rōmaji and the kana appear as you go: nihon gives にほん.",
        "Press Space to turn the kana into kanji: 日本.",
        "Press Space again to see other kanji with the same reading.",
        "Press Enter to accept what is shown."
      ],
      note: "A word you have not accepted yet is underlined. Press Enter to keep it.",
      keys: ["Space", "Enter"]
    },
    {
      n: 5,
      head: "The three that catch everyone",
      lines: [
        "Small っ: double the next consonant. kitte gives きって.",
        "ん before a vowel: type nn. kinniro gives きんいろ.",
        "を the particle: type wo, not o."
      ],
      note: "One n is enough before a consonant and at the end of a word. "
          + "kanji gives かんじ and hon gives ほん.",
      keys: []
    }
  ],

  check: {
    head: "Check it is working",
    say: "Type anything Japanese below. This box keeps nothing and sends "
       + "nothing. It only looks at what kind of characters came out."
  },

  links: [
    { name: "Microsoft's own page on the Japanese IME",
      url: "https://learn.microsoft.com/en-us/globalization/input/japanese-ime",
      what: "The keyboard itself, written by the people who made it." },
    { name: "Install the Japanese keyboard on Windows 11",
      url: "https://www.youtube.com/watch?v=lvH9ulLvaZA",
      what: "Watch this if step 1 does not look the way it reads here." },
    { name: "Type Japanese on a normal keyboard",
      url: "https://www.youtube.com/watch?v=VjZ4E-cdHZA",
      what: "Start at 2 minutes 30, where the typing begins." },
    { name: "Every sound, in detail",
      url: "https://www.youtube.com/watch?v=to8QUll9_gM",
      what: "Longer. Use it for the sounds step 5 warns about." }
  ],

  /* ---- what the box says back ----
     Separated out so a check can drive it without a keyboard: the three
     states a student can be in, and the one that means it worked. */
  read: function(v){
    var kana  = /[ぁ-ゟ゠-ヿ]/.test(v);
    var kanji = /[一-鿿]/.test(v);
    var latin = /[A-Za-z]/.test(v);
    if (kanji && kana)
      return { state: "yes", head: "That is it",
               say: "Kana and kanji together, which is what a Japanese "
                  + "keyboard typing properly looks like." };
    if (kanji)
      return { state: "yes", head: "Kanji",
               say: "Converted. Press Space on a word to convert it and "
                  + "Enter to keep it." };
    if (kana && !latin)
      return { state: "yes", head: "Kana",
               say: "The keyboard is on and in hiragana. Press Space while a "
                  + "word is underlined to turn it into kanji." };
    if (kana && latin)
      return { state: "part", head: "Half and half",
               say: "Some kana, some English letters. The indicator near the "
                  + "clock has been flipped between あ and A partway through." };
    return { state: "no", head: "Still English letters",
             say: "Nothing came out as kana. Either the taskbar still says "
                + "ENG, which is the Windows key and Space, or it says JPN "
                + "with an A beside it, which is Alt and the ` key above Tab." };
  },

  css: ""
    + ".nyuu{max-width:760px;margin:0 auto}"
    + ".nyuu .nlede{background:var(--paper,#fff);border:1px solid var(--line,#ccd5e0);"
    + "border-left:4px solid var(--deep,#16375e);border-radius:10px;"
    + "padding:10px 13px;margin-bottom:12px;font-size:14.5px}"
    + ".nyuu .nlede b{display:block;font-size:15.5px;margin-bottom:2px}"
    + ".nyuu .nstep{display:flex;gap:11px;background:var(--paper,#fff);"
    + "border:1px solid var(--line,#ccd5e0);border-radius:10px;"
    + "padding:11px 13px;margin-bottom:9px}"
    + ".nyuu .nnum{flex:none;width:28px;height:28px;border-radius:50%;"
    + "background:var(--deep,#16375e);color:#fff;font-weight:700;"
    + "display:flex;align-items:center;justify-content:center;font-size:14px}"
    + ".nyuu .nbody{flex:1;min-width:0}"
    + ".nyuu h4{font-size:15.5px;margin-bottom:5px}"
    + ".nyuu ol{margin:0 0 0 19px}"
    + ".nyuu li{font-size:14.5px;margin-bottom:2px}"
    + ".nyuu .nkeys{margin-top:6px;display:flex;gap:5px;align-items:center;"
    + "flex-wrap:wrap}"
    + ".nyuu kbd{border:1px solid var(--line,#ccd5e0);border-bottom-width:2px;"
    + "border-radius:5px;padding:1px 6px;font-family:inherit;font-size:12.5px;"
    + "background:#f7f9fb}"
    + ".nyuu .nkeys span{color:var(--muted,#4a5464);font-size:12px}"
    + ".nyuu .nnote{margin-top:6px;font-size:13px;color:var(--muted,#4a5464)}"
    + ".nyuu input{width:100%;margin-top:8px;padding:9px 11px;font-size:19px;"
    + "border:2px solid var(--line,#ccd5e0);border-radius:9px;"
    + "font-family:var(--jp,sans-serif)}"
    + ".nyuu input:focus{outline:none;border-color:var(--deep,#16375e)}"
    + ".nyuu .nmark{margin-top:8px;border-radius:9px;padding:8px 11px;"
    + "font-size:13.5px;border:1px solid}"
    + ".nyuu .nmark b{display:block;font-size:15px}"
    + ".nyuu .nmark.yes{border-color:var(--ok,#2f6a3e);background:#eef7f0;"
    + "color:var(--ok,#2f6a3e)}"
    + ".nyuu .nmark.part{border-color:var(--warm,#8a6d1f);background:#fcf7e8;"
    + "color:var(--warm,#8a6d1f)}"
    + ".nyuu .nmark.no{border-color:var(--accent,#a83232);background:#fbeeee;"
    + "color:var(--accent,#a83232)}"
    + ".nyuu a{color:var(--deep,#16375e)}",

  html: function(){
    var N = this;
    function esc(t){
      return String(t == null ? "" : t).replace(/[&<>"]/g, function(c){
        return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c];
      });
    }
    return '<style>' + N.css + '</style><div class="nyuu">'
      + '<div class="nlede"><b>Japanese keyboard</b>' + esc(N.intro) + '</div>'
      + N.steps.map(function(st){
          return '<div class="nstep"><div class="nnum">' + st.n + '</div>'
            + '<div class="nbody"><h4>' + esc(st.head) + '</h4>'
            + '<ol>' + st.lines.map(function(l){
                return '<li>' + esc(l) + '</li>'; }).join("") + '</ol>'
            + ((st.keys || []).length
                ? '<p class="nkeys">' + st.keys.map(function(k){
                    return '<kbd>' + esc(k) + '</kbd>'; }).join('<span>+</span>')
                  + '</p>' : "")
            + (st.note ? '<p class="nnote">' + esc(st.note) + '</p>' : "")
            + '</div></div>';
        }).join("")
      + '<div class="nstep"><div class="nnum">✓</div><div class="nbody">'
      + '<h4>' + esc(N.check.head) + '</h4>'
      + '<p class="nnote" style="margin-top:0">' + esc(N.check.say) + '</p>'
      + '<input id="nyuuin" type="text" autocomplete="off" autocapitalize="off"'
      + ' spellcheck="false" lang="ja" placeholder="ここにかいてください"'
      + ' aria-label="Type something in Japanese to check the keyboard">'
      + '<div id="nyuufb"></div></div></div>'
      + '<div class="nstep"><div class="nnum">→</div><div class="nbody">'
      + '<h4>Read more, or watch somebody do it</h4>'
      + N.links.map(function(l){
          return '<p><a href="' + esc(l.url) + '" target="_blank" rel="noopener">'
            + esc(l.name) + '</a><br><span class="nnote">' + esc(l.what)
            + '</span></p>';
        }).join("")
      + '</div></div></div>';
  },

  /* call once after html() is in the page; onWorking fires the first time a
     student types something that proves the keyboard is on */
  wire: function(onWorking){
    var N = this;
    var inp = document.getElementById("nyuuin");
    var fb = document.getElementById("nyuufb");
    if (!inp || !fb) return;
    var told = false;
    inp.oninput = function(){
      if (!inp.value){ fb.innerHTML = ""; return; }
      var r = N.read(inp.value);
      fb.innerHTML = '<div class="nmark ' + r.state + '"><b>' + r.head + '</b>'
        + r.say + '</div>';
      if (r.state === "yes" && !told){
        told = true;
        if (typeof onWorking === "function") onWorking();
      }
    };
  }
};
