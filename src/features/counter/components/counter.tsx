import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '~/app/hooks'
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from '~/features/counter/counter.slice'

export function Counter() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)

  const [incrementAmount, setIncrementAmount] = useState(2)

  const incrementValue = () => dispatch(increment())
  const decrementValue = () => dispatch(decrement())
  const incrementValueByAmount = () => dispatch(incrementByAmount(incrementAmount))
  const incrementValueByAmountAsync = () => dispatch(incrementAsync(incrementAmount))
  const incrementValueIfOdd = () => dispatch(incrementIfOdd(incrementAmount))

  return (
    <div>
      <h2>Counter</h2>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <input
          value={incrementAmount}
          onChange={event => setIncrementAmount(event.target.valueAsNumber)}
          type="number"
          inputMode="numeric"
          min="-10"
          max="10"
          style={{ padding: '0.5rem' }}
        />
        <button onClick={incrementValue}>
          +
        </button>
        <span data-testid="count">
          {count}
        </span>
        <button onClick={decrementValue}>
          -
        </button>
        <button onClick={incrementValueByAmount}>
          Add Amount
        </button>
        <button onClick={incrementValueByAmountAsync}>
          Add Async
        </button>
        <button onClick={incrementValueIfOdd}>
          Add If Odd
        </button>
      </div>
    </div>
  )
}
