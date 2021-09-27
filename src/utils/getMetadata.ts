import { metadataExpand } from '@polkadot/extension-chains'
import { Chain } from '@polkadot/extension-chains/types'
import { CHAINS } from './constants'
import { getSavedMeta } from './metadataCache'

const DEFAULT_META_PARAMS = {
  specVersion: 0,
  tokenDecimals: 15,
  tokenSymbol: 'Unit',
  types: {},
}

export async function getMetadata(
  genesisHash?: string | null,
  isPartial = false
): Promise<Chain | null> {
  if (!genesisHash) return null

  const def = await getSavedMeta(genesisHash)
  if (def) return metadataExpand(def, isPartial)

  if (!isPartial) return null

  const chain = CHAINS.find((chain) => chain.genesisHash === genesisHash)
  if (!chain) return null

  return metadataExpand({ ...chain, ...DEFAULT_META_PARAMS }, isPartial)
}
