import styled from 'styled-components';
import {
  Section,
  SectionContent,
  Title,
  Button,
  Meta,
  ArrowLink,
} from '../styles/SharedStyles';

const PodcastContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
  gap: 4rem;
  align-items: start;

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

const Blocks = styled.div`
  max-width: 68ch;
`;

/* Two things share the column, so a thick rule separates them. */
const Block = styled.div`
  & + & {
    margin-top: 2.5rem;
    padding-top: 2.5rem;
    border-top: ${({ theme }) => theme.borders.base} solid
      ${({ theme }) => theme.colors.ink};
  }
`;

const BlockTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.625rem;
  font-weight: 900;
  font-stretch: 100%;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0.4rem 0 0.75rem;
`;

const Description = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.inkSecondary};
  margin-bottom: 1.5rem;
`;

const Podcast = () => {
  return (
    <Section id="podcast">
      <SectionContent>
        <Title>Podcast &amp; Teaching</Title>
        <PodcastContainer>
          <Cover>
            <img
              src="/images/brand/logo_transparent.png"
              alt="My Data Guest podcast cover"
            />
          </Cover>
          <Blocks>
            <Block>
              <Meta>Podcast · with Rosaria Silipo</Meta>
              <BlockTitle>My Data Guest</BlockTitle>
              <Description>
                Artificial intelligence without the hype. Together with Rosaria
                Silipo I dig into agentic AI, prompt engineering, large language
                models, the ethical dilemmas nobody wants to open, and what all
                of it actually means in practice.
              </Description>
              <Button
                as="a"
                href="https://mydataguest.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Substack
              </Button>
            </Block>

            <Block>
              <Meta>Teaching · courses, workshops, mentoring</Meta>
              <BlockTitle>Courses &amp; Workshops</BlockTitle>
              <Description>
                I teach what I build. Hands-on courses and workshops on agentic
                AI with CrewAI and LangGraph, time series foundation models and
                machine learning engineering, run at conferences and inside
                companies. Away from the stage I mentor one to one, working
                through real problems instead of slides.
              </Description>
              <ArrowLink
                href="https://mentorcruise.com/mentor/alessandroromano/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mentoring on MentorCruise
              </ArrowLink>
            </Block>
          </Blocks>
        </PodcastContainer>
      </SectionContent>
    </Section>
  );
};

export default Podcast;
