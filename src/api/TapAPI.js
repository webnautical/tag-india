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


    getSectors: builder.query({
      query: () => `sector`,       // GET /api/sector
    }),

    // 👇 Add the Assessors endpoint which expects `ssc_code`
    getAssessors: builder.query({
      query: (ssc_code) => `assessors-tagindia?ssc_code=${ssc_code}`,
    }),

  }),
});

export const {
  useGetProductsQuery,
  useGetSectorsQuery,     
  useGetAssessorsQuery,
} = TapAPI;