import { AccountJson } from '@polkadot/extension-base/background/types'
import { createDerived, createStore } from 'nanostores'
import { buildHierarchy } from '../utils/buildHierarchy'
import { subscribeAccounts } from '../messaging/uiActions'

export const accounts = createStore<AccountJson[]>(() => {
  accounts.set([])
  subscribeAccounts(setAccounts).catch(console.error)
})

export const accountNamesByAddress = createDerived(accounts, (list) =>
  list.reduce((res, account) => {
    res[account.address] = account.name
    return res
  }, {} as Record<string, string | undefined>)
)

const setAccounts = (list: AccountJson[]) => {
  accounts.set(buildHierarchy(list))
}
