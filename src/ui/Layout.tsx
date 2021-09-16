import type {
  AccountJson,
  AccountsContext,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import Loading from './components/Loading'
import {
  AccountContext,
  ActionContext,
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SettingsContext,
  SigningReqContext,
} from './contexts'
import {
  subscribeAccounts,
  subscribeAuthorizeRequests,
  subscribeMetadataRequests,
  subscribeSigningRequests,
} from './utils/messaging'
import uiSettings from '@polkadot/ui-settings'
import type { SettingsStruct } from '@polkadot/ui-settings/types'
import React, { useEffect, useState } from 'react'
import { initAccountContext } from './utils/initAccountContext'
import { Router } from './Router'
import { requestMediaAccess } from './utils/requestMediaAccess'
import { startSettings } from './utils/startSettings'
import { goTo } from './utils/routing'
import ErrorBoundary from './components/ErrorBoundary'

export default function Layout(): React.ReactElement {
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
        <ActionContext.Provider value={goTo}>
          <SettingsContext.Provider value={settingsCtx}>
            <AccountContext.Provider value={accountCtx}>
              <AuthorizeReqContext.Provider value={authRequests}>
                <MediaContext.Provider value={cameraOn && mediaAllowed}>
                  <MetadataReqContext.Provider value={metaRequests}>
                    <SigningReqContext.Provider value={signRequests}>
                      <ErrorBoundary>
                        <Router
                          authRequests={authRequests}
                          metaRequests={metaRequests}
                          signRequests={signRequests}
                        />
                      </ErrorBoundary>
                    </SigningReqContext.Provider>
                  </MetadataReqContext.Provider>
                </MediaContext.Provider>
              </AuthorizeReqContext.Provider>
            </AccountContext.Provider>
          </SettingsContext.Provider>
        </ActionContext.Provider>
      )}
    </Loading>
  )
}
