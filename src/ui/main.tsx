import React from 'react'
import ReactDOM from 'react-dom'
import { ROOT_ID } from '../utils/constants'
import { App } from './App'

const rootElement = document.getElementById(ROOT_ID)
if (!rootElement) throw new Error(`Unable to find element with id '${ROOT_ID}'`)

ReactDOM.render(<App />, rootElement)
