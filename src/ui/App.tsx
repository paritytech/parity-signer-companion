import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { goHome } from '../utils/routing'
import ErrorFallback from './components/ErrorFallback'
import { GlobalStyle } from './global/GlobalStyle'
import Main from './global/Main'
import Router from './global/Router'

export const App: React.FC = () => (
  <Main>
    <GlobalStyle />
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={goHome}>
      <Router />
    </ErrorBoundary>
  </Main>
)
