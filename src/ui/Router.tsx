import {
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import { ErrorBoundary } from '@polkadot/extension-ui/components'
import Authorize from '@polkadot/extension-ui/Popup/Authorize'
import Forget from '@polkadot/extension-ui/Popup/Forget'
import ImportQr from './accounts/ImportQr'
import Metadata from '@polkadot/extension-ui/Popup/Metadata'
import PhishingDetected from '@polkadot/extension-ui/Popup/PhishingDetected'
import Signing from '@polkadot/extension-ui/Popup/Signing'
import React from 'react'
import { Route, Switch } from 'react-router'
import Accounts from './accounts/Accounts'

export const Router: React.FC<{
  authRequests: AuthorizeRequest[]
  metaRequests: MetadataRequest[]
  signRequests: SigningRequest[]
}> = ({ authRequests, metaRequests, signRequests }) => (
  <Switch>
    <Route path='/account/forget/:address'>
      <ErrorBoundary trigger={'forget-address'}>
        <Forget />
      </ErrorBoundary>
    </Route>
    <Route path='/account/import-qr'>
      <ErrorBoundary trigger={'import-qr'}>
        <ImportQr />
      </ErrorBoundary>
    </Route>
    <Route path={`${PHISHING_PAGE_REDIRECT}/:website`}>
      <ErrorBoundary trigger={'phishing-page-redirect'}>
        <PhishingDetected />
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
