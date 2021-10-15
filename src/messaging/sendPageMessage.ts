import {
  MessageTypes,
  MessageTypesWithNoSubscriptions,
  MessageTypesWithNullRequest,
  MessageTypesWithSubscriptions,
  RequestTypes,
  ResponseTypes,
  SubscriptionMessageTypes,
} from '@polkadot/extension-base/background/types'
import { MESSAGE_ORIGIN_PAGE } from '../utils/constants'
import { getId } from '../utils/getId'
import { handlers } from './handlers'

export function sendPageMessage<
  TMessageType extends MessageTypesWithNullRequest
>(message: TMessageType): Promise<ResponseTypes[TMessageType]>
export function sendPageMessage<
  TMessageType extends MessageTypesWithNoSubscriptions
>(
  message: TMessageType,
  request: RequestTypes[TMessageType]
): Promise<ResponseTypes[TMessageType]>
export function sendPageMessage<
  TMessageType extends MessageTypesWithSubscriptions
>(
  message: TMessageType,
  request: RequestTypes[TMessageType],
  subscriber: (data: SubscriptionMessageTypes[TMessageType]) => void
): Promise<ResponseTypes[TMessageType]>
export function sendPageMessage<TMessageType extends MessageTypes>(
  message: TMessageType,
  request?: RequestTypes[TMessageType],
  subscriber?: (data: unknown) => void
): Promise<ResponseTypes[TMessageType]> {
  return new Promise((resolve, reject) => {
    const id = getId()
    handlers[id] = { reject, resolve, subscriber }
    window.postMessage(
      {
        id,
        message,
        origin: MESSAGE_ORIGIN_PAGE,
        request: request || (null as RequestTypes[TMessageType]),
      },
      '*'
    )
  })
}
