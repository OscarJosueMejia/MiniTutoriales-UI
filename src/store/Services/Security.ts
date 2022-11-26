import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const securityApi = createApi({
  reducerPath: 'securityApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_KEY}/security`}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_BASE_URL,
        },
      })
    }),
    signin: builder.mutation({
      query: (credentials) => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_BASE_URL,
        },
      })
    }),
  }),
});

export const {useLoginMutation, useSigninMutation} = securityApi;