import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { BaseProps } from '../types'
import { goToImport } from '../../utils/routing'

const NoAccounts: React.FC<BaseProps> = ({ className }) => (
  <div className={className}>
    <div className='container'>
      The extension helps you to sign transactions with keys you store in your
      Parity Signer. To start using, go to the Signer and import a first key.
    </div>
    <Button onClick={goToImport}>Import a key</Button>
  </div>
)

export default styled(NoAccounts)`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;

  .container {
    padding: 2rem;
    color: var(--color-main-text);
  }
`
