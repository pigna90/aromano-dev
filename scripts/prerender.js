/**
 * Prerenders the built SPA to static HTML.
 *
 * Without this step the deployed `index.html` ships an empty `<div id="root">`
 * and the entire site, every talk, every role, every word of the about copy,
 * exists only after JavaScript has run. Google will usually render it
 * eventually; Bing, LinkedIn's link preview and the AI answer engines will not.
 *
 * A real browser does the rendering rather than `renderToString`, because the
 * app resolves eight `React.lazy` chunks and reads `matchMedia` and
 * `localStorage` during render. Serialising the live DOM sidesteps all of it,
 * and the result still hydrates normally on the client.
 */
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = 'dist';
const PORT = 4183;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.json': 'application/json',
};

/** Serves `dist/`, falling back to index.html so client routes still resolve. */
const serve = () =>
  new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const candidates = [
        join(DIST, path),
        join(DIST, path, 'index.html'),
        join(DIST, 'index.html'),
      ];

      for (const candidate of candidates) {
        try {
          const body = await readFile(candidate);
          res.writeHead(200, {
            'Content-Type': MIME[extname(candidate)] ?? 'application/octet-stream',
          });
          res.end(body);
          return;
        } catch {
          // Try the next candidate.
        }
      }

      res.writeHead(404).end('Not found');
    });

    server.listen(PORT, () => resolve(server));
  });

const server = await serve();
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // The blog section fetches two RSS feeds through rss2json on mount. Waiting
  // for the network to settle means the posts are in the snapshot too.
  await page.goto(`http://localhost:${PORT}/`, {
    waitUntil: 'networkidle0',
    timeout: 60_000,
  });

  // Every section is lazy, so wait until the last one has actually mounted
  // rather than trusting a fixed delay.
  await page.waitForFunction(
    () => !document.body.innerText.includes('Loading') && !!document.querySelector('footer'),
    { timeout: 30_000 }
  );

  const html = await page.evaluate(() => {
    // Framer Motion leaves entry animations mid-flight as inline opacity/transform,
    // which would freeze the snapshot with invisible content for anyone whose JS
    // never runs. Strip those two properties and let the stylesheet decide.
    document.querySelectorAll('[style]').forEach((node) => {
      node.style.removeProperty('opacity');
      node.style.removeProperty('transform');
      if (!node.getAttribute('style')) node.removeAttribute('style');
    });
    return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
  });

  await writeFile(join(DIST, 'index.html'), html, 'utf8');

  const text = await page.evaluate(() => document.body.innerText.trim().length);
  console.log(`prerender: wrote dist/index.html (${(html.length / 1024).toFixed(1)}kB, ${text} chars of text)`);
} finally {
  await browser.close();
  server.close();
}
