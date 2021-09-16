import type {
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import React from 'react'

const AuthorizeReqContext = React.createContext<AuthorizeRequest[]>([])
const MediaContext = React.createContext<boolean>(false)
const MetadataReqContext = React.createContext<MetadataRequest[]>([])
const SigningReqContext = React.createContext<SigningRequest[]>([])

export {
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SigningReqContext,
}
