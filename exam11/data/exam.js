/* data/exam.js — Year 11, Unit 2, Semester 2.

   Off Andrew's 2024 Unit 2 paper, uploaded as the 2026 practice exam.
   The paper: 10 minutes reading, 90 minutes writing, a Japanese to
   English dictionary allowed. Part A translation both ways (12), Part
   B a reading answered in English (11), Part C a reading answered in
   Japanese (13), Part D an essay of 350 to 400 characters (20).

   WHAT IS ANDREW'S AND WHAT IS NOT. The paper, the texts, the
   questions, the grammar forms and the essay topics are all his. The
   model answers are not: no answer guide was uploaded for this paper,
   so the ones here were written from the text itself, using the
   text's own wording wherever an answer allows it. Every one carries
   "draft": true, the app says so on screen, and they want a teacher's
   eye before a class leans on them. The Part B answers are in English
   and are a straight reading of the text; the Part C answers are in
   Japanese and are the ones to check first.

   Pure JSON after the single window. line. */
window.SHIKEN = {
  "year": "Year 11",
  "title_ja": "しけん",
  "title_en": "Unit 2 exam practice",
  "tabs": ["kiki", "trans", "read", "essay", "plan"],

  "paper": {
    "when": "Semester 2, 90 minutes",
    "reading_time": 10,
    "writing_time": 90,
    "dictionary": "Japanese to English dictionary",
    "sections": [
      { "id": "A", "ja": "ほんやく", "en": "Translation, both ways", "q": 8, "marks": 12 },
      { "id": "B", "ja": "よむ",     "en": "Reading, answered in English",  "q": 6, "marks": 11 },
      { "id": "C", "ja": "よむ",     "en": "Reading, answered in Japanese", "q": 5, "marks": 13 },
      { "id": "D", "ja": "さくぶん", "en": "Essay, one of three",           "q": 3, "marks": 20 }
    ],
    "total": 56,
    "note": "Listening is sat separately."
  },

  "rules": [
    { "step": "kiki", "title_en": "The listening paper",
      "rule": "れんしゅう plays as often as you like and shows the transcript. 本番 plays twice and no more, which is the exam. These passages are written for this app, not taken from the school's recordings." },
    { "step": "trans", "title_en": "Part A, translation",
      "rule": "Four forms, both directions. A Japanese sentence into English is worth 1; an English sentence into Japanese is worth 2, because the grammar has to be built rather than read." },
    { "step": "read", "title_en": "Parts B and C, reading",
      "rule": "Two texts. One is answered in English and one in Japanese, and answering in the wrong language scores nothing. The model answers here are drafts written from the text, not the school's answer guide." },
    { "step": "essay", "title_en": "Part D, the essay",
      "rule": "Pick one topic. Plan it first, then write. The counter shows your characters against what the exam asks for, and the checklist is what to read your own draft against." },
    { "step": "plan", "title_en": "The paper",
      "rule": "What the exam looks like, where the marks are, and how to spend the ninety minutes." }
  ],

  "translate": [
    { "form": "〜べきです", "en": "should, ought to",
      "hint": "Plain form + べきです。Stronger than 〜たほうがいい: it is what a person ought to do.",
      "need": [ "べき" ],
      "items": [
        { "dir": "ja2en", "marks": 1,
          "prompt": "毎日[まいにち]水[みず]を飲[の]むべきです。",
          "model": "You should drink water every day.",
          "look_for": [ { "any": "every day", "says": "every day" },
                        { "any": "water", "says": "water" },
                        { "any": "should|ought", "says": "should, which is what べき carries" } ] },
        { "dir": "en2ja", "marks": 2,
          "prompt": "You should study Japanese.",
          "model": "日本語[にほんご]を勉強[べんきょう]するべきです。",
          "look_for": [ { "any": "日本語[にほんご]", "says": "Japanese" },
                        { "any": "勉強[べんきょう]", "says": "study" },
                        { "any": "べき", "says": "the べき form" } ] }
      ] },
    { "form": "〜ことにします", "en": "decide to",
      "hint": "Plain form + ことにします。The decision is the speaker's own. ことにしました is the decision already made.",
      "need": [ "ことにし" ],
      "items": [
        { "dir": "ja2en", "marks": 1,
          "prompt": "来月[らいげつ]、新[あたら]しい本[ほん]を読[よ]むことにしました。",
          "model": "I have decided to read a new book next month.",
          "look_for": [ { "any": "next month", "says": "next month" },
                        { "any": "book", "says": "a book" },
                        { "any": "decided", "says": "decided, which is what ことにしました carries" } ] },
        { "dir": "en2ja", "marks": 2,
          "prompt": "I have decided to learn the guitar.",
          "model": "ギターを習[なら]うことにしました。",
          "look_for": [ { "any": "ギター", "says": "the guitar" },
                        { "any": "ことにしました", "says": "the decision already made" } ] }
      ] },
    { "form": "〜ことになります", "en": "it has been decided",
      "hint": "Plain form + ことになります。Somebody else decided, or it simply came about. This is the pair to ことにします and the exam asks for both.",
      "need": [ "ことにな" ],
      "items": [
        { "dir": "ja2en", "marks": 1,
          "prompt": "新[あたら]しい先生[せんせい]が来[く]ることになりました。",
          "model": "It has been decided that a new teacher will come.",
          "look_for": [ { "any": "new teacher", "says": "a new teacher" },
                        { "any": "decided|arranged", "says": "that it was decided, not that somebody decided" } ] },
        { "dir": "en2ja", "marks": 2,
          "prompt": "It has been decided that we will go to a tennis match next week.",
          "model": "来週[らいしゅう]、テニスの試合[しあい]に行[い]くことになりました。",
          "look_for": [ { "any": "来週[らいしゅう]", "says": "next week" },
                        { "any": "テニス", "says": "tennis" },
                        { "any": "ことになりました", "says": "the ことになりました form" } ] }
      ] },
    { "form": "〜そうです", "en": "looks like, seems",
      "hint": "Verb stem + そうです, or an adjective with its い or な dropped. ふります → ふりそうです。おもしろい → おもしろそうです。",
      "need": [ "そう" ],
      "items": [
        { "dir": "ja2en", "marks": 1,
          "prompt": "雨[あめ]がふりそうです。",
          "model": "It looks like it is going to rain.",
          "look_for": [ { "any": "rain", "says": "rain" },
                        { "any": "look|seem|about to|going to", "says": "looks like, which is what そう carries" } ] },
        { "dir": "en2ja", "marks": 2,
          "prompt": "This book seems interesting.",
          "model": "この本[ほん]はおもしろそうです。",
          "look_for": [ { "any": "本[ほん]", "says": "book" },
                        { "any": "おもしろそう", "says": "おもしろい with the い dropped before そう" } ] }
      ] }
  ],

  "reading": [
    {
      "id": "nakamura",
      "title": "中村[なかむら]しゅうじの じこしょうかい",
      "title_en": "Part B · Nakamura's self-introduction",
      "answer_in": "English",
      "marks": 11,
      "draft": true,
      "body": "みなさん、こんにちは。私[わたし]の名前[なまえ]は中村[なかむら]しゅうじです。千九百五十四年[せんきゅうひゃくごじゅうよねん]に愛媛県[えひめけん]で生[う]まれました。69さいです。子[こ]どもの時[とき]、愛媛県[えひめけん]に住[す]んでいました。しかし、今[いま]はアメリカのカリフォルニア州[しゅう]に住[す]んでいます。毎日[まいにち]、6時[じ]におきます。朝[あさ]ごはんを食[た]べた後[あと]、大学[だいがく]に行[い]きます。大学[だいがく]で、けんきゅうしたり、学生[がくせい]と話[はな]したりします。新[あたら]しいぎじゅつをかいはつ開発[かいはつ]することが好[す]きです。私[わたし]は物理[ぶつり]がく学者[しゃ]です。青色[あおいろ]LEDをかいはつするために、毎日[まいにち]長[なが]い時間[じかん]働[はたら]きました。それはとてもたいへんでしたが、あきらめてはいけないと思[おも]いました。すると、ついにせいこうしました。今年[ことし]、新[あたら]しいけんきゅうをはじ始[はじ]めることにしました。エネルギー効率[こうりつ]がじゅうようなので、新[あたら]しいざいりょうをさがしてみます。しょう来[らい]、もっと多[おお]くの人々[ひとびと]がエネルギーをせつやくできるようにどりょくします。本[ほん]も書[か]くつもりです。みなさんもかんきょうのためにエネルギーを大切[たいせつ]にするべきだと思[おも]います。もっとかんきょうにやさしい生活[せいかつ]をしたほうがいいです。よろしくお願[ねが]いします。",
      "gloss": [
        { "ja": "あきらめて", "en": "give up" },
        { "ja": "ついに", "en": "finally" },
        { "ja": "効率", "en": "efficiency" },
        { "ja": "大切にする", "en": "to put a high value on" },
        { "ja": "ほうがいい", "en": "better to (do)" }
      ],
      "questions": [
        { "q": "Where was Mr Nakamura born and where does he live now?", "marks": 2,
          "model": "He was born in Ehime prefecture and now lives in California, in America.",
          "look_for": [ { "any": "ehime", "says": "Ehime" },
                        { "any": "california", "says": "California" } ] },
        { "q": "What does Mr Nakamura do at the university?", "marks": 2,
          "model": "He does research and talks with students.",
          "look_for": [ { "any": "research", "says": "research" },
                        { "any": "student", "says": "talking with students" } ] },
        { "q": "What kind of effort did Mr Nakamura make in order to develop the blue LED?", "marks": 1,
          "model": "He worked long hours every day.",
          "look_for": [ { "any": "long", "says": "long hours" },
                        { "any": "every day|daily", "says": "every day" } ] },
        { "q": "When the development was difficult, what did Mr Nakamura think? As a result, what happened?", "marks": 2,
          "model": "He thought he must not give up, and in the end he succeeded.",
          "look_for": [ { "any": "give up", "says": "that he must not give up" },
                        { "any": "succe", "says": "that he succeeded" } ] },
        { "q": "This year, what did Mr Nakamura decide to start? What is the reason?", "marks": 2,
          "model": "He decided to start new research, because energy efficiency is important.",
          "look_for": [ { "any": "research", "says": "new research" },
                        { "any": "efficien|energy", "says": "energy efficiency" },
                        { "any": "important|because", "says": "the reason" } ] },
        { "q": "What kind of suggestion is Mr Nakamura making to everyone?", "marks": 2,
          "model": "That everyone should value energy for the sake of the environment, and live in a way that is kinder to it.",
          "look_for": [ { "any": "energy", "says": "energy" },
                        { "any": "environment", "says": "the environment" },
                        { "any": "should|ought", "says": "that it is a should, which is べき in the text" } ] }
      ]
    },
    {
      "id": "emma",
      "title": "日本[にほん]でのホームステイ生活[せいかつ]",
      "title_en": "Part C · Emma's homestay",
      "answer_in": "Japanese",
      "marks": 13,
      "draft": true,
      "body": "日本[にほん]でホームステイをしている留学生[りゅうがくせい]のエマさんは、東京[とうきょう]の田中家[たなかけ]とくらしています。田中[たなか]さんの家族[かぞく]は、父[ちち]、母[はは]、中学生[ちゅうがくせい]の弟[おとうと]の四人[よにん]家族[かぞく]です。エマさんは毎朝[まいあさ]6時半[じはん]におきて、家族[かぞく]といっしょに朝[あさ]ごはんを食[た]べます。朝[あさ]ごはんには、ご飯[はん]、みそしる、やき魚[ざかな]、たまごやきなどが出[で]ます。さいしょははやおきがたいへんでしたが、今[いま]ではなれました。学校[がっこう]へは電車[でんしゃ]とバスでかよいます。時間[じかん]は、1時間[じかん]ぐらいで、電車[でんしゃ]はとてもこんでいます。学校[がっこう]では日本語[にほんご]や日本[にほん]のれきしを勉強[べんきょう]し、ほうかごには茶道部[さどうぶ]にさんかしています。日本[にほん]のでんとう文化[ぶんか]を学[まな]ぶことができ、きょうみぶかいとかんじています。週末[しゅうまつ]には、ホストファミリーといっしょに色々[いろいろ]な場所[ばしょ]に行[い]きます。先週末[せんしゅうまつ]は京都[きょうと]に行[い]き、お寺[てら]や神社[じんじゃ]を見学[けんがく]し、わがしづくりもたいけんしました。田中[たなか]さんのお父[とう]さんは会社員[かいしゃいん]で、夜[よる]おそくまで働[はたら]きます。お母[かあ]さんはパートで働[はたら]きながら家事[かじ]をしています。エマさんは日本[にほん]の働[はたら]き方[かた]や家族[かぞく]のすごし方[かた]について学[まな]びました。毎日[まいにち]いそがしいですが、楽[たの]しく生活[せいかつ]しています。",
      "gloss": [
        { "ja": "くらしています", "en": "living (with)" },
        { "ja": "出ます", "en": "(food) is served" },
        { "ja": "はやおき", "en": "getting up early" },
        { "ja": "なれました", "en": "got used to" },
        { "ja": "かよいます", "en": "to commute" },
        { "ja": "こんでいます", "en": "crowded" },
        { "ja": "きょうみぶかい", "en": "very interesting" },
        { "ja": "かんじています", "en": "feels" },
        { "ja": "夜おそく", "en": "late at night" },
        { "ja": "パートで", "en": "part time" },
        { "ja": "〜方", "en": "way of (doing)" }
      ],
      "questions": [
        { "q": "エマさんはだれとくらしていますか。説明[せつめい]してください。", "marks": 2,
          "ask_en": "Who is Emma living with? Please explain.",
          "model": "東京[とうきょう]の田中[たなか]さんの家族[かぞく]とくらしています。お父[とう]さんとお母[かあ]さんと中学生[ちゅうがくせい]の弟[おとうと]の四人[よにん]家族[かぞく]です。",
          "look_for": [ { "any": "田中[たなか]", "says": "the Tanaka family" },
                        { "any": "四人[よにん]|よにん|4人", "says": "that there are four of them" },
                        { "any": "弟[おとうと]", "says": "the younger brother" } ] },
        { "q": "朝[あさ]ごはんにはどのような食[た]べ物[もの]が出[で]ますか。二[ふた]つ書[か]いてください。", "marks": 2,
          "ask_en": "What kinds of food are served for breakfast? Write two.",
          "need": 2,
          "model": "ご飯[はん]やみそしる、やき魚[ざかな]、たまごやきなどが出[で]ます。",
          "look_for": [ { "any": "ご飯[はん]|ごはん", "says": "rice" },
                        { "any": "みそしる", "says": "miso soup" },
                        { "any": "やき魚[ざかな]|やきざかな", "says": "grilled fish" },
                        { "any": "たまごやき", "says": "tamagoyaki" } ] },
        { "q": "エマさんの通学[つうがく]方法[ほうほう]と時間[じかん]について書[か]いてください。", "marks": 3,
          "ask_en": "Describe Emma's commute to school and how long it takes.",
          "model": "電車[でんしゃ]とバスで学校[がっこう]にかよいます。1時間[じかん]ぐらいかかります。電車[でんしゃ]はとてもこんでいます。",
          "look_for": [ { "any": "電車[でんしゃ]", "says": "by train" },
                        { "any": "バス", "says": "and bus" },
                        { "any": "1時間[じかん]|一時間[いちじかん]|いちじかん", "says": "about an hour" } ] },
        { "q": "ほうかご、エマさんは何[なに]をしますか。その活動[かつどう]についてどう思[おも]っていますか。", "marks": 3,
          "ask_en": "What does Emma do after school? How does she feel about it?",
          "model": "茶道部[さどうぶ]にさんかしています。日本[にほん]のでんとう文化[ぶんか]を学[まな]ぶことができるので、きょうみぶかいとかんじています。",
          "look_for": [ { "any": "茶道[さどう]", "says": "the tea ceremony club" },
                        { "any": "きょうみ", "says": "that she finds it interesting" },
                        { "any": "文化[ぶんか]|でんとう", "says": "the traditional culture she is learning" } ] },
        { "q": "エマさんは日本[にほん]の働[はたら]き方[かた]や家族[かぞく]のすごし方[かた]について何[なに]を学[まな]びましたか。", "marks": 3,
          "ask_en": "What did Emma learn about Japanese working styles and family life?",
          "model": "お父[とう]さんは会社員[かいしゃいん]で、夜[よる]おそくまで働[はたら]きます。お母[かあ]さんはパートで働[はたら]きながら家事[かじ]をしています。エマさんは日本[にほん]の働[はたら]き方[かた]や家族[かぞく]のすごし方[かた]について学[まな]びました。",
          "look_for": [ { "any": "会社員[かいしゃいん]", "says": "that the father is a company employee" },
                        { "any": "夜[よる]おそく|おそくまで", "says": "that he works late" },
                        { "any": "家事[かじ]|パート", "says": "that the mother works part time and does the housework" } ] }
      ]
    }
  ],

  "listening_paper": {
    "when": "Sat separately",
    "note": "The shape of the Year 11 listening paper was not uploaded, so this follows the Year 10 one: answers in English, then answers in Japanese. Tell Andrew if the real paper differs and the numbers move.",
    "sections": [
      { "id": "1A", "ja": "ききとり", "en": "Listening, answered in English",  "q": 8, "marks": 10 },
      { "id": "1B", "ja": "ききとり", "en": "Listening, answered in Japanese", "q": 6, "marks": 12 }
    ],
    "total": 22
  },

  "listening": [
    {
      "id": "kankyou", "section": "1A", "answer_in": "English", "marks": 6, "draft": true,
      "title": "大学[だいがく]でべんきょうすること",
      "title_en": "What she has decided to study",
      "setting": "A Year 12 student speaks to your class about next year.",
      "speakers": [ { "tag": "a", "who": "みさき", "voice": "a" } ],
      "lines": [
        { "sp": "a", "ja": "今年[ことし]、大学[だいがく]でかんきょうについて勉強[べんきょう]することにしました。" },
        { "sp": "a", "ja": "小[ちい]さいころから、ごみのもんだいにきょうみがありました。" },
        { "sp": "a", "ja": "日本[にほん]では、ごみを分[わ]けなければなりませんが、オーストラリアでは、あまり分[わ]けません。もっと分[わ]けるべきだと思[おも]います。" },
        { "sp": "a", "ja": "来年[らいねん]、日本[にほん]の大学[だいがく]に一年間[いちねんかん]りゅうがくすることになりました。" },
        { "sp": "a", "ja": "むこうでアルバイトをしながら、日本語[にほんご]も勉強[べんきょう]するつもりです。たいへんそうですが、楽[たの]しみです。" }
      ],
      "questions": [
        { "q": "What has Misaki decided to study, and since when has she been interested?", "marks": 2, "line": 0,
          "model": "The environment, and she has been interested in the rubbish problem since she was little.",
          "look_for": [ { "any": "environment", "says": "the environment" },
                        { "any": "little|small|child|young", "says": "since she was small" } ] },
        { "q": "What difference does she describe between Japan and Australia?", "marks": 2, "line": 2,
          "model": "In Japan you have to separate rubbish; in Australia people do not do it much.",
          "look_for": [ { "any": "separat|sort|divid", "says": "separating rubbish" },
                        { "any": "australia", "says": "what Australia does" } ] },
        { "q": "What has been decided for next year?", "marks": 1, "line": 3,
          "model": "It has been decided that she will study at a Japanese university for a year.",
          "look_for": [ { "any": "year", "says": "for a year" },
                        { "any": "japan", "says": "in Japan" } ] },
        { "q": "What does she intend to do while she is there?", "marks": 1, "line": 4,
          "model": "Work part-time while studying Japanese.",
          "look_for": [ { "any": "work|job|part", "says": "a part-time job" },
                        { "any": "japanese|study", "says": "studying at the same time" } ] }
      ]
    },
    {
      "id": "baito", "section": "1A", "answer_in": "English", "marks": 4, "draft": true,
      "title": "あたらしいアルバイト",
      "title_en": "The new job",
      "setting": "Two Year 11 students, three weeks before the exams.",
      "speakers": [ { "tag": "a", "who": "ハナ", "voice": "a" },
                    { "tag": "b", "who": "トム", "voice": "b" } ],
      "lines": [
        { "sp": "a", "ja": "来週[らいしゅう]から、あたらしいアルバイトをすることになったよ。" },
        { "sp": "b", "ja": "へえ、どこで？" },
        { "sp": "a", "ja": "えきの近[ちか]くのカフェ。土曜日[どようび]の朝[あさ]だけ。" },
        { "sp": "b", "ja": "いいね。でも、しけんの前[まえ]だから、むりをするべきじゃないよ。" },
        { "sp": "a", "ja": "うん。だから、しけんの一週間前[いっしゅうかんまえ]からは休[やす]むことにした。" },
        { "sp": "b", "ja": "それがいいと思[おも]う。つかれていると、おぼえられないそうだから。" }
      ],
      "questions": [
        { "q": "Where is Hana's new job?", "marks": 1, "line": 2,
          "model": "At a café near the station.",
          "look_for": [ { "any": "caf|coffee", "says": "a café" },
                        { "any": "station", "says": "near the station" } ] },
        { "q": "When will she work?", "marks": 1, "line": 2,
          "model": "Saturday mornings only.",
          "look_for": [ { "any": "saturday", "says": "Saturday" },
                        { "any": "morning", "says": "mornings" } ] },
        { "q": "What does Tom warn her about?", "marks": 1, "line": 3,
          "model": "That she should not overdo it before the exam.",
          "look_for": [ { "any": "overdo|too much|not push|hard", "says": "not overdoing it" },
                        { "any": "exam", "says": "before the exam" } ] },
        { "q": "What has Hana decided to do about it?", "marks": 1, "line": 4,
          "model": "To take the week before the exam off.",
          "look_for": [ { "any": "week", "says": "the week before" },
                        { "any": "off|rest|not work|break", "says": "that she will not work" } ] }
      ]
    },
    {
      "id": "kyoto", "section": "1B", "answer_in": "Japanese", "marks": 6, "draft": true,
      "title": "京都[きょうと]に行[い]くことになりました",
      "title_en": "The trip to Kyoto",
      "setting": "An exchange student and her host mother, after dinner.",
      "speakers": [ { "tag": "a", "who": "お母[かあ]さん", "voice": "a" },
                    { "tag": "b", "who": "エマ", "voice": "b" } ],
      "lines": [
        { "sp": "a", "ja": "来週[らいしゅう]の日曜日[にちようび]、みんなで京都[きょうと]に行[い]くことになりましたよ。" },
        { "sp": "b", "ja": "ほんとうですか。うれしいです。何時[なんじ]に出[で]ますか。" },
        { "sp": "a", "ja": "朝[あさ]六時[ろくじ]に家[いえ]を出[で]ます。早[はや]いですが、電車[でんしゃ]がこむので、早[はや]く出[で]るべきです。" },
        { "sp": "b", "ja": "わかりました。カメラを持[も]って行[い]ってもいいですか。" },
        { "sp": "a", "ja": "もちろん。でも、お寺[てら]の中[なか]では写真[しゃしん]をとってはいけないところもありますから、気[き]をつけてくださいね。" },
        { "sp": "b", "ja": "はい。ガイドブックを読[よ]みながら、じゅんびします。" }
      ],
      "questions": [
        { "q": "いつ、どこへ行[い]くことになりましたか。", "marks": 2, "line": 0,
          "ask_en": "When, and where, has it been decided they will go?",
          "model": "来週[らいしゅう]の日曜日[にちようび]に京都[きょうと]へ行[い]くことになりました。",
          "look_for": [ { "any": "来週[らいしゅう]", "says": "next week" },
                        { "any": "日曜日[にちようび]", "says": "Sunday" },
                        { "any": "京都[きょうと]", "says": "Kyoto" } ] },
        { "q": "どうして朝[あさ]早[はや]く家[いえ]を出[で]ますか。", "marks": 2, "line": 2,
          "ask_en": "Why are they leaving early?",
          "model": "電車[でんしゃ]がこむからです。",
          "look_for": [ { "any": "電車[でんしゃ]", "says": "the train" },
                        { "any": "こむ|こみます|混[こ]む", "says": "that it gets crowded" },
                        { "any": "から|ので", "says": "a reason, which the question asks for" } ] },
        { "q": "エマさんは何[なに]をしながら、じゅんびしますか。", "marks": 2, "line": 5,
          "ask_en": "What will Emma do while she gets ready?",
          "model": "ガイドブックを読[よ]みながら、じゅんびします。",
          "look_for": [ { "any": "ガイドブック", "says": "the guidebook" },
                        { "any": "読[よ]みながら|よみながら", "says": "the 〜ながら form" } ] }
      ]
    },
    {
      "id": "shikenmae", "section": "1B", "answer_in": "Japanese", "marks": 6, "draft": true,
      "title": "しけんの前[まえ]に",
      "title_en": "Before the exam",
      "setting": "Your teacher, two weeks out from the exams.",
      "speakers": [ { "tag": "a", "who": "先生[せんせい]", "voice": "a" } ],
      "lines": [
        { "sp": "a", "ja": "みなさん、しけんまであと二週間[にしゅうかん]です。毎日[まいにち]少[すこ]しずつ勉強[べんきょう]するべきです。" },
        { "sp": "a", "ja": "しけんの前[まえ]の日[ひ]に全部[ぜんぶ]おぼえるのはむりそうですね。" },
        { "sp": "a", "ja": "来週[らいしゅう]から、ひるやすみに教室[きょうしつ]を開[あ]けることにしました。しずかに勉強[べんきょう]したい人[ひと]は来[き]てください。" },
        { "sp": "a", "ja": "それから、しけんの日[ひ]は、八時半[はちじはん]に来[く]ることになっています。" },
        { "sp": "a", "ja": "じしょを持[も]って来[き]てもいいですが、けいたいは持[も]って来[き]てはいけません。" }
      ],
      "questions": [
        { "q": "先生[せんせい]は毎日[まいにち]どうするべきだと言[い]っていますか。", "marks": 2, "line": 0,
          "ask_en": "What does the teacher say you should do every day?",
          "model": "毎日[まいにち]少[すこ]しずつ勉強[べんきょう]するべきだと言[い]っています。",
          "look_for": [ { "any": "毎日[まいにち]", "says": "every day" },
                        { "any": "少[すこ]しずつ|すこしずつ", "says": "a little at a time" },
                        { "any": "べき", "says": "the べき form the question uses" } ] },
        { "q": "来週[らいしゅう]から、ひるやすみに何[なに]をすることにしましたか。", "marks": 2, "line": 2,
          "ask_en": "What has been decided about lunchtimes from next week?",
          "model": "教室[きょうしつ]を開[あ]けることにしました。",
          "look_for": [ { "any": "教室[きょうしつ]|きょうしつ", "says": "the classroom" },
                        { "any": "開[あ]け|あけ", "says": "that it will be open" } ] },
        { "q": "しけんの日[ひ]に持[も]って来[き]てもいいものと、持[も]って来[き]てはいけないものは何[なん]ですか。", "marks": 2, "line": 4,
          "ask_en": "What may you bring on exam day, and what may you not?",
          "model": "じしょを持[も]って来[き]てもいいですが、けいたいを持[も]って来[き]てはいけません。",
          "look_for": [ { "any": "じしょ|辞書[じしょ]", "says": "the dictionary" },
                        { "any": "けいたい|スマホ", "says": "the phone" } ] }
      ]
    }
  ],

  "essay": {
    "marks": 20,
    "chars": [ 350, 400 ],
    "about": "One of three, on genkouyoushi. Option 1 is written in plain form; the other two are not.",
    "options": [
      { "id": "nikki", "kind": "nikki",
        "ja": "日本[にほん]の高校[こうこう]での最初[さいしょ]の一週間[いっしゅうかん]について、日記[にっき]を普通形[ふつうけい]で書[か]いてください。",
        "en": "A journal entry in PLAIN FORM about your first week at a Japanese high school: classes, clubs you joined, friends you made, and how the system differs from your school in Australia." },
      { "id": "kiji", "kind": "kiji",
        "ja": "あなたが尊敬[そんけい]する有名[ゆうめい]な日本人[にほんじん]について、学校[がっこう]のニュースレターのために記事[きじ]を書[か]いてください。",
        "en": "An article for the school newsletter about a famous Japanese person you admire: their life, achievements, and why they are a role model." },
      { "id": "mail", "kind": "mail",
        "ja": "ホストファミリーへの感謝[かんしゃ]の気持[きも]ちと、日本[にほん]の文化[ぶんか]や日常[にちじょう]生活[せいかつ]の理解[りかい]がどのように深[ふか]まったかを伝[つた]えるメールを書[か]いてください。",
        "en": "An email to your host family thanking them and describing how living with them deepened your understanding. You are still living there, so past and present tenses both belong." }
    ],
    "shapes": [
      { "kind": "nikki", "ja": "日記[にっき]", "en": "Journal, plain form",
        "steps": [
          "Date at the top: 〇月〇日（〇）",
          "Plain form all the way through. 行った, 楽しかった, ではない, not 行きました",
          "One day or one theme per paragraph",
          "Say how you felt, not only what happened: 〜と思った, 〜てうれしかった",
          "Close with something about tomorrow or next week: あしたも〜たい"
        ] },
      { "kind": "kiji", "ja": "記事[きじ]", "en": "Newsletter article",
        "steps": [
          "A headline on the top line, three squares in",
          "Open by naming the person and why they are worth writing about",
          "One paragraph on their life, one on what they achieved",
          "Say plainly why they are a model: 〜ので、せいとのもはんだと思います",
          "Keep です・ます throughout: this is for readers, not a diary"
        ] },
      { "kind": "mail", "ja": "メール", "en": "Email",
        "steps": [
          "〜さんへ or 〜家[け]のみなさんへ on the first line",
          "Thank them in the first sentence: 本当[ほんとう]にありがとうございます",
          "Past tense for what has happened, present for what is still true",
          "One paragraph on what you have learned about the culture",
          "Close with これからもよろしくおねがいします and your name"
        ] }
    ],
    "check": [
      { "id": "chars", "say": "350 to 400 characters" },
      { "id": "form",  "say": "The right form all the way through: plain for the journal, です・ます for the other two" },
      { "id": "shape", "say": "The opening and closing the shape asks for" },
      { "id": "para",  "say": "Four paragraphs or more, one idea each" },
      { "id": "joins", "say": "Three different joining words: そして, しかし, それから, たとえば, また" },
      { "id": "unit2", "say": "At least two Unit 2 forms: べき, ことにします, ことになります, そうです, ながら, ために" },
      { "id": "tense", "say": "Past and present both, where the topic asks for both" },
      { "id": "kanji", "say": "The kanji you know, not kana for all of it" }
    ],
    "rubric": [
      { "c": "Content and relevance",
        "bands": [ "Addresses the topic minimally; limited information",
                   "Partially addresses the topic; some relevant information",
                   "Adequately addresses the topic; relevant details",
                   "Effectively addresses the topic; detailed and relevant",
                   "Thoroughly addresses the topic; highly detailed and insightful" ] },
      { "c": "Organisation and structure",
        "bands": [ "Basic structure; may be hard to follow",
                   "Simple structure; some organisation",
                   "Clear structure with introduction, body, conclusion; logical flow",
                   "Well organised; ideas flow logically",
                   "Exceptionally organised; ideas flow cohesively throughout" ] },
      { "c": "Language range and accuracy",
        "bands": [ "Basic vocabulary and grammar; simple ideas, limited accuracy",
                   "Simple vocabulary and grammar; some accuracy",
                   "Appropriate vocabulary and grammar; clear and accurate",
                   "Good range; communicates effectively and accurately",
                   "Wide range and complex grammar; sophisticated and accurate" ] },
      { "c": "Script",
        "bands": [ "Hiragana, katakana, some kanji, limited accuracy",
                   "Generally correct script; some errors",
                   "Accurate hiragana, katakana and kanji; minor errors",
                   "Accurate script with minimal errors",
                   "Accurate hiragana, katakana and appropriate kanji; clear and precise" ] }
    ]
  },

  "strategy": [
    { "head": "Where the marks are",
      "body": "56 marks in 90 minutes. The essay is 20 of them, Part C is 13, Part B 11 and Part A 12. Ten minutes of reading time comes first, and you may not write in it." },
    { "head": "A plan for the 90 minutes",
      "body": "Part A 15 minutes. Part B 15. Part C 20. Essay 35, which is 5 to plan and 27 to write and 3 to read back. That leaves 5 spare and you will want them." },
    { "head": "What to do in the reading time",
      "body": "Read the three essay topics and pick one. Then read the Part C questions, not the text: you will know what to look for when you are allowed to write." },
    { "head": "The language the question names",
      "body": "Part B is answered in English and Part C in Japanese. An answer in the wrong language scores nothing, however right it is. Check the heading of each part before you start it." },
    { "head": "Part A pays double one way",
      "body": "Japanese into English is one mark; English into Japanese is two. Do the two mark ones first while you are fresh, and make sure the named form is actually in your sentence." },
    { "head": "The dictionary",
      "body": "A dictionary gives you nouns, not grammar. It will not tell you whether to use ことにします or ことになります, and that distinction is on this paper. Two or three lookups in the whole exam is about right." },
    { "head": "Give what the marks ask for",
      "body": "A question worth 3 wants three pieces of information. Count them before you move on. Part C questions carry the English under them: use it to check you have answered all of what was asked." }
  ]
};
