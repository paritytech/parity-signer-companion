import { AccountJson } from '@polkadot/extension-base/background/types'
import { chainsMap } from './chains'

export function buildHierarchy(accounts: AccountJson[]): AccountJson[] {
  return accounts.sort(compare)
}

function compare(a: AccountJson, b: AccountJson): number {
  return (
    compareByNetwork(a, b) ||
    compareByName(a, b) ||
    compareByPath(a, b) ||
    compareByCreation(a, b)
  )
}

function compareByNetwork(a: AccountJson, b: AccountJson): number {
  return getChain(a?.genesisHash).localeCompare(getChain(b?.genesisHash))
}

function compareByName(a: AccountJson, b: AccountJson): number {
  return normalize(a.name).localeCompare(normalize(b.name))
}

function compareByPath(a: AccountJson, b: AccountJson): number {
  return normalize(a.suri).localeCompare(normalize(b.suri))
}

function compareByCreation(a: AccountJson, b: AccountJson): number {
  return (a.whenCreated || Infinity) - (b.whenCreated || Infinity)
}

function normalize(str?: string) {
  return str?.toUpperCase() || ''
}

function getChain(str?: string | null) {
  return chainsMap.get(str || '') || ''
}
