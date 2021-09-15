import React, { useCallback, useState } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { ThemeSwitchContext } from '../contexts'
import { AvailableThemes, chooseTheme, themes } from '../themes'
import type { ThemeProps } from '../types'
import Main from './Main'

interface Props {
  children: React.ReactNode
  className?: string
}

function View({ children, className }: Props): React.ReactElement<Props> {
  const [theme, setTheme] = useState(chooseTheme())

  const switchTheme = useCallback((theme: AvailableThemes): void => {
    localStorage.setItem('theme', theme)
    setTheme(theme)
  }, [])

  const _theme = themes[theme]

  return (
    <ThemeSwitchContext.Provider value={switchTheme}>
      <ThemeProvider theme={_theme}>
        <BodyTheme theme={_theme} />
        <Main className={className}>{children}</Main>
      </ThemeProvider>
    </ThemeSwitchContext.Provider>
  )
}

const BodyTheme = createGlobalStyle<ThemeProps>`
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

export default View
