import { AuthorizeReqContext } from '@polkadot/extension-ui/components' // TODO: Replace contexts
import Header from '../components/Header'
import Request from '@polkadot/extension-ui/Popup/Authorize/Request' // TODO: Replace extension-ui
import React, { useContext } from 'react'
import styled from 'styled-components'
import { ExtThemeProps } from '../types'

const Authorize: React.FC<ExtThemeProps> = ({ className }) => {
  const requests = useContext(AuthorizeReqContext)

  return (
    <>
      <div
        className={`${className} ${requests.length === 1 ? 'lastRequest' : ''}`}
      >
        <Header text={'Authorize'} />
        {requests.map(
          ({ id, request, url }, index): React.ReactNode => (
            <Request
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
    </>
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
