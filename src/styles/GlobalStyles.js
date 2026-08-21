import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-size-base: 16px;
    --line-height-base: 1.65;

    /* Fluid display scale, so no media queries are needed for headings */
    --font-size-hero: clamp(2.75rem, 8vw, 5.25rem);
    --font-size-h1: clamp(2.25rem, 5vw, 3.5rem);
    --font-size-h2: clamp(2rem, 4.5vw, 3.25rem);
    --font-size-h3: 1.35rem;
    --font-size-body: 1.0625rem;
    --font-size-small: 0.875rem;
    --font-size-meta: 0.7rem;

    --nav-height: 64px;
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
    font-weight: 400;
    color: ${({ theme }) => theme.colors.ink};
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: var(--font-size-h1);
    line-height: 1.05;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: var(--font-size-h2);
    line-height: 1.08;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: var(--font-size-h3);
    line-height: 1.3;
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.accentInk};
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
    transition: color ${({ theme }) => theme.motion.fast};
  }

  img {
    max-width: 100%;
    display: block;
  }

  button, input, textarea, select {
    font: inherit;
    color: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.ink};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

export default GlobalStyles;
