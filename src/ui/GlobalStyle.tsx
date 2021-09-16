import { createGlobalStyle } from 'styled-components'
import { ThemeProps } from './types'

export const GlobalStyle = createGlobalStyle<ThemeProps>`
  body {
    background-color: ${({ theme }): string => theme.bodyColor};
  }

  html {
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`
