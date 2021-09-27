import { AccountJson } from '@polkadot/extension-base/background/types'
import { decodeAddress } from '@polkadot/util-crypto'

/**
 * find an account in our list
 */
export function findSubstrateAccount(
  accounts: AccountJson[],
  publicKey: Uint8Array
): AccountJson | null {
  const pkStr = publicKey.toString()

  return (
    accounts.find(
      ({ address }): boolean => decodeAddress(address).toString() === pkStr
    ) || null
  )
}
