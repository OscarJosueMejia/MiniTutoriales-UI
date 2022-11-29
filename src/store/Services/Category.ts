import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_BASE_URL}/category`}),

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
    getByIndex: builder.mutation({
        query: (params) => ({
          url: `byindex/${params.categoryId}`,
          method: 'get',
          headers: {
            apikey: process.env.REACT_APP_API_KEY,
          },
        })
      }),
    getByStatus: builder.mutation({
      query: (params) => ({
        url: `all/${params.status}`,
        method: 'get',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    add: builder.mutation({
      query: (params) => ({
        url: 'add',
        method: 'post',
        body:params,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    update: builder.mutation({
      query: (params) => ({
        url: `update/${params.categoryId}`,
        method: 'put',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    delete: builder.mutation({
      query: (params) => ({
        url: `delete/${params.categoryId}`,
        method: 'put',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
  }),
});

export const { useGetAllQuery} = categoryApi;