import { createApi } from '@reduxjs/toolkit/query/react';
import { tapBaseQuery } from '../app/apiBaseQuery';

export const TapAPI = createApi({
  reducerPath: 'TapAPI',
  baseQuery: tapBaseQuery,
  endpoints: (builder) => ({

    // GET example
    getProducts: builder.query({
      query: () => `api/getProducts`,
    }),

  }),
});

export const {
  useGetProductsQuery,
} = TapAPI;