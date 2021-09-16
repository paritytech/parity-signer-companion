import type {
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './components/Loading'
import Main from './components/Main'
import {
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SigningReqContext,
} from './contexts'
import { GlobalStyle } from './GlobalStyle'
import Router from './Router'
import { setAccounts } from './stores/accounts'
import { theme } from './themes'
import {
  subscribeAccounts,
  subscribeAuthorizeRequests,
  subscribeMetadataRequests,
  subscribeSigningRequests,
} from './utils/messaging'
import { requestMediaAccess } from './utils/requestMediaAccess'

const Layout: React.FC = () => {
  const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(
    null
  )
  const [mediaAllowed, setMediaAllowed] = useState(false)
  const [metaRequests, setMetaRequests] = useState<null | MetadataRequest[]>(
    null
  )
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
      {authRequests && metaRequests && signRequests && (
        <AuthorizeReqContext.Provider value={authRequests}>
          <MediaContext.Provider value={mediaAllowed}>
            <MetadataReqContext.Provider value={metaRequests}>
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
            </MetadataReqContext.Provider>
          </MediaContext.Provider>
        </AuthorizeReqContext.Provider>
      )}
    </Loading>
  )
}

export default Layout
