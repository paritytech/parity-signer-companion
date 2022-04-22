import React from 'react'
import { goToImport } from '../../utils/routing'
import { Button } from '../components/Button'

export const NoAccounts = () => (
  <div className='flex flex-col h-full text-center items-center justify-center'>
    <div className='p-8'>
      The extension helps you to sign transactions with keys you store in your
      Parity Signer. To start using, go to the Signer and import a first key.
    </div>
    <Button onClick={goToImport}>Import a key</Button>
  </div>
)
