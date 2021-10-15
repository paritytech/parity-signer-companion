import {
  MessageTypes,
  MessageTypesWithNoSubscriptions,
  MessageTypesWithNullRequest,
  MessageTypesWithSubscriptions,
  RequestTypes,
  ResponseTypes,
  SubscriptionMessageTypes,
} from '@polkadot/extension-base/background/types'
import { getId } from '../utils/getId'
import { Handler, handlers } from './handlers'
import { messagingPort } from './messagingPort'

export function sendUIMessage<TMessageType extends MessageTypesWithNullRequest>(
  message: TMessageType
): Promise<ResponseTypes[TMessageType]>
export function sendUIMessage<
  TMessageType extends MessageTypesWithNoSubscriptions
>(
  message: TMessageType,
  request: RequestTypes[TMessageType]
): Promise<ResponseTypes[TMessageType]>
export function sendUIMessage<
  TMessageType extends MessageTypesWithSubscriptions
>(
  message: TMessageType,
  request: RequestTypes[TMessageType],
  subscriber: (data: SubscriptionMessageTypes[TMessageType]) => void
): Promise<ResponseTypes[TMessageType]>
export function sendUIMessage<TMessageType extends MessageTypes>(
  message: TMessageType,
  request?: RequestTypes[TMessageType],
  subscriber?: (data: unknown) => void
): Promise<ResponseTypes[TMessageType]> {
  return new Promise((resolve, reject) => {
    const id = getId()
    handlers[id] = {
      reject,
      subscriber,
      resolve: resolve as Handler['resolve'],
    }
    messagingPort.postMessage({ id, message, request: request || {} })
  })
}
