import type {
  AccountJson,
  AccountsContext,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { Loading } from '@polkadot/extension-ui/components'
import {
  AccountContext,
  ActionContext,
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SettingsContext,
  SigningReqContext,
} from '@polkadot/extension-ui/components/contexts'
import ToastProvider from '@polkadot/extension-ui/components/Toast/ToastProvider'
import {
  subscribeAccounts,
  subscribeAuthorizeRequests,
  subscribeMetadataRequests,
  subscribeSigningRequests,
} from '@polkadot/extension-ui/messaging'
import uiSettings from '@polkadot/ui-settings'
import type { SettingsStruct } from '@polkadot/ui-settings/types'
import React, { useCallback, useEffect, useState } from 'react'
import { initAccountContext } from './utils/initAccountContext'
import { Router } from './Router'
import { requestMediaAccess } from './utils/requestMediaAccess'
import { startSettings } from './utils/startSettings'

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
  const [isWelcomeDone, setWelcomeDone] = useState(false)
  const [settingsCtx, setSettingsCtx] = useState<SettingsStruct>(startSettings)

  const _onAction = useCallback((to?: string): void => {
    setWelcomeDone(window.localStorage.getItem('welcome_read') === 'ok')

    if (to) {
      window.location.hash = to
    }
  }, [])

  useEffect((): void => {
    Promise.all([
      subscribeAccounts(setAccounts),
      subscribeAuthorizeRequests(setAuthRequests),
      subscribeMetadataRequests(setMetaRequests),
      subscribeSigningRequests(setSignRequests),
    ]).catch(console.error)

    uiSettings.on('change', (settings): void => {
      setSettingsCtx(settings)
      setCameraOn(settings.camera === 'on')
    })

    _onAction()
  }, [])

  useEffect((): void => {
    setAccountCtx(initAccountContext(accounts || []))
  }, [accounts])

  useEffect((): void => {
    requestMediaAccess(cameraOn).then(setMediaAllowed).catch(console.error)
  }, [cameraOn])

  return (
    <Loading>
      {accounts && authRequests && metaRequests && signRequests && (
        <ActionContext.Provider value={_onAction}>
          <SettingsContext.Provider value={settingsCtx}>
            <AccountContext.Provider value={accountCtx}>
              <AuthorizeReqContext.Provider value={authRequests}>
                <MediaContext.Provider value={cameraOn && mediaAllowed}>
                  <MetadataReqContext.Provider value={metaRequests}>
                    <SigningReqContext.Provider value={signRequests}>
                      <ToastProvider>
                        <Router
                          isWelcomeDone={isWelcomeDone}
                          authRequests={authRequests}
                          metaRequests={metaRequests}
                          signRequests={signRequests}
                        />
                      </ToastProvider>
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
