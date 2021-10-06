import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --size-max-width: 600px;
    --size-max-height: 600px;

    --font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    --font-base-size: 0.9rem;
    --font-small-size: 0.75rem;
    --font-title-size: 1.4rem;
    --font-base-line-height: 1.25;

    --transition: 0.1s;
    --shadow: 0px 4px 10px #000000;;

    --color-orange: #d73400;
    --color-pink: #ff4077;
    --color-gray-lightest: #cccccc;
    --color-gray-light: #c0c0c0;
    --color-gray: #9a9a9a;
    --color-dark-light: #262626;
    --color-dark: #151515;
    --color-black: #000000;
    --color-highlight: rgba(255, 255, 255, 0.1);

    --color-button-text: var(--color-dark);
    --color-button-bg-hover: var(--color-gray-lightest);
    --color-app-bg: var(--color-dark);
    --color-button-bg: var(--color-gray-light);
    --color-card-bg: var(--color-dark-light);
    --color-dark-border: var(--color-black);
    --color-error-signal: var(--color-orange);
    --color-main-signal: var(--color-pink);
    --color-main-text: var(--color-gray-light);
    --color-faded-text: var(--color-gray);
  }

  html {
    box-sizing: border-box;
    font-size: 20px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    background-color: var(--color-app-bg);
    font-family: var(--font-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: var(--size-max-width);
    height: var(--size-max-height);
    margin: 0 auto;
  }
`
