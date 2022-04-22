import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Actions } from './Actions'
import { Button } from './Button'
import { H1 } from './H1'

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div>
    <H1>Something went wrong</H1>
    <p className='mb-2 text-sm'>
      <pre>{error.message}</pre>
    </p>
    <Actions>
      <Button onClick={resetErrorBoundary}>Back to home</Button>
    </Actions>
  </div>
)
