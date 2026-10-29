/* ============================================================================
   phrases.js — what to say about the one image, and what to say when the
   question gets away from you.
   ----------------------------------------------------------------------------
   Six groups. The first is the doorway script the specifications require and
   do not assess. The next four build the Discussion from describing the image
   up to evaluating the practice. The last is the repair strategies that four
   of the six assessor reports name.

   A phrase with ＿＿ in it reads badly aloud, so those carry `say`: the same
   phrase with the blank filled in. The audio button speaks `say` when it is
   there and `ja` when it is not, and the app shows the filled version as a
   worked example underneath.

   Japanese here uses only the 200 prescribed kanji, with readings stored as
   漢字[かんじ]. 写真 is not on the list, so a photo is しゃしん throughout.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.ORAL_PHRASES = {
  "schema_version": 1,
  "groups": [
    {
      "id": "entry",
      "tile_en": "Greeting the assessors, giving your name and number, and leaving",
      "name_ja": "はじめと おわり",
      "name_en": "Walking in and walking out",
      "about": "The specifications require this and say in the same sentence that it is not assessed. It still has to be done, so learn it as a doorway script and get it out of the way. Your student number is the only English in the whole examination.",
      "report_refs": [
        "japaneseSL-oral-specs-w: Upon entering the examination room, students are to verbally provide their student number in English. Students are then to indicate to the assessors, in Japanese, their chosen subtopic and the supporting visual material that they have brought with them.",
        "Video 1: Assessors note the subtopic so that it is not covered in Section 1."
      ],
      "phrases": [
        {
          "ja": "しつれいします。",
          "en": "Excuse me. (on entering)"
        },
        {
          "ja": "こんにちは。よろしく おねがいします。",
          "en": "Hello. Pleased to meet you."
        },
        {
          "ja": "私[わたし]の ディスカッションの トピックは ＿＿です。",
          "en": "My discussion topic is ＿＿.",
          "say": "私[わたし]の ディスカッションの トピックは おまつりです。",
          "say_en": "My discussion topic is Japanese festivals."
        },
        {
          "ja": "これが その しゃしんです。",
          "en": "This is my image."
        },
        {
          "ja": "これから よろしく おねがいします。",
          "en": "I look forward to it."
        },
        {
          "ja": "ありがとうございました。しつれいします。",
          "en": "Thank you very much. Goodbye."
        }
      ]
    },
    {
      "id": "show",
      "tile_en": "Where things are in your picture and what people are doing",
      "name_ja": "しゃしんに あるものを 言[い]う",
      "name_en": "Saying what the picture shows",
      "about": "Where things are, what they look like, and who is doing what. Get through this quickly: the VCAA oral exam reports are clear that describing the image is a middle-band answer, so it is the opening, not the discussion.",
      "report_refs": [
        "2021: They referred to the image appropriately throughout the discussion, rather than simply describing it.",
        "2020: Some students were able to effectively integrate their chosen image to support their subtopic, rather than just describe the image."
      ],
      "phrases": [
        {
          "ja": "この しゃしんには ＿＿が あります。",
          "en": "In this photo there is ＿＿.",
          "say": "この しゃしんには やたいが あります。",
          "say_en": "In this photo there is a food stall."
        },
        {
          "ja": "＿＿が うつっています。",
          "en": "＿＿ can be seen in it.",
          "say": "たくさんの 人[ひと]が うつっています。",
          "say_en": "A lot of people can be seen in it."
        },
        {
          "ja": "まん中[なか]に ＿＿が 見[み]えます。",
          "en": "In the middle you can see ＿＿.",
          "say": "まん中[なか]に おみこしが 見[み]えます。",
          "say_en": "In the middle you can see a portable shrine."
        },
        {
          "ja": "右[みぎ]に ＿＿、左[ひだり]に ＿＿が あります。",
          "en": "On the right there is ＿＿ and on the left ＿＿.",
          "say": "右[みぎ]に おちゃ、左[ひだり]に おかしが あります。",
          "say_en": "On the right there is tea and on the left sweets."
        },
        {
          "ja": "後[うし]ろに ＿＿が 見[み]えます。",
          "en": "Behind it you can see ＿＿.",
          "say": "後[うし]ろに 古[ふる]い お寺[てら]が 見[み]えます。",
          "say_en": "Behind it you can see an old temple."
        },
        {
          "ja": "前[まえ]に ＿＿が ならんでいます。",
          "en": "＿＿ are lined up at the front.",
          "say": "前[まえ]に 子[こ]どもが ならんでいます。",
          "say_en": "Children are lined up at the front."
        },
        {
          "ja": "＿＿が ＿＿を しています。",
          "en": "＿＿ is doing ＿＿.",
          "say": "女[おんな]の 人[ひと]が りょうりを しています。",
          "say_en": "A woman is cooking."
        },
        {
          "ja": "色[いろ]は ＿＿と ＿＿です。",
          "en": "The colours are ＿＿ and ＿＿.",
          "say": "色[いろ]は 赤[あか]と 白[しろ]です。",
          "say_en": "The colours are red and white."
        },
        {
          "ja": "＿＿の かたちを しています。",
          "en": "It is shaped like ＿＿.",
          "say": "花[はな]の かたちを しています。",
          "say_en": "It is shaped like a flower."
        },
        {
          "ja": "＿＿人[にん]ぐらい います。",
          "en": "There are about ＿＿ people.",
          "say": "二十人[にじゅうにん]ぐらい います。",
          "say_en": "There are about twenty people."
        },
        {
          "ja": "夜[よる]の しゃしんです。",
          "en": "It is a night photo."
        },
        {
          "ja": "これは 夏[なつ]の しゃしんだと 思[おも]います。",
          "en": "I think this is a summer photo."
        }
      ]
    },
    {
      "id": "conclude",
      "tile_en": "Saying what the picture tells you, and why you think so",
      "name_ja": "しゃしんから 考[かんが]える",
      "name_en": "Drawing conclusions",
      "about": "This is where the marks start. Do not stop at what is in the picture: say what it tells you, and say why you think so. Every one of these lines can be followed by から or ので and a reason.",
      "report_refs": [
        "2024: Many students described their images well but did not explain the connections between the discussion points and what was shown in the image.",
        "2023: A successful image told some sort of story and enabled students to elaborate on different aspects of the image."
      ],
      "phrases": [
        {
          "ja": "＿＿だと 思[おも]います。",
          "en": "I think it is ＿＿.",
          "say": "春[はる]の しゃしんだと 思[おも]います。",
          "say_en": "I think it is a spring photo."
        },
        {
          "ja": "＿＿かも しれません。",
          "en": "It may be ＿＿.",
          "say": "京都[きょうと]かも しれません。",
          "say_en": "It may be Kyoto."
        },
        {
          "ja": "＿＿から、＿＿だと わかります。",
          "en": "From ＿＿ you can tell that ＿＿.",
          "say": "さくらの かたちから、春[はる]の おかしだと わかります。",
          "say_en": "From the cherry blossom shape you can tell these are spring sweets."
        },
        {
          "ja": "＿＿の ようです。",
          "en": "It looks like ＿＿.",
          "say": "おまつりの 日[ひ]の ようです。",
          "say_en": "It looks like a festival day."
        },
        {
          "ja": "たぶん ＿＿だと 思[おも]います。",
          "en": "I think it is probably ＿＿.",
          "say": "たぶん 朝[あさ]の しゃしんだと 思[おも]います。",
          "say_en": "I think it is probably a morning photo."
        },
        {
          "ja": "どうしてかと 言[い]うと、＿＿からです。",
          "en": "The reason is that ＿＿.",
          "say": "どうしてかと 言[い]うと、みんな ゆかたを 着[き]ているからです。",
          "say_en": "The reason is that everyone is wearing a yukata."
        },
        {
          "ja": "この しゃしんは ＿＿を 見[み]せていると 思[おも]います。",
          "en": "I think this photo is showing ＿＿.",
          "say": "この しゃしんは 町[まち]の 人[ひと]の きもちを 見[み]せていると 思[おも]います。",
          "say_en": "I think this photo is showing how the people of the town feel."
        },
        {
          "ja": "しゃしんには ありませんが、＿＿も たいせつです。",
          "en": "It is not in the photo, but ＿＿ matters too.",
          "say": "しゃしんには ありませんが、たいこの おとも たいせつです。",
          "say_en": "It is not in the photo, but the sound of the drums matters too."
        }
      ]
    },
    {
      "id": "link",
      "tile_en": "Joining sentences, giving reasons, and adding a second point",
      "name_ja": "せつめいする、つなげる",
      "name_en": "Explaining and linking",
      "about": "Connectives are what the 2025 VCAA oral exam report names in higher-scoring responses. They also buy you thinking time without any dead air, and they let you come back to the image instead of waiting to be asked about it.",
      "report_refs": [
        "2025: Higher-scoring responses used connectives effectively, including まず、つまり and じつは.",
        "2021: They provided sufficient information, but this information was not always sequenced well."
      ],
      "phrases": [
        {
          "ja": "まず、＿＿に ついて 話[はな]します。",
          "en": "First I will talk about ＿＿.",
          "say": "まず、れきしに ついて 話[はな]します。",
          "say_en": "First I will talk about the history."
        },
        {
          "ja": "つぎに、＿＿に ついて 話[はな]します。",
          "en": "Next I will talk about ＿＿.",
          "say": "つぎに、オーストラリアと くらべて 話[はな]します。",
          "say_en": "Next I will compare it with Australia."
        },
        {
          "ja": "たとえば、＿＿です。",
          "en": "For example, ＿＿.",
          "say": "たとえば、春[はる]は さくらの かたちです。",
          "say_en": "For example, in spring they are shaped like cherry blossom."
        },
        {
          "ja": "つまり、＿＿です。",
          "en": "In other words, ＿＿.",
          "say": "つまり、きせつが とても たいせつです。",
          "say_en": "In other words, the season matters a great deal."
        },
        {
          "ja": "じつは、＿＿です。",
          "en": "In fact, ＿＿.",
          "say": "じつは、私[わたし]も 作[つく]ってみました。",
          "say_en": "In fact, I have tried making it myself."
        },
        {
          "ja": "それに、＿＿です。",
          "en": "On top of that, ＿＿.",
          "say": "それに、ねだんも 安[やす]いです。",
          "say_en": "On top of that, it is cheap too."
        },
        {
          "ja": "でも、＿＿です。",
          "en": "But ＿＿.",
          "say": "でも、作[つく]る 人[ひと]が 少[すく]ないです。",
          "say_en": "But there are not many people who can make it."
        },
        {
          "ja": "だから、＿＿です。",
          "en": "So ＿＿.",
          "say": "だから、学校[がっこう]で 教[おし]えた ほうが いいです。",
          "say_en": "So it would be better to teach it at school."
        },
        {
          "ja": "この しゃしんに もどりますが、＿＿。",
          "en": "Coming back to this photo, ＿＿.",
          "say": "この しゃしんに もどりますが、ここに 子[こ]どもが います。",
          "say_en": "Coming back to this photo, there are children here."
        },
        {
          "ja": "しゃしんの ＿＿が、その いい れいだと 思[おも]います。",
          "en": "The ＿＿ in the photo is a good example of that.",
          "say": "しゃしんの やたいが、その いい れいだと 思[おも]います。",
          "say_en": "The food stall in the photo is a good example of that."
        },
        {
          "ja": "「＿＿」は ＿＿と いう いみです。",
          "en": "＿＿ means ＿＿.",
          "say": "「おみこし」は 小[ちい]さい 神社[じんじゃ]と いう いみです。",
          "say_en": "Omikoshi means a small shrine."
        },
        {
          "ja": "一[ひと]つは ＿＿で、もう 一[ひと]つは ＿＿です。",
          "en": "One is ＿＿ and the other is ＿＿.",
          "say": "一[ひと]つは ねだんで、もう 一[ひと]つは あじです。",
          "say_en": "One is the price and the other is the taste."
        }
      ]
    },
    {
      "id": "judge",
      "tile_en": "Good points, bad points, and what should be done about them",
      "name_ja": "いけんと ひょうか",
      "name_en": "Opinion and evaluation",
      "about": "Good points, bad points, and a solution for the bad ones. The 2025 VCAA oral exam report says most students manage いい点 and わるい点; it is the solution that separates the prepared ones.",
      "report_refs": [
        "2025: Most students were able to respond to いい点 and わるい点. The students who were more prepared were able to provide solutions for the わるい点.",
        "2022: Students who scored highly were able to share their opinions by using と思います and their reasons by using から or ので."
      ],
      "phrases": [
        {
          "ja": "私[わたし]は ＿＿だと 思[おも]います。",
          "en": "I think ＿＿.",
          "say": "私[わたし]は いい ぶんかだと 思[おも]います。",
          "say_en": "I think it is a good practice."
        },
        {
          "ja": "いい点[てん]は ＿＿ことです。",
          "en": "The good point is that ＿＿.",
          "say": "いい点[てん]は 町[まち]の 人[ひと]が みんなで することです。",
          "say_en": "The good point is that the whole town does it together."
        },
        {
          "ja": "わるい点[てん]は ＿＿ことです。",
          "en": "The bad point is that ＿＿.",
          "say": "わるい点[てん]は お金[かね]が かかることです。",
          "say_en": "The bad point is that it costs money."
        },
        {
          "ja": "＿＿した ほうが いいと 思[おも]います。",
          "en": "I think it would be better to ＿＿.",
          "say": "学校[がっこう]で 教[おし]えた ほうが いいと 思[おも]います。",
          "say_en": "I think it would be better to teach it at school."
        },
        {
          "ja": "もし ＿＿たら、＿＿と 思[おも]います。",
          "en": "If ＿＿, I think ＿＿.",
          "say": "もし オーストラリアに あったら、人気[にんき]に なると 思[おも]います。",
          "say_en": "If it existed in Australia, I think it would be popular."
        },
        {
          "ja": "オーストラリアと くらべると、＿＿です。",
          "en": "Compared with Australia, ＿＿.",
          "say": "オーストラリアと くらべると、しゅるいが 多[おお]いです。",
          "say_en": "Compared with Australia, there is more variety."
        },
        {
          "ja": "どちらも ＿＿ですが、＿＿の ほうが ＿＿です。",
          "en": "Both are ＿＿, but ＿＿ is more ＿＿.",
          "say": "どちらも あまいですが、ケーキの ほうが あまいです。",
          "say_en": "Both are sweet, but cake is sweeter."
        },
        {
          "ja": "その もんだいを なくす ために、＿＿が できると 思[おも]います。",
          "en": "To get rid of that problem, I think ＿＿ could be done.",
          "say": "その もんだいを なくす ために、ごみばこを ふやすことが できると 思[おも]います。",
          "say_en": "To get rid of that problem, I think more rubbish bins could be put out."
        },
        {
          "ja": "これからも つづくと 思[おも]います。",
          "en": "I think it will carry on."
        },
        {
          "ja": "なくなるのではなく、かわって のこると 思[おも]います。",
          "en": "I think it will not disappear but change and remain."
        }
      ]
    },
    {
      "id": "repair",
      "tile_en": "Asking for a repeat, checking a word, and buying thinking time",
      "name_ja": "時間[じかん]を かせぐ、聞[き]きなおす",
      "name_en": "Buying time and repair",
      "about": "Four of the six VCAA oral exam reports name repair strategies. Do not freeze and do not guess: name the one word you missed and ask. Asking in Japanese costs you nothing and keeps the eight minutes working for you.",
      "report_refs": [
        "2024: Students should pick out the specific word or words they did not understand and ask the assessors the meaning of those words.",
        "2025: If students do not know a word or question, they can ask for clarification or say they do not understand.",
        "2022: They asked for clarification and used Japanese fillers and repair strategies effectively and were therefore able to carry the conversation forward."
      ],
      "phrases": [
        {
          "ja": "そうですね。",
          "en": "Let me think."
        },
        {
          "ja": "少[すこ]し 考[かんが]えさせて ください。",
          "en": "Let me think for a moment."
        },
        {
          "ja": "すみません、もう 一回[いっかい] 言[い]って ください。",
          "en": "Sorry, could you say that again."
        },
        {
          "ja": "もう 少[すこ]し ゆっくり 言[い]って ください。",
          "en": "A little more slowly, please."
        },
        {
          "ja": "すみません、「＿＿」は どういう いみですか。",
          "en": "Sorry, what does ＿＿ mean?",
          "say": "すみません、「がっき」は どういう いみですか。",
          "say_en": "Sorry, what does gakki mean?"
        },
        {
          "ja": "「＿＿」が わかりませんでした。",
          "en": "I did not catch ＿＿.",
          "say": "「何[なん]さつ」が わかりませんでした。",
          "say_en": "I did not catch nansatsu."
        },
        {
          "ja": "しつもんは ＿＿ですか。",
          "en": "Is the question ＿＿?",
          "say": "しつもんは アルバイトの ことですか。",
          "say_en": "Is the question about my part-time job?"
        },
        {
          "ja": "日本語[にほんご]で 何[なん]と 言[い]いますか。",
          "en": "How do you say that in Japanese?"
        },
        {
          "ja": "ことばを わすれましたが、＿＿の ような ものです。",
          "en": "I have forgotten the word, but it is something like ＿＿.",
          "say": "ことばを わすれましたが、お店[みせ]の ような ものです。",
          "say_en": "I have forgotten the word, but it is something like a shop."
        },
        {
          "ja": "すみません、もう 一回[いっかい] はじめから 言[い]います。",
          "en": "Sorry, let me start that again."
        },
        {
          "ja": "よく わかりません。でも、＿＿だと 思[おも]います。",
          "en": "I am not sure. But I think ＿＿.",
          "say": "よく わかりません。でも、おまつりの ことだと 思[おも]います。",
          "say_en": "I am not sure. But I think it is about festivals."
        }
      ]
    }
  ]
};
