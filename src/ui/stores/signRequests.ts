import type { SigningRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'

export const signRequests = createStore<SigningRequest[]>()

export const setSignRequests = (list: SigningRequest[]) => {
  signRequests.set(list)
}
