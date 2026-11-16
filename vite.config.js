import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import process from 'process'
import { fileURLToPath } from 'url'
import { buildStructuredData, SITE_URL, isoDate } from './src/data/structuredData.js'
import { missingLegalFields, hasPostalAddress } from './src/data/legal.js'

const root = path.dirname(fileURLToPath(import.meta.url))

/** Standalone pages built next to the SPA. Each one is a folder with an index.html. */
const LEGAL_PAGES = ['impressum', 'datenschutz']

/**
 * Injects the JSON-LD graph into index.html at build time.
 *
 * Build time rather than runtime so the markup is in the HTML a crawler is
 * handed, and generated from `conferences.js` rather than hand-maintained so
 * adding a talk updates the structured data with it.
 */
const structuredData = () => ({
  name: 'structured-data',
  transformIndexHtml(html, ctx) {
    // The Person graph describes the home page, not the legal pages.
    if (ctx.path !== '/index.html') return
    return [
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(buildStructuredData()),
        injectTo: 'head',
      },
    ]
  },
})

/**
 * Writes sitemap.xml and copies CNAME once the bundle is on disk. The
 * Impressum is left out of the sitemap because it is noindex.
 */
const siteFiles = () => ({
  name: 'site-files',
  apply: 'build',
  closeBundle() {
    const outDir = 'dist'
    const today = isoDate(new Date())

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
${LEGAL_PAGES.filter((page) => page !== 'impressum').map((page) => `  <url>
    <loc>${SITE_URL}/${page}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.1</priority>
  </url>
`).join('')}</urlset>
`
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)

    // Custom domain support on GitHub Pages. This used to live under a
    // `build.hooks` key, which Vite does not read, so it never ran and the
    // CNAME only survived because `npm run predeploy` copies it separately.
    fs.copyFileSync('CNAME', path.join(outDir, 'CNAME'))
  },
})

/**
 * Refuses to build while src/data/legal.js still holds placeholders. A
 * deployed Impressum reading "[Straße Hausnummer]" is as non-compliant as no
 * Impressum at all, so this is a hard stop, not a warning. Set
 * ALLOW_INCOMPLETE_LEGAL=1 to build locally anyway.
 */
const legalPlaceholders = () => ({
  name: 'legal-placeholders',
  apply: 'build',
  buildStart() {
    if (!hasPostalAddress()) {
      this.warn('src/data/legal.js has no postal address yet, so the Impressum is incomplete.')
    }
    const missing = missingLegalFields()
    if (missing.length === 0) return
    const message = `src/data/legal.js still has placeholders for: ${missing.join(', ')}`
    if (process.env.ALLOW_INCOMPLETE_LEGAL) this.warn(message)
    else this.error(`${message}. Fill them in before deploying.`)
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legalPlaceholders(), structuredData(), siteFiles()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(root, 'index.html'),
        ...Object.fromEntries(
          LEGAL_PAGES.map((page) => [page, path.resolve(root, page, 'index.html')])
        ),
      },
    },
  },
  server: {
    host: true, // Listen on all addresses
    port: 5173  // Default Vite port
  },
})
