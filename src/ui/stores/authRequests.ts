import { AuthorizeRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'
import { subscribeAuthorizeRequests } from '../utils/messaging'

export const authRequests = createStore<AuthorizeRequest[]>(() => {
  authRequests.set([])
  subscribeAuthorizeRequests(setAuthRequests).catch(console.error)
})

export const setAuthRequests = (list: AuthorizeRequest[]) => {
  authRequests.set(list)
}
