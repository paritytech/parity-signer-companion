import { useStore } from '@nanostores/react'
import { RequestAuthorizeTab } from '@polkadot/extension-base/background/types'
import React from 'react'
import {
  approveAuthRequest,
  deleteAuthRequest,
} from '../../messaging/uiActions'
import { addressesStore } from '../../stores/accounts'
import { Actions } from '../components/Actions'
import { Button } from '../components/Button'
import { H1 } from '../components/H1'

type Props = {
  authId: string
  request: RequestAuthorizeTab
  url: string
}

export const AuthorizeRequest: React.FC<Props> = ({ authId, request, url }) => {
  const addresses = useStore(addressesStore)

  const onApprove = () =>
    approveAuthRequest(authId, addresses).catch(console.error)
  const onCancel = () => deleteAuthRequest(authId).catch(console.error)

  return (
    <div>
      <H1>Authentication request</H1>
      <p className='mb-2'>
        An application, self-identifying as {request.origin} is requesting
        access:
      </p>
      <p className='mb-6'>
        <a href={url} rel='noopener noreferrer' target='_blank'>
          {url}
        </a>
      </p>
      <p className='mb-2'>
        Only approve this request if you trust the application. Approving gives
        the application access to the addresses of your accounts.
      </p>
      <Actions>
        <Button onClick={onApprove}>Yes, allow this application access</Button>
        <Button isSecondary onClick={onCancel}>
          Ask again later
        </Button>
      </Actions>
    </div>
  )
}
