import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-primary: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.5;
    --font-size-h1: 3rem;
    --font-size-h2: 2.5rem;
    --font-size-h3: 1.5rem;
    --font-size-body: 1.1rem;
    --font-size-small: 0.9rem;
  }

  @media (max-width: 768px) {
    :root {
      --font-size-h1: 2rem;
      --font-size-h2: 2rem;
      --font-size-h3: 1.2rem;
      --font-size-body: 1rem;
      --font-size-small: 0.85rem;
    }
  }

  body {
    font-family: var(--font-primary);
    line-height: var(--line-height-base);
    color: #333;
    background-color: #f5f6fa;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    font-size: var(--font-size-body);
  }

  html {
    scroll-behavior: smooth;
    width: 100%;
    overflow-x: hidden;
    font-size: var(--font-size-base);
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  section {
    width: 100%;
  }

  h1 {
    font-size: var(--font-size-h1);
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: var(--font-size-h2);
    line-height: 1.3;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: var(--font-size-h3);
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
`;

export default GlobalStyles; 