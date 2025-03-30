import { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Conferences from './components/Conferences';
import Hobbies from './components/Hobbies';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

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
      <About />
      <Conferences />
      <Experience />
      <Education />
      <Hobbies />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;
