import { chrome } from '@polkadot/extension-inject/chrome'
import keyring from '@polkadot/ui-keyring'
import { assert } from '@polkadot/util'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import handlers from '@polkadot/extension-base/background/handlers'
import { AccountsStore } from '@polkadot/extension-base/stores'
import { PORT_CONTENT, PORT_EXTENSION } from './utils/constants'

// setup the notification (same a FF default background, white text)
void chrome.browserAction.setBadgeBackgroundColor({ color: '#d90000' })

chrome.runtime.onConnect.addListener((port) => {
  // shouldn't happen, however... only listen to what we know about
  assert(
    [PORT_CONTENT, PORT_EXTENSION].includes(port.name),
    `Unknown connection from ${port.name}`
  )

  port.onMessage.addListener((data) => handlers(data, port))
  port.onDisconnect.addListener(() =>
    console.log(`Disconnected from ${port.name}`)
  )
})

cryptoWaitReady()
  .then(() => {
    console.log('crypto initialized')
    keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' })
    console.log('initialization completed')
  })
  .catch((error) => {
    console.error('initialization failed', error)
  })
