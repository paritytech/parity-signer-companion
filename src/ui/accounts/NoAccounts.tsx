import Header from '../components/Header'
import React from 'react'
import styled from 'styled-components'
import { BaseProps } from '../types'

const NoAccounts: React.FC<BaseProps> = ({ className }) => {
  return (
    <>
      <Header showAdd text={'Add Account'} />
      <div className={className}>
        <div className='container'>
          You have no accounts.
          <br />
          Create your first account to get started.
        </div>
      </div>
    </>
  )
}

export default styled(NoAccounts)`
  display: flex;
  height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;

  .container {
    padding-bottom: 4rem;
  }
`
