/* ============================================================================
   questions.js — the question bank for the VCE Japanese Second Language oral
   examination.
   ----------------------------------------------------------------------------
   Section 1, Conversation: questions about the student's own world and about
   their own contact with Japanese language and culture, across ten topic areas
   and all six question types.

   Section 2, Discussion: the questions never name a subtopic, because every
   student brings their own. They are grouped by the stage of the discussion
   they belong to, and their model answers are written against one worked
   example (わがし) so they have something concrete to show; `model_topic` names it.
   Five further worked subtopics are in `topic_sets`.

   Japanese in this file uses only the 200 kanji prescribed by the VCE Japanese
   Second Language Study Design (From 2020), page 14. Any word whose normal
   spelling needs a kanji outside that list is written in hiragana, so
   写真 is しゃしん, 文化 is ぶんか and 将来 is しょうらい. Every kanji carries its
   reading in the form 漢字[かんじ], stored here rather than generated at run
   time, and tools/validate.js re-checks both rules on every change.

   report_refs quote the VCE assessor reports 2020–2025, which are the source
   for the examiner tips in the app; the full set is in report_insights.js.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.ORAL_QUESTIONS = {
  "schema_version": 1,
  "question_types": [
    {
      "id": "factual",
      "en": "Factual",
      "about": "Information about your world, or about the practice. The assessors start here."
    },
    {
      "id": "personal",
      "en": "Personal",
      "about": "Your own experience. Give the detail, not just the fact."
    },
    {
      "id": "opinion",
      "en": "Opinion",
      "about": "What you think, with a reason attached using から or ので."
    },
    {
      "id": "comparison",
      "en": "Comparison",
      "about": "Japan and Australia, or then and now. The reports ask for this every year."
    },
    {
      "id": "hypothetical",
      "en": "Hypothetical",
      "about": "もし〜たら. The reports name these as what separates the top band."
    },
    {
      "id": "evaluative",
      "en": "Evaluative",
      "about": "Good points, bad points, and a solution for the bad ones."
    }
  ],
  "conversation_topics": [
    {
      "id": "self",
      "ja": "自分[じぶん]の こと",
      "en": "You and where you live"
    },
    {
      "id": "family",
      "ja": "家族[かぞく]",
      "en": "Family"
    },
    {
      "id": "school",
      "ja": "学校[がっこう]の 生活[せいかつ]",
      "en": "School and subjects"
    },
    {
      "id": "friends",
      "ja": "友[とも]だち",
      "en": "Friends"
    },
    {
      "id": "hobbies",
      "ja": "しゅみ",
      "en": "Hobbies and free time"
    },
    {
      "id": "daily-work",
      "ja": "毎日[まいにち]の 生活[せいかつ]と アルバイト",
      "en": "Daily routine and part-time work"
    },
    {
      "id": "nihongo",
      "ja": "日本語[にほんご]の 勉強[べんきょう]",
      "en": "Learning Japanese"
    },
    {
      "id": "japan-culture",
      "ja": "日本[にほん]の ぶんか",
      "en": "Japanese culture and your contact with it"
    },
    {
      "id": "future",
      "ja": "しょうらい",
      "en": "Plans after school"
    },
    {
      "id": "world",
      "ja": "社会[しゃかい]と かんきょう",
      "en": "Society and the environment"
    }
  ],
  "discussion_stages": [
    {
      "id": "image",
      "ja": "しゃしん",
      "en": "Your image",
      "advice": "Open with it, and come back to it. Describing it is a middle-band answer."
    },
    {
      "id": "what-it-is",
      "ja": "どんな ものか",
      "en": "What it is",
      "advice": "Define it, and be ready to explain your own key words."
    },
    {
      "id": "history",
      "ja": "れきし",
      "en": "History and origin",
      "advice": "When it began, who began it, and why it began in Japan."
    },
    {
      "id": "who-and-when",
      "ja": "だれが、いつ",
      "en": "Who takes part and when",
      "advice": "Who does it, when in the year, and where in Japan."
    },
    {
      "id": "change",
      "ja": "かわったこと",
      "en": "How it has changed",
      "advice": "Then and now, and whether the change is a good one."
    },
    {
      "id": "values",
      "ja": "考[かんが]え方[かた]",
      "en": "What it shows about Japanese values",
      "advice": "What the practice says about how people think, with evidence."
    },
    {
      "id": "compare",
      "ja": "オーストラリアと くらべて",
      "en": "Comparison with Australia",
      "advice": "Same points, different points, and what would have to change here."
    },
    {
      "id": "personal",
      "ja": "自分[じぶん]の けいけん",
      "en": "Your own experience and opinion",
      "advice": "What you have actually done, and what you concluded from it."
    },
    {
      "id": "future",
      "ja": "これから",
      "en": "Its future",
      "advice": "Where it is heading, and whether it should be protected."
    }
  ],
  "questions": [
    {
      "id": "c-self-01",
      "section": "conversation",
      "phase": "personal",
      "topic": "self",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "今[いま]、何年生[なんねんせい]ですか。",
      "question_en": "What year level are you in now?",
      "followups": [
        {
          "ja": "どんな 学校[がっこう]ですか。",
          "en": "What kind of school is it?",
          "model": {
            "ja": "大[おお]きい 高校[こうこう]です。学生[がくせい]が 千人[せんにん]ぐらい いて、せいふくも あります。",
            "en": "It is a big secondary school. There are about a thousand students and we have a uniform."
          }
        },
        {
          "ja": "クラスは 何人[なんにん]ぐらい いますか。",
          "en": "About how many people are in your class?",
          "model": {
            "ja": "二十五人[にじゅうごにん]ぐらい います。日本語[にほんご]の クラスは もっと 少[すく]ないです。",
            "en": "About twenty-five. My Japanese class is smaller than that."
          }
        },
        {
          "ja": "学校[がっこう]まで どうやって 行[い]きますか。",
          "en": "How do you get to school?",
          "model": {
            "ja": "電車[でんしゃ]で 行[い]きます。家[いえ]から 三十分[さんじゅっぷん]ぐらい かかります。",
            "en": "I go by train. It takes about thirty minutes from my house."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "十二年生[じゅうにねんせい]です。",
          "en": "I am in Year 12."
        },
        "developed": {
          "ja": "今[いま]、十二年生[じゅうにねんせい]です。メルボルンの 高校[こうこう]に 行[い]っています。",
          "en": "I am in Year 12 now. I go to a high school in Melbourne."
        },
        "advanced": {
          "ja": "今[いま]、十二年生[じゅうにねんせい]です。メルボルンの 高校[こうこう]に 六年間[ろくねんかん] 行[い]っていますが、来年[らいねん]は 大学[だいがく]に 行[い]きたいと 思[おも]っています。",
          "en": "I am in Year 12 now. I have been at my high school in Melbourne for six years, but next year I would like to go to university."
        }
      },
      "key_grammar": [
        "〜ています for a state that continues",
        "〜たいと思っています"
      ],
      "key_vocab": [
        {
          "ja": "何年生",
          "reading": "なんねんせい",
          "en": "what year level"
        },
        {
          "ja": "高校",
          "reading": "こうこう",
          "en": "senior secondary school"
        },
        {
          "ja": "六年間",
          "reading": "ろくねんかん",
          "en": "for six years"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2025: Many students did not recognise key question words, resulting in mismatched responses."
      ],
      "common_errors": [
        "err-question-words"
      ]
    },
    {
      "id": "c-self-02",
      "section": "conversation",
      "phase": "personal",
      "topic": "self",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "メルボルンは どんな 町[まち]ですか。",
      "question_en": "What kind of city is Melbourne?",
      "followups": [
        {
          "ja": "メルボルンの 一番[いちばん] いい点[てん]は 何[なん]ですか。",
          "en": "What is the best thing about Melbourne?",
          "model": {
            "ja": "カフェが 多[おお]いことだと 思[おも]います。友[とも]だちと よく 行[い]きます。",
            "en": "I think it is how many cafes there are. I often go with my friends."
          }
        },
        {
          "ja": "メルボルンは 住[す]みやすいですか。",
          "en": "Is Melbourne an easy place to live?",
          "model": {
            "ja": "はい、住[す]みやすいと 思[おも]います。電車[でんしゃ]や トラムが あるので、車[くるま]が なくても こまりません。",
            "en": "Yes, I think it is easy to live in. There are trains and trams, so you manage without a car."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "メルボルンは 大[おお]きい 町[まち]です。",
          "en": "Melbourne is a big city."
        },
        "developed": {
          "ja": "メルボルンは 大[おお]きくて、にぎやかな 町[まち]です。電車[でんしゃ]や トラムが あるので、とても べんりです。",
          "en": "Melbourne is a big, lively city. There are trains and trams, so it is very convenient."
        },
        "advanced": {
          "ja": "メルボルンは 大[おお]きくて、こうえんも 広[ひろ]いので、住[す]みやすい 町[まち]だと 思[おも]います。でも、天気[てんき]が よく かわるので、少[すこ]し こまります。",
          "en": "Melbourne is big and the parks are large, so I think it is an easy city to live in. But the weather changes often, which is a bit of a nuisance."
        }
      },
      "key_grammar": [
        "〜に住んでいます",
        "くて joining two い-adjectives",
        "〜やすい"
      ],
      "key_vocab": [
        {
          "ja": "住む",
          "reading": "すむ",
          "en": "to live, to reside"
        },
        {
          "ja": "いい点",
          "reading": "いいてん",
          "en": "good point"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2022: Some errors were noted in basic adjective agreements, especially when using くて to join い adjectives."
      ],
      "common_errors": [
        "err-adj-conj"
      ]
    },
    {
      "id": "c-self-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "self",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "毎朝[まいあさ]、何時[なんじ]に おきますか。",
      "question_en": "What time do you get up every morning?",
      "followups": [
        {
          "ja": "朝[あさ]ごはんは 何[なに]を 食[た]べますか。",
          "en": "What do you eat for breakfast?",
          "model": {
            "ja": "たいてい トーストと たまごを 食[た]べます。いそがしい 時[とき]は くだものだけです。",
            "en": "Usually toast and eggs. When I am in a hurry I just have fruit."
          }
        },
        {
          "ja": "朝[あさ] 早[はや]く おきるのは たいへんですか。",
          "en": "Is getting up early hard?",
          "model": {
            "ja": "冬[ふゆ]は たいへんです。でも、朝[あさ]の 電車[でんしゃ]は しずかなので、本[ほん]が 読[よ]めます。",
            "en": "In winter it is hard. But the morning train is quiet, so I can read."
          }
        },
        {
          "ja": "週[しゅう]まつも 同[おな]じ 時間[じかん]に おきますか。",
          "en": "Do you get up at the same time on the weekend too?",
          "model": {
            "ja": "いいえ、週[しゅう]まつは 九時[くじ]ごろ おきます。土曜日[どようび]は アルバイトが あるので、おそく なりません。",
            "en": "No, at the weekend I get up about nine. I have my job on Saturday, so I do not sleep in."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "七時[しちじ]に おきます。",
          "en": "I get up at seven o'clock."
        },
        "developed": {
          "ja": "毎朝[まいあさ] 七時[しちじ]に おきて、八時[はちじ]に 家[いえ]を 出[で]ます。それから 電車[でんしゃ]で 学校[がっこう]に 行[い]きます。",
          "en": "I get up at seven every morning and leave the house at eight. Then I go to school by train."
        },
        "advanced": {
          "ja": "いつも 七時[しちじ]に おきますが、テストの 前[まえ]は 六時[ろくじ]に おきて 勉強[べんきょう]します。朝[あさ] 早[はや]く おきると、しずかなので、夜[よる]より 勉強[べんきょう]しやすいと 思[おも]います。",
          "en": "I usually get up at seven, but before a test I get up at six and study. When I get up early it is quiet, so I think it is easier to study than at night."
        }
      },
      "key_grammar": [
        "〜て for sequencing",
        "〜と for a clear if or when result",
        "〜より comparison"
      ],
      "key_vocab": [
        {
          "ja": "毎朝",
          "reading": "まいあさ",
          "en": "every morning"
        },
        {
          "ja": "出る",
          "reading": "でる",
          "en": "to leave, to go out"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2020: Students need to be familiar with a range of question words, including どうやって、どうして、なぜ、いつ、どこ、どのぐらい."
      ],
      "common_errors": [
        "err-question-words"
      ]
    },
    {
      "id": "c-self-04",
      "section": "conversation",
      "phase": "personal",
      "topic": "self",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "自分[じぶん]の 町[まち]で、一番[いちばん] かえたい ところは どこですか。",
      "question_en": "What would you most like to change about your own suburb?",
      "followups": [
        {
          "ja": "どうして そう 思[おも]いますか。",
          "en": "Why do you think that?",
          "model": {
            "ja": "夜[よる] バスが ないので、友[とも]だちは 家[いえ]の 人[ひと]に 車[くるま]で むかえに 来[き]てもらいます。それは たいへんだと 思[おも]います。",
            "en": "Because there are no buses at night, my friends have to ask someone at home to drive out and collect them. I think that is hard."
          }
        },
        {
          "ja": "だれが それを かえられると 思[おも]いますか。",
          "en": "Who do you think could change it?",
          "model": {
            "ja": "町[まち]の やくしょだと 思[おも]います。でも、住[す]んでいる 人[ひと]が こえを 出[だ]さないと、かわらないと 思[おも]います。",
            "en": "The local council, I think. But nothing changes unless the people who live there speak up."
          }
        },
        {
          "ja": "メルボルンの ほかの 町[まち]と くらべて どうですか。",
          "en": "How does it compare with other parts of Melbourne?",
          "model": {
            "ja": "町[まち]の 中[なか]は 電車[でんしゃ]も トラムも 多[おお]くて べんりです。私[わたし]の 町[まち]は とおいので、バスだけです。",
            "en": "The inner city has plenty of trains and trams, so it is convenient. My suburb is far out, so we only have buses."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "バスが 少[すく]ないので、バスを ふやしたいです。",
          "en": "There are not many buses, so I would like more buses."
        },
        "developed": {
          "ja": "私[わたし]の 町[まち]は バスが 少[すく]なくて、夜[よる]は ぜんぜん ありません。だから、学生[がくせい]は 家[いえ]に 帰[かえ]るのが たいへんです。バスを もっと ふやした ほうが いいと 思[おも]います。",
          "en": "My suburb has few buses, and at night there are none at all. So it is hard for students to get home. I think they should put on more buses."
        },
        "advanced": {
          "ja": "一番[いちばん] かえたいのは こうつうです。私[わたし]の 町[まち]は バスが 少[すく]なくて、夜[よる]は 一時間[いちじかん]に 一回[いっかい]しか ありません。そのために、みんな 車[くるま]を 使[つか]います。もし バスが もっと 多[おお]かったら、くうきも きれいに なるし、お金[かね]も あまり つかわなく なると 思[おも]います。",
          "en": "What I would most like to change is transport. My suburb has few buses, and at night there is only one an hour. Because of that everyone uses a car. If there were more buses I think the air would get cleaner and people would spend less money too."
        }
      },
      "key_grammar": [
        "〜しかありません",
        "もし〜たら",
        "〜し listing reasons",
        "〜なくなる"
      ],
      "key_vocab": [
        {
          "ja": "町",
          "reading": "まち",
          "en": "town, suburb"
        },
        {
          "ja": "使う",
          "reading": "つかう",
          "en": "to use"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: Students tended to use familiar grammatical structures repeatedly. They are encouraged to use a wider variety of structures where appropriate: for example, relative clauses and making comparisons.",
        "2025: Most students were able to respond to いい点 and わるい点. The students who were more prepared were able to provide solutions for the わるい点."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-fam-01",
      "section": "conversation",
      "phase": "opener",
      "topic": "family",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "ご兄弟[きょうだい]は いますか。",
      "question_en": "Do you have any brothers or sisters?",
      "followups": [
        {
          "ja": "ご兄弟[きょうだい]は 何[なに]を していますか。",
          "en": "What do your brothers and sisters do?",
          "model": {
            "ja": "兄[あに]は 大学[だいがく]で けいざいを 勉強[べんきょう]しています。妹[いもうと]は 中学校[ちゅうがっこう]の 二年生[にねんせい]で、バスケットボールの チームに 入[はい]っています。",
            "en": "My brother studies economics at university. My sister is in Year 8 and plays in a basketball team."
          }
        },
        {
          "ja": "だれと 一番[いちばん] なかが いいですか。",
          "en": "Who are you closest to?",
          "model": {
            "ja": "妹[いもうと]と 一番[いちばん] なかが いいです。同[おな]じ テレビばんぐみが 好[す]きで、よく いっしょに 見[み]ます。",
            "en": "I am closest to my sister. We like the same television programmes and often watch them together."
          }
        },
        {
          "ja": "一人[ひとり]っ子[こ]の ほうが いいと 思[おも]いますか。",
          "en": "Do you think it is better to be an only child?",
          "model": {
            "ja": "いいえ、兄弟[きょうだい]が いる ほうが いいと 思[おも]います。けんかも しますが、こまった 時[とき]に 話[はな]を 聞[き]いてくれるからです。",
            "en": "No, I think it is better to have brothers and sisters. We argue, but they listen when something goes wrong."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、兄[あに]が 一人[ひとり]います。",
          "en": "Yes, I have one older brother."
        },
        "developed": {
          "ja": "兄[あに]が 一人[ひとり]と 妹[いもうと]が 一人[ひとり]います。兄[あに]は 大学生[だいがくせい]で、妹[いもうと]は 中学校[ちゅうがっこう]に 行[い]っています。",
          "en": "I have one older brother and one younger sister. My brother is a university student and my sister is at secondary school."
        },
        "advanced": {
          "ja": "兄[あに]が 一人[ひとり]と 妹[いもうと]が 一人[ひとり]います。兄[あに]は 大学[だいがく]で 勉強[べんきょう]していて、妹[いもうと]は まだ 中学生[ちゅうがくせい]です。兄[あに]と けんかすることも ありますが、こまった 時[とき]は いつも 話[はな]を 聞[き]いてくれます。",
          "en": "I have one older brother and one younger sister. My brother is studying at university and my sister is still at secondary school. I do fight with my brother sometimes, but when I am in trouble he always listens to me."
        }
      },
      "key_grammar": [
        "〜がいます",
        "〜こともあります",
        "〜てくれる"
      ],
      "key_vocab": [
        {
          "ja": "兄弟",
          "reading": "きょうだい",
          "en": "brothers and sisters"
        },
        {
          "ja": "兄",
          "reading": "あに",
          "en": "my older brother"
        },
        {
          "ja": "妹",
          "reading": "いもうと",
          "en": "my younger sister"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2023: 兄弟がいますか。 named in the report as a commonly misunderstood question.",
        "2024: Students need to develop a wide vocabulary and become familiar with common words such as 兄弟 and 楽器."
      ],
      "common_errors": [
        "err-vocab-gap",
        "err-family-humble"
      ]
    },
    {
      "id": "c-fam-02",
      "section": "conversation",
      "phase": "personal",
      "topic": "family",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "お父[とう]さんと お母[かあ]さんの お仕事[しごと]は 何[なん]ですか。",
      "question_en": "What are your father's and mother's jobs?",
      "followups": [
        {
          "ja": "どんな お仕事[しごと]か せつめいして ください。",
          "en": "Please explain what kind of job that is.",
          "model": {
            "ja": "父[ちち]は 高校[こうこう]で すうがくを 教[おし]えています。母[はは]は 病院[びょういん]で かんごしを しています。",
            "en": "My father teaches mathematics at a secondary school. My mother is a nurse at a hospital."
          }
        },
        {
          "ja": "同[おな]じ 仕事[しごと]を したいですか。",
          "en": "Would you like to do the same job?",
          "model": {
            "ja": "はい、私[わたし]も 先生[せんせい]に なりたいです。でも、小学校[しょうがっこう]の 先生[せんせい]が いいです。小[ちい]さい 子[こ]どもと 話[はな]すのが 好[す]きだからです。",
            "en": "Yes, I want to be a teacher too. But a primary teacher, because I like talking with young children."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "父[ちち]は 先生[せんせい]で、母[はは]は かんごしです。",
          "en": "My father is a teacher and my mother is a nurse."
        },
        "developed": {
          "ja": "父[ちち]は 高校[こうこう]の 先生[せんせい]で、すうがくを 教[おし]えています。母[はは]は 病院[びょういん]で 働[はたら]いています。",
          "en": "My father is a secondary teacher and teaches mathematics. My mother works at a hospital."
        },
        "advanced": {
          "ja": "父[ちち]は 高校[こうこう]の 先生[せんせい]で、すうがくを 教[おし]えています。母[はは]は 近[ちか]くの 病院[びょういん]で 働[はたら]いていて、朝[あさ] 早[はや]く 出[で]かけます。二人[ふたり]とも いそがしいですが、晩[ばん]ごはんは かならず 家族[かぞく]みんなで 食[た]べるように しています。",
          "en": "My father is a secondary teacher and teaches mathematics. My mother works at a nearby hospital and leaves early in the morning. They are both busy, but we make sure we always have dinner together as a family."
        }
      },
      "key_grammar": [
        "〜で linking two clauses",
        "〜ています",
        "〜ようにしています"
      ],
      "key_vocab": [
        {
          "ja": "父",
          "reading": "ちち",
          "en": "my father"
        },
        {
          "ja": "母",
          "reading": "はは",
          "en": "my mother"
        },
        {
          "ja": "働く",
          "reading": "はたらく",
          "en": "to work"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: Students should respond using words such as 父、母 rather than お父さん、お母さん.",
        "2023: They should use 母、父、弟 rather than お母さん、お父さん、弟さん."
      ],
      "common_errors": [
        "err-family-humble"
      ]
    },
    {
      "id": "c-fam-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "family",
      "question_type": "comparison",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "ご家族[かぞく]の 中[なか]で、だれに 一番[いちばん] にていますか。",
      "question_en": "Who in your family are you most like?",
      "followups": [
        {
          "ja": "どんな ところが にていますか。",
          "en": "In what way are you alike?",
          "model": {
            "ja": "二人[ふたり]とも 話[はな]すのが 好[す]きで、はじめて 会[あ]った 人[ひと]とも すぐに 話[はな]せます。",
            "en": "We both like talking, and we can both talk to someone the first time we meet them."
          }
        },
        {
          "ja": "ちがう ところは ありますか。",
          "en": "Is there anything that is different?",
          "model": {
            "ja": "母[はは]は 朝[あさ] 早[はや]く おきますが、私[わたし]は おきるのが にがてです。",
            "en": "My mother gets up early, and I am no good at getting up."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "母[はは]に にています。",
          "en": "I am like my mother."
        },
        "developed": {
          "ja": "母[はは]に 一番[いちばん] にていると 思[おも]います。二人[ふたり]とも 話[はな]すのが 好[す]きで、よく わらいます。",
          "en": "I think I am most like my mother. We both like talking and we laugh a lot."
        },
        "advanced": {
          "ja": "かおは 父[ちち]に にていますが、せいかくは 母[はは]に にていると 思[おも]います。母[はは]も 私[わたし]も 話[はな]すのが 好[す]きで、はじめて 会[あ]った 人[ひと]とも すぐに なかよく なれます。でも、父[ちち]の ほうが しずかなので、家[いえ]では たいてい 父[ちち]が 話[はなし]を 聞[き]いています。",
          "en": "My face is like my father's, but I think my personality is like my mother's. My mother and I both like talking, and we can get on with people straight away even when we have just met them. But my father is quieter, so at home he is usually the one listening."
        }
      },
      "key_grammar": [
        "〜に似ています",
        "〜のほうが comparison",
        "relative clause はじめて会った人"
      ],
      "key_vocab": [
        {
          "ja": "家族",
          "reading": "かぞく",
          "en": "family"
        },
        {
          "ja": "同じ",
          "reading": "おなじ",
          "en": "the same"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: Students tended to use familiar grammatical structures repeatedly. They are encouraged to use a wider variety of structures where appropriate: for example, relative clauses and making comparisons."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-fam-04",
      "section": "conversation",
      "phase": "personal",
      "topic": "family",
      "question_type": "hypothetical",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "もし 一人[ひとり]で 住[す]んだら、何[なに]が 一番[いちばん] たいへんだと 思[おも]いますか。",
      "question_en": "If you lived on your own, what do you think would be the hardest thing?",
      "followups": [
        {
          "ja": "今[いま]、家[いえ]で どんな 手[て]つだいを していますか。",
          "en": "What jobs do you do at home now?",
          "model": {
            "ja": "晩[ばん]ごはんの 後[あと]に おさらを 洗[あら]います。週[しゅう]まつは へやの そうじも します。",
            "en": "I wash the dishes after dinner. At the weekend I clean my room as well."
          }
        },
        {
          "ja": "大学[だいがく]に 入[はい]ったら、家[いえ]を 出[で]ますか。",
          "en": "Will you move out when you start university?",
          "model": {
            "ja": "いいえ、はじめは 家[いえ]から 大学[だいがく]に 行[い]きたいです。お金[かね]を ためてから、一人[ひとり]で 住[す]みたいと 思[おも]っています。",
            "en": "No, at first I want to travel to university from home. Once I have saved some money I would like to live on my own."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "りょうりが たいへんだと 思[おも]います。",
          "en": "I think cooking would be hard."
        },
        "developed": {
          "ja": "もし 一人[ひとり]で 住[す]んだら、りょうりが 一番[いちばん] たいへんだと 思[おも]います。今[いま]は 母[はは]が 毎日[まいにち] ごはんを 作[つく]ってくれるからです。",
          "en": "If I lived on my own I think cooking would be the hardest thing, because at the moment my mother cooks for me every day."
        },
        "advanced": {
          "ja": "一番[いちばん] たいへんなのは りょうりだと 思[おも]います。今[いま]は 母[はは]が 毎日[まいにち] 作[つく]ってくれるので、私[わたし]は おさらを 洗[あら]うだけです。でも、一人[ひとり]で 住[す]んだら、買[か]い物[もの]も そうじも ぜんぶ 自分[じぶん]で しなければ なりません。だから、今[いま]のうちに 少[すこ]しずつ 習[なら]っておきたいと 思[おも]っています。",
          "en": "I think the hardest thing would be cooking. At the moment my mother cooks every day, so all I do is wash the dishes. But if I lived alone I would have to do the shopping and the cleaning all by myself. So I would like to learn a little at a time while I am still at home."
        }
      },
      "key_grammar": [
        "もし〜たら",
        "〜てくれる",
        "〜なければなりません",
        "〜ておきたい"
      ],
      "key_vocab": [
        {
          "ja": "洗う",
          "reading": "あらう",
          "en": "to wash"
        },
        {
          "ja": "習う",
          "reading": "ならう",
          "en": "to learn"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: Some students were unable to respond to hypothetical questions such as, 'What would you include on the school lunch menu if it was available in Australia?'",
        "2025: Students could revise the correct use of the structure 'I think'; for example, 先生だと思います and おいしいと思います。"
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-sch-01",
      "section": "conversation",
      "phase": "personal",
      "topic": "school",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "今年[ことし]、日本語[にほんご]の ほかに どんな かもくを 勉強[べんきょう]しましたか。",
      "question_en": "What subjects other than Japanese did you study this year?",
      "followups": [
        {
          "ja": "その 中[なか]で 一番[いちばん] 好[す]きな かもくは 何[なん]ですか。",
          "en": "Which of them is your favourite subject?",
          "model": {
            "ja": "せいぶつが 一番[いちばん] 好[す]きです。じっけんが 多[おお]くて、おもしろいからです。",
            "en": "Biology is my favourite, because there are a lot of experiments and it is interesting."
          }
        },
        {
          "ja": "どうしてですか。",
          "en": "Why is that?",
          "model": {
            "ja": "ノートを 読[よ]むだけじゃ なくて、自分[じぶん]で じっけんを するからです。",
            "en": "Because you do not only read your notes, you do the experiments yourself."
          }
        },
        {
          "ja": "一番[いちばん] にがてな かもくは 何[なん]ですか。",
          "en": "Which subject are you weakest at?",
          "model": {
            "ja": "すうがくが 一番[いちばん] にがてです。父[ちち]が すうがくの 先生[せんせい]ですが、私[わたし]は あまり 上手[じょうず]じゃ ありません。",
            "en": "Mathematics is my weakest. My father teaches maths, but I am not much good at it."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "英語[えいご]と すうがくと せいぶつを 勉強[べんきょう]しました。",
          "en": "I studied English, mathematics and biology."
        },
        "developed": {
          "ja": "今年[ことし]は 英語[えいご]と すうがくと せいぶつと ちりを 勉強[べんきょう]しました。日本語[にほんご]も 入[い]れて、ぜんぶで 五[いつ]つです。",
          "en": "This year I studied English, mathematics, biology and geography. With Japanese, that is five subjects altogether."
        },
        "advanced": {
          "ja": "日本語[にほんご]の ほかに、英語[えいご]、すうがく、せいぶつ、ちりを 勉強[べんきょう]しました。その 中[なか]では せいぶつが 一番[いちばん] おもしろいです。じっけんが 多[おお]くて、ノートを 読[よ]むだけじゃ ないからです。",
          "en": "Other than Japanese I studied English, mathematics, biology and geography. Of those, biology is the most interesting, because there are a lot of experiments and it is not just reading notes."
        }
      },
      "key_grammar": [
        "〜のほかに",
        "listing with と",
        "〜だけじゃないからです"
      ],
      "key_vocab": [
        {
          "ja": "今年",
          "reading": "ことし",
          "en": "this year"
        },
        {
          "ja": "勉強",
          "reading": "べんきょう",
          "en": "study"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: 今年日本語のほかにどんな科目を勉強しましたか。 Some students answered 日本語はむずかしいです, which did not answer the question."
      ],
      "common_errors": [
        "err-question-words"
      ]
    },
    {
      "id": "c-sch-02",
      "section": "conversation",
      "phase": "opener",
      "topic": "school",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "今年[ことし]の 勉強[べんきょう]は どうでしたか。",
      "question_en": "How was your study this year?",
      "followups": [
        {
          "ja": "一番[いちばん] たいへんだったのは 何[なん]ですか。",
          "en": "What was the hardest part?",
          "model": {
            "ja": "時間[じかん]の 使[つか]い方[かた]が 一番[いちばん] たいへんでした。テストと アルバイトが 同[おな]じ 週[しゅう]に あると、こまりました。",
            "en": "Managing my time was the hardest part. When a test and my job fell in the same week it was difficult."
          }
        },
        {
          "ja": "来年[らいねん]は どう かえたいですか。",
          "en": "What would you like to change next year?",
          "model": {
            "ja": "来年[らいねん]は もっと 早[はや]く けいかくを 立[た]てたいです。毎晩[まいばん] おそくまで 勉強[べんきょう]しない ように します。",
            "en": "Next year I want to plan earlier. I will try not to study late every night."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "たいへんでしたが、楽[たの]しかったです。",
          "en": "It was hard, but it was enjoyable."
        },
        "developed": {
          "ja": "今年[ことし]の 勉強[べんきょう]は 去年[きょねん]より ずっと いそがしかったです。テストが 多[おお]くて、毎晩[まいばん] 二時間[にじかん]ぐらい 勉強[べんきょう]しました。",
          "en": "My study this year was much busier than last year. There were a lot of tests and I studied about two hours every night."
        },
        "advanced": {
          "ja": "今年[ことし]は いそがしかったですが、一番[いちばん] よく 勉強[べんきょう]した 年[とし]だったと 思[おも]います。はじめは 時間[じかん]の 使[つか]い方[かた]が わからなくて、毎晩[まいばん] おそくまで 勉強[べんきょう]していました。でも、けいかくを 立[た]てるように なってから、前[まえ]より 楽[らく]に なりました。",
          "en": "This year was busy, but I think it was the year I studied the best. At first I did not know how to use my time and I studied late every night. But after I started making a plan it became easier than before."
        }
      },
      "key_grammar": [
        "〜より comparison",
        "〜ようになりました",
        "〜てから",
        "past tense throughout"
      ],
      "key_vocab": [
        {
          "ja": "去年",
          "reading": "きょねん",
          "en": "last year"
        },
        {
          "ja": "使い方",
          "reading": "つかいかた",
          "en": "the way of using something"
        },
        {
          "ja": "立てる",
          "reading": "たてる",
          "en": "to set up, to make a plan"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: 今年の勉強はどうでしたか。 Some students answered by listing subjects, which did not answer the question.",
        "2022: Students should listen carefully for the tense used in the question and respond accordingly."
      ],
      "common_errors": [
        "err-question-words",
        "err-tense"
      ]
    },
    {
      "id": "c-sch-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "school",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "学校[がっこう]の 行事[ぎょうじ]の 中[なか]で、どんな 行事[ぎょうじ]が 好[す]きですか。",
      "question_en": "Which school events do you like?",
      "followups": [
        {
          "ja": "その 行事[ぎょうじ]で 何[なに]を しますか。",
          "en": "What do you do at that event?",
          "model": {
            "ja": "クラスで チームを 作[つく]って、一日中[いちにちじゅう] はしったり およいだり します。おうえんも します。",
            "en": "We make teams in our class and spend all day running and swimming. We cheer as well."
          }
        },
        {
          "ja": "日本[にほん]の 学校[がっこう]の 行事[ぎょうじ]に ついて 知[し]っていますか。",
          "en": "Do you know anything about school events in Japan?",
          "model": {
            "ja": "たいいくさいが あると 聞[き]きました。日本[にほん]の 学生[がくせい]は 前[まえ]から れんしゅうするので、オーストラリアより まじめだと 思[おも]います。",
            "en": "I have heard they have a sports festival. Japanese students practise beforehand, so I think it is more serious than ours."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "スポーツデーが 好[す]きです。",
          "en": "I like sports day."
        },
        "developed": {
          "ja": "スポーツデーが 一番[いちばん] 好[す]きです。クラスで チームを 作[つく]って、一日中[いちにちじゅう] 外[そと]で はしります。",
          "en": "Sports day is my favourite. We make teams in our class and run outside all day."
        },
        "advanced": {
          "ja": "スポーツデーが 一番[いちばん] 好[す]きです。クラスで チームを 作[つく]って、一日中[いちにちじゅう] 外[そと]で はしります。ふだん 話[はな]さない 人[ひと]とも 話[はな]せるので、クラスが 一[ひと]つに なります。日本[にほん]の 高校[こうこう]には たいいくさいが あると 聞[き]きましたが、オーストラリアの スポーツデーより まじめだと 思[おも]います。",
          "en": "Sports day is my favourite. We make teams in our class and run outside all day. I can talk with people I do not normally talk to, so the class comes together. I have heard that Japanese senior schools have a taiikusai, but I think it is more serious than an Australian sports day."
        }
      },
      "key_grammar": [
        "relative clause ふだん話さない人",
        "〜と聞きました",
        "〜より comparison"
      ],
      "key_vocab": [
        {
          "ja": "行事",
          "reading": "ぎょうじ",
          "en": "event"
        },
        {
          "ja": "作る",
          "reading": "つくる",
          "en": "to make"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: The pronunciation of katakana words, for example オーストラリア、メルボルン and サッカー.",
        "2024: The pronunciation of オーストラリア、メルボルン and レストラン is still problematic for some students."
      ],
      "common_errors": [
        "err-katakana"
      ]
    },
    {
      "id": "c-sch-04",
      "section": "conversation",
      "phase": "personal",
      "topic": "school",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "学校[がっこう]で スマホを 使[つか]っても いいと 思[おも]いますか。",
      "question_en": "Do you think phones should be allowed at school?",
      "followups": [
        {
          "ja": "どうして そう 思[おも]いますか。",
          "en": "Why do you think that?",
          "model": {
            "ja": "じゅぎょうの 時[とき]に メッセージが 来[く]ると、勉強[べんきょう]が できなく なるからです。",
            "en": "Because when a message arrives during class you stop being able to study."
          }
        },
        {
          "ja": "先生[せんせい]は 同[おな]じ 考[かんが]えだと 思[おも]いますか。",
          "en": "Do you think teachers would agree?",
          "model": {
            "ja": "先生[せんせい]は もっと きびしいと 思[おも]います。でも、しらべる 時[とき]は 使[つか]っても いいと 言[い]う 先生[せんせい]も います。",
            "en": "I think teachers are stricter. But some teachers say it is fine to use them for looking something up."
          }
        },
        {
          "ja": "いい点[てん]と わるい点[てん]を 教[おし]えてください。",
          "en": "Please tell me the good points and the bad points.",
          "model": {
            "ja": "いい点[てん]は、わからない ことばを すぐに しらべられる ことです。わるい点[てん]は、休[やす]み 時間[じかん]に だれも 話[はな]さなく なる ことです。",
            "en": "The good point is that you can look up a word you do not know straight away. The bad point is that nobody talks at break time any more."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "いいと 思[おも]います。しらべる 時[とき]に べんりだからです。",
          "en": "I think it is fine, because it is useful when you look something up."
        },
        "developed": {
          "ja": "じゅぎょうの 時[とき]は 使[つか]わない ほうが いいと 思[おも]います。でも、休[やす]み 時間[じかん]は 使[つか]っても いいと 思[おも]います。",
          "en": "I think they should not be used in class. But I think it is fine to use them at break time."
        },
        "advanced": {
          "ja": "いい点[てん]も わるい点[てん]も あると 思[おも]います。いい点[てん]は、わからない ことばを すぐに しらべられる ことです。わるい点[てん]は、メッセージが 来[く]ると、勉強[べんきょう]が できなく なる ことです。だから、じゅぎょうの 時[とき]は かばんに 入[い]れて、休[やす]み 時間[じかん]だけ 使[つか]う ルールが 一番[いちばん] いいと 思[おも]います。",
          "en": "I think there are good points and bad points. The good point is that you can look up a word you do not know straight away. The bad point is that when a message comes you cannot study any more. So I think the best rule is to put the phone in your bag during class and use it only at break time."
        }
      },
      "key_grammar": [
        "〜と思います after a plain form",
        "〜ことです",
        "〜と for a clear if or when result",
        "〜なくなる"
      ],
      "key_vocab": [
        {
          "ja": "考え",
          "reading": "かんがえ",
          "en": "idea, way of thinking"
        },
        {
          "ja": "わるい点",
          "reading": "わるいてん",
          "en": "bad point"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2023: おもしろいだと思います instead of おもしろいと思います.",
        "2025: Most students were able to respond to いい点 and わるい点. The students who were more prepared were able to provide solutions for the わるい点."
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-fri-01",
      "section": "conversation",
      "phase": "personal",
      "topic": "friends",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "友[とも]だちと 何[なに]を するのが 好[す]きですか。",
      "question_en": "What do you like doing with your friends?",
      "followups": [
        {
          "ja": "週[しゅう]に 何回[なんかい] 会[あ]いますか。",
          "en": "How many times a week do you meet?",
          "model": {
            "ja": "週[しゅう]に 二回[にかい]ぐらい 会[あ]います。学校[がっこう]の 後[あと]と 週[しゅう]まつです。",
            "en": "About twice a week, after school and at the weekend."
          }
        },
        {
          "ja": "どこで 会[あ]いますか。",
          "en": "Where do you meet?",
          "model": {
            "ja": "たいてい 町[まち]の カフェで 会[あ]います。駅[えき]の 近[ちか]くなので、べんりです。",
            "en": "Usually at a cafe in the city. It is near the station, so it is easy."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "えいがを 見[み]るのが 好[す]きです。",
          "en": "I like watching films."
        },
        "developed": {
          "ja": "友[とも]だちと カフェに 行[い]って、話[はな]すのが 一番[いちばん] 好[す]きです。週[しゅう]に 二回[にかい]ぐらい 会[あ]います。",
          "en": "What I like best is going to a cafe with my friends and talking. We meet about twice a week."
        },
        "advanced": {
          "ja": "友[とも]だちと 町[まち]の カフェに 行[い]って、二時間[にじかん]ぐらい 話[はな]すのが 一番[いちばん] 好[す]きです。週[しゅう]に 二回[にかい]ぐらい 会[あ]います。学校[がっこう]では いそがしくて ゆっくり 話[はな]せないので、外[そと]で 会[あ]う 時間[じかん]が たいせつだと 思[おも]います。",
          "en": "What I like best is going to a cafe in town with my friends and talking for a couple of hours. We meet about twice a week. At school we are busy and cannot talk properly, so I think the time we spend together outside school matters."
        }
      },
      "key_grammar": [
        "〜のが好きです",
        "週に〜回",
        "〜ので"
      ],
      "key_vocab": [
        {
          "ja": "友だち",
          "reading": "ともだち",
          "en": "friend"
        },
        {
          "ja": "会う",
          "reading": "あう",
          "en": "to meet"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2022: Some students did not understand more challenging question words such as 週に何回、何冊、おどろいたこと、びっくりしたこと and いやなこと."
      ],
      "common_errors": [
        "err-question-words"
      ]
    },
    {
      "id": "c-fri-02",
      "section": "conversation",
      "phase": "personal",
      "topic": "friends",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "いい 友[とも]だちとは どんな 人[ひと]だと 思[おも]いますか。",
      "question_en": "What kind of person do you think a good friend is?",
      "followups": [
        {
          "ja": "そんな 友[とも]だちが いますか。",
          "en": "Do you have a friend like that?",
          "model": {
            "ja": "はい、います。去年[きょねん] 私[わたし]が 病気[びょうき]に なった 時[とき]、毎日[まいにち] ノートを 持[も]ってきてくれました。",
            "en": "Yes, I do. When I was ill last year they brought me the notes every day."
          }
        },
        {
          "ja": "自分[じぶん]も そんな 友[とも]だちだと 思[おも]いますか。",
          "en": "Do you think you are that kind of friend yourself?",
          "model": {
            "ja": "まだ じゅうぶんじゃ ないと 思[おも]います。話[はな]を 聞[き]く 前[まえ]に 自分[じぶん]の 考[かんが]えを 言[い]ってしまうからです。",
            "en": "Not enough yet, I think, because I give my own opinion before I have listened."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "やさしい 人[ひと]だと 思[おも]います。",
          "en": "Someone kind, I think."
        },
        "developed": {
          "ja": "話[はな]を よく 聞[き]いてくれる 人[ひと]が いい 友[とも]だちだと 思[おも]います。こまった 時[とき]に たすけてくれるからです。",
          "en": "I think a good friend is someone who listens to you properly, because they help you when you are in trouble."
        },
        "advanced": {
          "ja": "いい 友[とも]だちとは、楽[たの]しい 時[とき]だけじゃなくて、こまった 時[とき]にも そばに いてくれる 人[ひと]だと 思[おも]います。一番[いちばん] なかが いい 友[とも]だちは、去年[きょねん] 私[わたし]が 病気[びょうき]に なった 時[とき]、毎日[まいにち] ノートを 持[も]ってきてくれました。だから、私[わたし]も 同[おな]じように したいと 思[おも]っています。",
          "en": "I think a good friend is someone who is there not only in the good times but also when you are in trouble. When I was sick last year my closest friend brought me the class notes every day. So I would like to do the same for others."
        }
      },
      "key_grammar": [
        "〜とは〜だと思います",
        "〜てくれる",
        "〜だけじゃなくて"
      ],
      "key_vocab": [
        {
          "ja": "なかがいい",
          "reading": "なかがいい",
          "en": "to be close, to get on well"
        },
        {
          "ja": "病気",
          "reading": "びょうき",
          "en": "illness"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2023: They did not know じきゅう、がっき、うんてんめんきょ、なかがいい、せんしゅ、読書、作家、じゅぎょう and 強い."
      ],
      "common_errors": [
        "err-vocab-gap"
      ]
    },
    {
      "id": "c-fri-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "friends",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "友[とも]だちと けんかしたことが ありますか。",
      "question_en": "Have you ever had an argument with a friend?",
      "followups": [
        {
          "ja": "どうやって なかなおりしましたか。",
          "en": "How did you make up?",
          "model": {
            "ja": "私[わたし]から 「ごめん」と 言[い]いました。その 後[あと]、いっしょに ひるごはんを 食[た]べて、前[まえ]と 同[おな]じに なりました。",
            "en": "I said sorry first. After that we had lunch together and things went back to how they were."
          }
        },
        {
          "ja": "その 時[とき]、どう かんじましたか。",
          "en": "How did you feel at the time?",
          "model": {
            "ja": "さびしかったです。話[はな]す 友[とも]だちが いないと、学校[がっこう]が 長[なが]く かんじました。",
            "en": "I felt lonely. With no friend to talk to, school felt long."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、あります。",
          "en": "Yes, I have."
        },
        "developed": {
          "ja": "中学[ちゅうがく]の 時[とき]、友[とも]だちと 小[ちい]さい ことで けんかしたことが あります。三日[みっか]ぐらい 話[はな]しませんでした。",
          "en": "When I was in junior secondary I had an argument with a friend over something small. We did not speak for about three days."
        },
        "advanced": {
          "ja": "中学[ちゅうがく]の 時[とき]、グループの しゅくだいで 友[とも]だちと けんかしたことが あります。おたがいに 自分[じぶん]の 考[かんが]えが 正[ただ]しいと 思[おも]っていました。でも、先生[せんせい]に 二人[ふたり]で 話[はな]しなさいと 言[い]われて、やっと おたがいの 気持[きも]ちが わかりました。その 時[とき]から、まず 聞[き]いてから 言[い]うように しています。",
          "en": "When I was in junior secondary I had an argument with a friend over group homework. We each thought our own idea was right. But the teacher told us to talk it over, and we finally understood how the other one felt. Since then I try to listen first and speak afterwards."
        }
      },
      "key_grammar": [
        "〜たことがあります",
        "〜と言われて",
        "〜てから",
        "〜ようにしています"
      ],
      "key_vocab": [
        {
          "ja": "考え",
          "reading": "かんがえ",
          "en": "idea"
        },
        {
          "ja": "正しい",
          "reading": "ただしい",
          "en": "correct, right"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2023: Some students misunderstood どんな、どの、どうやって、どうして and 兄弟がいますか。",
        "2023: Students should use the correct tense when responding to the assessor's questions."
      ],
      "common_errors": [
        "err-koto-ga-arimasu",
        "err-tense"
      ]
    },
    {
      "id": "c-fri-04",
      "section": "conversation",
      "phase": "personal",
      "topic": "friends",
      "question_type": "hypothetical",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "もし 日本[にほん]の 高校生[こうこうせい]が 友[とも]だちに なったら、何[なに]を したいですか。",
      "question_en": "If a Japanese senior student became your friend, what would you like to do?",
      "followups": [
        {
          "ja": "日本語[にほんご]で 話[はな]すのは しんぱいですか。",
          "en": "Would speaking in Japanese worry you?",
          "model": {
            "ja": "少[すこ]し しんぱいです。でも、まちがえても いいと 思[おも]うように しています。",
            "en": "A little. But I try to tell myself that making mistakes is fine."
          }
        },
        {
          "ja": "どんな ことを 聞[き]いてみたいですか。",
          "en": "What would you like to ask them about?",
          "model": {
            "ja": "ぶかつに ついて 聞[き]きたいです。毎日[まいにち] れんしゅうして、しゅくだいの 時間[じかん]が あるのか 知[し]りたいです。",
            "en": "I would like to ask about club activities. They train every day, and I want to know whether they still have time for homework."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "いっしょに かいものに 行[い]きたいです。",
          "en": "I would like to go shopping together."
        },
        "developed": {
          "ja": "もし 日本[にほん]の 高校生[こうこうせい]が 友[とも]だちに なったら、メルボルンを あんないしたいです。そして、日本[にほん]の 学校[がっこう]の 生活[せいかつ]に ついて 聞[き]きたいです。",
          "en": "If a Japanese senior student became my friend I would like to show them around Melbourne. And I would like to ask them about school life in Japan."
        },
        "advanced": {
          "ja": "もし 日本[にほん]の 高校生[こうこうせい]が 友[とも]だちに なったら、まず メルボルンの カフェに あんないしたいです。オーストラリアの コーヒーは ゆうめいだからです。それから、ぶかつに ついて 聞[き]いてみたいです。日本[にほん]の 高校生[こうこうせい]は 毎日[まいにち] ぶかつを すると 聞[き]きましたが、しゅくだいの 時間[じかん]が あるのか 知[し]りたいです。",
          "en": "If a Japanese senior student became my friend, first I would like to take them to a Melbourne cafe, because Australian coffee is famous. Then I would like to ask them about club activities. I have heard that Japanese senior students do club activities every day, so I want to know whether they have time for homework."
        }
      },
      "key_grammar": [
        "もし〜たら",
        "まず and それから as connectives",
        "〜てみたい",
        "〜のか知りたいです"
      ],
      "key_vocab": [
        {
          "ja": "ぶかつ",
          "reading": "ぶかつ",
          "en": "school club activity"
        },
        {
          "ja": "知る",
          "reading": "しる",
          "en": "to know"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2025: Higher-scoring responses used connectives effectively, including まず、つまり and じつは.",
        "2021: Successful responses provided opinions and responded to hypothetical questions."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-hob-01",
      "section": "conversation",
      "phase": "opener",
      "topic": "hobbies",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "しゅみは 何[なん]ですか。",
      "question_en": "What are your hobbies?",
      "followups": [
        {
          "ja": "いつから その しゅみを 始[はじ]めましたか。",
          "en": "When did you start that hobby?",
          "model": {
            "ja": "十才[じゅっさい]の 時[とき]から 始[はじ]めました。もう 八年[はちねん]に なります。",
            "en": "I started when I was ten, so it has been eight years."
          }
        },
        {
          "ja": "週[しゅう]に 何回[なんかい] しますか。",
          "en": "How many times a week do you do it?",
          "model": {
            "ja": "週[しゅう]に 三回[さんかい] れんしゅうします。しあいも 月[つき]に 二回[にかい]ぐらい あります。",
            "en": "I train three times a week. We also have matches about twice a month."
          }
        },
        {
          "ja": "どうして その しゅみが 好[す]きなのですか。",
          "en": "Why do you like that hobby?",
          "model": {
            "ja": "チームの 友[とも]だちに 会[あ]えるからです。体[からだ]を 動[うご]かすと、気持[きも]ちも 元気[げんき]に なります。",
            "en": "Because I get to see my team friends. Moving about makes me feel better as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "サッカーです。",
          "en": "Soccer."
        },
        "developed": {
          "ja": "しゅみは サッカーです。十才[じゅっさい]の 時[とき]から 始[はじ]めて、今[いま]も 週[しゅう]に 三回[さんかい] れんしゅうしています。",
          "en": "My hobby is soccer. I started when I was ten and I still train three times a week."
        },
        "advanced": {
          "ja": "しゅみは サッカーです。十才[じゅっさい]の 時[とき]に 近[ちか]くの チームに 入[はい]って、今[いま]も 週[しゅう]に 三回[さんかい] れんしゅうしています。はじめは 体[からだ]を 動[うご]かすのが 好[す]きだったからですが、今[いま]は チームの 友[とも]だちに 会[あ]えるのが 一番[いちばん] 楽[たの]しいです。",
          "en": "My hobby is soccer. I joined a local team when I was ten and I still train three times a week. At first it was because I liked being active, but now the best part is seeing my team mates."
        }
      },
      "key_grammar": [
        "〜から始めました",
        "週に〜回",
        "〜のが楽しいです"
      ],
      "key_vocab": [
        {
          "ja": "しゅみ",
          "reading": "しゅみ",
          "en": "hobby"
        },
        {
          "ja": "始める",
          "reading": "はじめる",
          "en": "to start something"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2022: Some errors were noted in the pronunciation of オーストラリア、クラシック and チーム.",
        "2025: Errors with katakana words included オーストラリア, アリバイト instead of アルバイト and サーフィング instead of サーフィン."
      ],
      "common_errors": [
        "err-katakana"
      ]
    },
    {
      "id": "c-hob-02",
      "section": "conversation",
      "phase": "personal",
      "topic": "hobbies",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "何[なに]か がっきが できますか。",
      "question_en": "Can you play a musical instrument?",
      "followups": [
        {
          "ja": "いつから ならっていますか。",
          "en": "How long have you been learning?",
          "model": {
            "ja": "七才[ななさい]から ならっているので、もう 十年[じゅうねん]ぐらいに なります。",
            "en": "I have been learning since I was seven, so it is about ten years now."
          }
        },
        {
          "ja": "どんな きょくを ひきますか。",
          "en": "What kind of pieces do you play?",
          "model": {
            "ja": "クラシックの きょくが 多[おお]いですが、さいきんは 日本[にほん]の アニメの きょくも ひきます。",
            "en": "Mostly classical pieces, but lately I play Japanese anime music as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "ピアノが 少[すこ]し できます。",
          "en": "I can play the piano a little."
        },
        "developed": {
          "ja": "ピアノが できます。七才[ななさい]の 時[とき]から ならっていて、今[いま]は 毎日[まいにち] 三十分[さんじゅっぷん]ぐらい れんしゅうします。",
          "en": "I can play the piano. I have been learning since I was seven, and now I practise about thirty minutes a day."
        },
        "advanced": {
          "ja": "ピアノが できます。七才[ななさい]から ならっているので、もう 十年[じゅうねん]ぐらいに なります。クラシックの きょくが 多[おお]いですが、さいきんは 日本[にほん]の アニメの きょくも ひくように なりました。ピアノを ひくと、気持[きも]ちが しずかに なります。",
          "en": "I can play the piano. I have been learning since I was seven, so it is about ten years now. Most of what I play is classical, but recently I have started playing music from Japanese anime too. When I play the piano I feel calm."
        }
      },
      "key_grammar": [
        "〜ができます",
        "〜ようになりました",
        "〜と for a clear if or when result"
      ],
      "key_vocab": [
        {
          "ja": "がっき",
          "reading": "がっき",
          "en": "musical instrument"
        },
        {
          "ja": "きょく",
          "reading": "きょく",
          "en": "a piece of music"
        },
        {
          "ja": "気持ち",
          "reading": "きもち",
          "en": "feeling"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2020: Some students did not understand vocabulary, including 困ったこと、がっき、きょく、海外旅行、読書.",
        "2024: Students need to develop a wide vocabulary and become familiar with common words such as 兄弟 and 楽器."
      ],
      "common_errors": [
        "err-vocab-gap"
      ]
    },
    {
      "id": "c-hob-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "hobbies",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "読書[どくしょ]は 好[す]きですか。",
      "question_en": "Do you like reading?",
      "followups": [
        {
          "ja": "月[つき]に 何[なん]さつ 読[よ]みますか。",
          "en": "How many books do you read a month?",
          "model": {
            "ja": "月[つき]に 二[に]さつぐらい 読[よ]みます。テストの 前[まえ]は 読[よ]む 時間[じかん]が ありません。",
            "en": "About two a month. Before a test I have no time to read."
          }
        },
        {
          "ja": "好[す]きな さっかは だれですか。",
          "en": "Who is your favourite author?",
          "model": {
            "ja": "オーストラリアの ミステリーの さっかが 好[す]きです。さいきんは 日本語[にほんご]の やさしい 本[ほん]も 読[よ]んでいます。",
            "en": "I like an Australian mystery writer. Lately I am also reading easy books in Japanese."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、好[す]きです。",
          "en": "Yes, I do."
        },
        "developed": {
          "ja": "読書[どくしょ]が 好[す]きです。月[つき]に 二[に]さつぐらい 読[よ]みます。ミステリーが 一番[いちばん] 好[す]きです。",
          "en": "I like reading. I read about two books a month. I like mysteries best."
        },
        "advanced": {
          "ja": "読書[どくしょ]が 好[す]きです。月[つき]に 二[に]さつぐらい 読[よ]みます。ミステリーが 一番[いちばん] 好[す]きで、オーストラリアの さっかの 本[ほん]を よく 読[よ]みます。さいきんは 日本語[にほんご]の やさしい 本[ほん]も 読[よ]んでみましたが、漢字[かんじ]が 多[おお]くて、まだ じしょを 使[つか]わなければ なりません。",
          "en": "I like reading. I read about two books a month. I like mysteries best and I often read Australian authors. Recently I tried an easy book in Japanese, but there were a lot of kanji and I still have to use a dictionary."
        }
      },
      "key_grammar": [
        "月に〜さつ",
        "〜てみました",
        "〜なければなりません"
      ],
      "key_vocab": [
        {
          "ja": "読書",
          "reading": "どくしょ",
          "en": "reading books"
        },
        {
          "ja": "さっか",
          "reading": "さっか",
          "en": "author"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2022: Some students did not understand more challenging question words such as 週に何回、何冊.",
        "2021: Other vocabulary that students should revise includes つづけます、えらびます、兄弟、作家."
      ],
      "common_errors": [
        "err-vocab-gap",
        "err-question-words"
      ]
    },
    {
      "id": "c-hob-04",
      "section": "conversation",
      "phase": "personal",
      "topic": "hobbies",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "しゅみは 生活[せいかつ]に ひつようだと 思[おも]いますか。",
      "question_en": "Do you think hobbies are necessary in life?",
      "followups": [
        {
          "ja": "時間[じかん]が ない 時[とき]、どう しますか。",
          "en": "What do you do when you have no time?",
          "model": {
            "ja": "少[すこ]しだけでも します。十五分[じゅうごふん] ピアノを ひくだけで、気持[きも]ちが かわります。",
            "en": "I still do a little. Fifteen minutes at the piano changes how I feel."
          }
        },
        {
          "ja": "しゅみと 勉強[べんきょう]、どちらが たいせつですか。",
          "en": "Which matters more, hobbies or study?",
          "model": {
            "ja": "どちらも たいせつだと 思[おも]います。しゅみの 時間[じかん]が あると、勉強[べんきょう]も よく できるからです。",
            "en": "Both matter, I think, because having time for a hobby makes my study go better."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、ひつようだと 思[おも]います。",
          "en": "Yes, I think they are necessary."
        },
        "developed": {
          "ja": "しゅみは ひつようだと 思[おも]います。勉強[べんきょう]だけ していると、つかれてしまうからです。しゅみが あると、気持[きも]ちが 元気[げんき]に なります。",
          "en": "I think hobbies are necessary, because if you only study you get worn out. When you have a hobby you feel better."
        },
        "advanced": {
          "ja": "しゅみは ぜったいに ひつようだと 思[おも]います。じつは、去年[きょねん] テストの 前[まえ]に サッカーを 二週間[にしゅうかん] 休[やす]んだことが あります。その 時[とき]、点[てん]は よく なりませんでしたし、気持[きも]ちも 元気[げんき]に なりませんでした。だから、いそがしい 時[とき]こそ しゅみの 時間[じかん]を 作[つく]った ほうが いいと 思[おも]います。",
          "en": "I think hobbies are absolutely necessary. In fact, before a test last year I took two weeks off soccer. My marks did not improve, and I did not feel any better either. So I think it is when you are busy that you should make time for a hobby."
        }
      },
      "key_grammar": [
        "じつは as a connective",
        "〜たことがあります",
        "〜し listing",
        "〜たほうがいい"
      ],
      "key_vocab": [
        {
          "ja": "点",
          "reading": "てん",
          "en": "mark, score"
        },
        {
          "ja": "休む",
          "reading": "やすむ",
          "en": "to rest, to take time off"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2025: Higher-scoring responses used connectives effectively, including まず、つまり and じつは.",
        "2025: Students could revise the correct use of the structure 'I think'; for example, 先生だと思います and おいしいと思います。"
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-day-01",
      "section": "conversation",
      "phase": "opener",
      "topic": "daily-work",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "毎日[まいにち]、どんな 生活[せいかつ]を していますか。",
      "question_en": "What is your daily life like?",
      "followups": [
        {
          "ja": "夜[よる]、何時[なんじ]に ねますか。",
          "en": "What time do you go to bed?",
          "model": {
            "ja": "たいてい 十時[じゅうじ]に ねます。テストの 前[まえ]は 十一時[じゅういちじ]ごろに なります。",
            "en": "Usually at ten. Before a test it becomes about eleven."
          }
        },
        {
          "ja": "一番[いちばん] いそがしい 日[ひ]は 何曜日[なんようび]ですか。",
          "en": "Which day of the week is your busiest?",
          "model": {
            "ja": "月曜日[げつようび]が 一番[いちばん] いそがしいです。学校[がっこう]の 後[あと]に サッカーの れんしゅうが あるからです。",
            "en": "Monday is my busiest, because I have soccer training after school."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "学校[がっこう]に 行[い]って、家[いえ]で 勉強[べんきょう]します。",
          "en": "I go to school and study at home."
        },
        "developed": {
          "ja": "毎朝[まいあさ] 七時[しちじ]に おきて、電車[でんしゃ]で 学校[がっこう]に 行[い]きます。学校[がっこう]が 終[お]わってから、二時間[にじかん]ぐらい 勉強[べんきょう]して、十時[じゅうじ]に ねます。",
          "en": "I get up at seven every morning and go to school by train. After school finishes I study for about two hours and go to bed at ten."
        },
        "advanced": {
          "ja": "毎朝[まいあさ] 七時[しちじ]に おきて、八時[はちじ]の 電車[でんしゃ]に 乗[の]ります。学校[がっこう]は 三時半[さんじはん]に 終[お]わりますが、月曜日[げつようび]と 木曜日[もくようび]は サッカーの れんしゅうが あるので、帰[かえ]るのが 六時[ろくじ]に なります。だから、しゅくだいは 晩[ばん]ごはんの 後[あと]に します。",
          "en": "I get up at seven every morning and catch the eight o'clock train. School finishes at half past three, but on Mondays and Thursdays I have soccer training, so I do not get home until six. That is why I do my homework after dinner."
        }
      },
      "key_grammar": [
        "〜て sequencing",
        "〜てから",
        "〜に乗ります",
        "〜の後に"
      ],
      "key_vocab": [
        {
          "ja": "生活",
          "reading": "せいかつ",
          "en": "daily life"
        },
        {
          "ja": "乗る",
          "reading": "のる",
          "en": "to get on, to ride"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: They provided sufficient information, but this information was not always sequenced well."
      ],
      "common_errors": [
        "err-te-form"
      ]
    },
    {
      "id": "c-day-02",
      "section": "conversation",
      "phase": "opener",
      "topic": "daily-work",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "アルバイトを していますか。週[しゅう]に 何回[なんかい]ですか。",
      "question_en": "Do you have a part-time job? How many times a week?",
      "followups": [
        {
          "ja": "アルバイトの お金[かね]で 何[なに]を しますか。",
          "en": "What do you do with the money from your job?",
          "model": {
            "ja": "はんぶんは ためて、はんぶんは 友[とも]だちと 出[で]かける 時[とき]に 使[つか]います。来年[らいねん]の ために ためています。",
            "en": "I save half and spend half when I go out with friends. I am saving for next year."
          }
        },
        {
          "ja": "アルバイトで 一番[いちばん] たいへんなことは 何[なん]ですか。",
          "en": "What is the hardest part of the job?",
          "model": {
            "ja": "土曜日[どようび]は おきゃくさんが とても 多[おお]くて、四時間[よじかん] ずっと 立[た]っています。",
            "en": "On Saturdays there are a great many customers and I am on my feet for the whole four hours."
          }
        },
        {
          "ja": "アルバイトと 勉強[べんきょう]の りょうほうが できますか。",
          "en": "Can you manage both the job and your study?",
          "model": {
            "ja": "できますが、けいかくが ひつようです。日曜日[にちようび]の 夜[よる]に しゅくだいを します。",
            "en": "I can, but it takes planning. I do my homework on Sunday night."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、しています。週[しゅう]に 二回[にかい]です。",
          "en": "Yes, I do. Twice a week."
        },
        "developed": {
          "ja": "スーパーで アルバイトを しています。週[しゅう]に 二回[にかい]、土曜日[どようび]と 日曜日[にちようび]に 四時間[よじかん]ずつ 働[はたら]きます。",
          "en": "I work at a supermarket. Twice a week, four hours each on Saturday and Sunday."
        },
        "advanced": {
          "ja": "近[ちか]くの スーパーで アルバイトを しています。週[しゅう]に 二回[にかい]、土曜日[どようび]と 日曜日[にちようび]に 四時間[よじかん]ずつ 働[はたら]きます。じきゅうは あまり 高[たか]くないですが、おきゃくさんと 話[はな]す れんしゅうに なるので、つづけたいと 思[おも]っています。",
          "en": "I work at a supermarket near my house. Twice a week, four hours each on Saturday and Sunday. The hourly rate is not very high, but it is practice at talking to customers, so I want to keep doing it."
        }
      },
      "key_grammar": [
        "週に〜回",
        "〜ずつ",
        "〜になるので",
        "〜たいと思っています"
      ],
      "key_vocab": [
        {
          "ja": "じきゅう",
          "reading": "じきゅう",
          "en": "hourly pay"
        },
        {
          "ja": "おきゃくさん",
          "reading": "おきゃくさん",
          "en": "customer"
        },
        {
          "ja": "働く",
          "reading": "はたらく",
          "en": "to work"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2022: しゅうに何回アルバイトをしますか。 named in the report as a question students found challenging.",
        "2025: アルバイトのお金で何をしますか。 named in the report as a commonly misunderstood question.",
        "2025: Unfamiliar vocabulary included むりょう、ただ、けんこう、運転する、お客さん and 料理."
      ],
      "common_errors": [
        "err-question-words",
        "err-katakana",
        "err-vocab-gap"
      ]
    },
    {
      "id": "c-day-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "daily-work",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "高校生[こうこうせい]は アルバイトを した ほうが いいと 思[おも]いますか。",
      "question_en": "Do you think senior students should have a part-time job?",
      "followups": [
        {
          "ja": "いい点[てん]と わるい点[てん]は 何[なん]ですか。",
          "en": "What are the good points and the bad points?",
          "model": {
            "ja": "いい点[てん]は、お金[かね]の つかい方[かた]が わかる ことです。わるい点[てん]は、勉強[べんきょう]の 時間[じかん]が 少[すく]なく なる ことです。",
            "en": "The good point is that you learn how to use money. The bad point is that you have less time to study."
          }
        },
        {
          "ja": "日本[にほん]の 高校生[こうこうせい]は どうだと 思[おも]いますか。",
          "en": "What do you think it is like for Japanese senior students?",
          "model": {
            "ja": "日本[にほん]の 高校生[こうこうせい]は アルバイトを しない 人[ひと]が 多[おお]いと 聞[き]きました。ぶかつと じゅくが あって、時間[じかん]が ないからだと 思[おも]います。",
            "en": "I have heard that many Japanese senior students do not have a job. I think clubs and cram school leave them no time."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "した ほうが いいと 思[おも]います。お金[かね]が もらえるからです。",
          "en": "I think they should, because you can earn money."
        },
        "developed": {
          "ja": "した ほうが いいと 思[おも]います。自分[じぶん]で はたらいて お金[かね]を もらうと、お金[かね]の つかい方[かた]が わかるからです。でも、週[しゅう]に 三回[さんかい]より 多[おお]いと、勉強[べんきょう]の 時間[じかん]が なくなります。",
          "en": "I think they should, because when you earn your own money you learn how to use it. But if it is more than three times a week you lose your study time."
        },
        "advanced": {
          "ja": "いい点[てん]も わるい点[てん]も あると 思[おも]います。いい点[てん]は、しゃかいの 中[なか]で 大人[おとな]と 話[はな]す けいけんが できる ことです。わるい点[てん]は、時間[じかん]が なくなって、ねるのが おそく なる ことです。だから、週[しゅう]に 二回[にかい]までなら した ほうが いいと 思[おも]います。",
          "en": "I think there are good points and bad points. The good point is that you get experience of talking to adults out in the community. The bad point is that you run out of time and end up going to bed late. So I think up to twice a week is worth doing."
        }
      },
      "key_grammar": [
        "〜たほうがいい",
        "〜と for a clear if or when result",
        "〜ことです"
      ],
      "key_vocab": [
        {
          "ja": "大人",
          "reading": "おとな",
          "en": "adult"
        },
        {
          "ja": "けいけん",
          "reading": "けいけん",
          "en": "experience"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2025: Most students were able to respond to いい点 and わるい点. The students who were more prepared were able to provide solutions for the わるい点."
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-day-04",
      "section": "conversation",
      "phase": "personal",
      "topic": "daily-work",
      "question_type": "comparison",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "日本[にほん]の 高校生[こうこうせい]の 一日[いちにち]と オーストラリアの 高校生[こうこうせい]の 一日[いちにち]は どう ちがうと 思[おも]いますか。",
      "question_en": "How do you think a Japanese senior student's day differs from an Australian one?",
      "followups": [
        {
          "ja": "どちらの 生活[せいかつ]が いいと 思[おも]いますか。",
          "en": "Which do you think is better?",
          "model": {
            "ja": "オーストラリアの 生活[せいかつ]の ほうが いいと 思[おも]います。じゆうな 時間[じかん]が 多[おお]いからです。",
            "en": "I think the Australian one is better, because there is more free time."
          }
        },
        {
          "ja": "どうして そう 思[おも]いますか。",
          "en": "Why do you think that?",
          "model": {
            "ja": "毎日[まいにち] ぶかつと じゅくが あったら、友[とも]だちと 話[はな]す 時間[じかん]も、ねる 時間[じかん]も 少[すく]なく なるからです。",
            "en": "Because with clubs and cram school every day you have less time to talk with friends and less time to sleep."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "日本[にほん]の 高校生[こうこうせい]の ほうが いそがしいと 思[おも]います。",
          "en": "I think Japanese senior students are busier."
        },
        "developed": {
          "ja": "日本[にほん]の 高校生[こうこうせい]は ぶかつが 毎日[まいにち] あって、じゅくにも 行[い]くので、オーストラリアの 高校生[こうこうせい]より いそがしいと 思[おも]います。",
          "en": "Japanese senior students have club activities every day and also go to cram school, so I think they are busier than Australian students."
        },
        "advanced": {
          "ja": "一番[いちばん] 大[おお]きい ちがいは ぶかつだと 思[おも]います。日本[にほん]では ほとんどの 学生[がくせい]が 毎日[まいにち] ぶかつを して、その 後[あと] じゅくに 行[い]く 人[ひと]も います。オーストラリアでは、学校[がっこう]が 三時[さんじ]に 終[お]わって、アルバイトを する 人[ひと]の ほうが 多[おお]いです。つまり、日本[にほん]の 高校生[こうこうせい]は 学校[がっこう]の 中[なか]で 時間[じかん]を つかい、オーストラリアの 高校生[こうこうせい]は 学校[がっこう]の 外[そと]で つかうと 思[おも]います。",
          "en": "I think the biggest difference is club activities. In Japan most students do a club every day, and some go to cram school after that. In Australia school finishes at three and more students take a part-time job. In other words, I think Japanese senior students spend their time inside school and Australian senior students spend theirs outside it."
        }
      },
      "key_grammar": [
        "〜より〜のほうが",
        "relative clause 行く人",
        "つまり as a connective"
      ],
      "key_vocab": [
        {
          "ja": "ちがい",
          "reading": "ちがい",
          "en": "difference"
        },
        {
          "ja": "ほとんど",
          "reading": "ほとんど",
          "en": "most, nearly all"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2023: They were also able to talk about the good and bad points, and make comparisons with Australia.",
        "2024: ... for example, relative clauses and making comparisons."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-jpn-01",
      "section": "conversation",
      "phase": "nihongo",
      "topic": "nihongo",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "日本語[にほんご]を 何年[なんねん] 勉強[べんきょう]していますか。",
      "question_en": "How many years have you been studying Japanese?",
      "followups": [
        {
          "ja": "どうして 日本語[にほんご]を えらびましたか。",
          "en": "Why did you choose Japanese?",
          "model": {
            "ja": "中学[ちゅうがく]一年生[いちねんせい]の 時[とき]、日本[にほん]の アニメが 好[す]きだったからです。今[いま]は ぶんかにも きょうみが あります。",
            "en": "Because in Year 7 I liked Japanese anime. Now I am interested in the culture as well."
          }
        },
        {
          "ja": "日本語[にほんご]の 中[なか]で 何[なに]が 一番[いちばん] むずかしいですか。",
          "en": "What is the hardest part of Japanese?",
          "model": {
            "ja": "漢字[かんじ]が 一番[いちばん] むずかしいです。読[よ]めますが、書[か]くのを よく わすれます。",
            "en": "Kanji are the hardest. I can read them, but I often forget how to write them."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "六年間[ろくねんかん] 勉強[べんきょう]しています。",
          "en": "I have been studying it for six years."
        },
        "developed": {
          "ja": "中学[ちゅうがく]一年生[いちねんせい]の 時[とき]から 日本語[にほんご]を 勉強[べんきょう]しています。今年[ことし]で 六年[ろくねん]に なります。",
          "en": "I have studied Japanese since Year 7. This year makes six years."
        },
        "advanced": {
          "ja": "中学[ちゅうがく]一年生[いちねんせい]の 時[とき]から 勉強[べんきょう]していて、今年[ことし]で 六年[ろくねん]に なります。はじめは ひらがなだけでしたが、今[いま]は 漢字[かんじ]も 二百[にひゃく]ぐらい 書[か]けるように なりました。",
          "en": "I have studied since Year 7, and this year makes six years. At the start it was only hiragana, but now I can write about two hundred kanji as well."
        }
      },
      "key_grammar": [
        "〜ています",
        "〜ようになりました",
        "〜になります"
      ],
      "key_vocab": [
        {
          "ja": "えらぶ",
          "reading": "えらぶ",
          "en": "to choose"
        },
        {
          "ja": "漢字",
          "reading": "かんじ",
          "en": "kanji"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: Other vocabulary that students should revise includes つづけます、えらびます、兄弟、作家."
      ],
      "common_errors": [
        "err-vocab-gap"
      ]
    },
    {
      "id": "c-jpn-02",
      "section": "conversation",
      "phase": "nihongo",
      "topic": "nihongo",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "日本語[にほんご]を 勉強[べんきょう]していて、一番[いちばん] むずかしいことは 何[なん]ですか。",
      "question_en": "What is the hardest thing about studying Japanese?",
      "followups": [
        {
          "ja": "どうやって れんしゅうしていますか。",
          "en": "How do you practise?",
          "model": {
            "ja": "毎晩[まいばん] 十[じゅっ]こずつ 書[か]いて、次[つぎ]の 日[ひ]に もう 一回[いっかい] 書[か]きます。",
            "en": "I write ten of them every night and write them again the next day."
          }
        },
        {
          "ja": "一番[いちばん] 楽[たの]しいことは 何[なん]ですか。",
          "en": "What is the most enjoyable part?",
          "model": {
            "ja": "日本[にほん]の 人[ひと]と 話[はな]せた 時[とき]が 一番[いちばん] 楽[たの]しいです。わかって もらえると、うれしく なります。",
            "en": "Talking with a Japanese person is the best part. When they understand me it makes my day."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "漢字[かんじ]が 一番[いちばん] むずかしいです。",
          "en": "Kanji are the hardest."
        },
        "developed": {
          "ja": "漢字[かんじ]が 一番[いちばん] むずかしいと 思[おも]います。読[よ]めますが、書[か]くのを よく わすれます。",
          "en": "I think kanji are the hardest. I can read them, but I often forget how to write them."
        },
        "advanced": {
          "ja": "一番[いちばん] むずかしいのは 漢字[かんじ]だと 思[おも]います。読[よ]むのは できますが、書[か]く 時[とき]に よく わすれます。だから、毎晩[まいばん] 十[じゅっ]こずつ 書[か]いて、次[つぎ]の 日[ひ]に もう 一回[いっかい] 書[か]くように しています。この やり方[かた]に かえてから、テストの 点[てん]が よく なりました。",
          "en": "I think the hardest part is kanji. I can read them, but I often forget when I have to write them. So every night I write ten of them and write them again the next day. Since I changed to this method my test marks have improved."
        }
      },
      "key_grammar": [
        "〜のは〜だと思います",
        "〜ようにしています",
        "〜てから"
      ],
      "key_vocab": [
        {
          "ja": "やり方",
          "reading": "やりかた",
          "en": "method, way of doing"
        },
        {
          "ja": "次の日",
          "reading": "つぎのひ",
          "en": "the next day"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2023: おもしろいだと思います instead of おもしろいと思います.",
        "2025: Students could revise the correct use of the structure 'I think'; for example, 先生だと思います and おいしいと思います。"
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-jpn-03",
      "section": "conversation",
      "phase": "culture",
      "topic": "nihongo",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "メルボルンで 日本[にほん]の ぶんかに ふれる きかいが ありますか。",
      "question_en": "Do you get the chance to come into contact with Japanese culture in Melbourne?",
      "followups": [
        {
          "ja": "どこで 日本[にほん]の ものを 買[か]えますか。",
          "en": "Where can you buy Japanese things?",
          "model": {
            "ja": "町[まち]の 日本[にほん]の 食[た]べ物[もの]の お店[みせ]で 買[か]えます。日本[にほん]の おかしも 売[う]っています。",
            "en": "At the Japanese grocery shops in the city. They sell Japanese sweets as well."
          }
        },
        {
          "ja": "日本[にほん]の 食[た]べ物[もの]を 食[た]べたことが ありますか。",
          "en": "Have you eaten Japanese food?",
          "model": {
            "ja": "はい、あります。すしや ラーメンを よく 食[た]べます。去年[きょねん]は わがしも 食[た]べました。",
            "en": "Yes. I often eat sushi and ramen. Last year I ate wagashi too."
          }
        },
        {
          "ja": "それは どうでしたか。",
          "en": "How was it?",
          "model": {
            "ja": "とても おいしかったです。わがしは ケーキより あまくなくて、おちゃと よく あいました。",
            "en": "It was very good. Wagashi are less sweet than cake and went well with tea."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、あります。日本[にほん]の レストランに よく 行[い]きます。",
          "en": "Yes, I do. I often go to Japanese restaurants."
        },
        "developed": {
          "ja": "メルボルンには 日本[にほん]の レストランが 多[おお]いので、よく 行[い]きます。それに、学校[がっこう]で 日本[にほん]の えいがを 見[み]たり、おりがみを したり します。",
          "en": "There are a lot of Japanese restaurants in Melbourne, so I often go. On top of that, at school we watch Japanese films and do origami."
        },
        "advanced": {
          "ja": "はい、けっこう あります。メルボルンには 日本[にほん]の レストランや お店[みせ]が 多[おお]くて、日本[にほん]の おかしも 買[か]えます。学校[がっこう]では 毎年[まいとし] ジャパンデーが あって、ゆかたを 着[き]たり、おりがみを したり します。じつは、母[はは]も 日本[にほん]の えいがが 好[す]きなので、家[いえ]で いっしょに 見[み]ることも あります。",
          "en": "Yes, quite a lot. Melbourne has many Japanese restaurants and shops, and you can buy Japanese sweets too. At school there is a Japan Day every year where we wear yukata and do origami. In fact my mother likes Japanese films too, so sometimes we watch them together at home."
        }
      },
      "key_grammar": [
        "〜たり〜たりします",
        "〜や listing",
        "〜こともあります"
      ],
      "key_vocab": [
        {
          "ja": "きかい",
          "reading": "きかい",
          "en": "opportunity"
        },
        {
          "ja": "ぶんか",
          "reading": "ぶんか",
          "en": "culture"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2022: Students who scored highly provided detailed responses and replied to the questions with two or three pieces of information rather than a one-sentence response."
      ],
      "common_errors": [
        "err-tari"
      ]
    },
    {
      "id": "c-jpn-04",
      "section": "conversation",
      "phase": "nihongo",
      "topic": "nihongo",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "日本語[にほんご]を 勉強[べんきょう]して、自分[じぶん]が かわったと 思[おも]いますか。",
      "question_en": "Do you think studying Japanese has changed you?",
      "followups": [
        {
          "ja": "どんな ところが かわりましたか。",
          "en": "In what way have you changed?",
          "model": {
            "ja": "まちがえるのが こわく なくなりました。前[まえ]は 手[て]を あげるのが はずかしかったです。",
            "en": "I stopped being afraid of mistakes. I used to find putting my hand up embarrassing."
          }
        },
        {
          "ja": "日本語[にほんご]が できると、どんな いい ことが ありますか。",
          "en": "What is good about being able to speak Japanese?",
          "model": {
            "ja": "話[はな]せる 人[ひと]が ふえます。しょうらい、日本[にほん]から 来[き]た 子[こ]どもに 教[おし]えることも できます。",
            "en": "You can talk with more people. In the future I could also teach children who have come from Japan."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、かわったと 思[おも]います。",
          "en": "Yes, I think it has."
        },
        "developed": {
          "ja": "日本語[にほんご]を 勉強[べんきょう]して、ほかの 国[くに]の ことを もっと 知[し]りたく なりました。それに、英語[えいご]の 文[ぶん]の 作[つく]り方[かた]も 考[かんが]えるように なりました。",
          "en": "Studying Japanese has made me want to know more about other countries. On top of that, I have started thinking about how English sentences are built as well."
        },
        "advanced": {
          "ja": "はい、かわったと 思[おも]います。一番[いちばん] 大[おお]きい ちがいは、まちがえるのが こわく なくなった ことです。日本語[にほんご]の じゅぎょうでは まちがえても 先生[せんせい]が たすけてくれるので、だんだん 話[はな]せるように なりました。今[いま]は 日本[にほん]の 人[ひと]に 会[あ]ったら、自分[じぶん]から 話[はな]しかけるように しています。",
          "en": "Yes, I think it has. The biggest difference is that I am no longer afraid of making mistakes. In Japanese class the teacher helps you even when you get it wrong, so little by little I became able to speak. Now when I meet a Japanese person I make a point of speaking to them first."
        }
      },
      "key_grammar": [
        "〜ようになりました",
        "〜なくなる",
        "〜たら",
        "〜ようにしています"
      ],
      "key_vocab": [
        {
          "ja": "まちがえる",
          "reading": "まちがえる",
          "en": "to make a mistake"
        },
        {
          "ja": "だんだん",
          "reading": "だんだん",
          "en": "gradually"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: Students tended to use familiar grammatical structures repeatedly. They are encouraged to use a wider variety of structures where appropriate.",
        "2025: They moved beyond one-sentence answers, and provided details using sophisticated vocabulary and a range of grammatical structures."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-jpn-05",
      "section": "conversation",
      "phase": "nihongo",
      "topic": "nihongo",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "オーストラリアの 学校[がっこう]で、みんな 外国[がいこく]の ことばを 勉強[べんきょう]した ほうが いいと 思[おも]いますか。",
      "question_en": "Do you think everyone at school in Australia should study a foreign language?",
      "followups": [
        {
          "ja": "どうして そう 思[おも]いますか。",
          "en": "Why do you think that?",
          "model": {
            "ja": "ことばを 習[なら]うと、その 国[くに]の 考[かんが]え方[かた]も 少[すこ]しずつ わかるように なるからです。",
            "en": "Because learning a language gradually teaches you how that country thinks."
          }
        },
        {
          "ja": "どの ことばが 一番[いちばん] やくに 立[た]つと 思[おも]いますか。",
          "en": "Which language do you think is the most useful?",
          "model": {
            "ja": "学校[がっこう]に よると 思[おも]います。オーストラリアには いろいろな 国[くに]の 人[ひと]が 住[す]んでいるので、どの ことばでも やくに 立[た]ちます。",
            "en": "I think it depends on the school. People from many countries live in Australia, so any language earns its place."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、した ほうが いいと 思[おも]います。",
          "en": "Yes, I think they should."
        },
        "developed": {
          "ja": "した ほうが いいと 思[おも]います。ことばを 習[なら]うと、ほかの 国[くに]の 考[かんが]え方[かた]も わかるからです。",
          "en": "I think they should, because when you learn a language you also come to understand how another country thinks."
        },
        "advanced": {
          "ja": "ぜったいに した ほうが いいと 思[おも]います。オーストラリアには いろいろな 国[くに]から 来[き]た 人[ひと]が 住[す]んでいるので、外国[がいこく]の ことばが できると、話[はな]せる 人[ひと]が ふえます。それに、ことばを 習[なら]うと、その 国[くに]の 考[かんが]え方[かた]も 少[すこ]しずつ わかるように なります。でも、どの ことばを えらぶかは 学校[がっこう]に よると 思[おも]います。",
          "en": "I think they definitely should. People from many countries live in Australia, so if you can speak a foreign language there are more people you can talk to. On top of that, when you learn a language you gradually come to understand how that country thinks. But I think which language to choose depends on the school."
        }
      },
      "key_grammar": [
        "relative clause 来た人",
        "〜と for a clear if or when result",
        "〜ようになります",
        "〜によると思います"
      ],
      "key_vocab": [
        {
          "ja": "外国",
          "reading": "がいこく",
          "en": "a foreign country"
        },
        {
          "ja": "やくに立つ",
          "reading": "やくにたつ",
          "en": "to be useful"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: Students were able to use から and ので to indicate their reasons, and use と思います to indicate their opinions where appropriate."
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-cul-01",
      "section": "conversation",
      "phase": "culture",
      "topic": "japan-culture",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "日本[にほん]に 行[い]ったことが ありますか。",
      "question_en": "Have you been to Japan?",
      "followups": [
        {
          "ja": "日本[にほん]の どこに 行[い]きたいですか。",
          "en": "Where in Japan would you like to go?",
          "model": {
            "ja": "京都[きょうと]に 一番[いちばん] 行[い]きたいです。古[ふる]い お寺[てら]や 神社[じんじゃ]が 多[おお]いからです。",
            "en": "Kyoto most of all, because it has so many old temples and shrines."
          }
        },
        {
          "ja": "どうしてですか。",
          "en": "Why is that?",
          "model": {
            "ja": "春[はる]は さくらも きれいだと 聞[き]きました。それに、わがしの 古[ふる]い お店[みせ]も 見[み]たいです。",
            "en": "I have heard the cherry blossom is beautiful in spring. I would also like to see the old wagashi shops."
          }
        },
        {
          "ja": "だれと 行[い]きたいですか。",
          "en": "Who would you like to go with?",
          "model": {
            "ja": "家族[かぞく]と 行[い]きたいです。妹[いもうと]も 日本[にほん]の アニメが 好[す]きなので、よろこぶと 思[おも]います。",
            "en": "With my family. My sister likes Japanese anime too, so I think she would enjoy it."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "いいえ、まだ ありません。",
          "en": "No, not yet."
        },
        "developed": {
          "ja": "まだ 行[い]ったことが ありません。でも、来年[らいねん]、家族[かぞく]と 行[い]きたいと 思[おも]っています。京都[きょうと]に 行[い]って、お寺[てら]を 見[み]たいです。",
          "en": "I have not been yet. But next year I would like to go with my family. I want to go to Kyoto and see the temples."
        },
        "advanced": {
          "ja": "ざんねんですが、まだ 行[い]ったことが ありません。一番[いちばん] 行[い]きたい 場所[ばしょ]は 京都[きょうと]です。古[ふる]い お寺[てら]や 神社[じんじゃ]が 多[おお]くて、春[はる]は さくらも きれいだと 聞[き]きました。それに、京都[きょうと]の 近[ちか]くの 小[ちい]さい 町[まち]にも 行[い]って、りょかんに 泊[と]まってみたいです。",
          "en": "Unfortunately I have not been yet. The place I most want to go is Kyoto. I have heard it has many old temples and shrines, and that the cherry blossom is beautiful in spring. I would also like to visit a small town near Kyoto and stay in a ryokan."
        }
      },
      "key_grammar": [
        "〜たことがありません",
        "〜や listing",
        "〜と聞きました",
        "〜てみたい"
      ],
      "key_vocab": [
        {
          "ja": "お寺",
          "reading": "おてら",
          "en": "temple"
        },
        {
          "ja": "神社",
          "reading": "じんじゃ",
          "en": "shrine"
        },
        {
          "ja": "泊まる",
          "reading": "とまる",
          "en": "to stay overnight"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2020: Some students did not understand vocabulary, including 困ったこと、がっき、きょく、海外旅行、読書."
      ],
      "common_errors": [
        "err-koto-ga-arimasu"
      ]
    },
    {
      "id": "c-cul-02",
      "section": "conversation",
      "phase": "culture",
      "topic": "japan-culture",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "日本[にほん]の ぶんかに ついて 何[なに]を 知[し]っていますか。",
      "question_en": "What do you know about Japanese culture?",
      "followups": [
        {
          "ja": "それに ついて もっと せつめいしてください。",
          "en": "Please explain more about that.",
          "model": {
            "ja": "夏[なつ]の おまつりでは、人[ひと]が ゆかたを 着[き]て、やたいで たこやきや かきごおりを 買[か]います。おみこしを かつぐ おまつりも あります。",
            "en": "At summer festivals people wear yukata and buy takoyaki and shaved ice from the stalls. Some festivals carry a portable shrine as well."
          }
        },
        {
          "ja": "どこで それを 知[し]りましたか。",
          "en": "Where did you learn that?",
          "model": {
            "ja": "学校[がっこう]の じゅぎょうで ビデオを 見[み]ました。インターネットでも しらべました。",
            "en": "I watched a video in class. I looked it up on the internet as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "おまつりと わしょくを 知[し]っています。",
          "en": "I know about festivals and Japanese food."
        },
        "developed": {
          "ja": "日本[にほん]の おまつりに ついて 少[すこ]し 知[し]っています。夏[なつ]に 多[おお]くて、人[ひと]は ゆかたを 着[き]て、やたいで 食[た]べ物[もの]を 買[か]います。",
          "en": "I know a little about Japanese festivals. There are many in summer, and people wear yukata and buy food from the stalls."
        },
        "advanced": {
          "ja": "日本[にほん]の おまつりに ついて 一番[いちばん] よく 知[し]っています。夏[なつ]の おまつりでは、人[ひと]が ゆかたを 着[き]て、やたいで たこやきや かきごおりを 買[か]います。おみこしを かつぐ おまつりも あって、町[まち]の 人[ひと]が みんなで じゅんびします。学校[がっこう]の じゅぎょうで ビデオを 見[み]て、おまつりは 神社[じんじゃ]と かんけいが あることを 知[し]りました。",
          "en": "What I know best is Japanese festivals. At a summer festival people wear yukata and buy takoyaki and shaved ice from the stalls. There are also festivals where people carry a mikoshi, and everyone in the town prepares it together. We watched a video in class and I learnt that festivals are connected with shrines."
        }
      },
      "key_grammar": [
        "〜について",
        "〜や listing",
        "〜ことを知りました"
      ],
      "key_vocab": [
        {
          "ja": "おまつり",
          "reading": "おまつり",
          "en": "festival"
        },
        {
          "ja": "かんけい",
          "reading": "かんけい",
          "en": "connection, relationship"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: Students should be able to explain any keywords associated with their subtopic.",
        "2025: If the subtopic is 花見, students should know the word さくら."
      ],
      "common_errors": [
        "err-vocab-gap"
      ]
    },
    {
      "id": "c-cul-03",
      "section": "conversation",
      "phase": "culture",
      "topic": "japan-culture",
      "question_type": "comparison",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "日本[にほん]と オーストラリアの 学校[がっこう]を くらべると、どんな ちがいが ありますか。",
      "question_en": "When you compare Japanese and Australian schools, what differences are there?",
      "followups": [
        {
          "ja": "どちらの 学校[がっこう]に 行[い]きたいですか。",
          "en": "Which school would you rather attend?",
          "model": {
            "ja": "一年[いちねん]だけ 日本[にほん]の 学校[がっこう]に 行[い]ってみたいです。でも、毎日[まいにち] ぶかつが あるのは たいへんだと 思[おも]います。",
            "en": "I would like to try a Japanese school for one year. But club activities every day would be hard."
          }
        },
        {
          "ja": "オーストラリアの 学校[がっこう]でも やってみたい 日本[にほん]の しゅうかんは ありますか。",
          "en": "Is there a Japanese practice you would bring into Australian schools?",
          "model": {
            "ja": "そうじが いいと 思[おも]います。自分[じぶん]たちで そうじすると、学校[がっこう]を たいせつに する 気持[きも]ちに なるからです。",
            "en": "Cleaning, I think. When you clean it yourself you start looking after the school."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "日本[にほん]の 学校[がっこう]は 学生[がくせい]が そうじを します。",
          "en": "At Japanese schools the students do the cleaning."
        },
        "developed": {
          "ja": "日本[にほん]の 学生[がくせい]は 自分[じぶん]たちで きょうしつを そうじします。オーストラリアでは そうじの 人[ひと]が します。それに、日本[にほん]では せいふくが きまっていて、学校[がっこう]で くつも かえます。",
          "en": "Japanese students clean their own classrooms. In Australia the cleaners do it. On top of that, in Japan the uniform is strict and students even change their shoes at school."
        },
        "advanced": {
          "ja": "一番[いちばん] 大[おお]きい ちがいは そうじだと 思[おも]います。日本[にほん]の 学生[がくせい]は 毎日[まいにち] 自分[じぶん]たちで きょうしつを そうじしますが、オーストラリアでは そうじの 人[ひと]が します。この しゅうかんは、学校[がっこう]を たいせつに する 気持[きも]ちを 作[つく]ると 思[おも]います。だから、オーストラリアの 学校[がっこう]にも 少[すこ]し 入[い]れた ほうが いいと 思[おも]います。",
          "en": "I think the biggest difference is cleaning. Japanese students clean their own classrooms every day, while in Australia the cleaners do it. I think that practice builds a feeling of caring for the school. So I think Australian schools should bring a little of it in too."
        }
      },
      "key_grammar": [
        "〜と comparison",
        "relative clause 大切にする気持ち",
        "〜たほうがいい"
      ],
      "key_vocab": [
        {
          "ja": "しゅうかん",
          "reading": "しゅうかん",
          "en": "custom, habit"
        },
        {
          "ja": "くらべる",
          "reading": "くらべる",
          "en": "to compare"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2023: They were also able to talk about the good and bad points, and make comparisons with Australia."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-cul-04",
      "section": "conversation",
      "phase": "culture",
      "topic": "japan-culture",
      "question_type": "hypothetical",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "もし メルボルンの ゆるキャラを 作[つく]るなら、どんな キャラクターに しますか。",
      "question_en": "If you were to design a mascot character for Melbourne, what would it be?",
      "followups": [
        {
          "ja": "どうしてですか。",
          "en": "Why?",
          "model": {
            "ja": "メルボルンは カフェが ゆうめいだからです。コーヒーを 持[も]っている コアラなら、すぐに おぼえられると 思[おも]います。",
            "en": "Because Melbourne is famous for cafes. I think a koala holding a coffee would stick in people's minds."
          }
        },
        {
          "ja": "名前[なまえ]は 何[なん]に しますか。",
          "en": "What would you call it?",
          "model": {
            "ja": "「コアラッテ」に します。コアラと ラッテを いっしょに した 名前[なまえ]です。",
            "en": "I would call it Koalatte. The name puts koala and latte together."
          }
        },
        {
          "ja": "どこで 使[つか]いますか。",
          "en": "Where would it be used?",
          "model": {
            "ja": "トラムや 駅[えき]の ポスターに 使[つか]いたいです。子[こ]どもも すぐに おぼえると 思[おも]います。",
            "en": "On trams and on station posters. I think children would pick it up quickly."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "コアラの キャラクターを 作[つく]りたいです。",
          "en": "I would make a koala character."
        },
        "developed": {
          "ja": "コーヒーを 持[も]っている コアラを 作[つく]りたいです。メルボルンは カフェが ゆうめいだからです。名前[なまえ]は 「コアラッテ」に します。",
          "en": "I would make a koala holding a coffee, because Melbourne is famous for cafes. I would call it Koalatte."
        },
        "advanced": {
          "ja": "コーヒーを 持[も]っている コアラを 作[つく]りたいです。名前[なまえ]は 「コアラッテ」に します。メルボルンは カフェが ゆうめいで、天気[てんき]が よく かわる 町[まち]なので、かさも 持[も]たせます。ゆるキャラは かわいくて おぼえやすいことが たいせつだと 思[おも]います。トラムや 駅[えき]の ポスターに 使[つか]ったら、子[こ]どもも すぐに おぼえると 思[おも]います。",
          "en": "I would make a koala holding a coffee and call it Koalatte. Melbourne is famous for cafes and the weather changes a lot, so I would give it an umbrella too. I think a mascot has to be cute and easy to remember. If it were used on trams and station posters I think children would pick it up straight away."
        }
      },
      "key_grammar": [
        "もし〜なら",
        "relative clause 持っているコアラ",
        "〜やすい",
        "〜たら"
      ],
      "key_vocab": [
        {
          "ja": "ゆるキャラ",
          "reading": "ゆるキャラ",
          "en": "mascot character"
        },
        {
          "ja": "おぼえる",
          "reading": "おぼえる",
          "en": "to remember, to learn"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2020: どんなゆるキャラをメルボルンのためにデザインしますか。 given in the report as an example of a hypothetical question asked in the Discussion.",
        "2020: They were also able to respond to hypothetical questions."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-fut-01",
      "section": "conversation",
      "phase": "opener",
      "topic": "future",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "しょうらいの ゆめは 何[なん]ですか。",
      "question_en": "What is your dream for the future?",
      "followups": [
        {
          "ja": "どうして その 仕事[しごと]を えらびましたか。",
          "en": "Why did you choose that job?",
          "model": {
            "ja": "子[こ]どもと 話[はな]すのが 好[す]きだからです。アルバイトで 小[ちい]さい 子[こ]どもに サッカーを 教[おし]えたことも あります。",
            "en": "Because I like talking with children. I have also taught soccer to young children in a part-time job."
          }
        },
        {
          "ja": "大学[だいがく]で 何[なに]を 勉強[べんきょう]したいですか。",
          "en": "What would you like to study at university?",
          "model": {
            "ja": "きょういくを 勉強[べんきょう]したいです。日本語[にほんご]も つづけたいと 思[おも]っています。",
            "en": "I want to study education. I would like to continue Japanese as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "先生[せんせい]に なりたいです。",
          "en": "I want to be a teacher."
        },
        "developed": {
          "ja": "しょうらいは 小学校[しょうがっこう]の 先生[せんせい]に なりたいです。子[こ]どもと 話[はな]すのが 好[す]きだからです。",
          "en": "In the future I want to be a primary teacher, because I like talking with children."
        },
        "advanced": {
          "ja": "しょうらいは 小学校[しょうがっこう]の 先生[せんせい]に なりたいです。子[こ]どもと 話[はな]すのが 好[す]きで、アルバイトで 小[ちい]さい 子[こ]どもに サッカーを 教[おし]えたことが あるからです。だから、来年[らいねん]は 大学[だいがく]で きょういくを 勉強[べんきょう]したいと 思[おも]っています。",
          "en": "In the future I want to be a primary teacher. I like talking with children, and in my part-time job I have taught soccer to young children. So next year I would like to study education at university."
        }
      },
      "key_grammar": [
        "〜になりたいです",
        "〜たことがあるからです",
        "〜たいと思っています"
      ],
      "key_vocab": [
        {
          "ja": "しょうらい",
          "reading": "しょうらい",
          "en": "the future"
        },
        {
          "ja": "えらぶ",
          "reading": "えらぶ",
          "en": "to choose"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: Other vocabulary that students should revise includes つづけます、えらびます、兄弟、作家."
      ],
      "common_errors": [
        "err-vocab-gap"
      ]
    },
    {
      "id": "c-fut-02",
      "section": "conversation",
      "phase": "personal",
      "topic": "future",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "大学[だいがく]で 日本語[にほんご]を つづけたいですか。",
      "question_en": "Would you like to continue Japanese at university?",
      "followups": [
        {
          "ja": "どうしてですか。",
          "en": "Why?",
          "model": {
            "ja": "六年間[ろくねんかん] 勉強[べんきょう]したので、ここで やめたら、きっと わすれてしまうからです。",
            "en": "Because I have studied for six years, and if I stop here I will certainly forget it."
          }
        },
        {
          "ja": "日本語[にほんご]を 使[つか]う 仕事[しごと]を したいですか。",
          "en": "Would you like a job that uses Japanese?",
          "model": {
            "ja": "はい。日本[にほん]から 来[き]た 子[こ]どもが いる 学校[がっこう]で 教[おし]えたいです。",
            "en": "Yes. I would like to teach at a school with children who have come from Japan."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、つづけたいです。",
          "en": "Yes, I would."
        },
        "developed": {
          "ja": "はい、大学[だいがく]でも 日本語[にほんご]を つづけたいと 思[おも]っています。六年間[ろくねんかん] 勉強[べんきょう]したので、ここで やめたくないです。",
          "en": "Yes, I would like to continue Japanese at university. I have studied for six years, so I do not want to stop here."
        },
        "advanced": {
          "ja": "はい、ぜひ つづけたいと 思[おも]っています。六年間[ろくねんかん] 勉強[べんきょう]したので、ここで やめたら、きっと わすれてしまいます。大学[だいがく]には 一年間[いちねんかん] 日本[にほん]で 勉強[べんきょう]できる プログラムが あると 聞[き]いたので、それに 入[はい]りたいです。日本[にほん]に 住[す]んだら、話[はな]す ちからが もっと 強[つよ]く なると 思[おも]います。",
          "en": "Yes, I would really like to continue. I have studied for six years, so if I stopped here I would certainly forget it. I have heard the university has a program where you can study in Japan for a year, and I want to join that. If I lived in Japan I think my speaking would get much stronger."
        }
      },
      "key_grammar": [
        "〜たら",
        "〜てしまいます",
        "〜と聞いたので"
      ],
      "key_vocab": [
        {
          "ja": "つづける",
          "reading": "つづける",
          "en": "to continue"
        },
        {
          "ja": "強い",
          "reading": "つよい",
          "en": "strong"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: Other vocabulary that students should revise includes つづけます、えらびます、兄弟、作家.",
        "2023: They did not know じきゅう、がっき、うんてんめんきょ、なかがいい、せんしゅ、読書、作家、じゅぎょう and 強い."
      ],
      "common_errors": [
        "err-vocab-gap"
      ]
    },
    {
      "id": "c-fut-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "future",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "大学[だいがく]に 行[い]くのは ひつようだと 思[おも]いますか。",
      "question_en": "Do you think going to university is necessary?",
      "followups": [
        {
          "ja": "ほかに どんな 道[みち]が ありますか。",
          "en": "What other paths are there?",
          "model": {
            "ja": "仕事[しごと]の 場所[ばしょ]で 習[なら]う 道[みち]も あります。私[わたし]の いとこは 大学[だいがく]に 行[い]かないで、カフェで 働[はたら]いています。",
            "en": "There is the path of learning on the job. My cousin did not go to university and works in a cafe."
          }
        },
        {
          "ja": "お金[かね]の ことを どう 思[おも]いますか。",
          "en": "What do you think about the cost?",
          "model": {
            "ja": "大学[だいがく]は お金[かね]が かかるので、アルバイトを しながら 行[い]く 学生[がくせい]が 多[おお]いです。それは たいへんだと 思[おも]います。",
            "en": "University costs a lot, so many students work while they study. I think that is hard."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、ひつようだと 思[おも]います。",
          "en": "Yes, I think it is."
        },
        "developed": {
          "ja": "仕事[しごと]に よると 思[おも]います。先生[せんせい]や いしゃに なりたいなら、大学[だいがく]に 行[い]かなければ なりません。でも、ほかの 仕事[しごと]は けいけんの ほうが たいせつだと 思[おも]います。",
          "en": "I think it depends on the job. If you want to be a teacher or a doctor you have to go to university. But for other jobs I think experience matters more."
        },
        "advanced": {
          "ja": "仕事[しごと]に よると 思[おも]います。先生[せんせい]や いしゃに なりたいなら、大学[だいがく]に 行[い]かなければ なりません。でも、りょうりや だいくの 仕事[しごと]なら、学校[がっこう]より 仕事[しごと]の 場所[ばしょ]で 習[なら]う ほうが 早[はや]いと 思[おも]います。じつは、私[わたし]の いとこは 大学[だいがく]に 行[い]かないで、今[いま] 人気[にんき]の ある カフェで 働[はたら]いています。だから、大学[だいがく]は 一[ひと]つの 道[みち]で、みんなの 道[みち]ではないと 思[おも]います。",
          "en": "I think it depends on the job. If you want to be a teacher or a doctor you have to go to university. But for cooking or carpentry I think learning on the job is quicker than school. In fact my cousin did not go to university and now works at a popular cafe. So I think university is one path, not everyone's path."
        }
      },
      "key_grammar": [
        "〜によると思います",
        "〜なら",
        "〜ないで",
        "relative clause 人気のあるカフェ"
      ],
      "key_vocab": [
        {
          "ja": "道",
          "reading": "みち",
          "en": "road, path"
        },
        {
          "ja": "りょうり",
          "reading": "りょうり",
          "en": "cooking"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2022: Students who scored highly were able to share their opinions by using と思います and their reasons by using から or ので.",
        "2025: Higher-scoring responses used connectives effectively, including まず、つまり and じつは."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-fut-04",
      "section": "conversation",
      "phase": "personal",
      "topic": "future",
      "question_type": "hypothetical",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "もし 十年後[じゅうねんご]の 自分[じぶん]に 手紙[てがみ]を 書[か]いたら、何[なに]を 書[か]きますか。",
      "question_en": "If you wrote a letter to yourself in ten years, what would you write?",
      "followups": [
        {
          "ja": "十年後[じゅうねんご]、どこに 住[す]んでいると 思[おも]いますか。",
          "en": "Where do you think you will be living in ten years?",
          "model": {
            "ja": "たぶん メルボルンに 住[す]んでいると 思[おも]います。でも、一年[いちねん]ぐらい 日本[にほん]に 住[す]んでみたいです。",
            "en": "Probably in Melbourne. But I would like to try living in Japan for about a year."
          }
        },
        {
          "ja": "今[いま]の 自分[じぶん]に 言[い]いたいことは ありますか。",
          "en": "Is there anything you would say to yourself now?",
          "model": {
            "ja": "「しんぱいしすぎないで」と 言[い]いたいです。テストの 前[まえ]は いつも しんぱいに なるからです。",
            "en": "I would say, do not worry so much, because I always get anxious before a test."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "「元気[げんき]ですか」と 書[か]きます。",
          "en": "I would write, how are you?"
        },
        "developed": {
          "ja": "十年後[じゅうねんご]の 自分[じぶん]に、「ゆめを わすれませんでしたか」と 書[か]きたいです。今[いま]は 先生[せんせい]に なりたいですが、かわるかも しれません。",
          "en": "I would write to my future self, did you forget your dream? Right now I want to be a teacher, but that may change."
        },
        "advanced": {
          "ja": "十年後[じゅうねんご]の 自分[じぶん]に、「ゆめを わすれませんでしたか」と 書[か]きたいです。今[いま]は 先生[せんせい]に なりたいですが、十年[じゅうねん]の 間[あいだ]に 気[き]が かわるかも しれません。それでも、人[ひと]を たすける 仕事[しごと]を していると いいです。それから、「日本語[にほんご]を つづけてください」とも 書[か]きます。じつは、それが 一番[いちばん] しんぱいだからです。",
          "en": "I would write to my future self, did you forget your dream? Right now I want to be a teacher, but in ten years I may change my mind. Even so, I hope I am doing work that helps people. I would also write, please keep up your Japanese, because in fact that is what I worry about most."
        }
      },
      "key_grammar": [
        "〜かもしれません",
        "〜ていてほしい",
        "quotation with と書きます",
        "じつは"
      ],
      "key_vocab": [
        {
          "ja": "手紙",
          "reading": "てがみ",
          "en": "letter"
        },
        {
          "ja": "十年後",
          "reading": "じゅうねんご",
          "en": "in ten years"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2021: Successful responses provided opinions and responded to hypothetical questions."
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-wor-01",
      "section": "conversation",
      "phase": "personal",
      "topic": "world",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "かんきょうの もんだいに ついて どう 思[おも]いますか。",
      "question_en": "What do you think about environmental problems?",
      "followups": [
        {
          "ja": "自分[じぶん]は 何[なに]が できますか。",
          "en": "What can you do yourself?",
          "model": {
            "ja": "車[くるま]の かわりに 電車[でんしゃ]や じてんしゃを 使[つか]うように しています。小[ちい]さい ことですが、みんなが すれば かわると 思[おも]います。",
            "en": "I try to use the train or my bike instead of the car. It is a small thing, but if everyone did it things would change."
          }
        },
        {
          "ja": "学校[がっこう]では 何[なに]を していますか。",
          "en": "What does your school do?",
          "model": {
            "ja": "学校[がっこう]に ごみを 分[わ]ける 場所[ばしょ]が できました。学生[がくせい]の グループも 木[き]を うえています。",
            "en": "The school has set up places to sort rubbish. A student group plants trees as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "大[おお]きい もんだいだと 思[おも]います。",
          "en": "I think it is a big problem."
        },
        "developed": {
          "ja": "一番[いちばん] 大[おお]きい もんだいだと 思[おも]います。オーストラリアでは 夏[なつ]が どんどん あつく なって、山火事[やまかじ]も 多[おお]く なりました。",
          "en": "I think it is the biggest problem. In Australia the summers keep getting hotter and there are more bushfires."
        },
        "advanced": {
          "ja": "一番[いちばん] 大[おお]きい もんだいだと 思[おも]います。オーストラリアでは 夏[なつ]が どんどん あつく なって、山火事[やまかじ]も 多[おお]く なりました。私[わたし]の 家[いえ]では、車[くるま]の かわりに 電車[でんしゃ]や じてんしゃを 使[つか]うように しています。小[ちい]さい ことですが、みんなが すれば かわると 思[おも]います。学校[がっこう]にも ごみを 分[わ]ける 場所[ばしょ]が できて、前[まえ]より よく なりました。",
          "en": "I think it is the biggest problem. In Australia the summers keep getting hotter and there are more bushfires. At home we try to use the train or a bike instead of the car. It is a small thing, but I think it would make a difference if everyone did it. My school has put in places to sort rubbish too, so it is better than before."
        }
      },
      "key_grammar": [
        "〜ようにしています",
        "〜のかわりに",
        "〜ば conditional",
        "〜より comparison"
      ],
      "key_vocab": [
        {
          "ja": "かんきょう",
          "reading": "かんきょう",
          "en": "environment"
        },
        {
          "ja": "山火事",
          "reading": "やまかじ",
          "en": "bushfire"
        },
        {
          "ja": "分ける",
          "reading": "わける",
          "en": "to separate, to sort"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2024: They were also able to express their opinion and provide solutions to address issues they raised."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "c-wor-02",
      "section": "conversation",
      "phase": "personal",
      "topic": "world",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "SNSは 社会[しゃかい]に いい えいきょうを あたえると 思[おも]いますか。",
      "question_en": "Do you think social media has a good influence on society?",
      "followups": [
        {
          "ja": "いい点[てん]と わるい点[てん]を 教[おし]えてください。",
          "en": "Please tell me the good points and the bad points.",
          "model": {
            "ja": "いい点[てん]は、日本[にほん]の 高校生[こうこうせい]にも メッセージが おくれる ことです。わるい点[てん]は、うその ニュースを しんじてしまう 人[ひと]が いる ことです。",
            "en": "The good point is that I can message a Japanese senior student. The bad point is that some people believe false news."
          }
        },
        {
          "ja": "自分[じぶん]は どのぐらい 使[つか]いますか。",
          "en": "How much do you use it yourself?",
          "model": {
            "ja": "一日[いちにち]に 一時間[いちじかん]ぐらい 使[つか]います。テストの 前[まえ]は スマホを べつの へやに おきます。",
            "en": "About an hour a day. Before a test I leave my phone in another room."
          }
        },
        {
          "ja": "どうしたら もっと よく なると 思[おも]いますか。",
          "en": "How do you think it could be improved?",
          "model": {
            "ja": "学校[がっこう]で 「この ニュースは ほんとうか」と 考[かんが]える じゅぎょうが あったら いいと 思[おも]います。",
            "en": "I think it would help to have lessons at school on asking whether a piece of news is true."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "いい点[てん]も わるい点[てん]も あると 思[おも]います。",
          "en": "I think there are good points and bad points."
        },
        "developed": {
          "ja": "いい点[てん]は、とおい ところの 友[とも]だちと すぐに 話[はな]せる ことです。わるい点[てん]は、うその ニュースも 早[はや]く 広[ひろ]がる ことです。",
          "en": "The good point is that you can talk to friends far away straight away. The bad point is that false news spreads quickly too."
        },
        "advanced": {
          "ja": "いい点[てん]も わるい点[てん]も あると 思[おも]います。いい点[てん]は、とおい ところに 住[す]んでいる 友[とも]だちと すぐに 話[はな]せる ことです。じっさいに、日本[にほん]の 高校生[こうこうせい]に メッセージを おくったことが あります。わるい点[てん]は、うその ニュースも 早[はや]く 広[ひろ]がって、人[ひと]が しんじてしまう ことです。だから、学校[がっこう]で 「この ニュースは ほんとうか」と 考[かんが]える じゅぎょうが ひつようだと 思[おも]います。",
          "en": "I think there are good points and bad points. The good point is that you can talk straight away to friends who live far away. I have actually sent messages to a Japanese senior student. The bad point is that false news spreads quickly too and people believe it. So I think schools need lessons on asking whether a piece of news is true."
        }
      },
      "key_grammar": [
        "〜ことです",
        "relative clause 住んでいる友だち",
        "〜てしまう",
        "quotation with と考える"
      ],
      "key_vocab": [
        {
          "ja": "社会",
          "reading": "しゃかい",
          "en": "society"
        },
        {
          "ja": "広がる",
          "reading": "ひろがる",
          "en": "to spread"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2025: Most students were able to respond to いい点 and わるい点. The students who were more prepared were able to provide solutions for the わるい点."
      ],
      "common_errors": [
        "err-omou"
      ]
    },
    {
      "id": "c-wor-03",
      "section": "conversation",
      "phase": "personal",
      "topic": "world",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "今[いま]の 日本[にほん]の わかものに ついて どう 思[おも]いますか。",
      "question_en": "What do you think about young people in Japan today?",
      "followups": [
        {
          "ja": "日本[にほん]の わかものと オーストラリアの わかものは ちがいますか。",
          "en": "Are young people in Japan different from young people in Australia?",
          "model": {
            "ja": "生活[せいかつ]は ちがいますが、気持[きも]ちは にていると 思[おも]います。どちらも しょうらいの ことを しんぱいしています。",
            "en": "Their daily lives differ, but I think they feel much the same. Both worry about the future."
          }
        },
        {
          "ja": "どこで その ことを 知[し]りましたか。",
          "en": "Where did you learn about that?",
          "model": {
            "ja": "ユーチューブで 日本[にほん]の 高校生[こうこうせい]の ビデオを 見[み]ました。日本語[にほんご]の じゅぎょうでも 読[よ]みました。",
            "en": "I watched videos by Japanese senior students on YouTube. We read about it in Japanese class as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "とても いそがしいと 思[おも]います。",
          "en": "I think they are very busy."
        },
        "developed": {
          "ja": "日本[にほん]の わかものは とても いそがしいと 思[おも]います。学校[がっこう]の 後[あと]に ぶかつや じゅくが あって、休[やす]む 時間[じかん]が 少[すく]ないです。",
          "en": "I think young people in Japan are very busy. After school there are clubs and cram school, so they have little time to rest."
        },
        "advanced": {
          "ja": "日本[にほん]の わかものは とても いそがしいと 思[おも]います。学校[がっこう]の 後[あと]に ぶかつや じゅくが あって、休[やす]む 時間[じかん]が 少[すく]ないからです。でも、さいきんは 自分[じぶん]の 考[かんが]えを はっきり 言[い]う わかものも ふえてきたと 聞[き]きました。ユーチューブで 日本[にほん]の 高校生[こうこうせい]の ビデオを 見[み]ると、オーストラリアの 学生[がくせい]と 同[おな]じように、しょうらいの ことを しんぱいしています。つまり、国[くに]は ちがっても、気持[きも]ちは にていると 思[おも]います。",
          "en": "I think young people in Japan are very busy, because after school there are clubs and cram school and little time to rest. But I have heard that more young people are now saying clearly what they think. When I watch videos of Japanese senior students on YouTube, they worry about the future just like Australian students. In other words, I think the countries differ but the feelings are alike."
        }
      },
      "key_grammar": [
        "〜てきた",
        "〜と聞きました",
        "〜と for a clear if or when result",
        "つまり"
      ],
      "key_vocab": [
        {
          "ja": "わかもの",
          "reading": "わかもの",
          "en": "young people"
        },
        {
          "ja": "はっきり",
          "reading": "はっきり",
          "en": "clearly"
        }
      ],
      "criteria_targeted": [
        "c1-content",
        "c1-language"
      ],
      "report_refs": [
        "2025: Higher-scoring responses used connectives effectively, including まず、つまり and じつは."
      ],
      "common_errors": [
        "err-narrow-range"
      ]
    },
    {
      "id": "d-img-01",
      "section": "discussion",
      "topic": "image",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "その しゃしんに ついて せつめいしてください。",
      "question_en": "Please tell me about your photo.",
      "followups": [
        {
          "ja": "どこで とった しゃしんですか。",
          "en": "Where was the photo taken?",
          "model": {
            "ja": "メルボルンの 日本[にほん]の お店[みせ]で とりました。去年[きょねん]、わがしを 買[か]った 時[とき]の しゃしんです。",
            "en": "I took it at a Japanese shop in Melbourne, when I bought wagashi last year."
          }
        },
        {
          "ja": "いつの しゃしんですか。",
          "en": "When is the photo from?",
          "model": {
            "ja": "去年[きょねん]の 春[はる]の しゃしんです。さくらの かたちの わがしが ありました。",
            "en": "It is from last spring. There were wagashi shaped like cherry blossom."
          }
        },
        {
          "ja": "どうして この しゃしんを えらびましたか。",
          "en": "Why did you choose this photo?",
          "model": {
            "ja": "わがしが きせつと かんけいが あることを 見[み]せたかったからです。春[はる]の かたちが よく わかります。",
            "en": "Because I wanted to show that wagashi go with the seasons. The spring shapes show it clearly."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "これは わがしの しゃしんです。きれいな おかしが 五[いつ]つ あります。",
          "en": "This is a photo of wagashi. There are five pretty sweets."
        },
        "developed": {
          "ja": "この しゃしんには、小[ちい]さい わがしが 五[いつ]つ ならんでいます。色[いろ]は ピンクや みどりで、花[はな]の かたちを しています。右[みぎ]に おちゃも あります。",
          "en": "In this photo five small wagashi are lined up. They are pink and green and shaped like flowers. There is tea on the right as well."
        },
        "advanced": {
          "ja": "この しゃしんには、小[ちい]さい わがしが 五[いつ]つ ならんでいて、右[みぎ]には おちゃも あります。色[いろ]は ピンクや みどりで、どれも 花[はな]の かたちを しています。春[はる]の わがしだと 思[おも]います。さくらの かたちが あるからです。この しゃしんを えらんだのは、わがしが きせつと かんけいが あることを 見[み]せたかったからです。",
          "en": "In this photo five small wagashi are lined up, with tea on the right as well. They are pink and green and every one is shaped like a flower. I think they are spring wagashi, because one is shaped like a cherry blossom. I chose this photo because I wanted to show that wagashi are connected with the seasons."
        }
      },
      "key_grammar": [
        "〜がならんでいます",
        "〜のかたちをしています",
        "〜のは〜からです"
      ],
      "key_vocab": [
        {
          "ja": "色",
          "reading": "いろ",
          "en": "colour"
        },
        {
          "ja": "かたち",
          "reading": "かたち",
          "en": "shape"
        },
        {
          "ja": "きせつ",
          "reading": "きせつ",
          "en": "season"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2025: Many students were able to integrate their chosen image at different times throughout the discussion, rather than waiting for the assessors to ask about the image.",
        "2024: Students are reminded that their image should be one photo only containing minimal language, and not a collage of photos."
      ],
      "common_errors": [
        "err-vocab-gap"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-img-02",
      "section": "discussion",
      "topic": "image",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "この しゃしんから、どんな ことが わかりますか。",
      "question_en": "What can you tell from this photo?",
      "followups": [
        {
          "ja": "どうして そう 思[おも]いますか。",
          "en": "Why do you think that?",
          "model": {
            "ja": "色[いろ]も かたちも ていねいに 作[つく]ってあって、おさらの 上[うえ]に 少[すこ]しだけ ならべてあるからです。",
            "en": "Because the colours and the shapes are made so carefully, and only a few sit on the plate."
          }
        },
        {
          "ja": "しゃしんに ない ことも せつめいできますか。",
          "en": "Can you explain something the photo does not show?",
          "model": {
            "ja": "はい。わがしは 目[め]で 楽[たの]しむ おかしですが、あじは あまり あまくないです。おちゃと いっしょに 食[た]べます。",
            "en": "Yes. Wagashi are sweets you enjoy with your eyes, but they do not taste very sweet. You eat them with tea."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "日本[にほん]の おかしは きれいだと わかります。",
          "en": "You can tell that Japanese sweets are pretty."
        },
        "developed": {
          "ja": "この しゃしんから、わがしは 目[め]で 楽[たの]しむ おかしだと わかります。色[いろ]も かたちも とても ていねいに 作[つく]ってあります。",
          "en": "From this photo you can tell that wagashi are sweets you enjoy with your eyes. Both the colours and the shapes are made very carefully."
        },
        "advanced": {
          "ja": "この しゃしんから、わがしは 口[くち]だけではなく、目[め]でも 楽[たの]しむ おかしだと わかります。色[いろ]も かたちも ていねいに 作[つく]ってあって、おさらの 上[うえ]に 少[すこ]しだけ ならべてあります。たくさん 出[だ]さないのが 日本[にほん]の やり方[かた]だと 思[おも]います。つまり、わがしは 食[た]べ物[もの]ですが、げいじゅつにも 近[ちか]いと 思[おも]います。",
          "en": "From this photo you can tell that wagashi are sweets you enjoy not only with your mouth but with your eyes. The colours and shapes are made carefully, and only a few are set out on the plate. I think not serving a lot of them is the Japanese way. In other words, wagashi are food, but they are close to art as well."
        }
      },
      "key_grammar": [
        "〜てあります",
        "〜だけではなく",
        "つまり as a connective"
      ],
      "key_vocab": [
        {
          "ja": "ていねい",
          "reading": "ていねい",
          "en": "careful, polite"
        },
        {
          "ja": "ならべる",
          "reading": "ならべる",
          "en": "to line up, to set out"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2024: Many students described their images well but did not explain the connections between the discussion points and what was shown in the image.",
        "2022: Students who scored well were able to bring their image into the discussion in a creative way, rather than just describe the image."
      ],
      "common_errors": [
        "err-narrow-range"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-wha-01",
      "section": "discussion",
      "topic": "what-it-is",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "ディスカッションの トピックは 何[なん]ですか。どんな ものか せつめいしてください。",
      "question_en": "What is your discussion topic? Please explain what it is.",
      "followups": [
        {
          "ja": "どうして その トピックを えらびましたか。",
          "en": "Why did you choose that topic?",
          "model": {
            "ja": "きれいで、見[み]るのが 好[す]きだからです。それに、わがしから 日本[にほん]の きせつの ぶんかが わかります。",
            "en": "Because they are beautiful and I like looking at them. They also show you Japan's culture of the seasons."
          }
        },
        {
          "ja": "一番[いちばん] だいじな ことばを 教[おし]えてください。",
          "en": "Tell me the most important word in your topic.",
          "model": {
            "ja": "「きせつ」が 一番[いちばん] だいじな ことばだと 思[おも]います。わがしの かたちも 名前[なまえ]も きせつで かわるからです。",
            "en": "I think the most important word is kisetsu, the seasons, because both the shapes and the names change with them."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "わがしです。日本[にほん]の 古[ふる]い おかしです。",
          "en": "Wagashi. They are traditional Japanese sweets."
        },
        "developed": {
          "ja": "私[わたし]の トピックは わがしです。わがしは 日本[にほん]の でんとうてきな おかしで、おもちや あんこで 作[つく]ります。おちゃと いっしょに 食[た]べます。",
          "en": "My topic is wagashi. Wagashi are traditional Japanese sweets made from rice cake and sweet bean paste. They are eaten with tea."
        },
        "advanced": {
          "ja": "私[わたし]の トピックは わがしです。わがしは 日本[にほん]の でんとうてきな おかしで、おもち、あんこ、おこめの こななどで 作[つく]ります。バターや ぎゅうにゅうは あまり 使[つか]いません。だから、ケーキより あまくないです。おちゃと いっしょに 食[た]べると、あまさが ちょうど いいと 思[おも]います。",
          "en": "My topic is wagashi. Wagashi are traditional Japanese sweets, made from things like rice cake, sweet bean paste and rice flour. They hardly use butter or milk, so they are less sweet than cake. I think when you eat them with tea the sweetness is just right."
        }
      },
      "key_grammar": [
        "〜で作ります",
        "〜など",
        "〜より comparison",
        "〜と for a clear if or when result"
      ],
      "key_vocab": [
        {
          "ja": "でんとうてき",
          "reading": "でんとうてき",
          "en": "traditional"
        },
        {
          "ja": "あんこ",
          "reading": "あんこ",
          "en": "sweet bean paste"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2021: Students should be able to explain any keywords associated with their subtopic."
      ],
      "common_errors": [
        "err-vocab-gap"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-wha-02",
      "section": "discussion",
      "topic": "what-it-is",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "その ことばの いみを 日本語[にほんご]で せつめいできますか。",
      "question_en": "Can you explain in Japanese what that word means?",
      "followups": [
        {
          "ja": "ほかに どんな ことばが ありますか。",
          "en": "What other key words are there?",
          "model": {
            "ja": "「ようがし」と 「あんこ」です。「ようがし」は 西洋[せいよう]の おかしで、「あんこ」は まめから 作[つく]る あまい ものです。",
            "en": "Yougashi and anko. Yougashi are western sweets, and anko is a sweet paste made from beans."
          }
        },
        {
          "ja": "はじめて 聞[き]いた 人[ひと]に どう せつめいしますか。",
          "en": "How would you explain it to someone hearing it for the first time?",
          "model": {
            "ja": "「日本[にほん]の 古[ふる]い おかしで、おもちや あんこで 作[つく]ります」と せつめいします。それから、ケーキより あまくないと 言[い]います。",
            "en": "I would say they are traditional Japanese sweets made from rice cake and bean paste. Then I would say they are less sweet than cake."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "「わがし」は 日本[にほん]の おかしの いみです。",
          "en": "Wagashi means Japanese sweets."
        },
        "developed": {
          "ja": "「わ」は 日本[にほん]の いみで、「がし」は おかしの いみです。だから、「わがし」は 日本[にほん]の おかしと いう いみです。",
          "en": "Wa means Japanese and gashi means sweets, so wagashi means Japanese sweets."
        },
        "advanced": {
          "ja": "「わ」は 日本[にほん]の いみで、「がし」は おかしの いみです。だから、「わがし」は 日本[にほん]の おかしと いう いみに なります。「ようがし」は 西洋[せいよう]の おかしで、ケーキや クッキーの ことです。二[ふた]つを くらべると、わがしは おこめ、ようがしは こむぎを 使[つか]うことが 多[おお]いです。",
          "en": "Wa means Japanese and gashi means sweets, so wagashi means Japanese sweets. Yougashi means Western sweets, that is, cakes and biscuits. Comparing the two, wagashi mostly use rice and yougashi mostly use wheat."
        }
      },
      "key_grammar": [
        "〜という意味です",
        "〜ことが多いです",
        "comparison with と"
      ],
      "key_vocab": [
        {
          "ja": "いみ",
          "reading": "いみ",
          "en": "meaning"
        },
        {
          "ja": "西洋",
          "reading": "せいよう",
          "en": "the West"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2022: They were able to define key words and terminology related to their topic, such as explaining what 給食 are.",
        "2023: If talking about キャラ弁, students should know the word えいよう.",
        "2025: If the subtopic is 花見, students should know the word さくら."
      ],
      "common_errors": [
        "err-vocab-gap"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-his-01",
      "section": "discussion",
      "topic": "history",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "その ぶんかは いつから 始[はじ]まりましたか。",
      "question_en": "When did this part of the culture begin?",
      "followups": [
        {
          "ja": "だれが 始[はじ]めましたか。",
          "en": "Who started it?",
          "model": {
            "ja": "一人[ひとり]の 人[ひと]が 始[はじ]めたのでは ないと 思[おも]います。中国[ちゅうごく]から おちゃが 入[はい]ってきてから、少[すこ]しずつ 広[ひろ]がりました。",
            "en": "I do not think one person started it. It spread little by little after tea came in from China."
          }
        },
        {
          "ja": "どうして 始[はじ]まったと 思[おも]いますか。",
          "en": "Why do you think it started?",
          "model": {
            "ja": "おちゃを 飲[の]む 時[とき]に 少[すこ]し あまい ものが ひつようだったからだと 思[おも]います。",
            "en": "Because people wanted something a little sweet to go with tea, I think."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "とても 古[ふる]い じだいから あります。",
          "en": "It goes back to very old times."
        },
        "developed": {
          "ja": "わがしは 千年[せんねん]ぐらい 前[まえ]から あると 聞[き]きました。はじめは くだものや 木[き]の みを 食[た]べていましたが、だんだん さとうを 使[つか]うように なりました。",
          "en": "I have read that wagashi go back about a thousand years. At first people ate fruit and nuts, and gradually sugar came to be used."
        },
        "advanced": {
          "ja": "わがしは 千年[せんねん]ぐらい 前[まえ]から あると 聞[き]きました。はじめは くだものや 木[き]の みが 「おかし」でしたが、中国[ちゅうごく]から おちゃが 入[はい]ってきてから、おちゃと いっしょに 食[た]べる おかしが 作[つく]られるように なりました。さとうが 安[やす]く なったのは 四百[よんひゃく]年[ねん]ぐらい 前[まえ]で、その 時[とき]から いろいろな わがしが 広[ひろ]がりました。",
          "en": "I have read that wagashi go back about a thousand years. At first fruit and nuts were the sweets, but after tea came in from China, sweets began to be made to eat alongside tea. Sugar became cheap about four hundred years ago, and from then on many kinds of wagashi spread."
        }
      },
      "key_grammar": [
        "〜と聞きました",
        "〜てから",
        "〜られるようになりました",
        "past tense throughout"
      ],
      "key_vocab": [
        {
          "ja": "じだい",
          "reading": "じだい",
          "en": "era, period"
        },
        {
          "ja": "広がる",
          "reading": "ひろがる",
          "en": "to spread"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2023: Students should be prepared to respond to a variety of question words in order to discuss their chosen subtopic from multiple perspectives.",
        "2023: Students should use the correct tense when responding to the assessor's questions."
      ],
      "common_errors": [
        "err-tense"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-his-02",
      "section": "discussion",
      "topic": "history",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "その ぶんかは どうして 日本[にほん]で 生[う]まれたと 思[おも]いますか。",
      "question_en": "Why do you think this grew up in Japan?",
      "followups": [
        {
          "ja": "ほかの 国[くに]にも ありますか。",
          "en": "Is there nothing like it in other countries?",
          "model": {
            "ja": "中国[ちゅうごく]にも おちゃと いっしょに 食[た]べる おかしが あります。でも、きせつで かたちが かわるのは 日本[にほん]だけだと 思[おも]います。",
            "en": "China has sweets you eat with tea as well. But I think only Japan changes the shapes with the seasons."
          }
        },
        {
          "ja": "日本[にほん]の 天気[てんき]や 場所[ばしょ]と かんけいが ありますか。",
          "en": "Is it connected with Japan's climate or geography?",
          "model": {
            "ja": "あると 思[おも]います。日本[にほん]は きせつが はっきり 分[わ]かれていて、おこめも よく できる 国[くに]だからです。",
            "en": "I think so. Japan has four clear seasons and grows rice well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "日本[にほん]には おちゃの ぶんかが あるからだと 思[おも]います。",
          "en": "I think it is because Japan has a tea culture."
        },
        "developed": {
          "ja": "日本[にほん]には おちゃの ぶんかが あるので、おちゃに あう おかしが ひつようだったと 思[おも]います。それに、日本[にほん]は おこめの 国[くに]なので、おこめで おかしを 作[つく]りました。",
          "en": "Japan has a tea culture, so I think sweets that suit tea were needed. On top of that, Japan is a rice country, so sweets were made from rice."
        },
        "advanced": {
          "ja": "一番[いちばん] 大[おお]きい りゆうは おちゃだと 思[おも]います。日本[にほん]では おちゃを 飲[の]む 時[とき]に 少[すこ]し あまい ものを 食[た]べるので、おちゃに あう おかしが ひつようでした。それに、日本[にほん]は おこめが よく できる 国[くに]で、きせつも はっきり 分[わ]かれています。だから、きせつの 花[はな]の かたちを した おかしが 生[う]まれたと 思[おも]います。もし 日本[にほん]に 四[よっ]つの きせつが なかったら、わがしは こんなに きれいに ならなかったと 思[おも]います。",
          "en": "I think the biggest reason is tea. In Japan people eat something slightly sweet when they drink tea, so sweets that suit tea were needed. On top of that, Japan is a country where rice grows well and the seasons are clearly separated. So I think sweets shaped like the flowers of each season came about. If Japan did not have four seasons I do not think wagashi would have become this beautiful."
        }
      },
      "key_grammar": [
        "relative clause かたちをしたおかし",
        "もし〜なかったら",
        "〜と思います"
      ],
      "key_vocab": [
        {
          "ja": "りゆう",
          "reading": "りゆう",
          "en": "reason"
        },
        {
          "ja": "分かれる",
          "reading": "わかれる",
          "en": "to be divided"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2025: They should select a subtopic that requires critical thinking and that can be discussed in depth from multiple perspectives.",
        "2020: They were also able to respond to hypothetical questions."
      ],
      "common_errors": [
        "err-narrow-range"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-who-01",
      "section": "discussion",
      "topic": "who-and-when",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "だれが それを しますか。いつ しますか。",
      "question_en": "Who does it, and when?",
      "followups": [
        {
          "ja": "わかい 人[ひと]も しますか。",
          "en": "Do young people do it too?",
          "model": {
            "ja": "わかい 人[ひと]は ケーキの ほうが 好[す]きだと 思[おも]います。でも、お正月[しょうがつ]には 家族[かぞく]みんなで 食[た]べます。",
            "en": "I think young people prefer cake. But at New Year the whole family eats them."
          }
        },
        {
          "ja": "一年[いちねん]の 中[なか]で いつ 一番[いちばん] 多[おお]いですか。",
          "en": "When in the year is it most common?",
          "model": {
            "ja": "お正月[しょうがつ]と おまつりの 時[とき]が 一番[いちばん] 多[おお]いです。春[はる]は さくらの かたちの わがしも 売[う]っています。",
            "en": "New Year and festival time are the busiest. In spring the shops also sell wagashi shaped like cherry blossom."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "みんな 食[た]べます。おきゃくさんが 来[き]た 時[とき]に 出[だ]します。",
          "en": "Everyone eats them. They are served when guests come."
        },
        "developed": {
          "ja": "わがしは だれでも 食[た]べますが、とくに おとなが よく 食[た]べます。おきゃくさんが 来[き]た 時[とき]や、おまつりの 時[とき]に 出[だ]します。",
          "en": "Anyone eats wagashi, but adults eat them most. They are served when guests come and at festivals."
        },
        "advanced": {
          "ja": "わがしは だれでも 食[た]べますが、とくに おとなや おちゃの きょうしつに 行[い]く 人[ひと]が よく 食[た]べます。おきゃくさんが 来[き]た 時[とき]や、お正月[しょうがつ]や おまつりの 時[とき]に 出[だ]します。きせつに よって かたちが かわるので、春[はる]は さくら、秋[あき]は もみじの かたちに なります。子[こ]どもは ケーキの ほうが 好[す]きだそうですが、学校[がっこう]の 行事[ぎょうじ]で わがしを 作[つく]ることも あるそうです。",
          "en": "Anyone eats wagashi, but adults and people who go to tea classes eat them most. They are served when guests come, at New Year and at festivals. The shapes change with the season, so spring brings cherry blossom and autumn brings maple leaves. Apparently children prefer cake, but I have read that schools sometimes make wagashi as a school activity."
        }
      },
      "key_grammar": [
        "〜によって",
        "〜や listing",
        "〜そうです for something you have read or heard",
        "〜こともあります"
      ],
      "key_vocab": [
        {
          "ja": "お正月",
          "reading": "おしょうがつ",
          "en": "New Year"
        },
        {
          "ja": "とくに",
          "reading": "とくに",
          "en": "especially"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2022: Students are reminded that they should prepare enough information to sustain the eight-minute discussion with the assessors."
      ],
      "common_errors": [
        "err-particle"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-who-02",
      "section": "discussion",
      "topic": "who-and-when",
      "question_type": "factual",
      "higher_order": false,
      "difficulty": 2,
      "question_ja": "その ぶんかは 日本[にほん]の どこで 見[み]られますか。",
      "question_en": "Where in Japan can this be seen?",
      "followups": [
        {
          "ja": "町[まち]に よって ちがいますか。",
          "en": "Does it differ from place to place?",
          "model": {
            "ja": "はい、ちがいます。その 町[まち]だけの わがしも あって、おみやげに 買[か]う 人[ひと]が 多[おお]いです。",
            "en": "Yes. Some wagashi belong to one town only, and plenty of people buy them to take home."
          }
        },
        {
          "ja": "メルボルンでも 見[み]られますか。",
          "en": "Can it be seen in Melbourne too?",
          "model": {
            "ja": "日本[にほん]の 食[た]べ物[もの]の お店[みせ]で 少[すこ]し 買[か]えます。でも、しゅるいは 多[おお]くないです。",
            "en": "You can buy a few at the Japanese food shops. But there is not much variety."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "日本[にほん]の どこでも 見[み]られます。",
          "en": "It can be seen anywhere in Japan."
        },
        "developed": {
          "ja": "わがしは 日本[にほん]の どこでも 買[か]えますが、京都[きょうと]が 一番[いちばん] ゆうめいです。駅[えき]の 中[なか]の お店[みせ]や デパートでも 売[う]っています。",
          "en": "You can buy wagashi anywhere in Japan, but Kyoto is the most famous. They are sold in station shops and department stores too."
        },
        "advanced": {
          "ja": "わがしは 日本[にほん]の どこでも 買[か]えますが、京都[きょうと]が 一番[いちばん] ゆうめいです。古[ふる]い お店[みせ]が 多[おお]くて、三百[さんびゃく]年[ねん]も つづいている お店[みせ]も あるそうです。町[まち]に よって わがしが ちがって、その 町[まち]だけの わがしも あります。メルボルンでも 日本[にほん]の 食[た]べ物[もの]の お店[みせ]で 少[すこ]し 買[か]えますが、しゅるいは 多[おお]くないです。",
          "en": "You can buy wagashi anywhere in Japan, but Kyoto is the most famous. It has many old shops, and apparently some have been going for three hundred years. The wagashi differ from town to town, and some are found only in one town. In Melbourne you can buy a few at Japanese food shops, but there is not much variety."
        }
      },
      "key_grammar": [
        "〜られます potential",
        "〜によって",
        "relative clause つづいているお店",
        "〜だけの"
      ],
      "key_vocab": [
        {
          "ja": "しゅるい",
          "reading": "しゅるい",
          "en": "kind, variety"
        },
        {
          "ja": "売る",
          "reading": "うる",
          "en": "to sell"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2023: A successful image told some sort of story and enabled students to elaborate on different aspects of the image."
      ],
      "common_errors": [
        "err-particle"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-cha-01",
      "section": "discussion",
      "topic": "change",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "その ぶんかは 前[まえ]と くらべて かわりましたか。",
      "question_en": "Has this changed compared with the past?",
      "followups": [
        {
          "ja": "どんな ところが かわりましたか。",
          "en": "In what way has it changed?",
          "model": {
            "ja": "前[まえ]は おちゃの 時[とき]だけ 食[た]べていましたが、今[いま]は コンビニでも 買[か]えます。チョコレートの わがしも あります。",
            "en": "In the past people ate them only with tea, but now you can buy them at convenience stores. There are even chocolate ones."
          }
        },
        {
          "ja": "いい かわり方[かた]だと 思[おも]いますか。",
          "en": "Do you think it is a good change?",
          "model": {
            "ja": "いいと 思[おも]います。新[あたら]しい わがしが あると、わかい 人[ひと]も 買[か]うからです。でも、古[ふる]い わがしも のこして ほしいです。",
            "en": "I think it is good, because new wagashi bring young buyers. But I hope the old ones stay as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、かわりました。新[あたら]しい わがしが ふえました。",
          "en": "Yes, it has changed. There are more new kinds of wagashi."
        },
        "developed": {
          "ja": "かわったと 思[おも]います。前[まえ]は おちゃの 時[とき]だけ 食[た]べていましたが、今[いま]は コンビニでも 買[か]えます。チョコレートの わがしも あります。",
          "en": "I think it has changed. In the past they were only eaten with tea, but now you can buy them at convenience stores. There are even chocolate wagashi."
        },
        "advanced": {
          "ja": "かわったと 思[おも]います。前[まえ]は おちゃの きょうしつや お正月[しょうがつ]の 時[とき]だけ 食[た]べていましたが、今[いま]は コンビニでも 買[か]えるように なりました。チョコレートや いちごを 使[つか]った 新[あたら]しい わがしも ふえました。でも、古[ふる]い お店[みせ]は 同[おな]じ 作[つく]り方[かた]を まもっています。新[あたら]しい わがしが あっても いいと 思[おも]いますが、古[ふる]い わがしも のこして ほしいです。",
          "en": "I think it has changed. In the past they were only eaten at tea classes or at New Year, but now you can buy them at convenience stores. New wagashi using chocolate and strawberry have appeared too. But the old shops keep making them the same way. I think it is fine to have new wagashi, but I would like the old ones kept as well."
        }
      },
      "key_grammar": [
        "〜ようになりました",
        "〜ても",
        "〜てほしい",
        "前とくらべて comparison"
      ],
      "key_vocab": [
        {
          "ja": "作り方",
          "reading": "つくりかた",
          "en": "the way something is made"
        },
        {
          "ja": "のこす",
          "reading": "のこす",
          "en": "to leave behind, to keep"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2023: They were also able to talk about the good and bad points, and make comparisons with Australia.",
        "2022: Students should listen carefully for the tense used in the question and respond accordingly."
      ],
      "common_errors": [
        "err-tense"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-cha-02",
      "section": "discussion",
      "topic": "change",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "わかい 人[ひと]は この ぶんかに きょうみが あると 思[おも]いますか。",
      "question_en": "Do you think young people are interested in this?",
      "followups": [
        {
          "ja": "どうして そう 思[おも]いますか。",
          "en": "Why do you think that?",
          "model": {
            "ja": "インスタグラムで きれいな わがしの しゃしんが 人気[にんき]に なったからです。しゃしんを とってから 食[た]べる 人[ひと]が 多[おお]いです。",
            "en": "Because photographs of beautiful wagashi have become popular on Instagram. Plenty of people take a photo before they eat."
          }
        },
        {
          "ja": "もっと 人気[にんき]に する ために 何[なに]が できますか。",
          "en": "What could be done to make it more popular?",
          "model": {
            "ja": "お店[みせ]が 新[あたら]しい 色[いろ]や かたちを 作[つく]ると いいと 思[おも]います。学校[がっこう]で 作[つく]り方[かた]を 教[おし]えるのも いいです。",
            "en": "Shops could make new colours and shapes. Teaching how to make them at school would help as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "あまり ないと 思[おも]います。ケーキの ほうが 好[す]きだからです。",
          "en": "I think not much, because they prefer cake."
        },
        "developed": {
          "ja": "わかい 人[ひと]は わがしより ケーキの ほうが 好[す]きだと 思[おも]います。でも、インスタグラムで きれいな わがしの しゃしんが 人気[にんき]に なったので、少[すこ]しずつ きょうみが ふえてきました。",
          "en": "I think young people prefer cake to wagashi. But photos of beautiful wagashi have become popular on Instagram, so interest has been growing little by little."
        },
        "advanced": {
          "ja": "前[まえ]は わかい 人[ひと]は わがしに あまり きょうみが なかったと 思[おも]います。ケーキの ほうが あまくて、ねだんも 安[やす]いからです。でも、さいきんは インスタグラムで きれいな わがしの しゃしんが 人気[にんき]に なって、きょうみが ふえてきました。だから、お店[みせ]は わかい 人[ひと]の ために 新[あたら]しい かたちや 色[いろ]の わがしを 作[つく]るように なりました。これも 一[ひと]つの こたえだと 思[おも]います。",
          "en": "I think young people used not to be very interested in wagashi, because cake is sweeter and cheaper. But recently photos of beautiful wagashi have become popular on Instagram and interest has grown. So shops have started making wagashi in new shapes and colours for young people. I think that is one answer."
        }
      },
      "key_grammar": [
        "〜のほうが",
        "〜てきました",
        "〜のために",
        "〜ようになりました"
      ],
      "key_vocab": [
        {
          "ja": "きょうみ",
          "reading": "きょうみ",
          "en": "interest"
        },
        {
          "ja": "ねだん",
          "reading": "ねだん",
          "en": "price"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2025: The students who were more prepared were able to provide solutions for the わるい点.",
        "2024: They were also able to express their opinion and provide solutions to address issues they raised."
      ],
      "common_errors": [
        "err-narrow-range"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-val-01",
      "section": "discussion",
      "topic": "values",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "この ぶんかから、日本[にほん]の 人[ひと]の 考[かんが]え方[かた]が わかりますか。",
      "question_en": "Does this tell you anything about how Japanese people think?",
      "followups": [
        {
          "ja": "どんな 考[かんが]え方[かた]ですか。",
          "en": "What sort of thinking?",
          "model": {
            "ja": "「多[おお]い ほうが いい」ではなく、「ちょうど いいのが 一番[いちばん] いい」という 考[かんが]え方[かた]だと 思[おも]います。",
            "en": "Not more is better, but just enough is best."
          }
        },
        {
          "ja": "オーストラリアの 考[かんが]え方[かた]と ちがいますか。",
          "en": "Is it different from the Australian way of thinking?",
          "model": {
            "ja": "ちがうと 思[おも]います。オーストラリアの ケーキは 大[おお]きくて あまいので、ここが 一番[いちばん] 大[おお]きい ちがいです。",
            "en": "I think so. Australian cake is big and sweet, and that is the biggest difference."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "きせつを たいせつに すると 思[おも]います。",
          "en": "I think they value the seasons."
        },
        "developed": {
          "ja": "わがしから、日本[にほん]の 人[ひと]は きせつを たいせつに すると わかります。春[はる]は さくら、秋[あき]は もみじの かたちに なるからです。",
          "en": "From wagashi you can tell that Japanese people value the seasons, because the shapes are cherry blossom in spring and maple leaves in autumn."
        },
        "advanced": {
          "ja": "わがしから、日本[にほん]の 人[ひと]は きせつを たいせつに すると わかります。春[はる]は さくら、秋[あき]は もみじの かたちに なって、名前[なまえ]も きせつの ことばを 使[つか]います。それに、小[ちい]さく 作[つく]って、少[すこ]しだけ 出[だ]します。つまり、「多[おお]い ほうが いい」ではなく、「ちょうど いいのが 一番[いちばん] いい」という 考[かんが]え方[かた]だと 思[おも]います。オーストラリアの ケーキは 大[おお]きくて あまいので、ここが 一番[いちばん] 大[おお]きい ちがいだと 思[おも]います。",
          "en": "From wagashi you can tell that Japanese people value the seasons: the shapes are cherry blossom in spring and maple leaves in autumn, and the names use seasonal words too. On top of that they are made small and only a few are served. In other words, I think the thinking is not more is better but just right is best. Australian cakes are big and sweet, so I think that is the biggest difference."
        }
      },
      "key_grammar": [
        "〜ではなく〜という",
        "つまり as a connective",
        "くて joining い-adjectives"
      ],
      "key_vocab": [
        {
          "ja": "考え方",
          "reading": "かんがえかた",
          "en": "way of thinking"
        },
        {
          "ja": "ちょうど",
          "reading": "ちょうど",
          "en": "exactly, just right"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2023: They were also able to talk about the good and bad points, and make comparisons with Australia.",
        "2025: Many students used adjectives incorrectly, such as かわいいの人 instead of かわいい人, きれいかった instead of きれいでした."
      ],
      "common_errors": [
        "err-omou"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-val-02",
      "section": "discussion",
      "topic": "values",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "この ぶんかは 日本[にほん]の 社会[しゃかい]に どんな えいきょうを あたえていますか。",
      "question_en": "What effect does this have on Japanese society?",
      "followups": [
        {
          "ja": "いい えいきょうですか、わるい えいきょうですか。",
          "en": "Is the effect good or bad?",
          "model": {
            "ja": "いい えいきょうだと 思[おも]います。わがしの お店[みせ]は 小[ちい]さい 町[まち]にも あって、町[まち]の 仕事[しごと]を 作[つく]っているからです。",
            "en": "Good, I think, because wagashi shops are in the small towns too and make local work."
          }
        },
        {
          "ja": "もんだいも ありますか。",
          "en": "Are there problems as well?",
          "model": {
            "ja": "あります。わがしを 作[つく]れる 人[ひと]が だんだん 少[すく]なく なって、古[ふる]い お店[みせ]が しまっています。",
            "en": "Yes. Fewer and fewer people can make them, and the old shops are closing."
          }
        },
        {
          "ja": "その もんだいは どうしたら いいと 思[おも]いますか。",
          "en": "How could that problem be fixed?",
          "model": {
            "ja": "学校[がっこう]で わがしの 作[つく]り方[かた]を 教[おし]えた ほうが いいと 思[おも]います。わかい 人[ひと]が つづけられるからです。",
            "en": "I think schools should teach how to make them, so that young people can carry it on."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "いい えいきょうを あたえていると 思[おも]います。",
          "en": "I think the effect is good."
        },
        "developed": {
          "ja": "わがしの お店[みせ]は 小[ちい]さい 町[まち]にも あるので、町[まち]の 仕事[しごと]を 作[つく]っています。それに、外国[がいこく]の 人[ひと]も わがしを 買[か]いに 来[き]ます。",
          "en": "Wagashi shops are found in small towns too, so they create local work. On top of that, people from overseas come to buy wagashi."
        },
        "advanced": {
          "ja": "いい えいきょうが 二[ふた]つ あると 思[おも]います。一[ひと]つは、わがしの お店[みせ]が 小[ちい]さい 町[まち]にも あって、その 町[まち]の 仕事[しごと]を 作[つく]っていることです。もう 一[ひと]つは、外国[がいこく]の 人[ひと]が わがしを 見[み]て、日本[にほん]に きょうみを もつことです。でも、もんだいも あります。わがしを 作[つく]れる 人[ひと]が だんだん 少[すく]なく なっているので、古[ふる]い お店[みせ]が しまってしまいます。だから、学校[がっこう]で わがしの 作[つく]り方[かた]を 教[おし]えた ほうが いいと 思[おも]います。",
          "en": "I think there are two good effects. One is that wagashi shops are found in small towns and create local work. The other is that people from overseas see wagashi and become interested in Japan. But there are problems too. Fewer and fewer people can make wagashi, so old shops are closing. So I think schools should teach how wagashi are made."
        }
      },
      "key_grammar": [
        "一つは〜もう一つは",
        "〜ていること",
        "〜てしまいます",
        "〜たほうがいい"
      ],
      "key_vocab": [
        {
          "ja": "えいきょう",
          "reading": "えいきょう",
          "en": "influence, effect"
        },
        {
          "ja": "しまる",
          "reading": "しまる",
          "en": "to close"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2022: They were able to support and defend their opinions, provide thoughtful solutions to the problems they had identified, and make comparisons with Australia."
      ],
      "common_errors": [
        "err-narrow-range"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-com-01",
      "section": "discussion",
      "topic": "compare",
      "question_type": "comparison",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "オーストラリアにも にている ものが ありますか。",
      "question_en": "Is there anything similar in Australia?",
      "followups": [
        {
          "ja": "どこが 同[おな]じですか。",
          "en": "What is the same?",
          "model": {
            "ja": "どちらも おちゃや コーヒーと いっしょに 食[た]べます。おきゃくさんが 来[き]た 時[とき]にも 出[だ]します。",
            "en": "Both go with tea or coffee. You serve both when guests come, too."
          }
        },
        {
          "ja": "どこが ちがいますか。",
          "en": "What is different?",
          "model": {
            "ja": "大[おお]きさと あまさが ちがいます。わがしは 小[ちい]さくて、あまさも 少[すこ]しです。",
            "en": "The size and the sweetness. Wagashi are small and only a little sweet."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、ケーキが にていると 思[おも]います。",
          "en": "Yes, I think cake is similar."
        },
        "developed": {
          "ja": "オーストラリアの ケーキが にていると 思[おも]います。どちらも おちゃや コーヒーと いっしょに 食[た]べます。でも、ケーキの ほうが 大[おお]きくて あまいです。",
          "en": "I think Australian cake is similar. Both are eaten with tea or coffee. But cake is bigger and sweeter."
        },
        "advanced": {
          "ja": "オーストラリアの ケーキや ラミントンが にていると 思[おも]います。どちらも おちゃや コーヒーと いっしょに 食[た]べて、おきゃくさんが 来[き]た 時[とき]に 出[だ]します。ちがう ところは 大[おお]きさと あまさです。わがしは 小[ちい]さくて、あまさも 少[すこ]しです。それに、わがしは きせつに よって かわりますが、ラミントンは 一年中[いちねんじゅう] 同[おな]じです。",
          "en": "I think Australian cakes and lamingtons are similar. Both are eaten with tea or coffee and served when guests come. The differences are size and sweetness. Wagashi are small and only slightly sweet. On top of that, wagashi change with the season while a lamington is the same all year."
        }
      },
      "key_grammar": [
        "どちらも",
        "〜のほうが",
        "くて joining い-adjectives",
        "〜が〜は contrast"
      ],
      "key_vocab": [
        {
          "ja": "大きさ",
          "reading": "おおきさ",
          "en": "size"
        },
        {
          "ja": "一年中",
          "reading": "いちねんじゅう",
          "en": "all year round"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2023: They were also able to talk about the good and bad points, and make comparisons with Australia.",
        "2022: Some errors were noted in basic adjective agreements, especially when using くて to join い adjectives."
      ],
      "common_errors": [
        "err-adj-conj"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-com-02",
      "section": "discussion",
      "topic": "compare",
      "question_type": "hypothetical",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "もし この ぶんかを オーストラリアに もってきたら、人気[にんき]に なると 思[おも]いますか。",
      "question_en": "If this were brought to Australia, do you think it would be popular?",
      "followups": [
        {
          "ja": "どうしてですか。",
          "en": "Why?",
          "model": {
            "ja": "メルボルンの 人[ひと]は カフェが 好[す]きで、新[あたら]しい 食[た]べ物[もの]を ためすのが 好[す]きだからです。",
            "en": "Because people in Melbourne like cafes and like trying new food."
          }
        },
        {
          "ja": "何[なに]を かえた ほうが いいですか。",
          "en": "What would need to change?",
          "model": {
            "ja": "ねだんと あじだと 思[おも]います。あんこが あわない 人[ひと]も いるので、いちごや レモンの わがしから 始[はじ]めた ほうが いいです。",
            "en": "The price and the flavour. Bean paste does not suit everyone, so it would be better to start with strawberry or lemon."
          }
        },
        {
          "ja": "だれが 買[か]うと 思[おも]いますか。",
          "en": "Who do you think would buy it?",
          "model": {
            "ja": "カフェに よく 行[い]く わかい 人[ひと]だと 思[おも]います。しゃしんを とる 人[ひと]も 買[か]うと 思[おも]います。",
            "en": "Young people who go to cafes a lot. People who like taking photographs would buy them as well."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、人気[にんき]に なると 思[おも]います。きれいだからです。",
          "en": "Yes, I think it would be popular, because it is beautiful."
        },
        "developed": {
          "ja": "人気[にんき]に なると 思[おも]います。メルボルンの 人[ひと]は カフェが 好[す]きで、新[あたら]しい 食[た]べ物[もの]を ためすのが 好[す]きだからです。でも、ねだんが 高[たか]いと、あまり 売[う]れないと 思[おも]います。",
          "en": "I think it would be popular, because people in Melbourne like cafes and like trying new food. But if the price is high I do not think it would sell well."
        },
        "advanced": {
          "ja": "ある ていど 人気[にんき]に なると 思[おも]います。メルボルンの 人[ひと]は カフェが 好[す]きで、しゃしんを とるのも 好[す]きなので、きれいな わがしは すぐに 広[ひろ]がると 思[おも]います。でも、もんだいが 二[ふた]つ あります。一[ひと]つは ねだんで、もう 一[ひと]つは あじです。オーストラリアの 人[ひと]には あんこが あわないかも しれません。だから、はじめは いちごや レモンを 入[い]れた わがしから 始[はじ]めた ほうが いいと 思[おも]います。",
          "en": "I think it would be popular up to a point. People in Melbourne like cafes and like taking photos, so I think beautiful wagashi would spread quickly. But there are two problems: the price and the taste. Sweet bean paste may not suit Australian palates. So I think it would be better to start with wagashi made with strawberry or lemon."
        }
      },
      "key_grammar": [
        "もし〜たら",
        "〜かもしれません",
        "〜たほうがいい",
        "一つは〜もう一つは"
      ],
      "key_vocab": [
        {
          "ja": "ためす",
          "reading": "ためす",
          "en": "to try something out"
        },
        {
          "ja": "あじ",
          "reading": "あじ",
          "en": "taste, flavour"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2024: Some students were unable to respond to hypothetical questions such as, 'What would you include on the school lunch menu if it was available in Australia?'"
      ],
      "common_errors": [
        "err-narrow-range"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-per-01",
      "section": "discussion",
      "topic": "personal",
      "question_type": "personal",
      "higher_order": false,
      "difficulty": 1,
      "question_ja": "その ぶんかを じっさいに けいけんしたことが ありますか。",
      "question_en": "Have you actually experienced this yourself?",
      "followups": [
        {
          "ja": "どこで けいけんしましたか。",
          "en": "Where was that?",
          "model": {
            "ja": "去年[きょねん]、メルボルンの 日本[にほん]の お店[みせ]で わがしを 買[か]って、家族[かぞく]と 食[た]べました。",
            "en": "Last year I bought wagashi at a Japanese shop in Melbourne and ate them with my family."
          }
        },
        {
          "ja": "どうでしたか。",
          "en": "How was it?",
          "model": {
            "ja": "きれいで、「食[た]べるのが もったいない」と 思[おも]いました。あじは ケーキより あまくなくて、おちゃと よく あいました。",
            "en": "They were beautiful, and I thought it was almost a shame to eat them. They were less sweet than cake and went well with tea."
          }
        },
        {
          "ja": "また したいですか。",
          "en": "Would you do it again?",
          "model": {
            "ja": "はい、また 食[た]べたいです。つぎは 日本[にほん]で 食[た]べてみたいです。",
            "en": "Yes, I would like to eat them again. Next time I want to eat them in Japan."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、あります。おいしかったです。",
          "en": "Yes, I have. It was delicious."
        },
        "developed": {
          "ja": "はい、あります。去年[きょねん]、メルボルンの 日本[にほん]の お店[みせ]で わがしを 買[か]って 食[た]べました。きれいで、あまさも ちょうど よかったです。",
          "en": "Yes, I have. Last year I bought and ate wagashi at a Japanese shop in Melbourne. They were beautiful and just sweet enough."
        },
        "advanced": {
          "ja": "はい、あります。去年[きょねん]、メルボルンの 日本[にほん]の お店[みせ]で わがしを 三[みっ]つ 買[か]って、家族[かぞく]と 食[た]べました。見[み]た 時[とき]は 「食[た]べるのが もったいない」と 思[おも]いました。あじは ケーキより あまくなくて、おちゃと よく あいました。でも、父[ちち]は あんこが あまり 好[す]きじゃなかったので、一[ひと]つだけ 食[た]べました。その 時[とき]、ぶんかは 人[ひと]に よって かんじ方[かた]が ちがうと 思[おも]いました。",
          "en": "Yes, I have. Last year I bought three wagashi at a Japanese shop in Melbourne and ate them with my family. When I saw them I thought it seemed a shame to eat them. They were less sweet than cake and went well with tea. But my father does not much like sweet bean paste, so he only ate one. That made me think people experience a culture differently."
        }
      },
      "key_grammar": [
        "〜たことがあります",
        "quotation with と思いました",
        "〜によって",
        "past tense throughout"
      ],
      "key_vocab": [
        {
          "ja": "じっさいに",
          "reading": "じっさいに",
          "en": "actually, in reality"
        },
        {
          "ja": "かんじ方",
          "reading": "かんじかた",
          "en": "the way something is felt"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2022: Students should listen carefully for the tense used in the question and respond accordingly."
      ],
      "common_errors": [
        "err-tense"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-per-02",
      "section": "discussion",
      "topic": "personal",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 2,
      "question_ja": "どうして この トピックを えらびましたか。",
      "question_en": "Why did you choose this topic?",
      "followups": [
        {
          "ja": "ほかに どんな トピックを 考[かんが]えましたか。",
          "en": "What other topics did you consider?",
          "model": {
            "ja": "はじめは おまつりに しようと 思[おも]いましたが、大[おお]きすぎて、八分[はっぷん]で 話[はな]すのが むずかしいと 思[おも]いました。",
            "en": "At first I thought about festivals, but the topic was too big to cover in eight minutes."
          }
        },
        {
          "ja": "しらべて 一番[いちばん] おどろいたことは 何[なん]ですか。",
          "en": "What surprised you most in your research?",
          "model": {
            "ja": "わがしが 千年[せんねん]ぐらい 前[まえ]から あることに おどろきました。さとうが 安[やす]く なったのは 四百年[よんひゃくねん]ぐらい 前[まえ]だそうです。",
            "en": "I was surprised that wagashi go back about a thousand years. Sugar apparently became cheap only about four hundred years ago."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "きれいで、おもしろいからです。",
          "en": "Because it is beautiful and interesting."
        },
        "developed": {
          "ja": "わがしを えらんだ りゆうは 二[ふた]つ あります。一[ひと]つは、きれいで、見[み]るのが 好[す]きだからです。もう 一[ひと]つは、わがしから 日本[にほん]の きせつの ぶんかが わかるからです。",
          "en": "I have two reasons for choosing wagashi. One is that they are beautiful and I like looking at them. The other is that wagashi show you Japan's culture of the seasons."
        },
        "advanced": {
          "ja": "わがしを えらんだ りゆうは 二[ふた]つ あります。一[ひと]つは、はじめて 食[た]べた 時[とき]に、あまり あまくなくて おどろいたからです。もう 一[ひと]つは、わがしから 日本[にほん]の きせつの ぶんかが わかるからです。はじめは おまつりに しようと 思[おも]いましたが、大[おお]きすぎて、八分[はっぷん]で 話[はな]すのが むずかしいと 思[おも]いました。わがしは 小[ちい]さい トピックですが、れきしも ぶんかも 考[かんが]えられるので、えらびました。",
          "en": "I have two reasons for choosing wagashi. One is that the first time I ate one I was surprised how little sugar it had. The other is that wagashi show you Japan's culture of the seasons. At first I thought of doing festivals, but that was too big and I thought it would be hard to cover in eight minutes. Wagashi are a small topic, but you can think about history and culture through them, so I chose them."
        }
      },
      "key_grammar": [
        "りゆうは二つあります",
        "〜しようと思いました",
        "〜すぎる",
        "〜ので"
      ],
      "key_vocab": [
        {
          "ja": "おどろく",
          "reading": "おどろく",
          "en": "to be surprised"
        },
        {
          "ja": "えらぶ",
          "reading": "えらぶ",
          "en": "to choose"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2025: They should select a subtopic that requires critical thinking and that can be discussed in depth from multiple perspectives.",
        "2024: Students who chose more familiar topics, such as vending machines and convenience stores, generally performed well.",
        "2023: おどろいたことは何ですか。 named in the report as a question students answered well."
      ],
      "common_errors": [
        "err-vocab-gap"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-fut-01",
      "section": "discussion",
      "topic": "future",
      "question_type": "opinion",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "この ぶんかは これから どう なると 思[おも]いますか。",
      "question_en": "What do you think will happen to this in future?",
      "followups": [
        {
          "ja": "十年後[じゅうねんご]は どうですか。",
          "en": "What about in ten years?",
          "model": {
            "ja": "十年後[じゅうねんご]も あると 思[おも]いますが、新[あたら]しい あじの わがしが ふえると 思[おも]います。",
            "en": "I think they will still be here in ten years, but with more new flavours."
          }
        },
        {
          "ja": "なくなると 思[おも]いますか。",
          "en": "Do you think it will disappear?",
          "model": {
            "ja": "なくなるとは 思[おも]いません。でも、古[ふる]い お店[みせ]は へるかも しれません。",
            "en": "I do not think they will disappear. But the old shops may grow fewer."
          }
        },
        {
          "ja": "だれが まもると 思[おも]いますか。",
          "en": "Who do you think will protect it?",
          "model": {
            "ja": "古[ふる]い お店[みせ]と 学校[がっこう]だと 思[おも]います。作[つく]り方[かた]を 教[おし]えたら、わかい 人[ひと]が つづけられます。",
            "en": "The old shops and the schools. If they teach how to make them, young people can carry it on."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "これからも つづくと 思[おも]います。",
          "en": "I think it will carry on."
        },
        "developed": {
          "ja": "これからも つづくと 思[おも]いますが、かたちが かわると 思[おも]います。外国[がいこく]の 人[ひと]が ふえているので、英語[えいご]の メニューも ふえるでしょう。",
          "en": "I think it will carry on, but the form will change. More people are coming from overseas, so there will probably be more English menus."
        },
        "advanced": {
          "ja": "これからも つづくと 思[おも]いますが、かたちは かわると 思[おも]います。わがしを 作[つく]れる 人[ひと]が 少[すく]なく なっているので、古[ふる]い お店[みせ]は へるかも しれません。でも、外国[がいこく]の 人[ひと]が ふえているので、新[あたら]しい わがしや 英語[えいご]の メニューも ふえるでしょう。もし 学校[がっこう]で 作[つく]り方[かた]を 教[おし]えたら、わかい 人[ひと]が つづけられると 思[おも]います。だから、なくなるのではなく、かわって のこると 思[おも]います。",
          "en": "I think it will carry on, but the form will change. Fewer people can make wagashi, so the old shops may decrease. But more people are coming from overseas, so there will probably be more new wagashi and more English menus. If schools taught how to make them, I think young people could keep it going. So I think it will not disappear but change and remain."
        }
      },
      "key_grammar": [
        "〜でしょう",
        "〜かもしれません",
        "もし〜たら",
        "〜のではなく"
      ],
      "key_vocab": [
        {
          "ja": "へる",
          "reading": "へる",
          "en": "to decrease"
        },
        {
          "ja": "のこる",
          "reading": "のこる",
          "en": "to remain"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2025: They should select a subtopic that requires critical thinking and that can be discussed in depth from multiple perspectives."
      ],
      "common_errors": [
        "err-omou"
      ],
      "model_topic": "わがし"
    },
    {
      "id": "d-fut-02",
      "section": "discussion",
      "topic": "future",
      "question_type": "evaluative",
      "higher_order": true,
      "difficulty": 3,
      "question_ja": "この ぶんかを まもるのは たいせつだと 思[おも]いますか。",
      "question_en": "Do you think it is important to protect this?",
      "followups": [
        {
          "ja": "だれが まもりますか。",
          "en": "Who should protect it?",
          "model": {
            "ja": "お店[みせ]の 人[ひと]だけでは むずかしいと 思[おも]います。学校[がっこう]や 町[まち]も いっしょに まもった ほうが いいです。",
            "en": "The shopkeepers alone would struggle. Schools and local councils should help."
          }
        },
        {
          "ja": "お金[かね]が かかっても まもりますか。",
          "en": "Should it be protected even if it costs money?",
          "model": {
            "ja": "はい。ぶんかが なくなると、その 国[くに]の れきしも わからなく なるからです。",
            "en": "Yes, because when a culture disappears you lose that country's history with it."
          }
        },
        {
          "ja": "新[あたら]しい ぶんかの ほうが たいせつですか。",
          "en": "Is new culture more important?",
          "model": {
            "ja": "どちらも たいせつだと 思[おも]います。古[ふる]い ぶんかを 使[つか]いながら、新[あたら]しい ものを 作[つく]るのが 一番[いちばん] いいと 思[おも]います。",
            "en": "Both matter. The best thing is to make new things while still using the old culture."
          }
        }
      ],
      "model_responses": {
        "basic": {
          "ja": "はい、たいせつだと 思[おも]います。",
          "en": "Yes, I think it is important."
        },
        "developed": {
          "ja": "たいせつだと 思[おも]います。ぶんかが なくなると、その 国[くに]の れきしも わからなく なるからです。学校[がっこう]や 町[まち]が 子[こ]どもに 教[おし]えた ほうが いいと 思[おも]います。",
          "en": "I think it is important, because if a culture disappears you lose that country's history too. I think schools and local councils should teach it to children."
        },
        "advanced": {
          "ja": "とても たいせつだと 思[おも]います。ぶんかが なくなると、その 国[くに]の れきしや 考[かんが]え方[かた]も わからなく なるからです。でも、むかしと 同[おな]じ かたちで まもるのは むずかしいと 思[おも]います。だから、学校[がっこう]で 作[つく]り方[かた]を 教[おし]えたり、新[あたら]しい あじを 作[つく]ったり して、わかい 人[ひと]が きょうみを もつように した ほうが いいと 思[おも]います。つまり、はこの 中[なか]に 入[い]れて まもるのではなく、使[つか]いながら まもるのが 一番[いちばん] いいと 思[おも]います。",
          "en": "I think it is very important, because if a culture disappears you lose that country's history and ways of thinking too. But I think protecting it in exactly its old form is hard. So I think it is better to teach how it is made at school and create new flavours, so that young people take an interest. In other words, I think the best way is not to protect it by putting it in a box but to protect it by using it."
        }
      },
      "key_grammar": [
        "〜たり〜たりして",
        "〜ようにする",
        "〜ながら",
        "〜のではなく"
      ],
      "key_vocab": [
        {
          "ja": "まもる",
          "reading": "まもる",
          "en": "to protect"
        },
        {
          "ja": "むかし",
          "reading": "むかし",
          "en": "the past, long ago"
        }
      ],
      "criteria_targeted": [
        "c2-content",
        "c2-language"
      ],
      "report_refs": [
        "2022: They were able to support and defend their opinions, provide thoughtful solutions to the problems they had identified, and make comparisons with Australia.",
        "2024: Students tended to use familiar grammatical structures repeatedly."
      ],
      "common_errors": [
        "err-tari"
      ],
      "model_topic": "わがし"
    }
  ],
  "topic_sets": [
    {
      "id": "ts-omatsuri",
      "topic_ja": "おまつり",
      "topic_en": "Japanese festivals",
      "why_it_works": "Named in the reports every year from 2021 to 2025. Broad enough for eight minutes, and a festival photo carries people, food, clothing and a shrine all at once.",
      "key_words": [
        {
          "ja": "おみこし",
          "reading": "おみこし",
          "en": "portable shrine",
          "explain_ja": "おみこしは 神[かみ]さまが 乗[の]る 小[ちい]さい 神社[じんじゃ]です。みんなで かついで 町[まち]を 歩[ある]きます。"
        },
        {
          "ja": "やたい",
          "reading": "やたい",
          "en": "food stall",
          "explain_ja": "やたいは おまつりの 時[とき]だけ 出[で]る 小[ちい]さい お店[みせ]です。たこやきや やきそばを 売[う]っています。"
        },
        {
          "ja": "おぼん",
          "reading": "おぼん",
          "en": "the Obon season",
          "explain_ja": "おぼんは 八月[はちがつ]の 行事[ぎょうじ]で、なくなった 家族[かぞく]が かえってくると 言[い]われています。"
        }
      ],
      "image_advice": "One night shot of a street festival: people in yukata in front of a lit stall. It gives you people, food, clothing, light and a shrine to talk about, and none of it needs writing in the picture.",
      "stages": [
        {
          "stage": "image",
          "model": {
            "ja": "この しゃしんには、夏[なつ]の おまつりが うつっています。たくさんの 人[ひと]が ゆかたを 着[き]て、やたいの 前[まえ]に ならんでいます。夜[よる]なので、ちょうちんの あかりが 明[あか]るく 見[み]えます。",
            "en": "This photo shows a summer festival. A lot of people in yukata are queueing in front of a food stall. It is night, so the lantern light looks bright."
          },
          "stretch": {
            "ja": "この しゃしんを えらんだのは、おまつりが 一人[ひとり]の 行事[ぎょうじ]ではなく、町[まち]みんなの 行事[ぎょうじ]だと 見[み]せたかったからです。",
            "en": "I chose this photo because I wanted to show that a festival is not one person's event but the whole town's."
          }
        },
        {
          "stage": "what-it-is",
          "model": {
            "ja": "おまつりは 日本[にほん]の でんとうてきな 行事[ぎょうじ]で、ほとんどの おまつりは 神社[じんじゃ]と かんけいが あります。人[ひと]は おみこしを かついで 町[まち]を 歩[ある]き、やたいで 食[た]べ物[もの]を 買[か]います。",
            "en": "Festivals are a traditional Japanese event, and most of them are connected with a shrine. People carry a portable shrine through the town and buy food from the stalls."
          },
          "stretch": {
            "ja": "「おみこし」は 神[かみ]さまが 乗[の]る 小[ちい]さい 神社[じんじゃ]の いみで、これが わからないと おまつりの いみも わかりません。",
            "en": "Omikoshi means a small shrine for the god to ride in, and without that word you cannot explain what a festival is."
          }
        },
        {
          "stage": "history",
          "model": {
            "ja": "おまつりは 千年[せんねん]いじょう 前[まえ]から あります。むかしの 人[ひと]は、おこめが よく できるように、神[かみ]さまに おねがいしました。だから、おまつりは 春[はる]と 秋[あき]に 多[おお]いです。",
            "en": "Festivals go back more than a thousand years. People long ago asked the gods for a good rice harvest, so there are many festivals in spring and autumn."
          },
          "stretch": {
            "ja": "春[はる]の おまつりは 「よく できますように」、秋[あき]の おまつりは 「ありがとう」の いみだと 聞[き]きました。",
            "en": "I have read that a spring festival means please let it grow well, and an autumn festival means thank you."
          }
        },
        {
          "stage": "who-and-when",
          "model": {
            "ja": "町[まち]の 人[ひと]が みんな します。子[こ]どもも 大人[おとな]も 手[て]つだいます。夏[なつ]が 一番[いちばん] 多[おお]くて、八月[はちがつ]の おぼんの ころに たくさん あります。",
            "en": "Everyone in the town takes part. Children and adults both help. Summer has the most, with many around Obon in August."
          },
          "stretch": {
            "ja": "さいきんは 人[ひと]が 少[すく]なく なった 町[まち]では、ほかの 町[まち]から 来[き]た 人[ひと]も おみこしを かつぐそうです。",
            "en": "I have read that in towns where the population has fallen, people from other towns now help carry the omikoshi."
          }
        },
        {
          "stage": "change",
          "model": {
            "ja": "前[まえ]は 町[まち]の 人[ひと]だけの 行事[ぎょうじ]でしたが、今[いま]は 外国[がいこく]から 来[き]た 人[ひと]も 多[おお]いです。SNSで しゃしんを 見[み]て、来[く]る 人[ひと]が ふえました。",
            "en": "In the past it was an event only for local people, but now many visitors come from overseas. More people come after seeing photos on social media."
          },
          "stretch": {
            "ja": "人[ひと]が ふえるのは いい ことですが、ごみも ふえるので、町[まち]の 人[ひと]は こまっているそうです。",
            "en": "More visitors is a good thing, but there is more rubbish too, and I have read that local people find that difficult."
          }
        },
        {
          "stage": "values",
          "model": {
            "ja": "おまつりから、日本[にほん]の 人[ひと]は みんなで する ことを たいせつに すると わかります。おみこしは 一人[ひとり]では かつげないからです。",
            "en": "From festivals you can tell that Japanese people value doing things together, because one person cannot carry an omikoshi."
          },
          "stretch": {
            "ja": "それに、おまつりは きせつと かんけいが あるので、しぜんを たいせつに する 気持[きも]ちも わかると 思[おも]います。",
            "en": "On top of that, festivals are tied to the seasons, so I think they also show a respect for nature."
          }
        },
        {
          "stage": "compare",
          "model": {
            "ja": "オーストラリアにも フェスティバルが ありますが、おまつりとは ちがいます。オーストラリアの フェスティバルは おんがくや 食[た]べ物[もの]が ちゅうしんで、神社[じんじゃ]と かんけいが ありません。",
            "en": "Australia has festivals too, but they are different. Australian festivals centre on music and food and have no connection with a shrine."
          },
          "stretch": {
            "ja": "同[おな]じ ところは、どちらも 町[まち]の 人[ひと]が 会[あ]う 場所[ばしょ]に なることだと 思[おも]います。",
            "en": "What is the same, I think, is that both become a place where the town gathers."
          }
        },
        {
          "stage": "personal",
          "model": {
            "ja": "メルボルンの 日本[にほん]の まつりに 行[い]ったことが あります。たいこを 聞[き]いて、やきそばを 食[た]べました。ゆかたを 着[き]ている 人[ひと]も 多[おお]くて、日本[にほん]に いるような 気[き]が しました。",
            "en": "I have been to a Japanese festival in Melbourne. I heard taiko drums and ate yakisoba. Many people were wearing yukata and it felt like being in Japan."
          },
          "stretch": {
            "ja": "でも、日本[にほん]の おまつりの ビデオを 見[み]ると、人[ひと]の かずが ぜんぜん ちがうので、いつか じっさいに 行[い]ってみたいです。",
            "en": "But when I watch videos of festivals in Japan the crowds are nothing like it, so one day I would like to go for real."
          }
        },
        {
          "stage": "future",
          "model": {
            "ja": "これからも つづくと 思[おも]いますが、小[ちい]さい 町[まち]の おまつりは なくなるかも しれません。わかい 人[ひと]が 町[まち]を 出[で]ているからです。",
            "en": "I think festivals will carry on, but small-town festivals may disappear, because young people are leaving those towns."
          },
          "stretch": {
            "ja": "でも、学校[がっこう]で たいこや おどりを 教[おし]えたら、わかい 人[ひと]も つづけられると 思[おも]います。",
            "en": "But if schools taught the drumming and the dancing, I think young people could keep them going."
          }
        }
      ]
    },
    {
      "id": "ts-manga",
      "topic_ja": "まんが・アニメ",
      "topic_en": "manga and anime",
      "why_it_works": "Named in the reports in 2021, 2022, 2024 and 2025. Students know it well, which the 2024 report says matters more than choosing something impressive. The trap is treating it as a list of favourite titles rather than a cultural practice.",
      "key_words": [
        {
          "ja": "しょうねんまんが",
          "reading": "しょうねんまんが",
          "en": "manga aimed at boys",
          "explain_ja": "しょうねんまんがは 男[おとこ]の 子[こ] むけの まんがで、スポーツや たたかいの 話[はなし]が 多[おお]いです。"
        },
        {
          "ja": "しゅじんこう",
          "reading": "しゅじんこう",
          "en": "main character",
          "explain_ja": "しゅじんこうは その 話[はなし]の 中[なか]で 一番[いちばん] 大[おお]きい やくの 人[ひと]です。"
        },
        {
          "ja": "れんさい",
          "reading": "れんさい",
          "en": "serialised publication",
          "explain_ja": "れんさいは、まんがが ざっしで 毎週[まいしゅう] 少[すこ]しずつ 出[で]ることです。"
        }
      ],
      "image_advice": "A bookshop manga aisle, floor to ceiling, with an adult standing and reading. It shows at a glance that manga in Japan is not only for children, which is a point you can return to all through the discussion.",
      "stages": [
        {
          "stage": "image",
          "model": {
            "ja": "この しゃしんは 日本[にほん]の 本屋[ほんや]の まんがの ところです。たくさんの まんがが たてに ならんでいて、上[うえ]から 下[した]まで ぜんぶ まんがです。立[た]って 読[よ]んでいる 大人[おとな]も います。",
            "en": "This photo is the manga section of a Japanese bookshop. The manga are lined up vertically, and it is manga from top to bottom. There is an adult standing and reading, too."
          },
          "stretch": {
            "ja": "この しゃしんを えらんだのは、まんがが 日本[にほん]では 子[こ]どもの ものだけではないと 見[み]せたかったからです。",
            "en": "I chose this photo because I wanted to show that manga in Japan is not only for children."
          }
        },
        {
          "stage": "what-it-is",
          "model": {
            "ja": "まんがは 日本[にほん]の えの 本[ほん]で、右[みぎ]から 左[ひだり]に 読[よ]みます。アニメは まんがから 作[つく]る 動[うご]く えです。しゅるいが 多[おお]くて、子[こ]ども むけも 大人[おとな] むけも あります。",
            "en": "Manga are Japanese picture books, read right to left. Anime are the moving version made from manga. There are many kinds, for children and for adults."
          },
          "stretch": {
            "ja": "「しょうねんまんが」は 男[おとこ]の 子[こ] むけ、「しょうじょまんが」は 女[おんな]の 子[こ] むけの いみで、読[よ]む 人[ひと]に よって 作[つく]り方[かた]も かわります。",
            "en": "Shounen manga means manga for boys and shoujo manga means manga for girls, and the way they are made changes with the reader."
          }
        },
        {
          "stage": "history",
          "model": {
            "ja": "まんがの れきしは 長[なが]くて、古[ふる]い お寺[てら]の えまきも まんがの はじめだと 言[い]われています。今[いま]の かたちに なったのは 七十年[ななじゅうねん]ぐらい 前[まえ]です。",
            "en": "Manga has a long history, and old temple picture scrolls are said to be its beginning. It took its present form about seventy years ago."
          },
          "stretch": {
            "ja": "安[やす]い まんがの 本[ほん]が 売[う]られるように なってから、子[こ]どもが たくさん 読[よ]めるように なりました。",
            "en": "Once cheap manga books began to be sold, children were able to read a great many of them."
          }
        },
        {
          "stage": "who-and-when",
          "model": {
            "ja": "日本[にほん]では だれでも 読[よ]みます。子[こ]どもも 大人[おとな]も 読[よ]んで、電車[でんしゃ]の 中[なか]で 読[よ]む 人[ひと]も 多[おお]いです。",
            "en": "In Japan anyone reads it. Children and adults both read it, and many people read on the train."
          },
          "stretch": {
            "ja": "さいきんは 紙[かみ]の 本[ほん]より スマホで 読[よ]む 人[ひと]が ふえてきたそうです。",
            "en": "I have read that more people now read on a phone than on paper."
          }
        },
        {
          "stage": "change",
          "model": {
            "ja": "前[まえ]は 紙[かみ]の 本[ほん]を 買[か]いましたが、今[いま]は スマホや タブレットで 読[よ]めるように なりました。それに、英語[えいご]や ほかの ことばに なって、せかいじゅうで 読[よ]まれています。",
            "en": "In the past people bought paper books, but now you can read on a phone or tablet. On top of that, manga is translated into English and other languages and read all over the world."
          },
          "stretch": {
            "ja": "でも、スマホで 読[よ]む 人[ひと]が ふえたので、町[まち]の 小[ちい]さい 本屋[ほんや]は しまってしまいました。",
            "en": "But as more people read on a phone, the small local bookshops have closed."
          }
        },
        {
          "stage": "values",
          "model": {
            "ja": "まんがから、日本[にほん]の 人[ひと]は がんばる ことを たいせつに すると わかります。しょうねんまんがの しゅじんこうは、まけても また 立[た]ちます。",
            "en": "From manga you can tell that Japanese people value perseverance. The main character in shounen manga gets up again after losing."
          },
          "stretch": {
            "ja": "それに、一人[ひとり]で かつ 話[はなし]より チームで かつ 話[はなし]が 多[おお]いので、グループを たいせつに する 考[かんが]え方[かた]も わかると 思[おも]います。",
            "en": "On top of that, there are more stories about a team winning than one person winning, so I think it also shows that the group matters."
          }
        },
        {
          "stage": "compare",
          "model": {
            "ja": "オーストラリアにも コミックが ありますが、まんがの ほうが しゅるいが 多[おお]いです。オーストラリアでは コミックは 子[こ]どもの ものだと 思[おも]われていますが、日本[にほん]では 大人[おとな]も 読[よ]みます。",
            "en": "Australia has comics too, but manga has far more variety. In Australia comics are thought of as children's, while in Japan adults read manga as well."
          },
          "stretch": {
            "ja": "それに、オーストラリアの コミックは 色[いろ]が ついていますが、日本[にほん]の まんがは 白[しろ]と 黒[くろ]だけなので、安[やす]く 早[はや]く 作[つく]れます。",
            "en": "On top of that, Australian comics are in colour while Japanese manga is black and white, so it can be made cheaply and quickly."
          }
        },
        {
          "stage": "personal",
          "model": {
            "ja": "中学[ちゅうがく]の 時[とき]から まんがを 読[よ]んでいます。はじめは 英語[えいご]の まんがでしたが、今[いま]は やさしい 日本語[にほんご]の まんがも 読[よ]んでみました。",
            "en": "I have read manga since junior secondary. At first it was in English, but now I have tried easy manga in Japanese too."
          },
          "stretch": {
            "ja": "まんがで おぼえた ことばも 多[おお]いですが、ていねいな 話[はな]し方[かた]では ない ことばも あると 先生[せんせい]に 言[い]われました。",
            "en": "I have learnt a lot of words from manga, but my teacher told me some of them are not polite speech."
          }
        },
        {
          "stage": "future",
          "model": {
            "ja": "これから もっと せかいじゅうで 読[よ]まれると 思[おも]います。ほかの ことばに するのが 早[はや]く なったからです。",
            "en": "I think it will be read even more widely around the world, because translation has become faster."
          },
          "stretch": {
            "ja": "でも、コンピューターが まんがの えを 作[つく]るように なると、まんがかの 仕事[しごと]が なくなるかも しれません。",
            "en": "But if computers start drawing manga, manga artists may lose their work."
          }
        }
      ]
    },
    {
      "id": "ts-obento",
      "topic_ja": "おべんとう・キャラべん",
      "topic_en": "boxed lunches and character lunches",
      "why_it_works": "Named in 2020, 2021, 2023 and 2025, and the 2023 report says a キャラべん student should know えいよう. An everyday subtopic with an easy photo and a clear line into nutrition, family and the working day.",
      "key_words": [
        {
          "ja": "えいよう",
          "reading": "えいよう",
          "en": "nutrition",
          "explain_ja": "えいようは 体[からだ]に いい ものの ことです。やさいや にくを バランスよく 食[た]べます。"
        },
        {
          "ja": "キャラべん",
          "reading": "キャラべん",
          "en": "a character boxed lunch",
          "explain_ja": "キャラべんは、ごはんや やさいで どうぶつや キャラクターの かおを 作[つく]った おべんとうです。"
        },
        {
          "ja": "えきべん",
          "reading": "えきべん",
          "en": "a station lunch box",
          "explain_ja": "えきべんは 駅[えき]で 売[う]る おべんとうで、その 町[まち]の 食[た]べ物[もの]が 入[はい]っています。"
        }
      ],
      "image_advice": "One open lunch box, filled, shot from above. Nothing written on it, and the detail inside gives you colour, shape, food names and the care that went into it.",
      "stages": [
        {
          "stage": "image",
          "model": {
            "ja": "この しゃしんは キャラべんの しゃしんです。ごはんで パンダの かおを 作[つく]って、まわりに やさいと たまごが 入[はい]っています。小[ちい]さい はこの 中[なか]が とても きれいです。",
            "en": "This is a photo of a character lunch. A panda's face has been made out of rice, with vegetables and egg around it. The inside of the little box is beautifully arranged."
          },
          "stretch": {
            "ja": "この しゃしんを えらんだのは、おべんとうが ただの ひるごはんではなく、作[つく]る 人[ひと]の 気持[きも]ちが 入[はい]っていると 見[み]せたかったからです。",
            "en": "I chose this photo because I wanted to show that a lunch box is not just lunch but carries the feelings of the person who made it."
          }
        },
        {
          "stage": "what-it-is",
          "model": {
            "ja": "おべんとうは はこに 入[い]れた ひるごはんです。ごはん、にく か さかな、やさいを 少[すこ]しずつ 入[い]れます。キャラべんは、どうぶつや キャラクターの かたちに した おべんとうです。",
            "en": "A bento is a lunch packed in a box. A little rice, some meat or fish, and vegetables go in. A kyara-ben is a bento shaped like an animal or a character."
          },
          "stretch": {
            "ja": "「えいよう」の バランスを 考[かんが]えて 作[つく]るので、色[いろ]を 五[いつ]つぐらい 入[い]れると いいと 言[い]われています。",
            "en": "They are made with the nutritional balance in mind, and it is said you should get about five colours in."
          }
        },
        {
          "stage": "history",
          "model": {
            "ja": "おべんとうは 千年[せんねん]ぐらい 前[まえ]から あります。むかしは 旅[たび]や 仕事[しごと]の 時[とき]に ごはんを 持[も]っていきました。駅[えき]で 売[う]る 「えきべん」も 百年[ひゃくねん]いじょう 前[まえ]から あります。",
            "en": "Bento go back about a thousand years. Long ago people carried rice with them when they travelled or went to work. Station bento have been sold for more than a hundred years too."
          },
          "stretch": {
            "ja": "えきべんは 町[まち]に よって ちがって、その 町[まち]の さかなや やさいを 使[つか]うので、りょこうの 楽[たの]しみの 一[ひと]つに なりました。",
            "en": "Station bento differ from town to town and use local fish and vegetables, so they became one of the pleasures of travelling."
          }
        },
        {
          "stage": "who-and-when",
          "model": {
            "ja": "学校[がっこう]に 行[い]く 子[こ]どもや、会社[かいしゃ]に 行[い]く 大人[おとな]が 毎日[まいにち] 持[も]っていきます。小学校[しょうがっこう]では きゅうしょくが 出[で]るので、おべんとうは えんそくの 日[ひ]だけの ことも あります。",
            "en": "Children going to school and adults going to work take one every day. Primary schools serve a school lunch, so bento are sometimes only for excursion days."
          },
          "stretch": {
            "ja": "作[つく]るのは たいてい 家族[かぞく]の だれかですが、さいきんは 父[ちち]が 作[つく]る 家[いえ]も ふえてきたそうです。",
            "en": "It is usually made by someone in the family, and I have read that more fathers are making them now."
          }
        },
        {
          "stage": "change",
          "model": {
            "ja": "前[まえ]は かんたんな おべんとうでしたが、今[いま]は キャラべんが 人気[にんき]に なりました。SNSに しゃしんを 出[だ]す 人[ひと]も 多[おお]いです。",
            "en": "In the past bento were simple, but now character lunches are popular. Many people post photos on social media."
          },
          "stretch": {
            "ja": "でも、作[つく]るのに 一時間[いちじかん]も かかるので、作[つく]る 人[ひと]が たいへんに なったと いう もんだいも あります。",
            "en": "But they can take a whole hour, so there is also the problem that it has become hard on the person making them."
          }
        },
        {
          "stage": "values",
          "model": {
            "ja": "おべんとうから、日本[にほん]の 人[ひと]は 小[ちい]さい ことを ていねいに する ことを たいせつに すると わかります。はこの 中[なか]を きれいに ならべるからです。",
            "en": "From bento you can tell that Japanese people value doing small things carefully, because the box is arranged so neatly."
          },
          "stretch": {
            "ja": "それに、キャラべんは 子[こ]どもに 「学校[がっこう]で がんばって」と 言[い]う かわりの やり方[かた]だと 思[おも]います。",
            "en": "On top of that, I think a character lunch is another way of saying good luck at school to a child."
          }
        },
        {
          "stage": "compare",
          "model": {
            "ja": "オーストラリアの ひるごはんは サンドイッチが 多[おお]くて、はこの 中[なか]も かんたんです。日本[にほん]の おべんとうの ほうが しゅるいが 多[おお]くて、見[み]た 時[とき]に きれいです。",
            "en": "Australian lunches are mostly sandwiches and the box is simple. Japanese bento have more variety and look better."
          },
          "stretch": {
            "ja": "でも、オーストラリアの ひるごはんは 作[つく]るのが 早[はや]いので、いそがしい 家[いえ]には その ほうが いいかも しれません。",
            "en": "But an Australian lunch is quick to make, so for a busy household that may be better."
          }
        },
        {
          "stage": "personal",
          "model": {
            "ja": "家[いえ]で キャラべんを 作[つく]ってみたことが あります。ごはんで ねこの かおを 作[つく]りましたが、くずれて、ねこに 見[み]えませんでした。",
            "en": "I have tried making a character lunch at home. I made a cat's face out of rice, but it fell apart and did not look like a cat."
          },
          "stretch": {
            "ja": "その 時[とき]、キャラべんを 毎日[まいにち] 作[つく]る 人[ひと]は ほんとうに すごいと 思[おも]いました。",
            "en": "That made me think people who make one every day are genuinely impressive."
          }
        },
        {
          "stage": "future",
          "model": {
            "ja": "これからも つづくと 思[おも]いますが、もっと かんたんな キャラべんが ふえると 思[おも]います。みんな いそがしいからです。",
            "en": "I think bento will carry on, but simpler character lunches will increase, because everyone is busy."
          },
          "stretch": {
            "ja": "コンビニでも キャラべんを 売[う]るように なったら、作[つく]る 人[ひと]が 楽[らく]に なると 思[おも]います。",
            "en": "If convenience stores started selling character lunches, I think it would make life easier for the person at home."
          }
        }
      ]
    },
    {
      "id": "ts-kimono",
      "topic_ja": "きもの・ゆかた",
      "topic_en": "kimono and yukata",
      "why_it_works": "Clothing is in the Japanese-speaking communities theme, and one photo of someone wearing a yukata gives you colour, season, occasion and the rules of how it is worn. The 2025 report warns against an image so simple there is nothing to say; this one is the opposite.",
      "key_words": [
        {
          "ja": "おび",
          "reading": "おび",
          "en": "the sash of a kimono",
          "explain_ja": "おびは きものの まん中[なか]に まく 長[なが]い ぬのです。後[うし]ろで むすびます。"
        },
        {
          "ja": "ゆかた",
          "reading": "ゆかた",
          "en": "a light summer kimono",
          "explain_ja": "ゆかたは 夏[なつ]の かるい きもので、きものより 安[やす]くて、着[き]やすいです。"
        },
        {
          "ja": "もよう",
          "reading": "もよう",
          "en": "pattern, design",
          "explain_ja": "もようは ぬのの 上[うえ]の えの ことです。きものの もようは きせつの 花[はな]が 多[おお]いです。"
        }
      ],
      "image_advice": "One person in a yukata outdoors, where you can see the sash and the pattern and something of the setting behind them. Avoid a shop display, which gives you nothing about when it is worn.",
      "stages": [
        {
          "stage": "image",
          "model": {
            "ja": "この しゃしんには、ゆかたを 着[き]ている 人[ひと]が 二人[ふたり] います。色[いろ]は 青[あお]と 白[しろ]で、花[はな]の もようが あります。後[うし]ろに 古[ふる]い お寺[てら]が 見[み]えます。",
            "en": "In this photo two people are wearing yukata. They are blue and white with a flower pattern. There is an old temple behind them."
          },
          "stretch": {
            "ja": "この しゃしんを えらんだのは、ゆかたが はくぶつかんの 中[なか]の ものではなく、今[いま]も 着[き]る ものだと 見[み]せたかったからです。",
            "en": "I chose this photo because I wanted to show that a yukata is not a museum piece but something still worn today."
          }
        },
        {
          "stage": "what-it-is",
          "model": {
            "ja": "きものは 日本[にほん]の でんとうてきな ふくです。ゆかたは 夏[なつ]の かるい きもので、ゆかたの ほうが 安[やす]くて、着[き]やすいです。おびで 後[うし]ろを むすびます。",
            "en": "A kimono is traditional Japanese clothing. A yukata is a light summer kimono, cheaper and easier to put on. The sash is tied at the back."
          },
          "stretch": {
            "ja": "きものは きぬで 作[つく]ることが 多[おお]くて とても 高[たか]いですが、ゆかたは もめんなので、わかい 人[ひと]でも 買[か]えます。",
            "en": "Kimono are often made of silk and are very expensive, but a yukata is cotton, so even a young person can buy one."
          }
        },
        {
          "stage": "history",
          "model": {
            "ja": "きものは 千年[せんねん]いじょう 前[まえ]から あります。前[まえ]は みんな 毎日[まいにち] きものを 着[き]ていましたが、百年[ひゃくねん]ぐらい 前[まえ]から 洋[よう]ふくを 着[き]るように なりました。",
            "en": "Kimono go back more than a thousand years. People used to wear one every day, but from about a hundred years ago they moved to Western clothes."
          },
          "stretch": {
            "ja": "今[いま]は きものを 着[き]る 人[ひと]が 少[すく]なく なって、着[き]方[かた]を 知[し]らない 日本[にほん]の 人[ひと]も 多[おお]いそうです。",
            "en": "Fewer people wear kimono now, and I have read that many Japanese people do not know how to put one on."
          }
        },
        {
          "stage": "who-and-when",
          "model": {
            "ja": "今[いま]は とくべつな 日[ひ]だけ 着[き]ます。お正月[しょうがつ]、けっこんしき、はたちの おいわいの 日[ひ]などです。ゆかたは 夏[なつ]の おまつりや はなびの 時[とき]に 着[き]ます。",
            "en": "These days it is only worn on special days: New Year, weddings, the coming-of-age celebration and so on. A yukata is worn at summer festivals and fireworks."
          },
          "stretch": {
            "ja": "旅[たび]の 人[ひと]が 京都[きょうと]で きものを かりて、町[まち]を 歩[ある]くことも 多[おお]く なりました。",
            "en": "It has also become common for visitors to hire a kimono in Kyoto and walk around the city in it."
          }
        },
        {
          "stage": "change",
          "model": {
            "ja": "前[まえ]は 毎日[まいにち] 着[き]る ふくでしたが、今[いま]は とくべつな 日[ひ]の ふくに なりました。さいきんは 買[か]う 人[ひと]より かりる 人[ひと]の ほうが 多[おお]いです。",
            "en": "It used to be everyday clothing and is now clothing for special days. Recently more people hire one than buy one."
          },
          "stretch": {
            "ja": "それに、新[あたら]しい デザインの きものも 出[で]てきて、ブーツや ぼうしと いっしょに 着[き]る わかい 人[ひと]も います。",
            "en": "On top of that, new designs have appeared, and some young people wear one with boots and a hat."
          }
        },
        {
          "stage": "values",
          "model": {
            "ja": "きものから、日本[にほん]の 人[ひと]は きせつと かたちを たいせつに すると わかります。もようは きせつの 花[はな]で、着[き]方[かた]も きまっています。",
            "en": "From kimono you can tell that Japanese people value the seasons and correct form. The patterns are the flowers of the season, and how you put it on is fixed."
          },
          "stretch": {
            "ja": "左[ひだり]を 上[うえ]に する など、きまりが 多[おお]いので、かたちを たいせつに する 考[かんが]え方[かた]が よく わかると 思[おも]います。",
            "en": "There are many rules, such as the left side going on top, so I think it shows clearly how much correct form matters."
          }
        },
        {
          "stage": "compare",
          "model": {
            "ja": "オーストラリアには でんとうてきな ふくが あまり ありません。けっこんしきや とくべつな 日[ひ]も、ほとんど 洋[よう]ふくです。",
            "en": "Australia does not really have traditional clothing. Even at weddings and on special days it is nearly all Western dress."
          },
          "stretch": {
            "ja": "でも、アボリジナルの 人[ひと]たちの デザインにも いみが あると 聞[き]きました。ぬのの もようが 話[はなし]を つたえる ところは 同[おな]じだと 思[おも]います。",
            "en": "But I have read that Aboriginal designs carry meaning too. I think the way a pattern on cloth carries a story is the same."
          }
        },
        {
          "stage": "personal",
          "model": {
            "ja": "学校[がっこう]の ジャパンデーで ゆかたを 着[き]たことが あります。おびを むすぶのが むずかしくて、先生[せんせい]に 手[て]つだってもらいました。",
            "en": "I have worn a yukata on my school's Japan Day. Tying the sash was difficult and the teacher helped me."
          },
          "stretch": {
            "ja": "着[き]た 後[あと]は、せなかが まっすぐに なって、歩[ある]き方[かた]も かわりました。ふくが 気持[きも]ちを かえると 思[おも]いました。",
            "en": "Once it was on, my back straightened and even the way I walked changed. It made me think clothing changes how you feel."
          }
        },
        {
          "stage": "future",
          "model": {
            "ja": "きものは なくならないと 思[おも]いますが、毎日[まいにち] 着[き]る ふくには もどらないと 思[おも]います。高[たか]くて、着[き]るのに 時間[じかん]が かかるからです。",
            "en": "I do not think kimono will disappear, but I do not think they will go back to being everyday clothing, because they are expensive and slow to put on."
          },
          "stretch": {
            "ja": "でも、かんたんに 着[き]られる 新[あたら]しい きものが 出[で]たら、もっと ふえるかも しれません。",
            "en": "But if an easy-to-wear new kimono appeared, numbers might rise again."
          }
        }
      ]
    },
    {
      "id": "ts-origami",
      "topic_ja": "おりがみ",
      "topic_en": "origami",
      "why_it_works": "A small subtopic that still reaches history, art, science and peace, which is what the 2025 report means by a subtopic that can be discussed in depth. The thousand-crane photo gives it a story, which the 2023 report says a successful image needs.",
      "key_words": [
        {
          "ja": "せんばづる",
          "reading": "せんばづる",
          "en": "a thousand paper cranes",
          "explain_ja": "せんばづるは 千[せん]この つるを いとで つないだ ものです。病気[びょうき]の 人[ひと]の ために おります。"
        },
        {
          "ja": "おる",
          "reading": "おる",
          "en": "to fold",
          "explain_ja": "おるは、紙[かみ]を まげて かたちを 作[つく]ることです。"
        },
        {
          "ja": "つる",
          "reading": "つる",
          "en": "crane (the bird)",
          "explain_ja": "つるは 白[しろ]くて くびの 長[なが]い とりで、日本[にほん]では 長[なが]く 生[い]きる しるしです。"
        }
      ],
      "image_advice": "The thousand cranes at a peace memorial, or a single crane in a hand with a sheet of paper beside it. The first gives you a story, which is what the reports ask of an image; a plain crane on a table does not.",
      "stages": [
        {
          "stage": "image",
          "model": {
            "ja": "この しゃしんには、いろいろな 色[いろ]の おりがみの つるが たくさん あります。いとで つないであって、ぜんぶで 千[せん]ばぐらい あると 思[おも]います。",
            "en": "This photo shows a great many paper cranes in different colours. They are strung together on threads, and I think there are about a thousand of them."
          },
          "stretch": {
            "ja": "この しゃしんは 広島[ひろしま]の へいわこうえんの せんばづるで、おりがみが あそびだけでは ないと 見[み]せたかったから えらびました。",
            "en": "This photo is the thousand cranes at the Peace Park in Hiroshima. I chose it because I wanted to show that origami is not only play."
          }
        },
        {
          "stage": "what-it-is",
          "model": {
            "ja": "おりがみは 紙[かみ]を おって、どうぶつや 花[はな]の かたちを 作[つく]る ぶんかです。はさみも のりも 使[つか]わないで、しかくい 紙[かみ]だけで 作[つく]ります。",
            "en": "Origami is the practice of folding paper into the shape of an animal or a flower. You use no scissors and no glue, only a square sheet of paper."
          },
          "stretch": {
            "ja": "「せんばづる」は 千[せん]この つるの いみで、病気[びょうき]の 人[ひと]の ために おります。",
            "en": "Senbazuru means a thousand cranes, and they are folded for someone who is ill."
          }
        },
        {
          "stage": "history",
          "model": {
            "ja": "おりがみは 紙[かみ]が 日本[にほん]に 入[はい]ってきてから 始[はじ]まりました。はじめは 神社[じんじゃ]の ぎしきで 使[つか]いましたが、紙[かみ]が 安[やす]く なってから、子[こ]どもの あそびに なりました。",
            "en": "Origami began after paper came to Japan. At first it was used in shrine ceremonies, and once paper became cheap it turned into a children's pastime."
          },
          "stretch": {
            "ja": "せんばづるが ゆうめいに なったのは、広島[ひろしま]の 女[おんな]の 子[こ]の 話[はなし]が 本[ほん]に なってからだと 聞[き]きました。",
            "en": "I have read that the thousand cranes became famous after the story of a girl in Hiroshima was made into a book."
          }
        },
        {
          "stage": "who-and-when",
          "model": {
            "ja": "日本[にほん]の 子[こ]どもは 小学校[しょうがっこう]で ならいます。大人[おとな]も しますが、子[こ]どもの ほうが 多[おお]いです。病院[びょういん]に いる 人[ひと]の ために せんばづるを おることも あります。",
            "en": "Japanese children learn it at primary school. Adults do it too, but mostly children. Sometimes people fold a thousand cranes for someone in hospital."
          },
          "stretch": {
            "ja": "学校[がっこう]の 行事[ぎょうじ]や、しゅうがくりょこうの 前[まえ]に、クラスみんなで おることも あるそうです。",
            "en": "I have read that a whole class sometimes folds them together for a school event or before a school trip."
          }
        },
        {
          "stage": "change",
          "model": {
            "ja": "前[まえ]は 子[こ]どもの あそびでしたが、今[いま]は げいじゅつにも なりました。とても むずかしい おりがみを 作[つく]る 人[ひと]も います。",
            "en": "It used to be a children's pastime and has now become an art as well. Some people make extremely difficult pieces."
          },
          "stretch": {
            "ja": "それに、おりがみの 考[かんが]え方[かた]は うちゅうの きかいや くすりの けんきゅうにも 使[つか]われているそうです。",
            "en": "I have also read that the thinking behind origami is used in space engineering and medical research."
          }
        },
        {
          "stage": "values",
          "model": {
            "ja": "おりがみから、日本[にほん]の 人[ひと]は 少[すく]ない ものから 作[つく]る ことを たいせつに すると わかります。紙[かみ] 一[いち]まいだけで、たくさんの かたちが できます。",
            "en": "From origami you can tell that Japanese people value making something out of very little. One sheet of paper gives you many shapes."
          },
          "stretch": {
            "ja": "それに、せんばづるの ように、人[ひと]の ために 時間[じかん]を つかう 気持[きも]ちも わかると 思[おも]います。",
            "en": "On top of that, as with the thousand cranes, I think it shows a willingness to spend time for someone else."
          }
        },
        {
          "stage": "compare",
          "model": {
            "ja": "オーストラリアの 学校[がっこう]でも こうさくを しますが、はさみや のりを 使[つか]います。おりがみは おるだけなので、ごみが 出[で]ません。",
            "en": "Australian schools do craft too, but with scissors and glue. Origami is only folding, so there is no waste."
          },
          "stretch": {
            "ja": "つまり、おりがみは かんきょうにも やさしい あそびだと 思[おも]います。",
            "en": "In other words, I think origami is a pastime that is also kind to the environment."
          }
        },
        {
          "stage": "personal",
          "model": {
            "ja": "学校[がっこう]の 日本語[にほんご]の じゅぎょうで つるを おったことが あります。はじめは むずかしかったですが、今[いま]は 見[み]ないで おれます。",
            "en": "I have folded cranes in Japanese class at school. It was hard at first, but now I can do it without looking."
          },
          "stretch": {
            "ja": "妹[いもうと]に 教[おし]えた 時[とき]、自分[じぶん]が おぼえていることが わかって、うれしかったです。",
            "en": "When I taught my younger sister, I realised I still remembered it, and that felt good."
          }
        },
        {
          "stage": "future",
          "model": {
            "ja": "これからも つづくと 思[おも]います。紙[かみ]が あれば どこでも できて、お金[かね]も あまり かかりません。",
            "en": "I think it will carry on. You can do it anywhere you have paper and it costs almost nothing."
          },
          "stretch": {
            "ja": "せかいじゅうの 学校[がっこう]の じゅぎょうで おりがみを するように なったら、もっと 広[ひろ]がると 思[おも]います。",
            "en": "If schools around the world started doing origami in class, I think it would spread further."
          }
        }
      ]
    }
  ]
};
