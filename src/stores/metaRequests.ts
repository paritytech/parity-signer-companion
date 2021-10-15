import { MetadataRequest } from '@polkadot/extension-base/background/types'
import { createStore } from 'nanostores'
import { subscribeMetadataRequests } from '../messaging/uiActions'

export const metaRequests = createStore<MetadataRequest[]>(() => {
  metaRequests.set([])
  subscribeMetadataRequests(metaRequests.set).catch(console.error)
})
