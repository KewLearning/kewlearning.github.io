/* ============================================================================
   drills.js — the two strands the examination reports point at hardest.
   ----------------------------------------------------------------------------
   THE JAPANESE HERE IS WRITTEN FOR THIS APP. No sentence is taken from an
   examination paper: the site is public and the papers are VCAA copyright.
   What comes from the reports is which mistakes to drill, and one short
   attributed sentence of evidence on each item, because a student told to
   use kanji shrugs and a student shown that the assessors wrote it down in
   2021, 2024 and 2025 stops arguing.

   grammar   one gap, four choices. Every item names the focus it tests, so
             a student can work on particles alone if that is the weakness.
   errors    one sentence, one planted mistake, of a kind a report names.
             The student finds the span and then sees the fix.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.HIKKI_DRILLS = {
  "schema_version": 1,
  "grammar": [
    {
      "id": "p-futari",
      "focus": "particle",
      "ja": "友[とも]だちと　二人[ふたり]＿　ジェットコースターに　乗[の]りました。",
      "options": [
        "で",
        "と",
        "に",
        "を"
      ],
      "answer": "で",
      "why": "二人[ふたり]で means the two of you did it together. 二人と would mean you plus two others, and 二人に is 'to the two of them'.",
      "report": {
        "year": 2025,
        "note": "the report names 二人と and 二人に as errors that changed the meaning"
      }
    },
    {
      "id": "p-tomodachi",
      "focus": "particle",
      "ja": "こうえんで　友[とも]だち＿　しゃしんを　とりました。",
      "options": [
        "と",
        "の",
        "に",
        "を"
      ],
      "answer": "と",
      "why": "友[とも]だちと is with your friend. 友[とも]だちの しゃしん is a photo OF your friend, which is a different day out.",
      "report": {
        "year": 2025,
        "note": "友だちと was often overlooked or replaced, changing the meaning"
      }
    },
    {
      "id": "p-basho",
      "focus": "particle",
      "ja": "こうえん＿　さくらを　見[み]ました。",
      "options": [
        "で",
        "に",
        "を",
        "へ"
      ],
      "answer": "で",
      "why": "で marks where an action happens. に marks where something IS, or where you go.",
      "report": {
        "year": 2025,
        "note": "students used に instead of で for where an action took place"
      }
    },
    {
      "id": "p-nihongo-de",
      "focus": "particle",
      "ja": "先生[せんせい]は　やさしい　日本語[にほんご]＿　せつめいして　くれました。",
      "options": [
        "で",
        "を",
        "に",
        "は"
      ],
      "answer": "で",
      "why": "日本語[にほんご]で is IN Japanese, the tool you use. 日本語[にほんご]を 教[おし]えます is teaching the language itself.",
      "report": {
        "year": 2024,
        "note": "日本語を教えます was used where 日本語で was meant"
      }
    },
    {
      "id": "p-noru",
      "focus": "particle",
      "ja": "毎朝[まいあさ]　八時[はちじ]の　電車[でんしゃ]＿　乗[の]ります。",
      "options": [
        "に",
        "を",
        "で",
        "が"
      ],
      "answer": "に",
      "why": "乗[の]る takes に. 電車[でんしゃ]で 行[い]きます uses で, because there で is the means of travel."
    },
    {
      "id": "p-oriru",
      "focus": "particle",
      "ja": "つぎの　駅[えき]＿　おります。",
      "options": [
        "で",
        "に",
        "を",
        "から"
      ],
      "answer": "で",
      "why": "おりる takes で for the place you get off at. The pair 乗[の]る に / おりる で is worth learning together."
    },
    {
      "id": "p-made",
      "focus": "particle",
      "ja": "駅[えき]から　学校[がっこう]＿　歩[ある]いて　二十分[にじゅっぷん]　かかります。",
      "options": [
        "まで",
        "に",
        "へ",
        "で"
      ],
      "answer": "まで",
      "why": "から〜まで is from here to there. Dropping either end is one of the commonest ways to lose a mark.",
      "report": {
        "year": 2024,
        "note": "から〜まで was overlooked, which cost detail marks"
      }
    },
    {
      "id": "p-ni-jikan",
      "focus": "particle",
      "ja": "毎晩[まいばん]　十一時[じゅういちじ]＿　ねます。",
      "options": [
        "に",
        "で",
        "を",
        "が"
      ],
      "answer": "に",
      "why": "A clock time takes に. きのう, 今日[きょう] and 毎日[まいにち] do not."
    },
    {
      "id": "p-nashi",
      "focus": "particle",
      "ja": "きのうは　二時間[にじかん]＿　勉強[べんきょう]しました。",
      "options": [
        "（なし）",
        "に",
        "を",
        "で"
      ],
      "answer": "（なし）",
      "why": "A length of time takes no particle at all. 二時間[にじかん]に is a mistake that sounds like a clock time."
    },
    {
      "id": "p-morau",
      "focus": "particle",
      "ja": "母[はは]＿　新[あたら]しい　かばんを　もらいました。",
      "options": [
        "に",
        "が",
        "を",
        "で"
      ],
      "answer": "に",
      "why": "もらう takes に (or から) for the giver. The thing itself takes を."
    },
    {
      "id": "p-ageru",
      "focus": "particle",
      "ja": "父[ちち]＿　たんじょう日[び]の　プレゼントを　あげました。",
      "options": [
        "に",
        "と",
        "が",
        "で"
      ],
      "answer": "に",
      "why": "あげる takes に for the person who receives it."
    },
    {
      "id": "p-ittakoto",
      "focus": "particle",
      "ja": "私[わたし]は　まだ　日本[にほん]＿　行[い]ったことが　ありません。",
      "options": [
        "に",
        "で",
        "を",
        "から"
      ],
      "answer": "に",
      "why": "行[い]く takes に or へ for the destination, even inside 〜たことが あります."
    },
    {
      "id": "p-ame",
      "focus": "particle",
      "ja": "あさから　雨[あめ]＿　ふっています。",
      "options": [
        "が",
        "を",
        "に",
        "で"
      ],
      "answer": "が",
      "why": "Weather that is happening takes が. It is the subject, not an object."
    },
    {
      "id": "p-jouzu",
      "focus": "particle",
      "ja": "姉[あね]は　日本語[にほんご]＿　上手[じょうず]です。",
      "options": [
        "が",
        "を",
        "に",
        "で"
      ],
      "answer": "が",
      "why": "上手[じょうず]、下手[へた]、好[す]き and きらい all take が for the thing they are about."
    },
    {
      "id": "p-yori",
      "focus": "particle",
      "ja": "兄[あに]は　私[わたし]＿　せが　高[たか]いです。",
      "options": [
        "より",
        "から",
        "ほど",
        "では"
      ],
      "answer": "より",
      "why": "AはBより〜です is the plain comparison. より goes on the one being beaten."
    },
    {
      "id": "p-shika",
      "focus": "particle",
      "ja": "さいふには　五百円[ごひゃくえん]＿　ありませんでした。",
      "options": [
        "しか",
        "だけ",
        "ばかり",
        "ぐらい"
      ],
      "answer": "しか",
      "why": "しか needs a negative verb after it and means 'only, and that is not much'. だけ would need ありました."
    },
    {
      "id": "p-de-group",
      "focus": "particle",
      "ja": "家族[かぞく]＿　海[うみ]に　行[い]きました。",
      "options": [
        "で",
        "と",
        "に",
        "を"
      ],
      "answer": "で",
      "why": "家族[かぞく]で is 'as a family, all of us'. 家族[かぞく]と would be 'with my family', as though you were not part of it."
    },
    {
      "id": "p-wo-deru",
      "focus": "particle",
      "ja": "毎朝[まいあさ]　八時[はちじ]に　家[いえ]＿　出[で]ます。",
      "options": [
        "を",
        "に",
        "で",
        "から"
      ],
      "answer": "を",
      "why": "出[で]る takes を for the place you leave. The same を appears in 大学[だいがく]を 出[で]る."
    },
    {
      "id": "t-kyonen",
      "focus": "tense",
      "ja": "去年[きょねん]の　なつ、家族[かぞく]と　北海道[ほっかいどう]に　＿＿。",
      "options": [
        "行[い]きました",
        "行[い]きます",
        "行[い]っています",
        "行[い]きたいです"
      ],
      "answer": "行[い]きました",
      "why": "去年[きょねん] puts the whole sentence in the past. The question's tense decides yours.",
      "report": {
        "year": 2021,
        "note": "students were advised to pay closer attention to the tense of the question"
      }
    },
    {
      "id": "t-tanoshikatta",
      "focus": "tense",
      "ja": "きのうの　パーティーは　とても　＿＿。",
      "options": [
        "楽[たの]しかったです",
        "楽[たの]しいでした",
        "楽[たの]しいです",
        "楽[たの]しくでした"
      ],
      "answer": "楽[たの]しかったです",
      "why": "An い adjective makes its own past: 楽[たの]しい → 楽[たの]しかったです. 楽[たの]しいでした does not exist."
    },
    {
      "id": "t-nikki",
      "focus": "tense",
      "ja": "にっきに、きのうの　アルバイトの　ことを　書[か]きます。「きのうは　たくさん　おきゃくさんが　＿＿。」",
      "options": [
        "来[き]ました",
        "来[き]ます",
        "来[く]るでしょう",
        "来[き]ています"
      ],
      "answer": "来[き]ました",
      "why": "A journal entry about yesterday is written in the past throughout. Slipping into the present is a common way to lose marks on a recount.",
      "report": {
        "year": 2023,
        "note": "the report notes a recount should be written primarily in the past tense"
      }
    },
    {
      "id": "t-sunde",
      "focus": "tense",
      "ja": "子[こ]どもの　時[とき]、京都[きょうと]に　＿＿。",
      "options": [
        "住[す]んでいました",
        "住[す]んでいます",
        "住[す]みました",
        "住[す]みます"
      ],
      "answer": "住[す]んでいました",
      "why": "住[す]む is used in the 〜ている form for where you live. For a past address that is 住[す]んでいました."
    },
    {
      "id": "t-mada",
      "focus": "tense",
      "ja": "レポートは　まだ　＿＿。",
      "options": [
        "書[か]いていません",
        "書[か]きませんでした",
        "書[か]きません",
        "書[か]いていました"
      ],
      "answer": "書[か]いていません",
      "why": "まだ with 〜ていません means not yet, and it is still coming. 書[か]きませんでした means you did not, and that is that."
    },
    {
      "id": "t-tara",
      "focus": "tense",
      "ja": "大学[だいがく]を　＿＿、日本[にほん]で　働[はたら]きたいです。",
      "options": [
        "出[で]たら",
        "出[で]ると",
        "出[で]れば",
        "出[で]て"
      ],
      "answer": "出[で]たら",
      "why": "〜たら is the one for a future plan that depends on something happening first. 〜と is for things that always follow."
    },
    {
      "id": "t-nagara",
      "focus": "tense",
      "ja": "おんがくを　聞[き]き＿＿、しゅくだいを　します。",
      "options": [
        "ながら",
        "ので",
        "から",
        "たり"
      ],
      "answer": "ながら",
      "why": "〜ながら joins two things one person does at once. The ます stem comes before it."
    },
    {
      "id": "t-koto-aru",
      "focus": "tense",
      "ja": "日本[にほん]の　お寺[てら]に　＿＿ことが　あります。",
      "options": [
        "行[い]った",
        "行[い]く",
        "行[い]って",
        "行[い]きます"
      ],
      "answer": "行[い]った",
      "why": "〜たことが あります needs the plain past before こと. It is experience, not habit."
    },
    {
      "id": "a-kantan",
      "focus": "adjective",
      "ja": "先生[せんせい]は　＿＿　日本語[にほんご]で　話[はな]して　くれました。",
      "options": [
        "かんたんな",
        "かんたんに",
        "かんたんの",
        "かんたんで"
      ],
      "answer": "かんたんな",
      "why": "Before a noun, a な adjective takes な. かんたんに describes HOW something is done, not WHICH Japanese.",
      "report": {
        "year": 2024,
        "note": "かんたんに was used where かんたんな was needed"
      }
    },
    {
      "id": "a-yasukatta",
      "focus": "adjective",
      "ja": "そのチケットは　＿＿ので、みんなで　買[か]いました。",
      "options": [
        "安[やす]かった",
        "安[やす]いだった",
        "安[やす]いでした",
        "安[やす]くだった"
      ],
      "answer": "安[やす]かった",
      "why": "安[やす]い → 安[やす]かった. An い adjective never takes でした.",
      "report": {
        "year": 2025,
        "note": "安かった was among the words written in kana instead of kanji as well"
      }
    },
    {
      "id": "a-shizuka-de",
      "focus": "adjective",
      "ja": "あの町[まち]は　＿＿、くうきも　きれいです。",
      "options": [
        "しずかで",
        "しずかくて",
        "しずかに",
        "しずかの"
      ],
      "answer": "しずかで",
      "why": "A な adjective joins on with で. An い adjective joins on with くて."
    },
    {
      "id": "a-atarashikute",
      "focus": "adjective",
      "ja": "この　ホテルは　＿＿、きれいです。",
      "options": [
        "新[あたら]しくて",
        "新[あたら]しいで",
        "新[あたら]しくで",
        "新[あたら]しに"
      ],
      "answer": "新[あたら]しくて",
      "why": "新[あたら]しい → 新[あたら]しくて. The い becomes くて, never いで."
    },
    {
      "id": "a-takakunai",
      "focus": "adjective",
      "ja": "ねだんは　あまり　＿＿です。",
      "options": [
        "高[たか]くない",
        "高[たか]いじゃない",
        "高[たか]くじゃない",
        "高[たか]いくない"
      ],
      "answer": "高[たか]くない",
      "why": "い adjectives go negative with くない. じゃない belongs to nouns and な adjectives."
    },
    {
      "id": "a-suki-na",
      "focus": "adjective",
      "ja": "これは　私[わたし]の　一番[いちばん]　＿＿　ばんぐみです。",
      "options": [
        "好[す]きな",
        "好[す]きの",
        "好[す]き",
        "好[す]きに"
      ],
      "answer": "好[す]きな",
      "why": "好[す]き is a な adjective, so it takes な before a noun."
    },
    {
      "id": "a-benri",
      "focus": "adjective",
      "ja": "この　アプリは　とても　＿＿。",
      "options": [
        "べんりです",
        "べんりいです",
        "べんりな",
        "べんりくて"
      ],
      "answer": "べんりです",
      "why": "A な adjective at the end of a sentence just takes です. The な only appears before a noun."
    },
    {
      "id": "a-ooki",
      "focus": "adjective",
      "ja": "駅[えき]の　前[まえ]に　＿＿　店[みせ]が　あります。",
      "options": [
        "大[おお]きい",
        "大[おお]きな",
        "大[おお]きく",
        "大[おお]きいな"
      ],
      "answer": "大[おお]きい",
      "why": "大[おお]きい is an い adjective and goes straight onto the noun. 大[おお]きな exists but is the set form, and 大[おお]きいな is never right."
    },
    {
      "id": "v-te-kiku",
      "focus": "verb",
      "ja": "せつめいを　＿＿から、じてんしゃに　乗[の]ります。",
      "options": [
        "聞[き]いて",
        "聞[き]きて",
        "聞[き]んで",
        "聞[き]って"
      ],
      "answer": "聞[き]いて",
      "why": "聞[き]く → 聞[き]いて. A く verb takes いて, and 行[い]く is the one exception, 行[い]って."
    },
    {
      "id": "v-te-yomu",
      "focus": "verb",
      "ja": "本[ほん]を　＿＿から、ねます。",
      "options": [
        "読[よ]んで",
        "読[よ]みて",
        "読[よ]いて",
        "読[よ]って"
      ],
      "answer": "読[よ]んで",
      "why": "読[よ]む → 読[よ]んで. む, ぶ and ぬ verbs all take んで."
    },
    {
      "id": "v-nakereba",
      "focus": "verb",
      "ja": "安[あん]ぜんベルトを　＿＿なりません。",
      "options": [
        "しなければ",
        "しなくて",
        "しないと",
        "しなければに"
      ],
      "answer": "しなければ",
      "why": "〜なければ なりません is the whole shape. Students lose it halfway through more often than they get it wrong at the start.",
      "report": {
        "year": 2025,
        "note": "a number of students had difficulty with しなければならない"
      }
    },
    {
      "id": "v-yasui",
      "focus": "verb",
      "ja": "歩[ある]き＿＿　くつを　はいて　来[き]て　ください。",
      "options": [
        "やすい",
        "にくい",
        "そうな",
        "たい"
      ],
      "answer": "やすい",
      "why": "ます stem + やすい is easy to do; + にくい is hard to do. 歩[ある]きやすい くつ is shoes that are easy to walk in.",
      "report": {
        "year": 2025,
        "note": "歩きやすいくつ was often answered as 'comfortable shoes', losing the meaning"
      }
    },
    {
      "id": "v-nikui",
      "focus": "verb",
      "ja": "この　漢字[かんじ]は　小[ちい]さくて、読[よ]み＿＿です。",
      "options": [
        "にくい",
        "やすい",
        "たい",
        "そう"
      ],
      "answer": "にくい",
      "why": "読[よ]みにくい is hard to read. The pair やすい／にくい comes up in reading texts constantly.",
      "report": {
        "year": 2025,
        "note": "行きにくい was overlooked, which changed the answer"
      }
    },
    {
      "id": "v-morau",
      "focus": "verb",
      "ja": "もっと　多[おお]くの　人[ひと]に　この店[みせ]を　知[し]って＿＿たいです。",
      "options": [
        "もらい",
        "あげ",
        "くれ",
        "み"
      ],
      "answer": "もらい",
      "why": "知[し]ってもらう is getting other people to know. してもらう is getting them to DO something, which is a different sentence.",
      "report": {
        "year": 2022,
        "note": "知ってもらう was misheard as してもらう"
      }
    },
    {
      "id": "v-kureru",
      "focus": "verb",
      "ja": "兄[あに]が　しゅくだいを　手[て]つだって　＿＿。",
      "options": [
        "くれました",
        "もらいました",
        "あげました",
        "いただきました"
      ],
      "answer": "くれました",
      "why": "くれる is someone doing something for me. もらう needs に on the person: 兄[あに]に 手[て]つだって もらいました."
    },
    {
      "id": "v-potential",
      "focus": "verb",
      "ja": "二人[ふたり]で　いっしょに　＿＿ことが　できます。",
      "options": [
        "乗[の]る",
        "乗[の]った",
        "乗[の]って",
        "乗[の]ります"
      ],
      "answer": "乗[の]る",
      "why": "〜ことが できます takes the plain present before こと."
    },
    {
      "id": "v-motte",
      "focus": "verb",
      "ja": "ぼうしと　水[みず]を　＿＿ください。",
      "options": [
        "持[も]って　来[き]て",
        "持[も]って　行[い]って",
        "着[き]て",
        "買[か]って"
      ],
      "answer": "持[も]って　来[き]て",
      "why": "持[も]って来[く]る is to bring. In a listening text it is easy to hear as 'wear' or 'buy' if you are not ready for it.",
      "report": {
        "year": 2025,
        "note": "持って来る often became 'wear' or 'buy' in responses"
      }
    },
    {
      "id": "v-nugu",
      "focus": "verb",
      "ja": "家[いえ]に　入[はい]る　時[とき]は、くつを　＿＿。",
      "options": [
        "ぬぎます",
        "はきます",
        "着[き]ます",
        "とります"
      ],
      "answer": "ぬぎます",
      "why": "ぬぐ is to take off what you wear on your feet or body; はく is to put on shoes or trousers.",
      "report": {
        "year": 2023,
        "note": "students struggled with the spelling and conjugation of ぬぐ and はく"
      }
    },
    {
      "id": "x-shi",
      "focus": "pattern",
      "ja": "安[やす]かった＿、乗[の]り物[もの]も　多[おお]かったから、楽[たの]しかったです。",
      "options": [
        "し",
        "て",
        "が",
        "の"
      ],
      "answer": "し",
      "why": "〜し、〜し piles up reasons. It is the natural way to give two or three at once in an answer.",
      "report": {
        "year": 2025,
        "note": "the sample answer uses 安かったし、乗り物がたくさんあったし"
      }
    },
    {
      "id": "x-node",
      "focus": "pattern",
      "ja": "雨[あめ]が　ふっていた＿、しあいは　ちゅうしに　なりました。",
      "options": [
        "ので",
        "のに",
        "でも",
        "まで"
      ],
      "answer": "ので",
      "why": "ので gives the reason and is a little softer than から. のに would mean 'even though', which is the opposite."
    },
    {
      "id": "x-tameni",
      "focus": "pattern",
      "ja": "けんこうの　＿＿、毎朝[まいあさ]　歩[ある]いています。",
      "options": [
        "ために",
        "ように",
        "ことに",
        "だけに"
      ],
      "answer": "ために",
      "why": "Noun + の ために is 'for the sake of'. With a verb it is the plain form + ために."
    },
    {
      "id": "x-sou-hearsay",
      "focus": "pattern",
      "ja": "ブログに　よると、おみやげも　買[か]える＿＿です。",
      "options": [
        "そう",
        "よう",
        "らし",
        "みたい"
      ],
      "answer": "そう",
      "why": "Plain form + そうです is 'I hear that'. The other そう, ます stem + そう, is 'it looks like'."
    },
    {
      "id": "x-youni",
      "focus": "pattern",
      "ja": "毎日[まいにち]　漢字[かんじ]を　十[じゅっ]こ　書[か]く＿＿　しています。",
      "options": [
        "ように",
        "ために",
        "ことが",
        "ところ"
      ],
      "answer": "ように",
      "why": "〜ようにしています is 'I make a point of doing it'. It is the honest way to describe a habit you are working on."
    },
    {
      "id": "x-kotoni",
      "focus": "pattern",
      "ja": "来年[らいねん]　日本[にほん]に　りゅう学[がく]する＿＿　しました。",
      "options": [
        "ことに",
        "ように",
        "ために",
        "そうに"
      ],
      "answer": "ことに",
      "why": "〜ことに しました is a decision you made. 〜ことに なりました is a decision that was made for you."
    },
    {
      "id": "x-ba",
      "focus": "pattern",
      "ja": "もっと　れんしゅうすれ＿、上手[じょうず]に　なります。",
      "options": [
        "ば",
        "たら",
        "と",
        "ので"
      ],
      "answer": "ば",
      "why": "The ば form is the conditional for a general rule. すれば comes from する."
    },
    {
      "id": "x-temo",
      "focus": "pattern",
      "ja": "高[たか]く＿＿、買[か]いたいです。",
      "options": [
        "ても",
        "ては",
        "なくて",
        "ないで"
      ],
      "answer": "ても",
      "why": "〜ても is 'even if'. For an い adjective it is 高[たか]くても."
    },
    {
      "id": "c-futari",
      "focus": "counter",
      "ja": "しょうぎは　＿＿で　します。",
      "options": [
        "二人[ふたり]",
        "二人[ににん]",
        "二[ふた]つ",
        "二回[にかい]"
      ],
      "answer": "二人[ふたり]",
      "why": "二人[ふたり] and 一人[ひとり] are irregular and are expected in kanji.",
      "report": {
        "year": 2024,
        "note": "the basic kanji for 二人 was often not used"
      }
    },
    {
      "id": "c-sankai",
      "focus": "counter",
      "ja": "週[しゅう]に　＿＿　れんしゅうします。",
      "options": [
        "三回[さんかい]",
        "三[みっ]つ",
        "三人[さんにん]",
        "三時[さんじ]"
      ],
      "answer": "三回[さんかい]",
      "why": "回[かい] counts times, not things. 三[みっ]つ would be three objects.",
      "report": {
        "year": 2020,
        "note": "三回 was misread, leading to 'three ekiben'"
      }
    },
    {
      "id": "c-gozen",
      "focus": "counter",
      "ja": "土曜日[どようび]の　＿＿　九時[くじ]から　昼[ひる]までです。",
      "options": [
        "午前[ごぜん]",
        "午後[ごご]",
        "五時[ごじ]",
        "今[いま]"
      ],
      "answer": "午前[ごぜん]",
      "why": "午前[ごぜん] is am and 午後[ごご] is pm. In a listening text 午前[ごぜん] and 五時[ごじ] are easy to confuse.",
      "report": {
        "year": 2024,
        "note": "some confused 午前 with 五時, and the kanji was often omitted"
      }
    },
    {
      "id": "c-sai",
      "focus": "counter",
      "ja": "十五[じゅうご]＿＿から　十七[じゅうなな]＿＿までの　学生[がくせい]が　さんかできます。",
      "options": [
        "才[さい]",
        "回[かい]",
        "人[にん]",
        "番[ばん]"
      ],
      "answer": "才[さい]",
      "why": "才[さい] counts years of age. The pair 〜から〜まで sets the range.",
      "report": {
        "year": 2024,
        "note": "15才から17才まで was used incorrectly in some responses"
      }
    },
    {
      "id": "c-hyaku",
      "focus": "counter",
      "ja": "一人[ひとり]　三千五百円[さんぜんごひゃくえん]しか　かからないので、＿＿と　思[おも]います。",
      "options": [
        "高[たか]くない",
        "高[たか]い",
        "安[やす]いでした",
        "高[たか]くないでした"
      ],
      "answer": "高[たか]くない",
      "why": "Prices in a persuasive text are an argument. Say what the number means, do not just state it."
    },
    {
      "id": "c-kara-made",
      "focus": "counter",
      "ja": "行事[ぎょうじ]は　十一月[じゅういちがつ]の　終[お]わり＿＿　一月[いちがつ]の　始[はじ]めまでです。",
      "options": [
        "から",
        "まで",
        "に",
        "で"
      ],
      "answer": "から",
      "why": "から〜まで, with 終[お]わり and 始[はじ]め inside it. Every one of those four words carries a mark.",
      "report": {
        "year": 2024,
        "note": "終わり, 始め and から〜まで were all overlooked"
      }
    }
  ],
  "errors": [
    {
      "id": "e-futari-to",
      "focus": "particle",
      "wrong": "友[とも]だちと　二人[ふたり]と　ジェットコースターに　乗[の]りました。",
      "right": "友[とも]だちと　二人[ふたり]で　ジェットコースターに　乗[の]りました。",
      "span": "二人[ふたり]と",
      "why": "二人[ふたり]で is the two of you together. 二人[ふたり]と makes it you plus two other people.",
      "report": {
        "year": 2025,
        "note": "particle errors such as 二人と or 二人に either changed the intended meaning or made the phrase ungrammatical"
      }
    },
    {
      "id": "e-tomodachi-no",
      "focus": "particle",
      "wrong": "こうえんで　友[とも]だちの　しゃしんを　とりました。",
      "right": "こうえんで　友[とも]だちと　しゃしんを　とりました。",
      "span": "友[とも]だちの",
      "why": "With の this is a photo of your friend. The sentence you wanted is a photo taken with them.",
      "report": {
        "year": 2025,
        "note": "友だちと was often overlooked or an incorrect particle was used, which changed the intended meaning"
      }
    },
    {
      "id": "e-ni-de",
      "focus": "particle",
      "wrong": "こうえんに　花見[はなみ]を　しました。",
      "right": "こうえんで　花見[はなみ]を　しました。",
      "span": "こうえんに",
      "why": "で marks where an action happens. に marks where a thing is, or where you are going.",
      "report": {
        "year": 2025,
        "note": "some used the incorrect particle に instead of で"
      }
    },
    {
      "id": "e-nihongo-wo",
      "focus": "particle",
      "wrong": "先生[せんせい]は　やさしい　日本語[にほんご]を　せつめいして　くれました。",
      "right": "先生[せんせい]は　やさしい　日本語[にほんご]で　せつめいして　くれました。",
      "span": "日本語[にほんご]を",
      "why": "を makes Japanese the thing being explained. で makes it the language the explaining was done in.",
      "report": {
        "year": 2024,
        "note": "日本語を教えます was used instead of 日本語で"
      }
    },
    {
      "id": "e-kantan-ni",
      "focus": "adjective",
      "wrong": "かんたんに　日本語[にほんご]で　書[か]いて　ください。",
      "right": "かんたんな　日本語[にほんご]で　書[か]いて　ください。",
      "span": "かんたんに",
      "why": "Before a noun a な adjective takes な. かんたんに would describe how you write, not which Japanese.",
      "report": {
        "year": 2024,
        "note": "かんたんに was used instead of かんたんな"
      }
    },
    {
      "id": "e-yasui-deshita",
      "focus": "adjective",
      "wrong": "そのチケットは　安[やす]いでした。",
      "right": "そのチケットは　安[やす]かったです。",
      "span": "安[やす]いでした",
      "why": "An い adjective makes its own past. 安[やす]い becomes 安[やす]かった, and でした never follows it.",
      "report": {
        "year": 2025,
        "note": "安かった was among the forms students handled poorly"
      }
    },
    {
      "id": "e-tanoshii-deshita",
      "focus": "adjective",
      "wrong": "きのうの　パーティーは　とても　楽[たの]しいでした。",
      "right": "きのうの　パーティーは　とても　楽[たの]しかったです。",
      "span": "楽[たの]しいでした",
      "why": "Same rule, the one that comes up most: 楽[たの]しい → 楽[たの]しかったです.",
      "report": {
        "year": 2023,
        "note": "rudimentary mistakes in adjective inflection were evident across all sections"
      }
    },
    {
      "id": "e-takai-janai",
      "focus": "adjective",
      "wrong": "ねだんは　あまり　高[たか]いじゃないです。",
      "right": "ねだんは　あまり　高[たか]くないです。",
      "span": "高[たか]いじゃないです",
      "why": "い adjectives go negative with くない. じゃない belongs to nouns and な adjectives.",
      "report": {
        "year": 2023,
        "note": "rudimentary mistakes in adjective inflection were evident across all sections"
      }
    },
    {
      "id": "e-ikite",
      "focus": "verb",
      "wrong": "としょかんに　行[い]きて、本[ほん]を　かりました。",
      "right": "としょかんに　行[い]って、本[ほん]を　かりました。",
      "span": "行[い]きて",
      "why": "行[い]く is the exception among く verbs: 行[い]って, not 行[い]いて and never 行[い]きて.",
      "report": {
        "year": 2024,
        "note": "rudimentary grammatical errors in verb conjugation were noticeable"
      }
    },
    {
      "id": "e-yomite",
      "focus": "verb",
      "wrong": "本[ほん]を　読[よ]みて　から、ねました。",
      "right": "本[ほん]を　読[よ]んで　から、ねました。",
      "span": "読[よ]みて",
      "why": "む verbs take んで. 読[よ]む → 読[よ]んで, 飲[の]む → 飲[の]んで.",
      "report": {
        "year": 2024,
        "note": "rudimentary grammatical errors in verb conjugation were noticeable"
      }
    },
    {
      "id": "e-shite-morau",
      "focus": "verb",
      "wrong": "もっと　多[おお]くの　人[ひと]に　この店[みせ]を　して　もらいたいです。",
      "right": "もっと　多[おお]くの　人[ひと]に　この店[みせ]を　知[し]って　もらいたいです。",
      "span": "して　もらいたいです",
      "why": "知[し]ってもらう is getting people to know about it. してもらう is getting them to do it, which is not what a shop wants.",
      "report": {
        "year": 2022,
        "note": "知ってもらう was sometimes misheard as してもらう"
      }
    },
    {
      "id": "e-sumimasu",
      "focus": "verb",
      "wrong": "子[こ]どもの　時[とき]、京都[きょうと]に　住[す]みました。",
      "right": "子[こ]どもの　時[とき]、京都[きょうと]に　住[す]んでいました。",
      "span": "住[す]みました",
      "why": "住[す]む describes a state, so it wants 〜ている. For a past address, 住[す]んでいました.",
      "report": {
        "year": 2023,
        "note": "rudimentary mistakes in common sentence structures were evident"
      }
    },
    {
      "id": "e-nakereba",
      "focus": "verb",
      "wrong": "安[あん]ぜんベルトを　しなくて　なりません。",
      "right": "安[あん]ぜんベルトを　しなければ　なりません。",
      "span": "しなくて",
      "why": "The shape is 〜なければ なりません. Students often start it correctly and lose it at the join.",
      "report": {
        "year": 2025,
        "note": "a number of students had difficulty with しなければならない"
      }
    },
    {
      "id": "e-tense-nikki",
      "focus": "tense",
      "wrong": "きのうは　アルバイトの　さいごの　日[ひ]です。",
      "right": "きのうは　アルバイトの　さいごの　日[ひ]でした。",
      "span": "日[ひ]です",
      "why": "A journal entry about yesterday stays in the past the whole way through. One present-tense verb and the recount falls over.",
      "report": {
        "year": 2023,
        "note": "the response should be written primarily in the past tense to recount the author's experience"
      }
    },
    {
      "id": "e-kyonen",
      "focus": "tense",
      "wrong": "去年[きょねん]の　なつ、家族[かぞく]と　海[うみ]に　行[い]きます。",
      "right": "去年[きょねん]の　なつ、家族[かぞく]と　海[うみ]に　行[い]きました。",
      "span": "行[い]きます",
      "why": "去年[きょねん] has already fixed the tense. The verb has to agree with it.",
      "report": {
        "year": 2021,
        "note": "students are advised to pay closer attention to the tense and intended meaning of the question"
      }
    },
    {
      "id": "e-hajimeni",
      "focus": "vocab",
      "wrong": "はじめに　乗[の]ったから、こわかったです。",
      "right": "はじめて　乗[の]ったから、こわかったです。",
      "span": "はじめに",
      "why": "はじめて is the first time you have ever done it. はじめに is 'first of all', the first thing in an order.",
      "report": {
        "year": 2025,
        "note": "a common error was confusing はじめて with はじめに"
      }
    },
    {
      "id": "e-michi-machi",
      "focus": "vocab",
      "wrong": "朝[あさ]は　町[まち]が　しずかです。車[くるま]も　人[ひと]も　少[すく]ないです。",
      "right": "朝[あさ]は　道[みち]が　しずかです。車[くるま]も　人[ひと]も　少[すく]ないです。",
      "span": "町[まち]が",
      "why": "道[みち] is the street; 町[まち] is the town. Cars and people being few is about the street.",
      "report": {
        "year": 2025,
        "note": "a number of students confused 道 (streets) with 町 (town)"
      }
    },
    {
      "id": "e-wakeru",
      "focus": "vocab",
      "wrong": "この町[まち]では、ごみを　分[わ]かる　日[ひ]が　きまっています。",
      "right": "この町[まち]では、ごみを　分[わ]ける　日[ひ]が　きまっています。",
      "span": "分[わ]かる",
      "why": "分[わ]ける is to separate; 分[わ]かる is to understand. One kanji, two verbs, and rubbish does not understand anything.",
      "report": {
        "year": 2023,
        "note": "common mistakes included confusing 分ける with 分かる"
      }
    },
    {
      "id": "e-unten",
      "focus": "vocab",
      "wrong": "おじいさんが　うん動[どう]を　やめたら、買[か]い物[もの]に　行[い]きにくく　なります。",
      "right": "おじいさんが　うんてんを　やめたら、買[か]い物[もの]に　行[い]きにくく　なります。",
      "span": "うん動[どう]を",
      "why": "うんてん is driving; うん動[どう] is exercise. Giving up driving is what makes the shopping hard.",
      "report": {
        "year": 2025,
        "note": "some confused うんてん (driving) with うん動 (exercise)"
      }
    },
    {
      "id": "e-sanka",
      "focus": "vocab",
      "wrong": "らいねんの　プログラムに　さんかした　です。",
      "right": "らいねんの　プログラムに　さんかしたいです。",
      "span": "さんかした",
      "why": "さんかしたい is want to take part; さんかした is already took part. Next year has not happened yet.",
      "report": {
        "year": 2022,
        "note": "さんかしたい (want to participate) was read as さんかした (participated)"
      }
    },
    {
      "id": "e-katakana-computer",
      "focus": "katakana",
      "wrong": "あんぜんな　コンピュターの　使[つか]い方[かた]に　ついてです。",
      "right": "あんぜんな　コンピューターの　使[つか]い方[かた]に　ついてです。",
      "span": "コンピュターの",
      "why": "The long vowel mark is a letter, not a decoration. コンピューター has two of them.",
      "report": {
        "year": 2021,
        "note": "there were some consistent spelling errors with words such as コンピューター"
      }
    },
    {
      "id": "e-katakana-slippers",
      "focus": "katakana",
      "wrong": "家[いえ]の　中[なか]では　スリッパーを　はきます。",
      "right": "家[いえ]の　中[なか]では　スリッパを　はきます。",
      "span": "スリッパーを",
      "why": "スリッパ has no long mark at the end, and it has a small ッ in the middle. Both halves of that catch people out.",
      "report": {
        "year": 2023,
        "note": "the spelling of スリッパ was problematic"
      }
    },
    {
      "id": "e-katakana-board",
      "focus": "katakana",
      "wrong": "しょうぎは　日本[にほん]の　でんとうてきな　ボートゲームです。",
      "right": "しょうぎは　日本[にほん]の　でんとうてきな　ボードゲームです。",
      "span": "ボートゲームです",
      "why": "ボード is a board; ボート is a boat. One dot changes the game.",
      "report": {
        "year": 2024,
        "note": "many responses did not spell the katakana words ボード and ゲーム correctly"
      }
    },
    {
      "id": "e-kana-for-kanji",
      "focus": "kanji",
      "wrong": "毎日[まいにち]　がっこうの　友[とも]だちと　日本語[にほんご]を　勉強[べんきょう]して　います。",
      "right": "毎日[まいにち]　学校[がっこう]の　友[とも]だちと　日本語[にほんご]を　勉強[べんきょう]して　います。",
      "span": "がっこうの",
      "why": "学校[がっこう] is on the list of kanji you are expected to write. A word you know the kanji for, written in kana, loses a mark that was there for the taking.",
      "report": {
        "year": 2025,
        "note": "students are reminded to use the expected kanji in Japanese responses"
      }
    },
    {
      "id": "e-speech-close",
      "focus": "texttype",
      "wrong": "……ですから、ぜひ　来[き]て　ください。聞[き]いて　くれて　ありがとう　ございました。",
      "right": "……ですから、ぜひ　来[き]て　ください。これで　話[はなし]を　終[お]わります。ありがとう　ございました。",
      "span": "聞[き]いて　くれて　ありがとう　ございました",
      "why": "A speech does not thank the audience for listening in those words. Close it and then thank them.",
      "report": {
        "year": 2022,
        "note": "students need to recognise the correct features of a speech script and avoid 聞いてくれてありがとうございました as a closing remark"
      }
    },
    {
      "id": "e-copy",
      "focus": "texttype",
      "wrong": "このワークショップでは、和[わ]がしという　でんとうてきな　おかしについて　学[まな]べるそうです。",
      "right": "このワークショップでは、日本[にほん]の　おかしの　作[つく]り方[かた]を　習[なら]うことが　できます。",
      "span": "和[わ]がしという　でんとうてきな　おかしについて　学[まな]べるそうです",
      "why": "That clause is the stimulus text, word for word. Say the same thing in your own words: the marks are for your Japanese, not for the paper's.",
      "report": {
        "year": 2025,
        "note": "low-scoring responses included significant portions copied from the reading text without any modifications"
      }
    }
  ]
};
