import styled from 'styled-components';
import { Section, SectionContent, Title, Button, Meta } from '../styles/SharedStyles';

const PodcastContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
  gap: 4rem;
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
  /* Stays a light panel in both modes: the cover art is teal and orange on
     transparent, and it needs a pale field behind it to read. */
  background: #ffffff;
  border: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.colors.shadowHard};

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
  max-width: 68ch;
`;

const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2rem;
  font-weight: 900;
  font-stretch: 100%;
  line-height: 1;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0.4rem 0 1rem;

  @media (max-width: 768px) {
    font-size: 1.625rem;
  }
`;

const PodcastDescription = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.inkSecondary};
  margin-bottom: 1.25rem;
`;

const Podcast = () => {
  return (
    <Section id="podcast">
      <SectionContent>
        <Title>Podcast &amp; Courses</Title>
        <PodcastContainer>
          <Cover>
            <img
              src="/images/brand/logo_transparent.png"
              alt="My Data Guest podcast cover"
            />
          </Cover>
          <PodcastContent>
            <Meta>Podcast and learning platform · with Rosaria Silipo</Meta>
            <Name>My Data Guest</Name>
            <PodcastDescription>
              Artificial intelligence without the hype. Together with Rosaria
              Silipo I dig into agentic AI, prompt engineering, large language
              models, the ethical dilemmas nobody wants to open, and what all of
              it actually means in practice.
            </PodcastDescription>
            <PodcastDescription>
              It is not only a podcast. We also run courses there, hands-on and
              built around the way this work really goes: you build the thing,
              you break it, you understand why, you fix it.
            </PodcastDescription>
            <Button
              as="a"
              href="https://mydataguest.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen and learn on Substack
            </Button>
          </PodcastContent>
        </PodcastContainer>
      </SectionContent>
    </Section>
  );
};

export default Podcast;
