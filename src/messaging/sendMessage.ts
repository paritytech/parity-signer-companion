import {
  MessageTypes,
  MessageTypesWithNoSubscriptions,
  MessageTypesWithNullRequest,
  MessageTypesWithSubscriptions,
  RequestTypes,
  ResponseTypes,
  SubscriptionMessageTypes,
} from '@polkadot/extension-base/background/types'
import { MESSAGING_PORT } from '../utils/constants'
import { Handler, handlers } from './handlers'

let idCounter = 0

export function sendMessage<TMessageType extends MessageTypesWithNullRequest>(
  message: TMessageType
): Promise<ResponseTypes[TMessageType]>
export function sendMessage<
  TMessageType extends MessageTypesWithNoSubscriptions
>(
  message: TMessageType,
  request: RequestTypes[TMessageType]
): Promise<ResponseTypes[TMessageType]>
export function sendMessage<TMessageType extends MessageTypesWithSubscriptions>(
  message: TMessageType,
  request: RequestTypes[TMessageType],
  subscriber: (data: SubscriptionMessageTypes[TMessageType]) => void
): Promise<ResponseTypes[TMessageType]>
export function sendMessage<TMessageType extends MessageTypes>(
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
    MESSAGING_PORT.postMessage({ id, message, request: request || {} })
  })
}