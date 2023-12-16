import { type Action, type ThunkAction, configureStore } from '@reduxjs/toolkit'

import { reducer } from '~/app/reducer'
import { postApi } from '~/app/services/post'

export function setupStore(preloadedState: Partial<RootState> = {}) {
  const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),
    preloadedState,
    reducer,
  })

  return store
}

export const store = setupStore()

type ExtraThunkArg = unknown

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, ExtraThunkArg, Action>
