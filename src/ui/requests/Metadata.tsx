import { MetadataReqContext } from '../contexts'
import React, { useContext } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'
import MetadataRequest from './MetadataRequest'

const Metadata: React.FC = () => {
  const requests = useContext(MetadataReqContext)
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
