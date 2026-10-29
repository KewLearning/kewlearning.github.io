# CLAUDE.md

This is the **deploy target** for the Japanese Hub — a public repo serving
the live site at https://kewlearning.github.io/ via GitHub Pages. Do not
develop here.

Because the repo is named `kewlearning.github.io`, Pages serves it from the
site root: a tool in `/mega/` is at `kewlearning.github.io/mega/`, with no
project prefix. There is a second, older copy of this site at
`liaminhawai-cmd.github.io/japanese-hub/`, kept alive because links to it
have gone out on worksheets. Deploy to this one; leave that one alone.

Read `STYLE_GUIDE.md` first — the portable build principles for every
teaching resource across these repos (`kelpie-9f3c/index.html`, "Build
principles", is its source; edit there and recopy).

- Source of truth: the private development repo
  (`KewLearning/Japanese-PRIVATE-CONTEXT`), which holds SPEC.md,
  DESIGN_RULES.md and the collab/ workflow. The old public `Grammar-hub`
  fork was deleted in October 2026: its whole history is inside the private
  repo.
- Layout: `/index.html` is the hub landing page; each tool lives in its own
  folder (`/grammar/`, plus the proof-of-concept tools `/words/`, `/oral/`,
  `/writing/`). A new tool = a new folder plus a card on the landing page.
  Never move an existing tool's folder — links go out on worksheets. PoC
  folders may be deleted if Andrew rejects them (remove the card too).
- A grammar deploy = copy `index.html`, `engine.js`, `tasktypes.js`,
  `data/skills.js` verbatim from the dev repo root into `/grammar/` (after
  its sanity check passes), bump the build tag date, commit, push to `main`.
- Never commit anything here that isn't part of a running app. This repo is
  public: no teaching materials, no scans, no student data, no internal links.
