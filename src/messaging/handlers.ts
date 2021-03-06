import { Message } from '@polkadot/extension-base/types'
import { Handlers } from '@polkadot/extension-base/page'

export type Handler = {
  resolve: (data: Message['data']['response']) => void
  reject: (error: Error) => void
  subscriber?: (data: Message['data']['subscription']) => void
}

export const handlers: Handlers = {}
