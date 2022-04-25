import React from 'react'
import { forgetAccount } from '../../messaging/uiActions'
import { Address } from './Address'
import { Button } from './Button'

type Props = {
  address?: string
  genesisHash?: string | null
  name?: string
}

export const Key: React.FC<Props> = ({ ...account }) => {
  function forget() {
    forgetAccount(account.address as string).catch(console.error)
  }

  return (
    <div className='relative group'>
      <Address
        address={account.address}
        genesisHash={account.genesisHash}
        name={account.name}
        key={account.address}
      />
      <div className='absolute flex top-0 right-2 h-full items-center transition opacity-0 group-hover:opacity-100'>
        <div className='flex space-x-4'>
          <Button onClick={forget} isDanger>
            Forget
          </Button>
        </div>
      </div>
    </div>
  )
}
