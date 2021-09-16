import type { SigningRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'
import { subscribeSigningRequests } from '../utils/messaging'

export const signRequests = createStore<SigningRequest[]>(() => {
  signRequests.set([])
  subscribeSigningRequests(setSignRequests).catch(console.error)
})

export const setSignRequests = (list: SigningRequest[]) => {
  signRequests.set(list)
}
