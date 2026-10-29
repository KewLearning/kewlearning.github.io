/* data/exam.js — Year 10, Semester 2.

   Everything here is Andrew's own, off the 2024 paper he uploaded as the
   2026 practice exam and its answer guide. The model answers in the
   reading and grammar parts are his, word for word; nothing in this file
   is a guess at what a Japanese answer should look like.

   The paper: 10 minutes reading, 90 minutes writing, any bilingual
   dictionary allowed. Part A reading answered in Japanese (13), Part B
   grammar and translation (20), Part C kanji (10), Part D an essay of
   300 to 400 characters on genkouyoushi (20). Listening is a separate
   paper sat in class.

   look_for is what the marker has to find in an answer, not what the
   answer has to be: alternatives are separated by |, and need says how
   many of the list a full answer carries. The app says plainly that it
   is checking for those pieces and cannot judge the Japanese.

   Pure JSON after the single window. line. */
window.SHIKEN = {
  "year": "Year 10",
  "title_ja": "しけん",
  "title_en": "Semester 2 exam practice",
  "tabs": ["kiki", "read", "gram", "kanji", "essay", "plan"],

  "paper": {
    "when": "Monday 25 November, 1:50pm",
    "reading_time": 10,
    "writing_time": 90,
    "dictionary": "Any bilingual dictionary, one or two volumes",
    "sections": [
      { "id": "A", "ja": "よむ",     "en": "Reading, answered in Japanese", "q": 8,  "marks": 13 },
      { "id": "B", "ja": "ぶんぽう", "en": "Grammar and translation",       "q": 10, "marks": 20 },
      { "id": "C", "ja": "かんじ",   "en": "Kanji",                          "q": 10, "marks": 10 },
      { "id": "D", "ja": "さくぶん", "en": "Essay, one of three",            "q": 3,  "marks": 20 }
    ],
    "total": 63,
    "note": "The listening paper is sat separately in class."
  },

  "rules": [
    { "step": "kiki", "title_en": "The listening paper",
      "rule": "れんしゅう plays as often as you like and shows the transcript. 本番 plays twice and no more, which is the exam. The passages here are not the school's recordings: they are written to the same shape." },
    { "step": "read", "title_en": "Part A, reading",
      "rule": "Read the text, then answer each question in Japanese. Press Check and the app ticks off the pieces the marker is looking for. Showing the answer before you have it costs a point." },
    { "step": "gram", "title_en": "Part B, grammar",
      "rule": "Write the sentence the prompt asks for, using the form at the top, then put it into English. Two marks each in the exam: one for the Japanese, one for the translation." },
    { "step": "kanji", "title_en": "Part C, kanji",
      "rule": "The exam gives you the three columns with one box empty. Six at a time here, and the empty box moves: sometimes the reading, sometimes the meaning, sometimes the kanji." },
    { "step": "essay", "title_en": "Part D, the essay",
      "rule": "Pick one topic. Plan it first, then write. The counter at the bottom shows how many characters you have against what the exam asks for, and the checklist is what to read your own draft against." },
    { "step": "plan", "title_en": "The paper",
      "rule": "What the exam looks like, where the marks are, and how to spend the ninety minutes." }
  ],

  "reading": [
    {
      "id": "yoshiyuki",
      "title": "山田[やまだ]吉行[よしゆき]の学校[がっこう]",
      "title_en": "Yoshiyuki's school life",
      "answer_in": "Japanese",
      "marks": 13,
      "body": "ぼくの高校[こうこう]は、八時十分[はちじじゅっぷん]にはじまります。さいしょの活動[かつどう]は朝[あさ]の会[かい]で、それが終[お]わると、八時二十分[はちじにじゅっぷん]から八時四十分[はちじよんじゅっぷん]まで読書[どくしょ]の時間[じかん]です。午前中[ごぜんちゅう]には四時間[よじかん]のじゅぎょうがあります。昼休[ひるやす]みは一時[いちじ]からです。昼休[ひるやす]みに、お弁当[べんとう]を食[た]べたり、友[とも]だちと話[はな]したりします。お弁当[べんとう]には、いつもごはんややさい、魚[さかな]や肉[にく]、果物[くだもの]が入[はい]っています。時々[ときどき]、すしを持[も]って行[い]きます。午後[ごご]には一時間[いちじかん]のじゅぎょうがあり、その後[あと]は部活動[ぶかつどう]があります。ぼくはサッカー部[ぶ]に入[はい]っていて、トレーニングをしたり、しあいをしたりします。火曜日[かようび]と土曜日[どようび]は、ほうか後[ご]にピアノのプライベートレッスンをうけています。来年[らいねん]の学校[がっこう]のコンサートのために、もっと上[じょう]たつさせたいからです。",
      "gloss": [
        { "ja": "入っていて",   "en": "belong to" },
        { "ja": "さいしょの",   "en": "the first" },
        { "ja": "ほうか後",     "en": "after school" },
        { "ja": "じゅぎょう",   "en": "class" },
        { "ja": "うけています", "en": "taking, attending" },
        { "ja": "持って行きます", "en": "take (to)" },
        { "ja": "上たつさせる", "en": "to improve" }
      ],
      "questions": [
        { "q": "さいしょの活動[かつどう]はなんですか。", "marks": 1,
          "model": "朝[あさ]の会[かい]です。",
          "look_for": [ { "any": "朝[あさ]の会[かい]", "says": "which activity it is" } ] },
        { "q": "その後[あと]、何[なに]をしますか。何時[なんじ]ですか。", "marks": 2,
          "model": "どくしょをします。八時二十分[はちじにじゅっぷん]から八時四十分[はちじよんじゅっぷん]までです。",
          "look_for": [
            { "any": "読書[どくしょ]", "says": "what they do" },
            { "any": "八[はち]時[じ]二十分[にじゅっぷん]|八[はち]時[じ]二十分[にじっぷん]|8時20分", "says": "when it starts" },
            { "any": "八[はち]時[じ]四十分[よんじゅっぷん]|八[はち]時[じ]四十分[よんじっぷん]|8時40分", "says": "when it ends" }
          ] },
        { "q": "昼休[ひるやす]みに、何[なに]をしますか。", "marks": 2,
          "model": "お弁当[べんとう]を食[た]べたり、友[とも]だちと話[はな]したりします。",
          "look_for": [
            { "any": "弁当[べんとう]", "says": "eating lunch" },
            { "any": "話[はな]", "says": "talking with friends" },
            { "any": "たり", "says": "the 〜たり〜たり pattern the question invites" }
          ] },
        { "q": "山田[やまだ]さんのお弁当[べんとう]には、何[なに]が入[はい]っていますか。", "marks": 3,
          "model": "ごはんややさい、魚[さかな]や肉[にく]、果物[くだもの]が入[はい]っています。時々[ときどき]、すしも持[も]って行[い]きます。",
          "need": 3,
          "look_for": [
            { "any": "ごはん", "says": "rice" },
            { "any": "野菜[やさい]|やさい", "says": "vegetables" },
            { "any": "魚[さかな]", "says": "fish" },
            { "any": "肉[にく]", "says": "meat" },
            { "any": "果物[くだもの]", "says": "fruit" },
            { "any": "すし", "says": "sushi, sometimes" }
          ] },
        { "q": "山田[やまだ]さんの学校[がっこう]は一日[いちにち]にじゅぎょうが何時間[なんじかん]ありますか。", "marks": 1,
          "model": "五時間[ごじかん]です。",
          "look_for": [ { "any": "五[ご]時間[じかん]|5時間|ごじかん", "says": "five classes" } ] },
        { "q": "ほうか後[ご]に、山田[やまだ]さんは何[なに]をしますか。", "marks": 1,
          "model": "部活動[ぶかつどう]をします。",
          "look_for": [ { "any": "部活動[ぶかつどう]|クラブ", "says": "club activities" } ] },
        { "q": "どの部[ぶ]に入[はい]っていますか。", "marks": 1,
          "model": "サッカー部[ぶ]に入[はい]っています。",
          "look_for": [ { "any": "サッカー", "says": "which club" } ] },
        { "q": "どうしてピアノのレッスンを上[じょう]たつさせたいですか。", "marks": 2,
          "ask_en": "You must use から or ので in your answer.",
          "model": "学校[がっこう]のコンサートのために、もっと上手[じょうず]になりたいからです。",
          "look_for": [
            { "any": "コンサート", "says": "the concert" },
            { "any": "から|ので", "says": "から or ので, which the question asks for" }
          ] }
      ]
    }
  ],

  "grammar": [
    { "form": "〜と", "en": "if / when",
      "hint": "Plain form + と. The second half is what always happens.",
      "items": [
        { "prompt": "日本[にほん]に行[い]きます。／おいしいすしを食[た]べます。",
          "model": "日本[にほん]に行[い]くと、おいしいすしを食[た]べます。",
          "en": "If / when I go to Japan, I eat delicious sushi.",
          "look_for": [ { "any": "行[い]くと", "says": "the plain form before と" } ] },
        { "prompt": "ピアノのれんしゅうをします。／じょうずになります。",
          "model": "ピアノのれんしゅうをすると、じょうずになります。",
          "en": "If / when I practise the piano, I become skilled.",
          "look_for": [ { "any": "すると", "says": "する in plain form before と" } ] }
      ] },
    { "form": "〜が", "en": "but",
      "hint": "Two sentences joined. The が goes after the first です or ます.",
      "need": [ "ですが", "ますが" ],
      "items": [
        { "prompt": "たのしいです。／むずかしいです。",
          "model": "たのしいですが、むずかしいです。",
          "en": "It is fun, but it is difficult.",
          "look_for": [ { "any": "ですが", "says": "が after the first です" } ] },
        { "prompt": "日本人[にほんじん]です。／日本語[にほんご]ができません。",
          "model": "日本人[にほんじん]ですが、日本語[にほんご]ができません。",
          "en": "I am Japanese, but I cannot speak Japanese.",
          "look_for": [ { "any": "ですが", "says": "が after the first です" },
                        { "any": "できません", "says": "the negative in the second half" } ] }
      ] },
    { "form": "〜なければなりません", "en": "must",
      "hint": "Plain negative, drop the ない, add ければなりません. たべない → たべなければなりません。",
      "need": [ "なければなりません" ],
      "items": [
        { "prompt": "やさいをたべます。",
          "model": "やさいをたべなければなりません。",
          "en": "I must eat vegetables.",
          "look_for": [ { "any": "食[た]べなければなりません", "says": "the whole form on 食べる" } ] },
        { "prompt": "しゅくだいをします。",
          "model": "しゅくだいをしなければなりません。",
          "en": "I must do my homework.",
          "look_for": [ { "any": "しなければなりません", "says": "する becomes しなければ" } ] }
      ] },
    { "form": "〜なくてもいいです", "en": "do not have to",
      "hint": "Plain negative, drop the ない, add くてもいいです。かかない → かかなくてもいいです。",
      "need": [ "なくてもいい" ],
      "items": [
        { "prompt": "名前[なまえ]を書[か]きます。",
          "model": "名前[なまえ]をかかなくてもいいです。",
          "en": "You do not have to write your name.",
          "look_for": [ { "any": "書[か]かなくてもいい", "says": "書く in plain negative" } ] },
        { "prompt": "先生[せんせい]と会[あ]います。",
          "model": "先生[せんせい]とあわなくてもいいです。",
          "en": "You do not have to meet the teacher.",
          "look_for": [ { "any": "会[あ]わなくてもいい", "says": "会う in plain negative" } ] }
      ] },
    { "form": "〜てみます", "en": "try doing",
      "hint": "て form + みます。よむ → よんでみます。",
      "need": [ "てみます", "でみます" ],
      "items": [
        { "prompt": "カタカナ／よ読[よ]みます",
          "model": "カタカナをよんでみます。",
          "en": "I will try reading katakana.",
          "look_for": [ { "any": "読[よ]んでみます", "says": "よむ in て form" } ] },
        { "prompt": "ギター／ひきます",
          "model": "ギターをひいてみます。",
          "en": "I will try playing the guitar.",
          "look_for": [ { "any": "ひいてみます|弾[ひ]いてみます", "says": "ひく in て form" } ] }
      ] }
  ],

  "kanji": [
    { "k": "出[だ]す",   "yomi": "だす",         "en": "to take out" },
    { "k": "自転車",     "yomi": "じてんしゃ",   "en": "bicycle" },
    { "k": "日本文学",   "yomi": "にほんぶんがく", "en": "Japanese literature" },
    { "k": "東京",       "yomi": "とうきょう",   "en": "Tokyo" },
    { "k": "神",         "yomi": "かみ",         "en": "god" },
    { "k": "住所",       "yomi": "じゅうしょ",   "en": "address" },
    { "k": "九州",       "yomi": "きゅうしゅう", "en": "Kyushu" },
    { "k": "社会人",     "yomi": "しゃかいじん", "en": "working adult" },
    { "k": "着[つ]く",   "yomi": "つく",         "en": "to arrive" },
    { "k": "南極",       "yomi": "なんきょく",   "en": "Antarctica, the South Pole" }
  ],

  "listening_paper": {
    "when": "Sat separately in class",
    "sections": [
      { "id": "1A", "ja": "ききとり", "en": "Listening, answered in English",  "q": 8, "marks": 10 },
      { "id": "1B", "ja": "ききとり", "en": "Listening, answered in Japanese", "q": 6, "marks": 12 }
    ],
    "total": 22
  },

  "listening": [
    {
      "id": "kengaku", "section": "1A", "answer_in": "English", "marks": 7, "draft": true,
      "title": "あしたのしゃかいけんがく",
      "title_en": "Tomorrow's excursion",
      "setting": "Your teacher makes an announcement at the end of class.",
      "speakers": [ { "tag": "a", "who": "先生[せんせい]", "voice": "a" } ],
      "lines": [
        { "sp": "a", "ja": "みなさん、おはようございます。あしたのしゃかいけんがくについて、おしらせします。" },
        { "sp": "a", "ja": "あしたは、八時四十分[はちじよんじゅっぷん]までに学校[がっこう]に来[き]てください。" },
        { "sp": "a", "ja": "バスで博物館[はくぶつかん]に行[い]きます。電車[でんしゃ]ではありません。" },
        { "sp": "a", "ja": "お弁当[べんとう]を持[も]って来[こ]なければなりません。学校[がっこう]のしょくどうはしまっています。" },
        { "sp": "a", "ja": "それから、水[みず]とうも持[も]って来[き]てください。お金[かね]は持[も]って来[こ]なくてもいいです。" },
        { "sp": "a", "ja": "雨[あめ]がふりそうですから、かさをわすれないでください。" },
        { "sp": "a", "ja": "学校[がっこう]にもどるのは三時[さんじ]ごろです。" }
      ],
      "questions": [
        { "q": "What time must students arrive at school?", "marks": 1, "line": 1,
          "model": "By 8:40.",
          "look_for": [ { "any": "8:40|8.40|eight forty|twenty to nine|8 40", "says": "the time" } ] },
        { "q": "How are they travelling, and how are they NOT travelling?", "marks": 2, "line": 2,
          "model": "By bus, not by train.",
          "look_for": [ { "any": "bus", "says": "by bus" },
                        { "any": "train", "says": "that it is not the train" } ] },
        { "q": "Name the two things they must bring.", "marks": 2, "line": 3,
          "model": "Their lunch and a water bottle.",
          "look_for": [ { "any": "lunch|bento", "says": "lunch" },
                        { "any": "water", "says": "a water bottle" } ] },
        { "q": "What do they not have to bring, and what should they not forget?", "marks": 2, "line": 4,
          "model": "They do not have to bring money. They should not forget an umbrella, because it looks like rain.",
          "look_for": [ { "any": "money", "says": "money, which is not needed" },
                        { "any": "umbrella", "says": "the umbrella" } ] }
      ]
    },
    {
      "id": "shiai", "section": "1A", "answer_in": "English", "marks": 3, "draft": true,
      "title": "サッカーのしあい",
      "title_en": "The soccer match",
      "setting": "Two students talk before class on Monday.",
      "speakers": [ { "tag": "a", "who": "ゆうき", "voice": "a" },
                    { "tag": "b", "who": "ベン", "voice": "b" } ],
      "lines": [
        { "sp": "a", "ja": "ねえ、きのうのサッカーのしあい、見[み]た？" },
        { "sp": "b", "ja": "ううん、見[み]なかった。アルバイトがあったから。" },
        { "sp": "a", "ja": "ざんねん。キューハイスクールが三[さん]たい一[いち]でかったよ。" },
        { "sp": "b", "ja": "すごいね。つぎのしあいはいつ？" },
        { "sp": "a", "ja": "来週[らいしゅう]の土曜日[どようび]。十時[じゅうじ]に学校[がっこう]にあつまって、バスで行[い]く。" },
        { "sp": "b", "ja": "行[い]ってみたいけど、土曜日[どようび]はかぞくと海[うみ]に行[い]くから、むりだなあ。" },
        { "sp": "a", "ja": "そっか。じゃあ、しゃしんをおくるよ。" }
      ],
      "questions": [
        { "q": "Why did Ben not watch the match?", "marks": 1, "line": 1,
          "model": "He had his part-time job.",
          "look_for": [ { "any": "job|work|arubaito|part", "says": "his part-time job" } ] },
        { "q": "What was the score, and who won?", "marks": 1, "line": 2,
          "model": "Kew High School won three one.",
          "look_for": [ { "any": "3|three", "says": "the score" },
                        { "any": "kew", "says": "who won" } ] },
        { "q": "Why can Ben not go to the next match?", "marks": 1, "line": 5,
          "model": "He is going to the beach with his family on Saturday.",
          "look_for": [ { "any": "family", "says": "his family" },
                        { "any": "beach|sea", "says": "the beach" } ] }
      ]
    },
    {
      "id": "bangohan", "section": "1B", "answer_in": "Japanese", "marks": 6, "draft": true,
      "title": "ばんごはんのじかん",
      "title_en": "Dinner time",
      "setting": "An exchange student and their host mother, in the kitchen.",
      "speakers": [ { "tag": "a", "who": "お母[かあ]さん", "voice": "a" },
                    { "tag": "b", "who": "アレックス", "voice": "b" } ],
      "lines": [
        { "sp": "a", "ja": "アレックスさん、ばんごはんは何時[なんじ]がいいですか。" },
        { "sp": "b", "ja": "六時[ろくじ]はどうですか。七時[しちじ]からオンラインでかぞくと話[はな]さなければなりませんから。" },
        { "sp": "a", "ja": "いいですよ。今日[きょう]はカレーを作[つく]ります。にがてな食[た]べ物[もの]はありますか。" },
        { "sp": "b", "ja": "さかなはちょっと…。でも、ほかは何[なん]でも食[た]べられます。" },
        { "sp": "a", "ja": "わかりました。じゃあ、さかなは入[い]れません。食[た]べた後[あと]、おさらをあらってくれますか。" },
        { "sp": "b", "ja": "はい、もちろんです。" }
      ],
      "questions": [
        { "q": "アレックスさんは何時[なんじ]にばんごはんを食[た]べたいですか。どうしてですか。", "marks": 2, "line": 1,
          "ask_en": "What time does Alex want dinner, and why?",
          "model": "六時[ろくじ]に食[た]べたいです。七時[しちじ]からかぞくと話[はな]さなければならないからです。",
          "look_for": [ { "any": "六時[ろくじ]|6時", "says": "six o'clock" },
                        { "any": "かぞく|家族[かぞく]", "says": "his family" },
                        { "any": "から|ので", "says": "a reason, which the question asks for" } ] },
        { "q": "今日[きょう]のばんごはんは何[なん]ですか。アレックスさんがにがてな食[た]べ物[もの]は何[なん]ですか。", "marks": 2, "line": 2,
          "ask_en": "What is for dinner, and what food does Alex not like?",
          "model": "カレーです。さかながにがてです。",
          "look_for": [ { "any": "カレー", "says": "curry" },
                        { "any": "さかな|魚[さかな]", "says": "fish" } ] },
        { "q": "食[た]べた後[あと]、アレックスさんは何[なに]をしますか。", "marks": 2, "line": 4,
          "ask_en": "What will Alex do after eating?",
          "model": "おさらをあらいます。",
          "look_for": [ { "any": "さら|おさら|皿[さら]", "says": "the dishes" },
                        { "any": "あらい|あらう|洗[あら]", "says": "washing them" } ] }
      ]
    },
    {
      "id": "jikoshoukai", "section": "1B", "answer_in": "Japanese", "marks": 6, "draft": true,
      "title": "あいさんのじこしょうかい",
      "title_en": "Ai introduces herself",
      "setting": "A visiting student from Tokyo speaks to your class.",
      "speakers": [ { "tag": "a", "who": "まつもと あい", "voice": "a" } ],
      "lines": [
        { "sp": "a", "ja": "はじめまして。わたしはまつもとあいです。東京[とうきょう]の高校[こうこう]二年生[にねんせい]です。" },
        { "sp": "a", "ja": "日本[にほん]では、水曜日[すいようび]と金曜日[きんようび]にテニスぶのれんしゅうがあります。" },
        { "sp": "a", "ja": "オーストラリアに来[く]るのははじめてです。" },
        { "sp": "a", "ja": "日本[にほん]の学校[がっこう]ではせいふくを着[き]なければなりませんが、キューハイスクールでは着[き]なくてもいいですね。びっくりしました。" },
        { "sp": "a", "ja": "来月[らいげつ]、日本[にほん]に帰[かえ]りますが、その前[まえ]にメルボルンのびじゅつかんに行[い]ってみたいです。" }
      ],
      "questions": [
        { "q": "あいさんはいつテニスのれんしゅうをしますか。", "marks": 2, "line": 1,
          "ask_en": "When does Ai practise tennis?",
          "model": "水曜日[すいようび]と金曜日[きんようび]にれんしゅうします。",
          "look_for": [ { "any": "水曜日[すいようび]", "says": "Wednesday" },
                        { "any": "金曜日[きんようび]", "says": "Friday" } ] },
        { "q": "あいさんは何[なに]にびっくりしましたか。", "marks": 2, "line": 3,
          "ask_en": "What surprised Ai?",
          "model": "キューハイスクールではせいふくを着[き]なくてもいいことにびっくりしました。",
          "look_for": [ { "any": "せいふく|制服[せいふく]", "says": "the uniform" },
                        { "any": "着[き]なくてもいい|きなくてもいい", "says": "that you do not have to wear it" } ] },
        { "q": "日本[にほん]に帰[かえ]る前[まえ]に、何[なに]をしてみたいですか。", "marks": 2, "line": 4,
          "ask_en": "What does she want to try before going home?",
          "model": "メルボルンのびじゅつかんに行[い]ってみたいです。",
          "look_for": [ { "any": "びじゅつかん|美術館[びじゅつかん]", "says": "the art gallery" },
                        { "any": "行[い]ってみたい|いってみたい", "says": "that she wants to try going" } ] }
      ]
    }
  ],

  "essay": {
    "marks": 20,
    "chars": [ 300, 400 ],
    "about": "One of three, on genkouyoushi. The rubric marks content, organisation, language and script, five bands each.",
    "options": [
      { "id": "famous", "kind": "speech",
        "ja": "〔有名[ゆうめい]な人[ひと]〕は、どんな人[ひと]ですか。せつめいしてください。",
        "en": "Write a speech for your Japanese class about a famous person." },
      { "id": "khs", "kind": "speech",
        "ja": "キュー・ハイ・スクールは、どんな学校[がっこう]ですか。",
        "en": "Write a speech for your sister school's class: what is Kew High School like?" },
      { "id": "letter", "kind": "letter",
        "ja": "日本[にほん]のしまい校[こう]でのこうかん留学[りゅうがく]のけいけんについて、日本語[にほんご]の先生[せんせい]に手紙[てがみ]を書[か]いてください。",
        "en": "Write a letter to your Japanese teacher about your exchange at the sister school. Subjects you enjoy and why, club activities, school lunches, uniform, friends, school customs." }
    ],
    "shapes": [
      { "kind": "speech", "ja": "スピーチ", "en": "Speech",
        "steps": [
          "Title on the top line, three squares in: 「〇〇さんについて」",
          "Your name on the second line, one square from the right",
          "Open with みなさん、こんにちは。",
          "Say what the speech is about: 今日[きょう]は、〇〇について話[はな]したいと思[おも]います。",
          "One idea per paragraph in the body",
          "Sum up: 〇〇は、とてもすばらしい人[ひと]だと思[おも]います。",
          "Close with これでおわります。ありがとうございました。"
        ] },
      { "kind": "letter", "ja": "手紙[てがみ]", "en": "Letter",
        "steps": [
          "Open with 〜先生[せんせい]へ",
          "Greet: こんにちは。 or お元気[げんき]ですか。",
          "One idea per paragraph in the body",
          "Close politely: それでは、また。 or これからもよろしくおねがいします。",
          "Sign off: 〇〇より"
        ] }
    ],
    "check": [
      { "id": "chars", "say": "300 to 400 characters" },
      { "id": "shape", "say": "The opening and closing the shape asks for" },
      { "id": "para",  "say": "Three paragraphs or more, one idea each" },
      { "id": "joins", "say": "Three different joining words: そして, それから, しかし, でも, たとえば" },
      { "id": "tense", "say": "Past and present, not all one tense" },
      { "id": "why",   "say": "At least one reason with から or ので" },
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
      "body": "63 marks in 90 minutes. The essay is 20 of them and the kanji 10. Ten minutes of reading time comes first, and you may not write in it." },
    { "head": "A plan for the 90 minutes",
      "body": "Reading 20 minutes. Grammar 25. Kanji 8. Essay 32, which is 5 to plan and 25 to write and 2 to read it back. That leaves 5 spare, and you will want them." },
    { "head": "What to do in the reading time",
      "body": "Read the essay topics first and pick one. Your head will work on it while you do Part A, and you will not lose five minutes choosing later." },
    { "head": "The dictionary",
      "body": "Any bilingual dictionary, one or two volumes. Look up nouns, not grammar: a dictionary will not tell you whether to use は or が, and every minute in it is a minute not writing. Two or three lookups in the whole paper is about right." },
    { "head": "Part A is answered in Japanese",
      "body": "An answer in English scores nothing, however right it is. Answer in a full sentence and end it with です or ます." },
    { "head": "Give what the marks ask for",
      "body": "A question worth 3 wants three pieces of information. Count them before you move on." },
    { "head": "The last question of Part A",
      "body": "It tells you to use から or ので. Questions that name a form are marking that form: use it even if your sentence works without it." }
  ]
};
