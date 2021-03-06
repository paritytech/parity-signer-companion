import { AuthorizeRequest } from '@polkadot/extension-base/background/types'
import { atom, onStart } from 'nanostores'
import { subscribeAuthorizeRequests } from '../messaging/uiActions'

// [
//   {
//     id: '1631792669113.1',
//     request: { origin: 'polkadot-js/apps' },
//     url: 'https://polkadot.js.org/apps/#/explorer',
//   },
// ]
export const authRequestsStore = atom<AuthorizeRequest[]>([])

let isSubscribed = false
onStart(authRequestsStore, () => {
  if (isSubscribed) return
  isSubscribed = true
  subscribeAuthorizeRequests(authRequestsStore.set).catch(console.error)
})
