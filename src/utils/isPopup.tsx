import { chrome } from '@polkadot/extension-inject/chrome'

export const isPopup = () =>
  chrome.extension.getViews({ type: 'popup' }).length > 0
