import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from './styles/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import CookieConsent from './components/CookieConsent';

// Lazy load components that are not immediately visible
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Conferences = lazy(() => import('./components/Conferences'));
const Podcast = lazy(() => import('./components/Podcast'));
const Blog = lazy(() => import('./components/Blog'));
const Hobbies = lazy(() => import('./components/Hobbies'));
const Education = lazy(() => import('./components/Education'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));

/**
 * Reserves roughly a section's worth of height so the page doesn't jump as
 * each lazy chunk resolves.
 */
const SectionSkeleton = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.hairline};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const sections = [About, Conferences, Podcast, Blog, Experience, Education, Hobbies, ContactForm];

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Ticker />
      {sections.map((SectionComponent, index) => (
        <Suspense key={index} fallback={<SectionSkeleton>Loading</SectionSkeleton>}>
          <SectionComponent />
        </Suspense>
      ))}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <CookieConsent />
    </ThemeProvider>
  );
}

export default App;
