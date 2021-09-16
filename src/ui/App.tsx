import React, { Suspense } from 'react'
import Loading from './components/Loading'
import Layout from './Layout'

export const App: React.FC = () => (
  <Suspense fallback={Loading}>
    <Layout />
  </Suspense>
)
