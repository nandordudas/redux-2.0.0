import { combineReducers } from '@reduxjs/toolkit'

import { counterSlice } from '~/features/counter/counter.slice'

import { postApi } from './services/post'

export const reducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
  [postApi.reducerPath]: postApi.reducer,
})
