# Japanese Hub — live site

This repo is the **deploy target only**. The pages served from it are the one
canonical version of every Japanese Hub tool:

**https://liaminhawai-cmd.github.io/japanese-hub/**

| Path | Tool |
|---|---|
| `/` | hub landing page (cards) |
| `/grammar/` | Japanese Grammar Hub |

Future tools get their own folder (`/oral/`, `/topics/`, `/writing/`) and a
card on the landing page, so no existing link ever breaks.

If a classroom screen shows a different build tag (bottom-left of the app,
footer of the landing page) than the live site, the classroom copy is stale —
the live URL wins.

## Rules for this repo

- **Do not develop here.** All development, content editing and discussion
  happens in the private development repo; changes arrive here as whole-file
  copies (see `DEPLOYING.md` there). Direct edits here get overwritten by the
  next deploy.
- **This repo is public.** Only the running apps live here. Never add
  teaching materials, textbook scans, student anything, or internal
  documents.
- No accounts, no analytics, no tracking. Everything runs in the browser.

## Patched in place (September 2026)

These edits were made directly in this deploy repo at Liam's request and
still need porting to the dev repo (`08598176-design/Grammar-hub`), which
this session could not reach. The walk and vocab pages are generated there
by `tools/gen-units.js` from `tools/walk-template.html`; regenerating
without porting will undo them.

- `lever.js` (all 12 copies): three stops, kanji / kana / English. The
  romaji form (index 2) stays in every four-form string but the lever never
  stops on it; `HubLever.form()` still returns a form index (0, 1 or 3).
  Every page also gets a fixed "⌂ にほんごハブ · Hub" chip back to the landing
  page (`opts.hub === false` turns it off).
- `walk/index.html`: English-first labels ("Hint:" not つくって), wider
  layout; Q&A step ticks a checklist derived from the model answer instead
  of revealing it; craft step is a slide deck (options shuffled, explanations
  split into per-option lines with the letters resolved, plain words), then
  model sentences rebuilt from tiles with one decoy.
- `grammar/`: up to 5 questions per skill, one main round and one second go
  at the misses, then the report; "Back to the skills" repaints the matrix
  with last-session scores; metalanguage buttons English regardless of the
  lever; ヒント → Hint.
- `index.html`: bilingual, no lever. `kanji/`: back buttons say かぞく.
  `words/`: 中文 mode hides English and quizzes readings. `writing/`: the
  annotation is a speech bubble beside the text.
