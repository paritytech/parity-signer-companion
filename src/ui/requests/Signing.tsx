import { RequestSign } from '@polkadot/extension-base/background/types'
import { SignerPayloadJSON } from '@polkadot/types/types'
import { useStore } from 'nanostores/react'
import React, { useState } from 'react'
import Header from '../components/Header'
import { signRequests } from '../stores/signRequests'
import SigningRequest from './SigningRequest'
import TransactionIndex from './TransactionIndex'

const Signing: React.FC = () => {
  // const requests = useStore(signRequests)
  const requests = [
    {
      account: {
        address: '5FKmibvGwaP4HPAfwvmEHUYTwCfEv6oHJ2psAvBc2NLVrbRr',
        genesisHash:
          '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
        name: 'Qqq',
        isExternal: true,
        whenCreated: 1631806811497,
      },
      id: '1631807962840.2',
      request: {
        payload: {
          specVersion: '0x00002382',
          transactionVersion: '0x00000005',
          address: '5FKmibvGwaP4HPAfwvmEHUYTwCfEv6oHJ2psAvBc2NLVrbRr',
          blockHash:
            '0xbf220f228f0a4562525a070d610f4e74d9a08779f7482c5abc18c4ea27a7fb70',
          blockNumber: '0x0070da29',
          era: '0x9502',
          genesisHash:
            '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
          method:
            '0x0403008eb591f1deaaeb4901fcabbbd3a809eccb421aca906c38dcb5bf9dad8145d04e0700e8764817',
          nonce: '0x00000000',
          signedExtensions: [
            'CheckSpecVersion',
            'CheckTxVersion',
            'CheckGenesis',
            'CheckMortality',
            'CheckNonce',
            'CheckWeight',
            'ChargeTransactionPayment',
          ],
          tip: '0x00000000000000000000000000000000',
          version: 4,
        },
      },
      url: 'https://polkadot.js.org/apps/#/accounts',
    },
  ]
  const [idx, setIdx] = useState(0)
  const request = requests[idx]
  const isTransaction = !!(request?.request?.payload as SignerPayloadJSON)
    ?.blockNumber

  const onNextClick = () => setIdx((i) => Math.min(i + 1, requests.length))
  const onPreviousClick = () => setIdx((i) => Math.max(i - 1, 0))

  return (
    <>
      <Header text={isTransaction ? 'Transaction' : 'Sign message'} />
      {requests.length > 1 && (
        <TransactionIndex
          index={idx}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          totalItems={requests.length}
        />
      )}
      <SigningRequest
        account={request.account}
        buttonText={isTransaction ? 'Sign the transaction' : 'Sign the message'}
        isFirst={idx === 0}
        request={request.request as RequestSign}
        signId={request.id}
        url={request.url}
      />
    </>
  )
}

export default Signing
