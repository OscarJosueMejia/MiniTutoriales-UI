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
        url: `logged_user/638715a091b5ed67eddd8579`,
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
          userId:'638715a091b5ed67eddd8579'
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
    search: builder.query({
      query: (params:{search:string, userId:string}) => ({
        url: `custom/${params.search}`,
        method: 'get',
        params:{
          userId:params.userId
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
    AddComment: builder.mutation({
      query: (params:{userId:string, text:string, authorName:string, tutorialId:string}) => ({
        url: `comment/${params.tutorialId}`,
        method: 'put',
        body:params,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    DeleteComment: builder.mutation({
      query: (params:{commentId:string, tutorialId:string}) => ({
        url: `comment/remove/${params.tutorialId}/${params.commentId}`,
        method: 'put',
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
  useAddCommentMutation,
  useDeleteCommentMutation,
  useFeedForLoggedQuery, 
  useLazyFeedForLoggedQuery,
  useGetOneQuery, 
  useByUserQuery, 
  useLazyByUserQuery,
  useLazySearchQuery,
} = feedApi;