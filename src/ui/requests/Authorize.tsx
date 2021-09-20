import { useStore } from 'nanostores/react'
import React from 'react'
import { authRequests as authRequestsStore } from '../stores/authRequests'
import AuthorizeRequest from './AuthorizeRequest'

const Authorize: React.FC = () => {
  const requests = useStore(authRequestsStore)

  return (
    <>
      {requests.map(({ id, request, url }) => (
        <AuthorizeRequest authId={id} request={request} url={url} key={id} />
      ))}
    </>
  )
}

export default Authorize
