import { Message } from '@polkadot/extension-base/types'
import { injectExtension } from '@polkadot/extension-inject'
import { enable, redirectIfPhishing } from './messaging/pageActions'
import { handleResponse } from './messaging/handleResponse'
import {
  MESSAGE_ORIGIN_CONTENT,
  PKG_NAME,
  PKG_VERSION,
} from './utils/constants'
import { isMessageAllowed } from './utils/isMessageAllowed'

window.addEventListener('message', (message: Message) => {
  if (!isMessageAllowed(message, MESSAGE_ORIGIN_CONTENT)) return
  if (!message.data.id) return console.error('Missing id for response.')

  handleResponse(message.data as any) // eslint-disable-line @typescript-eslint/no-explicit-any
})

redirectIfPhishing()
  .then((gotRedirected) => {
    if (!gotRedirected) inject()
  })
  .catch((e: Error) => {
    console.warn(
      `Unable to determine if the site is in the phishing list: ${e.message}`
    )
    inject()
  })

function inject() {
  injectExtension(enable, { name: PKG_NAME, version: PKG_VERSION })
}
