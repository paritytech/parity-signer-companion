import React from 'react'
import { createRoot } from 'react-dom/client'
import { ROOT_ID } from '../utils/constants'
import { App } from './App'

const container = document.getElementById(ROOT_ID)
if (!container) throw new Error(`Unable to find element with id '${ROOT_ID}'`)

const root = createRoot(container)
root.render(<App />)
