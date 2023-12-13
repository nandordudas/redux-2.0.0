import type { PayloadAction } from '@reduxjs/toolkit'
import '@testing-library/jest-dom/vitest'

interface CustomMatchers<R = unknown> {
  toEqualActions(divisor: PayloadAction<any>[]): R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toEqualActions(received: any, expected: PayloadAction[]) {
    const receivedActions = received.mock.calls.flat()
    const expectedActions = expected.map(expect.objectContaining)
    const pass = this.equals(receivedActions, expectedActions)

    if (pass) {
      return {
        message: () => `expected ${this.utils.printReceived(receivedActions)} not to equal ${this.utils.printExpected(expectedActions)}`,
        pass: true,
      }
    }

    return {
      message: () => `expected ${this.utils.printReceived(receivedActions)} to equal ${this.utils.printExpected(expectedActions)}`,
      pass: false,
    }
  },
})
