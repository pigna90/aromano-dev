/**
 * JSON-LD for the site.
 *
 * This is what turns a page that merely mentions talks and mentoring into an
 * entity a search engine can reason about: one `Person` node, with the social
 * profiles that prove it is the same person, the subjects that person is known
 * for, and the stages they have actually stood on.
 *
 * Injected into `index.html` at build time by the `structuredData` plugin in
 * `vite.config.js`, so it is present in the served HTML rather than added by
 * the bundle after the crawler has already read the page.
 */
import { conferences } from './conferences.js';

export const SITE_URL = 'https://www.aromano.dev';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Every profile that is provably the same person, for entity consolidation. */
const SAME_AS = [
  'https://www.linkedin.com/in/alessandro-romano-1990',
  'https://github.com/pigna90',
  'https://medium.com/@alerom90',
  'https://alerom90.substack.com/',
  'https://www.youtube.com/@alessandro-romano90',
  'https://mentorcruise.com/mentor/alessandroromano/',
];

/*
 * The subjects to compete on. Each one is backed further down the page by a
 * talk topic or an experience entry, which is the difference between a keyword
 * list and a claim.
 */
const KNOWS_ABOUT = [
  'Agentic AI',
  'AI agents',
  'Large language models',
  'Multi-agent systems',
  'Dynamic pricing',
  'Demand forecasting',
  'Time series foundation models',
  'Causal inference',
  'A/B testing and digital experimentation',
  'MLOps',
  'Data science',
  'Python',
];

/**
 * Talks become `performerIn` on the Person rather than standalone `Event`
 * nodes: the accurate claim is that he spoke at these events, not that this
 * page is the event listing for 39 conferences.
 */
/*
 * Built from the local date parts rather than `toISOString()`, which would
 * convert local midnight to UTC and hand every talk east of Greenwich the
 * previous day's date.
 */
export const isoDate = (date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');

const buildTalks = () =>
  conferences
    .filter((conf) => conf.topic && conf.topic !== 'TBD')
    .map((conf) => {
      const startDate = new Date(conf.date);

      return {
        '@type': 'Event',
        name: `${conf.title}: ${conf.topic}`,
        startDate: Number.isNaN(startDate.getTime())
          ? undefined
          : isoDate(startDate),
        description: conf.description,
        ...(conf.location
          ? { location: { '@type': 'Place', name: conf.location } }
          : {}),
        ...(conf.info_link ? { url: conf.info_link } : {}),
        performer: { '@id': PERSON_ID },
      };
    });

export const buildStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Alessandro Romano',
      givenName: 'Alessandro',
      familyName: 'Romano',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/images/profile/headshot.webp`,
      jobTitle: 'Senior Data Scientist',
      description:
        'Senior data scientist and AI engineer working on dynamic pricing, forecasting and agentic AI. International conference speaker and mentor to data scientists and AI engineers.',
      knowsAbout: KNOWS_ABOUT,
      sameAs: SAME_AS,
      worksFor: {
        '@type': 'Organization',
        name: 'Kuehne+Nagel',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'University of Pisa',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'University of Bari',
        },
      ],
      knowsLanguage: ['en', 'it'],
      performerIn: buildTalks(),
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'Alessandro Romano',
      description:
        'Personal site of Alessandro Romano, AI engineer, conference speaker and mentor.',
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: 'Alessandro Romano | AI Engineer, Conference Speaker & AI Mentor',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      primaryImageOfPage: `${SITE_URL}/og-image-datahack-2026.jpg`,
      inLanguage: 'en',
    },
    {
      '@type': 'PodcastSeries',
      '@id': `${SITE_URL}/#podcast`,
      name: 'My Data Guest',
      url: 'https://mydataguest.substack.com/',
      description:
        'Artificial intelligence without the hype: agentic AI, prompt engineering, large language models and the ethics of it all, plus hands-on courses.',
      inLanguage: 'en',
      author: [
        { '@id': PERSON_ID },
        { '@type': 'Person', name: 'Rosaria Silipo' },
      ],
    },
  ],
});
