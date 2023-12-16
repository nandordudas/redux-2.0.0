import { type CSSProperties, type ChangeEventHandler, useState } from 'react'

import { useAppDispatch, useAppSelector } from '~/app/hooks'
import * as counterSlice from '~/features/counter/counter.slice'

interface CounterProps {
  incrementAmount?: number | undefined
}

const DEFAULT_INCREMENT_AMOUNT = 2

const counterContainerStyle: CSSProperties = {
  display: 'grid',
  gap: '1rem',
}

export function Counter({
  incrementAmount: defaultIncrementAmount = DEFAULT_INCREMENT_AMOUNT,
}: CounterProps) {
  const dispatch = useAppDispatch()
  const count = useAppSelector(counterSlice.selectCount)

  const [incrementAmount, setIncrementAmount] = useState(defaultIncrementAmount)

  const decrementValue = () => dispatch(counterSlice.decrement())
  const incrementValue = () => dispatch(counterSlice.increment())
  const incrementValueByAmount = () => dispatch(counterSlice.incrementByAmount(incrementAmount))
  const incrementValueByAmountAsync = () => dispatch(counterSlice.incrementAsync(incrementAmount))
  const incrementValueIfOdd = () => dispatch(counterSlice.incrementIfOdd(incrementAmount))

  const handleChangeIncrementAmount: ChangeEventHandler<HTMLInputElement> = event =>
    setIncrementAmount(event.target.valueAsNumber)

  return (
    <div>
      <h2>Counter</h2>

      <div style={counterContainerStyle}>
        <input
          aria-label="Set increment amount"
          max="10"
          min="-10"
          onChange={handleChangeIncrementAmount}
          style={{ padding: '0.5rem' }}
          type="number"
          value={incrementAmount}
        />
        <button onClick={incrementValue} aria-label="Increment value">
          +
        </button>
        <span data-testid="count">
          {count}
        </span>
        <button onClick={decrementValue} aria-label="Decrement value">
          -
        </button>
        <button onClick={incrementValueByAmount}>
          Add amount
          {' '}
          {incrementAmount}
        </button>
        <button onClick={incrementValueByAmountAsync}>
          Add async
        </button>
        <button onClick={incrementValueIfOdd}>
          Add if odd
        </button>
      </div>
    </div>
  )
}

Counter.defaults = {
  incrementAmount: DEFAULT_INCREMENT_AMOUNT,
} as const
