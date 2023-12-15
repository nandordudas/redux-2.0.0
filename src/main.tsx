import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'

import { App } from './App'
import { store } from './app/store'
import { assert, isHTMLElement } from './utils'

function render() {
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
