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
  gap: 3rem;
  margin-top: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const HobbyCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  width: 200px;
  height: 200px;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 3rem;
    color: #3498db;
    margin-bottom: 0.5rem;
  }

  h3 {
    color: #2c3e50;
    font-size: 1.2rem;
    margin: 0;
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