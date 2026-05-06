import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TAG_INDIA_BASE_URL, TAP_BASE_URL } from './../helper/utils';

export const tagIndiaBaseQuery = fetchBaseQuery({
  baseUrl: TAG_INDIA_BASE_URL(),
});

export const tapBaseQuery = fetchBaseQuery({
  baseUrl: TAP_BASE_URL(),
});