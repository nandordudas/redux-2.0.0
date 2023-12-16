import { type RenderOptions, cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { type PropsWithChildren, type ReactElement, Suspense } from 'react'
import { Provider } from 'react-redux'
import { afterEach } from 'vitest'
import { type AppStore, type RootState, setupStore } from '~/app/store'

afterEach(() => {
  cleanup()
})

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithStoreProvider(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <Suspense fallback={null}>
        <Provider store={store}>
          {children}
        </Provider>
      </Suspense>
    )
  }

  const rtl = render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  })

  return {
    store,
    ...rtl,
  }
}

export function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(() => {
    return [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)]
  }, { timeout: 4_000 })
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
