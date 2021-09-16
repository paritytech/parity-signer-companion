import type { SignerPayloadJSON } from '@polkadot/types/types'
import { useStore } from 'nanostores/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'
import { signRequests } from '../stores/signRequests'
import SigningRequest from './SigningRequest'
import TransactionIndex from './TransactionIndex'

const Signing: React.FC = () => {
  const requests = useStore(signRequests)
  const [requestIndex, setRequestIndex] = useState(0)

  const onNextClick = () => setRequestIndex((requestIndex) => requestIndex + 1)

  const onPreviousClick = () =>
    setRequestIndex((requestIndex) => requestIndex - 1)

  useEffect(() => {
    setRequestIndex((requestIndex) =>
      requestIndex < requests.length ? requestIndex : requests.length - 1
    )
  }, [requests])

  // protect against removal overflows/underflows
  const request =
    requests.length !== 0
      ? requestIndex >= 0
        ? requestIndex < requests.length
          ? requests[requestIndex]
          : requests[requests.length - 1]
        : requests[0]
      : null
  const isTransaction = !!(request?.request?.payload as SignerPayloadJSON)
    ?.blockNumber

  if (!request) return <Loading />

  return (
    <>
      <Header text={isTransaction ? 'Transaction' : 'Sign message'} />
      {requests.length > 1 && (
        <TransactionIndex
          index={requestIndex}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          totalItems={requests.length}
        />
      )}
      <SigningRequest
        account={request.account}
        buttonText={isTransaction ? 'Sign the transaction' : 'Sign the message'}
        isFirst={requestIndex === 0}
        request={request.request}
        signId={request.id}
        url={request.url}
      />
    </>
  )
}

export default Signing
