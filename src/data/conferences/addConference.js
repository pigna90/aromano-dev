import fs from 'fs';
import path from 'path';

/**
 * Add a new conference to the data files
 * @param {Object} conference Conference data object
 * @param {string} conference.title Conference title
 * @param {string} conference.topic Conference topic
 * @param {string} conference.date Date in format 'Month DD, YYYY'
 * @param {string} conference.description Conference description
 * @param {string} conference.imagePath Path to the conference image file
 */
export const addConference = (conference) => {
  const date = new Date(conference.date);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate().toString();

  // Create image filename from conference title
  const imageFileName = conference.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Determine if conference is upcoming or past
  const isUpcoming = date > new Date();
  const type = isUpcoming ? 'upcoming' : 'past';

  // Create conference object
  const conferenceData = {
    title: conference.title,
    topic: conference.topic,
    date: conference.date,
    month,
    day,
    year,
    description: conference.description,
    type,
    image: `/images/conferences/${isUpcoming ? 'upcoming' : year}/${imageFileName}.jpg`
  };

  // Copy image to appropriate directory
  if (conference.imagePath) {
    const targetDir = path.join('public', 'images', 'conferences', isUpcoming ? 'upcoming' : year.toString());
    const targetPath = path.join(targetDir, `${imageFileName}.jpg`);
    
    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy image file
    fs.copyFileSync(conference.imagePath, targetPath);
  }

  // Update conference data file
  if (isUpcoming) {
    const upcomingPath = path.join('src', 'data', 'conferences', 'upcomingConferences.js');
    const upcomingContent = fs.readFileSync(upcomingPath, 'utf8');
    const upcomingConferences = eval(upcomingContent.replace('export const upcomingConferences =', ''));
    
    upcomingConferences.push(conferenceData);
    upcomingConferences.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    fs.writeFileSync(
      upcomingPath,
      `export const upcomingConferences = ${JSON.stringify(upcomingConferences, null, 2)};`
    );
  } else {
    const pastPath = path.join('src', 'data', 'conferences', 'pastConferences.js');
    const pastContent = fs.readFileSync(pastPath, 'utf8');
    const pastConferences = eval(pastContent.replace('export const pastConferences =', ''));
    
    if (!pastConferences[year]) {
      pastConferences[year] = [];
    }
    
    pastConferences[year].push(conferenceData);
    pastConferences[year].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    fs.writeFileSync(
      pastPath,
      `export const pastConferences = ${JSON.stringify(pastConferences, null, 2)};`
    );
  }
};

// Example usage:
/*
addConference({
  title: 'New Tech Conference',
  topic: 'Emerging Technologies',
  date: 'June 15, 2024',
  description: 'Exploring the latest technological innovations.',
  imagePath: '/path/to/conference-image.jpg'
});
*/ 