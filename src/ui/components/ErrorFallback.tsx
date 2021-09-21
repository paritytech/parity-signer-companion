import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import Actions from './Actions'
import { Button } from './Button'

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div>
    <h1>Something went wrong</h1>
    <p>
      <pre>{error.message}</pre>
    </p>
    <Actions>
      <Button onClick={resetErrorBoundary}>Back to home</Button>
    </Actions>
  </div>
)

export default ErrorFallback
