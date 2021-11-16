import { MetadataRequest } from '@polkadot/extension-base/background/types'
import { atom, onStart } from 'nanostores'
import { subscribeMetadataRequests } from '../messaging/uiActions'

export const metaRequestsStore = atom<MetadataRequest[]>([])

onStart(metaRequestsStore, () => {
  subscribeMetadataRequests(metaRequestsStore.set).catch(console.error)
})
