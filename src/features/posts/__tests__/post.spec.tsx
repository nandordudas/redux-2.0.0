import { Post } from '~/features/posts/components/post'
import { renderWithStoreProvider, screen, waitForLoadingToFinish } from '~/test/test-utils'

describe('post component', () => {
  it('should render properly', async () => {
    renderWithStoreProvider(<Post id={1} />)

    await waitForLoadingToFinish()

    const postContainer = await screen.findByTestId('post-value')

    expect(postContainer.textContent).toBe('A sample post')
  })
})
