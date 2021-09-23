import { Message } from '@polkadot/extension-base/types'

/**
 * Only allow messages from our window
 */
export const isMessageAllowed = (message: Message, origin: string) =>
  message.source === window && message.data.origin === origin
