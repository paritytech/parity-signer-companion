import React from 'react'
import logo from '../assets/full-logo.svg'

export const Footer = () => (
  <div className=''>
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

// TODO:
// export default styled(Footer)`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: auto;
//   padding: 2rem;
//   padding-top: 3rem;

//   .logo {
//     margin: 0 auto 0.5rem;
//   }

//   .link {
//     font-size: var(--font-small-size);
//   }
// `
