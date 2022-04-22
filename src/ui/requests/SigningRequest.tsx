import { useStore } from '@nanostores/react'
import {
  AccountJson,
  RequestSign,
} from '@polkadot/extension-base/background/types'
import { wrapBytes } from '@polkadot/extension-dapp/wrapBytes'
import { QrDisplayPayload, QrScanSignature } from '@polkadot/react-qr'
import { HexString } from '@polkadot/util/types'
import React, { useEffect, useRef, useState } from 'react'

import {
  approveSignSignature,
  cancelSignRequest,
} from '../../messaging/uiActions'
import {
  accountNamesByAddressStore,
  accountsStore,
} from '../../stores/accounts'
import { addHeaderAction, resetHeaderActions } from '../../stores/headerActions'
import { cn } from '../../utils/cn'
import { getExtrinsicPayload } from '../../utils/getExtrinsicPayload'
import { getGenesisHashByAddress } from '../../utils/getGenesisHashByAddress'
import { isRawPayload } from '../../utils/guards'
import { Address } from '../components/Address'
import { Button } from '../components/Button'
import { H1 } from '../components/H1'

const CMD_MORTAL = 2
const CMD_SIGN_MESSAGE = 3

type Props = {
  account: AccountJson
  buttonText: string
  isFirst: boolean
  request: RequestSign
  signId: string
  url: string
}

export const SigningRequest: React.FC<Props> = ({ request, signId }) => {
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
    <div className='flex flex-col'>
      <div className='flex w-full mb-4'>
        <div className='flex flex-col basis-1/2 justify-between'>
          <div>
            <H1>
              Signing
              <br />
              request
            </H1>
            <div className='space-y-1 text-_text-300'>
              <div
                className={cn(
                  'transition-colors',
                  beginning && 'text-_text-500'
                )}
              >
                1. Scan signature via Signer
              </div>
              <div
                className={cn(
                  'transition-colors',
                  !beginning && 'text-_text-500'
                )}
              >
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
        <div className='flex flex-col basis-1/2 relative border-8 rounded'>
          <div className='w-full pb-_full' />
          <div className='absolute w-full'>
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
      <div className='mt-8'>
        <div className='mb-2 font-bold'>Using key</div>
        <Address address={address} name={name} genesisHash={genesisHash} />
      </div>
    </div>
  )
}
