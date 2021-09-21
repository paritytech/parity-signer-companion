import { RequestAuthorizeTab } from '@polkadot/extension-base/background/types'
import React from 'react'
import Actions from '../components/Actions'
import { Button } from '../components/Button'
import { approveAuthRequest, rejectAuthRequest } from '../utils/messaging'

type Props = {
  authId: string
  request: RequestAuthorizeTab
  url: string
}

const AuthorizeRequest: React.FC<Props> = ({ authId, request, url }) => {
  const onApprove = () => approveAuthRequest(authId).catch(console.error)
  const onReject = () => rejectAuthRequest(authId).catch(console.error)

  return (
    <div>
      <h1>Authentication request</h1>
      <p>
        An application, self-identifying as {request.origin} is requesting
        access:
      </p>
      <p className='emphasis'>
        <a href={url} rel='noopener noreferrer' target='_blank'>
          {url}
        </a>
      </p>
      <p>
        Only approve this request if you trust the application. Approving gives
        the application access to the addresses of your accounts.
      </p>
      <Actions>
        <Button onClick={onApprove}>Yes, allow this application access</Button>
        <Button className='secondary' onClick={onReject}>
          Reject
        </Button>
      </Actions>
    </div>
  )
}

export default AuthorizeRequest
