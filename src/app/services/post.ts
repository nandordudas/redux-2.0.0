import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Post } from '~/types'

export const postApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.MODE !== 'test' ? '/api' : new URL('/api', location.origin).href,
  }),
  endpoints: build => ({
    getPost: build.query<Post, number>({
      providesTags: (_result, _error, id) => [{ id, type: 'Posts' }],
      query: id => `posts/${id}`,
    }),
  }),
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
})

export const { useGetPostQuery } = postApi
