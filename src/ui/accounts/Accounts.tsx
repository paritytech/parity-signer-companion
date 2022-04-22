import { useStore } from '@nanostores/react'
import React, { useEffect } from 'react'
import { orderedAccountsStore } from '../../stores/accounts'
import {
  addHeaderAction,
  importHeaderAction,
  resetHeaderActions,
} from '../../stores/headerActions'
import { Key } from '../components/Key'
import { NoAccounts } from './NoAccounts'

export const Accounts = () => {
  const accounts = useStore(orderedAccountsStore)

  useEffect(() => {
    if (accounts.length > 0) addHeaderAction(importHeaderAction)
    return () => resetHeaderActions()
  }, [accounts.length])

  if (accounts.length === 0) return <NoAccounts />

  return (
    <div className='h-full space-y-2'>
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
