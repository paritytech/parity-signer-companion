import { wrapBytes } from '@polkadot/extension-dapp/wrapBytes'
import { QrDisplayPayload, QrScanSignature } from '@polkadot/react-qr'
import { ExtrinsicPayload } from '@polkadot/types/interfaces'
import React, { useState } from 'react'
import styled from 'styled-components'
import Actions from '../components/Actions'

export const CMD_MORTAL = 2
export const CMD_SIGN_MESSAGE = 3

type Props = {
  address: string
  children?: React.ReactNode
  className?: string
  cmd: number
  genesisHash: string
  onSignature: ({ signature }: { signature: string }) => void
  onCancel: () => void
  payload: ExtrinsicPayload | string
}

const Qr: React.FC<Props> = ({
  address,
  className,
  cmd,
  genesisHash,
  onSignature,
  onCancel,
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
        <div>Transaction command:{cmd} not supported.</div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className='qr'>
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
        <Actions>
          <button onClick={onShowQr}>Scan signature via camera</button>
          <button onClick={onCancel}>Cancel</button>
        </Actions>
      )}
    </div>
  )
}

export default styled(Qr)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;

  .qr {
    width: 70%;
  }
`
