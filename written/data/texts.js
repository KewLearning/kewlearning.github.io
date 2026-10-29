/* ============================================================================
   texts.js — the listening and reading texts.
   ----------------------------------------------------------------------------
   EVERY TEXT IN THIS FILE IS WRITTEN FOR THIS APP. Not one line comes from a
   VCAA paper. They are in the style of the examination, they use the
   prescribed kanji and nothing else, and the questions on them are written
   here too. That is what lets this app sit on a public URL.

   For the real papers and the real audio, the app links a student to VCAA's
   own page, which is where those things belong.

   Three listening texts, two speakers each, recorded in two different voices
   so a student can hear who is talking. Two reading texts. Each question
   carries the mark value, the answer, the line the answer sits in, and one
   line of strategy, because the strategy is the part a student cannot get
   from a worked answer.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.HIKKI_TEXTS = {
  "schema_version": 1,
  "listening": [
    {
      "id": "l-shumatsu",
      "section": "s1a",
      "answer_in": "English",
      "title": "A weekend plan",
      "setting": "Sakura rings Alex, the exchange student staying with her family, on Friday night.",
      "note": "This text is shorter than the paper's. Everything else matches: two speakers, one conversation, questions in English.",
      "speakers": [
        {
          "tag": "a",
          "who": "さくら",
          "voice": "a"
        },
        {
          "tag": "b",
          "who": "アレックス",
          "voice": "b"
        }
      ],
      "lines": [
        {
          "sp": "a",
          "ja": "もしもし、アレックス？　あしたの　よていは　もう　きまった？"
        },
        {
          "sp": "b",
          "ja": "ううん、まだ。　さくらは　何[なに]か　したいことが　ある？"
        },
        {
          "sp": "a",
          "ja": "うん。　朝[あさ]　早[はや]く　電車[でんしゃ]に　乗[の]って、京都[きょうと]の　お寺[てら]に　行[い]かない？"
        },
        {
          "sp": "b",
          "ja": "いいね。　でも　土曜日[どようび]の　朝は　アルバイトが　あるんだ。　十二時[じゅうにじ]に　終[お]わる。"
        },
        {
          "sp": "a",
          "ja": "じゃあ、お昼[ひる]に　駅[えき]で　会[あ]おうか。　一時[いちじ]の　電車なら　二時[にじ]はんに　着[つ]くよ。"
        },
        {
          "sp": "b",
          "ja": "うん、それで　いい。　あ、でも　天気[てんき]は　どう？"
        },
        {
          "sp": "a",
          "ja": "天気よほうでは、午後[ごご]から　雨[あめ]が　ふるって。　かさを　持[も]って　来[き]てね。"
        },
        {
          "sp": "b",
          "ja": "わかった。　お寺の　近[ちか]くに　安[やす]い　お店[みせ]が　あるって　聞[き]いたから、そこで　晩[ばん]ごはんを　食[た]べない？"
        },
        {
          "sp": "a",
          "ja": "いいよ。　じゃあ、一時に　駅の　前[まえ]でね。"
        }
      ],
      "questions": [
        {
          "id": "q1",
          "lang": "en",
          "q": "Why can Alex not go in the morning?",
          "marks": 1,
          "answer": "He has a part-time job on Saturday morning and it finishes at twelve.",
          "tip": "The reason comes before the time. Do not stop listening at でも。",
          "line": 3
        },
        {
          "id": "q2",
          "lang": "en",
          "q": "What time do they meet, and where?",
          "marks": 2,
          "answer": "One o'clock, in front of the station.",
          "tip": "Two marks, two things. The place only arrives in the last line, so hold the time in your head.",
          "line": 8
        },
        {
          "id": "q3",
          "lang": "en",
          "q": "What time will they reach Kyoto?",
          "marks": 1,
          "answer": "Half past two.",
          "tip": "Three times go past in that one line. The one the question wants is the one attached to 着く。",
          "line": 4
        },
        {
          "id": "q4",
          "lang": "en",
          "q": "What does Sakura tell Alex to bring, and why?",
          "marks": 2,
          "answer": "An umbrella, because the forecast says rain from the afternoon.",
          "tip": "A 〜から in the line before an instruction is usually the why.",
          "line": 6
        },
        {
          "id": "q5",
          "lang": "en",
          "q": "What does Alex suggest doing after the temple, and how does he know about the place?",
          "marks": 2,
          "answer": "Having dinner at a cheap shop near the temple. He heard about it from someone.",
          "tip": "〜って聞いた tells you where the information came from, and that is the second mark.",
          "line": 7
        }
      ]
    },
    {
      "id": "l-club",
      "section": "s1b",
      "answer_in": "Japanese",
      "title": "The volunteer club",
      "setting": "Kenta talks Emma into joining the school's volunteer club.",
      "note": "Answer Part B in Japanese. The assessors mark content and language together, so a right answer in broken Japanese still drops marks.",
      "speakers": [
        {
          "tag": "a",
          "who": "けんた",
          "voice": "a"
        },
        {
          "tag": "b",
          "who": "エマ",
          "voice": "b"
        }
      ],
      "lines": [
        {
          "sp": "a",
          "ja": "エマさん、来週[らいしゅう]から　ボランティアクラブが　始[はじ]まるよ。　入[はい]らない？"
        },
        {
          "sp": "b",
          "ja": "おもしろそう。　どんなことを　するの？"
        },
        {
          "sp": "a",
          "ja": "月曜日[げつようび]の　学校[がっこう]の　あとで、町[まち]の　海[うみ]の　近[ちか]くを　そうじするんだ。"
        },
        {
          "sp": "b",
          "ja": "そうじだけ？"
        },
        {
          "sp": "a",
          "ja": "ううん。　月[つき]に　一回[いっかい]、子[こ]どもに　日本語[にほんご]を　教[おし]える　日[ひ]も　ある。"
        },
        {
          "sp": "b",
          "ja": "私[わたし]は　日本語が　まだ　上手[じょうず]じゃないけど。"
        },
        {
          "sp": "a",
          "ja": "だいじょうぶ。　エマさんは　英語[えいご]が　話[はな]せるから、子どもたちは　きっと　よろこぶよ。"
        },
        {
          "sp": "b",
          "ja": "じゃあ、やってみる。　何[なに]を　持[も]って　行[い]けば　いい？"
        },
        {
          "sp": "a",
          "ja": "ぼうしと　みず。　夏[なつ]は　とても　あついから。"
        },
        {
          "sp": "b",
          "ja": "わかった。　来週の　月曜日に　会[あ]おう。"
        }
      ],
      "questions": [
        {
          "id": "q1",
          "lang": "ja",
          "q": "ボランティアクラブは　いつ　ありますか。",
          "marks": 1,
          "answer": "月曜日[げつようび]の　学校[がっこう]の　あとです。",
          "tip": "Answer the question that was asked. いつ wants a time, not the whole sentence you heard.",
          "line": 2
        },
        {
          "id": "q2",
          "lang": "ja",
          "q": "クラブで　何[なに]を　しますか。二[ふた]つ　書[か]きなさい。",
          "marks": 2,
          "answer": "海[うみ]の　近[ちか]くを　そうじします。月[つき]に　一回[いっかい]、子[こ]どもに　日本語[にほんご]を　教[おし]えます。",
          "tip": "二つ means the assessors are looking for two separate things. One good answer gets one mark.",
          "line": 4
        },
        {
          "id": "q3",
          "lang": "ja",
          "q": "エマさんは　どうして　しんぱいして　いましたか。",
          "marks": 2,
          "answer": "日本語[にほんご]が　まだ　上手[じょうず]じゃないからです。",
          "tip": "A どうして question wants 〜からです at the end. Leaving it off is the commonest way to lose the second mark.",
          "line": 5
        },
        {
          "id": "q4",
          "lang": "ja",
          "q": "けんたさんは　どうして　だいじょうぶだと　言[い]いましたか。",
          "marks": 2,
          "answer": "エマさんは　英語[えいご]が　話[はな]せるので、子[こ]どもたちが　よろこぶからです。",
          "tip": "Reuse the speaker's own words where they fit. You are not marked on inventing new vocabulary here.",
          "line": 6
        },
        {
          "id": "q5",
          "lang": "ja",
          "q": "エマさんは　何[なに]を　持[も]って　行[い]きますか。",
          "marks": 1,
          "answer": "ぼうしと　みずを　持[も]って　行[い]きます。",
          "tip": "Two items, joined with と. A list with no と reads as one thing.",
          "line": 8
        }
      ]
    },
    {
      "id": "l-plastic",
      "section": "s2a",
      "answer_in": "English",
      "title": "The shop with no plastic",
      "setting": "A reporter interviews the owner of a shop that sells nothing in plastic.",
      "note": "Section 2 Part A pairs a reading text and a listening text on one topic, and some questions want both. This is the listening half.",
      "speakers": [
        {
          "tag": "b",
          "who": "リポーター",
          "voice": "b"
        },
        {
          "tag": "a",
          "who": "店長[てんちょう]",
          "voice": "a"
        }
      ],
      "lines": [
        {
          "sp": "b",
          "ja": "この　お店[みせ]は　プラスチックを　まったく　使[つか]わないと　聞[き]きました。"
        },
        {
          "sp": "a",
          "ja": "はい。　三年[さんねん]前[まえ]に　始[はじ]めました。　さいしょは　おきゃくさんが　少[すく]なかったです。"
        },
        {
          "sp": "b",
          "ja": "どうしてですか。"
        },
        {
          "sp": "a",
          "ja": "みなさん　入[い]れ物[もの]を　持[も]って　来[こ]ないと　いけませんから。　めんどうだと　言[い]われました。"
        },
        {
          "sp": "b",
          "ja": "今[いま]は　どうですか。"
        },
        {
          "sp": "a",
          "ja": "今は　毎日[まいにち]　百人[ひゃくにん]ぐらい　来[き]ます。　新[あたら]しい　おきゃくさんの　半分[はんぶん]は　高校生[こうこうせい]です。"
        },
        {
          "sp": "b",
          "ja": "高校生が　多[おお]いんですね。"
        },
        {
          "sp": "a",
          "ja": "ええ。　学校[がっこう]で　海[うみ]の　ことを　習[なら]って、自分[じぶん]たちで　何[なに]か　したいと　思[おも]う　人[ひと]が　多いんです。"
        },
        {
          "sp": "b",
          "ja": "これから　どう　したいですか。"
        },
        {
          "sp": "a",
          "ja": "となりの　町[まち]にも　同[おな]じ　店を　作[つく]りたいです。　でも、まだ　お金[かね]が　じゅうぶんでは　ありません。"
        }
      ],
      "questions": [
        {
          "id": "q1",
          "lang": "en",
          "q": "When did the shop start, and how did it go at first?",
          "marks": 2,
          "answer": "Three years ago, and at first it had few customers.",
          "tip": "さいしょは marks the before half of a before-and-after answer. There is almost always an after.",
          "line": 1
        },
        {
          "id": "q2",
          "lang": "en",
          "q": "What did customers complain about?",
          "marks": 2,
          "answer": "They had to bring their own containers, which they said was a nuisance.",
          "tip": "めんどう is the word doing the work. If you miss it, the 〜ないといけません still gives you the first mark.",
          "line": 3
        },
        {
          "id": "q3",
          "lang": "en",
          "q": "How many people come now, and who are half of the new customers?",
          "marks": 2,
          "answer": "About a hundred a day. Half of the new customers are high-school students.",
          "tip": "Note which half. The line says half of the NEW customers, not half of everyone.",
          "line": 5
        },
        {
          "id": "q4",
          "lang": "en",
          "q": "Why does the owner think so many high-school students come?",
          "marks": 2,
          "answer": "They learn about the ocean at school and want to do something themselves.",
          "tip": "Two clauses joined by 〜て. Both of them are the answer.",
          "line": 7
        },
        {
          "id": "q5",
          "lang": "en",
          "q": "What does the owner want to do next, and what is holding her back?",
          "marks": 2,
          "answer": "Open the same shop in the next town, but she does not have enough money yet.",
          "tip": "A でも in the last line of an interview is nearly always worth a mark.",
          "line": 9
        }
      ]
    }
  ],
  "reading": [
    {
      "id": "r-jitensha",
      "section": "s2a",
      "answer_in": "English",
      "kind": "ブログ",
      "title": "A month of riding to school",
      "note": "Section 2 Part A uses blog posts most often. Read the questions first: 15 minutes of reading time is enough for that.",
      "body": [
        "私[わたし]の　高校[こうこう]では、五月[ごがつ]の　一[いっ]か月[げつ]、じてんしゃで　学校[がっこう]に　来[く]る　人[ひと]を　かぞえました。",
        "四月[しがつ]は　毎日[まいにち]　五十人[ごじゅうにん]ぐらいでしたが、五月の　さいごの　週[しゅう]には　二百人[にひゃくにん]に　なりました。　学校の　人の　四分[よんぶん]の　一[いち]です。",
        "いちばん　多[おお]かった　日[ひ]は　水曜日[すいようび]でした。　その　日は　先生[せんせい]たちも　じてんしゃで　来ました。",
        "こまった　ことも　ありました。　じてんしゃを　おく　場所[ばしょ]が　せまくて、入[はい]らない　人が　いたので、六月[ろくがつ]に　新[あたら]しい　場所を　作[つく]りました。",
        "来年[らいねん]は　二[ふた]か月[げつ]　やりたいと　思[おも]って　います。"
      ],
      "questions": [
        {
          "id": "q1",
          "lang": "en",
          "q": "What did the school count, and for how long?",
          "marks": 2,
          "answer": "The number of people riding a bike to school, for one month in May.",
          "tip": "The first sentence of a blog post usually holds the what and the how long. Take both out of it before you read on.",
          "line": 0
        },
        {
          "id": "q2",
          "lang": "en",
          "q": "How did the numbers change from April to the end of May?",
          "marks": 2,
          "answer": "From about fifty a day to two hundred.",
          "tip": "Two numbers in one sentence, joined by 〜が. The が means they contrast, so the answer is the change.",
          "line": 1
        },
        {
          "id": "q3",
          "lang": "en",
          "q": "What share of the school was riding by then?",
          "marks": 1,
          "answer": "A quarter.",
          "tip": "四分の一 is a quarter. Learn the four or five fractions that come up and they are free marks.",
          "line": 1
        },
        {
          "id": "q4",
          "lang": "en",
          "q": "Why was Wednesday the biggest day?",
          "marks": 1,
          "answer": "The teachers rode in that day too.",
          "tip": "The reason sits in the sentence after the claim, with no そして or から to announce it.",
          "line": 2
        },
        {
          "id": "q5",
          "lang": "en",
          "q": "What problem came up, and what did the school do about it?",
          "marks": 2,
          "answer": "There was not enough room to park the bikes, so in June the school built a new space.",
          "tip": "こまったこと is the signal that a problem is coming. The fix is nearly always in the same paragraph.",
          "line": 3
        },
        {
          "id": "q6",
          "lang": "en",
          "q": "What does the writer want next year?",
          "marks": 1,
          "answer": "To run it for two months.",
          "tip": "〜たいと思っています is a want, not a plan. Write want.",
          "line": 4
        }
      ]
    },
    {
      "id": "r-camp",
      "section": "s2b",
      "answer_in": "Japanese",
      "kind": "おしらせ",
      "title": "The Japanese camp notice",
      "note": "Read a notice closely. Section 2 Part B gives you a text like this and asks you to write back, so every detail may be one you need.",
      "body": [
        "三年生[さんねんせい]の　みなさんへ",
        "八月[はちがつ]　十日[とおか]から　十二日[じゅうににち]まで、山[やま]の　中[なか]の　ロッジで　日本語[にほんご]キャンプを　します。",
        "バスは　八月　十日の　朝[あさ]　八時[はちじ]に　学校[がっこう]を　出[で]ます。　おくれた　人[ひと]は　自分[じぶん]で　来[き]て　ください。",
        "キャンプでは、日本語だけ　話[はな]します。　英語[えいご]を　使[つか]った　人は、晩[ばん]ごはんの　あとで　おさらを　洗[あら]います。",
        "持[も]って　来る　物[もの]：ねぶくろ、タオル、あたたかい　上着[うわぎ]、ノート。",
        "お金[かね]は　八十五[はちじゅうご]ドルです。　七月[しちがつ]　三十日[さんじゅうにち]までに　先生[せんせい]に　わたして　ください。"
      ],
      "questions": [
        {
          "id": "q1",
          "lang": "ja",
          "q": "キャンプは　何日間[なんにちかん]　ありますか。",
          "marks": 1,
          "answer": "三日間[みっかかん]　あります。",
          "tip": "The notice gives you two dates and not the number of days. Count them, and count the last day in.",
          "line": 1
        },
        {
          "id": "q2",
          "lang": "ja",
          "q": "バスに　おくれた　人[ひと]は　どう　しますか。",
          "marks": 1,
          "answer": "自分[じぶん]で　キャンプに　行[い]きます。",
          "tip": "Change 来てください into a statement. Copying the instruction straight out of the notice does not answer the question.",
          "line": 2
        },
        {
          "id": "q3",
          "lang": "ja",
          "q": "英語[えいご]を　話[はな]した　人[ひと]は　何[なに]を　しますか。",
          "marks": 2,
          "answer": "晩[ばん]ごはんの　あとで　おさらを　洗[あら]います。",
          "tip": "The notice says 使った and the question says 話した. Same rule, different word, and the assessors do that on purpose.",
          "line": 3
        },
        {
          "id": "q4",
          "lang": "ja",
          "q": "持[も]って　来[く]る　物[もの]を　三[みっ]つ　書[か]きなさい。",
          "marks": 2,
          "answer": "ねぶくろと　タオルと　ノートを　持[も]って　来[き]ます。",
          "tip": "Three items, joined with と. Write them as a sentence, not as a list down the page.",
          "line": 4
        },
        {
          "id": "q5",
          "lang": "ja",
          "q": "いつまでに　お金[かね]を　はらいますか。",
          "marks": 1,
          "answer": "七月[しちがつ]　三十日[さんじゅうにち]までに　はらいます。",
          "tip": "までに, not まで. The question gives you the form the answer wants.",
          "line": 5
        }
      ]
    }
  ]
};
