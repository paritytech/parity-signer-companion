import { Message } from '@polkadot/extension-base/types'
import { MESSAGING_PORT } from '../utils/constants'
import { handlers } from './handlers'

// setup a listener for messages, any incoming resolves the promise
MESSAGING_PORT.onMessage.addListener((data: Message['data']) => {
  const handler = handlers[data.id]

  if (!handler)
    return console.error(`Unknown response: ${JSON.stringify(data)}`)

  if (!handler.subscriber) delete handlers[data.id]

  if (data.subscription) {
    handler.subscriber && handler.subscriber(data.subscription)
  } else if (data.error) {
    handler.reject(new Error(data.error))
  } else {
    handler.resolve(data.response)
  }
})
