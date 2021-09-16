import { createGlobalStyle } from 'styled-components'
import { ThemeProps } from './types'

export const GlobalStyle = createGlobalStyle<ThemeProps>`
  html {
    font-size: ${({ theme }: ThemeProps) => theme.rem};
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    background-color: ${({ theme }: ThemeProps) => theme.bodyColor};
    width: ${({ theme }: ThemeProps) => theme.maxWidth};
    margin: 0 auto;
    height: 100vh;
  }

  a {
    color: ${({ theme }: ThemeProps) => theme.textColor};
  }
`
