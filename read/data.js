/* ==========================================================================
   すらすら · reading speed — the data.
   Andrew edits THIS file. index.html never needs touching to add a sign or a
   word. Three lists:
     KANA   every character and its sound, lifted from the trip app's proven
            table so the two apps can never disagree about a reading.
     NEAR   which characters get taken for which. This is the heart of the
            tool: the four options a student is offered are the confusions
            that actually happen, not four characters picked at random.
     SIGNS / WORDS  real things to read, so the practice is never abstract.
   ========================================================================== */

/* ---- 1. the characters ---------------------------------------------------
   set: "base" the 46, "ten" voiced and half-voiced, "yoon" the small-ya sets
   and the borrowed sounds katakana adds. Students choose which sets are in
   play, so a Year 7 in term one meets only the 46 and a Year 10 meets the lot.
   Nothing is locked: the sets are a scope control, not a level gate. */
window.KANA = (function () {
  var rows = {
    base:
      "あa いi うu えe おo かka きki くku けke こko さsa しshi すsu せse そso " +
      "たta ちchi つtsu てte とto なna にni ぬnu ねne のno はha ひhi ふfu へhe ほho " +
      "まma みmi むmu めme もmo やya ゆyu よyo らra りri るru れre ろro わwa をo んn|" +
      "アa イi ウu エe オo カka キki クku ケke コko サsa シshi スsu セse ソso " +
      "タta チchi ツtsu テte トto ナna ニni ヌnu ネne ノno ハha ヒhi フfu ヘhe ホho " +
      "マma ミmi ムmu メme モmo ヤya ユyu ヨyo ラra リri ルru レre ロro ワwa ヲo ンn",
    ten:
      "がga ぎgi ぐgu げge ごgo ざza じji ずzu ぜze ぞzo だda ぢji づzu でde どdo " +
      "ばba びbi ぶbu べbe ぼbo ぱpa ぴpi ぷpu ぺpe ぽpo|" +
      "ガga ギgi グgu ゲge ゴgo ザza ジji ズzu ゼze ゾzo ダda ヂji ヅzu デde ドdo " +
      "バba ビbi ブbu ベbe ボbo パpa ピpi プpu ペpe ポpo",
    yoon:
      "きゃkya きゅkyu きょkyo しゃsha しゅshu しょsho ちゃcha ちゅchu ちょcho " +
      "にゃnya にゅnyu にょnyo ひゃhya ひゅhyu ひょhyo みゃmya みゅmyu みょmyo " +
      "りゃrya りゅryu りょryo ぎゃgya ぎゅgyu ぎょgyo じゃja じゅju じょjo " +
      "びゃbya びゅbyu びょbyo ぴゃpya ぴゅpyu ぴょpyo|" +
      "キャkya キュkyu キョkyo シャsha シュshu ショsho チャcha チュchu チョcho " +
      "ニャnya ニュnyu ニョnyo ヒャhya ヒュhyu ヒョhyo ミャmya ミュmyu ミョmyo " +
      "リャrya リュryu リョryo ギャgya ギュgyu ギョgyo ジャja ジュju ジョjo " +
      "ビャbya ビュbyu ビョbyo ピャpya ピュpyu ピョpyo " +
      "ファfa フィfi フェfe フォfo ウィwi ウェwe ティti ディdi チェche シェshe ジェje"
  };
  var out = [];
  Object.keys(rows).forEach(function (set) {
    rows[set].split("|").forEach(function (half, i) {
      half.trim().split(/\s+/).forEach(function (tok) {
        var m = tok.match(/^([぀-ヿ]+)([a-z]+)$/);
        if (m) out.push({ ch: m[1], read: m[2], set: set, script: i ? "kata" : "hira" });
      });
    });
  });
  return out;
})();

/* ---- 2. what gets taken for what ----------------------------------------
   Every group is a set of characters students genuinely mix up, either
   because the shapes are close or because the sound is. Offering these as
   the wrong answers is what turns a guessing game into discrimination
   practice, and it is what lets the end of a round say something useful:
   "you read れ as ね twice" rather than "18 correct".
   Andrew: add a group by writing the characters in a string. Order does not
   matter and a character may appear in more than one group. */
window.NEAR = [
  /* hiragana, shape */
  "さきち", "ねれわ", "るろ", "はほ", "まも", "いり", "こに", "すむ", "たな",
  "ぬめ", "けは", "ゆわ", "そて", "うつ", "のめ", "しつ", "とも", "くへ",
  /* katakana, shape. The first two are the classic pair every student meets. */
  "シツ", "ソン", "クタケ", "アマ", "コユ", "スヌ", "ウワ", "ノメ", "チテ",
  "サナ", "ミツ", "ロコ", "レノ", "エユ", "ハヘ", "モヨ",
  /* across the scripts, where the shapes rhyme */
  "りリ", "かカ", "せセ", "へヘ", "もモ", "ぺペ", "しレノ",
  /* voiced against plain, where the sound is the confusion, not the shape */
  "ただ", "かが", "しじ", "つづ", "はばぱ", "ひびぴ", "ふぶぷ", "へべぺ", "ほぼぽ",
  /* The small-ya sets, where the trap is the second character. A group whose
     members are more than one character long is written with spaces between
     them; everything else is read character by character. */
  "きゃ きゅ きょ", "しゃ しゅ しょ", "ちゃ ちゅ ちょ", "じゃ じゅ じょ",
  "シャ シュ ショ", "チャ チュ チョ", "ジャ ジュ ジョ"
];

/* ---- 3. signs -----------------------------------------------------------
   Real signage, written the way it is actually written. Where a sign is
   normally kanji the kana reading is what a student sounds out first, and
   that is the skill this mode trains: get the sound, then the meaning.
   `kanji` is shown in the answer, never in the question. `kind` is what the
   sign looks like in the street, and the mode paints the plate to match:
   station yellow, green for the running-man exit, warn for red and yellow
   hazards, plate for a white door sign, shop for everything on a shopfront.
   A sign with no kind gets the plain plate. */
window.SIGNS = [
  { ja: "でぐち",       kanji: "出口",   en: "Way out", kind: "station" },
  { ja: "いりぐち",     kanji: "入口",   en: "Way in", kind: "station" },
  { ja: "のりば",       kanji: "乗り場", en: "Boarding point", kind: "station" },
  { ja: "かいさつ",     kanji: "改札",   en: "Ticket gate", kind: "station" },
  { ja: "きっぷ",       kanji: "切符",   en: "Ticket", kind: "station" },
  { ja: "ひじょうぐち", kanji: "非常口", en: "Emergency exit", kind: "green" },
  { ja: "おてあらい",   kanji: "お手洗い", en: "Toilets", kind: "plate" },
  { ja: "おとな",       kanji: "大人",   en: "Adult", kind: "shop" },
  { ja: "こども",       kanji: "子供",   en: "Child", kind: "shop" },
  { ja: "おす",         kanji: "押す",   en: "Push", kind: "plate" },
  { ja: "ひく",         kanji: "引く",   en: "Pull", kind: "plate" },
  { ja: "あき",         kanji: "空き",   en: "Vacant", kind: "plate" },
  { ja: "しようちゅう", kanji: "使用中", en: "Occupied", kind: "plate" },
  { ja: "えいぎょうちゅう", kanji: "営業中", en: "Open for business", kind: "shop" },
  { ja: "じゅんびちゅう", kanji: "準備中", en: "Not open yet", kind: "shop" },
  { ja: "きけん",       kanji: "危険",   en: "Danger", kind: "warn" },
  { ja: "ちゅうい",     kanji: "注意",   en: "Caution", kind: "warn" },
  { ja: "むりょう",     kanji: "無料",   en: "Free", kind: "shop" },
  { ja: "げんかん",     kanji: "玄関",   en: "Where shoes come off", kind: "plate" },
  { ja: "ほけんしつ",   kanji: "保健室", en: "Sick bay", kind: "plate" },
  { ja: "としょしつ",   kanji: "図書室", en: "Library", kind: "plate" },
  { ja: "きょうしつ",   kanji: "教室",   en: "Classroom", kind: "plate" },
  { ja: "ゆき",         kanji: "行き",   en: "Bound for", kind: "station" },
  { ja: "とまれ",       kanji: "止まれ", en: "Stop", kind: "warn" },
  { ja: "みぎ",         kanji: "右",     en: "Right", kind: "station" },
  { ja: "ひだり",       kanji: "左",     en: "Left", kind: "station" },
  /* katakana signage: loanwords are where katakana earns its keep */
  { ja: "トイレ",       en: "Toilet", kind: "plate" },
  { ja: "ホーム",       en: "Platform", kind: "station" },
  { ja: "バス",         en: "Bus", kind: "station" },
  { ja: "タクシー",     en: "Taxi", kind: "station" },
  { ja: "コンビニ",     en: "Convenience store", kind: "shop" },
  { ja: "エレベーター", en: "Lift", kind: "plate" },
  { ja: "レストラン",   en: "Restaurant", kind: "shop" },
  { ja: "ホテル",       en: "Hotel", kind: "shop" },
  { ja: "チケット",     en: "Ticket", kind: "shop" },
  { ja: "カード",       en: "Card", kind: "shop" },
  { ja: "コーヒー",     en: "Coffee", kind: "shop" },
  { ja: "サービス",     en: "Service", kind: "shop" }
];

/* ---- 4. words to build --------------------------------------------------
   Short, real, and mostly things the student will say or see on the tour.
   Kept to five characters or fewer: the mode is about assembling a sound,
   not about memorising a long word. */
window.WORDS = [
  { ja: "ねこ", en: "cat" },            { ja: "いぬ", en: "dog" },
  { ja: "みず", en: "water" },          { ja: "おちゃ", en: "tea" },
  { ja: "でんしゃ", en: "train" },      { ja: "がっこう", en: "school" },
  { ja: "せんせい", en: "teacher" },    { ja: "ともだち", en: "friend" },
  { ja: "たべもの", en: "food" },       { ja: "さかな", en: "fish" },
  { ja: "やさい", en: "vegetables" },   { ja: "くだもの", en: "fruit" },
  { ja: "あさごはん", en: "breakfast" },{ ja: "おふろ", en: "the bath" },
  { ja: "えき", en: "station" },        { ja: "きょう", en: "today" },
  { ja: "あした", en: "tomorrow" },     { ja: "なつ", en: "summer" },
  { ja: "ふゆ", en: "winter" },         { ja: "やま", en: "mountain" },
  { ja: "うみ", en: "sea" },            { ja: "そら", en: "sky" },
  { ja: "てがみ", en: "letter" },       { ja: "しゃしん", en: "photo" },
  { ja: "おみやげ", en: "souvenir" },   { ja: "かばん", en: "bag" },
  { ja: "くつ", en: "shoes" },          { ja: "ゆかた", en: "yukata" },
  { ja: "パン", en: "bread" },          { ja: "ペン", en: "pen" },
  { ja: "テレビ", en: "TV" },           { ja: "カメラ", en: "camera" },
  { ja: "ジュース", en: "juice" },      { ja: "ケーキ", en: "cake" },
  { ja: "スポーツ", en: "sport" },      { ja: "ゲーム", en: "game" },
  { ja: "シャワー", en: "shower" },     { ja: "チョコ", en: "chocolate" },
  { ja: "オーストラリア", en: "Australia" }, { ja: "メルボルン", en: "Melbourne" }
];
