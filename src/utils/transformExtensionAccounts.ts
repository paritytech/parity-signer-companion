import { AccountJson } from '@polkadot/extension-base/background/types'
import { SubjectInfo } from '@polkadot/ui-keyring/observable/types'

export function transformExtensionAccounts(
  accounts: SubjectInfo
): AccountJson[] {
  return Object.values(accounts).map(
    ({ json: { address, meta }, type }): AccountJson => ({
      address,
      ...meta,
      type,
    })
  )
}
