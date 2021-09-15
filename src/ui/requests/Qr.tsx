import { wrapBytes } from '@polkadot/extension-dapp/wrapBytes'
import { QrDisplayPayload, QrScanSignature } from '@polkadot/react-qr'
import type { ExtrinsicPayload } from '@polkadot/types/interfaces'
import React, { useState } from 'react'
import styled from 'styled-components'

export const CMD_MORTAL = 2
export const CMD_SIGN_MESSAGE = 3

interface Props {
  address: string
  children?: React.ReactNode
  className?: string
  cmd: number
  genesisHash: string
  onSignature: ({ signature }: { signature: string }) => void
  payload: ExtrinsicPayload | string
}

const Qr: React.FC<Props> = ({
  address,
  className,
  cmd,
  genesisHash,
  onSignature,
  payload,
}) => {
  const [isScanning, setIsScanning] = useState(false)

  const payloadU8a =
    cmd === CMD_MORTAL
      ? (payload as ExtrinsicPayload).toU8a()
      : cmd === CMD_SIGN_MESSAGE
      ? wrapBytes(payload as string)
      : null

  const onShowQr = () => setIsScanning(true)

  if (!payloadU8a) {
    return (
      <div className={className}>
        <div className='qrContainer'>
          Transaction command:{cmd} not supported.
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className='qrContainer'>
        {isScanning ? (
          <QrScanSignature onScan={onSignature} />
        ) : (
          <QrDisplayPayload
            address={address}
            cmd={cmd}
            genesisHash={genesisHash}
            payload={payloadU8a}
          />
        )}
      </div>
      {!isScanning && (
        <button className='scanButton' onClick={onShowQr}>
          {'Scan signature via camera'}
        </button>
      )}
    </div>
  )
}

export default styled(Qr)`
  height: 100%;

  .qrContainer {
    margin: 5px auto 10px auto;
    width: 65%;

    img {
      border: white solid 1px;
    }
  }

  .scanButton {
    margin-bottom: 8px;
  }
`
