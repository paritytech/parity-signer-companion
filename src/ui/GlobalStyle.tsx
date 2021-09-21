import { createGlobalStyle } from 'styled-components'
import { ThemeProps } from './types'

export const GlobalStyle = createGlobalStyle<ThemeProps>`
  html {
    box-sizing: border-box;
    font-size: ${({ theme }: ThemeProps) => theme.rem};
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
    background-color: ${({ theme }: ThemeProps) => theme.appBgColor};
    font-family: ${({ theme }: ThemeProps) => theme.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: ${({ theme }: ThemeProps) => theme.maxWidth};
    height: ${({ theme }: ThemeProps) => theme.maxHeight};
    margin: 0 auto;
  }
`
