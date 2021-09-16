import type { Message } from '@polkadot/extension-base/types'
import { Theme } from './themes'

export { Theme }

export interface ThemeProps {
  theme: Theme
}

export interface ExtThemeProps extends ThemeProps {
  className?: string
}

export interface Handler {
  resolve: (data: Message['data']['response']) => void
  reject: (error: Error) => void
  subscriber?: (data: Message['data']['subscription']) => void
}

export type Handlers = Record<string, Handler>
