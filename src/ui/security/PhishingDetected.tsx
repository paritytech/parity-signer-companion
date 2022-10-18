import { useStore } from '@nanostores/react'
import React from 'react'
import { pageStore } from '../../stores/router'
import { H1 } from '../components/H1'

export const PhishingDetected = () => {
  const page = useStore(pageStore)
  const { param: website = '' } = page || {}
  const decodedWebsite = decodeURIComponent(website)

  return (
    <div>
      <H1>Phishing detected</H1>
      <p className='mb-2'>
        You have been redirected because the extension believes that this
        website could compromise the security of your accounts and your tokens:
      </p>
      <p className='mb-6'>{decodedWebsite}</p>
      <p className='mb-2'>
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
