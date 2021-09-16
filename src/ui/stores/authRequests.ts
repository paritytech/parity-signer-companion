import type { AuthorizeRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'

export const authRequests = createStore<AuthorizeRequest[]>(() => {
  authRequests.set([])
})

export const setAuthRequests = (list: AuthorizeRequest[]) => {
  authRequests.set(list)
}
