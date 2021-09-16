import { useStore } from 'nanostores/react'
import React from 'react'
import Header from '../components/Header'
import { authRequests as authRequestsStore } from '../stores/authRequests'
import AuthorizeRequest from './AuthorizeRequest'

const Authorize: React.FC = () => {
  const requests = useStore(authRequestsStore)

  return (
    <>
      <Header text={'Authorize'} />
      {requests.map(
        ({ id, request, url }): React.ReactNode => (
          <AuthorizeRequest authId={id} request={request} url={url} key={id} />
        )
      )}
    </>
  )
}

export default Authorize
