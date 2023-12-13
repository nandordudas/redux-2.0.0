import { Counter } from '~/features/counter/components/counter'
import { increment, incrementIfOdd } from '~/features/counter/counter.slice'
import { fireEvent, renderWithStoreProvider, screen } from '~/test/test-utils'
import { useAppDispatch } from '~/app/hooks'

vi.mock('~/app/hooks')

describe('counter slice', () => {
  const mockDispatch = vi.mocked(useAppDispatch())

  it('should increment the counter', async () => {
    renderWithStoreProvider(<Counter />)

    const incrementButton = await screen.findByRole('button', { name: /\+/i })
    const incrementIfOddButton = await screen.findByRole('button', { name: /add if odd/i })

    fireEvent.click(incrementButton)
    fireEvent.click(incrementIfOddButton)

    const expectedActions = [
      increment(),
      incrementIfOdd(2),
    ]

    expect(mockDispatch).toEqualActions(expectedActions)
  })
})
