# al0n50.github.io

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
