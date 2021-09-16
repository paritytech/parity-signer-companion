import type { MetadataRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'

export const metaRequests = createStore<MetadataRequest[]>()

export const setMetaRequests = (list: MetadataRequest[]) => {
  metaRequests.set(list)
}
