import React, { useState } from 'react'
import styled from 'styled-components'
import Address from '../components/Address'
import Header from '../components/Header'
import type { ExtThemeProps } from '../types'
import { goTo } from '../utils/routing'
import { forgetAccount } from '../utils/messaging'

type Props = ExtThemeProps & {
  address: string
}

const Forget: React.FC<Props> = ({ className, address }) => {
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

export default styled(Forget)`
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
`
