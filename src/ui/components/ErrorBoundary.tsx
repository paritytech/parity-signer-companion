import translate from '@polkadot/extension-ui/components/translate'
import React from 'react'
import { WithTranslation } from 'react-i18next'
import { goTo } from '../utils/goTo'
import Header from './Header'

type Props = WithTranslation

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
    const { children, t } = this.props
    const { error } = this.state

    if (!error) return children

    return (
      <>
        <Header text={t('An error occured')} />
        <div>
          {t(
            'Something went wrong with the query and rendering of this component. {{message}}',
            { replace: { message: error.message } }
          )}
        </div>
        <button onClick={this.goHome}>{t('Back to home')}</button>
      </>
    )
  }

  private goHome() {
    goTo('/')
  }
}

export default translate(ErrorBoundary)
