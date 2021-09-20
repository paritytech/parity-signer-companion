import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import { useStore } from 'nanostores/react'
import React from 'react'
import Accounts from './accounts/Accounts'
import ImportQr from './accounts/ImportQr'
import Authorize from './requests/Authorize'
import Metadata from './requests/Metadata'
import Signing from './requests/Signing'
import PhishingDetected from './security/PhishingDetected'
import { authRequests as authRequestsStore } from './stores/authRequests'
import { metaRequests as metaRequestsStore } from './stores/metaRequests'
import { router } from './stores/router'
import { signRequests as signRequestsStore } from './stores/signRequests'
import { exact, exactWithParam } from './utils/routing'

const Router: React.FC = () => {
  const { path } = useStore(router)
  const authRequests = useStore(authRequestsStore)
  const metaRequests = useStore(metaRequestsStore)
  const signRequests = useStore(signRequestsStore)

  if (exact(path, '') && authRequests?.length) return <Authorize />
  if (exact(path, '') && metaRequests?.length) return <Metadata />
  if (exact(path, '') && signRequests?.length) return <Signing />
  if (exact(path, '/account/import-qr')) return <ImportQr />
  if (exactWithParam(path, `${PHISHING_PAGE_REDIRECT}/:website`))
    return <PhishingDetected />

  return <Accounts />
}

export default Router
