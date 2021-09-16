import React, { Suspense } from 'react'
import Loading from './components/Loading'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/ErrorBoundary'
import Main from './components/Main'
import { GlobalStyle } from './GlobalStyle'
import Router from './Router'
import { theme } from './themes'

export const App: React.FC = () => (
  <Suspense fallback={'...'}>
    <Loading>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Main>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </Main>
      </ThemeProvider>
    </Loading>
  </Suspense>
)
