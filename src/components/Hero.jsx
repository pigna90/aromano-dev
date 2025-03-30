import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMedium, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { socialLinks } from '../data/socialLinks';
import Image from './common/Image';
import { useState, useEffect, useRef } from 'react';

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

const ProfileImage = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
  width: 250px;
  height: 250px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  overflow: hidden;
  
  .hover-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  @media (min-width: 769px) {
    &:hover {
      .hover-image {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    &.show-hover {
      .hover-image {
        opacity: 1;
      }
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
  font-family: var(--font-primary);
  font-weight: bold;
  font-size: 1.8rem;
  display: inline-block;
  line-height: 1;
  transform: translateY(-1px);
`;

const Hero = () => {
  const [showHover, setShowHover] = useState(false);
  const profileImageRef = useRef(null);

  const handleImageInteraction = () => {
    if (window.innerWidth <= 768) {
      setShowHover(!showHover);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileImageRef.current && 
        !profileImageRef.current.contains(event.target) && 
        showHover && 
        window.innerWidth <= 768
      ) {
        setShowHover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHover]);

  return (
    <HeroSection>
      <HeroContent>
        <ProfileImage
          ref={profileImageRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={showHover ? 'show-hover' : ''}
          onClick={handleImageInteraction}
        >
          <Image 
            src="/images/profile/headshot.jpg" 
            alt="Profile" 
            borderRadius="50%"
          />
          <div className="hover-image">
            <Image 
              src="/images/profile/headshot_hover.png" 
              alt="Profile Hover" 
              borderRadius="50%"
            />
          </div>
        </ProfileImage>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Alessandro Romano
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Data Scientist • Musician • Public Speaker
        </motion.p>
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.isMentorIcon ? (
                <MentorIcon>M</MentorIcon>
              ) : (
                <FontAwesomeIcon icon={link.icon} />
              )}
            </motion.a>
          ))}
        </SocialLinks>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 