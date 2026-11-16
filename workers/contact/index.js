/**
 * Contact form endpoint, replacing Formspree.
 *
 * Runs on Cloudflare at www.aromano.dev/api/contact, so visitor messages go
 * through the same provider that already serves the site and routes
 * contact@aromano.dev, with no extra third party. The message is emailed
 * straight on through Email Routing and nothing is stored or logged here.
 *
 * Deploy: `npx wrangler deploy --config workers/contact/wrangler.toml`.
 * The recipient is the `CONTACT_TO` secret, which must be a verified
 * destination address in Email Routing. It is a secret rather than a var so
 * the personal inbox never lands in this public repo.
 */
import { EmailMessage } from 'cloudflare:email';

const SENDER = 'form@aromano.dev';
const ALLOWED_ORIGINS = ['https://www.aromano.dev', 'https://aromano.dev'];
const MAX_LENGTH = { name: 200, email: 254, message: 5000 };

// Deliberately strict: whatever passes ends up in a Reply-To header, so no
// whitespace, angle brackets or line breaks can get through.
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/** Collapses a header value to one line, so it cannot inject new headers. */
const oneLine = (value) => value.replace(/[\r\n]+/g, ' ').trim();

const base64 = (text) => {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

/** RFC 2047 encoding, so names with accents survive the Subject line. */
const encodeHeader = (text) => `=?UTF-8?B?${base64(text)}?=`;

const buildRawEmail = ({ to, name, email, message }) => {
  const body = `${name} <${email}> wrote via aromano.dev:\n\n${message}\n`;
  return [
    `From: "aromano.dev contact form" <${SENDER}>`,
    `To: <${to}>`,
    `Reply-To: <${email}>`,
    `Subject: ${encodeHeader(`aromano.dev: message from ${name}`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@aromano.dev>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    base64(body).replace(/.{76}/g, '$&\r\n'),
  ].join('\r\n');
};

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

    // Only the site's own pages may post here. Not a security boundary on
    // its own (Origin is easy to fake outside a browser) but it stops other
    // websites from using this endpoint as their mail relay.
    if (!ALLOWED_ORIGINS.includes(request.headers.get('Origin'))) {
      return json(403, { error: 'Forbidden' });
    }

    // Five messages a minute per IP. The IP is only used for this counter.
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const { success } = await env.LIMITER.limit({ key: ip });
    if (!success) return json(429, { error: 'Too many messages, try again in a minute' });

    let data;
    try {
      data = await request.json();
    } catch {
      return json(400, { error: 'Invalid request' });
    }

    // Honeypot: the "website" field is hidden from people, so only bots
    // fill it in. Pretend it worked so they have no reason to retry.
    if (data.website) return json(200, { ok: true });

    const name = oneLine(String(data.name ?? '')).slice(0, MAX_LENGTH.name);
    const email = oneLine(String(data.email ?? ''));
    const message = String(data.message ?? '').trim().slice(0, MAX_LENGTH.message);

    if (!name || !message || email.length > MAX_LENGTH.email || !EMAIL_PATTERN.test(email)) {
      return json(400, { error: 'Please fill in your name, a valid email and a message' });
    }

    try {
      const raw = buildRawEmail({ to: env.CONTACT_TO, name, email, message });
      await env.MAILER.send(new EmailMessage(SENDER, env.CONTACT_TO, raw));
    } catch {
      return json(502, { error: 'Could not send the message' });
    }

    return json(200, { ok: true });
  },
};
