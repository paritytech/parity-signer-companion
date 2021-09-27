import {
  AccountJson,
  AllowedPath,
  AuthorizeRequest,
  MessageTypes,
  MessageTypesWithNoSubscriptions,
  MessageTypesWithNullRequest,
  MessageTypesWithSubscriptions,
  MetadataRequest,
  RequestTypes,
  ResponseTypes,
  SigningRequest,
  SubscriptionMessageTypes,
} from '@polkadot/extension-base/background/types'
import { PORT_EXTENSION } from '@polkadot/extension-base/defaults'
import { Message } from '@polkadot/extension-base/types'
import { metadataExpand } from '@polkadot/extension-chains'
import { Chain } from '@polkadot/extension-chains/types'
import chrome from '@polkadot/extension-inject/chrome'
import { CHAINS } from './constants'
import { getSavedMeta, setSavedMeta } from './metadataCache'

export type Handler = {
  resolve: (data: Message['data']['response']) => void
  reject: (error: Error) => void
  subscriber?: (data: Message['data']['subscription']) => void
}

export type Handlers = Record<string, Handler>

const port = chrome.runtime.connect({ name: PORT_EXTENSION })
const handlers: Handlers = {}
let idCounter = 0

// setup a listener for messages, any incoming resolves the promise
port.onMessage.addListener((data: Message['data']) => {
  const handler = handlers[data.id]

  if (!handler) {
    console.error(`Unknown response: ${JSON.stringify(data)}`)

    return
  }

  if (!handler.subscriber) {
    delete handlers[data.id]
  }

  if (data.subscription) {
    handler.subscriber && handler.subscriber(data.subscription)
  } else if (data.error) {
    handler.reject(new Error(data.error))
  } else {
    handler.resolve(data.response)
  }
})

function sendMessage<TMessageType extends MessageTypesWithNullRequest>(
  message: TMessageType
): Promise<ResponseTypes[TMessageType]>
function sendMessage<TMessageType extends MessageTypesWithNoSubscriptions>(
  message: TMessageType,
  request: RequestTypes[TMessageType]
): Promise<ResponseTypes[TMessageType]>
function sendMessage<TMessageType extends MessageTypesWithSubscriptions>(
  message: TMessageType,
  request: RequestTypes[TMessageType],
  subscriber: (data: SubscriptionMessageTypes[TMessageType]) => void
): Promise<ResponseTypes[TMessageType]>
function sendMessage<TMessageType extends MessageTypes>(
  message: TMessageType,
  request?: RequestTypes[TMessageType],
  subscriber?: (data: unknown) => void
): Promise<ResponseTypes[TMessageType]> {
  return new Promise((resolve, reject) => {
    const id = `${Date.now()}.${++idCounter}`
    handlers[id] = {
      reject,
      subscriber,
      resolve: resolve as Handler['resolve'],
    }
    port.postMessage({ id, message, request: request || {} })
  })
}

export async function forgetAccount(address: string): Promise<boolean> {
  return sendMessage('pri(accounts.forget)', { address })
}

export async function approveAuthRequest(id: string): Promise<boolean> {
  return sendMessage('pri(authorize.approve)', { id })
}

export async function approveMetaRequest(id: string): Promise<boolean> {
  return sendMessage('pri(metadata.approve)', { id })
}

export async function cancelSignRequest(id: string): Promise<boolean> {
  return sendMessage('pri(signing.cancel)', { id })
}

export async function approveSignSignature(
  id: string,
  signature: string
): Promise<boolean> {
  return sendMessage('pri(signing.approve.signature)', { id, signature })
}

export async function createAccountExternal(
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

export async function getMetadata(
  genesisHash?: string | null,
  isPartial = false
): Promise<Chain | null> {
  if (!genesisHash) {
    return null
  }

  let request = getSavedMeta(genesisHash)

  if (!request) {
    request = sendMessage('pri(metadata.get)', genesisHash || null)
    setSavedMeta(genesisHash, request)
  }

  const def = await request

  if (def) {
    return metadataExpand(def, isPartial)
  } else if (isPartial) {
    const chain = CHAINS.find((chain) => chain.genesisHash === genesisHash)

    if (chain) {
      return metadataExpand(
        {
          ...chain,
          specVersion: 0,
          tokenDecimals: 15,
          tokenSymbol: 'Unit',
          types: {},
        },
        isPartial
      )
    }
  }

  return null
}

export async function rejectAuthRequest(id: string): Promise<boolean> {
  return sendMessage('pri(authorize.reject)', { id })
}

export async function rejectMetaRequest(id: string): Promise<boolean> {
  return sendMessage('pri(metadata.reject)', { id })
}

export async function subscribeAccounts(
  cb: (accounts: AccountJson[]) => void
): Promise<boolean> {
  return sendMessage('pri(accounts.subscribe)', null, cb)
}

export async function subscribeAuthorizeRequests(
  cb: (accounts: AuthorizeRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(authorize.requests)', null, cb)
}

export async function subscribeMetadataRequests(
  cb: (accounts: MetadataRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(metadata.requests)', null, cb)
}

export async function subscribeSigningRequests(
  cb: (accounts: SigningRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(signing.requests)', null, cb)
}

export async function windowOpen(path: AllowedPath): Promise<boolean> {
  return sendMessage('pri(window.open)', path)
}
