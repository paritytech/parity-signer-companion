import { AccountJson } from '@polkadot/extension-base/background/types'
import { IconTheme } from '@polkadot/react-identicon/types'
import { KeypairType } from '@polkadot/util-crypto/types'
import { useStore } from 'nanostores/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useMetadata from '../hooks/useMetadata'
import { accounts as accountsStore } from '../stores/accounts'
import { BaseProps } from '../types'
import { DEFAULT_TYPE } from '../utils/defaultType'
import { findAccountByAddress } from '../utils/findAccountByAddress'
import { recodeAddress, Recoded } from '../utils/recodeAddress'
import { goTo } from '../utils/routing'
import Identicon from '@polkadot/react-identicon'

type Props = BaseProps & {
  address?: string
  genesisHash?: string | null
  name?: string
  type?: KeypairType
  hideActions?: boolean
}

const defaultRecoded = {
  account: null,
  formatted: null,
  prefix: 42,
  type: DEFAULT_TYPE,
}

const Address: React.FC<Props> = ({
  address,
  children,
  className,
  genesisHash,
  name,
  type: givenType,
  hideActions,
}) => {
  const [recoded, setRecoded] = useState<Recoded>(defaultRecoded)
  const accounts = useStore(accountsStore) as AccountJson[]
  const chain = useMetadata(genesisHash || recoded.genesisHash, true)
  const iconTheme = (
    chain?.icon
      ? chain.icon
      : recoded.type === 'ethereum'
      ? 'ethereum'
      : 'polkadot'
  ) as IconTheme

  const onCopy = () => {
    navigator.clipboard.writeText(recoded.formatted || '').catch(console.error)
  }
  const forget = () => goTo(`/account/forget/${address}`)

  useEffect(() => {
    if (!address) return

    const accountByAddress = findAccountByAddress(accounts, address)
    const isEthereum =
      chain?.definition.chainType === 'ethereum' ||
      accountByAddress?.type === 'ethereum' ||
      (!accountByAddress && givenType === 'ethereum')
    const recoded = isEthereum
      ? ({
          account: accountByAddress,
          formatted: address,
          type: 'ethereum',
        } as Recoded)
      : recodeAddress(address, accounts, chain)

    recoded && setRecoded(recoded)
  }, [accounts, address, chain, givenType])

  return (
    <div className={className}>
      <Identicon
        prefix={recoded.prefix}
        theme={iconTheme}
        value={recoded.formatted || address}
      />
      <div>
        <div>{name || recoded.account?.name || '<unknown>'}</div>
        <div className='address'>
          {recoded.formatted || address || '<unknown>'}
        </div>
        {!hideActions && (
          <div className='actions'>
            <button onClick={onCopy}>{'Copy'}</button>
            <button onClick={forget}>{'Forget'}</button>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export default styled(Address)`
  width: 100%;
  background: ${({ theme }: Props) => theme.background};
  margin-bottom: 0.5rem;
  border-radius: 0.2rem;
  padding: 0.4rem;
  padding-top: 0.2rem;

  .address {
    color: ${({ theme }: Props) => theme.subTextColor};
  }

  .actions {
    margin-top: 0.4rem;
  }

  .actions * {
    margin-right: 0.4rem;
  }
`
