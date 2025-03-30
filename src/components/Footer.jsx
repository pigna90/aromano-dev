import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from '../data/socialLinks';

const FooterContainer = styled.footer`
  background: #2d3436;
  color: white;
  padding: 1rem 0;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 0.5rem 0;

  a {
    color: white;
    font-size: 1.5rem;
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
  font-size: 1.5rem;
  display: inline-block;
  line-height: 1;
  transform: translateY(-1px);
`;

const Copyright = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.1rem;
`;

const License = styled.p`
  margin-top: 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              {link.isMentorIcon ? (
                <MentorIcon>M</MentorIcon>
              ) : (
                <FontAwesomeIcon icon={link.icon} />
              )}
            </a>
          ))}
        </SocialLinks>
        <Copyright>
          © {new Date().getFullYear()} Alessandro Romano. All rights reserved.
        </Copyright>
        <License>
          This project is licensed under the MIT License.
        </License>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 