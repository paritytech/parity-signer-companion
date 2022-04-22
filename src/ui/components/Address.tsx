import { useStore } from '@nanostores/react'
import { AccountJson } from '@polkadot/extension-base/background/types'
import Identicon from '@polkadot/react-identicon'
import { IconTheme } from '@polkadot/react-identicon/types'
import React, { useCallback, useEffect, useState } from 'react'
import { useMetadata } from '../../hooks/useMetadata'
import { editAccount } from '../../messaging/uiActions'
import { accountsStore } from '../../stores/accounts'
import { DEFAULT_TYPE, RELAY_CHAIN, UNKNOWN } from '../../utils/constants'
import { cropHash } from '../../utils/cropHash'
import { recodeAddress, Recoded } from '../../utils/recodeAddress'
import { AutosizeInput } from './AutosizeInput'

type Props = {
  address?: string
  genesisHash?: string | null
  name?: string
}

const defaultRecoded = {
  account: null,
  formatted: null,
  prefix: 42,
  type: DEFAULT_TYPE,
}

export const Address: React.FC<Props> = ({ address, genesisHash, name }) => {
  const [recoded, setRecoded] = useState<Recoded>(defaultRecoded)
  const accounts = useStore(accountsStore) as AccountJson[]
  const chain = useMetadata(genesisHash || recoded.genesisHash, true)
  const iconTheme = (chain?.icon || 'polkadot') as IconTheme
  const nameLabel = name || recoded.account?.name
  const chainLabel = ` · ${chain?.definition.chain.replace(RELAY_CHAIN, '')}`
  const hashLabel = cropHash(recoded.formatted || address || UNKNOWN)

  const changeName = useCallback(
    (v: string) => address && editAccount(address, v).catch(console.error),
    [address]
  )

  useEffect(() => {
    if (!address) return

    const recoded = recodeAddress(address, accounts, chain)
    recoded && setRecoded(recoded)
  }, [accounts, address, chain])

  return (
    <div className='flex relative rounded bg-_bg-300'>
      <div className='flex items-center p-2 pr-0'>
        <Identicon
          prefix={recoded.prefix}
          theme={iconTheme}
          value={recoded.formatted || address}
          size={32}
        />
      </div>
      <div className='flex flex-col justify-center py-0 px-2 leading-none space-y-1'>
        <div className=''>
          <AutosizeInput
            value={nameLabel}
            placeholder={UNKNOWN}
            onChange={changeName}
          />
          {chain && <span className='text-_crypto-400'>{chainLabel}</span>}
        </div>
        <div className='font-mono text-sm text-_text-400'>{hashLabel}</div>
      </div>
    </div>
  )
}
