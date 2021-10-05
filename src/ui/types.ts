import { theme } from './theme'

export type ThemeProps = {
  theme: typeof theme
}

export type BaseProps = ThemeProps & {
  className?: string
}
