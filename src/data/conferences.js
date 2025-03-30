/**
 * All conferences data
 * Conferences are automatically categorized as 'upcoming' or 'past' based on their date
 */
export const conferences = [
  {
    title: 'AI & ML Summit',
    topic: 'Large Language Models in Production',
    date: 'March 20, 2025',
    description: 'Presenting strategies for deploying and scaling LLMs in production environments with a focus on efficiency and cost optimization.',
    image: '/images/conferences/ai-ml-summit.jpg'
  },
  {
    title: 'Web Performance Conference',
    topic: 'Next-Generation Web Performance',
    date: 'May 15, 2025',
    description: 'Exploring cutting-edge techniques for optimizing web applications, including Core Web Vitals and new browser APIs.',
    image: '/images/conferences/web-perf-conf.jpg'
  },
  {
    title: 'React Summit',
    topic: 'Building Large-Scale React Applications',
    date: 'April 15, 2024',
    description: 'Presented advanced patterns for managing complex React applications with a focus on performance optimization.',
    image: '/images/conferences/react-summit.jpg'
  },
  {
    title: 'AI Conference 2023',
    topic: 'Machine Learning in Production',
    date: 'November 15, 2023',
    description: 'Discussed implementing ML models in production environments.',
    image: '/images/conferences/ai-conf.jpg'
  },
  {
    title: 'React Conference 2022',
    topic: 'Server Components',
    date: 'December 10, 2022',
    description: 'Discussed the future of React with Server Components.',
    image: '/images/conferences/react-conf.jpg'
  },
  {
    title: 'Web Summit 2021',
    topic: 'Future of Web Development',
    date: 'December 15, 2021',
    description: 'Discussed emerging trends in web development.',
    image: '/images/conferences/web-summit.jpg'
  }
];

/**
 * Helper function to add a new conference
 * @param {Object} conference Conference data object
 */
export const addConference = (conference) => {
  const newConference = {
    ...conference,
    image: `/images/conferences/${conference.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')}.jpg`
  };
  
  conferences.push(newConference);
  conferences.sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Helper function to get upcoming conferences
 * @returns {Array} Array of upcoming conferences
 */
export const getUpcomingConferences = () => {
  const now = new Date();
  return conferences.filter(conf => new Date(conf.date) > now);
};

/**
 * Helper function to get past conferences
 * @returns {Array} Array of past conferences
 */
export const getPastConferences = () => {
  const now = new Date();
  return conferences.filter(conf => new Date(conf.date) <= now);
};

/**
 * Helper function to get past conferences grouped by year
 * @returns {Object} Object with years as keys and arrays of conferences as values
 */
export const getPastConferencesByYear = () => {
  const pastConfs = getPastConferences();
  return pastConfs.reduce((acc, conf) => {
    const year = new Date(conf.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push({
      ...conf,
      month: new Date(conf.date).toLocaleString('en-US', { month: 'long' }),
      day: new Date(conf.date).getDate().toString(),
      type: 'past'
    });
    return acc;
  }, {});
}; 