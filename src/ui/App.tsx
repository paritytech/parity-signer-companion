import { View } from '@polkadot/extension-ui/components'
import '@polkadot/extension-ui/i18n/i18n'
import Popup from '@polkadot/extension-ui/Popup'
import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'

export const App: React.FC = () => (
  <Suspense fallback='...'>
    <View>
      <HashRouter>
        <Popup />
      </HashRouter>
    </View>
  </Suspense>
)
