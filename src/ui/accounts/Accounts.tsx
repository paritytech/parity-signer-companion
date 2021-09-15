import { AccountContext } from '@polkadot/extension-ui/components'
import React, { useContext } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { ExtThemeProps } from '../types'
import AccountsTree from './AccountsTree'
import AddAccount from './AddAccount'

const Accounts: React.FC<ExtThemeProps> = ({ className }) => {
  const { hierarchy } = useContext(AccountContext)

  if (hierarchy.length === 0) return <AddAccount />

  return (
    <>
      <Header showAdd showSettings text={'Accounts'} />
      <div className={className}>
        {hierarchy.map((json, i) => (
          <AccountsTree {...json} key={`${i}:${json.address}`} />
        ))}
      </div>
    </>
  )
}

export default styled(Accounts)`
  height: calc(100vh - 2px);
  overflow-y: scroll;
  margin-top: -25px;
  padding-top: 25px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
