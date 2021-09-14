import {
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import { ErrorBoundary } from '@polkadot/extension-ui/components'
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
import React from 'react'
import { Route, Switch } from 'react-router'

export const Router: React.FC<{
  authRequests: AuthorizeRequest[]
  metaRequests: MetadataRequest[]
  signRequests: SigningRequest[]
}> = ({ authRequests, metaRequests, signRequests }) => (
  <Switch>
    <Route path='/auth-list'>
      <ErrorBoundary trigger={'auth-list'}>
        <AuthList />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/create'>
      <ErrorBoundary trigger={'account-creation'}>
        <CreateAccount />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/forget/:address'>
      <ErrorBoundary trigger={'forget-address'}>
        <Forget />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/export/:address'>
      <ErrorBoundary trigger={'export-address'}>
        <Export />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/export-all'>
      <ErrorBoundary trigger={'export-all-address'}>
        <ExportAll />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/import-ledger'>
      <ErrorBoundary trigger={'import-ledger'}>
        <ImportLedger />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/import-qr'>
      <ErrorBoundary trigger={'import-qr'}>
        <ImportQr />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/import-seed'>
      <ErrorBoundary trigger={'import-seed'}>
        <ImportSeed />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/restore-json'>
      <ErrorBoundary trigger={'restore-json'}>
        <RestoreJson />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/derive/:address/locked'>
      <ErrorBoundary trigger={'derived-address-locked'}>
        <Derive isLocked />{' '}
      </ErrorBoundary>
    </Route>
    <Route path='/account/derive/:address'>
      <ErrorBoundary trigger={'derive-address'}>
        <Derive />{' '}
      </ErrorBoundary>
    </Route>
    <Route path={`${PHISHING_PAGE_REDIRECT}/:website`}>
      <ErrorBoundary trigger={'phishing-page-redirect'}>
        <PhishingDetected />{' '}
      </ErrorBoundary>
    </Route>
    <Route exact path='/'>
      {authRequests?.length ? (
        <ErrorBoundary trigger={'authorize'}>
          <Authorize />
        </ErrorBoundary>
      ) : metaRequests?.length ? (
        <ErrorBoundary trigger={'metadata'}>
          <Metadata />
        </ErrorBoundary>
      ) : signRequests?.length ? (
        <ErrorBoundary trigger={'signing'}>
          <Signing />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary trigger={'accounts'}>
          <Accounts />
        </ErrorBoundary>
      )}
    </Route>
  </Switch>
)
