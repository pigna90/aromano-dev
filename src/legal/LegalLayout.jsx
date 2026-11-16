import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from '../styles/ThemeContext';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import { operator, hasPostalAddress } from '../data/legal';

const TopBar = styled.header`
  border-bottom: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  padding: 1.25rem ${({ theme }) => theme.layout.gutter};

  @media (max-width: 768px) {
    padding: 1rem ${({ theme }) => theme.layout.gutterMobile};
  }

  a {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.ink};
    padding: 0.2rem 0.35rem;
    margin-left: -0.35rem;

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.onAccent};
    }
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 4rem ${({ theme }) => theme.layout.gutter} 6rem;

  @media (max-width: 768px) {
    padding: 2.5rem ${({ theme }) => theme.layout.gutterMobile} 4rem;
  }
`;

/**
 * Long-form legal text. The global h2 is a display-size section heading, far
 * too loud for a numbered clause, so headings are scaled down here.
 */
export const Prose = styled.div`
  color: ${({ theme }) => theme.colors.inkSecondary};

  h1 {
    margin-bottom: 0.5rem;
    overflow-wrap: anywhere;
  }

  h2 {
    font-size: 1.5rem;
    font-stretch: 100%;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin: 3rem 0 1rem;
    scroll-margin-top: 1.5rem;
  }

  h3 {
    font-size: 1.1rem;
    margin: 1.75rem 0 0.5rem;
  }

  ul {
    margin: 0 0 1rem 1.25rem;
  }

  li {
    margin-bottom: 0.35rem;
  }

  address {
    font-style: normal;
    margin-bottom: 1rem;
  }

  a {
    overflow-wrap: anywhere;
  }
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 2.5rem;
`;

/** A button that reads as an inline link, for actions inside running text. */
export const InlineButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accentInk};
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;

  &:hover {
    background: ${({ theme }) => theme.colors.accentInk};
    color: ${({ theme }) => theme.colors.onAccentInk};
    text-decoration: none;
  }
`;

export const Updated = styled.p`
  margin-top: 3rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/**
 * Postal address of the site operator, as both pages print it. Until an
 * address is set in src/data/legal.js only the name is shown.
 */
export const OperatorAddress = () => (
  <address>
    {operator.name}
    {hasPostalAddress() && (
      <>
        <br />
        {operator.careOf && (
          <>
            c/o {operator.careOf}
            <br />
          </>
        )}
        {operator.street}
        <br />
        {operator.postalCode} {operator.city}
        <br />
        {operator.country}
      </>
    )}
  </address>
);

const LegalLayout = ({ children }) => (
  <ThemeProvider>
    <GlobalStyles />
    <TopBar>
      <a href="/">← Alessandro Romano</a>
    </TopBar>
    <Main>
      <Prose>{children}</Prose>
    </Main>
    <Footer />
    <CookieConsent />
  </ThemeProvider>
);

export default LegalLayout;
