import React from 'react'
import { goHome } from '../utils/routing'

type Props = {}

type State = {
  error?: Error
}

class ErrorBoundary extends React.Component<Props, State> {
  override state: State = {}

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public override render() {
    if (!this.state.error) return this.props.children

    return (
      <div>
        <div>
          {`Something went wrong with the query and rendering of this component. ${this.state.error.message}`}
        </div>
        <button onClick={goHome}>{'Back to home'}</button>
      </div>
    )
  }
}

export default ErrorBoundary
