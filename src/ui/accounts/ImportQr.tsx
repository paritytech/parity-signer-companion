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
    <div className=''>
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

//  TODO:
// export default styled(ImportQr)`
//   display: flex;
//   flex-direction: column;

//   .row {
//     display: flex;
//     flex-direction: row;
//     width: 100%;
//     margin-bottom: 1rem;
//   }

//   .row > div {
//     display: flex;
//     flex-direction: column;
//     flex-basis: 50%;
//   }

//   .row .counter {
//     justify-content: space-between;
//   }

//   .counter .num {
//     display: block;
//     font-size: 4rem;
//     line-height: 1;
//   }

//   .scanner {
//     border: 0.2rem solid var(--color-white);
//     border-radius: 0.2rem;
//   }
// `
