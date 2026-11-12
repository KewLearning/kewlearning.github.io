/* yomu.js — the reading passages for VCE漢字. A draft Andrew has not line-checked.
   ---------------------------------------------------------------------------
   THE JAPANESE IN THIS FILE IS NOT ANDREW'S. It is written here rather than
   taken from his list, which makes it the one file in this app nobody has
   checked sentence by sentence. He read the shape of it and said to go ahead,
   so it is live while he reads it properly; every sentence, gloss and question
   is still his to correct. DRAFT_YOMU.md is the same content laid out for him
   to read, and tools/yomu-sheet.js writes that file from this one so the two
   cannot drift.

   The rules the drafts follow:
   - Every kanji in every passage is one of his 200. Anything else is in kana,
     even where a textbook would use kanji (しゅうまつ, たいせつ, かんきょう).
   - Grammar is inside the prescribed list in the study design: plain and polite
     forms, て forms, たら/たり, PF patterns, the particles, と for if/when,
     stem+たい, こと/の, potential. No passive, no causative, no なら.
   - One passage per prescribed topic: three themes, three topics each, nine
     passages.
   - Every word with a kanji in it carries a reading and an English gloss, so a
     student can tap it. The glosses are drafts too.

   words: the key is the word exactly as it appears in a passage, so the app can
   find it by longest match and nothing has to be guessed at. Verbs are keyed on
   the form in the text and glossed in that form.

   asks: a is the right answer, opts are the wrong ones. The wrong answers are
   the misreadings the kanji invite — 十時発 read as an arrival, 午後 read as a
   morning — because that is what a reading question is for.

   One window. line, then pure JSON. No comments inside the object.      */

window.KANJI_YOMU = {
 "schema_version": 1,
 "status": "draft, live at Andrew's word, not yet checked by him line by line",
 "passages": [
  {
   "id": "mainichi",
   "theme": "The individual",
   "topic": "Personal identity and lifestyles",
   "ja": "わたしの毎日",
   "en": "My daily life",
   "text": [
    "私は十七才の高校生です。メルボルンの東にある町に住んでいます。",
    "毎朝六時半におきて、朝ご飯を食べてから、じてんしゃで駅まで行きます。",
    "学校は八時四十分に始まって、三時半に終わります。",
    "水曜日の午後はアルバイトがあるので、早く帰らなければなりません。",
    "夜は少し勉強してから、おんがくを聞きます。",
    "土曜日は家族と買い物に行ったり、友だちと会ったりします。",
    "いそがしいですが、楽しい生活です。"
   ],
   "asks": [
    {
     "q": "What time does school start?",
     "a": "8.40 am",
     "opts": [
      "6.30 am",
      "3.30 pm",
      "8.14 am"
     ]
    },
    {
     "q": "When does he have his part-time job?",
     "a": "Wednesday afternoon",
     "opts": [
      "Wednesday morning",
      "Saturday afternoon",
      "Every afternoon"
     ]
    },
    {
     "q": "What does he do on Saturdays?",
     "a": "Goes shopping with his family and meets friends",
     "opts": [
      "Studies and listens to music",
      "Works at his part-time job",
      "Rides to the station"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "kazoku",
   "theme": "The individual",
   "topic": "Relationships",
   "ja": "家族と犬",
   "en": "My family and our dog",
   "text": [
    "私の家族は五人です。父と母と兄と妹と私です。",
    "父は銀行で働いていて、母は小学校で英語を教えています。",
    "兄は大学生で、今はシドニーに住んでいるので、あまり会えません。",
    "妹は中学二年生で、馬が大好きです。",
    "うちには白い犬もいます。名前はユキです。",
    "毎晩、私が犬と外を歩きます。",
    "犬がいると、家の中が明るくなります。"
   ],
   "asks": [
    {
     "q": "Where does his mother work?",
     "a": "At a primary school",
     "opts": [
      "At a bank",
      "At a university",
      "At a high school"
     ]
    },
    {
     "q": "Why does he not see his older brother much?",
     "a": "His brother lives in Sydney",
     "opts": [
      "His brother works at a bank",
      "His brother is still at primary school",
      "His brother is busy with horses"
     ]
    },
    {
     "q": "Who walks the dog?",
     "a": "The writer",
     "opts": [
      "His father",
      "His younger sister",
      "His mother"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "shigoto",
   "theme": "The individual",
   "topic": "Aspirations, education and careers",
   "ja": "しょうらいの仕事",
   "en": "The job I want",
   "text": [
    "私は日本語を三年間勉強しています。",
    "漢字を書くのは少しむずかしいですが、読むのは楽しいです。",
    "しょうらい、日本の会社で働きたいと思っています。",
    "去年、学校の先生に「日本語で手紙が書きたいです」と言いました。",
    "先生は「毎日少しずつ新しい字をおぼえるといいですよ」と教えてくださいました。",
    "今は毎週、漢字のテストがあります。",
    "百点は一回だけでしたが、前より早く読めます。",
    "これからも毎日勉強するつもりです。"
   ],
   "asks": [
    {
     "q": "How long has he been studying Japanese?",
     "a": "Three years",
     "opts": [
      "Three months",
      "Since last year",
      "One week"
     ]
    },
    {
     "q": "What did he tell his teacher he wants to do?",
     "a": "Write letters in Japanese",
     "opts": [
      "Read Japanese newspapers",
      "Teach Japanese",
      "Work for a Japanese company"
     ]
    },
    {
     "q": "What was the teacher's advice?",
     "a": "Learn a few new characters every day",
     "opts": [
      "Sit the kanji test every week",
      "Write one hundred characters a day",
      "Read a little every morning"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "matsuri",
   "theme": "The Japanese-speaking communities",
   "topic": "The Japanese-speaking communities",
   "ja": "夏のおまつり",
   "en": "A summer festival",
   "text": [
    "日本の夏はとてもあついですが、おまつりが多いです。",
    "八月に、町の神社でおまつりがあります。",
    "人々はゆかたを着て、夜の道を歩きます。",
    "店がたくさん出て、やきそばやかきごおりを売っています。",
    "子どもたちは金魚をすくうゲームが大好きです。",
    "九時ごろ、花火が始まります。",
    "そらが赤や青や金色になって、みんなが上を見ます。"
   ],
   "asks": [
    {
     "q": "Where is the festival held?",
     "a": "At the town shrine",
     "opts": [
      "At a temple",
      "At the station",
      "At a shop"
     ]
    },
    {
     "q": "What are the shops selling?",
     "a": "Yakisoba and shaved ice",
     "opts": [
      "Goldfish",
      "Yukata",
      "Fish and meat"
     ]
    },
    {
     "q": "What happens at about nine o'clock?",
     "a": "The fireworks start",
     "opts": [
      "The shops open",
      "The festival finishes",
      "The children go home"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "yuumei",
   "theme": "The Japanese-speaking communities",
   "topic": "Significant people",
   "ja": "ゆうめいな人について",
   "en": "About a famous person",
   "text": [
    "学校で、ゆうめいな日本人について作文を書きました。",
    "私はイチローという人をえらびました。",
    "イチローさんは日本でやきゅうをしていましたが、そのあとアメリカのチームに入りました。",
    "日本でもアメリカでも、たくさんの人がイチローさんのしあいを見に行きました。",
    "本を三さつ読んで、ビデオも見ました。",
    "一番おもしろかったのは、小さい時から毎日れんしゅうをしたという話です。",
    "私も、好きなことをずっとしたいと思いました。"
   ],
   "asks": [
    {
     "q": "What did he write for school?",
     "a": "A composition about a famous Japanese person",
     "opts": [
      "A letter to a baseball player",
      "A story about his family",
      "A review of a video"
     ]
    },
    {
     "q": "What did Ichiro do after playing baseball in Japan?",
     "a": "He joined an American team",
     "opts": [
      "He taught baseball",
      "He went to watch games in America",
      "He wrote a book"
     ]
    },
    {
     "q": "What interested the writer most?",
     "a": "That Ichiro practised every day from when he was small",
     "opts": [
      "That his games are on video",
      "That many people watched him in Japan",
      "That he read three books about him"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "densha",
   "theme": "The Japanese-speaking communities",
   "topic": "Living in a Japanese community / visiting Japan",
   "ja": "電車に乗る",
   "en": "Taking the train",
   "text": [
    "去年の冬、家族と日本に行きました。",
    "東京駅はとても広くて、人が多かったです。",
    "きっぷを買う前に、駅の人に「京都に行きたいです」と言いました。",
    "その人は「十時発の電車に乗ってください」と教えてくれました。",
    "電車は時間どおりに出発して、二時間半で着きました。",
    "京都では、歩いてお寺や神社を見ました。",
    "夜は、小さいホテルに泊まりました。",
    "次の日も、電車で山の近くの町まで行きました。"
   ],
   "asks": [
    {
     "q": "When did the family go to Japan?",
     "a": "Last winter",
     "opts": [
      "Last summer",
      "This winter",
      "Next year"
     ]
    },
    {
     "q": "Which train did the station worker tell him to take?",
     "a": "The one leaving at ten",
     "opts": [
      "The one arriving at ten",
      "The one leaving at half past ten",
      "The one leaving at two"
     ]
    },
    {
     "q": "How long did the trip to Kyoto take?",
     "a": "Two and a half hours",
     "opts": [
      "Two hours",
      "Half an hour",
      "Ten hours"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "kankyou",
   "theme": "The world around us",
   "topic": "Global and contemporary society",
   "ja": "かんきょうのために",
   "en": "For the environment",
   "text": [
    "私の学校には、「みどりのクラブ」があります。",
    "毎週水曜日の昼休みに、みんなで学校の中や外をそうじします。",
    "先月は、花や木をうえました。",
    "水をたいせつに使うことも考えています。",
    "肉を食べる日を少なくすると、かんきょうにいいそうです。",
    "だから、今は毎週一日だけ、肉を食べない日を作っています。",
    "小さいことですが、一人一人がすると、大きくかわります。"
   ],
   "asks": [
    {
     "q": "When does the club meet?",
     "a": "Wednesday lunchtime",
     "opts": [
      "Wednesday after school",
      "Every lunchtime",
      "Saturday morning"
     ]
    },
    {
     "q": "What did the club do last month?",
     "a": "Planted flowers and trees",
     "opts": [
      "Cleaned inside the school",
      "Used less water",
      "Stopped eating meat"
     ]
    },
    {
     "q": "What does the club do once a week now?",
     "a": "Has one day with no meat",
     "opts": [
      "Eats meat only once",
      "Cleans outside the school",
      "Plants one tree"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "news",
   "theme": "The world around us",
   "topic": "Communication and media",
   "ja": "スマホと新聞",
   "en": "Phones and newspapers",
   "text": [
    "父は毎朝、新聞を読みます。「紙の方が目にいい」と言っています。",
    "私はスマホでニュースを見ます。",
    "朝ご飯を食べながら、五分ぐらい見ます。",
    "同じニュースでも、書き方がちがうと、思うことがちがいます。",
    "先生は「一つのニュースだけを読むのはよくないですよ」と言いました。",
    "だから、今は新聞もスマホも見ます。",
    "ニュースを二つ読むと、よく分かります。"
   ],
   "asks": [
    {
     "q": "Why does his father prefer paper?",
     "a": "He says it is better for your eyes",
     "opts": [
      "He says it is cheaper",
      "He says there are more stories",
      "He cannot use a phone"
     ]
    },
    {
     "q": "When does the writer read the news?",
     "a": "While eating breakfast",
     "opts": [
      "Before breakfast",
      "At lunchtime",
      "At night"
     ]
    },
    {
     "q": "What did the teacher say?",
     "a": "Reading only one report is not good",
     "opts": [
      "Phones are not good for the news",
      "Newspapers are better than phones",
      "Read the news twice a day"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "kuruma",
   "theme": "The world around us",
   "topic": "The influence of technology",
   "ja": "新しい車",
   "en": "New cars",
   "text": [
    "二十年前、車は電気で動きませんでした。",
    "今は、電気の自動車をたくさん売っています。",
    "日本でもオーストラリアでも、新しい車の店がふえています。",
    "おじいさんは「むかしの車の方がかんたんだった」と言いました。",
    "電気の車はしずかですが、長い道を行く時は、電気を入れる所がいります。",
    "人がうんてんしない車もできるかもしれないと思います。",
    "でも、近い所は歩く方がいいと思います。"
   ],
   "asks": [
    {
     "q": "What was different twenty years ago?",
     "a": "Cars did not run on electricity",
     "opts": [
      "Cars were cheaper",
      "There were more car shops",
      "Cars were quieter"
     ]
    },
    {
     "q": "What did his grandfather say?",
     "a": "Old cars were simpler",
     "opts": [
      "Old cars were faster",
      "New cars are quieter",
      "New cars are better"
     ]
    },
    {
     "q": "What does a long trip need?",
     "a": "Somewhere to put electricity in",
     "opts": [
      "A quieter car",
      "A wider road",
      "A driver"
     ]
    }
   ],
   "level": "core"
  },
  {
   "id": "arubaito",
   "theme": "The individual",
   "topic": "Aspirations, education and careers",
   "level": "stretch",
   "ja": "アルバイトとしょうらい",
   "en": "Casual work and the future",
   "text": [
    "高校生になってから、アルバイトを始める人が多くなりました。",
    "私の友だちは、土曜日の朝からお昼まで、近所のパン屋で働いています。",
    "お金のためだけではなく、社会のことを知るためにも、いい活動だと思います。",
    "でも、「長い時間働きすぎると、テストの点が下がる」と言う先生もいます。",
    "私は、一週間に十時間までならだいじょうぶだと思います。",
    "会社で働く前に、人と話すことがじょうずになるからです。",
    "しょうらい、どんな仕事をするか、まだ分かりません。",
    "でも、外国語を使う仕事がしたいと思っています。"
   ],
   "asks": [
    {
     "q": "When does the writer's friend work?",
     "a": "Saturday, from the morning until midday",
     "opts": [
      "Saturday afternoon",
      "Every morning before school",
      "Sunday, all day"
     ]
    },
    {
     "q": "What reason does the writer give for the job being good?",
     "a": "You learn about society, not just earn money",
     "opts": [
      "You earn more than at other shops",
      "You can work as long as you like",
      "It helps your test marks"
     ]
    },
    {
     "q": "What does the teacher warn about?",
     "a": "Working too long makes test marks drop",
     "opts": [
      "Working stops you meeting friends",
      "The pay at a bakery is poor",
      "Students should not work at all"
     ]
    }
   ]
  },
  {
   "id": "otoshiyori",
   "theme": "The world around us",
   "topic": "Global and contemporary society",
   "level": "stretch",
   "ja": "かわる家族",
   "en": "Families are changing",
   "text": [
    "日本では、子どもが少なくなっています。",
    "一人で住んでいるお年よりも多くなりました。",
    "私のホストファミリーのおばあさんは、八十才で、一人で住んでいます。",
    "毎週水曜日に、近所の人がご飯を持って来てくれるそうです。",
    "「人と話す日があると、元気になる」とおばあさんは言いました。",
    "オーストラリアでも同じです。",
    "お年よりが多くなると、だれが働いて、だれがお年よりを見るのか、よく考えなければなりません。",
    "私は、同じ町の中に、わかい人とお年よりが会う場所があるといいと思います。"
   ],
   "asks": [
    {
     "q": "What is happening to the number of children in Japan?",
     "a": "It is falling",
     "opts": [
      "It is rising",
      "It has not changed",
      "It rises in the cities only"
     ]
    },
    {
     "q": "What happens every Wednesday?",
     "a": "A neighbour brings her a meal",
     "opts": [
      "She goes to her family's house",
      "A nurse visits the house",
      "She cooks for the neighbours"
     ]
    },
    {
     "q": "What does the writer want in the town?",
     "a": "Somewhere young people and older people can meet",
     "opts": [
      "More houses for older people",
      "A hospital near the station",
      "Meals brought every day"
     ]
    }
   ]
  },
  {
   "id": "robot",
   "theme": "The world around us",
   "topic": "The influence of technology",
   "level": "stretch",
   "ja": "ロボットと仕事",
   "en": "Robots and work",
   "text": [
    "日本の会社では、ロボットを使う所がふえています。",
    "物を作るこうじょうでは、人よりロボットの方が早く、正しく動きます。",
    "病院でも、ロボットが食べ物やくすりを持って行くそうです。",
    "「仕事がなくなるかもしれない」としんぱいする人もいます。",
    "でも、新しい仕事も出て来ると思います。",
    "ロボットを作る人、動かす人、教える人がいります。",
    "大事なのは、学校で習うことが毎年かわるということです。",
    "一つの仕事を一生するより、新しいことを何回も習う方がよくなるでしょう。"
   ],
   "asks": [
    {
     "q": "Why do factories use robots?",
     "a": "They work faster and more accurately than people",
     "opts": [
      "They are cheaper to buy than tools",
      "They can be taught in one day",
      "They do not need electricity"
     ]
    },
    {
     "q": "What do robots do in hospitals?",
     "a": "Carry food and medicine",
     "opts": [
      "Talk to the patients",
      "Clean the rooms",
      "Drive the cars"
     ]
    },
    {
     "q": "What does the writer say matters most?",
     "a": "That what you learn at school changes every year",
     "opts": [
      "That robots will take every job",
      "That one job for life is best",
      "That hospitals need more people"
     ]
    }
   ]
  },
  {
   "id": "washoku",
   "theme": "The Japanese-speaking communities",
   "topic": "The Japanese-speaking communities",
   "level": "stretch",
   "ja": "和食とせかい",
   "en": "Japanese food and the world",
   "text": [
    "和食はせかいでも人気があります。",
    "和食は、魚ややさいを多く使います。",
    "一年の間に四回きせつがかわるので、その時に一番おいしい物を食べます。",
    "「しゅん」ということばがあります。",
    "お正月には、家族みんなで、朝から同じ物を食べます。",
    "外国から来た食べ物も、日本の中でかわりました。",
    "カレーやラーメンは、今では日本の食べ物だと言う人もいます。",
    "古い物と新しい物が同じ場所にあるのが、日本の食べ物のおもしろい所です。"
   ],
   "asks": [
    {
     "q": "What does 和食 use a lot of?",
     "a": "Fish and vegetables",
     "opts": [
      "Meat and rice",
      "Bread and milk",
      "Eggs and oil"
     ]
    },
    {
     "q": "What does しゅん refer to?",
     "a": "The season when a food tastes best",
     "opts": [
      "A New Year meal",
      "A kind of fish",
      "A way of cooking"
     ]
    },
    {
     "q": "What does the writer say about curry and ramen?",
     "a": "Some people now call them Japanese food",
     "opts": [
      "They are eaten only at New Year",
      "They are never eaten in Japan",
      "They taste better overseas"
     ]
    }
   ]
  },
  {
   "id": "kyoto3",
   "theme": "The Japanese-speaking communities",
   "topic": "Living in a Japanese community / visiting Japan",
   "level": "stretch",
   "ja": "京都で三泊",
   "en": "Three nights in Kyoto",
   "text": [
    "去年の秋、学校の旅行で京都に三泊しました。",
    "朝早く、しんかんせんに乗って、二時間半で京都駅に着きました。",
    "きっぷは出発の一か月前に買わなければなりません。",
    "ホテルは駅の近くでしたが、少し高かったので、次の日は古い家に泊まりました。",
    "三日間で、お寺を五つと、神社を二つ見ました。",
    "一番よかったのは、朝六時に、人の少ない道を歩いた時です。",
    "昼は店が多くて、人も多すぎて、ゆっくり見ることができませんでした。",
    "次に行く時は、同じ所に一週間いたいと思います。"
   ],
   "asks": [
    {
     "q": "When must the tickets be bought?",
     "a": "A month before departure",
     "opts": [
      "A week before departure",
      "On the day",
      "Three days before"
     ]
    },
    {
     "q": "Why did they move after the first night?",
     "a": "The hotel was a little expensive",
     "opts": [
      "The hotel was too far from the station",
      "The hotel was full",
      "They wanted to be near the temples"
     ]
    },
    {
     "q": "What did the writer like best?",
     "a": "Walking the quiet streets at six in the morning",
     "opts": [
      "The shops at midday",
      "The ride on the fast train",
      "The seven temples and shrines"
     ]
    }
   ]
  },
  {
   "id": "kokoku",
   "theme": "The world around us",
   "topic": "Communication and media",
   "level": "stretch",
   "ja": "ネットのこうこく",
   "en": "Advertisements online",
   "text": [
    "今、新聞を買う人は少なくなりました。",
    "多くの人が、スマホでニュースを読みます。",
    "ニュースの間に、買い物のこうこくが出て来ます。",
    "自分が見た物と同じ物のこうこくが、何回も出て来るので、少しこわいです。",
    "「どうして分かるの」と思う人も多いでしょう。",
    "これは、どのページを見たかがお店に分かるからだそうです。",
    "友だちに会わないで、一日中スマホで話す日もあります。",
    "でも、ほんとうに大事な話は、会って話す方がいいと思います。"
   ],
   "asks": [
    {
     "q": "What appears between the news stories?",
     "a": "Shopping advertisements",
     "opts": [
      "Photographs of friends",
      "Other newspapers",
      "School notices"
     ]
    },
    {
     "q": "Why does the writer find it a little frightening?",
     "a": "The same thing they looked at is advertised again and again",
     "opts": [
      "The news is often wrong",
      "The phone costs too much",
      "Friends can see what they read"
     ]
    },
    {
     "q": "What does the writer say about important conversations?",
     "a": "They are better had face to face",
     "opts": [
      "They should be written down",
      "They are easier on a phone",
      "They should happen in the morning"
     ]
    }
   ]
  }
 ],
 "words": {
  "私": {
   "y": "わたし",
   "en": "I, me"
  },
  "十七才": {
   "y": "じゅうななさい",
   "en": "seventeen years old"
  },
  "高校生": {
   "y": "こうこうせい",
   "en": "high school student"
  },
  "東": {
   "y": "ひがし",
   "en": "east"
  },
  "町": {
   "y": "まち",
   "en": "town"
  },
  "住んでいます": {
   "y": "すんでいます",
   "en": "live (in)"
  },
  "住んでいる": {
   "y": "すんでいる",
   "en": "lives (in)"
  },
  "毎朝": {
   "y": "まいあさ",
   "en": "every morning"
  },
  "六時半": {
   "y": "ろくじはん",
   "en": "half past six"
  },
  "朝ご飯": {
   "y": "あさごはん",
   "en": "breakfast"
  },
  "食べて": {
   "y": "たべて",
   "en": "eat, and then"
  },
  "食べる": {
   "y": "たべる",
   "en": "eat"
  },
  "食べながら": {
   "y": "たべながら",
   "en": "while eating"
  },
  "食べない": {
   "y": "たべない",
   "en": "do not eat"
  },
  "駅": {
   "y": "えき",
   "en": "station"
  },
  "行きます": {
   "y": "いきます",
   "en": "go"
  },
  "行きました": {
   "y": "いきました",
   "en": "went"
  },
  "行きたいです": {
   "y": "いきたいです",
   "en": "want to go"
  },
  "行ったり": {
   "y": "いったり",
   "en": "go, among other things"
  },
  "行く": {
   "y": "いく",
   "en": "go"
  },
  "学校": {
   "y": "がっこう",
   "en": "school"
  },
  "八時四十分": {
   "y": "はちじよんじゅっぷん",
   "en": "8.40"
  },
  "始まって": {
   "y": "はじまって",
   "en": "starts, and"
  },
  "始まります": {
   "y": "はじまります",
   "en": "start"
  },
  "三時半": {
   "y": "さんじはん",
   "en": "half past three"
  },
  "終わります": {
   "y": "おわります",
   "en": "finish, end"
  },
  "水曜日": {
   "y": "すいようび",
   "en": "Wednesday"
  },
  "午後": {
   "y": "ごご",
   "en": "afternoon"
  },
  "早く": {
   "y": "はやく",
   "en": "early, quickly"
  },
  "帰らなければなりません": {
   "y": "かえらなければなりません",
   "en": "have to go home"
  },
  "夜": {
   "y": "よる",
   "en": "night, evening"
  },
  "少し": {
   "y": "すこし",
   "en": "a little"
  },
  "少なく": {
   "y": "すくなく",
   "en": "fewer, less"
  },
  "勉強して": {
   "y": "べんきょうして",
   "en": "study, and then"
  },
  "勉強しています": {
   "y": "べんきょうしています",
   "en": "have been studying"
  },
  "勉強する": {
   "y": "べんきょうする",
   "en": "study"
  },
  "聞きます": {
   "y": "ききます",
   "en": "listen to"
  },
  "土曜日": {
   "y": "どようび",
   "en": "Saturday"
  },
  "家族": {
   "y": "かぞく",
   "en": "family"
  },
  "買い物": {
   "y": "かいもの",
   "en": "shopping"
  },
  "買う": {
   "y": "かう",
   "en": "buy"
  },
  "友だち": {
   "y": "ともだち",
   "en": "friend, friends"
  },
  "会ったり": {
   "y": "あったり",
   "en": "meet, among other things"
  },
  "会えません": {
   "y": "あえません",
   "en": "cannot meet"
  },
  "楽しい": {
   "y": "たのしい",
   "en": "enjoyable, fun"
  },
  "生活": {
   "y": "せいかつ",
   "en": "life, daily living"
  },
  "五人": {
   "y": "ごにん",
   "en": "five people"
  },
  "父": {
   "y": "ちち",
   "en": "my father"
  },
  "母": {
   "y": "はは",
   "en": "my mother"
  },
  "兄": {
   "y": "あに",
   "en": "my older brother"
  },
  "妹": {
   "y": "いもうと",
   "en": "my younger sister"
  },
  "銀行": {
   "y": "ぎんこう",
   "en": "bank"
  },
  "働いていて": {
   "y": "はたらいていて",
   "en": "works, and"
  },
  "働きたい": {
   "y": "はたらきたい",
   "en": "want to work"
  },
  "小学校": {
   "y": "しょうがっこう",
   "en": "primary school"
  },
  "英語": {
   "y": "えいご",
   "en": "English"
  },
  "教えています": {
   "y": "おしえています",
   "en": "teaches"
  },
  "教えてくださいました": {
   "y": "おしえてくださいました",
   "en": "kindly taught me"
  },
  "教えてくれました": {
   "y": "おしえてくれました",
   "en": "told me, taught me"
  },
  "大学生": {
   "y": "だいがくせい",
   "en": "university student"
  },
  "今": {
   "y": "いま",
   "en": "now"
  },
  "中学二年生": {
   "y": "ちゅうがくにねんせい",
   "en": "Year 8 student, second year of junior high"
  },
  "馬": {
   "y": "うま",
   "en": "horse"
  },
  "大好きです": {
   "y": "だいすきです",
   "en": "loves, likes a lot"
  },
  "白い": {
   "y": "しろい",
   "en": "white"
  },
  "犬": {
   "y": "いぬ",
   "en": "dog"
  },
  "名前": {
   "y": "なまえ",
   "en": "name"
  },
  "毎晩": {
   "y": "まいばん",
   "en": "every night"
  },
  "外": {
   "y": "そと",
   "en": "outside"
  },
  "歩きます": {
   "y": "あるきます",
   "en": "walk"
  },
  "歩いて": {
   "y": "あるいて",
   "en": "on foot, walking"
  },
  "歩く": {
   "y": "あるく",
   "en": "walk"
  },
  "家": {
   "y": "いえ",
   "en": "house, home"
  },
  "中": {
   "y": "なか",
   "en": "inside"
  },
  "明るく": {
   "y": "あかるく",
   "en": "bright, cheerful"
  },
  "日本語": {
   "y": "にほんご",
   "en": "Japanese (language)"
  },
  "三年間": {
   "y": "さんねんかん",
   "en": "for three years"
  },
  "漢字": {
   "y": "かんじ",
   "en": "kanji"
  },
  "書く": {
   "y": "かく",
   "en": "write"
  },
  "書きたいです": {
   "y": "かきたいです",
   "en": "want to write"
  },
  "書きました": {
   "y": "かきました",
   "en": "wrote"
  },
  "書き方": {
   "y": "かきかた",
   "en": "way of writing"
  },
  "読む": {
   "y": "よむ",
   "en": "read"
  },
  "読みます": {
   "y": "よみます",
   "en": "read"
  },
  "読んで": {
   "y": "よんで",
   "en": "read, and"
  },
  "読めます": {
   "y": "よめます",
   "en": "can read"
  },
  "日本": {
   "y": "にほん",
   "en": "Japan"
  },
  "日本人": {
   "y": "にほんじん",
   "en": "Japanese person"
  },
  "会社": {
   "y": "かいしゃ",
   "en": "company"
  },
  "思っています": {
   "y": "おもっています",
   "en": "am thinking"
  },
  "思います": {
   "y": "おもいます",
   "en": "think"
  },
  "思いました": {
   "y": "おもいました",
   "en": "thought"
  },
  "思う": {
   "y": "おもう",
   "en": "think"
  },
  "去年": {
   "y": "きょねん",
   "en": "last year"
  },
  "先生": {
   "y": "せんせい",
   "en": "teacher"
  },
  "手紙": {
   "y": "てがみ",
   "en": "letter"
  },
  "言いました": {
   "y": "いいました",
   "en": "said"
  },
  "言っています": {
   "y": "いっています",
   "en": "says"
  },
  "毎日": {
   "y": "まいにち",
   "en": "every day"
  },
  "新しい": {
   "y": "あたらしい",
   "en": "new"
  },
  "字": {
   "y": "じ",
   "en": "character, letter"
  },
  "毎週": {
   "y": "まいしゅう",
   "en": "every week"
  },
  "百点": {
   "y": "ひゃくてん",
   "en": "a hundred points, full marks"
  },
  "一回": {
   "y": "いっかい",
   "en": "once, one time"
  },
  "前": {
   "y": "まえ",
   "en": "before"
  },
  "夏": {
   "y": "なつ",
   "en": "summer"
  },
  "多いです": {
   "y": "おおいです",
   "en": "there are many"
  },
  "多かったです": {
   "y": "おおかったです",
   "en": "there were many"
  },
  "八月": {
   "y": "はちがつ",
   "en": "August"
  },
  "神社": {
   "y": "じんじゃ",
   "en": "shrine"
  },
  "人々": {
   "y": "ひとびと",
   "en": "people"
  },
  "着て": {
   "y": "きて",
   "en": "wear, and"
  },
  "着きました": {
   "y": "つきました",
   "en": "arrived"
  },
  "道": {
   "y": "みち",
   "en": "road, street"
  },
  "店": {
   "y": "みせ",
   "en": "shop"
  },
  "出て": {
   "y": "でて",
   "en": "come out, and"
  },
  "売っています": {
   "y": "うっています",
   "en": "are selling"
  },
  "子ども": {
   "y": "こども",
   "en": "child"
  },
  "金魚": {
   "y": "きんぎょ",
   "en": "goldfish"
  },
  "九時": {
   "y": "くじ",
   "en": "nine o'clock"
  },
  "花火": {
   "y": "はなび",
   "en": "fireworks"
  },
  "赤": {
   "y": "あか",
   "en": "red"
  },
  "青": {
   "y": "あお",
   "en": "blue"
  },
  "金色": {
   "y": "きんいろ",
   "en": "gold, gold colour"
  },
  "上": {
   "y": "うえ",
   "en": "up, above"
  },
  "見ます": {
   "y": "みます",
   "en": "look at, watch"
  },
  "見ました": {
   "y": "みました",
   "en": "watched, saw"
  },
  "見に行きました": {
   "y": "みにいきました",
   "en": "went to watch"
  },
  "作文": {
   "y": "さくぶん",
   "en": "composition, essay"
  },
  "人": {
   "y": "ひと",
   "en": "person"
  },
  "入りました": {
   "y": "はいりました",
   "en": "joined, entered"
  },
  "入れる": {
   "y": "いれる",
   "en": "put in"
  },
  "本": {
   "y": "ほん",
   "en": "book"
  },
  "三さつ": {
   "y": "さんさつ",
   "en": "three (books)"
  },
  "一番": {
   "y": "いちばん",
   "en": "the most"
  },
  "小さい": {
   "y": "ちいさい",
   "en": "small, little"
  },
  "時": {
   "y": "とき",
   "en": "when, time"
  },
  "話": {
   "y": "はなし",
   "en": "story"
  },
  "好きな": {
   "y": "すきな",
   "en": "favourite, liked"
  },
  "冬": {
   "y": "ふゆ",
   "en": "winter"
  },
  "東京駅": {
   "y": "とうきょうえき",
   "en": "Tokyo Station"
  },
  "広くて": {
   "y": "ひろくて",
   "en": "spacious, and"
  },
  "京都": {
   "y": "きょうと",
   "en": "Kyoto"
  },
  "十時発": {
   "y": "じゅうじはつ",
   "en": "the ten o'clock departure"
  },
  "電車": {
   "y": "でんしゃ",
   "en": "train"
  },
  "乗って": {
   "y": "のって",
   "en": "get on, ride"
  },
  "時間": {
   "y": "じかん",
   "en": "time"
  },
  "出発して": {
   "y": "しゅっぱつして",
   "en": "departs, and"
  },
  "二時間半": {
   "y": "にじかんはん",
   "en": "two and a half hours"
  },
  "寺": {
   "y": "てら",
   "en": "temple"
  },
  "泊まりました": {
   "y": "とまりました",
   "en": "stayed overnight"
  },
  "次の日": {
   "y": "つぎのひ",
   "en": "the next day"
  },
  "山": {
   "y": "やま",
   "en": "mountain"
  },
  "近く": {
   "y": "ちかく",
   "en": "near, nearby"
  },
  "近い": {
   "y": "ちかい",
   "en": "close, near"
  },
  "昼休み": {
   "y": "ひるやすみ",
   "en": "lunch break"
  },
  "先月": {
   "y": "せんげつ",
   "en": "last month"
  },
  "花": {
   "y": "はな",
   "en": "flower"
  },
  "木": {
   "y": "き",
   "en": "tree"
  },
  "水": {
   "y": "みず",
   "en": "water"
  },
  "使う": {
   "y": "つかう",
   "en": "use"
  },
  "考えています": {
   "y": "かんがえています",
   "en": "are thinking about"
  },
  "肉": {
   "y": "にく",
   "en": "meat"
  },
  "日": {
   "y": "ひ",
   "en": "day"
  },
  "一日": {
   "y": "いちにち",
   "en": "one day"
  },
  "作っています": {
   "y": "つくっています",
   "en": "am making"
  },
  "一人一人": {
   "y": "ひとりひとり",
   "en": "each person"
  },
  "大きく": {
   "y": "おおきく",
   "en": "greatly, in a big way"
  },
  "新聞": {
   "y": "しんぶん",
   "en": "newspaper"
  },
  "紙": {
   "y": "かみ",
   "en": "paper"
  },
  "方": {
   "y": "ほう",
   "en": "the one, the side (in comparisons)"
  },
  "目": {
   "y": "め",
   "en": "eyes"
  },
  "五分": {
   "y": "ごふん",
   "en": "five minutes"
  },
  "同じ": {
   "y": "おなじ",
   "en": "the same"
  },
  "一つ": {
   "y": "ひとつ",
   "en": "one"
  },
  "二つ": {
   "y": "ふたつ",
   "en": "two"
  },
  "分かります": {
   "y": "わかります",
   "en": "understand"
  },
  "二十年前": {
   "y": "にじゅうねんまえ",
   "en": "twenty years ago"
  },
  "車": {
   "y": "くるま",
   "en": "car"
  },
  "電気": {
   "y": "でんき",
   "en": "electricity"
  },
  "動きませんでした": {
   "y": "うごきませんでした",
   "en": "did not run, did not move"
  },
  "自動車": {
   "y": "じどうしゃ",
   "en": "car, motor vehicle"
  },
  "長い": {
   "y": "ながい",
   "en": "long"
  },
  "所": {
   "y": "ところ",
   "en": "place"
  },
  "始める": {
   "y": "はじめる",
   "en": "to start something"
  },
  "多く": {
   "y": "おおく",
   "en": "many, a lot of"
  },
  "多い": {
   "y": "おおい",
   "en": "many"
  },
  "多くて": {
   "y": "おおくて",
   "en": "there are many, and"
  },
  "多すぎて": {
   "y": "おおすぎて",
   "en": "too many"
  },
  "朝": {
   "y": "あさ",
   "en": "morning"
  },
  "お昼": {
   "y": "おひる",
   "en": "midday, lunchtime"
  },
  "近所": {
   "y": "きんじょ",
   "en": "the neighbourhood"
  },
  "パン屋": {
   "y": "パンや",
   "en": "a bakery"
  },
  "働いています": {
   "y": "はたらいています",
   "en": "works"
  },
  "働いて": {
   "y": "はたらいて",
   "en": "works, and"
  },
  "働く": {
   "y": "はたらく",
   "en": "to work"
  },
  "働きすぎる": {
   "y": "はたらきすぎる",
   "en": "to work too much"
  },
  "お金": {
   "y": "おかね",
   "en": "money"
  },
  "社会": {
   "y": "しゃかい",
   "en": "society"
  },
  "知る": {
   "y": "しる",
   "en": "to know"
  },
  "活動": {
   "y": "かつどう",
   "en": "an activity"
  },
  "点": {
   "y": "てん",
   "en": "a mark, a point"
  },
  "下がる": {
   "y": "さがる",
   "en": "to drop, to go down"
  },
  "言う": {
   "y": "いう",
   "en": "to say"
  },
  "一週間": {
   "y": "いっしゅうかん",
   "en": "one week"
  },
  "十時間": {
   "y": "じゅうじかん",
   "en": "ten hours"
  },
  "仕事": {
   "y": "しごと",
   "en": "work, a job"
  },
  "分かりません": {
   "y": "わかりません",
   "en": "do not know"
  },
  "分かる": {
   "y": "わかる",
   "en": "to understand, to know"
  },
  "外国語": {
   "y": "がいこくご",
   "en": "a foreign language"
  },
  "外国": {
   "y": "がいこく",
   "en": "a foreign country"
  },
  "一人": {
   "y": "ひとり",
   "en": "one person, alone"
  },
  "お年より": {
   "y": "おとしより",
   "en": "an older person"
  },
  "八十才": {
   "y": "はちじゅっさい",
   "en": "eighty years old"
  },
  "持って来て": {
   "y": "もってきて",
   "en": "brings it, and"
  },
  "持って行く": {
   "y": "もっていく",
   "en": "to take it to"
  },
  "考えなければなりません": {
   "y": "かんがえなければなりません",
   "en": "have to think about"
  },
  "見る": {
   "y": "みる",
   "en": "to see, to look after"
  },
  "会う": {
   "y": "あう",
   "en": "to meet"
  },
  "会って": {
   "y": "あって",
   "en": "meet, and"
  },
  "会わないで": {
   "y": "あわないで",
   "en": "without meeting"
  },
  "場所": {
   "y": "ばしょ",
   "en": "a place"
  },
  "元気": {
   "y": "げんき",
   "en": "well, full of energy"
  },
  "ご飯": {
   "y": "ごはん",
   "en": "a meal, rice"
  },
  "物": {
   "y": "もの",
   "en": "a thing"
  },
  "作る": {
   "y": "つくる",
   "en": "to make"
  },
  "人気": {
   "y": "にんき",
   "en": "popularity"
  },
  "正しく": {
   "y": "ただしく",
   "en": "correctly"
  },
  "動きます": {
   "y": "うごきます",
   "en": "move"
  },
  "動かす": {
   "y": "うごかす",
   "en": "to operate, to work something"
  },
  "病院": {
   "y": "びょういん",
   "en": "hospital"
  },
  "食べ物": {
   "y": "たべもの",
   "en": "food"
  },
  "食べます": {
   "y": "たべます",
   "en": "eat"
  },
  "出て来る": {
   "y": "でてくる",
   "en": "to appear, to come along"
  },
  "出て来ます": {
   "y": "でてきます",
   "en": "appear"
  },
  "教える": {
   "y": "おしえる",
   "en": "to teach"
  },
  "大事な": {
   "y": "だいじな",
   "en": "important"
  },
  "習う": {
   "y": "ならう",
   "en": "to learn"
  },
  "毎年": {
   "y": "まいとし",
   "en": "every year"
  },
  "一生": {
   "y": "いっしょう",
   "en": "your whole life"
  },
  "何回": {
   "y": "なんかい",
   "en": "how many times, many times"
  },
  "和食": {
   "y": "わしょく",
   "en": "Japanese food"
  },
  "魚": {
   "y": "さかな",
   "en": "fish"
  },
  "使います": {
   "y": "つかいます",
   "en": "use"
  },
  "一年": {
   "y": "いちねん",
   "en": "one year"
  },
  "間": {
   "y": "あいだ",
   "en": "during, between"
  },
  "四回": {
   "y": "よんかい",
   "en": "four times"
  },
  "お正月": {
   "y": "おしょうがつ",
   "en": "New Year"
  },
  "来た": {
   "y": "きた",
   "en": "came"
  },
  "古い": {
   "y": "ふるい",
   "en": "old"
  },
  "秋": {
   "y": "あき",
   "en": "autumn"
  },
  "旅行": {
   "y": "りょこう",
   "en": "a trip"
  },
  "三泊": {
   "y": "さんぱく",
   "en": "three nights"
  },
  "出発": {
   "y": "しゅっぱつ",
   "en": "departure"
  },
  "一か月": {
   "y": "いっかげつ",
   "en": "one month"
  },
  "買わなければなりません": {
   "y": "かわなければなりません",
   "en": "have to buy"
  },
  "高かった": {
   "y": "たかかった",
   "en": "was expensive"
  },
  "三日間": {
   "y": "みっかかん",
   "en": "for three days"
  },
  "五つ": {
   "y": "いつつ",
   "en": "five"
  },
  "六時": {
   "y": "ろくじ",
   "en": "six o'clock"
  },
  "少ない": {
   "y": "すくない",
   "en": "few"
  },
  "歩いた": {
   "y": "あるいた",
   "en": "walked"
  },
  "昼": {
   "y": "ひる",
   "en": "midday"
  },
  "次に": {
   "y": "つぎに",
   "en": "next"
  },
  "自分": {
   "y": "じぶん",
   "en": "yourself, oneself"
  },
  "見た": {
   "y": "みた",
   "en": "looked at"
  },
  "話す": {
   "y": "はなす",
   "en": "to speak"
  }
 }
};
