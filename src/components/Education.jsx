import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionContent, Title, Tag } from '../styles/SharedStyles';

const EducationContainer = styled.div`
  max-width: 900px;
`;

const EducationItem = styled(motion.article)`
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr);
  gap: 2rem;
  padding: 2.25rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.hairline};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
    padding: 1.75rem 0;
  }

  .date {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.inkMuted};
    padding-top: 0.4rem;

    @media (max-width: 768px) {
      padding-top: 0;
    }
  }

  .degree {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.625rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.ink};
    margin-bottom: 0.3rem;

    @media (max-width: 768px) {
      font-size: 1.375rem;
    }
  }

  .university {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.accentInk};
    margin-bottom: 1.25rem;
  }

  .honors {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.inkSecondary};
    margin-bottom: 1rem;
  }

  /* Thesis sits in a quiet ochre-ruled aside */
  .thesis {
    padding: 0.85rem 0 0.85rem 1.1rem;
    border-left: 2px solid ${({ theme }) => theme.colors.ochre};
    background: ${({ theme }) => theme.colors.ochreSoft};
    border-radius: 0 ${({ theme }) => theme.radii.sm}
      ${({ theme }) => theme.radii.sm} 0;
    margin-bottom: 1.25rem;

    .thesis-label {
      display: block;
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: var(--font-size-meta);
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.ochreInk};
      margin-bottom: 0.3rem;
    }

    .thesis-title {
      font-size: 0.9375rem;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.ink};
    }
  }

  .coursework {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
`;

const educationData = [
  {
    date: '2015 — 2018',
    degree: 'M.Sc. in Data Science and Business Informatics',
    university: 'University of Pisa, Pisa, Italy',
    details: {
      thesis: 'Anomaly Detection System based on LSTM',
      courses: ['Machine Learning', 'Big Data Analytics', 'Statistical Methods for Data Science'],
      honors: 'Graduated with honors (110/110)'
    }
  },
  {
    date: '2011 — 2015',
    degree: 'B.Sc. in Computer Science',
    university: 'University of Bari, Bari, Italy',
    details: {
      thesis: 'Wind Forecasting System based on Multiregression Algorithms',
      courses: ['Algorithms and Data Structures', 'Database Systems', 'Artificial Intelligence']
    }
  }
];

const Education = () => {
  return (
    <Section id="education">
      <SectionContent>
        <Title>Education</Title>
        <EducationContainer>
          {educationData.map((edu, index) => (
            <EducationItem
              key={edu.degree}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="date">{edu.date}</div>
              <div>
                <h3 className="degree">{edu.degree}</h3>
                <div className="university">{edu.university}</div>
                {edu.details.honors && (
                  <div className="honors">{edu.details.honors}</div>
                )}
                <div className="thesis">
                  <span className="thesis-label">Thesis</span>
                  <span className="thesis-title">{edu.details.thesis}</span>
                </div>
                <div className="coursework">
                  {edu.details.courses.map((course) => (
                    <Tag key={course}>{course}</Tag>
                  ))}
                </div>
              </div>
            </EducationItem>
          ))}
        </EducationContainer>
      </SectionContent>
    </Section>
  );
};

export default Education;
