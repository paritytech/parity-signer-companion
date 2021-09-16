import { AuthorizeRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'
import { subscribeAuthorizeRequests } from '../utils/messaging'

/**
 * [
 *   {
 *     id: '1631792669113.1',
 *     request: { origin: 'polkadot-js/apps' },
 *     url: 'https://polkadot.js.org/apps/#/explorer',
 *   },
 * ]
 */
export const authRequests = createStore<AuthorizeRequest[]>(() => {
  authRequests.set([])
  subscribeAuthorizeRequests(setAuthRequests).catch(console.error)
})

export const setAuthRequests = (list: AuthorizeRequest[]) => {
  authRequests.set(list)
}
