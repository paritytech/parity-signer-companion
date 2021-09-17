import { RequestAuthorizeTab } from '@polkadot/extension-base/background/types'
import React from 'react'
import styled from 'styled-components'
import Actions from '../components/Actions'
import { BaseProps } from '../types'
import { approveAuthRequest, rejectAuthRequest } from '../utils/messaging'

interface Props extends BaseProps {
  authId: string
  request: RequestAuthorizeTab
  url: string
}

const AuthorizeRequest: React.FC<Props> = ({
  className,
  authId,
  request,
  url,
}) => {
  const onApprove = () => approveAuthRequest(authId).catch(console.error)
  const onReject = () => rejectAuthRequest(authId).catch(console.error)

  return (
    <div className={className}>
      <div className='text'>
        An application, self-identifying as {request.origin} is requesting
        access from{' '}
        <a href={url} rel='noopener noreferrer' target='_blank'>
          {url}
        </a>
      </div>
      <div className='text'>
        Only approve this request if you trust the application. Approving gives
        the application access to the addresses of your accounts.
      </div>
      <Actions>
        <button onClick={onApprove}>Yes, allow this application access</button>
        <button onClick={onReject}>Reject</button>
      </Actions>
    </div>
  )
}

export default styled(AuthorizeRequest)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .text {
    width: 80%;
    margin: 0 auto;
  }

  .text + .text {
    margin-top: 1rem;
  }
`
