# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React 19, Vite 6, and Styled Components. The site showcases professional experience, conference talks, blog posts (fetched from Medium and Substack), and includes a contact form. It's deployed to GitHub Pages with automatic CI/CD.

## Development Commands

```bash
# Start development server (runs on localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Deploy to GitHub Pages (builds + copies CNAME + deploys)
npm run deploy
```

## Architecture

### Component Structure

The app uses lazy loading for performance optimization. Only `Navbar`, `Hero`, and `CookieConsent` are loaded immediately; all other components are lazy-loaded via `React.lazy()` in `src/App.jsx`.

**Component hierarchy:**
- `App.jsx` - Main app shell with lazy-loaded sections
- `Navbar.jsx` - Navigation bar with smooth scroll links
- `Hero.jsx` - Landing section with social links
- `About.jsx` - About section
- `Conferences.jsx` - Conference talks with tabs (Upcoming/Past) and timeline/grid view toggle
- `Blog.jsx` - Fetches and displays latest posts from Medium and Substack
- `Experience.jsx` - Professional experience timeline
- `Education.jsx` - Education history
- `Hobbies.jsx` - Personal interests
- `ContactForm.jsx` - Contact form
- `Footer.jsx` - Footer with additional links
- `CookieConsent.jsx` - Cookie consent banner
- `ConferenceGallery.jsx` - Sub-component for conference image display

### Data Layer

All content data lives in `src/data/`:
- **`conferences.js`** - Conference data with auto-categorization. Exports `conferences` array and helper functions `getUpcomingConferences()` and `getPastConferencesByYear()`. Conferences are categorized by comparing their date to today.
- **`blog.js`** - `fetchBlogPosts()` function that fetches from Medium and Substack RSS feeds via rss2json API. Returns fallback data if fetch fails.
- **`socialLinks.js`** - Social media links configuration for Hero component

### Styling

Uses Styled Components with shared styles:
- **`styles/GlobalStyles.js`** - Global CSS reset and base styles
- **`styles/SharedStyles.js`** - Reusable styled components (`Section`, `SectionContent`, `Title`)
- Component-specific styled components are colocated in their respective component files

### Key Patterns

1. **Conference Date Logic**: Conferences are stored in a single array. The `Conferences.jsx` component automatically categorizes them as "upcoming" or "past" by parsing the date string and comparing to current date.

2. **Blog Post Fetching**: The `Blog.jsx` component fetches posts on mount using `fetchBlogPosts()` from `src/data/blog.js`. It shows a loading state and handles errors gracefully with fallback data.

3. **Animations**: Uses Framer Motion (`framer-motion`) for smooth transitions, especially in the Conferences component when switching between tabs and views.

4. **Responsive Design**: Components use media queries in styled components (typically `@media (max-width: 768px)`) for mobile responsiveness.

## Deployment

The site deploys automatically via GitHub Actions on push to `main`. The workflow:
1. Builds the site with `npm run build`
2. Copies CNAME file to dist (handled by vite.config.js build hook)
3. Deploys to GitHub Pages

**Important**: The `vite.config.js` has `base: '/'` (not a subdirectory path) and includes a build hook that copies the CNAME file to the dist folder for custom domain support.

## Adding Content

### Adding a Conference
Edit `src/data/conferences.js` and add a new object to the `conferences` array:
```javascript
{
  title: 'Conference Name',
  topic: 'Talk Topic',
  date: 'Month DD, YYYY',  // Must match this format for date parsing
  description: 'Description text',
  location: 'City',
  info_link: 'https://conference-url.com/'
}
```

The conference will automatically appear in "Upcoming" or "Past" based on its date.

### Adding Conference Images
Place images in `public/images/conferences/` and they can be referenced in components. The `ConferenceGallery` component handles image display.

## ESLint Configuration

The project uses a flat config ESLint setup (`eslint.config.js`) with:
- React Hooks plugin
- React Refresh plugin
- Custom rule: unused vars are ignored if they match `^[A-Z_]` pattern (for styled components)

## Dependencies of Note

- **react-scroll**: Used in Navbar for smooth scrolling to sections
- **@fortawesome/react-fontawesome**: For icon display
- **framer-motion**: For animations and transitions
- **styled-components**: For component styling
