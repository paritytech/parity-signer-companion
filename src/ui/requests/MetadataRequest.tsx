import { MetadataDef } from '@polkadot/extension-inject/types'
import React from 'react'
import { UNKNOWN } from '../../utils/constants'

import { Actions } from '../components/Actions'
import { Button } from '../components/Button'
import { useMetadata } from '../../hooks/useMetadata'

import {
  approveMetaRequest,
  rejectMetaRequest,
} from '../../messaging/uiActions'
import { H1 } from '../components/H1'

type Props = {
  request: MetadataDef
  metaId: string
  url: string
}

export const MetadataRequest: React.FC<Props> = ({ metaId, request, url }) => {
  const chain = useMetadata(request.genesisHash)

  const onApprove = () => approveMetaRequest(metaId).catch(console.error)
  const onReject = () => rejectMetaRequest(metaId).catch(console.error)

  return (
    <div className=''>
      <H1>Update metadata request</H1>
      <p className='mb-2'>
        This approval will add the metadata to your extension instance, allowing
        future requests to be decoded using this metadata.
      </p>
      <table>
        <tr>
          <td className='pr-4'>from</td>
          <td className='pr-4'>{url}</td>
        </tr>
        <tr>
          <td className='pr-4'>chain</td>
          <td className='pr-4'>{request.chain}</td>
        </tr>
        <tr>
          <td className='pr-4'>icon</td>
          <td className='pr-4'>{request.icon}</td>
        </tr>
        <tr>
          <td className='pr-4'>decimals</td>
          <td className='pr-4'>{request.tokenDecimals}</td>
        </tr>
        <tr>
          <td className='pr-4'>symbol</td>
          <td className='pr-4'>{request.tokenSymbol}</td>
        </tr>
        <tr>
          <td className='pr-4'>upgrade</td>
          <td className='pr-4'>
            {chain ? chain.specVersion : UNKNOWN} → {request.specVersion}
          </td>
        </tr>
      </table>
      <Actions>
        <Button onClick={onApprove}>Yes, do this metadata update</Button>
        <Button isSecondary onClick={onReject}>
          Reject
        </Button>
      </Actions>
    </div>
  )
}
