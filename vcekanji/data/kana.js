/* data/kana.js — hiragana and katakana, with their rōmaji.
   ---------------------------------------------------------------------------
   NOT TYPED OUT BY HAND. Generated from the rōmaji table that メガセンテンス's
   タイプ rung already uses, so every reading here is one that app has been
   turning into kana all year, and a kana this file names that the table
   cannot produce fails the generator instead of reaching a student.
   Katakana comes from hiragana by the same code point shift that app uses.

   Where the table knows more than one spelling, the textbook one wins:
   shi not si, tsu not tu, chi not ti, fu not hu, ji not zi.

   Six groups: the 46, the dakuten row and the small ya/yu/yo, in each of
   the two scripts. Long vowels, small っ and the ー dash are left out:
   they are rules about how kana go together rather than characters to
   recognise, and this is a recognition quiz.

   One window. line, then pure JSON. No comments inside the object.     */

window.KANA = {
 "schema_version": 1,
 "source": "Generated from the rōmaji table メガセンテンス's タイプ rung already uses (apps/mega/app.js, window.MEGA_TYPE_ENGINE.table), so the readings here are the ones that app has been typing all year. Katakana is derived from hiragana by the same +96 code point shift that app uses. Nothing was typed by hand.",
 "groups": [
  {
   "id": "hira-basic",
   "script": "Hiragana",
   "script_ja": "ひらがな",
   "name": "The 46",
   "cards": [
    {
     "c": "あ",
     "r": "a"
    },
    {
     "c": "い",
     "r": "i"
    },
    {
     "c": "う",
     "r": "u"
    },
    {
     "c": "え",
     "r": "e"
    },
    {
     "c": "お",
     "r": "o"
    },
    {
     "c": "か",
     "r": "ka"
    },
    {
     "c": "き",
     "r": "ki"
    },
    {
     "c": "く",
     "r": "ku"
    },
    {
     "c": "け",
     "r": "ke"
    },
    {
     "c": "こ",
     "r": "ko"
    },
    {
     "c": "さ",
     "r": "sa"
    },
    {
     "c": "し",
     "r": "shi"
    },
    {
     "c": "す",
     "r": "su"
    },
    {
     "c": "せ",
     "r": "se"
    },
    {
     "c": "そ",
     "r": "so"
    },
    {
     "c": "た",
     "r": "ta"
    },
    {
     "c": "ち",
     "r": "chi"
    },
    {
     "c": "つ",
     "r": "tsu"
    },
    {
     "c": "て",
     "r": "te"
    },
    {
     "c": "と",
     "r": "to"
    },
    {
     "c": "な",
     "r": "na"
    },
    {
     "c": "に",
     "r": "ni"
    },
    {
     "c": "ぬ",
     "r": "nu"
    },
    {
     "c": "ね",
     "r": "ne"
    },
    {
     "c": "の",
     "r": "no"
    },
    {
     "c": "は",
     "r": "ha"
    },
    {
     "c": "ひ",
     "r": "hi"
    },
    {
     "c": "ふ",
     "r": "fu"
    },
    {
     "c": "へ",
     "r": "he"
    },
    {
     "c": "ほ",
     "r": "ho"
    },
    {
     "c": "ま",
     "r": "ma"
    },
    {
     "c": "み",
     "r": "mi"
    },
    {
     "c": "む",
     "r": "mu"
    },
    {
     "c": "め",
     "r": "me"
    },
    {
     "c": "も",
     "r": "mo"
    },
    {
     "c": "や",
     "r": "ya"
    },
    {
     "c": "ゆ",
     "r": "yu"
    },
    {
     "c": "よ",
     "r": "yo"
    },
    {
     "c": "ら",
     "r": "ra"
    },
    {
     "c": "り",
     "r": "ri"
    },
    {
     "c": "る",
     "r": "ru"
    },
    {
     "c": "れ",
     "r": "re"
    },
    {
     "c": "ろ",
     "r": "ro"
    },
    {
     "c": "わ",
     "r": "wa"
    },
    {
     "c": "を",
     "r": "wo"
    },
    {
     "c": "ん",
     "r": "n"
    }
   ]
  },
  {
   "id": "hira-daku",
   "script": "Hiragana",
   "script_ja": "ひらがな",
   "name": "Dakuten and handakuten",
   "cards": [
    {
     "c": "が",
     "r": "ga"
    },
    {
     "c": "ぎ",
     "r": "gi"
    },
    {
     "c": "ぐ",
     "r": "gu"
    },
    {
     "c": "げ",
     "r": "ge"
    },
    {
     "c": "ご",
     "r": "go"
    },
    {
     "c": "ざ",
     "r": "za"
    },
    {
     "c": "じ",
     "r": "ji"
    },
    {
     "c": "ず",
     "r": "zu"
    },
    {
     "c": "ぜ",
     "r": "ze"
    },
    {
     "c": "ぞ",
     "r": "zo"
    },
    {
     "c": "だ",
     "r": "da"
    },
    {
     "c": "で",
     "r": "de"
    },
    {
     "c": "ど",
     "r": "do"
    },
    {
     "c": "ば",
     "r": "ba"
    },
    {
     "c": "び",
     "r": "bi"
    },
    {
     "c": "ぶ",
     "r": "bu"
    },
    {
     "c": "べ",
     "r": "be"
    },
    {
     "c": "ぼ",
     "r": "bo"
    },
    {
     "c": "ぱ",
     "r": "pa"
    },
    {
     "c": "ぴ",
     "r": "pi"
    },
    {
     "c": "ぷ",
     "r": "pu"
    },
    {
     "c": "ぺ",
     "r": "pe"
    },
    {
     "c": "ぽ",
     "r": "po"
    }
   ]
  },
  {
   "id": "hira-you",
   "script": "Hiragana",
   "script_ja": "ひらがな",
   "name": "Small ya, yu, yo",
   "cards": [
    {
     "c": "きゃ",
     "r": "kya"
    },
    {
     "c": "きゅ",
     "r": "kyu"
    },
    {
     "c": "きょ",
     "r": "kyo"
    },
    {
     "c": "しゃ",
     "r": "sha"
    },
    {
     "c": "しゅ",
     "r": "shu"
    },
    {
     "c": "しょ",
     "r": "sho"
    },
    {
     "c": "ちゃ",
     "r": "cha"
    },
    {
     "c": "ちゅ",
     "r": "chu"
    },
    {
     "c": "ちょ",
     "r": "cho"
    },
    {
     "c": "にゃ",
     "r": "nya"
    },
    {
     "c": "にゅ",
     "r": "nyu"
    },
    {
     "c": "にょ",
     "r": "nyo"
    },
    {
     "c": "ひゃ",
     "r": "hya"
    },
    {
     "c": "ひゅ",
     "r": "hyu"
    },
    {
     "c": "ひょ",
     "r": "hyo"
    },
    {
     "c": "みゃ",
     "r": "mya"
    },
    {
     "c": "みゅ",
     "r": "myu"
    },
    {
     "c": "みょ",
     "r": "myo"
    },
    {
     "c": "りゃ",
     "r": "rya"
    },
    {
     "c": "りゅ",
     "r": "ryu"
    },
    {
     "c": "りょ",
     "r": "ryo"
    },
    {
     "c": "ぎゃ",
     "r": "gya"
    },
    {
     "c": "ぎゅ",
     "r": "gyu"
    },
    {
     "c": "ぎょ",
     "r": "gyo"
    },
    {
     "c": "じゃ",
     "r": "ja"
    },
    {
     "c": "じゅ",
     "r": "ju"
    },
    {
     "c": "じょ",
     "r": "jo"
    },
    {
     "c": "びゃ",
     "r": "bya"
    },
    {
     "c": "びゅ",
     "r": "byu"
    },
    {
     "c": "びょ",
     "r": "byo"
    },
    {
     "c": "ぴゃ",
     "r": "pya"
    },
    {
     "c": "ぴゅ",
     "r": "pyu"
    },
    {
     "c": "ぴょ",
     "r": "pyo"
    }
   ]
  },
  {
   "id": "kata-basic",
   "script": "Katakana",
   "script_ja": "カタカナ",
   "name": "The 46",
   "cards": [
    {
     "c": "ア",
     "r": "a"
    },
    {
     "c": "イ",
     "r": "i"
    },
    {
     "c": "ウ",
     "r": "u"
    },
    {
     "c": "エ",
     "r": "e"
    },
    {
     "c": "オ",
     "r": "o"
    },
    {
     "c": "カ",
     "r": "ka"
    },
    {
     "c": "キ",
     "r": "ki"
    },
    {
     "c": "ク",
     "r": "ku"
    },
    {
     "c": "ケ",
     "r": "ke"
    },
    {
     "c": "コ",
     "r": "ko"
    },
    {
     "c": "サ",
     "r": "sa"
    },
    {
     "c": "シ",
     "r": "shi"
    },
    {
     "c": "ス",
     "r": "su"
    },
    {
     "c": "セ",
     "r": "se"
    },
    {
     "c": "ソ",
     "r": "so"
    },
    {
     "c": "タ",
     "r": "ta"
    },
    {
     "c": "チ",
     "r": "chi"
    },
    {
     "c": "ツ",
     "r": "tsu"
    },
    {
     "c": "テ",
     "r": "te"
    },
    {
     "c": "ト",
     "r": "to"
    },
    {
     "c": "ナ",
     "r": "na"
    },
    {
     "c": "ニ",
     "r": "ni"
    },
    {
     "c": "ヌ",
     "r": "nu"
    },
    {
     "c": "ネ",
     "r": "ne"
    },
    {
     "c": "ノ",
     "r": "no"
    },
    {
     "c": "ハ",
     "r": "ha"
    },
    {
     "c": "ヒ",
     "r": "hi"
    },
    {
     "c": "フ",
     "r": "fu"
    },
    {
     "c": "ヘ",
     "r": "he"
    },
    {
     "c": "ホ",
     "r": "ho"
    },
    {
     "c": "マ",
     "r": "ma"
    },
    {
     "c": "ミ",
     "r": "mi"
    },
    {
     "c": "ム",
     "r": "mu"
    },
    {
     "c": "メ",
     "r": "me"
    },
    {
     "c": "モ",
     "r": "mo"
    },
    {
     "c": "ヤ",
     "r": "ya"
    },
    {
     "c": "ユ",
     "r": "yu"
    },
    {
     "c": "ヨ",
     "r": "yo"
    },
    {
     "c": "ラ",
     "r": "ra"
    },
    {
     "c": "リ",
     "r": "ri"
    },
    {
     "c": "ル",
     "r": "ru"
    },
    {
     "c": "レ",
     "r": "re"
    },
    {
     "c": "ロ",
     "r": "ro"
    },
    {
     "c": "ワ",
     "r": "wa"
    },
    {
     "c": "ヲ",
     "r": "wo"
    },
    {
     "c": "ン",
     "r": "n"
    }
   ]
  },
  {
   "id": "kata-daku",
   "script": "Katakana",
   "script_ja": "カタカナ",
   "name": "Dakuten and handakuten",
   "cards": [
    {
     "c": "ガ",
     "r": "ga"
    },
    {
     "c": "ギ",
     "r": "gi"
    },
    {
     "c": "グ",
     "r": "gu"
    },
    {
     "c": "ゲ",
     "r": "ge"
    },
    {
     "c": "ゴ",
     "r": "go"
    },
    {
     "c": "ザ",
     "r": "za"
    },
    {
     "c": "ジ",
     "r": "ji"
    },
    {
     "c": "ズ",
     "r": "zu"
    },
    {
     "c": "ゼ",
     "r": "ze"
    },
    {
     "c": "ゾ",
     "r": "zo"
    },
    {
     "c": "ダ",
     "r": "da"
    },
    {
     "c": "デ",
     "r": "de"
    },
    {
     "c": "ド",
     "r": "do"
    },
    {
     "c": "バ",
     "r": "ba"
    },
    {
     "c": "ビ",
     "r": "bi"
    },
    {
     "c": "ブ",
     "r": "bu"
    },
    {
     "c": "ベ",
     "r": "be"
    },
    {
     "c": "ボ",
     "r": "bo"
    },
    {
     "c": "パ",
     "r": "pa"
    },
    {
     "c": "ピ",
     "r": "pi"
    },
    {
     "c": "プ",
     "r": "pu"
    },
    {
     "c": "ペ",
     "r": "pe"
    },
    {
     "c": "ポ",
     "r": "po"
    }
   ]
  },
  {
   "id": "kata-you",
   "script": "Katakana",
   "script_ja": "カタカナ",
   "name": "Small ya, yu, yo",
   "cards": [
    {
     "c": "キャ",
     "r": "kya"
    },
    {
     "c": "キュ",
     "r": "kyu"
    },
    {
     "c": "キョ",
     "r": "kyo"
    },
    {
     "c": "シャ",
     "r": "sha"
    },
    {
     "c": "シュ",
     "r": "shu"
    },
    {
     "c": "ショ",
     "r": "sho"
    },
    {
     "c": "チャ",
     "r": "cha"
    },
    {
     "c": "チュ",
     "r": "chu"
    },
    {
     "c": "チョ",
     "r": "cho"
    },
    {
     "c": "ニャ",
     "r": "nya"
    },
    {
     "c": "ニュ",
     "r": "nyu"
    },
    {
     "c": "ニョ",
     "r": "nyo"
    },
    {
     "c": "ヒャ",
     "r": "hya"
    },
    {
     "c": "ヒュ",
     "r": "hyu"
    },
    {
     "c": "ヒョ",
     "r": "hyo"
    },
    {
     "c": "ミャ",
     "r": "mya"
    },
    {
     "c": "ミュ",
     "r": "myu"
    },
    {
     "c": "ミョ",
     "r": "myo"
    },
    {
     "c": "リャ",
     "r": "rya"
    },
    {
     "c": "リュ",
     "r": "ryu"
    },
    {
     "c": "リョ",
     "r": "ryo"
    },
    {
     "c": "ギャ",
     "r": "gya"
    },
    {
     "c": "ギュ",
     "r": "gyu"
    },
    {
     "c": "ギョ",
     "r": "gyo"
    },
    {
     "c": "ジャ",
     "r": "ja"
    },
    {
     "c": "ジュ",
     "r": "ju"
    },
    {
     "c": "ジョ",
     "r": "jo"
    },
    {
     "c": "ビャ",
     "r": "bya"
    },
    {
     "c": "ビュ",
     "r": "byu"
    },
    {
     "c": "ビョ",
     "r": "byo"
    },
    {
     "c": "ピャ",
     "r": "pya"
    },
    {
     "c": "ピュ",
     "r": "pyu"
    },
    {
     "c": "ピョ",
     "r": "pyo"
    }
   ]
  }
 ]
};
