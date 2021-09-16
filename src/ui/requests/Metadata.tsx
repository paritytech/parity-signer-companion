import { useStore } from 'nanostores/react'
import React from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'
import { metaRequests } from '../stores/metaRequests'
import MetadataRequest from './MetadataRequest'

const Metadata: React.FC = () => {
  const requests = useStore(metaRequests)
  const request = requests[0]

  if (!request) return <Loading />

  return (
    <>
      <Header text={'Metadata'} />
      <MetadataRequest
        key={request.id}
        metaId={request.id}
        request={request.request}
        url={request.url}
      />
    </>
  )
}

export default Metadata
