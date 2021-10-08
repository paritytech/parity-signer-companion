import { MetadataDefBase } from '@polkadot/extension-inject/types'
import { selectableNetworks } from '@polkadot/networks'
import { TypeRegistry } from '@polkadot/types'
import uiSettings from '@polkadot/ui-settings'
import { KeypairType } from '@polkadot/util-crypto/types'

export const PKG_NAME = process.env.PKG_NAME ?? ''
export const PKG_VERSION = process.env.PKG_VERSION ?? ''
export const ROOT_ID = 'root'
export const EXT_NAME = 'Parity Signer Companion'
export const UNKNOWN = 'Unknown'
export const RELAY_CHAIN = 'Relay Chain'
export const DEFAULT_TYPE = 'sr25519' as KeypairType

export const START_SETTINGS = uiSettings.get()

export const CHAINS: MetadataDefBase[] = selectableNetworks
  .filter(({ genesisHash }) => !!genesisHash.length)
  .map((network) => ({
    chain: network.displayName,
    genesisHash: network.genesisHash[0],
    icon: network.icon,
    ss58Format: network.prefix,
  }))

export const CHAINS_MAP = CHAINS.reduce(
  (map, chain) => map.set(chain.genesisHash, chain.chain),
  new Map<string, string>()
)

export const REGISTRY = new TypeRegistry()
