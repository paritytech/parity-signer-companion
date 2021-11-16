import { AccountJson } from '@polkadot/extension-base/background/types'
import { action, atom, computed, onStart } from 'nanostores'
import { subscribeAccounts } from '../messaging/uiActions'
import { buildHierarchy } from '../utils/buildHierarchy'

export const accounts = atom<AccountJson[]>([])

onStart(accounts, () => {
  subscribeAccounts(setAccounts).catch(console.error)
})

export const accountNamesByAddress = computed(accounts, (list) =>
  list.reduce((res, account) => {
    res[account.address] = account.name
    return res
  }, {} as Record<string, string | undefined>)
)

const setAccounts = action(
  accounts,
  'set_accounts',
  (store, list: AccountJson[]) => {
    store.set(buildHierarchy(list))
  }
)
