import { View } from '@polkadot/extension-ui/components'
import '@polkadot/extension-ui/i18n/i18n'
import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
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
