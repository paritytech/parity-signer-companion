import React from 'react'
import { goTo } from '../utils/goTo'
import Header from './Header'

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
      <>
        <Header text={'An error occured'} />
        <div>
          {`Something went wrong with the query and rendering of this component. ${this.state.error.message}`}
        </div>
        <button onClick={this.goHome}>{'Back to home'}</button>
      </>
    )
  }

  private goHome() {
    goTo('/')
  }
}

export default ErrorBoundary
