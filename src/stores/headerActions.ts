import { action, atom } from 'nanostores'
import { goHome, goToImport } from '../utils/routing'

type Action = {
  label: string
  onAction: () => void
}

export const importHeaderAction: Action = {
  label: 'Import',
  onAction: goToImport,
}

export const cancelAndGoHomeHeaderAction: Action = {
  label: 'Cancel',
  onAction: goHome,
}

export const doneAndGoHomeHeaderAction: Action = {
  label: 'Done',
  onAction: goHome,
}

export const headerActionsStore = atom<Action[]>([])

export const addHeaderAction = action(
  headerActionsStore,
  'add_header_action',
  (store, v: Action) => {
    store.set([...store.get(), v])
  }
)

export const resetHeaderActions = action(
  headerActionsStore,
  'reset_header_actions',
  (store) => {
    store.set([])
  }
)
