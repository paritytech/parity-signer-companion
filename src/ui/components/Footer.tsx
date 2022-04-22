import React from 'react'
import logo from '../assets/full-logo.svg'
import { A } from './A'

export const Footer = () => (
  <div className='flex flex-col items-center mt-auto p-8 pt-12'>
    <img className='mt-0 mx-auto mb-2' src={logo} />
    <A href='https://www.parity.io/technologies/signer/'>
      parity.io/technologies/signer
    </A>
  </div>
)
