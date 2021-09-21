import { useStore } from 'nanostores/react'
import React from 'react'
import styled from 'styled-components'
import { router } from '../stores/router'
import { BaseProps } from '../types'

const PhishingDetected: React.FC<BaseProps> = ({ className }) => {
  const { param: website } = useStore(router)
  const decodedWebsite = decodeURIComponent(website)

  return (
    <div className={className}>
      <h1>Phishing detected</h1>
      <p>
        You have been redirected because the extension believes that this
        website could compromise the security of your accounts and your tokens:
      </p>
      <p className='website'>{decodedWebsite}</p>
      <p className='note'>
        Note that this website was reported on a community-driven, curated list.
        It might be incomplete or inaccurate. If you think that this website was
        flagged incorrectly,{' '}
        <a href='https://github.com/polkadot-js/phishing/issues/new'>
          please open an issue by clicking here
        </a>
      </p>
    </div>
  )
}

export default styled(PhishingDetected)`
  .website {
    text-align: center;
  }

  .note {
    margin-top: 2rem;
  }
`
