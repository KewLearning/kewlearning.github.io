/* ============================================================================
   outfits.js — what the voice describes, for the きせかえ step.
   ----------------------------------------------------------------------------
   Nine outfits. Each item names the zone on the body it goes on, the
   garment, the colour if it has one, and the sentence the voice says.

   THE SENTENCE IS STORED AND NOT BUILT ON THE PAGE. It has to be the same
   string in three places: the recorder that makes the clip, the page that
   plays it, and the marker that says why an answer was wrong. One string
   in one file is the only way those three cannot drift apart. The sanity
   check rebuilds each one from words.js and fails if the stored line and
   the rule disagree, so the string cannot quietly go wrong either.

   The rule it is checked against:
     an い colour goes straight in front   あかい シャツを きています。
     a noun colour needs の                みどりの セーターを きています。
     めがね and とけい take no colour      めがねを かけています。
   and the verb comes from the garment, because Japanese picks the verb by
   where on the body the thing goes.

   An outfit says nothing about the zones it leaves out, and a student who
   puts something on one of those has added a thing the voice never said.
   That is marked, and it is the point of the two outfits that leave the
   feet bare.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.HITO_OUTFITS = {
  "schema_version": 1,
  "outfits": [
    {
      "id": "o1",
      "note": "Two things. Listen twice before you move anything.",
      "items": [
        {
          "zone": "body",
          "garment": "シャツ",
          "colour": "あかい",
          "ja": "あかい シャツを きています。"
        },
        {
          "zone": "legs",
          "garment": "ズボン",
          "colour": "くろい",
          "ja": "くろい ズボンを はいています。"
        }
      ]
    },
    {
      "id": "o2",
      "note": "Three things, and the feet are in it this time.",
      "items": [
        {
          "zone": "body",
          "garment": "Tシャツ",
          "colour": "きいろい",
          "ja": "きいろい Tシャツを きています。"
        },
        {
          "zone": "legs",
          "garment": "ズボン",
          "colour": "ちゃいろい",
          "ja": "ちゃいろい ズボンを はいています。"
        },
        {
          "zone": "feet",
          "garment": "くつ",
          "colour": "しろい",
          "ja": "しろい くつを はいています。"
        }
      ]
    },
    {
      "id": "o3",
      "note": "A noun colour. みどり needs の in front of the thing it is colouring.",
      "items": [
        {
          "zone": "body",
          "garment": "セーター",
          "colour": "みどり",
          "ja": "みどりの セーターを きています。"
        },
        {
          "zone": "legs",
          "garment": "スカート",
          "colour": "あおい",
          "ja": "あおい スカートを はいています。"
        },
        {
          "zone": "feet",
          "garment": "くつ",
          "colour": "くろい",
          "ja": "くろい くつを はいています。"
        }
      ]
    },
    {
      "id": "o4",
      "note": "めがね has no colour here, and it goes on the eyes.",
      "items": [
        {
          "zone": "body",
          "garment": "シャツ",
          "colour": "あおい",
          "ja": "あおい シャツを きています。"
        },
        {
          "zone": "legs",
          "garment": "ズボン",
          "colour": "くろい",
          "ja": "くろい ズボンを はいています。"
        },
        {
          "zone": "eyes",
          "garment": "めがね",
          "colour": null,
          "ja": "めがねを かけています。"
        }
      ]
    },
    {
      "id": "o5",
      "note": "Something on the head.",
      "items": [
        {
          "zone": "body",
          "garment": "シャツ",
          "colour": "ピンク",
          "ja": "ピンクの シャツを きています。"
        },
        {
          "zone": "legs",
          "garment": "スカート",
          "colour": "しろい",
          "ja": "しろい スカートを はいています。"
        },
        {
          "zone": "head",
          "garment": "ぼうし",
          "colour": "あかい",
          "ja": "あかい ぼうしを かぶっています。"
        }
      ]
    },
    {
      "id": "o6",
      "note": "とけい goes on the wrist, and it is しています, not きています.",
      "items": [
        {
          "zone": "body",
          "garment": "セーター",
          "colour": "あおい",
          "ja": "あおい セーターを きています。"
        },
        {
          "zone": "legs",
          "garment": "ズボン",
          "colour": "くろい",
          "ja": "くろい ズボンを はいています。"
        },
        {
          "zone": "wrist",
          "garment": "とけい",
          "colour": null,
          "ja": "とけいを しています。"
        }
      ]
    },
    {
      "id": "o7",
      "note": "Two noun colours in one outfit.",
      "items": [
        {
          "zone": "body",
          "garment": "Tシャツ",
          "colour": "むらさき",
          "ja": "むらさきの Tシャツを きています。"
        },
        {
          "zone": "legs",
          "garment": "ズボン",
          "colour": "みどり",
          "ja": "みどりの ズボンを はいています。"
        },
        {
          "zone": "feet",
          "garment": "くつ",
          "colour": "きいろい",
          "ja": "きいろい くつを はいています。"
        }
      ]
    },
    {
      "id": "o8",
      "note": "Four things. Nothing on the feet, so leave the feet empty.",
      "items": [
        {
          "zone": "body",
          "garment": "シャツ",
          "colour": "しろい",
          "ja": "しろい シャツを きています。"
        },
        {
          "zone": "legs",
          "garment": "スカート",
          "colour": "ちゃいろい",
          "ja": "ちゃいろい スカートを はいています。"
        },
        {
          "zone": "head",
          "garment": "ぼうし",
          "colour": "ちゃいろい",
          "ja": "ちゃいろい ぼうしを かぶっています。"
        },
        {
          "zone": "eyes",
          "garment": "めがね",
          "colour": null,
          "ja": "めがねを かけています。"
        }
      ]
    },
    {
      "id": "o9",
      "note": "Four things, and the last one is small.",
      "items": [
        {
          "zone": "body",
          "garment": "セーター",
          "colour": "くろい",
          "ja": "くろい セーターを きています。"
        },
        {
          "zone": "legs",
          "garment": "ズボン",
          "colour": "あかい",
          "ja": "あかい ズボンを はいています。"
        },
        {
          "zone": "feet",
          "garment": "くつ",
          "colour": "あおい",
          "ja": "あおい くつを はいています。"
        },
        {
          "zone": "wrist",
          "garment": "とけい",
          "colour": null,
          "ja": "とけいを しています。"
        }
      ]
    }
  ]
};
