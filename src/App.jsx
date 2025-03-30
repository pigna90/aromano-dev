import { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Conferences from './components/Conferences';
import Hobbies from './components/Hobbies';
import Education from './components/Education';

const Footer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;

  a {
    color: white;
    font-size: 1.8rem;
    transition: all 0.3s ease;
    opacity: 0.9;
    
    &:hover {
      transform: translateY(-3px);
      opacity: 1;
    }
  }
`;

const MentorIcon = styled.span`
  font-family: 'Segoe UI', sans-serif;
  font-weight: bold;
  font-size: 1.8rem;
  display: inline-block;
  line-height: 1;
  transform: translateY(-1px);
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
      <About />
      <Conferences />
      <Experience />
      <Education />
      <Hobbies />
      <Footer>
        <FooterContent>
          <SocialLinks>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://medium.com/@yourusername" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faMedium} />
            </a>
            <a href="https://mentorcruise.com/mentor/yourusername/" target="_blank" rel="noopener noreferrer">
              <MentorIcon>M</MentorIcon>
            </a>
          </SocialLinks>
          <p>&copy; 2024 Alessandro Romano. All rights reserved.</p>
        </FooterContent>
      </Footer>
    </>
  );
}

export default App;
