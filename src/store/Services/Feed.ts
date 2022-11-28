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
      query: (page) => ({
        url: `logged_user/6355bf4a972277413bb7ddca`,
        method: 'get',
        params:{
          page,
          items:5
        },
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    getOne: builder.query({
      query: (tutorialId) => ({
        url: `one/${tutorialId}`,
        method: 'get',
        params:{
          userId:'6355bf4a972277413bb7ddca'
        },
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    byUser: builder.query({
      query: (params:{userId:string, page:number}) => ({
        url: `list/${params.userId}`,
        method: 'get',
        params:{
          page:params.page,
          items:10
        },
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

export const { 
  useGetAllQuery, 
  useReactionMutation, 
  useFeedForLoggedQuery, 
  useLazyFeedForLoggedQuery,
  useGetOneQuery, 
  useByUserQuery, 
  useLazyByUserQuery} = feedApi;