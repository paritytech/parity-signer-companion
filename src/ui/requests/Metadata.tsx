import { Loading, MetadataReqContext } from '@polkadot/extension-ui/components'
import useTranslation from '@polkadot/extension-ui/hooks/useTranslation'
import Request from '@polkadot/extension-ui/Popup/Metadata/Request'
import React, { useContext } from 'react'
import Header from '../components/Header'

export default function Metadata(): React.ReactElement {
  const { t } = useTranslation()
  const requests = useContext(MetadataReqContext)
  const request = requests[0]

  if (!request) return <Loading />

  return (
    <>
      <Header text={t<string>('Metadata')} />
      <Request
        key={request.id}
        metaId={request.id}
        request={request.request}
        url={request.url}
      />
    </>
  )
}
