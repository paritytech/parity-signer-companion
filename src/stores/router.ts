import { createStore } from 'nanostores'
import { getParam, getPath } from '../utils/routing'

type Page = {
  path: string
  param: string
}

function parse() {
  const path = getPath()
  const param = getParam(path)
  router.set({ path, param })
}

export const router = createStore<Page>(() => {
  parse()
  window.addEventListener('hashchange', parse)
  return () => {
    window.removeEventListener('hashchange', parse)
  }
})
