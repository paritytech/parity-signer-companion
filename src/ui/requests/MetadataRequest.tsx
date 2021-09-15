import type { MetadataDef } from '@polkadot/extension-inject/types'
import useMetadata from '@polkadot/extension-ui/hooks/useMetadata' // TODO: Replace hooks
import {
  approveMetaRequest,
  rejectMetaRequest,
} from '@polkadot/extension-ui/messaging' // TODO: Replace messaging
import React from 'react'
import styled from 'styled-components'
import type { ExtThemeProps, ThemeProps } from '../types'

type Props = ExtThemeProps & {
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
          <td className='label'>{'from'}</td>
          <td className='data'>{url}</td>
        </tr>
        <tr>
          <td className='label'>{'chain'}</td>
          <td className='data'>{request.chain}</td>
        </tr>
        <tr>
          <td className='label'>{'icon'}</td>
          <td className='data'>{request.icon}</td>
        </tr>
        <tr>
          <td className='label'>{'decimals'}</td>
          <td className='data'>{request.tokenDecimals}</td>
        </tr>
        <tr>
          <td className='label'>{'symbol'}</td>
          <td className='data'>{request.tokenSymbol}</td>
        </tr>
        <tr>
          <td className='label'>{'upgrade'}</td>
          <td className='data'>
            {chain ? chain.specVersion : '<unknown>'} -&gt;{' '}
            {request.specVersion}
          </td>
        </tr>
      </table>
      <div className='requestInfo'>
        <div className='requestWarning'>
          {
            'This approval will add the metadata to your extension instance, allowing future requests to be decoded using this metadata.'
          }
        </div>
        <button className='btnAccept' onClick={onApprove}>
          {'Yes, do this metadata update'}
        </button>
        <button onClick={onReject}>{'Reject'}</button>
      </div>
    </div>
  )
}

export default styled(MetadataRequest)`
  .btnAccept {
    margin: 25px auto 0;
    width: 90%;
  }

  .btnReject {
    margin: 8px 0 15px 0;
    text-decoration: underline;
  }

  .icon {
    background: ${({ theme }: ThemeProps) => theme.buttonBackgroundDanger};
    color: white;
    min-width: 18px;
    width: 14px;
    height: 18px;
    font-size: 10px;
    line-height: 20px;
    margin: 16px 15px 0 1.35rem;
    font-weight: 800;
    padding-left: 0.5px;
  }

  .requestInfo {
    align-items: center;
    background: ${({ theme }: ThemeProps) => theme.highlightedAreaBackground};
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  .requestWarning {
    margin: 24px 24px 0 1.45rem;
  }
`
