import { Message } from '@polkadot/extension-base/types'
import chrome from '@polkadot/extension-inject/chrome'
import {
  MESSAGE_ORIGIN_CONTENT,
  MESSAGE_ORIGIN_PAGE,
  PORT_CONTENT,
} from './utils/constants'
import { isMessageAllowed } from './utils/isMessageAllowed'

const port = chrome.runtime.connect({ name: PORT_CONTENT })
port.onMessage.addListener((data) => {
  window.postMessage({ ...data, origin: MESSAGE_ORIGIN_CONTENT }, '*')
})

window.addEventListener('message', (message: Message) => {
  if (isMessageAllowed(message, MESSAGE_ORIGIN_PAGE))
    port.postMessage(message.data)
})

const script = document.createElement('script')
script.src = chrome.extension.getURL('page.js')
script.onload = () => {
  if (script.parentNode) script.parentNode.removeChild(script)
}
;(document.head || document.documentElement).appendChild(script)
