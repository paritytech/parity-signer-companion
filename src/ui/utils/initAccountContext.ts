import {
  AccountJson,
  AccountsContext,
} from '@polkadot/extension-base/background/types'
import { canDerive } from '@polkadot/extension-base/utils'
import { buildHierarchy } from '@polkadot/extension-ui/util/buildHierarchy' // TODO: Replace extension-ui

export const initAccountContext = (
  accounts: AccountJson[]
): AccountsContext => {
  const hierarchy = buildHierarchy(accounts)
  const master = hierarchy.find(
    ({ isExternal, type }) => !isExternal && canDerive(type)
  )

  return { accounts, hierarchy, master }
}
