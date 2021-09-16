import type {
  AccountsContext,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import React from 'react'

const AccountContext = React.createContext<AccountsContext>({
  accounts: [],
  hierarchy: [],
  master: undefined,
})
const AuthorizeReqContext = React.createContext<AuthorizeRequest[]>([])
const MediaContext = React.createContext<boolean>(false)
const MetadataReqContext = React.createContext<MetadataRequest[]>([])
const SigningReqContext = React.createContext<SigningRequest[]>([])

export {
  AccountContext,
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SigningReqContext,
}
