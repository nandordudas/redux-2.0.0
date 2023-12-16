import type { ComponentProps } from 'react'

import { type AppStore, setupStore } from '~/app/store'
import { Counter } from '~/features/counter/components/counter'
import { fetchCount } from '~/features/counter/counter.api'
import { selectCount } from '~/features/counter/counter.slice'
import { fireEvent, renderWithStoreProvider, screen, userEvent, waitFor } from '~/test/test-utils'

vi.mock('~/features/counter/counter.api')

const counterProps: ComponentProps<typeof Counter> = {
  incrementAmount: 4,
}

describe('counter component', () => {
  let store: AppStore

  beforeEach(() => {
    store = setupStore()
  })

  it('should render successfully', () => {
    renderWithStoreProvider(<Counter />)

    expect(screen.getByRole('heading', { name: /counter/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add if odd/i })).toBeInTheDocument()
  })

  describe('when the buttons are clicked', () => {
    it('should increment the counter when button clicked', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const countContainer = await screen.findByTestId('count')
      const incrementButton = await screen.findByRole('button', { name: /increment value/i })

      fireEvent.click(incrementButton)

      const count = selectCount(store.getState())

      expect(count).toBe(1)
      expect(Number(countContainer.textContent)).toBe(count)
    })

    it('should decrement the counter when button clicked', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const countContainer = await screen.findByTestId('count')
      const decrementButton = await screen.findByRole('button', { name: /decrement value/i })

      fireEvent.click(decrementButton)

      const count = selectCount(store.getState())

      expect(count).toBe(-1)
      expect(Number(countContainer.textContent)).toBe(count)
    })

    it('should add the amount with default increment value', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const countContainer = await screen.findByTestId('count')
      const addAmountButton = await screen.findByRole('button', { name: /add amount/i })

      fireEvent.click(addAmountButton)

      const count = selectCount(store.getState())

      expect(count).toBe(Counter.defaults.incrementAmount)
      expect(Number(countContainer.textContent)).toBe(count)
    })

    it('should add the amount with given increment value', async () => {
      renderWithStoreProvider(<Counter {...counterProps} />, { store })

      const countContainer = await screen.findByTestId('count')
      const addAmountButton = await screen.findByRole('button', { name: /add amount/i })

      fireEvent.click(addAmountButton)

      const count = selectCount(store.getState())

      expect(count).toBe(counterProps.incrementAmount)
      expect(Number(countContainer.textContent)).toBe(count)
    })

    it('should change the increment amount when input value changed', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const incrementAmountInput = await screen.findByRole<HTMLInputElement>('spinbutton')

      fireEvent.change(incrementAmountInput, { target: { value: counterProps.incrementAmount } })

      expect(incrementAmountInput.valueAsNumber).toBe(counterProps.incrementAmount)
    })

    it('should add the amount asynchronously when button clicked', async () => {
      renderWithStoreProvider(<Counter {...counterProps} />)

      const countContainer = await screen.findByTestId('count')
      const addAsyncButton = await screen.findByRole('button', { name: /add async/i })

      vi.mocked(fetchCount).mockResolvedValueOnce({ data: 4 })
      fireEvent.click(addAsyncButton)

      await waitFor(() => expect(Number(countContainer.textContent)).toBe(counterProps.incrementAmount))
    })

    // TODO: fix this test because it's not working as expected when the fetchCount is rejected; coverage affected also
    it.todo('should reject the fetchCount ', async () => {
      vi.mocked(fetchCount).mockRejectedValueOnce(new Error('rejected'))
      renderWithStoreProvider(<Counter />)

      const incrementAsyncButton = await screen.findByRole('button', { name: /add async/i })

      await userEvent.click(incrementAsyncButton)

      expect(fetchCount).toBeCalledTimes(1)
      expect(store.getState().counter.status).toBe('failed')
    })

    it('should add the amount if odd when button clicked', async () => {
      renderWithStoreProvider(<Counter {...counterProps} />, { store })

      const countContainer = await screen.findByTestId('count')
      const incrementButton = await screen.findByRole('button', { name: /increment value/i })
      const addIfOddButton = await screen.findByRole('button', { name: /add if odd/i })

      fireEvent.click(incrementButton)
      fireEvent.click(addIfOddButton)

      const count = selectCount(store.getState())

      expect(count).toBe(5)
      expect(Number(countContainer.textContent)).toBe(count)
    })
  })
})
