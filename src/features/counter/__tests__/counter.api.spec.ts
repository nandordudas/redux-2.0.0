import { fetchCount } from '~/features/counter/counter.api'

describe('counter api', () => {
  it('should return proper value when amount is set', async () => {
    const result = await fetchCount(1)

    expect(result).toEqual({ data: 1 })
  })
})
