import { createApi } from '@reduxjs/toolkit/query/react';
import { tagIndiaBaseQuery } from '../app/apiBaseQuery';

export const TagIndiaAPI = createApi({
  reducerPath: 'TagIndiaAPI',
  baseQuery: tagIndiaBaseQuery,
  endpoints: (builder) => ({

    getGallery: builder.query({
      query: (page = 1) => `gallery?page=${page}`,
    }),
    getTeam: builder.query({
      query: (page = 1) => `tag-team?page=${page}`,
    }),
    getContentPage: builder.query({
      query: (slug) => `page-content?slug=${slug}`,
    }),

    getPageMenu: builder.query({
      query: () => `page-menu`,
    }),
    getHomePage: builder.query({
      query: () => `homepage`,
    }),

    getEscalationMatrix: builder.query({
      query: () => `contact`,
    }),
    getSettings: builder.query({
      query: () => `settings`,
      keepUnusedDataFor: 3600, // 1 hour
    }),
    submitQuery: builder.mutation({
      query: (formData) => ({
        url: `query-submit`,
        method: 'POST',
        body: formData,
      }),
    }),
    getServicesMenu: builder.query({
      query: () => `services`,
    }),
    getServicesContent: builder.query({
      query: (slug) => `service-content?slug=${slug}`,
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useGetTeamQuery,
  useGetContentPageQuery,
  useGetPageMenuQuery,
  useGetHomePageQuery,
  useGetEscalationMatrixQuery,
  useGetSettingsQuery,
  useSubmitQueryMutation,
  useGetServicesMenuQuery,
  useGetServicesContentQuery
} = TagIndiaAPI;