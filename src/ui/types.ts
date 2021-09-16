import { Message } from '@polkadot/extension-base/types'
import { theme } from './themes'

export type Theme = typeof theme

export type ThemeProps = {
  theme: Theme
}

export type BaseProps = ThemeProps & {
  className?: string
}

export type Handler = {
  resolve: (data: Message['data']['response']) => void
  reject: (error: Error) => void
  subscriber?: (data: Message['data']['subscription']) => void
}

export type Handlers = Record<string, Handler>
