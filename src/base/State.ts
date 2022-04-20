import { addMetadata, knownMetadata } from '@polkadot/extension-chains'
import { chrome } from '@polkadot/extension-inject/chrome'
import { MetadataDef, ProviderMeta } from '@polkadot/extension-inject/types'
import {
  JsonRpcResponse,
  ProviderInterface,
  ProviderInterfaceCallback,
} from '@polkadot/rpc-provider/types'
import settings from '@polkadot/ui-settings'
import { assert } from '@polkadot/util'
import { BehaviorSubject } from 'rxjs'
import {
  AccountJson,
  AuthorizeRequest,
  MetadataRequest,
  RequestAuthorizeTab,
  RequestRpcSend,
  RequestRpcSubscribe,
  RequestRpcUnsubscribe,
  RequestSign,
  ResponseRpcListProviders,
  ResponseSigning,
  SigningRequest,
} from '@polkadot/extension-base/background/types'
import { getId } from '../utils/getId'
import { MetadataStorage } from '../storages/MetadataStorage'
import { AuthUrls } from '@polkadot/extension-base/background/handlers/State'

interface Resolver<T> {
  reject: (error: Error) => void
  resolve: (result: T) => void
}

interface AuthRequest extends Resolver<boolean> {
  id: string
  idStr: string
  request: RequestAuthorizeTab
  url: string
}

interface MetaRequest extends Resolver<boolean> {
  id: string
  request: MetadataDef
  url: string
}

// List of providers passed into constructor. This is the list of providers
// exposed by the extension.
type Providers = Record<
  string,
  {
    meta: ProviderMeta
    // The provider is not running at init, calling this will instantiate the
    // provider.
    start: () => ProviderInterface
  }
>

interface SignRequest extends Resolver<ResponseSigning> {
  account: AccountJson
  id: string
  request: RequestSign
  url: string
}

const NOTIFICATION_URL = chrome.extension.getURL('notification.html')

const POPUP_WINDOW_OPTS: chrome.windows.CreateData = {
  focused: true,
  width: 600,
  height: 600,
  top: 100,
  left: 100,
  type: 'popup',
  url: NOTIFICATION_URL,
}

const NORMAL_WINDOW_OPTS: chrome.windows.CreateData = {
  focused: true,
  type: 'normal',
  url: NOTIFICATION_URL,
}

const AUTH_URLS_KEY = 'authUrls'

export class State {
  readonly #authUrls: AuthUrls = {}

  readonly #authRequests: Record<string, AuthRequest> = {}

  readonly #metaStore = new MetadataStorage()

  // Map of providers currently injected in tabs
  readonly #injectedProviders = new Map<
    chrome.runtime.Port,
    ProviderInterface
  >()

  readonly #metaRequests: Record<string, MetaRequest> = {}

  #notification = settings.notification

  // Map of all providers exposed by the extension, they are retrievable by key
  readonly #providers: Providers

  readonly #signRequests: Record<string, SignRequest> = {}

  #windows: number[] = []

  public readonly authSubject: BehaviorSubject<AuthorizeRequest[]> =
    new BehaviorSubject<AuthorizeRequest[]>([])

  public readonly metaSubject: BehaviorSubject<MetadataRequest[]> =
    new BehaviorSubject<MetadataRequest[]>([])

  public readonly signSubject: BehaviorSubject<SigningRequest[]> =
    new BehaviorSubject<SigningRequest[]>([])

  constructor(providers: Providers = {}) {
    this.#providers = providers

    this.#metaStore.all((_key: string, def: MetadataDef) => {
      addMetadata(def)
    })

    // retrieve previously set authorizations
    const authString = localStorage.getItem(AUTH_URLS_KEY) || '{}'
    const previousAuth = JSON.parse(authString) as AuthUrls

    this.#authUrls = previousAuth
  }

  public get knownMetadata(): MetadataDef[] {
    return knownMetadata()
  }

  public get numAuthRequests(): number {
    return Object.keys(this.#authRequests).length
  }

  public get numMetaRequests(): number {
    return Object.keys(this.#metaRequests).length
  }

  public get numSignRequests(): number {
    return Object.keys(this.#signRequests).length
  }

  public get allAuthRequests(): AuthorizeRequest[] {
    return Object.values(this.#authRequests).map(
      ({ id, request, url }): AuthorizeRequest => ({ id, request, url })
    )
  }

  public get allMetaRequests(): MetadataRequest[] {
    return Object.values(this.#metaRequests).map(
      ({ id, request, url }): MetadataRequest => ({ id, request, url })
    )
  }

  public get allSignRequests(): SigningRequest[] {
    return Object.values(this.#signRequests).map(
      ({ account, id, request, url }): SigningRequest => ({
        account,
        id,
        request,
        url,
      })
    )
  }

  public get authUrls(): AuthUrls {
    return this.#authUrls
  }

  private popupClose() {
    this.#windows.forEach(
      (id: number) =>
        // eslint-disable-next-line no-void
        void chrome.windows.remove(id)
    )
    this.#windows = []
  }

  private popupOpen() {
    this.#notification !== 'extension' &&
      chrome.windows.create(
        this.#notification === 'window'
          ? NORMAL_WINDOW_OPTS
          : POPUP_WINDOW_OPTS,
        (window) => {
          if (window) {
            this.#windows.push(window.id || 0)
          }
        }
      )
  }

  private authComplete = (
    id: string,
    resolve: (result: boolean) => void,
    reject: (error: Error) => void
  ): Resolver<boolean> => {
    const complete = (result: boolean | Error) => {
      const isAllowed = result === true
      const {
        idStr,
        request: { origin },
        url,
      } = this.#authRequests[id]

      this.#authUrls[this.stripUrl(url)] = {
        count: 0,
        id: idStr,
        isAllowed,
        origin,
        url,
      }

      this.saveCurrentAuthList()
      delete this.#authRequests[id]
      this.updateIconAuth(true)
    }

    return {
      reject: (error: Error) => {
        complete(error)
        reject(error)
      },
      resolve: (result: boolean) => {
        complete(result)
        resolve(result)
      },
    }
  }

  private saveCurrentAuthList() {
    localStorage.setItem(AUTH_URLS_KEY, JSON.stringify(this.#authUrls))
  }

  private metaComplete = (
    id: string,
    resolve: (result: boolean) => void,
    reject: (error: Error) => void
  ): Resolver<boolean> => {
    const complete = () => {
      delete this.#metaRequests[id]
      this.updateIconMeta(true)
    }

    return {
      reject: (error: Error) => {
        complete()
        reject(error)
      },
      resolve: (result: boolean) => {
        complete()
        resolve(result)
      },
    }
  }

  private signComplete = (
    id: string,
    resolve: (result: ResponseSigning) => void,
    reject: (error: Error) => void
  ): Resolver<ResponseSigning> => {
    const complete = () => {
      delete this.#signRequests[id]
      this.updateIconSign(true)
    }

    return {
      reject: (error: Error) => {
        complete()
        reject(error)
      },
      resolve: (result: ResponseSigning) => {
        complete()
        resolve(result)
      },
    }
  }

  private stripUrl(url: string): string {
    assert(
      url &&
        (url.startsWith('http:') ||
          url.startsWith('https:') ||
          url.startsWith('ipfs:') ||
          url.startsWith('ipns:')),
      `Invalid url ${url}, expected to start with http: or https: or ipfs: or ipns:`
    )

    const parts = url.split('/')

    return parts[2]
  }

  private updateIcon(shouldClose?: boolean) {
    const authCount = this.numAuthRequests
    const metaCount = this.numMetaRequests
    const signCount = this.numSignRequests
    const text = authCount
      ? 'Auth'
      : metaCount
      ? 'Meta'
      : signCount
      ? `${signCount}`
      : ''

    // eslint-disable-next-line no-void
    void chrome.browserAction.setBadgeText({ text })

    if (shouldClose && text === '') {
      this.popupClose()
    }
  }

  public toggleAuthorization(url: string): AuthUrls {
    const entry = this.#authUrls[url]

    assert(entry, `The source ${url} is not known`)

    this.#authUrls[url].isAllowed = !entry.isAllowed
    this.saveCurrentAuthList()

    return this.#authUrls
  }

  private updateIconAuth(shouldClose?: boolean) {
    this.authSubject.next(this.allAuthRequests)
    this.updateIcon(shouldClose)
  }

  private updateIconMeta(shouldClose?: boolean) {
    this.metaSubject.next(this.allMetaRequests)
    this.updateIcon(shouldClose)
  }

  private updateIconSign(shouldClose?: boolean) {
    this.signSubject.next(this.allSignRequests)
    this.updateIcon(shouldClose)
  }

  public async authorizeUrl(
    url: string,
    request: RequestAuthorizeTab
  ): Promise<boolean> {
    const idStr = this.stripUrl(url)

    // Do not enqueue duplicate authorization requests.
    const isDuplicate = Object.values(this.#authRequests).some(
      (request) => request.idStr === idStr
    )

    assert(
      !isDuplicate,
      `The source ${url} has a pending authorization request`
    )

    if (this.#authUrls[idStr]) {
      // this url was seen in the past
      assert(
        this.#authUrls[idStr].isAllowed,
        `The source ${url} is not allowed to interact with this extension`
      )

      return false
    }

    return new Promise((resolve, reject) => {
      const id = getId()

      this.#authRequests[id] = {
        ...this.authComplete(id, resolve, reject),
        id,
        idStr,
        request,
        url,
      }

      this.updateIconAuth()
      this.popupOpen()
    })
  }

  public ensureUrlAuthorized(url: string): boolean {
    const entry = this.#authUrls[this.stripUrl(url)]

    assert(entry, `The source ${url} has not been enabled yet`)
    assert(
      entry.isAllowed,
      `The source ${url} is not allowed to interact with this extension`
    )

    return true
  }

  public injectMetadata(url: string, request: MetadataDef): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const id = getId()

      this.#metaRequests[id] = {
        ...this.metaComplete(id, resolve, reject),
        id,
        request,
        url,
      }

      this.updateIconMeta()
      this.popupOpen()
    })
  }

  public getAuthRequest(id: string): AuthRequest {
    return this.#authRequests[id]
  }

  public getMetaRequest(id: string): MetaRequest {
    return this.#metaRequests[id]
  }

  public getSignRequest(id: string): SignRequest {
    return this.#signRequests[id]
  }

  // List all providers the extension is exposing
  public rpcListProviders(): Promise<ResponseRpcListProviders> {
    return Promise.resolve(
      Object.keys(this.#providers).reduce((acc, key) => {
        acc[key] = this.#providers[key].meta

        return acc
      }, {} as ResponseRpcListProviders)
    )
  }

  public rpcSend(
    request: RequestRpcSend,
    port: chrome.runtime.Port
  ): Promise<JsonRpcResponse> {
    const provider = this.#injectedProviders.get(port)

    assert(provider, 'Cannot call pub(rpc.subscribe) before provider is set')

    return provider.send(request.method, request.params)
  }

  // Start a provider, return its meta
  public rpcStartProvider(
    key: string,
    port: chrome.runtime.Port
  ): Promise<ProviderMeta> {
    assert(
      Object.keys(this.#providers).includes(key),
      `Provider ${key} is not exposed by extension`
    )

    if (this.#injectedProviders.get(port)) {
      return Promise.resolve(this.#providers[key].meta)
    }

    // Instantiate the provider
    this.#injectedProviders.set(port, this.#providers[key].start())

    // Close provider connection when page is closed
    port.onDisconnect.addListener(() => {
      const provider = this.#injectedProviders.get(port)

      if (provider) {
        provider.disconnect().catch(console.error)
      }

      this.#injectedProviders.delete(port)
    })

    return Promise.resolve(this.#providers[key].meta)
  }

  public rpcSubscribe(
    { method, params, type }: RequestRpcSubscribe,
    cb: ProviderInterfaceCallback,
    port: chrome.runtime.Port
  ): Promise<number | string> {
    const provider = this.#injectedProviders.get(port)

    assert(provider, 'Cannot call pub(rpc.subscribe) before provider is set')

    return provider.subscribe(type, method, params, cb)
  }

  public rpcSubscribeConnected(
    _request: null,
    cb: ProviderInterfaceCallback,
    port: chrome.runtime.Port
  ) {
    const provider = this.#injectedProviders.get(port)

    assert(
      provider,
      'Cannot call pub(rpc.subscribeConnected) before provider is set'
    )

    cb(null, provider.isConnected) // Immediately send back current isConnected
    provider.on('connected', () => cb(null, true))
    provider.on('disconnected', () => cb(null, false))
  }

  public rpcUnsubscribe(
    request: RequestRpcUnsubscribe,
    port: chrome.runtime.Port
  ): Promise<boolean> {
    const provider = this.#injectedProviders.get(port)

    assert(provider, 'Cannot call pub(rpc.unsubscribe) before provider is set')

    return provider.unsubscribe(
      request.type,
      request.method,
      request.subscriptionId
    )
  }

  public saveMetadata(meta: MetadataDef) {
    this.#metaStore.set(meta.genesisHash, meta)

    addMetadata(meta)
  }

  public setNotification(notification: string): boolean {
    this.#notification = notification

    return true
  }

  public sign(
    url: string,
    request: RequestSign,
    account: AccountJson
  ): Promise<ResponseSigning> {
    const id = getId()

    return new Promise((resolve, reject) => {
      this.#signRequests[id] = {
        ...this.signComplete(id, resolve, reject),
        account,
        id,
        request,
        url,
      }

      this.updateIconSign()
      this.popupOpen()
    })
  }
}
