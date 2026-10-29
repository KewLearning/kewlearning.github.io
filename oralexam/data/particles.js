/* particles.js — particle accuracy, by recognition rather than recall.

   Andrew: students have trouble remembering when to use particles
   accurately. The Grammar Hub already drills this by typing the particle
   in; this drills the other half, spotting the wrong one, which is what
   you have to do to your own sentence while you are speaking.

     choose  one gap, four particles
     judge   a whole sentence, right or wrong, and the fix if it is wrong

   The が verbs are over-represented on purpose: 好きです、上手です and
   できます taking を is one of the faults the VCAA oral exam reports keep
   naming.

   One window. line, then pure JSON. No comments inside the object.       */

window.ORAL_PARTICLES = {
  "schema_version": 1,
  "rounds": [
    {
      "id": "pt-choose",
      "kind": "choose",
      "title": "Which particle?",
      "about": "One gap, four particles. The wrong ones are the ones students actually put there.",
      "items": [
        {
          "before": "わたし",
          "answer": "は",
          "after": "十二年生[じゅうにねんせい]です。",
          "en": "I am in Year 12.",
          "options": [
            "は",
            "が",
            "を",
            "に"
          ],
          "why": "は marks what the sentence is about."
        },
        {
          "before": "毎日[まいにち] 電車[でんしゃ]",
          "answer": "で",
          "after": "学校[がっこう]に 行[い]きます。",
          "en": "I go to school by train every day.",
          "options": [
            "で",
            "に",
            "を",
            "と"
          ],
          "why": "で is the means: by train, by bus, in Japanese."
        },
        {
          "before": "日本語[にほんご]",
          "answer": "が",
          "after": "好[す]きです。",
          "en": "I like Japanese.",
          "options": [
            "が",
            "を",
            "は",
            "に"
          ],
          "why": "好きです takes が, not を. This is the slip the reports name most."
        },
        {
          "before": "七時[しちじ]",
          "answer": "に",
          "after": "おきます。",
          "en": "I get up at seven.",
          "options": [
            "に",
            "で",
            "を",
            "から"
          ],
          "why": "A clock time takes に."
        },
        {
          "before": "友[とも]だち",
          "answer": "と",
          "after": "えいがを 見[み]ました。",
          "en": "I saw a film with a friend.",
          "options": [
            "と",
            "に",
            "で",
            "も"
          ],
          "why": "と is with, for a person you did it alongside."
        },
        {
          "before": "学校[がっこう]",
          "answer": "まで",
          "after": "三十分[さんじゅっぷん]かかります。",
          "en": "It takes thirty minutes to get to school.",
          "options": [
            "まで",
            "から",
            "で",
            "に"
          ],
          "why": "から to まで: the start and the end of a stretch."
        },
        {
          "before": "ともだち",
          "answer": "に",
          "after": "メッセージを おくりました。",
          "en": "I sent a message to a friend.",
          "options": [
            "に",
            "と",
            "を",
            "で"
          ],
          "why": "The person who receives something takes に."
        },
        {
          "before": "テニス",
          "answer": "を",
          "after": "します。",
          "en": "I play tennis.",
          "options": [
            "を",
            "が",
            "に",
            "で"
          ],
          "why": "を marks what the verb is done to."
        },
        {
          "before": "日本[にほん]",
          "answer": "に",
          "after": "行[い]ったことが あります。",
          "en": "I have been to Japan.",
          "options": [
            "に",
            "で",
            "を",
            "から"
          ],
          "why": "に for where you go. で is where something happens."
        },
        {
          "before": "うち",
          "answer": "で",
          "after": "べんきょうします。",
          "en": "I study at home.",
          "options": [
            "で",
            "に",
            "を",
            "と"
          ],
          "why": "Where an action happens takes で."
        },
        {
          "before": "姉[あね]",
          "answer": "も",
          "after": "日本語[にほんご]を 習[なら]っています。",
          "en": "My older sister is learning Japanese too.",
          "options": [
            "も",
            "は",
            "が",
            "と"
          ],
          "why": "も replaces は or が; it never sits beside them."
        },
        {
          "before": "かばんの 中[なか]",
          "answer": "に",
          "after": "本[ほん]が あります。",
          "en": "There is a book in my bag.",
          "options": [
            "に",
            "で",
            "を",
            "から"
          ],
          "why": "Where something exists takes に with あります and います."
        },
        {
          "before": "母[はは]",
          "answer": "の",
          "after": "車[くるま]を 使[つか]いました。",
          "en": "I used my mother's car.",
          "options": [
            "の",
            "に",
            "を",
            "が"
          ],
          "why": "の joins two nouns: whose, or what kind."
        },
        {
          "before": "八時[はちじ]",
          "answer": "から",
          "after": "アルバイトが あります。",
          "en": "I have work from eight.",
          "options": [
            "から",
            "まで",
            "に",
            "で"
          ],
          "why": "から is the starting point, of a time or a place."
        }
      ]
    },
    {
      "id": "pt-judge",
      "kind": "judge",
      "title": "Right or wrong?",
      "about": "Read the sentence and decide. Spotting a wrong particle in somebody else's sentence is how you start catching it in your own.",
      "items": [
        {
          "ja": "わたしは すしが 好[す]きです。",
          "ok": true,
          "right": "",
          "why": "好きです takes が. This one is right.",
          "pair": "suki"
        },
        {
          "ja": "わたしは すしを 好[す]きです。",
          "ok": false,
          "right": "わたしは すしが 好[す]きです。",
          "why": "好きです takes が, not を.",
          "pair": "suki"
        },
        {
          "ja": "学校[がっこう]に べんきょうします。",
          "ok": false,
          "right": "学校[がっこう]で べんきょうします。",
          "why": "An action happens で. に is for where you go or where something sits."
        },
        {
          "ja": "友[とも]だちに 会[あ]いました。",
          "ok": true,
          "right": "",
          "why": "会います takes に. This one is right.",
          "pair": "au"
        },
        {
          "ja": "友[とも]だちを 会[あ]いました。",
          "ok": false,
          "right": "友[とも]だちに 会[あ]いました。",
          "why": "会います takes に, even though in English you meet someone.",
          "pair": "au"
        },
        {
          "ja": "日本[にほん]へ 行[い]きたいです。",
          "ok": true,
          "right": "",
          "why": "へ and に both work for going somewhere."
        },
        {
          "ja": "電車[でんしゃ]に 乗[の]ります。",
          "ok": true,
          "right": "",
          "why": "乗ります takes に, not を.",
          "pair": "noru"
        },
        {
          "ja": "電車[でんしゃ]を 乗[の]ります。",
          "ok": false,
          "right": "電車[でんしゃ]に 乗[の]ります。",
          "why": "乗ります takes に. You get on to something.",
          "pair": "noru"
        },
        {
          "ja": "毎日[まいにち] 日本語[にほんご]も 勉強[べんきょう]します。",
          "ok": true,
          "right": "",
          "why": "も instead of を is fine when you mean Japanese as well."
        },
        {
          "ja": "わたしも 日本語[にほんご]が できます。",
          "ok": true,
          "right": "",
          "why": "できます takes が, and も replaces は.",
          "pair": "dekiru"
        },
        {
          "ja": "わたしは 日本語[にほんご]を できます。",
          "ok": false,
          "right": "わたしは 日本語[にほんご]が できます。",
          "why": "できます takes が, not を. Same rule as 好きです and 上手です.",
          "pair": "dekiru"
        },
        {
          "ja": "ペンで 書[か]いて ください。",
          "ok": true,
          "right": "",
          "why": "で for the thing you use."
        }
      ]
    }
  ]
};
