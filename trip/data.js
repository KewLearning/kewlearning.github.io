/* ============================================================================
   Japan Study Tour 2026 — content
   ----------------------------------------------------------------------------
   The teacher edits THIS file. Nothing here is code you have to understand: it is
   lists of things with labels on them. index.html never needs touching to add
   a sight, a spot or a phrase.

   Conventions, fixed by the teacher:
     - Instructions and body copy in English. Students are Years 8-11.
     - Headings bilingual, JAPANESE FIRST, then English.
     - Every spot ends with a "look" line: something to go and do, so the phone
       sends them back to the real thing instead of holding them.
     - AU spelling. No em dashes in anything a student reads.
     - `photo` is a filename in this folder, or null. Null renders a labelled
       placeholder, so the app works today and improves when photos land.
     - Any `intro`, `hook` or `look` can be followed by `introJa`, `hookJa` or
       `lookJa`: the same paragraph in Japanese, printed under the English so
       a student can hand the phone to their host family. Soja has the full
       set. Everywhere else the field is simply absent and nothing prints.
       This Japanese is written for an adult native reader, not for the
       students, so it carries ordinary kanji and no furigana.
   ========================================================================== */

window.TRIP = {
  title: { ja: "日本研修旅行", en: "Japan Study Tour" },
  year: 2026,
  // Departure and return, used to work out "which day are we up to".
  start: "2026-09-20",
  end: "2026-10-01",

  days: [
    { n: 1,  date: "2026-09-20", ja: "しゅっぱつ",        en: "Melbourne to Singapore",  note: "Depart Melbourne 18:25. Overnight on the plane.",
      q: "You go through Changi at about two in the morning. Find one sign with more than two writing systems on it. Work out which ones they are, and who each one is there for.",
      j: "Write down the last thing you did before you left the house this morning, and the one thing you think you will miss first. You will read this again on the last day." },
    { n: 2,  date: "2026-09-21", ja: "きょうと",          en: "Arrive Kansai, on to Kyoto", note: "Land at Kansai 08:50. Train to Kyoto, then sightseeing.",
      q: "You have been in Japan about an hour when you get on the train to Kyoto. Before you arrive, find one thing on that train that no Melbourne train has. There are several, and one of them is a sound.",
      j: "You have been in Japan for one day. Write the first five things you noticed, in the order you noticed them. Do not tidy the list up afterwards, and do not try to make it sound clever." },
    { n: 3,  date: "2026-09-22", ja: "きょうと",          en: "Kyoto",                   note: "Full day in Kyoto.",
      q: "Go a little way up through the torii at Fushimi Inari, then turn round and look at the backs of the gates. There is writing on every one. Work out what it is for.",
      j: "You saw a great deal today. Pick the single moment you would describe to someone at home, and write it so they can see it. Not a list of places." },
    { n: 4,  date: "2026-09-23", ja: "ひめじ・ひろしま",  en: "Kyoto, Himeji, Hiroshima", note: "Bullet train. Himeji Castle on the way. Peace Park and museum in the afternoon. Night in Hiroshima.",
      q: "The white walls at Himeji have holes cut in them, and they are not all the same shape. Find two different shapes and work out why a castle would want both.",
      j: "Today you saw a castle built for a war and a park built after one. Write about the second half of the day. Take as long as you need, and do not worry about getting it right." },
    { n: 5,  date: "2026-09-24", ja: "みやじま・そうじゃ", en: "Miyajima, then Soja",     note: "Miyajima in the morning. Reach Soja late afternoon for the welcome, then home with your host family.",
      q: "The shrine at Miyajima is built out over the water on legs. Look down through the gaps in the floorboards. Why would you build a floor that lets the sea come up through it?",
      j: "Tonight is your first night in someone else's house, in a language you are still learning. Write what the evening was actually like, awkward bits included. Those are the parts you will laugh about later." },
    { n: 6,  date: "2026-09-25", ja: "そうじゃ",          en: "Soja: sister school",     note: "First day at the sister school. Welcome assembly, classes with your buddy, and trying on yukata in the afternoon.",
      q: "This school has no cleaners. Find out when the cleaning happens and what your buddy's job is. Ask if you can have a job too.",
      j: "Write about your buddy: not what they did today, but what they are like. You have only known them a day, so guess, and say what made you guess it." },
    { n: 7,  date: "2026-09-26", ja: "そうじゃ",          en: "Soja",                    note: "Out around Soja with your buddies: a grape farm, lunch, and making wagashi.",
      q: "The wagashi you make today is supposed to look like something from this time of year. Work out which season your sweet is meant to be, and what in it tells you.",
      j: "Today was made of small things: a farm, a lunch, a sweet you made yourself. Write about the one that surprised you, and what you had expected instead." },
    { n: 8,  date: "2026-09-27", ja: "そうじゃ",          en: "Soja",                    note: "The whole day with your host family.",
      q: "You have been in this house a few days now. Find three things about it that no house in Melbourne has. The bathroom alone will give you one.",
      j: "A whole day with your host family and nothing scheduled. Write about one conversation you had, and about the one thing you wanted to say and could not. How did you get round it?" },
    { n: 9,  date: "2026-09-28", ja: "そうじゃ",          en: "Soja",                    note: "Out to Soja Itsutsuboshi Gakuen for the day, and back to school mid afternoon.",
      q: "This is the second Japanese school you have been inside. Find one thing it does differently from the sister school, and one thing it does exactly the same.",
      j: "You have now been inside two Japanese schools. Write what you think school is for here, then what you think it is for at home. You are allowed to be unsure, and saying so is better than pretending." },
    { n: 10, date: "2026-09-29", ja: "そうじゃ",          en: "Soja: farewell party",    note: "Tea ceremony and calligraphy, the farewell assembly, then the party in the evening. Your dashimono is tonight.",
      q: "In the tea ceremony you turn the bowl before you drink. Watch which way, and how far. Then work out why the bowl has a front at all.",
      j: "You said goodbye twice today, once in front of the school and once over dinner. Write about the harder one, and why it was harder." },
    { n: 11, date: "2026-09-30", ja: "こうべ",            en: "Soja, Kobe, fly out",     note: "Leave Soja 08:30. Motomachi in Kobe, then Kansai Airport.",
      q: "Kobe was one of the first ports Japan opened to foreigners, and you can still see that in Motomachi. Find a building that does not look Japanese. Then find a second one, and guess how old they both are.",
      j: "This morning you left a house that was a stranger's a week ago. Write down what you said when you left, and what you wish you had said." },
    { n: 12, date: "2026-10-01", ja: "メルボルン",        en: "Home",                    note: "Arrive Melbourne 11:00.",
      q: "You land at eleven in the morning, back in the city you have lived in your whole life. On the way out of the airport, notice one ordinary thing about Melbourne that you have never once noticed before. If you can find one, the trip has changed the way you see home.",
      j: "Find what you wrote on the first day about what you would miss. Read it. Now write whether you were right, and what you turned out to miss instead." }
  ]
};

/* ---------------------------------------------------------------------------
   PLACES
   Each place holds sights. Each sight holds spots: the individual things a
   student can stand in front of and tap.
   ------------------------------------------------------------------------- */
window.PLACES = [

  /* ==================== KYOTO ==================== */
  {
    id: "kyoto",
    ja: "京都",
    en: "Kyoto",
    days: "Days 2 and 3",
    intro:
      "Japan's capital for over a thousand years, and the city that got left off the bombing list in 1945, which is why so much of it is still standing. Fushimi Inari and Nishiki Market are in, because the group asked for them. How much else we fit depends on how the two days go.",
    sights: [
      {
        id: "kiyomizu",
        ja: "清水寺",
        en: "Kiyomizu-dera",
        photo: "photos/kyoto-kiyomizu.webp",
            credit: "Kiyomizu-dera, via World History Encyclopedia.",
        intro:
          "A temple hanging off the side of a hill on a platform of wooden pillars. " +
          "It has been rebuilt many times. The current main hall dates from 1633.",
        spots: [
          {
            id: "butai",
            ja: "舞台",
            en: "The stage",
            photo: "photos/kyoto-butai.webp",
            credit: "Kiyomizu-dera, via World History Encyclopedia.",
            hook:
              "You are standing on a wooden platform about 13 metres above the hillside, held up by a lattice of huge zelkova pillars, the tallest of them over 12 metres. There is not a single nail in the frame holding it together. It is all joinery, cut so the timbers lock into each other. In the Edo period there was a superstition that if you jumped off and survived, your wish would be granted. Records say 234 people tried it. Most of them lived, because of the trees below. It is banned now.",
            look:
              "Look over the rail and find where the pillars meet. See if you can " +
              "spot a single bolt or bracket."
          },
          {
            id: "otowa",
            ja: "音羽の滝",
            en: "The Otowa waterfall",
            photo: "photos/kyoto-otowa.webp",
            credit: "Otowa waterfall, photo by Angus Kirk via Flickr.",
            hook:
              "Three streams of water fall into a pool, and you drink from one with a cup on a long pole. Each stream is supposed to give you a different thing: long life, success at school, or luck in love. The catch is that drinking from all three is considered greedy, and picking two is pushing it. The temple was built around this spring in 778, and it has not stopped running since.",
            look:
              "Watch which stream the queue goes for. Then decide which one you " +
              "would actually pick, and why."
          },
          {
            id: "jishu",
            ja: "地主神社",
            en: "Jishu Shrine",
            photo: "photos/kyoto-jishu.webp",
            credit: "Jishu Shrine, photo by Angus Kirk via Flickr.",
            hook:
              "A small shrine behind the main hall with two stones set about 10 " +
              "metres apart. The idea is that you walk from one to the other with " +
              "your eyes shut. Make it, and love goes well for you. If a friend " +
              "has to steer you, you will need a go-between in real life too. It " +
              "has been shut for restoration since 2022 and the shrine has not " +
              "set a reopening date, so it will be closed when we come through. " +
              "The stones are still in there, just out of reach.",
            look:
              "Pace out 10 metres somewhere flat and out of the crowd, shut your " +
              "eyes and try it with a friend walking beside you. It is further " +
              "than it sounds."
          },
          {
            id: "sannenzaka",
            ja: "三年坂",
            en: "The approach streets",
            photo: "photos/kyoto-sannenzaka.webp",
            credit: "Sannenzaka in the rain, via Flickr.",
            hook:
              "The stone lanes below the temple are called Sannenzaka and Ninenzaka, and the buildings along them are protected, which is why there are no tall signs and the vending machines are painted brown. Sannenzaka means three-year slope, and there is an old joke that tripping on it costs you three years of bad luck. Really it is a warning to watch your feet: the steps are worn smooth and people come down them looking at their phones.",
            look:
              "Find a vending machine or a convenience store sign and notice what " +
              "colour it is here compared with everywhere else in Japan."
          }
        ]
      },
      {
        id: "kinkakuji",
        ja: "金閣寺",
        en: "Kinkaku-ji, the Golden Pavilion",
        photo: "photos/kyoto-kinkakuji.webp",
        intro:
          "A three-storey pavilion with gold leaf on its top two floors, sitting " +
          "on the edge of a pond that reflects it.",
        spots: [
          {
            id: "gold",
            ja: "金箔",
            en: "The gold",
            photo: "photos/kyoto-kinkakuji.webp",
            hook:
              "The top two floors are wrapped in gold leaf, and the leaf used in " +
              "the 1987 restoration was five times thicker than the original. The " +
              "three floors are deliberately in three different architectural " +
              "styles stacked on top of each other: an aristocrat's palace at the " +
              "bottom, a samurai house in the middle, a Chinese Zen hall on top. " +
              "It is one building showing off three different kinds of power at " +
              "once.",
            look:
              "Look at the three storeys separately. The windows change on every " +
              "level. See if you can spot where one style stops and the next starts."
          },
          {
            id: "fire",
            ja: "放火事件",
            en: "It burned down in 1950",
            photo: "photos/kyoto-kinkakuji-garden.webp",
            hook:
              "What you are looking at is not old. In 1950 a young monk who lived at the temple set fire to it on purpose, and was caught that evening on the hill behind. The whole building was gone inside an hour. It was rebuilt in 1955 from drawings and photographs, and Mishima turned the story into one of the most famous novels in Japan.",
            look:
              "Everyone photographs the front from the pond. Turn around and look " +
              "at the hill behind instead."
          }
        ]
      },
      {
        id: "fushimi",
        ja: "伏見稲荷大社",
        en: "Fushimi Inari Taisha",
        photo: "photos/kyoto-fushimi-torii.webp",
        intro:
          "The shrine with the tunnel of orange gates, and the one the group asked for. It is dedicated to Inari, the kami of rice. Rice meant wealth, so Inari became the kami of business as well, and still is. Open all hours, free to walk into, and busier than anywhere else you will go in Kyoto.",
        spots: [
          {
            id: "senbon",
            ja: "千本鳥居",
            en: "The thousand gates",
            photo: "photos/kyoto-fushimi-torii.webp",
            hook:
              "Senbon torii means a thousand gates, and it undersells it: there " +
              "are around ten thousand up the mountain. Every one was paid for " +
              "by somebody. A company or a family donates a gate to say thank " +
              "you for something that went well, or to ask for something that " +
              "has not yet, and the bigger the gate the more it cost. They are " +
              "repainted and replaced constantly, so the tunnel you walk through " +
              "is never quite the same one twice.",
            look:
              "Walk a little way in, then turn around and look at the backs of the gates. The front is plain orange. The back carries the name of whoever paid for it and the date. You are walking through a list of people's hopes."
          },
          {
            id: "kitsune",
            ja: "きつね",
            en: "The foxes",
            photo: "photos/kyoto-fushimi-kitsune.webp",
            hook:
              "Foxes are everywhere here, in stone, in pairs, wearing red bibs. " +
              "They are not Inari. They are Inari's messengers, and the red bib " +
              "is an offering, the same kind people tie on roadside statues. " +
              "Look at what each fox has in its mouth: a key, a jewel, a scroll, " +
              "or a sheaf of rice. The key is for the rice granary.",
            look:
              "Find a fox holding a key and a fox holding a sheaf of rice. They " +
              "are usually a pair, one either side of a gate, and they are not " +
              "holding the same thing."
          },
          {
            id: "yotsutsuji",
            ja: "四つ辻",
            en: "How far to go up",
            photo: null,
            hook:
              "The whole mountain circuit is about four kilometres and takes two " +
              "to three hours. Almost nobody does it, and you will not be doing " +
              "it either. About half an hour up there is a junction called " +
              "Yotsutsuji where the trees open out and the whole of Kyoto is laid " +
              "out below you. That is the place to stop. Past it the crowds " +
              "thin out fast, which tells you something about how far most " +
              "people get.",
            look:
              "Climb to Yotsutsuji if there is time, and look back over the city " +
              "before you turn around. Check with a teacher before going any " +
              "further up than that."
          }
        ]
      },
      {
        id: "nishiki",
        ja: "錦市場",
        en: "Nishiki Market",
        photo: "photos/kyoto-nishiki.webp",
        credit: "Nishiki Market, via Wikimedia Commons.",
        intro:
          "A covered lane four hundred metres long, packed with food stalls, and " +
          "the other thing the group asked for. It has been a market here for " +
          "about four hundred years and some of the shops have been run by the " +
          "same families for generations. Kyoto people call it 京の台所, Kyoto's " +
          "kitchen.",
        spots: [
          {
            id: "daidokoro",
            ja: "京の台所",
            en: "Kyoto's kitchen",
            photo: null,
            hook:
              "This is not a food court built for visitors. It is where Kyoto " +
              "restaurants have bought their ingredients for centuries, and a " +
              "lot of what is on the counters is here for the chefs rather than " +
              "for you: yuba, the skin lifted off heated soy milk, fresh tofu, " +
              "sea bream, sweet rolled omelette cooked in front of you. The " +
              "narrowness is the point. The lane was never widened because the " +
              "shops never moved.",
            look:
              "Find something on a counter you genuinely cannot identify, and " +
              "ask what it is: これはなんですか。Somebody will tell you, and " +
              "possibly hand you a piece."
          },
          {
            id: "tsukemono",
            ja: "つけもの",
            en: "The pickles",
            photo: null,
            hook:
              "Kyoto is famous for pickles and you will smell the shops before " +
              "you reach them. Vegetables buried in salt, rice bran or miso for " +
              "days or months until they turn into something else entirely. " +
              "Shibazuke is purple and sharp, senmaizuke is thin white sheets of " +
              "turnip, takuan is the bright yellow daikon that comes with school " +
              "lunch. Most shops have a dish of samples out on the counter.",
            look:
              "Try a sample of something you are fairly sure you will not like. " +
              "That is how most people find out they do."
          },
          {
            id: "tabearuki",
            ja: "たべあるき",
            en: "Do not eat as you walk",
            photo: null,
            hook:
              "This is the one rule the market cares about, and there are signs " +
              "all the way along asking for it. If you buy something hot, eat it " +
              "standing at the shop you bought it from, then move on. The lane is " +
              "narrow and shoulder to shoulder, and a skewer of something oily " +
              "held at chest height in that crowd ends up on somebody's clothes. " +
              "Shops leave a space at the front for exactly this.",
            look:
              "Buy one thing, eat it where you bought it, and put the stick or " +
              "the wrapper in that shop's bin before you walk on. There are " +
              "almost no public bins, so it has to go back to the shop."
          }
        ]
      },
      {
        id: "nijo",
        ja: "二条城",
        en: "Nijo Castle",
        meta: "not on the 2026 itinerary",
        photo: "photos/kyoto-nijo.webp",
        credit: "Nijo Castle, via Wikimedia Commons.",
        intro:
          "The shogun's residence in Kyoto, built in 1603, and the room where the last shogun handed power back to the Emperor in 1867. We are not going in 2026: asked what it wanted from the two days, the group picked Fushimi Inari and Nishiki Market instead, which is a fair call. It stays in the app because it is worth knowing about, and because it is a twenty minute walk from Nijo-jo-mae station if a future group wants it.",
        spots: [
          {
            id: "uguisu",
            ja: "うぐいす張り",
            en: "The nightingale floors",
            photo: null,
            hook:
              "The corridor floors chirp when you walk on them. Nails under the " +
              "boards rub against a clamp and squeak, and the sound is close " +
              "enough to a bird that it is called uguisubari, nightingale floor. " +
              "The usual story is that it was an alarm system against assassins. " +
              "Historians argue about whether it was designed that way or just " +
              "what happens when floorboards age. Either way, you cannot cross it " +
              "quietly, and people have tried.",
            look:
              "Try to walk five steps without making a sound. Then watch someone " +
              "else attempt it."
          }
        ]
      }
    ]
  },

  /* ==================== HIMEJI ==================== */
  {
    id: "himeji",
    ja: "姫路",
    en: "Himeji",
    days: "Day 4, on the way to Hiroshima",
    intro:
      "We stop here between Kyoto and Hiroshima to see the best surviving castle " +
      "in Japan. Most Japanese castles you see are concrete rebuilds. This one is " +
      "not.",
    sights: [
      {
        id: "himejijo",
        ja: "姫路城",
        en: "Himeji Castle",
        photo: "photos/himeji-castle.webp",
            credit: "Himeji Castle, photo by jpellgen via Flickr.",
        intro:
          "Built in its current form in 1609. It is a World Heritage site and a " +
          "National Treasure.",
        spots: [
          {
            id: "shirasagi",
            ja: "白鷺城",
            en: "Why it is white",
            photo: null,
            hook:
              "Its nickname is Shirasagi-jo, the white heron castle, because of " +
              "the colour and the way the roofs spread like wings. The white is " +
              "plaster, and it is not decoration: it is fireproofing, spread over " +
              "the timber and even over the roof tile joints. After the 2009 to " +
              "2015 restoration it came back so bright that people complained it " +
              "looked fake. It has since weathered down.",
            look:
              "Get far enough back to see the whole thing at once, then find the " +
              "line of the roofs. That is where the heron comes from."
          },
          {
            id: "maze",
            ja: "迷路",
            en: "The path is a trap",
            photo: "photos/himeji-approach.webp",
            hook:
              "The path up to the keep feels like it is wandering. It is. The approach spirals, doubles back and squeezes through narrow gates, all designed so an attacking army gets strung out, confused and stuck under fire from above. It works so well that visitors still get turned around. Nobody ever fought their way in. When an army finally fired on it, in 1868, the castle gave up before a battle started, so the maze was never really tested.",
            look:
              "As you climb, count the gates you pass through and notice how many times you change direction. Some of the last gates before the keep are under scaffolding this year, so the squeeze may be tighter or the route may bend around them. Count them anyway."
          },
          {
            id: "survived",
            ja: "戦火と地震",
            en: "It should not still be here",
            photo: null,
            hook:
              "Himeji was firebombed in 1945 and the city around the castle was " +
              "flattened. A bomb landed on the keep and did not go off. In 1995 " +
              "the Kobe earthquake hit hard enough to destroy motorways nearby, " +
              "and the castle stood. Local people say a bottle of sake left on an " +
              "altar in the keep did not even fall over.",
            look:
              "Look out from the top over the city. Almost everything you can see " +
              "is newer than the building you are standing in."
          },
          {
            id: "ishiotoshi",
            ja: "石落とし",
            en: "The stone drops",
            photo: "photos/himeji-ishiotoshi.webp",
            hook:
              "Low down on the walls there are hatches that open straight " +
              "downwards, called ishi-otoshi, stone drops. Defenders opened them " +
              "and dropped rocks, or worse, on anyone at the base of the wall. " +
              "There are also small holes all over the walls, some round, some " +
              "triangular, some square, and a few tall thin slots. Those are sama, " +
              "firing ports. The tall slots were for archers. The small shapes " +
              "were all for matchlock guns.",
            look:
              "Find all four shapes: a circle, a triangle, a square and a tall " +
              "slot. Only one of them is for an archer. Work out why a bow needs " +
              "that shape and a gun does not."
          }
        ]
      }
    ]
  },

  /* ==================== HIROSHIMA ====================
     tone:"quiet" changes the whole skin and swaps the go-and-do prompt. This
     is the one place on the tour that is a memorial rather than a sight, and
     the app has to say so before a student reads a word. */
  {
    id: "hiroshima",
    ja: "広島",
    en: "Hiroshima",
    days: "Day 4, Wednesday afternoon",
    tone: "quiet",
    intro:
      "On the morning of 6 August 1945 an atomic bomb was dropped on this city. " +
      "It detonated about 600 metres above the ground at 8:15. Tens of " +
      "thousands of people were killed immediately, and tens of thousands more " +
      "died afterwards. The Peace Memorial Park is built on the ground where it " +
      "happened.",
    note:
      "This is not a sightseeing stop and the app is deliberately different " +
      "here. Some of what is in the museum is very hard to look at, and there " +
      "is no shame at all in stepping outside for a while. Tell a teacher if " +
      "you need to. People whose families died here still visit, so keep your " +
      "voice down and think about whether a photo is the right thing before " +
      "you take it.",
    sights: [
      {
        id: "peace-park",
        ja: "平和記念公園",
        en: "Peace Memorial Park",
        photo: "photos/hiroshima-dome.webp",
        hero: "photos/hiroshima-now-and-then.webp",
        credit: "The same ground now and in 1945. Composite by Angus Kirk via Flickr.",
        intro:
          "An open park in the middle of a busy modern city. Before 1945 this " +
          "was the commercial heart of Hiroshima, full of shops and houses.",
        spots: [
          {
            id: "dome",
            ja: "原爆ドーム",
            en: "The A-Bomb Dome",
            photo: "photos/hiroshima-dome.webp",
            hook:
              "It was the Hiroshima Prefectural Industrial Promotion Hall, " +
              "finished in 1915 and designed by a Czech architect, Jan Letzel. " +
              "The bomb went off almost directly above it, 600 metres up and " +
              "about 160 metres to the south east. Everyone inside was killed " +
              "instantly. The reason " +
              "any of it is still standing is that the blast came almost " +
              "straight down rather than sideways, so the walls were pushed " +
              "down into their own foundations instead of being knocked over. " +
              "Hiroshima argued for years about whether to pull it down. It was " +
              "kept, and made a World Heritage site in 1996.",
            look:
              "Look at the buildings behind it. Everything you can see was built " +
              "after 1945. This is the only thing left standing from the city " +
              "that was here before."
          },
          {
            id: "cenotaph",
            ja: "慰霊碑",
            en: "The Cenotaph",
            photo: "photos/hiroshima-cenotaph.webp",
            hook:
              "The stone arch holds a register of the names of everyone known " +
              "to have died because of the bomb, and names are still being " +
              "added as people die of illnesses caused by it. The inscription " +
              "reads 安らかに眠って下さい 過ちは繰返しませぬから. It is usually " +
              "translated as: rest in peace, for the error shall not be " +
              "repeated. Notice that it does not say who made the error. That " +
              "was deliberate, and people have argued about it ever since.",
            look:
              "Stand square in front of the arch and look through it. The flame " +
              "and the Dome line up in the opening. The park was laid out that " +
              "way on purpose."
          },
          {
            id: "children",
            ja: "原爆の子の像",
            en: "The Children's Peace Monument",
            photo: "photos/hiroshima-children.webp",
            credit: "The Children's Peace Monument, photo by photo_fiend via Flickr.",
            hook:
              "Sadako Sasaki was two when the bomb fell and seemed unhurt. Ten " +
              "years later she developed leukaemia. She folded paper cranes in " +
              "hospital, because of a belief that a thousand cranes earns you a " +
              "wish, and she died in 1955 aged twelve. Her classmates campaigned " +
              "for a monument to all the children who died. Schools around the " +
              "world still send folded cranes here, and the glass cases beside " +
              "the statue hold them.",
            look:
              "Look at the cases and find cranes that came from somewhere you recognise. Then put Sadako's age next to your own."
          },
          {
            id: "flame",
            ja: "平和の灯",
            en: "The Flame of Peace",
            photo: "photos/hiroshima-flame.webp",
            credit: "The Flame of Peace, with the museum behind it. Via Wikimedia Commons.",
            hook:
              "It has been alight since 1964, and it is meant to burn until the last nuclear weapon on earth is gone. That has not happened, so it is still lit.",
            look:
              "It is a promise nobody has managed to keep yet. Decide what you think about that while you are standing in front of it."
          },
          {
            id: "museum",
            ja: "平和記念資料館",
            en: "The museum",
            photo: "photos/hiroshima-museum.webp",
            credit: "Hiroshima Peace Memorial Museum, via Wikimedia Commons.",
            hook:
              "The museum is mostly ordinary objects that belonged to ordinary " +
              "people: a child's tricycle, a burnt school lunchbox, a watch " +
              "stopped at 8:15, clothing, drawings made by survivors from " +
              "memory. It does not use many statistics. It makes its case by " +
              "showing you one person at a time, which is why it affects people " +
              "so strongly. Take your time and read the small labels.",
            look:
              "If it gets to be too much, step outside and sit down. Plenty of adults do the same. Tell a teacher if you would rather not be on your own."
          },
          {
            id: "after",
            ja: "そのあとの広島",
            en: "The city that came back",
            photo: null,
            hook:
              "It was said at the time that nothing would grow here for seventy years. Trees inside the blast zone budded again the next spring, and some of them are still alive and marked around the city. Hiroshima today is an ordinary, busy, well-liked city of over a million people, famous for its own style of okonomiyaki and for a baseball team people are very serious about.",
            look:
              "When you leave the park, look at the ordinary city going on around it. The contrast is not an accident. It is the point."
          }
        ]
      }
    ]
  },

  /* ==================== MIYAJIMA ==================== */
  {
    id: "miyajima",
    ja: "宮島",
    en: "Miyajima",
    days: "Day 5, morning",
    intro:
      "An island in the Inland Sea with a shrine built out over the water. We get " +
      "here by ferry, then head to Soja in the afternoon.",
    sights: [
      {
        id: "itsukushima",
        ja: "厳島神社",
        en: "Itsukushima Shrine",
        photo: "photos/miyajima-torii.webp",
        hero: "photos/miyajima-itsukushima.webp",
        credit: "Itsukushima Shrine, via Wikimedia Commons.",
        intro:
          "A shrine on stilts over the sea, with a gate standing in the water in " +
          "front of it. World Heritage listed.",
        spots: [
          {
            id: "torii",
            ja: "大鳥居",
            en: "The floating gate",
            photo: "photos/miyajima-torii.webp",
            hook:
              "The great gate is about 16 metres tall and it is not bolted or " +
              "sunk into the seabed. It stands there under its own weight. The " +
              "main pillars are single camphor trunks, and the top box is packed " +
              "with stones to hold it down. Finding trees big enough is the reason " +
              "it takes years to replace. The current one went up in 1875.",
            look:
              "Check whether the tide is in or out. At low tide you can walk out " +
              "and stand under it, which is a completely different experience."
          },
          {
            id: "shio",
            ja: "しお",
            en: "The tide on our morning",
            photo: "photos/miyajima-itsukushima.webp",
            credit: "Itsukushima Shrine, via Wikimedia Commons.",
            hook:
              "The sea here moves about three metres between high and low, and it " +
              "changes the place completely. On our morning the tide is in. High " +
              "water is at 8:07 and the shrine floats from around six until ten, " +
              "which is the whole time we are on the island. So you are getting it " +
              "exactly as the picture above.\n" +
              "That is not the consolation prize. It is the version the shrine was " +
              "built for. The stilts, the gap under the corridors, the gate out in " +
              "the channel: none of it makes sense on dry land, and all of it was " +
              "designed to be met by boat with the water up. At high tide the " +
              "building is doing its job. Later in the day the sea goes out and " +
              "people walk across the sand to stand under the gate, which is a " +
              "good thing to do and a completely different island. We will be on " +
              "the road to Soja by then. It will keep.",
            look:
              "Look along the corridors from the side and find where the water " +
              "meets the floorboards. There is almost nothing between them. Then " +
              "look out at the gate standing in open water and remember that in " +
              "six hours you could have walked to it.",
            link: { url: "https://www.miyajima.or.jp/english/sio/sio.php",
                    label: "Check the tide yourself" }
          },
          {
            id: "why-water",
            ja: "なぜ海の上",
            en: "Why it is built over water",
            photo: "photos/miyajima-low-tide.webp",
            hook:
              "The whole island was treated as a god, not just a place where a god " +
              "lived. That meant ordinary people were not supposed to set foot on " +
              "it. Building the shrine out over the water was the way around it: " +
              "worshippers arrived by boat and never touched the sacred ground. " +
              "For centuries there were no births and no deaths permitted on the " +
              "island, and people who were dying or about to give birth were taken " +
              "back to the mainland.",
            look:
              "Look at where the buildings meet the water and picture arriving by " +
              "boat, through the gate, instead of walking in."
          },
          {
            id: "deer",
            ja: "しか",
            en: "The deer",
            photo: "photos/miyajima-deer.webp",
            credit: "Deer near the torii gate, via Wikimedia Commons.",
            hook:
              "The deer wander freely. They were once treated as messengers of " +
              "the gods and fed, which is how they ended up living in the streets " +
              "instead of on the mountain, and the town would quite like them to " +
              "go back. They are also completely shameless. They will take a map " +
              "out of your hand, eat a ticket, or go through an open bag. Feeding " +
              "them is not allowed: the whole point is to get them living wild " +
              "again, and a deer that eats paper and plastic gets sick.",
            look:
              "Keep your ferry ticket and your snacks zipped away. Then watch how " +
              "many tourists have not worked this out yet."
          }
        ]
      }
    ]
  },

  /* ==================== SOJA ==================== */
  {
    id: "soja",
    ja: "総社",
    en: "Soja",
    days: "Days 5 to 11, the homestay week",
    intro:
      "This is the part of the trip nobody else gets. Soja Nishi Junior High " +
      "School is our sister school, and the whole week runs through an exchange " +
      "program that Soja City itself operates. Soja Nishi is not the only school " +
      "in it: other junior high schools around the city send their students to " +
      "Kew through the same program. Soja is in Okayama Prefecture, on the " +
      "Kibiji, an old road through rice country. Two things here are genuinely " +
      "significant, and if nobody tells you, you will walk past both of them.",
    introJa: "ここは、ほかの旅行では味わえない一週間です。総社西中学校はキューハイスクールの姉妹校で、この一週間は総社市が運営する交流事業として行われています。参加しているのは総社西中学校だけではなく、市内のほかの中学校からも、同じ事業でキューハイスクールに生徒が来ています。総社は岡山県にあり、田園の中を通る古い道、吉備路沿いの町です。この町には本当に価値のあるものが二つありますが、誰かに教えてもらわなければ、どちらも気づかずに通り過ぎてしまいます。",
    sights: [
      {
        id: "hofukuji",
        ja: "宝福寺",
        en: "Hofukuji Temple",
        photo: "photos/soja-hofukuji-gate.webp",
        intro:
          "A Zen temple just outside town. Japan's greatest ink painter grew up here, and he was born just down the road.",
        introJa: "町のすぐ外にある禅寺です。日本を代表する水墨画家がこの寺で育ちました。生まれたのも、すぐ近くです。",
        spots: [
          {
            id: "sesshu",
            ja: "雪舟",
            en: "The boy who drew with his tears",
            photo: "photos/soja-sesshu-hall.webp",
            credit: "The scene in the hall at Hofukuji.",
            hook:
              "Sesshu was born in 1420 in Akahama, which is now part of Soja, and he was sent to this temple as a small boy. The story is that he kept painting instead of doing his Zen study, so a priest tied him to a pillar as punishment. He cried, and used his toes to draw a mouse on the floor with his own tears. The priest came back, saw the mouse, thought it was real, and let him go. He grew up to be the most famous painter in Japanese history. The picture here is the temple's own telling of it, hanging in the hall you walk into: the boy tied to the pillar, and the mouse on the floor at his feet.",
            hookJa: "雪舟は1420年、今の総社市赤浜に生まれ、幼いころにこの寺に預けられました。伝えられているのは、禅の修行をせずに絵ばかり描いていたため、和尚に柱へ縛りつけられた、という話です。雪舟は泣き、こぼれた涙を足の指につけて、床にねずみを描きました。戻ってきた和尚はそのねずみを本物だと思い、雪舟を許しました。その少年が、のちに日本美術史でもっとも有名な画家になります。ここにある絵は、この寺がその話を伝えているもので、みなさんが入る本堂に掛かっています。柱に縛られた少年と、その足もとの床のねずみが描かれています。",
            look:
              "Find the statue of the boy and the mouse. Then think about the fact " +
              "that he came from the same town as your host family.",
            lookJa: "少年とねずみの像を探してみましょう。そして、その少年がホストファミリーと同じ町の出身だということを考えてみてください。"
          },
          {
            id: "hofukuji-pagoda",
            ja: "三重塔",
            en: "The three-storey pagoda",
            photo: "photos/soja-hofukuji-pagoda.webp",
            hook:
              "This pagoda went up in 1376 and is about 18 metres tall. It is the " +
              "second oldest pagoda in the whole prefecture, it is painted " +
              "vermilion, and the roofs are laid with heavy formal tiles. Here is " +
              "the part worth standing still for: in 1575 the temple was caught in " +
              "the wars and burned. Every other building on this site was " +
              "destroyed. This one was not. Everything else you can see around it " +
              "was built afterwards.",
            hookJa: "この三重塔は1376年に建てられ、高さは約18メートルです。岡山県で二番目に古い塔で、朱塗りで、屋根には重い本瓦が葺かれています。ここで足を止めてほしいのは次のことです。1575年、この寺は戦火に巻き込まれて焼けました。境内のほかの建物はすべて失われましたが、この塔だけは焼け残りました。まわりに見える建物は、すべてそのあとに建てられたものです。",
            look:
              "Stand at the base and look up. Then look at the buildings around it " +
              "and remember they are the replacements. This is the survivor.",
            lookJa: "塔の足もとに立って、見上げてみましょう。そのあとまわりの建物を見て、それがすべて建て直されたものだと思い出してください。生き残ったのは、この塔です。"
          },
          {
            id: "zazen",
            ja: "ざぜん",
            en: "Zazen",
            photo: "photos/soja-hofukuji-garden.webp",
            hook:
              "This is a Rinzai Zen temple, and Zen study here means sitting still " +
              "and doing nothing, on purpose, for a long time. Sitting meditation " +
              "is called zazen. It sounds easy until you try it. If a monk walks " +
              "past with a flat wooden stick, that is a kyosaku, and being tapped " +
              "with it is not a punishment. You ask for it, to help you refocus.",
            hookJa: "ここは臨済宗の禅寺です。ここでの修行は、長いあいだ、わざと何もせずにじっと座ることです。座って行う瞑想を座禅といいます。簡単そうに聞こえますが、やってみると違います。平たい木の棒を持ったお坊さんが横を通ったら、それは警策です。打たれるのは罰ではありません。集中し直すために、自分からお願いするものです。",
            look:
              "Try sitting completely still for two minutes without touching your " +
              "phone. Notice how long two minutes is.",
            lookJa: "スマホに触らずに、二分間まったく動かずに座ってみましょう。二分がどれくらい長いか、感じてみてください。"
          }
        ]
      },
      {
        id: "kokubunji",
        ja: "備中国分寺",
        en: "Bitchu Kokubunji",
        photo: "photos/soja-kokubunji-pagoda.webp",
        intro:
          "The five-storey pagoda standing in the rice fields. It is the symbol of " +
          "this whole area, and it is on an emperor's orders from over 1200 years " +
          "ago.",
        introJa: "田んぼの中に立つ五重塔です。この地域全体の象徴で、もとは1200年以上前の天皇の命令によって建てられた寺です。",
        spots: [
          {
            id: "shomu",
            ja: "聖武天皇",
            en: "An emperor ordered this",
            photo: "photos/soja-emperor-shomu.webp",
            fit: "contain",
            credit: "Portrait of Emperor Shomu, 701 to 756. Public domain, via Wikimedia Commons.",
            hook:
              "In 741 the Emperor Shomu ordered a temple built in every single " +
              "province in Japan. Not a few. Every one. The country had been " +
              "through disease, famine and revolt, and the plan was to protect the " +
              "whole nation through Buddhism, province by province. These were " +
              "called kokubunji, provincial temples. This is the one for Bitchu " +
              "Province. So this field you are standing in was part of a " +
              "nationwide project ordered from the capital, and the reason it is " +
              "here at all is a decision made in the year 741.",
            hookJa: "741年、聖武天皇は日本のすべての国に寺を建てるよう命じました。いくつかではなく、すべての国にです。当時の日本は疫病、飢饉、反乱に苦しんでおり、仏教の力で国全体を、一国ずつ守ろうという考えでした。こうして建てられた寺を国分寺といいます。ここは備中国の国分寺です。つまり、いま立っているこの場所は、都から命じられた全国規模の事業の一部でした。この寺がここにあるのは、741年の決定によるものです。",
            look:
              "Look around at how much farmland there is. Then think about what it " +
              "took to build something this size out here, that long ago.",
            lookJa: "まわりに広がる田畑の広さを見てみましょう。そして、これほど大きなものを、こんな昔にこの場所に建てるのに何が必要だったか、考えてみてください。"
          },
          {
            id: "kokubunji-pagoda",
            ja: "五重塔",
            en: "The five-storey pagoda",
            photo: "photos/soja-kokubunji-pagoda.webp",
            hook:
              "It is about 34 metres tall and you can see it from a long way off " +
              "across the fields. Be careful with the dates though: the Nara period " +
              "original burned down, and what is standing now was rebuilt in 1843 " +
              "to 1844. That still means it has stood through roughly 180 years of " +
              "typhoons and earthquakes in a country that gets plenty of both. " +
              "Japanese pagodas are famously hard to knock down. The central pillar " +
              "and the loosely stacked storeys let the whole thing sway instead of " +
              "snapping.",
            hookJa: "高さは約34メートルあり、田んぼの向こう、遠くからでも見えます。ただし年代には注意してください。奈良時代の塔は焼失し、今建っているのは1843年から1844年にかけて再建されたものです。それでも、台風も地震も多いこの国で、およそ180年間立ち続けてきたことになります。日本の塔は倒れにくいことで知られています。中心を通る心柱と、ゆるく積み重ねられた各層のおかげで、塔全体が折れずに揺れることができるのです。",
            look:
              "Walk around it and watch how it changes against the sky. This is the " +
              "view on half the postcards in Okayama.",
            lookJa: "塔のまわりを歩いて、空を背にした姿がどう変わるか見てみましょう。岡山の絵はがきの半分は、この景色です。"
          },
          {
            id: "akagome",
            ja: "赤米",
            en: "The red rice, and your timing is good",
            photo: "photos/soja-red-rice.webp",
            hook:
              "The rice planted in front of the temple is akagome, red rice. It is an ancient variety, closer to the wild rice Japan started with than the white rice everyone eats now, and it was once offered to the gods. It is rare. Here is why the timing matters: it turns red as it ripens for about two weeks in the middle of September, and there is a festival for it. We are here from the 24th of September. There is a real chance you will see the field in colour, and most visitors to Japan never do.",
            hookJa: "寺の前に植えられているのは赤米です。古代米の一種で、いま食べられている白米よりも、日本の稲のもとになった野生の品種に近いお米です。昔は神様へのお供えにされていました。今ではめずらしいお米です。うれしいのはここからです。赤米は九月半ばごろの二週間ほど、実るにつれて赤く色づき、その時期にはお祭りも開かれます。私たちがここに来るのは九月二十四日からです。田んぼが色づいているところを見られる可能性は十分にあります。日本を訪れる人のほとんどは、それを見ることがありません。",
            look:
              "Look at the colour of the field in front of the temple, then " +
              "photograph the pagoda with the red rice in the foreground. That " +
              "shot only exists for a couple of weeks a year.",
            lookJa: "寺の前の田んぼの色を見て、手前に赤米を入れて五重塔の写真を撮ってみましょう。この一枚が撮れるのは、一年のうち二週間ほどだけです。"
          }
        ]
      },
      {
        id: "around-soja",
        ja: "そうじゃのまわり",
        en: "Around Soja",
        photo: "photos/soja-muscat-grapes.webp",
        intro:
          "Things that turn up during the homestay week. Okayama grows fruit " +
          "the rest of Japan treats as a luxury.",
        introJa: "ホームステイの一週間のあいだに出会うものです。岡山では、ほかの地域では高級品として扱われる果物が作られています。",
        spots: [
          {
            id: "muscat",
            ja: "マスカット",
            en: "Muscat grapes",
            photo: "photos/soja-muscat-grapes.webp",
            hook:
              "Okayama is the muscat capital of Japan, and the green ones you " +
              "will be handed are Muscat of Alexandria. Almost all of Japan's " +
              "crop comes from this prefecture. They are treated as a gift item " +
              "rather than everyday fruit, and a good bunch in a department " +
              "store can cost more than a nice dinner. The reason they grow here " +
              "is the weather: Okayama calls itself Hare no Kuni, the land of " +
              "sunshine, because it gets so little rain. At the farm you pick " +
              "one bunch. Only one, and that is not stinginess: these are top " +
              "grade grapes and a single good bunch is genuinely expensive.",
            hookJa: "岡山は日本のマスカットの産地として知られ、みなさんが手渡される緑色のぶどうはマスカット・オブ・アレキサンドリアです。日本の収穫量のほとんどがこの県のものです。日常の果物というより贈答品として扱われ、デパートで売られている良い一房は、ちょっとしたごちそうより高いこともあります。ここで育つ理由は天気です。岡山は雨が少ないことから「晴れの国」と呼ばれています。農園で摘むのは一房だけです。けちなのではありません。最高級のぶどうで、良い一房は本当に高価なのです。",
            look:
              "Take your time choosing your one bunch, then say oishii desu to " +
              "whoever hands it to you. Notice how carefully the fruit is " +
              "presented, because presentation is half of it here.",
            lookJa: "一房をゆっくり選びましょう。そして渡してくれた人に「おいしいです」と言ってみてください。果物がどれほどていねいに並べられているかにも注目してください。日本では、見せ方も味と同じくらい大切にされています。"
          }
        ]
      },
      {
        id: "school",
        ja: "総社西中学校",
        en: "Soja Nishi Junior High School",
        photo: null,
        intro:
          "Our sister school. You will be here across several days, in uniform, " +
          "with a buddy. This is not a tour stop. It is a school day.",
        introJa: "キューハイスクールの姉妹校です。数日にわたって、制服を着て、バディと一緒に過ごします。ここは観光地ではありません。ふつうの学校生活です。",
        spots: [
          {
            id: "souji",
            ja: "そうじ",
            en: "The students clean the school",
            photo: null,
            hook:
              "There are no cleaners. At the end of the day everyone stops and " +
              "cleans the school: classrooms, corridors, toilets, the lot. It is " +
              "called souji and it is a normal part of the timetable, not a " +
              "punishment. The thinking is that if you have to clean it, you think " +
              "harder about messing it up. You will be doing it too.",
            hookJa: "この学校に清掃員はいません。一日の終わりに全員が手を止めて、教室も廊下もトイレも、学校じゅうを掃除します。これを掃除といい、罰ではなく、時間割の中にあるふつうの活動です。自分で掃除するなら、汚さないように気をつけるようになる、という考え方です。みなさんも一緒にやります。",
            look:
              "Watch what your buddy picks up without being told. Then do that.",
            lookJa: "バディが言われなくても何を拾っているか、見てみましょう。そして同じことをしてみてください。"
          },
          {
            id: "indoor-shoes",
            ja: "うわばき",
            en: "Shoes off at the door",
            photo: null,
            hook:
              "You swap into indoor shoes at the entrance, and the shoe lockers near the door are called getabako. It is not just schools. It is houses, some restaurants, and temple buildings. The line between outside and inside is taken seriously, and walking in with your outdoor shoes on is about as bad as walking across someone's bed at home.",
            hookJa: "玄関で上履きに履き替えます。入口近くにある靴入れは下駄箱といいます。これは学校だけの習慣ではありません。家でも、一部の飲食店でも、お寺の建物でも同じです。外と内の境目は大切に考えられていて、外靴のまま上がるのは、オーストラリアで人のベッドの上を歩くようなものだと思ってください。",
            look:
              "Check your socks before you leave the house each morning. Holes get " +
              "noticed here.",
            lookJa: "毎朝、家を出る前に靴下を確認しましょう。穴が開いていると、ここではすぐに気づかれます。"
          },
          {
            id: "bukatsu",
            ja: "部活動",
            en: "Club is not really optional",
            photo: null,
            hook:
              "After school almost everyone does bukatsu, a club, and they do it " +
              "seriously: most days, plus weekends, all year. A Japanese student's " +
              "club is closer to a full sporting commitment than a lunchtime " +
              "activity. You are joining two club sessions. You are not expected " +
              "to be good. You are expected to have a go and to bow at the start " +
              "and the end.",
            hookJa: "放課後はほとんどの生徒が部活動に参加し、しかも本格的に取り組みます。ほぼ毎日、週末もあり、一年を通して続きます。日本の生徒にとっての部活は、昼休みの活動というより、本格的なスポーツ活動に近いものです。みなさんは二回の部活動に参加します。上手である必要はありません。やってみることと、始めと終わりにきちんと礼をすることが大切です。",
            look:
              "Ask your buddy which club they are in and how many days a week they " +
              "train. Watch their face when you tell them what we do at Kew.",
            lookJa: "バディに何の部活に入っているか、週に何日練習しているか聞いてみましょう。そして、オーストラリアの学校ではどうなのかを伝えたときの顔を見てみてください。"
          }
        ]
      },
      {
        id: "homestay",
        ja: "ホームステイ",
        en: "Living with your host family",
        photo: null,
        intro:
          "The best week of the trip, and the part nobody else gets. You live in " +
          "a Japanese house with people who chose to have you there.",
        introJa: "この旅行でいちばんの一週間で、ほかの旅行では経験できない部分です。受け入れを引き受けてくれた家族の家で、日本の暮らしを一緒に送ります。",
        spots: [
          {
            id: "chance",
            ja: "チャンス",
            en: "Say yes to things",
            photo: null,
            hook:
              "Your host family is paid to host you and they will do their best " +
              "to look after you, so relax: you are not a burden and you do not " +
              "have to earn your place. What you should do is say yes. Try the " +
              "food, even the bit you cannot identify. Go where they take you on " +
              "the weekend. Join in at the club. A week of that will teach you " +
              "more Japanese than a term of lessons, and the families who enjoy " +
              "hosting most are the ones whose student joined in.",
            hookJa: "ホストファミリーは、みなさんを迎え入れることを引き受けてくれた家庭です。精いっぱい世話をしてくれますから、安心してください。迷惑をかけているのでは、と気にする必要はありません。大切なのは、誘われたら「はい」と言うことです。出された料理は、何か分からないものでも食べてみましょう。週末に連れて行ってくれる場所には一緒に行きましょう。部活にも参加しましょう。その一週間で、授業の一学期分より多くの日本語が身につきます。そしてホストファミリーがいちばん楽しいと感じるのは、生徒が一緒に加わってくれたときです。",
            look:
              "Say yes to one thing this week you would normally say no to. " +
              "Somebody will offer you something odd to eat. Start there.",
            lookJa: "今週、いつもなら断ることを一つだけ「はい」と言ってみましょう。誰かが変わった食べ物をすすめてくれるはずです。まずはそこからです。"
          },
          {
            id: "guest",
            ja: "いいゲスト",
            en: "Being a good guest",
            photo: null,
            hook:
              "Offer to help. Clear the table, do some washing up, tidy your own " +
              "things away. Offer to wash your own clothes, and do not be " +
              "surprised if they say no, because one load for the whole house is " +
              "easier than a special one for you. Offering is the part that " +
              "counts. Talk to them whenever you can: show photos of home, your " +
              "pets, the beach, your family, and ask about theirs. If the house " +
              "is lovely, say so. If dinner is good, say so. Polite, respectful, " +
              "grateful. That is the whole job, and it is not a hard one.",
            hookJa: "手伝いを申し出ましょう。食卓を片づける、食器を洗う、自分のものを片づける。洗濯も自分でやりましょうかと言ってみてください。断られても驚かないでください。家じゅうの分をまとめて洗うほうが楽だからです。大事なのは、申し出ることそのものです。できるだけ話しかけましょう。家や、ペットや、海や、家族の写真を見せて、相手の家族のことも聞いてみてください。家がすてきだと思ったら、そう言いましょう。ごはんがおいしかったら、そう言いましょう。ていねいに、敬意をもって、感謝を伝える。やることはそれだけで、難しいことではありません。",
            look:
              "Tonight, offer to help with one thing after dinner. " +
              "てつだいましょうか。Even if they wave you away, ask.",
            lookJa: "今夜、夕食のあとに何か一つ手伝いを申し出てみましょう。「てつだいましょうか。」断られても、声をかけることが大切です。"
          },
          {
            id: "australians",
            ja: "オーストラリア人",
            en: "You are the Australians",
            photo: null,
            hook:
              "One small thing worth keeping in the back of your mind. Kew is the " +
              "only Australian school in this program, so to a lot of people in " +
              "Soja you are simply the Australians, and this group is the one " +
              "they will remember. That is not a weight to carry around. It just " +
              "means friendliness goes further here than it does at home, and " +
              "people will be pleased with you for very little.",
            hookJa: "頭のすみに置いておいてほしいことが一つあります。この事業に参加しているオーストラリアの学校はキューハイスクールだけです。ですから、総社の多くの人にとって、みなさんは「オーストラリアの生徒たち」であり、覚えてもらえるのはこのグループです。重く受け止める必要はありません。ただ、ここでは人なつっこさが家にいるときよりもずっと遠くまで届きますし、ほんの小さなことでも喜んでもらえる、ということです。",
            look:
              "Greet people you pass at school, even the ones you do not know. " +
              "おはようございます costs nothing and it is remembered.",
            lookJa: "学校ですれ違う人には、知らない人にもあいさつしましょう。「おはようございます」はただですし、ちゃんと覚えてもらえます。"
          }
        ]
      },
      {
        id: "culture",
        ja: "文化体験",
        en: "Cultural activities at the school",
        photo: null,
        intro:
          "The sister school and the city put on a run of hands-on sessions: " +
          "school lunch, a day at another school, tea ceremony, character " +
          "practice, making Japanese sweets, and getting dressed in a yukata. " +
          "Specialist teachers come in for several of them, so it is worth " +
          "knowing what you are walking into.",
        introJa: "姉妹校と総社市が、体験型の活動をいくつも用意してくれています。給食、ほかの学校での一日、茶道、習字、和菓子づくり、浴衣の着付けです。いくつかには専門の先生が来てくださいますので、何をするのか知っておく価値があります。",
        spots: [
          {
            id: "kyushoku",
            ja: "給食",
            en: "School lunch",
            photo: null,
            hook:
              "There is no canteen and no choice. Everyone in the class eats the " +
              "same meal, in the classroom, at the same time. It is brought up " +
              "from the kitchen and served by students on the duty roster, in " +
              "white coats and caps, and the turn comes around to everybody. " +
              "Nobody starts until the whole room has said itadakimasu. The menu " +
              "is planned by a nutritionist, there is milk every day, and in " +
              "Okayama a fair bit of it will have been grown nearby.",
            hookJa: "食堂はなく、メニューを選ぶこともありません。クラス全員が同じ食事を、同じ時間に、教室で食べます。給食は調理室から運ばれ、当番の生徒が白い割烹着と帽子を着けて配ります。当番は全員に回ってきます。教室じゅうが「いただきます」と言うまで、誰も食べ始めません。献立は栄養士が考えていて、牛乳は毎日つきます。岡山では、かなりの食材が地元で育てられたものです。",
            look:
              "Find out whose turn it is to serve today, and ask your buddy how " +
              "often their turn comes around. Then eat what you are given, " +
              "including the bit you are unsure about.",
            lookJa: "今日の配膳当番が誰なのか確かめて、バディに当番がどれくらいの頻度で回ってくるか聞いてみましょう。そして、出されたものは、よく分からないものも含めて食べてみてください。"
          },
          {
            id: "itsutsuboshi",
            ja: "五つ星学園",
            en: "A day at Itsutsuboshi Gakuen",
            photo: null,
            hook:
              "A whole day out at another school in Soja, across two campuses, " +
              "with their lunch in the middle. The word for what happens there " +
              "is koryu, which means exchange, and it is the one activity on " +
              "this trip with no script. Expect activities together and " +
              "probably games that need you to move and communicate at the same " +
              "time. Nobody will hand you a list of phrases beforehand, which is " +
              "exactly why it works: you will find out how much you can actually " +
              "do with what you know.",
            hookJa: "総社にあるもう一つの学校で一日過ごします。二つのキャンパスを回り、途中でそちらの給食をいただきます。そこで行われるのは交流です。この旅行の中で、唯一台本のない活動です。一緒に行う活動や、体を動かしながら言葉も使うようなゲームがあると思います。事前に使える表現の一覧が配られることはありません。だからこそ意味があります。今の自分の日本語でどこまでできるのか、実際に分かるからです。",
            look:
              "Learn one question you can ask anybody today and use it on at " +
              "least three different people. なにかスポーツをしますか。Do you " +
              "play any sport? That one will get you a long way.",
            lookJa: "今日は、誰にでも聞ける質問を一つ覚えて、少なくとも三人に使ってみましょう。「なにかスポーツをしますか。」この一つでかなり会話が続きます。"
          },
          {
            id: "sado",
            ja: "茶道",
            en: "Tea ceremony",
            photo: null,
            hook:
              "Sado is not really about drinking tea. It is about somebody making it for you with their whole attention, and you receiving it the same way. The tea is matcha: powdered green tea whisked with a bamboo whisk until it froths, and it is properly bitter. That is why the sweet comes first. Eat it, then drink. The bowl has a front, its best looking face, and you are not supposed to drink from that side. So you turn the bowl a couple of times before you sip, and turn it back before you hand it over. Finish with a slurp. It sounds rude and it is the opposite: it tells your host you are done and it was good.",
            hookJa: "茶道は、お茶を飲むことそのものが目的ではありません。誰かが心を込めて自分のためにお茶を点ててくれ、それを同じ気持ちで受け取る、ということです。使うのは抹茶で、粉にした緑茶を竹の茶筅で泡立てたもので、しっかり苦いお茶です。だから先に和菓子をいただきます。お菓子を食べてから、お茶を飲みます。茶碗には正面があり、いちばん美しい面です。そこに口をつけないように、飲む前に茶碗を二回ほど回し、返すときに戻します。最後は音を立てて吸い切ります。失礼に聞こえるかもしれませんが、逆です。飲み終わったこと、おいしかったことを亭主に伝える作法です。",
            look:
              "The phrase behind the whole thing is ichigo ichie, one time, one " +
              "meeting. This exact group of people will never be in this room " +
              "together again. See if you can hold that thought for the length of " +
              "one bowl of tea.",
            lookJa: "茶道の根底にある言葉が「一期一会」です。この顔ぶれがこの部屋にそろうことは、二度とありません。お茶一杯のあいだ、そのことを心に置いていられるか、試してみてください。"
          },
          {
            id: "shodo",
            ja: "習字",
            en: "Character practice",
            photo: null,
            hook:
              "Hold the brush upright, not slanted like a pen, and move from your " +
              "elbow and shoulder rather than your fingers. Press down and the " +
              "line goes thick, lift and it goes thin, so the brush is doing two " +
              "jobs at once. The part that catches everyone out is that a brush " +
              "makes stroke order visible. On a keyboard nobody can tell what " +
              "order you built a character in. With ink on paper it shows, and " +
              "your teacher will spot it instantly. There is also no rubbing out. " +
              "You commit to the stroke and live with it.",
            hookJa: "筆はペンのように傾けず、まっすぐ立てて持ちます。動かすのは指ではなく、ひじと肩です。押さえれば線は太く、上げれば細くなりますから、筆は二つの仕事を同時にしていることになります。みんながつまずくのは、筆を使うと書き順が見えてしまうことです。キーボードでは、どの順で書いたか誰にも分かりません。でも紙の上の墨では分かりますし、先生にはすぐ見抜かれます。消すこともできません。一画を引いたら、それと付き合っていくしかありません。",
            look:
              "You will practise, then write one good copy at the end, and you " +
              "may get to put your character onto something to bring home. Put " +
              "your good copy beside the model and find the single stroke that " +
              "differs most. That one stroke is the lesson.",
            lookJa: "練習をしたあと、最後に清書を一枚書きます。書いた字を、持ち帰れるものに仕上げられるかもしれません。清書をお手本の横に並べて、いちばん違っている一画を探してみましょう。その一画が、今日の学びです。"
          },
          {
            id: "wagashi",
            ja: "和菓子",
            en: "Making wagashi",
            photo: null,
            hook:
              "Wagashi are the sweets that go with tea, and they are built to be " +
              "looked at before they are eaten. The ones you shape by hand are " +
              "usually nerikiri: sweet white bean paste, coloured and worked with " +
              "a bamboo tool and the palm of your hand. The shape tells you the " +
              "season, so in late September expect autumn, which means " +
              "chrysanthemums, maple leaves, persimmons and chestnuts. They taste " +
              "far less sweet than an Australian sweet, on purpose, because they " +
              "are made to sit against bitter matcha rather than compete with it. " +
              "Each design has its own name, often a poetic one.",
            hookJa: "和菓子はお茶と一緒にいただくお菓子で、食べる前にまず目で楽しむように作られています。手で形を作るのは、たいてい練り切りです。白あんに色をつけ、竹のへらと手のひらで形を整えます。形は季節を表しますので、九月の終わりなら秋、つまり菊、もみじ、柿、栗などが出てくるはずです。オーストラリアのお菓子よりずっと甘さが控えめですが、それはわざとです。苦い抹茶と張り合うのではなく、抹茶に寄り添うように作られているからです。それぞれの意匠には、詩のような名前がついていることもよくあります。",
            look:
              "Before you eat yours, work out what it is supposed to be and which " +
              "season it belongs to. Then ask what its name is.",
            lookJa: "食べる前に、それが何を表していて、どの季節のものなのか考えてみましょう。そのあと、名前を聞いてみてください。"
          }
,
          {
            id: "yukata-what",
            ja: "浴衣",
            en: "What a yukata is",
            photo: "photos/soja-yukata-group.webp",
            hook:
              "A yukata is a kimono. Kimono just means a thing you wear, so it " +
              "covers the whole family of them, and the yukata is the light " +
              "cotton one for summer with no lining. Its name is literally bath " +
              "clothing: 浴 is bath and 衣 is clothing, because it began as what " +
              "you put on after bathing, and it is still what hangs in your room " +
              "at a hot spring inn. Now it is mostly summer festival wear, for " +
              "fireworks and Bon dancing. What people usually picture when they " +
              "say kimono is the formal end of the family: silk, lined, worn " +
              "over an under-robe, needing someone else to put it on you and " +
              "costing more than a car. Yours is the easy end.",
            hookJa: "浴衣も着物の一つです。「着物」は文字どおり着るものという意味で、その仲間全体を指します。浴衣はそのうち、裏地のない、夏用の薄い木綿のものです。名前はそのまま湯あがりの衣で、「浴」はお風呂、「衣」は着るもの。もともとは入浴のあとに着るものだったからで、今も温泉旅館の部屋に用意されています。現在は主に夏祭りの服で、花火や盆踊りのときに着られます。「着物」と聞いて多くの人が思い浮かべるのは、もっと格式の高いほうでしょう。絹で、裏地があり、長襦袢の上に着て、着付けには人の手が要り、値段は車より高いこともあります。みなさんが着るのは、いちばん気軽なほうです。",
            look:
              "Feel the fabric. Plain cotton, and that is the point: this is " +
              "clothing for a hot night, not a costume.",
            lookJa: "生地に触ってみましょう。ただの木綿です。そこが大事なところで、これは衣装ではなく、暑い夜のための普段着なのです。"
          },
          {
            id: "yukata-left",
            ja: "左が上",
            en: "Left over right, always",
            photo: "photos/soja-yukata-collar.webp",
            hook:
              "There is one rule that really matters and this is it. Wrap the " +
              "right side against your body first, then bring the left side " +
              "across on top. Left over right. People are strict about it " +
              "because the other way round, right over left, is how a body is " +
              "dressed for a funeral. Getting it backwards is not exactly rude, " +
              "but everyone in the room will notice straight away, the way you " +
              "would notice a jumper on inside out.",
            hookJa: "本当に大事な決まりが一つだけあります。これです。先に右の身頃を体に当て、そのうえに左の身頃を重ねます。左が上です。みんながこれに厳しいのは、逆の右が上の合わせ方が、亡くなった人に着せる着方だからです。間違えても失礼というわけではありませんが、その場の全員がすぐ気づきます。セーターを裏返しに着ている人に気づくのと同じです。",
            look:
              "Check yourself before anyone else does. Looking down at your own " +
              "chest, the left panel should be on top and the opening should " +
              "point to your right.",
            lookJa: "人に指摘される前に、自分で確かめましょう。自分の胸元を見下ろしたとき、左の身頃が上にあり、合わせ目が自分の右側を向いていれば正解です。"
          },
          {
            id: "yukata-wear",
            ja: "着かた",
            en: "The obi, and how to move in it",
            photo: "photos/soja-yukata-obi.webp",
            hook:
              "The belt is an obi. Women wear a wide one tied at the back, often " +
              "in a bow. Men wear a narrow one tied low on the hips, below the " +
              "stomach rather than at the waist. Pull the collar so it sits " +
              "neatly at the throat, and if the whole thing starts riding up, " +
              "adjust it from the back rather than pulling the front open. " +
              "Traditionally you wear geta, wooden sandals, with bare feet. A " +
              "yukata is cut narrow at the bottom, so you cannot take a normal " +
              "Australian stride in one.",
            hookJa: "帯を締めます。女性は幅の広い帯を背中で結び、リボンのような形にすることが多いです。男性は細い帯を、腰の低い位置、おなかより下で締めます。えりは首もとがきれいに見えるように整えましょう。全体がずり上がってきたら、前を開いて直すのではなく、後ろから直してください。伝統的には、素足に下駄をはきます。浴衣はすそが狭く仕立てられているので、オーストラリアにいるときのような大またでは歩けません。",
            look:
              "Once you are in it, walk the length of the room and work out how " +
              "short your steps have to be. Then try sitting down neatly. That " +
              "is the actual skill.",
            lookJa: "着終わったら、部屋の端から端まで歩いて、どれくらい歩幅を小さくすればいいか確かめてみましょう。そのあと、きれいに座ってみてください。本当に難しいのはそこです。"
          }
        ]
      }
    ]
  },

  /* ==================== KOBE ==================== */
  {
    id: "kobe",
    ja: "神戸",
    en: "Kobe, Motomachi",
    days: "Day 11, about 85 minutes",
    intro:
      "The last stop before the airport, and it is short. About an hour and a half " +
      "in Motomachi, then the coach leaves. Know what you want before you arrive.",
    sights: [
      {
        id: "motomachi",
        ja: "元町",
        en: "Motomachi",
        photo: "photos/kobe-motomachi.webp",
            credit: "Kobe Motomachi, via Wikimedia Commons.",
        intro:
          "A port district with a long shopping arcade and one of Japan's three " +
          "big Chinatowns next to it.",
        spots: [
          {
            id: "nankinmachi",
            ja: "南京町",
            en: "Nankinmachi, the Chinatown",
            photo: "photos/kobe-nankinmachi.webp",
            credit: "The Chozan gate into Nankinmachi, via Wikimedia Commons.",
            hook:
              "Kobe was one of the first ports Japan opened to foreign ships in " +
              "1868 after more than two centuries of near-total isolation. Chinese " +
              "merchants settled here, and Nankinmachi grew out of that. It is a " +
              "few packed streets of street food, and the standard move is to buy " +
              "small things from several stalls rather than sit down anywhere. " +
              "Hand the wrapper or skewer back to the stall you bought it from " +
              "rather than hunting for a bin.",
            look:
              "You have well under two hours in total. Decide before you get off " +
              "the coach whether this stop is food or souvenirs, because it is not " +
              "going to be both."
          },
          {
            id: "quake",
            ja: "阪神・淡路大震災",
            en: "1995",
            photo: "photos/kobe-quake.webp",
            credit: "Port of Kobe Earthquake Memorial Park: the quay left exactly " +
                    "as the 1995 quake made it. Via Wikimedia Commons.",
            hook:
              "In January 1995 an earthquake hit this city before dawn. More than " +
              "6,400 people died, mostly here. Elevated motorways fell on their " +
              "sides and whole blocks burned. The arcade itself stayed up, but " +
              "shops along it were wrecked, and a lot of what you are walking " +
              "past was repaired or rebuilt after it. Down at the waterfront a " +
              "section of the " +
              "old quay has been deliberately left broken and tilted, exactly as " +
              "the quake left it, as a memorial.",
            look:
              "Look along the street and pick out the buildings that are plainly " +
              "newer than the ones beside them. That is not a coincidence."
          }
        ]
      }
    ]
  }
];

/* ---------------------------------------------------------------------------
   PHRASES
   Ordered by when a student actually needs them, not by grammar.
   No romaji: students read kana, and the kana charts are one tap away.
   `show` marks the ones worth holding up to a Japanese person to read.
   ------------------------------------------------------------------------- */
window.PHRASES = [
  {
    id: "first",
    ja: "はじめまして",
    en: "The first five minutes",
    note: "Meeting your host family. Learn these properly before you land.",
    items: [
      { ja: "はじめまして。", en: "Nice to meet you." },
      { ja: "＿＿＿です。どうぞよろしくおねがいします。", en: "I'm ___. Please be good to me.", tip: "Say your first name. The most useful sentence you will learn." },
      { ja: "おせわになります。", en: "Thank you for having me.", tip: "Say this when you first arrive at the house. It means you know they are going to look after you." },
      { ja: "これ、おみやげです。どうぞ。", en: "This is a gift for you. Please take it.", tip: "Hand it over with both hands." }
    ]
  },
  {
    id: "table",
    ja: "しょくじ",
    en: "At the table",
    note: "You will use these every single day.",
    items: [
      { ja: "いただきます。", en: "Before eating.", tip: "Everyone says it. Do not start before it." },
      { ja: "ごちそうさまでした。", en: "After eating.", tip: "Say it to whoever cooked." },
      { ja: "おいしいです！", en: "This is delicious!", tip: "Use it more than you think you need to." },
      { ja: "おかわりをおねがいします。", en: "Seconds please." },
      { ja: "おなかがいっぱいです。", en: "I'm full.", tip: "Kinder than leaving food on the plate. Take what you know you will finish, then finish it." },
      { ja: "すみません、それはたべられません。", en: "Sorry, I can't eat that.", show: true, tip: "If it is an allergy, show them the card. Do not count on being understood from your pronunciation alone." }
    ]
  },
  {
    id: "house",
    ja: "うちで",
    en: "Around the house",
    note: "Homestay basics. Ask rather than assume.",
    items: [
      { ja: "ただいま。", en: "I'm home.", tip: "Say it every time you walk in." },
      { ja: "いってきます。", en: "I'm off.", tip: "Say it every time you go out." },
      { ja: "おやすみなさい。", en: "Good night." },
      { ja: "おふろにはいってもいいですか。", en: "May I have a bath?", tip: "Wash yourself outside the bath first. The water in it is shared and stays clean for the next person." },
      { ja: "せんたくをしてもいいですか。", en: "May I do some washing?" },
      { ja: "Wi-Fiをつかってもいいですか。", en: "May I use the wifi?", tip: "Ask once. If the answer is not an easy yes, leave it." },
      { ja: "てつだいましょうか。", en: "Shall I help?", tip: "Offer this at least once a day. Nothing else you can say will go down as well." }
    ]
  },
  {
    id: "school",
    ja: "がっこう",
    en: "At school",
    note: "Soja Nishi Junior High School.",
    items: [
      { ja: "おはようございます。", en: "Good morning." },
      { ja: "よろしくおねがいします。", en: "Please be good to me.", tip: "Say it to a new class, a new buddy, a club, a teacher. It works everywhere." },
      { ja: "ありがとうございました。", en: "Thank you (for what you just did).", tip: "Past tense. Use it at the end of a lesson or a club session." },
      { ja: "もういちど、おねがいします。", en: "One more time, please." },
      { ja: "ゆっくりおねがいします。", en: "Slowly, please.", tip: "Better than pretending you understood." },
      { ja: "これはなんですか。", en: "What is this?" }
    ]
  },
  {
    id: "out",
    ja: "そとで",
    en: "Out and about",
    note: "Shops, stations, temples.",
    items: [
      { ja: "すみません。", en: "Excuse me / sorry.", tip: "The most useful word in Japan. It starts almost every exchange you will have with a stranger." },
      { ja: "これをください。", en: "This one please.", tip: "Point. It is completely acceptable." },
      { ja: "いくらですか。", en: "How much is it?" },
      { ja: "トイレはどこですか。", en: "Where is the toilet?", show: true },
      { ja: "しゃしんをとってもいいですか。", en: "May I take a photo?", tip: "Ask before photographing people, and check for no-photo signs inside temple halls." },
      { ja: "だいじょうぶです。", en: "I'm fine / it's fine.", tip: "It is also how you turn down a plastic bag politely." }
    ]
  },
  {
    id: "help",
    ja: "こまったとき",
    en: "If something goes wrong",
    note: "Hold the phone up and let someone read the Japanese. That is what these are for.",
    items: [
      { ja: "たすけてください。", en: "Please help me.", show: true,
        tip: "This one is for real trouble, like being hurt or in danger. If you are only lost or stuck, use the two below." },
      { ja: "みちにまよいました。", en: "I am lost.", show: true },
      { ja: "にほんごがすこししかわかりません。えいごをはなせるひとはいますか。", en: "I only speak a little Japanese. Is there someone who speaks English?", show: true },
      { ja: "びょうきです。びょういんにいきたいです。", en: "I am unwell. I would like to go to a hospital.", show: true },
      { ja: "せんせいにでんわしてください。", en: "Please call my teacher.", show: true, tip: "Your teachers' numbers are on your lanyard, not in this app. Show the lanyard." }
    ]
  },
  {
    id: "jiko",
    ja: "じこしょうかい",
    en: "Introducing yourself",
    note: "The lines in order, the way you would say them standing up in front " +
          "of a class. One to one with your host student you only need the first " +
          "few. Learn this one properly: you will use it more than anything else " +
          "in the app.",
    items: [
      { ja: "はじめまして。", en: "Nice to meet you.",
        tip: "Only ever the first time you meet someone. Bow as you say it." },
      { ja: "わたしのなまえは＿＿＿です。", en: "My name is ___.",
        tip: "The Japanese order puts the family name first, but give them your first name: it is easier to catch, and easier for people to call you by all week." },
      { ja: "＿＿＿とよんでください。", en: "Please call me ___.",
        tip: "Useful if your name is long or hard to say. Give them a short version and they will use it all week." },
      { ja: "＿＿さいです。", en: "I am ___ years old." },
      { ja: "ちゅうがく２ねんせいです。", en: "I am in Year 8.",
        tip: "Swap the year to match you. Year 8 = ちゅうがく２ねんせい, Year 9 = ちゅうがく３ねんせい, Year 10 = こうこう１ねんせい, Year 11 = こうこう２ねんせい." },
      { ja: "オーストラリアのメルボルンからきました。", en: "I come from Melbourne, Australia.",
        tip: "Expect a reaction. Melbourne is a long way away and people will say so." },
      { ja: "かぞくは＿にんです。", en: "There are ___ people in my family.",
        tip: "Count yourself. Then: ちちとははといもうととわたしです, my father, my mother, my younger sister and me." },
      { ja: "しゅみは＿＿＿です。", en: "My hobby is ___.",
        tip: "テニス, サッカー, バスケットボール, ピアノ, ダンス, ゲーム, りょうり, どくしょ. Say whichever is true, even if it is not impressive." },
      { ja: "にほんごがだいすきです。", en: "I love Japanese.",
        tip: "Say it. You are standing in a Japanese classroom having learnt their language, and they know how rare that is." },
      { ja: "どうぞよろしくおねがいします。", en: "Please be good to me.",
        tip: "The line that closes it. Bow again, and stop there." },
      { ja: "しゅみはなんですか。", en: "What is your hobby?",
        tip: "For one to one, not for the front of a class. Ask it back the moment you finish, and the conversation carries itself." }
    ]
  },
  {
    id: "arigatou",
    ja: "おれいのことば",
    en: "Thanking them for a class",
    unit: "lines",
    note: "For whoever speaks for the group after a calligraphy lesson, a tea " +
          "ceremony, a club session. Say the first line, one or two middle ones, " +
          "then the last. Slowly, and it will be fine.",
    items: [
      { ja: "＿＿＿についておしえてくれて、ありがとうございました。",
        en: "Thank you very much for teaching us about ___.",
        tip: "Put the activity in the gap: しょどう calligraphy, おちゃ tea, いけばな flower arranging, おこと the koto, ゆかた the yukata." },
      { ja: "とてもたのしくて、いいけいけんでした。", en: "It was a lot of fun and a good experience." },
      { ja: "みなさんとあえて、とてもよかったです。", en: "It was really good to meet you all." },
      { ja: "＿＿＿きかいがあって、とてもよかったです。",
        en: "The chance to ___ was really good.",
        tip: "The gap takes a whole action: ゆかたをきる to wear a yukata, おことをひく to play the koto, しょどうをする to do calligraphy, いけばなをする to arrange flowers, おちゃかいにさんかする to take part in a tea ceremony, ぶかつどうにさんかする to join in club activities." },
      { ja: "オーストラリアにかえっても、ここでならったことをいかしたいとおもいます。",
        en: "Even back in Australia, we would like to keep using what we learnt here.",
        tip: "The long one. Worth having if you are speaking at something formal, and worth skipping if you are not." },
      { ja: "どうも、ありがとうございました。", en: "Thank you very much.",
        tip: "Finish here, and bow. Do not add anything after it." }
    ]
  },
  {
    id: "tegami",
    ja: "おれいのてがみ",
    en: "Your thank you letter",
    unit: "sentences",
    note: "Write this for your host family near the end of the week. Pick only " +
          "the ones that are true for you, keep them roughly in this order, and " +
          "write it out by hand. Put the English underneath if you like: they " +
          "will want to read both.",
    items: [
      { ja: "＿＿＿家のみなさんへ",
        furi: "＿＿＿家[け]のみなさんへ", en: "To the ___ family",
        tip: "Their family name goes in the gap. This opens the letter." },
      { ja: "みなさんのおかげで、この一週間はとてもたのしかったです。",
        furi: "みなさんのおかげで、この一週間[いっしゅうかん]はとてもたのしかったです。",
        en: "Thanks to all of you, this week has been wonderful.",
        tip: "おかげで means it happened because of them. It is the warmest way to start." },
      { ja: "あっという間におわりました。",
        furi: "あっという間[ま]におわりました。", en: "It went by in a flash." },
      { ja: "日本の生活も日本の家のようすもよくわかりました。",
        furi: "日本[にほん]の生活[せいかつ]も日本[にほん]の家[いえ]のようすもよくわかりました。",
        en: "I have learnt a lot about Japanese life and Japanese homes." },
      { ja: "とてもいいおもいでがたくさんできました。", en: "I have made so many good memories." },
      { ja: "＿＿＿についておしえてくれて、ありがとうございます。",
        en: "Thank you for teaching me about ___." },
      { ja: "みなさんはとてもやさしいです。", en: "You are all so kind." },
      { ja: "お母さんのりょうりはおいしかったです。",
        furi: "お母[かあ]さんのりょうりはおいしかったです。", en: "Your cooking was delicious.",
        tip: "Change お母さん to whoever actually cooked." },
      { ja: "はじめて＿＿＿を食べました。とてもおいしかったです。",
        furi: "はじめて＿＿＿を食[た]べました。とてもおいしかったです。",
        en: "I ate ___ for the first time. It was delicious.",
        tip: "Name the thing you had never had before. This is the line host parents quote to each other afterwards." },
      { ja: "＿＿＿さんはとてもおもしろい人です。",
        furi: "＿＿＿さんはとてもおもしろい人[ひと]です。", en: "___ is such a funny, interesting person.",
        tip: "Name one person in the family. A letter means far more to someone when it mentions them by name." },
      { ja: "＿＿＿さんとはなすのが、たのしかったです。",
        en: "I really enjoyed talking with ___.",
        tip: "Use it for a brother, a sister, a grandparent: somebody the rest of the letter has not mentioned." },
      { ja: "＿＿＿にいっしょに行くことができて、とてもうれしかったです。",
        furi: "＿＿＿にいっしょに行[い]くことができて、とてもうれしかったです。",
        en: "I was so happy we could go to ___ together." },
      { ja: "＿＿＿をいっしょにすることができて、とてもうれしかったです。",
        en: "I was so happy we could do ___ together." },
      { ja: "いろいろなところへつれて行ってくれて、ありがとうございます。",
        furi: "いろいろなところへつれて行[い]ってくれて、ありがとうございます。",
        en: "Thank you for taking me to so many places.",
        tip: "Somebody drove you everywhere all week. Worth saying so." },
      { ja: "英語で話してくれて、ありがとうございます。とてもたすかりました。",
        furi: "英語[えいご]で話[はな]してくれて、ありがとうございます。とてもたすかりました。",
        en: "Thank you for speaking English with me. It helped enormously.",
        tip: "Worth writing. Speaking a second language all week is tiring, and they did it for you." },
      { ja: "へやがきれいで、よくねむれました。",
        en: "My room was lovely and I slept well.",
        tip: "Somebody cleared that room for you. Japanese letters usually say so." },
      { ja: "いろいろおせわになりました。", en: "You looked after me in so many ways.",
        tip: "A set phrase with real weight in Japanese. It tells them you know how much they did for you." },
      { ja: "いろいろごめいわくをおかけしました。",
        en: "I am sorry for all the trouble I caused.",
        tip: "You did not cause trouble. Saying this anyway is normal politeness in a Japanese thank you letter, and leaving it out reads as a little proud." },
      { ja: "まだ日本語が下手です。もっとがんばりたいです。",
        furi: "まだ日本語[にほんご]が下手[へた]です。もっとがんばりたいです。",
        en: "My Japanese is still poor. I want to work harder at it." },
      { ja: "また日本に来たいです。",
        furi: "また日本[にほん]に来[き]たいです。", en: "I want to come to Japan again." },
      { ja: "また、みなさんに会いたいです。",
        furi: "また、みなさんに会[あ]いたいです。", en: "I want to see you all again." },
      { ja: "かえって、さみしくなります。", en: "I will miss you when I go home." },
      { ja: "いつか、オーストラリアにあそびに来てください。",
        furi: "いつか、オーストラリアにあそびに来[き]てください。",
        en: "Please come and visit me in Australia one day." },
      { ja: "わたしの家にとまってください。",
        furi: "わたしの家[いえ]にとまってください。",
        en: "Please stay at my house.",
        tip: "Only write it if your family means it." },
      { ja: "メールではなしましょう。", en: "Let's keep in touch by email." },
      { ja: "しゃしんをおくります。",
        en: "I will send you the photos.",
        tip: "Then actually send them." },
      { ja: "おからだに気をつけてください。",
        furi: "おからだに気[き]をつけてください。",
        en: "Please look after yourselves.",
        tip: "The standard way to close a letter to somebody older than you." },
      { ja: "ほんとうに、ありがとうございました。さようなら。",
        en: "Thank you sincerely for everything. Goodbye.",
        tip: "Or またあいましょう, let's meet again, which is a kinder ending." },
      { ja: "＿＿＿より", en: "From ___",
        tip: "Your name, and that is the letter finished." }
    ]
  },
  {
    id: "anthem",
    ja: "こっか",
    en: "Advance Australia Fair",
    unit: "verses",
    note: "The Australian national anthem, in the words used now. Tap the tune " +
          "to hear the melody.",
    // The words here are English, so the synthetic Japanese voice has no
    // business reading them. The tune does that job instead.
    say: false,
    /* Transcribed from the score, G major, 4/4, one quarter pickup.
       NOTE[octave]:eighths, r for a rest, so: quarter 2, eighth 1, dotted
       quarter 3, half 4, dotted half 6. Every full bar comes to 8, which is
       what makes a mistake in the rhythm show up rather than hide. */
    tune: {
      bpm: 96,
      label: "Chiptune, the melody line",
      notes:
        "D4:2 " +                                        // Aus
        "G4:2 D4:2 B3:2 D4:2 " +                         // tral-ians all let
        "G4:3 G4:1 G4:2 B4:2 " +                         // us re-joice, For
        "A4:2 G4:2 F#4:2 G4:2 " +                        // we are one and
        "A4:4 r:2 D4:2 " +                               // free.  We've
        "G4:2 D4:2 B3:2 G3:2 " +                         // gol-den soil and
        "D4:3 D4:1 D4:2 B4:2 " +                         // wealth for toil, our
        "A4:2 G4:2 F#4:2 E4:2 " +                        // home is girt by
        "D4:4 r:2 D4:2 " +                               // sea.  Our
        "E4:3 F#4:1 G4:2 E4:2 " +                        // land a-bounds in
        "D4:3 B3:1 B3:2 D4:2 " +                         // nat-ure's gifts, of
        "E4:2 G4:2 C5:2 B4:2 " +                         // beau-ty rich and
        "A4:4 r:2 D4:2 " +                               // rare.  In
        "E4:3 F#4:1 G4:2 E4:2 " +                        // his-try's page then
        "D4:3 G4:1 G4:2 A4:2 " +                         // let us sing: Ad
        "B4:3 G4:1 A4:3 F#4:1 " +                        // vance Aus-tra-lia
        "G4:6 B4:2 " +                                   // Fair.  In
        "C5:2 B4:2 A4:2 G4:2 " +                         // joy-ful strains then
        "F#4:2 E4:2 D4:2 G4:2 " +                        // let us sing: Ad
        "B4:3 G4:1 A4:3 F#4:1 " +                        // vance Aus-tra-lia
        "G4:6"                                           // Fair.
    },
    items: [
      { ja: "Australians all let us rejoice,\nFor we are one and free;\n" +
            "We've golden soil and wealth for toil;\nOur home is girt by sea;\n" +
            "Our land abounds in nature's gifts\nOf beauty rich and rare;\n" +
            "In history's page, let every stage\nAdvance Australia Fair.\n" +
            "In joyful strains then let us sing,\nAdvance Australia Fair.",
        en: "First verse" },
      { ja: "Beneath our radiant Southern Cross\nWe'll toil with hearts and hands;\n" +
            "To make this Commonwealth of ours\nRenowned of all the lands;\n" +
            "For those who've come across the seas\nWe've boundless plains to share;\n" +
            "With courage let us all combine\nTo Advance Australia Fair.\n" +
            "In joyful strains then let us sing,\nAdvance Australia Fair.",
        en: "Second verse" }
    ]
  },
  {
    id: "speech",
    say: false,
    ja: "スピーチ",
    en: "Speaking for the group",
    unit: "parts",
    note: "Find your number. Eleven of you have a line of your own, and all " +
          "fourteen speak at least twice whatever your number. Learn yours out " +
          "loud rather than in your head: slow beats fast, and a pause beats a " +
          "rush. The wide spaces are there to breathe, and the blanks are where " +
          "names go. All of these are spoken in Japanese. The English is so you " +
          "know what you are saying, and the small kana above the kanji are " +
          "how to say it.",
    items: [

      { section: "Thursday 24 September · the first meeting",
        label: "Student 9",
        ja: "みなさん、はじめまして。私たちはキューハイスクールの代表の＿＿＿と＿＿＿と＿＿＿です。\n私たちは、総社に来るのを　とても　楽しみに　していました。",
        furi: "みなさん、はじめまして。私[わたし]たちはキューハイスクールの代表[だいひょう]の＿＿＿と＿＿＿と＿＿＿です。\n私[わたし]たちは、総社[そうじゃ]に来[く]るのを　とても　楽[たの]しみに　していました。",
        kana: "みなさん、はじめまして。わたしたちはキューハイスクールのだいひょうの＿＿＿と＿＿＿と＿＿＿です。\nわたしたちは、そうじゃにくるのを　とても　たのしみに　していました。",
        en: "Hello everyone, nice to meet you. We are the student representatives from Kew High School, ___, ___ and ___. We have been really looking forward to coming to Soja.",
        tip: "The first evening, not long after the coach arrives and before you meet your host family. You open, and you name all three of you." },

      { label: "Student 10",
        ja: "ほとんどの生徒は　日本に　来るのが　はじめてなので、日本で　生活することは　とても　おもしろい　経験になる　と思います。\nキューハイスクールで　日本語と　日本の文化を　勉強していますが、日本語は、むずかしいので、まだまだ　上手じゃないです。",
        furi: "ほとんどの生徒[せいと]は　日本[にほん]に　来[く]るのが　はじめてなので、日本[にほん]で　生活[せいかつ]することは　とても　おもしろい　経験[けいけん]になる　と思[おも]います。\nキューハイスクールで　日本語[にほんご]と　日本[にほん]の文化[ぶんか]を　勉強[べんきょう]していますが、日本語[にほんご]は、むずかしいので、まだまだ　上手[じょうず]じゃないです。",
        kana: "ほとんどのせいとは　にほんに　くるのが　はじめてなので、にほんで　せいかつすることは　とても　おもしろい　けいけんになる　とおもいます。\nキューハイスクールで　にほんごと　にほんのぶんかを　べんきょうしていますが、にほんごは、むずかしいので、まだまだ　じょうずじゃないです。",
        en: "For most of us this is our first time in Japan, so living here will be a really interesting experience. We study Japanese language and culture at Kew High School, but Japanese is hard, so we are not very good at it yet.",
        tip: "The longest of the three. Take the comma after なので as a real pause." },

      { label: "Student 11",
        ja: "これからの一週間、私たちに　日本語と　日本の文化を　教えてください。\nがんばりたいと思います。よろしく　お願いします。",
        furi: "これからの一週間[いっしゅうかん]、私[わたし]たちに　日本語[にほんご]と　日本[にほん]の文化[ぶんか]を　教[おし]えてください。\nがんばりたいと思[おも]います。よろしく　お願[ねが]いします。",
        kana: "これからのいっしゅうかん、わたしたちに　にほんごと　にほんのぶんかを　おしえてください。\nがんばりたいとおもいます。よろしく　おねがいします。",
        en: "Over the week ahead, please teach us Japanese and about Japanese culture. We will do our best. Thank you.",
        tip: "You finish. よろしくお願いします is the last thing anyone hears, so give it its own breath and mean it." },

      { section: "Friday 25 September · the welcome assembly",
        label: "Student 5",
        ja: "みなさん、はじめまして。私たちはキューハイスクールの代表の＿＿＿と＿＿＿と＿＿＿です。\n私たちは、昨日、総社に　着きました。",
        furi: "みなさん、はじめまして。私[わたし]たちはキューハイスクールの代表[だいひょう]の＿＿＿と＿＿＿と＿＿＿です。\n私[わたし]たちは、昨日[きのう]、総社[そうじゃ]に　着[つ]きました。",
        kana: "みなさん、はじめまして。わたしたちはキューハイスクールのだいひょうの＿＿＿と＿＿＿と＿＿＿です。\nわたしたちは、きのう、そうじゃに　つきました。",
        en: "Hello everyone, nice to meet you. We are the student representatives from Kew High School, ___, ___ and ___. We arrived in Soja yesterday.",
        tip: "Broadcast from the music room to the whole school, so you are speaking to hundreds of people you cannot see. That is easier, not harder." },

      { label: "Student 6",
        ja: "総社に　来ることを、ずっと楽しみにしていました。\n総社西中学校のみなさんに会えて、本当にうれしいです。",
        furi: "総社[そうじゃ]に　来[く]ることを、ずっと楽[たの]しみにしていました。\n総社西中学校[そうじゃにしちゅうがっこう]のみなさんに会[あ]えて、本当[ほんとう]にうれしいです。",
        kana: "そうじゃに　くることを、ずっとたのしみにしていました。\nそうじゃにしちゅうがっこうのみなさんにあえて、ほんとうにうれしいです。",
        en: "We have been looking forward to coming to Soja for a long time. We are so happy to meet everyone at Soja Nishi Junior High School.",
        tip: "The shortest part of the three. Do not rush it just because it is short." },

      { label: "Student 7",
        ja: "私たちは、学校で　日本語と　日本の文化を　勉強しています。\n日本語は　まだまだ　上手じゃないので、ぜひ　私たちに　日本語を　教えてください。\n一週間は　みじかいですが、いろいろな　ことを　したいと　思います。よろしく　お願いします。",
        furi: "私[わたし]たちは、学校[がっこう]で　日本語[にほんご]と　日本[にほん]の文化[ぶんか]を　勉強[べんきょう]しています。\n日本語[にほんご]は　まだまだ　上手[じょうず]じゃないので、ぜひ　私[わたし]たちに　日本語[にほんご]を　教[おし]えてください。\n一週間[いっしゅうかん]は　みじかいですが、いろいろな　ことを　したいと　思[おも]います。よろしく　お願[ねが]いします。",
        kana: "わたしたちは、がっこうで　にほんごと　にほんのぶんかを　べんきょうしています。\nにほんごは　まだまだ　じょうずじゃないので、ぜひ　わたしたちに　にほんごを　おしえてください。\nいっしゅうかんは　みじかいですが、いろいろな　ことを　したいと　おもいます。よろしく　おねがいします。",
        en: "We study Japanese language and culture at school. We are still not very good at Japanese, so please do teach us. One week is short, but we want to do all sorts of things. Thank you.",
        tip: "You close the assembly. Three lines, three breaths." },

      { label: "Everyone, one by one",
        ja: "（名前）です。よろしくお願いします。",
        furi: "（名前[なまえ]）です。よろしくお願[ねが]いします。",
        kana: "（なまえ）です。よろしくおねがいします。",
        en: "I'm ___. Pleased to meet you.",
        tip: "All fourteen of you, straight after the three speakers, one after another. Your own name where the brackets are. It takes four seconds, and it is the moment several hundred people find out who you are. Say it clearly, and do not mumble your own name." },

      { section: "Monday 28 September · Showa Itsutsuboshi Gakuen",
        label: "Student 3",
        ja: "昭和五つ星学園のみなさん、今日は本当にありがとうございました。\nみなさんと過ごした時間は、とても楽しかったです。日本語や英語で、たくさん話すことができて、嬉しかったです。\n今日学んだことを大切にして、これからも頑張りたいと思います。\n本当にありがとうございました。またお会いできる日を楽しみにしています。",
        furi: "昭和[しょうわ]五[いつ]つ星[ぼし]学園[がくえん]のみなさん、今日[きょう]は本当[ほんとう]にありがとうございました。\nみなさんと過[す]ごした時間[じかん]は、とても楽[たの]しかったです。日本語[にほんご]や英語[えいご]で、たくさん話[はな]すことができて、嬉[うれ]しかったです。\n今日[きょう]学[まな]んだことを大切[たいせつ]にして、これからも頑張[がんば]りたいと思[おも]います。\n本当[ほんとう]にありがとうございました。またお会[あ]いできる日[ひ]を楽[たの]しみにしています。",
        kana: "しょうわいつつぼしがくえんのみなさん、きょうは　ほんとうに　ありがとうございました。\nみなさんと　すごした　じかんは、とても　たのしかったです。にほんごや　えいごで、たくさん　はなすことが　できて、うれしかったです。\nきょう　まなんだことを　たいせつにして、これからも　がんばりたいと　おもいます。\nほんとうに　ありがとうございました。また　おあいできる　ひを　たのしみに　しています。",
        en: "Thank you so much for today, everyone at Showa Itsutsuboshi Gakuen. The time we spent with you was so enjoyable, and it made us happy to talk with you so much, in Japanese and in English. We will treasure what we learned today and keep doing our best. Thank you again, and we look forward to the day we can meet you again.",
        tip: "At the end of a whole day there, just before the bus leaves for Soja Nishi, at about three. You speak for all of us and nobody else is named." },

      { section: "Tuesday 29 September · the farewell assembly",
        label: "Student 3",
        ja: "こんにちは。一週間、ありがとうございました。\n総社の皆さんのおかげで、私たちは　いろいろな　経験ができて、とてもいい思い出が　たくさん　できました。\n学校の　先生たちには、ていねいに　教えて　いただいたので、勉強することが　できました。",
        furi: "こんにちは。一週間[いっしゅうかん]、ありがとうございました。\n総社[そうじゃ]の皆[みな]さんのおかげで、私[わたし]たちは　いろいろな　経験[けいけん]ができて、とてもいい思[おも]い出[で]が　たくさん　できました。\n学校[がっこう]の　先生[せんせい]たちには、ていねいに　教[おし]えて　いただいたので、勉強[べんきょう]することが　できました。",
        kana: "こんにちは。いっしゅうかん、ありがとうございました。\nそうじゃのみなさんのおかげで、わたしたちは　いろいろな　けいけんができて、とてもいいおもいでが　たくさん　できました。\nがっこうの　せんせいたちには、ていねいに　おしえて　いただいたので、べんきょうすることが　できました。",
        en: "Hello. Thank you for this week. Thanks to everyone in Soja we have had all sorts of experiences and made many good memories. The teachers here taught us so carefully that we were really able to learn.",
        tip: "You open, Student 4 finishes." },

      { label: "Student 4",
        ja: "ホストファミリーの皆さん、お世話になりました。ありがとうございました。\n機会があったら、また総社に来たい　と思います。皆さんも　ぜひ、メルボルンへ　来てください。\nほんとうに　ありがとうございました。",
        furi: "ホストファミリーの皆[みな]さん、お世話[せわ]になりました。ありがとうございました。\n機会[きかい]があったら、また総社[そうじゃ]に来[き]たい　と思[おも]います。皆[みな]さんも　ぜひ、メルボルンへ　来[き]てください。\nほんとうに　ありがとうございました。",
        kana: "ホストファミリーのみなさん、おせわになりました。ありがとうございました。\nきかいがあったら、またそうじゃにきたい　とおもいます。みなさんも　ぜひ、メルボルンへ　きてください。\nほんとうに　ありがとうございました。",
        en: "To our host families, thank you for looking after us. If we get the chance we would love to come back to Soja, and please do come to Melbourne yourselves. Thank you, truly.",
        tip: "Your host family is in the room. お世話になりました is the whole week in four words, so do not throw it away." },

      { label: "Everyone, one by one",
        ja: "わたしの文字は「＿」です。\n「＿」は「＿＿」という意味です。\nなぜなら、＿＿＿＿＿＿＿＿だからです。",
        furi: "わたしの文字[もじ]は「＿」です。\n「＿」は「＿＿」という意味[いみ]です。\nなぜなら、＿＿＿＿＿＿＿＿だからです。",
        kana: "わたしのもじは「＿」です。\n「＿」は「＿＿」といういみです。\nなぜなら、＿＿＿＿＿＿＿＿だからです。",
        en: "My character is ___. ___ means ___. Because ___.",
        tip: "The character you wrote at the calligraphy session the day before. Same three lines for everyone, your own character, your own reason. Decide your なぜなら on the Monday while the brush is still in your hand, not on the Tuesday morning." },

      { label: "Students 12, 13 and 14",
        ja: "出し物",
        furi: "出[だ]し物[もの]",
        kana: "だしもの",
        en: "The performance, no speaking part",
        tip: "You three are doing the ceremony support and the 出し物 instead of a speech, so there is no line here to learn. Ask a teacher what the item is and when you rehearse it. Everyone takes part in this one." },

      { section: "Tuesday 29 September · the farewell party",
        label: "Student 1",
        ja: "こんばんは。ホストファミリーのみなさん、この一週間、本当にありがとうございました。\n毎日が　新しい発見で、あっという間の一週間でした。みなさんの優しさを、私たちはずっと忘れません。",
        furi: "こんばんは。ホストファミリーのみなさん、この一週間[いっしゅうかん]、本当[ほんとう]にありがとうございました。\n毎日[まいにち]が　新[あたら]しい発見[はっけん]で、あっという間[ま]の一週間[いっしゅうかん]でした。みなさんの優[やさ]しさを、私[わたし]たちはずっと忘[わす]れません。",
        kana: "こんばんは。ホストファミリーのみなさん、このいっしゅうかん、ほんとうにありがとうございました。\nまいにちが　あたらしいはっけんで、あっというまのいっしゅうかんでした。みなさんのやさしさを、わたしたちはずっとわすれません。",
        en: "Good evening. To our host families, thank you so much for this week. Every day brought something new and the week went by in a flash. We will never forget your kindness.",
        tip: "Evening, at Sunroad Kibiji, so こんばんは rather than こんにちは. This is a draft: you are expected to put it in your own words closer to the day, keeping the same ideas." },

      { label: "Student 2",
        ja: "また会える日を、心から楽しみにしています。\n皆さんも　ぜひ、メルボルンへ　来てください。\nありがとうございました。",
        furi: "また会[あ]える日[ひ]を、心[こころ]から楽[たの]しみにしています。\n皆[みな]さんも　ぜひ、メルボルンへ　来[き]てください。\nありがとうございました。",
        kana: "またあえるひを、こころからたのしみにしています。\nみなさんも　ぜひ、メルボルンへ　きてください。\nありがとうございました。",
        en: "We are truly looking forward to the day we can meet again. Please come to Melbourne yourselves. Thank you.",
        tip: "You finish the evening. Same as Student 1: this is a draft to make your own." },

      { section: "Wednesday 30 September · leaving",
        label: "Student 8",
        ja: "みなさん、本当にお世話になりました。\n総社で、たくさんの思い出ができました。\nまた再会できるのを楽しみにしています。ありがとうございました！",
        furi: "みなさん、本当[ほんとう]にお世話[せわ]になりました。\n総社[そうじゃ]で、たくさんの思[おも]い出[で]ができました。\nまた再会[さいかい]できるのを楽[たの]しみにしています。ありがとうございました！",
        kana: "みなさん、ほんとうにおせわになりました。\nそうじゃで、たくさんのおもいでができました。\nまたさいかいできるのをたのしみにしています。ありがとうございました！",
        en: "Thank you all so much for everything. We made so many memories in Soja. We are looking forward to seeing you again. Thank you!",
        tip: "At the bus, nothing scheduled, nobody in rows. Short and warm is the whole job." },

      { label: "Everyone, together",
        ja: "ありがとうございました！　また　あいましょう！",
        en: "Thank you very much! Let's meet again!",
        tip: "All fourteen of us, together, at the bus. Nobody has to speak alone and this is the one everybody can say." }

    ]
  },
  {
    id: "tspeech",
    say: false,
    ja: "せんせいのスピーチ",
    en: "The teachers' speeches",
    unit: "speeches",
    note: "Not yours to learn, but worth knowing what comes before your bit. " +
          "Every name is a blank here, including the people being thanked: on " +
          "the day the exact form of address comes off the printed document, " +
          "which has the surnames and the correct titles on it. Read these as " +
          "the shape of each ceremony rather than as a script.",
    items: [

      { section: "Thursday 24 September · the first meeting",
        label: "The principal",
        ja: "みなさん、はじめまして！キューハイスクール校長の＿＿＿です。\n副市長様、教育長様、総社西中学校の校長先生をはじめ、教育委員会の皆様、総社西中学校の先生方、そしてホストファミリーの皆さん、今日は本当にありがとうございます。ついに　みなさんに会えて、とても嬉しいです。\n京都や姫路、宮島をまわって、今日、総社西中学校に到着しました。こんなに温かく迎えていただいて、感激しています。\nこの交流は2007年に総社の皆さんがメルボルンへ来てくださったのが始まりで、今年で19年目、キューハイスクールにとっては7回目の総社訪問です。この一週間、たくさん笑って、たくさん　お友達になれたらいいなと思います。\nよろしくお願いします！",
        furi: "みなさん、はじめまして！キューハイスクール校長[こうちょう]の＿＿＿です。\n副市長様[ふくしちょうさま]、教育長様[きょういくちょうさま]、総社西中学校[そうじゃにしちゅうがっこう]の校長先生[こうちょうせんせい]をはじめ、教育委員会[きょういくいいんかい]の皆様[みなさま]、総社西中学校[そうじゃにしちゅうがっこう]の先生方[せんせいがた]、そしてホストファミリーの皆[みな]さん、今日[きょう]は本当[ほんとう]にありがとうございます。ついに　みなさんに会[あ]えて、とても嬉[うれ]しいです。\n京都[きょうと]や姫路[ひめじ]、宮島[みやじま]をまわって、今日[きょう]、総社西中学校[そうじゃにしちゅうがっこう]に到着[とうちゃく]しました。こんなに温[あたた]かく迎[むか]えていただいて、感激[かんげき]しています。\nこの交流[こうりゅう]は2007年[ねん]に総社[そうじゃ]の皆[みな]さんがメルボルンへ来[き]てくださったのが始[はじ]まりで、今年[ことし]で19年目[ねんめ]、キューハイスクールにとっては7回目[かいめ]の総社訪問[そうじゃほうもん]です。この一週間[いっしゅうかん]、たくさん笑[わら]って、たくさん　お友達[ともだち]になれたらいいなと思[おも]います。\nよろしくお願[ねが]いします！",
        en: "Hi everyone! I'm ___, the principal of Kew High School. Thank you to the Vice Mayor, the Chief of the Board of Education and the Principal of Soja Nishi Junior High School, along with everyone from the Board of Education, the teachers here, and our host families, for having us today. It is wonderful to finally meet you all in person. We have travelled through Kyoto, Himeji and Miyajima, and today we have arrived at Soja Nishi Junior High School. Thank you for such a warm welcome. This exchange began in 2007, when Soja first came to us in Melbourne. This is our 19th year, and Kew High School's 7th visit to Soja. My hope for this week is simple: lots of laughs, and lots of new friends.",
        tip: "Opens the evening, in English with a teacher reading the Japanese. Students 9, 10 and 11 follow." },

      { section: "Friday 25 September · the welcome assembly",
        label: "The principal",
        ja: "総社西中学校のみなさん、こんにちは。キューハイスクール校長の＿＿＿です。\n画面越しですが、みなさんにご挨拶できて嬉しいです。今日から一週間、私たちの生徒がお世話になります。\nたくさん話しかけて、たくさん友達になってください。よろしくお願いします。",
        furi: "総社西中学校[そうじゃにしちゅうがっこう]のみなさん、こんにちは。キューハイスクール校長[こうちょう]の＿＿＿です。\n画面越[がめんご]しですが、みなさんにご挨拶[あいさつ]できて嬉[うれ]しいです。今日[きょう]から一週間[いっしゅうかん]、私[わたし]たちの生徒[せいと]がお世話[せわ]になります。\nたくさん話[はな]しかけて、たくさん友達[ともだち]になってください。よろしくお願[ねが]いします。",
        en: "Hello, everyone at Soja Nishi Junior High School. I'm ___, the principal of Kew High School. Even through a screen, it is wonderful to greet you all. For the week ahead, our students will be in your care. Please talk to them as much as you can, and make lots of friends. Thank you.",
        tip: "Broadcast from the music room. Then Students 5, 6 and 7, then all fourteen say their own names." },

      { section: "During the week · the staffroom",
        label: "The principal",
        ja: "みなさん、こんにちは！総社西中学校に来られて嬉しいです。\n総社訪問はもう7回目、交流は19年目になります。いつも温かく迎えてくださって、本当にありがとうございます。\n今週もどうぞよろしくお願いします！",
        furi: "みなさん、こんにちは！総社西中学校[そうじゃにしちゅうがっこう]に来[こ]られて嬉[うれ]しいです。\n総社訪問[そうじゃほうもん]はもう7回目[かいめ]、交流[こうりゅう]は19年目[ねんめ]になります。いつも温[あたた]かく迎[むか]えてくださって、本当[ほんとう]にありがとうございます。\n今週[こんしゅう]もどうぞよろしくお願[ねが]いします！",
        en: "Hi everyone! Great to be back at Soja Nishi Junior High School. This is our 7th visit, and our 19th year of this exchange. Thank you for always making us feel so welcome. Looking forward to a great week with you all.",
        tip: "Informal, to the staff rather than the school. No day or time set for this one yet." },

      { label: "The head of science",
        ja: "総社西中学校の皆さん、はじめまして。＿＿＿と申します。キューハイスクールで理科主任をしています。\n今回、生徒たちと一緒に総社に来ることができて、とても嬉しく思っています。\n一週間、どうぞよろしくお願いいたします。",
        furi: "総社西中学校[そうじゃにしちゅうがっこう]の皆[みな]さん、はじめまして。＿＿＿と申[もう]します。キューハイスクールで理科主任[りかしゅにん]をしています。\n今回[こんかい]、生徒[せいと]たちと一緒[いっしょ]に総社[そうじゃ]に来[く]ることができて、とても嬉[うれ]しく思[おも]っています。\n一週間[いっしゅうかん]、どうぞよろしくお願[ねが]いいたします。",
        en: "Hello everyone at Soja Nishi Junior High School. My name is ___ and I am head of science at Kew High School. I am very glad to be here in Soja with the students. Thank you very much for the week ahead.",
        tip: "Opening in Japanese instead of having it read for you, which goes down well in a staffroom." },

      { section: "Tuesday 29 September · the farewell assembly",
        label: "The principal",
        ja: "総社西中学校の皆さん、こんにちは。私たちの交流はあっという間に終わってしまいましたが、一週間、とてもお世話になり、ありがとうございました。総社西中学校の皆さんのおかげで、とても素晴らしい一週間を過ごすことができました。皆さんとてもいい思い出を作ることができ、感謝しています。\n皆さんと一緒に過ごした楽しい時間、新しい体験、そして、皆さんから教えていただいた日本の文化を、私たちは一生の思い出として大切にします。これからも、この貴重な交流プログラムをずっと続けていきたいと思っています。\n私たちは、また2年後にこちらに伺うつもりですが、その前に総社市の皆さんがメルボルンにいらっしゃいますね。メルボルンでお待ちしています。皆さんとお会いできるのを楽しみにしています。\nありがとうございます。",
        furi: "総社西中学校[そうじゃにしちゅうがっこう]の皆[みな]さん、こんにちは。私[わたし]たちの交流[こうりゅう]はあっという間[ま]に終[お]わってしまいましたが、一週間[いっしゅうかん]、とてもお世話[せわ]になり、ありがとうございました。総社西中学校[そうじゃにしちゅうがっこう]の皆[みな]さんのおかげで、とても素晴[すば]らしい一週間[いっしゅうかん]を過[す]ごすことができました。皆[みな]さんとてもいい思[おも]い出[で]を作[つく]ることができ、感謝[かんしゃ]しています。\n皆[みな]さんと一緒[いっしょ]に過[す]ごした楽[たの]しい時間[じかん]、新[あたら]しい体験[たいけん]、そして、皆[みな]さんから教[おし]えていただいた日本[にほん]の文化[ぶんか]を、私[わたし]たちは一生[いっしょう]の思[おも]い出[で]として大切[たいせつ]にします。これからも、この貴重[きちょう]な交流[こうりゅう]プログラムをずっと続[つづ]けていきたいと思[おも]っています。\n私[わたし]たちは、また2年後[ねんご]にこちらに伺[うかが]うつもりですが、その前[まえ]に総社市[そうじゃし]の皆[みな]さんがメルボルンにいらっしゃいますね。メルボルンでお待[ま]ちしています。皆[みな]さんとお会[あ]いできるのを楽[たの]しみにしています。\nありがとうございます。",
        en: "Hello, everyone at Soja Nishi Junior High School. Our time together has flown by, but thank you so much for taking care of us throughout the week. Thanks to everyone here, we have had a truly wonderful week, and we are grateful to have made such good memories. The time we spent together, the new experiences, and the Japanese culture you taught us will be cherished as lifelong memories. We hope to continue this exchange for many years to come. We plan to visit again in two years, but before that we look forward to welcoming Soja to Melbourne. Thank you very much.",
        tip: "English from the principal, Japanese read by a teacher. Students 3 and 4 follow, then everyone's calligraphy character." },

      { section: "Tuesday 29 September · the farewell party",
        label: "The principal",
        ja: "市長さんはじめ、校長先生、先生方、そしてホストファミリーの皆さん、こんばんは。私たちの時間はあっという間に過ぎてしまいましたが、この一週間お世話になり、ありがとうございました。\nホストファミリーの皆さん、先生方、総社市の皆さんのおかげで、とても素晴らしい一週間を過ごすことができました。皆さんのおかげで、素晴らしい思い出をたくさん作ることができ、感謝しています。皆さんと一緒に過ごした楽しい時間、新しい体験、そして教えていただいた日本の文化は、私たちにとって一生の宝物です。これからも、この貴重な交流プログラムをずっと続けていきたいと思っています。\n私たちは、また2年後に総社市に伺う予定ですが、その前に総社市の生徒さんや先生方がメルボルンにいらっしゃるので、メルボルンでお会いできるのを楽しみにしています。\n改めて、この一週間ありがとうございました。",
        furi: "市長[しちょう]さんはじめ、校長先生[こうちょうせんせい]、先生方[せんせいがた]、そしてホストファミリーの皆[みな]さん、こんばんは。私[わたし]たちの時間[じかん]はあっという間[ま]に過[す]ぎてしまいましたが、この一週間[いっしゅうかん]お世話[せわ]になり、ありがとうございました。\nホストファミリーの皆[みな]さん、先生方[せんせいがた]、総社市[そうじゃし]の皆[みな]さんのおかげで、とても素晴[すば]らしい一週間[いっしゅうかん]を過[す]ごすことができました。皆[みな]さんのおかげで、素晴[すば]らしい思[おも]い出[で]をたくさん作[つく]ることができ、感謝[かんしゃ]しています。皆[みな]さんと一緒[いっしょ]に過[す]ごした楽[たの]しい時間[じかん]、新[あたら]しい体験[たいけん]、そして教[おし]えていただいた日本[にほん]の文化[ぶんか]は、私[わたし]たちにとって一生[いっしょう]の宝物[たからもの]です。これからも、この貴重[きちょう]な交流[こうりゅう]プログラムをずっと続[つづ]けていきたいと思[おも]っています。\n私[わたし]たちは、また2年後[ねんご]に総社市[そうじゃし]に伺[うかが]う予定[よてい]ですが、その前[まえ]に総社市[そうじゃし]の生徒[せいと]さんや先生方[せんせいがた]がメルボルンにいらっしゃるので、メルボルンでお会[あ]いできるのを楽[たの]しみにしています。\n改[あらた]めて、この一週間[いっしゅうかん]ありがとうございました。",
        en: "Good evening to the Mayor, the Principal, the teachers, and our host families. Our time here has flown by. Thank you for taking care of us this past week. Thanks to our host families, the teachers and everyone in Soja City, we have had a wonderful week and made memories we will keep. The time together, the new experiences and the Japanese culture you taught us are a lifelong treasure. We hope this exchange continues for many years. We plan to return in two years, and before that we look forward to seeing Soja's students and teachers in Melbourne. Thank you again for this week.",
        tip: "Evening, at Sunroad Kibiji, delivered in both languages. Students 1 and 2 follow." },

      { section: "Wednesday 30 September · leaving",
        label: "The head of science",
        ja: "みなさん、本当に素晴らしい一週間をありがとうございました。この思い出を大切にします。またお会いできる日を楽しみにしています。",
        furi: "みなさん、本当[ほんとう]に素晴[すば]らしい一週間[いっしゅうかん]をありがとうございました。この思[おも]い出[で]を大切[たいせつ]にします。またお会[あ]いできる日[ひ]を楽[たの]しみにしています。",
        en: "Thank you all for a truly wonderful week. We will cherish these memories and look forward to the day we can meet again.",
        tip: "At the bus, with a teacher translating. Student 8 follows, then everyone together." }

    ]
  },
  {
    id: "signs",
    say: false,
    ja: "かんじをよむ",
    en: "Reading the signs",
    unit: "signs",
    note: "You do not have to write any of these. You have to recognise them " +
          "fast enough not to miss a train or walk into the wrong room. Most " +
          "are two characters and most repeat, so learning ten of them unlocks " +
          "far more than ten signs.",
    items: [
      { section: "At the station",
        ja: "出口", en: "Way out", art: "exit",
        tip: "でぐち. 口 means mouth or opening, and it is on the end of almost every way in or out in Japan. Learn 口 and half this section makes sense straight away." },
      { ja: "入口", en: "Way in", art: "entrance", tip: "いりぐち. The pair to 出口." },
      { ja: "東口　西口　南口　北口", en: "East, west, south, north exit", art: "compass",
        tip: "ひがしぐち, にしぐち, みなみぐち, きたぐち. A big station has several and they can be ten minutes apart on opposite sides of the building. Agree which one before you split up, and if you get it wrong you are not lost, you are just on the wrong side." },
      { ja: "中央口", en: "Central exit", tip: "ちゅうおうぐち. Usually the main one." },
      { ja: "改札", en: "Ticket gate", art: "gate",
        tip: "かいさつ. The barriers. 改札口 is the same thing with 口 on the end. Keep your ticket: you need it to get out as well as in." },
      { ja: "のりば", en: "Boarding point", art: "noriba",
        tip: "Where you stand to get on. Written in kana as often as in kanji." },
      { ja: "ホーム", en: "Platform",
        tip: "From the English word platform, with the first half dropped. Nobody says プラットフォーム." },
      { ja: "３番線", en: "Platform 3", art: "platform",
        tip: "さんばんせん. The number is what matters and it is always a numeral, so this one you can read today." },
      { ja: "大人　　小人", en: "Adult　　Child", art: "fare",
        tip: "おとな and こども. 小人 is the trap. The characters say small person, so you would expect しょうじん, but on a ticket machine or a fare table it is always read こども. Years 7 to 12 pay the adult fare on JR from age 12." },
      { section: "Toilets",
        ja: "男　　女", en: "Men　　Women", art: "toiletmf",
        tip: "おとこ and おんな. Men is usually blue and women usually red, but the colour is a helper, not a rule, and plenty of places use neither. Read the character. 男 has a field 田 over strength 力; 女 is a person kneeling." },
      { ja: "お手洗い　　トイレ", en: "Toilets", art: "toiletword",
        tip: "おてあらい, literally hand-washing, is the polite one and the one on signs. トイレ is what everybody says out loud." },
      { ja: "使用中　　空き", en: "Occupied　　Vacant", art: "latch",
        tip: "しようちゅう and あき. On the latch of a cubicle door, and on the bathroom at your host family's house." },

      { section: "Doors and shops",
        ja: "押す　　引く", en: "Push　　Pull", art: "pushpull",
        tip: "おす and ひく. Often just the single character 押 or 引 on the glass. If a door will not move, you are almost certainly doing the other one." },
      { ja: "営業中", en: "Open", art: "fudaopen",
        tip: "えいぎょうちゅう. 中 on the end of anything means it is happening right now." },
      { ja: "準備中", en: "Not open yet", art: "fudaclosed",
        tip: "じゅんびちゅう, preparing. The staff are inside and the lights are on, but they are not ready. Do not go in." },
      { ja: "定休日", en: "Closed today",
        tip: "ていきゅうび, the regular day off. Small shops in Japan close one fixed day a week rather than at weekends." },
      { ja: "税込　　税抜", en: "Tax included　　Tax not included", art: "tax",
        tip: "ぜいこみ and ぜいぬき. If the shelf says 税抜 the price at the till will be about ten per cent more." },
      { ja: "無料", en: "Free",
        tip: "むりょう. 料 means a charge, and 無 means there is not one." },

      { section: "Temples and shrines",
        ja: "拝観料", en: "Entry fee",
        tip: "はいかんりょう. 料 again, the charge. Grounds are often free and the halls and gardens are not." },
      { ja: "撮影禁止", en: "No photography", art: "nophoto",
        tip: "さつえいきんし. 禁止 means forbidden and it is worth knowing on sight. It appears inside halls where there is something old and unlit." },
      { ja: "立入禁止", en: "Do not enter", art: "noentry",
        tip: "たちいりきんし. Same 禁止. Usually a rope, sometimes just the sign." },
      { ja: "手水舎", en: "The water basin",
        tip: "\u3066\u307f\u305a\u3084, sometimes \u3061\u3087\u3046\u305a\u3084. The stone basin near the entrance. You rinse before you go in, and one scoop of water does the whole thing.\n\n1. Take the ladle in your right hand and fill it once. That is all the water you get.\n2. Pour a little over your left hand.\n3. Move the ladle to your left hand and pour over your right.\n4. Back to your right hand. Pour into your cupped left hand and rinse your mouth from your hand. Never put the ladle to your lips.\n5. Spit quietly beside the basin, onto the stones, not back into the water.\n6. Rinse your left hand once more.\n7. Stand the ladle upright so the last of the water runs down the handle and cleans it, then lay it back face down.\n\nPlenty of basins have no ladle any more and just run water from a spout. Rinse your hands and that is enough." },
      { ja: "御朱印", en: "Shrine stamp",
        tip: "ごしゅいん. Hand-brushed calligraphy and a red seal, done in front of you in a special book. It is a record of a visit, not a souvenir, so it is bad form to ask for one if you have not been in." },

      { section: "School and the house",
        ja: "玄関", en: "The entrance where shoes come off", art: "genkan",
        tip: "げんかん. The step at the door of a house or a school. Shoes point back out towards the door once you have taken them off." },
      { ja: "上ばき", en: "Indoor shoes",
        tip: "うわばき. Japanese schools swap outdoor shoes for these at the door. You will be given a pair." },
      { ja: "保健室", en: "Sick bay", art: "room",
        tip: "ほけんしつ. 室 means room and turns up everywhere: 教室 きょうしつ classroom, 図書室 としょしつ library, 職員室 しょくいんしつ staff room." },
      { ja: "洗濯", en: "Washing",
        tip: "せんたく. On the machine at your host family's house, and in the phrase せんたくをしてもいいですか." },

      { section: "Warnings",
        ja: "危険", en: "Danger", art: "danger",
        tip: "きけん. Usually red or yellow. This is the one to obey without working out why." },
      { ja: "注意", en: "Caution", art: "caution",
        tip: "ちゅうい. Softer than 危険: watch your step, mind the gap, wet floor." },
      { ja: "非常口", en: "Emergency exit", art: "emergency",
        tip: "ひじょうぐち. 口 on the end again. The running green man is the same everywhere in Japan, and in an earthquake or a fire that sign is the one that matters." }
    ]
  },
  {
    id: "wild",
    ja: "とっておき",
    en: "Wild card",
    note: "Phrases nobody expects you to know. Learn one properly and use it once. Each one tells you where it works best.",
    items: [
      { ja: "おつかれさまです。", en: "You've had a long day. / Well done today.",
        tip: "The one that surprises people most. Say it to a host parent coming in from work, or to a student after club practice. It tells them you noticed they have been working hard. English has no sentence that does this, which is why it catches people off guard." },
      { ja: "いってらっしゃい。", en: "Off you go. / Have a good day.",
        tip: "The answer to いってきます. When someone leaves the house in the morning, say this from wherever you are. Most visitors never learn it and a family notices straight away." },
      { ja: "おかえりなさい。", en: "Welcome home.",
        tip: "Say it to whoever comes in, even if you only got home five minutes earlier yourself. It is the pair to ただいま. It sounds like you live there, which is the whole point." },
      { ja: "まちがえたら、なおしてください。", en: "If I make a mistake, please correct me.",
        tip: "Say this early, to your family or to a class. Japanese speakers are often too polite to correct a guest unless you ask, so you have to give them permission. It also tells people you are here to learn, not just to visit." },
      { ja: "りょうりがじょうずですね。", en: "You're a really good cook.",
        tip: "Say it at the table, to whoever actually cooked. Better than おいしい on its own, because it praises the person and not only the food." },
      { ja: "にほんごで、いちばんすきなことばはなんですか。", en: "What is your favourite word in Japanese?",
        tip: "Ask a teacher or a host parent. Almost nobody is ever asked this, everybody has an answer, and the answer usually comes with a story. Have your own ready, because it comes straight back at you." },
      { ja: "こどものとき、どんなあそびをしましたか。", en: "What games did you play when you were a child?",
        tip: "For a host parent or a grandparent, at the dinner table. It moves the conversation off school and food, and older people in particular enjoy being asked something only they can answer." },
      { ja: "このへんで、いちばんすきなばしょはどこですか。", en: "What is your favourite place around here?",
        tip: "Ask it in Soja rather than in Kyoto. Visitors ask about famous places all the time and about ordinary towns almost never. There is a fair chance you end up being taken there." },
      { ja: "オーストラリアについて、しりたいことはありますか。", en: "Is there anything you would like to know about Australia?",
        tip: "Keep this one for when your Japanese runs out. It hands the next question to them, and they will happily carry the conversation for a while. Expect snakes, spiders and how long the flight was." },
      { ja: "いっしょにしゃしんをとりませんか。", en: "Shall we take a photo together?",
        tip: "とりませんか is an invitation rather than a request, which is what makes it the polite one. Ask a group at the end of a class or a club, not one person on their own, and not strangers at a temple." }
    ]
  },
  {
    id: "thanks",
    ja: "おわかれ",
    en: "Saying goodbye",
    note: "The last morning. Worth rehearsing so you can get through it.",
    items: [
      { ja: "ほんとうにおせわになりました。", en: "Thank you sincerely for everything.", tip: "This is the one. It carries real weight in Japanese." },
      { ja: "たのしかったです。", en: "I had a great time." },
      { ja: "また、あいましょう。", en: "Let's meet again." },
      { ja: "オーストラリアにきてください。", en: "Please come to Australia." }
    ]
  }
];

/* ---------------------------------------------------------------------------
   MANNERS
   Short, blunt, and only things that actually come up on this trip.
   ------------------------------------------------------------------------- */
/* ------------------------------------------------------------------ *
 * PREFLIGHT: the one page in this app that needs wifi and is meant to *
 * be finished before anybody leaves. Every store link is opened at    *
 * home, on purpose.                                                   *
 * ------------------------------------------------------------------ */
window.PREFLIGHT = {
  ja: "しゅっぱつのまえに",
  en: "Before you fly",
  note: "Do all of this at home on wifi, in the week before we go. Doing it " +
        "at the airport means fourteen people downloading at once on a bad " +
        "connection, and doing it in Japan means paying for the data. Tap an " +
        "item to tick it off. The ticks are yours and nobody else sees them.",
  items: [
    {
      id: "vjw",
      name: "Visit Japan Web",
      why: "The government site for your arrival and customs details. Fill it " +
           "in before you fly and you walk past the paper forms at Kansai " +
           "instead of filling them in standing up.",
      how: "It is a website, not an app. Bookmark it, and screenshot the QR " +
           "codes it gives you at the end: you need them when you land, and " +
           "you may not have signal in the arrivals hall.",
      site: { url: "https://www.vjw.digital.go.jp/", label: "Open Visit Japan Web" }
    },
    {
      id: "maps",
      name: "Google Maps",
      why: "Train times, platform numbers and walking directions. This is the " +
           "one you will use most.",
      how: "Install it, then download the offline map for each city while you " +
           "still have wifi: search the city, tap its name along the bottom, " +
           "then Download. Offline maps still give you walking directions " +
           "with no signal at all.",
      ios: "https://apps.apple.com/us/app/google-maps/id585027354",
      android: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps"
    },
    {
      id: "translate",
      name: "Google Translate",
      why: "Point the camera at a sign or a menu and it reads it for you. " +
           "Useful the moment the kanji stops being the ones you know.",
      how: "Open it, go to offline languages and download Japanese. Do this " +
           "before you fly or the camera will not work without signal.",
      ios: "https://apps.apple.com/us/app/google-translate/id414706506",
      android: "https://play.google.com/store/apps/details?id=com.google.android.apps.translate"
    },
    {
      id: "voicetra",
      name: "VoiceTra",
      why: "You speak, it says it in Japanese, they answer, it says it back in " +
           "English. Built by Japan's own national research institute and " +
           "noticeably better than Google Translate at an actual back and " +
           "forth conversation, which is what you will want at the dinner " +
           "table.",
      how: "It is free and there is nothing to set up.",
      ios: "https://apps.apple.com/us/app/voicetra/id581137577",
      android: "https://play.google.com/store/apps/details?id=jp.go.nict.voicetra"
    },
  ],
  extra: {
    head: "Worth having, not worth stressing about",
    text: "Tabelog is what people in Japan actually use to find somewhere to " +
          "eat, and is handy on the days you are choosing your own meals. " +
          "Japan Transit Planner and Navitime are dedicated train apps some " +
          "people prefer as a backup when a line gets complicated. Search the " +
          "store yourself for these two rather than following a link: we have " +
          "not checked their current listings, and store addresses go stale."
  }
};

/* ------------------------------------------------------------------ *
 * MONEY: no app in Japan can look up a rate, so the student sets it   *
 * and the whole page follows. Prices are ballpark, and say so.        *
 * ------------------------------------------------------------------ */
window.MONEY = {
  ja: "おかね",
  en: "Money",
  rate: 110,
  note: "Set the rate yourself and everything below follows it. Check it " +
        "each morning on wifi, the same way you would check the weather: " +
        "the yen moves, and by the end of twelve days it will not be what " +
        "it was when we left.",
  shortcutHead: "Doing it in your head",
  shortcut: "Learn the \u00a51000 line above and work from it: half of it is " +
            "\u00a5500, ten of it is \u00a510000. You almost never need to be " +
            "exact, you need to know whether something is a coffee or a " +
            "jacket. Today \u00a51000 is about ",
  ladder: [100, 500, 1000, 3000, 5000, 10000],
  icHead: "Getting an IC card working",
  icNote: "One card taps you through the ticket gates and pays at the " +
          "convenience store, and what you do about it depends entirely on " +
          "which phone you have. Read your half and ignore the other one.",
  ic: [
    { label: "On an iPhone",
      text: "Download Welcome Suica Mobile and set it up before you fly. You " +
            "can top it up with an ordinary Australian card through Apple " +
            "Pay. Needs an iPhone XR or newer running iOS 17.2 or later, so " +
            "check yours now rather than at the airport.",
      url: "https://apps.apple.com/us/app/id6738336566" },
    { label: "On an Android",
      text: "Assume it will not work. Mobile Suica generally only runs on " +
            "phones actually sold in Japan, whatever the store page says. " +
            "Plan to buy a plastic card instead: Suica, PASMO and ICOCA all " +
            "do the same job and you can get one at the airport or at the " +
            "first station. This is normal and it is not a problem." }
  ],
  costsHead: "What things actually cost",
  costsNote: "Rough prices, to give you a feel for whether something is " +
             "cheap or dear before you convert it. Nothing here is exact and " +
             "prices differ between a station kiosk and a back street.",
  costs: [
    { what: "A drink from a vending machine", yen: "140 to 180",
      note: "They are everywhere, they take coins and IC cards, and the red " +
            "label means hot." },
    { what: "Onigiri at a convenience store", yen: "150 to 200",
      note: "A rice ball. One of these and a drink is a normal quick lunch." },
    { what: "A konbini bento or sandwich", yen: "400 to 700",
      note: "They will heat the bento for you if you ask." },
    { what: "A bowl of ramen", yen: "900 to 1200",
      note: "Often ordered from a ticket machine at the door before you sit " +
            "down." },
    { what: "Gyudon, a beef bowl", yen: "500 to 700",
      note: "Fast, filling and about the cheapest hot meal you will find." },
    { what: "Soft serve ice cream", yen: "400 to 600",
      note: "Matcha, and whatever the local one is. Worth it." },
    { what: "A short train or bus ride", yen: "150 to 300",
      note: "Tap in and out with your IC card and you never think about it." },
    { what: "A coin locker at a station", yen: "300 to 700",
      note: "Depends on the size. Useful on a day you are carrying a bag you " +
            "do not want." },
    { what: "Gachapon, a capsule toy", yen: "300 to 500",
      note: "The machines in rows outside shops. You get what you get." },
    { what: "Omamori, a charm from a shrine", yen: "500 to 1000",
      note: "Bought for a purpose, study or health or safe travel, rather " +
            "than as a keepsake." },
    { what: "Goshuin, a shrine or temple stamp", yen: "300 to 500",
      note: "Brushed in front of you. You need the book to put it in, which " +
            "costs more." },
    { what: "A box of sweets to take home", yen: "800 to 1500",
      note: "The regional ones at station shops are the point. Individually " +
            "wrapped, which is why they work as a present." }
  ]
};

/* ------------------------------------------------------------------ *
 * EMERGENCY: two numbers that never change, and the words to say once *
 * somebody picks up. Trip-specific numbers stay on the lanyard.       *
 * ------------------------------------------------------------------ */
window.EMERGENCY = {
  ja: "きんきゅう",
  en: "If something goes wrong",
  note: "Read this now, before you need it. Your teachers' numbers, the " +
        "hotel and your insurance details are on your lanyard, not in here.",
  numbers: [
    { n: "110", ja: "けいさつ", who: "Police",
      detail: "Crime, or something that feels threatening." },
    { n: "119", ja: "しょうぼう・きゅうきゅう", who: "Fire and ambulance",
      detail: "Fire, or anybody hurt or seriously ill. The same number does " +
              "both." }
  ],
  facts: "Both are free, and both work from any phone, including a locked " +
         "one and one with no Japanese SIM. Say your words slowly. Ask for " +
         "English and wait: an interpreter can be brought onto the call, but " +
         "it takes a moment, so do not hang up.",
  sayHead: "What to say",
  say: [
    { ja: "たすけて ください。", en: "Help, please." },
    { ja: "きゅうきゅうしゃ を おねがいします。", en: "An ambulance, please." },
    { ja: "けいさつ を おねがいします。", en: "The police, please." },
    { ja: "かじ です。", en: "There is a fire." },
    { ja: "けが を しました。", en: "I am hurt." },
    { ja: "ともだち が けが を しました。", en: "My friend is hurt." },
    { ja: "えいご が わかる ひと は いますか。",
      en: "Is there anyone who understands English?" }
  ],
  whereHead: "Saying where you are",
  where: "This is the hard part on a phone. Look for the nearest sign and " +
         "read it out, even badly: a station name, a shop name, a street " +
         "sign. If you cannot find one, ask the nearest person " +
         "\u300c\u3053\u3053\u306f \u3069\u3053 \u3067\u3059\u304b\u3002\u300d " +
         "and hand them the phone. People will help.",
  lostHead: "If you are just lost",
  lost: "Not an emergency, and it happens on every tour. Stop walking. Go " +
        "into the nearest convenience store or up to a station attendant, " +
        "say \u300c\u307f\u3061\u306b \u307e\u3088\u3044\u307e\u3057\u305f\u3002\u300d " +
        "and show them where you are trying to get to. Then ring a teacher. " +
        "Staying put and being found is always faster than wandering.",
  /* Andrew supplied this one. Stored in international form because most of
     the group will be on an Australian SIM roaming, where 03- does not
     connect; +81 works from a Japanese phone too, so one number covers
     everybody and nobody has to work out which case they are in. */
  consularNote: "Not the first call, and probably not the second. If somebody " +
                "is hurt it is 119, and for anything else at all it is your " +
                "teacher before anyone else. These are for the serious and " +
                "unusual: a lost or stolen passport, or being arrested. They " +
                "are in the order you should try them.",
  consular: [
    { n: "+61 2 6261 3305",
      tag: "24 hours, every day",
      who: "Consular Emergency Centre, Canberra",
      detail: "The only one of these that is staffed around the clock. If it " +
              "is the middle of the night in Japan and something serious has " +
              "happened, this is the one that answers. From inside Australia " +
              "it is 1300 555 135, which is the number to give your family " +
              "before you go." },
    { n: "+81 6 6941 9448",
      tag: "Osaka, business hours",
      who: "Australian Consulate-General, consular section",
      detail: "The nearest Australian office to everywhere we are going, and " +
              "the right department to reach directly. If nobody picks up, " +
              "the switchboard is +81 6 6941 9271. You can also walk in: " +
              "Twin 21 MID Tower, 16th floor, 2-1-61 Shiromi, Chuo-ku, Osaka." },
    { n: "+81 3 5232 4111",
      tag: "Tokyo, business hours",
      who: "Australian Embassy",
      detail: "The embassy itself, and by far the furthest from us. Try Osaka " +
              "first. From a Japanese phone this one is 03-5232-4111." }
  ]
};

/* ------------------------------------------------------------------ *
 * REVISE: the rest of the suite, for the long stretches. Needs wifi,  *
 * and says so, because everything else in this app does not.          *
 * ------------------------------------------------------------------ */
window.REVISE = {
  ja: "ふくしゅう",
  en: "Revision on the plane and in the evenings",
  note: "The grammar hub and the rest of the tools are on the same site as " +
        "this app. Handy on a long flight or a quiet evening at the hotel. " +
        "Unlike the rest of this app these need wifi, so open them at the " +
        "hotel rather than on a train.",
  links: [
    { url: "https://liaminhawai-cmd.github.io/japanese-hub/grammar/",
      label: "Grammar hub" },
    { url: "https://liaminhawai-cmd.github.io/japanese-hub/",
      label: "\u30b8\u30e3\u30d7\u30ea, everything else" }
  ]
};

window.MANNERS = [
  { ja: "京都のマナー", en: "Kyoto in particular",
    body: "More is asked of visitors in Kyoto than anywhere else you are going, simply because so many people go there. The city's own advice comes down to a few things. In Gion, if you see a geiko or maiko in the street, do not stop her, touch her, follow her or photograph her. She is on her way to work, and many of those side streets are private property where you cannot take photos at all. In a crowd, do not stop dead to talk or take a picture, and do not spread out four abreast, which a group of fourteen does without noticing. Use a bin or carry your rubbish, and smoke only in a marked smoking area. On trains and buses, keep your voice down, do not take calls, and give up your seat.",
    link: { url: "https://kyoto.travel/en/responsible-travel/mind-your-manners/",
            label: "Kyoto City's own guide for visitors" } },

  { ja: "くつ", en: "Shoes", body: "Shoes come off at the door: at home, at school, and inside temple buildings. A step or a change in the flooring shows you where. Once they are off, turn them round to face the door, which is what everyone else does. You will do this several times a day, so your socks are on show a lot more than you are used to." },
  { ja: "はし", en: "Chopsticks", body: "Two things to avoid at the table, both because they belong to funerals: never stand your chopsticks upright in rice, and never pass food from your chopsticks straight to someone else's. The rest is easy. Between mouthfuls, rest them on the little holder next to your plate." },
  { ja: "おふろ", en: "The bath", body: "Wash and rinse yourself properly at the taps first, sitting down, and only get in the bath once you are clean. The whole family uses the same water after you, so no soap goes in it and the plug stays put. Your host family will tell you when it is your turn." },
  { ja: "ゴミ", en: "Rubbish", body: "There are almost no public bins, so most people carry their rubbish around until they get home. Convenience stores will have a bin for things you bought there. People do not usually eat while they walk either: they finish it standing where they bought it." },
  { ja: "こえ", en: "Volume", body: "Trains and buses are quiet. People text instead of taking calls, wear headphones, and talk in low voices. It feels very hushed at first. Listen to how the carriage sounds when you get on, and match it." },
  { ja: "おじぎ", en: "Bowing", body: "A small bow from the waist does the job of hello, thank you and sorry. How deep it goes depends on the situation, but nobody expects a visitor to get that exactly right. Any bow at all comes across as polite, so bow." },
  { ja: "チップ", en: "Tipping", body: "Nobody tips in Japan, not in restaurants, taxis or hotels. Leave money behind and you will confuse someone, or they will chase you down the street to give it back. Good service is simply part of what you paid for." },
  { ja: "けいたい", en: "Phones", body: "The sister school does not allow phones during school hours, and that goes for us as well while we are there. Everywhere else yours is useful as a camera and a translator. Most people find they pick it up far less on a trip like this than they expected to." }
];
