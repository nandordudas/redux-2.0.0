import { createSliceWithThunks } from '~/app/utils'
import type { LoadingState } from '~/types'
import { isOdd } from '~/utils'

import { fetchCount } from './counter.api'

export interface CounterState {
  status: LoadingState
  value: number
}

export const counterSlice = createSliceWithThunks({
  initialState: {
    status: 'idle',
    value: 0,
  } as CounterState,
  name: 'counter',
  reducers: ({ asyncThunk, reducer }) => ({
    decrement: reducer((state) => {
      state.value += -1
    }),
    increment: reducer((state) => {
      state.value += 1
    }),
    incrementAsync: asyncThunk<number, number>(
      async (amount) => {
        const response = await fetchCount(amount)

        return response.data
      },
      {
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.value += action.payload
        },
        pending: (state) => {
          state.status = 'loading'
        },
        rejected: (state, action) => {
          state.status = 'failed'

          console.error(action.payload ?? action.error)
        },
        settled: (state) => {
          state.status = 'idle'
        },
      },
    ),
    incrementByAmount: reducer<number>((state, action) => {
      state.value += action.payload
    }),
    incrementIfOdd: reducer<number>((state, action) => {
      const currentValue = state.value

      if (isOdd(currentValue))
        state.value += action.payload
    }),
  }),
  selectors: {
    selectCount: state => state.value,
  },
})

export const {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
} = counterSlice.actions

export const {
  selectCount,
} = counterSlice.selectors
