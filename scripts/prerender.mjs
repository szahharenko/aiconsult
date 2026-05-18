/**
 * Prerender script — runs after `vite build`.
 *
 * Boots vite preview, then drives headless Chromium across a fixed list of
 * routes and writes the fully-rendered HTML back into dist/<route>/index.html
 * so crawlers (Google, social previews, etc.) get real content instead of an
 * empty <div id="root"></div>.
 *
 * Run via:  npm run prerender        (assumes dist/ already exists)
 *           npm run build:seo        (builds + prerenders in one go)
 */

import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

// Routes to snapshot. Keep this in sync with src/main.tsx router.
const ROUTES = [
  '/en',
  '/ru',
  '/et',
  '/en/events',
  '/ru/events',
  '/et/events',
]

// How long to wait for animations / lazy chunks to settle before snapshotting.
const SETTLE_MS = 1200
const NAV_TIMEOUT_MS = 30_000
const PREVIEW_PORT = 4173

function log(msg) {
  process.stdout.write(`[prerender] ${msg}\n`)
}

async function ensureDistExists() {
  try {
    await fs.access(path.join(DIST, 'index.html'))
  } catch {
    throw new Error(
      `dist/index.html not found. Run \`npm run build\` first, or use \`npm run build:seo\`.`
    )
  }
}

async function snapshot(browser, baseUrl, route) {
  const url = baseUrl + route
  const page = await browser.newPage()

  // Suppress noisy console output from the page during prerender.
  page.on('pageerror', (err) => log(`  page error on ${route}: ${err.message}`))

  try {
    // Pre-seed localStorage so the cookie banner / theme don't appear in the
    // prerendered HTML. Real users will still see them — React re-renders on
    // mount and reads their (empty) localStorage.
    await page.evaluateOnNewDocument(() => {
      try {
        localStorage.setItem('cookie_consent', 'accepted')
      } catch { /* ignore */ }
    })

    await page.goto(url, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT_MS })

    // Give framer-motion / i18n http backend a moment to settle.
    await new Promise((r) => setTimeout(r, SETTLE_MS))

    // Mark the document so we can tell prerendered HTML apart at runtime.
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-prerendered', 'true')
    })

    const html = await page.content()
    const outPath = path.join(DIST, route.replace(/^\//, ''), 'index.html')
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, html, 'utf8')

    const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1)
    log(`  ✓ ${route.padEnd(16)}  →  ${path.relative(ROOT, outPath)}  (${sizeKb} KB)`)
  } finally {
    await page.close()
  }
}

async function main() {
  await ensureDistExists()

  log('starting vite preview server…')
  const server = await preview({
    root: ROOT,
    preview: { port: PREVIEW_PORT, strictPort: true, host: '127.0.0.1' },
  })
  const baseUrl = `http://127.0.0.1:${PREVIEW_PORT}`
  log(`preview at ${baseUrl}`)

  log('launching headless chromium…')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let failed = 0
  try {
    for (const route of ROUTES) {
      try {
        await snapshot(browser, baseUrl, route)
      } catch (err) {
        failed += 1
        log(`  ✗ ${route}: ${err.message}`)
      }
    }
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => {
      server.httpServer?.close((err) => (err ? reject(err) : resolve()))
    })
  }

  if (failed > 0) {
    log(`done with ${failed} failure(s).`)
    process.exit(1)
  }
  log(`done. snapshotted ${ROUTES.length} routes.`)
}

main().catch((err) => {
  console.error('[prerender] fatal:', err)
  process.exit(1)
})
