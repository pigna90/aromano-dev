import styled from 'styled-components';
import { Section, SectionContent, Title } from '../styles/SharedStyles';

const PodcastContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const PodcastImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const PodcastContent = styled.div`
  flex: 1;
`;

const PodcastDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1.5rem;
`;

const PodcastLink = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #6c5ce7, #a8e6cf);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(108, 92, 231, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(108, 92, 231, 0.4);
  }
`;

const Podcast = () => {
  return (
    <Section id="podcast">
      <SectionContent>
        <Title>My Data Guest Podcast</Title>
        <PodcastContainer>
          <PodcastImage
            src="/images/brand/logo_transparent.png"
            alt="My Data Guest Podcast Cover"
          />
          <PodcastContent>
            <PodcastDescription>
              Your go-to podcast for exploring the world of artificial intelligence without the hype.
              Together with Rosaria Silipo, I dive into breakthroughs in Agentic AI, prompt engineering,
              large language models, ethical dilemmas, and the real implications of AI.
            </PodcastDescription>
            <PodcastLink
              href="https://mydataguest.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Substack
            </PodcastLink>
          </PodcastContent>
        </PodcastContainer>
      </SectionContent>
    </Section>
  );
};

export default Podcast;
