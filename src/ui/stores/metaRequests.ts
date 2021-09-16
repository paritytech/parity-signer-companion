import { MetadataRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'
import { subscribeMetadataRequests } from '../utils/messaging'

export const metaRequests = createStore<MetadataRequest[]>(() => {
  metaRequests.set([])
  subscribeMetadataRequests(setMetaRequests).catch(console.error)
})

export const setMetaRequests = (list: MetadataRequest[]) => {
  metaRequests.set(list)
}
