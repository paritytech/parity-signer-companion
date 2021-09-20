import React from 'react'
import styled from 'styled-components'
import { BaseProps } from '../types'

const NoAccounts: React.FC<BaseProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className='container'>
        You have no accounts.
        <br />
        Create your first account to get started.
      </div>
    </div>
  )
}

export default styled(NoAccounts)`
  display: flex;
  height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;

  .container {
    padding: 2rem;
    padding-bottom: 4rem;
    color: ${({ theme }: BaseProps) => theme.fadedTextColor};
  }
`
