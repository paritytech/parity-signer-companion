import {
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import ErrorBoundary from './components/ErrorBoundary'
import Authorize from '@polkadot/extension-ui/Popup/Authorize' // TODO: Replace it
import Forget from './accounts/Forget'
import ImportQr from './accounts/ImportQr'
import Metadata from '@polkadot/extension-ui/Popup/Metadata' // TODO: Replace it
import PhishingDetected from './security/PhishingDetected'
import Signing from './signing/Signing'
import React from 'react'
import { Route, Switch } from 'react-router'
import Accounts from './accounts/Accounts'

export const Router: React.FC<{
  authRequests: AuthorizeRequest[]
  metaRequests: MetadataRequest[]
  signRequests: SigningRequest[]
}> = ({ authRequests, metaRequests, signRequests }) => (
  <ErrorBoundary>
    <Switch>
      <Route path='/account/forget/:address'>
        <Forget />
      </Route>
      <Route path='/account/import-qr'>
        <ImportQr />
      </Route>
      <Route path={`${PHISHING_PAGE_REDIRECT}/:website`}>
        <PhishingDetected />
      </Route>
      <Route exact path='/'>
        {authRequests?.length ? (
          <Authorize />
        ) : metaRequests?.length ? (
          <Metadata />
        ) : signRequests?.length ? (
          <Signing />
        ) : (
          <Accounts />
        )}
      </Route>
    </Switch>
  </ErrorBoundary>
)
