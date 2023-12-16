import { combineReducers } from '@reduxjs/toolkit'

import { postApi } from '~/app/services/post'
import { counterSlice } from '~/features/counter/counter.slice'

export const reducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [postApi.reducerPath]: postApi.reducer,
})
