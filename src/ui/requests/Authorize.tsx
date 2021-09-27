import { useStore } from 'nanostores/react'
import React, { useState } from 'react'
import { authRequests as authRequestsStore } from '../../stores/authRequests'
import AuthorizeRequest from './AuthorizeRequest'
import RequestIndex from './RequestIndex'

const Authorize: React.FC = () => {
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

export default Authorize
