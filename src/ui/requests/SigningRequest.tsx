import type {
  AccountJson,
  RequestSign,
} from '@polkadot/extension-base/background/types'
import { TypeRegistry } from '@polkadot/types'
import type { ExtrinsicPayload } from '@polkadot/types/interfaces'
import type { SignerPayloadJSON, SignerPayloadRaw } from '@polkadot/types/types'
import { decodeAddress } from '@polkadot/util-crypto'
import { useStore } from 'nanostores/react'
import React, { useEffect, useState } from 'react'
import Address from '../components/Address'
import { accounts as accountsStore } from '../stores/accounts'
import { approveSignSignature, cancelSignRequest } from '../utils/messaging'
import Qr, { CMD_MORTAL, CMD_SIGN_MESSAGE } from './Qr'

interface Props {
  account: AccountJson
  buttonText: string
  isFirst: boolean
  request: RequestSign
  signId: string
  url: string
}

interface Data {
  hexBytes: string | null
  payload: ExtrinsicPayload | null
}

// keep it global, we can and will re-use this across requests
const registry = new TypeRegistry()

function isRawPayload(
  payload: SignerPayloadJSON | SignerPayloadRaw
): payload is SignerPayloadRaw {
  return !!(payload as SignerPayloadRaw).data
}

const Request: React.FC<Props> = ({ request, signId }) => {
  const [{ hexBytes, payload }, setData] = useState<Data>({
    hexBytes: null,
    payload: null,
  })
  const accounts = useStore(accountsStore) as AccountJson[]

  const onSignature = ({ signature }: { signature: string }) =>
    approveSignSignature(signId, signature).catch(console.error)

  const onCancel = () => cancelSignRequest(signId).catch(console.error)

  useEffect(() => {
    const payload = request.payload

    if (isRawPayload(payload)) {
      setData({
        hexBytes: payload.data,
        payload: null,
      })
    } else {
      registry.setSignedExtensions(payload.signedExtensions)

      setData({
        hexBytes: null,
        payload: registry.createType('ExtrinsicPayload', payload, {
          version: payload.version,
        }),
      })
    }
  }, [request])

  if (payload !== null) {
    const json = request.payload as SignerPayloadJSON

    return (
      <>
        <Address address={json.address} genesisHash={json.genesisHash} />
        <Qr
          address={json.address}
          cmd={CMD_MORTAL}
          genesisHash={json.genesisHash}
          onSignature={onSignature}
          payload={payload}
        />
        <button onClick={onCancel}>{'Cancel'}</button>
      </>
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
            payload={data}
          />
        )}
        <button onClick={onCancel}>{'Cancel'}</button>
      </>
    )
  }

  return null
}

export default Request
