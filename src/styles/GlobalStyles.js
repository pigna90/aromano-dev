import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f6fa;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
    width: 100%;
    overflow-x: hidden;
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
`;

export default GlobalStyles; 