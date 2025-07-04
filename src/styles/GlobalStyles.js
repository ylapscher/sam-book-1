import { createGlobalStyle } from 'styled-components';
import '@fontsource/oooh-baby';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #222222;
    --primary-dark: #111111;
    --secondary-color: #595959;
    --accent-color: #CB7171;
    --text-color: #222222;
    --price-color: #238F52;
    --light-gray: #F5F5F5;
    --border-radius: 4px;
    --transition: all 0.2s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: var(--text-color);
    background-color: white;
  }

  h1 {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  p {
    margin-bottom: 1rem;
    color: var(--secondary-color);
    
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      text-decoration: underline;
    }
  }

  /* Form styles */
  input, textarea, select {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid #DDDDDD;
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 16px;
    background-color: white;

    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }
    
    @media (max-width: 768px) {
      padding: 0.7rem;
      font-size: 15px;
      margin-bottom: 0.8rem;
    }
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23222222%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7rem top 50%;
    background-size: 0.65rem auto;
    padding-right: 2rem;
  }

  /* Container */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }
  
  /* Mobile optimization */
  @media (max-width: 768px) {
    /* Improve touch targets */
    button, a {
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Prevent zoom on input focus */
    input, textarea, select {
      font-size: 16px !important;
    }
    
    /* Better mobile spacing */
    section {
      padding: 2rem 1rem;
    }
    
    /* Reduce margins on mobile */
    h1, h2, h3 {
      margin-bottom: 0.8rem;
    }
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .mt-1 { margin-top: 1rem; }
  .mt-2 { margin-top: 2rem; }
  .mt-3 { margin-top: 3rem; }
  .mb-1 { margin-bottom: 1rem; }
  .mb-2 { margin-bottom: 2rem; }
  .mb-3 { margin-bottom: 3rem; }
  
  @media (max-width: 768px) {
    .mt-2 { margin-top: 1.5rem; }
    .mt-3 { margin-top: 2rem; }
    .mb-2 { margin-bottom: 1.5rem; }
    .mb-3 { margin-bottom: 2rem; }
  }
`;

export default GlobalStyles; 