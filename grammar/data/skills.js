/* ============================================================
   JAPANESE HUB — GRAMMAR CONTENT
   ------------------------------------------------------------
   GRAMMAR ONLY. Script and word-building live in their own apps
   on the hub landing page (Liam's call: "don't force scripts onto
   grammar hub"). The parked Script strand is data/script-bank.js.

   Every strand name (window.JT_STRANDS) and chunk title (t:[...])
   carries four forms — kanji, kana, romaji, English — for the
   language lever. Items themselves are still English-instruction
   (J11 pending Andrew's ruling on prompt wording).

   window.JP_CHUNKS is the Prep-to-Year-12 timeline: one row per
   grammatical system; chunks may cover several skill nodes and
   may carry needs:[] cross-strand prerequisites.

   Before committing, run the sanity check in SPEC.md §9. It must
   print "problems 0".
   ============================================================ */

window.SKILLS = [
  {
    id:"greet-f2", category:"Requests and Politeness", band:"script",
    name:"Everyday greetings",
    example:"おはようございます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does this greeting mean?",
        sentence:"<b>おはようございます</b>",
        options:["Good morning","Good evening","Goodbye","Thank you"],
        answer:"Good morning",
        explain:"おはようございます is the polite way to say good morning."
      },
      {
        type:"identify",
        prompt:"What does this greeting mean?",
        sentence:"<b>こんにちは</b>",
        options:["Hello / Good afternoon","Good morning","Good night","See you"],
        answer:"Hello / Good afternoon",
        explain:"こんにちは is used in the middle of the day."
      },
      {
        type:"identify",
        prompt:"What does this greeting mean?",
        sentence:"<b>こんばんは</b>",
        options:["Good evening","Good morning","Goodbye","Welcome"],
        answer:"Good evening",
        explain:"こんばんは is used in the evening."
      },
      {
        type:"identify",
        prompt:"What does this mean?",
        sentence:"<b>ありがとうございます</b>",
        options:["Thank you","Sorry","Please","Excuse me"],
        answer:"Thank you",
        explain:"ありがとうございます is a polite thank you."
      },
      {
        type:"identify",
        prompt:"What does this mean?",
        sentence:"<b>さようなら</b>",
        options:["Goodbye","Hello","Good night","Welcome back"],
        answer:"Goodbye",
        explain:"さようなら is goodbye."
      },
      {
        type:"identify",
        prompt:"Your teacher says おはようございます in the morning. What do you say back?",
        sentence:"Teacher: <b>おはようございます</b>",
        options:["おはようございます","さようなら","こんばんは","ありがとう"],
        answer:"おはようございます",
        explain:"You return the same greeting: おはようございます."
      },
      {
        type:"identify",
        prompt:"Which greeting would you use at 8 o'clock at night?",
        sentence:"8:00 pm",
        options:["こんばんは","おはようございます","こんにちは","いただきます"],
        answer:"こんばんは",
        explain:"こんばんは is the evening greeting."
      }
    ]
  },

  {
    id:"greet-y34", category:"Requests and Politeness", band:"words",
    name:"Classroom language and meeting someone",
    example:"はじめまして。どうぞよろしく。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Your teacher says this. What should you do?",
        sentence:"<b>すわってください。</b>",
        options:["Sit down","Stand up","Listen","Look"],
        answer:"Sit down",
        explain:"すわってください means 'please sit down'. ください makes it a polite request."
      },
      {
        type:"identify",
        prompt:"Your teacher says this. What should you do?",
        sentence:"<b>たってください。</b>",
        options:["Stand up","Sit down","Write","Read"],
        answer:"Stand up",
        explain:"たってください means 'please stand up'."
      },
      {
        type:"identify",
        prompt:"Your teacher says this. What should you do?",
        sentence:"<b>きいてください。</b>",
        options:["Listen","Speak","Sit","Leave"],
        answer:"Listen",
        explain:"きいてください means 'please listen'."
      },
      {
        type:"identify",
        prompt:"What does this mean?",
        sentence:"<b>はじめまして。</b>",
        options:["Nice to meet you (for the first time)","Goodbye","Thank you","Good morning"],
        answer:"Nice to meet you (for the first time)",
        explain:"はじめまして is said only when meeting someone for the first time."
      },
      {
        type:"identify",
        prompt:"What does this mean?",
        sentence:"<b>どうぞよろしく。</b>",
        options:["Pleased to meet you / please be kind to me","Goodbye for now","Thank you very much","Excuse me"],
        answer:"Pleased to meet you / please be kind to me",
        explain:"どうぞよろしく follows はじめまして when you introduce yourself. There is no exact English equivalent."
      },
      {
        type:"order",
        prompt:"Put this first meeting in the right order.",
        words:["はじめまして。","どうぞよろしく。"],
        answer:"はじめまして。どうぞよろしく。",
        explain:"You open with はじめまして and close with どうぞよろしく."
      },
      {
        type:"identify",
        prompt:"What do you say before you start eating?",
        sentence:"(before a meal)",
        options:["いただきます","ごちそうさまでした","おやすみなさい","ただいま"],
        answer:"いただきます",
        explain:"いただきます is said before eating; ごちそうさまでした is said afterwards."
      }
    ]
  },

  {
    id:"greet-y56", category:"Requests and Politeness", band:"sentences",
    name:"Introducing yourself, and choosing how polite to be",
    example:"わたしはエマです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"order",
        prompt:"Introduce yourself: 'I am Emma.'",
        words:["わたし","は","エマ","です"],
        answer:"わたしはエマです",
        explain:"わたしは (as for me) + your name + です. Your name is written in katakana if it is not Japanese."
      },
      {
        type:"identify",
        prompt:"What is this person saying?",
        sentence:"わたしは<b>十四さい</b>です。",
        options:["I am 14 years old","I am in year 14","I have 14 friends","It is 14 o'clock"],
        answer:"I am 14 years old",
        explain:"〜さい gives an age: 十四さい is 14 years old."
      },
      {
        type:"identify",
        prompt:"What is this person saying?",
        sentence:"<b>オーストラリアから来ました。</b>",
        options:["I came from Australia","I am going to Australia","I like Australia","I live in Australia"],
        answer:"I came from Australia",
        explain:"〜から来ました means 'came from ~'. から marks the starting point."
      },
      {
        type:"order",
        prompt:"Say where you are from: 'I came from Australia.'",
        words:["オーストラリア","から","来ました"],
        answer:"オーストラリアから来ました",
        explain:"Place + から + 来ました."
      },
      {
        type:"identify",
        prompt:"Which is the polite way to ask someone's name?",
        sentence:"(meeting a teacher for the first time)",
        options:["お名前は何ですか。","名前！","だれ？","何？"],
        answer:"お名前は何ですか。",
        explain:"お名前は何ですか。is the polite question. The お at the front makes it respectful."
      },
      {
        type:"identify",
        prompt:"What does どうぞよろしくおねがいします add, compared with どうぞよろしく?",
        sentence:"<b>どうぞよろしくおねがいします。</b>",
        options:["it is more polite","it means something completely different","it is more casual","it is a question"],
        answer:"it is more polite",
        explain:"おねがいします makes the phrase more polite — used with teachers and adults rather than close friends."
      },
      {
        type:"identify",
        prompt:"You are introduced to your friend's grandmother. Which greeting fits best?",
        sentence:"(meeting an older person for the first time)",
        options:["はじめまして。どうぞよろしくおねがいします。","やあ！","おっす","またね"],
        answer:"はじめまして。どうぞよろしくおねがいします。",
        explain:"Politeness in Japanese changes with who you are speaking to. The full polite form is right for an older person you have just met."
      }
    ]
  },

  {
    id:"identity-f2", category:"Sentences", band:"script",
    name:"これはXです",
    example:"これはねこです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"<b>これはねこです。</b>",
        options:["This is a cat","That is a dog","I like cats","Is this a cat?"],
        answer:"This is a cat",
        explain:"これ = this, は marks it as the topic, ねこ = cat, です = is."
      },
      {
        type:"order",
        prompt:"Build the sentence: 'This is a book.'",
        words:["これ","は","ほん","です"],
        answer:"これはほんです",
        explain:"これは + the thing + です."
      },
      {
        type:"order",
        prompt:"Build the sentence: 'This is a dog.'",
        words:["これ","は","いぬ","です"],
        answer:"これはいぬです",
        explain:"これは + いぬ + です."
      },
      {
        type:"identify",
        prompt:"What does です do at the end of the sentence?",
        sentence:"これはねこ<b>です</b>。",
        options:["it means 'is' and makes the sentence polite","it asks a question","it makes the word plural","it means 'not'"],
        answer:"it means 'is' and makes the sentence polite",
        explain:"です works like 'is' and marks the sentence as polite."
      },
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"<b>わたしはがくせいです。</b>",
        options:["I am a student","You are a student","This is a school","I go to school"],
        answer:"I am a student",
        explain:"わたし = I, は marks the topic, がくせい = student, です = am."
      },
      {
        type:"identify",
        prompt:"Which word means 'I'?",
        sentence:"<b>わたし</b>はがくせいです。",
        options:["わたし","は","がくせい","です"],
        answer:"わたし",
        explain:"わたし means I or me."
      }
    ]
  },

  {
    id:"identity-y34", category:"Sentences", band:"words",
    name:"これ・それ・あれ, and の for belonging",
    example:"これはわたしのほんです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What is the difference between これ and それ?",
        sentence:"<b>これ</b> ・ <b>それ</b>",
        options:["これ is near me; それ is near you","これ is near you; それ is near me","they mean the same thing","これ is a question word"],
        answer:"これ is near me; それ is near you",
        explain:"これ = this (near the speaker), それ = that (near the listener), あれ = that over there (away from both)."
      },
      {
        type:"identify",
        prompt:"Something is far from both you and the person you are talking to. Which word do you use?",
        sentence:"(a building across the street)",
        options:["あれ","これ","それ","どれ"],
        answer:"あれ",
        explain:"あれ is for something away from both speakers."
      },
      {
        type:"identify",
        prompt:"What does this question mean?",
        sentence:"<b>これは何ですか。</b>",
        options:["What is this?","Where is this?","Whose is this?","Is this yours?"],
        answer:"What is this?",
        explain:"何 (なに/なん) means 'what', and か at the end makes it a question."
      },
      {
        type:"identify",
        prompt:"What does の do here?",
        sentence:"これはわたし<b>の</b>ほんです。",
        options:["it shows the book belongs to me","it makes the sentence a question","it means 'and'","it makes the word plural"],
        answer:"it shows the book belongs to me",
        explain:"の links two nouns to show possession: わたしのほん = my book."
      },
      {
        type:"order",
        prompt:"Build the sentence: 'This is my pencil.'",
        words:["これ","は","わたし","の","えんぴつ","です"],
        answer:"これはわたしのえんぴつです",
        explain:"これは + わたしの (my) + えんぴつ + です."
      },
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"<b>それはせんせいのくるまです。</b>",
        options:["That is the teacher's car","This is my car","That car is red","Is that the teacher's car?"],
        answer:"That is the teacher's car",
        explain:"それ = that (near you), せんせいの = the teacher's, くるま = car."
      },
      {
        type:"identify",
        prompt:"How would you answer this question?",
        sentence:"これはあなたのかばんですか。 (Is this your bag?) It IS yours.",
        options:["はい、そうです。","いいえ、そうです。","はい、ちがいます。","いいえ、ちがいます。"],
        answer:"はい、そうです。",
        explain:"はい goes with そうです (yes, that is right), いいえ goes with ちがいます (no, that is not it). The bag is yours, so the answer is はい、そうです。"
      }
    ]
  },

  {
    id:"identity-y56", category:"Sentences", band:"sentences",
    name:"Describing things with い- and な-adjectives",
    example:"このほんはおもしろいです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What is this sentence doing?",
        sentence:"このねこは<b>大きい</b>です。",
        options:["describing the cat","asking about the cat","saying the cat is not there","counting the cats"],
        answer:"describing the cat",
        explain:"大きい (big) is an adjective describing the cat. It sits before です."
      },
      {
        type:"identify",
        prompt:"What is the difference between これ and この?",
        sentence:"<b>これ</b>はねこです。 ／ <b>この</b>ねこは大きいです。",
        options:["これ stands alone; この must be followed by a noun","they are interchangeable","この is more polite","これ is plural"],
        answer:"これ stands alone; この must be followed by a noun",
        explain:"これ = 'this one' by itself. この always attaches to a noun: このねこ = this cat."
      },
      {
        type:"order",
        prompt:"Build the sentence: 'This book is interesting.'",
        words:["この","ほん","は","おもしろい","です"],
        answer:"このほんはおもしろいです",
        explain:"この + noun + は + adjective + です."
      },
      {
        type:"identify",
        prompt:"Which type of adjective is きれい?",
        sentence:"きれい<b>な</b>はな (a pretty flower)",
        options:["a な-adjective — it needs な before a noun","an い-adjective","a verb","a noun"],
        answer:"a な-adjective — it needs な before a noun",
        explain:"Adjectives ending in い like 大きい attach directly (大きいねこ). な-adjectives like きれい need な: きれいなはな. きれい is a な-adjective even though it ends in い."
      },
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"<b>わたしのへやはきれいではありません。</b>",
        options:["My room is not clean","My room is clean","Is my room clean?","My room is big"],
        answer:"My room is not clean",
        explain:"ではありません is the polite negative of です — 'is not'."
      },
      {
        type:"identify",
        prompt:"How do you make this い-adjective negative?",
        sentence:"大きいです → ?",
        options:["大きくないです","大きいではありません","大きくです","大きなです"],
        answer:"大きくないです",
        explain:"い-adjectives drop the い and add くない: 大きい → 大きくないです. な-adjectives and nouns use ではありません instead."
      },
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"きのう、てんきは<b>よかったです</b>。",
        options:["The weather was good yesterday","The weather is good today","The weather will be good","The weather was bad"],
        answer:"The weather was good yesterday",
        explain:"いい becomes よかった in the past — an irregular one worth memorising."
      }
    ]
  },

  {
    id:"identity-y78", category:"Sentences", band:"choices",
    name:"Past and negative: でした・ではありません",
    example:"きのうは日よう日でした。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"きのうは日よう日<b>でした</b>。",
        options:["Yesterday was Sunday","Today is Sunday","Tomorrow is Sunday","Yesterday was not Sunday"],
        answer:"Yesterday was Sunday",
        explain:"でした is the polite past of です — 'was'."
      },
      {
        type:"identify",
        prompt:"Which is the polite past negative?",
        sentence:"がくせいです (is a student) → ?",
        options:["がくせいではありませんでした","がくせいでした","がくせいではありません","がくせいじゃないです"],
        answer:"がくせいではありませんでした",
        explain:"Nouns and な-adjectives: です → でした (was) → ではありませんでした (was not)."
      },
      {
        type:"identify",
        prompt:"What is the difference in tone here?",
        sentence:"きれい<b>ではありません</b> ／ きれい<b>じゃありません</b>",
        options:["じゃ is the more casual contraction of では","they mean different things","じゃ is more polite","では is incorrect"],
        answer:"じゃ is the more casual contraction of では",
        explain:"じゃ is a spoken contraction of では. Both are polite enough for class, but では is the more formal written choice."
      },
      {
        type:"order",
        prompt:"Build: 'That was not my bag.'",
        words:["それ","は","わたし","の","かばん","ではありませんでした"],
        answer:"それはわたしのかばんではありませんでした",
        explain:"それは + わたしの + かばん + ではありませんでした."
      },
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"この店のケーキは<b>おいしくなかったです</b>。",
        options:["The cake was not tasty","The cake is not tasty","The cake was tasty","The cake will not be tasty"],
        answer:"The cake was not tasty",
        explain:"い-adjectives: おいしい → おいしくない (is not) → おいしくなかった (was not)."
      },
      {
        type:"identify",
        prompt:"Which sentence correctly describes a past state with a な-adjective?",
        sentence:"'The park was quiet.'",
        options:["こうえんはしずかでした。","こうえんはしずかかったです。","こうえんはしずくなかったです。","こうえんはしずかいでした。"],
        answer:"こうえんはしずかでした。",
        explain:"な-adjectives behave like nouns: しずか + でした. Only い-adjectives take かった."
      }
    ]
  },

  {
    id:"num-y34", category:"Counting and Time", band:"words",
    name:"Numbers",
    example:"いち・に・さん",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What number is this?",
        sentence:"<b>さん</b>",
        options:["3","1","4","8"],
        answer:"3",
        explain:"さん is 3, written 三."
      },
      {
        type:"identify",
        prompt:"What number is this?",
        sentence:"<b>なな</b> (or しち)",
        options:["7","4","8","9"],
        answer:"7",
        explain:"7 has two readings: なな and しち. Both are correct; なな is clearer when speaking."
      },
      {
        type:"order",
        prompt:"Put these numbers in order from 1 to 5.",
        words:["いち","に","さん","し","ご"],
        answer:"いちにさんしご",
        explain:"1-5: いち, に, さん, し (or よん), ご."
      },
      {
        type:"identify",
        prompt:"What does this kanji number mean?",
        sentence:"<b>十</b>",
        options:["10","1","100","4"],
        answer:"10",
        explain:"十 is 10."
      },
      {
        type:"identify",
        prompt:"How do you say 12 in Japanese?",
        sentence:"12 = 十 + ?",
        options:["じゅうに","にじゅう","じゅうにじゅう","にじゅうに"],
        answer:"じゅうに",
        explain:"Japanese builds numbers by adding: じゅう (10) + に (2) = じゅうに (12). Note にじゅう is 20, the other way round."
      },
      {
        type:"identify",
        prompt:"How do you say 20?",
        sentence:"20 = ?",
        options:["にじゅう","じゅうに","にじゅうに","じゅうじゅう"],
        answer:"にじゅう",
        explain:"に (2) × じゅう (10) = にじゅう (20). The order tells you whether to add or multiply."
      },
      {
        type:"identify",
        prompt:"What does this mean?",
        sentence:"<b>なんさいですか。</b>",
        options:["How old are you?","What is your name?","How many are there?","What time is it?"],
        answer:"How old are you?",
        explain:"なん (what/how many) + さい (years of age) + ですか = How old are you?"
      }
    ]
  },

  {
    id:"num-y56", category:"Counting and Time", band:"sentences",
    name:"Telling the time, and days of the week",
    example:"七時に学校へ行きます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What time is this?",
        sentence:"<b>三時</b>",
        options:["3 o'clock","3 minutes","the 3rd day","3 hours"],
        answer:"3 o'clock",
        explain:"〜時 (じ) makes a clock time: 三時 = 3 o'clock."
      },
      {
        type:"identify",
        prompt:"What does this mean?",
        sentence:"<b>何時ですか。</b>",
        options:["What time is it?","How many hours?","Which day is it?","How old are you?"],
        answer:"What time is it?",
        explain:"何時 (なんじ) = what time."
      },
      {
        type:"identify",
        prompt:"What day is this?",
        sentence:"<b>月よう日</b>",
        options:["Monday","Sunday","Moon day festival","Tuesday"],
        answer:"Monday",
        explain:"月 (moon) + よう日 = Monday. The days use 月火水木金土日 — moon, fire, water, wood, metal, earth, sun."
      },
      {
        type:"identify",
        prompt:"What day is 日よう日?",
        sentence:"<b>日よう日</b>",
        options:["Sunday","Monday","Saturday","Every day"],
        answer:"Sunday",
        explain:"日 (sun) + よう日 = Sunday."
      },
      {
        type:"identify",
        prompt:"What does this sentence mean?",
        sentence:"<b>七時に学校へ行きます。</b>",
        options:["I go to school at 7 o'clock","I go to school for 7 hours","School is 7 minutes away","I leave school at 7"],
        answer:"I go to school at 7 o'clock",
        explain:"に marks a point in time (七時に = at 7 o'clock) and へ marks the destination."
      },
      {
        type:"order",
        prompt:"Build: 'I get up at 6 o'clock.'",
        words:["六時","に","おきます"],
        answer:"六時におきます",
        explain:"Time + に + verb. に is needed with clock times."
      },
      {
        type:"identify",
        prompt:"Which of these time words does NOT take に?",
        sentence:"三時<b>に</b> ／ 月よう日<b>に</b> ／ きょう",
        options:["きょう (today)","三時 (3 o'clock)","月よう日 (Monday)","they all take に"],
        answer:"きょう (today)",
        explain:"Specific clock times and dates take に. Relative words like きょう, あした, まいにち do not."
      }
    ]
  },

  {
    id:"num-y78", category:"Counting and Time", band:"choices",
    name:"Counters, and how often you do something",
    example:"一しゅうかんに三かいおよぎます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Why is 三人 used here rather than 三?",
        sentence:"学生が<b>三人</b>います。",
        options:["〜人 is the counter for people","三人 means three times","it is more polite","it marks the subject"],
        answer:"〜人 is the counter for people",
        explain:"Japanese uses a counter word matched to what is being counted. 〜人 (にん) counts people."
      },
      {
        type:"identify",
        prompt:"Which counter would you use for two books?",
        sentence:"ほんが ___ あります。",
        options:["二さつ","二人","二まい","二ひき"],
        answer:"二さつ",
        explain:"〜さつ counts bound things like books. 〜まい counts flat things, 〜ひき small animals, 〜人 people."
      },
      {
        type:"identify",
        prompt:"Which counter would you use for three sheets of paper?",
        sentence:"かみが ___ あります。",
        options:["三まい","三さつ","三人","三本"],
        answer:"三まい",
        explain:"〜まい counts flat, thin things: paper, tickets, shirts, plates."
      },
      {
        type:"identify",
        prompt:"What does this mean?",
        sentence:"<b>まいにち</b>日本語をべんきょうします。",
        options:["I study Japanese every day","I studied Japanese yesterday","I will study Japanese tomorrow","I study Japanese once a week"],
        answer:"I study Japanese every day",
        explain:"まいにち (毎日) = every day. まいしゅう = every week, まいとし = every year."
      },
      {
        type:"identify",
        prompt:"What does this frequency expression mean?",
        sentence:"一しゅうかんに<b>三かい</b>およぎます。",
        options:["I swim three times a week","I swim for three hours a week","I swim on the third day","I swim three weeks a year"],
        answer:"I swim three times a week",
        explain:"〜かい counts occasions. 一しゅうかんに三かい = three times per week; に here marks the period the frequency applies to."
      },
      {
        type:"identify",
        prompt:"What does ときどき mean?",
        sentence:"<b>ときどき</b>えいがを見ます。",
        options:["sometimes","always","never","every day"],
        answer:"sometimes",
        explain:"Frequency words sit before the verb: いつも (always), よく (often), ときどき (sometimes), あまり〜ません (not often), ぜんぜん〜ません (never)."
      },
      {
        type:"identify",
        prompt:"What must the end of this sentence be?",
        sentence:"わたしは<b>ぜんぜん</b>テレビを___。",
        options:["見ません (negative)","見ます (positive)","見ました (past positive)","either positive or negative"],
        answer:"見ません (negative)",
        explain:"ぜんぜん and あまり must pair with a negative verb, the same way しか does."
      }
    ]
  },

  {
    id:"te-form-b2-core", category:"Verb Forms", band:"choices",
    name:"Sequence, Request, Progressive",
    example:"手を洗って、ご飯を食べます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What is て doing here?",
        sentence:"手を<b>洗って</b>、ご飯を食べます。",
        options:["sequence (do X, then Y)","request (please do X)","progressive (doing X now)","permission (may do X)"],
        answer:"sequence (do X, then Y)",
        explain:"て links two actions in order: first washing hands, then eating."
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"はなす (to speak)",
        accept:["はなして","話して"],
        explain:"Verbs ending in す become して。はなす → はなして",
        tags:["su-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"まつ (to wait)",
        accept:["まって","待って"],
        explain:"Verbs ending in つ・う・る (u-verbs) become って。まつ → まって",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"ねる (to sleep)",
        accept:["ねて","寝て"],
        explain:"る-verbs (ichidan) drop る and add て。ねる → ねて",
        tags:["ichidan-verbs"]
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"まどを",
        after:"ください。",
        cue:"あける",
        accept:["あけて"],
        explain:"る-verbs drop る and add て. あける → あけて"
      },
      {
        type:"identify",
        prompt:"What does ています show here?",
        sentence:"友<ruby>達<rt>だち</rt></ruby>は今、テレビを<b>見ています</b>。",
        options:["progressive (doing X right now)","experience (have done X before)","request","permission"],
        answer:"progressive (doing X right now)",
        explain:"ています shows an action in progress right now."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"毎朝、新聞を",
        after:"います。",
        cue:"よむ",
        accept:["よんで","読んで"],
        explain:"Verbs ending in む・ぬ・ぶ become んで. よむ → よんで"
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"名前を",
        after:"ください。",
        cue:"かく",
        accept:["かいて"],
        explain:"Verbs ending in く become いて. かく → かいて"
      },
      {
        type:"identify",
        prompt:"What is て doing here?",
        sentence:"スーパーへ<b>行って</b>、パンを買いました。",
        options:["sequence (do X, then Y)","progressive (doing X now)","request","permission"],
        answer:"sequence (do X, then Y)",
        explain:"First going to the supermarket, then buying bread — a sequence of two actions."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"ここで",
        after:"もいいですか。",
        cue:"すわる",
        accept:["すわって"],
        explain:"う-verbs ending in る become って. すわる → すわって"
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"テレビを",
        after:"もいいですか。",
        cue:"見る",
        accept:["見て"],
        explain:"る-verbs (ichidan) drop る and add て. 見る → 見て"
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"のむ (to drink)",
        accept:["のんで","飲んで"],
        explain:"Verbs ending in む, ぬ, ぶ become んで. のむ to のんで",
        tags:["mu-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"かく (to write)",
        accept:["かいて","書いて"],
        explain:"Verbs ending in く become いて. かく to かいて",
        tags:["ku-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"あそぶ (to play)",
        accept:["あそんで","遊んで"],
        explain:"Verbs ending in ぶ become んで, the same as む verbs. あそぶ to あそんで",
        tags:["bu-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"する (to do)",
        accept:["して"],
        explain:"する is irregular. Its te-form is して",
        tags:["irregular"]
      },
      {
        type:"transform",
        prompt:"Change to the te-form",
        sentence:"くる (to come)",
        accept:["きて","来て"],
        explain:"くる is irregular. Its te-form is きて",
        tags:["irregular"]
      }
    ]
  },

  {
    id:"te-form-2-choices", category:"Requests and Politeness", band:"choices",
    name:"てもいい・てはいけない (permission and prohibition)",
    example:"もう帰ってもいいです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does てはいけない mean here?",
        sentence:"まだ<b>帰ってはいけません</b>。",
        options:["prohibition (must not do X)","permission (may do X)","progressive","request"],
        answer:"prohibition (must not do X)",
        explain:"てはいけない means you must not do something."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"ここで",
        after:"はだめです。",
        cue:"たべる",
        accept:["たべて","食べて"],
        explain:"る-verbs (ichidan) drop る and add て. たべる → たべて"
      },
      {
        type:"identify",
        prompt:"What does てもいい mean here?",
        sentence:"もう<b>帰ってもいいです</b>。",
        options:["permission (it's OK to do X)","prohibition (must not)","progressive","request"],
        answer:"permission (it's OK to do X)",
        explain:"てもいい gives permission — it's fine to do something."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"この本を",
        after:"もいいですか。",
        cue:"よむ",
        accept:["よんで","読んで"],
        explain:"Verbs ending in む become んで. よむ → よんで"
      }
    ]
  },

  {
    id:"te-form-b2-extended", category:"Verb Forms", band:"links",
    name:"てみる・てしまう・てくる／ていく・ても・てから",
    example:"しゅくだいをぜんぶしてしまいました。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does てみる mean here?",
        sentence:"日本語で<b>話してみます</b>。",
        options:["try doing (to see what happens)","progressive (doing X now)","request","permission"],
        answer:"try doing (to see what happens)",
        explain:"てみる means to try doing something to find out."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"このスープを",
        after:"みてください。",
        cue:"のむ",
        accept:["のんで","飲んで"],
        explain:"Verbs ending in む become んで. のむ → のんで"
      },
      {
        type:"identify",
        prompt:"What does てしまう mean here?",
        sentence:"あの人は一時間でその本を<b>読んでしまいました</b>。",
        options:["completion (did it all, finished)","progressive","request","prohibition (must not)"],
        answer:"completion (did it all, finished)",
        explain:"てしまう emphasises that something was completely finished."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"しゅくだいをぜんぶ",
        after:"しまいました。",
        cue:"する",
        accept:["して"],
        explain:"する becomes して in the te-form."
      },
      {
        type:"identify",
        prompt:"What does てきます mean here?",
        sentence:"プレゼントを<b>持ってきました</b>。",
        options:["bring (do X and come here)","take (do X and go there)","progressive","permission"],
        answer:"bring (do X and come here)",
        explain:"てきます shows bringing something toward here."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"かさを",
        after:"いきます。",
        cue:"もつ",
        accept:["もって","持って"],
        explain:"Verbs ending in つ become って. もつ → もって"
      },
      {
        type:"identify",
        prompt:"What does ても mean here?",
        sentence:"たくさん<b>食べても</b>ふとりません。",
        options:["even if / even though","completion (finished doing X)","permission","prohibition"],
        answer:"even if / even though",
        explain:"ても means the result stays the same, even if the condition happens."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"雨が",
        after:"も、行きます。",
        cue:"ふる",
        accept:["ふって"],
        explain:"う-verbs ending in る become って. ふる → ふって"
      },
      {
        type:"identify",
        prompt:"What does てから mean here?",
        sentence:"いつも勉強してからテレビを見ます。",
        options:["after doing X, then Y","even if / even though","prohibition","permission"],
        answer:"after doing X, then Y",
        explain:"てから means doing one thing, then afterwards doing the next."
      },
      {
        type:"gapfill",
        prompt:"Change to the te-form",
        before:"手を",
        after:"から、食べます。",
        cue:"あらう",
        accept:["あらって","洗って"],
        explain:"う-verbs ending in う become って. あらう → あらって"
      },
      {
        type:"transform",
        prompt:"Change to てから (after doing...)",
        sentence:"たべる (to eat)",
        accept:["たべてから","食べてから"],
        explain:"Make the te-form, then add から. たべる to たべて to たべてから",
        tags:["てから"]
      },
      {
        type:"transform",
        prompt:"Change to てみます (try doing...)",
        sentence:"のむ (to drink)",
        accept:["のんでみます","飲んでみます"],
        explain:"む verbs become んで, then add みます. のむ to のんで to のんでみます",
        tags:["てみる"]
      },
      {
        type:"transform",
        prompt:"Change to てしまいました (finished doing...)",
        sentence:"よむ (to read)",
        accept:["よんでしまいました","読んでしまいました"],
        explain:"Make the te-form, then add しまいました to show it was completely finished.",
        tags:["てしまう"]
      },
      {
        type:"transform",
        prompt:"Change to てから (after doing...)",
        sentence:"かえる (to return home)",
        accept:["かえってから","帰ってから"],
        explain:"る verbs of the u type become って. かえる to かえって to かえってから",
        tags:["てから"]
      },
      {
        type:"transform",
        prompt:"Change to ていきます (do X and go)",
        sentence:"もつ (to hold, to carry)",
        accept:["もっていきます","持っていきます"],
        explain:"つ verbs become って, then add いきます to show taking it away from here.",
        tags:["ていく"]
      },
      {
        type:"transform",
        prompt:"Change to てきます (do X and come back)",
        sentence:"かう (to buy)",
        accept:["かってきます","買ってきます"],
        explain:"う verbs become って, then add きます to show coming back here afterwards.",
        tags:["てくる"]
      },
      {
        type:"transform",
        prompt:"Change to てみます (try doing...)",
        sentence:"いく (to go)",
        accept:["いってみます","行ってみます"],
        explain:"いく is a special u verb, its te-form is いって. Then add みます.",
        tags:["てみる"]
      },
      {
        type:"transform",
        prompt:"Change to てから (after doing...)",
        sentence:"まつ (to wait)",
        accept:["まってから","待ってから"],
        explain:"つ verbs become って. まつ to まって to まってから",
        tags:["てから"]
      }
    ]
  },

  {
    id:"particles-sentences", category:"Particles", band:"sentences",
    name:"は・の・を・に・へ・で・も (one particle at a time)",
    example:"わたしはがくせいです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"わたし",
        after:"がくせいです。",
        cue:"(particle)",
        accept:["は"],
        explain:"は marks the topic of the sentence."
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) read a book.",
        words:["ほん","を","よみます"],
        answer:"ほんをよみます",
        explain:"The object takes を and comes before the verb; the verb goes last. ほんを よみます。",
        tags:["を"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) go to school.",
        words:["がっこう","へ","いきます"],
        answer:"がっこうへいきます",
        explain:"へ attaches to the destination (がっこうへ), and the verb goes last.",
        tags:["へ"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) talk with my friend.",
        words:["ともだち","と","はなします"],
        answer:"ともだちとはなします",
        explain:"と attaches to the person you do something with (ともだちと), and the verb goes last.",
        tags:["と"]
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"これはわたし",
        after:"ペンです。",
        cue:"(particle)",
        accept:["の"],
        explain:"の shows possession — 'my pen'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"明日、町",
        after:"行きます。",
        cue:"(particle)",
        accept:["に"],
        explain:"に marks the destination — where you're going."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"町",
        after:"行きます。",
        cue:"(particle — same meaning as に here)",
        accept:["へ"],
        explain:"へ shows direction, and can be used the same way as に here."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"すし",
        after:"食べます。",
        cue:"(particle)",
        accept:["を"],
        explain:"を marks the direct object — the thing being eaten."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"町",
        after:"買い物をしました。",
        cue:"(particle)",
        accept:["で"],
        explain:"で marks the place where an action happens."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"わたし",
        after:"日本に行きたいです。",
        cue:"(particle)",
        accept:["も"],
        explain:"も means 'also/too' — I also want to go to Japan."
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) play in the park.",
        words:["こうえん","で","あそびます"],
        answer:"こうえんであそびます",
        explain:"で marks the place where an action happens, and the verb goes last.",
        tags:["で"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) go to school.",
        words:["がっこう","に","いきます"],
        answer:"がっこうにいきます",
        explain:"に marks the destination you are heading to, and the verb goes last.",
        tags:["に"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) drink water.",
        words:["みず","を","のみます"],
        answer:"みずをのみます",
        explain:"を marks the direct object, the thing being drunk, and the verb goes last.",
        tags:["を"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) study at home.",
        words:["うち","で","べんきょうします"],
        answer:"うちでべんきょうします",
        explain:"で marks where the studying happens. The verb goes last.",
        tags:["で"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) go by train.",
        words:["でんしゃ","で","いきます"],
        answer:"でんしゃでいきます",
        explain:"で also marks the means of transport, how you go.",
        tags:["で"]
      },
      {
        type:"identify",
        prompt:"Which particle goes in the gap?",
        sentence:"わたし＿＿がくせいです。 (I am a student.)",
        options:["は","を","に","で"],
        answer:"は",
        explain:"は marks the topic, what the sentence is about.",
        tags:["は"]
      },
      {
        type:"identify",
        prompt:"Which particle goes in the gap?",
        sentence:"ほん＿＿よみます。 (I read a book.)",
        options:["を","へ","で","と"],
        answer:"を",
        explain:"を marks the direct object, the thing being read.",
        tags:["を"]
      },
      {
        type:"identify",
        prompt:"Which particle goes in the gap?",
        sentence:"がっこう＿＿いきます。 (I go to school.)",
        options:["に","を","が","と"],
        answer:"に",
        explain:"に marks the destination you are heading to.",
        tags:["に"]
      },
      {
        type:"identify",
        prompt:"Which particle goes in the gap?",
        sentence:"としょかん＿＿べんきょうします。 (I study at the library.)",
        options:["で","に","を","が"],
        answer:"で",
        explain:"An action happens somewhere, so the place takes で. に here is the classic mix-up.",
        tags:["で"]
      },
      {
        type:"identify",
        prompt:"Which particle matches the meaning: I ALSO want to go?",
        sentence:"わたし＿＿いきたいです。",
        options:["も","は","を","が"],
        answer:"も",
        explain:"も means also or too. It replaces は when you are adding yourself to the list.",
        tags:["も"]
      },
      {
        type:"identify",
        prompt:"Which particle goes in the gap?",
        sentence:"これはわたし＿＿ペンです。 (This is my pen.)",
        options:["の","は","を","な"],
        answer:"の",
        explain:"の links owner and thing: わたしのペン, my pen.",
        tags:["の"]
      }
    ]
  },

  {
    id:"particles-b1-core", category:"Particles", band:"choices",
    name:"Choosing between は/が, に/で, と/や/か",
    example:"テニスが好きです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What is the second は doing here?",
        sentence:"肉は食べますが、<b>魚は</b>食べません。",
        options:["contrast (this one, but not that one)","subject","object","location"],
        answer:"contrast (this one, but not that one)",
        explain:"は can show contrast between two things being compared."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"だれ",
        after:"そう言いましたか。",
        cue:"(particle)",
        accept:["が"],
        explain:"が follows question words like だれ (who) and 何 (what)."
      },
      {
        type:"identify",
        prompt:"What is が doing here?",
        sentence:"テニス<b>が</b>好きです。",
        options:["object of a liking/ability word (好き, 上手, etc.)","subject","location","means"],
        answer:"object of a liking/ability word (好き, 上手, etc.)",
        explain:"が marks the thing you like, are good at, etc., before words like 好き and 上手。"
      },
      {
        type:"identify",
        prompt:"What is の doing here?",
        sentence:"いぬはベッド<b>の</b>上にいます。",
        options:["location (の上, の下, etc.)","possession","turns a verb into a noun","adjective-like use"],
        answer:"location (の上, の下, etc.)",
        explain:"の appears before location words like 上 (on top of) and 下 (underneath)."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"三時半",
        after:"行きましょう。",
        cue:"(particle)",
        accept:["に"],
        explain:"に marks a point in time."
      },
      {
        type:"identify",
        prompt:"What is に doing here?",
        sentence:"先生<b>に</b>あげてください。",
        options:["indirect object (the person receiving something)","location","time","purpose"],
        answer:"indirect object (the person receiving something)",
        explain:"に marks the person something is given to."
      },
      {
        type:"identify",
        prompt:"What is を doing here?",
        sentence:"道<b>を</b>歩きます。",
        options:["the path/space something moves through","direct object","subject","means"],
        answer:"the path/space something moves through",
        explain:"を can also mark the space something moves along, like a road."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"はし",
        after:"食べました。",
        cue:"(particle)",
        accept:["で"],
        explain:"で marks the means or tool used to do something — eating with chopsticks."
      },
      {
        type:"identify",
        prompt:"What is と doing here?",
        sentence:"家族<b>と</b>日本に行きました。",
        options:["with (a person)","and (connecting nouns, exhaustively)","condition","quotation"],
        answer:"with (a person)",
        explain:"と marks the person you did something together with."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle",
        before:"スーパーでりんご",
        after:"バナナを買いました。",
        cue:"(particle)",
        accept:["と"],
        explain:"と connects a complete list of items — 'apples and bananas', nothing else."
      },
      {
        type:"identify",
        prompt:"What is や doing here?",
        sentence:"スーパーでりんご<b>や</b>バナナを買いました。",
        options:["and, etc. (an incomplete list of examples)","and (a complete list)","contrast","subject"],
        answer:"and, etc. (an incomplete list of examples)",
        explain:"や lists examples — there may be other things too, unlike と."
      },
      {
        type:"identify",
        prompt:"What is か doing here?",
        sentence:"ペン<b>か</b>えんぴつをとってください。",
        options:["or (choose one)","question marker","and (complete list)","contrast"],
        answer:"or (choose one)",
        explain:"か offers a choice between two or more things."
      },
      {
        type:"identify",
        prompt:"What is も doing here?",
        sentence:"犬<b>も</b>ねこもいません。",
        options:["neither...nor (も + negative)","also/too","emphasis","location"],
        answer:"neither...nor (も + negative)",
        explain:"も with a negative verb means 'neither... nor...' — no dogs and no cats."
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) like tennis.",
        words:["テニス","が","すきです"],
        answer:"テニスがすきです",
        explain:"すき takes が, not を. The thing you like is marked with が.",
        tags:["が"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) am in the classroom.",
        words:["きょうしつ","に","います"],
        answer:"きょうしつにいます",
        explain:"います shows existence, so the place takes に, not で.",
        tags:["に"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: let's meet at the cafe.",
        words:["カフェ","で","あいましょう"],
        answer:"カフェであいましょう",
        explain:"あう is an action, so the place takes で.",
        tags:["で"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: my little sister is a student.",
        words:["いもうと","は","がくせいです"],
        answer:"いもうとはがくせいです",
        explain:"は marks the topic, what the sentence is about.",
        tags:["は"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) understand Japanese.",
        words:["にほんご","が","わかります"],
        answer:"にほんごがわかります",
        explain:"わかる takes が, not を. This is the same pattern as すき.",
        tags:["が"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) want to go to the sea.",
        words:["うみ","へ","いきたいです"],
        answer:"うみへいきたいです",
        explain:"へ shows the direction you are heading in.",
        tags:["へ"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) spoke with the teacher.",
        words:["せんせい","と","はなしました"],
        answer:"せんせいとはなしました",
        explain:"と marks the person you do something together with.",
        tags:["と"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) use a pen or a pencil.",
        words:["ペン","か","えんぴつ","を","つかいます"],
        answer:"ペンかえんぴつをつかいます",
        accept:["えんぴつかペンをつかいます"],
        explain:"か joins two nouns as alternatives, either one or the other. Either noun may come first.",
        tags:["か"]
      }
    ]
  },

  {
    id:"ta-choices", category:"Past and If", band:"choices",
    name:"たことがある・たあとで (experience, and after doing)",
    example:"日本に行ったことがありますか。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does たことがある mean here?",
        sentence:"日本に<b>行ったことがありますか</b>。",
        options:["experience (have you ever done X)","advice","permission","request"],
        answer:"experience (have you ever done X)",
        explain:"たことがある asks or states whether someone has ever done something."
      },
      {
        type:"gapfill",
        prompt:"Change to the past (た) form",
        before:"すしを",
        after:"ことがありますか。",
        cue:"たべる",
        accept:["たべた","食べた"],
        explain:"る-verbs (ichidan) drop る and add た. たべる→たべた"
      },
      {
        type:"identify",
        prompt:"What does たあとで mean here?",
        sentence:"しゅくだいを<b>したあとで</b>、テレビを見ます。",
        options:["after doing X, then Y","before doing X","while doing X","even though X"],
        answer:"after doing X, then Y",
        explain:"たあとで means after finishing one action, before doing the next."
      },
      {
        type:"gapfill",
        prompt:"Change to the past (た) form",
        before:"手を",
        after:"あとで、食べます。",
        cue:"あらう",
        accept:["あらった","洗った"],
        explain:"う-verbs ending in う become った. あらう→あらった"
      }
    ]
  },

  {
    id:"ta-tara-tari-b2", category:"Past and If", band:"links",
    name:"たほうがいい・たら・たり〜たり",
    example:"雨がふったら、うちにいます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does たほうがいい mean here?",
        sentence:"くすりを<b>飲んだほうがいいですよ</b>。",
        options:["advice (it's better to do X)","obligation (must do X)","permission","prohibition"],
        answer:"advice (it's better to do X)",
        explain:"たほうがいい gives friendly advice to do something."
      },
      {
        type:"gapfill",
        prompt:"Change to the past (た) form",
        before:"もっと",
        after:"ほうがいいですよ。",
        cue:"やすむ",
        accept:["やすんだ","休んだ"],
        explain:"む-verbs become んだ in the plain past. やすむ→やすんだ"
      },
      {
        type:"identify",
        prompt:"What does たら mean here?",
        sentence:"雨が<b>ふったら</b>、うちにいます。",
        options:["if/when (condition or time)","after doing X","experience","advice"],
        answer:"if/when (condition or time)",
        explain:"たら means 'if' or 'when' — a condition or expected future time."
      },
      {
        type:"gapfill",
        prompt:"Change to the たら form",
        before:"駅に",
        after:"、電話してください。",
        cue:"つく",
        accept:["ついたら","着いたら"],
        explain:"く-verbs become いたら in the たら form. つく→ついたら"
      },
      {
        type:"identify",
        prompt:"What does たり〜たりします mean here?",
        sentence:"しゅうまつは、<b>テレビを見たり、本を読んだりします</b>。",
        options:["listing example actions (do things like X and Y)","sequence (X then Y)","condition","experience"],
        answer:"listing example actions (do things like X and Y)",
        explain:"たり〜たりします lists a few example activities, not a complete list."
      },
      {
        type:"gapfill",
        prompt:"Change to the たり form",
        before:"友<ruby>達<rt>だち</rt></ruby>と",
        after:"、しゅくだいをしたりします。",
        cue:"はなす",
        accept:["はなしたり"],
        explain:"う-verbs ending in す become したり in the たり form. はなす→はなしたり"
      },
      {
        type:"order",
        prompt:"Put the tiles in order: you had better take your medicine.",
        words:["くすりを","のんだ","ほうがいいです"],
        answer:"くすりをのんだほうがいいです",
        explain:"たほうがいい uses the plain past form before ほうがいい.",
        tags:["たほうがいい"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: if it rains, I will stay home.",
        words:["あめが","ふったら","うちにいます"],
        answer:"あめがふったらうちにいます",
        explain:"たら attaches to the plain past form and sets up the condition first.",
        tags:["たら"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: when you arrive at the station, please call.",
        words:["えきに","ついたら","でんわしてください"],
        answer:"えきについたらでんわしてください",
        explain:"たら can mean when as well as if. The condition comes first.",
        tags:["たら"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: you had better go to bed early.",
        words:["はやく","ねた","ほうがいいです"],
        answer:"はやくねたほうがいいです",
        explain:"ねる is an ichidan verb, so the plain past is ねた.",
        tags:["たほうがいい"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: (I) do things like reading books and watching TV.",
        words:["ほんをよんだり","テレビをみたり","します"],
        answer:"ほんをよんだりテレビをみたりします",
        accept:["テレビをみたりほんをよんだりします"],
        explain:"たり listing gives examples, not a full list. The order of the two examples can swap.",
        tags:["たり"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: if I go to Japan, I will go to Kyoto.",
        words:["にほんに","いったら","きょうとにいきます"],
        answer:"にほんにいったらきょうとにいきます",
        explain:"いく becomes いった in the plain past, so the たら form is いったら.",
        tags:["たら"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: you had better rest a lot.",
        words:["たくさん","やすんだ","ほうがいいです"],
        answer:"たくさんやすんだほうがいいです",
        explain:"やすむ is a む verb, so the plain past is やすんだ.",
        tags:["たほうがいい"]
      },
      {
        type:"order",
        prompt:"Put the tiles in order: on the weekend I do things like cleaning and shopping.",
        words:["そうじをしたり","かいものをしたり","します"],
        answer:"そうじをしたりかいものをしたりします",
        accept:["かいものをしたりそうじをしたりします"],
        explain:"Both activities take たり, and either one may be listed first.",
        tags:["たり"]
      }
    ]
  },

  {
    id:"verb-stem-choices", category:"Verb Endings", band:"choices",
    name:"たい・に行く (what you want, why you go)",
    example:"このシャツを買いたいです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does STEM+たい mean here?",
        sentence:"このシャツを<b>買いたいです</b>。",
        options:["want to do X (desire)","have done X before","must do X","looks like X"],
        answer:"want to do X (desire)",
        explain:"STEM+たい expresses the speaker's own wish to do something."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + たい (want to...)",
        before:"日本に",
        after:"です。",
        cue:"いく",
        accept:["いきたい","行きたい"],
        explain:"Drop ます from the stem and add たい. いきます→いきたい"
      },
      {
        type:"identify",
        prompt:"What does STEM+に行きます mean here?",
        sentence:"としょかんに本を<b>かりに行きます</b>。",
        options:["purpose (to go and do X)","result","condition","experience"],
        answer:"purpose (to go and do X)",
        explain:"STEM+に行きます means going somewhere in order to do something."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + に行きます (go to do...)",
        before:"こうえんへ花を",
        after:"行きます。",
        cue:"見る",
        accept:["見に"],
        explain:"Drop ます from the stem and add に. 見ます→見に"
      },
      {
        type:"transform",
        prompt:"Change to STEM + たいです (want to...)",
        sentence:"かう (to buy)",
        accept:["かいたいです","買いたいです"],
        explain:"The stem of かう is かい. Add たいです. かいます to かいたいです",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + たいです (want to...)",
        sentence:"のむ (to drink)",
        accept:["のみたいです","飲みたいです"],
        explain:"The stem of のむ is のみ. Add たいです. のみます to のみたいです",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + たいです (want to...)",
        sentence:"たべる (to eat)",
        accept:["たべたいです","食べたいです"],
        explain:"Ichidan verbs drop る to make the stem. たべます to たべたいです",
        tags:["ichidan-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + たいです (want to...)",
        sentence:"する (to do)",
        accept:["したいです"],
        explain:"The stem of する is し. Add たいです. します to したいです",
        tags:["irregular"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + たいです (want to...)",
        sentence:"くる (to come)",
        accept:["きたいです","来たいです"],
        explain:"The stem of くる is き. Add たいです. きます to きたいです",
        tags:["irregular"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + たいです (want to...)",
        sentence:"あう (to meet)",
        accept:["あいたいです","会いたいです"],
        explain:"The stem of あう is あい. Add たいです. あいます to あいたいです",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + に行きます (go in order to...)",
        sentence:"かう (to buy)",
        accept:["かいに行きます","かいにいきます","買いに行きます"],
        explain:"Use the stem, then に行きます to show the purpose of going.",
        tags:["purpose"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + に行きます (go in order to...)",
        sentence:"みる (to see, to watch)",
        accept:["みに行きます","みにいきます","見に行きます"],
        explain:"Ichidan verbs drop る to make the stem, then add に行きます.",
        tags:["purpose"]
      }
    ]
  },

  {
    id:"verb-stem-b2", category:"Verb Endings", band:"links",
    name:"そう・かた・やすい／にくい・たいと思っている・ながら・すぎる",
    example:"テレビを見ながら、ばんごはんを食べます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does STEM+そうです mean here?",
        sentence:"そらが黒いですね。雨が<b>ふりそうです</b>。",
        options:["appearance (it looks/seems X)","hearsay (I heard that X)","experience","advice"],
        answer:"appearance (it looks/seems X)",
        explain:"そうです after a stem means something looks or appears that way."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + そう (looks like it will...)",
        before:"かさを持っていきましょう。雨が",
        after:"。",
        cue:"ふる",
        accept:["ふりそう"],
        explain:"Drop ます from the stem and add そう. ふります→ふりそう"
      },
      {
        type:"identify",
        prompt:"What does STEM+かた mean here?",
        sentence:"この漢字の<b>書き方</b>を教えてください。",
        options:["method (how to do X)","appearance","difficulty","ease"],
        answer:"method (how to do X)",
        explain:"STEM+かた means 'the way of doing' something."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + かた (the way of doing...)",
        before:"すしの",
        after:"を知っていますか。",
        cue:"つくる",
        accept:["つくりかた","作りかた","作り方"],
        explain:"Drop ます from the stem and add かた. つくります→つくりかた"
      },
      {
        type:"identify",
        prompt:"What does STEM+にくい mean here?",
        sentence:"この字は小さくて<b>読みにくいです</b>。",
        options:["difficult to do X","easy to do X","want to do X","excessive doing of X"],
        answer:"difficult to do X",
        explain:"STEM+にくい means something is hard to do."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + にくい (difficult to...)",
        before:"この本は字が小さくて",
        after:"です。",
        cue:"よむ",
        accept:["よみにくい","読みにくい"],
        explain:"Drop ます from the stem and add にくい. よみます→よみにくい"
      },
      {
        type:"identify",
        prompt:"What does STEM+やすい mean here?",
        sentence:"このペンは<b>書きやすいです</b>。",
        options:["easy to do X","difficult to do X","want to do X","excessive doing of X"],
        answer:"easy to do X",
        explain:"STEM+やすい means something is easy to do."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + やすい (easy to...)",
        before:"このいすは",
        after:"です。",
        cue:"すわる",
        accept:["すわりやすい"],
        explain:"Drop ます from the stem and add やすい. すわります→すわりやすい"
      },
      {
        type:"identify",
        prompt:"What does STEM+たいと思っています mean here?",
        sentence:"日本に<b>行きたいと思っています</b>。",
        options:["I've been thinking I'd like to do X","I must do X","I heard that X","it looks like X"],
        answer:"I've been thinking I'd like to do X",
        explain:"たいと思っています softens たい into an ongoing wish or plan, less direct than たい alone."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + たいと思っています (I've been thinking I'd like to...)",
        before:"りゅうがくを",
        after:"。",
        cue:"する",
        accept:["したいと思っています"],
        explain:"する becomes したい, then add と思っています."
      },
      {
        type:"identify",
        prompt:"What does STEM+ながら mean here?",
        sentence:"テレビを<b>見ながら</b>、ばんごはんを食べます。",
        options:["doing two things at the same time","doing X after Y","doing X because of Y","doing X too much"],
        answer:"doing two things at the same time",
        explain:"STEM+ながら means doing one action while doing another."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + ながら (while doing...)",
        before:"<ruby>音<rt>おん</rt></ruby>楽を",
        after:"、べんきょうします。",
        cue:"きく",
        accept:["ききながら","聞きながら"],
        explain:"Drop ます from the stem and add ながら. ききます→ききながら"
      },
      {
        type:"identify",
        prompt:"What does STEM+すぎます mean here?",
        sentence:"きのう、ケーキを<b>食べすぎました</b>。",
        options:["did too much of X (excessive)","want to do X","easy to do X","difficult to do X"],
        answer:"did too much of X (excessive)",
        explain:"STEM+すぎます means doing something to an excessive degree."
      },
      {
        type:"gapfill",
        prompt:"Change to STEM + すぎました (too much...)",
        before:"きのう、テレビを",
        after:"。",
        cue:"見る",
        accept:["見すぎました"],
        explain:"Drop ます from the stem and add すぎました. 見ます→見すぎました"
      },
      {
        type:"transform",
        prompt:"Change to STEM + そうです (looks like...)",
        sentence:"つかれる (to get tired)",
        accept:["つかれそうです","疲れそうです"],
        explain:"Ichidan verbs drop る to make the stem, then add そうです.",
        tags:["そう"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + かた (the way of doing...)",
        sentence:"およぐ (to swim)",
        accept:["およぎかた","泳ぎかた","泳ぎ方"],
        explain:"The stem of およぐ is およぎ. Add かた to mean the way of swimming.",
        tags:["かた"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + にくいです (difficult to...)",
        sentence:"かく (to write)",
        accept:["かきにくいです","書きにくいです"],
        explain:"The stem of かく is かき. Add にくいです to say it is hard to do.",
        tags:["にくい"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + やすいです (easy to...)",
        sentence:"わかる (to understand)",
        accept:["わかりやすいです","分かりやすいです"],
        explain:"The stem of わかる is わかり. Add やすいです to say it is easy to do.",
        tags:["やすい"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + ながら (while doing...)",
        sentence:"あるく (to walk)",
        accept:["あるきながら","歩きながら"],
        explain:"The stem of あるく is あるき. ながら shows two actions by the same person at once.",
        tags:["ながら"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + すぎました (did too much...)",
        sentence:"のむ (to drink)",
        accept:["のみすぎました","飲みすぎました"],
        explain:"The stem of のむ is のみ. Add すぎました to say it was overdone.",
        tags:["すぎる"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + やすいです (easy to...)",
        sentence:"つかう (to use)",
        accept:["つかいやすいです","使いやすいです"],
        explain:"The stem of つかう is つかい. Add やすいです to say it is easy to use.",
        tags:["やすい"]
      },
      {
        type:"transform",
        prompt:"Change to STEM + かた (the way of doing...)",
        sentence:"はなす (to speak)",
        accept:["はなしかた","話しかた","話し方"],
        explain:"The stem of はなす is はなし. Add かた to mean the way of speaking.",
        tags:["かた"]
      }
    ]
  },

  {
    id:"pf-expr-1-links", category:"Reporting and Guessing", band:"links",
    name:"とき・と思う／と言う (when, and reporting speech)",
    example:"日本に行ったとき、京都のお寺を見ました。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does PF+とき mean here?",
        sentence:"日本に<b>行ったとき</b>、京都のお寺を見ました。",
        options:["time (when X happened)","condition (if X)","reason (because X)","result (so X)"],
        answer:"time (when X happened)",
        explain:"PF+とき marks a point in time — 'when I went to Japan'."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain past form + とき (when...)",
        before:"日本に",
        after:"、京都のお寺を見ました。",
        cue:"いきます",
        accept:["いったとき","行ったとき"],
        explain:"Change the ます-form to the plain past, then add とき. いきます→いった→いったとき"
      },
      {
        type:"identify",
        prompt:"What does PF+と言いました mean here?",
        sentence:"田中さんは、あした<b>来ると言いました</b>。",
        options:["quotation (someone said that X)","hearsay (I heard, general)","possibility","obligation"],
        answer:"quotation (someone said that X)",
        explain:"PF+と言いました reports what someone specifically said."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + と思います (I think that...)",
        before:"あしたは天気が",
        after:"。",
        cue:"いいです",
        accept:["いいと思います"],
        explain:"い-adjectives drop です for the plain form, then take と思います directly. いいです→いい→いいと思います"
      }
    ]
  },

  {
    id:"plain-form-expr-1-b3", category:"Reporting and Guessing", band:"paragraphs",
    name:"そう（伝聞）・つもり・より・かもしれない・でしょう",
    example:"あした雨がふるそうです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does PF+そうです mean here?",
        sentence:"てんきよほうによると、あした<b>雨がふるそうです</b>。",
        options:["hearsay (I heard that X)","appearance (it looks like X)","intention","possibility"],
        answer:"hearsay (I heard that X)",
        explain:"PF+そうです reports something you heard from another source, not something you observed yourself."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + そうです (I heard that...)",
        before:"あしたテストが",
        after:"。",
        cue:"あります",
        accept:["あるそうです"],
        explain:"Drop ます and go back to the dictionary form, then add そうです. あります→ある→あるそうです"
      },
      {
        type:"identify",
        prompt:"What does PF+つもりです mean here?",
        sentence:"来年、日本へ<b>行くつもりです</b>。",
        options:["intention (I plan to do X)","hearsay","possibility","obligation"],
        answer:"intention (I plan to do X)",
        explain:"PF+つもりです states a plan or intention."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + つもりです (I plan to...)",
        before:"しゅうまつ、うちで",
        after:"。",
        cue:"べんきょうします",
        accept:["べんきょうするつもりです"],
        explain:"します is irregular — its plain form is する. べんきょうします→べんきょうする→べんきょうするつもりです"
      },
      {
        type:"identify",
        prompt:"What does PF+より mean here?",
        sentence:"<b>テレビを見るより</b>本を読むほうが楽しいです。",
        options:["comparison (rather than X)","time","reason","condition"],
        answer:"comparison (rather than X)",
        explain:"PF+より compares two things — 'more than doing X'."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + より (rather than...)",
        before:"バスに",
        after:"タクシーのほうが早いです。",
        cue:"のります",
        accept:["のるより"],
        explain:"Drop ます and add る for a る-ending stem, then add より. のります→のる→のるより"
      },
      {
        type:"identify",
        prompt:"What does PF+かもしれません mean here?",
        sentence:"あした<b>雪がふるかもしれません</b>。",
        options:["possibility (X might happen)","certainty","hearsay","obligation"],
        answer:"possibility (X might happen)",
        explain:"PF+かもしれません expresses a possibility, not a certainty."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain past + かもしれません (might have...)",
        before:"田中さんはもう",
        after:"。",
        cue:"かえります",
        accept:["かえったかもしれません"],
        explain:"Change the ます-form to the plain past, then add かもしれません. かえります→かえった→かえったかもしれません"
      },
      {
        type:"identify",
        prompt:"What does PF+でしょう mean here?",
        sentence:"明日は<b>雪になるでしょう</b>。",
        options:["probability (it will probably X)","hearsay","possibility (maybe, less certain)","obligation"],
        answer:"probability (it will probably X)",
        explain:"PF+でしょう expresses a confident prediction — more certain than かもしれません."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + でしょう (probably...)",
        before:"あしたは",
        after:"。",
        cue:"はれます",
        accept:["はれるでしょう"],
        explain:"Drop ます and add る for a る-ending stem, then add でしょう. はれます→はれる→はれるでしょう"
      }
    ]
  },

  {
    id:"plain-form-expr-2-b3", category:"Joining Ideas", band:"paragraphs",
    name:"ために／ように・し・PF＋Noun・の／んです",
    example:"車を買うためにお金をためています。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does PF+ために mean here?",
        sentence:"車を買うためにお金を<b>ためています</b>。",
        options:["purpose (in order to X)","reason (because X)","result of X","condition"],
        answer:"purpose (in order to X)",
        explain:"PF+ために shows the purpose behind an action — 'in order to buy a car'."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + ために (in order to...)",
        before:"大学に",
        after:"、べんきょうしています。",
        cue:"はいります",
        accept:["はいるために"],
        explain:"Drop ます and add る for a る-ending stem, then add ために. はいります→はいる→はいるために"
      },
      {
        type:"identify",
        prompt:"What does PF+ように mean here?",
        sentence:"かぜをひかないように<b>手を洗いましょう</b>。",
        options:["purpose/result (so that X happens or doesn't)","reason","comparison","time"],
        answer:"purpose/result (so that X happens or doesn't)",
        explain:"PF+ように expresses a hoped-for result, often with things you can't fully control, like getting sick."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain negative form + ように (so as not to...)",
        before:"かぜを",
        after:"手を洗いましょう。",
        cue:"ひきません",
        accept:["ひかないように"],
        explain:"Change the polite negative to the plain negative, then add ように. ひきません→ひかない→ひかないように"
      },
      {
        type:"identify",
        prompt:"What does PF+し mean here?",
        sentence:"天気がよかったし、<b>あたたかかったです</b>。",
        options:["listing reasons (X, and also Y)","comparison","time","purpose"],
        answer:"listing reasons (X, and also Y)",
        explain:"PF+し lists two or more reasons or qualities together."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + し (X, and also...)",
        before:"あの店は",
        after:"、やすいです。",
        cue:"おいしいです",
        accept:["おいしいし"],
        explain:"い-adjectives drop です for the plain form, then take し directly. おいしいです→おいしい→おいしいし"
      },
      {
        type:"identify",
        prompt:"What is the plain-form verb doing before the noun here?",
        sentence:"きのう<b>見たえいが</b>はおもしろかったです。",
        options:["relative clause (the movie that I watched)","reason","time","purpose"],
        answer:"relative clause (the movie that I watched)",
        explain:"A plain-form verb directly before a noun describes that noun — 'the movie I watched'."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain past form (to describe the noun)",
        before:"きのう",
        after:"本はおもしろかったです。",
        cue:"よみます",
        accept:["よんだ","読んだ"],
        explain:"Change the ます-form to the plain past to describe the noun directly. よみます→よんだ"
      },
      {
        type:"identify",
        prompt:"What does PF+んです mean here?",
        sentence:"どうしたんですか。<b>あたまがいたいんです</b>。",
        options:["explanation (giving a reason or clarifying)","hearsay","possibility","comparison"],
        answer:"explanation (giving a reason or clarifying)",
        explain:"PF+んです adds an explanatory tone, often answering 'why' or clarifying a situation."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past form + んです (explaining why)",
        before:"明日テストが",
        after:"。",
        cue:"あります",
        accept:["あるんです"],
        explain:"Drop ます and go back to the dictionary form, then add んです. あります→ある→あるんです"
      }
    ]
  },

  {
    id:"pf-expr-2-argument", category:"Reporting and Guessing", band:"argument",
    name:"らしい・はず／べき (hedging and asserting)",
    example:"電車は八時に着くはずです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does PF+らしいです mean here?",
        sentence:"だれかがここで<b>キャンプをしたらしいです</b>。",
        options:["apparently (based on what I've heard/seen)","definitely (certain)","intention","obligation"],
        answer:"apparently (based on what I've heard/seen)",
        explain:"PF+らしいです shows the speaker is inferring from outside evidence, not stating a fact firsthand."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain past + らしいです (apparently...)",
        before:"あの店は先週",
        after:"。",
        cue:"しまります",
        accept:["しまったらしいです"],
        explain:"Change the ます-form to the plain past, then add らしいです. しまります→しまった→しまったらしいです"
      },
      {
        type:"identify",
        prompt:"What does PF+はずです mean here?",
        sentence:"電車は八時に<b>着くはずです</b>。",
        options:["expectation (it should/is supposed to X)","obligation (must X)","possibility","hearsay"],
        answer:"expectation (it should/is supposed to X)",
        explain:"PF+はずです expresses a strong expectation based on evidence or schedule, not just a guess."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain non-past + べきです (should...)",
        before:"明日テストだから、今日",
        after:"。",
        cue:"べんきょうします",
        accept:["べんきょうするべきです"],
        explain:"します is irregular — its plain form is する. べんきょうします→べんきょうする→べんきょうするべきです"
      }
    ]
  },

  {
    id:"nai-form-b3", category:"Can and Must", band:"links",
    name:"ないほうがいい・なければならない・なくてもいい",
    example:"コーラはあまり飲まないほうがいいです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does ないほうがいい mean here?",
        sentence:"コーラはあまり<b>飲まないほうがいいです</b>。",
        options:["advice against (better not to do X)","advice for (better to do X)","obligation (must)","no obligation (don't have to)"],
        answer:"advice against (better not to do X)",
        explain:"ないほうがいい gives advice against doing something."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain negative + ほうがいいです (better not to...)",
        before:"夜おそく",
        after:"ほうがいいですよ。",
        cue:"たべます",
        accept:["たべないほうがいいです"],
        explain:"Change the ます-form to the plain negative, then add ほうがいいです. たべます→たべない→たべないほうがいいです"
      },
      {
        type:"identify",
        prompt:"What does なければなりません mean here?",
        sentence:"八時までに学校に<b>行かなければなりません</b>。",
        options:["compulsion (must do X)","advice","permission","prohibition"],
        answer:"compulsion (must do X)",
        explain:"なければなりません means you must do something — it's compulsory."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain negative + なければなりません (must...)",
        before:"あした早く",
        after:"。",
        cue:"おきます",
        accept:["おきなければなりません"],
        explain:"Change the ます-form to the plain negative, then add なければなりません. おきます→おきない→おきなければなりません"
      },
      {
        type:"identify",
        prompt:"What does なくてもいいです mean here?",
        sentence:"せいふくを<b>着なくてもいいです</b>。",
        options:["no obligation (don't have to do X)","compulsion (must do X)","prohibition (must not)","advice"],
        answer:"no obligation (don't have to do X)",
        explain:"なくてもいいです means something isn't required — you don't have to do it."
      },
      {
        type:"gapfill",
        prompt:"Change to the plain negative + もいいです (don't have to...)",
        before:"あしたのパーティーに",
        after:"もいいです。",
        cue:"きます",
        accept:["こなくても"],
        explain:"来ます is irregular — its plain negative is こない. きます→こない→こなくても"
      },
      {
        type:"transform",
        prompt:"Change to ないほうがいいです (better not to...)",
        sentence:"のむ (to drink)",
        accept:["のまないほうがいいです","飲まないほうがいいです"],
        explain:"Make the plain negative, then add ほうがいいです. のむ to のまない to のまないほうがいいです",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to なければなりません (must...)",
        sentence:"いく (to go)",
        accept:["いかなければなりません","行かなければなりません"],
        explain:"Make the plain negative, drop い and add ければなりません. いく to いかない to いかなければなりません",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to なくてもいいです (do not have to...)",
        sentence:"する (to do)",
        accept:["しなくてもいいです"],
        explain:"する is irregular. Its plain negative is しない, giving しなくてもいいです",
        tags:["irregular"]
      },
      {
        type:"transform",
        prompt:"Change to なくてもいいです (do not have to...)",
        sentence:"くる (to come)",
        accept:["こなくてもいいです","来なくてもいいです"],
        explain:"くる is irregular. Its plain negative is こない, giving こなくてもいいです",
        tags:["irregular"]
      },
      {
        type:"transform",
        prompt:"Change to ないほうがいいです (better not to...)",
        sentence:"たべる (to eat)",
        accept:["たべないほうがいいです","食べないほうがいいです"],
        explain:"Ichidan verbs drop る and add ない. たべる to たべない to たべないほうがいいです",
        tags:["ichidan-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to なければなりません (must...)",
        sentence:"まつ (to wait)",
        accept:["またなければなりません","待たなければなりません"],
        explain:"つ verbs change つ to た before ない. まつ to またない to またなければなりません",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to ないほうがいいです (better not to...)",
        sentence:"はなす (to speak)",
        accept:["はなさないほうがいいです","話さないほうがいいです"],
        explain:"す verbs change す to さ before ない. はなす to はなさない to はなさないほうがいいです",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to なければなりません (must...)",
        sentence:"おきる (to get up)",
        accept:["おきなければなりません","起きなければなりません"],
        explain:"Ichidan verbs drop る and add ない. おきる to おきない to おきなければなりません",
        tags:["ichidan-verbs"]
      }
    ]
  },

  {
    id:"extent-sentences", category:"Amounts and Comparing", band:"sentences",
    name:"ごろ・ぐらい／くらい (about, roughly)",
    example:"姉は三時ごろ帰ります。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does ごろ mean here?",
        sentence:"姉は三時<b>ごろ</b>帰ります。",
        options:["approximate time (around X o'clock)","exact time","approximate amount","comparison"],
        answer:"approximate time (around X o'clock)",
        explain:"ごろ means 'around' a point in time — not exact."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (approximate time)",
        before:"パーティーは七時",
        after:"始まります。",
        cue:"(approximate time)",
        accept:["ごろ"],
        explain:"ごろ attaches to a time to mean 'around' that time."
      },
      {
        type:"identify",
        prompt:"What does ぐらい mean here?",
        sentence:"五百グラム<b>ぐらい</b>でけっこうです。",
        options:["approximate amount","exact amount","only (limit)","superlative"],
        answer:"approximate amount",
        explain:"ぐらい／くらい means 'approximately' an amount, time, or length."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (approximate amount)",
        before:"駅まで十分",
        after:"かかります。",
        cue:"(approximate amount)",
        accept:["ぐらい","くらい"],
        explain:"ぐらい／くらい shows an approximate amount — here, about ten minutes."
      }
    ]
  },

  {
    id:"extent-b3", category:"Amounts and Comparing", band:"choices",
    name:"しか・だけ・より・一番 (only, than, the most)",
    example:"車はバスより早いです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does しか mean here?",
        sentence:"千円<b>しか</b>ありません。",
        options:["only (with a negative verb)","also/too","comparison","superlative"],
        answer:"only (with a negative verb)",
        explain:"しか always pairs with a negative verb to mean 'only'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (only, + negative)",
        before:"きっぷが一まい",
        after:"ありません。",
        cue:"(only, + negative)",
        accept:["しか"],
        explain:"しか needs a negative verb at the end of the sentence — 'only one ticket'."
      },
      {
        type:"identify",
        prompt:"What does だけ mean here?",
        sentence:"一人<b>だけ</b>です。",
        options:["only (no negative needed)","only (+ negative)","comparison","approximate amount"],
        answer:"only (no negative needed)",
        explain:"だけ also means 'only', but unlike しか it doesn't need a negative verb."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (only, no negative needed)",
        before:"今日はしゅくだいが一つ",
        after:"です。",
        cue:"(only)",
        accept:["だけ"],
        explain:"だけ means 'only' and can be used in a positive sentence."
      },
      {
        type:"identify",
        prompt:"What does より mean here?",
        sentence:"車はバス<b>より</b>早いです。",
        options:["comparison (more X than Y)","approximate amount","only","superlative"],
        answer:"comparison (more X than Y)",
        explain:"より attaches to the thing being compared against — 'faster than the bus'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (comparison — 'than')",
        before:"今日はきのう",
        after:"あついです。",
        cue:"(than)",
        accept:["より"],
        explain:"より marks what something is being compared to."
      },
      {
        type:"identify",
        prompt:"What does 一番 mean here?",
        sentence:"これが<b>一番</b>好きです。",
        options:["superlative (the most)","comparison (more than)","approximate amount","only"],
        answer:"superlative (the most)",
        explain:"一番 means 'the most' — the top of a comparison."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (the most)",
        before:"すしの中で、サーモンが",
        after:"好きです。",
        cue:"(the most)",
        accept:["一番"],
        explain:"一番 goes before the adjective or verb to mean 'the most'."
      }
    ]
  },

  {
    id:"conjunctions-choices", category:"Joining Ideas", band:"choices",
    name:"が・から (but, because)",
    example:"つかれたからもうねます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does が mean here?",
        sentence:"今日は雨でした<b>が</b>、海に行きました。",
        options:["but (simple contrast)","because (reason)","so (cause and effect)","although (unexpected contrast)"],
        answer:"but (simple contrast)",
        explain:"が connects two contrasting ideas — a simple, neutral 'but'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct conjunction (but)",
        before:"この本はおもしろかった",
        after:"、少し長かったです。",
        cue:"(but)",
        accept:["が"],
        explain:"が joins two contrasting plain or polite clauses — a simple, neutral 'but'."
      },
      {
        type:"identify",
        prompt:"What does から mean here?",
        sentence:"つかれた<b>から</b>もうねます。",
        options:["because (reason/cause)","however","in order to (purpose)","when (time)"],
        answer:"because (reason/cause)",
        explain:"から gives a direct, personal reason — 'because I'm tired'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct conjunction (because)",
        before:"雨がふった",
        after:"、うちにいました。",
        cue:"(because)",
        accept:["から"],
        explain:"から states a direct personal reason for the result."
      }
    ]
  },

  {
    id:"conjunctions-b4", category:"Joining Ideas", band:"links",
    name:"けれども・ので・と・のに (shading the join)",
    example:"雨がふったので行きませんでした。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does けれども mean here?",
        sentence:"いっしょうけんめい勉強した<b>けれども</b>、テストができませんでした。",
        options:["however (despite trying hard)","because","so","comparison"],
        answer:"however (despite trying hard)",
        explain:"けれども (or けれど／けど) means 'however' — similar to が but often used more conversationally."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct conjunction (however)",
        before:"高かった",
        after:"、買いました。",
        cue:"(however)",
        accept:["けど","けれど","けれども"],
        explain:"けど／けれど／けれども all mean 'however', from casual to more formal."
      },
      {
        type:"identify",
        prompt:"What does ので mean here?",
        sentence:"雨がふった<b>ので</b>行きませんでした。",
        options:["so / because (softer, more objective reason)","however","purpose","time"],
        answer:"so / because (softer, more objective reason)",
        explain:"ので gives a reason too, but sounds softer and more objective than から — often used to explain or excuse."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct conjunction (so, explaining a reason)",
        before:"かぜをひいた",
        after:"、学校を休みました。",
        cue:"(so, explaining a reason)",
        accept:["ので"],
        explain:"ので softens the reason — useful for polite explanations or excuses."
      },
      {
        type:"identify",
        prompt:"What does と mean here?",
        sentence:"雨がふる<b>と</b>すずしくなります。",
        options:["when/if (a natural, automatic result)","however","because","although"],
        answer:"when/if (a natural, automatic result)",
        explain:"と as a conjunction shows a natural, automatic result — 'when it rains, it becomes cool' (always happens)."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct conjunction (when/if — natural result)",
        before:"ボタンをおす",
        after:"、ドアがあきます。",
        cue:"(when/if)",
        accept:["と"],
        explain:"と shows that pressing the button always, automatically opens the door."
      },
      {
        type:"identify",
        prompt:"What does のに mean here?",
        sentence:"雨がふった<b>のに</b>来てくれました。",
        options:["although (unexpected, often with surprise or complaint)","because","so","when"],
        answer:"although (unexpected, often with surprise or complaint)",
        explain:"のに shows an unexpected or disappointing contrast — stronger than が, often carrying surprise or complaint."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct conjunction (although — unexpected)",
        before:"たくさん勉強した",
        after:"、テストができませんでした。",
        cue:"(although)",
        accept:["のに"],
        explain:"のに shows a disappointing or surprising contrast — despite studying hard, the test didn't go well."
      }
    ]
  },

  {
    id:"nominalisers-b4", category:"Can and Must", band:"links",
    name:"の・こと・ことができる",
    example:"漢字を読むことができますか。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What is の doing here?",
        sentence:"りょうりをするの<b>は</b>楽しいです。",
        options:["nominalisation ('the act of doing X')","possession","location","question marker"],
        answer:"nominalisation ('the act of doing X')",
        explain:"の turns the verb phrase before it into a noun — 'doing cooking' becomes the subject."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (turns the verb phrase into a noun)",
        before:"日本語を勉強する",
        after:"はおもしろいです。",
        cue:"(the act of...)",
        accept:["の"],
        explain:"の turns 'studying Japanese' into a noun phrase acting as the subject."
      },
      {
        type:"identify",
        prompt:"What is こと doing here?",
        sentence:"漢字をおぼえる<b>こと</b>はむずかしいですか。",
        options:["nominalisation (the act/fact of doing X)","possession","comparison","question marker"],
        answer:"nominalisation (the act/fact of doing X)",
        explain:"こと also nominalises a verb phrase, often for more abstract or formal ideas than の."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (turns the verb phrase into a noun, more formal)",
        before:"しゅみは<ruby>音<rt>おん</rt></ruby>楽をきく",
        after:"です。",
        cue:"(the act of...)",
        accept:["こと"],
        explain:"こと nominalises the verb phrase — here, 'listening to music' becomes the noun describing the hobby."
      },
      {
        type:"identify",
        prompt:"What does PF+ことができる mean here?",
        sentence:"漢字を読む<b>ことができますか</b>。",
        options:["ability/possibility (can do X)","decision (decide to do X)","result (it turned out that X)","nominalisation only"],
        answer:"ability/possibility (can do X)",
        explain:"PF+ことができる expresses being able to do something."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (can do...)",
        before:"ひらがなを書く",
        after:"ができますか。",
        cue:"(can...)",
        accept:["こと"],
        explain:"PF+ことができる means 'can do' — こと nominalises the verb, then ができる adds ability."
      }
    ]
  },

  {
    id:"nominalisers-paragraphs", category:"Can and Must", band:"paragraphs",
    name:"ことにする・ことになる (deciding vs being decided)",
    example:"来年、日本に行くことになりました。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does PF+ことにする mean here?",
        sentence:"来年、日本に行く<b>ことにしました</b>。",
        options:["decision (decided to do X)","ability","result (it turned out)","nominalisation only"],
        answer:"decision (decided to do X)",
        explain:"PF+ことにする expresses a personal decision to do something."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (decided to...)",
        before:"毎日日本語を勉強する",
        after:"にしました。",
        cue:"(decided...)",
        accept:["こと"],
        explain:"PF+ことにする shows a personal decision — こと nominalises, にする adds 'decide'."
      },
      {
        type:"identify",
        prompt:"What does PF+ことになる mean here?",
        sentence:"来年、日本に行く<b>ことになりました</b>。",
        options:["result (it has been decided/turns out that X)","personal decision","ability","nominalisation only"],
        answer:"result (it has been decided/turns out that X)",
        explain:"PF+ことになる shows a decision or arrangement made by others or circumstances, not the speaker's own choice."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (it has been arranged that...)",
        before:"クラスは京都へ行く",
        after:"になりました。",
        cue:"(it has been arranged...)",
        accept:["こと"],
        explain:"PF+ことになる shows an arrangement decided by others or circumstances."
      }
    ]
  },

  {
    id:"sfp-sentences", category:"Questions", band:"sentences",
    name:"か (asking a question)",
    example:"何年生ですか。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does か mean here?",
        sentence:"何年生です<b>か</b>。",
        options:["question marker","tag question","assurance","soft statement ending"],
        answer:"question marker",
        explain:"か marks a sentence as a question — the standard, neutral question marker."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (question marker)",
        before:"あしたテストがあります",
        after:"",
        cue:"(is there...?)",
        accept:["か"],
        explain:"か is the standard question marker at the end of a sentence."
      },
      {
        type:"identify",
        prompt:"What makes this a question?",
        sentence:"日本語を勉強します<b>か</b>。",
        options:["か at the end turns the statement into a question","the word order changed","the verb changed form","です was added"],
        answer:"か at the end turns the statement into a question",
        explain:"Japanese doesn't reorder the words to ask a question. Adding か to the end of a polite sentence is enough."
      },
      {
        type:"gapfill",
        prompt:"Make this into a question",
        before:"すしが好きです",
        after:"",
        cue:"(question marker)",
        accept:["か"],
        explain:"か at the end makes it a question: すしが好きですか。"
      }
    ]
  },

  {
    id:"sentence-final-b4", category:"Questions", band:"choices",
    name:"ね／ねえ・よ (agreement vs assurance)",
    example:"日本語は楽しいですね。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does ね mean here?",
        sentence:"日本語はとても楽しいです<b>ね</b>。",
        options:["tag question / seeking agreement (isn't it?)","assurance (telling, informing)","question marker","soft statement ending"],
        answer:"tag question / seeking agreement (isn't it?)",
        explain:"ね invites agreement or confirmation from the listener — 'isn't it?'"
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (seeking agreement)",
        before:"今日はあついです",
        after:"",
        cue:"(isn't it?)",
        accept:["ね","ねえ"],
        explain:"ね seeks agreement — similar to English 'isn't it?' or 'right?'"
      },
      {
        type:"identify",
        prompt:"What does よ mean here?",
        sentence:"日本語は楽しいです<b>よ</b>。",
        options:["assurance (telling the listener something new/certain)","tag question","question marker","soft ending"],
        answer:"assurance (telling the listener something new/certain)",
        explain:"よ asserts information the listener may not know — adds confidence or persuasion."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (assurance — telling them something)",
        before:"この店はやすいです",
        after:"",
        cue:"(I'm telling you)",
        accept:["よ"],
        explain:"よ adds assurance, telling the listener something with confidence."
      }
    ]
  },

  {
    id:"sfp-links", category:"Questions", band:"links",
    name:"の (soft question — register and tone)",
    example:"あした来るの？",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does の mean here?",
        sentence:"日本に行ったことがある<b>の</b>？",
        options:["soft question ending (casual, curious tone)","topic marker","possession","location"],
        answer:"soft question ending (casual, curious tone)",
        explain:"の as a sentence-final particle softens a question, often sounding curious or casual — different from の as a possession particle."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (soft, casual question ending)",
        before:"あした来る",
        after:"？",
        cue:"(casual question)",
        accept:["の"],
        explain:"の softens a question into a casual, curious tone."
      }
    ]
  },

  {
    id:"misc-choices", category:"Amounts and Comparing", band:"choices",
    name:"のほう (the softer comparison)",
    example:"バナナよりりんごのほうが好きです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does のほう mean here?",
        sentence:"バナナよりりんご<b>のほう</b>が好きです。",
        options:["softer comparison (X is more the one, compared to Y)","superlative","only","approximate amount"],
        answer:"softer comparison (X is more the one, compared to Y)",
        explain:"のほう softens a comparison — 'apples are more the preferred one, compared to bananas'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (the ... one — softer comparison)",
        before:"赤いペンより青いペン",
        after:"が好きです。",
        cue:"(the ... one)",
        accept:["のほう"],
        explain:"のほう softens the comparison between the two options."
      },
      {
        type:"identify",
        prompt:"What is より doing in this comparison?",
        sentence:"バナナ<b>より</b>りんごのほうが好きです。",
        options:["it marks the option you like less","it marks the option you prefer","it marks the topic","it marks the object"],
        answer:"it marks the option you like less",
        explain:"In AよりBのほうが…, より attaches to A (the one you like less) and のほう attaches to B (the one you prefer)."
      },
      {
        type:"order",
        prompt:"Build the comparison: I like summer more than winter.",
        words:["ふゆ","より","なつ","のほう","が","好きです"],
        answer:"ふゆよりなつのほうが好きです",
        explain:"AよりBのほうが好きです。より goes with the lesser option (ふゆ), のほう with the preferred one (なつ)."
      }
    ]
  },

  {
    id:"misc-b4", category:"Can and Must", band:"links",
    name:"potential form (can do)",
    example:"弟は日本語がちょっと読めます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What form is 読めます here?",
        sentence:"弟は日本語がちょっと<b>読めます</b>。",
        options:["potential (can do X)","passive (is done by)","causative (make/let do)","desiderative (want to do)"],
        answer:"potential (can do X)",
        explain:"The potential form shows ability — 'can read'."
      },
      {
        type:"gapfill",
        prompt:"Change to the potential form (can do...)",
        before:"わたしはさしみが",
        after:"。",
        cue:"たべます",
        accept:["たべられます"],
        explain:"る-verbs (ichidan) form the potential by dropping る and adding られる/られます. たべます→たべられます"
      },
      {
        type:"transform",
        prompt:"Change to the potential form (can do...)",
        sentence:"よむ (to read)",
        accept:["よめる","読める"],
        explain:"う-verbs change the final u-sound to an e-sound and add る. よむ → よめる",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the potential form (can do...)",
        sentence:"いく (to go)",
        accept:["いける","行ける"],
        explain:"う-verbs change the final u-sound to an e-sound and add る. いく → いける",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the potential form (can do...)",
        sentence:"はなす (to speak)",
        accept:["はなせる","話せる"],
        explain:"う-verbs change the final u-sound to an e-sound and add る. はなす → はなせる",
        tags:["u-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the potential form (can do...)",
        sentence:"みる (to watch, to see)",
        accept:["みられる","見られる"],
        explain:"る-verbs (ichidan) drop る and add られる. みる → みられる",
        tags:["ichidan-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the potential form (can do...)",
        sentence:"する (to do)",
        accept:["できる"],
        explain:"する is irregular: its potential form is できる.",
        tags:["irregular-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the potential form (can do...)",
        sentence:"くる (to come)",
        accept:["こられる","来られる"],
        explain:"来る is irregular: くる → こられる.",
        tags:["irregular-verbs"]
      },
      {
        type:"identify",
        prompt:"Why is が used here, and not を?",
        sentence:"わたしは日本語<b>が</b>話せます。",
        options:["with the potential form, the thing you can do takes が","が always marks the subject","potential verbs take no particle","を can never follow a noun"],
        answer:"with the potential form, the thing you can do takes が",
        explain:"When a verb goes into the potential form, its object usually switches from を to が. 日本語を話します → 日本語が話せます",
        tags:["particle"]
      },
      {
        type:"gapfill",
        prompt:"Fill in the particle used with the potential form",
        before:"わたしは<ruby>漢字<rt>かんじ</rt></ruby>",
        after:"読めません。",
        cue:"(particle)",
        accept:["が"],
        explain:"The thing you can or can't do takes が with the potential form. 漢字が読めません",
        tags:["particle"]
      }
    ]
  },

  {
    id:"misc-paragraphs", category:"Past and If", band:"paragraphs",
    name:"ば・というNoun",
    example:"時間があれば、日本へ行きたいです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does あれば mean here?",
        sentence:"時間が<b>あれば</b>、日本へ行きたいです。",
        options:["conditional (if X)","reason (because X)","time (when X)","result (so X)"],
        answer:"conditional (if X)",
        explain:"ば forms a conditional — 'if there is time'."
      },
      {
        type:"gapfill",
        prompt:"Change to the ば form (if...)",
        before:"この店は",
        after:"買います。",
        cue:"やすい",
        accept:["やすければ"],
        explain:"い-adjectives form ば by dropping い and adding ければ. やすい→やすければ"
      },
      {
        type:"identify",
        prompt:"What does という mean here?",
        sentence:"ハリーポッター<b>という</b>本を読んだことがありますか。",
        options:["called (a thing named X)","comparison","possession","question marker"],
        answer:"called (a thing named X)",
        explain:"NAMEというNOUN introduces something by name — 'a book called Harry Potter'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (called...)",
        before:"となりのトトロ",
        after:"えいがを見たことがありますか。",
        cue:"(called...)",
        accept:["という"],
        explain:"という introduces the name of something before the noun."
      }
    ]
  },

  {
    id:"particles-harder-b2", category:"Particles", band:"links",
    name:"existence vs action vs destination vs time vs indirect object",
    example:"こうえんで子供たちがあそんでいます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Why is に correct here, and not で?",
        sentence:"つくえの上<b>に</b>本があります。",
        options:["existence — marks where something is (with ある/いる)","place of action — where something happens","means — how something is done","destination — where something is going"],
        answer:"existence — marks where something is (with ある/いる)",
        explain:"に marks location with existence verbs like ある/いる. で would be wrong here — で marks where an action happens, not where something simply is."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (existence — with いる/ある)",
        before:"いすの下",
        after:"ねこがいます。",
        cue:"(existence)",
        accept:["に"],
        explain:"に is used for location with ある/いる — describing where something exists."
      },
      {
        type:"identify",
        prompt:"Why is で correct here, and not に?",
        sentence:"<ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby>たちがこうえん<b>で</b>あそんでいます。",
        options:["あそぶ (to play) is an action, so で (place of action) is needed","子供 needs a subject particle, not location","に is only ever used for time, never location","で and に mean exactly the same thing here"],
        answer:"あそぶ (to play) is an action, so で (place of action) is needed",
        explain:"A common mistake is using に here since the children 'are in' the park — but あそぶ is an action, so で (place of action) is correct, not に (existence)."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (action — where you read)",
        before:"としょかん",
        after:"本を読みます。",
        cue:"(place of action)",
        accept:["で"],
        explain:"読む is an action, so で marks where it happens — not に."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (existence — where something is)",
        before:"つくえの上",
        after:"本があります。",
        cue:"(existence)",
        accept:["に"],
        explain:"ある is an existence verb, so に marks where it is — not で."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (destination — either works here)",
        before:"明日、大阪",
        after:"行きます。",
        cue:"(destination)",
        accept:["に","へ"],
        explain:"Either に or へ works for destination — they're interchangeable here."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (point in time)",
        before:"三時",
        after:"としょかんへ行きます。",
        cue:"(point in time)",
        accept:["に"],
        explain:"に marks the time here — the destination is already marked separately by へ, so don't repeat に there."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (indirect object — who receives it)",
        before:"先生",
        after:"手紙を書きました。",
        cue:"(who receives it)",
        accept:["に"],
        explain:"に marks the person a letter is written to — the indirect object."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (means — using what?)",
        before:"はし",
        after:"すしを食べました。",
        cue:"(means)",
        accept:["で"],
        explain:"で marks the tool or means used — chopsticks, in this case."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct particle (place of action — where?)",
        before:"レストラン",
        after:"すしを食べました。",
        cue:"(place of action)",
        accept:["で"],
        explain:"で also marks where an action happens — compare with the previous item: で covers both 'where' and 'how'."
      }
    ]
  },

  {
    id:"reading-1-b1", category:"Reading Practice", band:null,
    name:"Weekend trip to Kyoto (short passage)",
    nameT:["京都への週末旅行（短い文）","きょうとへのしゅうまつりょこう（みじかいぶん）","Kyōto e no shūmatsu ryokō","Weekend trip to Kyoto (short passage)"],
    example:"わたしは先週のしゅうまつ、京都に行きました。",
    introduced:true, mode:"pool", assessed:false, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Where did the writer go last weekend?",
        sentence:"わたしは先週のしゅうまつ、京都に行きました。朝早く電車に乗って、友<ruby>達<rt>だち</rt></ruby>と京都のお寺を見ました。天気がよかったので、こうえんでおべんとうを食べました。とても楽しかったです。でも、少しつかれました。",
        options:["Kyoto","Osaka","Tokyo","Nagoya"],
        answer:"Kyoto",
        explain:"先週のしゅうまつ、京都に行きました — 'Last weekend, (I) went to Kyoto.'"
      },
      {
        type:"identify",
        prompt:"How did the writer get there?",
        sentence:"わたしは先週のしゅうまつ、京都に行きました。朝早く電車に乗って、友<ruby>達<rt>だち</rt></ruby>と京都のお寺を見ました。天気がよかったので、こうえんでおべんとうを食べました。とても楽しかったです。でも、少しつかれました。",
        options:["By train","By car","By bus","On foot"],
        answer:"By train",
        explain:"電車に乗って — 'got on the train, and...'"
      },
      {
        type:"identify",
        prompt:"Why did they eat lunch in the park?",
        sentence:"わたしは先週のしゅうまつ、京都に行きました。朝早く電車に乗って、友<ruby>達<rt>だち</rt></ruby>と京都のお寺を見ました。天気がよかったので、こうえんでおべんとうを食べました。とても楽しかったです。でも、少しつかれました。",
        options:["Because the weather was good","Because it was cheap","Because a friend suggested it","Because it was raining"],
        answer:"Because the weather was good",
        explain:"天気がよかったので — 'because the weather was good.'"
      },
      {
        type:"identify",
        prompt:"How did the writer feel by the end of the day?",
        sentence:"わたしは先週のしゅうまつ、京都に行きました。朝早く電車に乗って、友<ruby>達<rt>だち</rt></ruby>と京都のお寺を見ました。天気がよかったので、こうえんでおべんとうを食べました。とても楽しかったです。でも、少しつかれました。",
        options:["Happy but a little tired","Sad and lonely","Bored","Angry"],
        answer:"Happy but a little tired",
        explain:"とても楽しかったです。でも、少しつかれました — 'It was very fun. But (I) got a little tired.'"
      }
    ]
  },

  {
    id:"reading-2-pool", category:"Reading Practice", band:null,
    name:"コンビニの便利さとごみ問題 (U4O3 Convenience & Waste)",
    nameT:["コンビニの便利さとごみ問題","コンビニのべんりさとごみもんだい","konbini no benrisa to gomi mondai","Convenience stores and waste (U4O3)"],
    example:"日本のコンビニは便利すぎる？",
    introduced:true, mode:"pool", assessed:false, resources:null,
    items:[
      {
        type:"identify",
        prompt:"Besides buying food and drinks, what can people do at a convenience store?",
        sentence:"日本には、どこに行ってもコンビニがあります。コンビニでは、食べ物や飲み物を買うだけではなく、電気だい代をはら払ったり、にもつ荷物をおく送ったり、コピーをしたりすることもできます。多くの店が長い時間ひら開いているため、仕事や学校でいそが忙しい人にとって、とてもべんり便利です。また、夜でもあか明るく、人がいるので、あんしん安心できるばしょ場所だと考える人もいます。しかし、この便利なサービスにはかんきょう環境へのもんだい問題もあります。コンビニでは、おにぎり、べんとう弁当、サラダやデザートなど、いつでも新しくてきれいに見えるしょうひん商品がもとめられます。そのため、まだ食べられる商品でも、きめられた時間をすぎるとう売ることができず、すてられてしまうことがあります。店に商品が少ないと、きゃく客がふべん不便だとかんじるかもしれないので、店はひつよういじょう必要以上に商品をようい用意することもあります。ほうそうも大きな問題です。日本では、商品をせいけつにたも保ち、こわれないようにし、見た目をよくするために、ていねいにほうそうするサービスが大切にされています。一つの商品が、プラスチックのようきやふくろに何ど度もつつまれていることもあります。これはえいせいで便利ですが、使った後には多くのごみになります。一方、日本にはむかし昔から「もったいない」という考え方があります。これは、まだ使える物や食べられる物をむだにするのはよくない、という考えです。さいきん最近では、売れのこりそうな食べ物をやす安くしたり、アプリを使ってひつよう必要な人にし知らせたりする店もあります。はし、カップ、ボトルや買い物ぶくろをじぶん自分でも持ってけば、使いすての商品をへらすこともできます。しかし、客だけにせきにんを持たせるのはじゅうぶん十分ではありません。きぎょう企業も、ほうそうを少なくしたり、食べ物をようい用意するりょうをもっとせいかくに考えたりするひつよう必要があります。せいふや町も、きぎょう企業と客がきょうりょく協力しやすいしくみを作るべきでしょう。コンビニをなくせば、ごみの問題がすべてかいけつするわけではありません。コンビニは多くの人の生活をささえています。たいせつ大切なのは、べんり便利さをかんぜんにあきらめることではなく、「もったいない」という考えをげんだい現代の生活に合うかたち形で生かすことです。",
        options:["Pay bills and send packages","Only buy food","Get medical checkups","Rent bicycles"],
        answer:"Pay bills and send packages",
        explain:"食べ物や飲み物を買うだけではなく、電気だい代をはら払ったり、にもつ荷物をおく送ったり — 'not only buying food and drink, but also paying bills and sending packages.'"
      },
      {
        type:"identify",
        prompt:"Why do stores sometimes prepare more food than they need?",
        sentence:"日本には、どこに行ってもコンビニがあります。コンビニでは、食べ物や飲み物を買うだけではなく、電気だい代をはら払ったり、にもつ荷物をおく送ったり、コピーをしたりすることもできます。多くの店が長い時間ひら開いているため、仕事や学校でいそが忙しい人にとって、とてもべんり便利です。また、夜でもあか明るく、人がいるので、あんしん安心できるばしょ場所だと考える人もいます。しかし、この便利なサービスにはかんきょう環境へのもんだい問題もあります。コンビニでは、おにぎり、べんとう弁当、サラダやデザートなど、いつでも新しくてきれいに見えるしょうひん商品がもとめられます。そのため、まだ食べられる商品でも、きめられた時間をすぎるとう売ることができず、すてられてしまうことがあります。店に商品が少ないと、きゃく客がふべん不便だとかんじるかもしれないので、店はひつよういじょう必要以上に商品をようい用意することもあります。",
        options:["Customers might feel inconvenienced if stock runs low","To save money on electricity","Because the government requires it","Because food is cheaper in bulk"],
        answer:"Customers might feel inconvenienced if stock runs low",
        explain:"店に商品が少ないと、きゃく客がふべん不便だとかんじるかもしれない — 'if a store has little stock, customers might feel it's inconvenient.'"
      },
      {
        type:"identify",
        prompt:"What three purposes of packaging are mentioned in the article?",
        sentence:"ほうそうも大きな問題です。日本では、商品をせいけつにたも保ち、こわれないようにし、見た目をよくするために、ていねいにほうそうするサービスが大切にされています。一つの商品が、プラスチックのようきやふくろに何ど度もつつまれていることもあります。これはえいせいで便利ですが、使った後には多くのごみになります。",
        options:["Keep clean, prevent damage, improve appearance","Make food cheaper, faster, lighter","Advertise the brand, attract customers, increase sales","Reduce waste, save money, save time"],
        answer:"Keep clean, prevent damage, improve appearance",
        explain:"商品をせいけつにたも保ち、こわれないようにし、見た目をよくするために — 'to keep products clean, prevent damage, and improve appearance.'"
      },
      {
        type:"identify",
        prompt:"What does もったいない mean according to the article?",
        sentence:"一方、日本にはむかし昔から「もったいない」という考え方があります。これは、まだ使える物や食べられる物をむだにするのはよくない、という考えです。",
        options:["It's wrong to waste something that can still be used or eaten","It's good to buy new things often","Only older people believe in it","It means being extremely careful with money"],
        answer:"It's wrong to waste something that can still be used or eaten",
        explain:"まだ使える物や食べられる物をむだにするのはよくない — 'it is not good to waste things that can still be used or eaten.'"
      },
      {
        type:"identify",
        prompt:"Why is customer responsibility alone not enough to solve the waste problem?",
        sentence:"しかし、客だけにせきにんを持たせるのはじゅうぶん十分ではありません。きぎょう企業も、ほうそうを少なくしたり、食べ物をようい用意するりょうをもっとせいかくに考えたりするひつよう必要があります。せいふや町も、きぎょう企業と客がきょうりょく協力しやすいしくみを作るべきでしょう。",
        options:["Businesses and government also need to take action","Customers don't care enough about waste","It is illegal for customers to reduce waste themselves","Only recycling actually matters"],
        answer:"Businesses and government also need to take action",
        explain:"きぎょう企業も…考えたりするひつよう必要があります。せいふや町も…しくみを作るべきでしょう — businesses and government also need to act, not just customers."
      },
      {
        type:"identify",
        prompt:"What is the writer's final judgement?",
        sentence:"コンビニをなくせば、ごみの問題がすべてかいけつするわけではありません。コンビニは多くの人の生活をささえています。たいせつ大切なのは、べんり便利さをかんぜんにあきらめることではなく、「もったいない」という考えをげんだい現代の生活に合うかたち形で生かすことです。",
        options:["Convenience shouldn't be abandoned, but 'mottainai' thinking should be adapted to modern life","Convenience stores should be shut down entirely","Recycling alone will solve the problem","Nothing can realistically be done"],
        answer:"Convenience shouldn't be abandoned, but 'mottainai' thinking should be adapted to modern life",
        explain:"便利さをかんぜんにあきらめることではなく、「もったいない」という考えを…生かすことです — the key final judgement of the article."
      }
    ]
  },

  {
    id:"persuasive-paragraphs", category:"Analysing and Persuading", band:"paragraphs",
    name:"一方で・たしかに〜ですが (setting up two sides)",
    example:"一方で、ごみがふえるというもんだいがあります。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does 一方で mean here?",
        sentence:"プラスチックのほうそうはべんりです。<b>一方で</b>、ごみがふえるというもんだいがあります。",
        options:["on the other hand (a contrasting point)","because (a reason)","in order to (a purpose)","should (a recommendation)"],
        answer:"on the other hand (a contrasting point)",
        explain:"一方で introduces a different or contrasting point — often used to move from advantages to disadvantages in evaluative writing."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (on the other hand)",
        before:"コンビニはべんりです。",
        after:"、ごみのもんだいがあります。",
        cue:"(on the other hand)",
        accept:["一方で","いっぽうで"],
        explain:"一方で shifts from one side of an issue to the other — a key evaluative-writing connector."
      },
      {
        type:"identify",
        prompt:"What does たしかに～ですが do here?",
        sentence:"<b>たしかに</b>、ほうそうは食べ物をきれいにたもつためにひつようですが、使いすてのプラスチックが多すぎます。",
        options:["acknowledging a point before disagreeing (it's true that... however...)","giving a strong recommendation","stating a direct reason","expressing possibility"],
        answer:"acknowledging a point before disagreeing (it's true that... however...)",
        explain:"たしかに～ですが acknowledges the other side's point before pivoting to your own — essential for a fair evaluative essay or a persuasive rebuttal."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (it is true that...)",
        before:"",
        after:"コンビニはべんりですが、ごみが多いです。",
        cue:"(It is true that...)",
        accept:["たしかに"],
        explain:"たしかに introduces a concession — acknowledging the other side is true, before disagreeing with が."
      }
    ]
  },

  {
    id:"persuasive-evaluative-b4", category:"Analysing and Persuading", band:"argument",
    name:"という点でこうかてき・とはかぎりません・全体的に考えると・ぜひ〜てください・のではなく",
    example:"ぜんたいてきに考えると、こうかてきです。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does という点でこうかてきです mean here?",
        sentence:"ごみをこまかく分けることは、リサイクルできる物をふやす<b>という点でこうかてきです</b>。",
        options:["effective in terms of... (evaluating one specific strength)","should (a recommendation)","because (a reason)","possibility"],
        answer:"effective in terms of... (evaluating one specific strength)",
        explain:"～という点でこうかてきです evaluates one specific strength of an idea — useful for balanced evaluative writing."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (in terms of...)",
        before:"リサイクルは、ごみをへらす",
        after:"こうかてきです。",
        cue:"(in terms of...)",
        accept:["という点で","という点では"],
        explain:"という点で isolates exactly which aspect something is effective in — sharper than just saying 'it's effective'."
      },
      {
        type:"identify",
        prompt:"What does とはかぎりません mean here?",
        sentence:"同じほうほうが、すべての町でうまく行く<b>とはかぎりません</b>。",
        options:["not necessarily true (a nuanced qualifier)","definitely true","definitely false","expressing possibility"],
        answer:"not necessarily true (a nuanced qualifier)",
        explain:"とはかぎりません softens a claim — showing something is not always or necessarily true. A key nuance phrase for high-scoring evaluative writing."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (not necessarily the case)",
        before:"リサイクルだけで、ごみのもんだいがかいけつする",
        after:"。",
        cue:"(not necessarily)",
        accept:["とはかぎりません"],
        explain:"とはかぎりません is used to qualify a claim, showing it isn't always true."
      },
      {
        type:"identify",
        prompt:"What does ぜんたいてきに考えると mean here?",
        sentence:"<b>ぜんたいてきに考えると</b>、こまかいごみぶんべつはこうかてきですが、それだけではごみのもんだいをかいけつできません。",
        options:["overall / considering everything (introducing a final evaluation)","because (a reason)","in order to (a purpose)","should (a recommendation)"],
        answer:"overall / considering everything (introducing a final evaluation)",
        explain:"全体的に考えると introduces your final, balanced evaluation — a strong way to open a conclusion."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (overall, considering everything)",
        before:"",
        after:"、コンビニはべんりですが、もっとごみをへらすべきです。",
        cue:"(overall...)",
        accept:["ぜんたいてきに考えると","ぜんたいてきにかんがえると"],
        explain:"全体的に考えると signals you're weighing up everything discussed before giving your final judgement."
      },
      {
        type:"identify",
        prompt:"What does ぜひ～てください do here?",
        sentence:"<b>ぜひ</b>、使いすてのふくろをへらし、マイバッグを使ってください。",
        options:["a strong, encouraging call to action","a simple, neutral request","a prohibition","expressing possibility"],
        answer:"a strong, encouraging call to action",
        explain:"ぜひ intensifies てください into a warm, strong call to action — common in persuasive conclusions."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (please make sure to...)",
        before:"",
        after:"、マイボトルを使ってください。",
        cue:"(please make sure to...)",
        accept:["ぜひ"],
        explain:"ぜひ adds encouragement and strength to a request — perfect for ending a persuasive piece."
      },
      {
        type:"identify",
        prompt:"What does のではなく do here?",
        sentence:"新しいしせつを作る<b>のではなく</b>、できるだけ多くの物をしげんとして使うほうほうをえらびました。",
        options:["not X, but rather Y (contrasting two options)","because (a reason)","in order to (a purpose)","possibility"],
        answer:"not X, but rather Y (contrasting two options)",
        explain:"のではなく、～ rejects one option in favour of another — useful for explaining a considered choice."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (not X, but rather Y)",
        before:"コンビニをなくす",
        after:"、ごみをへらすほうほうを考えるべきです。",
        cue:"(not X, but rather Y)",
        accept:["のではなく"],
        explain:"のではなく rejects the first option (closing convenience stores) in favour of the alternative."
      }
    ]
  },

  {
    id:"vocab-kyushoku-pool", category:"Topic Vocabulary", band:null,
    name:"給食 (School Lunch) — Topic Vocabulary",
    nameT:["給食の言葉","きゅうしょくのことば","kyūshoku no kotoba","給食 (School Lunch) — Topic Vocabulary"],
    example:"自治体・給食費・えいようし・調理場・はいぜん・当番・献立・食べ残し・衛生・せきにんかん",
    introduced:true, mode:"pool", assessed:false, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>自治体<rt>じちたい</rt></ruby>",
        options:["local government / municipality","school lunch fee","dietitian","hygiene"],
        answer:"local government / municipality",
        explain:"自治体 refers to local government bodies — cities or towns — which sometimes help fund school lunches."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>給食費<rt>きゅうしょくひ</rt></ruby>",
        options:["school-lunch fee","local government","kitchen facility","sense of responsibility"],
        answer:"school-lunch fee",
        explain:"給食費 is the fee parents/guardians pay monthly for school lunches."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"えいようし",
        options:["dietitian / nutritionist","teacher","kitchen","rostered duty"],
        answer:"dietitian / nutritionist",
        explain:"えいようし (栄養士) is the professional who plans school-lunch menus for nutritional balance. None of its kanji are on the VCE list, so it's written in hiragana here."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>調理場<rt>ちょうりじょう</rt></ruby>",
        options:["kitchen / cooking facility","classroom","dining hall","local government office"],
        answer:"kitchen / cooking facility",
        explain:"調理場 is where school lunches are cooked, either on-site or at a central centre."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"はいぜん",
        options:["serving and distributing food","cleaning up","paying the bill","planning the menu"],
        answer:"serving and distributing food",
        explain:"はいぜん (配膳) is the act of serving out and distributing the food to classmates. None of its kanji are on the VCE list, so it's written in hiragana here."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>当番<rt>とうばん</rt></ruby>",
        options:["rostered duty","menu","fee","leftover food"],
        answer:"rostered duty",
        explain:"当番 is a rostered duty — students take turns serving lunch as 給食当番."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>献立<rt>こんだて</rt></ruby>",
        options:["menu","fee","hygiene","dietitian"],
        answer:"menu",
        explain:"献立 is the lunch menu, planned by the dietitian."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>食<rt>た</rt></ruby>べ<ruby>残<rt>のこ</rt></ruby>し",
        options:["leftover food","fresh ingredients","hygiene","rostered duty"],
        answer:"leftover food",
        explain:"食べ残し is food left uneaten — a key word for discussing school-lunch waste."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>衛生<rt>えいせい</rt></ruby>",
        options:["hygiene","responsibility","menu","local government"],
        answer:"hygiene",
        explain:"衛生 covers hygiene and cleanliness — relevant when discussing serving food safely."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"せきにんかん",
        options:["sense of responsibility","sense of hygiene","sense of taste","sense of fairness"],
        answer:"sense of responsibility",
        explain:"せきにんかん (責任感) is a sense of responsibility — one of the things students are said to learn from lunch duty. None of its kanji are on the VCE list, so it's written in hiragana here."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"毎日のメニューを考える人は、",
        after:"です。",
        cue:"(dietitian)",
        accept:["えいようし","栄養士"],
        explain:"えいようし (栄養士) is the dietitian who plans the daily menu."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"今月の",
        after:"には、いろいろなメニューがあります。",
        cue:"(menu)",
        accept:["こんだて","献立"],
        explain:"献立 is the menu — here, this month's menu."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"今日、私はきゅうしょく",
        after:"なので、しょっきをはこびます。",
        cue:"(rostered duty)",
        accept:["とうばん","当番"],
        explain:"当番 is the rostered duty — today it's this student's turn to carry the tableware."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"ほごしゃは毎月",
        after:"をはらいます。",
        cue:"(school-lunch fee)",
        accept:["きゅうしょくひ","給食費"],
        explain:"給食費 is the monthly fee parents pay for school lunches."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"食べ物をすてないために、",
        after:"をへらしたいです。",
        cue:"(leftover food)",
        accept:["たべのこし","食べ残し"],
        explain:"食べ残し — reducing leftover food is a common goal mentioned in discussions of school lunches."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"当番の仕事をすると、",
        after:"を学ぶことができます。",
        cue:"(sense of responsibility)",
        accept:["せきにんかん","責任感"],
        explain:"せきにんかん (責任感) — doing lunch duty is said to teach students a sense of responsibility."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"によって",
        options:["depending on / by means of","according to (citing a source)","in spite of","in addition to"],
        answer:"depending on / by means of",
        explain:"によって shows something varies depending on a factor — 地域によって, 'depending on the area'. Reading tip: it starts with に, which can look like the location/time particle に at a glance — check whether a whole word or just a particle is doing the work here."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"えいよう",
        options:["nutrition","budget","preparation","facility"],
        answer:"nutrition",
        explain:"えいよう (栄養) is nutrition itself — related to but distinct from えいようし (dietitian), which you've already met. Neither kanji is on the VCE list, so it's written in hiragana here."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"よさん",
        options:["budget","facility","burden / cost borne","adjustment"],
        answer:"budget",
        explain:"よさん (予算) is the budget a dietitian has to work within when planning menus."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"はこぶ",
        options:["to carry","to prepare","to adjust","to incorporate"],
        answer:"to carry",
        explain:"はこぶ (運ぶ) is to carry something. Reading tip: it starts with は, which can look like the topic particle は — at the start of a clause, check whether it's this whole verb or just a particle attached to something before it."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"べつ",
        options:["separate / different","preparation","general","burden"],
        answer:"separate / different",
        explain:"べつ (別) means separate or different — used for a separate meal prepared for students with allergies."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"じゅんび",
        options:["preparation","budget","system","opportunity"],
        answer:"preparation",
        explain:"じゅんび (準備) is preparation — a very common, reusable word across many topics, not just school lunches."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"一<ruby>般<rt>ぱん</rt></ruby>",
        options:["general / in general","nutrition","facility","burden"],
        answer:"general / in general",
        explain:"一般に means 'generally' or 'in general' — a useful word for making broad statements before giving specifics."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"ほごしゃ",
        options:["parent / guardian","dietitian","local government","business"],
        answer:"parent / guardian",
        explain:"ほごしゃ (保護者) is the formal word for parent/guardian — common in school and legal contexts across many topics."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"しせつ",
        options:["facility","budget","system","opportunity"],
        answer:"facility",
        explain:"しせつ (施設) is a facility — a broadly useful word beyond just school lunches."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>人件費<rt>じんけんひ</rt></ruby>",
        options:["personnel costs (staff wages)","school-lunch fee","budget","facility"],
        answer:"personnel costs (staff wages)",
        explain:"人件費 specifically means the cost of paying staff — a more precise word than just 'cost'."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"ふたん",
        options:["burden / cost borne by someone","budget","facility","preparation"],
        answer:"burden / cost borne by someone",
        explain:"ふたん (負担) is the burden or cost that someone bears — 家庭のふたん, 'the burden on the family'."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>家庭<rt>かてい</rt></ruby>",
        options:["family / household","local government","business","facility"],
        answer:"family / household",
        explain:"かてい (家庭) is family/household — distinct from 家族 (family members) in that it emphasises the home/household unit."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>食器<rt>しょっき</rt></ruby>",
        options:["tableware / dishes","leftover food","menu","packaging"],
        answer:"tableware / dishes",
        explain:"しょっき (食器) is tableware — the dishes and utensils students carry and clean up during lunch duty."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"まわり",
        options:["surroundings / around","amount","opportunity","system"],
        answer:"surroundings / around",
        explain:"まわり (周り) means surroundings or 'around' — つくえのまわり, 'around the desk'."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"りょう",
        options:["amount / quantity","budget","facility","burden"],
        answer:"amount / quantity",
        explain:"りょう (量) is amount or quantity — useful across many topics wherever you're discussing more or less of something."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"しゅうきょう",
        options:["religion","system","opportunity","adjustment"],
        answer:"religion",
        explain:"しゅうきょう (宗教) is religion — relevant when discussing accommodations for dietary needs."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>体調<rt>たいちょう</rt></ruby>",
        options:["physical condition / health condition","personnel costs","budget","system"],
        answer:"physical condition / health condition",
        explain:"たいちょう (体調) is one's physical condition — used when adjusting food for a student's health needs."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"ひよう",
        options:["cost / expense (general)","personnel costs specifically","budget specifically","burden specifically"],
        answer:"cost / expense (general)",
        explain:"ひよう (費用) is the general word for cost or expense — broader than 人件費 (personnel costs specifically)."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"ちょうせい",
        options:["adjustment","preparation","budget","system"],
        answer:"adjustment",
        explain:"ちょうせい (調整) is adjustment — りょうをちょうせいする, 'to adjust the amount'."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"きかい",
        options:["opportunity / chance","system","facility","budget"],
        answer:"opportunity / chance",
        explain:"きかい (機会) is opportunity or chance — かんきょうについて考えるきかい, 'an opportunity to think about the environment'."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"せいど",
        options:["system","opportunity","facility","adjustment"],
        answer:"system",
        explain:"せいど (制度) is a system — used to describe how something is institutionally organised, e.g. 給食のせいど."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"日本<ruby>式<rt>しき</rt></ruby>",
        options:["Japanese-style","Japanese-made","Japanese-only","Japanese-run"],
        answer:"Japanese-style",
        explain:"にほんしき (日本式) means 'Japanese-style' — useful for any comparative writing task, not just this topic."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"<ruby>取<rt>と</rt></ruby>り<ruby>入<rt>い</rt></ruby>れる",
        options:["to incorporate / adopt","to prepare","to adjust","to carry"],
        answer:"to incorporate / adopt",
        explain:"とりいれる (取り入れる) means to incorporate or adopt something — central to comparative writing ('should we adopt this Japanese practice?'). Reading tip: it starts with と, which can look like the connective/quotative particle と — check whether a whole verb follows before assuming it's just a particle."
      },
      {
        type:"identify",
        prompt:"What does this word mean?",
        sentence:"むりに",
        options:["forcibly / unreasonably","generally","separately","specifically"],
        answer:"forcibly / unreasonably",
        explain:"むりに (無理に) means forcibly or unreasonably — むりに食べさせる, 'to force (someone) to eat'. Reading tip: it ends in に, which can look like a separate に particle attached to むり as a noun — here むりに is one word, an adverb."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"ちいきや学校",
        after:"、給食のほうほうは少しちがいます。",
        cue:"(depending on...)",
        accept:["によって"],
        explain:"によって — the method varies depending on the area or school."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"生とがしょっきをきょうしつまで",
        after:"。",
        cue:"(to carry)",
        accept:["はこぶ","はこびます"],
        explain:"はこぶ (運ぶ) — students carry the tableware to the classroom."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"食物アレルギーがある生とのために、べつの食事を",
        after:"する学校もあります。",
        cue:"(preparation)",
        accept:["じゅんび"],
        explain:"じゅんび (準備) — some schools prepare a separate meal for students with food allergies."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"日本しきの給食をオーストラリアに",
        after:"としたら、もんだいがあるかもしれません。",
        cue:"(to incorporate/adopt)",
        accept:["とりいれる"],
        explain:"とりいれる (取り入れる) — if Japanese-style lunches were to be adopted in Australia."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"食べ物の",
        after:"が多すぎたり、少なすぎたりすることもあります。",
        cue:"(amount)",
        accept:["りょう"],
        explain:"りょう (量) — the amount of food can sometimes be too much or too little."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word",
        before:"",
        after:"全部食べさせるのではなく、りょうをちょうせいすることがたいせつです。",
        cue:"(forcibly)",
        accept:["むりに"],
        explain:"むりに (無理に) — rather than forcing students to eat everything, adjusting the amount is important."
      }
    ]
  },

  {
    id:"comparative-paragraphs", category:"Analysing and Persuading", band:"paragraphs",
    name:"によると・ことが分かります (citing, and concluding)",
    example:"この文章によると、いろいろなもくてきがあります。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does によると do here?",
        sentence:"先生<b>によると</b>、きゅうしょくは学校のちょうりしつか、ちいきのきゅうしょくセンターで作られます。",
        options:["according to (citing a source)","because (a reason)","in order to (a purpose)","should (a recommendation)"],
        answer:"according to (citing a source)",
        explain:"～によると cites where information comes from — essential for referencing texts in comparative writing."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (according to...)",
        before:"この文章",
        after:"、きゅうしょくひは、まいつきほごしゃがはらいます。",
        cue:"(according to...)",
        accept:["によると"],
        explain:"によると attaches to the source being cited — here, 'according to this text'."
      },
      {
        type:"identify",
        prompt:"What does ことが分かります do here?",
        sentence:"この文章から、きゅうしょくにはけんこうやせきにんについて学ぶもくてきもある<b>ことが分かります</b>。",
        options:["we can understand/see that... (a conclusion drawn from a text)","it is necessary that...","it is possible that...","it is not necessarily true that..."],
        answer:"we can understand/see that... (a conclusion drawn from a text)",
        explain:"～ことが分かります signals a conclusion drawn from evidence in a text — key language for interpretive and comparative writing."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (we can see/understand that...)",
        before:"この文章から、きゅうしょくにはいろいろなもくてきがある",
        after:"。",
        cue:"(we can see that...)",
        accept:["ことが分かります"],
        explain:"ことが分かります turns an observation from the text into a stated conclusion."
      }
    ]
  },

  {
    id:"comparative-analytical-b4", category:"Analysing and Persuading", band:"argument",
    name:"という点では・をとおして〜学べます・めん・はるかに",
    example:"当番をすることをとおして、せきにんかんを学ぶことができます。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does という点では do here?",
        sentence:"けんこう<b>という点では</b>、きゅうしょくはいいと思います。",
        options:["evaluating one specific aspect (in terms of X, I think Y)","giving a strong recommendation","stating a direct reason","expressing a possibility"],
        answer:"evaluating one specific aspect (in terms of X, I think Y)",
        explain:"～という点では、～と思います narrows your evaluation to one specific aspect — useful for a balanced, structured comparison."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (in terms of...)",
        before:"せきにんかんという",
        after:"、きゅうしょくはいいと思います。",
        cue:"(in terms of...)",
        accept:["点では"],
        explain:"という点では isolates exactly which aspect you're evaluating before giving your judgement."
      },
      {
        type:"identify",
        prompt:"What does を通して do here?",
        sentence:"当番をすること<b>をとおして</b>、せきにんかんやきょうりょくすることを学ぶことができます。",
        options:["through (doing) X, one can learn Y","because of X, Y happens","in order to X, do Y","despite X, Y still happens"],
        answer:"through (doing) X, one can learn Y",
        explain:"～を通して～を学ぶことができます explains what students gain through an experience — common in analytical writing about school customs. 通 isn't on the VCE list, so it's shown in hiragana here."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct expression (through...)",
        before:"きゅうしょくの当番を",
        after:"、せきにんかんを学ぶことができます。",
        cue:"(through...)",
        accept:["通して","とおして"],
        explain:"を通して frames an experience as the means through which something is learned."
      },
      {
        type:"identify",
        prompt:"What does めん do here?",
        sentence:"トイレそうじは、けんこう<b>めん</b>でしんぱいされることがあります。",
        options:["a specific aspect (e.g. the health aspect)","a reason","a purpose","a possibility"],
        answer:"a specific aspect (e.g. the health aspect)",
        explain:"～めん attaches to a noun to specify which aspect you're discussing — 'in terms of the health aspect'."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (aspect — e.g. health aspect)",
        before:"けんこう",
        after:"で、しんぱいされることがあります。",
        cue:"(aspect)",
        accept:["めん"],
        explain:"めん narrows the discussion to one particular aspect of the issue."
      },
      {
        type:"identify",
        prompt:"What does はるかに do here?",
        sentence:"そうじ時間のよさをみとめて、さんせいする人のほうが<b>はるかに</b>多いです。",
        options:["by far / significantly (a strong comparison intensifier)","a little / slightly","about the same","not at all"],
        answer:"by far / significantly (a strong comparison intensifier)",
        explain:"はるかに strengthens a comparison — 'far more', 'significantly more' — useful when one side clearly outweighs the other."
      },
      {
        type:"gapfill",
        prompt:"Fill in the correct word (by far, significantly)",
        before:"きゅうしょくが好きなせいとのほうが",
        after:"多いです。",
        cue:"(by far)",
        accept:["はるかに"],
        explain:"はるかに makes the comparison emphatic — 'by far more'."
      }
    ]
  },

  {
    id:"polite-finite-s", category:"Verb Forms", band:"sentences",
    name:"ます・ません・ました・ませんでした, い-adjectives, な-adjectives/nouns",
    example:"きのう、すしをたべました。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What does ～ます show here?",
        sentence:"まいあさ、コーヒーを<b>のみます</b>。",
        options:["present/future, affirmative, polite","present/future, negative, polite","past, affirmative, polite","past, negative, polite"],
        answer:"present/future, affirmative, polite",
        explain:"～ます is the polite present/future affirmative — things you do now or will do."
      },
      {
        type:"transform",
        prompt:"Change to the polite present (ます) form",
        sentence:"たべる (to eat)",
        accept:["たべます"],
        explain:"Drop る from an ichidan verb and add ます. たべる→たべます",
        tags:["ichidan-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the polite present (ます) form",
        sentence:"のむ (to drink)",
        accept:["のみます"],
        explain:"Godan verbs change the final u-sound to an i-sound before ます. のむ→のみます",
        tags:["godan-verbs"]
      },
      {
        type:"identify",
        prompt:"What does ～ません show here?",
        sentence:"あさごはんを<b>たべません</b>。",
        options:["present/future, negative, polite","present/future, affirmative, polite","past, negative, polite","past, affirmative, polite"],
        answer:"present/future, negative, polite",
        explain:"～ません is the polite present/future negative — I don't / won't do X."
      },
      {
        type:"transform",
        prompt:"Change to the polite negative (ません) form",
        sentence:"いく (to go)",
        accept:["いきません"],
        explain:"Godan verbs change the final u-sound to an i-sound before ません. いく→いきません",
        tags:["godan-verbs"]
      },
      {
        type:"gapfill",
        prompt:"Fill in the polite negative form",
        before:"今日は学校へ",
        after:"。",
        cue:"いく",
        accept:["いきません"],
        explain:"いく→いきません — polite present negative."
      },
      {
        type:"identify",
        prompt:"What does ～ました show here?",
        sentence:"きのう、えいがを<b>みました</b>。",
        options:["past, affirmative, polite","past, negative, polite","present/future, affirmative, polite","present/future, negative, polite"],
        answer:"past, affirmative, polite",
        explain:"～ました is the polite past affirmative — something that did happen."
      },
      {
        type:"transform",
        prompt:"Change to the polite past (ました) form",
        sentence:"みる (to watch/see)",
        accept:["みました"],
        explain:"Drop る from an ichidan verb and add ました. みる→みました",
        tags:["ichidan-verbs"]
      },
      {
        type:"identify",
        prompt:"What does ～ませんでした show here?",
        sentence:"しゅくだいを<b>しませんでした</b>。",
        options:["past, negative, polite","past, affirmative, polite","present/future, negative, polite","present/future, affirmative, polite"],
        answer:"past, negative, polite",
        explain:"～ませんでした is the polite past negative — something that did not happen."
      },
      {
        type:"transform",
        prompt:"Change to the polite negative past (ませんでした) form",
        sentence:"する (to do)",
        accept:["しませんでした"],
        explain:"する is irregular. する→します→しませんでした",
        tags:["irregular-verbs"]
      },
      {
        type:"identify",
        prompt:"What pattern does this い-adjective sentence follow?",
        sentence:"このかばんは<b>たかいです</b>。",
        options:["い-adjective + です (polite present)","な-adjective/noun + です","plain form","past tense"],
        answer:"い-adjective + です (polite present)",
        explain:"い-adjectives take です directly for the polite present — no な or だ needed."
      },
      {
        type:"transform",
        prompt:"Change to the polite negative (くないです)",
        sentence:"やすいです (is cheap)",
        accept:["やすくないです"],
        explain:"い-adjectives drop い and add くないです for the negative. やすい→やすくないです"
      },
      {
        type:"identify",
        prompt:"What pattern does this な-adjective sentence follow?",
        sentence:"田中さんは<b>げんきではありません</b>。",
        options:["な-adjective/noun + ではありません (polite negative)","い-adjective negative","plain form","past tense"],
        answer:"な-adjective/noun + ではありません (polite negative)",
        explain:"な-adjectives and nouns use では/じゃ + ありません for the polite negative — they never take くない like い-adjectives."
      },
      {
        type:"gapfill",
        prompt:"Fill in the polite past form of a な-adjective/noun",
        before:"きのう、天気は",
        after:"。",
        cue:"あめ (rain, noun)",
        accept:["あめでした"],
        explain:"Nouns and な-adjectives add でした for the polite past. あめ→あめでした"
      }
    ]
  },

  {
    id:"plain-finite-l", category:"Sentences", band:"links",
    name:"dictionary form・ない・た・なかった, い-adjectives, な-adjectives/nouns",
    example:"きのう、テストがあったから、べんきょうした。",
    introduced:true, mode:"progression", assessed:true, resources:null,
    items:[
      {
        type:"identify",
        prompt:"What is this verb form, and where is it used?",
        sentence:"わたしはまいあさ、コーヒーを<b>のむ</b>。",
        options:["dictionary form (plain present) — casual speech, or before PF+expressions like とき/かもしれない","polite present (ます form)","plain past","polite past"],
        answer:"dictionary form (plain present) — casual speech, or before PF+expressions like とき/かもしれない",
        explain:"The dictionary form is the plain present. It's used in casual speech and is the base every PF+expression (とき、かもしれない、と思う…) attaches to."
      },
      {
        type:"transform",
        prompt:"Change to the dictionary (plain present) form",
        sentence:"たべます (to eat)",
        accept:["たべる"],
        explain:"Ichidan verbs drop ます and add る. たべます→たべる",
        tags:["ichidan-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the dictionary (plain present) form",
        sentence:"はなします (to speak)",
        accept:["はなす"],
        explain:"Godan verbs change the i-sound before ます back to a u-sound. はなします→はなす",
        tags:["godan-verbs"]
      },
      {
        type:"identify",
        prompt:"What is this verb form here?",
        sentence:"あの店ではおさけを<b>のまない</b>。",
        options:["plain negative — casual speech, or before PF+expressions like ように/かもしれない","dictionary form (plain present)","plain past","plain past negative"],
        answer:"plain negative — casual speech, or before PF+expressions like ように/かもしれない",
        explain:"The plain negative ends in ない. It's the form ように, かもしれない and other PF+expressions attach to."
      },
      {
        type:"transform",
        prompt:"Change to the plain negative (ない) form",
        sentence:"いきます (to go)",
        accept:["いかない"],
        explain:"Godan verbs change the final u-sound to an a-sound and add ない. いきます→いく→いかない",
        tags:["godan-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the plain negative (ない) form",
        sentence:"みます (to watch/see)",
        accept:["みない"],
        explain:"Ichidan verbs drop ます and add ない. みます→みない",
        tags:["ichidan-verbs"]
      },
      {
        type:"identify",
        prompt:"What is this verb form here?",
        sentence:"きのう、友<ruby>達<rt>だち</rt></ruby>と<b>はなした</b>。",
        options:["plain past — casual speech, or before PF+expressions like とき/し/と思った","dictionary form (plain present)","plain negative","plain past negative"],
        answer:"plain past — casual speech, or before PF+expressions like とき/し/と思った",
        explain:"The plain past ends in た/だ. It conjugates the same way as the て-form, swapping て→た and で→だ."
      },
      {
        type:"transform",
        prompt:"Change to the plain past (た) form",
        sentence:"のみます (to drink)",
        accept:["のんだ"],
        explain:"Verbs ending in む become んだ in the plain past, the same pattern as the te-form. のみます→のんだ",
        tags:["godan-verbs"]
      },
      {
        type:"transform",
        prompt:"Change to the plain past (た) form",
        sentence:"きます (来ます, to come)",
        accept:["きた","来た"],
        explain:"来る is irregular. 来ます→来る→来た",
        tags:["irregular-verbs"]
      },
      {
        type:"identify",
        prompt:"What is this verb form here?",
        sentence:"けさ、あさごはんを<b>たべなかった</b>。",
        options:["plain past negative — casual speech, or before PF+expressions like かもしれない/と思った","plain past","plain negative","dictionary form (plain present)"],
        answer:"plain past negative — casual speech, or before PF+expressions like かもしれない/と思った",
        explain:"The plain past negative ends in なかった — take the plain negative (ない) and change い→かった."
      },
      {
        type:"transform",
        prompt:"Change to the plain past negative (なかった) form",
        sentence:"します (to do)",
        accept:["しなかった"],
        explain:"する is irregular. します→する→しない→しなかった",
        tags:["irregular-verbs"]
      },
      {
        type:"identify",
        prompt:"What is happening to this い-adjective?",
        sentence:"あのみせは<b>たかくなかった</b>。",
        options:["plain past negative of an い-adjective","plain present of an い-adjective","plain past of an い-adjective","polite form"],
        answer:"plain past negative of an い-adjective",
        explain:"い-adjectives conjugate on their own, without だ or である. たかい→たかくない→たかくなかった."
      },
      {
        type:"transform",
        prompt:"Change to the plain past (かった) form of this い-adjective",
        sentence:"たかいです (is expensive)",
        accept:["たかかった"],
        explain:"い-adjectives drop い and add かった for the plain past. たかい→たかかった"
      },
      {
        type:"identify",
        prompt:"What is happening to this な-adjective/noun?",
        sentence:"むかし、この町は<b>げんきだった</b>。",
        options:["plain past of a な-adjective/noun — uses だ, not です","plain present of a な-adjective/noun","plain negative","polite form"],
        answer:"plain past of a な-adjective/noun — uses だ, not です",
        explain:"な-adjectives and nouns use だ/だった/ではない/ではなかった in the plain form — です is only for polite speech."
      }
    ]
  }
];

window.BANDS = ["script","words","sentences","choices","links","paragraphs","argument"];
window.BAND_META = {
  "script": {
    "head": "Script",
    "long": "Sounds and script",
    "teacher": "Foundation to Level 2",
    "cur": "VIC",
    "show": false
  },
  "words": {
    "head": "Words",
    "long": "Words and set phrases",
    "teacher": "Levels 3 and 4",
    "cur": "VIC",
    "show": false
  },
  "sentences": {
    "head": "Sentences",
    "long": "Simple sentences",
    "teacher": "Levels 5 and 6",
    "cur": "VIC",
    "show": true
  },
  "choices": {
    "head": "Choices",
    "long": "Choosing the right structure",
    "teacher": "Levels 7 and 8",
    "cur": "VIC",
    "show": true
  },
  "links": {
    "head": "Links",
    "long": "Joining and sequencing ideas",
    "teacher": "Levels 9 and 10",
    "cur": "VIC",
    "show": true
  },
  "paragraphs": {
    "head": "Paragraphs",
    "long": "Explaining and recounting at length",
    "teacher": "VCE Units 1 and 2",
    "cur": "VCE",
    "show": true
  },
  "argument": {
    "head": "Argument",
    "long": "Evaluating and persuading",
    "teacher": "VCE Units 3 and 4",
    "cur": "VCE",
    "show": true
  }
};

window.CATEGORIES = [
  "Requests and Politeness",
  "Counting and Time",
  "Sentences",
  "Particles",
  "Questions",
  "Amounts and Comparing",
  "Verb Forms",
  "Verb Endings",
  "Past and If",
  "Can and Must",
  "Joining Ideas",
  "Reporting and Guessing",
  "Analysing and Persuading"
];
window.POOLS = ["Reading Practice","Topic Vocabulary"];

window.CATEGORY_META = {
  "Requests and Politeness": { prescribedBy:"VCE" },
  "Counting and Time": { prescribedBy:"VIC" },
  "Sentences": { prescribedBy:"VCE" },
  "Particles": { prescribedBy:"VCE" },
  "Questions": { prescribedBy:"VCE" },
  "Amounts and Comparing": { prescribedBy:"VCE" },
  "Verb Forms": { prescribedBy:"VCE" },
  "Verb Endings": { prescribedBy:"VCE" },
  "Past and If": { prescribedBy:"VCE" },
  "Can and Must": { prescribedBy:"VCE" },
  "Joining Ideas": { prescribedBy:"VCE" },
  "Reporting and Guessing": { prescribedBy:"VCE" },
  "Analysing and Persuading": { prescribedBy:"PROGRAM" }
};

// Strand names in the lever's four forms: [kanji, kana, romaji, English].
window.JT_STRANDS = {
  "Requests and Politeness": ["あいさつとおねがい","あいさつとおねがい","aisatsu to onegai","Requests and Politeness"],
  "Counting and Time": ["かずと時間","かずとじかん","kazu to jikan","Counting and Time"],
  "Sentences": ["文をつくる","ぶんをつくる","bun o tsukuru","Sentences"],
  "Particles": ["助詞","じょし","joshi","Particles"],
  "Questions": ["質問","しつもん","shitsumon","Questions"],
  "Amounts and Comparing": ["量とくらべ方","りょうとくらべかた","ryō to kurabekata","Amounts and Comparing"],
  "Verb Forms": ["動詞の形","どうしのかたち","dōshi no katachi","Verb Forms"],
  "Verb Endings": ["動詞のつづき","どうしのつづき","dōshi no tsuzuki","Verb Endings"],
  "Past and If": ["過去と「もし」","かこと「もし」","kako to moshi","Past and If"],
  "Can and Must": ["「できる」と「しなければ」","「できる」と「しなければ」","dekiru to shinakereba","Can and Must"],
  "Joining Ideas": ["文をつなぐ","ぶんをつなぐ","bun o tsunagu","Joining Ideas"],
  "Reporting and Guessing": ["伝える・思う","つたえる・おもう","tsutaeru, omou","Reporting and Guessing"],
  "Analysing and Persuading": ["分析と説得","ぶんせきとせっとく","bunseki to settoku","Analysing and Persuading"]
};

// The Prep-to-Year-12 sequence. Year axis: 0 = Prep(F) … 12 = Year 12.
window.JP_YEARS = ["F","1","2","3","4","5","6","7","8","9","10","11","12"];
window.JP_CHUNKS = {
  "Requests and Politeness": [
    { title:"Greetings and set phrases", t:["あいさつ","あいさつ","aisatsu","Greetings and set phrases"], y0:0, y1:2, years:"F–2", covers:["greet-f2"] },
    { title:"Classroom requests: 〜てください", t:["教室のおねがい：〜てください","きょうしつのおねがい：〜てください","kyōshitsu no onegai: 〜te kudasai","Classroom requests: 〜てください"], y0:3, y1:4, years:"3–4", covers:["greet-y34"] },
    { title:"Introducing yourself politely", t:["自己しょうかい","じこしょうかい","jikoshōkai","Introducing yourself politely"], y0:5, y1:6, years:"5–6", covers:["greet-y56"] },
    { title:"てもいい・てはいけない (may, must not)", t:["てもいい・てはいけない","てもいい・てはいけない","temo ii, te wa ikenai","てもいい・てはいけない (may, must not)"], y0:8, y1:8, years:"8", covers:["te-form-2-choices"], needs:["Verb Forms: Making the て-form"] }
  ],
  "Counting and Time": [
    { title:"Numbers", t:["かず","かず","kazu","Numbers"], y0:3, y1:4, years:"3–4", covers:["num-y34"] },
    { title:"Time and days", t:["時間とよう日","じかんとようび","jikan to yōbi","Time and days"], y0:5, y1:6, years:"5–6", covers:["num-y56"], needs:["Particles: に for points in time"] },
    { title:"Counters, and how often", t:["かぞえ方とひん度","かぞえかたとひんど","kazoekata to hindo","Counters, and how often"], y0:7, y1:8, years:"7–8", covers:["num-y78"] }
  ],
  "Sentences": [
    { title:"これはXです", t:["これはXです","これはXです","kore wa X desu","これはXです (This is X)"], y0:0, y1:2, years:"F–2", covers:["identity-f2"] },
    { title:"これ・それ・あれ, and の", t:["これ・それ・あれ・の","これ・それ・あれ・の","kore, sore, are, no","これ・それ・あれ, and の"], y0:3, y1:4, years:"3–4", covers:["identity-y34"] },
    { title:"Describing with adjectives", t:["けいよう詞でせつめい","けいようしでせつめい","keiyōshi de setsumei","Describing with adjectives"], y0:5, y1:6, years:"5–6", covers:["identity-y56"] },
    { title:"Past and negative", t:["過去とひてい","かことひてい","kako to hitei","Past and negative"], y0:7, y1:8, years:"7–8", covers:["identity-y78"] },
    { title:"Plain forms (casual, and before expressions)", t:["ふつう体","ふつうたい","futsūtai","Plain forms (casual, and before expressions)"], y0:9, y1:10, years:"9–10", covers:["plain-finite-l"] }
  ],
  "Particles": [
    { title:"One particle at a time", t:["助詞を一つずつ","じょしをひとつずつ","joshi o hitotsu zutsu","One particle at a time"], y0:5, y1:6, years:"5–6", covers:["particles-sentences"] },
    { title:"Choosing between は/が, に/で", t:["は/が・に/で をえらぶ","は/が・に/で をえらぶ","wa/ga, ni/de o erabu","Choosing between は/が, に/で"], y0:7, y1:8, years:"7–8", covers:["particles-b1-core"] },
    { title:"に vs で vs へ in context", t:["に・で・へ のちがい","に・で・へ のちがい","ni, de, e no chigai","に vs で vs へ in context"], y0:9, y1:10, years:"9–10", covers:["particles-harder-b2"] }
  ],
  "Questions": [
    { title:"か (asking)", t:["か（質問する）","か（しつもんする）","ka (shitsumon suru)","か (asking)"], y0:5, y1:6, years:"5–6", covers:["sfp-sentences"] },
    { title:"ね・よ (agreement, assurance)", t:["ね・よ","ね・よ","ne, yo","ね・よ (agreement, assurance)"], y0:7, y1:8, years:"7–8", covers:["sentence-final-b4"] },
    { title:"の, and how casual to sound", t:["の（カジュアルな質問）","の（カジュアルなしつもん）","no (kajuaru na shitsumon)","の, and how casual to sound"], y0:9, y1:10, years:"9–10", covers:["sfp-links"] }
  ],
  "Amounts and Comparing": [
    { title:"ごろ・ぐらい (about, roughly)", t:["ごろ・ぐらい","ごろ・ぐらい","goro, gurai","ごろ・ぐらい (about, roughly)"], y0:5, y1:6, years:"5–6", covers:["extent-sentences"] },
    { title:"しか・だけ・より・一番・のほう", t:["しか・だけ・より・一番・のほう","しか・だけ・より・いちばん・のほう","shika, dake, yori, ichiban, no hō","しか・だけ・より・一番・のほう (only, than, the most)"], y0:7, y1:8, years:"7–8", covers:["extent-b3","misc-choices"] }
  ],
  "Verb Forms": [
    { title:"ます・ません・ました", t:["ます・ません・ました","ます・ません・ました","masu, masen, mashita","ます・ません・ました (polite forms)"], y0:5, y1:6, years:"5–6", covers:["polite-finite-s"] },
    { title:"Making the て-form", t:["て形を作る","てけいをつくる","te-kei o tsukuru","Making the て-form"], y0:7, y1:8, years:"7–8", covers:["te-form-b2-core"], needs:["Requests and Politeness: 〜てください, used as a set phrase since Year 3"] },
    { title:"てみる・てしまう・ても・てから", t:["てみる・てしまう・ても・てから","てみる・てしまう・ても・てから","temiru, teshimau, temo, tekara","てみる・てしまう・ても・てから (try, finish, even if, after)"], y0:9, y1:10, years:"9–10", covers:["te-form-b2-extended"] }
  ],
  "Verb Endings": [
    { title:"たい・に行く (wanting, going to do)", t:["たい・に行く","たい・にいく","tai, ni iku","たい・に行く (wanting, going to do)"], y0:8, y1:8, years:"8", covers:["verb-stem-choices"], needs:["Verb Forms: the ます-stem"] },
    { title:"そう・かた・やすい/にくい・ながら・すぎる", t:["そう・かた・やすい/にくい・ながら・すぎる","そう・かた・やすい/にくい・ながら・すぎる","sō, kata, yasui/nikui, nagara, sugiru","そう・かた・やすい/にくい・ながら・すぎる (looks like, how to, easy/hard, while, too much)"], y0:9, y1:10, years:"9–10", covers:["verb-stem-b2"], needs:["Verb Forms: the ます-stem"] }
  ],
  "Past and If": [
    { title:"たことがある・たあとで (experience, after)", t:["たことがある・たあとで","たことがある・たあとで","ta koto ga aru, ta ato de","たことがある・たあとで (experience, after)"], y0:8, y1:8, years:"8", covers:["ta-choices"] },
    { title:"たほうがいい・たら・たり〜たり", t:["たほうがいい・たら・たり〜たり","たほうがいい・たら・たり〜たり","ta hō ga ii, tara, tari〜tari","たほうがいい・たら・たり〜たり (advice, if/when, listing)"], y0:9, y1:10, years:"9–10", covers:["ta-tara-tari-b2"], needs:["Verb Forms: the て-form (た conjugates the same way)"] },
    { title:"ば・というNoun", t:["ば・という","ば・という","ba, to iu","ば・というNoun (if, called)"], y0:11, y1:11, years:"11", covers:["misc-paragraphs"] }
  ],
  "Can and Must": [
    { title:"できる・ことができる・なければならない", t:["できる・ことができる・なければならない","できる・ことができる・なければならない","dekiru, koto ga dekiru, nakereba naranai","できる・ことができる・なければならない (can, must)"], y0:9, y1:10, years:"9–10", covers:["misc-b4","nai-form-b3","nominalisers-b4"], needs:["Sentences: plain forms"] },
    { title:"ことにする・ことになる (deciding, being decided)", t:["ことにする・ことになる","ことにする・ことになる","koto ni suru, koto ni naru","ことにする・ことになる (deciding, being decided)"], y0:11, y1:11, years:"11", covers:["nominalisers-paragraphs"] }
  ],
  "Joining Ideas": [
    { title:"が・から (but, because)", t:["が・から","が・から","ga, kara","が・から (but, because)"], y0:7, y1:8, years:"7–8", covers:["conjunctions-choices"] },
    { title:"けれども・ので・と・のに", t:["けれども・ので・と・のに","けれども・ので・と・のに","keredomo, node, to, noni","けれども・ので・と・のに (however, so, when, although)"], y0:9, y1:10, years:"9–10", covers:["conjunctions-b4"], needs:["Sentences: plain forms (ので and のに attach to them)"] },
    { title:"ために・ように・し・んです (purpose, reasons)", t:["ために・ように・し・んです","ために・ように・し・んです","tame ni, yō ni, shi, n desu","ために・ように・し・んです (purpose, reasons)"], y0:11, y1:11, years:"11", covers:["plain-form-expr-2-b3"] }
  ],
  "Reporting and Guessing": [
    { title:"と思う・と言う・とき", t:["と思う・と言う・とき","とおもう・という・とき","to omou, to iu, toki","と思う・と言う・とき (think, say, when)"], y0:9, y1:10, years:"9–10", covers:["pf-expr-1-links"], needs:["Sentences: plain forms"] },
    { title:"そう（伝聞）・つもり・かもしれない・でしょう", t:["そう（伝聞）・つもり・かもしれない・でしょう","そう（でんぶん）・つもり・かもしれない・でしょう","sō (denbun), tsumori, kamoshirenai, deshō","そう（伝聞）・つもり・かもしれない・でしょう (heard that, intend, might, probably)"], y0:11, y1:11, years:"11", covers:["plain-form-expr-1-b3"] },
    { title:"らしい・はず・べき", t:["らしい・はず・べき","らしい・はず・べき","rashii, hazu, beki","らしい・はず・べき (apparently, should be, ought)"], y0:12, y1:12, years:"12", covers:["pf-expr-2-argument"] }
  ],
  "Analysing and Persuading": [
    { title:"によると・ことが分かります・一方で・たしかに", t:["によると・ことが分かります・一方で・たしかに","によると・ことがわかります・いっぽうで・たしかに","ni yoru to, koto ga wakarimasu, ippō de, tashika ni","によると・ことが分かります・一方で・たしかに (citing, concluding, contrasting)"], y0:11, y1:11, years:"11", covers:["comparative-paragraphs","persuasive-paragraphs"] },
    { title:"という点では・とはかぎりません・全体的に・ぜひ", t:["という点では・とはかぎりません・全体的に・ぜひ","というてんでは・とはかぎりません・ぜんたいてきに・ぜひ","to iu ten de wa, to wa kagirimasen, zentaiteki ni, zehi","という点では・とはかぎりません・全体的に・ぜひ (evaluating and persuading)"], y0:12, y1:12, years:"12", covers:["comparative-analytical-b4","persuasive-evaluative-b4"] }
  ]
};
