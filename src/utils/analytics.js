/**
 * Google Analytics, strictly opt-in.
 *
 * Under § 25 TDDDG nothing that reads or writes the visitor's device may run
 * before they agree, so gtag.js is not in index.html at all. It is injected
 * here, and only once the stored choice is "accepted".
 */
export const GA_ID = 'G-53PTGD76C5';

const CONSENT_KEY = 'cookieConsent';
const OPEN_SETTINGS_EVENT = 'cookie-settings:open';

export const getConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

export const setConsent = (value) => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
};

let loaded = false;

/**
 * Injects gtag.js. Deferred to the window `load` event so the script never
 * competes with the page's own resources on the critical path.
 */
export const loadAnalytics = () => {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  window[`ga-disable-${GA_ID}`] = false;

  const inject = () => {
    window.dataLayer = window.dataLayer || [];
    // gtag.js expects the Arguments object itself, not an array copy.
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  };

  if (document.readyState === 'complete') inject();
  else window.addEventListener('load', inject, { once: true });
};

/**
 * Stops any further hits and deletes the GA cookies, for a visitor who
 * withdraws consent after having given it. That covers `_ga`, `_ga_<ID>`,
 * and the `_gid` / `_gat` ones a linked legacy property can add. The
 * cookies can sit on the exact host or on the registrable domain, so both
 * are cleared.
 */
export const disableAnalytics = () => {
  window[`ga-disable-${GA_ID}`] = true;

  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];

  document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => /^_(ga|gid|gat)(_|$)/.test(name))
    .forEach((name) => {
      domains.forEach((domain) => {
        const scope = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
      });
    });
};

/** Reopens the consent banner, from the footer's "Cookie settings" link. */
export const openCookieSettings = () =>
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

export const onOpenCookieSettings = (handler) => {
  window.addEventListener(OPEN_SETTINGS_EVENT, handler);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
};
