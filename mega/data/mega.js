/* data/mega.js — Unit 9 メガセンテンス, Year 7.

   Everything here comes off Andrew's own unit files: the topic vocabulary
   and kanji lists, the days/transport/places slides, the conjugation
   sheet, and the 2025 test paper, whose question 6 is the frame the whole
   app is built on:

     すいようびに　よしさんは　おかあさんと　くるまで　スーパーに　いきます。

   Kanji appears only where this unit has taught it (Andrew's call: "Kanji
   only where they have learned it"), written 漢字[かんじ] so the app can
   show the reading above it or drop the kanji altogether.

   An icon is on every word because the picture task deals pictures, not
   text. The days use their own elements, which is what the day names
   mean: 月 moon, 火 fire, 水 water, 木 tree, 金 gold, 土 earth, 日 sun.

   The frame, in the order the test paper writes it. Each slot carries
   the particle that follows it, which is the thing being taught: the
   particle belongs to the slot, not to the word.

   part on a word overrides the slot's own particle. Two words in this
   unit do that and both are worth stopping on: 一人で is で rather than
   と, and あるいて takes no particle at all.

   The conjugation sheet, all eight verbs and all four boxes.

   Whole sentences, for reading at speed and for the wheel to land on.
   Each one is the frame with every slot filled, and the English is the
   one a marker would accept.

   The yellow box at the top of each tab.

   ---- the chiptune ----
   Beethoven's Ode to Joy, the choral theme from the Ninth, 1824 and
   long out of copyright. Two square waves and a bass pulse, which is
   what the game's sequencer plays. Chosen over the two tunes already
   in these apps because a Year 7 room knows it, and because it is a
   tune this repo can write down without guessing: steps, no leaps.
   The melody and the bass must come to the same number of beats or
   the two drift apart, and the sanity check adds them up.

   Pure JSON after the single window. line. */
window.MEGA = {
  "unit": "ユニット9 メガセンテンス",
  "unit_en": "Unit 9 Megasentence",
  "slots": [
    { "id": "day",   "ja": "ようび",   "en": "day",       "ask": "What day?",
      "part": "に", "icon": "📅" },
    { "id": "who",   "ja": "だれ",     "en": "who",       "ask": "Who is going?",
      "part": "は", "icon": "🙋" },
    { "id": "with",  "ja": "だれと",   "en": "who with",  "ask": "Who with?",
      "part": "と", "icon": "👫" },
    { "id": "how",   "ja": "なにで",   "en": "transport", "ask": "By what transport?",
      "part": "で", "icon": "🚌" },
    { "id": "where", "ja": "どこに",   "en": "where",     "ask": "To where?",
      "part": "に", "icon": "🏙️" }
  ],
  "verb": { "ja": "行[い]きます", "en": "will go", "icon": "🏃" },
  "words": [
    { "id": "nichi", "slot": "day", "badge": "日", "ja": "日曜日[にちようび]", "en": "Sunday",    "icon": "☀️" },
    { "id": "getsu", "slot": "day", "badge": "月", "ja": "月曜日[げつようび]", "en": "Monday",    "icon": "🌙" },
    { "id": "ka",    "slot": "day", "badge": "火", "ja": "火曜日[かようび]",   "en": "Tuesday",   "icon": "🔥" },
    { "id": "sui",   "slot": "day", "badge": "水", "ja": "水曜日[すいようび]", "en": "Wednesday", "icon": "💧" },
    { "id": "moku",  "slot": "day", "badge": "木", "ja": "木曜日[もくようび]", "en": "Thursday",  "icon": "🌳" },
    { "id": "kin",   "slot": "day", "badge": "金", "ja": "金曜日[きんようび]", "en": "Friday",    "icon": "🪙" },
    { "id": "do",    "slot": "day", "badge": "土", "ja": "土曜日[どようび]",   "en": "Saturday",  "icon": "⛰️" },

    { "id": "watashi", "slot": "who", "ja": "わたし",             "en": "I",             "icon": "🙋" },
    { "id": "tomo",    "slot": "who", "with": true, "ja": "友[とも]だち",       "en": "my friend",     "icon": "🧑‍🤝‍🧑" },
    { "id": "okaasan", "slot": "who", "with": true, "ja": "お母[かあ]さん",     "en": "Mum",           "icon": "👩" },
    { "id": "otousan", "slot": "who", "with": true, "ja": "お父[とう]さん",     "en": "Dad",           "icon": "👨" },
    { "id": "oneesan", "slot": "who", "with": true, "ja": "お姉[ねえ]さん",     "en": "my big sister", "icon": "👱‍♀️" },
    { "id": "oniisan", "slot": "who", "with": true, "ja": "お兄[にい]さん",     "en": "my big brother","icon": "👱‍♂️" },
    { "id": "imouto",  "slot": "who", "ja": "妹[いもうと]",       "en": "my little sister", "icon": "👧" },
    { "id": "otouto",  "slot": "who", "ja": "弟[おとうと]",       "en": "my little brother","icon": "👦" },
    { "id": "sensei",  "slot": "who", "with": true, "ja": "先生[せんせい]",     "en": "the teacher",   "icon": "👩‍🏫" },
    { "id": "kazoku",  "slot": "who", "with": true, "ja": "家族[かぞく]",       "en": "my family",     "icon": "👨‍👩‍👧‍👦" },

    { "id": "hitori", "slot": "with", "ja": "一人[ひとり]",   "en": "on my own",
      "part": "で", "note": "一人 takes で, not と.", "icon": "🧍" },

    { "id": "basu",     "slot": "how", "ja": "バス",             "en": "by bus",     "icon": "🚌" },
    { "id": "kuruma",   "slot": "how", "ja": "車[くるま]",       "en": "by car",     "icon": "🚗" },
    { "id": "densha",   "slot": "how", "ja": "電車[でんしゃ]",   "en": "by train",   "icon": "🚆" },
    { "id": "jitensha", "slot": "how", "ja": "じてんしゃ",       "en": "by bike",    "icon": "🚲" },
    { "id": "takushii", "slot": "how", "ja": "タクシー",         "en": "by taxi",    "icon": "🚕" },
    { "id": "ferii",    "slot": "how", "ja": "フェリー",         "en": "by ferry",   "icon": "⛴️" },
    { "id": "shinkansen","slot":"how", "ja": "しんかんせん",     "en": "by bullet train", "icon": "🚅" },
    { "id": "toramu",   "slot": "how", "ja": "トラム",           "en": "by tram",    "icon": "🚊" },
    { "id": "baiku",    "slot": "how", "ja": "バイク",           "en": "by motorbike","icon": "🏍️" },
    { "id": "aruite",   "slot": "how", "ja": "あるいて",         "en": "walking",
      "part": "", "note": "あるいて takes no particle.", "icon": "🚶" },

    { "id": "machi",    "slot": "where", "ja": "町[まち]",           "en": "the city",      "icon": "🏙️" },
    { "id": "gakkou",   "slot": "where", "ja": "学校[がっこう]",     "en": "school",        "icon": "🏫" },
    { "id": "umi",      "slot": "where", "ja": "海[うみ]",           "en": "the beach",     "icon": "🏖️" },
    { "id": "suupaa",   "slot": "where", "ja": "スーパー",           "en": "the supermarket","icon": "🛒" },
    { "id": "resutoran","slot": "where", "ja": "レストラン",         "en": "a restaurant",  "icon": "🍽️" },
    { "id": "eiga",     "slot": "where", "ja": "映画[えいが]",       "en": "the movies",    "icon": "🎬" },
    { "id": "konsaato", "slot": "where", "ja": "コンサート",         "en": "a concert",     "icon": "🎤" },
    { "id": "pikunikku","slot": "where", "ja": "ピクニック",         "en": "a picnic",      "icon": "🧺" },
    { "id": "uchi",     "slot": "where", "ja": "友[とも]だちのうち", "en": "a friend's house","icon": "🏠" },
    { "id": "mise",     "slot": "where", "ja": "店[みせ]",           "en": "the shop",      "icon": "🏪" },
    { "id": "futtoboru","slot": "where", "ja": "フットボールのしあい","en": "the football",  "icon": "🏈" }
  ],
  "kana": [
    { "hira": "あ", "kata": "ア" },
    { "hira": "い", "kata": "イ" },
    { "hira": "う", "kata": "ウ" },
    { "hira": "え", "kata": "エ" },
    { "hira": "お", "kata": "オ" },
    { "hira": "か", "kata": "カ" },
    { "hira": "き", "kata": "キ" },
    { "hira": "く", "kata": "ク" },
    { "hira": "け", "kata": "ケ" },
    { "hira": "こ", "kata": "コ" },
    { "hira": "さ", "kata": "サ" },
    { "hira": "し", "kata": "シ" },
    { "hira": "す", "kata": "ス" },
    { "hira": "せ", "kata": "セ" },
    { "hira": "そ", "kata": "ソ" },
    { "hira": "た", "kata": "タ" },
    { "hira": "ち", "kata": "チ" },
    { "hira": "つ", "kata": "ツ" },
    { "hira": "て", "kata": "テ" },
    { "hira": "と", "kata": "ト" },
    { "hira": "な", "kata": "ナ" },
    { "hira": "に", "kata": "ニ" },
    { "hira": "ぬ", "kata": "ヌ" },
    { "hira": "ね", "kata": "ネ" },
    { "hira": "の", "kata": "ノ" },
    { "hira": "は", "kata": "ハ" },
    { "hira": "ひ", "kata": "ヒ" },
    { "hira": "ふ", "kata": "フ" },
    { "hira": "へ", "kata": "ヘ" },
    { "hira": "ほ", "kata": "ホ" }
  ],

  "katakana": {
    "rows": ["ア", "カ", "サ", "タ", "ナ", "ハ"],
    "words": [
      { "ka": "バス",       "en": "bus" },
      { "ka": "スーパー",   "en": "supermarket" },
      { "ka": "タクシー",   "en": "taxi" },
      { "ka": "バイク",     "en": "motorbike" },
      { "ka": "ピクニック", "en": "picnic" },
      { "ka": "テスト",     "en": "test" },
      { "ka": "ケーキ",     "en": "cake" },
      { "ka": "コーヒー",   "en": "coffee" },
      { "ka": "ノート",     "en": "notebook" },
      { "ka": "デスク",     "en": "desk" },
      { "ka": "ポケット",   "en": "pocket" },
      { "ka": "チケット",   "en": "ticket" },
      { "ka": "スープ",     "en": "soup" },
      { "ka": "トースト",   "en": "toast" },
      { "ka": "カップ",     "en": "cup" },
      { "ka": "ソース",     "en": "sauce" },
      { "ka": "スキー",     "en": "skiing" },
      { "ka": "スケート",   "en": "skating" },
      { "ka": "ドア",       "en": "door" },
      { "ka": "バナナ",     "en": "banana" },
      { "ka": "ピアノ",     "en": "piano" },
      { "ka": "ポテト",     "en": "potato" },
      { "ka": "サッカー",   "en": "soccer" },
      { "ka": "テニス",     "en": "tennis" },
      { "ka": "バスケット", "en": "basket" },
      { "ka": "ステーキ",   "en": "steak" },
      { "ka": "カード",     "en": "card" },
      { "ka": "ポスト",     "en": "postbox" },
      { "ka": "ベッド",     "en": "bed" },
      { "ka": "ペット",     "en": "pet" },
      { "ka": "クッキー",   "en": "biscuit" },
      { "ka": "アイス",     "en": "ice cream" },
      { "ka": "ピザ",       "en": "pizza" },
      { "ka": "パスタ",     "en": "pasta" },
      { "ka": "ギター",     "en": "guitar" }
    ]
  },

  "kanji": [
    { "k": "家",       "yomi": ["いえ", "うち"], "en": "house, home" },
    { "k": "家族",     "yomi": ["かぞく"],       "en": "family" },
    { "k": "父",       "yomi": ["ちち"],         "en": "(my) father" },
    { "k": "母",       "yomi": ["はは"],         "en": "(my) mother" },
    { "k": "兄",       "yomi": ["あに"],         "en": "(my) older brother" },
    { "k": "姉",       "yomi": ["あね"],         "en": "(my) older sister" },
    { "k": "弟",       "yomi": ["おとうと"],     "en": "younger brother" },
    { "k": "妹",       "yomi": ["いもうと"],     "en": "younger sister" },
    { "k": "友",       "yomi": ["とも"],         "en": "friend" },
    { "k": "友だち",   "yomi": ["ともだち"],     "en": "friend" },
    { "k": "子ども",   "yomi": ["こども"],       "en": "child" },
    { "k": "男",       "yomi": ["おとこ"],       "en": "man, male" },
    { "k": "女",       "yomi": ["おんな"],       "en": "woman, female" },
    { "k": "先生",     "yomi": ["せんせい"],     "en": "teacher" },
    { "k": "店",       "yomi": ["みせ"],         "en": "shop" },
    { "k": "車",       "yomi": ["くるま"],       "en": "car" },
    { "k": "電車",     "yomi": ["でんしゃ"],     "en": "train" },
    { "k": "町",       "yomi": ["まち"],         "en": "town, city" },
    { "k": "海",       "yomi": ["うみ"],         "en": "beach, ocean" },
    { "k": "学校",     "yomi": ["がっこう"],     "en": "school" },
    { "k": "映画",     "yomi": ["えいが"],       "en": "movie" },
    { "k": "行きます", "yomi": ["いきます"],     "en": "go" },
    { "k": "見ます",   "yomi": ["みます"],       "en": "see, watch" },
    { "k": "食べます", "yomi": ["たべます"],     "en": "eat" }
  ],

  "verbs": [
    { "id": "iku",    "en": "go",     "stem": "行[い]き", "icon": "🏃",
      "forms": { "pos": "行[い]きます", "neg": "行[い]きません",
                 "past": "行[い]きました", "pastneg": "行[い]きませんでした" } },
    { "id": "suru",   "en": "do",     "stem": "し", "icon": "🥋",
      "forms": { "pos": "します", "neg": "しません",
                 "past": "しました", "pastneg": "しませんでした" } },
    { "id": "taberu", "en": "eat",    "stem": "食[た]べ", "icon": "🍣",
      "forms": { "pos": "食[た]べます", "neg": "食[た]べません",
                 "past": "食[た]べました", "pastneg": "食[た]べませんでした" } },
    { "id": "dekiru", "en": "can do", "stem": "でき", "icon": "💪",
      "forms": { "pos": "できます", "neg": "できません",
                 "past": "できました", "pastneg": "できませんでした" } },
    { "id": "miru",   "en": "see, watch", "stem": "見[み]", "icon": "👀",
      "forms": { "pos": "見[み]ます", "neg": "見[み]ません",
                 "past": "見[み]ました", "pastneg": "見[み]ませんでした" } },
    { "id": "nomu",   "en": "drink",  "stem": "のみ", "icon": "🥤",
      "forms": { "pos": "のみます", "neg": "のみません",
                 "past": "のみました", "pastneg": "のみませんでした" } },
    { "id": "kau",    "en": "buy",    "stem": "かい", "icon": "🛍️",
      "forms": { "pos": "かいます", "neg": "かいません",
                 "past": "かいました", "pastneg": "かいませんでした" } },
    { "id": "hiku",   "en": "play (guitar, piano)", "stem": "ひき", "icon": "🎸",
      "forms": { "pos": "ひきます", "neg": "ひきません",
                 "past": "ひきました", "pastneg": "ひきませんでした" } }
  ],
  "boxes": [
    { "id": "pos",     "ja": "ます",         "en": "do / will do",  "tag": "PRESENT +" },
    { "id": "neg",     "ja": "ません",       "en": "don't / won't", "tag": "PRESENT −" },
    { "id": "past",    "ja": "ました",       "en": "did",           "tag": "PAST +" },
    { "id": "pastneg", "ja": "ませんでした", "en": "didn't",        "tag": "PAST −" }
  ],
  "sentences": [
    { "day":"sui",  "who":"watashi", "with":"okaasan", "how":"kuruma",   "where":"suupaa",
      "en": "On Wednesday I will go to the supermarket by car with Mum." },
    { "day":"do",   "who":"watashi", "with":"tomo",    "how":"densha",   "where":"machi",
      "en": "On Saturday I will go to the city by train with a friend." },
    { "day":"nichi","who":"watashi", "with":"kazoku",  "how":"basu",     "where":"umi",
      "en": "On Sunday I will go to the beach by bus with my family." },
    { "day":"getsu","who":"watashi", "with":"hitori",  "how":"jitensha", "where":"gakkou",
      "en": "On Monday I will go to school by bike on my own." },
    { "day":"kin",  "who":"watashi", "with":"otousan", "how":"aruite",   "where":"mise",
      "en": "On Friday I will walk to the shop with Dad." },
    { "day":"ka",   "who":"watashi", "with":"tomo",    "how":"toramu",   "where":"eiga",
      "en": "On Tuesday I will go to the movies by tram with a friend." },
    { "day":"moku", "who":"watashi", "with":"sensei",  "how":"takushii", "where":"konsaato",
      "en": "On Thursday I will go to a concert by taxi with the teacher." },
    { "day":"do",   "who":"watashi", "with":"kazoku",  "how":"ferii",    "where":"pikunikku",
      "en": "On Saturday I will go to a picnic by ferry with my family." }
  ],
  "rules": [
    { "step": "katch", "title_en": "Catch the word",
      "rule": "Catch the word that matches the English above the screen. Move with the arrow keys or your finger. Three misses and the game is over." },
    { "step": "spin",  "title_en": "Spin a slot",
      "rule": "Spin the wheel. It lands on one part of the megasentence. Choose a word that belongs in that part, and say which particle follows it." },
    { "step": "match", "title_en": "Match the words",
      "rule": "Drag the Japanese onto the English. Tap a word to hear it." },
    { "step": "make",  "title_en": "Build the sentence",
      "rule": "Drag a piece into each box, or tap the piece and then the box. Pick the level: 絵 is pictures, 絵＋ことば puts the word under the picture, ことば is words only with the English behind the ？. じゆう builds anything you like; turn it off to be given a sentence.",
      "eg": [ { "ja": "〔ようび〕に　〔だれ〕は　〔だれ〕と　〔なに〕で　〔どこ〕に　行[い]きます。",
                "en": "The frame. Every sentence in this unit is this shape." } ] },
    { "step": "pairs", "title_en": "Memory",
      "rule": "Turn two cards over. A match stays up and you go again; a miss turns back and the other player has a turn. Pick what the pairs are made of, and one player or two." },
    { "step": "quiz", "title_en": "Team quiz",
      "rule": "Put this on the projector and split the class into teams. Read the question out, let them answer in the room, then tap who got it. Space shows the answer and moves on, 1 to 4 give the point, 0 is nobody, r plays the Japanese again." },
    { "step": "karuta", "title_en": "Hear it, grab it",
      "rule": "Listen to the word. Tap the card it names. Tap the wrong card and the call plays again, and the card stays on the table. Pick one player or two: with two, press A or L to claim the call first, then grab." },
    { "step": "kata",  "title_en": "Katakana",
      "rule": "Read the katakana. Every word here uses the ア to ハ lines only. In テスト say what the word is; in きく listen and pick the spelling, watching for ー and the small ッ." },
    { "step": "kanji", "title_en": "The kanji",
      "rule": "Tap a kanji to hear it and see what it means. Then press Test me and read them without the help." },
    { "step": "verb",  "title_en": "Change the verb",
      "rule": "Every verb here ends in ます. Change the ending to say didn't, won't or did." },
    { "step": "fast",  "title_en": "Read it fast",
      "rule": "Read the sentence out loud, then press the button. Beat the clock." }
  ],
  "tune": {
    "title": "よろこびのうた",
    "title_en": "Ode to Joy",
    "source": "Beethoven, Symphony No. 9, 1824. Public domain.",
    "tempo": 138,
    "melody": [
      ["E4",1],["E4",1],["F4",1],["G4",1],
      ["G4",1],["F4",1],["E4",1],["D4",1],
      ["C4",1],["C4",1],["D4",1],["E4",1],
      ["E4",1.5],["D4",0.5],["D4",2],
      ["E4",1],["E4",1],["F4",1],["G4",1],
      ["G4",1],["F4",1],["E4",1],["D4",1],
      ["C4",1],["C4",1],["D4",1],["E4",1],
      ["D4",1.5],["C4",0.5],["C4",2]
    ],
    "bass": [
      ["C3",2],["C3",2],["G2",2],["C3",2],
      ["C3",2],["G2",2],["C3",2],["G2",2],
      ["C3",2],["C3",2],["G2",2],["C3",2],
      ["C3",2],["G2",2],["G2",2],["C3",2]
    ]
  },

  "ui": { "rate": "はなすスピード", "fast_praise": "すげー！" }
};
