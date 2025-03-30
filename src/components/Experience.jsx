import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Section, SectionContent, Title } from '../styles/SharedStyles';

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: #e0e0e0;
    top: 0;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const YearMarker = styled.div`
  position: sticky;
  top: 80px;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  width: fit-content;
  margin: 2rem auto;
  z-index: 2;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-left: 50px;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem 0;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-left: 20px;
  }
`;

const TimelineContent = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 45%;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #3498db;
    border-radius: 50%;
    top: 20px;

    ${props => props.position === 'left' ? `
      right: -60px;
    ` : `
      left: -60px;
    `}

    @media (max-width: 768px) {
      left: -40px;
    }
  }

  @media (max-width: 768px) {
    width: calc(100% - 50px);
  }

  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .company {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .date {
    color: #3498db;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.2rem 0.8rem;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 15px;
  }

  ul {
    margin-top: 1rem;
    padding-left: 1.2rem;
  }

  li {
    margin-bottom: 0.5rem;
    color: #666;
  }
`;

const experienceData = [
  {
    year: 2024,
    items: [
      {
        date: '2023 - Present',
        title: 'Senior Software Engineer',
        company: 'Tech Company',
        responsibilities: [
          'Leading development of key features',
          'Mentoring junior developers',
          'Implementing best practices',
          'Improving system performance by 40%'
        ]
      }
    ]
  },
  {
    year: 2023,
    items: [
      {
        date: '2021 - 2023',
        title: 'Software Engineer',
        company: 'Innovation Labs',
        responsibilities: [
          'Developing full-stack applications',
          'Collaborating with cross-functional teams',
          'Implementing CI/CD pipelines',
          'Reduced deployment time by 60%'
        ]
      }
    ]
  },
  {
    year: 2021,
    items: [
      {
        date: '2019 - 2021',
        title: 'Junior Software Engineer',
        company: 'Tech Startup',
        responsibilities: [
          'Developed and maintained web applications',
          'Worked with React and Node.js',
          'Participated in code reviews',
          'Implemented responsive designs'
        ]
      }
    ]
  },
  {
    year: 2019,
    items: [
      {
        date: '2018 - 2019',
        title: 'Software Developer Intern',
        company: 'Digital Solutions Inc.',
        responsibilities: [
          'Assisted in frontend development',
          'Fixed bugs and improved performance',
          'Learned agile development practices',
          'Contributed to documentation'
        ]
      }
    ]
  },
  {
    year: 2018,
    items: [
      {
        date: '2017 - 2018',
        title: 'Junior Web Developer',
        company: 'Web Agency',
        responsibilities: [
          'Built responsive websites',
          'Worked with HTML, CSS, and JavaScript',
          'Collaborated with designers',
          'Maintained client websites'
        ]
      }
    ]
  }
];

const Experience = () => {
  return (
    <Section id="experience">
      <SectionContent>
        <Title>Experience</Title>
        <TimelineContainer>
          {experienceData.map((yearGroup, yearIndex) => (
            <div key={yearGroup.year}>
              <YearMarker>{yearGroup.year}</YearMarker>
              {yearGroup.items.map((exp, index) => (
                <TimelineItem
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <TimelineContent position={index % 2 === 0 ? 'left' : 'right'}>
                    <span className="date">{exp.date}</span>
                    <h3>{exp.title}</h3>
                    <div className="company">{exp.company}</div>
                    <ul>
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </div>
          ))}
        </TimelineContainer>
      </SectionContent>
    </Section>
  );
};

export default Experience; 