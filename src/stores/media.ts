import { atom, onStart } from 'nanostores'
import { checkCameraAccess } from '../utils/checkCameraAccess'
import { requestCameraAccess } from '../utils/requestCameraAccess'

export const cameraAllowed = atom(false)

onStart(cameraAllowed, () => {
  checkCameraAccess().then(cameraAllowed.set).catch(console.error)
})

export const requestCameraAllowed = () => {
  requestCameraAccess().then(cameraAllowed.set).catch(console.error)
}
