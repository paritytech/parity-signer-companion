import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import Actions from '../components/Actions'
import Address from '../components/Address'
import { router } from '../stores/router'
import { BaseProps } from '../types'
import { forgetAccount } from '../utils/messaging'
import { goHome } from '../utils/routing'

const Forget: React.FC<BaseProps> = ({ className }) => {
  const { param: address } = useStore(router)

  const onClick = () => {
    forgetAccount(address).catch(console.error)
    goHome()
  }

  return (
    <div className={className}>
      <Address address={address} hideActions />
      <div className='warning'>
        You are about to remove the account. This means that you will not be
        able to access it via this extension anymore. If you wish to recover it,
        you would need to use the seed.
      </div>
      <Actions>
        <button className='actionButton' onClick={onClick}>
          I want to forget this account
        </button>
        <button onClick={goHome}>Cancel</button>
      </Actions>
    </div>
  )
}

export default styled(Forget)`
  display: flex;
  flex-direction: column;

  .warning {
    margin: 1rem auto 0;
    max-width: 80%;
    text-align: center;
  }
`
