/* topics.js — the eight cultural products and practices this cohort chose
   for the oral SAC, with the questions an assessor could ask about each.

   These now run both halves of the app, which is the point of the file:

     the four minute SAC run takes a ladder of them, general to specific
     Section 2 of the whole examination walks the nine discussion stages
     and asks each one about the student's own topic

   The generic Section 2 bank in questions.js is still there for a student
   who has not chosen a topic yet, but a student who has chosen one gets
   their own topic asked about, which is what actually happens in the room.

   Every question also carries a `move`: one of the nine directions an
   assessor goes in Section 2, taken from Andrew's exam-flow sheet. The
   timed run lets the student pick the next move while the clock runs,
   which is how an app with no AI can still feel like it is following
   somebody, and is itself a skill the sheet teaches: steering the
   questioning towards what you actually researched.

   The move decides everything else about a question, so nothing can drift:

     define, image                        open
     facts, good, bad                     shape
     how, fix, compare, final             deep

   open questions are answerable from the topic alone, which is why
   `from_topic` is true on them: there is no honest way to back out of
   「コンビニとは何ですか」 when your topic is コンビニ.

   Two questions at every stage, so two runs on one topic are not the same
   run, and `key_vocab` per topic because the mock assessors' first note was
   that students who did not have the words could not explain what they had
   researched.

   No model answers here, deliberately. The student researched this and the
   app did not; offering one would be inventing their content for them.

   Same shape as the other data files: one window. line, then pure JSON, so
   no comments may appear inside the object.                               */

window.ORAL_TOPICS = {
  "schema_version": 3,
  "topics": [
    {
      "id": "onsen",
      "name_ja": "おんせん",
      "name_en": "Hot springs",
      "blurb_en": "What they are, the rules, the health claims, and who is kept out",
      "key_vocab": [
        {
          "ja": "おんせん",
          "en": "hot spring"
        },
        {
          "ja": "ゆぶね",
          "en": "the bath itself"
        },
        {
          "ja": "せいぶん",
          "en": "mineral content"
        },
        {
          "ja": "とうじ",
          "en": "taking the waters to heal"
        },
        {
          "ja": "りょかん",
          "en": "a traditional inn"
        },
        {
          "ja": "ろてんぶろ",
          "en": "an outdoor bath"
        },
        {
          "ja": "かざん",
          "en": "volcano"
        },
        {
          "ja": "いれずみ",
          "en": "a tattoo"
        },
        {
          "ja": "マナー",
          "en": "manners, etiquette"
        },
        {
          "ja": "かんこうきゃく",
          "en": "tourists"
        }
      ],
      "questions": [
        {
          "id": "onsen-define-2",
          "move": "define",
          "question_ja": "おんせんについて、どんな ことが わかりましたか。",
          "question_en": "What did you find out about hot springs?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "onsen-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "おんせんとは 何[なん]ですか。",
          "question_en": "What is an onsen?",
          "move": "define"
        },
        {
          "id": "onsen-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには おんせんの どんな ところが うつっていますか。",
          "question_en": "What part of a hot spring does your photograph show?",
          "move": "image"
        },
        {
          "id": "onsen-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この しゃしんを えらびましたか。",
          "question_en": "Why did you choose this photograph?",
          "move": "image"
        },
        {
          "id": "onsen-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんは いつから 日本[にほん]に ありますか。",
          "question_en": "How far back do hot springs go in Japan?",
          "move": "facts"
        },
        {
          "id": "onsen-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "むかしは 何[なに]の ために 使[つか]われていましたか。",
          "question_en": "What were they used for in the past?",
          "move": "facts"
        },
        {
          "id": "onsen-howdo",
          "move": "facts",
          "question_ja": "おんせんの 入[はい]り方[かた]を おしえて ください。",
          "question_en": "Talk me through how you take an onsen bath.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "onsen-where",
          "move": "facts",
          "question_ja": "おんせんは 日本[にほん]の どこに ありますか。",
          "question_en": "Where in Japan are the hot springs?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "onsen-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どんな 人[ひと]が おんせんに 行[い]きますか。",
          "question_en": "What sort of people go to a hot spring?",
          "move": "facts"
        },
        {
          "id": "onsen-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんに 入[はい]る とき、どんな ルールが ありますか。",
          "question_en": "What rules are there when you get in?",
          "move": "facts"
        },
        {
          "id": "onsen-eg1",
          "move": "example",
          "question_ja": "たとえば、どんな おんせんが ありますか。",
          "question_en": "For example, what kinds of hot spring are there?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "onsen-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "onsen-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんの いい点[てん]は 何[なん]ですか。",
          "question_en": "What are the good points of a hot spring?"
        },
        {
          "id": "onsen-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんは 町[まち]に とって どんな いい ことが ありますか。",
          "question_en": "What good does a hot spring do the town it is in?"
        },
        {
          "id": "onsen-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おんせんの もんだいは 何[なん]ですか。",
          "question_en": "What problems do hot springs have?"
        },
        {
          "id": "onsen-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "外国[がいこく]の かんこうきゃくが ふえて、何[なに]が かわりましたか。",
          "question_en": "What has changed as more overseas tourists come?",
          "move": "bad"
        },
        {
          "id": "onsen-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんは むかしと くらべて かわりましたか。",
          "question_en": "Have hot springs changed from how they used to be?",
          "move": "change"
        },
        {
          "id": "onsen-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんは これから どう なると 思[おも]いますか。",
          "question_en": "What do you think will happen to hot springs?",
          "move": "change"
        },
        {
          "id": "onsen-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、おんせんは どうして たいせつですか。",
          "question_en": "Why do hot springs matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "onsen-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんから 日本[にほん]の 人[ひと]の 考[かんが]え方[かた]が わかりますか。",
          "question_en": "Can you see Japanese ways of thinking in hot springs?",
          "move": "culture"
        },
        {
          "id": "onsen-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "みんな はだかで 入[はい]りますが、それは どうしてだと 思[おも]いますか。",
          "question_en": "Everyone bathes undressed. Why do you think that is?",
          "move": "culture"
        },
        {
          "id": "onsen-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "その もんだいは どうしたら いいと 思[おも]いますか。",
          "question_en": "What do you think should be done about that?"
        },
        {
          "id": "onsen-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "かんこうきゃくと じもとの 人[ひと]の りょうほうが 楽[たの]しむ ために、何[なに]が できますか。",
          "question_en": "What could be done so that both tourists and local people enjoy it?"
        },
        {
          "id": "onsen-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "いなかの 小[ちい]さい おんせんを まもる ために 何[なに]が できますか。",
          "question_en": "What could be done to keep the small country ones going?",
          "move": "fix"
        },
        {
          "id": "onsen-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの おんせんと 日本[にほん]の おんせんは どう ちがいますか。",
          "question_en": "How are Australian hot springs different from Japanese ones?",
          "move": "compare"
        },
        {
          "id": "onsen-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 人[ひと]は 日本[にほん]の おんせんを 楽[たの]しめると 思[おも]いますか。",
          "question_en": "Do you think Australians could enjoy a Japanese hot spring?",
          "move": "compare"
        },
        {
          "id": "onsen-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "onsen-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おんせんに 入[はい]った ことが ありますか。どうでしたか。",
          "question_en": "Have you been in one? What was it like?",
          "move": "opinion"
        },
        {
          "id": "onsen-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "いれずみが ある 人[ひと]は 入[はい]れませんが、どう 思[おも]いますか。",
          "question_en": "People with tattoos are often turned away. What do you think?",
          "move": "opinion"
        }
      ]
    },
    {
      "id": "hanami",
      "name_ja": "花見[はなみ]",
      "name_en": "Cherry blossom viewing",
      "blurb_en": "When it happens, what people do, and why the season matters so much",
      "key_vocab": [
        {
          "ja": "さくら",
          "en": "cherry blossom"
        },
        {
          "ja": "花見[はなみ]",
          "en": "blossom viewing"
        },
        {
          "ja": "きせつ",
          "en": "season"
        },
        {
          "ja": "まんかい",
          "en": "full bloom"
        },
        {
          "ja": "こうえん",
          "en": "park"
        },
        {
          "ja": "おべんとう",
          "en": "a packed lunch"
        },
        {
          "ja": "ごみ",
          "en": "rubbish"
        },
        {
          "ja": "はいく",
          "en": "haiku"
        },
        {
          "ja": "はかない",
          "en": "fleeting, short-lived"
        },
        {
          "ja": "ばしょとり",
          "en": "saving a spot"
        }
      ],
      "questions": [
        {
          "id": "hanami-define-2",
          "move": "define",
          "question_ja": "花見[はなみ]について、どんな ことが わかりましたか。",
          "question_en": "What did you find out about hanami?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "hanami-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "花見[はなみ]とは 何[なん]ですか。",
          "question_en": "What is hanami?",
          "move": "define"
        },
        {
          "id": "hanami-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは 花見[はなみ]の どんな ようすですか。",
          "question_en": "What is happening in your photograph?",
          "move": "image"
        },
        {
          "id": "hanami-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 中[なか]の 人[ひと]は 何[なに]を していますか。",
          "question_en": "What are the people in it doing?",
          "move": "image"
        },
        {
          "id": "hanami-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]は いつから 始[はじ]まりましたか。",
          "question_en": "When did hanami begin?",
          "move": "facts"
        },
        {
          "id": "hanami-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "むかしは だれが 花見[はなみ]を しましたか。",
          "question_en": "Who did it in the past?",
          "move": "facts"
        },
        {
          "id": "hanami-howdo",
          "move": "facts",
          "question_ja": "ばしょとりは どうやって しますか。",
          "question_en": "How does saving a spot actually work?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "hanami-where",
          "move": "facts",
          "question_ja": "花見[はなみ]は どこで しますか。",
          "question_en": "Where does hanami happen?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "hanami-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]は 一年[いちねん]の いつ しますか。",
          "question_en": "What time of year is hanami?",
          "move": "facts"
        },
        {
          "id": "hanami-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "だれと 花見[はなみ]に 行[い]きますか。",
          "question_en": "Who do people go with?",
          "move": "facts"
        },
        {
          "id": "hanami-eg1",
          "move": "example",
          "question_ja": "たとえば、花見[はなみ]に どんな ものを もって 行[い]きますか。",
          "question_en": "For example, what do people take with them?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "hanami-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "hanami-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]の いい点[てん]は 何[なん]ですか。",
          "question_en": "What are the good points of hanami?"
        },
        {
          "id": "hanami-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]は 人[ひと]と 人[ひと]を どう つなげますか。",
          "question_en": "How does hanami bring people together?"
        },
        {
          "id": "hanami-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]の わるい点[てん]は 何[なん]ですか。",
          "question_en": "What are the bad points?"
        },
        {
          "id": "hanami-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "花見[はなみ]の もんだいは 何[なん]ですか。",
          "question_en": "What problems come with hanami?",
          "move": "bad"
        },
        {
          "id": "hanami-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "今[いま]の 花見[はなみ]は むかしと ちがいますか。",
          "question_en": "Is hanami today different from how it was?",
          "move": "change"
        },
        {
          "id": "hanami-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "花見[はなみ]は これからも つづくと 思[おも]いますか。",
          "question_en": "Do you think hanami will continue?",
          "move": "change"
        },
        {
          "id": "hanami-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、さくらは どうして たいせつですか。",
          "question_en": "Why do cherry blossoms matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "hanami-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "さくらは 日本[にほん]の 人[ひと]に とって どうして たいせつですか。",
          "question_en": "Why do cherry blossoms matter so much to Japanese people?",
          "move": "culture"
        },
        {
          "id": "hanami-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "「花[はな]より だんご」と いう ことばが ありますが、どういう いみですか。",
          "question_en": "There is a saying, hana yori dango. What does it mean?",
          "move": "culture"
        },
        {
          "id": "hanami-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ごみの もんだいは どうしたら いいと 思[おも]いますか。",
          "question_en": "What should be done about the rubbish?"
        },
        {
          "id": "hanami-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "人[ひと]が 多[おお]すぎる 場所[ばしょ]では、何[なに]が できますか。",
          "question_en": "What could be done where it gets too crowded?"
        },
        {
          "id": "hanami-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "人[ひと]が 多[おお]すぎる もんだいは どうしたら いいと 思[おも]いますか。",
          "question_en": "What should be done about the crowds?",
          "move": "fix"
        },
        {
          "id": "hanami-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアにも 花見[はなみ]のような ぎょうじが ありますか。",
          "question_en": "Is there anything like hanami in Australia?",
          "move": "compare"
        },
        {
          "id": "hanami-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 人[ひと]は きせつを どのぐらい 気[き]に しますか。",
          "question_en": "How much do Australians notice the seasons?",
          "move": "compare"
        },
        {
          "id": "hanami-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "hanami-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "花見[はなみ]を した ことが ありますか。",
          "question_en": "Have you ever been to a hanami?",
          "move": "opinion"
        },
        {
          "id": "hanami-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "しらべて 一番[いちばん] おどろいた ことは 何[なん]ですか。",
          "question_en": "What surprised you most in your research?",
          "move": "opinion"
        }
      ]
    },
    {
      "id": "oshogatsu",
      "name_ja": "お正月[しょうがつ]",
      "name_en": "New Year",
      "blurb_en": "Three days with family, the shrine visit, and the shops all shut",
      "key_vocab": [
        {
          "ja": "お正月[しょうがつ]",
          "en": "New Year"
        },
        {
          "ja": "おせちりょうり",
          "en": "New Year food"
        },
        {
          "ja": "はつもうで",
          "en": "the first shrine visit"
        },
        {
          "ja": "おとしだま",
          "en": "New Year money"
        },
        {
          "ja": "おおそうじ",
          "en": "the big clean"
        },
        {
          "ja": "もちつき",
          "en": "pounding rice cakes"
        },
        {
          "ja": "おおみそか",
          "en": "New Year's Eve"
        },
        {
          "ja": "しんせき",
          "en": "relatives"
        },
        {
          "ja": "じんじゃ",
          "en": "shrine"
        },
        {
          "ja": "ねんがじょう",
          "en": "New Year cards"
        }
      ],
      "questions": [
        {
          "id": "oshogatsu-define-2",
          "move": "define",
          "question_ja": "お正月[しょうがつ]について、どんな ことが わかりましたか。",
          "question_en": "What did you find out about New Year?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "oshogatsu-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "お正月[しょうがつ]とは 何[なん]ですか。",
          "question_en": "What is oshogatsu?",
          "move": "define"
        },
        {
          "id": "oshogatsu-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは お正月[しょうがつ]の どんな ようすですか。",
          "question_en": "What does your photograph show about New Year?",
          "move": "image"
        },
        {
          "id": "oshogatsu-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 中[なか]に 何[なに]が 見[み]えますか。",
          "question_en": "What can you see in it?",
          "move": "image"
        },
        {
          "id": "oshogatsu-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の しゅうかんは いつから ありますか。",
          "question_en": "How old are the New Year customs?",
          "move": "facts"
        },
        {
          "id": "oshogatsu-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "はつもうでは どうして 始[はじ]まったと 思[おも]いますか。",
          "question_en": "Why do you think hatsumode began?",
          "move": "facts"
        },
        {
          "id": "oshogatsu-howdo",
          "move": "facts",
          "question_ja": "おせちりょうりは どうやって じゅんびしますか。",
          "question_en": "How is osechi food prepared?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "oshogatsu-where",
          "move": "facts",
          "question_ja": "はつもうでは どこに 行[い]きますか。",
          "question_en": "Where do people go for hatsumode?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "oshogatsu-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]に だれと すごしますか。",
          "question_en": "Who do people spend New Year with?",
          "move": "facts"
        },
        {
          "id": "oshogatsu-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おおみそかに 日本[にほん]の 人[ひと]は 何[なに]を しますか。",
          "question_en": "What do people do on New Year's Eve?",
          "move": "facts"
        },
        {
          "id": "oshogatsu-eg1",
          "move": "example",
          "question_ja": "たとえば、おせちりょうりには どんな ものが 入[はい]っていますか。",
          "question_en": "For example, what goes into osechi food?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "oshogatsu-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "oshogatsu-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の いい点[てん]は 何[なん]ですか。",
          "question_en": "What is good about New Year?"
        },
        {
          "id": "oshogatsu-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]は 家族[かぞく]に とって どうして たいせつですか。",
          "question_en": "Why does New Year matter to a family?"
        },
        {
          "id": "oshogatsu-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の もんだいは 何[なん]ですか。",
          "question_en": "What is difficult about New Year?"
        },
        {
          "id": "oshogatsu-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "おせちりょうりを 作[つく]る 家[いえ]は へっていますが、どうしてだと 思[おも]いますか。",
          "question_en": "Fewer homes make osechi now. Why do you think that is?",
          "move": "bad"
        },
        {
          "id": "oshogatsu-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "今[いま]の お正月[しょうがつ]は むかしと ちがいますか。",
          "question_en": "Is New Year different now from how it was?",
          "move": "change"
        },
        {
          "id": "oshogatsu-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の しゅうかんは これからも のこると 思[おも]いますか。",
          "question_en": "Will the New Year customs last?",
          "move": "change"
        },
        {
          "id": "oshogatsu-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、お正月[しょうがつ]は どうして たいせつですか。",
          "question_en": "Why does New Year matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "oshogatsu-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 人[ひと]は お正月[しょうがつ]に 家族[かぞく]と すごしますか。",
          "question_en": "Why do Japanese people spend New Year with family?",
          "move": "culture"
        },
        {
          "id": "oshogatsu-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]の 前[まえ]に うちを きれいに するのは どうしてですか。",
          "question_en": "Why is the house cleaned before New Year?",
          "move": "culture"
        },
        {
          "id": "oshogatsu-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "いそがしすぎる お正月[しょうがつ]は どうしたら いいと 思[おも]いますか。",
          "question_en": "What could be done about how busy it gets?"
        },
        {
          "id": "oshogatsu-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "わかい 人[ひと]に しゅうかんを つたえる ために、何[なに]が できますか。",
          "question_en": "What could be done to pass the customs on to young people?"
        },
        {
          "id": "oshogatsu-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の お正月[しょうがつ]と オーストラリアの お正月[しょうがつ]は どう ちがいますか。",
          "question_en": "How is New Year in Japan different from New Year in Australia?",
          "move": "compare"
        },
        {
          "id": "oshogatsu-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おとしだまのような しゅうかんは オーストラリアに ありますか。",
          "question_en": "Is there anything like otoshidama in Australia?",
          "move": "compare"
        },
        {
          "id": "oshogatsu-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "oshogatsu-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "わかい 人[ひと]は お正月[しょうがつ]に きょうみが あると 思[おも]いますか。",
          "question_en": "Are young people interested in New Year?",
          "move": "opinion"
        },
        {
          "id": "oshogatsu-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]を 日本[にほん]で すごして みたいですか。",
          "question_en": "Would you like to spend New Year in Japan?",
          "move": "opinion"
        },
        {
          "id": "oshogatsu-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お正月[しょうがつ]に 店[みせ]が 休[やす]む ことについて、どう 思[おも]いますか。",
          "question_en": "What do you think about the shops closing?",
          "move": "opinion"
        }
      ]
    },
    {
      "id": "bukatsu",
      "name_ja": "ぶかつどう",
      "name_en": "School club activities",
      "blurb_en": "Who runs them, how many hours, senpai and kohai, and black clubs",
      "key_vocab": [
        {
          "ja": "ぶかつどう",
          "en": "club activities"
        },
        {
          "ja": "うんどうぶ",
          "en": "a sports club"
        },
        {
          "ja": "ぶんかぶ",
          "en": "a cultural club"
        },
        {
          "ja": "せんぱい",
          "en": "a senior student"
        },
        {
          "ja": "こうはい",
          "en": "a junior student"
        },
        {
          "ja": "たいかい",
          "en": "a competition"
        },
        {
          "ja": "れんしゅう",
          "en": "practice"
        },
        {
          "ja": "きそく",
          "en": "rules"
        },
        {
          "ja": "ブラックぶかつ",
          "en": "an over-demanding club"
        },
        {
          "ja": "チームワーク",
          "en": "teamwork"
        }
      ],
      "questions": [
        {
          "id": "bukatsu-define-2",
          "move": "define",
          "question_ja": "ぶかつどうについて、どんな ことが わかりましたか。",
          "question_en": "What did you find out about club activities?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "bukatsu-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ぶかつどうとは 何[なん]ですか。",
          "question_en": "What are club activities?",
          "move": "define"
        },
        {
          "id": "bukatsu-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは どんな ぶかつどうですか。",
          "question_en": "What club does your photograph show?",
          "move": "image"
        },
        {
          "id": "bukatsu-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 人[ひと]たちは 何[なに]を していますか。",
          "question_en": "What are the people in it doing?",
          "move": "image"
        },
        {
          "id": "bukatsu-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ぶかつどうは いつから 日本[にほん]の 学校[がっこう]に ありますか。",
          "question_en": "How long have clubs been part of Japanese schools?",
          "move": "facts"
        },
        {
          "id": "bukatsu-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 学校[がっこう]で する ように なったと 思[おも]いますか。",
          "question_en": "Why do you think they became a school thing?",
          "move": "facts"
        },
        {
          "id": "bukatsu-howdo",
          "move": "facts",
          "question_ja": "ぶかつどうは どうやって きめますか。",
          "question_en": "How do students decide which club to join?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "bukatsu-where",
          "move": "facts",
          "question_ja": "ぶかつどうは どこで しますか。",
          "question_en": "Where do clubs meet?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "bukatsu-who",
          "move": "facts",
          "question_ja": "ぶかつどうの せんせいは だれですか。",
          "question_en": "Who runs a club?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "bukatsu-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 高校生[こうこうせい]は 週[しゅう]に 何回[なんかい] ぶかつどうを しますか。",
          "question_en": "How many times a week do Japanese senior students have club?",
          "move": "facts"
        },
        {
          "id": "bukatsu-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "せんぱいと こうはいは どんな かんけいですか。",
          "question_en": "What is the relationship between senpai and kohai?",
          "move": "facts"
        },
        {
          "id": "bukatsu-eg1",
          "move": "example",
          "question_ja": "たとえば、どんな ぶかつどうが ありますか。",
          "question_en": "For example, what clubs are there?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "bukatsu-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "bukatsu-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ぶかつどうの いい点[てん]は 何[なん]ですか。",
          "question_en": "What are the good points of club activities?"
        },
        {
          "id": "bukatsu-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ぶかつどうで 高校生[こうこうせい]は 何[なに]を 学[まな]びますか。",
          "question_en": "What do students learn from them?"
        },
        {
          "id": "bukatsu-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ぶかつどうの わるい点[てん]は 何[なん]ですか。",
          "question_en": "What are the bad points?"
        },
        {
          "id": "bukatsu-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "「ブラックぶかつ」とは 何[なん]ですか。",
          "question_en": "What is a black club?",
          "move": "bad"
        },
        {
          "id": "bukatsu-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうは さいきん かわってきましたか。",
          "question_en": "Have clubs been changing lately?",
          "move": "change"
        },
        {
          "id": "bukatsu-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうは これから どう なると 思[おも]いますか。",
          "question_en": "What will happen to club activities?",
          "move": "change"
        },
        {
          "id": "bukatsu-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、ぶかつどうは どうして たいせつですか。",
          "question_en": "Why do club activities matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "bukatsu-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうから 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What do clubs tell you about Japanese society?",
          "move": "culture"
        },
        {
          "id": "bukatsu-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 学校[がっこう]は チームワークを たいせつに しますか。",
          "question_en": "Why do Japanese schools make so much of teamwork?",
          "move": "culture"
        },
        {
          "id": "bukatsu-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "長[なが]すぎる れんしゅうは どうしたら いいと 思[おも]いますか。",
          "question_en": "What should be done about practices that run too long?"
        },
        {
          "id": "bukatsu-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "みんなが 休[やす]む ために、学校[がっこう]は 何[なに]が できますか。",
          "question_en": "What could a school do to give everyone a rest?"
        },
        {
          "id": "bukatsu-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 学校[がっこう]の スポーツと どう ちがいますか。",
          "question_en": "How is it different from sport at an Australian school?",
          "move": "compare"
        },
        {
          "id": "bukatsu-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 学校[がっこう]にも ぶかつどうが あった ほうが いいと 思[おも]いますか。",
          "question_en": "Should Australian schools have clubs too?",
          "move": "compare"
        },
        {
          "id": "bukatsu-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "bukatsu-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "れんしゅうの 時間[じかん]を へらした ほうが いいと 思[おも]いますか。",
          "question_en": "Should the practice hours be cut?",
          "move": "opinion"
        },
        {
          "id": "bukatsu-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぶかつどうは 勉強[べんきょう]の じゃまに なると 思[おも]いますか。",
          "question_en": "Do you think clubs get in the way of study?",
          "move": "opinion"
        },
        {
          "id": "bukatsu-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 学校[がっこう]で ぶかつどうを して みたいですか。",
          "question_en": "Would you like to join a club at a Japanese school?",
          "move": "opinion"
        }
      ]
    },
    {
      "id": "shougakkou",
      "name_ja": "小学校[しょうがっこう]の 一日[いちにち]",
      "name_en": "A day at primary school",
      "blurb_en": "Walking there in groups, school lunch, cleaning the classroom",
      "key_vocab": [
        {
          "ja": "きゅうしょく",
          "en": "school lunch"
        },
        {
          "ja": "そうじ",
          "en": "cleaning"
        },
        {
          "ja": "しゅうだんとうこう",
          "en": "walking to school in a group"
        },
        {
          "ja": "ランドセル",
          "en": "the school satchel"
        },
        {
          "ja": "かもく",
          "en": "a subject"
        },
        {
          "ja": "ほうかご",
          "en": "after school"
        },
        {
          "ja": "きゅうけい",
          "en": "a break"
        },
        {
          "ja": "せいと",
          "en": "a pupil"
        },
        {
          "ja": "たんにん",
          "en": "the class teacher"
        },
        {
          "ja": "きそく",
          "en": "rules"
        }
      ],
      "questions": [
        {
          "id": "shougakkou-define-2",
          "move": "define",
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]について、どんな ことが わかりましたか。",
          "question_en": "What did you find out about Japanese primary schools?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "shougakkou-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "日本[にほん]の 小学生[しょうがくせい]の 一日[いちにち]は どんな 一日[いちにち]ですか。",
          "question_en": "What is a Japanese primary school student's day like?",
          "move": "define"
        },
        {
          "id": "shougakkou-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんは 学校[がっこう]の どんな 時間[じかん]ですか。",
          "question_en": "What part of the school day does your photograph show?",
          "move": "image"
        },
        {
          "id": "shougakkou-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "しゃしんの 子[こ]どもたちは 何[なに]を していますか。",
          "question_en": "What are the children doing?",
          "move": "image"
        },
        {
          "id": "shougakkou-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "きゅうしょくは いつから 始[はじ]まりましたか。",
          "question_en": "When did school lunches start?",
          "move": "facts"
        },
        {
          "id": "shougakkou-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 子[こ]どもが そうじを する ように なったと 思[おも]いますか。",
          "question_en": "Why do you think the children came to do the cleaning?",
          "move": "facts"
        },
        {
          "id": "shougakkou-where",
          "move": "facts",
          "question_ja": "きゅうしょくは どこで たべますか。",
          "question_en": "Where do the children eat their lunch?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shougakkou-who",
          "move": "facts",
          "question_ja": "きゅうしょくは だれが はこびますか。",
          "question_en": "Who carries the school lunch?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shougakkou-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "小学生[しょうがくせい]は どうやって 学校[がっこう]に 行[い]きますか。",
          "question_en": "How do they get to school?",
          "move": "facts"
        },
        {
          "id": "shougakkou-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "学校[がっこう]が 終[お]わってから 何[なに]を しますか。",
          "question_en": "What do they do after school?",
          "move": "facts"
        },
        {
          "id": "shougakkou-eg1",
          "move": "example",
          "question_ja": "たとえば、小学校[しょうがっこう]では どんな かもくを べんきょうしますか。",
          "question_en": "For example, what subjects do they study?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shougakkou-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shougakkou-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]の いい点[てん]は 何[なん]ですか。",
          "question_en": "What is good about a Japanese primary school?"
        },
        {
          "id": "shougakkou-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "きゅうしょくの いい点[てん]は 何[なん]ですか。",
          "question_en": "What is good about school lunch?"
        },
        {
          "id": "shougakkou-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]の もんだいは 何[なん]ですか。",
          "question_en": "What problems do they have?"
        },
        {
          "id": "shougakkou-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "子[こ]どもだけで 学校[がっこう]に 行[い]くのは あぶないと 思[おも]いますか。",
          "question_en": "Do you think walking to school alone is unsafe?",
          "move": "bad"
        },
        {
          "id": "shougakkou-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]は かわってきていますか。",
          "question_en": "Are Japanese primary schools changing?",
          "move": "change"
        },
        {
          "id": "shougakkou-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "これから 日本[にほん]の 小学校[しょうがっこう]は どう なると 思[おも]いますか。",
          "question_en": "How will Japanese primary schools change?",
          "move": "change"
        },
        {
          "id": "shougakkou-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、そうじや きゅうしょくは どうして たいせつですか。",
          "question_en": "Why do the cleaning and the school lunch matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "shougakkou-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "小学校[しょうがっこう]の 生活[せいかつ]から 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What does primary school life tell you about Japanese society?",
          "move": "culture"
        },
        {
          "id": "shougakkou-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "そうじや きゅうしょくで 子[こ]どもは 何[なに]を 学[まな]びますか。",
          "question_en": "What do the children learn from cleaning and from lunch?",
          "move": "culture"
        },
        {
          "id": "shougakkou-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "その もんだいは どうしたら いいと 思[おも]いますか。",
          "question_en": "What should be done about that?"
        },
        {
          "id": "shougakkou-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "先生[せんせい]が いそがしすぎる ことについて、何[なに]が できますか。",
          "question_en": "What could be done about how busy the teachers are?"
        },
        {
          "id": "shougakkou-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]と オーストラリアの 小学校[しょうがっこう]は どう ちがいますか。",
          "question_en": "How is a Japanese primary school different from an Australian one?",
          "move": "compare"
        },
        {
          "id": "shougakkou-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 学校[がっこう]でも やって みたい しゅうかんは ありますか。",
          "question_en": "Is there a custom you would bring to an Australian school?",
          "move": "compare"
        },
        {
          "id": "shougakkou-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "shougakkou-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "子[こ]どもが へっている ことは 学校[がっこう]に どんな えいきょうが ありますか。",
          "question_en": "How does the falling birth rate affect schools?",
          "move": "opinion"
        },
        {
          "id": "shougakkou-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 小学校[しょうがっこう]に 行[い]って みたいですか。",
          "question_en": "Would you like to attend a Japanese primary school?",
          "move": "opinion"
        },
        {
          "id": "shougakkou-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "しらべて 一番[いちばん] おどろいた ことは 何[なん]ですか。",
          "question_en": "What surprised you most in your research?",
          "move": "opinion"
        }
      ]
    },
    {
      "id": "shichigosan",
      "name_ja": "七五三[しちごさん]",
      "name_en": "The 7-5-3 festival",
      "blurb_en": "Why those ages, the shrine visit, the sweets, and the photo business",
      "key_vocab": [
        {
          "ja": "七五三[しちごさん]",
          "en": "the 7-5-3 festival"
        },
        {
          "ja": "じんじゃ",
          "en": "shrine"
        },
        {
          "ja": "きもの",
          "en": "kimono"
        },
        {
          "ja": "はかま",
          "en": "hakama trousers"
        },
        {
          "ja": "ちとせあめ",
          "en": "the long red and white sweet"
        },
        {
          "ja": "せいちょう",
          "en": "growing up"
        },
        {
          "ja": "おいわい",
          "en": "a celebration"
        },
        {
          "ja": "えんぎが いい",
          "en": "lucky, auspicious"
        },
        {
          "ja": "きねんしゃしん",
          "en": "a commemorative photograph"
        },
        {
          "ja": "しゃしんかん",
          "en": "a photo studio"
        }
      ],
      "questions": [
        {
          "id": "shichigosan-define-2",
          "move": "define",
          "question_ja": "七五三[しちごさん]について、どんな ことが わかりましたか。",
          "question_en": "What did you find out about shichigosan?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "shichigosan-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "七五三[しちごさん]とは 何[なん]ですか。",
          "question_en": "What is shichigosan?",
          "move": "define"
        },
        {
          "id": "shichigosan-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには だれが うつっていますか。",
          "question_en": "Who is in your photograph?",
          "move": "image"
        },
        {
          "id": "shichigosan-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "子[こ]どもは どんな ふくを 着[き]ていますか。",
          "question_en": "What are the children wearing?",
          "move": "image"
        },
        {
          "id": "shichigosan-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]は いつから ありますか。",
          "question_en": "How far back does shichigosan go?",
          "move": "facts"
        },
        {
          "id": "shichigosan-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして 七[なな]さいと 五[ご]さいと 三[さん]さいですか。",
          "question_en": "Why those three ages?",
          "move": "facts"
        },
        {
          "id": "shichigosan-howdo",
          "move": "facts",
          "question_ja": "七五三[しちごさん]の じゅんびは どうやって しますか。",
          "question_en": "How does a family get ready for it?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shichigosan-where",
          "move": "facts",
          "question_ja": "七五三[しちごさん]の 日[ひ]に どこに 行[い]きますか。",
          "question_en": "Where does a family go on the day?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shichigosan-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]は 一年[いちねん]の いつ ありますか。",
          "question_en": "What time of year is it?",
          "move": "facts"
        },
        {
          "id": "shichigosan-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]の 日[ひ]に 家族[かぞく]は 何[なに]を しますか。",
          "question_en": "What does a family do on the day?",
          "move": "facts"
        },
        {
          "id": "shichigosan-eg1",
          "move": "example",
          "question_ja": "たとえば、子[こ]どもは どんな ふくを きますか。",
          "question_en": "For example, what do the children wear?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shichigosan-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "shichigosan-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]の いい点[てん]は 何[なん]ですか。",
          "question_en": "What is good about shichigosan?"
        },
        {
          "id": "shichigosan-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]は 家族[かぞく]に とって どんな いみが ありますか。",
          "question_en": "What does it mean to a family?"
        },
        {
          "id": "shichigosan-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]の もんだいは 何[なん]ですか。",
          "question_en": "What problems does it have?"
        },
        {
          "id": "shichigosan-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "しゃしんの ために 七五三[しちごさん]を する 家族[かぞく]も いますが、どう 思[おも]いますか。",
          "question_en": "Some families do it for the photographs. What do you think?",
          "move": "bad"
        },
        {
          "id": "shichigosan-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "今[いま]の 七五三[しちごさん]は むかしと ちがいますか。",
          "question_en": "Is shichigosan different now?",
          "move": "change"
        },
        {
          "id": "shichigosan-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]は これからも つづくと 思[おも]いますか。",
          "question_en": "Will shichigosan continue?",
          "move": "change"
        },
        {
          "id": "shichigosan-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、七五三[しちごさん]は どうして たいせつですか。",
          "question_en": "Why does shichigosan matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "shichigosan-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]から 日本[にほん]の 家族[かぞく]について 何[なに]が わかりますか。",
          "question_en": "What does shichigosan tell you about Japanese families?",
          "move": "culture"
        },
        {
          "id": "shichigosan-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]の 人[ひと]は 子[こ]どもの せいちょうを いわいますか。",
          "question_en": "Why do Japanese people mark a child growing up?",
          "move": "culture"
        },
        {
          "id": "shichigosan-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おかねが かかりすぎる ことは どうしたら いいと 思[おも]いますか。",
          "question_en": "What could be done about the cost?"
        },
        {
          "id": "shichigosan-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ぎょうじの いみを わすれない ために、何[なに]が できますか。",
          "question_en": "What could be done so the meaning is not forgotten?"
        },
        {
          "id": "shichigosan-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアにも 子[こ]どもの せいちょうを いわう ぎょうじが ありますか。",
          "question_en": "Is there anything in Australia that marks a child growing up?",
          "move": "compare"
        },
        {
          "id": "shichigosan-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の おいわいと オーストラリアの おいわいは どう ちがいますか。",
          "question_en": "How do Japanese and Australian celebrations differ?",
          "move": "compare"
        },
        {
          "id": "shichigosan-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "shichigosan-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "しゃしんの 会社[かいしゃ]が ふえた ことは いい ことですか。",
          "question_en": "Is the growth of the photo studios a good thing?",
          "move": "opinion"
        },
        {
          "id": "shichigosan-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "七五三[しちごさん]を 見[み]て みたいですか。",
          "question_en": "Would you like to see a shichigosan?",
          "move": "opinion"
        },
        {
          "id": "shichigosan-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "おかねが かかる ことについて どう 思[おも]いますか。",
          "question_en": "What do you think about how much it costs?",
          "move": "opinion"
        }
      ]
    },
    {
      "id": "konbini",
      "name_ja": "コンビニ",
      "name_en": "Convenience stores and plastic",
      "blurb_en": "What they sell, why they are everywhere, and the packaging problem",
      "key_vocab": [
        {
          "ja": "コンビニ",
          "en": "convenience store"
        },
        {
          "ja": "べんり",
          "en": "convenient"
        },
        {
          "ja": "ほうそう",
          "en": "packaging"
        },
        {
          "ja": "プラスチック",
          "en": "plastic"
        },
        {
          "ja": "ごみ",
          "en": "rubbish"
        },
        {
          "ja": "レジぶくろ",
          "en": "a carrier bag"
        },
        {
          "ja": "マイバッグ",
          "en": "your own bag"
        },
        {
          "ja": "しょうひきげん",
          "en": "use-by date"
        },
        {
          "ja": "フードロス",
          "en": "food waste"
        },
        {
          "ja": "かんきょう",
          "en": "the environment"
        }
      ],
      "questions": [
        {
          "id": "konbini-define-2",
          "move": "define",
          "question_ja": "コンビニについて、どんな ことが わかりましたか。",
          "question_en": "What did you find out about convenience stores?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "konbini-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "コンビニとは 何[なん]ですか。",
          "question_en": "What is a convenience store?",
          "move": "define"
        },
        {
          "id": "konbini-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには コンビニの 何[なに]が うつっていますか。",
          "question_en": "What does your photograph show about convenience stores?",
          "move": "image"
        },
        {
          "id": "konbini-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "どうして この しゃしんを えらびましたか。",
          "question_en": "Why did you choose this photograph?",
          "move": "image"
        },
        {
          "id": "konbini-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニは いつから 日本[にほん]に ありますか。",
          "question_en": "How long have convenience stores been in Japan?",
          "move": "facts"
        },
        {
          "id": "konbini-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どうして こんなに ふえたと 思[おも]いますか。",
          "question_en": "Why do you think there are so many now?",
          "move": "facts"
        },
        {
          "id": "konbini-howdo",
          "move": "facts",
          "question_ja": "コンビニでは どうやって かいものを しますか。",
          "question_en": "How does shopping in one actually go?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "konbini-where",
          "move": "facts",
          "question_ja": "コンビニは 日本[にほん]の どこに ありますか。",
          "question_en": "Where in Japan do you find convenience stores?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "konbini-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "だれが コンビニを 使[つか]いますか。",
          "question_en": "Who uses them?",
          "move": "facts"
        },
        {
          "id": "konbini-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニでは どんな ものが 買[か]えますか。",
          "question_en": "What can you buy there?",
          "move": "facts"
        },
        {
          "id": "konbini-eg1",
          "move": "example",
          "question_ja": "たとえば、コンビニは どんな サービスを していますか。",
          "question_en": "For example, what services do they offer?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "konbini-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "konbini-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニの いい点[てん]は 何[なん]ですか。",
          "question_en": "What are the good points of convenience stores?"
        },
        {
          "id": "konbini-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニは だれに とって 一番[いちばん] べんりですか。",
          "question_en": "Who are they most useful to?"
        },
        {
          "id": "konbini-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニの わるい点[てん]は 何[なん]ですか。",
          "question_en": "What are the bad points?"
        },
        {
          "id": "konbini-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "コンビニの もんだいは 何[なん]ですか。",
          "question_en": "What is the problem with them?",
          "move": "bad"
        },
        {
          "id": "konbini-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "コンビニは さいきん かわってきましたか。",
          "question_en": "Have they been changing lately?",
          "move": "change"
        },
        {
          "id": "konbini-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "コンビニの 会社[かいしゃ]は どんな ことを していますか。",
          "question_en": "What are the companies doing about it?",
          "move": "change"
        },
        {
          "id": "konbini-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、コンビニは どうして たいせつですか。",
          "question_en": "Why do convenience stores matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "konbini-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "コンビニから 日本[にほん]の 社会[しゃかい]の 何[なに]が わかりますか。",
          "question_en": "What do they tell you about Japanese society?",
          "move": "culture"
        },
        {
          "id": "konbini-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の 人[ひと]は どうして ていねいな ほうそうが 好[す]きだと 思[おも]いますか。",
          "question_en": "Why do you think Japanese shoppers like careful packaging?",
          "move": "culture"
        },
        {
          "id": "konbini-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "プラスチックの ごみは どうしたら いいと 思[おも]いますか。",
          "question_en": "What should be done about the plastic waste?"
        },
        {
          "id": "konbini-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "お店[みせ]と 買[か]う 人[ひと]、どちらが かわった ほうが いいと 思[おも]いますか。",
          "question_en": "Who should change more, the shops or the shoppers?"
        },
        {
          "id": "konbini-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "これから コンビニは どう なると 思[おも]いますか。",
          "question_en": "What will happen to convenience stores?",
          "move": "fix"
        },
        {
          "id": "konbini-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "自分[じぶん]は ごみを へらす ために 何[なに]が できますか。",
          "question_en": "What can you do yourself to cut waste?",
          "move": "fix"
        },
        {
          "id": "konbini-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの 店[みせ]と くらべて、コンビニは どう ちがいますか。",
          "question_en": "How are they different from Australian shops?",
          "move": "compare"
        },
        {
          "id": "konbini-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアの プラスチックの ルールは どうですか。",
          "question_en": "What are the plastic rules like in Australia?",
          "move": "compare"
        },
        {
          "id": "konbini-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "konbini-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の コンビニを 使[つか]って みたいですか。",
          "question_en": "Would you like to use a Japanese convenience store?",
          "move": "opinion"
        }
      ]
    },
    {
      "id": "washlet",
      "name_ja": "ウォシュレット",
      "name_en": "Japanese toilets",
      "blurb_en": "What the buttons do, where they came from, and omotenashi",
      "key_vocab": [
        {
          "ja": "ウォシュレット",
          "en": "a washlet"
        },
        {
          "ja": "べんざ",
          "en": "the seat"
        },
        {
          "ja": "きのう",
          "en": "a function"
        },
        {
          "ja": "おとひめ",
          "en": "the sound button"
        },
        {
          "ja": "せいけつ",
          "en": "cleanliness"
        },
        {
          "ja": "おもてなし",
          "en": "hospitality"
        },
        {
          "ja": "せつでん",
          "en": "saving power"
        },
        {
          "ja": "しゅうり",
          "en": "repair"
        },
        {
          "ja": "こうれいしゃ",
          "en": "older people"
        },
        {
          "ja": "わしきトイレ",
          "en": "a squat toilet"
        }
      ],
      "questions": [
        {
          "id": "washlet-define-2",
          "move": "define",
          "question_ja": "ウォシュレットについて、どんな ことが わかりましたか。",
          "question_en": "What did you find out about washlets?",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true
        },
        {
          "id": "washlet-what-it-is-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ウォシュレットとは 何[なん]ですか。",
          "question_en": "What is a washlet?",
          "move": "define"
        },
        {
          "id": "washlet-image-1",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "その しゃしんには 何[なに]が うつっていますか。",
          "question_en": "What is in your photograph?",
          "move": "image"
        },
        {
          "id": "washlet-image-2",
          "width": "open",
          "difficulty": 1,
          "higher_order": false,
          "from_topic": true,
          "question_ja": "ボタンが たくさん 見[み]えますが、何[なに]が できますか。",
          "question_en": "There are a lot of buttons. What do they do?",
          "move": "image"
        },
        {
          "id": "washlet-history-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットは いつから 日本[にほん]に ありますか。",
          "question_en": "How long have they been in Japan?",
          "move": "facts"
        },
        {
          "id": "washlet-history-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の トイレは むかし どんな トイレでしたか。",
          "question_en": "What were Japanese toilets like before?",
          "move": "facts"
        },
        {
          "id": "washlet-howdo",
          "move": "facts",
          "question_ja": "ウォシュレットは どうやって 使[つか]いますか。",
          "question_en": "How do you actually use one?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "washlet-who-and-when-1",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "日本[にほん]の 家[いえ]には どのぐらい ありますか。",
          "question_en": "How many Japanese homes have one?",
          "move": "facts"
        },
        {
          "id": "washlet-who-and-when-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "どこで ウォシュレットを 見[み]る ことが できますか。",
          "question_en": "Where do you come across them?",
          "move": "facts"
        },
        {
          "id": "washlet-who",
          "move": "facts",
          "question_ja": "だれに とって ウォシュレットは いちばん べんりですか。",
          "question_en": "Who finds a washlet most useful?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "washlet-eg1",
          "move": "example",
          "question_ja": "たとえば、ウォシュレットには どんな きのうが ありますか。",
          "question_en": "For example, what functions does one have?",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "washlet-eg2",
          "move": "example",
          "question_ja": "いま 話[はな]した ことを、れいを あげて せつめいして ください。",
          "question_en": "Explain what you have just said, giving an example.",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false
        },
        {
          "id": "washlet-good-1",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットの いい点[てん]は 何[なん]ですか。",
          "question_en": "What are the good points of a washlet?"
        },
        {
          "id": "washlet-good-2",
          "move": "good",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットは どんな 人[ひと]に 一番[いちばん] やくに 立[た]ちますか。",
          "question_en": "Who does it help most?"
        },
        {
          "id": "washlet-bad-1",
          "move": "bad",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットの わるい点[てん]は 何[なん]ですか。",
          "question_en": "What are the bad points?"
        },
        {
          "id": "washlet-change-2",
          "width": "shape",
          "difficulty": 2,
          "higher_order": false,
          "from_topic": false,
          "question_ja": "ウォシュレットの もんだいは 何[なん]ですか。",
          "question_en": "What are the drawbacks?",
          "move": "bad"
        },
        {
          "id": "washlet-change-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットは どんな ふうに かわってきましたか。",
          "question_en": "How have they changed over the years?",
          "move": "change"
        },
        {
          "id": "washlet-future-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットは これから どう なると 思[おも]いますか。",
          "question_en": "What will happen to the washlet?",
          "move": "change"
        },
        {
          "id": "washlet-sig",
          "move": "culture",
          "question_ja": "日本[にほん]の 人[ひと]に とって、せいけつは どうして たいせつですか。",
          "question_en": "Why does cleanliness matter to Japanese people?",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false
        },
        {
          "id": "washlet-values-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットから 日本[にほん]の 「おもてなし」の 考[かんが]え方[かた]が わかりますか。",
          "question_en": "Can you see the idea of omotenashi in the washlet?",
          "move": "culture"
        },
        {
          "id": "washlet-values-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして 日本[にほん]では せいけつが たいせつに されていますか。",
          "question_en": "Why is cleanliness held to matter so much in Japan?",
          "move": "culture"
        },
        {
          "id": "washlet-fix-1",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "電気[でんき]と 水[みず]の もんだいは どうしたら いいと 思[おも]いますか。",
          "question_en": "What should be done about the power and water it uses?"
        },
        {
          "id": "washlet-fix-2",
          "move": "fix",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ボタンが 多[おお]すぎる ことについて、何[なに]が できますか。",
          "question_en": "What could be done about having too many buttons?"
        },
        {
          "id": "washlet-compare-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "日本[にほん]の トイレと オーストラリアの トイレは どう ちがいますか。",
          "question_en": "How are Japanese and Australian toilets different?",
          "move": "compare"
        },
        {
          "id": "washlet-compare-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "オーストラリアでも 人気[にんき]に なると 思[おも]いますか。",
          "question_en": "Do you think they would catch on in Australia?",
          "move": "compare"
        },
        {
          "id": "washlet-final-why",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "どうして この トピックを えらびましたか。",
          "question_en": "Why did you choose this topic?",
          "move": "opinion"
        },
        {
          "id": "washlet-future-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "こうれいしゃが ふえると、トイレは どう かわりますか。",
          "question_en": "How will toilets change as the population ages?",
          "move": "opinion"
        },
        {
          "id": "washlet-personal-1",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "ウォシュレットを 使[つか]った ことが ありますか。",
          "question_en": "Have you ever used one?",
          "move": "opinion"
        },
        {
          "id": "washlet-personal-2",
          "width": "deep",
          "difficulty": 3,
          "higher_order": true,
          "from_topic": false,
          "question_ja": "電気[でんき]や 水[みず]を 使[つか]いますが、かんきょうに いいと 思[おも]いますか。",
          "question_en": "They use power and water. Are they good for the environment?",
          "move": "opinion"
        }
      ]
    }
  ],
  "moves": [
    "define",
    "image",
    "facts",
    "example",
    "good",
    "bad",
    "change",
    "culture",
    "fix",
    "compare",
    "opinion"
  ]
};
