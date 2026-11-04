/* ============================================================================
   data/kihon.js  —  window.KIHON
   ----------------------------------------------------------------------------
   The small print of Japanese: dates, times, when-words, counters, adverbs
   of frequency and amount, and the words for people and things.

   Andrew asked for a practice section for exactly this list. These are
   closed systems where most members are regular and a handful are not, and
   the irregular handful is where the marks go. So every table marks its
   irregular members, and every drill is weighted to them.

   A drill item's wrong answers are not random. They are the readings
   students actually produce: よんがつ for 四月, きゅうじ for 九時, いちにん
   for 一人, はちふん for 八分. Teaching the system means showing the near
   miss next to the right answer.

   Each panel carries:
     tables     what to read, or put on the projector. A row is
                [form, reading, 1 if irregular], and `gloss` rows are
                [term, meaning] with no reading.
     read       form on screen, pick the reading
     pick       a rule to apply: which particle, which ending, which word
     build      an English prompt and a sentence with a gap

   Furigana uses the suite's bracket notation: 漢字[かんじ].

   One window. line, then pure JSON. No comments inside the object.
   ========================================================================== */

window.KIHON = {
  "schema_version": 1,
  "panels": [
    {
      "id": "hizuke",
      "ja": "ひづけ",
      "en": "Dates",
      "lede": "Read the table first. The marked readings are the irregular ones.",
      "tables": [
        {
          "title": "Months",
          "note": "Only three are irregular. Learn those three.",
          "rows": [
            ["一月", "いちがつ", 0], ["二月", "にがつ", 0], ["三月", "さんがつ", 0],
            ["四月", "しがつ", 1], ["五月", "ごがつ", 0], ["六月", "ろくがつ", 0],
            ["七月", "しちがつ", 1], ["八月", "はちがつ", 0], ["九月", "くがつ", 1],
            ["十月", "じゅうがつ", 0], ["十一月", "じゅういちがつ", 0],
            ["十二月", "じゅうにがつ", 0]
          ]
        },
        {
          "title": "Days of the month",
          "note": "1 to 10 are all irregular, and so are 14, 20 and 24. Everything else adds にち.",
          "rows": [
            ["一日", "ついたち", 1], ["二日", "ふつか", 1], ["三日", "みっか", 1],
            ["四日", "よっか", 1], ["五日", "いつか", 1], ["六日", "むいか", 1],
            ["七日", "なのか", 1], ["八日", "ようか", 1], ["九日", "ここのか", 1],
            ["十日", "とおか", 1], ["十一日", "じゅういちにち", 0],
            ["十四日", "じゅうよっか", 1], ["二十日", "はつか", 1],
            ["二十四日", "にじゅうよっか", 1], ["三十一日", "さんじゅういちにち", 0]
          ]
        },
        {
          "title": "Days of the week",
          "note": "The reading is always ようび.",
          "rows": [
            ["月よう日", "げつようび", 0], ["火よう日", "かようび", 0],
            ["水よう日", "すいようび", 0], ["木よう日", "もくようび", 0],
            ["金よう日", "きんようび", 0], ["土よう日", "どようび", 0],
            ["日よう日", "にちようび", 0]
          ]
        }
      ],
      "read": [
        { "q": "四月", "a": "しがつ", "wrong": ["よんがつ", "よがつ", "しちがつ"], "why": "4 is し in dates, never よん." },
        { "q": "七月", "a": "しちがつ", "wrong": ["なながつ", "しがつ", "しちにち"], "why": "7 is しち here, not なな." },
        { "q": "九月", "a": "くがつ", "wrong": ["きゅうがつ", "くにち", "ここのがつ"], "why": "9 is く here, not きゅう." },
        { "q": "一日", "a": "ついたち", "wrong": ["いちにち", "いちひ", "ひとつか"], "why": "The first of the month is ついたち. いちにち means one whole day." },
        { "q": "二日", "a": "ふつか", "wrong": ["ににち", "ににか", "ふつひ"], "why": "2 to 10 use the old counting words." },
        { "q": "四日", "a": "よっか", "wrong": ["よんにち", "しにち", "よんか"], "why": "4 is よっか. Watch the small っ." },
        { "q": "八日", "a": "ようか", "wrong": ["はちにち", "はちか", "やっか"], "why": "8 is ようか, which sounds close to 四日 よっか." },
        { "q": "十日", "a": "とおか", "wrong": ["じゅうにち", "とうか", "とおにち"], "why": "10 is とおか, with おお, not おう." },
        { "q": "二十日", "a": "はつか", "wrong": ["にじゅうにち", "ふつか", "にじゅうか"], "why": "20 is はつか. 2 is ふつか." },
        { "q": "十四日", "a": "じゅうよっか", "wrong": ["じゅうよんにち", "じゅうしにち", "じゅうよか"], "why": "14 keeps よっか from 4." },
        { "q": "水よう日", "a": "すいようび", "wrong": ["みずようび", "すいよういち", "かようび"], "why": "水 is すい in the day of the week." },
        { "q": "二十四日", "a": "にじゅうよっか", "wrong": ["にじゅうよんにち", "にじゅうしにち"], "why": "24 keeps よっか too." }
      ],
      "pick": [],
      "build": [
        { "en": "My birthday is 1 May.", "frame": ["たんじょうびは", "です。"], "a": "ごがつついたち", "wrong": ["ごがついちにち", "ごがつひとつ"] },
        { "en": "The test is on 20 July.", "frame": ["テストは", "です。"], "a": "しちがつはつか", "wrong": ["なながつはつか", "しちがつにじゅうにち"] },
        { "en": "We go to Japan on 4 April.", "frame": ["", "日本[にほん]へ行[い]きます。"], "a": "しがつよっかに", "wrong": ["よんがつよっかに", "しがつよんにちに"] },
        { "en": "There is no school on Sunday.", "frame": ["", "学校[がっこう]はありません。"], "a": "にちようびは", "wrong": ["げつようびは", "どようびは"] }
      ]
    },
    {
      "id": "jikan",
      "ja": "じかん",
      "en": "Times",
      "lede": "Three hours and six minute readings are irregular. Those are the ones to drill.",
      "tables": [
        {
          "title": "Hours",
          "note": "4, 7 and 9 are the three to learn.",
          "rows": [
            ["一時", "いちじ", 0], ["二時", "にじ", 0], ["三時", "さんじ", 0],
            ["四時", "よじ", 1], ["五時", "ごじ", 0], ["六時", "ろくじ", 0],
            ["七時", "しちじ", 1], ["八時", "はちじ", 0], ["九時", "くじ", 1],
            ["十時", "じゅうじ", 0], ["十一時", "じゅういちじ", 0],
            ["十二時", "じゅうにじ", 0]
          ]
        },
        {
          "title": "Minutes",
          "note": "分 is ふん after 2, 5, 7 and 9, and ぷん after the rest.",
          "rows": [
            ["一分", "いっぷん", 1], ["二分", "にふん", 0], ["三分", "さんぷん", 1],
            ["四分", "よんぷん", 1], ["五分", "ごふん", 0], ["六分", "ろっぷん", 1],
            ["七分", "ななふん", 0], ["八分", "はっぷん", 1], ["九分", "きゅうふん", 0],
            ["十分", "じゅっぷん", 1], ["十五分", "じゅうごふん", 0],
            ["三十分", "さんじゅっぷん", 1]
          ]
        },
        {
          "title": "The rest of the clock",
          "gloss": [
            ["午前", "am, before noon"], ["午後", "pm, after noon"],
            ["半", "half past"], ["何時", "what time"], ["何分", "how many minutes"]
          ]
        }
      ],
      "read": [
        { "q": "四時", "a": "よじ", "wrong": ["よんじ", "しじ", "よっじ"], "why": "4 o'clock is よじ. Not よんじ." },
        { "q": "七時", "a": "しちじ", "wrong": ["ななじ", "しじ", "しちひ"], "why": "7 o'clock is しちじ." },
        { "q": "九時", "a": "くじ", "wrong": ["きゅうじ", "ここのじ", "くうじ"], "why": "9 o'clock is くじ." },
        { "q": "八分", "a": "はっぷん", "wrong": ["はちふん", "はちぷん", "はっふん"], "why": "8 minutes doubles the consonant: はっぷん." },
        { "q": "十分", "a": "じゅっぷん", "wrong": ["じゅうふん", "じゅうぷん", "とおふん"], "why": "10 minutes is じゅっぷん." },
        { "q": "三分", "a": "さんぷん", "wrong": ["さんふん", "みっぷん", "さんびん"], "why": "3 takes ぷん." },
        { "q": "六分", "a": "ろっぷん", "wrong": ["ろくふん", "ろくぷん", "ろっふん"], "why": "6 doubles the consonant too." },
        { "q": "四時半", "a": "よじはん", "wrong": ["よんじはん", "よじなかば", "しじはん"], "why": "半 is はん, and 4 stays よ." },
        { "q": "九時五分", "a": "くじごふん", "wrong": ["きゅうじごふん", "くじごぷん"], "why": "9 is く, and 5 takes ふん." }
      ],
      "pick": [],
      "build": [
        { "en": "I get up at 7 o'clock.", "frame": ["", "おきます。"], "a": "しちじに", "wrong": ["ななじに", "しちじで", "しちじ"] },
        { "en": "School starts at 8:30 am.", "frame": ["学校[がっこう]は", "はじまります。"], "a": "ごぜんはちじはんに", "wrong": ["ごごはちじはんに", "はちじはんごぜんに"] },
        { "en": "The class finishes at 4 o'clock.", "frame": ["じゅぎょうは", "おわります。"], "a": "よじに", "wrong": ["よんじに", "よじで"] },
        { "en": "It takes 10 minutes.", "frame": ["", "かかります。"], "a": "じゅっぷん", "wrong": ["じゅうふん", "じゅっぷんに"] }
      ]
    },
    {
      "id": "itsu",
      "ja": "いつ",
      "en": "When words",
      "lede": "Learn the three columns, then learn which of them take に.",
      "tables": [
        {
          "title": "Days",
          "gloss": [
            ["おととい", "the day before yesterday", 0], ["きのう", "yesterday", 0],
            ["きょう", "today", 0], ["あした", "tomorrow", 0],
            ["あさって", "the day after tomorrow", 0]
          ]
        },
        {
          "title": "Weeks, months, years",
          "note": "せん is last, こん is this, らい is next. 年 breaks the pattern: きょねん and ことし.",
          "gloss": [
            ["せんしゅう", "last week", 0], ["こんしゅう", "this week", 0],
            ["らいしゅう", "next week", 0], ["せんげつ", "last month", 0],
            ["こんげつ", "this month", 0], ["らいげつ", "next month", 0],
            ["きょねん", "last year", 1], ["ことし", "this year", 1],
            ["らいねん", "next year", 0]
          ]
        },
        {
          "title": "Every",
          "gloss": [
            ["まいにち", "every day", 0], ["まいしゅう", "every week", 0],
            ["まいつき", "every month", 0], ["まいとし", "every year", 0]
          ]
        },
        {
          "title": "Which ones take に",
          "gloss": [
            ["三時に、七月に、月よう日に", "a clock time, a month, a weekday: に"],
            ["きょう、あした、きのう、まいにち", "no に"],
            ["しゅうまつに、ふゆに", "the weekend and the seasons: に"]
          ]
        }
      ],
      "read": [],
      "pick": [
        { "q": "きょう ___ 学校[がっこう]へ行[い]きます。", "a": "no に", "wrong": ["に"], "why": "きょう takes no particle." },
        { "q": "月[げつ]よう日[び] ___ テストがあります。", "a": "に", "wrong": ["no に"], "why": "A weekday takes に." },
        { "q": "まいにち ___ 日本語[にほんご]を勉強[べんきょう]します。", "a": "no に", "wrong": ["に"], "why": "まい words take no particle." },
        { "q": "三時[さんじ] ___ 会[あ]いましょう。", "a": "に", "wrong": ["no に"], "why": "A clock time takes に." },
        { "q": "あした ___ 友[とも]だちが来[き]ます。", "a": "no に", "wrong": ["に"], "why": "あした takes no particle." },
        { "q": "七月[しちがつ] ___ 日本[にほん]へ行[い]きます。", "a": "に", "wrong": ["no に"], "why": "A month takes に." },
        { "q": "しゅうまつ ___ およぎます。", "a": "に", "wrong": ["no に"], "why": "しゅうまつ takes に." },
        { "q": "らいしゅう ___ 京都[きょうと]へ行[い]きます。", "a": "no に", "wrong": ["に"], "why": "らい words take no particle." }
      ],
      "build": [
        { "en": "I will meet a friend tomorrow.", "frame": ["", "友[とも]だちに会[あ]います。"], "a": "あした", "wrong": ["あしたに", "あしたで"] },
        { "en": "I study Japanese every day.", "frame": ["", "日本語[にほんご]を勉強[べんきょう]します。"], "a": "まいにち", "wrong": ["まいにちに", "まいにちで"] },
        { "en": "I went to Kyoto last week.", "frame": ["", "京都[きょうと]へ行[い]きました。"], "a": "せんしゅう", "wrong": ["らいしゅう", "こんしゅう"] },
        { "en": "I am going to Japan next year.", "frame": ["", "日本[にほん]へ行[い]きます。"], "a": "らいねん", "wrong": ["きょねん", "ことし"] }
      ]
    },
    {
      "id": "kazoe",
      "ja": "かぞえかた",
      "en": "Counters",
      "lede": "Pick the counter the noun needs, then read it correctly.",
      "tables": [
        {
          "title": "What takes which counter",
          "gloss": [
            ["本", "long things: pencils, umbrellas, bottles"],
            ["まい", "flat things: paper, stamps, shirts, tickets"],
            ["さつ", "books and magazines"],
            ["だい", "machines and vehicles: cars, bikes, computers"],
            ["ひき", "small animals: cats, dogs, fish"],
            ["人", "people"],
            ["つ", "everything else"]
          ]
        },
        {
          "title": "つ and 人",
          "rows": [
            ["一つ", "ひとつ", 1], ["二つ", "ふたつ", 1], ["三つ", "みっつ", 1],
            ["四つ", "よっつ", 1], ["五つ", "いつつ", 1], ["六つ", "むっつ", 1],
            ["七つ", "ななつ", 0], ["八つ", "やっつ", 1], ["九つ", "ここのつ", 1],
            ["十", "とお", 1], ["一人", "ひとり", 1], ["二人", "ふたり", 1],
            ["三人", "さんにん", 0], ["四人", "よにん", 1]
          ]
        },
        {
          "title": "本 and ひき",
          "note": "1, 3, 6, 8 and 10 change the sound. The rest are regular.",
          "rows": [
            ["一本", "いっぽん", 1], ["二本", "にほん", 0], ["三本", "さんぼん", 1],
            ["六本", "ろっぽん", 1], ["八本", "はっぽん", 1], ["十本", "じゅっぽん", 1],
            ["一ぴき", "いっぴき", 1], ["三びき", "さんびき", 1],
            ["六ぴき", "ろっぴき", 1], ["十ぴき", "じゅっぴき", 1]
          ]
        },
        {
          "title": "さつ, まい, だい",
          "rows": [
            ["一さつ", "いっさつ", 1], ["八さつ", "はっさつ", 1],
            ["十さつ", "じゅっさつ", 1], ["一まい", "いちまい", 0],
            ["八まい", "はちまい", 0], ["一だい", "いちだい", 0],
            ["八だい", "はちだい", 0]
          ]
        }
      ],
      "read": [
        { "q": "一人", "a": "ひとり", "wrong": ["いちにん", "ひとにん", "いちり"], "why": "One person is ひとり." },
        { "q": "二人", "a": "ふたり", "wrong": ["にじん", "ににん", "ふたにん"], "why": "Two people is ふたり." },
        { "q": "四人", "a": "よにん", "wrong": ["よんにん", "しにん", "よったり"], "why": "Four people is よにん, with no ん on よ." },
        { "q": "一本", "a": "いっぽん", "wrong": ["いちほん", "いちぼん", "いっほん"], "why": "1 doubles the consonant and 本 becomes ぽん." },
        { "q": "三本", "a": "さんぼん", "wrong": ["さんほん", "さんぽん", "みっぼん"], "why": "3 takes ぼん." },
        { "q": "六本", "a": "ろっぽん", "wrong": ["ろくほん", "ろくぽん", "ろっぼん"], "why": "6 doubles the consonant: ろっぽん." },
        { "q": "三びき", "a": "さんびき", "wrong": ["さんひき", "さんぴき", "みっびき"], "why": "3 takes びき, the same shift as さんぼん." },
        { "q": "一ぴき", "a": "いっぴき", "wrong": ["いちひき", "いっひき", "いちぴき"], "why": "1 takes ぴき." },
        { "q": "八つ", "a": "やっつ", "wrong": ["はちつ", "はっつ", "やつつ"], "why": "Eight things is やっつ." },
        { "q": "十", "a": "とお", "wrong": ["じゅう", "とおつ", "とうつ"], "why": "Ten things is とお, with no つ." }
      ],
      "pick": [
        { "q": "えんぴつ", "a": "本", "wrong": ["まい", "さつ", "だい"], "why": "A pencil is long, so 本." },
        { "q": "きって", "a": "まい", "wrong": ["本", "さつ", "ひき"], "why": "A stamp is flat, so まい." },
        { "q": "本[ほん]", "a": "さつ", "wrong": ["本", "まい", "つ"], "why": "A book is さつ, even though the word is 本." },
        { "q": "車[くるま]", "a": "だい", "wrong": ["ひき", "本", "つ"], "why": "A car is a machine, so だい." },
        { "q": "ねこ", "a": "ひき", "wrong": ["人", "だい", "つ"], "why": "A cat is a small animal, so ひき." },
        { "q": "学生[がくせい]", "a": "人", "wrong": ["ひき", "つ", "だい"], "why": "People take 人." },
        { "q": "りんご", "a": "つ", "wrong": ["本", "まい", "ひき"], "why": "An apple fits nothing else, so つ." },
        { "q": "かさ", "a": "本", "wrong": ["まい", "だい", "つ"], "why": "An umbrella is long, so 本." },
        { "q": "Tシャツ", "a": "まい", "wrong": ["本", "さつ", "だい"], "why": "Clothes are flat, so まい." },
        { "q": "自[じ]てん車[しゃ]", "a": "だい", "wrong": ["本", "ひき", "つ"], "why": "A bike is a vehicle, so だい." }
      ],
      "build": [
        { "en": "There are three cats.", "frame": ["ねこが", "います。"], "a": "さんびき", "wrong": ["さんひき", "さんにん", "みっつ"] },
        { "en": "I bought two books.", "frame": ["本[ほん]を", "買[か]いました。"], "a": "にさつ", "wrong": ["ふたつ", "にまい", "にほん"] },
        { "en": "Four people came.", "frame": ["", "来[き]ました。"], "a": "よにんが", "wrong": ["よんにんが", "よっつが"] },
        { "en": "Please give me one apple.", "frame": ["りんごを", "ください。"], "a": "ひとつ", "wrong": ["いちつ", "いっぽん", "ひとり"] }
      ]
    },
    {
      "id": "donokurai",
      "ja": "どのくらい",
      "en": "How often, how much",
      "lede": "These words go before the verb. Two of them force a negative ending.",
      "tables": [
        {
          "title": "How often",
          "note": "あまり and ぜんぜん need a negative verb at the end.",
          "gloss": [
            ["いつも", "always"], ["たいてい", "usually"], ["よく", "often"],
            ["ときどき", "sometimes"], ["あまり〜ません", "not often"],
            ["ぜんぜん〜ません", "never"]
          ]
        },
        {
          "title": "How much",
          "gloss": [
            ["たくさん", "a lot"], ["すこし", "a little"], ["ちょっと", "a bit"],
            ["ぜんぶ", "all of it"], ["半分", "half"]
          ]
        },
        {
          "title": "Already and not yet",
          "gloss": [
            ["もう", "already"], ["まだ", "not yet, or still"],
            ["もう〜ました", "have already done it"],
            ["まだ〜ていません", "have not done it yet"]
          ]
        },
        {
          "title": "Where the word sits",
          "gloss": [
            ["わたしはときどきすしを食べます。", "before the verb, after the topic"],
            ["ぜんぜん日本語を話しません。", "ぜんぜん first, negative last"]
          ]
        }
      ],
      "read": [],
      "pick": [
        { "q": "ぜんぜん日本語[にほんご]を話[はな]___", "a": "しません", "wrong": ["します", "しました"], "why": "ぜんぜん needs the negative." },
        { "q": "あまりテレビを見[み]___", "a": "ません", "wrong": ["ます", "ました"], "why": "あまり needs the negative." },
        { "q": "よくすしを食[た]べ___", "a": "ます", "wrong": ["ません"], "why": "よく takes the ordinary positive ending." },
        { "q": "100% of the time", "a": "いつも", "wrong": ["ときどき", "あまり", "ぜんぜん"], "why": "いつも is always." },
        { "q": "0% of the time", "a": "ぜんぜん", "wrong": ["いつも", "よく", "たいてい"], "why": "ぜんぜん is never, with a negative verb." },
        { "q": "most of the time", "a": "たいてい", "wrong": ["ときどき", "ぜんぜん", "ちょっと"], "why": "たいてい is usually." },
        { "q": "now and then", "a": "ときどき", "wrong": ["いつも", "まだ", "ぜんぶ"], "why": "ときどき is sometimes." },
        { "q": "I ___ finished my homework.", "a": "もう", "wrong": ["まだ", "ぜんぜん"], "why": "もう is already." }
      ],
      "build": [
        { "en": "I sometimes watch Japanese films.", "frame": ["", "日本[にほん]のえいがを見[み]ます。"], "a": "ときどき", "wrong": ["いつも", "ぜんぜん", "まだ"] },
        { "en": "I never drink coffee.", "frame": ["コーヒーは", "のみません。"], "a": "ぜんぜん", "wrong": ["よく", "たくさん", "もう"] },
        { "en": "I have already eaten.", "frame": ["", "食[た]べました。"], "a": "もう", "wrong": ["まだ", "ときどき"] },
        { "en": "I study a little every day.", "frame": ["まいにち", "勉強[べんきょう]します。"], "a": "すこし", "wrong": ["ぜんぶ", "ぜんぜん", "もう"] }
      ]
    },
    {
      "id": "dare",
      "ja": "だれ・これ",
      "en": "People and things",
      "lede": "これ stands alone. この needs a noun after it. Same for それ and あれ.",
      "tables": [
        {
          "title": "People",
          "note": "Japanese drops the word for I when it is obvious. Say 日本へ行きます, not わたしは日本へ行きます every time.",
          "gloss": [
            ["わたし", "I"], ["ぼく", "I, used by boys"], ["あなた", "you"],
            ["かれ", "he"], ["かのじょ", "she"], ["わたしたち", "we"],
            ["ぼくたち", "we, used by boys"], ["みんな", "everyone"],
            ["学生たち", "the students: 〜たち makes a group"]
          ]
        },
        {
          "title": "This and that",
          "note": "The れ words stand alone. The の words need a noun.",
          "gloss": [
            ["これ", "this one, near me"], ["それ", "that one, near you"],
            ["あれ", "that one over there"], ["この本", "this book"],
            ["その本", "that book"], ["あの本", "that book over there"]
          ]
        },
        {
          "title": "Places",
          "gloss": [
            ["ここ", "here, where I am"], ["そこ", "there, where you are"],
            ["あそこ", "over there, away from both of us"]
          ]
        },
        {
          "title": "Asking",
          "gloss": [
            ["だれ", "who"], ["なに", "what"], ["どこ", "where"],
            ["どれ", "which one"], ["どの本", "which book"]
          ]
        }
      ],
      "read": [],
      "pick": [
        { "q": "___ はわたしのかばんです。", "a": "これ", "wrong": ["この", "ここ", "どの"], "why": "Nothing follows it, so これ." },
        { "q": "___ かばんはわたしのです。", "a": "この", "wrong": ["これ", "ここ", "どれ"], "why": "かばん follows it, so この." },
        { "q": "___ をください。", "a": "これ", "wrong": ["この", "ここ", "どの"], "why": "を follows it, so これ stands alone." },
        { "q": "えきは ___ ですか。", "a": "どこ", "wrong": ["だれ", "どれ", "なに"], "why": "A place question takes どこ." },
        { "q": "あの人[ひと]は ___ ですか。", "a": "だれ", "wrong": ["どこ", "なに", "どれ"], "why": "A person question takes だれ." },
        { "q": "the students, as a group", "a": "学生たち", "wrong": ["学生ら", "学生がた", "学生みんな"], "why": "〜たち makes the plural." },
        { "q": "we, two or more of us", "a": "わたしたち", "wrong": ["わたしら", "わたしども", "わたしみんな"], "why": "わたし + たち." },
        { "q": "he", "a": "かれ", "wrong": ["かのじょ", "あなた", "わたし"], "why": "かれ is he." },
        { "q": "she", "a": "かのじょ", "wrong": ["かれ", "あなた", "みんな"], "why": "かのじょ is she." },
        { "q": "you", "a": "あなた", "wrong": ["わたし", "かれ", "だれ"], "why": "あなた is you." },
        { "q": "a shop away from both of us", "a": "あそこ", "wrong": ["ここ", "そこ", "どこ"], "why": "Away from both speakers is あそこ." }
      ],
      "build": [
        { "en": "This is my bag.", "frame": ["", "わたしのかばんです。"], "a": "これは", "wrong": ["このは", "ここは", "これの"] },
        { "en": "That book over there is the teacher's.", "frame": ["", "本[ほん]は先生[せんせい]のです。"], "a": "あの", "wrong": ["あれ", "あそこ", "あれの"] },
        { "en": "Where is the station?", "frame": ["えきは", "ですか。"], "a": "どこ", "wrong": ["だれ", "どれ", "どの"] },
        { "en": "We are Year 10 students.", "frame": ["", "十年生[じゅうねんせい]です。"], "a": "わたしたちは", "wrong": ["わたしは", "わたしらは"] },
        { "en": "She is my friend.", "frame": ["", "わたしの友[とも]だちです。"], "a": "かのじょは", "wrong": ["かれは", "あなたは", "かのじょの"] }
      ]
    }
  ]
};
