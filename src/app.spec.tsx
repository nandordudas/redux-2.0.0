import { App } from './app'
import { renderWithStoreProvider } from './test/test-utils'

describe('app component', () => {
  it('should render properly', async () => {
    const { container } = renderWithStoreProvider(<App />)

    expect(container.textContent).toContain('Counter')
  })
})
