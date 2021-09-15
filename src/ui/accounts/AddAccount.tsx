import Header from '../components/Header'
import React from 'react'
import styled from 'styled-components'
import type { ExtThemeProps } from '../types'

const AddAccount: React.FC<ExtThemeProps> = ({ className }) => {
  return (
    <>
      <Header showAdd showSettings text={'Add Account'} />
      <div className={className}>
        {
          "You currently don't have any accounts. Create your first account to get started."
        }
      </div>
    </>
  )
}

export default styled(AddAccount)`
  color: ${({ theme }: ExtThemeProps) => theme.textColor};
  height: 100%;
  text-align: center;
  font-size: 16px;
  line-height: 26px;
  margin: 0 30px;
`
