import { useStore } from '@nanostores/react'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Key from '../components/Key'
import { accounts as accountsStore } from '../../stores/accounts'
import {
  addHeaderAction,
  importHeaderAction,
  resetHeaderActions,
} from '../../stores/headerActions'
import { BaseProps } from '../types'
import NoAccounts from './NoAccounts'

const Accounts: React.FC<BaseProps> = ({ className }) => {
  const accounts = useStore(accountsStore)

  useEffect(() => {
    if (accounts.length > 0) addHeaderAction(importHeaderAction)
    return () => resetHeaderActions()
  }, [accounts.length])

  if (accounts.length === 0) return <NoAccounts />

  return (
    <div className={className}>
      <h1>All keys</h1>
      {accounts.map((account) => (
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
