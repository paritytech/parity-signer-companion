import { SigningReqContext } from '@polkadot/extension-ui/components' // TODO: Replace contexts
import TransactionIndex from '@polkadot/extension-ui/Popup/Signing/TransactionIndex' // TODO: Replace extension-ui
import type { SignerPayloadJSON } from '@polkadot/types/types'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'
import SigningRequest from './SigningRequest'

const Signing: React.FC = () => {
  const requests = useContext(SigningReqContext)
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
