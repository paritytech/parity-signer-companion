import { AccountJson } from '@polkadot/extension-base/background/types'
import { canDerive } from '@polkadot/extension-base/utils'
import { createDerived, createStore } from 'nanostores'
import { buildHierarchy } from '../../utils/buildHierarchy'
import { subscribeAccounts } from '../../utils/messaging'

export const accounts = createStore<AccountJson[]>(() => {
  accounts.set([])
  subscribeAccounts(setAccounts).catch(console.error)
})

export const hasAccounts = createDerived(accounts, (list) => list.length > 0)

export const hierarchy = createDerived(accounts, (list) =>
  buildHierarchy(list as AccountJson[])
)

export const masterAccount = createDerived(hierarchy, (list) =>
  list.find(({ isExternal, type }) => !isExternal && canDerive(type))
)

export const setAccounts = (list: AccountJson[]) => {
  accounts.set(list)
}
