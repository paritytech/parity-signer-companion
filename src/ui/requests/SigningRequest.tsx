import { useStore } from '@nanostores/react'
import {
  AccountJson,
  RequestSign,
} from '@polkadot/extension-base/background/types'
import { wrapBytes } from '@polkadot/extension-dapp/wrapBytes'
import { QrDisplayPayload, QrScanSignature } from '@polkadot/react-qr'
import { HexString } from '@polkadot/util/types'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  approveSignSignature,
  cancelSignRequest,
} from '../../messaging/uiActions'
import {
  accountNamesByAddressStore,
  accountsStore,
} from '../../stores/accounts'
import { addHeaderAction, resetHeaderActions } from '../../stores/headerActions'
import { getExtrinsicPayload } from '../../utils/getExtrinsicPayload'
import { getGenesisHashByAddress } from '../../utils/getGenesisHashByAddress'
import { isRawPayload } from '../../utils/guards'
import Address from '../components/Address'
import { Button } from '../components/Button'
import { BaseProps } from '../types'

const CMD_MORTAL = 2
const CMD_SIGN_MESSAGE = 3

type Props = BaseProps & {
  account: AccountJson
  buttonText: string
  isFirst: boolean
  request: RequestSign
  signId: string
  url: string
}

const Request: React.FC<Props> = ({ request, signId, className }) => {
  const accounts = useStore(accountsStore)
  const accountNamesByAddress = useStore(accountNamesByAddressStore)
  const [beginning, setBeginning] = useState(true)
  const payloadRef = useRef(getExtrinsicPayload(request.payload))
  const isRaw = isRawPayload(request.payload)
  const cmd = isRaw ? CMD_SIGN_MESSAGE : CMD_MORTAL
  const address = request.payload.address
  const name = accountNamesByAddress[address]
  const genesisHash = isRaw
    ? getGenesisHashByAddress(accounts, address)
    : request.payload.genesisHash
  const payloadU8a = isRaw
    ? wrapBytes(request.payload.data)
    : payloadRef.current?.toU8a()

  const toggleOnQr = () => setBeginning((v) => !v)
  const onSignature = ({ signature }: { signature: HexString }) =>
    approveSignSignature(signId, signature).catch(console.error)

  useEffect(() => {
    addHeaderAction({
      label: 'Cancel',
      onAction: () => cancelSignRequest(signId).catch(console.error),
    })
    return () => resetHeaderActions()
  }, [signId])

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
              <div className={beginning ? 'current' : ''}>
                1. Scan signature via Signer
              </div>
              <div className={!beginning ? 'current' : ''}>
                2. Show signed transaction
              </div>
            </div>
          </div>
          <div>
            {beginning && <Button onClick={toggleOnQr}>Next to signing</Button>}
            {!beginning && (
              <Button onClick={toggleOnQr}>Back to signature</Button>
            )}
          </div>
        </div>
        <div className='scanner'>
          <div className='spacer' />
          <div className='qr'>
            {beginning && payloadU8a && genesisHash && (
              <QrDisplayPayload
                address={address}
                cmd={cmd}
                genesisHash={genesisHash}
                payload={payloadU8a}
              />
            )}
            {!beginning && <QrScanSignature onScan={onSignature} />}
          </div>
        </div>
      </div>
      <div className='using-key'>
        <div className='using-key-heading'>Using key</div>
        <Address address={address} name={name} genesisHash={genesisHash} />
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
    color: var(--color-faded-text);
  }

  .steps > .current {
    color: var(--color-main-text);
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
