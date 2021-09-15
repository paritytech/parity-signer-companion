import Address from '../components/Address'
import { forgetAccount } from '@polkadot/extension-ui/messaging' // TODO: Replace messaging
import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components'
import Header from '../components/Header'
import type { ExtThemeProps } from '../types'
import { goTo } from '../utils/goTo'

type Props = RouteComponentProps<{ address: string }> & ExtThemeProps

const Forget: React.FC<Props> = ({
  className,
  match: {
    params: { address },
  },
}: Props) => {
  const [isBusy, setIsBusy] = useState(false)

  const goHome = () => goTo('/')

  const onClick = () => {
    setIsBusy(true)
    forgetAccount(address)
      .then(() => {
        setIsBusy(false)
        goHome()
      })
      .catch((error: Error) => {
        setIsBusy(false)
        console.error(error)
      })
  }

  return (
    <>
      <Header showBackArrow text={'Forget account'} />
      <div className={className}>
        <Address address={address}>
          <div className='movedWarning'>
            {
              'You are about to remove the account. This means that you will not be able to access it via this extension anymore. If you wish to recover it, you would need to use the seed.'
            }
          </div>
          <div className='actionArea'>
            <button disabled={isBusy} onClick={onClick}>
              {'I want to forget this account'}
            </button>
            <button onClick={goHome}>{'Cancel'}</button>
          </div>
        </Address>
      </div>
    </>
  )
}

export default withRouter(styled(Forget)`
  .actionArea {
    padding: 10px 24px;
  }

  .center {
    margin: auto;
  }

  .movedWarning {
    margin-top: 8px;
  }

  .withMarginTop {
    margin-top: 4px;
  }
`)
