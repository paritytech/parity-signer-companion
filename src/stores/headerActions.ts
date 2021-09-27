import { createStore, update } from 'nanostores'
import { goHome, goToImport } from '../utils/routing'

type Action = {
  label: string
  onAction: () => void
}

export const importHeaderAction: Action = {
  label: 'Import',
  onAction: goToImport,
}

export const goHomeHeaderAction: Action = {
  label: 'Cancel',
  onAction: goHome,
}

export const headerActions = createStore<Action[]>(() => {
  headerActions.set([])
})

export const addHeaderAction = (v: Action) => {
  update(headerActions, (list) => [...list, v])
}

export const resetHeaderActions = () => {
  headerActions.set([])
}
