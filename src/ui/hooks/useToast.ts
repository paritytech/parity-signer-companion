import { useContext } from 'react'
import { ToastContext } from '../contexts'

export default function useToast(): { show: (message: string) => void } {
  return useContext(ToastContext)
}
