import { AccountJson } from '@polkadot/extension-base/background/types'
import Identicon from '@polkadot/react-identicon'
import { IconTheme } from '@polkadot/react-identicon/types'
import { KeypairType } from '@polkadot/util-crypto/types'
import { useStore } from 'nanostores/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import copyIcon from '../assets/copy.svg'
import useMetadata from '../hooks/useMetadata'
import { useTimedReset } from '../hooks/useTimedReset'
import { accounts as accountsStore } from '../stores/accounts'
import { BaseProps } from '../types'
import { DEFAULT_TYPE } from '../utils/defaultType'
import { findAccountByAddress } from '../utils/findAccountByAddress'
import { recodeAddress, Recoded } from '../utils/recodeAddress'

type Props = BaseProps & {
  address?: string
  genesisHash?: string | null
  name?: string
  type?: KeypairType
}

const defaultRecoded = {
  account: null,
  formatted: null,
  prefix: 42,
  type: DEFAULT_TYPE,
}

const Address: React.FC<Props> = ({
  address,
  className,
  genesisHash,
  name,
  type: givenType,
}) => {
  const [justCopied, setJustCopied] = useTimedReset<boolean>(false)
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
  const nameLabel = name || recoded.account?.name || '<unknown>'
  const hashLabel =
    (justCopied && 'Copied') || recoded.formatted || address || '<unknown>'

  const onCopy = () => {
    if (justCopied) return

    navigator.clipboard
      .writeText(hashLabel)
      .then(() => setJustCopied(true))
      .catch(console.error)
  }

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
      <div className='logo'>
        <Identicon
          prefix={recoded.prefix}
          theme={iconTheme}
          value={recoded.formatted || address}
          size={50}
        />
      </div>
      <div className='content'>
        <div className='name'>{nameLabel}</div>
        <div
          className={`address highlighted ${justCopied && 'just-copied'}`}
          onClick={onCopy}
        >
          <div className='icon copy'>
            <img src={copyIcon} />
          </div>
          <div className='hash'>{hashLabel}</div>
        </div>
      </div>
    </div>
  )
}

export default styled(Address)`
  display: flex;
  position: relative;
  height: 3rem;
  background: ${({ theme }: Props) => theme.cardBgColor};
  border-radius: 0.2rem;

  .logo {
    padding: 0.25rem;
    padding-right: 0rem;
  }

  .logo svg {
    cursor: default;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0.5rem;
  }

  .name {
    margin-top: -0.1rem;
    margin-bottom: 0.1rem;
  }

  .address {
    display: flex;
    align-items: center;
    font-size: ${({ theme }: Props) => theme.smallFontSize};
    color: ${({ theme }: Props) => theme.fadedTextColor};
  }

  .hash {
    padding: 0 0.2rem;
  }

  .icon {
    width: 1rem;
    height: 1rem;
  }

  .highlighted {
    border-radius: 0.2rem;
    transition: ${({ theme }: Props) => theme.transition};
    cursor: pointer;
  }

  .highlighted:hover {
    background: ${({ theme }: Props) => theme.hightlight};
  }

  .highlighted.just-copied {
    background: none;
  }
`
