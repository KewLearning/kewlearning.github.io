/* people.js — the six, the rules, and the sentences that get built.

   Each person is a set of facts, not a set of sentences. The drawing is
   generated from the facts and so is every answer key, which is what makes
   step 6 honest: the student types a sentence, and the page can check both
   whether it is Japanese and whether it is true of the figure on screen.
   Nothing is hard-coded twice.

   Facts, and the only sentences that are true of them:
     hair    long   かみが 長[なが]いです      short  かみが 短[みじか]いです
     colour  black  かみが くろいです      brown  かみが ちゃいろいです
     eyes    big    目[め]が 大[おお]きいです  small  目[め]が 小[ちい]さいです
     height  tall   せが 高[たか]いです      not    せが 高[たか]くないです

   Short height is せが 高くないです rather than a new word, so the negative
   earns its place instead of being drilled in the abstract.

   Clothing is a second set of facts on the same figures: a top, a
   bottom, shoes and sometimes a hat or a watch, each with a colour.
   The drawing reads the colours and so does the marker, so a student
   who writes あかい シャツを きています is checked against the shirt that
   is actually on screen.

   めがねを かけています is outside the 〜です grammar and is taught
   here as a fixed chunk. If your Year 8 has not met it, delete the
   glasses line from the rules and set every "glasses" below to false.

   One window. line, then pure JSON. No comments inside the object.      */

window.HITO_PEOPLE = {
  "schema_version": 1,
  "people": [
    {
      "id": "yuki",
      "name": "ゆうき",
      "facts": {
        "hair": "long",
        "colour": "black",
        "eyes": "big",
        "tall": true,
        "glasses": false,
        "clothes": {
          "top": [
            "シャツ",
            "あかい"
          ],
          "bottom": [
            "ズボン",
            "くろい"
          ],
          "shoes": [
            "くつ",
            "しろい"
          ]
        }
      },
      "traits": [
        "genki",
        "akarui"
      ],
      "blurb_en": "long black hair, big eyes, tall"
    },
    {
      "id": "haruka",
      "name": "はるか",
      "facts": {
        "hair": "short",
        "colour": "brown",
        "eyes": "small",
        "tall": false,
        "glasses": true,
        "clothes": {
          "top": [
            "セーター",
            "みどり"
          ],
          "bottom": [
            "スカート",
            "くろい"
          ],
          "shoes": [
            "くつ",
            "ちゃいろい"
          ]
        }
      },
      "traits": [
        "majime",
        "shizuka"
      ],
      "blurb_en": "short brown hair, small eyes, not tall, glasses"
    },
    {
      "id": "kenta",
      "name": "けんた",
      "facts": {
        "hair": "short",
        "colour": "black",
        "eyes": "small",
        "tall": true,
        "glasses": false,
        "clothes": {
          "top": [
            "Tシャツ",
            "あおい"
          ],
          "bottom": [
            "ズボン",
            "ちゃいろい"
          ],
          "shoes": [
            "くつ",
            "くろい"
          ],
          "extra": [
            "とけい",
            null
          ]
        }
      },
      "traits": [
        "omoshiroi",
        "genki"
      ],
      "blurb_en": "short black hair, small eyes, tall"
    },
    {
      "id": "midori",
      "name": "みどり",
      "facts": {
        "hair": "long",
        "colour": "brown",
        "eyes": "big",
        "tall": false,
        "glasses": false,
        "clothes": {
          "top": [
            "シャツ",
            "ピンク"
          ],
          "bottom": [
            "スカート",
            "しろい"
          ],
          "shoes": [
            "くつ",
            "くろい"
          ]
        }
      },
      "traits": [
        "yasashii",
        "shinsetsu"
      ],
      "blurb_en": "long brown hair, big eyes, not tall"
    },
    {
      "id": "sota",
      "name": "そうた",
      "facts": {
        "hair": "long",
        "colour": "black",
        "eyes": "small",
        "tall": false,
        "glasses": true,
        "clothes": {
          "top": [
            "セーター",
            "きいろい"
          ],
          "bottom": [
            "ズボン",
            "あおい"
          ],
          "shoes": [
            "くつ",
            "しろい"
          ]
        }
      },
      "traits": [
        "majime",
        "yasashii"
      ],
      "blurb_en": "long black hair, small eyes, not tall, glasses"
    },
    {
      "id": "aoi",
      "name": "あおい",
      "facts": {
        "hair": "short",
        "colour": "brown",
        "eyes": "big",
        "tall": true,
        "glasses": false,
        "clothes": {
          "top": [
            "Tシャツ",
            "むらさき"
          ],
          "bottom": [
            "ズボン",
            "くろい"
          ],
          "shoes": [
            "くつ",
            "しろい"
          ],
          "hat": [
            "ぼうし",
            "あかい"
          ]
        }
      },
      "traits": [
        "akarui",
        "shinsetsu"
      ],
      "blurb_en": "short brown hair, big eyes, tall"
    }
  ],
  "traits": {
    "genki": {
      "ja": "元気[げんき]",
      "kind": "na",
      "en": "full of energy"
    },
    "akarui": {
      "ja": "あかるい",
      "kind": "i",
      "en": "cheerful"
    },
    "majime": {
      "ja": "まじめ",
      "kind": "na",
      "en": "hard-working"
    },
    "shizuka": {
      "ja": "しずか",
      "kind": "na",
      "en": "quiet"
    },
    "omoshiroi": {
      "ja": "おもしろい",
      "kind": "i",
      "en": "funny"
    },
    "yasashii": {
      "ja": "やさしい",
      "kind": "i",
      "en": "kind"
    },
    "shinsetsu": {
      "ja": "親切[しんせつ]",
      "kind": "na",
      "en": "helpful"
    }
  },
  "rules": [
    {
      "step": "katch",
      "title_en": "Catch the word",
      "rule": "Read the word above the screen, then catch the one falling word that means it. Let the others fall. Catch the ninja for a bonus and keep away from the かさおばけ. Three mistakes and the game ends.",
      "eg": []
    },
    {
      "step": "sort",
      "title": "い か な",
      "title_en": "い or な",
      "rule": "An い adjective ends in い and changes its own ending. A な adjective takes な before a noun and does not change. Watch out: きれい and ゆうめい end in い but are な adjectives, so learn the kind along with the word.",
      "eg": [
        {
          "ja": "やさしい 人[ひと]",
          "en": "a kind person (い adjective, nothing added)"
        },
        {
          "ja": "親切[しんせつ]な 人[ひと]",
          "en": "a helpful person (な adjective, な added)"
        }
      ]
    },
    {
      "step": "part",
      "title": "〜が 〜です",
      "title_en": "Part by part",
      "rule": "Name the part with が, then the adjective. The person stays the topic, so は and が both appear in the sentence.",
      "eg": [
        {
          "ja": "ゆうきさんは かみが 長[なが]いです。",
          "en": "Yuki's hair is long."
        },
        {
          "ja": "はるかさんは せが 高[たか]くないです。",
          "en": "Haruka is not tall."
        },
        {
          "ja": "そうたさんは めがねを かけています。",
          "en": "Sota wears glasses. (a set phrase)"
        }
      ]
    },
    {
      "step": "join",
      "title": "〜くて・〜で",
      "title_en": "Joining two",
      "rule": "Read the English, then pick the adjective that comes first. Change it so it can join the next one: drop い and add くて for an い adjective, add で for a な adjective.",
      "eg": [
        {
          "ja": "やさしくて おもしろいです。",
          "en": "kind and funny (い → くて)"
        },
        {
          "ja": "元気[げんき]で やさしいです。",
          "en": "full of energy and kind (な → で)"
        }
      ]
    },
    {
      "step": "who",
      "title": "だれですか",
      "title_en": "Who is it?",
      "rule": "Read the description and find the person. Each set of clues fits exactly one of the six, and you can see every clue in the picture.",
      "eg": []
    },
    {
      "step": "spin",
      "title_en": "Spin a word",
      "rule": "Flick the drum or press the button, then write the English word it lands on in Japanese. Kana or kanji, either is fine.",
      "eg": []
    },
    {
      "step": "write",
      "title": "かいてみよう",
      "title_en": "Write it",
      "rule": "Write 3 sentences about the person on screen, with no words given. Use が for one part, and join two descriptions with くて or で at least once. The picture cannot show what someone is like, so that is written underneath it in English.",
      "eg": []
    },
    {
      "step": "colour",
      "title": "いろ",
      "title_en": "Colours",
      "rule": "Put an い colour straight in front of the garment. Put の after a noun colour. No rule tells you which is which, so learn the kind with the word.",
      "eg": [
        {
          "ja": "あかい シャツ",
          "en": "a red shirt (い adjective, nothing added)"
        },
        {
          "ja": "みどりの セーター",
          "en": "a green jumper (noun, の added)"
        }
      ]
    },
    {
      "step": "dress",
      "title": "きせかえ",
      "title_en": "Dress them",
      "rule": "Listen, then drag the clothes onto the figure and a colour onto the clothes. Where you drop a thing chooses the verb. Leave a part of the body empty if the voice says nothing about it.",
      "eg": [
        {
          "ja": "あかい シャツを きています。",
          "en": "an い colour, straight in front"
        },
        {
          "ja": "みどりの セーターを きています。",
          "en": "a noun colour, so の"
        },
        {
          "ja": "しろい くつを はいています。",
          "en": "the feet, so はいています"
        },
        {
          "ja": "とけいを しています。",
          "en": "no colour on this one"
        }
      ]
    },
    {
      "step": "wear",
      "title": "きています",
      "title_en": "Wearing",
      "rule": "Japanese picks the verb by where on the body the thing goes, not by what it is. All five use the ています form, for what someone has on right now.",
      "eg": [
        {
          "ja": "あかい シャツを きています。",
          "en": "upper body"
        },
        {
          "ja": "くろい ズボンを はいています。",
          "en": "lower body and feet"
        },
        {
          "ja": "あかい ぼうしを かぶっています。",
          "en": "head"
        },
        {
          "ja": "めがねを かけています。",
          "en": "glasses"
        },
        {
          "ja": "とけいを しています。",
          "en": "a watch, a tie"
        }
      ]
    }
  ],
  "builder": [
    {
      "person": "yuki",
      "ja": "ゆうきさんは 元気[げんき]で あかるいです。",
      "en": "Yuki is energetic and cheerful."
    },
    {
      "person": "midori",
      "ja": "みどりさんは やさしくて 親切[しんせつ]です。",
      "en": "Midori is kind and helpful."
    },
    {
      "person": "kenta",
      "ja": "けんたさんは おもしろくて 元気[げんき]です。",
      "en": "Kenta is funny and full of energy."
    },
    {
      "person": "haruka",
      "ja": "はるかさんは まじめで しずかです。",
      "en": "Haruka is hard-working and quiet."
    },
    {
      "person": "sota",
      "ja": "そうたさんは まじめで やさしいです。",
      "en": "Sota is hard-working and kind."
    },
    {
      "person": "aoi",
      "ja": "あおいさんは あかるくて 親切[しんせつ]です。",
      "en": "Aoi is cheerful and helpful."
    }
  ]
};
