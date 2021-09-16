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
import { MediaContext, SigningReqContext } from './contexts'
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
  const [mediaAllowed, setMediaAllowed] = useState(false)
  const [signRequests, setSignRequests] = useState<null | SigningRequest[]>(
    null
  )

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
          <SigningReqContext.Provider value={signRequests}>
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
          </SigningReqContext.Provider>
        </MediaContext.Provider>
      )}
    </Loading>
  )
}

export default Layout
