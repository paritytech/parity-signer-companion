import { ExtrinsicPayload } from '@polkadot/types/interfaces'
import { isRawPayload } from '../../utils/guards'
import { registry } from '../../utils/registry'
import { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types'

export const getExtrinsicPayload = (
  payload: SignerPayloadJSON | SignerPayloadRaw
): ExtrinsicPayload | undefined => {
  if (isRawPayload(payload)) return

  registry.setSignedExtensions(payload.signedExtensions)

  return registry.createType('ExtrinsicPayload', payload, {
    version: payload.version,
  })
}
