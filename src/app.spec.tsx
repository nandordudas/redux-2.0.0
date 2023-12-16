import { App } from '~/app'
import { renderWithStoreProvider, screen } from '~/test/test-utils'

describe('app component', () => {
  it('should render properly', async () => {
    renderWithStoreProvider(<App />)

    const container = screen.getByText(/counter/i)

    expect(container).toBeInTheDocument()
  })
})
