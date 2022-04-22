import React from 'react'
import { goToImport } from '../../utils/routing'
import { Button } from '../components/Button'

export const NoAccounts = () => (
  <div className=''>
    <div className='container'>
      The extension helps you to sign transactions with keys you store in your
      Parity Signer. To start using, go to the Signer and import a first key.
    </div>
    <Button onClick={goToImport}>Import a key</Button>
  </div>
)

//  TODO:
// export default styled(NoAccounts)`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   text-align: center;
//   align-items: center;
//   justify-content: center;

//   .container {
//     padding: 2rem;
//     color: var(--color-main-text);
//   }
// `
