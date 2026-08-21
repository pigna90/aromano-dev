import styled from 'styled-components';
import { Section, SectionContent, Title, Button, Meta } from '../styles/SharedStyles';

const PodcastContainer = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Cover = styled.div`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.bgAlt};
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: ${({ theme }) => theme.radii.lg};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const PodcastContent = styled.div`
  max-width: ${({ theme }) => theme.layout.readWidth};
`;

const PodcastDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkSecondary};
  margin: 0.75rem 0 2rem;
`;

const Podcast = () => {
  return (
    <Section id="podcast">
      <SectionContent>
        <Title>My Data Guest</Title>
        <PodcastContainer>
          <Cover>
            <img
              src="/images/brand/logo_transparent.png"
              alt="My Data Guest podcast cover"
            />
          </Cover>
          <PodcastContent>
            <Meta>Podcast · with Rosaria Silipo</Meta>
            <PodcastDescription>
              Your go-to podcast for exploring the world of artificial
              intelligence without the hype. Together with Rosaria Silipo, I dive
              into breakthroughs in Agentic AI, prompt engineering, large language
              models, ethical dilemmas, and the real implications of AI.
            </PodcastDescription>
            <Button
              as="a"
              href="https://mydataguest.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on Substack
            </Button>
          </PodcastContent>
        </PodcastContainer>
      </SectionContent>
    </Section>
  );
};

export default Podcast;
