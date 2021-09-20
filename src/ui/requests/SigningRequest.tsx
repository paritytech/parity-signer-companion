import {
  AccountJson,
  RequestSign,
} from '@polkadot/extension-base/background/types'
import { ExtrinsicPayload } from '@polkadot/types/interfaces'
import { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types'
import { decodeAddress } from '@polkadot/util-crypto'
import { useStore } from 'nanostores/react'
import React, { useEffect, useState } from 'react'
import Address from '../components/Address'
import { accounts as accountsStore } from '../stores/accounts'
import { approveSignSignature, cancelSignRequest } from '../utils/messaging'
import { isRawPayload } from '../utils/guards'
import Qr, { CMD_MORTAL, CMD_SIGN_MESSAGE } from './Qr'
import { registry } from '../utils/registry'
import { BaseProps } from '../types'
import styled from 'styled-components'

type Props = BaseProps & {
  account: AccountJson
  buttonText: string
  isFirst: boolean
  request: RequestSign
  signId: string
  url: string
}

type Data = {
  hexBytes: string | null
  payload: ExtrinsicPayload | null
}

const Request: React.FC<Props> = ({ request, signId, className }) => {
  const accounts = useStore(accountsStore)
  const [{ hexBytes, payload }, setData] = useState<Data>({
    hexBytes: null,
    payload: null,
  })

  const onSignature = ({ signature }: { signature: string }) =>
    approveSignSignature(signId, signature).catch(console.error)
  const onCancel = () => cancelSignRequest(signId).catch(console.error)

  useEffect(() => {
    const payload = request.payload

    if (isRawPayload(payload)) {
      setData({ hexBytes: payload.data, payload: null })
    } else {
      registry.setSignedExtensions(payload.signedExtensions)
      const newPayload = registry.createType('ExtrinsicPayload', payload, {
        version: payload.version,
      })
      setData({ hexBytes: null, payload: newPayload })
    }
  }, [request])

  if (payload !== null) {
    const json = request.payload as SignerPayloadJSON

    return (
      <div className={className}>
        <Address address={json.address} genesisHash={json.genesisHash} />
        <Qr
          address={json.address}
          cmd={CMD_MORTAL}
          genesisHash={json.genesisHash}
          onSignature={onSignature}
          onCancel={onCancel}
          payload={payload}
        />
      </div>
    )
  }

  if (hexBytes !== null) {
    const { address, data } = request.payload as SignerPayloadRaw
    const account = accounts.find(
      (account) =>
        decodeAddress(account.address).toString() ===
        decodeAddress(address).toString()
    )

    return (
      <>
        <Address address={address} />
        {account?.genesisHash && (
          <Qr
            address={address}
            cmd={CMD_SIGN_MESSAGE}
            genesisHash={account.genesisHash}
            onSignature={onSignature}
            onCancel={onCancel}
            payload={data}
          />
        )}
      </>
    )
  }

  return null
}

export default styled(Request)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
