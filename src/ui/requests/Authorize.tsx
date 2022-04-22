import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { authRequestsStore } from '../../stores/authRequests'
import { AuthorizeRequest } from './AuthorizeRequest'
import { RequestIndex } from './RequestIndex'

export const Authorize = () => {
  const requests = useStore(authRequestsStore)
  const [idx, setIdx] = useState(0)
  const request = requests[idx]

  return (
    <>
      {requests.length > 1 && (
        <RequestIndex index={idx} total={requests.length} onChange={setIdx} />
      )}
      <AuthorizeRequest
        authId={request.id}
        request={request.request}
        url={request.url}
        key={request.id}
      />
    </>
  )
}
