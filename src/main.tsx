import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'

import { App } from './app'
import { store } from './app/store'
import { assert, isHTMLElement } from './utils'

async function enableMocking() {
  if (import.meta.env.MODE !== 'development')
    return

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

async function render() {
  await enableMocking()

  const container = document.getElementById('root')

  assert(isHTMLElement<HTMLDivElement>(container), 'Root container not found')

  const app = (
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )

  createRoot(container).render(app)
}

render()
