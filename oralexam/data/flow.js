/* flow.js — the shape of the examination, from the flow sheet Andrew's
   students are drilled on.

   This file exists because the timed run used to shuffle everything. Andrew,
   4 October 2026: *"I know I asked for randomisation but some parts of the
   exam have to go in a particular order."* They do, and getting the order
   wrong teaches the wrong thing:

     the topic is named on the way in, before Section 1, which is exactly
     why Section 1 never touches it;
     Section 1 opens on one of six predictable questions and works through
     your own world, then Japanese study, then your contact with Japanese
     culture;
     Section 2 opens on a definition, and only then fans out.

   So randomisation happens inside a phase and never across phases.

   The entry and exit scripts are not assessed and are not optional. They are
   here because they are the first and last thing the assessors hear, and
   because an app that drills eight minutes of discussion and skips
   「しつれいします」 is teaching the wrong examination.

   `section2.moves` is the other half of Andrew's answer to a problem no
   app without AI can solve: it cannot work out what to ask next, so the
   student says. The moves are the directions a real assessor goes, in the
   order they go in, and the student picks one while the clock runs. That is
   also the skill — steering the questioning towards what you researched is
   something the flow sheet teaches explicitly.

   `ui` holds the lines the app itself speaks rather than quotes: at the
   moment just the one the speed button plays. It lives here so that the
   recorder records it. It used to be written into index.html, which meant
   nothing recorded it and it was the one line in the whole app still read
   by the device's own voice.

   One window. line, then pure JSON. No comments inside the object.       */

window.ORAL_FLOW = {
  "schema_version": 1,
  "entry": {
    "name_ja": "にゅうしつ",
    "name_en": "Walking in",
    "about": [
      "No marks for the phrases below. Learn them anyway.",
      "On the day they are the first words the assessors hear from you.",
      "Say each one out loud."
    ],
    "steps": [
      {
        "who": "you",
        "ja": "しつれいします。",
        "en": "Excuse me.",
        "note": "Knock, open the door, say it, and wait until they ask you to sit."
      },
      {
        "who": "assessor",
        "ja": "どうぞ おかけください。",
        "en": "Please sit down."
      },
      {
        "who": "you",
        "ja": "ありがとうございます。",
        "en": "Thank you."
      },
      {
        "who": "assessor",
        "ja": "じゅけんばんごうを 英語[えいご]で 言[い]ってください。",
        "en": "Please give your student number in English."
      },
      {
        "who": "you",
        "ja": "＿＿＿＿＿＿＿＿ Lです。",
        "en": "It is 74635297 L.",
        "note": "Your number is the only English in the whole examination. Say the letter, and finish with です。 Hand over your exam slip as you say it."
      },
      {
        "who": "assessor",
        "ja": "お名前[なまえ]は 何[なん]ですか。",
        "en": "What is your name?"
      },
      {
        "who": "you",
        "ja": "＿＿＿＿＿です。",
        "en": "I am ＿＿＿＿＿."
      },
      {
        "who": "assessor",
        "ja": "ディスカッションの トピックは 何[なん]ですか。",
        "en": "What is your discussion topic?",
        "note": "They ask now so they can keep your topic out of Section 1. Hand over your image here as well. You must bring one."
      },
      {
        "who": "you",
        "ja": "＿＿＿＿＿です。よろしく おねがいします。",
        "en": "It is ＿＿＿＿＿. I look forward to speaking with you."
      }
    ]
  },
  "section1": {
    "about": "Seven minutes about your own world. The assessors already know your topic and will keep off it, so nothing here is about your research.",
    "phases": [
      {
        "id": "opener",
        "n": 1,
        "name_en": "The opening question",
        "about": "Almost always one of six: hobbies, free time, this year's study, family, plans after school, or a part-time job."
      },
      {
        "id": "personal",
        "n": 3,
        "name_en": "Your own world",
        "about": "They follow whatever you give them, so the opening answer largely decides what comes next."
      },
      {
        "id": "nihongo",
        "n": 2,
        "name_en": "Learning Japanese",
        "about": "How long, why you chose it, what is hard, what you liked."
      },
      {
        "id": "culture",
        "n": 2,
        "name_en": "Japanese culture and you",
        "about": "Your contact with it: travel, food, film, a home stay. The format requires at least one of these."
      }
    ],
    "probes": [
      {
        "ja": "＿＿について ちょっと せつめいして ください。",
        "en": "Could you explain a little about that?"
      },
      {
        "ja": "どうしてですか。",
        "en": "Why is that?"
      },
      {
        "ja": "その りゆうは 何[なん]だと 思[おも]いますか。",
        "en": "What do you think the reason is?"
      },
      {
        "ja": "＿＿について どう 思[おも]いますか。",
        "en": "What do you think about that?"
      }
    ]
  },
  "section2": {
    "transition": {
      "ja": "では、時間[じかん]なので、ディスカッションの トピックについて 話[はな]しましょう。",
      "en": "Right, we are out of time, so let us talk about your discussion topic."
    },
    "about": "Eight minutes on your topic. There is no introduction to give: the first answer does that job. Keep it short enough to be an answer and full enough to hand them their next three questions.",
    "opening_note": "Your first answer sets the discussion up. Say what the thing is, then name two or three parts of it you have researched. That is what they will ask about next. The buttons below are the same list as the preparation sheet, so anything on the sheet is a question they can ask you.",
    "moves": [
      {
        "id": "define",
        "label_en": "Define and explain it",
        "label_ja": "せつめい",
        "about": "What it is, in a sentence or two. The opener hands them their next three questions."
      },
      {
        "id": "facts",
        "label_en": "Key information",
        "label_ja": "だれ・なに・いつ・どこ",
        "about": "Who, what, when, where, how. Numbers and dates earn marks."
      },
      {
        "id": "example",
        "label_en": "Examples",
        "label_ja": "たとえば",
        "about": "A claim with no example behind it is the commonest thin answer. Have two ready."
      },
      {
        "id": "culture",
        "label_en": "Cultural significance",
        "label_ja": "どうして たいせつか",
        "about": "Why it matters in Japan, and what it shows about how people think. The hardest to invent on the spot."
      },
      {
        "id": "good",
        "label_en": "Good things",
        "label_ja": "いい点[てん]",
        "about": "What is good about it, and for whom."
      },
      {
        "id": "bad",
        "label_en": "Bad things",
        "label_ja": "わるい点[てん]",
        "about": "Problems. Most students manage this much."
      },
      {
        "id": "fix",
        "label_en": "What to do about it",
        "label_ja": "かいけつほうほう",
        "about": "The move that separates a prepared answer from a good one."
      },
      {
        "id": "change",
        "label_en": "Has it changed, what next",
        "label_ja": "かわった こと・これから",
        "about": "How it used to be, and where it is heading."
      },
      {
        "id": "compare",
        "label_en": "Compared with Australia",
        "label_ja": "オーストラリアと くらべて",
        "about": "The criteria name comparison. Have one ready."
      },
      {
        "id": "opinion",
        "label_en": "Your opinion",
        "label_ja": "あなたの いけん",
        "about": "What you think, and why you think it. Never just the opinion on its own."
      },
      {
        "id": "image",
        "label_en": "Your photograph",
        "label_ja": "しゃしん",
        "about": "Bring it in when it helps a point, not only at the start. Nerves make students forget it entirely."
      }
    ],
    "strategies": [
      {
        "ja": "すみません。それについては しらべませんでしたが、＿＿について 勉強[べんきょう]しました。",
        "en": "Sorry, I did not research that, but I did study ＿＿.",
        "note": "The steering line. Use it to turn the questioning back towards what you prepared, rather than going silent."
      },
      {
        "ja": "すみません、もう 一回[いっかい] 言[い]って ください。",
        "en": "Sorry, could you say that again.",
        "note": "Once only."
      },
      {
        "ja": "すみません、＿＿の いみは 何[なん]ですか。",
        "en": "Sorry, what does ＿＿ mean?",
        "note": "Once only. Asking in Japanese costs you nothing."
      }
    ]
  },
  "exit": {
    "name_ja": "たいしつ",
    "name_en": "Walking out",
    "steps": [
      {
        "who": "assessor",
        "ja": "はい、時間[じかん]なので、これで 終[お]わりに します。ありがとうございました。",
        "en": "Right, we are out of time, so we will finish there. Thank you."
      },
      {
        "who": "you",
        "ja": "はい。ありがとうございました。",
        "en": "Yes. Thank you very much.",
        "note": "Stand, face both assessors, and bow as you say it."
      },
      {
        "who": "you",
        "ja": "しつれいします。",
        "en": "Excuse me.",
        "note": "As you leave. Close the door quietly behind you."
      }
    ]
  },
  "ui": {
    "rate": {
      "ja": "はなすスピード",
      "en": "How is this speed?",
      "note": "Spoken when the speed button is pressed, so the student hears the new speed on a line that says what it is."
    },
    "furiOn": {
      "ja": "ふりがなオン",
      "en": "Furigana on",
      "note": "Spoken when the readings are turned on."
    },
    "furiOff": {
      "ja": "ふりがなオフ",
      "en": "Furigana off",
      "note": "Spoken when the readings are turned off."
    }
  }
};
