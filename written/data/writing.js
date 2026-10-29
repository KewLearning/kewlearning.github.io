/* ============================================================================
   writing.js — Section 2 Part B and Section 3.
   ----------------------------------------------------------------------------
   Andrew asked for two things here: plan, not write; and models to pull
   apart. So there is no blank 500-ji box in this app. There are scaffolds
   that get a plan out of a student in four minutes, and there are model
   responses with every move labelled.

   THE PROMPTS AND THE MODELS ARE WRITTEN FOR THIS APP. They are in the
   style of the examination and they are not from any paper. Where a note
   says the assessors said something, the year is on it.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.HIKKI_WRITING = {
  "schema_version": 1,
  "text_types": [
    {
      "id": "speech",
      "ja": "スピーチ",
      "en": "Speech script",
      "style": "informative or persuasive",
      "who": "a room full of people who are there listening to you",
      "features": [
        {
          "f": "みなさん、こんにちは。",
          "what": "Open by addressing them. A speech has a room in it."
        },
        {
          "f": "今日[きょう]は　……について　話[はな]したいと　思[おも]います。",
          "what": "Say what the speech is about in the first few lines."
        },
        {
          "f": "です／ます",
          "what": "Polite throughout. You are standing in front of them."
        },
        {
          "f": "まず……、つぎに……、さいごに……",
          "what": "Signpost out loud. A listener cannot go back and reread."
        },
        {
          "f": "これで　話[はなし]を　終[お]わります。ありがとう　ございました。",
          "what": "Close the speech, then thank them."
        }
      ],
      "avoid": [
        {
          "f": "聞[き]いて　くれて　ありがとう　ございました。",
          "why": "Named in the 2022 report as the wrong closing for a speech script.",
          "year": 2022
        }
      ]
    },
    {
      "id": "journal",
      "ja": "にっき",
      "en": "Journal entry",
      "style": "reflective",
      "who": "nobody but you, which is what lets you be honest in it",
      "features": [
        {
          "f": "〇月[がつ]〇日[にち]（〇）天気[てんき]：はれ",
          "what": "A date line. It is a journal."
        },
        {
          "f": "今日[きょう]は……でした。",
          "what": "Past tense, the whole way through. It already happened."
        },
        {
          "f": "……と　思[おも]った。／うれしかった。",
          "what": "Say how you felt, not only what happened. Reflection is the point."
        },
        {
          "f": "これから……したいと　思[おも]う。",
          "what": "Look forward at the end: what this experience changes."
        },
        {
          "f": "plain form is fine",
          "what": "A journal may be written plain. Pick one and keep it."
        }
      ],
      "avoid": [
        {
          "f": "a list of what happened and nothing else",
          "why": "The 2025 report notes responses that described the workplace without addressing the skills learnt.",
          "year": 2025
        }
      ]
    },
    {
      "id": "report",
      "ja": "レポート",
      "en": "Report",
      "style": "evaluative",
      "who": "a reader who was not there and wants a verdict",
      "features": [
        {
          "f": "この　レポートでは、……について　書[か]きます。",
          "what": "State what is being evaluated."
        },
        {
          "f": "よかった点[てん]は……／よくなかった点[てん]は……",
          "what": "Good points and bad points, both named."
        },
        {
          "f": "たとえば、……",
          "what": "An example under every judgement. A verdict with no example is an opinion."
        },
        {
          "f": "……ですから、……と　思[おも]います。",
          "what": "Judgement plus reason, not judgement alone."
        },
        {
          "f": "けつろんとして、……",
          "what": "A conclusion that actually concludes."
        }
      ],
      "avoid": [
        {
          "f": "describing the thing instead of judging it",
          "why": "The 2025 report notes responses that gave general comments rather than evaluating the experience they were asked about.",
          "year": 2025
        }
      ]
    },
    {
      "id": "email",
      "ja": "メール",
      "en": "Email",
      "style": "persuasive",
      "who": "one named person who can say yes or no to what you want",
      "features": [
        {
          "f": "あてさき：／けんめい：",
          "what": "The header lines. An email looks like an email."
        },
        {
          "f": "〇〇先生[せんせい]、こんにちは。",
          "what": "Greet the person you are writing to."
        },
        {
          "f": "……ので、……して　いただけませんか。",
          "what": "Ask for the thing. A persuasive email that never asks is informative."
        },
        {
          "f": "りゆうは　二[ふた]つ　あります。",
          "what": "Reasons, counted and separated, so they can be weighed."
        },
        {
          "f": "どうぞ　よろしく　おねがいします。",
          "what": "Close it properly, then sign."
        }
      ],
      "avoid": [
        {
          "f": "copying the stimulus text",
          "why": "The 2025 report names copied portions as a feature of low-scoring responses.",
          "year": 2025
        }
      ]
    }
  ],
  "plans": [
    {
      "id": "pl-speech",
      "tt": "speech",
      "prompt": "You have just finished a year as captain of your school's Japanese club. Write the script of a speech to next year's members about what the club does and why they should take part.",
      "prompt_ja": "あなたは　一年間[いちねんかん]、学校[がっこう]の　日本語[にほんご]クラブの　キャプテンでした。来年[らいねん]の　メンバーに　クラブの　活動[かつどう]と　さんかする　りゆうを　話[はな]す　スピーチの　げんこうを　書[か]きなさい。",
      "slots": [
        {
          "q": "Who is in the room?",
          "hint": "Name them in your head before you write a word. It decides how polite you are and what they already know."
        },
        {
          "q": "What is the one thing you want them to do or think afterwards?",
          "hint": "A speech with no point is a list."
        },
        {
          "q": "Three things the club does. Concrete ones.",
          "hint": "Specific beats general every time: not 'fun activities' but what you actually did in March."
        },
        {
          "q": "One reason for each, aimed at a Year 11 who is undecided.",
          "hint": "Why would it matter to THEM, not to you."
        },
        {
          "q": "How you open and how you close.",
          "hint": "Address the room; signpost; close the speech; then thank them."
        }
      ]
    },
    {
      "id": "pl-journal",
      "tt": "journal",
      "prompt": "Yesterday was your last day of a week of work experience. Write a journal entry reflecting on what you learnt and how it will help you.",
      "prompt_ja": "きのうは　一週間[いっしゅうかん]の　しょくばたいけんの　さいごの　日[ひ]でした。学[まな]んだことと、それが　これから　どう　やくに　立[た]つかを　にっきに　書[か]きなさい。",
      "slots": [
        {
          "q": "What actually happened, in three moments.",
          "hint": "Moments, not a timetable. One thing that went wrong is worth three that went to plan."
        },
        {
          "q": "What you learnt from each. Name the skill.",
          "hint": "The 2025 report says responses that described the workplace without naming the skills scored low."
        },
        {
          "q": "How you felt, then and now.",
          "hint": "A journal without a feeling in it is a report."
        },
        {
          "q": "Where this is useful next.",
          "hint": "Study, work, or how you deal with people. Be specific about which."
        },
        {
          "q": "Check: is every verb in the past?",
          "hint": "The 2023 report names tense as what makes or breaks a recount."
        }
      ]
    },
    {
      "id": "pl-report",
      "tt": "report",
      "prompt": "You attended the opening of a new Japanese cultural centre in Melbourne. Write a report evaluating it for a community newsletter.",
      "prompt_ja": "あなたは　メルボルンに　新[あたら]しく　できた　日本[にほん]ぶんかセンターの　オープニングに　行[い]きました。じもとの　ニュースレターの　ために、センターを　ひょうかする　レポートを　書[か]きなさい。",
      "slots": [
        {
          "q": "What exactly are you judging?",
          "hint": "The building, the opening event, the programme on offer? Pick, and say so."
        },
        {
          "q": "Two things that were good, with an example each.",
          "hint": "An example is what turns an opinion into a judgement."
        },
        {
          "q": "One thing that was not, with an example.",
          "hint": "A report that is all praise is an advertisement."
        },
        {
          "q": "Who is it for, and is it worth their time?",
          "hint": "Evaluative means somebody can decide something after reading you."
        },
        {
          "q": "Your conclusion in one sentence.",
          "hint": "If you cannot say it in one, you have not decided."
        }
      ]
    },
    {
      "id": "pl-email",
      "tt": "email",
      "prompt": "Your class is planning a trip to Japan. You have read about a calligraphy workshop in Kyoto. Write an email to your teacher asking for it to be added to the itinerary.",
      "prompt_ja": "クラスで　日本[にほん]に　旅行[りょこう]する　よていです。あなたは　京都[きょうと]の　書道[しょどう]ワークショップについて　読[よ]みました。旅行[りょこう]の　よていに　入[い]れて　ほしいと　先生[せんせい]に　メールで　たのみなさい。",
      "slots": [
        {
          "q": "What are you asking for, in one sentence?",
          "hint": "Write the ask first, even though it goes near the end. Everything else serves it."
        },
        {
          "q": "Two reasons, aimed at a teacher.",
          "hint": "What does the teacher care about? Learning, cost, safety, time. Not 'it looks fun'."
        },
        {
          "q": "One detail from the text and one from the picture.",
          "hint": "The 2025 report says high-scoring responses used both, and low-scoring ones ignored the image."
        },
        {
          "q": "Say it in your own words.",
          "hint": "Copying the stimulus is named in the reports as a feature of low-scoring responses."
        },
        {
          "q": "Header, greeting, ask, close.",
          "hint": "An email that is missing its shape loses text-type marks before the Japanese is even read."
        }
      ]
    }
  ],
  "models": [
    {
      "id": "m-journal",
      "tt": "journal",
      "title": "A journal entry, about 400 ji",
      "prompt": "Yesterday was your last day at your part-time job. Reflect on the skills you learnt and how they will help you.",
      "lines": [
        {
          "ja": "十一月[じゅういちがつ]二十日[はつか]（水[すい]）　天気[てんき]：くもり",
          "note": "A date line. Costs nothing and marks the text type immediately.",
          "tag": "shape"
        },
        {
          "ja": "今日[きょう]は　アルバイトの　さいごの　日[ひ]だった。",
          "note": "Plain past, and it stays plain past to the end. Pick a register and keep it.",
          "tag": "tense"
        },
        {
          "ja": "二年間[にねんかん]、駅[えき]の　近[ちか]くの　パン屋[や]で　働[はたら]いた。",
          "note": "One concrete fact placed early: how long, and where. The reader can now picture it.",
          "tag": "content"
        },
        {
          "ja": "はじめは　おきゃくさんと　話[はな]すのが　こわくて、こえが　小[ちい]さかった。",
          "note": "A real difficulty. A journal that starts with 'it was fun' has nowhere to go.",
          "tag": "content"
        },
        {
          "ja": "でも、毎日[まいにち]　同[おな]じ　おきゃくさんが　来[き]て、少[すこ]しずつ　話[はな]せるように　なった。",
          "note": "〜ように なった is the reflective workhorse: it shows change over time.",
          "tag": "grammar"
        },
        {
          "ja": "三[さん]か月[げつ]ぐらい　たってから、しごとに　なれて、おきゃくさんに　自分[じぶん]から　話しかけられるように　なった。",
          "note": "A time marker. A reflection that never says when things changed reads like a list of shifts.",
          "tag": "content"
        },
        {
          "ja": "一[いち]ど、まちがえて　ちがう　パンを　わたして、おきゃくさんに　あやまった　ことが　ある。",
          "note": "One thing that actually went wrong, told in two clauses. Assessors remember the event that happened, not the five that might have.",
          "tag": "content"
        },
        {
          "ja": "その　時[とき]に、すぐ　新[あたら]しいのを　もって　いく　ほうが　いいと　分[わ]かった。",
          "note": "The lesson drawn from that one event. This is the move the word reflect in the prompt asks for.",
          "tag": "reflect"
        },
        {
          "ja": "新しい　人[ひと]が　入[はい]って　きた　時、しごとを　教[おし]える　ことも　あった。",
          "note": "Evidence for the skill instead of another claim about it. Teaching someone else proves you had it.",
          "tag": "skill"
        },
        {
          "ja": "それで　一番[いちばん]　習[なら]ったのは、人[ひと]の　話[はなし]を　よく　聞[き]くことだと　思[おも]う。",
          "note": "The skill, NAMED. The 2025 report says responses that never named a skill scored low.",
          "tag": "skill"
        },
        {
          "ja": "いそがしい　時[とき]に　何[なに]を　先[さき]に　するか　考[かんが]えることも　できるように　なった。",
          "note": "A second skill, different in kind from the first. Two named skills beat five vague ones.",
          "tag": "skill"
        },
        {
          "ja": "日本語[にほんご]を　使[つか]う　おきゃくさんも　時々[ときどき]　来て、少し　話した。",
          "note": "One line that ties the job to the subject you are sitting. Cheap to write and it lands.",
          "tag": "content"
        },
        {
          "ja": "来年[らいねん]は　大学[だいがく]で　勉強[べんきょう]するので、この　二[ふた]つは　きっと　やくに　立[た]つと　思[おも]う。",
          "note": "Forward look, tied to something real that is actually happening next.",
          "tag": "future"
        },
        {
          "ja": "さいごの　日[ひ]に　てんちょうさんが　「また　いつでも　来[き]て」と　言[い]って　くれた。うれしかった。",
          "note": "A closing image and a feeling. A journal is allowed to end on how it felt.",
          "tag": "shape"
        }
      ]
    },
    {
      "id": "m-email",
      "tt": "email",
      "title": "A persuasive email, about 300 ji",
      "prompt": "Ask your teacher to add a Kyoto calligraphy workshop to the class trip.",
      "lines": [
        {
          "ja": "あてさき：日本語[にほんご]の　先生[せんせい]　／　けんめい：書道[しょどう]ワークショップの　おねがい",
          "note": "Header lines. The text type is visible before a word of content.",
          "tag": "shape"
        },
        {
          "ja": "先生、こんにちは。三年生[さんねんせい]の　〇〇です。",
          "note": "Greet, and say who you are. No real names in an examination response.",
          "tag": "shape"
        },
        {
          "ja": "先週[せんしゅう]、京都[きょうと]の　書道[しょどう]ワークショップの　ブログを　読[よ]みました。",
          "note": "How you know about it. One line, and it sets up everything after.",
          "tag": "content"
        },
        {
          "ja": "旅行[りょこう]の　よていに　入[い]れて　いただけませんか。",
          "note": "The ask, early and plainly. A persuasive email that forgets to ask is an informative one.",
          "tag": "purpose"
        },
        {
          "ja": "りゆうは　二[ふた]つ　あります。",
          "note": "Counted reasons. The reader now knows exactly how long this will take.",
          "tag": "shape"
        },
        {
          "ja": "一[ひと]つ目[め]は、日本語[にほんご]で　せつめいを　聞[き]きながら　書[か]くので、いい　れんしゅうに　なることです。",
          "note": "A reason a teacher cares about: learning. Not 'it looks fun'.",
          "tag": "audience"
        },
        {
          "ja": "二[ふた]つ目[め]は、しゃしんを　見[み]ると、たたみの　上[うえ]で　書[か]いて、おちゃも　飲[の]めるようです。",
          "note": "A detail from the picture. The 2025 report says the high scorers used the image and the low scorers ignored it.",
          "tag": "stimulus"
        },
        {
          "ja": "二十人[にじゅうにん]なら　一人[ひとり]　三千円[さんぜんえん]なので、高[たか]くないと　思[おも]います。",
          "note": "A number, used as an argument rather than just quoted.",
          "tag": "content"
        },
        {
          "ja": "ワークショップは　一時間半[いちじかんはん]だけなので、ほかの　よていは　かえなくても　いいと　思[おも]います。",
          "note": "Answer the objection before the reader raises it. Persuasion is anticipating the no.",
          "tag": "audience"
        },
        {
          "ja": "どうぞ　よろしく　おねがいします。",
          "note": "Close properly, then sign.",
          "tag": "shape"
        },
        {
          "ja": "三年生の　〇〇より",
          "note": "Sign off with 〇〇, never your own name. The paper tells you to, and your own name costs marks.",
          "tag": "shape"
        }
      ]
    }
  ]
};
