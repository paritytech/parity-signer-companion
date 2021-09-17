import React from 'react'
import styled from 'styled-components'
import { EXT_NAME } from '../../utils/constants'
import logo from '../assets/logo.svg'
import { BaseProps } from '../types'
import { goTo } from '../utils/routing'

type Props = BaseProps & {
  text?: React.ReactNode
}

const Header: React.FC<Props> = ({ className, text }) => {
  const toggleAdd = () => goTo('/account/import-qr')

  return (
    <div className={className}>
      <div className='text-holder'>
        <img className='logo' src={logo} />
        <div>{text || EXT_NAME}</div>
      </div>
      <button onClick={toggleAdd}>Add</button>
    </div>
  )
}

export default styled(Header)`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;

  .text-holder {
    display: flex;
    align-items: center;
  }

  img {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
  }
`
