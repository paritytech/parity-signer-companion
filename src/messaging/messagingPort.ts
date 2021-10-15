import chrome from '@polkadot/extension-inject/chrome'
import { PORT_EXTENSION } from '../utils/constants'

export const messagingPort = chrome.runtime.connect({ name: PORT_EXTENSION })
