import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const creatorApi = createApi({
  reducerPath: 'creatorApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_BASE_URL}/tutorial`}),

  endpoints: (builder) => ({
    uploadContent: builder.mutation({
      query: (body) => ({
        url: `add/${body.userId}`,
        method: 'post',
        body,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
  }),
});

export const { useUploadContentMutation } = creatorApi;