import { useStore } from 'nanostores/react'
import React from 'react'
import Header from '../components/Header'
import { metaRequests } from '../stores/metaRequests'
import MetadataRequest from './MetadataRequest'

const Metadata: React.FC = () => {
  const requests = useStore(metaRequests)

  return (
    <>
      <Header text={'Metadata'} />
      {requests.map((request) => (
        <MetadataRequest
          metaId={request.id}
          request={request.request}
          url={request.url}
          key={request.id}
        />
      ))}
    </>
  )
}

export default Metadata
