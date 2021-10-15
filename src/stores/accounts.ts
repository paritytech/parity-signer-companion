import { AccountJson } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'
import { buildHierarchy } from '../utils/buildHierarchy'
import { subscribeAccounts } from '../messaging/uiActions'

export const accounts = createStore<AccountJson[]>(() => {
  accounts.set([])
  subscribeAccounts(setAccounts).catch(console.error)
})

const setAccounts = (list: AccountJson[]) => {
  accounts.set(buildHierarchy(list))
}
