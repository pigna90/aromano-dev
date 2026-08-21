import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionContent, Title } from '../styles/SharedStyles';
import Image from './common/Image';

const Content = styled.div`
  display: grid;
  /* The image column earns its keep across the measure instead of sitting as
     a thumbnail with 400px of empty paper beside the text. */
  grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
  gap: 4rem;
  align-items: start;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Portrait = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHard};

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const AboutText = styled(motion.div)`
  max-width: 68ch;

  p {
    font-size: 1.0625rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.inkSecondary};
    margin-bottom: 1.35rem;
  }

  /* Lead paragraph carries a lot more weight */
  p:first-child {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const About = () => {
  return (
    <Section id="about">
      <SectionContent>
        <Title>About</Title>
        <Content>
          <Portrait
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/images/profile/ski.webp"
              alt="Alessandro Romano skiing, away from the keyboard"
              width={900}
              height={738}
            />
          </Portrait>
          <AboutText
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p>
              I&apos;m a data scientist with a strong foundation in software
              engineering and statistics. I work at the intersection of data and
              business, solving complex problems that don&apos;t always have a
              clear path, and that&apos;s exactly what I enjoy most.
            </p>
            <p>
              I focus on creating solutions that matter, always with the goal of
              bringing real value to the people who use them. Whether it&apos;s
              building models, writing clean code, or exploring new tools, I like
              to stay hands-on and close to the problem.
            </p>
            <p>
              Outside of work, I speak at conferences, teach, and advocate for
              better data practices. I enjoy sharing what I learn and helping
              others grow, just as much as I enjoy digging into a tough technical
              challenge.
            </p>
          </AboutText>
        </Content>
      </SectionContent>
    </Section>
  );
};

export default About;
