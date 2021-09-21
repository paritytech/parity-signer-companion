import {
  AccountJson,
  RequestSign,
} from '@polkadot/extension-base/background/types'
import { QrDisplayPayload, QrScanSignature } from '@polkadot/react-qr'
import { ExtrinsicPayload } from '@polkadot/types/interfaces'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Address from '../components/Address'
import { Button } from '../components/Button'
import { addHeaderAction, resetHeaderActions } from '../stores/headerActions'
import { BaseProps } from '../types'
import { isRawPayload } from '../utils/guards'
import { approveSignSignature, cancelSignRequest } from '../utils/messaging'
import { registry } from '../utils/registry'

const CMD_MORTAL = 2

type Props = BaseProps & {
  account: AccountJson
  buttonText: string
  isFirst: boolean
  request: RequestSign
  signId: string
  url: string
}

const Request: React.FC<Props> = ({ request, signId, className }) => {
  const [step, setStep] = useState(1)
  const [payload, setPayload] = useState<ExtrinsicPayload>()
  const json = request.payload
  const payloadU8a = payload?.toU8a()

  const goNext = () => setStep((step) => step + 1)
  const goBack = () => setStep((step) => step - 1)
  const onSignature = ({ signature }: { signature: string }) =>
    approveSignSignature(signId, signature).catch(console.error)

  useEffect(() => {
    if (isRawPayload(json)) return

    const params = { version: json.version }
    const newPayload = registry.createType('ExtrinsicPayload', json, params)

    registry.setSignedExtensions(json.signedExtensions)
    setPayload(newPayload)
  }, [json])

  useEffect(() => {
    addHeaderAction({
      label: 'Cancel',
      onAction: () => cancelSignRequest(signId).catch(console.error),
    })
    return () => resetHeaderActions()
  }, [signId])

  if (!payload || isRawPayload(json)) return null

  return (
    <div className={className}>
      <div className='row'>
        <div className='guide'>
          <div>
            <h1>
              Signing
              <br />
              request
            </h1>
            <div className='steps'>
              <div className={step === 1 ? 'current' : ''}>
                1. Scan signature via Signer
              </div>
              <div className={step === 2 ? 'current' : ''}>
                2. Show signed transaction
              </div>
            </div>
          </div>
          <div>
            {step === 1 && <Button onClick={goNext}>Next to signing</Button>}
            {step === 2 && <Button onClick={goBack}>Back to signature</Button>}
          </div>
        </div>
        <div className='scanner'>
          <div className='spacer' />
          <div className='qr'>
            {step === 1 && payloadU8a && (
              <QrDisplayPayload
                address={json.address}
                cmd={CMD_MORTAL}
                genesisHash={json.genesisHash}
                payload={payloadU8a}
              />
            )}
            {step === 2 && <QrScanSignature onScan={onSignature} />}
          </div>
        </div>
      </div>
      <div className='using-key'>
        <div className='using-key-heading'>Using key</div>
        <Address address={json.address} genesisHash={json.genesisHash} />
      </div>
    </div>
  )
}

export default styled(Request)`
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1rem;
  }

  .row > div {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
  }

  .guide {
    justify-content: space-between;
  }

  .steps > div {
    margin-bottom: 0.25rem;
    color: ${({ theme }: Props) => theme.fadedTextColor};
  }

  .steps > .current {
    color: ${({ theme }: Props) => theme.mainTextColor};
  }

  .using-key {
    margin-top: 2rem;
  }

  .using-key-heading {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .scanner {
    position: relative;
  }

  .spacer {
    width: 100%;
    padding-bottom: 100%;
  }

  .qr {
    position: absolute;
    width: 100%;
  }
`
