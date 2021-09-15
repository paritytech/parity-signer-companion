import React, { Suspense } from 'react'
import View from './components/View'
import Layout from './Layout'

export const App: React.FC = () => (
  <Suspense fallback='...'>
    <View>
      <Layout />
    </View>
  </Suspense>
)
