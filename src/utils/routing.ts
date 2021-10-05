/**
 * We check only last url part: /normal/path/:param
 */
const paramIndex = (s: string) => s.lastIndexOf('/') + 1
const trimParam = (s: string) => s.substring(0, paramIndex(s))

const goTo = (addr?: string) => {
  if (addr) window.location.hash = addr
}

export const goHome = () => goTo('/')
export const goToImport = () => goTo('/account/import')

export const getPath = () => location.hash.replace('#', '')

export const exact = (a: string, b: string) => a === b
export const exactWithParam = (a: string, b: string) =>
  trimParam(a) === trimParam(b)
export const getParam = (s: string) => s.substring(paramIndex(s))
