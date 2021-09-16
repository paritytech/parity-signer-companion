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
    background-color: ${({ theme }): string => theme.bodyColor};
    width: ${({ theme }): string => theme.maxWidth};
    margin: 0 auto;
    height: 100vh;
  }
`
