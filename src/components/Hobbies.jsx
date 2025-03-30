import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Section, SectionContent, Title } from '../styles/SharedStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSkating, 
  faGuitar, 
  faSwimmer, 
  faHome, 
  faPizzaSlice,
  faSkiing,
  faMicrophone
} from '@fortawesome/free-solid-svg-icons';

const HobbiesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    gap: 0.8rem;
    padding: 0 0.8rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    justify-items: center;

    /* Center the last element if it's alone */
    > *:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      justify-self: center;
    }
  }
`;

const HobbyCard = styled(motion.div)`
  background: white;
  padding: 1.2rem;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  width: 160px;
  height: 160px;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 0.4rem;
  }

  h3 {
    color: #2c3e50;
    font-size: 1.1rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    padding: 0.8rem;

    .icon {
      font-size: 1.8rem;
      margin-bottom: 0.2rem;
    }

    h3 {
      font-size: 0.85rem;
    }
  }
`;

const hobbiesData = [
  {
    icon: faSkating,
    title: 'Skating'
  },
  {
    icon: faGuitar,
    title: 'Music'
  },
  {
    icon: faSwimmer,
    title: 'Swimming'
  },
  {
    icon: faHome,
    title: 'Home Automation'
  },
  {
    icon: faPizzaSlice,
    title: 'Baking'
  },
  {
    icon: faSkiing,
    title: 'Skiing'
  },
  {
    icon: faMicrophone,
    title: 'Podcast Host'
  }
];

const Hobbies = () => {
  return (
    <Section id="hobbies">
      <SectionContent>
        <Title>Hobbies & Interests</Title>
        <HobbiesGrid>
          {hobbiesData.map((hobby, index) => (
            <HobbyCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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