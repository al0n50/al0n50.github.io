# al0n50.github.io: project brief

Read this first. It's the working context for anyone (or any AI agent) changing this repo.

## What it is

Alonso Ochoa's portfolio: projects, experience, leadership, contact. It's the page recruiters
open from the resume, LinkedIn and GitHub, so **accuracy matters more than anything**.
Live: https://al0n50.github.io

## The foundation (status)

| Fundamental | How it works here | Status |
|---|---|---|
| **Frontend & backend** | Static frontend only: `index.html`, `styles.css`, `script.js`. No build step, no server. | ✅ by design |
| **Repo** | One repo. `develop` for work in progress, `main` is what's live. README, MIT license (code only), CI, secret scanning + push protection on. | ✅ (branch protection: decision pending) |
| **Commit** | Small, single-purpose commits; message rules below; CI must pass. | ✅ |
| **Auth** | None needed: a public site with no accounts or private data. | ✅ by design |
| **Context window** | This file + README. | ✅ |
| **Localhost & deploy** | `npm run serve` → http://localhost:8080. Merge to `main` → CI → GitHub Pages deploy (`.github/workflows/ci.yml`). | ✅ |
| **Database** | None needed. | ✅ by design |
| **API & API keys** | None. Contact is a `mailto:` + copy-email button; no forms, no keys. | ✅ by design |
| **Checkpoint** | Tagged releases (`vX.Y.Z`); Pages redeploys the tagged commit on rollback. | ⏳ First tagged release waiting on Alonso's OK. Vercel/Pages rollback and `git revert` work today |

## Structure

```
index.html     page content (sections: hero, projects, experience, leadership, contact)
styles.css     theme tokens + layout (dark-first; light via OS setting or toggle)
script.js      theme toggle, copy email, active nav
favicon.svg, og-image.png   icon + social preview card
tests/         structural checks (node:test + linkedom)
```

## Run, test, deploy

```bash
npm ci
npm run serve      # http://localhost:8080
npm run check      # html-validate + tests
```
Work on `develop` (CI checks it) → merge to `main` → CI checks again and deploys to Pages.
Pages source must stay **Settings → Pages → Source: GitHub Actions**.

## Rules

- **Content must match the resume and LinkedIn, and only state what's true and provable.**
  Dates, titles, results (e.g. FBLA placements), degrees (BS CS, FIU; AS in Computer
  Information Technology in progress at MDC). When the resume changes, update the site in the same pass.
- Every project card links to its own repo and, if live, its demo (tests enforce repo links).
- External links: `target="_blank"` with `rel="noopener noreferrer"` (tests enforce it).
- Accessible: real buttons, labeled icons, alt text, good contrast in both themes.
- No trackers or third-party scripts without Alonso's decision.
- Team projects are credited as team work (e.g. Wayfound: the original repo is bineta-d/Wayfound).
- Repo rules: one repo per project; never delete existing repos; no duplicate repos or clones.

## Commits

- Summary line: imperative, ≤ 72 characters ("Portfolio: link the Life Plan live demo").
- Body: why, and what was checked. One logical change per commit. CI green before `main`.

## Checkpoints & rollback

- Known-good states of `main` are tagged `vX.Y.Z` with a GitHub release.
- Roll back: `git revert <sha>` on `main` and push (CI redeploys), or re-run the deploy
  workflow on the last good commit. Never force-push `main`.
