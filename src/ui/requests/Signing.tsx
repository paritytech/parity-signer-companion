import { RequestSign } from '@polkadot/extension-base/background/types'
import { SignerPayloadJSON } from '@polkadot/types/types'
import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { signRequests } from '../../stores/signRequests'
import RequestIndex from './RequestIndex'
import SigningRequest from './SigningRequest'

const Signing: React.FC = () => {
  const requests = useStore(signRequests)
  const [idx, setIdx] = useState(0)
  const request = requests[idx]
  const isTransaction = !!(request?.request?.payload as SignerPayloadJSON)
    ?.blockNumber

  return (
    <>
      {requests.length > 1 && (
        <RequestIndex index={idx} total={requests.length} onChange={setIdx} />
      )}
      <SigningRequest
        account={request.account}
        buttonText={isTransaction ? 'Sign the transaction' : 'Sign the message'}
        isFirst={idx === 0}
        request={request.request as RequestSign}
        signId={request.id}
        url={request.url}
      />
    </>
  )
}

export default Signing
