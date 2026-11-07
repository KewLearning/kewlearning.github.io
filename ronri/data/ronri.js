/* ============================================================================
   data/ronri.js  —  window.RONRI
   ----------------------------------------------------------------------------
   論理パズル: a logic grid whose clues are Japanese sentences.

   Andrew has a Year 8 student who is bored by the level of language and says
   problem solving is his thing. The answer is not to wrap the language in a
   story: that is what ミッション：日本 did and students gave it up. It is to
   keep the language simple and make the thinking hard.

   So the Japanese here is deliberately plain and the puzzle is not. Every
   clue is one Year 8 sentence, and the particles are what carry the
   information: は, の, より, も, か, and ではありません. Read より backwards
   and the grid contradicts itself. That is the whole design. The puzzle
   cannot be solved by anyone who is not reading the Japanese, and it needs
   no story to be worth solving, the way a sudoku needs none.

   Three categories, because three is where a logic grid becomes interesting:
   the step that makes it a puzzle rather than a table is combining two grids
   to fill a third.

     people   surnames in kana, nothing to decode
     clubs    school clubs, the katakana ones chosen to be guessable
     times    clock times, which also carry the readings students get wrong:
              四時 is よじ and 七時 is しちじ, as in きほん

   The clue templates live here with both their Japanese and their English.
   The English is per clue and behind a tap: a student who reads the whole
   thing in English has not done the task, but one who is stuck on a single
   sentence should not be stuck on the puzzle.

   One window. line, then pure JSON. No comments inside the object.
   ========================================================================== */

window.RONRI = {
  "schema_version": 1,

  "people": ["たなか", "すずき", "やまだ", "さとう", "いとう", "なかむら"],

  "clubs": [
    { "ja": "サッカー", "en": "soccer" },
    { "ja": "テニス", "en": "tennis" },
    { "ja": "やきゅう", "en": "baseball" },
    { "ja": "びじゅつ", "en": "art" },
    { "ja": "おんがく", "en": "music" },
    { "ja": "すいえい", "en": "swimming" }
  ],

  "times": [
    { "ja": "三時[さんじ]", "en": "3 o'clock" },
    { "ja": "四時[よじ]", "en": "4 o'clock" },
    { "ja": "五時[ごじ]", "en": "5 o'clock" },
    { "ja": "六時[ろくじ]", "en": "6 o'clock" },
    { "ja": "七時[しちじ]", "en": "7 o'clock" },
    { "ja": "八時[はちじ]", "en": "8 o'clock" }
  ],

  "levels": [
    { "id": "a", "ja": "やさしい", "en": "4 people", "n": 4,
      "kinds": ["is", "isnt", "clubtime", "notclubtime"] },
    { "id": "b", "ja": "ふつう", "en": "5 people", "n": 5,
      "kinds": ["isnt", "clubtime", "notclubtime", "earlier", "either"] },
    { "id": "c", "ja": "むずかしい", "en": "6 people, harder clues", "n": 6,
      "kinds": ["isnt", "notclubtime", "earlier", "either", "neither", "between"] }
  ],

  "ui": {
    "lede": "Every answer follows from the clues. No guessing is needed.",
    "howto": [
      "Read the clues. Tap one to see it in English.",
      "Tap a square once for ○ and twice for ×.",
      "A ○ crosses out the rest of its row and column for you.",
      "The third grid is where the puzzle is: two grids together fill it."
    ],
    "solved": "といた",
    "checkOk": "Nothing contradicts the clues so far.",
    "checkBad": "Something contradicts clue",
    "checkDone": "Solved. Every square follows from the clues."
  },

  "clues": {
    "is":        { "ja": "{p}さんは{c}ぶです。",
                   "en": "{p} is in the {ce} club." },
    "isnt":      { "ja": "{p}さんは{c}ぶではありません。",
                   "en": "{p} is not in the {ce} club." },
    "at":        { "ja": "{p}さんは{t}にれんしゅうします。",
                   "en": "{p} practises at {te}." },
    "notat":     { "ja": "{p}さんは{t}にれんしゅうしません。",
                   "en": "{p} does not practise at {te}." },
    "clubtime":  { "ja": "{c}ぶの人は{t}にれんしゅうします。",
                   "en": "The {ce} club practises at {te}." },
    "notclubtime": { "ja": "{c}ぶの人は{t}にれんしゅうしません。",
                   "en": "The {ce} club does not practise at {te}." },
    "earlier":   { "ja": "{p}さんは{c}ぶの人より早[はや]いです。",
                   "en": "{p} is earlier than the {ce} club person." },
    "later":     { "ja": "{p}さんは{c}ぶの人よりおそいです。",
                   "en": "{p} is later than the {ce} club person." },
    "either":    { "ja": "{p}さんか{q}さんが{c}ぶです。",
                   "en": "Either {p} or {q} is in the {ce} club." },
    "neither":   { "ja": "{p}さんも{q}さんも{c}ぶではありません。",
                   "en": "Neither {p} nor {q} is in the {ce} club." },
    "between":   { "ja": "{p}さんは{c}ぶの人より早[はや]くて、{d}ぶの人よりおそいです。",
                   "en": "{p} is earlier than the {ce} club person and later than the {de} club person." }
  }
};
