import type {
  AccountsContext,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import settings from '@polkadot/ui-settings'
import type { SettingsStruct } from '@polkadot/ui-settings/types'
import React from 'react'

const noop = (): void => undefined

const AccountContext = React.createContext<AccountsContext>({
  accounts: [],
  hierarchy: [],
  master: undefined,
})
const ActionContext = React.createContext<(to?: string) => void>(noop)
const AuthorizeReqContext = React.createContext<AuthorizeRequest[]>([])
const MediaContext = React.createContext<boolean>(false)
const MetadataReqContext = React.createContext<MetadataRequest[]>([])
const SettingsContext = React.createContext<SettingsStruct>(settings.get())
const SigningReqContext = React.createContext<SigningRequest[]>([])

export {
  AccountContext,
  ActionContext,
  AuthorizeReqContext,
  MediaContext,
  MetadataReqContext,
  SettingsContext,
  SigningReqContext,
}
