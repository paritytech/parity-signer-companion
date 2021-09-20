import { QrScanAddress } from '@polkadot/react-qr'
import React, { useState } from 'react'
import styled from 'styled-components'
import Address from '../components/Address'
import { BaseProps } from '../types'
import { createAccountExternal } from '../utils/messaging'

interface QrAccount {
  isAddress: boolean
  content: string
  genesisHash: string
  name?: string
}

const ImportQr: React.FC<BaseProps> = ({ className }) => {
  const [scanned, setScanned] = useState<QrAccount[]>([])

  const onCreate = (account: QrAccount) => {
    if (
      scanned.find(
        (a) => a.content === account.content && a.genesisHash === a.genesisHash
      )
    )
      return

    createAccountExternal(
      account.name || 'Unknown',
      account.content,
      account.genesisHash
    ).catch((error: Error) => console.error(error))
    setScanned((s) => [...s, account])
  }

  return (
    <div className={className}>
      <h1>Import Signer keys</h1>
      <div className='scanner'>
        <QrScanAddress onScan={onCreate} />
      </div>
      <div>
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

export default styled(ImportQr)`
  display: flex;
  flex-direction: column;

  .scanner {
    padding: 0.5rem 6rem;
    margin-bottom: 1rem;
    background: ${({ theme }: BaseProps) => theme.cardBgColor};
  }
`
