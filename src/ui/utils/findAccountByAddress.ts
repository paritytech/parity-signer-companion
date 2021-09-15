import { AccountJson } from '@polkadot/extension-base/background/types'

/**
 * find an account in our list
 */
export function findAccountByAddress(
  accounts: AccountJson[],
  _address: string
): AccountJson | null {
  return accounts.find(({ address }): boolean => address === _address) || null
}
