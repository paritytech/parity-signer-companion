import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import { EXT_NAME } from '../../utils/constants'
import logo from '../assets/logo.svg'
import { hasAccounts as hasAccountsStore } from '../stores/accounts'
import { BaseProps, ThemeProps } from '../types'
import { goToImport } from '../utils/routing'
import { Button } from './Button'

const Header: React.FC<BaseProps> = ({ className }) => {
  const hasAccounts = useStore(hasAccountsStore)
  const showImportButton = hasAccounts

  return (
    <div className={className}>
      <div className='text-holder'>
        <img className='logo' src={logo} />
        <div>{EXT_NAME}</div>
      </div>
      {showImportButton && <Button onClick={goToImport}>Import</Button>}
    </div>
  )
}

export default styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: ${({ theme }: ThemeProps) => theme.shadow};

  .text-holder {
    display: flex;
    align-items: center;
  }

  img {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }
`
