import { atom, onStart } from 'nanostores'
import { checkCameraAccess } from '../utils/checkCameraAccess'
import { requestCameraAccess } from '../utils/requestCameraAccess'

export const cameraAllowedStore = atom(false)

onStart(cameraAllowedStore, () => {
  checkCameraAccess().then(cameraAllowedStore.set).catch(console.error)
})

export const requestCameraAllowed = () => {
  requestCameraAccess().then(cameraAllowedStore.set).catch(console.error)
}
