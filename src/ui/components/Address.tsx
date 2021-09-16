import { AccountContext, SettingsContext } from '../contexts'
import useMetadata from '../hooks/useMetadata'
import { DEFAULT_TYPE } from '../utils/defaultType'
import type { KeypairType } from '@polkadot/util-crypto/types'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import type { ExtThemeProps, ThemeProps } from '../types'
import { findAccountByAddress } from '../utils/findAccountByAddress'
import { goTo } from '../utils/routing'
import { recodeAddress, Recoded } from '../utils/recodeAddress'

type Props = ExtThemeProps & {
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
  children,
  className,
  genesisHash,
  name,
  type: givenType,
}) => {
  const [{ account, formatted, genesisHash: recodedGenesis }, setRecoded] =
    useState<Recoded>(defaultRecoded)
  const { accounts } = useContext(AccountContext)
  const settings = useContext(SettingsContext)
  const chain = useMetadata(genesisHash || recodedGenesis, true)

  const onCopy = () => {
    navigator.clipboard.writeText(formatted || '').catch(console.error)
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
      : recodeAddress(address, accounts, chain, settings)

    recoded && setRecoded(recoded)
  }, [accounts, address, chain, givenType, settings])

  return (
    <div className={className}>
      <div className='infoRow'>
        <div className='name' data-field='name'>
          <span title={name || account?.name || '<unknown>'}>
            {name || account?.name || '<unknown>'}
          </span>
        </div>
        {chain?.genesisHash && (
          <div
            className='banner chain'
            data-field='chain'
            style={
              chain.definition.color
                ? { backgroundColor: chain.definition.color }
                : undefined
            }
          >
            {chain.name.replace(' Relay Chain', '')}
          </div>
        )}
        <div className='addressDisplay'>
          {formatted || address || '<unknown>'}
        </div>
        <div className='actions'>
          <button onClick={onCopy}>{'Copy address'}</button>
          <button onClick={forget}>{'Forget Account'}</button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default styled(Address)`
  background: ${({ theme }: ThemeProps) => theme.accountBackground};
  border: 1px solid ${({ theme }: ThemeProps) => theme.boxBorderColor};
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 8px;
  position: relative;

  .banner {
    font-size: 12px;
    line-height: 16px;
    position: absolute;
    top: 0;

    &.chain {
      background: ${({ theme }: ThemeProps) => theme.primaryColor};
      border-radius: 0 0 0 10px;
      color: white;
      padding: 0.1rem 0.5rem 0.1rem 0.75rem;
      right: 0;
      z-index: 1;
    }
  }

  .addressDisplay {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .infoRow {
    height: 72px;
    border-radius: 4px;
  }

  .name {
    font-size: 16px;
    line-height: 22px;
    margin: 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 300px;
    white-space: nowrap;
  }
`
