import { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types'

export function isRawPayload(
  payload: SignerPayloadJSON | SignerPayloadRaw
): payload is SignerPayloadRaw {
  return !!(payload as SignerPayloadRaw).data
}

export function isJsonPayload(
  payload: SignerPayloadJSON | SignerPayloadRaw
): payload is SignerPayloadJSON {
  return !!(payload as SignerPayloadJSON).genesisHash
}
