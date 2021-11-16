import { AccountJson } from '@polkadot/extension-base/background/types'
import Identicon from '@polkadot/react-identicon'
import { IconTheme } from '@polkadot/react-identicon/types'
import { useStore } from '@nanostores/react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useMetadata from '../../hooks/useMetadata'
import { useTimedReset } from '../../hooks/useTimedReset'
import { editAccount } from '../../messaging/uiActions'
import { accountsStore } from '../../stores/accounts'
import { DEFAULT_TYPE, RELAY_CHAIN, UNKNOWN } from '../../utils/constants'
import { recodeAddress, Recoded } from '../../utils/recodeAddress'
import copyIcon from '../assets/copy.svg'
import { BaseProps } from '../types'
import AutosizeInput from './AutosizeInput'

type Props = BaseProps & {
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

const Address: React.FC<Props> = ({
  address,
  className,
  genesisHash,
  name,
}) => {
  const [justCopied, setJustCopied] = useTimedReset<boolean>(false)
  const [recoded, setRecoded] = useState<Recoded>(defaultRecoded)
  const accounts = useStore(accountsStore) as AccountJson[]
  const chain = useMetadata(genesisHash || recoded.genesisHash, true)
  const iconTheme = (chain?.icon || 'polkadot') as IconTheme
  const nameLabel = name || recoded.account?.name
  const chainLabel = ` · ${chain?.definition.chain.replace(RELAY_CHAIN, '')}`
  const hashLabel =
    (justCopied && 'Copied') || recoded.formatted || address || UNKNOWN

  const onCopy = () => {
    if (justCopied) return

    navigator.clipboard
      .writeText(hashLabel)
      .then(() => setJustCopied(true))
      .catch(console.error)
  }

  const changeName = (v: string) =>
    address && editAccount(address, v).catch(console.error)

  useEffect(() => {
    if (!address) return

    const recoded = recodeAddress(address, accounts, chain)
    recoded && setRecoded(recoded)
  }, [accounts, address, chain])

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
        <div className='name'>
          <AutosizeInput
            value={nameLabel}
            placeholder={UNKNOWN}
            onChange={changeName}
          />
          {chain && <span className='chain'>{chainLabel}</span>}
        </div>
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
  background: var(--color-card-bg);
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
    font-size: var(--font-small-size);
    color: var(--color-faded-text);
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
    transition: var(--transition);
    cursor: pointer;
  }

  .highlighted:hover {
    background: var(--color-highlight);
  }

  .highlighted.just-copied {
    background: none !important;
  }

  .chain {
    color: var(--color-faded-text);
  }

  & + & {
    margin-top: 0.2rem;
  }
`
