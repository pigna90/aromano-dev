import styled from "styled-components";
import { motion } from "framer-motion";
import { Section, SectionContent, Title } from "../styles/SharedStyles";

const EducationContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const EducationItem = styled(motion.div)`
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
    }
  }

  .degree {
    color: #2c3e50;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .date {
    color: #3498db;
    font-weight: 500;
    padding: 0.2rem 0.8rem;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 15px;
    font-size: 0.9rem;
  }

  .university {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '🎓';
      font-size: 1rem;
    }
  }

  .details {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;

    .thesis {
      color: #3498db;
      font-weight: 500;
      padding: 0.5rem;
      background: rgba(52, 152, 219, 0.1);
      border-radius: 4px;
      margin-top: 0.5rem;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;

      &::before {
        content: '📝';
        font-size: 1rem;
      }
    }

    .coursework {
      margin-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .course {
        background: rgba(44, 62, 80, 0.05);
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.85rem;
        color: #2c3e50;
      }
    }
  }
`;

const educationData = [
  {
    date: "2015 - 2018",
    degree: "M.Sc. in Data Science and Business Informatics",
    university: "University of Pisa, Pisa, Italy",
    details: {
      thesis: "Anomaly Detection System based on LSTM",
      courses: ["Machine Learning", "Big Data Analytics", "Statistical Methods for Data Science"],
      honors: "Graduated with honors (110/110)"
    }
  },
  {
    date: "2011 - 2015",
    degree: "B.Sc. in Computer Science",
    university: "University of Bari, Bari, Italy",
    details: {
      thesis: "Wind Forecasting System based on Multiregression Algorithms",
      courses: ["Algorithms and Data Structures", "Database Systems", "Artificial Intelligence"]
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
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="header">
                <div className="degree">{edu.degree}</div>
                <div className="date">{edu.date}</div>
              </div>
              <div className="university">{edu.university}</div>
              <div className="details">
                {edu.details.honors && <div>{edu.details.honors}</div>}
                <div className="thesis">{edu.details.thesis}</div>
                <div className="coursework">
                  {edu.details.courses.map((course, idx) => (
                    <span key={idx} className="course">{course}</span>
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
