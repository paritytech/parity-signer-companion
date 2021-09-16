import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { router } from '../stores/router'
import { BaseProps } from '../types'

const PhishingDetected: React.FC<BaseProps> = ({ className }) => {
  const { param: website } = useStore(router)
  const decodedWebsite = decodeURIComponent(website)

  return (
    <>
      <Header text={'Phishing detected'} />
      <div className={className}>
        You have been redirected because the extension believes that this
        website could compromise the security of your accounts and your tokens.
        <div>{decodedWebsite}</div>
        <div>
          Note that this website was reported on a community-driven, curated
          list. It might be incomplete or inaccurate. If you think that this
          website was flagged incorrectly,{' '}
          <a href='https://github.com/polkadot-js/phishing/issues/new'>
            please open an issue by clicking here
          </a>
        </div>
      </div>
    </>
  )
}

export default styled(PhishingDetected)`
  height: 100%;
`
