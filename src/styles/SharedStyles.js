import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  padding: 5rem 2rem;
  background-color: white;

  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  font-size: 2.5rem;
`; 