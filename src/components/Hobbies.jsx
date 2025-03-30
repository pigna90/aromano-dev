import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Section, SectionContent, Title } from '../styles/SharedStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSkating, 
  faGuitar, 
  faSwimmer, 
  faHome, 
  faBreadSlice 
} from '@fortawesome/free-solid-svg-icons';

const HobbiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const HobbyCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 1rem;
  }

  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }

  p {
    color: #666;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const hobbiesData = [
  {
    icon: faSkating,
    title: 'Skating',
    description: 'Exploring urban landscapes on wheels, embracing the freedom of movement and the thrill of mastering new tricks.'
  },
  {
    icon: faGuitar,
    title: 'Music',
    description: 'Creating and performing music, expressing creativity through different instruments and musical styles.'
  },
  {
    icon: faSwimmer,
    title: 'Swimming',
    description: 'Finding peace and fitness in the water, maintaining both physical and mental well-being through regular swimming.'
  },
  {
    icon: faHome,
    title: 'Home Automation',
    description: 'Building smart home solutions, integrating technology to create an efficient and comfortable living space.'
  },
  {
    icon: faBreadSlice,
    title: 'Baking',
    description: 'Crafting delicious homemade breads and pastries, experimenting with different recipes and techniques.'
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
              <p>{hobby.description}</p>
            </HobbyCard>
          ))}
        </HobbiesGrid>
      </SectionContent>
    </Section>
  );
};

export default Hobbies; 