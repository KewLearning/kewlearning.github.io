/* ============================================================================
   readings.js — the words the device voice says wrongly, and nothing else.
   ----------------------------------------------------------------------------
   A Japanese voice on a phone reads kanji using its own dictionary, and it is
   right nearly all of the time. Where it is wrong it is badly wrong, because a
   kanji compound has more than one reading and it picks the other one: 何年
   came out as なんとし rather than なんねん.

   The fix is NOT to hand the voice kana for everything. A Japanese voice is
   built to read kanji, and that is where it gets its pitch accent and its
   phrasing from; feed it kana only and the readings come out right but the
   intonation goes flat. So the app speaks the ordinary written form and swaps
   in a reading only for the handful of words below.

   は and へ are NOT in this list. A particle は is said わ, and the app works
   out which は is the particle from Andrew's own phrase spacing: a は that ends
   a spaced phrase is the particle, and ではなく is the one shape where it sits
   inside one. That rule is in index.html and it was checked against a
   morphological analyser over every line in this app. A word that ends in は
   and is NOT a particle goes in not_particle at the foot of this file.

   tools/check-readings.py re-runs both checks over whatever is in the data now.

   To add one: hear a word read wrongly, add a line here, nothing else. `ja` is
   the word exactly as it appears in the data WITHOUT its furigana brackets and
   WITHOUT the spaces, because the spoken form has both of those removed before
   this list is applied. Longest entries are applied first, so 何年生 can differ
   from 何年.

   `why` is for the next person reading this file, and is never spoken.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.ORAL_READINGS = {
  "schema_version": 1,
  "overrides": [
    {
      "ja": "何年生",
      "say": "なんねんせい",
      "why": "Kept beside 何年 so the longer word is matched first."
    },
    {
      "ja": "何年",
      "say": "なんねん",
      "why": "Heard as なんとし on a phone. 年 is ねん in a counting question."
    },
    {
      "ja": "一日中",
      "say": "いちにちじゅう",
      "why": "Kept beside 一日 so the longer word is matched first; without it the override cut this one in half."
    },
    {
      "ja": "一日",
      "say": "いちにち",
      "why": "ついたち is the first of the month, which is not what is meant here."
    },
    {
      "ja": "人気",
      "say": "にんき",
      "why": "ひとけ means a sign of anyone being about, which is the other reading."
    },
    {
      "ja": "山火事",
      "say": "やまかじ",
      "why": "さんかじ is the on reading and is not the word."
    },
    {
      "ja": "勉強した年",
      "say": "べんきょうしたとし",
      "why": "年 standing alone after a verb is とし, not ねん."
    },
    {
      "ja": "十年の間",
      "say": "じゅうねんのあいだ",
      "why": "間 on its own is あいだ; かん only works as part of a counter."
    },
    {
      "ja": "大好き",
      "say": "だいすき",
      "why": "おおすき is a common wrong guess."
    },
    {
      "ja": "何時",
      "say": "なんじ",
      "why": "いつ is the other reading of these two characters and an engine can take either."
    },
    {
      "ja": "四時間",
      "say": "よじかん",
      "why": "四 before a counter is よ here, and しじかん is the wrong one."
    },
    {
      "ja": "三十分",
      "say": "さんじゅっぷん",
      "why": "分 is ぷん after 十, not ふん, and not じゅうぶん."
    },
    {
      "ja": "三百年",
      "say": "さんびゃくねん",
      "why": "百 voices after 三 and the unvoiced さんひゃく is wrong."
    },
    {
      "ja": "十才",
      "say": "じゅっさい",
      "why": "Matches the reading on the worksheets; じゅうさい is the other way of saying it."
    },
    {
      "ja": "私",
      "say": "わたし",
      "why": "わたくし is the formal reading and is not what a Year 12 says."
    }
  ],
  "not_particle": []
};
