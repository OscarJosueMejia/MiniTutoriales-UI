import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_BASE_URL}/category`}),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        url: 'all',
        method: 'get',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      providesTags: ["Category"]
    }),
    getByIndex: builder.query({
        query: (params) => ({
          url: `byindex/${params.categoryId}`,
          method: 'get',
          headers: {
            apikey: process.env.REACT_APP_API_KEY,
          },
        }),
        providesTags: ["Category"]
      }),
    getByStatus: builder.query({
      query: (params) => ({
        url: `all/${params.status}`,
        method: 'get',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      providesTags: ["Category"]
    }),
    add: builder.mutation({
      query: (params) => ({
        url: 'add',
        method: 'post',
        body:params,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Category"]
    }),
    update: builder.mutation({
      query: (params) => ({
        url: `update/${params.categoryId}`,
        method: 'put',
        body:params,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Category"]
    }),
    delete: builder.mutation({
      query: (params) => ({
        url: `delete/${params.categoryId}`,
        method: 'put',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
      invalidatesTags: ["Category"]
    }),
  }),
});

export const { useGetAllQuery, useAddMutation, useGetByIndexQuery, useDeleteMutation, useGetByStatusQuery, useUpdateMutation} = categoryApi;