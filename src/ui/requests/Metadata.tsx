import { useStore } from 'nanostores/react'
import React, { useState } from 'react'
import { metaRequests } from '../../stores/metaRequests'
import MetadataRequest from './MetadataRequest'
import RequestIndex from './RequestIndex'

const Metadata: React.FC = () => {
  const requests = useStore(metaRequests)
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

export default Metadata
