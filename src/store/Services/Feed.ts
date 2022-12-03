import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from "../store";

const ITEMS_PER_PAGE = 10;

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery(
    {baseUrl: `${process.env.REACT_APP_API_BASE_URL}/tutorial`,
    prepareHeaders: (headers, {getState}) =>{
      const token = (getState() as RootState).sec.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
  }),
  tagTypes: ["Feed"],
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
      query: (params:{page:number, userId:string}) => ({
        url: `logged_user/${params.userId}`,
        method: 'get',
        params:{
          page:params.page,
          items:ITEMS_PER_PAGE
        },
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      providesTags: ["Feed"]
    }),
    getOne: builder.query({
      query: (params:{tutorialId:string, userId:string}) => ({
        url: `one/${params.tutorialId}`,
        method: 'get',
        params:{
          userId:params.userId
        },
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      providesTags: ["Feed"]
    }),
    byUser: builder.query({
      query: (params:{userId:string, page:number, mode:'LIKED'|'LIST', currentUserLogged?:string}) => ({
        url: `list/${params.userId}/${params.mode}/${params.currentUserLogged}`,
        method: 'get',
        params:{
          page:params.page,
          items:ITEMS_PER_PAGE
        },
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      providesTags: ["Feed"]
    }),
    byCategory: builder.query({
      query: (params:{categoryId:string, currentUserLogged?:string, page:number}) => ({
        url: `byCategory/${params.categoryId}/${params.currentUserLogged}`,
        method: 'get',
        params:{
          page:params.page,
          items:ITEMS_PER_PAGE
        },
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      providesTags: ["Feed"]
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
        keepUnusedDataFor: 1,
      }),
      providesTags: ["Feed"]
    }),
    reaction: builder.mutation({
      query: (params) => ({
        url: `reaction/${params.tutorialId}`,
        method: 'put',
        body:params,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Feed"]
    }),
    AddComment: builder.mutation({
      query: (params:{userId:string, text:string, authorName:string, tutorialId:string}) => ({
        url: `comment/${params.tutorialId}`,
        method: 'put',
        body:params,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Feed"]
    }),
    DeleteComment: builder.mutation({
      query: (params:{commentId:string, tutorialId:string}) => ({
        url: `comment/remove/${params.tutorialId}/${params.commentId}`,
        method: 'put',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Feed"]
    }),
    deleteTutorial: builder.mutation({
      query: (tutorialId:string) => ({
        url: `delete/${tutorialId}`,
        method: 'delete',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Feed"]
    }),

    uploadContent: builder.mutation({
      query: (body) => ({
        url: `add/${body.userId}`,
        method: 'post',
        body,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Feed"]
    }),
    updateContent: builder.mutation({
      query: (body) => ({
        url: `update/${body.tutorialId}`,
        method: 'put',
        body,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Feed"]
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
  useDeleteTutorialMutation,
  useByUserQuery, 
  useByCategoryQuery,
  useSearchQuery,
  useLazyByUserQuery,
  useLazySearchQuery,

  useUploadContentMutation, useUpdateContentMutation
} = feedApi;