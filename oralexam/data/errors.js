/* ============================================================================
   errors.js — what the assessors keep marking down, and the drills built on it.
   ----------------------------------------------------------------------------
   Nineteen faults, every one of them named in the VCE Japanese Second Language
   oral examination reports between 2020 and 2025, with the years it appeared in
   and the report's own wording. `count` is how many of the six years named it.

   `report_quotes` is the report's wording, kanji and all. It is evidence for
   the teacher, not a line for a student to read aloud, so the prescribed-kanji
   rule does not apply to it. `wrong`, `right` and every drill sentence are
   written here and do follow the rule, with readings as 漢字[かんじ].

   Five drills: spot, extend, upgrade, repair and shadow. The sixth thing the
   app does with this file, weak-spot review, is not a drill of its own — it
   re-serves items from these five by error_id, based on what the student got
   wrong before.

   The object below is pure JSON. The single `window.` line is the only
   JavaScript in the file.
   ========================================================================== */

window.ORAL_ERRORS = {
  "schema_version": 1,
  "errors": [
    {
      "id": "err-question-words",
      "name": "Question words",
      "section": "conversation",
      "what_goes_wrong": "The answer does not match the question. The VCAA oral exam reports are clear that this comes from not catching the question word, not from weak Japanese. Named in all six VCAA oral exam reports, more than any other single fault.",
      "wrong": "Q: 週[しゅう]に 何回[なんかい] アルバイトを しますか。 A: スーパーで します。",
      "right": "Q: 週[しゅう]に 何回[なんかい] アルバイトを しますか。 A: 週[しゅう]に 二回[にかい] します。",
      "why": "何回 asks how many times, not where. Listen for the question word first and answer that, even if you then add more.",
      "years": [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
      ],
      "count": 6,
      "report_quotes": [
        "2025: Many students did not recognise key question words including いつ、いつから、いつごろ、いつごろから、どこ、だれ、何、どんな、何時間ぐらい、何回ぐらい and 何年間ぐらい, resulting in mismatched responses.",
        "2022: Some students misunderstood the question アルバイトのお金を何に使いたいですか, misinterpreting it as asking what the hourly rate was."
      ]
    },
    {
      "id": "err-vocab-gap",
      "name": "Vocabulary gaps",
      "section": "conversation",
      "what_goes_wrong": "The conversation stops because one word is missing. The VCAA oral exam reports name the same words again and again: がっき、きょく、読書、作家、じきゅう、なかがいい、お客さん、料理、兄弟.",
      "wrong": "Q: がっきが できますか。 A: ……すみません、わかりません。",
      "right": "Q: がっきが できますか。 A: はい、ピアノが できます。",
      "why": "These are ordinary words about an ordinary teenager's life. Build the list for your own world and your own subtopic, and learn them as words you can say, not words you can recognise.",
      "years": [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
      ],
      "count": 6,
      "report_quotes": [
        "2023: They did not know じきゅう、がっき、うんてんめんきょ、なかがいい、せんしゅ、読書、作家、じゅぎょう and 強い.",
        "2025: Unfamiliar vocabulary included むりょう、ただ、けんこう、運転する、お客さん and 料理."
      ]
    },
    {
      "id": "err-omou",
      "name": "と思います after a plain form",
      "section": "both",
      "what_goes_wrong": "だ is inserted before と思います after an adjective. The single most quoted grammar slip in the VCAA oral exam reports.",
      "wrong": "むずかしいだと 思[おも]います。",
      "right": "むずかしいと 思[おも]います。",
      "why": "An い-adjective and a plain verb take と思います directly. Only a noun and a な-adjective take だ: 先生だと思います、きれいだと思います.",
      "years": [
        2020,
        2023,
        2024,
        2025
      ],
      "count": 4,
      "report_quotes": [
        "2024: They said むずかしいだと思います instead of むずかしいと思います。",
        "2025: Students could revise the correct use of the structure 'I think'; for example, 先生だと思います and おいしいと思います。"
      ]
    },
    {
      "id": "err-adj-conj",
      "name": "Joining adjectives with くて",
      "section": "both",
      "what_goes_wrong": "Two い-adjectives joined with と instead of くて.",
      "wrong": "楽[たの]しいと おもしろいです。",
      "right": "楽[たの]しくて おもしろいです。",
      "why": "い-adjectives join with くて. な-adjectives join with で: しずかで きれいです.",
      "years": [
        2020,
        2021,
        2022,
        2023,
        2024
      ],
      "count": 5,
      "report_quotes": [
        "2023: Linking adjectives 楽しいとおもしろい instead of 楽しくておもしろい.",
        "2022: Some errors were noted in basic adjective agreements, especially when using くて to join い adjectives."
      ]
    },
    {
      "id": "err-adj-no",
      "name": "No の after an い-adjective",
      "section": "both",
      "what_goes_wrong": "の inserted between an い-adjective and the noun it describes.",
      "wrong": "おもしろいの 人[ひと]",
      "right": "おもしろい 人[ひと]",
      "why": "An い-adjective attaches straight to the noun. Only a な-adjective takes anything, and that is な, not の.",
      "years": [
        2024,
        2025
      ],
      "count": 2,
      "report_quotes": [
        "2024: Some students incorrectly added the particle の between an い-adjective and a noun: for example, おもしろいの人 instead of おもしろい人.",
        "2025: Many students used adjectives incorrectly, such as かわいいの人 instead of かわいい人, おもしろいのこと instead of おもしろいこと."
      ]
    },
    {
      "id": "err-na-adj",
      "name": "な-adjectives",
      "section": "both",
      "what_goes_wrong": "な dropped before a noun, or an い-adjective past ending used on a な-adjective.",
      "wrong": "きれい 着物[きもの]です。",
      "right": "きれいな 着物[きもの]です。",
      "why": "な-adjectives take な before a noun and でした in the past: きれいでした, not きれいかった.",
      "years": [
        2024,
        2025
      ],
      "count": 2,
      "report_quotes": [
        "2024: きれい着物です instead of きれいな着物です.",
        "2025: きれいかった instead of きれいでした."
      ]
    },
    {
      "id": "err-tense",
      "name": "Answering in the wrong tense",
      "section": "both",
      "what_goes_wrong": "The question is in the past and the answer comes back in the present, or the other way round.",
      "wrong": "二年[にねん]前[まえ]に 行[い]きます。",
      "right": "二年[にねん]前[まえ]に 行[い]きました。",
      "why": "Listen for the tense in the question and use the same one. 去年、前に、きのう all force the past.",
      "years": [
        2020,
        2021,
        2022,
        2023
      ],
      "count": 4,
      "report_quotes": [
        "2022: Students should listen carefully for the tense used in the question and respond accordingly. For example, they should use 二年前に行きました instead of 二年前に行きます."
      ]
    },
    {
      "id": "err-koto-ga-arimasu",
      "name": "〜たことがあります with a time word",
      "section": "both",
      "what_goes_wrong": "〜たことがあります used with a specific time, where it cannot go.",
      "wrong": "二年[にねん]前[まえ]に 行[い]ったことが あります。",
      "right": "二年[にねん]前[まえ]に 行[い]きました。",
      "why": "〜たことがあります means at some point in your life, so it cannot carry a specific time. Name the time and you need the plain past.",
      "years": [
        2020,
        2021
      ],
      "count": 2,
      "report_quotes": [
        "2021: Several students incorrectly used ～ことがあります. It should not be used with specific time words. 二年前に行ったことがあります is grammatically incorrect and the sentence should be 二年前に行きました."
      ]
    },
    {
      "id": "err-koto-ga-dekimasu",
      "name": "〜ことができます",
      "section": "both",
      "what_goes_wrong": "The potential form and ことができます used at the same time.",
      "wrong": "買[か]えることが できます。",
      "right": "買[か]うことが できます。",
      "why": "ことができます takes the plain dictionary form. Use one or the other: 買えます, or 買うことができます.",
      "years": [
        2022,
        2023
      ],
      "count": 2,
      "report_quotes": [
        "2022: 買えることができます instead of 買うことができます.",
        "2023: Common errors included the use of ことができます."
      ]
    },
    {
      "id": "err-te-form",
      "name": "The て form",
      "section": "both",
      "what_goes_wrong": "て forms built by rule from the wrong group.",
      "wrong": "聞[き]きて ください。",
      "right": "聞[き]いて ください。",
      "why": "く verbs go to いて: 聞く to 聞いて, 歩く to 歩いて. Only 行く breaks it: 行って.",
      "years": [
        2022,
        2024,
        2025
      ],
      "count": 3,
      "report_quotes": [
        "2022: the て form, for example 聞きて instead of 聞いて.",
        "2024: Students often confused the conjugation of い-adjectives with な-adjectives and the て form of verbs."
      ]
    },
    {
      "id": "err-tari",
      "name": "〜たり〜たり",
      "section": "both",
      "what_goes_wrong": "たり attached to the ます stem instead of the た form.",
      "wrong": "おんがくを ききたり します。",
      "right": "おんがくを 聞[き]いたり します。",
      "why": "たり goes on the た form: 聞いた to 聞いたり, 読んだ to 読んだり. Use two of them, then します.",
      "years": [
        2022,
        2025
      ],
      "count": 2,
      "report_quotes": [
        "2025: Sometimes the listing structure was not used accurately; for example, おんがくをききたり instead of おんがくをきいたり."
      ]
    },
    {
      "id": "err-particle",
      "name": "Particles",
      "section": "both",
      "what_goes_wrong": "に added where it is not wanted, and で and に confused.",
      "wrong": "しょうらいに 行[い]きます。",
      "right": "しょうらい 行[い]きます。",
      "why": "Relative time words take no に: しょうらい、きのう、らいねん、こんしゅう. Clock times and dates do: 七時に、月曜日に.",
      "years": [
        2021,
        2023,
        2024,
        2025
      ],
      "count": 4,
      "report_quotes": [
        "2023: 将来に行きます instead of 将来行きます.",
        "2025: The particle に was problematic for some students; for example, some used it after 昨日 when it is not required.",
        "2024: They should also focus on the correct use of particles, especially で and に."
      ]
    },
    {
      "id": "err-amari",
      "name": "あまり with a negative",
      "section": "both",
      "what_goes_wrong": "あまり used with a positive verb.",
      "wrong": "あまり 食[た]べます。",
      "right": "あまり 食[た]べません。",
      "why": "あまり needs the negative. It means not much, so the verb has to be negative too.",
      "years": [
        2025
      ],
      "count": 1,
      "report_quotes": [
        "2025: They could also revise the use of あまり with a negative verb; for example, あまり食べません。"
      ]
    },
    {
      "id": "err-collocation",
      "name": "The wrong verb with the noun",
      "section": "both",
      "what_goes_wrong": "A verb that does not go with its noun.",
      "wrong": "ケーキを 使[つか]います。",
      "right": "ケーキを 作[つく]ります。",
      "why": "Learn the verb with the noun, not on its own: ケーキを作る、しゃしんをとる、おふろに入る、くすりを飲む.",
      "years": [
        2025
      ],
      "count": 1,
      "report_quotes": [
        "2025: Some students used the wrong verb with the noun; for example, ケーキを使う instead of ケーキを作る."
      ]
    },
    {
      "id": "err-family-humble",
      "name": "Words for your own family",
      "section": "conversation",
      "what_goes_wrong": "お父さん and お母さん used about the student's own family.",
      "wrong": "お母[かあ]さんは 先生[せんせい]です。",
      "right": "母[はは]は 先生[せんせい]です。",
      "why": "Your own family takes the plain words: 父、母、兄、姉、弟、妹. The お〜さん words are for somebody else's family, and for speaking to your own.",
      "years": [
        2021,
        2023
      ],
      "count": 2,
      "report_quotes": [
        "2021: When responding to questions about family, students should respond using words such as 父、母 rather than お父さん、お母さん.",
        "2023: Some students confused 弟さん with お父さん."
      ]
    },
    {
      "id": "err-register",
      "name": "です・ます throughout",
      "section": "both",
      "what_goes_wrong": "Casual endings and slang in the examination.",
      "wrong": "めっちゃ 楽[たの]しい。",
      "right": "とても 楽[たの]しいです。",
      "why": "Everything you say to the assessors is です・ます. めっちゃ、何だっけ and a bare plain-form ending all cost marks.",
      "years": [
        2023
      ],
      "count": 1,
      "report_quotes": [
        "2023: Some students spoke in a very casual way, using language such as めっちゃ and 何だっけ, and plain-form sentence endings. Students should speak in the です・ます form throughout the examination."
      ]
    },
    {
      "id": "err-katakana",
      "name": "Katakana pronunciation",
      "section": "both",
      "what_goes_wrong": "Katakana words said as English, or with the sounds swapped. オーストラリア is named in five of the six VCAA oral exam reports.",
      "wrong": "アリバイト",
      "right": "アルバイト",
      "why": "Say katakana as Japanese: every mora the same length, and the long marks held. オーストラリア is six beats before the リア.",
      "years": [
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
      ],
      "count": 6,
      "report_quotes": [
        "2025: Errors with katakana words included オーストラリア, アリバイト instead of アルバイト and サーフィング instead of サーフィン.",
        "2024: The pronunciation of オーストラリア、メルボルン and レストラン is still problematic for some students."
      ]
    },
    {
      "id": "err-long-vowel",
      "name": "Long vowels and double consonants",
      "section": "both",
      "what_goes_wrong": "Long vowels shortened and double consonants dropped.",
      "wrong": "がこうに いしょに いきました。",
      "right": "学校[がっこう]に いっしょに 行[い]きました。",
      "why": "学校、旅行、高校 all carry a long vowel; いっしょ、行った、いっかい all carry a held consonant. Both change the word.",
      "years": [
        2021,
        2022,
        2023,
        2025
      ],
      "count": 4,
      "report_quotes": [
        "2021: Some errors were made in long and short vowel sounds, for example 学校、旅行、いっしょ.",
        "2025: Some students had difficulty pronouncing double consonant sounds and long vowel sounds."
      ]
    },
    {
      "id": "err-narrow-range",
      "name": "The same structures over and over",
      "section": "both",
      "what_goes_wrong": "Correct Japanese, but only ever 〜です and 〜ます. The reports put this in the middle band, not the top.",
      "wrong": "サッカーが 好[す]きです。毎日[まいにち] します。楽[たの]しいです。",
      "right": "サッカーが 好[す]きで、十才[じゅっさい]から つづけています。チームの 友[とも]だちに 会[あ]えるので、一番[いちばん] 楽[たの]しい 時間[じかん]だと 思[おも]います。",
      "why": "Reach for a relative clause, a comparison, a connective and an opinion. 〜と思います、〜たら、〜ために、〜ようになりました、〜ことがあります all count.",
      "years": [
        2024,
        2025
      ],
      "count": 2,
      "report_quotes": [
        "2024: Students tended to use familiar grammatical structures repeatedly. They are encouraged to use a wider variety of structures where appropriate: for example, relative clauses and making comparisons.",
        "2025: Higher-scoring responses used connectives effectively, including まず、つまり and じつは."
      ]
    }
  ],
  "drills": [
    {
      "id": "dr-spot",
      "type": "spot",
      "title": "Error spotter",
      "how": "One sentence, one fault. Say what is wrong before you look, then say the corrected sentence aloud. These are the exact faults the VCAA oral exam reports name.",
      "error_ids": [
        "err-omou",
        "err-adj-conj",
        "err-adj-no",
        "err-na-adj",
        "err-tense",
        "err-koto-ga-arimasu",
        "err-koto-ga-dekimasu",
        "err-te-form",
        "err-tari",
        "err-particle",
        "err-amari",
        "err-collocation",
        "err-family-humble",
        "err-register",
        "err-question-words"
      ],
      "items": [
        {
          "wrong": "この えいがは おもしろいだと 思[おも]います。",
          "right": "この えいがは おもしろいと 思[おも]います。",
          "error_id": "err-omou",
          "fix_en": "Drop だ. An い-adjective takes と思います directly."
        },
        {
          "wrong": "日本語[にほんご]の じゅぎょうは 楽[たの]しいと おもしろいです。",
          "right": "日本語[にほんご]の じゅぎょうは 楽[たの]しくて おもしろいです。",
          "error_id": "err-adj-conj",
          "fix_en": "Join い-adjectives with くて, not と."
        },
        {
          "wrong": "やさしいの 先生[せんせい]が 好[す]きです。",
          "right": "やさしい 先生[せんせい]が 好[す]きです。",
          "error_id": "err-adj-no",
          "fix_en": "No の between an い-adjective and its noun."
        },
        {
          "wrong": "きれい 花[はな]が たくさん ありました。",
          "right": "きれいな 花[はな]が たくさん ありました。",
          "error_id": "err-na-adj",
          "fix_en": "な-adjectives take な before a noun."
        },
        {
          "wrong": "去年[きょねん]の おまつりは きれいかったです。",
          "right": "去年[きょねん]の おまつりは きれいでした。",
          "error_id": "err-na-adj",
          "fix_en": "な-adjectives take でした in the past, not かった."
        },
        {
          "wrong": "三年[さんねん]前[まえ]に 日本[にほん]に 行[い]きます。",
          "right": "三年[さんねん]前[まえ]に 日本[にほん]に 行[い]きました。",
          "error_id": "err-tense",
          "fix_en": "前に forces the past."
        },
        {
          "wrong": "去年[きょねん] 京都[きょうと]に 行[い]ったことが あります。",
          "right": "去年[きょねん] 京都[きょうと]に 行[い]きました。",
          "error_id": "err-koto-ga-arimasu",
          "fix_en": "〜たことがあります cannot take a specific time."
        },
        {
          "wrong": "コンビニで 何[なん]でも 買[か]えることが できます。",
          "right": "コンビニで 何[なん]でも 買[か]うことが できます。",
          "error_id": "err-koto-ga-dekimasu",
          "fix_en": "ことができます takes the plain form, not the potential."
        },
        {
          "wrong": "先生[せんせい]の 話[はなし]を 聞[き]きて、ノートを とりました。",
          "right": "先生[せんせい]の 話[はなし]を 聞[き]いて、ノートを とりました。",
          "error_id": "err-te-form",
          "fix_en": "聞く goes to 聞いて."
        },
        {
          "wrong": "週[しゅう]まつは 本[ほん]を よみたり、おんがくを ききたり します。",
          "right": "週[しゅう]まつは 本[ほん]を 読[よ]んだり、おんがくを 聞[き]いたり します。",
          "error_id": "err-tari",
          "fix_en": "たり goes on the た form."
        },
        {
          "wrong": "しょうらいに 日本[にほん]で 働[はたら]きたいです。",
          "right": "しょうらい 日本[にほん]で 働[はたら]きたいです。",
          "error_id": "err-particle",
          "fix_en": "しょうらい takes no に."
        },
        {
          "wrong": "きのうに 友[とも]だちと 会[あ]いました。",
          "right": "きのう 友[とも]だちと 会[あ]いました。",
          "error_id": "err-particle",
          "fix_en": "きのう takes no に."
        },
        {
          "wrong": "わたしは あまり にくを 食[た]べます。",
          "right": "わたしは あまり にくを 食[た]べません。",
          "error_id": "err-amari",
          "fix_en": "あまり needs a negative verb."
        },
        {
          "wrong": "母[はは]は 毎週[まいしゅう] ケーキを 使[つか]います。",
          "right": "母[はは]は 毎週[まいしゅう] ケーキを 作[つく]ります。",
          "error_id": "err-collocation",
          "fix_en": "You make a cake, you do not use one."
        },
        {
          "wrong": "お母[かあ]さんは 病院[びょういん]で 働[はたら]いています。",
          "right": "母[はは]は 病院[びょういん]で 働[はたら]いています。",
          "error_id": "err-family-humble",
          "fix_en": "Use 母 about your own mother when talking to the assessors."
        },
        {
          "wrong": "きのうの えいがは めっちゃ よかった。",
          "right": "きのうの えいがは とても よかったです。",
          "error_id": "err-register",
          "fix_en": "です・ます throughout, and no slang."
        },
        {
          "wrong": "Q: 週[しゅう]に 何回[なんかい] アルバイトを しますか。 A: スーパーで します。",
          "right": "Q: 週[しゅう]に 何回[なんかい] アルバイトを しますか。 A: 週[しゅう]に 二回[にかい] します。",
          "error_id": "err-question-words",
          "fix_en": "何回 asks how many times, not where."
        },
        {
          "wrong": "Q: 今年[ことし]の 勉強[べんきょう]は どうでしたか。 A: 英語[えいご]と すうがくと せいぶつです。",
          "right": "Q: 今年[ことし]の 勉強[べんきょう]は どうでしたか。 A: いそがしかったですが、よく 勉強[べんきょう]しました。",
          "error_id": "err-question-words",
          "fix_en": "どうでしたか asks how it was, not which subjects. The 2024 report names this one."
        },
        {
          "wrong": "Q: いつから ピアノを ならっていますか。 A: 毎日[まいにち] れんしゅうします。",
          "right": "Q: いつから ピアノを ならっていますか。 A: 七才[ななさい]から ならっています。",
          "error_id": "err-question-words",
          "fix_en": "いつから asks since when."
        },
        {
          "wrong": "Q: アルバイトの お金[かね]で 何[なに]を しますか。 A: 一時間[いちじかん] 十五[じゅうご]ドルです。",
          "right": "Q: アルバイトの お金[かね]で 何[なに]を しますか。 A: 本[ほん]を 買[か]って、少[すこ]し ためています。",
          "error_id": "err-question-words",
          "fix_en": "This asks what you spend it on. Both the 2022 and the 2025 VCAA oral exam reports name students answering with the hourly rate."
        }
      ]
    },
    {
      "id": "dr-extend",
      "type": "extend",
      "title": "Extend it",
      "how": "A one-sentence answer is a middle-band answer in every report. Take the thin answer and add two more things: a detail, a reason, an example, or an opinion. Say the long version out loud.",
      "error_ids": [
        "err-narrow-range"
      ],
      "items": [
        {
          "question": "しゅみは 何[なん]ですか。",
          "question_en": "What are your hobbies?",
          "thin": "サッカーです。",
          "thin_en": "Soccer.",
          "better": "しゅみは サッカーです。十才[じゅっさい]の 時[とき]に 近[ちか]くの チームに 入[はい]って、今[いま]も 週[しゅう]に 三回[さんかい] れんしゅうします。体[からだ]を 動[うご]かすのが 好[す]きだからです。",
          "better_en": "My hobby is soccer. I joined a local team when I was ten and still train three times a week, because I like being active.",
          "added": [
            "how long",
            "how often",
            "a reason"
          ]
        },
        {
          "question": "ご兄弟[きょうだい]は いますか。",
          "question_en": "Do you have brothers or sisters?",
          "thin": "はい、います。",
          "thin_en": "Yes, I do.",
          "better": "兄[あに]が 一人[ひとり]と 妹[いもうと]が 一人[ひとり]います。兄[あに]は 大学生[だいがくせい]で、妹[いもうと]は 中学校[ちゅうがっこう]に 行[い]っています。妹[いもうと]と 一番[いちばん] なかが いいです。",
          "better_en": "I have one older brother and one younger sister. My brother is at university and my sister is at secondary school. I am closest to my sister.",
          "added": [
            "how many",
            "what they do",
            "an opinion"
          ]
        },
        {
          "question": "日本[にほん]に 行[い]ったことが ありますか。",
          "question_en": "Have you been to Japan?",
          "thin": "いいえ、ありません。",
          "thin_en": "No, I have not.",
          "better": "まだ 行[い]ったことが ありません。でも、来年[らいねん] 家族[かぞく]と 行[い]きたいと 思[おも]っています。一番[いちばん] 行[い]きたい 場所[ばしょ]は 京都[きょうと]です。古[ふる]い お寺[てら]が 多[おお]いからです。",
          "better_en": "I have not been yet. But next year I would like to go with my family. The place I most want to go is Kyoto, because it has so many old temples.",
          "added": [
            "a plan",
            "a place",
            "a reason"
          ]
        },
        {
          "question": "アルバイトを していますか。",
          "question_en": "Do you have a part-time job?",
          "thin": "はい、しています。",
          "thin_en": "Yes, I do.",
          "better": "近[ちか]くの スーパーで アルバイトを しています。週[しゅう]に 二回[にかい]、四時間[よじかん]ずつ 働[はたら]きます。おきゃくさんと 話[はな]す れんしゅうに なるので、つづけたいです。",
          "better_en": "I work at a supermarket near home, twice a week for four hours each time. It is practice at talking to customers, so I want to keep it up.",
          "added": [
            "where",
            "how often",
            "an opinion"
          ]
        },
        {
          "question": "かんきょうの もんだいに ついて どう 思[おも]いますか。",
          "question_en": "What do you think about environmental problems?",
          "thin": "大[おお]きい もんだいです。",
          "thin_en": "It is a big problem.",
          "better": "一番[いちばん] 大[おお]きい もんだいだと 思[おも]います。オーストラリアでは 夏[なつ]が どんどん あつく なって、山火事[やまかじ]も ふえました。家[いえ]では 車[くるま]の かわりに 電車[でんしゃ]を 使[つか]うように しています。",
          "better_en": "I think it is the biggest problem. In Australia the summers keep getting hotter and bushfires have increased. At home we try to use the train instead of the car.",
          "added": [
            "evidence",
            "an example",
            "what you do about it"
          ]
        },
        {
          "question": "その しゃしんに ついて せつめいしてください。",
          "question_en": "Please tell me about your photo.",
          "thin": "おまつりの しゃしんです。",
          "thin_en": "It is a photo of a festival.",
          "better": "夏[なつ]の おまつりの しゃしんです。たくさんの 人[ひと]が ゆかたを 着[き]て、やたいの 前[まえ]に ならんでいます。夜[よる]なので、ちょうちんが 明[あか]るく 見[み]えます。この しゃしんを えらんだのは、おまつりが 町[まち]みんなの 行事[ぎょうじ]だと 見[み]せたかったからです。",
          "better_en": "It is a photo of a summer festival. A lot of people in yukata are queueing in front of a stall. It is night, so the lanterns look bright. I chose it because I wanted to show that a festival belongs to the whole town.",
          "added": [
            "what is in it",
            "when it is",
            "why you chose it"
          ]
        },
        {
          "question": "どうして 日本語[にほんご]を 勉強[べんきょう]していますか。",
          "question_en": "Why are you studying Japanese?",
          "thin": "おもしろいからです。",
          "thin_en": "Because it is interesting.",
          "better": "中学[ちゅうがく]一年生[いちねんせい]の 時[とき]に 始[はじ]めて、漢字[かんじ]が おもしろかったので つづけました。今[いま]は 日本[にほん]の えいがも 少[すこ]し わかるように なったので、やめたくないです。",
          "better_en": "I started in Year 7 and kept going because I found kanji interesting. Now I can follow a little of a Japanese film, so I do not want to stop.",
          "added": [
            "when you started",
            "what changed",
            "an opinion"
          ]
        },
        {
          "question": "学校[がっこう]の 行事[ぎょうじ]の 中[なか]で、どんな 行事[ぎょうじ]が 好[す]きですか。",
          "question_en": "Which school events do you like?",
          "thin": "スポーツデーです。",
          "thin_en": "Sports day.",
          "better": "スポーツデーが 一番[いちばん] 好[す]きです。クラスで チームを 作[つく]って、一日中[いちにちじゅう] 外[そと]で はしります。ふだん 話[はな]さない 人[ひと]とも 話[はな]せるので、クラスが 一[ひと]つに なります。",
          "better_en": "Sports day is my favourite. We make class teams and spend the whole day outside. I get to talk with people I do not normally talk to, so the class comes together.",
          "added": [
            "what happens",
            "how long",
            "a reason"
          ]
        }
      ]
    },
    {
      "id": "dr-upgrade",
      "type": "upgrade",
      "title": "Open-ended upgrade",
      "how": "A closed question still deserves an open answer. Answer it, then keep going without being asked again. This is what the VCAA oral exam reports mean by carrying the conversation forward.",
      "error_ids": [
        "err-narrow-range",
        "err-question-words"
      ],
      "items": [
        {
          "question": "読書[どくしょ]が 好[す]きですか。",
          "question_en": "Do you like reading?",
          "closed": "はい、好[す]きです。",
          "closed_en": "Yes, I do.",
          "open": "はい、好[す]きです。月[つき]に 二[に]さつぐらい 読[よ]みます。ミステリーが 一番[いちばん] 好[す]きで、さいきんは やさしい 日本語[にほんご]の 本[ほん]も 読[よ]んでみました。",
          "open_en": "Yes, I do. I read about two books a month. I like mysteries best, and recently I tried an easy book in Japanese too."
        },
        {
          "question": "何[なに]か がっきが できますか。",
          "question_en": "Can you play an instrument?",
          "closed": "はい、できます。",
          "closed_en": "Yes, I can.",
          "open": "はい、ピアノが できます。七才[ななさい]から ならっているので、もう 十年[じゅうねん]ぐらいに なります。さいきんは 日本[にほん]の アニメの きょくも ひくように なりました。",
          "open_en": "Yes, I can play the piano. I have been learning since I was seven, so it is about ten years now. Recently I have started playing music from Japanese anime too."
        },
        {
          "question": "日本[にほん]の 食[た]べ物[もの]が 好[す]きですか。",
          "question_en": "Do you like Japanese food?",
          "closed": "はい、好[す]きです。",
          "closed_en": "Yes, I do.",
          "open": "はい、大[だい]好[す]きです。とくに おすしと ラーメンが 好[す]きです。メルボルンには 日本[にほん]の レストランが 多[おお]いので、月[つき]に 一回[いっかい]ぐらい 行[い]きます。",
          "open_en": "Yes, I love it. I especially like sushi and ramen. Melbourne has a lot of Japanese restaurants, so I go about once a month."
        },
        {
          "question": "週[しゅう]まつは いそがしいですか。",
          "question_en": "Are you busy on the weekend?",
          "closed": "はい、いそがしいです。",
          "closed_en": "Yes, I am.",
          "open": "はい、けっこう いそがしいです。土曜日[どようび]は アルバイトが あって、日曜日[にちようび]は サッカーの しあいが あります。でも、日曜日[にちようび]の 晩[ばん]は 家族[かぞく]と ゆっくり します。",
          "open_en": "Yes, quite busy. I work on Saturday and I have a soccer match on Sunday. But on Sunday evening I take it easy with my family."
        },
        {
          "question": "大学[だいがく]に 行[い]きたいですか。",
          "question_en": "Do you want to go to university?",
          "closed": "はい、行[い]きたいです。",
          "closed_en": "Yes, I do.",
          "open": "はい、行[い]きたいです。きょういくを 勉強[べんきょう]して、小学校[しょうがっこう]の 先生[せんせい]に なりたいからです。日本語[にほんご]も つづけたいと 思[おも]っています。",
          "open_en": "Yes, I do. I want to study education and become a primary teacher. I would like to continue Japanese as well."
        },
        {
          "question": "その しゃしんは 日本[にほん]の しゃしんですか。",
          "question_en": "Is that photo from Japan?",
          "closed": "はい、そうです。",
          "closed_en": "Yes, it is.",
          "open": "はい、そうです。京都[きょうと]で とった しゃしんだと 思[おも]います。後[うし]ろに 古[ふる]い お寺[てら]が 見[み]えるからです。春[はる]の しゃしんで、さくらも 少[すこ]し 見[み]えます。",
          "open_en": "Yes, it is. I think it was taken in Kyoto, because there is an old temple behind. It is a spring photo and you can see a little cherry blossom too."
        },
        {
          "question": "おまつりに 行[い]ったことが ありますか。",
          "question_en": "Have you been to a festival?",
          "closed": "はい、あります。",
          "closed_en": "Yes, I have.",
          "open": "はい、あります。メルボルンの 日本[にほん]の まつりに 行[い]きました。たいこを 聞[き]いて、やきそばを 食[た]べました。いつか 日本[にほん]の おまつりにも 行[い]ってみたいです。",
          "open_en": "Yes, I have. I went to a Japanese festival in Melbourne. I heard taiko drums and ate yakisoba. One day I would like to go to a festival in Japan too."
        },
        {
          "question": "日本語[にほんご]は むずかしいですか。",
          "question_en": "Is Japanese difficult?",
          "closed": "はい、むずかしいです。",
          "closed_en": "Yes, it is.",
          "open": "漢字[かんじ]は むずかしいですが、話[はな]すのは 楽[たの]しいです。読[よ]むのは できますが、書[か]く 時[とき]に よく わすれます。だから、毎晩[まいばん] 十[じゅっ]こずつ 書[か]くように しています。",
          "open_en": "Kanji are difficult, but speaking is enjoyable. I can read them but I often forget when writing, so I try to write ten of them every night."
        }
      ]
    },
    {
      "id": "dr-repair",
      "type": "repair",
      "title": "Repair drill",
      "how": "Four of the six VCAA oral exam reports name repair strategies. The point is to name the one word you missed and ask, quickly, in Japanese. Read the situation, then say the line without looking.",
      "error_ids": [
        "err-question-words",
        "err-vocab-gap"
      ],
      "items": [
        {
          "situation_en": "You did not catch the question at all.",
          "say": "すみません、もう 一回[いっかい] 言[い]って ください。",
          "say_en": "Sorry, could you say that again, please."
        },
        {
          "situation_en": "The question was too fast.",
          "say": "もう 少[すこ]し ゆっくり 言[い]って ください。",
          "say_en": "Could you say it a little more slowly, please."
        },
        {
          "situation_en": "You caught the question but not one word in it.",
          "say": "すみません、「がっき」は どういう いみですか。",
          "say_en": "Sorry, what does gakki mean?"
        },
        {
          "situation_en": "You want to check you have understood the question.",
          "say": "しつもんは アルバイトの ことですか。",
          "say_en": "Is the question about my part-time job?"
        },
        {
          "situation_en": "You need a moment to think.",
          "say": "そうですね。少[すこ]し 考[かんが]えさせて ください。",
          "say_en": "Let me think. Just a moment, please."
        },
        {
          "situation_en": "You know the idea but not the word.",
          "say": "ことばを わすれましたが、お店[みせ]の ような ものです。",
          "say_en": "I have forgotten the word, but it is something like a shop."
        },
        {
          "situation_en": "You started the sentence badly and want to begin again.",
          "say": "すみません、もう 一回[いっかい] はじめから 言[い]います。",
          "say_en": "Sorry, let me start that again."
        },
        {
          "situation_en": "You genuinely do not know, but you can offer something.",
          "say": "よく わかりません。でも、おまつりの ことだと 思[おも]います。",
          "say_en": "I am not sure. But I think it is about festivals."
        },
        {
          "situation_en": "You want to know the Japanese word for something.",
          "say": "日本語[にほんご]で 何[なん]と 言[い]いますか。",
          "say_en": "How do you say that in Japanese?"
        }
      ]
    },
    {
      "id": "dr-shadow",
      "type": "shadow",
      "title": "Shadowing",
      "how": "Play the line, then say it back over the top of it, matching the length of every sound. These lines carry the long vowels, the double consonants and the katakana words the VCAA oral exam reports name every year.",
      "error_ids": [
        "err-katakana",
        "err-long-vowel"
      ],
      "items": [
        {
          "ja": "オーストラリアの メルボルンに 住[す]んでいます。",
          "en": "I live in Melbourne, Australia.",
          "watch_en": "オーストラリア is six beats before リア. Named in five of the six VCAA oral exam reports."
        },
        {
          "ja": "学校[がっこう]まで 電車[でんしゃ]で 行[い]きます。",
          "en": "I go to school by train.",
          "watch_en": "学校 is がっ・こう: a held consonant and a long vowel in one word."
        },
        {
          "ja": "去年[きょねん]、家族[かぞく]と 旅行[りょこう]に 行[い]きました。",
          "en": "Last year I went on a trip with my family.",
          "watch_en": "旅行 is りょ・こう, and 行った is held. Both are named in 2021 and 2023."
        },
        {
          "ja": "友[とも]だちと いっしょに サッカーの れんしゅうを します。",
          "en": "I train at soccer with my friends.",
          "watch_en": "いっしょ and サッカー both hold the consonant."
        },
        {
          "ja": "土曜日[どようび]に スーパーで アルバイトを します。",
          "en": "I work at a supermarket on Saturdays.",
          "watch_en": "スーパー holds the vowel; アルバイト is not アリバイト."
        },
        {
          "ja": "高校[こうこう]の 先生[せんせい]に なりたいと 思[おも]っています。",
          "en": "I would like to become a secondary teacher.",
          "watch_en": "高校 is two long vowels in a row."
        },
        {
          "ja": "レストランで 和食[わしょく]を 食[た]べました。",
          "en": "I ate Japanese food at a restaurant.",
          "watch_en": "レストラン, named in 2024, is four even beats and no English r."
        },
        {
          "ja": "週[しゅう]に 三回[さんかい]、ピアノを れんしゅうします。",
          "en": "I practise the piano three times a week.",
          "watch_en": "しゅう holds the vowel; 三回 is さん・かい."
        },
        {
          "ja": "一番[いちばん] 好[す]きな かもくは せいぶつです。",
          "en": "My favourite subject is biology.",
          "watch_en": "一番 is いち・ばん, four even beats."
        },
        {
          "ja": "おもしろくて、楽[たの]しい じゅぎょうだと 思[おも]います。",
          "en": "I think it is an interesting and enjoyable class.",
          "watch_en": "くて joins the adjectives; じゅぎょう holds both vowels."
        }
      ]
    }
  ]
};
