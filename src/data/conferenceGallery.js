/**
 * Stage photos for the Speaking section.
 *
 * These live in `public/` and are referenced by URL rather than imported, so
 * Vite serves the one copy it already passes through instead of emitting a
 * second hashed duplicate of every file into `dist/assets`.
 *
 * Each entry names the talk it comes from. The alt text is the only place a
 * search engine learns which stages these are, so it carries the event, the
 * city and the subject rather than "conference photo 1 of 5".
 */
export const conferenceGallery = [
  {
    src: '/images/conferences/alessandro-romano-speaking-datahack-summit-bengaluru-2026.webp',
    alt: 'Alessandro Romano speaking on the Human x AI stage at DATAHACK Summit 2026 in Bengaluru, presenting a fine-tuned LLM chatbot built from his own chat data',
    caption: 'DATAHACK Summit 2026 · Bengaluru',
    width: 1600,
    height: 1066,
  },
  {
    src: '/images/conferences/alessandro-romano-speaking-ai-heroes-turin-2024.webp',
    alt: 'Alessandro Romano presenting LLM prompt design and AI agent orchestration with CrewAI at AI Heroes 2024 in Turin',
    caption: 'AI Heroes 2024 · Turin',
    width: 1600,
    height: 1066,
  },
  {
    src: '/images/conferences/alessandro-romano-speaking-data-ai-conference-athens-2024.webp',
    alt: 'Alessandro Romano on stage at the Data & AI Conference 2024 in Athens, giving his talk on building a high-performing data team',
    caption: 'Data & AI Conference 2024 · Athens',
    width: 1600,
    height: 1066,
  },
  {
    src: '/images/conferences/alessandro-romano-speaking-apply-data-summit-berlin-2023.webp',
    alt: 'Alessandro Romano speaking about digital experimentation, A/B testing and causal inference at Apply Data Summit 2023 in Berlin',
    caption: 'Apply Data Summit 2023 · Berlin',
    width: 1600,
    height: 1066,
  },
  {
    src: '/images/conferences/alessandro-romano-speaking-data-innovation-summit-stockholm-2022.webp',
    alt: 'Alessandro Romano on the machine and deep learning stage at Data Innovation Summit 2022 in Stockholm, talking about causal inference in the ride-hailing business',
    caption: 'Data Innovation Summit 2022 · Stockholm',
    width: 1600,
    height: 1066,
  },
];
