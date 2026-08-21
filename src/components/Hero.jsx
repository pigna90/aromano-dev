import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-scroll';
import { socialLinks } from '../data/socialLinks';
import { getUpcomingConferences } from '../data/conferences';
import { hardPress } from '../styles/SharedStyles';
import Image from './common/Image';

const HeroSection = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding: calc(var(--nav-height) + 3.5rem) ${({ theme }) => theme.layout.gutter}
    3.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: calc(var(--nav-height) + 2rem)
      ${({ theme }) => theme.layout.gutterMobile} 2.5rem;
  }
`;

const HeroInner = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

/*
 * The name is the layout. Set as wide and as heavy as Archivo's axes allow,
 * cropped tight on the leading so the two lines read as one solid mass.
 */
const Name = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: var(--font-size-hero);
  font-weight: 900;
  font-stretch: 118%;
  line-height: 0.82;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  margin-bottom: 0.35rem;

  /* Direct children only: the caret lives inside the second line and has to
     stay inline. */
  & > span {
    display: block;
  }
`;

const blink = keyframes`
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

/** Terminal caret after the surname. The only thing on the page that blinks. */
const Caret = styled.span`
  display: inline-block;
  width: 0.4em;
  height: 0.72em;
  margin-left: 0.06em;
  background: ${({ theme }) => theme.colors.accentAlt};
  animation: ${blink} 1.1s steps(1, end) infinite;
`;

/** The slab under the name. Pure colour, doing no work other than presence. */
const Bar = styled(motion.div)`
  height: clamp(20px, 2.4vw, 38px);
  background: ${({ theme }) => theme.colors.accent};
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};
  margin-bottom: 0.9rem;
`;

const Role = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(0.8rem, 1.55vw, 1.125rem);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: 2.75rem;
  /* Four items will not fit one line on a phone, so balance the break into
     two even halves rather than leave "musician" orphaned. */
  text-wrap: balance;

  @media (max-width: 768px) {
    letter-spacing: 0.1em;
    margin-bottom: 2rem;
  }
`;

const Lower = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 300px);
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Positioning = styled(motion.p)`
  max-width: 44ch;
  font-size: 1.1875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkSecondary};
  margin-bottom: 1.75rem;

  @media (max-width: 768px) {
    font-size: 1.0625rem;
    max-width: none;
  }
`;

/*
 * Three hard blocks sharing their borders: the negative margin collapses the
 * seam so the row reads as one framed unit rather than three floating cards.
 */
const Facts = styled(motion.dl)`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
  box-shadow: ${({ theme }) => theme.colors.shadowHard};
`;

const Fact = styled.div`
  flex: 1 1 190px;
  min-width: 0;
  padding: 0.85rem 1rem 1rem;
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};
  background: ${({ theme, $fill }) =>
    $fill === 'accent'
      ? theme.colors.accent
      : $fill === 'alt'
        ? theme.colors.accentAlt
        : theme.colors.surface};
  color: ${({ theme, $fill }) =>
    $fill ? theme.colors.onAccent : theme.colors.ink};

  & + & {
    margin-left: -${({ theme }) => theme.borders.base};
  }

  dt {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  dd {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 0.9375rem;
    font-weight: 700;
    font-stretch: 100%;
    line-height: 1.25;
    text-transform: uppercase;
  }

  .aside {
    display: block;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-top: 0.25rem;
  }

  /* Inside a colour block the link stays in the block's own ink. */
  a {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
    box-shadow: inset 0 -2px 0 currentColor;

    &:hover {
      background: transparent;
      box-shadow: inset 0 -6px 0 currentColor;
    }
  }

  @media (max-width: 520px) {
    flex: 1 1 100%;

    & + & {
      margin-left: 0;
      margin-top: -${({ theme }) => theme.borders.base};
    }
  }
`;

const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
`;

const Cta = styled(Link)`
  ${hardPress}
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  padding: 0.95rem 1.6rem;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.bg};
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHardSm};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: ${({ theme }) => theme.borders.thin} solid
      ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.ink};
    font-size: 1.05rem;
    text-decoration: none;
    transition: color ${({ theme }) => theme.motion.fast},
      background ${({ theme }) => theme.motion.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.ink};
      color: ${({ theme }) => theme.colors.bg};
    }
  }
`;

const MentorIcon = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: 1.3rem;
  line-height: 1;
`;

const SubstackIcon = styled.svg`
  width: 1.05rem;
  height: 1.05rem;
  fill: currentColor;
`;

/** Portrait as a framed block: thick border, hard shadow, no radius. */
const Portrait = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHardLg};
  overflow: hidden;

  .hover-image {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion.base};
  }

  @media (min-width: 901px) {
    &:hover .hover-image {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    max-width: 260px;

    &.show-hover .hover-image {
      opacity: 1;
    }
  }
`;

/*
 * Wrapping is allowed only after a slash. Every space inside an item and every
 * space before a slash is non-breaking, so a wrapped line on a phone can never
 * open with a slash or split "AI Engineer" down the middle.
 */
const ROLE = ['Data Scientist', 'AI Engineer', 'Speaker', 'Musician']
  .map((item) => item.replace(/ /g, '\u00a0'))
  .join('\u00a0/ ');

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.2, 0, 0, 1] },
});

const formatTalkDate = (date) =>
  date.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();

const Hero = () => {
  const [showHover, setShowHover] = useState(false);
  const portraitRef = useRef(null);

  const nextTalk = getUpcomingConferences()[0];

  const handlePortraitClick = () => {
    if (window.innerWidth <= 900) {
      setShowHover((previous) => !previous);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        portraitRef.current &&
        !portraitRef.current.contains(event.target) &&
        showHover &&
        window.innerWidth <= 900
      ) {
        setShowHover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHover]);

  return (
    <HeroSection id="hero">
      <HeroInner>
        <Name {...fadeUp(0)}>
          <span>Alessandro</span>
          <span>
            Romano
            <Caret aria-hidden="true" />
          </span>
        </Name>

        <Bar
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0, 0, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        <Role {...fadeUp(0.16)}>{ROLE}</Role>

        <Lower>
          <div>
            <Positioning {...fadeUp(0.22)}>
              I work where data meets the business: pricing, forecasting and
              agentic AI, on the problems that don&apos;t come with a clear path.
            </Positioning>

            <Facts {...fadeUp(0.28)}>
              <Fact $fill="accent">
                <dt>Now</dt>
                <dd>
                  Senior Data Scientist
                  <span className="aside">Kuehne+Nagel</span>
                </dd>
              </Fact>

              {nextTalk && (
                <Fact>
                  <dt>Next</dt>
                  <dd>
                    {nextTalk.info_link ? (
                      <a
                        href={nextTalk.info_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {nextTalk.title}
                      </a>
                    ) : (
                      nextTalk.title
                    )}
                    <span className="aside">
                      {nextTalk.location} ·{' '}
                      {formatTalkDate(new Date(nextTalk.date))}
                    </span>
                  </dd>
                </Fact>
              )}

              <Fact $fill="alt">
                <dt>Podcast</dt>
                <dd>
                  <a
                    href="https://mydataguest.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    My Data Guest
                  </a>
                  <span className="aside">With Rosaria Silipo</span>
                </dd>
              </Fact>
            </Facts>

            <Actions {...fadeUp(0.34)}>
              <Cta to="contact" smooth duration={500} offset={-72}>
                <span aria-hidden="true">▶</span> Get in touch
              </Cta>

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
            </Actions>
          </div>

          <Portrait
            ref={portraitRef}
            className={showHover ? 'show-hover' : ''}
            onClick={handlePortraitClick}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: [0.2, 0, 0, 1] }}
          >
            <Image src="/images/profile/headshot.jpg" alt="Alessandro Romano" />
            <div className="hover-image">
              <Image src="/images/profile/headshot_hover.png" alt="" />
            </div>
          </Portrait>
        </Lower>
      </HeroInner>
    </HeroSection>
  );
};

export default Hero;
