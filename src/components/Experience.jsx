import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionContent, Title } from '../styles/SharedStyles';

const ExperienceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const ExperienceItem = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  border-left: 4px solid #3498db;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.8rem;
    }
  }

  .title {
    color: #2c3e50;
    font-size: 1.1rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .date {
    color: #3498db;
    font-weight: 500;
    padding: 0.2rem 0.8rem;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 15px;
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 0.15rem 0.6rem;
    }
  }

  .company {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '🏢';
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }
  }

  .responsibilities {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    @media (max-width: 768px) {
      gap: 0.4rem;
    }

    .responsibility {
      background: rgba(44, 62, 80, 0.05);
      padding: 0.5rem 0.8rem;
      border-radius: 6px;
      font-size: 0.9rem;
      color: #2c3e50;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      transition: all 0.2s ease;

      @media (max-width: 768px) {
        font-size: 0.85rem;
        padding: 0.4rem 0.6rem;
      }

      &:hover {
        background: rgba(44, 62, 80, 0.08);
      }

      &::before {
        content: '•';
        color: #3498db;
        font-weight: bold;
        margin-top: 0.2rem;
      }
    }
  }
`;

const experienceData = [
  {
    date: '2023 - Present',
    title: 'Senior Data Scientist',
    company: 'Kuehne+Nagel',
    responsibilities: [
      'Developed and deployed dynamic pricing models using data science and LLM techniques',
      'Collaborated with stakeholders to align solutions with business goals',
      'Led data science initiatives and projects',
      'Implemented advanced machine learning solutions'
    ]
  },
  {
    date: '2021 - 2023',
    title: 'Senior Data Scientist',
    company: 'FREE NOW',
    responsibilities: [
      'Designed, implemented, and optimized the production Pricing Algorithm for a leading European mobility service provider',
      'Analyzed and tested new ideas and hypotheses',
      'Developed data-driven solutions for mobility pricing',
      'Collaborated with cross-functional teams to improve pricing strategies'
    ]
  },
  {
    date: '2018 - 2021',
    title: 'Data Scientist',
    company: 'Cargonexx GmbH',
    responsibilities: [
      'Focused on pricing optimization using ML/DL techniques',
      'Implemented graph optimization through operations research',
      'Developed Bayesian Neural Networks for regression tasks',
      'Led demand forecasting initiatives'
    ]
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
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="header">
                <div className="title">{exp.title}</div>
                <div className="date">{exp.date}</div>
              </div>
              <div className="company">{exp.company}</div>
              <div className="responsibilities">
                {exp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="responsibility">
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </ExperienceItem>
          ))}
        </ExperienceContainer>
      </SectionContent>
    </Section>
  );
};

export default Experience; 