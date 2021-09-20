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
import cancelIcon from '../assets/cancel.svg'
import copyIcon from '../assets/copy.svg'
import { useTimedReset } from '../hooks/useTimedReset'
import { Chain } from '@polkadot/extension-chains/types'

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
  className,
  genesisHash,
  name,
  type: givenType,
  hideActions,
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
      {!hideActions && (
        <div className='icon cancel highlighted' onClick={forget}>
          <img src={cancelIcon} />
        </div>
      )}
    </div>
  )
}

export default styled(Address)`
  display: flex;
  position: relative;
  background: ${({ theme }: Props) => theme.cardBgColor};
  border-radius: 0.2rem;

  .logo {
    padding: 0.5rem;
  }

  .logo svg {
    cursor: default;
  }

  .content {
    padding: 0.5rem 0;
    padding-right: 1rem;
  }

  .name {
    margin-bottom: 0.2rem;
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

  .cancel {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
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

  & + & {
    margin-top: 0.2rem;
  }
`
