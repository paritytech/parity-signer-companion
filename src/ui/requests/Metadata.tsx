import { MetadataReqContext } from '@polkadot/extension-ui/components' // TODO: Replace extension-ui
import Request from '@polkadot/extension-ui/Popup/Metadata/Request' // TODO: Replace extension-ui
import React, { useContext } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'

const Metadata: React.FC = () => {
  const requests = useContext(MetadataReqContext)
  const request = requests[0]

  if (!request) return <Loading />

  return (
    <>
      <Header text={'Metadata'} />
      <Request
        key={request.id}
        metaId={request.id}
        request={request.request}
        url={request.url}
      />
    </>
  )
}

export default Metadata
