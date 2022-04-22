import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { goHome } from '../utils/routing'
import { ErrorFallback } from './components/ErrorFallback'
import { Main } from './global/Main'
import { Router } from './global/Router'
import './index.css'

export const App = () => (
  <Main>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={goHome}>
      <Router />
    </ErrorBoundary>
  </Main>
)
