import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import { useStore } from 'nanostores/react'
import React from 'react'
import Accounts from './accounts/Accounts'
import Forget from './accounts/Forget'
import ImportQr from './accounts/ImportQr'
import { usePage } from './hooks/usePage'
import Authorize from './requests/Authorize'
import Metadata from './requests/Metadata'
import Signing from './requests/Signing'
import PhishingDetected from './security/PhishingDetected'
import { authRequests as authRequestsStore } from './stores/authRequests'
import { metaRequests as metaRequestsStore } from './stores/metaRequests'
import { signRequests as signRequestsStore } from './stores/signRequests'
import { exact, exactWithParam, getParam } from './utils/routing'

const Router: React.FC = () => {
  const page = usePage()
  const authRequests = useStore(authRequestsStore)
  const metaRequests = useStore(metaRequestsStore)
  const signRequests = useStore(signRequestsStore)

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
