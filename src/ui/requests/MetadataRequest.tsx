import { MetadataDef } from '@polkadot/extension-inject/types'
import React from 'react'
import { UNKNOWN } from '../../utils/constants'
import styled from 'styled-components'
import Actions from '../components/Actions'
import { Button } from '../components/Button'
import useMetadata from '../hooks/useMetadata'
import { BaseProps } from '../types'
import { approveMetaRequest, rejectMetaRequest } from '../utils/messaging'

type Props = BaseProps & {
  request: MetadataDef
  metaId: string
  url: string
}

const MetadataRequest: React.FC<Props> = ({
  className,
  metaId,
  request,
  url,
}) => {
  const chain = useMetadata(request.genesisHash)

  const onApprove = () => approveMetaRequest(metaId).catch(console.error)
  const onReject = () => rejectMetaRequest(metaId).catch(console.error)

  return (
    <div className={className}>
      <h1>Update metadata request</h1>
      <p>
        This approval will add the metadata to your extension instance, allowing
        future requests to be decoded using this metadata.
      </p>
      <table>
        <tr>
          <td>from</td>
          <td>{url}</td>
        </tr>
        <tr>
          <td>chain</td>
          <td>{request.chain}</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>{request.icon}</td>
        </tr>
        <tr>
          <td>decimals</td>
          <td>{request.tokenDecimals}</td>
        </tr>
        <tr>
          <td>symbol</td>
          <td>{request.tokenSymbol}</td>
        </tr>
        <tr>
          <td>upgrade</td>
          <td>
            {chain ? chain.specVersion : UNKNOWN} → {request.specVersion}
          </td>
        </tr>
      </table>
      <Actions>
        <Button onClick={onApprove}>Yes, do this metadata update</Button>
        <Button className='secondary' onClick={onReject}>
          Reject
        </Button>
      </Actions>
    </div>
  )
}

export default styled(MetadataRequest)`
  table {
    border-spacing: 0 0.2rem;
  }

  td {
    padding: 0;
    padding-right: 1rem;
  }
`
