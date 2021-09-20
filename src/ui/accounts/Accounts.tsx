import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import { hierarchy as hierarchyStore } from '../stores/accounts'
import { BaseProps } from '../types'
import AccountsTree from './AccountsTree'
import NoAccounts from './NoAccounts'

const Accounts: React.FC<BaseProps> = ({ className }) => {
  const hierarchy = useStore(hierarchyStore)

  if (hierarchy.length === 0) return <NoAccounts />

  return (
    <div className={className}>
      <h1>All keys</h1>
      {hierarchy.map((json, i) => (
        <AccountsTree {...json} key={`${i}:${json.address}`} />
      ))}
    </div>
  )
}

export default styled(Accounts)`
  height: 100%;
`
