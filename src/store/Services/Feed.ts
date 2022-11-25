import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_BASE_URL}/tutorial`}),

  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        url: 'all',
        method: 'get',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    feedForLogged: builder.query({
      query: () => ({
        url: `logged_user/6355bf4a972277413bb7ddca`,
        method: 'get',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    reaction: builder.mutation({
      query: (params) => ({
        url: `reaction/${params.tutorialId}`,
        method: 'put',
        body:params,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
  }),
});

export const { useGetAllQuery, useReactionMutation, useFeedForLoggedQuery } = feedApi;