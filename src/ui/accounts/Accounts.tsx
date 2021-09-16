import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { hierarchy as hierarchyStore } from '../stores/accounts'
import { ExtThemeProps } from '../types'
import AccountsTree from './AccountsTree'
import AddAccount from './AddAccount'

const Accounts: React.FC<ExtThemeProps> = ({ className }) => {
  const hierarchy = useStore(hierarchyStore)

  if (hierarchy.length === 0) return <AddAccount />

  return (
    <>
      <Header showAdd text={'Accounts'} />
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
