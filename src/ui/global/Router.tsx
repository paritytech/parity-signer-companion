import { useStore } from '@nanostores/react'
import React from 'react'
import { routeStore } from '../../stores/router'
import Accounts from '../accounts/Accounts'
import ImportQr from '../accounts/ImportQr'
import Authorize from '../requests/Authorize'
import Metadata from '../requests/Metadata'
import Signing from '../requests/Signing'
import PhishingDetected from '../security/PhishingDetected'

const Router: React.FC = () => {
  const route = useStore(routeStore)

  return (
    <>
      {route === 'auth' && <Authorize />}
      {route === 'meta' && <Metadata />}
      {route === 'sign' && <Signing />}
      {route === 'import' && <ImportQr />}
      {route === 'phishing' && <PhishingDetected />}
      {route === 'accounts' && <Accounts />}
    </>
  )
}

export default Router
