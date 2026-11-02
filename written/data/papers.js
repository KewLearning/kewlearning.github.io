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
    { "id": "vocab",  "ja": "ことば",     "en": "A word I did not know",
      "note": "The idea was there and the vocabulary was not." },
    { "id": "detail", "ja": "ききのがし", "en": "I missed a detail that was there",
      "note": "Said or written once, and not caught." },
    { "id": "infer",  "ja": "すいそく",   "en": "I did not work out what was implied",
      "note": "Nothing stated it; the answer had to be reasoned." },
    { "id": "misread","ja": "しつもん",   "en": "I misread what the question wanted",
      "note": "A good answer to a question nobody asked." },
    { "id": "ja",     "ja": "にほんご",   "en": "I understood it, my Japanese lost the mark",
      "note": "Particles, endings, kanji, spelling." },
    { "id": "blank",  "ja": "じかん",     "en": "I ran out of time or left it blank",
      "note": "A mark that was never attempted." }
  ],

  "skills": [
    { "id": "gist", "en": "The general idea",
      "sections": ["s1a", "s2a"],
      "criterion": "the capacity to understand and convey general aspects of texts",
      "asks": "Say what the text is mainly about, or why it was made.",
      "high": "Read the whole text before answering. A general question is marked on whether you caught the point of the piece, not on how many details you listed." },

    { "id": "detail", "en": "One specific piece of information",
      "sections": ["s1a", "s1b", "s2a"],
      "criterion": "the capacity to understand and convey specific aspects of texts",
      "asks": "Find one stated fact and report it exactly.",
      "high": "Answer with the detail itself, not the sentence around it. Give every part the question asks for: a time, a number, a place and a reason are four marks, not one." },

    { "id": "infer", "en": "Something the text implies",
      "sections": ["s1a", "s2a"],
      "criterion": "the capacity to understand and convey general and specific aspects of texts",
      "asks": "Work out something the text does not say outright.",
      "high": "Name the evidence you reasoned from. An inference with nothing behind it reads as a guess, and a guess scores nothing even when it is right." },

    { "id": "gather", "en": "Information from more than one place",
      "sections": ["s2a"],
      "criterion": "the capacity to understand and convey general and specific aspects of texts",
      "asks": "Pull together points that sit in different parts of the text, or in two texts.",
      "high": "Check every source before you write. This is where marks go missing: the first half of the answer is found, the second half is in the paragraph nobody went back to." },

    { "id": "convey_en", "en": "Saying it clearly in English",
      "sections": ["s1a", "s2a"],
      "criterion": "the capacity to understand and convey general and specific aspects of texts",
      "asks": "Turn what you understood into an answer a marker can read.",
      "high": "Write in English, in full. A list of Japanese words copied out of the text does not show you understood them." },

    { "id": "convey_ja", "en": "Saying it accurately in Japanese",
      "sections": ["s1b", "s2b"],
      "criterion": "the capacity to convey information and opinions accurately and appropriately",
      "asks": "Give the answer in Japanese that is both right and correct.",
      "high": "Content and language are marked together here, so a right idea in broken Japanese loses twice. Keep sentences short enough to get the particles and the endings right." },

    { "id": "texttype", "en": "The text type asked for",
      "sections": ["s2b", "s3"],
      "criterion": "the capacity to convey information and opinions accurately and appropriately",
      "asks": "Write the form named in the task, for the audience named in the task.",
      "high": "A speech is not an essay with a greeting on the front. Open and close the way that form opens and closes, and address the reader the task gave you." },

    { "id": "stimulus", "en": "Using what you were given",
      "sections": ["s2b"],
      "criterion": "the capacity to understand general and specific aspects of texts",
      "asks": "Build the response out of the text and the picture in front of you.",
      "high": "Select from the stimulus rather than copying it, and rather than ignoring it. A response that could have been written without reading the text scores badly however good the Japanese." },

    { "id": "relevance", "en": "Answering the task that was set",
      "sections": ["s3"],
      "criterion": "the capacity to demonstrate relevance, breadth and depth of content",
      "asks": "Address every part of the question you chose.",
      "high": "Underline what the task asks for before you start, and check it off at the end. A prepared piece bent towards the question is the commonest way to lose a whole band." },

    { "id": "depth", "en": "Developing the point",
      "sections": ["s3"],
      "criterion": "the capacity to demonstrate relevance, breadth and depth of content",
      "asks": "Take an idea further than naming it.",
      "high": "Give a reason, an example or a consequence for each point. Three ideas developed beat eight ideas listed." },

    { "id": "accuracy", "en": "Getting the ordinary things right",
      "sections": ["s1b", "s2b", "s3"],
      "criterion": "the capacity to demonstrate accuracy, range and appropriateness of vocabulary and grammar",
      "asks": "Write Japanese that holds together.",
      "high": "Verb endings, adjective endings and particles. These carry more marks than any rare word, and a wrong particle can change who did what to whom." },

    { "id": "range", "en": "Showing what you can do",
      "sections": ["s3"],
      "criterion": "the capacity to demonstrate accuracy, range and appropriateness of vocabulary and grammar",
      "asks": "Use more than one structure, and more than one way of joining ideas.",
      "high": "Vary your sentence patterns and your connectives. Then write the kanji you know: kana where the kanji is expected gives away marks for nothing." }
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
          "high": "Give the whole time expression. A 'when' answer can need a general time and a specific one, and half of it scores half.",
          "report": "Some students omitted the reference to 'during the summer'. Although the meaning was generally understood, some may not have recognised that 'when' can relate to both specific and general time expressions."
        },
        {
          "sec": "s1a",
          "q": "1b",
          "marks": 2,
          "skill": "detail",
          "asks": "Say why walking at that time of day is better.",
          "high": "Carry the small words across. A missing 'very' changes the claim, and two kanji that look alike are not the same word.",
          "report": "Some students omitted the word 'very' in their responses. A number of students also confused 道 (streets) with 町 (town)."
        },
        {
          "sec": "s1a",
          "q": "1c",
          "marks": 3,
          "skill": "detail",
          "asks": "Outline the benefits of joining the group.",
          "high": "Three marks means three benefits. Name each one fully rather than gesturing at it.",
          "report": "Most students handled this question well. However, some did not fully convey the idea of 'places you have never been before'."
        },
        {
          "sec": "s1a",
          "q": "1d",
          "marks": 3,
          "skill": "detail",
          "asks": "Say what advice is given to participants.",
          "high": "Translate the advice, do not generalise it. 'Comfortable shoes' is not what 歩きやすいくつ says.",
          "report": "Some students provided general responses such as 'comfortable shoes' or 'walking shoes' rather than directly conveying the meaning of 歩きやすいくつ."
        },
        {
          "sec": "s1b",
          "q": "2a",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Explain, in Japanese, why Hiroshi recommends the amusement park.",
          "high": "Write the kanji the course expects. The reasons are joined with し, so use it rather than listing three separate sentences.",
          "report": "Students are reminded to use the expected kanji in Japanese responses."
        },
        {
          "sec": "s1b",
          "q": "2b",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese why the cycle monorail was fun.",
          "high": "Listen for the word, not the shape of it. はじめて and はじめに are one kana apart and mean different things.",
          "report": "A common error was confusing はじめて (for the first time) with はじめに (first), which led to inaccurate responses."
        },
        {
          "sec": "s1b",
          "q": "2c",
          "marks": 3,
          "skill": "convey_ja",
          "asks": "Describe in Japanese the safety measures on the cycle monorail.",
          "high": "Get the verb forms right. A rule needs なければなりません, and the spelling has to hold up.",
          "report": "A noticeable number had difficulty with the conjugated form of はしる (to run/move) and しなければならない (must wear), and spelling errors were common."
        },
        {
          "sec": "s1b",
          "q": "2d",
          "marks": 2,
          "skill": "convey_ja",
          "asks": "Say in Japanese what else became a good memory for Hiroshi.",
          "high": "Keep the particle that carries the meaning. 友だちと is 'with a friend'; another particle makes it someone else's memory.",
          "report": "友だちと (with my friend) was often overlooked or an incorrect particle was used, which changed the intended meaning."
        },
        {
          "sec": "s2a",
          "q": "3a",
          "marks": 4,
          "skill": "gather",
          "asks": "Explain how living arrangements for elderly people have changed over fifty years.",
          "high": "A question about change needs both halves and the time markers that separate them. Say what it was, say what it is now.",
          "report": "A number of responses did not include the required time markers, which made the contrast unclear."
        },
        {
          "sec": "s2a",
          "q": "3b",
          "marks": 4,
          "skill": "detail",
          "asks": "Explain the problems elderly people face living alone.",
          "high": "Four marks, four problems. Read the kanji carefully: several here differ by one character.",
          "report": "Some students misread key terms such as 病気 (illness) or overlooked けが (injury), and some confused うんてん (driving) with うん動 (exercise)."
        },
        {
          "sec": "s2a",
          "q": "3c",
          "marks": 3,
          "skill": "detail",
          "asks": "Say why Miku decided to move into Take-san's house.",
          "high": "Name the thing precisely. The room is cheap, not 'it' is cheap.",
          "report": "There were responses that simply stated that 'it is cheap' without specifying へや (room)."
        },
        {
          "sec": "s2a",
          "q": "3d",
          "marks": 3,
          "skill": "detail",
          "asks": "Outline the difficulties Miku has living with an elderly person.",
          "high": "Give the whole condition. Both halves of a contrast count, and a dropped 'at night' loses the mark.",
          "report": "Many responses lacked the level of detail required. Some students did not convey that both the waking and sleeping times were different, and 'at night' was omitted."
        },
        {
          "sec": "s2a",
          "q": "3e",
          "marks": 6,
          "skill": "gather",
          "asks": "Say what each generation has learnt from the other, using the article and the interview.",
          "high": "Two sources and two lists. Sort each point into the right column before you write: the marks go on who learnt what from whom.",
          "report": "Some responses showed confusion about who learnt what from whom, with certain details placed under the wrong section."
        },
        {
          "sec": "s2b",
          "q": "4",
          "marks": 15,
          "skill": "texttype",
          "asks": "Write a persuasive email to your teacher arguing for the wagashi workshop, using the blog post and the photograph.",
          "high": "Persuade, do not report. Use the picture as well as the text, and put it in your own words rather than copying the stimulus.",
          "report": "Low-scoring responses tended to be more informative than persuasive ... showed limited understanding of the required content and often overlooked the image entirely ... included significant portions copied from the reading text without any modifications."
        },
        {
          "sec": "s3",
          "q": "5",
          "marks": 20,
          "skill": "relevance",
          "asks": "Write the script of an informative speech on how you used social media to promote your sports club.",
          "high": "Answer the task, not the topic. Say what you actually did to promote the club, with specific examples.",
          "report": "Many responses tended to be general descriptions of social media ... High-scoring responses addressed the task directly, explaining what the media coordinator had actually done."
        },
        {
          "sec": "s3",
          "q": "6",
          "marks": 20,
          "skill": "depth",
          "asks": "Write a journal entry on the skills you learnt in a part-time job and how they will help you.",
          "high": "Reflect, do not describe. Name a skill, give an example of it, and say where it will be useful next.",
          "report": "Some responses described the workplace or the job itself ... High-scoring responses identified skills gained from part-time work, supported by relevant examples ... explained how these skills would be transferable."
        },
        {
          "sec": "s3",
          "q": "7",
          "marks": 20,
          "skill": "depth",
          "asks": "Write a report evaluating the good and bad points of an airline's first flight.",
          "high": "Evaluate a few things properly rather than listing many. Keep the viewpoint the task gave you.",
          "report": "High-scoring responses developed a balanced and well-reasoned assessment, selecting a few key aspects and exploring them in sufficient depth rather than listing multiple superficial ideas."
        },
        {
          "sec": "s3",
          "q": "8",
          "marks": 20,
          "skill": "texttype",
          "asks": "Write an imaginative story for children about the surprise you had.",
          "high": "Tell a story. A children's story needs a setting, something that happens and an ending, not a sequence of actions.",
          "report": "Responses often read more as an explanatory sequence of actions than as an engaging children's story."
        }
      ]
    }
  ]
};
