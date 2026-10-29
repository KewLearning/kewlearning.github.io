/* qwords.js — recognising the question word, and answering the question
   that was actually asked.

   This is the fault the VCAA oral exam reports name in every one of the six
   years: the answer does not match the question, and it comes from missing
   the question word rather than from weak Japanese. Two rounds:

     word    read or hear a question, say what it asks for
     reply   read or hear a question, pick the answer that fits. Every wrong
             option is a real sentence that answers a different question
             word, which is exactly how the marks go in the room.

   The question-word list came from a textbook Andrew uses. A list of
   question words is a fact about Japanese, but that book's exercise
   sentences are its own, so none of them appear here: every sentence below
   was written for this app and checked against the prescribed kanji list.

   One window. line, then pure JSON. No comments inside the object.       */

window.ORAL_QWORDS = {
  "schema_version": 1,
  "words": [
    {
      "id": "who",
      "ja": "だれ",
      "en": "who",
      "forms": "だれが、だれと、だれの"
    },
    {
      "id": "what",
      "ja": "何[なに]",
      "en": "what",
      "forms": "何を、何が、何ですか"
    },
    {
      "id": "where",
      "ja": "どこ",
      "en": "where",
      "forms": "どこで、どこに、どこから"
    },
    {
      "id": "when",
      "ja": "いつ",
      "en": "when",
      "forms": "いつ、何時[なんじ]に、何曜日[なんようび]に"
    },
    {
      "id": "why",
      "ja": "どうして",
      "en": "why",
      "forms": "どうして、なぜ"
    },
    {
      "id": "how",
      "ja": "どうやって",
      "en": "how",
      "forms": "どうやって、何[なに]で"
    },
    {
      "id": "howmany",
      "ja": "何回[なんかい]",
      "en": "how many times",
      "forms": "何回、何[なん]こ、何人[なんにん]"
    },
    {
      "id": "howlong",
      "ja": "どのぐらい",
      "en": "how long, how much",
      "forms": "どのぐらい、何日[なんにち]"
    },
    {
      "id": "whatkind",
      "ja": "どんな",
      "en": "what kind of",
      "forms": "どんな＋noun"
    },
    {
      "id": "which",
      "ja": "どの",
      "en": "which",
      "forms": "どの＋noun、どちら"
    },
    {
      "id": "howwas",
      "ja": "どう",
      "en": "what was it like",
      "forms": "どうでしたか、どう思[おも]いますか"
    },
    {
      "id": "howold",
      "ja": "何才[なんさい]",
      "en": "how old",
      "forms": "何才ですか"
    }
  ],
  "rounds": [
    {
      "id": "qw-word",
      "kind": "word",
      "title": "Which question word?",
      "about": "Listen or read, then say what the question is asking for. Not catching the question word is the fault the VCAA oral exam reports name in all six years.",
      "items": [
        {
          "ja": "しゅうまつに どこへ 行[い]きましたか。",
          "en": "Where did you go on the weekend?",
          "answer": "where"
        },
        {
          "ja": "だれと 行[い]きましたか。",
          "en": "Who did you go with?",
          "answer": "who"
        },
        {
          "ja": "どうして 日本語[にほんご]を 勉強[べんきょう]していますか。",
          "en": "Why are you studying Japanese?",
          "answer": "why"
        },
        {
          "ja": "どうやって 学校[がっこう]に 来[き]ましたか。",
          "en": "How did you get to school?",
          "answer": "how"
        },
        {
          "ja": "どんな おんがくが 好[す]きですか。",
          "en": "What kind of music do you like?",
          "answer": "whatkind"
        },
        {
          "ja": "週[しゅう]に 何回[なんかい] スポーツを しますか。",
          "en": "How many times a week do you play sport?",
          "answer": "howmany"
        },
        {
          "ja": "どのぐらい 日本語[にほんご]を 習[なら]っていますか。",
          "en": "How long have you been learning Japanese?",
          "answer": "howlong"
        },
        {
          "ja": "何時[なんじ]に 家[いえ]を 出[で]ますか。",
          "en": "What time do you leave the house?",
          "answer": "when"
        },
        {
          "ja": "きのうの パーティーは どうでしたか。",
          "en": "What was yesterday's party like?",
          "answer": "howwas"
        },
        {
          "ja": "どの かもくが 一番[いちばん] むずかしいですか。",
          "en": "Which subject is the hardest?",
          "answer": "which"
        },
        {
          "ja": "ひるごはんに 何[なに]を 食[た]べましたか。",
          "en": "What did you eat for lunch?",
          "answer": "what"
        },
        {
          "ja": "弟[おとうと]さんは 何才[なんさい]ですか。",
          "en": "How old is your younger brother?",
          "answer": "howold"
        },
        {
          "ja": "何曜日[なんようび]に アルバイトを しますか。",
          "en": "What day do you work?",
          "answer": "when"
        },
        {
          "ja": "だれが その しゃしんを とりましたか。",
          "en": "Who took that photograph?",
          "answer": "who"
        },
        {
          "ja": "日本[にほん]では どこに 行[い]きたいですか。",
          "en": "Where in Japan do you want to go?",
          "answer": "where"
        },
        {
          "ja": "なぜ その トピックを えらびましたか。",
          "en": "Why did you choose that topic?",
          "answer": "why"
        }
      ]
    },
    {
      "id": "qw-reply",
      "kind": "reply",
      "title": "Which answer fits?",
      "about": "Every wrong answer here is a real sentence that answers a different question word. That is exactly how marks go: the Japanese is fine and the answer is to another question.",
      "items": [
        {
          "ja": "いつ 日本語[にほんご]を 始[はじ]めましたか。",
          "en": "When did you start Japanese?",
          "options": [
            {
              "ja": "七年生[ななねんせい]の ときに 始[はじ]めました。",
              "en": "I started in Year 7",
              "ok": true,
              "why": ""
            },
            {
              "ja": "学校[がっこう]で 習[なら]っています。",
              "en": "I learn it at school",
              "ok": false,
              "why": "That answers どこ, where."
            },
            {
              "ja": "おもしろいからです。",
              "en": "Because it is interesting",
              "ok": false,
              "why": "That answers どうして, why."
            },
            {
              "ja": "先生[せんせい]に 習[なら]っています。",
              "en": "I learn it from my teacher",
              "ok": false,
              "why": "That answers だれに, from whom."
            }
          ]
        },
        {
          "ja": "どこで 日本語[にほんご]を 勉強[べんきょう]していますか。",
          "en": "Where do you study Japanese?",
          "options": [
            {
              "ja": "学校[がっこう]で 勉強[べんきょう]しています。",
              "en": "I study it at school",
              "ok": true,
              "why": ""
            },
            {
              "ja": "六年間[ろくねんかん] 勉強[べんきょう]しています。",
              "en": "I have studied it for six years",
              "ok": false,
              "why": "That answers どのぐらい, how long."
            },
            {
              "ja": "友[とも]だちと 勉強[べんきょう]しています。",
              "en": "I study with a friend",
              "ok": false,
              "why": "That answers だれと, with whom."
            },
            {
              "ja": "毎日[まいにち] 勉強[べんきょう]しています。",
              "en": "I study every day",
              "ok": false,
              "why": "That answers いつ, when."
            }
          ]
        },
        {
          "ja": "どうして アルバイトを していますか。",
          "en": "Why do you have a part-time job?",
          "options": [
            {
              "ja": "お金[かね]を ためたいからです。",
              "en": "Because I want to save money",
              "ok": true,
              "why": ""
            },
            {
              "ja": "週[しゅう]に 二回[にかい] しています。",
              "en": "Twice a week",
              "ok": false,
              "why": "That answers 何回, how many times."
            },
            {
              "ja": "店[みせ]で しています。",
              "en": "At a shop",
              "ok": false,
              "why": "That answers どこで, where."
            },
            {
              "ja": "土曜日[どようび]に しています。",
              "en": "On Saturdays",
              "ok": false,
              "why": "That answers いつ, when."
            }
          ]
        },
        {
          "ja": "しゅうまつに 何[なに]を しましたか。",
          "en": "What did you do on the weekend?",
          "options": [
            {
              "ja": "友[とも]だちと えいがを 見[み]ました。",
              "en": "I saw a film with a friend",
              "ok": true,
              "why": ""
            },
            {
              "ja": "とても 楽[たの]しかったです。",
              "en": "It was great fun",
              "ok": false,
              "why": "That answers どうでしたか, what it was like."
            },
            {
              "ja": "家[いえ]に いました。",
              "en": "I was at home",
              "ok": false,
              "why": "That answers どこに, where."
            },
            {
              "ja": "友[とも]だちと いました。",
              "en": "I was with a friend",
              "ok": false,
              "why": "That answers だれと, with whom."
            }
          ]
        },
        {
          "ja": "しゅうまつは どうでしたか。",
          "en": "What was your weekend like?",
          "options": [
            {
              "ja": "とても 楽[たの]しかったです。",
              "en": "It was great fun",
              "ok": true,
              "why": ""
            },
            {
              "ja": "友[とも]だちと えいがを 見[み]ました。",
              "en": "I saw a film with a friend",
              "ok": false,
              "why": "That answers 何をしましたか, what you did."
            },
            {
              "ja": "土曜日[どようび]と 日曜日[にちようび]です。",
              "en": "Saturday and Sunday",
              "ok": false,
              "why": "That answers いつ, when."
            },
            {
              "ja": "家[いえ]で すごしました。",
              "en": "I spent it at home",
              "ok": false,
              "why": "That answers どこで, where."
            }
          ]
        },
        {
          "ja": "どんな 本[ほん]を 読[よ]みますか。",
          "en": "What kind of books do you read?",
          "options": [
            {
              "ja": "うみの 話[はなし]が 好[す]きです。",
              "en": "I like stories about the sea",
              "ok": true,
              "why": ""
            },
            {
              "ja": "月[つき]に 二[に]さつ 読[よ]みます。",
              "en": "Two a month",
              "ok": false,
              "why": "That answers 何さつ, how many."
            },
            {
              "ja": "夜[よる] 読[よ]みます。",
              "en": "I read at night",
              "ok": false,
              "why": "That answers いつ, when."
            },
            {
              "ja": "としょかんで 読[よ]みます。",
              "en": "I read at the library",
              "ok": false,
              "why": "That answers どこで, where."
            }
          ]
        },
        {
          "ja": "だれと 日本[にほん]に 行[い]きたいですか。",
          "en": "Who would you like to go to Japan with?",
          "options": [
            {
              "ja": "家族[かぞく]と 行[い]きたいです。",
              "en": "I would like to go with my family",
              "ok": true,
              "why": ""
            },
            {
              "ja": "来年[らいねん] 行[い]きたいです。",
              "en": "I would like to go next year",
              "ok": false,
              "why": "That answers いつ, when."
            },
            {
              "ja": "京都[きょうと]に 行[い]きたいです。",
              "en": "I would like to go to Kyoto",
              "ok": false,
              "why": "That answers どこに, where."
            },
            {
              "ja": "ひこうきで 行[い]きたいです。",
              "en": "I would like to go by plane",
              "ok": false,
              "why": "That answers どうやって, how."
            }
          ]
        },
        {
          "ja": "どのぐらい 日本語[にほんご]を 習[なら]っていますか。",
          "en": "How long have you been learning Japanese?",
          "options": [
            {
              "ja": "六年間[ろくねんかん] 習[なら]っています。",
              "en": "For six years",
              "ok": true,
              "why": ""
            },
            {
              "ja": "週[しゅう]に 三回[さんかい] 習[なら]っています。",
              "en": "Three times a week",
              "ok": false,
              "why": "That answers 何回, how many times."
            },
            {
              "ja": "七年生[ななねんせい]から 習[なら]っています。",
              "en": "Since Year 7",
              "ok": false,
              "why": "Close, but that answers いつから, since when."
            },
            {
              "ja": "学校[がっこう]で 習[なら]っています。",
              "en": "At school",
              "ok": false,
              "why": "That answers どこで, where."
            }
          ]
        },
        {
          "ja": "どうやって 学校[がっこう]に 行[い]きますか。",
          "en": "How do you get to school?",
          "options": [
            {
              "ja": "電車[でんしゃ]で 行[い]きます。",
              "en": "I go by train",
              "ok": true,
              "why": ""
            },
            {
              "ja": "八時[はちじ]に 行[い]きます。",
              "en": "I go at eight",
              "ok": false,
              "why": "That answers 何時に, what time."
            },
            {
              "ja": "友[とも]だちと 行[い]きます。",
              "en": "I go with a friend",
              "ok": false,
              "why": "That answers だれと, with whom."
            },
            {
              "ja": "近[ちか]いので 楽[らく]です。",
              "en": "It is close, so it is easy",
              "ok": false,
              "why": "That answers どうですか, what it is like."
            }
          ]
        },
        {
          "ja": "何才[なんさい]の ときに 日本語[にほんご]を 始[はじ]めましたか。",
          "en": "How old were you when you started Japanese?",
          "options": [
            {
              "ja": "十二才[じゅうにさい]の ときです。",
              "en": "When I was twelve",
              "ok": true,
              "why": ""
            },
            {
              "ja": "七年生[ななねんせい]の ときです。",
              "en": "In Year 7",
              "ok": false,
              "why": "Close, but that answers 何年生のとき, what year level."
            },
            {
              "ja": "六年間[ろくねんかん] 習[なら]っています。",
              "en": "I have learnt it for six years",
              "ok": false,
              "why": "That answers どのぐらい, how long."
            },
            {
              "ja": "小学校[しょうがっこう]で 始[はじ]めました。",
              "en": "I started at primary school",
              "ok": false,
              "why": "That answers どこで, where."
            }
          ]
        },
        {
          "ja": "週[しゅう]に 何回[なんかい] ピアノを れんしゅうしますか。",
          "en": "How many times a week do you practise the piano?",
          "options": [
            {
              "ja": "三回[さんかい]ぐらいです。",
              "en": "About three times",
              "ok": true,
              "why": ""
            },
            {
              "ja": "三年間[さんねんかん] 習[なら]っています。",
              "en": "I have learnt for three years",
              "ok": false,
              "why": "That answers どのぐらい, how long."
            },
            {
              "ja": "一時間[いちじかん]ぐらいです。",
              "en": "About an hour",
              "ok": false,
              "why": "That answers どのぐらいの時間, how long for."
            },
            {
              "ja": "家[いえ]で れんしゅうします。",
              "en": "I practise at home",
              "ok": false,
              "why": "That answers どこで, where."
            }
          ]
        },
        {
          "ja": "どの スポーツが 一番[いちばん] 好[す]きですか。",
          "en": "Which sport do you like best?",
          "options": [
            {
              "ja": "テニスが 一番[いちばん] 好[す]きです。",
              "en": "I like tennis best",
              "ok": true,
              "why": ""
            },
            {
              "ja": "スポーツが 好[す]きです。",
              "en": "I like sport",
              "ok": false,
              "why": "The question asks which one, so name it."
            },
            {
              "ja": "週[しゅう]に 二回[にかい] します。",
              "en": "Twice a week",
              "ok": false,
              "why": "That answers 何回, how many times."
            },
            {
              "ja": "友[とも]だちと します。",
              "en": "I play with friends",
              "ok": false,
              "why": "That answers だれと, with whom."
            }
          ]
        },
        {
          "ja": "日本[にほん]の 高校[こうこう]について どう 思[おも]いますか。",
          "en": "What do you think about Japanese senior schools?",
          "options": [
            {
              "ja": "ぶかつどうが 多[おお]くて たいへんだと 思[おも]います。",
              "en": "I think there is a lot of club activity and it is hard going",
              "ok": true,
              "why": ""
            },
            {
              "ja": "日本[にほん]に 高校[こうこう]が たくさん あります。",
              "en": "There are many senior schools in Japan",
              "ok": false,
              "why": "That is a fact, not an opinion. どう思いますか wants what you think."
            },
            {
              "ja": "高校生[こうこうせい]は 十五才[じゅうごさい]からです。",
              "en": "Senior school starts at fifteen",
              "ok": false,
              "why": "That answers 何才から, from what age."
            },
            {
              "ja": "ともだちから 聞[き]きました。",
              "en": "I heard it from a friend",
              "ok": false,
              "why": "That answers だれから, from whom."
            }
          ]
        },
        {
          "ja": "何曜日[なんようび]が 一番[いちばん] いそがしいですか。",
          "en": "Which day of the week is busiest?",
          "options": [
            {
              "ja": "水曜日[すいようび]です。",
              "en": "Wednesday",
              "ok": true,
              "why": ""
            },
            {
              "ja": "朝[あさ]が いそがしいです。",
              "en": "Mornings are busy",
              "ok": false,
              "why": "That answers いつ in general, not which day."
            },
            {
              "ja": "学校[がっこう]が いそがしいです。",
              "en": "School is busy",
              "ok": false,
              "why": "That answers どこ, where."
            },
            {
              "ja": "ぶかつどうが あるからです。",
              "en": "Because I have club",
              "ok": false,
              "why": "That answers どうして, why."
            }
          ]
        }
      ]
    }
  ]
};
