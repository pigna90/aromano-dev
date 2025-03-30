import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionContent, Title } from '../styles/SharedStyles';

const Content = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled(motion.div)`
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const AboutText = styled(motion.div)`
  flex: 1;
  p {
    font-size: 1.1rem;
    line-height: 1.8;
  }
`;

const About = () => {
  return (
    <Section id="about">
      <SectionContent>
        <Title>About Me</Title>
        <Content>
          <ProfileImage
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://via.placeholder.com/200" alt="Profile" />
          </ProfileImage>
          <AboutText
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>
              I am a passionate software engineer with expertise in web development
              and cloud technologies. I love creating innovative solutions and
              sharing knowledge with the tech community. With a strong foundation
              in modern development practices and a keen eye for detail, I strive
              to build applications that make a difference.
            </p>
          </AboutText>
        </Content>
      </SectionContent>
    </Section>
  );
};

export default About; 