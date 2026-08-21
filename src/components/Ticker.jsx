import styled from 'styled-components';

/**
 * A running strip between the hero and the page proper. It exists to keep the
 * top of the site moving, so the marquee animation is the whole point: the
 * items are duplicated in the markup and the row translates by exactly -50%,
 * which loops without a seam. Reduced-motion users get it parked, handled
 * globally in GlobalStyles.
 */
const Strip = styled.div`
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.bg};
  border-top: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  border-bottom: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.ink};
  user-select: none;

  @media (max-width: 768px) {
    border-top-width: ${({ theme }) => theme.borders.base};
    border-bottom-width: ${({ theme }) => theme.borders.base};
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;

  @media (max-width: 768px) {
    animation-duration: 26s;
  }
`;

const Run = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.85rem 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;

  /* A hard square between items rather than a slash or a bullet. */
  &::after {
    content: '';
    width: 9px;
    height: 9px;
    background: ${({ theme }) => theme.colors.accent};
    margin: 0 1.5rem 0 0;
  }
`;

/*
 * Skills only, and only ones the page backs up further down: every entry here
 * also appears in an Experience stack or a talk topic.
 */
const items = [
  'Dynamic pricing',
  'Forecasting',
  'Agentic AI',
  'LLMs',
  'Multi-agent systems',
  'MLOps',
  'Causal inference',
  'A/B testing',
  'Time series',
  'Python',
];

const Ticker = () => (
  <Strip aria-hidden="true">
    <Track>
      {[0, 1].map((run) => (
        <Run key={run}>
          {items.map((item) => (
            <Item key={item}>{item}</Item>
          ))}
        </Run>
      ))}
    </Track>
  </Strip>
);

export default Ticker;
