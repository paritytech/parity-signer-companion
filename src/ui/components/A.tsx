import React from 'react'
import { cn } from '../../utils/cn'

export const A = ({
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={cn(
      'text-sm text-_text-400 hover:text-_text-500 transition-colors',
      className
    )}
    {...rest}
    target='_blank'
    rel='noreferrer'
  />
)
