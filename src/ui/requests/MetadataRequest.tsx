import { MetadataDef } from '@polkadot/extension-inject/types'
import React from 'react'
import styled from 'styled-components'
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
            {chain ? chain.specVersion : '<unknown>'} -&gt;{' '}
            {request.specVersion}
          </td>
        </tr>
      </table>
      <div>
        <div>
          This approval will add the metadata to your extension instance,
          allowing future requests to be decoded using this metadata.
        </div>
        <button onClick={onApprove}>Yes, do this metadata update</button>
        <button onClick={onReject}>Reject</button>
      </div>
    </div>
  )
}

export default styled(MetadataRequest)`
  height: auto;
`
