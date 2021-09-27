import { TypeRegistry } from '@polkadot/types'

// keep it global, we can and will re-use this across requests
export const registry = new TypeRegistry()
