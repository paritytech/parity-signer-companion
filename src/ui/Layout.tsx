import type {
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { useStore } from 'nanostores/react'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './components/Loading'
import Main from './components/Main'
import { MediaContext } from './contexts'
import { GlobalStyle } from './GlobalStyle'
import Router from './Router'
import { setAccounts } from './stores/accounts'
import {
  authRequests as authRequestsStore,
  setAuthRequests,
} from './stores/authRequests'
import {
  metaRequests as metaRequestsStore,
  setMetaRequests,
} from './stores/metaRequests'
import {
  setSignRequests,
  signRequests as signRequestsStore,
} from './stores/signRequests'
import { theme } from './themes'
import {
  subscribeAccounts,
  subscribeAuthorizeRequests,
  subscribeMetadataRequests,
  subscribeSigningRequests,
} from './utils/messaging'
import { requestMediaAccess } from './utils/requestMediaAccess'

const Layout: React.FC = () => {
  const authRequests = useStore(authRequestsStore) as AuthorizeRequest[]
  const metaRequests = useStore(metaRequestsStore) as MetadataRequest[]
  const signRequests = useStore(signRequestsStore) as SigningRequest[]
  const [mediaAllowed, setMediaAllowed] = useState(false)

  useEffect(() => {
    Promise.all([
      subscribeAccounts(setAccounts),
      subscribeAuthorizeRequests(setAuthRequests),
      subscribeMetadataRequests(setMetaRequests),
      subscribeSigningRequests(setSignRequests),
    ]).catch(console.error)
  }, [])

  useEffect(() => {
    requestMediaAccess().then(setMediaAllowed).catch(console.error)
  }, [])

  return (
    <Loading>
      {authRequestsStore && metaRequests && signRequests && (
        <MediaContext.Provider value={mediaAllowed}>
          <ThemeProvider theme={theme}>
            <GlobalStyle theme={theme} />
            <Main>
              <ErrorBoundary>
                <Router
                  authRequests={authRequests}
                  metaRequests={metaRequests}
                  signRequests={signRequests}
                />
              </ErrorBoundary>
            </Main>
          </ThemeProvider>
        </MediaContext.Provider>
      )}
    </Loading>
  )
}

export default Layout
