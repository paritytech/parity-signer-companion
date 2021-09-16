import { Message } from '@polkadot/extension-base/types'
import {
  enable,
  handleResponse,
  redirectIfPhishing,
} from '@polkadot/extension-base/page'
import { injectExtension } from '@polkadot/extension-inject'
import { PKG_NAME, PKG_VERSION } from './utils/constants'

// setup a response listener (events created by the loader for extension responses)
window.addEventListener('message', ({ data, source }: Message): void => {
  // only allow messages from our window, by the loader
  if (source !== window || data.origin !== 'content') {
    return
  }

  if (data.id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleResponse(data as any)
  } else {
    console.error('Missing id for response.')
  }
})

redirectIfPhishing()
  .then((gotRedirected) => {
    if (!gotRedirected) {
      inject()
    }
  })
  .catch((e) => {
    console.warn(
      `Unable to determine if the site is in the phishing list: ${
        (e as Error).message
      }`
    )
    inject()
  })

function inject() {
  injectExtension(enable, {
    name: PKG_NAME,
    version: PKG_VERSION,
  })
}
