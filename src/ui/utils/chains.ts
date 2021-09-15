import { MetadataDefBase } from '@polkadot/extension-inject/types'
import { selectableNetworks } from '@polkadot/networks'

export const chains: MetadataDefBase[] = selectableNetworks
  .filter(({ genesisHash }) => !!genesisHash.length)
  .map((network) => ({
    chain: network.displayName,
    genesisHash: network.genesisHash[0],
    icon: network.icon,
    ss58Format: network.prefix,
  }))