import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-scroll';
import { socialLinks } from '../data/socialLinks';
import { getUpcomingConferences } from '../data/conferences';
import Image from './common/Image';

const HeroSection = styled.header`
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  padding: calc(var(--nav-height) + 4rem) ${({ theme }) => theme.layout.gutter} 4rem;
  overflow: hidden;

  /* Faint plotted dot-grid, faded out towards the edges */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      ${({ theme }) => theme.colors.dot} 1px,
      transparent 1px
    );
    background-size: 26px 26px;
    -webkit-mask-image: radial-gradient(
      ellipse 75% 65% at 32% 42%,
      #000 0%,
      transparent 78%
    );
    mask-image: radial-gradient(
      ellipse 75% 65% at 32% 42%,
      #000 0%,
      transparent 78%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: calc(var(--nav-height) + 2.5rem) ${({ theme }) => theme.layout.gutterMobile} 3rem;
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 4rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Eyebrow = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.25rem;
`;

const Name = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: var(--font-size-hero);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.035em;
  margin-bottom: 1.5rem;

  span {
    display: block;
  }
`;

const Positioning = styled(motion.p)`
  max-width: 34ch;
  font-size: 1.1875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.inkSecondary};
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    font-size: 1.0625rem;
    max-width: none;
  }
`;

/** The "Now" strip: current role, next talk, podcast — evidence above the fold. */
const NowStrip = styled(motion.dl)`
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};
  margin-bottom: 2.25rem;

  .label {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.inkMuted};
  }

  .value {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.ink};

    a {
      color: inherit;
      text-decoration: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.accentBorder};
      padding-bottom: 1px;

      &:hover {
        color: ${({ theme }) => theme.colors.accentInk};
        border-bottom-color: ${({ theme }) => theme.colors.accent};
      }
    }
  }

  .aside {
    color: ${({ theme }) => theme.colors.inkMuted};
  }
`;

const NowRow = styled.div`
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 1rem;
  align-items: baseline;
  padding: 0.7rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: -0.6rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.radii.md};
    color: ${({ theme }) => theme.colors.inkSecondary};
    font-size: 1.15rem;
    text-decoration: none;
    transition: color ${({ theme }) => theme.motion.fast},
      background ${({ theme }) => theme.motion.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.accentInk};
      background: ${({ theme }) => theme.colors.accentSoft};
    }
  }
`;

const MentorIcon = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1;
`;

const SubstackIcon = styled.svg`
  width: 1.05rem;
  height: 1.05rem;
  fill: currentColor;
`;

const Portrait = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 340px;
  aspect-ratio: 4 / 5;
  margin-left: auto;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.hairline};

  .hover-image {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion.slow};
  }

  @media (min-width: 769px) {
    &:hover .hover-image {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    margin: 0;
    max-width: 260px;

    &.show-hover .hover-image {
      opacity: 1;
    }
  }
`;

const ScrollCue = styled(Link)`
  position: absolute;
  left: 50%;
  bottom: 1.75rem;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-decoration: none;
  cursor: pointer;
  z-index: 1;

  &::after {
    content: '';
    width: 1px;
    height: 28px;
    background: linear-gradient(
      ${({ theme }) => theme.colors.hairlineStrong},
      transparent
    );
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accentInk};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.2, 0, 0, 1] },
});

const formatTalkDate = (date) =>
  date.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();

const Hero = () => {
  const [showHover, setShowHover] = useState(false);
  const portraitRef = useRef(null);

  const nextTalk = getUpcomingConferences()[0];

  const handlePortraitClick = () => {
    if (window.innerWidth <= 768) {
      setShowHover((previous) => !previous);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        portraitRef.current &&
        !portraitRef.current.contains(event.target) &&
        showHover &&
        window.innerWidth <= 768
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
        <div>
          <Eyebrow {...fadeUp(0)}>Data Scientist · Speaker · Musician</Eyebrow>

          <Name {...fadeUp(0.06)}>
            <span>Alessandro</span>
            <span>Romano</span>
          </Name>

          <Positioning {...fadeUp(0.12)}>
            I work where data meets the business — pricing, forecasting and
            agentic AI — on the problems that don&apos;t come with a clear path.
          </Positioning>

          <NowStrip {...fadeUp(0.18)}>
            <NowRow>
              <dt className="label">Now</dt>
              <dd className="value">
                Senior Data Scientist <span className="aside">· Kuehne+Nagel</span>
              </dd>
            </NowRow>

            {nextTalk && (
              <NowRow>
                <dt className="label">Next talk</dt>
                <dd className="value">
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
                  )}{' '}
                  <span className="aside">
                    · {nextTalk.location} · {formatTalkDate(new Date(nextTalk.date))}
                  </span>
                </dd>
              </NowRow>
            )}

            <NowRow>
              <dt className="label">Podcast</dt>
              <dd className="value">
                <a
                  href="https://mydataguest.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Data Guest
                </a>{' '}
                <span className="aside">· with Rosaria Silipo</span>
              </dd>
            </NowRow>
          </NowStrip>

          <SocialLinks {...fadeUp(0.24)}>
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
        </div>

        <Portrait
          ref={portraitRef}
          className={showHover ? 'show-hover' : ''}
          onClick={handlePortraitClick}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
        >
          <Image src="/images/profile/headshot.jpg" alt="Alessandro Romano" />
          <div className="hover-image">
            <Image src="/images/profile/headshot_hover.png" alt="" />
          </div>
        </Portrait>
      </HeroInner>

      <ScrollCue to="about" smooth duration={500} offset={-64}>
        Scroll
      </ScrollCue>
    </HeroSection>
  );
};

export default Hero;
