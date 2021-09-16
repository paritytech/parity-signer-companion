import {
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import Authorize from './requests/Authorize'
import Forget from './accounts/Forget'
import ImportQr from './accounts/ImportQr'
import Metadata from './requests/Metadata'
import PhishingDetected from './security/PhishingDetected'
import Signing from './requests/Signing'
import React from 'react'
import Accounts from './accounts/Accounts'
import { usePage } from './hooks/usePage'
import { exact, exactWithParam, getParam } from './utils/routing'

const Router: React.FC<{
  authRequests: AuthorizeRequest[]
  metaRequests: MetadataRequest[]
  signRequests: SigningRequest[]
}> = ({ authRequests, metaRequests, signRequests }) => {
  const page = usePage()

  if (exact(page, '/')) {
    if (authRequests?.length) return <Authorize />
    if (metaRequests?.length) return <Metadata />
    if (signRequests?.length) return <Signing />
  }

  if (exact(page, '/account/import-qr')) return <ImportQr />

  if (exactWithParam(page, '/account/forget/:address'))
    return <Forget address={getParam(page)} />

  if (exactWithParam(page, `${PHISHING_PAGE_REDIRECT}/:website`))
    return <PhishingDetected website={getParam(page)} />

  return <Accounts />
}

export default Router
