import '@polkadot/extension-ui/i18n/i18n' // TODO: Remove i18n
import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import View from './components/View'
import Layout from './Layout'

export const App: React.FC = () => (
  <Suspense fallback='...'>
    <View>
      <HashRouter>
        <Layout />
      </HashRouter>
    </View>
  </Suspense>
)
