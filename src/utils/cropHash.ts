const HEX_PREFIX = '0x'
const ELIPSIS = '...'
const SLICE_LENGTH = 8

export const cropHash = (hash: string) => {
  const isHex = hash.startsWith(HEX_PREFIX)
  const PREFIX_LENGTH = isHex ? HEX_PREFIX.length : 0

  return (
    hash.substring(0, PREFIX_LENGTH + SLICE_LENGTH) +
    ELIPSIS +
    hash.substring(hash.length - SLICE_LENGTH, hash.length)
  )
}
