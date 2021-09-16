import type {
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import React from 'react'

const MediaContext = React.createContext<boolean>(false)
const MetadataReqContext = React.createContext<MetadataRequest[]>([])
const SigningReqContext = React.createContext<SigningRequest[]>([])

export { MediaContext, MetadataReqContext, SigningReqContext }
