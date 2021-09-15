import { Address } from '@polkadot/extension-ui/components'
import { createAccountExternal } from '@polkadot/extension-ui/messaging'
import { QrScanAddress } from '@polkadot/react-qr'
import React, { useState } from 'react'
import Header from '../components/Header'
import { goTo } from '../utils/goTo'

interface QrAccount {
  isAddress: boolean
  content: string
  genesisHash: string
  name?: string
}

const ImportQr: React.FC = () => {
  const [account, setAccount] = useState<QrAccount>()

  const onCreate = () => {
    if (account) {
      createAccountExternal(
        account.name || '',
        account.content,
        account.genesisHash
      )
        .then(() => goTo('/'))
        .catch((error: Error) => console.error(error))
    }
  }

  return (
    <>
      <Header showBackArrow text={'Scan Address Qr'} />
      {!account && <QrScanAddress onScan={setAccount} />}
      {account && (
        <>
          <Address
            {...account}
            address={account.content}
            isExternal={true}
            name={account.name}
          />
          <button disabled={!account.name} onClick={onCreate}>
            {'Add the account with identified address'}
          </button>
        </>
      )}
    </>
  )
}

export default ImportQr
