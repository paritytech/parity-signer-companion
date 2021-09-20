import React, { useEffect } from 'react'
import styled from 'styled-components'
import cancelIcon from '../assets/cancel.svg'
import { useTimer } from '../hooks/useTimer'
import { BaseProps } from '../types'
import { forgetAccount } from '../utils/messaging'
import Address from './Address'
import { Button } from './Button'

type Props = BaseProps & {
  address?: string
  genesisHash?: string | null
  name?: string
}

const Key: React.FC<Props> = ({ className, ...account }) => {
  const timer = useTimer()
  const removing = timer.started

  useEffect(() => {
    if (timer.fired)
      forgetAccount(account.address as string).catch(console.error)
  }, [timer.fired])

  return (
    <div className={className}>
      {!removing && (
        <Address
          address={account.address}
          genesisHash={account.genesisHash}
          name={account.name}
          key={account.address}
        />
      )}
      {!removing && (
        <div className='icon cancel highlighted' onClick={timer.start}>
          <img src={cancelIcon} />
        </div>
      )}
      {removing && (
        <div className='removed'>
          <div>
            Removing &ldquo;{account.name}&rdquo; — {timer.value}s
          </div>
          <Button onClick={timer.reset}>Undo</Button>
        </div>
      )}
    </div>
  )
}

export default styled(Key)`
  position: relative;

  .removed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0.5rem;
    border: 2px dashed ${({ theme }: Props) => theme.cardBgColor};
    border-radius: 0.2rem;
  }

  .logo {
    padding: 0.25rem;
    padding-right: 0rem;
  }

  .logo svg {
    cursor: default;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0.5rem;
  }

  .name {
    margin-top: -0.1rem;
    margin-bottom: 0.1rem;
  }

  .address {
    display: flex;
    align-items: center;
    font-size: ${({ theme }: Props) => theme.smallFontSize};
    color: ${({ theme }: Props) => theme.fadedTextColor};
  }

  .hash {
    padding: 0 0.2rem;
  }

  .icon {
    width: 1rem;
    height: 1rem;
  }

  .cancel {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
  }

  .highlighted {
    border-radius: 0.2rem;
    transition: ${({ theme }: Props) => theme.transition};
    cursor: pointer;
  }

  .highlighted:hover {
    background: ${({ theme }: Props) => theme.hightlight};
  }

  & + & {
    margin-top: 0.2rem;
  }
`
