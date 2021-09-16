import { AccountWithChildren } from '@polkadot/extension-base/background/types'
import React from 'react'
import Account from './Account'

interface Props extends AccountWithChildren {
  parentName?: string
}

const AccountsTree: React.FC<Props> = ({ parentName, suri, ...account }) => {
  return (
    <>
      <Account {...account} parentName={parentName} suri={suri} />
      {account?.children?.map((child, index) => (
        <AccountsTree
          key={`${index}:${child.address}`}
          {...child}
          parentName={account.name}
        />
      ))}
    </>
  )
}

export default AccountsTree
