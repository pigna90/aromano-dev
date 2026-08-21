import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Section, SectionContent, Title, Lead } from '../styles/SharedStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSkating,
  faGuitar,
  faSwimmer,
  faHouseSignal,
  faPizzaSlice,
  faPersonSkiing,
  faMicrophoneLines
} from '@fortawesome/free-solid-svg-icons';

/*
 * A mosaic, not a row. Seven items never divide evenly into equal tracks, so
 * instead of fighting for a tidy grid the blocks are given deliberate spans on
 * a 6-column field: 4+2 / 2+2+2 / 3+3. Every row fills exactly, the widths
 * stay irregular, and the right edge never runs ragged.
 */
const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(170px, auto);
  gap: 0.85rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(140px, auto);
  }

  /* Still two columns on a phone. Seven full-width blocks stacked would turn
     a light aside into a screen and a half of scrolling. */
  @media (max-width: 480px) {
    grid-auto-rows: minmax(112px, auto);
    gap: 0.6rem;
  }
`;

/*
 * Four flat fills in rotation. Colour arrives as whole blocks here, so the
 * card sets its own text colour and the colour of the hard offset shadow
 * behind it. The ink block gets an orange shadow: an ink-on-ink shadow would
 * disappear into the block itself.
 */
const tones = {
  paper: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.ink};
    --block-shadow: ${({ theme }) => theme.colors.ink};
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    --block-shadow: ${({ theme }) => theme.colors.ink};
  `,
  alt: css`
    background: ${({ theme }) => theme.colors.accentAlt};
    color: ${({ theme }) => theme.colors.onAccentAlt};
    --block-shadow: ${({ theme }) => theme.colors.ink};
  `,
  ink: css`
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.bg};
    --block-shadow: ${({ theme }) => theme.colors.accentAlt};
  `
};

const HobbyBlock = styled(motion.div)`
  ${({ $tone }) => tones[$tone]}
  grid-column: span ${({ $span }) => $span};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.15rem 1.25rem;
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.hairline};
  border-radius: 0;
  box-shadow: 3px 3px 0 var(--block-shadow);
  transition: transform ${({ theme }) => theme.motion.base},
    box-shadow ${({ theme }) => theme.motion.base};

  /* The icon is scenery, not a bullet: set huge, bled off the bottom-right
     corner and clipped by the block, so it reads as a printed mark. */
  .mark {
    position: absolute;
    right: -0.5rem;
    bottom: -1.25rem;
    /* The widest block gets a bigger mark: at 4 columns a 6.5rem icon leaves
       the block reading as empty paper with a corner sticker on it. */
    font-size: ${({ $feature }) => ($feature ? '10rem' : '6.5rem')};
    opacity: 0.16;
    pointer-events: none;
    transition: transform ${({ theme }) => theme.motion.slow},
      opacity ${({ theme }) => theme.motion.slow};
  }

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--block-shadow);
  }

  /* On hover the mark swings up and forward instead of the card recolouring:
     the fills are already at full saturation, so there is nowhere to go. */
  &:hover .mark {
    transform: translate(-0.5rem, -0.75rem) rotate(-8deg) scale(1.08);
    opacity: 0.26;
  }

  @media (max-width: 900px) {
    grid-column: span ${({ $span }) => ($span >= 4 ? 2 : 1)};
    padding: 1rem 1.1rem;

    .mark {
      font-size: ${({ $feature }) => ($feature ? '7rem' : '5rem')};
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem 0.9rem;

    /* Pushed further off the corner: on a narrow block the title runs into the
       mark, and at this size the two fight instead of layering. */
    .mark {
      font-size: ${({ $feature }) => ($feature ? '5.5rem' : '4rem')};
      right: -1.1rem;
      bottom: -1rem;
      opacity: 0.13;
    }
  }
`;

const BlockMeta = styled.span`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
`;

const BlockTitle = styled.h3`
  position: relative;
  font-size: ${({ $feature }) => ($feature ? '2.4rem' : '1.5rem')};
  /* Wide axis only where the type is big enough to carry it. */
  font-stretch: ${({ $feature }) => ($feature ? 'var(--display-stretch)' : '100%')};
  line-height: 0.92;
  letter-spacing: -0.03em;
  color: inherit;
  margin: 0;
  max-width: 12ch;

  @media (max-width: 900px) {
    font-size: ${({ $feature }) => ($feature ? '1.8rem' : '1.25rem')};
  }

  @media (max-width: 480px) {
    font-size: ${({ $feature }) => ($feature ? '1.6rem' : '1.05rem')};
    max-width: none;
  }
`;

/*
 * `span` is the column count on the 6-wide field, `tone` the fill. Both are
 * hand-set rather than derived from the index: the point is a composition, and
 * an alternating formula would put two identical fills side by side.
 */
const hobbiesData = [
  { icon: faGuitar, title: 'Music', kicker: 'Sound', span: 4, tone: 'accent' },
  { icon: faMicrophoneLines, title: 'Podcast Host', kicker: 'On air', span: 2, tone: 'ink' },
  { icon: faPersonSkiing, title: 'Skiing', kicker: 'Snow', span: 2, tone: 'paper' },
  { icon: faSkating, title: 'Skating', kicker: 'Wheels', span: 2, tone: 'alt' },
  { icon: faSwimmer, title: 'Swimming', kicker: 'Water', span: 2, tone: 'paper' },
  { icon: faPizzaSlice, title: 'Baking', kicker: 'Oven', span: 3, tone: 'ink' },
  { icon: faHouseSignal, title: 'Home Automation', kicker: 'Circuits', span: 3, tone: 'accent' }
];

const Hobbies = () => {
  return (
    <Section id="hobbies">
      <SectionContent>
        <Title>Hobbies &amp; Interests</Title>
        <Lead>What the week looks like away from the keyboard.</Lead>
        <Mosaic>
          {hobbiesData.map((hobby, index) => (
            <HobbyBlock
              key={hobby.title}
              $span={hobby.span}
              $tone={hobby.tone}
              $feature={hobby.span >= 4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <BlockMeta>
                {String(index + 1).padStart(2, '0')} / {hobby.kicker}
              </BlockMeta>
              <BlockTitle $feature={hobby.span >= 4}>{hobby.title}</BlockTitle>
              <FontAwesomeIcon icon={hobby.icon} className="mark" aria-hidden="true" />
            </HobbyBlock>
          ))}
        </Mosaic>
      </SectionContent>
    </Section>
  );
};

export default Hobbies;
