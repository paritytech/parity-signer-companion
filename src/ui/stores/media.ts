import { createStore } from 'nanostores'

export const mediaAllowed = createStore<boolean>(() => {
  mediaAllowed.set(false)
})

export const setMediaAllowed = (v: boolean) => {
  mediaAllowed.set(v)
}
