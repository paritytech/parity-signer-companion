import {
  AccountJson,
  AllowedPath,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { sendMessage } from './sendMessage'

export function forgetAccount(address: string): Promise<boolean> {
  return sendMessage('pri(accounts.forget)', { address })
}

export function approveAuthRequest(id: string): Promise<boolean> {
  return sendMessage('pri(authorize.approve)', { id })
}

export function approveMetaRequest(id: string): Promise<boolean> {
  return sendMessage('pri(metadata.approve)', { id })
}

export function cancelSignRequest(id: string): Promise<boolean> {
  return sendMessage('pri(signing.cancel)', { id })
}

export function approveSignSignature(
  id: string,
  signature: string
): Promise<boolean> {
  return sendMessage('pri(signing.approve.signature)', { id, signature })
}

export function createAccountExternal(
  name: string,
  address: string,
  genesisHash: string
): Promise<boolean> {
  return sendMessage('pri(accounts.create.external)', {
    address,
    genesisHash,
    name,
  })
}

export function rejectAuthRequest(id: string): Promise<boolean> {
  return sendMessage('pri(authorize.reject)', { id })
}

export function rejectMetaRequest(id: string): Promise<boolean> {
  return sendMessage('pri(metadata.reject)', { id })
}

export function subscribeAccounts(
  cb: (accounts: AccountJson[]) => void
): Promise<boolean> {
  return sendMessage('pri(accounts.subscribe)', null, cb)
}

export function subscribeAuthorizeRequests(
  cb: (accounts: AuthorizeRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(authorize.requests)', null, cb)
}

export function subscribeMetadataRequests(
  cb: (accounts: MetadataRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(metadata.requests)', null, cb)
}

export function subscribeSigningRequests(
  cb: (accounts: SigningRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(signing.requests)', null, cb)
}

export function windowOpen(path: AllowedPath): Promise<boolean> {
  return sendMessage('pri(window.open)', path)
}

export function getMeta(genesisHash: string | null) {
  return sendMessage('pri(metadata.get)', genesisHash)
}
