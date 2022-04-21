import { MetadataRequest } from '@polkadot/extension-base/background/types'
import { atom, onStart } from 'nanostores'
import { subscribeMetadataRequests } from '../messaging/uiActions'

export const metaRequestsStore = atom<MetadataRequest[]>([])

let isSubscribed = false
onStart(metaRequestsStore, () => {
  if (isSubscribed) return
  isSubscribed = true
  subscribeMetadataRequests(metaRequestsStore.set).catch(console.error)
})
