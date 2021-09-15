import type { AccountJson } from '@polkadot/extension-base/background/types'
import { AccountWithChildren } from '@polkadot/extension-base/background/types'
import { Chain } from '@polkadot/extension-chains/types'
import { DEFAULT_TYPE } from '@polkadot/extension-ui/util/defaultType' // TODO: Replace extension-ui
import { SettingsStruct } from '@polkadot/ui-settings/types'
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import type { KeypairType } from '@polkadot/util-crypto/types'
import { findSubstrateAccount } from './findSubstrateAccount'

export interface Recoded {
  account: AccountJson | null
  formatted: string | null
  genesisHash?: string | null
  prefix?: number
  type: KeypairType
}

/**
 * recodes an supplied address using the prefix/genesisHash, include the actual saved account & chain
 */
export function recodeAddress(
  address: string,
  accounts: AccountWithChildren[],
  chain: Chain | null,
  settings: SettingsStruct
): Recoded {
  // decode and create a shortcut for the encoded address
  const publicKey = decodeAddress(address)

  // find our account using the actual publicKey, and then find the associated chain
  const account = findSubstrateAccount(accounts, publicKey)
  const prefix = chain
    ? chain.ss58Format
    : settings.prefix === -1
    ? 42
    : settings.prefix

  // always allow the actual settings to override the display
  return {
    account,
    formatted: encodeAddress(publicKey, prefix),
    genesisHash: account?.genesisHash,
    prefix,
    type: account?.type || DEFAULT_TYPE,
  }
}
