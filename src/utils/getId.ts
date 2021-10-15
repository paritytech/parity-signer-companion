import { EXT_PREFIX } from './constants'

let counter = 0

export function getId() {
  return `${EXT_PREFIX}-${++counter}-${Date.now()}`
}
