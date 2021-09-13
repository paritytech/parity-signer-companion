const _browser = chrome || browser
if (!_browser) throw Error('Browser is not found')

export default _browser
