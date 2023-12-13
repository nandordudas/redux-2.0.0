import { Counter } from '~/features/counter/components/counter'
import { counterSlice } from '~/features/counter/counter.slice'
import { fireEvent, renderWithStoreProvider, screen, waitFor } from '~/test/test-utils'
import { type AppStore, setupStore } from '~/app/store'

describe('counter component', () => {
  let store: AppStore

  beforeEach(() => {
    store = setupStore({
      counter: counterSlice.getInitialState(),
    })
  })

  describe('when rendered', () => {
    it('should render successfully', () => {
      renderWithStoreProvider(<Counter />)

      expect(screen.getByRole('heading', { name: /counter/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add if odd/i })).toBeInTheDocument()
    })
  })

  describe('when the buttons are clicked', () => {
    it('increment', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const countContainer = await screen.findByTestId('count')
      const incrementButton = await screen.findByRole('button', { name: /\+/i })

      fireEvent.click(incrementButton)

      expect(countContainer.textContent).toBe(store.getState().counter.value.toString())
    })

    it('should decrement the counter', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const countContainer = await screen.findByTestId('count')
      const decrementButton = await screen.findByRole('button', { name: /-/i })

      fireEvent.click(decrementButton)

      expect(countContainer.textContent).toBe(store.getState().counter.value.toString())
    })

    it('should add the amount', async () => {
      renderWithStoreProvider(<Counter />, { store })

      const countContainer = await screen.findByTestId('count')
      const addAmountButton = await screen.findByRole('button', { name: /add amount/i })

      fireEvent.click(addAmountButton)

      expect(countContainer.textContent).toBe(store.getState().counter.value.toString())
    })

    it('should add async', async () => {
      renderWithStoreProvider(<Counter />)

      const countContainer = await screen.findByTestId('count')
      const addAsyncButton = await screen.findByRole('button', { name: /add async/i })

      fireEvent.click(addAsyncButton)

      await waitFor(() => expect(countContainer.textContent).toBe('2'))
    })
  })
})
