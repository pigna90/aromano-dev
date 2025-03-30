import { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Conferences from './components/Conferences';
import Hobbies from './components/Hobbies';

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
  margin-bottom: 1rem;

  a {
    color: white;
    font-size: 1.5rem;
    margin: 0 1rem;
    transition: color 0.3s ease;

    &:hover {
      color: #3498db;
    }
  }
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
      <Hobbies />
      <Footer>
        <FooterContent>
          <SocialLinks>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </SocialLinks>
          <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </FooterContent>
      </Footer>
    </>
  );
}

export default App;
