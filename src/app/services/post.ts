import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type PostResponse = Entities.Post
type PostId = Entities.Post['id']

export const postApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.MODE !== 'test' ? '/api' : new URL('/api', location.origin).href,
  }),
  endpoints: build => ({
    getPost: build.query<PostResponse, PostId>({
      providesTags: (_result, _error, id) => [{ id, type: 'Posts' }],
      query: id => `posts/${id}`,
    }),
  }),
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
})

export const { useGetPostQuery } = postApi
