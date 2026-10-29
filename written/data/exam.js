/* ============================================================================
   exam.js — the shape of the written examination, and what the assessors
   have said about it.
   ----------------------------------------------------------------------------
   NOTHING VCAA-COPYRIGHT IS REPRODUCED HERE. The site is public. What this
   file holds is the published shape of the paper (sections, marks, criteria,
   which are facts), and SHORT ATTRIBUTED QUOTATIONS from the examination
   reports, each with its year. Every reading and listening text in this app
   is written for it, in the style of the examination, and never lifted from
   a paper.

   The quotations earn their place by being the evidence. A student told
   "use kanji" shrugs; a student shown that the assessors wrote it in four
   different years stops arguing.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.HIKKI_EXAM = {
  "schema_version": 1,
  "name_ja": "ひっきしけん",
  "name_en": "The written examination",
  "about": [
    "2 hours of writing time, plus 15 minutes to read.",
    "Take any printed dictionary: monolingual or bilingual, one or two volumes.",
    "3 sections, 75 marks, and this app covers every one of them."
  ],
  "sections": [
    {
      "id": "s1a",
      "name": "Section 1, Part A",
      "what": "Listening and responding in English",
      "marks": 10,
      "detail": "One text, played twice, with a break between the playings. Answer in English.",
      "criteria": [
        "the capacity to understand and convey general and specific aspects of texts"
      ]
    },
    {
      "id": "s1b",
      "name": "Section 1, Part B",
      "what": "Listening and responding in Japanese",
      "marks": 10,
      "detail": "One text, played twice. Answer in Japanese. Content and language are not marked separately.",
      "criteria": [
        "the capacity to understand general and specific aspects of texts",
        "the capacity to convey information and opinions accurately and appropriately"
      ]
    },
    {
      "id": "s2a",
      "name": "Section 2, Part A",
      "what": "Reading, listening and responding in English",
      "marks": 20,
      "detail": "The longest section and the most marks. Answer in English.",
      "criteria": [
        "the capacity to understand and convey general and specific aspects of texts"
      ]
    },
    {
      "id": "s2b",
      "name": "Section 2, Part B",
      "what": "Reading and responding in Japanese",
      "marks": 15,
      "detail": "A text type for a stated audience and purpose, around 300 ji, often with a picture to use as well.",
      "criteria": [
        "the capacity to understand general and specific aspects of texts",
        "the capacity to convey information and opinions accurately and appropriately"
      ]
    },
    {
      "id": "s3",
      "name": "Section 3",
      "what": "Writing in Japanese",
      "marks": 20,
      "detail": "One of four questions, 400 to 500 ji, each with its own text type and writing style.",
      "criteria": [
        "the capacity to demonstrate relevance, breadth and depth of content",
        "the capacity to demonstrate accuracy, range and appropriateness of vocabulary and grammar"
      ]
    }
  ],
  "advice": [
    {
      "id": "kanji",
      "head": "Write the kanji you know",
      "say": "A response in kana where the kanji is expected loses marks it did not need to lose. The assessors name this every year.",
      "quotes": [
        {
          "year": 2025,
          "text": "Students are reminded to use the expected kanji in Japanese responses."
        },
        {
          "year": 2024,
          "text": "Students are reminded to use kanji wherever possible in any response written in Japanese."
        },
        {
          "year": 2021,
          "text": "Noticeably, many VCE kanji were not used at all or written incorrectly."
        }
      ]
    },
    {
      "id": "basics",
      "head": "The marks go on the ordinary things",
      "say": "Verb endings, adjective endings, particles, and plain sentence patterns. Not the rare word you looked up.",
      "quotes": [
        {
          "year": 2024,
          "text": "Throughout the examination, rudimentary grammatical errors in verb conjugation, adjective inflection, particle usage and common sentence structures were noticeable in both short and extended responses in Japanese."
        },
        {
          "year": 2023,
          "text": "Across all sections of the examination, rudimentary grammatical mistakes in verb conjugation, adjective inflection, particle usage and common sentence structures were evident in both short and extended responses in Japanese."
        }
      ]
    },
    {
      "id": "particles",
      "head": "A wrong particle is a wrong answer",
      "say": "Not a small slip. The assessors describe particles changing who did what to whom, which makes a right idea into a wrong response.",
      "quotes": [
        {
          "year": 2025,
          "text": "Some students also had difficulty with 二人で (two people doing something together), resulting in particle errors such as 二人と (with two people, implying Hiroshi plus two others) or 二人に (to/for the two people), which either changed the intended meaning or made the phrase ungrammatical in this context."
        },
        {
          "year": 2024,
          "text": "In some instances, students may have understood what they heard, but errors in particle usage inadvertently altered the intended meaning of their responses."
        }
      ]
    },
    {
      "id": "katakana",
      "head": "Katakana spelling costs marks",
      "say": "Long vowels and small letters. The words that come up are ordinary ones, and they are misspelt every year.",
      "quotes": [
        {
          "year": 2024,
          "text": "Students are reminded to practise recognising katakana words in listening texts in preparation for the examination."
        },
        {
          "year": 2021,
          "text": "Students should also be able to write common, basic katakana words accurately."
        }
      ]
    },
    {
      "id": "detail",
      "head": "The small words carry the marks",
      "say": "A time marker, a 'very', a から〜まで, an 'in front of'. Leave one out and a correct idea scores less than it should.",
      "quotes": [
        {
          "year": 2025,
          "text": "While most students understood the first point, some students omitted the word 'very' in their responses."
        },
        {
          "year": 2024,
          "text": "Most responses correctly identified the names of the months; however, some overlooked specific details such as 終わり (the end) and 始め (the start) and/or から〜まで (from – until)."
        }
      ]
    },
    {
      "id": "texttype",
      "head": "Write the text type you were asked for",
      "say": "A speech is not an essay with a greeting on it. The task names an audience, a purpose and a style, and all three are marked.",
      "quotes": [
        {
          "year": 2024,
          "text": "In general, students are encouraged to consolidate their knowledge of grammar, vocabulary and kanji, while gaining a clear understanding of the writing styles and text type features they are expected to know at VCE level."
        },
        {
          "year": 2022,
          "text": "Students need to recognise the correct features of a speech script and avoid 聞いてくれてありがとうございました (thank you for listening) as a closing remark."
        }
      ]
    },
    {
      "id": "copying",
      "head": "Do not copy the stimulus",
      "say": "Section 2 Part B gives you a text to use, not a text to repeat. Take the information and say it your own way.",
      "quotes": [
        {
          "year": 2025,
          "text": "Low-scoring responses … included significant portions copied from the reading text without any modifications."
        },
        {
          "year": 2025,
          "text": "High-scoring responses … conveyed the content with minimal reliance on the wording of the reading text while maintaining the original meaning."
        }
      ]
    },
    {
      "id": "length",
      "head": "Length is not the point, and running over costs you elsewhere",
      "say": "Section 2 Part B is about 300 ji and Section 3 is 400 to 500. Going long in one has left students with an unfinished answer in the other.",
      "quotes": [
        {
          "year": 2025,
          "text": "In some cases, the additional time spent on this task or on the essay in the following section resulted in incomplete responses in one or both sections."
        },
        {
          "year": 2025,
          "text": "It was possible to achieve a high score for this question without exceeding the specified word/character limit."
        }
      ]
    },
    {
      "id": "tense",
      "head": "Check the tense the question is in",
      "say": "A recount of what happened is written in the past. A question about what you did is answered about what you did.",
      "quotes": [
        {
          "year": 2023,
          "text": "It should also be noted that the response to this question should be written primarily in the past tense to recount the author's experience and emotions."
        },
        {
          "year": 2021,
          "text": "However, they are advised to pay closer attention to the tense and intended meaning of the question."
        }
      ]
    },
    {
      "id": "names",
      "head": "No names, no school",
      "say": "Do not put your teacher's name, your own, or anything that identifies your school into an extended response.",
      "quotes": [
        {
          "year": 2025,
          "text": "Students are also reminded not to include their teacher's name or any personal or school-related details that could identify them or others in extended responses in any part of the examination."
        }
      ]
    }
  ],
  "links": [
    {
      "name": "VCAA Japanese Second Language — past examinations and reports",
      "url": "https://www.vcaa.vic.edu.au/assessment/vce-assessment/past-examinations/Pages/Japanese-Second-Language.aspx",
      "what": "Every paper and report from which the advice in this app is quoted, with the audio for the listening sections."
    },
    {
      "name": "MJLEC listening practice",
      "url": "https://www.mjlec.org.au/",
      "what": "The Modern Japanese Language Education Centre, for longer listening practice than anything here."
    }
  ]
};
