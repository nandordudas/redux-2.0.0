import { createSliceWithThunks } from '~/app/utils'
import { fetchCount } from '~/features/counter/counter.api'
import type { LoadingState } from '~/types'
import { isOdd } from '~/utils'

// 1. Define a type for the slice state
export interface CounterState {
  status: LoadingState
  value: number
}

export const counterSlice = createSliceWithThunks({
  // 2. Define the initial state using that type
  initialState: {
    status: 'idle',
    value: 0,
  } as CounterState,
  // 3. Define reducers name, it can be used as counterSlice.name
  name: 'counter',
  // 4. Define reducers and thunks for async actions
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
        rejected: (state) => {
          state.status = 'error'
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
  // 5. Define selectors
  selectors: {
    selectCount: state => state.value,
  },
})

// 6. Export actions
export const {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
} = counterSlice.actions

// 7. Export selectors
export const {
  selectCount,
} = counterSlice.selectors
