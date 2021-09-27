import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from 'styled-components'
import { goHome } from '../utils/routing'
import ErrorFallback from './components/ErrorFallback'
import { GlobalStyle } from './global/GlobalStyle'
import Main from './global/Main'
import Router from './global/Router'
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
