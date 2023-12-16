import type { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '~/app/store'

const mockUseDispatch = vi.fn<Parameters<typeof useDispatch>, AppDispatch>()
const mockUseSelector = vi.fn<Parameters<typeof useSelector>, TypedUseSelectorHook<RootState>>()

export const useAppDispatch = () => mockUseDispatch
export const useAppSelector = mockUseSelector
