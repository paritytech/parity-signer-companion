import { QrScanAddress } from '@polkadot/react-qr'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Address from '../components/Address'
import {
  addHeaderAction,
  goHomeHeaderAction,
  resetHeaderActions,
} from '../../stores/headerActions'
import { BaseProps } from '../types'
import { createAccountExternal } from '../../messaging/uiActions'

interface QrAccount {
  isAddress: boolean
  content: string
  genesisHash: string
  name?: string
}

const ImportQr: React.FC<BaseProps> = ({ className }) => {
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
    addHeaderAction(goHomeHeaderAction)
    return () => resetHeaderActions()
  }, [])

  return (
    <div className={className}>
      <div className='row'>
        <div className='counter'>
          <h1>
            Import
            <br />
            Signer
            <br />
            keys
          </h1>
          <div>
            <span className='num'>{scanned.length}</span>
            imported
          </div>
        </div>
        <div className='scanner'>
          <QrScanAddress onScan={onCreate} />
        </div>
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

  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1rem;
  }

  .row > div {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
  }

  .row .counter {
    justify-content: space-between;
  }

  .counter .num {
    display: block;
    font-size: 4rem;
    line-height: 1;
  }
`
