import { PORT_CONTENT } from '@polkadot/extension-base/defaults'
import { Message } from '@polkadot/extension-base/types'
import chrome from './utils/chrome'
import { isMessageAllowed } from './utils/isMessageAllowed'

const port = chrome.runtime.connect({ name: PORT_CONTENT })
port.onMessage.addListener((data) => {
  window.postMessage({ ...data, origin: 'content' }, '*')
})

window.addEventListener('message', (message: Message) => {
  if (isMessageAllowed(message, 'page')) port.postMessage(message.data)
})

const script = document.createElement('script')
script.src = chrome.extension.getURL('page.js')
script.onload = () => {
  if (script.parentNode) script.parentNode.removeChild(script)
}
;(document.head || document.documentElement).appendChild(script)
