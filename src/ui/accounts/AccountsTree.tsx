import { AccountWithChildren } from '@polkadot/extension-base/background/types'
import React from 'react'
import Address from '../components/Address'

interface Props extends AccountWithChildren {
  parentName?: string
}

const AccountsTree: React.FC<Props> = (account) => {
  return (
    <>
      <Address
        address={account.address}
        genesisHash={account.genesisHash}
        name={account.name}
      />
      {account.children?.map((child, index) => (
        <AccountsTree
          key={`${index}:${child.address}`}
          parentName={account.name}
          {...child}
        />
      ))}
    </>
  )
}

export default AccountsTree
