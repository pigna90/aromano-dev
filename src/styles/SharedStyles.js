import styled, { css } from 'styled-components';

/**
 * One continuous paper surface, sections separated by hairlines rather than
 * alternating background bands.
 */
export const Section = styled.section`
  width: 100%;
  padding: 6rem ${({ theme }) => theme.layout.gutter};
  background-color: ${({ theme, $sunken }) =>
    $sunken ? theme.colors.bgAlt : 'transparent'};
  border-top: 1px solid ${({ theme }) => theme.colors.hairline};

  @media (max-width: 768px) {
    padding: 3.75rem ${({ theme }) => theme.layout.gutterMobile};
  }
`;

export const SectionContent = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

/**
 * Section heading. The small indigo "01" above it is generated from a CSS
 * counter on #root, so sections stay numbered in DOM order with no props.
 */
export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: var(--font-size-h2);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.025em;
  text-align: left;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: 2.75rem;

  &::before {
    counter-increment: section;
    content: counter(section, decimal-leading-zero);
    display: block;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 500;
    letter-spacing: 0.22em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 0.85rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

/** Optional standfirst under a Title. */
export const Lead = styled.p`
  max-width: ${({ theme }) => theme.layout.readWidth};
  margin-top: -1.75rem;
  margin-bottom: 2.75rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/** Mono, uppercase, letterspaced — dates, locations, labels. */
export const Meta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkMuted};
  line-height: 1.4;
`;

export const cardSurface = css`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: border-color ${({ theme }) => theme.motion.base},
    transform ${({ theme }) => theme.motion.base},
    box-shadow ${({ theme }) => theme.motion.base};
`;

/** Hairline card: no drop shadow at rest, a small lift on hover. */
export const Card = styled.div`
  ${cardSurface}

  &:hover {
    border-color: ${({ theme }) => theme.colors.hairlineStrong};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
  }
`;

/** Small pill for tags, courses, responsibilities. */
export const Tag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.inkSecondary};
  background: ${({ theme }) => theme.colors.bgAlt};
  border: 1px solid ${({ theme }) => theme.colors.hairline};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 0.3rem 0.7rem;
  white-space: nowrap;
`;

export const buttonReset = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
`;

/** Solid accent button. */
export const Button = styled.button`
  ${buttonReset}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.9rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  transition: background ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast},
    opacity ${({ theme }) => theme.motion.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentInk};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/** Outlined counterpart to Button. */
export const GhostButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.ink};
  border: 1px solid ${({ theme }) => theme.colors.hairlineStrong};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentSoft};
    border-color: ${({ theme }) => theme.colors.accentBorder};
    color: ${({ theme }) => theme.colors.accentInk};
  }
`;

/** Text link with an arrow that nudges on hover. */
export const ArrowLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accentInk};

  &::after {
    content: '→';
    transition: transform ${({ theme }) => theme.motion.fast};
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;
