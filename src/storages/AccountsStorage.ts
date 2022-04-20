import { KeyringJson, KeyringStore } from '@polkadot/ui-keyring/types'
import BaseStore from '@polkadot/extension-base/stores/Base'
import { EXT_PREFIX } from '../utils/constants'

export class AccountsStorage
  extends BaseStore<KeyringJson>
  implements KeyringStore
{
  constructor() {
    super(`${EXT_PREFIX}account`)
  }
}
