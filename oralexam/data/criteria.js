/* ============================================================================
   criteria.js — the VCE oral examination, as the VCAA documents define it.
   ----------------------------------------------------------------------------
   Every string below is transcribed from two files in this repo. Nothing here
   is summarised, paraphrased or remembered:

     SL-Oral-AssessmentCriteriaAndDescriptors (3).docx   (Version 4, April 2025)
     japaneseSL-oral-specs-w (1).docx                    (Version 3, March 2025)

   The criteria are published for all VCE Second Language oral examinations at
   once, so the source writes "The [Language]-speaking communities". Japanese is
   substituted here, and `source_wording` keeps the original.

   The object below is pure JSON. The single `window.` line at the top is the
   only JavaScript in the file, so tools/validate.js can strip it and parse the
   rest with a JSON parser.

   Two notes that used to sit inside the object, moved out so it stays JSON:

     `entry` — what happens before Section 1 starts. The specifications require
     it and say in the same sentence that it is not assessed. Students still
     have to do it, so it is taught here as a doorway script, not a speech.

     `visual_material` — the rules about the one image, gathered from the
     specifications, the 2026 advice and video 4. Students get these wrong
     every year, so the app states them rather than assuming the teacher has.
   ========================================================================== */
window.ORAL_CRITERIA = {
  "schema_version": 1,
  "sources": [
    {
      "file": "SL-Oral-AssessmentCriteriaAndDescriptors (3).docx",
      "title": "VCE Second Language Examinations, Oral examination – End of year, Assessment criteria and descriptors",
      "version": "Version 4 – April 2025"
    },
    {
      "file": "japaneseSL-oral-specs-w (1).docx",
      "title": "VCE Japanese Second Language (From 2020), Oral examination – End of year, Examination specifications",
      "version": "Version 3 – March 2025"
    },
    {
      "file": "2026languages-oral-exam-advice_0 (2).docx",
      "title": "2026 VCE Languages Oral examination – Advice for students and teachers",
      "version": "2026"
    }
  ],

  "examination": {
    "total_minutes": 15,
    "total_minutes_wording": "approximately 15 minutes",
    "total_marks": 40,
    "contribution_percent": 12.5,
    "assessors": 2,
    "recorded": "An audio recording of the Languages oral examination will be made.",
    "study_design": "VCE Japanese Second Language Study Design (From 2020)"
  },

  "entry": {
    "assessed": false,
    "source": "japaneseSL-oral-specs-w (1).docx",
    "wording": "Upon entering the examination room, students are to verbally provide their student number in English. Students are then to indicate to the assessors, in Japanese, their chosen subtopic and the supporting visual material that they have brought with them for the discussion in Section 2. The supporting visual material is a requirement. This introductory information will not be assessed.",
    "notes": [
      "The student number is the only English used in the whole examination.",
      "Assessors note the subtopic so that it is not covered in Section 1.",
      "Greet and leave in the culturally appropriate way."
    ],
    "notes_source": "RevisedSecondLanguageOra ExaminationVideo1-Transcript.docx"
  },

  "sections": [
    {
      "id": "conversation",
      "number": 1,
      "name_en": "Conversation",
      "name_ja": "かいわ",
      "minutes": 7,
      "minutes_wording": "approximately seven minutes",
      "marks": 20,
      "about": "Section 1 of the examination involves a general conversation between the student and the two assessors about the student's personal world and their interactions with the Japanese language and culture as learners.",
      "detail": "The assessors will begin the conversation with questions about the student's personal world. The assessors will then ask general questions about the student's interactions with the Japanese language and culture as learners. Students may support their personal reflections by referring to any of the relevant subtopics studied in class from the prescribed theme 'The individual' and the prescribed theme 'The Japanese-speaking communities'.",
      "themes": ["The individual", "The Japanese-speaking communities"],
      "criteria": [
        {
          "id": "c1-content",
          "number": 1,
          "name": "Content and communication",
          "scope": "Information, ideas and opinions about the student's personal world and their interactions with the language and culture as learners",
          "qualities": [
            "relevance, depth and range of information, ideas and opinions",
            "capacity to elaborate and reflect on information, ideas and opinions",
            "capacity to interact with assessors",
            "effective communication"
          ],
          "max": 10,
          "descriptors": [
            { "band": "0–1", "text": ["Provides hardly any or no evidence of meeting the criterion"] },
            { "band": "2–3", "text": [
              "Demonstrates minimal understanding and ability to advance the conversation; is slow to respond, with consistent hesitation and false starts; needs frequent support",
              "Provides a limited range of information, ideas and opinions that are not always relevant",
              "Has difficulty clarifying information, ideas and opinions"
            ] },
            { "band": "4–5", "text": [
              "Demonstrates a satisfactory level of understanding; communicates satisfactorily, with hesitation and pauses; needs support",
              "Provides a satisfactory range of information, ideas and opinions that are somewhat relevant",
              "Clarifies some information, ideas and opinions"
            ] },
            { "band": "6–7", "text": [
              "Demonstrates a good level of understanding; communicates well, with occasional hesitation and pauses",
              "Provides a good range of information, ideas and opinions that are generally relevant",
              "Clarifies or elaborates on information, ideas and opinions some of the time"
            ] },
            { "band": "8–9", "text": [
              "Demonstrates a very high level of understanding; carries the conversation forward with confidence; communicates effectively, needing minimal support",
              "Provides a very good range of relevant information, ideas and opinions",
              "Clarifies, elaborates on or defends information, ideas and opinions most of the time"
            ] },
            { "band": "10", "text": [
              "Demonstrates an excellent level of understanding by responding readily and communicating confidently; carries the conversation forward with spontaneity",
              "Provides an excellent range of information, ideas and opinions clearly and logically with highly relevant responses",
              "Clarifies, elaborates on and defends information, ideas and opinions very effectively"
            ] }
          ]
        },
        {
          "id": "c1-language",
          "number": 2,
          "name": "Language",
          "scope": "Accurate and appropriate language structures and vocabulary related to the student's personal world and their interactions with the language and culture as learners",
          "qualities": [
            "appropriateness of vocabulary, grammar and sentence structures",
            "clarity of expression, including pronunciation, intonation, stress and tempo"
          ],
          "max": 10,
          "descriptors": [
            { "band": "0–1", "text": ["Provides hardly any or no evidence of meeting the criterion"] },
            { "band": "2–3", "text": [
              "Uses very simple vocabulary and structures; makes frequent and intrusive errors",
              "Poor pronunciation, intonation, stress and tempo, with significant problems"
            ] },
            { "band": "4–5", "text": [
              "Uses simple vocabulary and structures; is able to express meaning despite errors; relies on rote-learned language or literal translation from English",
              "Satisfactory pronunciation, intonation, stress and tempo, with some problems"
            ] },
            { "band": "6–7", "text": [
              "Uses good vocabulary and structures; is able to express meaning despite errors; may at times rely on rote-learned language or literal translation from English",
              "Good pronunciation, intonation, stress and tempo, with minor problems"
            ] },
            { "band": "8–9", "text": [
              "Uses very good vocabulary and structures accurately and appropriately",
              "Very good pronunciation, intonation, stress and tempo"
            ] },
            { "band": "10", "text": [
              "Uses sophisticated vocabulary and structures accurately and appropriately; uses language naturally",
              "Excellent pronunciation, intonation, stress and tempo"
            ] }
          ]
        }
      ]
    },
    {
      "id": "discussion",
      "number": 2,
      "name_en": "Discussion",
      "name_ja": "ディスカッション",
      "minutes": 8,
      "minutes_wording": "approximately eight minutes",
      "marks": 20,
      "about": "Following the conversation, the student will be required to discuss their chosen subtopic and the supporting visual material that they have brought with them.",
      "detail": "The subtopic and the supporting visual material must be related to either the prescribed theme 'The Japanese-speaking communities' or the prescribed theme 'The world around us'. The focus of the discussion will be on exploring aspects of the subtopic, including information, opinions and ideas. The student will be expected to respond to questions on the subtopic itself and the supporting visual material that they have brought with them.",
      "themes": ["The Japanese-speaking communities", "The world around us"],
      "no_introduction": {
        "wording": "Students do not need to give a one-minute introduction.",
        "source": "RevisedSecondLanguageOra ExaminationVideo3-Transcript.docx",
        "also": "An introduction is no longer required at the beginning of the Discussion section.",
        "also_source": "2023japaneseSL-oral-report.docx"
      },
      "criteria": [
        {
          "id": "c2-content",
          "number": 1,
          "name": "Content and communication",
          "scope": "Information, ideas and opinions related to the chosen subtopic and supporting visual material from either the prescribed theme 'The Japanese-speaking communities' or the prescribed theme 'The world around us'",
          "source_wording": "The [Language]-speaking communities",
          "qualities": [
            "relevance, depth and range of information, ideas and opinions",
            "capacity to elaborate and reflect on information, ideas and opinions",
            "capacity to interact with assessors",
            "effective communication"
          ],
          "max": 10,
          "descriptors": [
            { "band": "0–1", "text": ["Provides hardly any or no evidence of meeting the criterion"] },
            { "band": "2–3", "text": [
              "Provides minimal information, which is not always relevant; has difficulty clarifying or elaborating on information, ideas and opinions",
              "Is slow to respond, with consistent hesitation and false starts; needs frequent support",
              "Provides a very weak connection between the image and the subtopic"
            ] },
            { "band": "4–5", "text": [
              "Provides a satisfactory range of information, ideas and opinions that are generally relevant to the subtopic",
              "Communicates in a satisfactory manner, but hesitation and pauses are evident",
              "Describes the image rather than using the image to support the discussion on the subtopic",
              "Requires support to communicate information, ideas and opinions"
            ] },
            { "band": "6–7", "text": [
              "Provides a good range of information, ideas and opinions that are relevant to the subtopic",
              "Elaborates on information and defends ideas and opinions",
              "Uses the image appropriately to support the discussion on the subtopic",
              "Communicates information, ideas and opinions well, but with hesitation and pauses"
            ] },
            { "band": "8–9", "text": [
              "Provides a very good range and depth of information, ideas and opinions that are highly relevant to the subtopic",
              "Elaborates on information and defends ideas and opinions clearly and effectively",
              "Uses the image effectively to support the discussion on the subtopic",
              "Communicates information, ideas and opinions confidently and carries the discussion forward with ease"
            ] },
            { "band": "10", "text": [
              "Provides an excellent range and depth of information, ideas and opinions with an original perspective on the subtopic",
              "Elaborates on complex information and defends ideas and opinions clearly and logically with highly relevant responses",
              "Uses the image skilfully to support the discussion on the subtopic",
              "Communicates information, ideas and opinions very confidently and carries the discussion forward with spontaneity"
            ] }
          ]
        },
        {
          "id": "c2-language",
          "number": 2,
          "name": "Language",
          "scope": "Accurate and appropriate language structures and vocabulary related to the chosen subtopic and supporting visual material from either the prescribed theme 'The Japanese-speaking communities' or the prescribed theme 'The world around us'",
          "qualities": [
            "appropriateness of vocabulary, grammar and sentence structures",
            "clarity of expression, including pronunciation, intonation, stress and tempo"
          ],
          "max": 10,
          "descriptors": [
            { "band": "0–1", "text": ["Provides hardly any or no evidence of meeting the criterion"] },
            { "band": "2–3", "text": [
              "Uses very simple vocabulary and structures; makes frequent and intrusive errors",
              "Poor pronunciation, intonation, stress and tempo, with significant problems"
            ] },
            { "band": "4–5", "text": [
              "Uses simple vocabulary and structures; is able to express meaning despite errors; relies on rote-learned language or literal translation from English",
              "Satisfactory pronunciation, intonation, stress and tempo, with minor problems"
            ] },
            { "band": "6–7", "text": [
              "Uses good vocabulary and structures; is able to express meaning despite errors; may at times rely on rote-learned language or literal translation from English",
              "Good pronunciation, intonation, stress and tempo, with minor problems"
            ] },
            { "band": "8–9", "text": [
              "Uses very good vocabulary and structures accurately and appropriately",
              "Very good pronunciation, intonation, stress and tempo"
            ] },
            { "band": "10", "text": [
              "Uses sophisticated vocabulary and structures accurately and appropriately; uses language naturally",
              "Excellent pronunciation, intonation, stress and tempo"
            ] }
          ]
        }
      ]
    }
  ],

  "visual_material": {
    "required": true,
    "count": 1,
    "max_paper": "A3",
    "rules": [
      "One image on a piece of paper no larger than A3 size.",
      "Three-dimensional objects are not permitted.",
      "The supporting visual material should not include any writing. If the supporting visual material does contain writing, the amount of writing must be minimal.",
      "The quality of the supporting visual material will not be assessed.",
      "One image is a picture or a photo. It is not a collage of pictures, a graph, a flowchart or a mind map.",
      "Dictionaries, electronic communication devices, notes and cue cards are not permitted."
    ],
    "sources": [
      "japaneseSL-oral-specs-w (1).docx",
      "2026languages-oral-exam-advice_0 (2).docx",
      "RevisedSecondLanguageOra ExaminationVideo4-Transcript.docx"
    ]
  }
};
