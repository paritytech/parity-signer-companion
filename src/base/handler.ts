import {
  MessageTypes,
  TransportRequestMessage,
} from '@polkadot/extension-base/background/types'
import { assert } from '@polkadot/util'
import { PORT_EXTENSION } from '../utils/constants'
import { Extension } from './Extension'
import { State } from './State'
import { Tabs } from './Tabs'

const state = new State()
const extension = new Extension(state)
const tabs = new Tabs(state)

export function handler<TMessageType extends MessageTypes>(
  { id, message, request }: TransportRequestMessage<TMessageType>,
  port: chrome.runtime.Port,
  extensionPortName = PORT_EXTENSION
) {
  const isExtension = port.name === extensionPortName
  const sender = port.sender as chrome.runtime.MessageSender
  const from = isExtension
    ? 'extension'
    : (sender.tab && sender.tab.url) || sender.url || '<unknown>'
  const source = `${from}: ${id}: ${message}`

  console.log(`[in] ${source}`)

  const promise = isExtension
    ? extension.handle(id, message, request, port)
    : tabs.handle(id, message, request, from, port)

  promise
    .then((response) => {
      console.log(`[out] ${source}`)

      // between the start and the end of the promise, the user may have closed
      // the tab, in which case port will be undefined
      assert(port, 'Port has been disconnected')

      port.postMessage({ id, response })
    })
    .catch((error: Error) => {
      console.log(`[err] ${source}:: ${error.message}`)

      // only send message back to port if it's still connected
      if (port) port.postMessage({ error: error.message, id })
    })
}
