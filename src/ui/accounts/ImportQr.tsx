import { Address } from '@polkadot/extension-ui/components'
import useTranslation from '@polkadot/extension-ui/hooks/useTranslation'
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
  const { t } = useTranslation()
  const [account, setAccount] = useState<QrAccount>()

  const _onCreate = () => {
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
      <Header showBackArrow text={t('Scan Address Qr')} />
      {!account && <QrScanAddress onScan={setAccount} />}
      {account && (
        <>
          <Address
            {...account}
            address={account.content}
            isExternal={true}
            name={account.name}
          />
          <button disabled={!account.name} onClick={_onCreate}>
            {t('Add the account with identified address')}
          </button>
        </>
      )}
    </>
  )
}

export default ImportQr
