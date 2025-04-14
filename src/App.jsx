import { useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CookieConsent from './components/CookieConsent';

// Lazy load components that are not immediately visible
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Conferences = lazy(() => import('./components/Conferences'));
const Blog = lazy(() => import('./components/Blog'));
const Hobbies = lazy(() => import('./components/Hobbies'));
const Education = lazy(() => import('./components/Education'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));

const LoadingFallback = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6c5ce7, #a8e6cf);
  color: white;
  font-size: 1.2rem;
`;

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Conferences />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Blog />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Experience />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Education />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Hobbies />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <ContactForm />
      </Suspense>
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Footer />
      </Suspense>
      <CookieConsent />
    </>
  );
}

export default App;
