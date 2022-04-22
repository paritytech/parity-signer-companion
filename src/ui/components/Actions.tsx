import React from 'react'
import { cn } from '../../utils/cn'

export const Actions = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-8 space-x-2', className)} {...rest} />
)
