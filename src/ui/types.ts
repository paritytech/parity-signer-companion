import { theme } from './themes'

export type Theme = typeof theme

export type ThemeProps = {
  theme: Theme
}

export type BaseProps = ThemeProps & {
  className?: string
}
