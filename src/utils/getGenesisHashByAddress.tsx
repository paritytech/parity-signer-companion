import { AccountJson } from '@polkadot/extension-base/background/types'
import { decodeAddress } from '@polkadot/util-crypto'

export const getGenesisHashByAddress = (
  accounts: readonly AccountJson[],
  address: string
) =>
  accounts.find(
    (a) =>
      decodeAddress(a.address).toString() === decodeAddress(address).toString()
  )?.genesisHash
