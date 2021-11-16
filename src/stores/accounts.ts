import { AccountJson } from '@polkadot/extension-base/background/types'
import { action, atom, computed, onStart } from 'nanostores'
import { subscribeAccounts } from '../messaging/uiActions'
import { buildHierarchy } from '../utils/buildHierarchy'

export const accountsStore = atom<AccountJson[]>([])

onStart(accountsStore, () => {
  subscribeAccounts(setAccounts).catch(console.error)
})

export const accountNamesByAddressStore = computed(accountsStore, (list) =>
  list.reduce((res, account) => {
    res[account.address] = account.name
    return res
  }, {} as Record<string, string | undefined>)
)

const setAccounts = action(
  accountsStore,
  'set_accounts',
  (store, list: AccountJson[]) => {
    store.set(buildHierarchy(list))
  }
)
