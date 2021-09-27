import { Chain } from '@polkadot/extension-chains/types'
import { getMetadata } from '../../utils/messaging'
import { useEffect, useState } from 'react'

export default function useMetadata(
  genesisHash?: string | null,
  isPartial?: boolean
): Chain | null {
  const [chain, setChain] = useState<Chain | null>(null)

  useEffect((): void => {
    if (genesisHash) {
      getMetadata(genesisHash, isPartial)
        .then(setChain)
        .catch((error): void => {
          console.error(error)
          setChain(null)
        })
    } else {
      setChain(null)
    }
  }, [genesisHash, isPartial])

  return chain
}
