import type { SigningRequest } from '@polkadot/extension-base/background/types'
import React from 'react'

const MediaContext = React.createContext<boolean>(false)
const SigningReqContext = React.createContext<SigningRequest[]>([])

export { MediaContext, SigningReqContext }
