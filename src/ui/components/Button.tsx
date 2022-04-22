import React from 'react'
import { cn } from '../../utils/cn'

export const Button = ({
  className,
  isSecondary,
  isDanger,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSecondary?: boolean
  isDanger?: boolean
}) => (
  <button
    className={cn(
      'inline-block rounded px-8 py-1 whitespace-nowrap',
      !isSecondary && 'bg-_action-400 text-_action-600',
      isSecondary && 'bg-_bg-300 text-_text-300 ',
      isDanger && 'bg-_bg-danger text-_signal-danger',
      className
    )}
    {...rest}
  />
)
