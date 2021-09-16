import type { MetadataRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'

export const metaRequests = createStore<MetadataRequest[]>(() => {
  metaRequests.set([])
})

export const setMetaRequests = (list: MetadataRequest[]) => {
  metaRequests.set(list)
}
