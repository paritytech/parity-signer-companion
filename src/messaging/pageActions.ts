import Injected from '@polkadot/extension-base/page/Injected'
import { sendPageMessage } from './sendPageMessage'

// the enable function, called by the dapp to allow access
export async function enable(origin: string): Promise<Injected> {
  await sendPageMessage('pub(authorize.tab)', { origin })
  return new Injected(sendPageMessage)
}

// redirect users if this page is considered as phishing, otherwise return false
export async function redirectIfPhishing(): Promise<boolean> {
  return await sendPageMessage('pub(phishing.redirectIfDenied)')
}
