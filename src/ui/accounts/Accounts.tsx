import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import Key from '../components/Key'
import { hierarchy as hierarchyStore } from '../stores/accounts'
import { BaseProps } from '../types'
import NoAccounts from './NoAccounts'

const Accounts: React.FC<BaseProps> = ({ className }) => {
  const hierarchy = useStore(hierarchyStore)

  if (hierarchy.length === 0) return <NoAccounts />

  return (
    <div className={className}>
      <h1>All keys</h1>
      {hierarchy.map((account) => (
        <Key
          address={account.address}
          genesisHash={account.genesisHash}
          name={account.name}
          key={account.address}
        />
      ))}
    </div>
  )
}

export default styled(Accounts)`
  height: 100%;
`
