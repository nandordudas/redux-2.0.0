import type { PayloadAction } from '@reduxjs/toolkit'
import type { MockedFunction } from 'vitest'

import { useMockServer } from '~/mocks/mock-server'

import '@testing-library/jest-dom/vitest'

useMockServer()

interface CustomMatchers<R = unknown> {
  toEqualActions(actions: PayloadAction<any>[]): R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toEqualActions(received: MockedFunction<any>, expected: PayloadAction[]) {
    const receivedActions = received.mock.calls.flat()
    const expectedActions = expected.map(expect.objectContaining)

    return {
      message: () => `the expected actions do not match \n\n${this.utils.diff(expectedActions, receivedActions)}` ?? '',
      pass: this.equals(expectedActions, receivedActions),
    }
  },
})
