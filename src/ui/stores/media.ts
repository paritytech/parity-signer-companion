import { createStore } from 'nanostores'

export const mediaAllowed = createStore<boolean>()

export const setMediaAllowed = (v: boolean) => {
  mediaAllowed.set(v)
}
