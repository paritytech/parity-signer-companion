import { Chain } from '@polkadot/extension-chains/types'
import { getMetadata } from '../utils/getMetadata'
import { useEffect, useState } from 'react'

export function useMetadata(
  genesisHash?: string | null,
  isPartial?: boolean
): Chain | null {
  const [chain, setChain] = useState<Chain | null>(null)

  useEffect(() => {
    if (genesisHash) {
      getMetadata(genesisHash, isPartial)
        .then(setChain)
        .catch((error) => {
          console.error(error)
          setChain(null)
        })
    } else {
      setChain(null)
    }
  }, [genesisHash, isPartial])

  return chain
}
