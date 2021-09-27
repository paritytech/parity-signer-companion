import { createStore } from 'nanostores'
import { checkCameraAccess } from '../../utils/checkCameraAccess'
import { requestCameraAccess } from '../../utils/requestCameraAccess'

export const cameraAllowed = createStore<boolean>(() => {
  cameraAllowed.set(true)
  // HACK: It doesn't want to work without a little delay
  setTimeout(() =>
    checkCameraAccess().then(cameraAllowed.set).catch(console.error)
  )
})

export const requestCameraAllowed = () => {
  requestCameraAccess().then(cameraAllowed.set).catch(console.error)
}
