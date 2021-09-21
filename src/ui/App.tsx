import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from 'styled-components'
import ErrorFallback from './components/ErrorFallback'
import Loading from './components/Loading'
import Main from './components/Main'
import { GlobalStyle } from './GlobalStyle'
import Router from './Router'
import { theme } from './themes'
import { goHome } from './utils/routing'

export const App: React.FC = () => (
  <Suspense fallback={'...'}>
    <Loading>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Main>
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={goHome}>
            <Router />
          </ErrorBoundary>
        </Main>
      </ThemeProvider>
    </Loading>
  </Suspense>
)
