import { Loading, MetadataReqContext } from '@polkadot/extension-ui/components'
import Request from '@polkadot/extension-ui/Popup/Metadata/Request'
import React, { useContext } from 'react'
import Header from '../components/Header'

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
