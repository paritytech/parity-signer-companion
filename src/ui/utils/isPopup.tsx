export const isPopup = () =>
  chrome.extension.getViews({ type: 'popup' }).length > 0
