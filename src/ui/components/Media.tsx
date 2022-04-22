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
    <div className=''>
      <div className='message'>
        The extension needs access to your camera to scan qr codes from a Parity
        Signer. Open it in new page and give camera access.
      </div>
      {!canGrant && <Button onClick={open}>Open</Button>}
      {canGrant && <Button onClick={requestCameraAllowed}>Grant access</Button>}
    </div>
  )
}

// TODO:
// export default styled(Media)`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin: 0.5rem 0.5rem 0;
//   padding: 0.5rem;
//   background: var(--color-card-bg);
//   border-radius: 0.2rem;

//   .message {
//     font-size: var(--font-small-size);
//     padding-right: 1rem;
//   }
// `
