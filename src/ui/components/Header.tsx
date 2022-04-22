import { useStore } from '@nanostores/react'
import React from 'react'
import { headerActionsStore } from '../../stores/headerActions'
import { EXT_NAME } from '../../utils/constants'
import logo from '../assets/logo.svg'
import { Button } from './Button'

export const Header = () => {
  const actions = useStore(headerActionsStore)

  return (
    <div className='flex justify-between items-center py-2 px-4 bg-_bg-300 rounded-b'>
      <div className='flex items-center h-8'>
        <img className='h-6 w-6 mr-2' src={logo} />
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
