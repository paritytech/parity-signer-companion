import type {
  AccountJson,
  AccountsContext,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import { canDerive } from '@polkadot/extension-base/utils'
import { ErrorBoundary, Loading } from '@polkadot/extension-ui/components'
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
import Accounts from '@polkadot/extension-ui/Popup/Accounts'
import AuthList from '@polkadot/extension-ui/Popup/AuthManagement'
import Authorize from '@polkadot/extension-ui/Popup/Authorize'
import CreateAccount from '@polkadot/extension-ui/Popup/CreateAccount'
import Derive from '@polkadot/extension-ui/Popup/Derive'
import Export from '@polkadot/extension-ui/Popup/Export'
import ExportAll from '@polkadot/extension-ui/Popup/ExportAll'
import Forget from '@polkadot/extension-ui/Popup/Forget'
import ImportLedger from '@polkadot/extension-ui/Popup/ImportLedger'
import ImportQr from '@polkadot/extension-ui/Popup/ImportQr'
import ImportSeed from '@polkadot/extension-ui/Popup/ImportSeed'
import Metadata from '@polkadot/extension-ui/Popup/Metadata'
import PhishingDetected from '@polkadot/extension-ui/Popup/PhishingDetected'
import RestoreJson from '@polkadot/extension-ui/Popup/RestoreJson'
import Signing from '@polkadot/extension-ui/Popup/Signing'
import Welcome from '@polkadot/extension-ui/Popup/Welcome'
import { buildHierarchy } from '@polkadot/extension-ui/util/buildHierarchy'
import uiSettings from '@polkadot/ui-settings'
import type { SettingsStruct } from '@polkadot/ui-settings/types'
import React, { useCallback, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router'

const startSettings = uiSettings.get()

// Request permission for video, based on access we can hide/show import
async function requestMediaAccess(cameraOn: boolean): Promise<boolean> {
  if (!cameraOn) {
    return false
  }

  try {
    await navigator.mediaDevices.getUserMedia({ video: true })

    return true
  } catch (error) {
    console.error('Permission for video declined', (error as Error).message)
  }

  return false
}

function initAccountContext(accounts: AccountJson[]): AccountsContext {
  const hierarchy = buildHierarchy(accounts)
  const master = hierarchy.find(
    ({ isExternal, type }) => !isExternal && canDerive(type)
  )

  return {
    accounts,
    hierarchy,
    master,
  }
}

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

  function wrapWithErrorBoundary(
    component: React.ReactElement,
    trigger?: string
  ): React.ReactElement {
    return <ErrorBoundary trigger={trigger}>{component}</ErrorBoundary>
  }

  const Root = isWelcomeDone
    ? authRequests && authRequests.length
      ? wrapWithErrorBoundary(<Authorize />, 'authorize')
      : metaRequests && metaRequests.length
      ? wrapWithErrorBoundary(<Metadata />, 'metadata')
      : signRequests && signRequests.length
      ? wrapWithErrorBoundary(<Signing />, 'signing')
      : wrapWithErrorBoundary(<Accounts />, 'accounts')
    : wrapWithErrorBoundary(<Welcome />, 'welcome')

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
                        <Switch>
                          <Route path='/auth-list'>
                            {wrapWithErrorBoundary(<AuthList />, 'auth-list')}
                          </Route>
                          <Route path='/account/create'>
                            {wrapWithErrorBoundary(
                              <CreateAccount />,
                              'account-creation'
                            )}
                          </Route>
                          <Route path='/account/forget/:address'>
                            {wrapWithErrorBoundary(
                              <Forget />,
                              'forget-address'
                            )}
                          </Route>
                          <Route path='/account/export/:address'>
                            {wrapWithErrorBoundary(
                              <Export />,
                              'export-address'
                            )}
                          </Route>
                          <Route path='/account/export-all'>
                            {wrapWithErrorBoundary(
                              <ExportAll />,
                              'export-all-address'
                            )}
                          </Route>
                          <Route path='/account/import-ledger'>
                            {wrapWithErrorBoundary(
                              <ImportLedger />,
                              'import-ledger'
                            )}
                          </Route>
                          <Route path='/account/import-qr'>
                            {wrapWithErrorBoundary(<ImportQr />, 'import-qr')}
                          </Route>
                          <Route path='/account/import-seed'>
                            {wrapWithErrorBoundary(
                              <ImportSeed />,
                              'import-seed'
                            )}
                          </Route>
                          <Route path='/account/restore-json'>
                            {wrapWithErrorBoundary(
                              <RestoreJson />,
                              'restore-json'
                            )}
                          </Route>
                          <Route path='/account/derive/:address/locked'>
                            {wrapWithErrorBoundary(
                              <Derive isLocked />,
                              'derived-address-locked'
                            )}
                          </Route>
                          <Route path='/account/derive/:address'>
                            {wrapWithErrorBoundary(
                              <Derive />,
                              'derive-address'
                            )}
                          </Route>
                          <Route path={`${PHISHING_PAGE_REDIRECT}/:website`}>
                            {wrapWithErrorBoundary(
                              <PhishingDetected />,
                              'phishing-page-redirect'
                            )}
                          </Route>
                          <Route exact path='/'>
                            {Root}
                          </Route>
                        </Switch>
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
