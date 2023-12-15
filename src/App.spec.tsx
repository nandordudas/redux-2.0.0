import { App } from './App'
import { renderWithStoreProvider } from './test/test-utils'

describe('app', () => {
  it('should render properly', () => {
    const { container } = renderWithStoreProvider(<App />)

    expect(container.textContent).toContain('Counter')
  })
})
