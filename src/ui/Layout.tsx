import type {
  AccountJson,
  AccountsContext,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import uiSettings from '@polkadot/ui-settings'
import type { SettingsStruct } from '@polkadot/ui-settings/types'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './components/Loading'
import Main from './components/Main'
import {
  AccountContext,
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SettingsContext,
  SigningReqContext,
} from './contexts'
import { GlobalStyle } from './GlobalStyle'
import Router from './Router'
import { theme } from './themes'
import { initAccountContext } from './utils/initAccountContext'
import {
  subscribeAccounts,
  subscribeAuthorizeRequests,
  subscribeMetadataRequests,
  subscribeSigningRequests,
} from './utils/messaging'
import { requestMediaAccess } from './utils/requestMediaAccess'
import { startSettings } from './utils/startSettings'

const Layout: React.FC = () => {
  const [accounts, setAccounts] = useState<null | AccountJson[]>(null)
  const [accountCtx, setAccountCtx] = useState<AccountsContext>({
    accounts: [],
    hierarchy: [],
  })
  const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(
    null
  )
  const [cameraOn, setCameraOn] = useState(startSettings.camera === 'on')
  const [mediaAllowed, setMediaAllowed] = useState(false)
  const [metaRequests, setMetaRequests] = useState<null | MetadataRequest[]>(
    null
  )
  const [signRequests, setSignRequests] = useState<null | SigningRequest[]>(
    null
  )
  const [settingsCtx, setSettingsCtx] = useState<SettingsStruct>(startSettings)

  useEffect(() => {
    Promise.all([
      subscribeAccounts(setAccounts),
      subscribeAuthorizeRequests(setAuthRequests),
      subscribeMetadataRequests(setMetaRequests),
      subscribeSigningRequests(setSignRequests),
    ]).catch(console.error)

    uiSettings.on('change', (settings) => {
      setSettingsCtx(settings)
      setCameraOn(settings.camera === 'on')
    })
  }, [])

  useEffect(() => {
    setAccountCtx(initAccountContext(accounts || []))
  }, [accounts])

  useEffect(() => {
    requestMediaAccess(cameraOn).then(setMediaAllowed).catch(console.error)
  }, [cameraOn])

  return (
    <Loading>
      {accounts && authRequests && metaRequests && signRequests && (
        <SettingsContext.Provider value={settingsCtx}>
          <AccountContext.Provider value={accountCtx}>
            <AuthorizeReqContext.Provider value={authRequests}>
              <MediaContext.Provider value={cameraOn && mediaAllowed}>
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
          </AccountContext.Provider>
        </SettingsContext.Provider>
      )}
    </Loading>
  )
}

export default Layout
