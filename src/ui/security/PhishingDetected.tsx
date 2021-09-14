import useTranslation from '@polkadot/extension-ui/hooks/useTranslation'
import React from 'react'
import { Trans } from 'react-i18next'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Header from '../components/Header'
import type { ExtThemeProps } from '../types'

interface WebsiteState {
  website: string
}

const PhishingDetected: React.FC<ExtThemeProps> = ({ className }) => {
  const { t } = useTranslation()
  const { website } = useParams<WebsiteState>()
  const decodedWebsite = decodeURIComponent(website)

  return (
    <>
      <Header text={t<string>('Phishing detected')} />
      <div className={className}>
        <p>
          {t<string>(
            'You have been redirected because the Polkadot{.js} extension believes that this website could compromise the security of your accounts and your tokens.'
          )}
        </p>
        <p className='websiteAddress'>{decodedWebsite}</p>
        <p>
          <Trans i18nKey='phishing.incorrect'>
            Note that this website was reported on a community-driven, curated
            list. It might be incomplete or inaccurate. If you think that this
            website was flagged incorrectly,{' '}
            <a href='https://github.com/polkadot-js/phishing/issues/new'>
              please open an issue by clicking here
            </a>
            .
          </Trans>
        </p>
      </div>
    </>
  )
}

export default styled(PhishingDetected)`
  p {
    color: ${({ theme }: ExtThemeProps) => theme.subTextColor};
    margin-bottom: 1rem;
    margin-top: 0;

    a {
      color: ${({ theme }: ExtThemeProps) => theme.subTextColor};
    }

    &.websiteAddress {
      font-size: 1.3rem;
      text-align: center;
    }
  }
`
