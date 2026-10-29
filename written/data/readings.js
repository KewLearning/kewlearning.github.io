/* ============================================================================
   readings.js — the words the voice says wrongly, and nothing else.
   ----------------------------------------------------------------------------
   Only the listening texts in texts.js get recorded, so this list only has to
   cover them. It is short on purpose. A Japanese voice is built to read
   kanji, and that is where its pitch accent comes from; hand it kana for
   everything and the readings come out right while the intonation goes flat.
   So the recorder speaks the ordinary written form and swaps in a reading
   only for the words below.

   は and へ are NOT in this list. A particle は is said わ, and the rule that
   works out which は is the particle is Andrew's own phrase spacing: a は that
   ends a spaced phrase is the particle. That rule lives in index.html, in
   tools/make-audio.py and in tools/validate.js, and tools/check-readings.py
   compares it against a morphological analyser over every recorded line. A
   word that ends in は and is NOT a particle goes in not_particle below.

   To add one: hear a word read wrongly, add a line here, nothing else. `ja`
   is the word exactly as it appears in the data WITHOUT its furigana brackets
   and WITHOUT the spaces, because the spoken form has both of those removed
   before this list is applied. Longest entries are applied first.

   `why` is for the next person reading this file, and is never spoken.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.HIKKI_READINGS = {
  "schema_version": 1,
  "overrides": [
    {
      "ja": "私",
      "say": "わたし",
      "why": "Read わたくし by an engine often enough to be worth the line. Carried over from the oral app's list, where it was heard."
    },
    {
      "ja": "何か",
      "say": "なにか",
      "why": "何 goes なん in most compounds, and an engine that has learnt that says なんか here."
    },
    {
      "ja": "何を",
      "say": "なにを",
      "why": "Same family as 何か. The oral app heard 何年 come out as なんとし, which is the same engine guessing at 何."
    }
  ],
  "not_particle": []
};
