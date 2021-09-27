import { KeypairType } from '@polkadot/util-crypto/types'

export const PKG_NAME = process.env.PKG_NAME ?? ''
export const PKG_VERSION = process.env.PKG_VERSION ?? ''
export const ROOT_ID = 'root'
export const EXT_NAME = 'Parity Signer Companion'
export const UNKNOWN = '<unknown>'
export const RELAY_CHAIN = 'Relay Chain'
export const DEFAULT_TYPE = 'sr25519' as KeypairType
