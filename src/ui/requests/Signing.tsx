import { SignerPayloadJSON } from '@polkadot/types/types'
import { useStore } from 'nanostores/react'
import React, { useState } from 'react'
import Header from '../components/Header'
import { signRequests } from '../stores/signRequests'
import SigningRequest from './SigningRequest'
import TransactionIndex from './TransactionIndex'

const Signing: React.FC = () => {
  const requests = useStore(signRequests)
  const [idx, setIdx] = useState(0)
  const request = requests[idx]
  const isTransaction = !!(request?.request?.payload as SignerPayloadJSON)
    ?.blockNumber

  const onNextClick = () => setIdx((i) => Math.min(i + 1, requests.length))
  const onPreviousClick = () => setIdx((i) => Math.max(i - 1, 0))

  return (
    <>
      <Header text={isTransaction ? 'Transaction' : 'Sign message'} />
      {requests.length > 1 && (
        <TransactionIndex
          index={idx}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          totalItems={requests.length}
        />
      )}
      <SigningRequest
        account={request.account}
        buttonText={isTransaction ? 'Sign the transaction' : 'Sign the message'}
        isFirst={idx === 0}
        request={request.request}
        signId={request.id}
        url={request.url}
      />
    </>
  )
}

export default Signing
