import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(44, 62, 80, 0.95);
  color: white;
  padding: 1rem;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const CookieText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  max-width: 600px;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  background: ${props => props.$primary ? '#3498db' : 'transparent'};
  color: white;
  border: ${props => props.$primary ? 'none' : '1px solid white'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$primary ? '#2980b9' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    // Disable Google Analytics
    window['ga-disable-G-53PTGD76C5'] = true;
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <CookieBanner
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <CookieText>
            We use cookies to enhance your browsing experience and analyze site traffic. 
            By clicking "Accept All", you consent to our use of cookies.
          </CookieText>
          <ButtonGroup>
            <Button onClick={handleDecline}>Decline</Button>
            <Button $primary onClick={handleAccept}>Accept All</Button>
          </ButtonGroup>
        </CookieBanner>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 