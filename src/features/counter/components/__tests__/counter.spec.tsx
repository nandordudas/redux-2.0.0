import type { ComponentProps } from 'react'
import { type AppStore, setupStore } from '~/app/store'
import * as counterApi from '~/features/counter/counter.api'
import { selectCount } from '~/features/counter/counter.slice'
import { Counter } from '~/features/counter/components/counter'
import { fireEvent, renderWithStoreProvider, screen, waitFor } from '~/test/test-utils'

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
      const incrementButton = await screen.findByRole('button', { name: /\+/i })

      fireEvent.click(incrementButton)

      const count = selectCount(store.getState())

      expect(count).toBe(1)
      expect(Number(countContainer.textContent)).toBe(count)
    })

    it('should decrement the counter when button clicked', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const countContainer = await screen.findByTestId('count')
      const decrementButton = await screen.findByRole('button', { name: /-/i })

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

      fireEvent.click(addAsyncButton)

      await waitFor(() => expect(Number(countContainer.textContent)).toBe(counterProps.incrementAmount))
    })

    it('should reject the fetchCount ', async () => {
      renderWithStoreProvider(<Counter />)

      vi.spyOn(counterApi, 'fetchCount').mockRejectedValueOnce(new Error('mock error'))

      const incrementAsyncButton = await screen.findByRole('button', { name: /add async/i })

      fireEvent.click(incrementAsyncButton)
    })

    it('should add the amount if odd when button clicked', async () => {
      renderWithStoreProvider(<Counter {...counterProps} />, { store })

      const countContainer = await screen.findByTestId('count')
      const incrementButton = await screen.findByRole('button', { name: /\+/i })
      const addIfOddButton = await screen.findByRole('button', { name: /add if odd/i })

      fireEvent.click(incrementButton)
      fireEvent.click(addIfOddButton)

      const count = selectCount(store.getState())

      expect(count).toBe(5)
      expect(Number(countContainer.textContent)).toBe(count)
    })
  })
})
