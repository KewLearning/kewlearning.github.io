/* yomu.js — ひと. The reading section.

   Six passages, one about each of the six figures, built from the same
   vocabulary and the same grammar the ten steps teach. Nothing new is
   smuggled in: every word a student can tap resolves to a meaning from
   words.js, people.js or the short extra list below, and the sanity
   check refuses a passage with a word that resolves to nothing. A
   student never meets "not on the word list" here, because the check
   meets it first.

   THE PASSAGES ARE NOT THE ANSWER KEY. The page reads each passage,
   works out which facts it actually states, and builds the true-or-false
   sentences from the figure's facts. So a passage and its questions
   cannot drift apart, and a passage that contradicts its own figure
   fails the check rather than reaching a student.

   WHAT IS DELIBERATELY NOT HERE:

   - No personality word that is not one of the figure's own two. The
     questions treat every other trait as false, so a passage calling
     みどりさん 元気 would make a true sentence unmarkable.
   - No sentence about a fact the drawing cannot show, beyond the two
     traits. The point of reading is to get what is not drawn.
   - No new kanji. The declared set in words.js, with furigana, or kana.

   SPACING IS THE TOKENISER. Andrew spaces Japanese at phrase
   boundaries, and that is exactly what a tappable unit should be: a
   word with its particle, a word with its ending. One space between
   chunks, 。and 、 attached to the chunk they follow. The page splits
   each chunk into its pieces and glosses every one of them, so a tap
   on 「かみが」 answers both かみ and が.

   One window. line, then pure JSON. No comments inside the object.    */

window.HITO_YOMU = {
  "schema_version": 1,
  "pieces": {
    "は": {"en": "as for (marks the topic)", "kind": "particle"},
    "が": {"en": "marks the part being described", "kind": "particle"},
    "を": {"en": "marks the thing being worn", "kind": "particle"},
    "の": {"en": "joins a noun colour to the thing", "kind": "particle"},
    "さん": {"en": "Mr, Ms, used after a name", "kind": "suffix"},
    "です": {"en": "is, are", "kind": "ending"}
  },
  "extra": [
    {"ja": "そして", "kana": "そして", "en": "and also"},
    {"ja": "とても", "kana": "とても", "en": "very"},
    {"ja": "人[ひと]", "kana": "ひと", "en": "person"}
  ],
  "texts": [
    {
      "id": "yuki",
      "who": "yuki",
      "paras": [
        "ゆうきさんは せが 高[たか]いです。 かみが 長[なが]くて、 くろいです。 目[め]が 大[おお]きいです。",
        "あかい シャツを きています。 そして くろい ズボンを はいています。 しろい くつを はいています。",
        "ゆうきさんは とても 元気[げんき]で、 あかるい 人[ひと]です。"
      ]
    },
    {
      "id": "haruka",
      "who": "haruka",
      "paras": [
        "はるかさんは かみが 短[みじか]くて、 ちゃいろいです。 目[め]が 小[ちい]さいです。 せが 高[たか]くないです。",
        "めがねを かけています。 みどりの セーターを きています。 そして くろい スカートを はいています。 ちゃいろい くつを はいています。",
        "はるかさんは まじめで、 しずかな 人[ひと]です。"
      ]
    },
    {
      "id": "kenta",
      "who": "kenta",
      "paras": [
        "けんたさんは せが 高[たか]くて、 かみが 短[みじか]いです。 かみが くろいです。 目[め]が 小[ちい]さいです。",
        "あおい Tシャツを きています。 そして ちゃいろい ズボンを はいています。 くろい くつを はいています。 とけいを しています。",
        "けんたさんは とても おもしろくて、 元気[げんき]な 人[ひと]です。"
      ]
    },
    {
      "id": "midori",
      "who": "midori",
      "paras": [
        "みどりさんは かみが 長[なが]くて、 ちゃいろいです。 目[め]が 大[おお]きいです。 せが 高[たか]くないです。",
        "ピンクの シャツを きています。 そして しろい スカートを はいています。 くろい くつを はいています。",
        "みどりさんは やさしくて、 親切[しんせつ]な 人[ひと]です。"
      ]
    },
    {
      "id": "sota",
      "who": "sota",
      "paras": [
        "そうたさんは かみが 長[なが]くて、 くろいです。 目[め]が 小[ちい]さいです。 そして めがねを かけています。 せが 高[たか]くないです。",
        "きいろい セーターを きています。 あおい ズボンを はいています。 しろい くつを はいています。",
        "そうたさんは まじめで、 やさしい 人[ひと]です。"
      ]
    },
    {
      "id": "aoi",
      "who": "aoi",
      "paras": [
        "あおいさんは せが 高[たか]いです。 かみが 短[みじか]くて、 ちゃいろいです。 目[め]が 大[おお]きいです。",
        "あかい ぼうしを かぶっています。 むらさきの Tシャツを きています。 そして くろい ズボンを はいています。 しろい くつを はいています。",
        "あおいさんは あかるくて、 親切[しんせつ]な 人[ひと]です。"
      ]
    }
  ]
};
