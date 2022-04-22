import React, { useEffect } from 'react'
import { useTimer } from '../../hooks/useTimer'
import { forgetAccount } from '../../messaging/uiActions'
import { Address } from './Address'
import { Button } from './Button'

type Props = {
  address?: string
  genesisHash?: string | null
  name?: string
}

export const Key: React.FC<Props> = ({ ...account }) => {
  const timer = useTimer()
  const removing = timer.started

  useEffect(() => {
    if (timer.fired)
      forgetAccount(account.address as string).catch(console.error)
  }, [timer.fired])

  return (
    <div className='relative group'>
      {!removing && (
        <Address
          address={account.address}
          genesisHash={account.genesisHash}
          name={account.name}
          key={account.address}
        />
      )}
      {!removing && (
        <div
          className='absolute flex top-0 right-2 h-full items-center transition opacity-0 group-hover:opacity-100'
          onClick={timer.start}
        >
          <div className='flex space-x-4'>
            <Button isDanger>Forget</Button>
          </div>
        </div>
      )}
      {removing && (
        <div className='flex items-center justify-between p-2 border-2 border-_bg-300 border-dashed rounded'>
          <div className='text-_text-400'>
            Removing &ldquo;{account.name}&rdquo; — {timer.value}s
          </div>
          <Button isSecondary onClick={timer.reset}>
            Undo
          </Button>
        </div>
      )}
    </div>
  )
}
