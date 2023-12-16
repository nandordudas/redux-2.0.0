import type { PayloadAction } from '@reduxjs/toolkit'

import { useAppDispatch } from '~/app/hooks'
import { Counter } from '~/features/counter/components/counter'
import { decrement, increment, incrementIfOdd } from '~/features/counter/counter.slice'
import { fireEvent, renderWithStoreProvider, screen } from '~/test/test-utils'

// 1. Call vi.mock('~/app/hooks') to mock the hooks
vi.mock('~/app/hooks')

describe('counter slice', () => {
  // 2. Arrange the mock dispatch to be called with the correct actions
  const mockDispatch = vi.mocked(useAppDispatch())

  it('should increment the counter', async () => {
    renderWithStoreProvider(<Counter />)

    const decrementButton = await screen.findByRole('button', { name: /decrement value/i })
    const incrementButton = await screen.findByRole('button', { name: /increment value/i })
    const incrementIfOddButton = await screen.findByRole('button', { name: /add if odd/i })

    fireEvent.click(incrementButton)
    fireEvent.click(incrementIfOddButton)

    // 3. Act dispatching the actions
    const expectedActions = [
      increment(),
      incrementIfOdd(Counter.defaults.incrementAmount),
    ] satisfies PayloadAction<any>[]

    // 4. Assert dispatch was called with the correct actions
    expect(mockDispatch).toEqualActions(expectedActions)

    fireEvent.click(decrementButton)

    expect(mockDispatch).toHaveBeenLastCalledWith(decrement())
    expect(mockDispatch).toEqualActions([...expectedActions, decrement()])
  })
})
