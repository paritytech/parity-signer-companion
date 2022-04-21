import { useStore } from '@nanostores/react'
import React from 'react'
import { pageStore } from '../../stores/router'

const PhishingDetected: React.FC = () => {
  const { param: website } = useStore(pageStore)
  const decodedWebsite = decodeURIComponent(website)

  return (
    <div>
      <h1>Phishing detected</h1>
      <p>
        You have been redirected because the extension believes that this
        website could compromise the security of your accounts and your tokens:
      </p>
      <p className='emphasis'>{decodedWebsite}</p>
      <p>
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

export default PhishingDetected
