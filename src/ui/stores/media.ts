import { createStore } from 'nanostores'
import { requestMediaAccess } from '../utils/requestMediaAccess'

export const mediaAllowed = createStore<boolean>(() => {
  requestMediaAccess().then(setMediaAllowed).catch(console.error)
})

export const setMediaAllowed = (v: boolean) => {
  mediaAllowed.set(v)
}
