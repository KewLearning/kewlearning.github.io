/* data/kiji.js — Year 9 Unit 12, historical figures.

   SIX ARTICLES, EXACTLY AS ANDREW WROTE THEM. Every Japanese sentence in
   this file was lifted out of his Word documents, not written here. The
   furigana came across from the EQ ruby fields Word had left in them and
   is in the same base[reading] notation the other apps use. If a
   sentence here differs from the worksheet, this file is wrong and the
   worksheet is right.

   Source documents, on main:
     Unit 11 and 12 Historical Figures CAT 2023 MODIFIED.docx
       — Iwasaki Yatarō, Sakamoto Ryōma, Miyamoto Musashi
     Unit 11 and 12 Historical Figures Asako Hirooka ... Vocab list.docx
     Unit 12 Saigo Takamori ONLY 2025.docx
     Unit 11 and 12 Reading historical figures LED light inventors CLEAN.docx

   THE WORD LISTS UNDER readings. kanji is Andrew's own thirty topic
   kanji for Unit 12, from his 2026 sheet, verbatim; it is both the
   kanji rung's content and the first place the article glosser looks.
   particles, names, counters and extras exist because tapping a word
   in an article used to answer with the meaning of whatever word
   happened to START the thing you tapped. Everything tappable is now
   looked up exactly or not at all, and these lists are what "exactly"
   has to cover: the particles, the names and places, the counters, and
   the ordinary words that are not unit vocabulary but are in the
   articles anyway. patterns names one of the grammar entries from the
   END of a word, so that 話[はな]したり answers with Andrew's own 〜たり
   rule rather than with nothing; the first hit wins, which is why
   なりたい is tested before the general たい.

   THE FRAME IS THE POINT. Five of the six are first-person
   じこしょうかい built on one frame: name, 生まれました, 才, what they are,
   住んでいました / 住んでいます, 毎日 routine, 〜た後で, 〜たり〜たり,
   〜が好きです, a past event, しょうらい〜たいです, よろしく. Once a student
   owns the frame every new person is new facts in known slots, and the
   paper test's question types are the same every time too. The LED
   article is the odd one out, third person and expository, which is why
   it comes last.

   《 》 MARKS A SPAN THE WORKSHEET UNDERLINED for translation. The
   underlines were recovered from the run properties in the .docx rather
   than guessed, so the translate step asks for the same sentences the
   paper does.

   ANSWERS. Each question carries a model answer and the key content the
   marker looks for, never a single accepted string: a short Japanese
   answer has too many right forms for an exact match to be fair. Where
   a question cannot be answered from the article at all — question 8 on
   Iwasaki asks what Mitsubishi makes today — it says so rather than
   marking a student wrong for not finding it.


   KANJI THE WORKSHEETS LEAVE BARE. A worksheet rubies a kanji the first
   time it appears and leaves it bare after that, which is right on
   paper. Two of them are never rubied at all: the Iwasaki article writes
   1835年 and never gives 年 a reading, though the Sakamoto article does,
   and question 7 drops the reading on 何 that question 6 has. Those are
   gaps in the documents, not in the transcription, and they are left
   alone here — the app supplies the reading instead, from the table
   below, so a student who needs ruby gets it on every line.

   何 is the one that needs a rule rather than a lookup: 何ですか is
   なん, 何を is なに. The app reads what follows it.

   NOTHING HERE IS ASSESSED. The app records nothing and sends nothing.
*/


window.KIJI = {
  "schema_version": 1,
  "people": [
    {
      "id": "iwasaki",
      "name_ja": "いわさき　やたろう",
      "name_en": "Iwasaki Yatarō",
      "what_en": "Samurai who founded Mitsubishi",
      "born": 1835,
      "age": 48,
      "source": "CAT 2023 MODIFIED",
      "paras": [
        "みなさん、おはようございます。私[わたし]の　名前[なまえ]は、いわさき　やたろうです。48才[さい]です。1835年に　生[う]まれました。とさに　住[す]んでいました。しかし、今[いま]は　ながさきに　住んでいます。さかもと　りょうまの　友[とも]だちでした。私[わたし]は　さむらいでした。しかし、《みつびしの　しゃちょうに　なりました。毎日[まいにち]　とても　いそがしいです。5時半[じはん]に　おきます。あさごはんを　食[た]べた後[あと]、しごとに　行きます。しごとで、人[ひと]と　話[はな]したり、けいやくを　作[つく]ったり　します。ものを　売[う]ることが　好[す]きです。しょうらい、外国[がいこく]に　行[い]きたいです。》",
        "よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "いわさきやたろうは、いつ生[う]まれましたか。",
          "lang": "ja",
          "model": "1835年に　生[う]まれました。",
          "key": [
            "1835"
          ]
        },
        {
          "q": "しごとは、何[なん]ですか。",
          "lang": "ja",
          "model": "みつびしの　しゃちょうです。",
          "key": [
            "しゃちょう"
          ]
        },
        {
          "q": "どこに　住[す]んでいますか。",
          "lang": "ja",
          "model": "ながさきに　住[す]んでいます。",
          "key": [
            "ながさき"
          ]
        },
        {
          "q": "だれの　ともだちでしたか。",
          "lang": "ja",
          "model": "さかもと　りょうまの　友[とも]だちでした。",
          "key": [
            "さかもと",
            "りょうま"
          ]
        },
        {
          "q": "あさごはんの後[あと]で、どこに　行[い]きますか。",
          "lang": "ja",
          "model": "しごとに　行[い]きます。",
          "key": [
            "しごと"
          ]
        },
        {
          "q": "しごとで　何[なに]を　しますか。",
          "lang": "ja",
          "model": "人[ひと]と　話[はな]したり、けいやくを　作[つく]ったり　します。",
          "key": [
            "話",
            "はな"
          ],
          "key2": [
            "けいやく"
          ]
        },
        {
          "q": "しょうらい、何を　したいですか。",
          "lang": "ja",
          "model": "外国[がいこく]に　行[い]きたいです。",
          "key": [
            "外国",
            "がいこく"
          ]
        },
        {
          "q": "今[いま]の　みつびしは　何を　作[つく]りますか。",
          "lang": "en",
          "model": "Cars, ships, aircraft, electronics and heavy machinery.",
          "note": "Not in the article: this one is general knowledge, and the app says so."
        }
      ],
      "art": {
        "file": "iwasaki.webp",
        "alt": "Iwasaki Yatarō on the wharf at Nagasaki in a black frock coat over a kimono, a ledger under his arm, a steamship behind him with the red three-diamond Mitsubishi mark on its funnel.",
        "ready": true,
        "thumb": "iwasaki-t.webp"
      },
      "first_person": true
    },
    {
      "id": "sakamoto",
      "name_ja": "さかもと　りょうま",
      "name_en": "Sakamoto Ryōma",
      "what_en": "Samurai, swordsman, reformer",
      "born": 1836,
      "age": 25,
      "source": "CAT 2023 MODIFIED",
      "paras": [
        "みなさん、おはようございます。私[わたし]の　名前[なまえ]は　さかもと　りょうまです。私は、1836年[ねん]に　生[う]まれました。25才[さい]です。さむらいです。",
        "とさに　住[す]んでいます。毎日[まいにち]、6時[じ]に　おきます。あさごはんを　食[た]べた後[あと]、父[ちち]と　話[はな]したり、さんぽに　行[い]ったりします。その後[あと]、けんどうを　練習[れんしゅう]したり、本[ほん]を　読[よ]んだり　します。しょうらい、けんどうの　先生[せんせい]に　なりたいです。えどに　ゆうめいな　けんどうの　学校[がっこう]が　あります。しかし、えどに　行[い]ったことが　ありません。とても　行きたいです。上手[じょうず]に　なりたいです。よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "Who is the article about?",
          "lang": "en",
          "model": "Sakamoto Ryōma.",
          "key": [
            "sakamoto",
            "ryoma",
            "ryōma"
          ]
        },
        {
          "q": "Where does he live?",
          "lang": "en",
          "model": "Tosa.",
          "key": [
            "tosa"
          ]
        },
        {
          "q": "What four things does he do after breakfast?",
          "lang": "en",
          "model": "Talks with his father, goes for a walk, practises kendo, reads books.",
          "key": [
            "father",
            "walk",
            "kendo",
            "read"
          ]
        },
        {
          "q": "In the future, what does he want to become?",
          "lang": "en",
          "model": "A kendo teacher.",
          "key": [
            "kendo"
          ],
          "key2": [
            "teacher"
          ]
        },
        {
          "q": "What is in Edo? What is Edo called now?",
          "lang": "en",
          "model": "A famous kendo school. Edo is now called Tokyo.",
          "key": [
            "school"
          ],
          "key2": [
            "tokyo"
          ]
        },
        {
          "q": "Has he been to Edo?",
          "lang": "en",
          "model": "No, he has never been to Edo.",
          "key": [
            "no",
            "not",
            "never",
            "hasn't",
            "has not"
          ]
        },
        {
          "q": "In the second last sentence, he says he wants to become something. What is it?",
          "lang": "en",
          "model": "He wants to become good at kendo (skilful).",
          "key": [
            "good",
            "skil",
            "better"
          ]
        }
      ],
      "art": {
        "file": "sakamoto.webp",
        "alt": "Sakamoto Ryōma on the deck of a ship, in a dark kimono and grey hakama with a sword through his sash, his hair loose, looking away to one side.",
        "ready": true,
        "thumb": "sakamoto-t.webp"
      },
      "first_person": true
    },
    {
      "id": "musashi",
      "name_ja": "みやもと　むさし",
      "name_en": "Miyamoto Musashi",
      "what_en": "Swordsman and writer",
      "born": 1584,
      "age": 21,
      "source": "CAT 2023 MODIFIED",
      "paras": [
        "みなさん、おはようございます。私[わたし]の　名前[なまえ]は　みやもと　むさしです。1584年[ねん]に　生[う]まれました。21才[さい]です。さむらいです。こどもの　時[とき]　みやもとに　住[す]んでいました。しかし、今[いま]は、京都[きょうと]に　住[す]んでいます。毎日[まいにち]、6時[じ]に　おきます。あさごはんを　食[た]べた後[あと]、けんどうを　れんしゅう　します。その後[あと]、人[ひと]と　話[はな]したり、本[ほん]を　読[よ]んだり　します。時々[ときどき]、手紙[てがみ]を　書[か]きます。てがみを　書[か]くことが　好[す]きです。私[わたし]は、5年前[ねんまえ]、せきがはらで　たたかいました。いしだの　西軍[せいぐん]と　いっしょに　たたかいました。とても　わるかったです。たくさんの　人が　しにました。せっぷくも　しました。わすれたいです。しょうらい、しずかな　ところに　住[す]みたいです。本[ほん]も　書[か]きたいです。よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "みやもとむさしは、いつ生[う]まれましたか。",
          "lang": "ja",
          "model": "1584年[ねん]に　生[う]まれました。",
          "key": [
            "1584"
          ]
        },
        {
          "q": "みやもとむさしは、なんですか。",
          "lang": "ja",
          "model": "さむらいです。",
          "key": [
            "さむらい"
          ]
        },
        {
          "q": "どこに　住[す]んでいますか。",
          "lang": "ja",
          "model": "京都[きょうと]に　住[す]んでいます。",
          "key": [
            "京都",
            "きょうと"
          ]
        },
        {
          "q": "あさごはんの　後[あと]で、何[なに]を　しますか。",
          "lang": "ja",
          "model": "けんどうを　れんしゅう　します。",
          "key": [
            "けんどう"
          ]
        },
        {
          "q": "その後[あと]、何[なに]を　しますか。",
          "lang": "ja",
          "model": "人[ひと]と　話[はな]したり、本[ほん]を　読[よ]んだり　します。",
          "key": [
            "話",
            "はな"
          ],
          "key2": [
            "本",
            "ほん",
            "読",
            "よ"
          ]
        },
        {
          "q": "何[なに]が　好[す]きですか。",
          "lang": "ja",
          "model": "てがみを　書[か]くことが　好[す]きです。",
          "key": [
            "てがみ",
            "手紙"
          ]
        },
        {
          "q": "5年前[ねんまえ]、何[なに]を　しましたか。",
          "lang": "ja",
          "model": "せきがはらで　たたかいました。",
          "key": [
            "せきがはら",
            "たたか"
          ]
        },
        {
          "q": "どうでしたか。",
          "lang": "ja",
          "model": "とても　わるかったです。",
          "key": [
            "わる"
          ]
        },
        {
          "q": "なぜですか。",
          "lang": "ja",
          "model": "たくさんの　人[ひと]が　しにました。",
          "key": [
            "しに"
          ]
        },
        {
          "q": "しょうらい、どこに　住[す]みたいですか。",
          "lang": "ja",
          "model": "しずかな　ところに　住[す]みたいです。",
          "key": [
            "しずか"
          ]
        },
        {
          "q": "何[なに]を　したいですか。",
          "lang": "ja",
          "model": "本[ほん]を　書[か]きたいです。",
          "key": [
            "本",
            "ほん"
          ],
          "key2": [
            "書",
            "か"
          ]
        }
      ],
      "art": {
        "file": "musashi.webp",
        "alt": "Miyamoto Musashi seated on a rock holding a long sword in one hand and a short sword in the other, an ink brush and a rolled scroll on the rock beside him.",
        "ready": true,
        "thumb": "musashi-t.webp"
      },
      "first_person": true
    },
    {
      "id": "hirooka",
      "name_ja": "ひろおか　あさこ",
      "name_en": "Hirooka Asako",
      "what_en": "Entrepreneur, banker, founder of a women's university",
      "born": 1849,
      "age": 50,
      "source": "Hirooka Asako respond in J and Trans and Vocab list",
      "paras": [
        "みなさん、こんにちは。私[わたし]の　名前[なまえ]は　ひろおか　あさこ　です。千八百四十九年[ねん]に　京都[きょうと]で　生[う]まれました。五十才[さい]です。",
        "子[こ]どもの　時[とき]、京都[きょうと]に　住[す]んでいました。しかし、今[いま]は、大阪[おおさか]に　住[す]んでいます。《毎日[まいにち]、6時半[じはん]に　おきます。》あさごはんを　食[た]べた後[あと]、しごとに　行[い]きます。《しごとで、人[ひと]と　話[はな]したり、ものを　売[う]ったり　します。時々[ときどき]、けいやくを　書[か]きます。》お金[かね]を　作[つく]ることが　好[す]きです。",
        "私[わたし]は　じぎょう家[か]　です。１０年前[ねんまえ]、ぎんこうを　作[つく]りました。《たいへんでしたが、ビジネスが　好[す]きです。》今年[ことし]、《女子大学[じょしだいがく]を　作[つく]りたいです。》大学[だいがく]は　とても　高[たか]いです。でも、お金[かね]が　ありません。だから、友[とも]だちに　たのみます。",
        "しょう来[らい]、外国[がいこく]に　行[い]きたいです。本[ほん]も　書[か]きたいです。",
        "よろしく　おねがいします。"
      ],
      "questions": [
        {
          "q": "ひろおかさんは、いつ生[う]まれましたか。",
          "lang": "ja",
          "model": "千八百四十九年[ねん]に　生[う]まれました。",
          "key": [
            "千八百四十九",
            "1849"
          ]
        },
        {
          "q": "今[いま]、どこに　住[す]んでいますか。",
          "lang": "ja",
          "model": "大阪[おおさか]に　住[す]んでいます。",
          "key": [
            "大阪",
            "おおさか"
          ]
        },
        {
          "q": "あさごはんの　後[あと]で、何[なに]を　しますか。",
          "lang": "ja",
          "model": "しごとに　行[い]きます。",
          "key": [
            "しごと"
          ]
        },
        {
          "q": "しごとで　何[なに]を　しますか。",
          "lang": "ja",
          "model": "人[ひと]と　話[はな]したり、ものを　売[う]ったり　します。",
          "key": [
            "話",
            "はな"
          ],
          "key2": [
            "売",
            "う"
          ]
        },
        {
          "q": "何[なに]を　することが　好[す]きですか。",
          "lang": "ja",
          "model": "お金[かね]を　作[つく]ることが　好[す]きです。",
          "key": [
            "金",
            "かね"
          ]
        },
        {
          "q": "ひろおかさんは、何[なん]ですか。",
          "lang": "ja",
          "model": "じぎょう家[か]です。",
          "key": [
            "じぎょう"
          ]
        },
        {
          "q": "１０年前[ねんまえ]　何[なに]を　しましたか。",
          "lang": "ja",
          "model": "ぎんこうを　作[つく]りました。",
          "key": [
            "ぎんこう"
          ]
        },
        {
          "q": "どうでしたか。",
          "lang": "ja",
          "model": "たいへんでした。",
          "key": [
            "たいへん"
          ]
        },
        {
          "q": "今年[ことし]、何[なに]を　したいですか。",
          "lang": "ja",
          "model": "女子大学[じょしだいがく]を　作[つく]りたいです。",
          "key": [
            "大学",
            "だいがく"
          ]
        },
        {
          "q": "お金[かね]は　だれに　たのみますか。",
          "lang": "ja",
          "model": "友[とも]だちに　たのみます。",
          "key": [
            "友",
            "とも"
          ]
        }
      ],
      "art": {
        "file": "hirooka.webp",
        "alt": "Hirooka Asako at a desk in a navy kimono, writing in a ruled ledger, an abacus in front of her and a brass miner's lamp alight at her elbow.",
        "ready": true,
        "thumb": "hirooka-t.webp"
      },
      "first_person": true
    },
    {
      "id": "saigo",
      "name_ja": "さいごう　たかもり",
      "name_en": "Saigō Takamori",
      "what_en": "Samurai who became a politician",
      "born": 1828,
      "age": 43,
      "source": "Unit 12 Saigo Takamori ONLY 2025",
      "paras": [
        "みなさん、おはようございます。",
        "私[わたし]の　名前[なまえ]は、さいごう　たかもりです。《４３才[さい]です。》１８２８年[ねん]に　生[う]まれました。《さつまに　住[す]んでいました。》しかし、今[いま]は　東京[とうきょう]に　住[す]んでいます。さかもと　りょうまの　ともだちです。私[わたし]も　侍[さむらい]でした。しかし、せいじ家[か]に　なりました。",
        "《毎日[まいにち]　とても　いそがしいです。》６時[じ]に　おきます。あさごはんを　食[た]べた後[あと]、しごとに　行[い]きます。しごとで、人[ひと]と　話[はな]したり、ほうりつを　作[つく]ったり　します。人[ひと]を　たすけることが　好[す]きです。しゃしんが　好[す]きじゃないです。しょう来[らい]、さつまに　帰[かえ]りたいです。犬[いぬ]と　さんぽしたい　です。",
        "《よろしく　おねがいします。》"
      ],
      "questions": [
        {
          "q": "When was Saigo born?",
          "lang": "en",
          "model": "1828.",
          "key": [
            "1828"
          ]
        },
        {
          "q": "Where does he live now?",
          "lang": "en",
          "model": "Tokyo.",
          "key": [
            "tokyo",
            "edo"
          ]
        },
        {
          "q": "What does he do now?",
          "lang": "en",
          "model": "He is a politician.",
          "key": [
            "politic"
          ]
        },
        {
          "q": "Whose friend is he?",
          "lang": "en",
          "model": "Sakamoto Ryōma's.",
          "key": [
            "sakamoto",
            "ryoma",
            "ryōma"
          ]
        },
        {
          "q": "After breakfast, where does he go?",
          "lang": "en",
          "model": "To work.",
          "key": [
            "work",
            "job"
          ]
        },
        {
          "q": "What does he do when he is there?",
          "lang": "en",
          "model": "He talks with people and makes laws.",
          "key": [
            "talk",
            "speak"
          ],
          "key2": [
            "law"
          ]
        },
        {
          "q": "What does he like to do?",
          "lang": "en",
          "model": "He likes helping people.",
          "key": [
            "help"
          ]
        },
        {
          "q": "What does he dislike?",
          "lang": "en",
          "model": "Photographs.",
          "key": [
            "photo",
            "picture",
            "camera"
          ]
        },
        {
          "q": "In the future what does he want to do? (2)",
          "lang": "en",
          "model": "Return to Satsuma, and walk with his dog.",
          "key": [
            "satsuma",
            "return",
            "home"
          ],
          "key2": [
            "dog",
            "walk"
          ]
        }
      ],
      "art": {
        "file": "saigo.webp",
        "alt": "Saigō Takamori in a dark military tunic with his hand on a large Satsuma dog, the hills and bay of Kagoshima behind him.",
        "ready": true,
        "thumb": "saigo-t.webp"
      },
      "first_person": true
    },
    {
      "id": "led",
      "name_ja": "青[あお]色[いろ]LEDの　発明者[はつめいしゃ]",
      "name_en": "The inventors of the blue LED",
      "what_en": "Akasaki, Amano and Nakamura, Nobel Prize 2014",
      "born": 1989,
      "age": null,
      "third_person": true,
      "source": "Reading historical figures LED light inventors CLEAN",
      "paras": [
        "みなさん、LEDを　知[し]っていますか。LEDの　電[でん]きゅうや　スマートフォンを　つかっていませんか。世界中[せかいじゅう]で　よく　使[つか]われていますね。",
        "LEDは　英語[えいご]の　Light Emitting Diodeから　できた　ことばです。《千九百八十九年[ねん]まで、あかいLEDや　みどりのLEDは　ありましたが、青[あお]いLEDは　ありませんでした。青[あお]いLEDを　つくることが　とても　むずかしかったからです。》たくさんの　科学者[かがくしゃ]が　青[あお]いLEDを　作[つく]ろうと　しましたが、なかなか　できませんでした。《でも、やっと　日本[にほん]の　科学者[かがくしゃ]が　青[あお]いLEDを　つくることが　できました。》",
        "赤崎[あかさき]さんと、天野[あまの]さんと、中村[なかむら]さんです。かれらは、《じっけんを　したり、かんがえなおしたり》して、やっと　青[あお]いLEDが　できました。",
        "その後[あと]、LEDの　電[でん]きゅうが　できました。それは、今[いま]までの　電[でん]きゅうの　電気[でんき]の　10%だけ　使[つか]います。それから、LEDの　テレビや　コンピューター画面[がめん]や　スマートフォンの　画面[がめん]などが　できました。青[あお]いLEDが　ないと、LEDの　カラーテレビが　できません。だから、青[あお]いLEDは　すごいですね。",
        "この　三人[さんにん]の　日本人[にほんじん]の　科学者[かがくしゃ]は、こんな　すごい　物[もの]を　発明[はつめい]して、二千十四年[ねん]に　ノーベルしょうを　もらいました。おめでとうございます。"
      ],
      "questions": [
        {
          "q": "What does LED stand for?",
          "lang": "en",
          "model": "Light Emitting Diode.",
          "key": [
            "light emitting"
          ]
        },
        {
          "q": "Until 1989, which colours of LED existed?",
          "lang": "en",
          "model": "Red and green.",
          "key": [
            "red"
          ],
          "key2": [
            "green"
          ]
        },
        {
          "q": "Why was there no blue LED?",
          "lang": "en",
          "model": "Because making a blue LED was very difficult.",
          "key": [
            "difficult",
            "hard"
          ]
        },
        {
          "q": "Who finally made it?",
          "lang": "en",
          "model": "Akasaki, Amano and Nakamura.",
          "key": [
            "akasaki",
            "amano",
            "nakamura"
          ]
        },
        {
          "q": "What did they do, over and over?",
          "lang": "en",
          "model": "Experiments, and rethinking.",
          "key": [
            "experiment"
          ],
          "key2": [
            "rethink",
            "think again",
            "reconsider"
          ]
        },
        {
          "q": "How much electricity does an LED bulb use?",
          "lang": "en",
          "model": "Ten per cent of the old bulbs.",
          "key": [
            "10",
            "ten"
          ]
        },
        {
          "q": "What could not exist without the blue LED?",
          "lang": "en",
          "model": "LED colour television.",
          "key": [
            "colour tv",
            "color tv",
            "television",
            "カラーテレビ"
          ]
        },
        {
          "q": "What did they receive in 2014?",
          "lang": "en",
          "model": "The Nobel Prize.",
          "key": [
            "nobel"
          ]
        }
      ],
      "art": {
        "file": "led.webp",
        "alt": "Shuji Nakamura in a white laboratory coat, holding up a lit blue LED between his fingers, optical equipment on the bench in front of him. One of the three scientists in this article; Isamu Akasaki and Hiroshi Amano shared the 2014 Nobel Prize with him.",
        "ready": true,
        "caption": "Pictured: Shuji Nakamura, one of the three.",
        "thumb": "led-t.webp"
      },
      "first_person": false
    }
  ],
  "vocab": [
    {
      "ja": "じこしょうかい",
      "en": "self-introduction",
      "group": "frame"
    },
    {
      "ja": "生[う]まれました",
      "en": "was born",
      "group": "frame"
    },
    {
      "ja": "才[さい]",
      "en": "years old",
      "group": "frame"
    },
    {
      "ja": "住[す]んでいました",
      "en": "lived in (a place)",
      "group": "frame"
    },
    {
      "ja": "住[す]んでいます",
      "en": "lives in (a place)",
      "group": "frame"
    },
    {
      "ja": "しかし",
      "en": "however",
      "group": "frame"
    },
    {
      "ja": "今[いま]",
      "en": "now",
      "group": "frame"
    },
    {
      "ja": "子[こ]どもの　時[とき]",
      "en": "when I was a child",
      "group": "frame"
    },
    {
      "ja": "毎日[まいにち]",
      "en": "every day",
      "group": "frame"
    },
    {
      "ja": "おきます",
      "en": "to get up",
      "group": "frame"
    },
    {
      "ja": "あさごはん",
      "en": "breakfast",
      "group": "frame"
    },
    {
      "ja": "食[た]べた後[あと]",
      "en": "after eating",
      "group": "frame"
    },
    {
      "ja": "しごと",
      "en": "job, work",
      "group": "frame"
    },
    {
      "ja": "〜たり　〜たり　します",
      "en": "do things like A and B",
      "group": "frame"
    },
    {
      "ja": "〜ことが　好[す]きです",
      "en": "likes doing ~",
      "group": "frame"
    },
    {
      "ja": "しょうらい",
      "en": "in the future",
      "group": "frame"
    },
    {
      "ja": "〜たいです",
      "en": "want to (do)",
      "group": "frame"
    },
    {
      "ja": "なりたいです",
      "en": "want to become",
      "group": "frame"
    },
    {
      "ja": "なりました",
      "en": "became",
      "group": "frame"
    },
    {
      "ja": "よろしく　おねがいします",
      "en": "pleased to meet you",
      "group": "frame"
    },
    {
      "ja": "さむらい",
      "en": "samurai",
      "group": "people"
    },
    {
      "ja": "侍[さむらい]",
      "en": "samurai",
      "group": "people"
    },
    {
      "ja": "社長[しゃちょう]",
      "en": "company president",
      "group": "people"
    },
    {
      "ja": "じぎょう家[か]",
      "en": "entrepreneur",
      "group": "people"
    },
    {
      "ja": "せいじ家[か]",
      "en": "politician",
      "group": "people"
    },
    {
      "ja": "科学者[かがくしゃ]",
      "en": "scientist",
      "group": "people"
    },
    {
      "ja": "発明者[はつめいしゃ]",
      "en": "inventor",
      "group": "people"
    },
    {
      "ja": "先生[せんせい]",
      "en": "teacher",
      "group": "people"
    },
    {
      "ja": "友[とも]だち",
      "en": "friend",
      "group": "people"
    },
    {
      "ja": "父[ちち]",
      "en": "my father",
      "group": "people"
    },
    {
      "ja": "話[はな]します",
      "en": "to speak",
      "group": "doing"
    },
    {
      "ja": "作[つく]ります",
      "en": "to make",
      "group": "doing"
    },
    {
      "ja": "売[う]ります",
      "en": "to sell",
      "group": "doing"
    },
    {
      "ja": "書[か]きます",
      "en": "to write",
      "group": "doing"
    },
    {
      "ja": "読[よ]みます",
      "en": "to read",
      "group": "doing"
    },
    {
      "ja": "練習[れんしゅう]します",
      "en": "to practise",
      "group": "doing"
    },
    {
      "ja": "さんぽに　行[い]きます",
      "en": "to go for a walk",
      "group": "doing"
    },
    {
      "ja": "たすけます",
      "en": "to help",
      "group": "doing"
    },
    {
      "ja": "たたかいました",
      "en": "fought",
      "group": "doing"
    },
    {
      "ja": "たのみます",
      "en": "to ask a favour",
      "group": "doing"
    },
    {
      "ja": "帰[かえ]りたい",
      "en": "want to go home",
      "group": "doing"
    },
    {
      "ja": "行[い]ったことが　あります",
      "en": "have been to",
      "group": "doing"
    },
    {
      "ja": "行[い]ったことが　ありません",
      "en": "have never been to",
      "group": "doing"
    },
    {
      "ja": "けいやく",
      "en": "contract",
      "group": "things"
    },
    {
      "ja": "ぎんこう",
      "en": "bank",
      "group": "things"
    },
    {
      "ja": "お金[かね]",
      "en": "money",
      "group": "things"
    },
    {
      "ja": "ほうりつ",
      "en": "law",
      "group": "things"
    },
    {
      "ja": "手紙[てがみ]",
      "en": "letter",
      "group": "things"
    },
    {
      "ja": "本[ほん]",
      "en": "book",
      "group": "things"
    },
    {
      "ja": "けんどう",
      "en": "kendo",
      "group": "things"
    },
    {
      "ja": "学校[がっこう]",
      "en": "school",
      "group": "things"
    },
    {
      "ja": "大学[だいがく]",
      "en": "university",
      "group": "things"
    },
    {
      "ja": "女子大学[じょしだいがく]",
      "en": "women's university",
      "group": "things"
    },
    {
      "ja": "しゃしん",
      "en": "photograph",
      "group": "things"
    },
    {
      "ja": "犬[いぬ]",
      "en": "dog",
      "group": "things"
    },
    {
      "ja": "外国[がいこく]",
      "en": "foreign country",
      "group": "things"
    },
    {
      "ja": "いそがしい",
      "en": "busy",
      "group": "describing"
    },
    {
      "ja": "たいへん",
      "en": "hard going, tough",
      "group": "describing"
    },
    {
      "ja": "ゆうめい",
      "en": "famous",
      "group": "describing"
    },
    {
      "ja": "上手[じょうず]",
      "en": "good at",
      "group": "describing"
    },
    {
      "ja": "しずか",
      "en": "quiet",
      "group": "describing"
    },
    {
      "ja": "高[たか]い",
      "en": "expensive, high",
      "group": "describing"
    },
    {
      "ja": "わるかったです",
      "en": "was bad",
      "group": "describing"
    },
    {
      "ja": "でも",
      "en": "but",
      "group": "describing"
    },
    {
      "ja": "だから",
      "en": "so, therefore",
      "group": "describing"
    },
    {
      "ja": "時々[ときどき]",
      "en": "sometimes",
      "group": "describing"
    },
    {
      "ja": "電[でん]きゅう",
      "en": "light bulb",
      "group": "led"
    },
    {
      "ja": "世界中[せかいじゅう]",
      "en": "worldwide",
      "group": "led"
    },
    {
      "ja": "使[つか]われています",
      "en": "is used",
      "group": "led"
    },
    {
      "ja": "ことば",
      "en": "word",
      "group": "led"
    },
    {
      "ja": "作[つく]ろうと　しました",
      "en": "tried to make",
      "group": "led"
    },
    {
      "ja": "なかなか",
      "en": "not easily",
      "group": "led"
    },
    {
      "ja": "やっと",
      "en": "finally",
      "group": "led"
    },
    {
      "ja": "じっけん",
      "en": "experiment",
      "group": "led"
    },
    {
      "ja": "かんがえなおします",
      "en": "to rethink",
      "group": "led"
    },
    {
      "ja": "電気[でんき]",
      "en": "electricity",
      "group": "led"
    },
    {
      "ja": "だけ",
      "en": "only",
      "group": "led"
    },
    {
      "ja": "画面[がめん]",
      "en": "screen",
      "group": "led"
    },
    {
      "ja": "発明[はつめい]します",
      "en": "to invent",
      "group": "led"
    },
    {
      "ja": "しょう",
      "en": "prize",
      "group": "led"
    },
    {
      "ja": "おめでとうございます",
      "en": "congratulations",
      "group": "led"
    }
  ],
  "readings": {
    "年": "ねん",
    "何": "なに",
    "人": "ひと",
    "私": "わたし",
    "行": "い",
    "住": "す",
    "時": "じ",
    "後": "あと",
    "本": "ほん",
    "作": "つく",
    "話": "はな",
    "好": "す",
    "生": "う",
    "才": "さい",
    "金": "かね",
    "食": "た"
  },
  "tune": {
    "title": "アイネ・クライネ・ナハトムジーク",
    "title_en": "Eine kleine Nachtmusik, first movement",
    "source": "Mozart, K.525, 1787. Public domain: Mozart died in 1791. G major, and the opening is all rising arpeggios and running scales, which is what a chiptune wants.",
    "check": "Transcribed by ear in this repo, not from a score. Correct the notes here if they are wrong; nothing else has to change.",
    "tempo": 132,
    "melody": [
      [
        "G4",
        0.5
      ],
      [
        "D4",
        0.5
      ],
      [
        "G4",
        0.5
      ],
      [
        "D4",
        0.5
      ],
      [
        "G4",
        0.25
      ],
      [
        "B4",
        0.25
      ],
      [
        "D5",
        0.25
      ],
      [
        "G5",
        0.25
      ],
      [
        "D5",
        0.5
      ],
      [
        null,
        0.5
      ],
      [
        "A4",
        0.5
      ],
      [
        "F#4",
        0.5
      ],
      [
        "A4",
        0.5
      ],
      [
        "F#4",
        0.5
      ],
      [
        "A4",
        0.25
      ],
      [
        "C5",
        0.25
      ],
      [
        "F#4",
        0.25
      ],
      [
        "A4",
        0.25
      ],
      [
        "D4",
        0.5
      ],
      [
        null,
        0.5
      ],
      [
        "G4",
        0.25
      ],
      [
        "A4",
        0.25
      ],
      [
        "B4",
        0.25
      ],
      [
        "C5",
        0.25
      ],
      [
        "D5",
        0.25
      ],
      [
        "E5",
        0.25
      ],
      [
        "F#5",
        0.25
      ],
      [
        "G5",
        0.25
      ],
      [
        "G5",
        0.5
      ],
      [
        "F#5",
        0.25
      ],
      [
        "E5",
        0.25
      ],
      [
        "D5",
        0.5
      ],
      [
        "B4",
        0.5
      ],
      [
        "A4",
        0.25
      ],
      [
        "B4",
        0.25
      ],
      [
        "C5",
        0.25
      ],
      [
        "A4",
        0.25
      ],
      [
        "G4",
        1
      ],
      [
        "G4",
        0.5
      ],
      [
        "D4",
        0.5
      ],
      [
        "G4",
        0.5
      ],
      [
        "D4",
        0.5
      ],
      [
        "G4",
        0.25
      ],
      [
        "B4",
        0.25
      ],
      [
        "D5",
        0.25
      ],
      [
        "G5",
        0.25
      ],
      [
        "D5",
        0.5
      ],
      [
        null,
        0.5
      ],
      [
        "D5",
        0.25
      ],
      [
        "C5",
        0.25
      ],
      [
        "B4",
        0.25
      ],
      [
        "A4",
        0.25
      ],
      [
        "G4",
        0.25
      ],
      [
        "F#4",
        0.25
      ],
      [
        "E4",
        0.25
      ],
      [
        "D4",
        0.25
      ],
      [
        "G4",
        0.5
      ],
      [
        "B4",
        0.5
      ],
      [
        "D5",
        0.5
      ],
      [
        "G5",
        0.5
      ],
      [
        "G4",
        1
      ],
      [
        null,
        1
      ]
    ],
    "bass": [
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "C3",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "D2",
        1
      ],
      [
        "G2",
        1
      ],
      [
        "G2",
        1
      ]
    ]
  },
  "ui": [
    {
      "ja": "はなすスピード",
      "en": "Speaking speed",
      "note": "Spoken when the speed button is pressed, so the new speed is heard on a line that names it."
    }
  ],
  "kanji": [
    {
      "ja": "歴史[れきし]",
      "en": "history"
    },
    {
      "ja": "人物[じんぶつ]",
      "en": "historical figure"
    },
    {
      "ja": "名前[なまえ]",
      "en": "name"
    },
    {
      "ja": "年[ねん]",
      "en": "year"
    },
    {
      "ja": "生[う]まれました",
      "en": "was born"
    },
    {
      "ja": "住[す]んでいます",
      "en": "live (in)"
    },
    {
      "ja": "今[いま]",
      "en": "now"
    },
    {
      "ja": "東京[とうきょう]",
      "en": "Tokyo"
    },
    {
      "ja": "友[とも]だち",
      "en": "friend"
    },
    {
      "ja": "侍[さむらい]",
      "en": "samurai"
    },
    {
      "ja": "社長[しゃちょう]",
      "en": "CEO / company president"
    },
    {
      "ja": "毎日[まいにち]",
      "en": "every day"
    },
    {
      "ja": "時[じ]",
      "en": "time / o'clock",
      "alt_read": "とき"
    },
    {
      "ja": "食[た]べる",
      "en": "to eat"
    },
    {
      "ja": "後[あと]",
      "en": "after"
    },
    {
      "ja": "行[い]く",
      "en": "to go"
    },
    {
      "ja": "人[ひと]",
      "en": "person"
    },
    {
      "ja": "話[はな]す",
      "en": "to speak / talk"
    },
    {
      "ja": "作[つく]る",
      "en": "to make"
    },
    {
      "ja": "売[う]る",
      "en": "to sell"
    },
    {
      "ja": "好[す]き",
      "en": "like"
    },
    {
      "ja": "外国[がいこく]",
      "en": "foreign country"
    },
    {
      "ja": "父[ちち]",
      "en": "father"
    },
    {
      "ja": "本[ほん]",
      "en": "book"
    },
    {
      "ja": "読[よ]む",
      "en": "to read"
    },
    {
      "ja": "先生[せんせい]",
      "en": "teacher"
    },
    {
      "ja": "学校[がっこう]",
      "en": "school"
    },
    {
      "ja": "上手[じょうず]",
      "en": "good at / skilful"
    },
    {
      "ja": "何[なに]",
      "en": "what",
      "alt_read": "なん"
    },
    {
      "ja": "しょう来[らい]",
      "en": "future"
    }
  ],
  "particles": [
    {
      "ja": "は",
      "en": "topic: as for ~",
      "note": "Said わ. Marks what the sentence is about."
    },
    {
      "ja": "が",
      "en": "marks the subject"
    },
    {
      "ja": "を",
      "en": "marks the object: the thing it is done to"
    },
    {
      "ja": "に",
      "en": "to, at, in: a time or a destination"
    },
    {
      "ja": "で",
      "en": "at, by, with: where it happens or what it is done with"
    },
    {
      "ja": "と",
      "en": "and, with"
    },
    {
      "ja": "の",
      "en": "of, 's: joins two nouns"
    },
    {
      "ja": "も",
      "en": "also, too"
    },
    {
      "ja": "や",
      "en": "and, among other things",
      "note": "Unlike と, it does not finish the list."
    },
    {
      "ja": "から",
      "en": "from, because"
    },
    {
      "ja": "まで",
      "en": "until, as far as"
    },
    {
      "ja": "へ",
      "en": "to: a direction",
      "note": "Said え."
    },
    {
      "ja": "ね",
      "en": "isn't it"
    },
    {
      "ja": "か",
      "en": "turns it into a question"
    },
    {
      "ja": "など",
      "en": "and so on"
    },
    {
      "ja": "だけ",
      "en": "only"
    }
  ],
  "endings": [
    {
      "ja": "です",
      "en": "the copula: X is Y",
      "note": "Andrew's 〜です pattern."
    },
    {
      "ja": "でした",
      "en": "was: the past of です"
    },
    {
      "ja": "じゃないです",
      "en": "is not"
    },
    {
      "ja": "ですね",
      "en": "is, isn't it"
    },
    {
      "ja": "ですが",
      "en": "is, but"
    },
    {
      "ja": "でしたが",
      "en": "was, but"
    },
    {
      "ja": "ます",
      "en": "polite present"
    },
    {
      "ja": "ました",
      "en": "polite past"
    },
    {
      "ja": "ません",
      "en": "polite negative"
    },
    {
      "ja": "ませんでした",
      "en": "polite past negative"
    },
    {
      "ja": "さん",
      "en": "Mr, Ms: added to a name"
    },
    {
      "ja": "ね",
      "en": "isn't it"
    }
  ],
  "patterns": [
    {
      "id": "naritai",
      "ends": [
        "なりたいです",
        "なりたい",
        "なりました"
      ]
    },
    {
      "id": "wasuretai",
      "ends": [
        "わすれたいです",
        "わすれたい"
      ]
    },
    {
      "id": "ikitai",
      "ends": [
        "たいです",
        "たい"
      ]
    },
    {
      "id": "tari",
      "ends": [
        "たり",
        "だり",
        "たりします",
        "だりします",
        "たりして",
        "だりして"
      ]
    },
    {
      "id": "ta-ato",
      "ends": [
        "た後",
        "だ後",
        "たあと",
        "だあと"
      ]
    },
    {
      "id": "nai-koto",
      "ends": [
        "ことが"
      ],
      "sentence": "ありません|あります"
    },
    {
      "id": "suki",
      "ends": [
        "ことが"
      ]
    },
    {
      "id": "sunde",
      "ends": [
        "住んでいます",
        "住んでいました",
        "住んでいる"
      ]
    },
    {
      "id": "umareta",
      "ends": [
        "生まれました"
      ]
    },
    {
      "id": "shikashi",
      "ends": [
        "しかし"
      ]
    },
    {
      "id": "shourai",
      "ends": [
        "しょうらい",
        "しょう来"
      ]
    }
  ],
  "names": [
    {
      "ja": "いわさき",
      "en": "Iwasaki, a family name"
    },
    {
      "ja": "やたろう",
      "en": "Yataro, a given name"
    },
    {
      "ja": "さかもと",
      "en": "Sakamoto, a family name"
    },
    {
      "ja": "りょうま",
      "en": "Ryoma, a given name"
    },
    {
      "ja": "みやもと",
      "en": "Miyamoto, a family name"
    },
    {
      "ja": "むさし",
      "en": "Musashi, a given name"
    },
    {
      "ja": "ひろおか",
      "en": "Hirooka, a family name"
    },
    {
      "ja": "あさこ",
      "en": "Asako, a given name"
    },
    {
      "ja": "さいごう",
      "en": "Saigo, a family name"
    },
    {
      "ja": "たかもり",
      "en": "Takamori, a given name"
    },
    {
      "ja": "赤崎[あかさき]",
      "en": "Akasaki, a family name"
    },
    {
      "ja": "天野[あまの]",
      "en": "Amano, a family name"
    },
    {
      "ja": "中村[なかむら]",
      "en": "Nakamura, a family name"
    },
    {
      "ja": "とさ",
      "en": "Tosa, an old province, now Kochi"
    },
    {
      "ja": "ながさき",
      "en": "Nagasaki, a city in the south-west"
    },
    {
      "ja": "えど",
      "en": "Edo, the old name for Tokyo"
    },
    {
      "ja": "さつま",
      "en": "Satsuma, an old province, now Kagoshima"
    },
    {
      "ja": "京都[きょうと]",
      "en": "Kyoto"
    },
    {
      "ja": "大阪[おおさか]",
      "en": "Osaka"
    },
    {
      "ja": "せきがはら",
      "en": "Sekigahara, where the 1600 battle was fought"
    },
    {
      "ja": "みつびし",
      "en": "Mitsubishi, the company"
    },
    {
      "ja": "いしだ",
      "en": "Ishida, a family name"
    },
    {
      "ja": "西軍[せいぐん]",
      "en": "the Western army"
    },
    {
      "ja": "けんどう",
      "en": "kendo"
    },
    {
      "ja": "ノーベルしょう",
      "en": "the Nobel Prize"
    }
  ],
  "counters": [
    {
      "ja": "才[さい]",
      "en": "years old"
    },
    {
      "ja": "年[ねん]",
      "en": "year"
    },
    {
      "ja": "年前[ねんまえ]",
      "en": "years ago"
    },
    {
      "ja": "時[じ]",
      "en": "o'clock"
    },
    {
      "ja": "時半[じはん]",
      "en": "half past"
    },
    {
      "ja": "人[にん]",
      "en": "people"
    },
    {
      "ja": "%",
      "en": "per cent"
    }
  ],
  "extras": [
    {
      "ja": "みなさん",
      "en": "everyone"
    },
    {
      "ja": "とても",
      "en": "very"
    },
    {
      "ja": "私[わたし]",
      "en": "I, me"
    },
    {
      "ja": "します",
      "en": "do"
    },
    {
      "ja": "しました",
      "en": "did"
    },
    {
      "ja": "しています",
      "en": "is doing"
    },
    {
      "ja": "よろしく　おねがいします",
      "en": "a set phrase that closes an introduction"
    },
    {
      "ja": "よろしく",
      "en": "a set phrase that closes an introduction"
    },
    {
      "ja": "おねがいします",
      "en": "please, I ask you"
    },
    {
      "ja": "こんにちは",
      "en": "hello"
    },
    {
      "ja": "おはようございます",
      "en": "good morning"
    },
    {
      "ja": "あります",
      "en": "there is, I have"
    },
    {
      "ja": "ありません",
      "en": "there is not, I have not"
    },
    {
      "ja": "たくさん",
      "en": "a lot, many"
    },
    {
      "ja": "いっしょに",
      "en": "together"
    },
    {
      "ja": "ところ",
      "en": "place"
    },
    {
      "ja": "今年[ことし]",
      "en": "this year"
    },
    {
      "ja": "ビジネス",
      "en": "business"
    },
    {
      "ja": "すごい",
      "en": "amazing"
    },
    {
      "ja": "それ",
      "en": "that"
    },
    {
      "ja": "その後[あと]",
      "en": "after that"
    },
    {
      "ja": "できました",
      "en": "was made, came about"
    },
    {
      "ja": "できません",
      "en": "cannot be made"
    },
    {
      "ja": "できた",
      "en": "was made"
    },
    {
      "ja": "子[こ]ども",
      "en": "child"
    },
    {
      "ja": "こども",
      "en": "child"
    },
    {
      "ja": "時々[ときどき]",
      "en": "sometimes"
    },
    {
      "ja": "前[まえ]",
      "en": "before, ago"
    },
    {
      "ja": "半[はん]",
      "en": "half"
    },
    {
      "ja": "日本[にほん]",
      "en": "Japan"
    },
    {
      "ja": "日本人[にほんじん]",
      "en": "Japanese person"
    },
    {
      "ja": "英語[えいご]",
      "en": "English"
    },
    {
      "ja": "世界中[せかいじゅう]",
      "en": "all over the world"
    },
    {
      "ja": "よく",
      "en": "often, well"
    },
    {
      "ja": "この",
      "en": "this"
    },
    {
      "ja": "三人[さんにん]",
      "en": "three people"
    },
    {
      "ja": "物[もの]",
      "en": "thing"
    },
    {
      "ja": "もの",
      "en": "thing"
    },
    {
      "ja": "かれら",
      "en": "they"
    },
    {
      "ja": "れんしゅう",
      "en": "practice"
    },
    {
      "ja": "練習[れんしゅう]",
      "en": "practice"
    },
    {
      "ja": "さんぽ",
      "en": "a walk"
    },
    {
      "ja": "てがみ",
      "en": "letter"
    },
    {
      "ja": "手紙[てがみ]",
      "en": "letter"
    },
    {
      "ja": "お金[かね]",
      "en": "money"
    },
    {
      "ja": "しにました",
      "en": "died"
    },
    {
      "ja": "せっぷく",
      "en": "seppuku"
    },
    {
      "ja": "たいへんでした",
      "en": "it was hard"
    },
    {
      "ja": "たいへん",
      "en": "hard, tough"
    },
    {
      "ja": "じっけん",
      "en": "experiment"
    },
    {
      "ja": "かんがえなおし",
      "en": "rethinking"
    },
    {
      "ja": "やっと",
      "en": "at last"
    },
    {
      "ja": "なかなか",
      "en": "not easily"
    },
    {
      "ja": "だから",
      "en": "so, therefore"
    },
    {
      "ja": "でも",
      "en": "but"
    },
    {
      "ja": "それから",
      "en": "and then"
    },
    {
      "ja": "まで",
      "en": "until"
    },
    {
      "ja": "しずかな",
      "en": "quiet"
    },
    {
      "ja": "しずか",
      "en": "quiet"
    },
    {
      "ja": "ゆうめいな",
      "en": "famous"
    },
    {
      "ja": "こんな",
      "en": "this kind of"
    },
    {
      "ja": "ほうりつ",
      "en": "law"
    },
    {
      "ja": "けいやく",
      "en": "contract"
    },
    {
      "ja": "ぎんこう",
      "en": "bank"
    },
    {
      "ja": "女子大学[じょしだいがく]",
      "en": "women's university"
    },
    {
      "ja": "大学[だいがく]",
      "en": "university"
    },
    {
      "ja": "高[たか]いです",
      "en": "is expensive, is high"
    },
    {
      "ja": "発明[はつめい]して",
      "en": "inventing"
    },
    {
      "ja": "発明[はつめい]",
      "en": "invention"
    },
    {
      "ja": "知[し]っていますか",
      "en": "do you know?"
    },
    {
      "ja": "つかっていませんか",
      "en": "aren't you using?"
    },
    {
      "ja": "使[つか]われています",
      "en": "is used"
    },
    {
      "ja": "使[つか]います",
      "en": "uses"
    },
    {
      "ja": "スマートフォン",
      "en": "smartphone"
    },
    {
      "ja": "テレビ",
      "en": "television"
    },
    {
      "ja": "カラーテレビ",
      "en": "colour television"
    },
    {
      "ja": "コンピューター",
      "en": "computer"
    },
    {
      "ja": "画面[がめん]",
      "en": "screen"
    },
    {
      "ja": "電[でん]きゅう",
      "en": "light bulb"
    },
    {
      "ja": "電気[でんき]",
      "en": "electricity"
    },
    {
      "ja": "青[あお]い",
      "en": "blue"
    },
    {
      "ja": "あかい",
      "en": "red"
    },
    {
      "ja": "みどり",
      "en": "green"
    },
    {
      "ja": "むずかしかった",
      "en": "was difficult"
    },
    {
      "ja": "科学者[かがくしゃ]",
      "en": "scientist"
    },
    {
      "ja": "ことば",
      "en": "word"
    },
    {
      "ja": "おめでとうございます",
      "en": "congratulations"
    },
    {
      "ja": "LED",
      "en": "LED, a light-emitting diode"
    },
    {
      "ja": "Light",
      "en": "light"
    },
    {
      "ja": "Emitting",
      "en": "emitting"
    },
    {
      "ja": "Diode",
      "en": "diode"
    },
    {
      "ja": "しゃちょう",
      "en": "CEO, company president"
    },
    {
      "ja": "ともだち",
      "en": "friend"
    },
    {
      "ja": "行[い]きます",
      "en": "go"
    },
    {
      "ja": "作[つく]りました",
      "en": "made, built, founded"
    },
    {
      "ja": "もらいました",
      "en": "received"
    },
    {
      "ja": "ありました",
      "en": "there was"
    },
    {
      "ja": "ありましたが",
      "en": "there was, but"
    },
    {
      "ja": "作[つく]ろう",
      "en": "let's make, going to make"
    },
    {
      "ja": "して",
      "en": "doing, and"
    },
    {
      "ja": "ない",
      "en": "not, without"
    },
    {
      "ja": "じっけんを",
      "en": "experiment"
    },
    {
      "ja": "かんがえなおし",
      "en": "rethinking"
    },
    {
      "ja": "知[し]っています",
      "en": "know"
    },
    {
      "ja": "つかっています",
      "en": "is using"
    },
    {
      "ja": "なりました",
      "en": "became"
    },
    {
      "ja": "なります",
      "en": "become"
    }
  ],
  "grammar": [
    {
      "id": "desu",
      "pat": "〜です",
      "title_en": "X is Y",
      "rule": "The plainest sentence in the unit, and the one every article uses to say what someone is. No verb to conjugate: the thing, then です.",
      "form": "noun + です",
      "egs": [
        {
          "ja": "さむらいです。",
          "en": "(I) am a samurai."
        },
        {
          "ja": "私[わたし]は　じぎょう家[か]　です。",
          "en": "I am an entrepreneur."
        },
        {
          "ja": "せいじ家[か]に　なりました。",
          "en": "(I) became a politician."
        }
      ],
      "items": [
        {
          "ja": "みやもとむさしは　＿＿＿＿。",
          "answer": "さむらいです",
          "options": [
            "さむらいです",
            "さむらいでした",
            "さむらいに　なりたいです"
          ]
        },
        {
          "ja": "ひろおかさんは　じぎょう家[か]　＿＿＿＿。",
          "answer": "です",
          "options": [
            "です",
            "でした",
            "じゃないです"
          ]
        }
      ],
      "need": [
        [
          "です"
        ]
      ]
    },
    {
      "id": "umareta",
      "pat": "〜に生[う]まれました",
      "title_en": "Born in a year",
      "rule": "The year takes に, the same に that marks a point in time. Every article opens with it, so it is the first thing to own.",
      "form": "year + に + 生[う]まれました",
      "egs": [
        {
          "ja": "1835年[ねん]に　生[う]まれました。",
          "en": "I was born in 1835."
        },
        {
          "ja": "千八百四十九年[ねん]に　京都[きょうと]で　生[う]まれました。",
          "en": "I was born in Kyoto in 1849."
        }
      ],
      "items": [
        {
          "ja": "1836年[ねん]＿＿　生[う]まれました。",
          "answer": "に",
          "options": [
            "に",
            "で",
            "を",
            "は"
          ]
        },
        {
          "ja": "1584年[ねん]に　＿＿＿＿＿＿。",
          "answer": "生[う]まれました",
          "options": [
            "生[う]まれました",
            "住[す]んでいました",
            "なりました"
          ]
        }
      ],
      "need": [
        [
          "生まれ",
          "うまれ"
        ],
        [
          "ました"
        ]
      ]
    },
    {
      "id": "sunde",
      "pat": "〜に住[す]んでいます",
      "title_en": "Lives in, lived in",
      "rule": "The place takes に. 住[す]んでいます is now and 住[す]んでいました is then, and most of the articles use both in the same breath.",
      "form": "place + に + 住[す]んでいます / 住[す]んでいました",
      "egs": [
        {
          "ja": "とさに　住[す]んでいました。",
          "en": "I used to live in Tosa."
        },
        {
          "ja": "今[いま]は　ながさきに　住[す]んでいます。",
          "en": "Now I live in Nagasaki."
        }
      ],
      "items": [
        {
          "ja": "今[いま]は、京都[きょうと]に　＿＿＿＿＿＿＿＿。",
          "answer": "住[す]んでいます",
          "options": [
            "住[す]んでいます",
            "住[す]んでいました",
            "行[い]きます"
          ]
        },
        {
          "ja": "子[こ]どもの　時[とき]、京都[きょうと]に　＿＿＿＿＿＿＿＿＿。",
          "answer": "住[す]んでいました",
          "options": [
            "住[す]んでいました",
            "住[す]んでいます",
            "住[す]みたいです"
          ]
        }
      ],
      "need": [
        [
          "住ん",
          "すん"
        ],
        [
          "います",
          "いました"
        ]
      ]
    },
    {
      "id": "ta-ato",
      "pat": "〜た後[あと]",
      "title_en": "After doing something",
      "rule": "Put the verb into its plain past, the た form, and add 後[あと]. Not the ます form: 食[た]べました後 is wrong.",
      "form": "plain past (た form) + 後[あと]",
      "egs": [
        {
          "ja": "あさごはんを　食[た]べた後[あと]、しごとに　行[い]きます。",
          "en": "After eating breakfast, I go to work."
        },
        {
          "ja": "あさごはんを　食[た]べた後[あと]、父[ちち]と　話[はな]したり、さんぽに　行[い]ったりします。",
          "en": "After breakfast I talk with my father and go for a walk."
        }
      ],
      "items": [
        {
          "ja": "あさごはんを　食[た]べ＿＿後[あと]、しごとに　行[い]きます。",
          "answer": "た",
          "options": [
            "た",
            "ます",
            "ました",
            "て"
          ]
        },
        {
          "ja": "あさごはんを　＿＿＿＿後[あと]、けんどうを　れんしゅう　します。",
          "answer": "食[た]べた",
          "options": [
            "食[た]べた",
            "食[た]べます",
            "食[た]べました",
            "食[た]べて"
          ]
        }
      ],
      "need": [
        [
          "た後",
          "たあと",
          "だ後",
          "だあと"
        ]
      ]
    },
    {
      "id": "tari",
      "pat": "〜たり　〜たり　します",
      "title_en": "Doing things like A and B",
      "rule": "Two examples of what you do, not a complete list. Both verbs go into the た form and take り, and the sentence finishes with します.",
      "form": "Vたり + Vたり + します",
      "egs": [
        {
          "ja": "人[ひと]と　話[はな]したり、けいやくを　作[つく]ったり　します。",
          "en": "I do things like talking with people and drawing up contracts."
        },
        {
          "ja": "けんどうを　練習[れんしゅう]したり、本[ほん]を　読[よ]んだり　します。",
          "en": "I do things like practising kendo and reading books."
        }
      ],
      "items": [
        {
          "ja": "人[ひと]と　話[はな]し＿＿、ものを　売[う]ったり　します。",
          "answer": "たり",
          "options": [
            "たり",
            "ました",
            "ます",
            "て"
          ]
        },
        {
          "ja": "じっけんを　したり、かんがえなおしたり　＿＿＿。",
          "answer": "します",
          "options": [
            "します",
            "です",
            "あります",
            "いきます"
          ]
        }
      ],
      "need": [
        [
          "たり"
        ],
        [
          "します",
          "しました"
        ]
      ],
      "re": "たり[^。]*たり"
    },
    {
      "id": "suki",
      "pat": "〜ことが　好[す]きです",
      "title_en": "Likes doing something",
      "rule": "To like doing a thing, not just to like a thing. The verb goes into its plain form and こと turns it into a noun, which が then marks.",
      "form": "plain form verb + ことが + 好[す]きです",
      "egs": [
        {
          "ja": "ものを　売[う]ることが　好[す]きです。",
          "en": "I like selling things."
        },
        {
          "ja": "てがみを　書[か]くことが　好[す]きです。",
          "en": "I like writing letters."
        },
        {
          "ja": "人[ひと]を　たすけることが　好[す]きです。",
          "en": "I like helping people."
        }
      ],
      "items": [
        {
          "ja": "お金[かね]を　作[つく]る＿＿が　好[す]きです。",
          "answer": "こと",
          "options": [
            "こと",
            "の",
            "もの",
            "ところ"
          ]
        },
        {
          "ja": "ものを　売[う]ることが　＿＿＿＿＿。",
          "answer": "好[す]きです",
          "options": [
            "好[す]きです",
            "好[す]きじゃないです",
            "したいです"
          ]
        }
      ],
      "need": [
        [
          "ことが"
        ],
        [
          "好き",
          "すき"
        ]
      ]
    },
    {
      "id": "tsukuri",
      "pat": "〜を　作[つく]りました",
      "title_en": "Made, built, founded",
      "rule": "作[つく]ります covers making a thing, drawing up a contract and founding a bank. The thing made takes を.",
      "form": "thing + を + 作[つく]りました",
      "egs": [
        {
          "ja": "１０年前[ねんまえ]、ぎんこうを　作[つく]りました。",
          "en": "Ten years ago I founded a bank."
        },
        {
          "ja": "けいやくを　作[つく]ったり　します。",
          "en": "I draw up contracts and so on."
        }
      ],
      "items": [
        {
          "ja": "ぎんこう＿＿　作[つく]りました。",
          "answer": "を",
          "options": [
            "を",
            "が",
            "に",
            "は"
          ]
        },
        {
          "ja": "女子大学[じょしだいがく]を　＿＿＿＿＿＿。",
          "answer": "作[つく]りたいです",
          "options": [
            "作[つく]りたいです",
            "作[つく]りました",
            "作[つく]ります"
          ]
        }
      ],
      "need": [
        [
          "を"
        ],
        [
          "作りました",
          "つくりました"
        ]
      ]
    },
    {
      "id": "shikashi",
      "pat": "しかし",
      "title_en": "However",
      "rule": "Starts a sentence and turns it against the one before. The articles use it for the hinge: where someone lived, then where they live now; what they were, then what they became.",
      "form": "sentence 。 しかし、 sentence",
      "egs": [
        {
          "ja": "とさに　住[す]んでいました。しかし、今[いま]は　ながさきに　住[す]んでいます。",
          "en": "I lived in Tosa. However, now I live in Nagasaki."
        },
        {
          "ja": "私[わたし]は　さむらいでした。しかし、みつびしの　しゃちょうに　なりました。",
          "en": "I was a samurai. However, I became the head of Mitsubishi."
        }
      ],
      "items": [
        {
          "ja": "さつまに　住[す]んでいました。＿＿＿＿、今[いま]は　東京[とうきょう]に　住[す]んでいます。",
          "answer": "しかし",
          "options": [
            "しかし",
            "だから",
            "でも、そして",
            "それから"
          ]
        },
        {
          "ja": "たくさんの　科学者[かがくしゃ]が　作[つく]ろうと　しました＿＿、なかなか　できませんでした。",
          "answer": "が",
          "options": [
            "が",
            "から",
            "ので",
            "と"
          ]
        }
      ],
      "need": [
        [
          "しかし"
        ]
      ],
      "re": "。[\\s　]*しかし"
    },
    {
      "id": "shourai",
      "pat": "しょうらい",
      "title_en": "In the future",
      "rule": "Sets up what someone wants next, and almost always runs into a 〜たいです. Every article ends on it, which is why the last sentence of a new one is usually guessable.",
      "form": "しょうらい、 ... 〜たいです",
      "egs": [
        {
          "ja": "しょうらい、外国[がいこく]に　行[い]きたいです。",
          "en": "In the future I want to go overseas."
        },
        {
          "ja": "しょう来[らい]、さつまに　帰[かえ]りたいです。",
          "en": "In the future I want to go back to Satsuma."
        }
      ],
      "items": [
        {
          "ja": "＿＿＿＿＿、けんどうの　先生[せんせい]に　なりたいです。",
          "answer": "しょうらい",
          "options": [
            "しょうらい",
            "毎日[まいにち]",
            "今[いま]",
            "時々[ときどき]"
          ]
        },
        {
          "ja": "しょうらい、しずかな　ところに　＿＿＿＿＿＿。",
          "answer": "住[す]みたいです",
          "options": [
            "住[す]みたいです",
            "住[す]んでいます",
            "住[す]んでいました"
          ]
        }
      ],
      "need": [
        [
          "しょうらい"
        ],
        [
          "たいです"
        ]
      ]
    },
    {
      "id": "ikitai",
      "pat": "〜に　行[い]きたいです",
      "title_en": "Want to go somewhere",
      "rule": "Take the ます off 行[い]きます and put たい on. The place still takes に. The same move makes 帰[かえ]りたい and 住[す]みたい.",
      "form": "place + に + Vたいです",
      "egs": [
        {
          "ja": "外国[がいこく]に　行[い]きたいです。",
          "en": "I want to go overseas."
        },
        {
          "ja": "とても　行[い]きたいです。",
          "en": "I really want to go."
        },
        {
          "ja": "さつまに　帰[かえ]りたいです。",
          "en": "I want to go back to Satsuma."
        }
      ],
      "items": [
        {
          "ja": "外国[がいこく]に　行[い]き＿＿です。",
          "answer": "たい",
          "options": [
            "たい",
            "ました",
            "ます",
            "たかった"
          ]
        },
        {
          "ja": "えどに　＿＿＿＿＿＿。",
          "answer": "行[い]きたいです",
          "options": [
            "行[い]きたいです",
            "行[い]きました",
            "行[い]っています"
          ]
        }
      ],
      "need": [
        [
          "に"
        ],
        [
          "行きたい",
          "いきたい"
        ]
      ]
    },
    {
      "id": "naritai",
      "pat": "〜に　なりたいです",
      "title_en": "Want to become something",
      "rule": "What you want to become takes に, not を. なります is the verb for becoming, and なりました is how three of the articles say what someone turned into.",
      "form": "noun + に + なりたいです  (past: なりました)",
      "egs": [
        {
          "ja": "けんどうの　先生[せんせい]に　なりたいです。",
          "en": "I want to become a kendo teacher."
        },
        {
          "ja": "上手[じょうず]に　なりたいです。",
          "en": "I want to become good at it."
        },
        {
          "ja": "せいじ家[か]に　なりました。",
          "en": "I became a politician."
        }
      ],
      "items": [
        {
          "ja": "けんどうの　先生[せんせい]＿＿　なりたいです。",
          "answer": "に",
          "options": [
            "に",
            "を",
            "が",
            "で"
          ]
        },
        {
          "ja": "みつびしの　しゃちょうに　＿＿＿＿＿。",
          "answer": "なりました",
          "options": [
            "なりました",
            "なりたいです",
            "でした",
            "います"
          ]
        }
      ],
      "need": [
        [
          "に"
        ],
        [
          "なりたい",
          "なりました"
        ]
      ]
    },
    {
      "id": "nai-koto",
      "pat": "〜た　ことが　ありません",
      "title_en": "Have never done it",
      "rule": "Experience, not the past. 行[い]きました is I went; 行[い]ったことがありません is I have never been. Plain past, then ことが, then あります or ありません.",
      "form": "plain past (た form) + ことが + あります / ありません",
      "egs": [
        {
          "ja": "えどに　行[い]ったことが　ありません。",
          "en": "I have never been to Edo."
        },
        {
          "ja": "行[い]ったことが　あります。",
          "en": "I have been there.",
          "mine": true
        }
      ],
      "items": [
        {
          "ja": "えどに　行[い]った　ことが　＿＿＿＿＿＿。",
          "answer": "ありません",
          "options": [
            "ありません",
            "います",
            "でした",
            "じゃないです"
          ]
        },
        {
          "ja": "えどに　＿＿＿＿　ことが　ありません。",
          "answer": "行[い]った",
          "options": [
            "行[い]った",
            "行[い]きます",
            "行[い]って",
            "行[い]きたい"
          ]
        }
      ],
      "need": [
        [
          "ことが"
        ],
        [
          "ありません",
          "あります"
        ]
      ]
    },
    {
      "id": "wasuretai",
      "pat": "〜を　わすれたいです",
      "title_en": "Want to forget it",
      "rule": "The same たい as 行[い]きたい, on a verb that is doing something much heavier. Musashi uses it about Sekigahara, and it is the one place in these articles where the grammar carries a feeling.",
      "form": "thing + を + わすれたいです",
      "egs": [
        {
          "ja": "わすれたいです。",
          "en": "I want to forget it."
        },
        {
          "ja": "せっぷくも　しました。わすれたいです。",
          "en": "I even committed seppuku. I want to forget it."
        }
      ],
      "items": [
        {
          "ja": "わすれ＿＿です。",
          "answer": "たい",
          "options": [
            "たい",
            "ました",
            "ます",
            "ません"
          ]
        },
        {
          "ja": "せきがはらを　＿＿＿＿＿＿。",
          "answer": "わすれたいです",
          "options": [
            "わすれたいです",
            "わすれました",
            "おぼえたいです"
          ]
        }
      ],
      "need": [
        [
          "わすれたい"
        ]
      ]
    }
  ],
  "videos": [
    {
      "person": "saigo",
      "title": "Saigō Takamori: The Last Samurai",
      "url": "https://www.youtube.com/watch?v=16PD3ka1xHU",
      "questions": [
        "Describe Saigō's early life and background. What distinguished him from his contemporaries? (0:06–0:28)",
        "What role did he play in the overthrow of the Tokugawa Shogunate? (0:00–0:28)",
        "Explain the relationship between Saigō and his lord, Shimazu Nariakira. How did it influence his political actions? (1:19–2:33)",
        "What event led Saigō to contemplate seppuku? Who intervened? (1:29–1:52)",
        "What led to his exile on Amami Ōshima, and what was his status then? (2:17–2:41)",
        "How did his return to Satsuma affect his relationship with Shimazu Hisamitsu? (3:13–3:38)",
        "What changed in Japanese politics while he was away from Satsuma? (3:39–4:07)",
        "What was his position during the Boshin War, and his role in the surrender of Edo? (6:02–6:25)",
        "What was the impact of his private school on former samurai and the government? (10:16–10:42)",
        "Summarise the events leading to his final stand at Shiroyama, and the consequences. (12:24–13:20)"
      ]
    },
    {
      "person": "sakamoto",
      "title": "Sakamoto Ryōma",
      "url": "https://www.youtube.com/watch?v=MaigNoQ_Y7Q",
      "questions": []
    },
    {
      "person": "musashi",
      "title": "Miyamoto Musashi",
      "url": "https://www.youtube.com/watch?v=WolmBrbo9-U",
      "questions": []
    },
    {
      "person": "iwasaki",
      "title": "Iwasaki Yatarō and the founding of Mitsubishi",
      "url": "https://www.youtube.com/watch?v=g7BYkmDaMHs",
      "questions": []
    },
    {
      "person": "hirooka",
      "title": "Hirooka Asako",
      "url": "https://www.youtube.com/watch?v=5VLmRiVE96E",
      "questions": []
    }
  ],
  "frame": [
    {
      "id": "greet",
      "en": "Greet the class.",
      "note": "Start the way every one of these articles starts.",
      "from": "sakamoto",
      "model": "みなさん、おはようございます。",
      "need": [
        [
          "みなさん"
        ]
      ]
    },
    {
      "id": "name",
      "en": "Give your name.",
      "note": "は marks what the sentence is about, and です closes it.",
      "from": "sakamoto",
      "model": "私[わたし]の　名前[なまえ]は　さかもと　りょうまです。",
      "need": [
        [
          "私",
          "わたし"
        ],
        [
          "名前",
          "なまえ"
        ],
        [
          "です"
        ]
      ]
    },
    {
      "id": "born",
      "en": "Say what year you were born in.",
      "note": "The year takes に.",
      "from": "sakamoto",
      "model": "私は、1836年[ねん]に　生[う]まれました。",
      "need": [
        [
          "に"
        ],
        [
          "生まれました",
          "うまれました"
        ]
      ]
    },
    {
      "id": "age",
      "en": "Say how old you are.",
      "note": "才 after the number, then です.",
      "from": "sakamoto",
      "model": "25才[さい]です。",
      "need": [
        [
          "才",
          "さい"
        ],
        [
          "です"
        ]
      ]
    },
    {
      "id": "what",
      "en": "Say what you are.",
      "note": "No verb to conjugate: the thing, then です. Yours is probably 高校生.",
      "from": "hirooka",
      "model": "私[わたし]は　じぎょう家[か]　です。",
      "need": [
        [
          "です"
        ]
      ]
    },
    {
      "id": "live",
      "en": "Say where you live.",
      "note": "The place takes に, and 住んでいます is the living.",
      "from": "sakamoto",
      "model": "とさに　住[す]んでいます。",
      "need": [
        [
          "に"
        ],
        [
          "住んでいます",
          "すんでいます"
        ]
      ]
    },
    {
      "id": "suki",
      "en": "Say something you like doing.",
      "note": "Dictionary form, then ことが好きです.",
      "from": "iwasaki",
      "model": "ものを　売[う]ることが　好[す]きです。",
      "need": [
        [
          "ことが"
        ],
        [
          "好きです",
          "すきです"
        ]
      ]
    },
    {
      "id": "ato",
      "en": "Say what you do after breakfast, and two things you do.",
      "note": "た後 for the after, then 〜たり〜たりします for the two things.",
      "from": "sakamoto",
      "model": "あさごはんを　食[た]べた後[あと]、父[ちち]と　話[はな]したり、さんぽに　行[い]ったりします。",
      "need": [
        [
          "後",
          "あと"
        ],
        [
          "たり"
        ]
      ]
    },
    {
      "id": "shourai",
      "en": "Say what you want to become.",
      "note": "しょうらい opens it, になりたいです closes it.",
      "from": "sakamoto",
      "model": "しょうらい、けんどうの　先生[せんせい]に　なりたいです。",
      "need": [
        [
          "しょうらい",
          "しょう来"
        ],
        [
          "なりたいです"
        ]
      ]
    },
    {
      "id": "nai",
      "en": "Say somewhere you have never been.",
      "note": "しかし turns the paragraph, then 行ったことがありません.",
      "from": "sakamoto",
      "model": "しかし、えどに　行[い]ったことが　ありません。",
      "need": [
        [
          "しかし"
        ],
        [
          "ことがありません"
        ]
      ]
    },
    {
      "id": "ikitai",
      "en": "Say you want to go there.",
      "note": "に行きたいです, and とても in front of it if you mean it.",
      "from": "sakamoto",
      "model": "とても　行きたいです。",
      "need": [
        [
          "行きたいです",
          "いきたいです"
        ]
      ]
    },
    {
      "id": "bye",
      "en": "Sign off.",
      "note": "The ordinary close. Every one of the six uses it.",
      "from": "sakamoto",
      "model": "よろしく　おねがいします。",
      "need": [
        [
          "よろしく"
        ]
      ]
    }
  ],
  "say": {
    "じぎょう家": "じぎょうか",
    "せいじ家": "せいじか",
    "食べた後": "たべたあと",
    "ごはんの後で": "ごはんのあとで",
    "その後": "そのあと",
    "子どもの時": "こどものとき",
    "こどもの時": "こどものとき",
    "時々": "ときどき",
    "5時半": "ごじはん",
    "6時半": "ろくじはん",
    "6時": "ろくじ",
    "６時": "ろくじ",
    "上手": "じょうず",
    "三人": "さんにん",
    "日本人": "にほんじん",
    "日本": "にほん",
    "世界中": "せかいじゅう",
    "今年": "ことし",
    "五十才": "ごじゅっさい",
    "二千十四年": "にせんじゅうよねん",
    "すごい物": "すごいもの",
    "赤崎": "あかさき",
    "何ですか": "なんですか",
    "何を": "なにを",
    "何が": "なにが",
    "私": "わたし"
  },
  "nyuuryoku": {
    "intro": "Windows 11 can type Japanese, but it does not out of the box. Five minutes, once, and the school laptop types かな and 漢字 for the rest of the year.",
    "steps": [
      {
        "n": 1,
        "head": "Add Japanese to Windows",
        "lines": [
          "Press the Windows key and I together to open Settings.",
          "Go to Time & language, then Language & region.",
          "Beside Preferred languages, choose Add a language.",
          "Type Japanese or 日本語, pick it, then Next and Install."
        ],
        "note": "Leave the Windows display language as English. You are adding a keyboard, not changing the computer into Japanese.",
        "keys": [
          "⊞ Win",
          "I"
        ]
      },
      {
        "n": 2,
        "head": "Switch the keyboard to Japanese",
        "lines": [
          "Look at the bottom right of the taskbar, near the clock. It now says ENG or JPN.",
          "Hold the Windows key and tap Space to move between them.",
          "Choose JPN."
        ],
        "note": "The switch is per window. A new window can come back as ENG, so check the taskbar before you start typing.",
        "keys": [
          "⊞ Win",
          "Space"
        ]
      },
      {
        "n": 3,
        "head": "Turn hiragana on",
        "lines": [
          "With JPN chosen, the taskbar shows either A or あ.",
          "A means it is still typing English letters.",
          "あ means it is typing kana. Click the letter to toggle it."
        ],
        "note": "The keyboard shortcut is Alt and the ` key, the one above Tab. This is the step most people miss: JPN is selected, the indicator still says A, and nothing comes out in kana.",
        "keys": [
          "Alt",
          "`"
        ]
      },
      {
        "n": 4,
        "head": "Type, then convert",
        "lines": [
          "Type the sounds in rōmaji and the kana appear as you go: nihon becomes にほん.",
          "Press Space to turn the kana into kanji: 日本.",
          "Press Space again to see other kanji with the same reading.",
          "Press Enter to accept what is shown."
        ],
        "note": "Until you press Enter the word is still being chosen, and it is underlined to say so.",
        "keys": [
          "Space",
          "Enter"
        ]
      },
      {
        "n": 5,
        "head": "The three that catch everyone",
        "lines": [
          "Small っ: double the next consonant. kitte gives きって.",
          "ん on its own: type nn. konnnichiha is awkward, so type konnichiha and check.",
          "を the particle: type wo, not o."
        ],
        "note": "さん after a name is sann? No: san gives さん on its own, but inside a word type nn when the next letter is a vowel.",
        "keys": []
      }
    ],
    "check": {
      "head": "Check it is working",
      "say": "Type anything Japanese below. This box does not keep what you write and does not send it anywhere; it only looks at what kind of characters came out."
    },
    "links": [
      {
        "name": "Microsoft's own page on the Japanese IME",
        "url": "https://learn.microsoft.com/en-us/globalization/input/japanese-ime",
        "what": "The keyboard itself, written by the people who made it."
      },
      {
        "name": "Install the Japanese keyboard on Windows 11",
        "url": "https://www.youtube.com/watch?v=lvH9ulLvaZA",
        "what": "Watch this if step 1 does not look the way it reads here."
      },
      {
        "name": "Type Japanese on a normal keyboard",
        "url": "https://www.youtube.com/watch?v=VjZ4E-cdHZA",
        "what": "Start at 2 minutes 30, where the typing begins."
      },
      {
        "name": "Every sound, in detail",
        "url": "https://www.youtube.com/watch?v=to8QUll9_gM",
        "what": "Longer. Use it for the sounds step 5 warns about."
      }
    ]
  }
};
