# al0n50.github.io

[![CI & Deploy](https://github.com/al0n50/al0n50.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/al0n50/al0n50.github.io/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Personal portfolio for **Alonso Ochoa** — projects, experience, leadership, and contact.
Plain HTML/CSS/JS, no build step, served by GitHub Pages at **https://al0n50.github.io**.

## Structure

```
index.html     # page content
styles.css     # theme tokens + layout (dark-first, light via OS or toggle)
script.js      # theme toggle, copy-email, active nav
favicon.svg
tests/         # structural checks (node:test + linkedom)
```

## Develop

```bash
npm install
npm run serve      # http://localhost:8080
```

## Test

```bash
npm run check      # html-validate + structural tests
```

The tests check metadata, local file references, anchors, safe external links,
accessible buttons/icons, and that every project card links to its own repo.

## Workflow

- Work on `develop` (or a feature branch) → CI runs validation + tests.
- Merge to `main` → CI runs again and, if green, deploys to GitHub Pages.

Pages must be set to **Settings → Pages → Source: GitHub Actions** for the deploy job to publish.

## Working on this repo

Start with [`CLAUDE.md`](CLAUDE.md): content-accuracy rules, how to run and deploy, and rollback steps.

## License

Code is [MIT](LICENSE) © 2026 Alonso Ochoa. The written content and personal details on the site are not licensed for reuse.
