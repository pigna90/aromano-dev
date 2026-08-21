import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, GhostButton } from '../styles/SharedStyles';

const CookieBanner = styled(motion.div)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  max-width: 620px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHard};
  color: ${({ theme }) => theme.colors.ink};
  padding: 1.25rem 1.5rem;
  z-index: 1100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const CookieText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkSecondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;

  button {
    padding: 0.65rem 1.1rem;
    font-size: 0.7rem;
  }

  @media (max-width: 640px) {
    button {
      flex: 1;
    }
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
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
        >
          <CookieText>
            I use cookies to understand how the site is used. Analytics only.
            Nothing is sold or shared.
          </CookieText>
          <ButtonGroup>
            <GhostButton onClick={handleDecline}>Decline</GhostButton>
            <Button onClick={handleAccept}>Accept</Button>
          </ButtonGroup>
        </CookieBanner>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
