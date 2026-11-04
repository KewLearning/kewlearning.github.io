/* ============================================================================
   data/joshi.js  —  window.JOSHI
   ----------------------------------------------------------------------------
   Particles: what each one marks, examples of it working, and two drills.

   Andrew asked for revision, drills, definitions and examples in one place.
   The Grammar Hub drills particles by typing one into a gap, and the oral
   exam app drills spotting a wrong one out loud. Neither holds the
   definitions or the examples, which is the part a student revising from
   scratch needs first.

   Eight panels, ordered as they are taught: の, を・に・へ, で・に,
   と・や・も・か, から・まで・より, だけ・しか, ね・よ・か, は と が.

   は と が sits last on Andrew's ruling. It is senior work, so it comes
   after everything that feeds it. だけ・しか has a panel of its own, with
   あまり and ぜんぜん, because limiting an amount is not what から does.

   Each panel carries:
     marks   what the particle marks, one line each
     egs     a sentence that uses it, with the English
     drill   a sentence with the particle missing
     fix     somebody else's whole sentence, right or wrong. The answer is
             the particle it should carry, or このままでいい when it is
             already right. One decision covers both halves, which is the
             skill the VCAA oral reports keep naming: spotting the wrong
             particle in a sentence rather than filling a gap in one.

   Every item has one defensible answer. Where two particles would both be
   correct (すしが好きです and すしは好きです, 日本へ行きます and 日本に
   行きます), the other correct one is never offered as a wrong option, and
   the English says which reading is wanted.

   Furigana uses the suite's bracket notation: 漢字[かんじ].

   One window. line, then pure JSON. No comments inside the object.
   ========================================================================== */

window.JOSHI = {
  "schema_version": 1,
  "ok": "このままでいい",
  "panels": [
    {
      "id": "no",
      "ja": "の",
      "en": "Belonging",
      "lede": "の joins two nouns, and stands in for one you have already said.",
      "marks": [
        ["の", "joins two nouns. The first owns or describes the second."],
        ["の", "stands in for a noun you have already named."],
        ["の", "chains as many nouns as you need."],
        ["だれの", "asks whose."]
      ],
      "egs": [
        ["これはわたしのかばんです。", "This is my bag."],
        ["そのかばんはわたしのです。", "That bag is mine."],
        ["日本語[にほんご]の先生[せんせい]です。", "He is the Japanese teacher."],
        ["友[とも]だちのお母[かあ]さんの車[くるま]です。", "It is my friend's mother's car."]
      ],
      "drill": [
        { "s": ["わたし", "かばんです。"], "a": "の", "wrong": ["は", "が", "を"], "en": "It is my bag.", "why": "の joins two nouns." },
        { "s": ["そのペンはわたし", "です。"], "a": "の", "wrong": ["は", "が", "も"], "en": "That pen is mine.", "why": "の stands in for ペン." },
        { "s": ["日本語[にほんご]", "本[ほん]を買[か]いました。"], "a": "の", "wrong": ["を", "で", "に"], "en": "I bought a Japanese book.", "why": "日本語の本 is one thing." },
        { "s": ["これはだれ", "かばんですか。"], "a": "の", "wrong": ["が", "は", "を"], "en": "Whose bag is this?", "why": "だれの asks whose." },
        { "s": ["父[ちち]", "車[くるま]で行[い]きます。"], "a": "の", "wrong": ["で", "に", "を"], "en": "We go in my father's car.", "why": "父の車 is one thing, then で." },
        { "s": ["わたし", "学校[がっこう]は大[おお]きいです。"], "a": "の", "wrong": ["は", "が", "を"], "en": "My school is big.", "why": "わたしの学校 is the topic." },
        { "s": ["わたし", "学生[がくせい]です。"], "a": "は", "wrong": ["の", "が", "を"], "en": "I am a student.", "why": "は sets the topic. わたしの学生 is not a thing." },
        { "s": ["本[ほん]", "読[よ]みます。"], "a": "を", "wrong": ["の", "は", "に"], "en": "I read a book.", "why": "を marks what the verb acts on." },
        { "s": ["ねこ", "います。"], "a": "が", "wrong": ["の", "は", "を"], "en": "There is a cat.", "why": "が introduces something new." },
        { "s": ["学校[がっこう]", "行[い]きます。"], "a": "へ", "wrong": ["の", "を", "も"], "en": "I go to school.", "why": "へ marks the direction." },
        { "s": ["友[とも]だち", "行[い]きます。"], "a": "と", "wrong": ["の", "を", "に"], "en": "I go with a friend.", "why": "と marks who you are with." },
        { "s": ["日本語[にほんご]", "好[す]きです。"], "a": "が", "wrong": ["の", "を", "に"], "en": "I like Japanese.", "why": "好き takes が." },
        { "s": ["七時[しちじ]", "おきます。"], "a": "に", "wrong": ["の", "を", "へ"], "en": "I get up at 7.", "why": "A clock time takes に." }
      ],
      "fix": [
        { "s": "わたしはかばんです。", "a": "の", "wrong": ["このままでいい", "が", "を"], "en": "It is my bag.", "why": "わたしのかばん. は makes you the bag." },
        { "s": "そのかばんはわたしのです。", "a": "このままでいい", "wrong": ["の", "が", "を"], "en": "That bag is mine.", "why": "のです stands in for かばん." },
        { "s": "日本語[にほんご]が先生[せんせい]です。", "a": "の", "wrong": ["このままでいい", "は", "を"], "en": "He is the Japanese teacher.", "why": "日本語の先生 is one thing." },
        { "s": "これはだれがかばんですか。", "a": "の", "wrong": ["このままでいい", "は", "を"], "en": "Whose bag is this?", "why": "だれの asks whose." },
        { "s": "わたしの学生[がくせい]です。", "a": "は", "wrong": ["このままでいい", "が", "を"], "en": "I am a student.", "why": "わたしは学生です. の does not join those two." },
        { "s": "本[ほん]の読[よ]みます。", "a": "を", "wrong": ["このままでいい", "は", "が"], "en": "I read a book.", "why": "を marks what you read." },
        { "s": "父[ちち]の車[くるま]で行[い]きます。", "a": "このままでいい", "wrong": ["は", "が", "を"], "en": "We go in my father's car.", "why": "父の車 is one thing, then で." }
      ]
    },
    {
      "id": "wo",
      "ja": "を・に・へ",
      "en": "What and where to",
      "lede": "を marks what the verb acts on. に and へ mark where you are going.",
      "marks": [
        ["を", "marks the thing the verb acts on."],
        ["に", "marks where you are going, when, and who you give or say something to."],
        ["へ", "marks the direction you are going. For a destination に works too."],
        ["を", "also marks a place you move along or through."]
      ],
      "egs": [
        ["すしを食[た]べます。", "I eat sushi."],
        ["学校[がっこう]へ行[い]きます。", "I go to school."],
        ["七時[しちじ]に起[お]きます。", "I get up at 7."],
        ["先生[せんせい]に話[はな]します。", "I talk to the teacher."],
        ["道[みち]を歩[ある]きます。", "I walk along the street."]
      ],
      "drill": [
        { "s": ["パン", "食[た]べます。"], "a": "を", "wrong": ["に", "へ", "で"], "en": "I eat bread.", "why": "パン is what the verb acts on." },
        { "s": ["日本[にほん]", "行[い]きます。"], "a": "へ", "wrong": ["を", "で", "も"], "en": "I go to Japan.", "why": "へ marks the direction. に works too." },
        { "s": ["八時[はちじ]", "学校[がっこう]に着[つ]きます。"], "a": "に", "wrong": ["で", "を", "へ"], "en": "I arrive at school at 8.", "why": "A clock time takes に." },
        { "s": ["母[はは]", "手紙[てがみ]を書[か]きます。"], "a": "に", "wrong": ["を", "が", "で"], "en": "I write a letter to my mother.", "why": "に marks who you write to." },
        { "s": ["橋[はし]", "わたります。"], "a": "を", "wrong": ["で", "に", "へ"], "en": "I cross the bridge.", "why": "を marks the place you move through." },
        { "s": ["本[ほん]", "読[よ]みます。"], "a": "を", "wrong": ["に", "で", "へ"], "en": "I read a book.", "why": "本 is what the verb acts on." }
      ],
      "fix": [
        { "s": "すしに食[た]べます。", "a": "を", "wrong": ["このままでいい", "で", "へ"], "en": "I eat sushi.", "why": "を marks what you eat." },
        { "s": "学校[がっこう]へ行[い]きます。", "a": "このままでいい", "wrong": ["を", "で", "が"], "en": "I go to school.", "why": "へ marks the direction." },
        { "s": "七時[しちじ]で起[お]きます。", "a": "に", "wrong": ["このままでいい", "を", "へ"], "en": "I get up at 7.", "why": "A clock time takes に." },
        { "s": "先生[せんせい]を話[はな]します。", "a": "に", "wrong": ["このままでいい", "で", "へ"], "en": "I talk to the teacher.", "why": "に marks who you talk to." }
      ]
    },
    {
      "id": "de",
      "ja": "で・に",
      "en": "Where and how",
      "lede": "で is where you do it. に is where it is. で also marks the tool.",
      "marks": [
        ["で", "marks where an action happens."],
        ["に", "marks where something is, with あります and います."],
        ["で", "marks the tool or the way: はしで, 電車で."],
        ["で", "marks a reason: かぜで休みました."]
      ],
      "egs": [
        ["公園[こうえん]であそびます。", "We play in the park."],
        ["教室[きょうしつ]に先生[せんせい]がいます。", "The teacher is in the classroom."],
        ["はしで食[た]べます。", "I eat with chopsticks."],
        ["電車[でんしゃ]で行[い]きます。", "I go by train."],
        ["かぜで学校[がっこう]を休[やす]みました。", "I was off school with a cold."]
      ],
      "drill": [
        { "s": ["子[こ]どもたちが公園[こうえん]", "あそんでいます。"], "a": "で", "wrong": ["に", "を", "へ"], "en": "The children are playing in the park.", "why": "あそぶ is an action, so で." },
        { "s": ["教室[きょうしつ]", "先生[せんせい]がいます。"], "a": "に", "wrong": ["で", "を", "へ"], "en": "The teacher is in the classroom.", "why": "いる is existence, so に." },
        { "s": ["図書館[としょかん]", "本[ほん]を読[よ]みます。"], "a": "で", "wrong": ["に", "を", "へ"], "en": "I read books at the library.", "why": "読む is an action, so で." },
        { "s": ["つくえの上[うえ]", "本[ほん]があります。"], "a": "に", "wrong": ["で", "を", "へ"], "en": "There is a book on the desk.", "why": "ある is existence, so に." },
        { "s": ["はし", "食[た]べます。"], "a": "で", "wrong": ["に", "を", "が"], "en": "I eat with chopsticks.", "why": "で marks the tool." },
        { "s": ["バス", "学校[がっこう]へ行[い]きます。"], "a": "で", "wrong": ["に", "を", "へ"], "en": "I go to school by bus.", "why": "で marks how you travel." },
        { "s": ["日本[にほん]", "住[す]んでいます。"], "a": "に", "wrong": ["で", "を", "へ"], "en": "I live in Japan.", "why": "住む takes に." },
        { "s": ["いす", "すわります。"], "a": "に", "wrong": ["で", "を", "へ"], "en": "I sit on the chair.", "why": "すわる takes に." },
        { "s": ["へやの中[なか]", "ねこがいます。"], "a": "に", "wrong": ["で", "を", "へ"], "en": "There is a cat in the room.", "why": "いる is existence, so に." },
        { "s": ["えんぴつ", "書[か]きます。"], "a": "で", "wrong": ["に", "を", "へ"], "en": "I write with a pencil.", "why": "で marks the tool." }
      ],
      "fix": [
        { "s": "公園[こうえん]にあそびます。", "a": "で", "wrong": ["このままでいい", "を", "へ"], "en": "We play in the park.", "why": "あそぶ is an action, so で." },
        { "s": "教室[きょうしつ]で先生[せんせい]がいます。", "a": "に", "wrong": ["このままでいい", "を", "へ"], "en": "The teacher is in the classroom.", "why": "いる is existence, so に." },
        { "s": "電車[でんしゃ]で行[い]きます。", "a": "このままでいい", "wrong": ["に", "を", "へ"], "en": "I go by train.", "why": "で marks how you travel." },
        { "s": "ペンに書[か]きます。", "a": "で", "wrong": ["このままでいい", "を", "が"], "en": "I write with a pen.", "why": "で marks the tool. ノートに is the surface." }
      ]
    },
    {
      "id": "to",
      "ja": "と・や・も・か",
      "en": "Joining and adding",
      "lede": "と lists everything. や lists examples. も adds. か offers a choice.",
      "marks": [
        ["と", "lists everything: A and B, nothing else."],
        ["や", "lists examples: A and B and maybe more. It often takes など."],
        ["と", "also marks the person you do something with."],
        ["も", "means also. With a negative verb it means neither."],
        ["か", "means or."]
      ],
      "egs": [
        ["りんごとバナナを買[か]いました。", "I bought apples and bananas."],
        ["りんごやバナナなどを買[か]いました。", "I bought apples, bananas and so on."],
        ["友[とも]だちと行[い]きます。", "I go with a friend."],
        ["わたしも行[い]きます。", "I am going too."],
        ["ペンかえんぴつをください。", "Please give me a pen or a pencil."]
      ],
      "drill": [
        { "s": ["りんご", "バナナを買[か]いました。"], "a": "と", "wrong": ["で", "に", "を"], "en": "I bought apples and bananas, nothing else.", "why": "と lists both and stops there." },
        { "s": ["友[とも]だち", "えいがを見[み]ました。"], "a": "と", "wrong": ["を", "に", "で"], "en": "I saw a film with a friend.", "why": "と marks who you were with." },
        { "s": ["わたし", "行[い]きたいです。"], "a": "も", "wrong": ["を", "に", "で"], "en": "I want to go too.", "why": "も means too." },
        { "s": ["ねこ", "いぬもいません。"], "a": "も", "wrong": ["と", "や", "か"], "en": "There is neither a cat nor a dog.", "why": "も twice, with a negative verb." },
        { "s": ["お茶[ちゃ]", "コーヒーをのみますか。"], "a": "か", "wrong": ["と", "も", "を"], "en": "Will you have tea or coffee?", "why": "か offers a choice." },
        { "s": ["本[ほん]", "ノートなどを買[か]いました。"], "a": "や", "wrong": ["と", "も", "か"], "en": "I bought books, notebooks and so on.", "why": "や goes with など for examples." }
      ],
      "fix": [
        { "s": "友[とも]だちをえいがを見[み]ました。", "a": "と", "wrong": ["このままでいい", "に", "で"], "en": "I saw a film with a friend.", "why": "と marks who you were with." },
        { "s": "わたしは行[い]きたいです。", "a": "も", "wrong": ["このままでいい", "と", "が"], "en": "I want to go too.", "why": "も means too. は only sets the topic." },
        { "s": "りんごとバナナを買[か]いました。", "a": "このままでいい", "wrong": ["や", "も", "か"], "en": "I bought apples and bananas.", "why": "と lists both and stops there." },
        { "s": "ねこといぬもいません。", "a": "も", "wrong": ["このままでいい", "や", "か"], "en": "There is neither a cat nor a dog.", "why": "ねこもいぬもいません: も twice." }
      ]
    },
    {
      "id": "kara",
      "ja": "から・まで・より",
      "en": "From, until, than",
      "lede": "から starts it, まで ends it, より is what you compare against.",
      "marks": [
        ["から", "means from: a time or a place."],
        ["まで", "means until, or as far as."],
        ["から", "after a clause it means because."],
        ["より", "marks the thing you compare against. より is than."]
      ],
      "egs": [
        ["九時[くじ]から五時[ごじ]まで働[はたら]きます。", "I work from 9 to 5."],
        ["東京[とうきょう]から京都[きょうと]まで行[い]きました。", "I went from Tokyo to Kyoto."],
        ["つかれたから、もうねます。", "I am tired, so I am going to bed."],
        ["車[くるま]はバスより早[はや]いです。", "A car is faster than a bus."]
      ],
      "drill": [
        { "s": ["九時[くじ]", "五時[ごじ]まで働[はたら]きます。"], "a": "から", "wrong": ["まで", "より", "に"], "en": "I work from 9 to 5.", "why": "から marks the start." },
        { "s": ["学校[がっこう]", "うちまで歩[ある]きます。"], "a": "から", "wrong": ["まで", "より", "で"], "en": "I walk from school to home.", "why": "から marks where you start." },
        { "s": ["車[くるま]はバス", "早[はや]いです。"], "a": "より", "wrong": ["から", "まで", "と"], "en": "A car is faster than a bus.", "why": "より marks what you compare against." },
        { "s": ["つかれた", "もうねます。"], "a": "から", "wrong": ["まで", "より", "と"], "en": "I am tired, so I am going to bed.", "why": "から after a clause means because." },
        { "s": ["学校[がっこう]は三時[さんじ]", "です。"], "a": "まで", "wrong": ["から", "より", "に"], "en": "School goes until 3.", "why": "まで marks the end." },
        { "s": ["この本[ほん]はあの本[ほん]", "おもしろいです。"], "a": "より", "wrong": ["から", "まで", "と"], "en": "This book is more interesting than that one.", "why": "より marks what you compare against." },
        { "s": ["バスは電車[でんしゃ]", "おそいです。"], "a": "より", "wrong": ["から", "まで", "と"], "en": "A bus is slower than a train.", "why": "より marks what you compare against." }
      ],
      "fix": [
        { "s": "車[くるま]はバスから早[はや]いです。", "a": "より", "wrong": ["このままでいい", "まで", "と"], "en": "A car is faster than a bus.", "why": "より marks what you compare against." },
        { "s": "九時[くじ]から五時[ごじ]から働[はたら]きます。", "a": "まで", "wrong": ["このままでいい", "より", "だけ"], "en": "I work from 9 to 5.", "why": "から starts it, まで ends it." },
        { "s": "えきから歩[ある]いて十分[じゅっぷん]です。", "a": "このままでいい", "wrong": ["まで", "より", "だけ"], "en": "It is a 10 minute walk from the station.", "why": "から marks where you start." }
      ]
    },
    {
      "id": "dake",
      "ja": "だけ・しか",
      "en": "Only, and not much",
      "lede": "だけ and しか both mean only. しか needs a negative verb.",
      "marks": [
        ["だけ", "means only. The verb stays positive."],
        ["しか", "means only. The verb must be negative."],
        ["あまり", "means not much. It needs a negative verb."],
        ["ぜんぜん", "means not at all. It needs a negative verb."]
      ],
      "egs": [
        ["百円[ひゃくえん]だけあります。", "I have only 100 yen."],
        ["百円[ひゃくえん]しかありません。", "I have only 100 yen."],
        ["日曜日[にちようび]だけ休[やす]みます。", "I only take Sunday off."],
        ["あまり食[た]べません。", "I do not eat much."],
        ["ぜんぜん食[た]べません。", "I do not eat at all."]
      ],
      "drill": [
        { "s": ["百円[ひゃくえん]", "あります。"], "a": "だけ", "wrong": ["しか", "から", "まで"], "en": "I have only 100 yen.", "why": "だけ keeps the verb positive." },
        { "s": ["百円[ひゃくえん]", "ありません。"], "a": "しか", "wrong": ["だけ", "から", "より"], "en": "I have only 100 yen.", "why": "しか needs a negative verb." },
        { "s": ["日曜日[にちようび]", "休[やす]みます。"], "a": "だけ", "wrong": ["しか", "も", "より"], "en": "I only take Sunday off.", "why": "休みます is positive, so だけ." },
        { "s": ["一人[ひとり]", "来[き]ませんでした。"], "a": "しか", "wrong": ["だけ", "も", "より"], "en": "Only one person came.", "why": "しか goes with the negative 来ませんでした." },
        { "s": ["テレビは", "見[み]ません。"], "a": "あまり", "wrong": ["だけ", "しか", "ぜんぜん"], "en": "I do not watch much television.", "why": "あまり means not much." },
        { "s": ["日本語[にほんご]は", "話[はな]しません。"], "a": "ぜんぜん", "wrong": ["だけ", "しか", "より"], "en": "I do not speak Japanese at all.", "why": "ぜんぜん means not at all." }
      ],
      "fix": [
        { "s": "百円[ひゃくえん]しかあります。", "a": "だけ", "wrong": ["このままでいい", "から", "より"], "en": "I have only 100 yen.", "why": "しか needs a negative. With あります use だけ." },
        { "s": "百円[ひゃくえん]しかありません。", "a": "このままでいい", "wrong": ["だけ", "から", "より"], "en": "I have only 100 yen.", "why": "しか goes with a negative verb." },
        { "s": "テレビはぜんぜん見[み]ません。", "a": "あまり", "wrong": ["このままでいい", "だけ", "しか"], "en": "I do not watch much television.", "why": "あまり is not much. ぜんぜん is not at all." },
        { "s": "日曜日[にちようび]しか休[やす]みます。", "a": "だけ", "wrong": ["このままでいい", "あまり", "ぜんぜん"], "en": "I only take Sunday off.", "why": "休みます is positive, so だけ." }
      ]
    },
    {
      "id": "owari",
      "ja": "ね・よ・か",
      "en": "At the end",
      "lede": "か asks. ね asks you to agree. よ tells you something new.",
      "marks": [
        ["か", "at the end makes a question."],
        ["ね", "asks the listener to agree."],
        ["よ", "tells the listener something they may not know."],
        ["の", "softens a question. It sounds casual."]
      ],
      "egs": [
        ["日本語[にほんご]は楽[たの]しいですか。", "Is Japanese fun?"],
        ["日本語[にほんご]は楽[たの]しいですね。", "Japanese is fun, is it not?"],
        ["あのみせは安[やす]いですよ。", "That shop is cheap, you know."],
        ["あした来[く]るの。", "Are you coming tomorrow?"]
      ],
      "drill": [
        { "s": ["何年生[なんねんせい]です", "。"], "a": "か", "wrong": ["ね", "よ", "も"], "en": "What year are you in?", "why": "か makes it a question." },
        { "s": ["いい天気[てんき]です", "。"], "a": "ね", "wrong": ["か", "よ", "も"], "en": "Lovely weather, is it not?", "why": "ね asks you to agree." },
        { "s": ["この店[みせ]は安[やす]いです", "。"], "a": "よ", "wrong": ["か", "ね", "も"], "en": "This shop is cheap, you know.", "why": "よ tells them something new." },
        { "s": ["あした来[く]る", "。"], "a": "の", "wrong": ["か", "ね", "よ"], "en": "Are you coming tomorrow?", "why": "の softens a question in casual speech." },
        { "s": ["すみません、これはいくらです", "。"], "a": "か", "wrong": ["ね", "よ", "の"], "en": "Excuse me, how much is this?", "why": "A question takes か." }
      ],
      "fix": [
        { "s": "日本語[にほんご]は楽[たの]しいですか。", "a": "ね", "wrong": ["このままでいい", "よ", "の"], "en": "Japanese is fun, is it not?", "why": "ね asks them to agree." },
        { "s": "いい天気[てんき]ですね。", "a": "このままでいい", "wrong": ["か", "よ", "の"], "en": "Lovely weather, is it not?", "why": "ね asks you to agree." },
        { "s": "この店[みせ]は安[やす]いですね。", "a": "よ", "wrong": ["このままでいい", "か", "の"], "en": "This shop is cheap, you know.", "why": "よ tells them something new." },
        { "s": "何年生[なんねんせい]ですね。", "a": "か", "wrong": ["このままでいい", "よ", "の"], "en": "What year are you in?", "why": "A question takes か." }
      ]
    },
    {
      "id": "waga",
      "ja": "は と が",
      "en": "Topic and subject",
      "lede": "は says what the sentence is about. が marks the new information.",
      "marks": [
        ["は", "marks the topic: what the sentence is about."],
        ["が", "marks the subject, and the new information."],
        ["が", "answers a question word: だれが, なにが."],
        ["が", "marks the thing with 好き, きらい, 上手, 下手 and できます."],
        ["は", "marks a contrast: コーヒーは飲みません."]
      ],
      "egs": [
        ["わたしは学生[がくせい]です。", "I am a student. は sets the topic."],
        ["だれが来[き]ましたか。", "Who came? が goes with the question word."],
        ["日本語[にほんご]が上手[じょうず]ですね。", "You are good at Japanese. 上手 takes が."],
        ["へやにねこがいます。", "There is a cat in the room. が is the new thing."],
        ["ぞうははなが長[なが]いです。", "An elephant has a long nose. は the topic, が the part."]
      ],
      "drill": [
        { "s": ["わたし", "十年生[じゅうねんせい]です。"], "a": "は", "wrong": ["が", "を", "に"], "en": "I am in Year 10.", "why": "は sets the topic." },
        { "s": ["だれ", "来[き]ましたか。"], "a": "が", "wrong": ["は", "を", "に"], "en": "Who came?", "why": "A question word takes が." },
        { "s": ["日本語[にほんご]", "上手[じょうず]ですね。"], "a": "が", "wrong": ["を", "に", "で"], "en": "You are good at Japanese.", "why": "上手 takes が." },
        { "s": ["へやにねこ", "います。"], "a": "が", "wrong": ["は", "を", "に"], "en": "There is a cat in the room.", "why": "が marks the new thing." },
        { "s": ["日本語[にほんご]", "できます。"], "a": "が", "wrong": ["を", "に", "で"], "en": "I can speak Japanese.", "why": "できます takes が." },
        { "s": ["ぞう", "はなが長[なが]いです。"], "a": "は", "wrong": ["が", "を", "に"], "en": "An elephant has a long nose.", "why": "は sets the topic, が marks the part." },
        { "s": ["きょう", "いい天気[てんき]です。"], "a": "は", "wrong": ["が", "を", "に"], "en": "Today the weather is good.", "why": "は sets the topic." },
        { "s": ["あの人[ひと]", "先生[せんせい]です。"], "a": "は", "wrong": ["が", "を", "に"], "en": "That person is the teacher.", "why": "は sets the topic." }
      ],
      "fix": [
        { "s": "日本語[にほんご]を上手[じょうず]です。", "a": "が", "wrong": ["このままでいい", "は", "に"], "en": "I am good at Japanese.", "why": "上手 takes が." },
        { "s": "だれは来[き]ましたか。", "a": "が", "wrong": ["このままでいい", "を", "に"], "en": "Who came?", "why": "A question word takes が." },
        { "s": "わたしは学生[がくせい]です。", "a": "このままでいい", "wrong": ["が", "を", "に"], "en": "I am a student.", "why": "は sets the topic." },
        { "s": "すしを好[す]きです。", "a": "が", "wrong": ["このままでいい", "は", "に"], "en": "I like sushi.", "why": "好き takes が." },
        { "s": "きょうがいい天気[てんき]です。", "a": "は", "wrong": ["このままでいい", "を", "に"], "en": "Today the weather is good.", "why": "は sets the topic." },
        { "s": "ぞうがはなが長[なが]いです。", "a": "は", "wrong": ["このままでいい", "を", "に"], "en": "An elephant has a long nose.", "why": "は sets the topic, が marks the part." }
      ]
    }
  ]
};
