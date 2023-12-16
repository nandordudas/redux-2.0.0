import { createEntityAdapter } from '@reduxjs/toolkit'
import { HttpResponse, delay, http } from 'msw'

const adapter = createEntityAdapter<Entities.Post>()

// eslint-disable-next-line import/no-mutable-exports
let state = adapter.getInitialState()

state = adapter.setAll(state, [
  { fetchedAt: new Date().toUTCString(), id: 1, name: 'A sample post' },
  { fetchedAt: new Date().toUTCString(), id: 2, name: 'A post about rtk-query' },
])

export { state }

export const handlers = [
  http.get<{ id: string }>('/api/posts/:id', async ({ params }) => {
    const { id: idParam } = params
    const id = Number.parseInt(idParam, 10)

    state = adapter.updateOne(state, {
      changes: { fetchedAt: new Date().toUTCString() },
      id,
    })

    await delay(500)

    return HttpResponse.json(state.entities[id])
  }),
]
