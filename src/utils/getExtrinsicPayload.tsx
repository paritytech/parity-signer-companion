import { ExtrinsicPayload } from '@polkadot/types/interfaces'
import { isRawPayload } from './guards'
import { REGISTRY } from './constants'
import { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types'

export const getExtrinsicPayload = (
  payload: SignerPayloadJSON | SignerPayloadRaw
): ExtrinsicPayload | undefined => {
  if (isRawPayload(payload)) return

  REGISTRY.setSignedExtensions(payload.signedExtensions)

  return REGISTRY.createType('ExtrinsicPayload', payload, {
    version: payload.version,
  })
}
