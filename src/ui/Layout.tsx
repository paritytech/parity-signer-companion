import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './components/Loading'
import Main from './components/Main'
import { GlobalStyle } from './GlobalStyle'
import Router from './Router'
import { setAccounts } from './stores/accounts'
import { setAuthRequests } from './stores/authRequests'
import { setMediaAllowed } from './stores/media'
import { setMetaRequests } from './stores/metaRequests'
import { setSignRequests } from './stores/signRequests'
import { theme } from './themes'
import {
  subscribeAccounts,
  subscribeAuthorizeRequests,
  subscribeMetadataRequests,
  subscribeSigningRequests,
} from './utils/messaging'
import { requestMediaAccess } from './utils/requestMediaAccess'

const Layout: React.FC = () => {
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
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <Main>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </Main>
      </ThemeProvider>
    </Loading>
  )
}

export default Layout
