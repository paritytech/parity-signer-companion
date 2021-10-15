import { MetadataDef } from '@polkadot/extension-inject/types'
import { getMeta } from '../messaging/uiActions'

type MetadataDefRequest = Promise<MetadataDef | null>

const metadataGets = new Map<string, MetadataDefRequest>()

export function getSavedMeta(genesisHash: string): MetadataDefRequest {
  let res = metadataGets.get(genesisHash)
  if (!res) {
    res = getMeta(genesisHash)
    metadataGets.set(genesisHash, res)
  }

  return res
}
