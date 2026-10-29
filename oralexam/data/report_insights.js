/* ============================================================================
   report_insights.js — what the assessors actually said, 2020 to 2025.
   ----------------------------------------------------------------------------
   Six VCE Japanese Second Language oral examination reports, one per year, plus
   the 2026 advice and the four sample examination video transcripts. Every
   observation below is taken from those files. Where a quotation is given it is
   verbatim.

   Nothing here is remembered or assumed. The only entries that are not lifted
   straight from a report carry "inferred": true, and say what they were
   inferred from.

   `themes` merges observations that recur across years and counts the years
   each one appears in, so the app can show a student which advice is given
   every single year rather than once.

   Pure JSON after the window line. tools/validate.js checks it.
   ========================================================================== */
window.ORAL_REPORTS = {
  "schema_version": 1,

  "sources": [
    { "year": 2020, "file": "2020JapaneseSL-oral-exam-report.docx", "title": "2020 VCE Japanese Second Language oral examination report" },
    { "year": 2021, "file": "2021JapaneseSL-oral-report.docx", "title": "2021 VCE Japanese Second Language oral external assessment report" },
    { "year": 2022, "file": "2022japaneseSL-oral-report.pdf", "title": "2022 VCE Japanese Second Language oral external assessment report" },
    { "year": 2023, "file": "2023japaneseSL-oral-report.docx", "title": "2023 VCE Japanese Second Language oral external assessment report" },
    { "year": 2024, "file": "2024japaneseSL-oral-report.docx", "title": "2024 VCE Japanese Second Language oral external assessment report" },
    { "year": 2025, "file": "2025-VCE-JapaneseSLOral-report.docx", "title": "2025 VCE Japanese Second Language oral external assessment report" }
  ],

  "reports": [
    {
      "year": 2020,
      "file": "2020JapaneseSL-oral-exam-report.docx",
      "high_scoring": [
        { "section": "conversation", "text": "Students who scored highly provided detailed information in their responses and included a range of grammatical constructs rather than one-sentence answers." },
        { "section": "discussion", "text": "Students who scored highly had prepared broadly, shared interesting content, thought about a variety of aspects and perspectives of their chosen subtopic, and gave their opinions. They were also able to respond to hypothetical questions." },
        { "section": "discussion", "text": "Some students were able to effectively integrate their chosen image to support their subtopic, rather than just describe the image." }
      ],
      "common_errors": [
        { "text": "Many students made a number of basic grammatical errors, such as incorrect verb tenses and adjective conjugations.", "error_ids": ["err-tense", "err-adj-conj"] },
        { "text": "Common grammatical mistakes included the use of ～と思います、～なければなりません、～たことがあります、～ので.", "error_ids": ["err-omou", "err-koto-ga-arimasu"] },
        { "text": "Some students did not understand vocabulary, including 困ったこと、がっき、きょく、海外旅行、読書.", "error_ids": ["err-vocab-gap"] },
        { "text": "The correct pronunciation of katakana words, such as オーストラリア, is important.", "error_ids": ["err-katakana"] },
        { "text": "Some students could not respond when asked about Japanese culture or how they felt learning kanji and vocabulary." }
      ],
      "advice": [
        "A number of students seemed to have memorised a script for both sections, and consequently found it difficult to answer questions that digressed from this.",
        "There is no set order of questions in each section, nor are there prescribed questions; the examination is designed to be an organic conversation, not a rehearsed dialogue.",
        "Students need to be familiar with a range of question words, including どうやって、どうして、なぜ、いつ、どこ、だれ、どのぐらい.",
        "Careful selection of a broad subtopic that will sustain the length of the discussion is imperative.",
        "Images that included rich information provided more opportunity for students to be able to offer a greater depth and range of information, ideas, opinions and reflections about the subtopic.",
        "Students are reminded that their chosen image should not be a collage and should only contain minimal writing, such as a heading or title."
      ],
      "example_questions": [
        { "ja": "どんなゆるキャラをメルボルンのためにデザインしますか。", "en": "What mascot character would you design for Melbourne?", "note": "Given in the report as an example of a hypothetical question asked in the Discussion." }
      ],
      "topics": [
        { "ja": "ゆるキャラ", "en": "mascot characters" },
        { "ja": "コンビニ", "en": "convenience stores" },
        { "ja": "高齢化社会", "en": "ageing society" },
        { "ja": "へんなホテル", "en": "weird hotels" },
        { "ja": "お弁当", "en": "boxed lunches" },
        { "ja": "給食", "en": "provided school lunches" },
        { "ja": "クラブ活動", "en": "club activities" },
        { "ja": "漫画喫茶", "en": "manga cafés" },
        { "ja": "自動販売機", "en": "vending machines" },
        { "ja": "ロボット", "en": "robots" }
      ]
    },

    {
      "year": 2021,
      "file": "2021JapaneseSL-oral-report.docx",
      "high_scoring": [
        { "section": "both", "text": "Students who demonstrated achievement of the assessment criteria to a high standard were able to provide relevant and detailed responses to the questions that were asked. They were able to engage in a natural conversation with assessors, responding with spontaneity and using repair strategies when required." },
        { "section": "discussion", "text": "Successful responses provided opinions and responded to hypothetical questions. Students chose an image that supported their subtopic and they referred to the image appropriately throughout the discussion, rather than simply describing it." }
      ],
      "common_errors": [
        { "text": "When responding to questions about family, students should respond using words such as 父、母 rather than お父さん、お母さん.", "error_ids": ["err-family-humble"] },
        { "text": "Errors in verb tenses, adjective agreements and particle use were also noted.", "error_ids": ["err-tense", "err-adj-conj", "err-particle"] },
        { "text": "Several students incorrectly used ～ことがあります. It should not be used with specific time words. 二年前に行ったことがあります is grammatically incorrect and the sentence should be 二年前に行きました.", "error_ids": ["err-koto-ga-arimasu"] },
        { "text": "Other vocabulary that students should revise includes つづけます、えらびます、兄弟、作家.", "error_ids": ["err-vocab-gap"] },
        { "text": "Some errors were made in long and short vowel sounds, for example 学校、旅行、いっしょ, and in the pronunciation of katakana words, for example オーストラリア、メルボルン and サッカー.", "error_ids": ["err-long-vowel", "err-katakana"] },
        { "text": "Students in the low bands needed to revise a range of question words including だれ、どんな、いつから、どうして／なぜ、どうやって、どのようにして and had difficulty completing their sentences.", "error_ids": ["err-question-words"] }
      ],
      "advice": [
        "Students may be asked a variety of questions of varying levels of difficulty. Questions may also be asked in a different order from the one that students anticipate.",
        "Assessors may interrupt students to ask questions during either section of the examination; this should be regarded as a normal process in a discussion.",
        "Assessors may also repeat or rephrase questions.",
        "It is understandable that students will memorise responses as they prepare for the examination, but these should be delivered in a natural way and not too quickly, as speaking fast can sound over-rehearsed and rote-learned.",
        "During the discussion, some students changed the subtopic quickly when they did not understand the question or had not prepared that particular aspect of the subtopic.",
        "Students are reminded that when preparing for the discussion, they should be able to explain any keywords associated with their subtopic.",
        "Students are reminded that it is not the image that is being assessed, it is the quality of the discussion."
      ],
      "example_questions": [],
      "topics": [
        { "ja": "おべんとう", "en": "boxed lunches" },
        { "ja": "キャラ弁", "en": "character boxed lunches" },
        { "ja": "へんなレストラン", "en": "weird restaurants" },
        { "ja": "ペットロボット", "en": "pet robots" },
        { "ja": "日本のおかし", "en": "Japanese sweets" },
        { "ja": "まんがのれきし", "en": "manga history" },
        { "ja": "高齢化社会", "en": "ageing society" },
        { "ja": "おぼんまつり", "en": "Obon festival" },
        { "ja": "お正月", "en": "New Year" },
        { "ja": "おせち", "en": "New Year foods" },
        { "ja": "給食", "en": "provided school lunches" },
        { "ja": "自動販売機", "en": "vending machines" },
        { "ja": "コンビニ", "en": "convenience stores" },
        { "ja": "ごみのもんだい", "en": "rubbish problems" },
        { "ja": "日本のアイドル", "en": "Japanese idols" },
        { "ja": "温泉", "en": "onsen" }
      ]
    },

    {
      "year": 2022,
      "file": "2022japaneseSL-oral-report.pdf",
      "high_scoring": [
        { "section": "conversation", "text": "Students who scored highly provided detailed responses and replied to the questions with two or three pieces of information rather than a one-sentence response." },
        { "section": "conversation", "text": "As well as providing general information, students who scored highly were able to share their opinions by using と思います and their reasons by using から or ので." },
        { "section": "conversation", "text": "Most students were able to self-correct when required. They asked for clarification and used Japanese fillers and repair strategies effectively and were therefore able to carry the conversation forward." },
        { "section": "discussion", "text": "Students who scored highly were able to talk about their chosen topic from multiple perspectives. They were able to define key words and terminology related to their topic, such as explaining what 給食 are." },
        { "section": "discussion", "text": "They were able to support and defend their opinions, provide thoughtful solutions to the problems they had identified, and make comparisons with Australia." },
        { "section": "discussion", "text": "Those who scored highly were able to speak with rehearsed spontaneity. They were able to engage in an organic conversation with the assessors rather than delivering monologue type responses." }
      ],
      "common_errors": [
        { "text": "Some errors were noted in the use of ～たり, 買えることができます instead of 買うことができます, omitting そうです when using によると.", "error_ids": ["err-tari", "err-koto-ga-dekimasu"] },
        { "text": "Students should listen carefully for the tense used in the question and respond accordingly. For example, they should use 二年前に行きました instead of 二年前に行きます.", "error_ids": ["err-tense"] },
        { "text": "Some errors were noted in basic adjective agreements, especially when using くて to join い adjectives, and the て form, for example 聞きて instead of 聞いて.", "error_ids": ["err-adj-conj", "err-te-form"] },
        { "text": "Some students did not understand more challenging question words or questions that required deeper thinking, such as 週に何回、何冊、おどろいたこと、びっくりしたこと and いやなこと.", "error_ids": ["err-question-words"] },
        { "text": "Some students misunderstood the question アルバイトのお金を何に使いたいですか, misinterpreting it as asking what the hourly rate was.", "error_ids": ["err-question-words"] },
        { "text": "Some errors were noted in the pronunciation of オーストラリア、クラシック and チーム.", "error_ids": ["err-katakana"] },
        { "text": "An area to focus on is the pronunciation of the long and short vowel sounds, for example 学校、旅行、いっしょ and オーストラリア.", "error_ids": ["err-long-vowel"] },
        { "text": "Some misunderstanding of vocabulary was noted in がっき、はいゆう and きょく.", "error_ids": ["err-vocab-gap"] }
      ],
      "advice": [
        "Students are reminded that they should prepare enough information to sustain the eight-minute discussion with the assessors.",
        "Students who did not prepare well and did not conduct enough research on their subtopic were unable to elaborate on their responses.",
        "The image students choose should be clear enough for the assessors to see.",
        "Students who scored well were able to bring their image into the discussion in a creative way, rather than just describe the image.",
        "Students were generally able to self-correct when required and used あいづち to maintain the flow of the discussion between the assessors."
      ],
      "example_questions": [
        { "ja": "しゅうに何回アルバイトをしますか。", "en": "How many times a week do you do your part-time job?", "note": "Named in the report as a question students found challenging." },
        { "ja": "アルバイトのお金を何に使いたいですか。", "en": "What do you want to use your part-time job money for?", "note": "Named in the report as a commonly misunderstood question." }
      ],
      "topics": [
        { "ja": "給食", "en": "school lunches" },
        { "ja": "コンビニ", "en": "convenience stores" },
        { "ja": "お正月", "en": "New Year" },
        { "ja": "おひとり様文化", "en": "solo culture" },
        { "ja": "ジブリ", "en": "Studio Ghibli" },
        { "ja": "まんが", "en": "manga" },
        { "ja": "部活", "en": "club activities" },
        { "ja": "駅弁", "en": "train station packed lunches" },
        { "ja": "自動販売機", "en": "vending machines" },
        { "ja": "高齢化社会", "en": "ageing population" }
      ]
    },

    {
      "year": 2023,
      "file": "2023japaneseSL-oral-report.docx",
      "high_scoring": [
        { "section": "conversation", "text": "Students who were well prepared provided a range of information and delivered their responses confidently. They accurately used a range of grammatical structures in their responses." },
        { "section": "conversation", "text": "Successful students were able to respond in depth and provide interesting information that led the conversation forward and enabled the assessors to ask follow-up questions." },
        { "section": "conversation", "text": "Generally, students correctly pronounced the long vowel sounds, for example 高校, and double consonants, for example 行った." },
        { "section": "discussion", "text": "Successful students were able to talk about their chosen subtopic in detail, supporting their information with their own opinions and evidence. They were also able to talk about the good and bad points, and make comparisons with Australia, providing depth to their responses rather than superficial information." },
        { "section": "discussion", "text": "A successful image told some sort of story and enabled students to elaborate on different aspects of the image, and allowed the assessors to ask follow-up questions." }
      ],
      "common_errors": [
        { "text": "Common errors included the use of ことができます, 将来に行きます instead of 将来行きます, おもしろいだと思います instead of おもしろいと思います, and linking adjectives 楽しいとおもしろい instead of 楽しくておもしろい.", "error_ids": ["err-koto-ga-dekimasu", "err-particle", "err-omou", "err-adj-conj"] },
        { "text": "Students need to use the correct vocabulary when talking about their family: 母、父、弟 rather than お母さん、お父さん、弟さん. Some students confused 弟さん with お父さん.", "error_ids": ["err-family-humble"] },
        { "text": "Some students misunderstood どんな、どの、どうやって、どうして and 兄弟がいますか。", "error_ids": ["err-question-words"] },
        { "text": "Students did not know じきゅう、がっき、うんてんめんきょ、なかがいい、せんしゅ、読書、作家、じゅぎょう and 強い.", "error_ids": ["err-vocab-gap"] },
        { "text": "Some students spoke in a very casual way, using language such as めっちゃ and 何だっけ, and plain-form sentence endings. Students should speak in the です・ます form throughout the examination.", "error_ids": ["err-register"] },
        { "text": "There were some errors in the pronunciation of katakana words, including オーストラリア.", "error_ids": ["err-katakana"] }
      ],
      "advice": [
        "Some students delivered what appeared to be pre-learned lengthy responses that were like mini speeches, instead of engaging in a natural and organic conversation with the assessors.",
        "Students need to listen carefully to the question and respond appropriately, and not deliver what appeared to be pre-learned responses to a question they have misunderstood.",
        "Students should be prepared to respond to a variety of question words in order to discuss their chosen subtopic from multiple perspectives. For example, they should be able to discuss what the subject of the topic is, when it started and how it has developed, where it occurs and why, who does it and why, and how many people do it.",
        "Students should move beyond providing simple responses, and develop their information, supporting their ideas with evidence, examples and opinions.",
        "Some students' images were too small or not printed clearly. It is important to prepare one clear image that is not a collage of pictures. A number of students prepared a collage or two contrasting images. These are not appropriate images for the examination.",
        "If talking about キャラ弁, students should know the word えいよう. Students should build their opinions on their chosen subtopic using a range of adjectives.",
        "An introduction is no longer required at the beginning of the Discussion section."
      ],
      "example_questions": [
        { "ja": "おどろいたことは何ですか。", "en": "What are the things that surprised you?", "note": "Named in the report as a question students answered well." },
        { "ja": "びっくりしたことは何ですか。", "en": "What are the things that surprised you?", "note": "Named in the report as a question students answered well." },
        { "ja": "こまったことは何ですか。", "en": "What are the things that troubled you?", "note": "Named in the report as a question students answered well." },
        { "ja": "兄弟がいますか。", "en": "Do you have siblings?", "note": "Named in the report as a commonly misunderstood question." }
      ],
      "topics": [
        { "ja": "アニメ", "en": "anime" },
        { "ja": "コスプレ", "en": "cosplay" },
        { "ja": "コンビニ", "en": "convenience stores" },
        { "ja": "自動販売機", "en": "vending machines" },
        { "ja": "和食", "en": "Japanese food" },
        { "ja": "お正月", "en": "New Year" },
        { "ja": "おせち料理", "en": "New Year food" },
        { "ja": "介護ロボット", "en": "nursing care robot" },
        { "ja": "クラブ活動", "en": "club activities" },
        { "ja": "まんが喫茶", "en": "manga cafe" },
        { "ja": "キャラ弁", "en": "character obento" },
        { "ja": "温泉", "en": "onsen" }
      ]
    },

    {
      "year": 2024,
      "file": "2024japaneseSL-oral-report.docx",
      "high_scoring": [
        { "section": "conversation", "text": "They maintained the conversation by using appropriate あいづち and repair strategies." },
        { "section": "conversation", "text": "Students were able to use から and ので to indicate their reasons, and use と思います to indicate their opinions where appropriate." },
        { "section": "conversation", "text": "Students who scored highly were able to move beyond single-sentence responses and carry the conversation forward by providing information that prompted follow-up questions from the assessors." },
        { "section": "conversation", "text": "Even if students had not travelled to Japan or held a part-time job, they had prepared responses to address these questions effectively." },
        { "section": "discussion", "text": "Students who scored highly were able to lead the discussion by providing information that enabled assessors to ask appropriate follow-up questions. They had prepared sufficient information to engage in an 8-minute discussion." },
        { "section": "discussion", "text": "Students who scored highly were able to talk about their chosen subtopic from multiple perspectives rather than just stating facts. They were also able to express their opinion and provide solutions to address issues they raised." }
      ],
      "common_errors": [
        { "text": "Students often confused the conjugation of い-adjectives with な-adjectives and the て form of verbs.", "error_ids": ["err-adj-conj", "err-te-form"] },
        { "text": "Some students incorrectly added the particle の between an い-adjective and a noun: for example, おもしろいの人 instead of おもしろい人.", "error_ids": ["err-adj-no"] },
        { "text": "Some students had difficulties using と思います with adjectives: むずかしいだと思います instead of むずかしいと思います, and きれい着物です instead of きれいな着物です.", "error_ids": ["err-omou", "err-na-adj"] },
        { "text": "Some students confused 今年 with 去年 and 将来 with 週末. They should also focus on the correct use of particles, especially で and に.", "error_ids": ["err-vocab-gap", "err-particle"] },
        { "text": "The pronunciation of オーストラリア、メルボルン and レストラン is still problematic for some students.", "error_ids": ["err-katakana"] },
        { "text": "Students need to continue to develop their understanding of a range of question words such as いつ、いつから、だれ、週に何回、何週間、何日間、どう and どう思いますか。", "error_ids": ["err-question-words"] },
        { "text": "Students tended to use familiar grammatical structures repeatedly.", "error_ids": ["err-narrow-range"] }
      ],
      "advice": [
        "Students should practise their prepared responses aloud until they feel comfortable delivering them. This practice will improve students' familiarity with sentence structures and vocabulary, which will help them to sound less scripted.",
        "They are encouraged to use a wider variety of structures where appropriate: for example, relative clauses and making comparisons.",
        "As time is limited during the examination, students should use repair strategies quickly. Saying もういちど言ってください may not be helpful if the student did not understand the question. Instead, students should pick out the specific word or words they did not understand and ask the assessors the meaning of those words.",
        "Students who chose more familiar topics, such as vending machines and convenience stores, generally performed well. In contrast, those who selected less familiar topics seemed knowledgeable but did not have the appropriate language skills to express their opinions. This was particularly evident with students who chose historical topics.",
        "Students should prepare for common types of questions on all subtopics, including questions about history, positive and negative points, solutions, comparisons between Japan and Australia, changes over time, and their opinions on various aspects of the subtopic.",
        "Instead of waiting to be asked by assessors, students should integrate their image more effectively into the discussion. Many students described their images well but did not explain the connections between the discussion points and what was shown in the image.",
        "Students need to research their chosen subtopic from a range of perspectives to avoid responding with それについて勉強しませんでした。"
      ],
      "example_questions": [
        { "ja": "今年の勉強はどうでしたか。", "en": "How was this year's study?", "note": "Some students answered by listing subjects, which did not answer the question." },
        { "ja": "今年日本語のほかにどんな科目を勉強しましたか。", "en": "What subjects did you study this year other than Japanese?", "note": "Some students answered 日本語はむずかしいです, which did not answer the question." },
        { "ja": "もしオーストラリアに給食があったら、メニューに何を入れますか。", "en": "What would you include on the school lunch menu if it was available in Australia?", "note": "Given in the report as a hypothetical question some students could not answer." }
      ],
      "topics": [
        { "ja": "コンビニ", "en": "convenience stores" },
        { "ja": "ハイテクコンビニ", "en": "high-tech convenience stores" },
        { "ja": "いどうコンビニ", "en": "mobile convenience stores" },
        { "ja": "給食", "en": "school lunches" },
        { "ja": "自動販売機", "en": "vending machines" },
        { "ja": "まんが", "en": "manga" },
        { "ja": "クラブ活動", "en": "club activities" },
        { "ja": "ロボット", "en": "robots" },
        { "ja": "ゆるキャラ", "en": "mascot characters" },
        { "ja": "高齢化社会", "en": "ageing society" },
        { "ja": "オーバーツーリズム", "en": "overtourism" },
        { "ja": "非婚", "en": "unmarried by choice" },
        { "ja": "歌舞伎", "en": "kabuki" }
      ]
    },

    {
      "year": 2025,
      "file": "2025-VCE-JapaneseSLOral-report.docx",
      "high_scoring": [
        { "section": "conversation", "text": "Higher-scoring responses used connectives effectively, including まず、つまり and じつは, and demonstrated a wide vocabulary, which they drew upon throughout the conversation. They moved beyond one-sentence answers." },
        { "section": "conversation", "text": "Responses that scored in the higher range used a range of grammatical structures accurately, in complete and correct sentences." },
        { "section": "conversation", "text": "Many students used interjections naturally, such as そうですね, and were able to use some repair strategies including もういちど言ってください。" },
        { "section": "conversation", "text": "Students used から, ので and the structure と思います effectively when giving their opinions." },
        { "section": "discussion", "text": "They were able to move beyond sharing factual information, and they talked about their chosen subtopic from multiple perspectives. They were able to state facts and opinions, make comparisons, share the good and bad points, and outline possible solutions. These students were also able to explain why they chose their particular subtopic." },
        { "section": "discussion", "text": "Many students were able to integrate their chosen image at different times throughout the discussion, rather than waiting for the assessors to ask about the image and simply describing it." },
        { "section": "discussion", "text": "Most students were able to respond to いい点 and わるい点 when relevant to their subtopic. The students who were more prepared were able to provide solutions for the わるい点." }
      ],
      "common_errors": [
        { "text": "Many students used adjectives incorrectly, such as かわいいの人 instead of かわいい人, おもしろいのこと instead of おもしろいこと, きれいかった instead of きれいでした, as well as errors in the て-form of verbs.", "error_ids": ["err-adj-no", "err-na-adj", "err-te-form"] },
        { "text": "Some students used the wrong verb with the noun; for example, ケーキを使う instead of ケーキを作る.", "error_ids": ["err-collocation"] },
        { "text": "The particle に was problematic for some students; for example, some used it after 昨日 when it is not required.", "error_ids": ["err-particle"] },
        { "text": "Sometimes the listing structure was not used accurately; for example, おんがくをききたり instead of おんがくをきいたり.", "error_ids": ["err-tari"] },
        { "text": "Students could revise the correct use of the structure 'I think'; for example, 先生だと思います and おいしいと思います. They could also revise the use of あまり with a negative verb; for example, あまり食べません。", "error_ids": ["err-omou", "err-amari"] },
        { "text": "Many students did not recognise key question words including いつ、いつから、いつごろ、いつごろから、どこ、だれ、何、どんな、何時間ぐらい、何回ぐらい and 何年間ぐらい, resulting in mismatched responses. There were also students who did not understand ～ほかに、こまりましたか、どう／どうやって／どのように、どれぐらい／どのぐらい and どちらの方が／どっち.", "error_ids": ["err-question-words"] },
        { "text": "The word 兄弟 seemed to be unfamiliar to some students. Further unfamiliar vocabulary included むりょう、ただ、けんこう、運転する、お客さん and 料理.", "error_ids": ["err-vocab-gap"] },
        { "text": "Errors with katakana words included オーストラリア, アリバイト instead of アルバイト and サーフィング instead of サーフィン. Other pronunciation errors included そぶ instead of そぼ and こわい instead of かわいい. Some students had difficulty pronouncing double consonant sounds and long vowel sounds.", "error_ids": ["err-katakana", "err-long-vowel"] }
      ],
      "advice": [
        "Students should focus on delivering their answers as naturally as possible and engaging in a conversation, rather than reciting overlong or memorised responses that limited interaction with assessors.",
        "Responses that scored in the middle band appeared to be recitations of what students had memorised, and students were not able to maintain a natural flow when asked unrehearsed questions.",
        "Students should choose a subtopic that enables them to move beyond providing facts. They should select a subtopic that requires critical thinking and that can be discussed in depth from multiple perspectives.",
        "Some students brought very simple images, for example a picture of Hello Kitty or Pocky, which made it difficult to develop a meaningful discussion where the image was used to support their ideas, information or opinions.",
        "In some cases, students gave speeches rather than engaging in a discussion, and used phrases such as つぎに悪い点について話します. While it is understandable that students want to take control of the examination, using such phrases is too scripted for a discussion.",
        "If students do not know a word or question, they can ask for clarification or say they do not understand, rather than delivering a response that does not match the question. This also helps the assessors to change the direction of the discussion.",
        "If the subtopic is the snow festival in Sapporo, students should know the word 雪. If the subtopic is 花見, students should know the word さくら. Unfamiliar vocabulary across different subtopics included えいきょう、いんしょう and 思い出.",
        "They needed to choose an appropriate subtopic based on a cultural product or practice."
      ],
      "example_questions": [
        { "ja": "アルバイトのお金で何をしますか。", "en": "What do you do with the money from your part-time job?", "note": "Named in the report as a commonly misunderstood question." },
        { "ja": "しゅうに何回アルバイトをしますか。", "en": "How many times a week do you do your part-time job?", "note": "Named in the report as a commonly misunderstood question." }
      ],
      "topics": [
        { "ja": "カラオケ", "en": "karaoke" },
        { "ja": "コンビニ", "en": "convenience stores" },
        { "ja": "コンビニとフードロス", "en": "convenience stores and food loss" },
        { "ja": "給食", "en": "school meals" },
        { "ja": "自動販売機", "en": "vending machines" },
        { "ja": "子ども食堂", "en": "children's cafeteria" },
        { "ja": "マンガの色々な使い方", "en": "the various ways of using manga" },
        { "ja": "オタク文化", "en": "geek culture" },
        { "ja": "温泉", "en": "onsen" },
        { "ja": "お正月", "en": "New Year" },
        { "ja": "部活", "en": "club activities" },
        { "ja": "ひきこもり", "en": "social withdrawal" },
        { "ja": "浅草寺", "en": "Sensou-ji temple" },
        { "ja": "祭り", "en": "festivals" },
        { "ja": "柔道", "en": "judo" },
        { "ja": "お弁当", "en": "obento" },
        { "ja": "七夕", "en": "tanabata" },
        { "ja": "和食", "en": "Japanese food" },
        { "ja": "ゆるキャラ", "en": "mascot characters" },
        { "ja": "教育テクノロジー", "en": "education technology" },
        { "ja": "アイヌ", "en": "Ainu" },
        { "ja": "オーバーツーリズム", "en": "over-tourism" },
        { "ja": "キャラ弁", "en": "character lunch boxes" },
        { "ja": "東京のごみ問題", "en": "Tokyo's rubbish problem" },
        { "ja": "新幹線", "en": "bullet trains" }
      ]
    }
  ],

  "themes": [
    {
      "id": "th-rote",
      "theme": "Do not recite. Memorised scripts and speeches collapse the moment a question moves.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "both",
      "evidence": [
        { "year": 2020, "quote": "A number of students seemed to have memorised a script for both sections, and consequently found it difficult to answer questions that digressed from this." },
        { "year": 2021, "quote": "These should be delivered in a natural way and not too quickly, as speaking fast can sound over-rehearsed and rote-learned." },
        { "year": 2022, "quote": "Those who scored highly were able to speak with rehearsed spontaneity, engaging in an organic conversation rather than delivering monologue type responses." },
        { "year": 2023, "quote": "Some students delivered what appeared to be pre-learned lengthy responses that were like mini speeches." },
        { "year": 2024, "quote": "Practice will help them to sound less scripted and enable greater flexibility in their responses." },
        { "year": 2025, "quote": "Responses that scored in the middle band appeared to be recitations of what students had memorised." }
      ]
    },
    {
      "id": "th-elaborate",
      "theme": "Move beyond one-sentence answers. Give two or three pieces of information, a reason and an opinion.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "both",
      "evidence": [
        { "year": 2020, "quote": "Students who scored highly provided detailed information in their responses and included a range of grammatical constructs rather than one-sentence answers." },
        { "year": 2021, "quote": "They provided sufficient information, but this information was not always sequenced well." },
        { "year": 2022, "quote": "Students who scored highly provided detailed responses and replied to the questions with two or three pieces of information rather than a one-sentence response." },
        { "year": 2023, "quote": "Students should move beyond providing simple responses, and develop their information, supporting their ideas with evidence, examples and opinions." },
        { "year": 2024, "quote": "Students who scored highly were able to move beyond single-sentence responses and carry the conversation forward." },
        { "year": 2025, "quote": "They moved beyond one-sentence answers, and provided details using sophisticated vocabulary and a range of grammatical structures." }
      ]
    },
    {
      "id": "th-question-words",
      "theme": "Know the question words. Mismatched answers come from not catching the question, not from weak Japanese.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "conversation",
      "evidence": [
        { "year": 2020, "quote": "Students need to be familiar with a range of question words, including どうやって、どうして、なぜ、いつ、どこ、だれ、どのぐらい." },
        { "year": 2021, "quote": "Students in the low bands needed to revise a range of question words including だれ、どんな、いつから、どうして／なぜ、どうやって、どのようにして." },
        { "year": 2022, "quote": "Some students did not understand more challenging question words such as 週に何回、何冊、おどろいたこと、びっくりしたこと and いやなこと." },
        { "year": 2023, "quote": "Some students misunderstood どんな、どの、どうやって、どうして and 兄弟がいますか。" },
        { "year": 2024, "quote": "Students need to continue to develop their understanding of a range of question words such as いつ、いつから、だれ、週に何回、何週間、何日間、どう and どう思いますか。" },
        { "year": 2025, "quote": "Many students did not recognise key question words, resulting in mismatched responses." }
      ]
    },
    {
      "id": "th-image-support",
      "theme": "Use the image to support the discussion. Describing it is a middle-band answer.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "discussion",
      "evidence": [
        { "year": 2020, "quote": "Some students were able to effectively integrate their chosen image to support their subtopic, rather than just describe the image." },
        { "year": 2021, "quote": "They referred to the image appropriately throughout the discussion, rather than simply describing it." },
        { "year": 2022, "quote": "Students who scored well were able to bring their image into the discussion in a creative way, rather than just describe the image." },
        { "year": 2023, "quote": "A successful image told some sort of story and enabled students to elaborate on different aspects of the image." },
        { "year": 2024, "quote": "Many students described their images well but did not explain the connections between the discussion points and what was shown in the image." },
        { "year": 2025, "quote": "Many students were able to integrate their chosen image at different times throughout the discussion, rather than waiting for the assessors to ask about the image." }
      ]
    },
    {
      "id": "th-adjectives",
      "theme": "Adjective conjugation. い and な adjectives, joining with くて, and never の between an い-adjective and a noun.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "both",
      "evidence": [
        { "year": 2020, "quote": "Many students made a number of basic grammatical errors, such as incorrect verb tenses and adjective conjugations." },
        { "year": 2021, "quote": "Errors in verb tenses, adjective agreements and particle use were also noted." },
        { "year": 2022, "quote": "Some errors were noted in basic adjective agreements, especially when using くて to join い adjectives." },
        { "year": 2023, "quote": "Linking adjectives 楽しいとおもしろい instead of 楽しくておもしろい." },
        { "year": 2024, "quote": "Some students incorrectly added the particle の between an い-adjective and a noun: おもしろいの人 instead of おもしろい人." },
        { "year": 2025, "quote": "Many students used adjectives incorrectly, such as かわいいの人 instead of かわいい人, きれいかった instead of きれいでした." }
      ]
    },
    {
      "id": "th-subtopic-depth",
      "theme": "Choose a subtopic broad enough to sustain eight minutes, and prepare it from multiple perspectives.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "discussion",
      "evidence": [
        { "year": 2020, "quote": "Careful selection of a broad subtopic that will sustain the length of the discussion is imperative." },
        { "year": 2021, "quote": "It is important that students choose a subtopic that will allow them to sustain the interaction with the assessors for eight minutes." },
        { "year": 2022, "quote": "Students are reminded that they should prepare enough information to sustain the eight-minute discussion with the assessors." },
        { "year": 2023, "quote": "Students should be prepared to respond to a variety of question words in order to discuss their chosen subtopic from multiple perspectives." },
        { "year": 2024, "quote": "Students should consider how they will use the 8-minute discussion time effectively, and prepare enough information to sustain an 8-minute interaction." },
        { "year": 2025, "quote": "They should select a subtopic that requires critical thinking and that can be discussed in depth from multiple perspectives." }
      ]
    },
    {
      "id": "th-katakana",
      "theme": "Katakana pronunciation, especially オーストラリア. Named in five of the six years.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "both",
      "evidence": [
        { "year": 2020, "quote": "The correct pronunciation of katakana words, such as オーストラリア, is important." },
        { "year": 2021, "quote": "The pronunciation of katakana words, for example オーストラリア、メルボルン and サッカー." },
        { "year": 2022, "quote": "Some errors were noted in the pronunciation of オーストラリア、クラシック and チーム." },
        { "year": 2023, "quote": "There were some errors in the pronunciation of katakana words, including オーストラリア." },
        { "year": 2024, "quote": "The pronunciation of オーストラリア、メルボルン and レストラン is still problematic for some students." },
        { "year": 2025, "quote": "Errors with katakana words included オーストラリア, アリバイト instead of アルバイト and サーフィング instead of サーフィン." }
      ]
    },
    {
      "id": "th-vocab-gap",
      "theme": "Vocabulary gaps stop the conversation. Build words for your own world and for your subtopic.",
      "years": [2020, 2021, 2022, 2023, 2024, 2025],
      "count": 6,
      "section": "both",
      "evidence": [
        { "year": 2020, "quote": "Some students did not understand vocabulary, including 困ったこと、がっき、きょく、海外旅行、読書." },
        { "year": 2021, "quote": "Other vocabulary that students should revise includes つづけます、えらびます、兄弟、作家." },
        { "year": 2022, "quote": "Some misunderstanding of vocabulary was noted in がっき、はいゆう and きょく." },
        { "year": 2023, "quote": "They did not know じきゅう、がっき、うんてんめんきょ、なかがいい、せんしゅ、読書、作家、じゅぎょう and 強い." },
        { "year": 2024, "quote": "Students need to develop a wide vocabulary and become familiar with common words such as 兄弟 and 楽器." },
        { "year": 2025, "quote": "Unfamiliar vocabulary included むりょう、ただ、けんこう、運転する、お客さん and 料理." }
      ]
    },
    {
      "id": "th-omou",
      "theme": "と思います after a plain form. おもしろいだと思います and むずかしいだと思います are the recurring slip.",
      "years": [2020, 2023, 2024, 2025],
      "count": 4,
      "section": "both",
      "evidence": [
        { "year": 2020, "quote": "Common grammatical mistakes included the use of ～と思います." },
        { "year": 2023, "quote": "おもしろいだと思います instead of おもしろいと思います." },
        { "year": 2024, "quote": "They said むずかしいだと思います instead of むずかしいと思います。" },
        { "year": 2025, "quote": "Students could revise the correct use of the structure 'I think'; for example, 先生だと思います and おいしいと思います。" }
      ]
    },
    {
      "id": "th-reasons",
      "theme": "Give the reason. から and ので, and opinions with と思います, are what lift an answer.",
      "years": [2022, 2024, 2025],
      "count": 3,
      "section": "both",
      "evidence": [
        { "year": 2022, "quote": "Students who scored highly were able to share their opinions by using と思います and their reasons by using から or ので." },
        { "year": 2024, "quote": "Students were able to use から and ので to indicate their reasons, and use と思います to indicate their opinions where appropriate." },
        { "year": 2025, "quote": "Students used から, ので and the structure と思います effectively when giving their opinions." }
      ]
    },
    {
      "id": "th-repair",
      "theme": "Repair strategies keep the clock working for you. Ask for the one word you missed, quickly.",
      "years": [2021, 2022, 2024, 2025],
      "count": 4,
      "section": "both",
      "evidence": [
        { "year": 2021, "quote": "They were able to engage in a natural conversation with assessors, responding with spontaneity and using repair strategies when required." },
        { "year": 2022, "quote": "They asked for clarification and used Japanese fillers and repair strategies effectively and were therefore able to carry the conversation forward." },
        { "year": 2024, "quote": "Students should pick out the specific word or words they did not understand and ask the assessors the meaning of those words." },
        { "year": 2025, "quote": "If students do not know a word or question, they can ask for clarification or say they do not understand." }
      ]
    },
    {
      "id": "th-tense",
      "theme": "Listen for the tense in the question and answer in the same tense.",
      "years": [2020, 2021, 2022, 2023],
      "count": 4,
      "section": "both",
      "evidence": [
        { "year": 2020, "quote": "Basic grammatical errors, such as incorrect verb tenses." },
        { "year": 2021, "quote": "Errors in verb tenses." },
        { "year": 2022, "quote": "Students should listen carefully for the tense used in the question and respond accordingly." },
        { "year": 2023, "quote": "Students should use the correct tense when responding to the assessor's questions." }
      ]
    },
    {
      "id": "th-compare-solve",
      "theme": "Compare with Australia, name good and bad points, and offer a solution.",
      "years": [2022, 2023, 2024, 2025],
      "count": 4,
      "section": "discussion",
      "evidence": [
        { "year": 2022, "quote": "They were able to support and defend their opinions, provide thoughtful solutions to the problems they had identified, and make comparisons with Australia." },
        { "year": 2023, "quote": "They were also able to talk about the good and bad points, and make comparisons with Australia." },
        { "year": 2024, "quote": "They were also able to express their opinion and provide solutions to address issues they raised." },
        { "year": 2025, "quote": "Most students were able to respond to いい点 and わるい点. The students who were more prepared were able to provide solutions for the わるい点." }
      ]
    },
    {
      "id": "th-hypothetical",
      "theme": "Be ready for a hypothetical. もし〜たら questions separate the top band.",
      "years": [2020, 2021, 2024],
      "count": 3,
      "section": "discussion",
      "evidence": [
        { "year": 2020, "quote": "They were also able to respond to hypothetical questions. For example, what ゆるキャラ would you design for Melbourne?" },
        { "year": 2021, "quote": "Successful responses provided opinions and responded to hypothetical questions." },
        { "year": 2024, "quote": "Some students were unable to respond to hypothetical questions such as, 'What would you include on the school lunch menu if it was available in Australia?'" }
      ]
    },
    {
      "id": "th-image-quality",
      "theme": "One clear photo. Not a collage, not two images, not something so simple there is nothing to say.",
      "years": [2020, 2022, 2023, 2024, 2025],
      "count": 5,
      "section": "discussion",
      "evidence": [
        { "year": 2020, "quote": "Students are reminded that their chosen image should not be a collage and should only contain minimal writing." },
        { "year": 2022, "quote": "The image students choose should be clear enough for the assessors to see." },
        { "year": 2023, "quote": "A number of students prepared a collage or two contrasting images. These are not appropriate images for the examination." },
        { "year": 2024, "quote": "Students are reminded that their image should be one photo only containing minimal language, and not a collage of photos." },
        { "year": 2025, "quote": "Some students brought very simple images, for example a picture of Hello Kitty or Pocky, which made it difficult to develop a meaningful discussion." }
      ]
    },
    {
      "id": "th-keywords",
      "theme": "You must be able to explain your own key words. Assessors ask what they mean.",
      "years": [2021, 2022, 2023, 2024, 2025],
      "count": 5,
      "section": "discussion",
      "evidence": [
        { "year": 2021, "quote": "Students should be able to explain any keywords associated with their subtopic." },
        { "year": 2022, "quote": "They were able to define key words and terminology related to their topic, such as explaining what 給食 are." },
        { "year": 2023, "quote": "If talking about キャラ弁, students should know the word えいよう." },
        { "year": 2024, "quote": "Some students had difficulty explaining key terms when asked." },
        { "year": 2025, "quote": "If the subtopic is 花見, students should know the word さくら." }
      ]
    },
    {
      "id": "th-family-humble",
      "theme": "Your own family takes the plain words: 母、父、兄弟, not お母さん、お父さん.",
      "years": [2021, 2023],
      "count": 2,
      "section": "conversation",
      "evidence": [
        { "year": 2021, "quote": "Students should respond using words such as 父、母 rather than お父さん、お母さん." },
        { "year": 2023, "quote": "They should use 母、父、弟 rather than お母さん、お父さん、弟さん." }
      ]
    },
    {
      "id": "th-register",
      "theme": "です・ます throughout. Casual endings and slang cost marks.",
      "years": [2023],
      "count": 1,
      "section": "both",
      "evidence": [
        { "year": 2023, "quote": "Some students spoke in a very casual way, using language such as めっちゃ and 何だっけ, and plain-form sentence endings. Students should speak in the です・ます form throughout the examination." }
      ]
    },
    {
      "id": "th-range",
      "theme": "Widen the structures. Relative clauses, comparisons and connectives show range.",
      "years": [2024, 2025],
      "count": 2,
      "section": "both",
      "evidence": [
        { "year": 2024, "quote": "Students tended to use familiar grammatical structures repeatedly. They are encouraged to use a wider variety of structures where appropriate: for example, relative clauses and making comparisons." },
        { "year": 2025, "quote": "Higher-scoring responses used connectives effectively, including まず、つまり and じつは." }
      ]
    },
    {
      "id": "th-long-vowel",
      "theme": "Long vowels and double consonants: 学校、旅行、いっしょ、行った.",
      "years": [2021, 2022, 2023, 2025],
      "count": 4,
      "section": "both",
      "evidence": [
        { "year": 2021, "quote": "Some errors were made in long and short vowel sounds, for example 学校、旅行、いっしょ." },
        { "year": 2022, "quote": "An area to focus on is the pronunciation of the long and short vowel sounds in Japanese." },
        { "year": 2023, "quote": "Generally, students correctly pronounced the long vowel sounds, for example 高校, and double consonants, for example 行った." },
        { "year": 2025, "quote": "Some students had difficulty pronouncing double consonant sounds and long vowel sounds." }
      ]
    },
    {
      "id": "th-familiar-topic",
      "theme": "A familiar everyday subtopic beats an impressive one you cannot discuss.",
      "years": [2024, 2025],
      "count": 2,
      "section": "discussion",
      "inferred": false,
      "evidence": [
        { "year": 2024, "quote": "Students who chose more familiar topics, such as vending machines and convenience stores, generally performed well. In contrast, those who selected less familiar topics seemed knowledgeable but did not have the appropriate language skills to express their opinions. This was particularly evident with students who chose historical topics." },
        { "year": 2025, "quote": "Some students chose sophisticated topics but were not able to demonstrate their understanding of the topic nor express their opinions clearly and effectively." }
      ]
    }
  ],

  "topic_frequency": [
    { "ja": "コンビニ", "en": "convenience stores", "years": [2020, 2021, 2022, 2023, 2024, 2025], "count": 6 },
    { "ja": "給食", "en": "school lunches", "years": [2020, 2021, 2022, 2023, 2024, 2025], "count": 6 },
    { "ja": "自動販売機", "en": "vending machines", "years": [2020, 2021, 2022, 2023, 2024, 2025], "count": 6 },
    { "ja": "高齢化社会", "en": "ageing society", "years": [2020, 2021, 2022, 2024], "count": 4 },
    { "ja": "お正月", "en": "New Year", "years": [2021, 2022, 2023, 2025], "count": 4 },
    { "ja": "クラブ活動・部活", "en": "club activities", "years": [2020, 2022, 2023, 2024, 2025], "count": 5 },
    { "ja": "まんが", "en": "manga", "years": [2021, 2022, 2024, 2025], "count": 4 },
    { "ja": "ゆるキャラ", "en": "mascot characters", "years": [2020, 2024, 2025], "count": 3 },
    { "ja": "温泉", "en": "onsen", "years": [2021, 2023, 2025], "count": 3 },
    { "ja": "お弁当・キャラ弁", "en": "boxed lunches and character lunches", "years": [2020, 2021, 2023, 2025], "count": 4 },
    { "ja": "ロボット", "en": "robots", "years": [2020, 2021, 2023, 2024], "count": 4 },
    { "ja": "和食", "en": "Japanese food", "years": [2023, 2025], "count": 2 },
    { "ja": "オーバーツーリズム", "en": "over-tourism", "years": [2024, 2025], "count": 2 }
  ]
};
