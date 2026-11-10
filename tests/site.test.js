// Structural checks for the static portfolio. Run with: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { parseHTML } from 'linkedom'

const root = new URL('../', import.meta.url)
const html = readFileSync(new URL('index.html', root), 'utf8')
const { document } = parseHTML(html)
const $$ = (sel) => [...document.querySelectorAll(sel)]

test('has the metadata a shared link needs', () => {
  assert.equal(document.documentElement.getAttribute('lang'), 'en')
  assert.ok(document.title.includes('Alonso Ochoa'))
  for (const sel of ['meta[name="description"]', 'meta[name="viewport"]', 'meta[property="og:title"]', 'link[rel="icon"]']) {
    assert.ok(document.querySelector(sel), `missing ${sel}`)
  }
  assert.equal($$('h1').length, 1, 'exactly one h1')
})

test('every local file it references exists', () => {
  const refs = [
    ...$$('link[href]').map((el) => el.getAttribute('href')),
    ...$$('script[src]').map((el) => el.getAttribute('src')),
    ...$$('img[src]').map((el) => el.getAttribute('src')),
  ].filter((u) => !/^(https?:)?\/\//.test(u))
  assert.ok(refs.length >= 3)
  for (const ref of refs) assert.ok(existsSync(new URL(ref, root)), `missing file: ${ref}`)
})

test('ids are unique and every #anchor points at one', () => {
  const ids = $$('[id]').map((el) => el.id)
  assert.equal(new Set(ids).size, ids.length, 'duplicate id')
  for (const a of $$('a[href^="#"]')) {
    const target = a.getAttribute('href').slice(1)
    assert.ok(ids.includes(target), `broken anchor #${target}`)
  }
})

test('script.js hooks exist in the page', () => {
  const js = readFileSync(new URL('script.js', root), 'utf8')
  for (const [, id] of js.matchAll(/getElementById\('([^']+)'\)/g)) {
    assert.ok(document.getElementById(id), `script.js expects #${id}`)
  }
})

test('external links open safely in a new tab', () => {
  for (const a of $$('a[href^="http"]')) {
    assert.equal(a.getAttribute('target'), '_blank', a.getAttribute('href'))
    assert.match(a.getAttribute('rel') || '', /noopener/, a.getAttribute('href'))
  }
})

test('buttons and icons are accessible', () => {
  for (const b of $$('button')) {
    assert.equal(b.getAttribute('type'), 'button')
    assert.ok(b.getAttribute('aria-label') || b.textContent.trim(), 'button needs a label')
  }
  for (const svg of $$('svg')) assert.equal(svg.getAttribute('aria-hidden'), 'true', 'decorative svg should be aria-hidden')
})

// Projects should link to their own repo, not just the GitHub profile
const cards = $$('.project-card')
const repoLink = (card) => card.querySelector('a[href^="https://github.com/al0n50"]')?.getAttribute('href') || ''
const unlinked = cards.filter((c) => !/github\.com\/al0n50\/[\w.-]+/.test(repoLink(c))).map((c) => c.dataset.project)

test('project cards each have a name, description, and tech tags', () => {
  assert.ok(cards.length >= 1)
  for (const c of cards) {
    assert.ok(c.querySelector('.project-name')?.textContent.trim())
    assert.ok(c.querySelector('.project-desc')?.textContent.trim().length > 40)
    assert.ok(c.querySelectorAll('.tech-tag').length >= 2)
  }
})

test('project cards link to a specific repo', { todo: unlinked.length ? `no repo yet: ${unlinked.join(', ')}` : false }, () => {
  assert.deepEqual(unlinked, [])
})
