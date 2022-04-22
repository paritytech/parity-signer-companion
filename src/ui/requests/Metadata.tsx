import { useStore } from '@nanostores/react'
import React, { useState } from 'react'
import { metaRequestsStore } from '../../stores/metaRequests'
import { MetadataRequest } from './MetadataRequest'
import { RequestIndex } from './RequestIndex'

export const Metadata = () => {
  const requests = useStore(metaRequestsStore)
  const [idx, setIdx] = useState(0)
  const request = requests[idx]

  return (
    <>
      {requests.length > 1 && (
        <RequestIndex index={idx} total={requests.length} onChange={setIdx} />
      )}
      <MetadataRequest
        metaId={request.id}
        request={request.request}
        url={request.url}
        key={request.id}
      />
    </>
  )
}
