import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Section, SectionContent, Title, cardSurface } from '../styles/SharedStyles';
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
 * A wrapping row of content-width cards rather than a grid: seven items never
 * divide evenly into tracks, so any fixed column count leaves an orphan and any
 * flex-grow leaves the last row stretched. Sizing to content keeps every card
 * proportional and just lets the right edge run ragged.
 */
const HobbiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const HobbyCard = styled(motion.div)`
  ${cardSurface}
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.15rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentBorder};

    .icon {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  .icon {
    flex-shrink: 0;
    width: 1.1rem;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.inkMuted};
    transition: color ${({ theme }) => theme.motion.base};
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.ink};
    margin: 0;
  }

  @media (max-width: 768px) {
    gap: 0.7rem;
    padding: 0.85rem 1rem;

    h3 {
      font-size: 0.75rem;
    }
  }
`;

const hobbiesData = [
  { icon: faGuitar, title: 'Music' },
  { icon: faMicrophoneLines, title: 'Podcast Host' },
  { icon: faPersonSkiing, title: 'Skiing' },
  { icon: faSkating, title: 'Skating' },
  { icon: faSwimmer, title: 'Swimming' },
  { icon: faPizzaSlice, title: 'Baking' },
  { icon: faHouseSignal, title: 'Home Automation' }
];

const Hobbies = () => {
  return (
    <Section id="hobbies">
      <SectionContent>
        <Title>Hobbies &amp; Interests</Title>
        <HobbiesGrid>
          {hobbiesData.map((hobby, index) => (
            <HobbyCard
              key={hobby.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <FontAwesomeIcon icon={hobby.icon} className="icon" />
              <h3>{hobby.title}</h3>
            </HobbyCard>
          ))}
        </HobbiesGrid>
      </SectionContent>
    </Section>
  );
};

export default Hobbies;
