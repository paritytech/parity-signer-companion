import { AccountJson } from '@polkadot/extension-base/background/types'
import { CHAINS_MAP } from './constants'

export function orderAccounts(accounts: AccountJson[]): AccountJson[] {
  return accounts.sort(
    (a, b) => byChain(a, b) || byName(a, b) || byCreation(a, b)
  )
}

function byChain(a: AccountJson, b: AccountJson): number {
  return getChain(a?.genesisHash).localeCompare(getChain(b?.genesisHash))
}

function byName(a: AccountJson, b: AccountJson): number {
  return normalize(a.name).localeCompare(normalize(b.name))
}

function byCreation(a: AccountJson, b: AccountJson): number {
  return (a.whenCreated || Infinity) - (b.whenCreated || Infinity)
}

function normalize(str?: string) {
  return str?.toUpperCase() || ''
}

function getChain(str?: string | null) {
  return CHAINS_MAP.get(str || '') || ''
}
