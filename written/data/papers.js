/* ============================================================================
   data/papers.js  —  window.HIKKI_PAPERS
   ----------------------------------------------------------------------------
   Practice exam results a student enters themselves, and the reading the app
   gives back.

   Three things live here.

   errors   What went wrong on a question, in a student's words. Andrew's own
            list, off the tracker he keeps: "Classify missed marks: vocabulary
            / missed detail / inference / question misunderstood."

   skills   What a question is asking a student to DO. Andrew: "the main
            feedback should include an analysis of what the question was
            asking the student to do and how they could score highly." Each
            skill carries both. The wording of each criterion is VCAA's, out
            of the study design and already in data/exam.js; the asks/high
            lines underneath are written for this app and are NOT quotations
            from any examiner's report.

   papers   One entry per real paper, with its questions.

            Every question carries its number and its marks, both read off
            the paper itself; a one-line paraphrase of what it asked, in
            this app's words; a line on how to score it, drawn from the
            examination report; and a short quotation from that report,
            which is the only part written by the assessors.

            The papers and reports are VCAA copyright. Nothing here
            reproduces an examination text, a full expected answer or a
            sample response: the quotations are short, attributed, and
            about what students did rather than about what the paper said.

            A paper is added only when its paper and its report are both
            in the repo. Nothing here is invented.

   Pure JSON after the single window. line.
   ========================================================================== */

window.HIKKI_PAPERS = {
  "schema_version": 1,
  "errors": [
    {
      "id": "vocab",
      "ja": "ことば",
      "en": "A word I did not know",
      "note": "The idea was there and the vocabulary was not."
    },
    {
      "id": "detail",
      "ja": "ききのがし",
      "en": "I missed a detail that was there",
      "note": "Said or written once, and not caught."
    },
    {
      "id": "infer",
      "ja": "すいそく",
      "en": "I did not work out what was implied",
      "note": "Nothing stated it; the answer had to be reasoned."
    },
    {
      "id": "misread",
      "ja": "しつもん",
      "en": "I misread what the question wanted",
      "note": "A good answer to a question nobody asked."
    },
    {
      "id": "vague",
      "ja": "ざっくり",
      "en": "My response was not specific enough",
      "note": "The right idea, too loosely put. A missing time, number, place or qualifier."
    },
    {
      "id": "expr",
      "ja": "ひょうげん",
      "en": "I understood it but my expression was wrong",
      "note": "The idea was right and the way it was put was not. Japanese or English."
    },
    {
      "id": "blank",
      "ja": "じかん",
      "en": "I ran out of time or left it blank",
      "note": "A mark that was never attempted."
    }
  ],
  "skills": [
    {
      "id": "gist",
      "en": "The general idea",
      "sections": [
        "s1a",
        "s2a"
      ],
      "criterion": "the capacity to understand and convey general aspects of texts",
      "asks": "Say what the text is mainly about, or why it was made.",
      "high": "Respond directly to the question. Avoid irrelevant information."
    },
    {
      "id": "detail",
      "en": "One specific piece of information",
      "sections": [
        "s1a",
        "s1b",
        "s2a"
      ],
      "criterion": "the capacity to understand and convey specific aspects of texts",
      "asks": "Find one stated fact and report it exactly.",
      "high": "Give the information itself. 3 marks equals 3 pieces of information."
    },
    {
      "id": "infer",
      "en": "Something the text implies",
      "sections": [
        "s1a",
        "s2a"
      ],
      "criterion": "the capacity to understand and convey general and specific aspects of texts",
      "asks": "Work out something the text does not say outright.",
      "high": "You need to provide evidence for an inferred point."
    },
    {
      "id": "gather",
      "en": "Information from more than one place",
      "sections": [
        "s2a"
      ],
      "criterion": "the capacity to understand and convey general and specific aspects of texts",
      "asks": "Pull together points that sit in different parts of the text, or in two texts.",
      "high": "Use every source the question names."
    },
    {
      "id": "convey_en",
      "en": "Saying it clearly in English",
      "sections": [
        "s1a",
        "s2a"
      ],
      "criterion": "the capacity to understand and convey general and specific aspects of texts",
      "asks": "Turn what you understood into an answer a marker can read.",
      "high": "Answer in full English sentences. Avoid copying Japanese words."
    },
    {
      "id": "convey_ja",
      "en": "Saying it accurately in Japanese",
      "sections": [
        "s1b",
        "s2b"
      ],
      "criterion": "the capacity to convey information and opinions accurately and appropriately",
      "asks": "Give the answer in Japanese that is both right and correct.",
      "high": "Write short sentences. Check your particles and verb endings."
    },
    {
      "id": "texttype",
      "en": "The text type asked for",
      "sections": [
        "s2b",
        "s3"
      ],
      "criterion": "the capacity to convey information and opinions accurately and appropriately",
      "asks": "Write the form named in the task, for the audience named in the task.",
      "high": "Use the opening and closing that text type needs. Write to the audience named."
    },
    {
      "id": "stimulus",
      "en": "Using what you were given",
      "sections": [
        "s2b"
      ],
      "criterion": "the capacity to understand general and specific aspects of texts",
      "asks": "Build the response out of the text and the picture in front of you.",
      "high": "Use both the text and the image. Reword them in your own Japanese."
    },
    {
      "id": "relevance",
      "en": "Answering the task that was set",
      "sections": [
        "s3"
      ],
      "criterion": "the capacity to demonstrate relevance, breadth and depth of content",
      "asks": "Address every part of the question you chose.",
      "high": "Underline the task before you start. Check each part at the end."
    },
    {
      "id": "depth",
      "en": "Developing the point",
      "sections": [
        "s3"
      ],
      "criterion": "the capacity to demonstrate relevance, breadth and depth of content",
      "asks": "Take an idea further than naming it.",
      "high": "Give a reason or an example for each point. Develop 3 points instead of listing 8."
    },
    {
      "id": "accuracy",
      "en": "Getting the ordinary things right",
      "sections": [
        "s1b",
        "s2b",
        "s3"
      ],
      "criterion": "the capacity to demonstrate accuracy, range and appropriateness of vocabulary and grammar",
      "asks": "Write Japanese that holds together.",
      "high": "Check your verb endings, adjective endings and particles."
    },
    {
      "id": "range",
      "en": "Showing what you can do",
      "sections": [
        "s3"
      ],
      "criterion": "the capacity to demonstrate accuracy, range and appropriateness of vocabulary and grammar",
      "asks": "Use more than one structure, and more than one way of joining ideas.",
      "high": "Vary your patterns and connectives. Write the kanji you know."
    }
  ],
  "papers": [
    {
      "year": 2025,
      "name": "2025 VCAA",
      "note": "Section 3 is one question of four. Add only the one you answered.",
      "source": "VCE Japanese Second Language written examination 2025 and its examination report, VCAA.",
      "choice": [
        "5",
        "6",
        "7",
        "8"
      ],
      "questions": [
        {
          "sec": "s1a",
          "q": "1a",
          "marks": 2,
          "skill": "detail",
          "asks": "Say when the walking group meets.",
          "high": "Give the day, the time and the season.",
          "report": "Some students omitted the reference to 'during the summer'. Although the meaning was generally understood, some may not have recognised that 'when' can relate to both specific and general time expressions."
        },
        {
          "sec": "s1a",
          "q": "1b",
          "marks": 2,
          "skill": "detail",
          "asks": "Say why walking at that time of day is better.",
          "high": "Translate 'not very hot' in full. 道 means streets.",
          "report": "Some students omitted the word 'very' in their responses. A number of students also confused 道 (streets) with 町 (town)."
        },
        {
          "sec": "s1a",
          "q": "1c",
          "marks": 3,
          "skill": "detail",
          "asks": "Outline the benefits of joining the group.",
          "high": "3 marks equals 3 benefits. Write 'places you have never been before' in full.",
          "report": "Most students handled this question well. However, some did not fully convey the idea of 'places you have never been before'."
        },
        {
          "sec": "s1a",
          "q": "1d",
          "marks": 3,
          "skill": "detail",
          "asks": "Say what advice is given to participants.",
          "high": "Translate 歩きやすいくつ as shoes that are easy to walk in.",
          "report": "Some students provided general responses such as 'comfortable shoes' or 'walking shoes' rather than directly conveying the meaning of 歩きやすいくつ."
        },
        {
          "sec": "s1b",
          "q": "2a",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Explain, in Japanese, why Hiroshi recommends the amusement park.",
          "high": "Use the expected kanji, including 安い. Join your reasons with し.",
          "report": "Students are reminded to use the expected kanji in Japanese responses."
        },
        {
          "sec": "s1b",
          "q": "2b",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese why the cycle monorail was fun.",
          "high": "Use はじめて for 'for the first time'. はじめに means 'first'.",
          "report": "A common error was confusing はじめて (for the first time) with はじめに (first), which led to inaccurate responses."
        },
        {
          "sec": "s1b",
          "q": "2c",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Describe in Japanese the safety measures on the cycle monorail.",
          "high": "Conjugate はしる correctly. Write しなければなりません and check the spelling.",
          "report": "A noticeable number had difficulty with the conjugated form of はしる (to run/move) and しなければならない (must wear), and spelling errors were common."
        },
        {
          "sec": "s1b",
          "q": "2d",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what else became a good memory for Hiroshi.",
          "high": "Keep と in 友だちと to show who he was with.",
          "report": "友だちと (with my friend) was often overlooked or an incorrect particle was used, which changed the intended meaning."
        },
        {
          "sec": "s2a",
          "q": "3a",
          "marks": 4,
          "skill": "gather",
          "asks": "Explain how living arrangements for elderly people have changed over fifty years.",
          "high": "Say what it was, then what it is now. Include the time expressions.",
          "report": "A number of responses did not include the required time markers, which made the contrast unclear."
        },
        {
          "sec": "s2a",
          "q": "3b",
          "marks": 4,
          "skill": "detail",
          "asks": "Explain the problems elderly people face living alone.",
          "high": "4 marks equals 4 problems. 病気 is illness, けが is injury, うんてん is driving.",
          "report": "Some students misread key terms such as 病気 (illness) or overlooked けが (injury), and some confused うんてん (driving) with うん動 (exercise)."
        },
        {
          "sec": "s2a",
          "q": "3c",
          "marks": 3,
          "skill": "detail",
          "asks": "Say why Miku decided to move into Take-san's house.",
          "high": "Say the room was cheap. Avoid 'it was cheap'.",
          "report": "There were responses that simply stated that 'it is cheap' without specifying へや (room)."
        },
        {
          "sec": "s2a",
          "q": "3d",
          "marks": 3,
          "skill": "detail",
          "asks": "Outline the difficulties Miku has living with an elderly person.",
          "high": "Write 'parties at night' in full.",
          "report": "Many responses lacked the level of detail required. Some students did not convey that both the waking and sleeping times were different, and 'at night' was omitted."
        },
        {
          "sec": "s2a",
          "q": "3e",
          "marks": 6,
          "skill": "gather",
          "asks": "Say what each generation has learnt from the other, using the article and the interview.",
          "high": "Put each point under the right person. Say who learnt what from whom.",
          "report": "Some responses showed confusion about who learnt what from whom, with certain details placed under the wrong section."
        },
        {
          "sec": "s2b",
          "q": "4",
          "marks": 15,
          "skill": "texttype",
          "asks": "Write a persuasive email to your teacher arguing for the wagashi workshop, using the blog post and the photograph.",
          "high": "Write to persuade your teacher. Use the photograph and reword the blog post.",
          "report": "Low-scoring responses tended to be more informative than persuasive ... showed limited understanding of the required content and often overlooked the image entirely ... included significant portions copied from the reading text without any modifications."
        },
        {
          "sec": "s3",
          "q": "5",
          "marks": 20,
          "skill": "relevance",
          "asks": "Write the script of an informative speech on how you used social media to promote your sports club.",
          "high": "Say what you did to promote the club. Give real examples.",
          "report": "Many responses tended to be general descriptions of social media ... High-scoring responses addressed the task directly, explaining what the media coordinator had actually done."
        },
        {
          "sec": "s3",
          "q": "6",
          "marks": 20,
          "skill": "depth",
          "asks": "Write a journal entry on the skills you learnt in a part-time job and how they will help you.",
          "high": "Name a skill, give an example, say where it will help you next.",
          "report": "Some responses described the workplace or the job itself ... High-scoring responses identified skills gained from part-time work, supported by relevant examples ... explained how these skills would be transferable."
        },
        {
          "sec": "s3",
          "q": "7",
          "marks": 20,
          "skill": "depth",
          "asks": "Write a report evaluating the good and bad points of an airline's first flight.",
          "high": "Choose a few points and develop them. Write as a passenger on that flight.",
          "report": "High-scoring responses developed a balanced and well-reasoned assessment, selecting a few key aspects and exploring them in sufficient depth rather than listing multiple superficial ideas."
        },
        {
          "sec": "s3",
          "q": "8",
          "marks": 20,
          "skill": "texttype",
          "asks": "Write an imaginative story for children about the surprise you had.",
          "high": "Give your story a setting, an event and an ending.",
          "report": "Responses often read more as an explanatory sequence of actions than as an engaging children's story."
        }
      ]
    },
    {
      "year": 2024,
      "name": "2024 VCAA",
      "note": "Section 3 is one question of four. Add only the one you answered.",
      "source": "VCE Japanese Second Language written examination 2024 and its examination report, VCAA.",
      "choice": [
        "5",
        "6",
        "7",
        "8"
      ],
      "questions": [
        {
          "sec": "s1a",
          "q": "1a",
          "marks": 1,
          "skill": "detail",
          "asks": "Say when the photograph was taken.",
          "high": "Include 'last'. Write 'last Christmas'.",
          "report": "Although most responses demonstrated a good understanding of this question, some were missing 'last year'."
        },
        {
          "sec": "s1a",
          "q": "1b",
          "marks": 2,
          "skill": "detail",
          "asks": "Say where you would see illuminations in Japan.",
          "high": "Translate 人気がある as 'popular'. Keep 前で: in front of the stations.",
          "report": "人気がある (popular) was often misinterpreted as 'famous', and the omission of 前で (in front of) from 大きい駅の前で (in front of big stations) was common."
        },
        {
          "sec": "s1a",
          "q": "1c",
          "marks": 3,
          "skill": "detail",
          "asks": "Describe what Japanese illuminations are like.",
          "high": "Say the lights move with the music, like a concert.",
          "report": "Most responses demonstrated an understanding of the first point. However, very few accurately expressed how the moving lights and music work together to create a concert-like atmosphere."
        },
        {
          "sec": "s1a",
          "q": "1d",
          "marks": 2,
          "skill": "detail",
          "asks": "Say at what time of year illuminations can be seen.",
          "high": "Include 終わり and 始め, not only the months.",
          "report": "Most responses correctly identified the names of the months; however, some overlooked specific details such as 終わり (the end) and 始め (the start) and/or から〜まで (from - until)."
        },
        {
          "sec": "s1a",
          "q": "1e",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what kinds of illuminations can be seen in Australia.",
          "high": "Include かざる: the houses are decorated.",
          "report": "A considerable number of responses were missing the verb かざる (to decorate)."
        },
        {
          "sec": "s1b",
          "q": "2a",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what shogi is.",
          "high": "Spell ボード and ゲーム correctly. 二人でします says who plays.",
          "report": "Many responses did not spell the katakana words ボード (board) and ゲーム (game) correctly or grasp the precise meaning of the phrase 二人でします."
        },
        {
          "sec": "s1b",
          "q": "2b",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese when the club activity happens.",
          "high": "Write 午前 in kanji and include 昼.",
          "report": "Many missed either 午前 (am), 昼 (noon) or both entirely, while some confused 午前 (am) with 五時 (five o'clock). The frequent omission of kanji, particularly for 午前 (am)."
        },
        {
          "sec": "s1b",
          "q": "2c",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Say in Japanese what sort of people the club is looking for.",
          "high": "Treat 考えるゲーム as one thing: a thinking game.",
          "report": "Many responses did not demonstrate an accurate understanding of the relative clause 考えるゲーム (thinking game)."
        },
        {
          "sec": "s1b",
          "q": "2d",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Outline in Japanese the fun things at the shogi club.",
          "high": "Keep 日本の学校の in your answer.",
          "report": "Some responses did not include the specific details required to achieve full marks. Keywords such as 日本の (Japanese) or 日本の学校の (Japanese school) were often missing."
        },
        {
          "sec": "s2a",
          "q": "3a",
          "marks": 2,
          "skill": "detail",
          "asks": "Say when job hunting happens for Japanese university students.",
          "high": "Give both ends: third-year summer to fourth-year autumn.",
          "report": "Responses generally demonstrated a good understanding of this question."
        },
        {
          "sec": "s2a",
          "q": "3b",
          "marks": 3,
          "skill": "gather",
          "asks": "Explain how people get a job after the seminars.",
          "high": "Give the steps in order: 働きたい会社, then 会社が作ったしけん.",
          "report": "Students are reminded to listen and read carefully for specific details such as 働きたい会社 (the companies they would like to work for) and 会社が作ったしけん (an exam made by the company)."
        },
        {
          "sec": "s2a",
          "q": "3c",
          "marks": 3,
          "skill": "detail",
          "asks": "Describe the job-hunting manners and rules in Japan.",
          "high": "Say what リクルートスーツ is. Treat 〜だけでなく as adding a point.",
          "report": "Some responses did not determine what リクルートスーツ (recruit suits) referred to or correctly interpreted the grammatical pattern 〜だけでなく (not only)."
        },
        {
          "sec": "s2a",
          "q": "3d",
          "marks": 4,
          "skill": "detail",
          "asks": "Give four reasons Mr Honda finds job hunting challenging.",
          "high": "4 marks equals 4 reasons. Say which side is free and which is strict.",
          "report": "Responses that mentioned either or both of the last two points demonstrated some confusion between where job seekers have 'freedom' and what is considered 'too strict'."
        },
        {
          "sec": "s2a",
          "q": "3e",
          "marks": 4,
          "skill": "gather",
          "asks": "Explain the positive aspects of job hunting from the interview and the article.",
          "high": "Use both texts. 社会 means society, 会社 means a company.",
          "report": "A considerable number of responses confused the word 社会 (society) with 会社 (company), leading to the incorrect response 'to work at a company'."
        },
        {
          "sec": "s2a",
          "q": "3f",
          "marks": 4,
          "skill": "gather",
          "asks": "Say what should change to make job hunting more positive.",
          "high": "Take points from both the interview and the article.",
          "report": "Some did not include key points from the listening text or sufficient detail from the reading text."
        },
        {
          "sec": "s2b",
          "q": "4",
          "marks": 15,
          "skill": "texttype",
          "asks": "Write a personal journal entry reflecting on a wellness tourism experience, using the text and the photograph.",
          "high": "Reflect on the experience and say how it felt. Reword the text.",
          "report": "The writing style adopted tended to be more informative than reflective, lacking a personal tone ... independent wording is one of the key components of the assessment criteria that requires careful attention."
        },
        {
          "sec": "s3",
          "q": "5",
          "marks": 20,
          "skill": "relevance",
          "asks": "Write an evaluative essay on the pros and cons of teenagers going a week without technology.",
          "high": "Write about one week without technology, not technology in general.",
          "report": "Lower-scoring responses strayed from the task, focusing instead on the general advantages and disadvantages of technology."
        },
        {
          "sec": "s3",
          "q": "6",
          "marks": 20,
          "skill": "relevance",
          "asks": "Write a persuasive email urging a friend to join a beach clean-up next month.",
          "high": "Persuade your friend to join the clean-up next month.",
          "report": "Some responses deviated from the task by discussing environmental protection in general."
        },
        {
          "sec": "s3",
          "q": "7",
          "marks": 20,
          "skill": "texttype",
          "asks": "Write an informative speech on how Australian students celebrate their last day of Year 12.",
          "high": "Write a speech about the day itself.",
          "report": "Many responses did not demonstrate an understanding of the correct features of an informative speech."
        },
        {
          "sec": "s3",
          "q": "8",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an imaginative story for a children's magazine about adventures with a talking cat.",
          "high": "Change your character through the story, not only the events.",
          "report": "High-scoring responses featured a creative storyline and narrative arc, illustrating how the protagonist transformed throughout the story by facing various events and challenges."
        }
      ]
    },
    {
      "year": 2023,
      "name": "2023 VCAA",
      "note": "Section 3 is one question of four. Add only the one you answered.",
      "source": "VCE Japanese Second Language written examination 2023 and its examination report, VCAA.",
      "choice": [
        "5",
        "6",
        "7",
        "8"
      ],
      "questions": [
        {
          "sec": "s1a",
          "q": "1a",
          "marks": 1,
          "skill": "detail",
          "asks": "Say what makes the safari park famous.",
          "high": "Translate しぜんの中で as 'in nature'. Use 'various', not 'many'.",
          "report": "A considerable number were unable to accurately grasp the meaning of しぜんの中で (in nature). Students should also be aware of the difference between 'various' and 'many'."
        },
        {
          "sec": "s1a",
          "q": "1b",
          "marks": 3,
          "skill": "detail",
          "asks": "Say what three experiences the park offers that other zoos do not.",
          "high": "3 marks equals 3 experiences: feed monkeys, ride horses, learn at the corner.",
          "report": "Very few students were able to identify the first two points, 'feed monkeys' and 'ride horses in the woods'."
        },
        {
          "sec": "s1a",
          "q": "1c",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what the benefits are of catching the bus to the park.",
          "high": "Say the bus is 45 minutes faster than the train.",
          "report": "The common error was assuming that the bus took 45 minutes from Tokyo Station to the safari park, misunderstanding the comparison with the train."
        },
        {
          "sec": "s1a",
          "q": "1d",
          "marks": 4,
          "skill": "gather",
          "asks": "Complete a table of one speaker's concerns and the other's solutions.",
          "high": "Put each point in the right column. 一週間前に means one week in advance.",
          "report": "Some students struggled to grasp the accurate meaning of 一週間前に (one week in advance)."
        },
        {
          "sec": "s1b",
          "q": "2a",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Say in Japanese what homestay students are asked to do on entering the house.",
          "high": "Spell and conjugate ぬぐ and はく correctly.",
          "report": "Students struggled with the spelling and conjugation of the verbs ぬぐ (to take off) and はく (to put on)."
        },
        {
          "sec": "s1b",
          "q": "2b",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Explain in Japanese what the host family expects about meals.",
          "high": "Translate 好きな時に as 'whenever you like'. 外で changes the rule.",
          "report": "好きな時に (anytime you like) was often misunderstood as 好きな朝ご飯 (your favourite breakfast). Some students overlooked 外で (outside)."
        },
        {
          "sec": "s1b",
          "q": "2c",
          "marks": 4,
          "skill": "convey_ja",
          "asks": "Describe in Japanese the features of the Japanese-style room.",
          "high": "Say how the room changes use, as well as what is in it.",
          "report": "While most students were familiar with 生け花 (ikebana) and ふとん (futon)."
        },
        {
          "sec": "s2a",
          "q": "3a",
          "marks": 2,
          "skill": "detail",
          "asks": "Say why the town is famous as a zero-waste town.",
          "high": "Use 分ける, to separate, not 分かる. Include 以上.",
          "report": "Some common mistakes included confusing 分ける (to separate) with 分かる (to understand), struggling to read the kanji in 分け方 (how to separate) and overlooking the word 以上 (more than)."
        },
        {
          "sec": "s2a",
          "q": "3b",
          "marks": 3,
          "skill": "detail",
          "asks": "Say why the writer thinks the rubbish disposal there is troublesome.",
          "high": "Say who sorts the rubbish and into how many categories.",
          "report": "Although many students mentioned '45 categories' in their responses, they frequently omitted specific details."
        },
        {
          "sec": "s2a",
          "q": "3c",
          "marks": 3,
          "skill": "detail",
          "asks": "Explain what the cafe does to protect the environment.",
          "high": "Name all three: the coffee, the lunch and the place.",
          "report": "Students grasped the main idea quite well but often overlooked specific details such as 'coffee', 'lunch' or 'at the cafe', resulting in a loss of marks."
        },
        {
          "sec": "s2a",
          "q": "3d",
          "marks": 2,
          "skill": "detail",
          "asks": "Say why Asami felt sad after going to the beach.",
          "high": "Say which one was dirty. ビーチ means the beach, 海 means the sea.",
          "report": "Some students struggled with differentiating between ビーチ (beach) and 海 (sea) in determining whether it referred to the strip of sand or the water."
        },
        {
          "sec": "s2a",
          "q": "3e",
          "marks": 3,
          "skill": "detail",
          "asks": "Say why there is rubbish everywhere in Australia, according to Andrew.",
          "high": "Give all of Andrew's reasons, not only the bins.",
          "report": "While most students understood the first point about the lack of rubbish bins, providing an accurate level of detail from the listening text as required for this question, along with the complex grammatical structures used, posed difficulty."
        },
        {
          "sec": "s2a",
          "q": "3f",
          "marks": 3,
          "skill": "gather",
          "asks": "Say how people in both places keep their living spaces clean.",
          "high": "Take points from the diary and the conversation.",
          "report": "Students generally understood the last point about cleaning their school quite well; however, specific details in the text were missed."
        },
        {
          "sec": "s2a",
          "q": "3g",
          "marks": 4,
          "skill": "gather",
          "asks": "List the suggestions made in both the diary entry and the conversation.",
          "high": "4 marks equals 4 suggestions. Include the second-hand clothes.",
          "report": "'Sharing rides' and 'reducing the amount of rubbish' were the common points that students included correctly in their responses ... yet details about handing out free second-hand clothes were missed."
        },
        {
          "sec": "s2b",
          "q": "4",
          "marks": 15,
          "skill": "texttype",
          "asks": "Write about a kimono rental shop for the audience the task names, using the stimulus.",
          "high": "Write in the voice the task names, not a personal one.",
          "report": "Many responses had a tendency to be informative and lacked a personal tone. They primarily focused on relaying factual information."
        },
        {
          "sec": "s3",
          "q": "5",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an informative article for a Japanese school newsletter on sports Australian students coach, and the benefits.",
          "high": "Name the sports. Say what coaching teaches you.",
          "report": "Responses highlighted several prevalent sports such as AFL, netball, cricket, and soccer, and provided various examples of the advantages, including enhanced communication and leadership skills."
        },
        {
          "sec": "s3",
          "q": "6",
          "marks": 20,
          "skill": "relevance",
          "asks": "Write a persuasive speech to the school council for a Japanese culture festival.",
          "high": "Propose the festival. Say what students would do on the day.",
          "report": "Students who scored highly not only highlighted Japanese cultural practices and values, but also explored potential cultural activities accessible to all students in the school during the festival."
        },
        {
          "sec": "s3",
          "q": "7",
          "marks": 20,
          "skill": "texttype",
          "asks": "Write an evaluative letter to a Japanese friend on the good and bad of smartphone apps.",
          "high": "Write to your friend all the way through, not only in the greeting.",
          "report": "Many responses, despite a seemingly appropriate opening and closing in the letter format, were often written as an article rather than a letter addressed to their friend."
        },
        {
          "sec": "s3",
          "q": "8",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an imaginative story for a youth magazine about a Halloween encounter.",
          "high": "Set the scene, build the plot, reach a climax.",
          "report": "Students needed to use descriptive language to set the scene, develop the plot and bring the piece to a climax in an engaging and convincing narrative."
        }
      ]
    },
    {
      "year": 2022,
      "name": "2022 VCAA",
      "note": "Section 3 is one question of four. Add only the one you answered.",
      "source": "VCE Japanese Second Language written examination 2022 and its examination report, VCAA.",
      "choice": [
        "5",
        "6",
        "7",
        "8"
      ],
      "questions": [
        {
          "sec": "s1a",
          "q": "1a",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what the entry fee for the party is.",
          "high": "Give 500 yen as the fee. It replaces 800 yen.",
          "report": "Some misunderstood 500 yen as an additional cost rather than the discounted entry fee for cosplayers."
        },
        {
          "sec": "s1a",
          "q": "1b",
          "marks": 3,
          "skill": "detail",
          "asks": "Explain how one speaker's feelings about the party change.",
          "high": "Give the before and the after. はずかしい means embarrassed.",
          "report": "Students needed to convey the precise meaning of expressions such as はずかしい (embarrassed) and おもしろそう／楽しそう／よさそう (sounds interesting)."
        },
        {
          "sec": "s1a",
          "q": "1c",
          "marks": 3,
          "skill": "detail",
          "asks": "Say what the two speakers will do to prepare.",
          "high": "Use えらぶ, to choose. At a rental shop you choose, you do not buy.",
          "report": "The correct verbs were often missing from student responses as they did not distinguish えらぶ (to choose) and 買う (to buy) in the context of a rental shop."
        },
        {
          "sec": "s1a",
          "q": "1d",
          "marks": 2,
          "skill": "detail",
          "asks": "Say why overseas students go to this party each year.",
          "high": "Translate 高くなってきた as 'has been rising'.",
          "report": "Some responses did not recognise the grammatical patterns used in the second and third points: 高くなってきた (has become increasingly)."
        },
        {
          "sec": "s1b",
          "q": "2a",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese when the Night Bakery is open.",
          "high": "Give 10:30, not 11:00. Include 'three times a week'.",
          "report": "Many responses did not recognise 10:30, responding with 11:00 instead. 'Three times a week' was also not understood well."
        },
        {
          "sec": "s1b",
          "q": "2b",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Explain in Japanese how the bakery helps homeless and unemployed people.",
          "high": "Link the money to the work the bakery creates.",
          "report": "In the second point, students needed to link 'receiving money' to the work created for them by the Night Bakery."
        },
        {
          "sec": "s1b",
          "q": "2c",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what the good points are for customers.",
          "high": "Include both 行かなくてもいい and 安く.",
          "report": "Students needed to identify both points correctly, including 行かなくてもいい (don't have to go) and 安く (cheaply) and relate the first point to the second."
        },
        {
          "sec": "s1b",
          "q": "2d",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Explain in Japanese how the bakery addresses food waste.",
          "high": "パン屋 means bakeries. 夜のパン屋さん is the Night Bakery.",
          "report": "Many responses did not distinguish between パン屋 (bakeries in general) and 夜のパン屋さん (the Night Bakery), or understand 売れなかったパン (unsold bread)."
        },
        {
          "sec": "s1b",
          "q": "2e",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what the future plan is.",
          "high": "ふやす takes を. ふえる takes が.",
          "report": "Some responses did not recognise the correct use of particles with the transitive/intransitive verbs 〜をふやす／〜がふえる."
        },
        {
          "sec": "s2a",
          "q": "3a",
          "marks": 4,
          "skill": "detail",
          "asks": "Complete a table of examples from the reading text.",
          "high": "Give one example per cell, from the text.",
          "report": "An example of a correct response is: looking at the trees, listening to the sound of the forest, touching the trees, enjoying the smell of the forest."
        },
        {
          "sec": "s2a",
          "q": "3b",
          "marks": 4,
          "skill": "detail",
          "asks": "Say two ways the tour connects participants with something.",
          "high": "Write about connecting participants. Avoid the school lunch material.",
          "report": "Many students misinterpreted the question and responded instead with 'school lunch' and 'farm stay' mentioned in the text."
        },
        {
          "sec": "s2a",
          "q": "3c",
          "marks": 2,
          "skill": "infer",
          "asks": "Say what the aim of the tour is.",
          "high": "Say what the tour is for, not only what it is not.",
          "report": "Most students understood there was something more important than Disneyland and shopping but did not necessarily identify the aim of the Rural Experience Tour accurately."
        },
        {
          "sec": "s2a",
          "q": "3d",
          "marks": 4,
          "skill": "detail",
          "asks": "Give two unexpected things from the reading text.",
          "high": "Read 大都市 as one word: a big city.",
          "report": "Common errors included 大都市 (metropolis/big city) being misunderstood."
        },
        {
          "sec": "s2a",
          "q": "3e",
          "marks": 4,
          "skill": "gather",
          "asks": "Describe one participant's food-related experiences.",
          "high": "Use the image as well as the text.",
          "report": "An example of a correct response is: cooking with Japanese people / a food-related aspect taken from the image."
        },
        {
          "sec": "s2a",
          "q": "3f",
          "marks": 2,
          "skill": "detail",
          "asks": "Say how the farmhouse differed from expectations.",
          "high": "Describe the farmhouse. ハイテク means high-tech.",
          "report": "Many students wrote about helping with farm work from early in the morning rather than describing the farmhouse. Some students also did not recognise the word ハイテク (high-tech)."
        },
        {
          "sec": "s2b",
          "q": "4",
          "marks": 15,
          "skill": "texttype",
          "asks": "Write an email about trying a new e-sports cafe, using the stimulus text.",
          "high": "Reword the text in your own Japanese. Avoid copying it.",
          "report": "Students should be reminded that independent wording is another important aspect of the criteria. They need to develop skills to manipulate the language from the stimulus reading text to convey original meaning."
        },
        {
          "sec": "s3",
          "q": "5",
          "marks": 20,
          "skill": "relevance",
          "asks": "Write an evaluative speech on the benefits and challenges of studying languages at VCE.",
          "high": "Write about VCE language study, not languages in general.",
          "report": "Many responses did not address the question on two grounds - it was either that students wrote about foreign languages generally."
        },
        {
          "sec": "s3",
          "q": "6",
          "marks": 20,
          "skill": "depth",
          "asks": "Write a personal letter thanking a Japanese friend for their support.",
          "high": "Say what your friend did and what it meant to you.",
          "report": "Higher-scoring responses were able to include personal descriptions of how the Japanese friend helped and supported them, what it meant to them."
        },
        {
          "sec": "s3",
          "q": "7",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an informative article on the effects pets have on physical and mental health.",
          "high": "Cover the mental side as well as the physical.",
          "report": "Most students who chose this topic were able to discuss the physical benefits, such as regular opportunities to exercise outdoors."
        },
        {
          "sec": "s3",
          "q": "8",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an imaginative story based on an image, for a creative writing competition.",
          "high": "Start from the image. Set the scene, build the plot, reach a climax.",
          "report": "Students needed to use their inspiration from this image and use descriptive language to set the scene, develop the plot and bring the piece to a climax."
        }
      ]
    },
    {
      "year": 2021,
      "name": "2021 VCAA",
      "note": "Section 3 is one question of four. Add only the one you answered.",
      "source": "VCE Japanese Second Language written examination 2021 and its examination report, VCAA.",
      "choice": [
        "5",
        "6",
        "7",
        "8"
      ],
      "questions": [
        {
          "sec": "s1a",
          "q": "1a",
          "marks": 2,
          "skill": "detail",
          "asks": "Say how one speaker spends her Saturdays.",
          "high": "Give the times, am and noon. Say what she does in the afternoon.",
          "report": "Some lost marks for not including the times or details such as am and noon. A large number of students failed to mention what Emily does in the afternoon."
        },
        {
          "sec": "s1a",
          "q": "1b",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what he intended to do with his part-time earnings.",
          "high": "Write that he intended to. Check the tense.",
          "report": "They are advised to pay closer attention to the tense and intended meaning of the question."
        },
        {
          "sec": "s1a",
          "q": "1c",
          "marks": 4,
          "skill": "detail",
          "asks": "Explain why he stopped working at the convenience store.",
          "high": "4 marks equals 4 reasons. Write each one as a full reason.",
          "report": "Most students understood the gist of each point and the keywords, such as じゅく, クラブ活動, しゅくだい, ひまな時間, 時きゅう."
        },
        {
          "sec": "s1a",
          "q": "1d",
          "marks": 2,
          "skill": "detail",
          "asks": "Describe the interesting parts of his part-time work.",
          "high": "Keep the three adjectives together. They describe one thing.",
          "report": "Some students had trouble answering the second point accurately, as they appeared to be confused by the three adjectives they heard in the sentence."
        },
        {
          "sec": "s1b",
          "q": "2a",
          "marks": 1,
          "skill": "convey_ja",
          "asks": "Say in Japanese what the announcement is about.",
          "high": "Write one sentence. Check 使い方 and 安ぜん.",
          "report": "Most students handled this question well despite spelling errors with 使い方 (how to use) and 安ぜん (safe)."
        },
        {
          "sec": "s1b",
          "q": "2b",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese why students should not use computers during breaks.",
          "high": "Use 〜た方がいい.",
          "report": "Some students were not able to use 〜た方がいい (had better/it is better) correctly."
        },
        {
          "sec": "s1b",
          "q": "2c",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what a student must do if their computer breaks.",
          "high": "Use なおす, to repair. Say they pay with their own money.",
          "report": "Some students had trouble recognising the verb なおす (repair). In their attempt to deduce the meaning of this sentence from 自分のお金 (their own money), there were quite a few incorrect responses."
        },
        {
          "sec": "s1b",
          "q": "2d",
          "marks": 5,
          "skill": "convey_ja",
          "asks": "Give in Japanese the advice about social media and game sites.",
          "high": "5 marks equals 5 pieces of advice. Write the kanji you know.",
          "report": "Students are expected to include kanji in their responses where possible. Noticeably, many VCE kanji were not used at all or written incorrectly."
        },
        {
          "sec": "s2a",
          "q": "3a",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what a sakura zensen is.",
          "high": "Explain さくらぜんせん as a blossom front: a map of when they bloom.",
          "report": "Few students were able to identify the accurate meaning of さくらぜんせん (cherry blossom front)."
        },
        {
          "sec": "s2a",
          "q": "3b",
          "marks": 3,
          "skill": "detail",
          "asks": "Give the places and dates for seeing the blossoms.",
          "high": "Pair each place with its date.",
          "report": "Many students were unable to interpret the intended meaning of the question and did not include the date for each location in their response."
        },
        {
          "sec": "s2a",
          "q": "3c",
          "marks": 3,
          "skill": "detail",
          "asks": "Say why people rush to see the blossoms.",
          "high": "Say how short the season is: about a week.",
          "report": "Few students managed to achieve full marks as they missed specific details that were required."
        },
        {
          "sec": "s2a",
          "q": "3d",
          "marks": 2,
          "skill": "detail",
          "asks": "Explain how the park visitor describes his feelings.",
          "high": "Link the feeling to the warm weather and the blossom.",
          "report": "He feels happy as the weather gets warm in spring / when the cherry blossoms bloom."
        },
        {
          "sec": "s2a",
          "q": "3e",
          "marks": 3,
          "skill": "detail",
          "asks": "Say how the blossoms are described in the interview.",
          "high": "Translate うすい as pale, not thin.",
          "report": "A considerable number of students failed to interpret うすい (thin) in the context of the pale shade of pink and wrote 'thin pink' or 'thin and pink' instead."
        },
        {
          "sec": "s2a",
          "q": "3f",
          "marks": 7,
          "skill": "gather",
          "asks": "Draw on both the reading text and the interview.",
          "high": "7 marks equals 7 points. Take them from the reading and the interview.",
          "report": "Text 3A (Reading): It is part of Japanese culture. It enriches people's various memories ... There is a lot of literature on cherry blossoms since the Heian period 1200 years ago."
        },
        {
          "sec": "s2b",
          "q": "4",
          "marks": 15,
          "skill": "texttype",
          "asks": "Write about a school excursion to a judo dojo, using the text and the image.",
          "high": "Use the photo: the belts, the uniforms, the mats, the calligraphy.",
          "report": "Some examples of information from the visual text were children practising against adults, bowing, wearing judo uniform and the framed calligraphy on the wall."
        },
        {
          "sec": "s3",
          "q": "5",
          "marks": 20,
          "skill": "depth",
          "asks": "Write a persuasive speech on environmentally friendly ways to get to school.",
          "high": "Say why each way is better, not just name it.",
          "report": "Some common ideas were walking, riding a bicycle, using public transport and carpooling to reduce carbon emissions."
        },
        {
          "sec": "s3",
          "q": "6",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an informative essay on Japanese food and its health benefits.",
          "high": "Name real dishes and ingredients. Say why they are healthy.",
          "report": "Responses that scored highly described the conventional features or typical ingredients of Japanese food."
        },
        {
          "sec": "s3",
          "q": "7",
          "marks": 20,
          "skill": "range",
          "asks": "Write an evaluative newspaper article on the pros and cons of online shopping.",
          "high": "Vary your patterns and connectives.",
          "report": "While some responses lacked depth and breadth with a limited range of repetitious expressions."
        },
        {
          "sec": "s3",
          "q": "8",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an imaginative story for primary school children about the future.",
          "high": "Tell a story with events, not a description of the future.",
          "report": "While most responses lacked narrative qualities and resulted in becoming an explanatory list."
        }
      ]
    },
    {
      "year": 2020,
      "name": "2020 VCAA",
      "note": "Section 3 is one question of four. Add only the one you answered.",
      "source": "VCE Japanese Second Language written examination 2020 and its examination report, VCAA.",
      "choice": [
        "5",
        "6",
        "7",
        "8"
      ],
      "questions": [
        {
          "sec": "s1a",
          "q": "1a",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what ekiben are.",
          "high": "Explain bento as a boxed lunch. Say it is sold at stations.",
          "report": "The concept of 'bento' needs to be explained as boxed or packed lunch rather than 'lunchbox'. A considerable number of students could not identify the specific detail 駅で売っている (sold at train stations)."
        },
        {
          "sec": "s1a",
          "q": "1b",
          "marks": 1,
          "skill": "detail",
          "asks": "Say where people eat their ekiben.",
          "high": "Say where they eat them, not where they buy them.",
          "report": "Some students misinterpreted ほとんどの人は電車に乗る前に駅べんを買う (most people purchase ekiben before they board the train), leading to an incorrect answer."
        },
        {
          "sec": "s1a",
          "q": "1c",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what kind of ekiben you can buy at big stations.",
          "high": "Say the food is famous and unique to that town.",
          "report": "While most students were able to identify 'famous and unique', very few understood the whole phrase accurately."
        },
        {
          "sec": "s1a",
          "q": "1d",
          "marks": 3,
          "skill": "detail",
          "asks": "Give details of the speaker's recent trip.",
          "high": "Read 三回 as three times. Give the route, Tokyo to Osaka.",
          "report": "Many students misinterpreted 三回 (three times) and incorrectly answered 'bought/ate three ekiben'. Another misinterpretation was 'Osaka to Tokyo' for 東京から大さかまで."
        },
        {
          "sec": "s1a",
          "q": "1e",
          "marks": 2,
          "skill": "detail",
          "asks": "Say what the speaker asks listeners to do.",
          "high": "Say what to send and what about.",
          "report": "Most students understood that メール is referring to email."
        },
        {
          "sec": "s1b",
          "q": "2a",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what many people do at New Year.",
          "high": "Say they pray for a good year, not just that they go.",
          "report": "'Going to temples and shrines' was conveyed well, but many students were unable to express 'wish/pray for a good year' accurately."
        },
        {
          "sec": "s1b",
          "q": "2b",
          "marks": 1,
          "skill": "convey_ja",
          "asks": "Say in Japanese what percentage do hatsumode.",
          "high": "Include ぐらい. Write a full sentence.",
          "report": "A large number of responses did not include ぐらい and were not written in a complete sentence."
        },
        {
          "sec": "s1b",
          "q": "2c",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese how Shinto shrines can be told apart.",
          "high": "Spell とりい correctly. 神社 is a shrine, 神道 is the religion.",
          "report": "There was some confusion with 神道 and 神社, and the spelling of とりい."
        },
        {
          "sec": "s1b",
          "q": "2d",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Say in Japanese what she did for New Year.",
          "high": "3 marks equals 3 things. Check the long vowel in とりい.",
          "report": "Recognising the long vowel in とりい and similar words was a difficulty."
        },
        {
          "sec": "s1b",
          "q": "2e",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what she thinks of New Year's Day.",
          "high": "Give one view and say whose it is.",
          "report": "Although the first and second options are related in context, the focus differs slightly between them."
        },
        {
          "sec": "s2a",
          "q": "3a",
          "marks": 4,
          "skill": "gather",
          "asks": "Complete a table contrasting past and present, from both texts.",
          "high": "Check which text each half comes from.",
          "report": "From Text 3A (reading) participate in tours (with tour guides), famous towns; from Text 3B (listening) use the internet / YouTube to organise."
        },
        {
          "sec": "s2a",
          "q": "3b",
          "marks": 2,
          "skill": "detail",
          "asks": "Describe ways people share their travel, from the reading text.",
          "high": "Include the blogs and the videos.",
          "report": "People write reviews on their blogs and make videos for social media."
        },
        {
          "sec": "s2a",
          "q": "3c",
          "marks": 6,
          "skill": "gather",
          "asks": "Give what the speaker says about his hometown.",
          "high": "6 marks equals 6 points. Keep going past the first three.",
          "report": "Any six of the following: it is near/in high mountains, there are many hot springs, inconvenient because of lots of snow, famous for skiing."
        },
        {
          "sec": "s2a",
          "q": "3d",
          "marks": 8,
          "skill": "gather",
          "asks": "Give four details from the reading text.",
          "high": "Read the kanji: 花見, 書道, 着物, 道場.",
          "report": "Lack of cultural knowledge and ability to recognise kanji words such as 花見, 書道, 着物 and 道場 resulted in less successful responses."
        },
        {
          "sec": "s2b",
          "q": "4",
          "marks": 15,
          "skill": "texttype",
          "asks": "Write a persuasive email to a friend about attending a film festival, using the text.",
          "high": "Persuade your friend. Write about 300 ji.",
          "report": "The task set for Question 4 was a persuasive email to a friend, explaining why they should attend a film festival. Students were required to produce a response of approximately 300ji for the specified audience, purpose, style of writing and text type."
        },
        {
          "sec": "s3",
          "q": "5",
          "marks": 20,
          "skill": "depth",
          "asks": "Write a personal letter on summer activities your family can share with a visitor.",
          "high": "Name the activities and say what they are like.",
          "report": "Some common ideas were going to the beach, barbecues, camping."
        },
        {
          "sec": "s3",
          "q": "6",
          "marks": 20,
          "skill": "texttype",
          "asks": "Write an informative speech on balancing internet use with study.",
          "high": "Write a speech about balancing internet use with study.",
          "report": "This was another popular choice, but many students did not score well on this task ... a considerable number of students wrote a different text type."
        },
        {
          "sec": "s3",
          "q": "7",
          "marks": 20,
          "skill": "relevance",
          "asks": "Write an evaluative article on differences between festivals in Japan and Australia.",
          "high": "Write about the festival you went to.",
          "report": "While the question specifically states あなたが行ったおまつりで とてもちがうと思った事 (differences you noticed at the festival that you went to), many students wrote more generally."
        },
        {
          "sec": "s3",
          "q": "8",
          "marks": 20,
          "skill": "depth",
          "asks": "Write an imaginative story for young children about a deer in Nara.",
          "high": "Tell it as a story for young children.",
          "report": "Very few students attempted this task, but those who did generally managed to tell the story well with an engaging narrative."
        }
      ]
    }
  ]
};
