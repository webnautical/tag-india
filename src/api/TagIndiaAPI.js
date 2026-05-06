import { createApi } from '@reduxjs/toolkit/query/react';
import { tagIndiaBaseQuery } from '../app/apiBaseQuery';

export const TagIndiaAPI = createApi({
  reducerPath: 'TagIndiaAPI',
  baseQuery: tagIndiaBaseQuery,
  endpoints: (builder) => ({

    getAllGallery: builder.query({
      query: () => `gallery`,
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
  useGetAllGalleryQuery,
  useCreateUserMutation,
} = TagIndiaAPI;