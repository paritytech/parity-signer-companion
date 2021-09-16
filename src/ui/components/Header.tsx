import React from 'react'
import styled from 'styled-components'
import { EXT_NAME } from '../../utils/constants'
import { BaseProps } from '../types'
import { goHome, goTo } from '../utils/routing'

type Props = BaseProps & {
  showAdd?: boolean
  showBack?: boolean
  text?: React.ReactNode
}

const Header: React.FC<Props> = ({ className, showAdd, showBack, text }) => {
  const toggleAdd = () => goTo('/account/import-qr')

  return (
    <div className={className}>
      <div className='text-holder'>
        {showBack && (
          <button className='back-button' onClick={goHome}>
            Back
          </button>
        )}
        <div>{text || EXT_NAME}</div>
      </div>
      {showAdd && <button onClick={toggleAdd}>Add</button>}
    </div>
  )
}

export default styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text-holder {
    display: flex;
    align-items: center;
  }

  .back-button {
    margin-right: 1em;
  }
`
