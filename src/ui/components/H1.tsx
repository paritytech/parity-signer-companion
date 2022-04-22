import React from 'react'
import { cn } from '../../utils/cn'

export const H1 = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn('text-xl font-bold mb-2', className)} {...rest} />
)
