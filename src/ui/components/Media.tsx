import { useStore } from '@nanostores/react'
import React from 'react'

import { cameraAllowedStore, requestCameraAllowed } from '../../stores/media'

import { isPopup } from '../../utils/isPopup'
import { windowOpen } from '../../messaging/uiActions'
import { Button } from './Button'

export const Media = () => {
  const cameraAllowed = useStore(cameraAllowedStore)
  const canGrant = !isPopup()

  const open = () => {
    window.close() // Firefox doen't close it itself
    windowOpen('/')
  }

  if (cameraAllowed) return null

  return (
    <div className='flex justify-between items-center m-4 mb-0 p-2 rounded bg-_bg-300'>
      <div className='text-sm pr-4'>
        The extension needs access to your camera to scan qr codes from a Parity
        Signer. Open it in new page and give camera access.
      </div>
      {!canGrant && <Button onClick={open}>Open</Button>}
      {canGrant && <Button onClick={requestCameraAllowed}>Grant access</Button>}
    </div>
  )
}
