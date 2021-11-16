import { MetadataRequest } from '@polkadot/extension-base/background/types'
import { atom, onStart } from 'nanostores'
import { subscribeMetadataRequests } from '../messaging/uiActions'

export const metaRequests = atom<MetadataRequest[]>([])

onStart(metaRequests, () => {
  subscribeMetadataRequests(metaRequests.set).catch(console.error)
})
