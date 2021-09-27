import { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types'

export const isRawPayload = (
  payload: SignerPayloadJSON | SignerPayloadRaw
): payload is SignerPayloadRaw => !!(payload as SignerPayloadRaw).data
