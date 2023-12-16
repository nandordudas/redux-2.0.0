import { setupServer } from 'msw/node'

import { handlers, state } from '~/mocks/handlers'

export function mockServer() {
  const server = setupServer(...handlers)

  return { server, state }
}

export function useMockServer() {
  const { server } = mockServer()

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())

  server.events.on('request:start', ({ request }) => {
    // eslint-disable-next-line no-console
    console.log('MSW intercepted:', request.method, request.url)
  })

  return { server }
}
