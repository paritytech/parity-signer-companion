import React from 'react'
import styled from 'styled-components'
import logo from '../assets/full-logo.svg'
import { BaseProps } from '../types'

const Footer: React.FC<BaseProps> = ({ className }) => (
  <div className={className}>
    <img className='logo' src={logo} />
    <a
      className='link'
      href='https://www.parity.io/technologies/signer/'
      target='_blank'
      rel='noreferrer'
    >
      parity.io/technologies/signer
    </a>
  </div>
)

export default styled(Footer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 1rem;
  padding-top: 3rem;

  .logo {
    margin: 0 auto 0.5rem;
  }

  .link {
    font-size: ${({ theme }: BaseProps) => theme.smallFontSize};
    color: ${({ theme }: BaseProps) => theme.fadedTextColor};
    transition: ${({ theme }: BaseProps) => theme.transition};
  }

  .link:hover {
    color: ${({ theme }: BaseProps) => theme.mainTextColor};
  }
`
