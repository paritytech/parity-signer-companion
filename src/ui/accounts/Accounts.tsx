import { useStore } from 'nanostores/react'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Key from '../components/Key'
import { hierarchy as hierarchyStore } from '../stores/accounts'
import {
  addHeaderAction,
  importHeaderAction,
  resetHeaderActions,
} from '../stores/headerActions'
import { BaseProps } from '../types'
import NoAccounts from './NoAccounts'

const Accounts: React.FC<BaseProps> = ({ className }) => {
  const hierarchy = useStore(hierarchyStore)

  useEffect(() => {
    if (hierarchy.length > 0) addHeaderAction(importHeaderAction)
    return () => resetHeaderActions()
  }, [hierarchy.length])

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
