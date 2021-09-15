import { useEffect, useState } from 'react'
import { getPage } from '../utils/routing'

export const usePage = () => {
  const [page, setPage] = useState(getPage())

  useEffect(() => {
    const setPageFromHash = () => setPage(getPage())
    window.addEventListener('hashchange', setPageFromHash)
    return () => {
      window.removeEventListener('hashchange', setPageFromHash)
    }
  }, [])

  return page
}
