import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons';

const HeroSection = styled.header`
  height: 100vh;
  background: linear-gradient(135deg, #6c5ce7, #a8e6cf);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 1rem;
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.5rem;
    opacity: 0.9;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  .roles {
    font-size: 1.3rem;
    opacity: 0.85;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;

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

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Alessandro Romano
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Data Scientist
        </motion.p>
        <motion.p 
          className="roles"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Musician & Public Speaker
        </motion.p>
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faGithub} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </motion.a>
          <motion.a
            href="https://medium.com/@yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faMedium} />
          </motion.a>
          <motion.a
            href="https://mentorcruise.com/mentor/yourusername/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MentorIcon>M</MentorIcon>
          </motion.a>
        </SocialLinks>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 