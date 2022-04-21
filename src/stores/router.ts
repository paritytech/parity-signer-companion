import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults'
import { atom, computed, onSet, onStart } from 'nanostores'
import { exact, exactWithParam, getParam, getPath } from '../utils/routing'
import { authRequestsStore } from './authRequests'
import { metaRequestsStore } from './metaRequests'
import { signRequestsStore } from './signRequests'

type Page = {
  path: string
  param: string
}

export const pageStore = atom<Page>()

function parse() {
  const path = getPath()
  const param = getParam(path)
  pageStore.set({ path, param })
}

onStart(pageStore, () => {
  parse()
  window.addEventListener('hashchange', parse)
  return () => {
    window.removeEventListener('hashchange', parse)
  }
})

type Route = 'auth' | 'meta' | 'sign' | 'import' | 'phishing' | 'accounts'

export const routeStore = computed(
  [pageStore, authRequestsStore, metaRequestsStore, signRequestsStore],
  ({ path }, authRequests, metaRequests, signRequests) => {
    if (exact(path, '') && authRequests?.length > 0) return 'auth'
    if (exact(path, '') && metaRequests?.length > 0) return 'meta'
    if (exact(path, '') && signRequests?.length > 0) return 'sign'
    if (exact(path, '/account/import')) return 'import'
    if (exactWithParam(path, `${PHISHING_PAGE_REDIRECT}/:website`))
      return 'phishing'

    return 'accounts' as Route
  }
)

onSet(routeStore, ({ newValue, abort }) => {
  if (routeStore.get() === newValue) abort()
})
