/* data/grammar.js — the Grammar summary out of Andrew's Head Start booklet.
   ---------------------------------------------------------------------------
   Straight out of "Headstart Booklet 2023 Year 10 into Unit 1,2.docx", which
   is in this repo: 65 patterns in the seven groups he has them in, each with
   his meaning, his example and his English. NOTHING HERE IS INVENTED and
   nothing is reworded. Where a line reads oddly it reads that way in the
   booklet.

   The booklet's last group, Other patterns, is shaped differently from the
   six before it: the left column carries a heading and an explanation
   rather than a pattern, and the right column carries more than one
   example. Those entries keep their note and their several examples; the
   rest have one example each.

   The booklet's own tick columns are Understand and Use, in that order, and
   the app keeps both. Andrew, 2026-11-23, asked for both: they are different
   things and the gap between them is the useful part.

   One window. line, then pure JSON. No comments inside the object.       */

window.SHINDAN_GRAMMAR = {
 "schema_version": 1,
 "source": "Headstart Booklet 2023 Year 10 into Unit 1,2.docx, in this repo. Transcribed from its Grammar summary tables; nothing is added or reworded.",
 "groups": [
  {
   "id": "te",
   "en": "Verb て-form",
   "items": [
    {
     "id": "te1",
     "p": "～ています",
     "mean": "action in progress",
     "egs": [
      {
       "ja": "今、手紙を書いています。",
       "en": "I am writing a letter now."
      }
     ]
    },
    {
     "id": "te2",
     "p": "～てください",
     "mean": "please ～",
     "egs": [
      {
       "ja": "日本語で話して下さい。",
       "en": "Please speak in Japanese."
      }
     ]
    },
    {
     "id": "te3",
     "p": "～てもいいです",
     "mean": "permission",
     "egs": [
      {
       "ja": "テレビを見てもいいです。",
       "en": "You may watch TV."
      }
     ]
    },
    {
     "id": "te4",
     "p": "～てはいけません",
     "mean": "prohibition",
     "egs": [
      {
       "ja": "ペンで書いてはいけません。",
       "en": "You must not write with a pen."
      }
     ]
    },
    {
     "id": "te5",
     "p": "～てみます",
     "mean": "try to ～",
     "egs": [
      {
       "ja": "おはしを使ってみます。",
       "en": "I will try to use chopsticks."
      }
     ]
    },
    {
     "id": "te6",
     "p": "～てあげます",
     "mean": "do a favour for someone",
     "egs": [
      {
       "ja": "漢字を教えてあげます。",
       "en": "I will teach you kanji (as a favour)."
      }
     ]
    },
    {
     "id": "te7",
     "p": "～てくれます",
     "mean": "someone does a favour for me",
     "egs": [
      {
       "ja": "母は私の話を聞いてくれます。",
       "en": "Mum listens to what I say (as a favour)."
      }
     ]
    },
    {
     "id": "te8",
     "p": "～てもらいます",
     "mean": "get someone to do something",
     "egs": [
      {
       "ja": "私は友達に漢字を教えてもらいます。",
       "en": "I get my friend to teach me kanji (as a favour)."
      }
     ]
    },
    {
     "id": "te9",
     "p": "～て、＋て",
     "mean": "list activities sequentially",
     "egs": [
      {
       "ja": "家に帰って、晩ご飯を食べます。",
       "en": "I will go home and eat dinner."
      }
     ]
    },
    {
     "id": "te10",
     "p": "～てしまいます",
     "mean": "finish ～ing completely",
     "egs": [
      {
       "ja": "ケーキを食べてしまいました。",
       "en": "I finished eating the cake."
      }
     ]
    },
    {
     "id": "te11",
     "p": "～てから",
     "mean": "after ～ing",
     "egs": [
      {
       "ja": "ご飯を食べてから、出かけます。",
       "en": "I will go out after eating a meal."
      }
     ]
    },
    {
     "id": "te12",
     "p": "～ても",
     "mean": "even if",
     "egs": [
      {
       "ja": "雨がふっても、さんぽに行きます。",
       "en": "I go for a walk even if it rains."
      }
     ]
    }
   ]
  },
  {
   "id": "stem",
   "en": "Verb stem (stem of ます verb)",
   "items": [
    {
     "id": "stem1",
     "p": "～たいです",
     "mean": "want to ～",
     "egs": [
      {
       "ja": "つめたい水を飲みたいです。",
       "en": "I want to drink cold water."
      }
     ]
    },
    {
     "id": "stem2",
     "p": "～そうです",
     "mean": "it seems to ～ / it looks like ～",
     "egs": [
      {
       "ja": "今晩さむくなりそうです。",
       "en": "It looks like it's going to be cold tonight."
      }
     ]
    },
    {
     "id": "stem3",
     "p": "～すぎます",
     "mean": "～ too much",
     "egs": [
      {
       "ja": "妹はゲームをしすぎます。",
       "en": "My younger sister plays games too much."
      }
     ]
    },
    {
     "id": "stem4",
     "p": "～たがります",
     "mean": "eager to ～ (do not use for 1st person)",
     "egs": [
      {
       "ja": "弟はアニメを見たがります。",
       "en": "My younger brother is eager to watch anime."
      }
     ]
    },
    {
     "id": "stem5",
     "p": "～かた",
     "mean": "how to ～",
     "egs": [
      {
       "ja": "すしの作り方を習いました。",
       "en": "I learned how to make sushi."
      }
     ]
    },
    {
     "id": "stem6",
     "p": "～ながら、",
     "mean": "while ～ing",
     "egs": [
      {
       "ja": "ラジオを聞きながら、しゅくだいをします。",
       "en": "I do homework while listening to the radio."
      }
     ]
    },
    {
     "id": "stem7",
     "p": "～に行きます",
     "mean": "go somewhere to ～",
     "egs": [
      {
       "ja": "町へえいがを見に行きました。",
       "en": "I went to the city to see a movie."
      }
     ]
    },
    {
     "id": "stem8",
     "p": "～やすいです",
     "mean": "easy to ～",
     "egs": [
      {
       "ja": "このペンは使いやすいです。",
       "en": "This pen is easy to use."
      }
     ]
    },
    {
     "id": "stem9",
     "p": "～にくいです",
     "mean": "hard to ～",
     "egs": [
      {
       "ja": "この本は読みにくいです。",
       "en": "This book is hard to read."
      }
     ]
    }
   ]
  },
  {
   "id": "dict",
   "en": "Verb plain present affirmative form (verb dictionary form)",
   "items": [
    {
     "id": "dict1",
     "p": "～ことができます",
     "mean": "can do",
     "egs": [
      {
       "ja": "父はピアノをひくことができます。",
       "en": "Dad can play the piano."
      }
     ]
    },
    {
     "id": "dict2",
     "p": "～ことが上手です／とくいです",
     "mean": "be good at ～ing",
     "egs": [
      {
       "ja": "姉はテニスをすることが上手です。",
       "en": "My older sister is good at playing tennis."
      }
     ]
    },
    {
     "id": "dict3",
     "p": "～ことが下手です／にがてです",
     "mean": "be poor at ～ing",
     "egs": [
      {
       "ja": "私はダンスをすることが下手です。",
       "en": "I am poor at dancing."
      }
     ]
    },
    {
     "id": "dict4",
     "p": "～ことが好きです",
     "mean": "like ～ing",
     "egs": [
      {
       "ja": "友達は話すことが好きです。",
       "en": "My friend likes talking."
      }
     ]
    },
    {
     "id": "dict5",
     "p": "～ことがきらいです",
     "mean": "dislike ～ing",
     "egs": [
      {
       "ja": "弟はしゅくだいをすることがきらいです。",
       "en": "My younger brother dislikes doing his homework."
      }
     ]
    },
    {
     "id": "dict6",
     "p": "～つもりです",
     "mean": "intend to ～",
     "egs": [
      {
       "ja": "来年日本へ行くつもりです。",
       "en": "I intend to go to Japan next year."
      }
     ]
    },
    {
     "id": "dict7",
     "p": "～ために、",
     "mean": "in order to ～",
     "egs": [
      {
       "ja": "車を買うために、お金をためます。",
       "en": "I will save money to buy a car."
      }
     ]
    },
    {
     "id": "dict8",
     "p": "～ように、",
     "mean": "so that one can ～",
     "egs": [
      {
       "ja": "家族と食べることができるように、てんぷらを作りました。",
       "en": "I made tempura so that I can eat them with my family."
      }
     ]
    },
    {
     "id": "dict9",
     "p": "～ようになります",
     "mean": "start ～ing",
     "egs": [
      {
       "ja": "赤ちゃんは歩くようになりました。",
       "en": "The baby started to walk."
      }
     ]
    },
    {
     "id": "dict10",
     "p": "～ことにしました／きめました",
     "mean": "decided to ～",
     "egs": [
      {
       "ja": "大学で勉強することにしました。",
       "en": "I decided to study at university."
      }
     ]
    },
    {
     "id": "dict11",
     "p": "～と、～",
     "mean": "if, when",
     "egs": [
      {
       "ja": "このくすりを飲むと、よくなります。",
       "en": "I will get better if I take this medicine."
      }
     ]
    },
    {
     "id": "dict12",
     "p": "～前に、",
     "mean": "before ～",
     "egs": [
      {
       "ja": "日本へ行く前に、日本語を勉強しました。",
       "en": "I studied Japanese before I went to Japan."
      }
     ]
    },
    {
     "id": "dict13",
     "p": "～べきです",
     "mean": "should / ought to ～",
     "egs": [
      {
       "ja": "しけんのために勉強するべきです。",
       "en": "I should study for the exam."
      }
     ]
    }
   ]
  },
  {
   "id": "nai",
   "en": "Verb plain present negative form",
   "items": [
    {
     "id": "nai1",
     "p": "～ないほうがいいです",
     "mean": "had better not ～",
     "egs": [
      {
       "ja": "海に行かないほうがいいです。",
       "en": "You had better not go to the beach."
      }
     ]
    },
    {
     "id": "nai2",
     "p": "～なければなりません",
     "mean": "have to / must ～",
     "egs": [
      {
       "ja": "せいふくを着なければなりません。",
       "en": "You have to wear the uniform."
      }
     ]
    },
    {
     "id": "nai3",
     "p": "～なくてもいいです",
     "mean": "do not have to ～",
     "egs": [
      {
       "ja": "くつをぬがなくてもいいです。",
       "en": "You do not have to take off your shoes."
      }
     ]
    },
    {
     "id": "nai4",
     "p": "～ないでください",
     "mean": "please do not ～",
     "egs": [
      {
       "ja": "ここにすわらないでください。",
       "en": "Please do not sit here."
      }
     ]
    },
    {
     "id": "nai5",
     "p": "～ないことにしました",
     "mean": "decided not to ～",
     "egs": [
      {
       "ja": "今 行かないことにしました。",
       "en": "I have decided not to go now."
      }
     ]
    }
   ]
  },
  {
   "id": "ta",
   "en": "Verb plain past affirmative form (た-form)",
   "items": [
    {
     "id": "ta1",
     "p": "～ほうがいいです",
     "mean": "had better ～",
     "egs": [
      {
       "ja": "学校に行ったほうがいいです。",
       "en": "You had better go to school."
      }
     ]
    },
    {
     "id": "ta2",
     "p": "～ことがあります",
     "mean": "have ～ (experience)",
     "egs": [
      {
       "ja": "外国に行ったことがありますか。",
       "en": "Have you ever been to foreign countries?"
      }
     ]
    },
    {
     "id": "ta3",
     "p": "～たり、～たりします",
     "mean": "do two or more activities in no particular order",
     "egs": [
      {
       "ja": "日曜日にアルバイトをしたり、サッカーをしたりします。",
       "en": "On Sunday, I work part-time, play soccer, etc."
      }
     ]
    },
    {
     "id": "ta4",
     "p": "～後（あと）で",
     "mean": "after ～",
     "egs": [
      {
       "ja": "アルバイトをした後で、友達に会います。",
       "en": "I will meet a friend after I work my part-time job."
      }
     ]
    },
    {
     "id": "ta5",
     "p": "～たら",
     "mean": "if / when",
     "egs": [
      {
       "ja": "秋になったら、すずしくなります。",
       "en": "When autumn comes, it becomes cool."
      }
     ]
    }
   ]
  },
  {
   "id": "plain",
   "en": "All plain forms (verb, adjective, noun)",
   "items": [
    {
     "id": "plain1",
     "p": "～と思います",
     "mean": "think that ～",
     "egs": [
      {
       "ja": "そのえいがは おもしろかったと思います。",
       "en": "I think that the movie was interesting."
      }
     ]
    },
    {
     "id": "plain2",
     "p": "～と言います",
     "mean": "say that ～",
     "egs": [
      {
       "ja": "母は 今日おそく帰ると言いました。",
       "en": "Mum said that she would come home late."
      }
     ]
    },
    {
     "id": "plain3",
     "p": "～ので、",
     "mean": "because ～ (for な-adjective and noun, use なので)",
     "egs": [
      {
       "ja": "バスがべんりなので、よくバスに乗ります。",
       "en": "Because buses are convenient, I often ride them."
      }
     ]
    },
    {
     "id": "plain4",
     "p": "～から、",
     "mean": "because ～ (use です・ます form as well)",
     "egs": [
      {
       "ja": "はやく歩いたから（or 歩きましたから）、電車にまにあいました。",
       "en": "Because I walked fast, I was able to catch the train."
      }
     ]
    },
    {
     "id": "plain5",
     "p": "～のに、",
     "mean": "even though ～ (for な-adjective and noun, use なのに)",
     "egs": [
      {
       "ja": "朝ご飯を食べたのに、もうおなかがすきました。",
       "en": "Even though I ate breakfast, I am already hungry."
      }
     ]
    },
    {
     "id": "plain6",
     "p": "…によると、～そうです",
     "mean": "according to …, it seems ～",
     "egs": [
      {
       "ja": "天気よほうによると、あしたははれるそうです。",
       "en": "According to the weather forecast, it will clear up tomorrow."
      }
     ]
    },
    {
     "id": "plain7",
     "p": "～でしょう",
     "mean": "probably ～",
     "egs": [
      {
       "ja": "ガソリンのねだんはまた上がるでしょう。",
       "en": "Petrol prices will probably go up again."
      }
     ]
    },
    {
     "id": "plain8",
     "p": "～かもしれません",
     "mean": "may ～",
     "egs": [
      {
       "ja": "友達は来ないかもしれません。",
       "en": "The friend may not come."
      }
     ]
    },
    {
     "id": "plain9",
     "p": "～はずです",
     "mean": "should ～ / I expect that ～",
     "egs": [
      {
       "ja": "今日 私の友達が 来るはずです。",
       "en": "I expect that my friend will come today."
      }
     ]
    },
    {
     "id": "plain10",
     "p": "～時に",
     "mean": "when ～",
     "egs": [
      {
       "ja": "日本へ行った時に、ペンフレンドに会いました。",
       "en": "When I went to Japan, I met my pen friend."
      }
     ]
    },
    {
     "id": "plain11",
     "p": "～からです",
     "mean": "it is because ～",
     "egs": [
      {
       "ja": "しけんがよくできました。たくさん勉強したからです。",
       "en": "I did very well in the exam. It is because I studied a lot."
      }
     ]
    },
    {
     "id": "plain12",
     "p": "～間に",
     "mean": "while ～",
     "egs": [
      {
       "ja": "家族が出かけている間に、家にどろぼうが入りました。",
       "en": "While the family were out, a robber broke into our house."
      }
     ]
    }
   ]
  },
  {
   "id": "other",
   "en": "Other patterns",
   "items": [
    {
     "id": "other1",
     "p": "～の／こと",
     "mean": "",
     "egs": [
      {
       "ja": "道子さんが日本に帰ったことを知りませんでした。",
       "en": "I did not know that Michiko returned to Japan."
      },
      {
       "ja": "アマンダさんが学校を出るのを見ました。",
       "en": "I saw Amanda leaving school."
      }
     ],
     "note": "Phrases made from sentences ending with a verb, adjective or noun だ／じゃない／だった／じゃなかった. Verbs such as 見る, 聞く and かんじる take only の."
    },
    {
     "id": "other2",
     "p": "～ば if ～",
     "mean": "",
     "egs": [
      {
       "ja": "学校へ行けば、友達に会うことができます。",
       "en": "I can meet my friends if I go to school."
      }
     ],
     "note": "All verbs change -u to -e: 買えば, 書けば, 話せば, 立てば, あそべば, 読めば, はしれば, 教えれば, 来（く）れば, すれば"
    },
    {
     "id": "other3",
     "p": "Relative clause (modifier)",
     "mean": "",
     "egs": [
      {
       "ja": "家族はきのう私がやいたケーキを食べました。",
       "en": "The family ate the cake I baked yesterday."
      }
     ],
     "note": "Phrases with a plain-form verb, adjective or noun だ／じゃない／だった／じゃなかった describe a noun."
    },
    {
     "id": "other4",
     "p": "Embedded questions",
     "mean": "",
     "egs": [
      {
       "ja": "週末（まつ）に何をするか 私達は まだ分かりません。",
       "en": "We do not know yet what we are going to do on the weekend."
      },
      {
       "ja": "友達は私が日本へ行くかどうかまだ知りません。",
       "en": "My friend does not know yet whether I will go to Japan or not."
      }
     ],
     "note": "Sentences that have a question inside them. With question words: …か; without question words: …かどうか"
    },
    {
     "id": "other5",
     "p": "Comparison: two items",
     "mean": "",
     "egs": [
      {
       "ja": "ふじ山とコジオスコ山ではどちらのほうが高いですか。",
       "en": "Which is taller, Mt Fuji or Mt Kosciuszko?"
      },
      {
       "ja": "ふじ山のほうがコジオスコ山より高いです。",
       "en": "Mt Fuji is taller than Mt Kosciuszko."
      }
     ],
     "note": "A と B では どちらのほうが adjective ですか。 (Which is more adjective, A or B?) A のほうが B より adjective です。 (A is more adjective than B.)"
    },
    {
     "id": "other6",
     "p": "Comparison: three or more items",
     "mean": "",
     "egs": [
      {
       "ja": "シドニーとメルボルンとブリスベンではどのまちが一番大きいですか。",
       "en": "Which city is biggest, Sydney, Melbourne or Brisbane?"
      },
      {
       "ja": "シドニーが一番大きいです。",
       "en": "Sydney is biggest."
      }
     ],
     "note": "A と B と C ではどれが一番 adjective ですか。 (Which is most adjective, out of A, B or C?) A が一番 adjective です。 (A is most adjective.)"
    },
    {
     "id": "other7",
     "p": "Comparison: equal / not as",
     "mean": "",
     "egs": [
      {
       "ja": "このドレスはそのドレスと同じぐらいきれいです。",
       "en": "This dress is as pretty as that dress."
      },
      {
       "ja": "私はスーさんほどせが高くないです。",
       "en": "I am not as tall as Sue."
      }
     ],
     "note": "A は B と同じぐらい adjective です。 (A is as adjective as B.) A は B ほど adjective (negative form)。 (A is not as adjective as B.)"
    },
    {
     "id": "other8",
     "p": "Verb potential form",
     "mean": "",
     "egs": [
      {
       "ja": "漢字が読めます。",
       "en": "I can read kanji."
      },
      {
       "ja": "私ははやくはしれません。",
       "en": "I cannot run fast."
      }
     ],
     "note": "can, be able to ～ Group 1: 買える, 書ける, 話せる, 立てる, あそべる, 飲める, はしれる Group 2: 食べられる, ねられる Group 3: 来（こ）られる, できる"
    },
    {
     "id": "other9",
     "p": "Verb volitional form",
     "mean": "",
     "egs": [
      {
       "ja": "来年大学に行こうと思っています。",
       "en": "I am thinking of going to university next year."
      },
      {
       "ja": "今 秋子さんに電話しようとしています。",
       "en": "I am just about to ring Akiko now."
      }
     ],
     "note": "The plain forms of 行きましょう and 話しましょう are 行こう and 話そう. ～ようと思っています is more determined than ～たいと思っています."
    }
   ]
  }
 ]
};
