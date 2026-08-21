import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { buildStructuredData, SITE_URL, isoDate } from './src/data/structuredData.js'

/**
 * Injects the JSON-LD graph into index.html at build time.
 *
 * Build time rather than runtime so the markup is in the HTML a crawler is
 * handed, and generated from `conferences.js` rather than hand-maintained so
 * adding a talk updates the structured data with it.
 */
const structuredData = () => ({
  name: 'structured-data',
  transformIndexHtml() {
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

/** Writes sitemap.xml and copies CNAME once the bundle is on disk. */
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
</urlset>
`
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)

    // Custom domain support on GitHub Pages. This used to live under a
    // `build.hooks` key, which Vite does not read, so it never ran and the
    // CNAME only survived because `npm run predeploy` copies it separately.
    fs.copyFileSync('CNAME', path.join(outDir, 'CNAME'))
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), structuredData(), siteFiles()],
  base: '/',
  server: {
    host: true, // Listen on all addresses
    port: 5173  // Default Vite port
  },
})
