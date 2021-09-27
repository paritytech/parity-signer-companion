import { Message } from '@polkadot/extension-base/types'

export type Handler = {
  resolve: (data: Message['data']['response']) => void
  reject: (error: Error) => void
  subscriber?: (data: Message['data']['subscription']) => void
}

type Handlers = Record<string, Handler>

export const handlers: Handlers = {}
