import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { authRequests as authRequestsStore } from '../stores/authRequests'
import { ExtThemeProps } from '../types'
import AuthorizeRequest from './AuthorizeRequest'

const Authorize: React.FC<ExtThemeProps> = ({ className }) => {
  const requests = useStore(authRequestsStore)

  return (
    <div
      className={`${className} ${requests.length === 1 ? 'lastRequest' : ''}`}
    >
      <Header text={'Authorize'} />
      {requests.map(
        ({ id, request, url }, index): React.ReactNode => (
          <AuthorizeRequest
            authId={id}
            className='request'
            isFirst={index === 0}
            key={id}
            request={request}
            url={url}
          />
        )
      )}
    </div>
  )
}

export default styled(Authorize)`
  overflow-y: auto;

  &.lastRequest {
    overflow: hidden;
  }

  && {
    padding: 0;
  }

  .request {
    padding: 0 24px;
  }
`
