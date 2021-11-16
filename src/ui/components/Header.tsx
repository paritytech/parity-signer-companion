import { useStore } from '@nanostores/react'
import React from 'react'
import styled from 'styled-components'
import { EXT_NAME } from '../../utils/constants'
import logo from '../assets/logo.svg'
import { headerActions } from '../../stores/headerActions'
import { BaseProps } from '../types'
import { Button } from './Button'

const Header: React.FC<BaseProps> = ({ className }) => {
  const actions = useStore(headerActions)

  return (
    <div className={className}>
      <div className='text-holder'>
        <img className='logo' src={logo} />
        <div>{EXT_NAME}</div>
      </div>
      {actions.map((a) => (
        <Button onClick={a.onAction} key={a.label}>
          {a.label}
        </Button>
      ))}
    </div>
  )
}

export default styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: var(--shadow);

  .text-holder {
    display: flex;
    align-items: center;
    height: 1.9rem;
  }

  img {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }
`
