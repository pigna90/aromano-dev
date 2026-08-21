import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-size-base: 16px;
    --line-height-base: 1.55;

    /*
     * Fluid display scale, so no media queries are needed for headings. The
     * top end is deliberately enormous: in this direction the type is the
     * layout, not a label sitting on top of it.
     */
    /* The vw term is tuned so "ALESSANDRO" set at 900/118% fills the measure
       without overflowing it at any width. Raising it clips the surname. */
    --font-size-hero: clamp(1.9rem, 10.4vw, 9.5rem);
    --font-size-h1: clamp(2.75rem, 8vw, 5.5rem);
    --font-size-h2: clamp(2.25rem, 7vw, 4.75rem);
    --font-size-h3: 1.4rem;
    --font-size-body: 1.0625rem;
    --font-size-small: 0.875rem;
    --font-size-meta: 0.7rem;

    /*
     * Archivo's width axis. Display type is set wide as well as heavy, which
     * is what gives the headings their slab presence. Anything under ~1.5rem
     * stays at normal width so it does not turn into a smear.
     */
    --display-stretch: 118%;
    --display-weight: 800;

    --nav-height: 72px;
  }

  html {
    width: 100%;
    overflow-x: hidden;
    font-size: var(--font-size-base);
    scroll-behavior: smooth;
    /* Anchored sections shouldn't hide under the fixed navbar */
    scroll-padding-top: var(--nav-height);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: var(--font-size-body);
    line-height: var(--line-height-base);
    color: ${({ theme }) => theme.colors.ink};
    background-color: ${({ theme }) => theme.colors.bg};
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    font-synthesis: none;
    transition: background-color ${({ theme }) => theme.motion.base},
                color ${({ theme }) => theme.motion.base};
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* Drives the "01 / 02 / 03" section numbering in SharedStyles */
    counter-reset: section;
  }

  section {
    width: 100%;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: var(--display-weight);
    font-stretch: var(--display-stretch);
    color: ${({ theme }) => theme.colors.ink};
    letter-spacing: -0.03em;
    text-transform: uppercase;
  }

  h1 {
    font-size: var(--font-size-h1);
    line-height: 0.88;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: var(--font-size-h2);
    line-height: 0.88;
    margin-bottom: 1.5rem;
  }

  /* Small enough that the wide axis would hurt it. Heavy, normal width. */
  h3 {
    font-size: var(--font-size-h3);
    font-stretch: 100%;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin-bottom: 0.75rem;
  }

  h4 {
    font-stretch: 100%;
  }

  p {
    margin-bottom: 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.accentInk};
    font-weight: 600;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2em;
    transition: color ${({ theme }) => theme.motion.fast},
                background ${({ theme }) => theme.motion.fast};
  }

  /* Inline links flip to a hard block of colour rather than shifting hue. */
  p a:hover {
    background: ${({ theme }) => theme.colors.accentInk};
    color: ${({ theme }) => theme.colors.onAccentInk};
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button, input, textarea, select {
    font: inherit;
    color: inherit;
  }

  /* A flat block of the accent. No tint, no softness. */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
  }

  /*
   * Focus is loud on purpose: a thick square ring in the fill accent with a
   * ring of ink behind it, so it reads on the yellow blocks too.
   */
  :focus-visible {
    outline: ${({ theme }) => theme.borders.base} solid
      ${({ theme }) => theme.colors.accentAlt};
    outline-offset: 2px;
    box-shadow: 0 0 0 ${({ theme }) => theme.borders.thin}
      ${({ theme }) => theme.colors.ink};
  }

  /*
   * The ticker strips. Content is duplicated in the markup, so translating a
   * flex row by exactly -50% loops seamlessly.
   */
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
`;

export default GlobalStyles;
