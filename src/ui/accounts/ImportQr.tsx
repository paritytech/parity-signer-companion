import { QrScanAddress } from '@polkadot/react-qr'
import React, { useState } from 'react'
import styled from 'styled-components'
import Actions from '../components/Actions'
import Address from '../components/Address'
import Header from '../components/Header'
import { BaseProps } from '../types'
import { createAccountExternal } from '../utils/messaging'
import { goHome } from '../utils/routing'

interface QrAccount {
  isAddress: boolean
  content: string
  genesisHash: string
  name?: string
}

const ImportQr: React.FC<BaseProps> = ({ className }) => {
  const [account, setAccount] = useState<QrAccount>()

  const onCreate = () => {
    if (!account) return

    createAccountExternal(
      account.name || 'Unknown',
      account.content,
      account.genesisHash
    ).catch((error: Error) => console.error(error))
    goHome()
  }

  return (
    <>
      <Header text={'Scan Address Qr'} />
      <div className={className}>
        {!account && <QrScanAddress onScan={setAccount} />}
        {account && (
          <Address
            {...account}
            address={account.content}
            name={account.name}
            hideActions
          />
        )}
        <Actions>
          {account && (
            <button onClick={onCreate}>
              Add the account with identified address
            </button>
          )}
          <button onClick={goHome}>Cancel</button>
        </Actions>
      </div>
    </>
  )
}

export default styled(ImportQr)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
