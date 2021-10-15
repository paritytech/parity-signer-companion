import { canDerive } from '@polkadot/extension-base/utils'
import { InjectedAccount } from '@polkadot/extension-inject/types'
import { SubjectInfo } from '@polkadot/ui-keyring/observable/types'

export function transformTabsAccounts(
  accounts: SubjectInfo,
  anyType = false
): InjectedAccount[] {
  return Object.values(accounts)
    .filter(({ json }) => !json.meta.isHidden)
    .filter(({ type }) => (anyType ? true : canDerive(type)))
    .sort(
      (a, b) => (a.json.meta.whenCreated || 0) - (b.json.meta.whenCreated || 0)
    )
    .map(
      ({
        json: {
          address,
          meta: { genesisHash, name },
        },
        type,
      }): InjectedAccount => ({
        address,
        genesisHash,
        name,
        type,
      })
    )
}
