import {
  AccountJson,
  AllowedPath,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { HexString } from '@polkadot/util/types'
import { sendUIMessage } from './sendUIMessage'

export function editAccount(address: string, name: string): Promise<boolean> {
  return sendUIMessage('pri(accounts.edit)', { address, name })
}

export function forgetAccount(address: string): Promise<boolean> {
  return sendUIMessage('pri(accounts.forget)', { address })
}

export function approveAuthRequest(
  id: string,
  authorizedAccounts: string[]
): Promise<boolean> {
  return sendUIMessage('pri(authorize.approve)', { id, authorizedAccounts })
}

export function approveMetaRequest(id: string): Promise<boolean> {
  return sendUIMessage('pri(metadata.approve)', { id })
}

export function cancelSignRequest(id: string): Promise<boolean> {
  return sendUIMessage('pri(signing.cancel)', { id })
}

export function approveSignSignature(
  id: string,
  signature: HexString
): Promise<boolean> {
  return sendUIMessage('pri(signing.approve.signature)', { id, signature })
}

export function createAccountExternal(
  name: string,
  address: string,
  genesisHash: string
): Promise<boolean> {
  return sendUIMessage('pri(accounts.create.external)', {
    address,
    genesisHash,
    name,
  })
}

export function deleteAuthRequest(id: string): Promise<void> {
  return sendUIMessage('pri(authorize.delete.request)', id)
}

export function rejectMetaRequest(id: string): Promise<boolean> {
  return sendUIMessage('pri(metadata.reject)', { id })
}

export function subscribeAccounts(
  cb: (accounts: AccountJson[]) => void
): Promise<boolean> {
  return sendUIMessage('pri(accounts.subscribe)', null, cb)
}

export function subscribeAuthorizeRequests(
  cb: (accounts: AuthorizeRequest[]) => void
): Promise<boolean> {
  return sendUIMessage('pri(authorize.requests)', null, cb)
}

export function subscribeMetadataRequests(
  cb: (accounts: MetadataRequest[]) => void
): Promise<boolean> {
  return sendUIMessage('pri(metadata.requests)', null, cb)
}

export function subscribeSigningRequests(
  cb: (accounts: SigningRequest[]) => void
): Promise<boolean> {
  return sendUIMessage('pri(signing.requests)', null, cb)
}

export function windowOpen(path: AllowedPath): Promise<boolean> {
  return sendUIMessage('pri(window.open)', path)
}

export function getMeta(genesisHash: string | null) {
  return sendUIMessage('pri(metadata.get)', genesisHash)
}
