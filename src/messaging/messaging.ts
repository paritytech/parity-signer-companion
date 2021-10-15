import { handleResponse } from './handleResponse'
import { messagingPort } from './messagingPort'

// setup a listener for messages, any incoming resolves the promise
messagingPort.onMessage.addListener(handleResponse)
