import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from '../data/socialLinks';

/* The page ends on a fully inverted slab. */
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.bg};
  border-top: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  padding: 3rem ${({ theme }) => theme.layout.gutter};

  @media (max-width: 768px) {
    padding: 2.5rem ${({ theme }) => theme.layout.gutterMobile};
  }
`;

const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const Legal = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  line-height: 1.9;

  p {
    margin: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: ${({ theme }) => theme.borders.thin} solid
      ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.bg};
    font-size: 1.05rem;
    transition: color ${({ theme }) => theme.motion.fast},
      background ${({ theme }) => theme.motion.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      border-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.onAccent};
    }
  }
`;

const MentorIcon = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.3rem;
  line-height: 1;
`;

const SubstackIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Legal>
          <p>© {new Date().getFullYear()} Alessandro Romano</p>
          <p>MIT Licensed</p>
        </Legal>
        <SocialLinks>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              title={link.name}
            >
              {link.isMentorIcon ? (
                <MentorIcon aria-hidden="true">M</MentorIcon>
              ) : link.isSubstackIcon ? (
                <SubstackIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </SubstackIcon>
              ) : (
                <FontAwesomeIcon icon={link.icon} />
              )}
            </a>
          ))}
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
