import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionContent, Title, Tag } from '../styles/SharedStyles';

const ExperienceContainer = styled.div`
  max-width: 900px;
`;

/**
 * Left rail carries the date in mono; the role sits on the right. Thick rules
 * between entries instead of floating cards.
 */
const ExperienceItem = styled(motion.article)`
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr);
  gap: 2rem;
  padding: 2.25rem 0;
  border-top: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};

  &:last-child {
    border-bottom: ${({ theme }) => theme.borders.base} solid
      ${({ theme }) => theme.colors.ink};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
    padding: 1.75rem 0;
  }

  .date {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.inkSecondary};
    padding-top: 0.5rem;

    @media (max-width: 768px) {
      padding-top: 0;
    }
  }

  .role {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.875rem;
    font-weight: 900;
    font-stretch: 100%;
    line-height: 1;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 0.45rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .company {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accentInk};
    margin-bottom: 1.25rem;
  }

  .responsibilities {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
  }

  .responsibility {
    display: flex;
    gap: 0.85rem;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.inkSecondary};

    /* A solid square marker. There are no circles in this direction. */
    &::before {
      content: '';
      flex-shrink: 0;
      width: 8px;
      height: 8px;
      margin-top: 0.55rem;
      background: ${({ theme }) => theme.colors.accentAlt};
    }
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
`;

const experienceData = [
  {
    date: '2023 — Present',
    title: 'Senior Data Scientist',
    company: 'Kuehne+Nagel',
    responsibilities: [
      'Developed and deployed dynamic pricing models using data science and LLM techniques',
      'Collaborated with stakeholders to align solutions with business goals',
      'Led data science initiatives and projects',
      'Implemented advanced machine learning solutions'
    ],
    stack: ['Dynamic Pricing', 'LLMs', 'MLOps']
  },
  {
    date: '2021 — 2023',
    title: 'Senior Data Scientist',
    company: 'FREE NOW',
    responsibilities: [
      'Designed, implemented, and optimized the production Pricing Algorithm for a leading European mobility service provider',
      'Analyzed and tested new ideas and hypotheses',
      'Developed data-driven solutions for mobility pricing',
      'Collaborated with cross-functional teams to improve pricing strategies'
    ],
    stack: ['Pricing', 'Causal Inference', 'A/B Testing']
  },
  {
    date: '2018 — 2021',
    title: 'Data Scientist',
    company: 'Cargonexx GmbH',
    responsibilities: [
      'Focused on pricing optimization using ML/DL techniques',
      'Implemented graph optimization through operations research',
      'Developed Bayesian Neural Networks for regression tasks',
      'Led demand forecasting initiatives'
    ],
    stack: ['Forecasting', 'Operations Research', 'Bayesian NNs']
  }
];

const Experience = () => {
  return (
    <Section id="experience">
      <SectionContent>
        <Title>Experience</Title>
        <ExperienceContainer>
          {experienceData.map((exp, index) => (
            <ExperienceItem
              key={`${exp.company}-${exp.date}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="date">{exp.date}</div>
              <div>
                <h3 className="role">{exp.title}</h3>
                <div className="company">{exp.company}</div>
                <div className="responsibilities">
                  {exp.responsibilities.map((resp) => (
                    <p className="responsibility" key={resp}>
                      <span>{resp}</span>
                    </p>
                  ))}
                </div>
                <div className="stack">
                  {exp.stack.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </ExperienceItem>
          ))}
        </ExperienceContainer>
      </SectionContent>
    </Section>
  );
};

export default Experience;
