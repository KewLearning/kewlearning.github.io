/* ============================================================================
   data/oto.js  —  window.OTO
   ----------------------------------------------------------------------------
   おとのきまり: find the rule, then watch your rule be tested.

   The て-form is the most resented memorisation in Year 8, and it is not
   arbitrary: it is a sound change with about six lines to it and one real
   exception. A student who derives it owns it. A student who is given the
   table has to keep being given the table.

   So nothing here states a rule. The student is shown verbs with their
   て-forms, works out what is happening, and fills in a rule. Then the page
   RUNS their rule on verbs they have never seen and reports what it got.
   The rule is executable, which is the whole design: "drop the last kana,
   add って" is a program, and a student who writes it has said something
   precise enough to be wrong.

   And it will be wrong once. A correct rule scores 9 out of 10 on the first
   test and misses 行く, because 行く is the exception every textbook puts in
   a box. Meeting it as a failed prediction is worth more than meeting it in
   a box: that is what an exception IS, the case a good rule does not cover.

   The counters work the same way and then do something the て-form cannot:
   the same grouping of numbers transfers whole to ひき, which is the moment
   a rule stops being a fact about 本 and becomes a fact about Japanese. Then
   分 breaks it, because 三分 is さんぷん and not さんぶん.

   A pattern is written as a transform so the page can run it:
     drop   how many kana come off the end
     add    what goes on instead
   のむ with {drop:1, add:"んで"} gives のんで. Every rule in this file is
   executed, never described, and tools/browser-check.js runs the correct
   rule over every item to check the answers in this file are right.

   One window. line, then pure JSON. No comments inside the object.
   ========================================================================== */

window.OTO = {
  "schema_version": 1,

  "investigations": [
    {
      "id": "te",
      "ja": "てけい",
      "en": "The て-form",
      "keyBy": "verb",
      "extrapolate": [],
      "ask": "Work out how a verb becomes its て-form.",
      "lede": "Every ending you need is somewhere below. Find what decides it, then write your rule and the page will run it.",
      "keyNote": "The dictionary says whether a verb is an う-verb or a る-verb. That part is given to you.",

      "patterns": [
        { "id": "tte", "ja": "って", "drop": 1, "add": "って" },
        { "id": "nde", "ja": "んで", "drop": 1, "add": "んで" },
        { "id": "ite", "ja": "いて", "drop": 1, "add": "いて" },
        { "id": "ide", "ja": "いで", "drop": 1, "add": "いで" },
        { "id": "shite", "ja": "して", "drop": 1, "add": "して" },
        { "id": "te", "ja": "て", "drop": 1, "add": "て" }
      ],

      "keys": [
        { "id": "ru",  "ja": "る-verb", "en": "any る-verb" },
        { "id": "う",  "ja": "う-verb, う", "en": "an う-verb ending in う" },
        { "id": "つ",  "ja": "う-verb, つ", "en": "an う-verb ending in つ" },
        { "id": "る",  "ja": "う-verb, る", "en": "an う-verb ending in る" },
        { "id": "む",  "ja": "う-verb, む", "en": "an う-verb ending in む" },
        { "id": "ぶ",  "ja": "う-verb, ぶ", "en": "an う-verb ending in ぶ" },
        { "id": "ぬ",  "ja": "う-verb, ぬ", "en": "an う-verb ending in ぬ" },
        { "id": "く",  "ja": "う-verb, く", "en": "an う-verb ending in く" },
        { "id": "ぐ",  "ja": "う-verb, ぐ", "en": "an う-verb ending in ぐ" },
        { "id": "す",  "ja": "う-verb, す", "en": "an う-verb ending in す" }
      ],

      "shown": [
        { "ja": "のむ",   "type": "u",  "ans": "のんで",   "en": "drink" },
        { "ja": "たべる", "type": "ru", "ans": "たべて",   "en": "eat" },
        { "ja": "かく",   "type": "u",  "ans": "かいて",   "en": "write" },
        { "ja": "まつ",   "type": "u",  "ans": "まって",   "en": "wait" },
        { "ja": "およぐ", "type": "u",  "ans": "およいで", "en": "swim" },
        { "ja": "はなす", "type": "u",  "ans": "はなして", "en": "speak" },
        { "ja": "あそぶ", "type": "u",  "ans": "あそんで", "en": "play" },
        { "ja": "みる",   "type": "ru", "ans": "みて",     "en": "see" },
        { "ja": "とる",   "type": "u",  "ans": "とって",   "en": "take" },
        { "ja": "しぬ",   "type": "u",  "ans": "しんで",   "en": "die" },
        { "ja": "かう",   "type": "u",  "ans": "かって",   "en": "buy" },
        { "ja": "おきる", "type": "ru", "ans": "おきて",   "en": "get up" },
        { "ja": "よぶ",   "type": "u",  "ans": "よんで",   "en": "call" },
        { "ja": "きく",   "type": "u",  "ans": "きいて",   "en": "listen" }
      ],

      "test": [
        { "ja": "のる",   "type": "u",  "ans": "のって",   "en": "ride" },
        { "ja": "よむ",   "type": "u",  "ans": "よんで",   "en": "read" },
        { "ja": "あるく", "type": "u",  "ans": "あるいて", "en": "walk" },
        { "ja": "いそぐ", "type": "u",  "ans": "いそいで", "en": "hurry" },
        { "ja": "かす",   "type": "u",  "ans": "かして",   "en": "lend" },
        { "ja": "ねる",   "type": "ru", "ans": "ねて",     "en": "sleep" },
        { "ja": "まなぶ", "type": "u",  "ans": "まなんで", "en": "learn" },
        { "ja": "あらう", "type": "u",  "ans": "あらって", "en": "wash" },
        { "ja": "でる",   "type": "ru", "ans": "でて",     "en": "go out" },
        { "ja": "いく",   "type": "u",  "ans": "いって",   "en": "go" }
      ],

      "retest": [
        { "ja": "いく",     "type": "u",  "ans": "いって",     "en": "go" },
        { "ja": "てつだう", "type": "u",  "ans": "てつだって", "en": "help" },
        { "ja": "はこぶ",   "type": "u",  "ans": "はこんで",   "en": "carry" },
        { "ja": "ぬぐ",     "type": "u",  "ans": "ぬいで",     "en": "take off" },
        { "ja": "けす",     "type": "u",  "ans": "けして",     "en": "turn off" },
        { "ja": "かりる",   "type": "ru", "ans": "かりて",     "en": "borrow" },
        { "ja": "つくる",   "type": "u",  "ans": "つくって",   "en": "make" },
        { "ja": "おしえる", "type": "ru", "ans": "おしえて",   "en": "teach" },
        { "ja": "きる",     "type": "ru", "ans": "きて",       "en": "wear" },
        { "ja": "きる",     "type": "u",  "ans": "きって",     "en": "cut" }
      ],

      "exceptions": [
        { "ja": "いく", "type": "u", "ans": "いって", "en": "go",
          "say": "行く is the one verb that does not follow the rule. It ends in く and takes って, not いて." }
      ],

      "after": "Two verbs in the last set were きる. One is a る-verb and means wear, the other is an う-verb and means cut. The kana are the same and the rule still decides, because the rule asks the type first."
    },

    {
      "id": "hon",
      "ja": "かぞえかた",
      "en": "Counting rods",
      "keyBy": "number",
      "ask": "Work out which numbers change the sound of 本.",
      "lede": "Seven are given and three are held back. Group the numbers by what they do to 本.",
      "keyNote": "Three numbers are missing on purpose. You will have to guess what they do from the ones that are here.",
      "extrapolate": ["ろく", "はち", "じゅう"],

      "patterns": [
        { "id": "ppon", "ja": "っぽん", "drop": 1, "add": "っぽん" },
        { "id": "bon",  "ja": "ぼん",   "drop": 0, "add": "ぼん" },
        { "id": "hon",  "ja": "ほん",   "drop": 0, "add": "ほん" }
      ],

      "keys": [
        { "id": "いち",   "ja": "一", "en": "1" },
        { "id": "に",     "ja": "二", "en": "2" },
        { "id": "さん",   "ja": "三", "en": "3" },
        { "id": "よん",   "ja": "四", "en": "4" },
        { "id": "ご",     "ja": "五", "en": "5" },
        { "id": "ろく",   "ja": "六", "en": "6" },
        { "id": "なな",   "ja": "七", "en": "7" },
        { "id": "はち",   "ja": "八", "en": "8" },
        { "id": "きゅう", "ja": "九", "en": "9" },
        { "id": "じゅう", "ja": "十", "en": "10" }
      ],

      "shown": [
        { "ja": "いち", "kanji": "一本", "ans": "いっぽん", "en": "1" },
        { "ja": "に",   "kanji": "二本", "ans": "にほん",   "en": "2" },
        { "ja": "さん", "kanji": "三本", "ans": "さんぼん", "en": "3" },
        { "ja": "よん", "kanji": "四本", "ans": "よんほん", "en": "4" },
        { "ja": "ご",   "kanji": "五本", "ans": "ごほん",   "en": "5" },
        { "ja": "なな", "kanji": "七本", "ans": "ななほん", "en": "7" },
        { "ja": "きゅう", "kanji": "九本", "ans": "きゅうほん", "en": "9" }
      ],

      "test": [
        { "ja": "ろく",   "kanji": "六本", "ans": "ろっぽん",   "en": "6" },
        { "ja": "はち",   "kanji": "八本", "ans": "はっぽん",   "en": "8" },
        { "ja": "じゅう", "kanji": "十本", "ans": "じゅっぽん", "en": "10" }
      ],

      "exceptions": [],

      "transfer": {
        "ja": "ひき",
        "say": "Now the same numbers, counting small animals. Your grouping does not change. Only what it turns into does.",
        "patterns": [
          { "id": "ppon", "ja": "っぴき", "drop": 1, "add": "っぴき" },
          { "id": "bon",  "ja": "びき",   "drop": 0, "add": "びき" },
          { "id": "hon",  "ja": "ひき",   "drop": 0, "add": "ひき" }
        ],
        "items": [
          { "ja": "いち",   "kanji": "一ぴき", "ans": "いっぴき",   "en": "1" },
          { "ja": "さん",   "kanji": "三びき", "ans": "さんびき",   "en": "3" },
          { "ja": "よん",   "kanji": "四ひき", "ans": "よんひき",   "en": "4" },
          { "ja": "ろく",   "kanji": "六ぴき", "ans": "ろっぴき",   "en": "6" },
          { "ja": "はち",   "kanji": "八ぴき", "ans": "はっぴき",   "en": "8" },
          { "ja": "じゅう", "kanji": "十ぴき", "ans": "じゅっぴき", "en": "10" }
        ],
        "win": "Every one. The grouping was never about 本. It is about what the number does to the sound after it."
      },

      "anomaly": {
        "ja": "ふん",
        "say": "One more counter, for minutes. Same numbers, same grouping. Run it.",
        "patterns": [
          { "id": "ppon", "ja": "っぷん", "drop": 1, "add": "っぷん" },
          { "id": "bon",  "ja": "ぶん",   "drop": 0, "add": "ぶん" },
          { "id": "hon",  "ja": "ふん",   "drop": 0, "add": "ふん" }
        ],
        "items": [
          { "ja": "いち",   "kanji": "一分", "ans": "いっぷん",   "en": "1" },
          { "ja": "に",     "kanji": "二分", "ans": "にふん",     "en": "2" },
          { "ja": "さん",   "kanji": "三分", "ans": "さんぷん",   "en": "3" },
          { "ja": "よん",   "kanji": "四分", "ans": "よんぷん",   "en": "4" },
          { "ja": "ろく",   "kanji": "六分", "ans": "ろっぷん",   "en": "6" },
          { "ja": "はち",   "kanji": "八分", "ans": "はっぷん",   "en": "8" },
          { "ja": "じゅう", "kanji": "十分", "ans": "じゅっぷん", "en": "10" }
        ],
        "breaks": ["さん", "よん"],
        "say2": "Two of them broke. 三分 is さんぷん, not さんぶん, and 四分 is よんぷん, not よんふん. 分 takes ぷ where 本 and ひき take ぼ and ほ. A rule that covers three counters and fails on the fourth is still a good rule. It is now a rule with a known edge."
      }
    }
  ],

  "ui": {
    "stages": ["データ", "きまり", "ためす"],
    "runIt": "Run my rule",
    "again": "Change my rule",
    "sortIt": "Sort by ending",
    "unsorted": "As they came",
    "addEx": "Add it as an exception",
    "nextStage": "I have a rule"
  }
};
