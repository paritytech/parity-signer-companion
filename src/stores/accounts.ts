import { AccountJson } from '@polkadot/extension-base/background/types'
import { createDerived, createStore } from 'nanostores'
import { buildHierarchy } from '../utils/buildHierarchy'
import { subscribeAccounts } from '../messaging/actions'

export const accounts = createStore<AccountJson[]>(() => {
  accounts.set([])
  subscribeAccounts(setAccounts).catch(console.error)
})

export const hasAccounts = createDerived(accounts, (list) => list.length > 0)

export const setAccounts = (list: AccountJson[]) => {
  accounts.set(buildHierarchy(list))
}
