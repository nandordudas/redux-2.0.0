import { combineReducers } from '@reduxjs/toolkit'
import { counterSlice } from '~/features/counter/counter.slice'

export const reducer = combineReducers({
  [counterSlice.name]: counterSlice.reducer,
})
