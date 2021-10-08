import { PORT_EXTENSION } from '@polkadot/extension-base/defaults'
import chrome from '@polkadot/extension-inject/chrome'

export const messagingPort = chrome.runtime.connect({ name: PORT_EXTENSION })
