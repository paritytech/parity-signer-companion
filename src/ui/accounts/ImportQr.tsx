import { QrScanAddress } from '@polkadot/react-qr'
import React, { useEffect, useState } from 'react'
import { createAccountExternal } from '../../messaging/uiActions'
import {
  addHeaderAction,
  cancelAndGoHomeHeaderAction,
  doneAndGoHomeHeaderAction,
  resetHeaderActions,
} from '../../stores/headerActions'
import { Address } from '../components/Address'
import { H1 } from '../components/H1'

interface QrAccount {
  isAddress: boolean
  content: string
  genesisHash: string
  name?: string
}

export const ImportQr = () => {
  const [scanned, setScanned] = useState<QrAccount[]>([])

  const onCreate = (account: QrAccount) => {
    const alreadyScanned = scanned.find(
      (a) =>
        a.content === account.content && a.genesisHash === account.genesisHash
    )
    if (alreadyScanned) return

    createAccountExternal(
      account.name || 'Unknown',
      account.content,
      account.genesisHash
    )
      .then(() => setScanned((s) => [...s, account]))
      .catch(console.error)
  }

  useEffect(() => {
    scanned.length === 0
      ? addHeaderAction(cancelAndGoHomeHeaderAction)
      : addHeaderAction(doneAndGoHomeHeaderAction)
    return () => resetHeaderActions()
  }, [scanned.length])

  return (
    <div className='flex flex-col'>
      <div className='flex w-full mb-4'>
        <div className='flex flex-col basis-1/2 justify-between'>
          <H1>
            Import
            <br />
            Signer
            <br />
            keys
          </H1>
          <div>
            <span className='block text-6xl leading-none'>
              {scanned.length}
            </span>
            imported
          </div>
        </div>
        <div className='flex flex-col basis-1/2 border-8 rounded'>
          <QrScanAddress onScan={onCreate} />
        </div>
      </div>
      <div className='space-y-2'>
        {scanned.reverse().map((account) => (
          <Address
            {...account}
            address={account.content}
            name={account.name}
            key={account.content}
          />
        ))}
      </div>
    </div>
  )
}
