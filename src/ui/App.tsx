import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from 'styled-components'
import { goHome } from '../utils/routing'
import ErrorFallback from './components/ErrorFallback'
import Main from './components/Main'
import { GlobalStyle } from './GlobalStyle'
import Router from './Router'
import { theme } from './themes'

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle theme={theme} />
    <Main>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={goHome}>
        <Router />
      </ErrorBoundary>
    </Main>
  </ThemeProvider>
)
