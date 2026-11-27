/* data/jlpt.js — a JLPT level for each of Andrew's 200, as a FILTER.
   ---------------------------------------------------------------------------
   READ THIS BEFORE TRUSTING A LEVEL. The JLPT has published no official
   kanji list since the 2010 revision. Every N5 to N1 list in circulation
   is a community reconstruction, and they do not agree with each other.

   Two were cross-checked here, the same way data/levels.js was built:
   the npm package kanji-data 1.1.0 and the npm package kanji 0.19.3.
   On Andrew's 200 they agree on 165 and DISAGREE ON 33, which is about one
   in six, and they disagree in one direction: the second list puts a kanji
   an easier level than the first about as often as not. 耳, 手, 新, 買 and
   飲 are among them.

   So this file is good enough to say "show me roughly the easier kanji"
   and not good enough to tell a student "this kanji is N4". The app uses
   it as a filter and says on screen that the lists are unofficial. It does
   not stamp a level on an individual kanji anywhere a student would read
   it as a fact.

   Where the two differ, kanji-data wins, because it is the package that
   already supplies the school-year data in levels.js and one lineage is
   easier to re-check than two. 々 carries no level in either list.
   々 is the repeat sign and not a kanji.

   One window. line, then pure JSON. No comments inside the object.     */

window.KANJI_JLPT = {
 "schema_version": 1,
 "source": "kanji-data 1.1.0 cross-checked against kanji 0.19.3; they disagree on 33 of 198, and kanji-data is used where they do",
 "caution": "JLPT publishes no official kanji list. These levels are a community reconstruction and other lists differ. Use them to pick a rough difficulty, not to tell a student a kanji's level.",
 "spread": {
  "N2": 5,
  "N3": 19,
  "N4": 95,
  "N5": 80
 },
 "disagreed": {
  "回": [
   "N3",
   "N4"
  ],
  "週": [
   "N4",
   "N5"
  ],
  "目": [
   "N4",
   "N5"
  ],
  "口": [
   "N4",
   "N5"
  ],
  "耳": [
   "N3",
   "N5"
  ],
  "手": [
   "N4",
   "N5"
  ],
  "好": [
   "N3",
   "N4"
  ],
  "安": [
   "N4",
   "N5"
  ],
  "新": [
   "N4",
   "N5"
  ],
  "古": [
   "N4",
   "N5"
  ],
  "多": [
   "N4",
   "N5"
  ],
  "少": [
   "N4",
   "N5"
  ],
  "言": [
   "N4",
   "N5"
  ],
  "買": [
   "N4",
   "N5"
  ],
  "飲": [
   "N4",
   "N5"
  ],
  "会": [
   "N4",
   "N5"
  ],
  "乗": [
   "N3",
   "N4"
  ],
  "働": [
   "N3",
   "N4"
  ],
  "洗": [
   "N3",
   "N4"
  ],
  "立": [
   "N4",
   "N5"
  ],
  "島": [
   "N2",
   "N3"
  ],
  "花": [
   "N4",
   "N5"
  ],
  "魚": [
   "N4",
   "N5"
  ],
  "都": [
   "N3",
   "N4"
  ],
  "市": [
   "N3",
   "N4"
  ],
  "県": [
   "N2",
   "N4"
  ],
  "州": [
   "N2",
   "N3"
  ],
  "寺": [
   "N2",
   "N3"
  ],
  "駅": [
   "N4",
   "N5"
  ],
  "店": [
   "N4",
   "N5"
  ],
  "道": [
   "N4",
   "N5"
  ],
  "社": [
   "N4",
   "N5"
  ],
  "所": [
   "N3",
   "N4"
  ]
 },
 "level": {
  "一": "N5",
  "二": "N5",
  "三": "N5",
  "四": "N5",
  "五": "N5",
  "六": "N5",
  "七": "N5",
  "八": "N5",
  "九": "N5",
  "十": "N5",
  "百": "N5",
  "千": "N5",
  "万": "N5",
  "本": "N5",
  "人": "N5",
  "回": "N3",
  "才": "N3",
  "円": "N5",
  "番": "N3",
  "春": "N4",
  "夏": "N4",
  "秋": "N4",
  "冬": "N4",
  "日": "N5",
  "月": "N5",
  "火": "N5",
  "水": "N5",
  "木": "N5",
  "金": "N5",
  "土": "N5",
  "曜": "N4",
  "年": "N5",
  "時": "N5",
  "分": "N5",
  "夕": "N4",
  "半": "N5",
  "午": "N5",
  "毎": "N5",
  "週": "N4",
  "間": "N5",
  "今": "N5",
  "先": "N5",
  "朝": "N4",
  "晩": "N3",
  "昼": "N4",
  "夜": "N4",
  "去": "N4",
  "目": "N4",
  "口": "N4",
  "耳": "N3",
  "手": "N4",
  "体": "N4",
  "上": "N5",
  "中": "N5",
  "下": "N5",
  "右": "N5",
  "左": "N5",
  "前": "N5",
  "後": "N5",
  "東": "N5",
  "西": "N5",
  "南": "N5",
  "北": "N5",
  "外": "N5",
  "学": "N5",
  "校": "N5",
  "英": "N4",
  "語": "N5",
  "文": "N4",
  "漢": "N4",
  "字": "N4",
  "勉": "N4",
  "強": "N4",
  "父": "N5",
  "母": "N5",
  "子": "N5",
  "家": "N4",
  "族": "N4",
  "兄": "N4",
  "弟": "N4",
  "姉": "N4",
  "妹": "N4",
  "友": "N5",
  "私": "N4",
  "男": "N5",
  "女": "N5",
  "大": "N5",
  "小": "N5",
  "好": "N3",
  "安": "N4",
  "高": "N5",
  "新": "N4",
  "古": "N4",
  "多": "N4",
  "少": "N4",
  "楽": "N4",
  "長": "N5",
  "近": "N4",
  "正": "N4",
  "広": "N4",
  "早": "N4",
  "明": "N4",
  "行": "N5",
  "来": "N5",
  "休": "N5",
  "出": "N5",
  "入": "N5",
  "生": "N5",
  "見": "N5",
  "思": "N4",
  "書": "N5",
  "言": "N4",
  "話": "N5",
  "読": "N5",
  "売": "N4",
  "買": "N4",
  "食": "N5",
  "飲": "N4",
  "知": "N4",
  "作": "N4",
  "住": "N4",
  "会": "N4",
  "使": "N4",
  "着": "N4",
  "発": "N4",
  "聞": "N5",
  "帰": "N4",
  "持": "N4",
  "待": "N4",
  "教": "N4",
  "乗": "N3",
  "働": "N3",
  "動": "N4",
  "歩": "N4",
  "終": "N4",
  "始": "N4",
  "泊": "N2",
  "洗": "N3",
  "立": "N4",
  "考": "N4",
  "習": "N4",
  "山": "N5",
  "川": "N5",
  "田": "N4",
  "島": "N2",
  "花": "N4",
  "海": "N4",
  "天": "N5",
  "雨": "N5",
  "雪": "N3",
  "牛": "N4",
  "魚": "N4",
  "馬": "N3",
  "犬": "N4",
  "京": "N4",
  "都": "N3",
  "市": "N3",
  "県": "N2",
  "州": "N2",
  "国": "N5",
  "町": "N4",
  "神": "N3",
  "寺": "N2",
  "駅": "N4",
  "店": "N4",
  "電": "N5",
  "車": "N5",
  "道": "N4",
  "旅": "N4",
  "赤": "N4",
  "青": "N4",
  "白": "N5",
  "黒": "N4",
  "色": "N4",
  "銀": "N4",
  "何": "N5",
  "紙": "N4",
  "元": "N4",
  "気": "N5",
  "活": "N3",
  "社": "N4",
  "自": "N4",
  "物": "N4",
  "名": "N5",
  "方": "N4",
  "院": "N4",
  "所": "N3",
  "屋": "N4",
  "肉": "N4",
  "場": "N4",
  "飯": "N4",
  "洋": "N4",
  "和": "N3",
  "病": "N4",
  "次": "N3",
  "同": "N4",
  "仕": "N4",
  "事": "N4",
  "点": "N3"
 }
};
