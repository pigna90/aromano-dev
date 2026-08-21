import styled, { css } from 'styled-components';

/**
 * Sections are hard bands stacked on top of each other, divided by a thick
 * rule rather than a hairline. `$sunken` swaps in the darker paper so the page
 * alternates instead of running as one continuous field.
 */
export const Section = styled.section`
  width: 100%;
  padding: 6rem ${({ theme }) => theme.layout.gutter};
  background-color: ${({ theme, $sunken }) =>
    $sunken ? theme.colors.bgAlt : theme.colors.bg};
  border-top: ${({ theme }) => theme.borders.thick} solid
    ${({ theme }) => theme.colors.hairline};

  @media (max-width: 768px) {
    padding: 3.5rem ${({ theme }) => theme.layout.gutterMobile};
    border-top-width: ${({ theme }) => theme.borders.base};
  }
`;

export const SectionContent = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

/**
 * Section heading: oversized, uppercase, set wide. The "01" is a CSS counter
 * on #root rendered as a solid block of accent, so sections stay numbered in
 * DOM order with no props to thread.
 */
export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: var(--font-size-h2);
  font-weight: var(--display-weight);
  font-stretch: var(--display-stretch);
  line-height: 0.86;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  text-align: left;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: 2.5rem;

  &::before {
    counter-increment: section;
    content: counter(section, decimal-leading-zero);
    display: block;
    /* Block so it sits above the heading, fit-content so the fill hugs the
       digits instead of spanning the column. */
    width: fit-content;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: var(--font-size-meta);
    font-weight: 700;
    font-stretch: 100%;
    letter-spacing: 0.22em;
    text-indent: 0.22em;
    line-height: 1;
    padding: 0.4rem 0.55rem;
    margin-bottom: 1rem;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    border: ${({ theme }) => theme.borders.thin} solid
      ${({ theme }) => theme.colors.ink};
  }

  @media (max-width: 768px) {
    margin-bottom: 1.75rem;
  }
`;

/** Optional standfirst under a Title. */
export const Lead = styled.p`
  max-width: ${({ theme }) => theme.layout.readWidth};
  margin-top: -1.5rem;
  margin-bottom: 2.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.inkSecondary};
`;

/** Mono, uppercase, letterspaced: dates, locations, labels. */
export const Meta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: var(--font-size-meta);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.inkSecondary};
  line-height: 1.4;
`;

/**
 * Every panel on the site: thick ink border, no radius, and a hard offset
 * block of ink standing in for a drop shadow. Depth in this direction is a
 * second solid rectangle, never a blur.
 */
export const cardSurface = css`
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.hairline};
  border-radius: 0;
  box-shadow: ${({ theme }) => theme.colors.shadowHardSm};
  transition: transform ${({ theme }) => theme.motion.base},
    box-shadow ${({ theme }) => theme.motion.base},
    background ${({ theme }) => theme.motion.base};
`;

/** Card that lifts away from its shadow on hover. */
export const Card = styled.div`
  ${cardSurface}

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.colors.shadowHard};
  }
`;

/** Filled block for tags, courses, responsibilities. */
export const Tag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.bgAlt};
  border: ${({ theme }) => theme.borders.thin} solid
    ${({ theme }) => theme.colors.ink};
  border-radius: 0;
  padding: 0.3rem 0.6rem;
  white-space: nowrap;
`;

export const buttonReset = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
`;

/**
 * The one gesture used by every button here: it sits on a hard offset block
 * and, on hover, slides down into it so the shadow disappears. Reads as a
 * physical press with no easing tricks.
 */
export const hardPress = css`
  box-shadow: ${({ theme }) => theme.colors.shadowHardSm};
  transition: transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover:not(:disabled) {
    transform: translate(3px, 3px);
    box-shadow: 0 0 0 transparent;
  }

  &:active:not(:disabled) {
    transform: translate(3px, 3px);
  }
`;

/** Solid accent button. */
export const Button = styled.button`
  ${buttonReset}
  ${hardPress}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.9rem 1.5rem;
  border: ${({ theme }) => theme.borders.base} solid
    ${({ theme }) => theme.colors.ink};
  border-radius: 0;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

/** Unfilled counterpart to Button, same press. */
export const GhostButton = styled(Button)`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
  }
`;

/** Text link with an arrow that nudges on hover. */
export const ArrowLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.2rem 0.35rem;
  margin-left: -0.35rem;
  color: ${({ theme }) => theme.colors.accentInk};
  transition: background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &::after {
    content: '→';
    transition: transform ${({ theme }) => theme.motion.fast};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accentInk};
    color: ${({ theme }) => theme.colors.onAccentInk};
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
