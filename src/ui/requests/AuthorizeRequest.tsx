import type { RequestAuthorizeTab } from '@polkadot/extension-base/background/types'
import { approveAuthRequest, rejectAuthRequest } from '../utils/messaging'
import React from 'react'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import type { ThemeProps } from '../types'

interface Props extends ThemeProps {
  authId: string
  className?: string
  isFirst: boolean
  request: RequestAuthorizeTab
  url: string
}

const AuthorizeRequest: React.FC<Props> = ({
  authId,
  className,
  isFirst,
  request: { origin },
  url,
}) => {
  const onApprove = () => approveAuthRequest(authId).catch(console.error)
  const onReject = () => rejectAuthRequest(authId).catch(console.error)

  return (
    <div className={className}>
      <div className='requestInfo'>
        <div className='info'>
          <div className='tab-info'>
            <Trans key='accessRequest'>
              {'An application, self-identifying as '}
              <span className='tab-name'>{origin}</span> is requesting access
              {'from '}
              <a href={url} rel='noopener noreferrer' target='_blank'>
                <span className='tab-url'>{url}</span>
              </a>
              {'.'}
            </Trans>
          </div>
        </div>
        {isFirst && (
          <>
            <div className='warningMargin'>
              {
                'Only approve this request if you trust the application. Approving gives the application access to the addresses of your accounts.'
              }
            </div>
            <button className='acceptButton' onClick={onApprove}>
              {'Yes, allow this application access'}
            </button>
          </>
        )}
        <button onClick={onReject}>{'Reject'}</button>
      </div>
    </div>
  )
}

export default styled(AuthorizeRequest)`
  .tab-info {
    overflow: hidden;
    margin: 0.75rem 20px 0 0;
  }

  .tab-name,
  .tab-url {
    color: ${({ theme }: Props) => theme.textColor};
    display: inline-block;
    max-width: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    cursor: pointer;
    text-decoration: underline;
  }

  .requestInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;
    background: ${({ theme }: Props) => theme.highlightedAreaBackground};
  }

  .info {
    display: flex;
    flex-direction: row;
  }

  .acceptButton {
    width: 90%;
    margin: 25px auto 0;
  }

  .warningMargin {
    margin: 24px 24px 0 1.45rem;
  }
`
