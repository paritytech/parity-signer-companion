import { useStore } from '@nanostores/react'
import React from 'react'
import { headerActionsStore } from '../../stores/headerActions'
import { EXT_NAME } from '../../utils/constants'
import logo from '../assets/logo.svg'
import { Button } from './Button'

export const Header = () => {
  const actions = useStore(headerActionsStore)

  return (
    <div className=''>
      <div className='text-holder'>
        <img className='logo' src={logo} />
        <div>{EXT_NAME}</div>
      </div>
      {actions.map((a) => (
        <Button onClick={a.onAction} key={a.label}>
          {a.label}
        </Button>
      ))}
    </div>
  )
}

// TODO:
// export default styled(Header)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0.5rem 1rem;
//   box-shadow: var(--shadow);

//   .text-holder {
//     display: flex;
//     align-items: center;
//     height: 1.9rem;
//   }

//   img {
//     height: 1.5rem;
//     width: 1.5rem;
//     margin-right: 0.5rem;
//   }
// `
