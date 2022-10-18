import { AccountJson } from '@polkadot/extension-base/background/types'
import { atom, computed, onStart } from 'nanostores'
import { subscribeAccounts } from '../messaging/uiActions'
import { orderAccounts } from '../utils/orderAccounts'

export const accountsStore = atom<AccountJson[]>([])

let isSubscribed = false
onStart(accountsStore, () => {
  if (isSubscribed) return
  isSubscribed = true
  subscribeAccounts(accountsStore.set).catch(console.error)
})

export const accountNamesByAddressStore = computed(accountsStore, (list) =>
  list.reduce((res, account) => {
    res[account.address] = account.name
    return res
  }, {} as Record<string, string | undefined>)
)
export const orderedAccountsStore = computed(accountsStore, orderAccounts)
export const addressesStore = computed(accountsStore, (accounts) =>
  accounts.map((a) => a.address)
)
