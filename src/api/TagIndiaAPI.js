import { createApi } from '@reduxjs/toolkit/query/react';
import { tagIndiaBaseQuery } from '../app/apiBaseQuery';

export const TagIndiaAPI = createApi({
  reducerPath: 'TagIndiaAPI',
  baseQuery: tagIndiaBaseQuery,
  endpoints: (builder) => ({

    getGallery: builder.query({
      query: (page = 1) => `gallery?page=${page}`,
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: `api/createUser`,
        method: 'POST',
        body,
      }),
    }),

  }),
});

export const {
  useGetGalleryQuery,
  useCreateUserMutation,
} = TagIndiaAPI;