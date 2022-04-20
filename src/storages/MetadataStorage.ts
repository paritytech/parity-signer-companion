import { MetadataDef } from '@polkadot/extension-inject/types'
import BaseStore from '@polkadot/extension-base/stores/Base'
import { EXT_PREFIX } from '../utils/constants'

export class MetadataStorage extends BaseStore<MetadataDef> {
  constructor() {
    super(`${EXT_PREFIX}metadata`)
  }
}
