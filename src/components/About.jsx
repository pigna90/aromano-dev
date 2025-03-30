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
            <img src="/images/profile/ski.jpg" alt="Profile" />
          </ProfileImage>
          <AboutText
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>
              I'm a data scientist with a strong foundation in software engineering and statistics. I work at the intersection of data and business, solving complex problems that don't always have a clear path — and that's exactly what I enjoy most.
            </p>
            <p>
              I focus on creating solutions that matter, always with the goal of bringing real value to the people who use them. Whether it's building models, writing clean code, or exploring new tools, I like to stay hands-on and close to the problem.
            </p>
            <p>
              Outside of work, I speak at conferences, teach, and advocate for better data practices. I enjoy sharing what I learn and helping others grow, just as much as I enjoy digging into a tough technical challenge.
            </p>
          </AboutText>
        </Content>
      </SectionContent>
    </Section>
  );
};

export default About; 