import { Theme } from './themes'

export { Theme }

export interface ThemeProps {
  theme: Theme
}

export interface ExtThemeProps extends ThemeProps {
  className?: string
}
