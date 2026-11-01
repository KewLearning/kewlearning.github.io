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

   papers   One entry per real paper, with its questions. EMPTY until the
            VCAA papers and examiner's reports 2020-2025 are in the repo.
            Nothing here is invented: a question's "asks" and "high" lines
            have to come off the paper and its report, so until those arrive
            the app runs in the mode where the student types the question
            numbers in themselves and the advice comes from the skill level
            rather than the question level.

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

  "papers": []
};
