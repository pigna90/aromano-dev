/**
 * Everything the Impressum (§ 5 DDG) and the privacy policy need to know
 * about the person running the site. Both pages read from here, so this is
 * the only file to edit when you move or change your phone number.
 *
 * Fields set to `null` are optional and simply not shown. Anything still
 * wrapped in square brackets is a placeholder: the production build refuses
 * to run while one is left (see `legalPlaceholders` in vite.config.js), so a
 * half-filled Impressum can never be deployed.
 */
export const operator = {
  name: 'Alessandro Romano',

  // Must be an address where post and legal documents can be served on you.
  // A PO box is not enough. A paid "Impressum address" service works if you
  // would rather not publish your home address.
  // With an address service, put its name here (printed as "c/o ...") and
  // its address below. Leave null if the address is your own.
  careOf: null,
  street: null,
  postalCode: null,
  city: null,
  country: 'Deutschland',

  email: 'contact@aromano.dev',

  // A second fast way to reach you besides email. A phone number is the
  // safest choice; set to null only if you rely on the contact form instead.
  phone: null,

  // Only if you have one (freelance or registered business). Otherwise null.
  vatId: null,
};

/**
 * How long Google Analytics keeps event data. Matches the "Data retention"
 * setting under GA4 Admin > Data collection and modification. Google's
 * default is 2 months; the other option is 14.
 */
export const analyticsRetentionMonths = 2;

/** Shown at the bottom of the privacy policy. Bump it whenever the text changes. */
export const privacyLastUpdated = 'November 16, 2026';

/** True once a postal address is filled in. The Impressum is incomplete until then. */
export const hasPostalAddress = () =>
  Boolean(operator.street && operator.postalCode && operator.city);

/** Placeholder values still left in `operator`, for the build-time guard. */
export const missingLegalFields = () =>
  Object.entries(operator)
    .filter(([, value]) => typeof value === 'string' && /^\[.*\]$/.test(value))
    .map(([key]) => key);
