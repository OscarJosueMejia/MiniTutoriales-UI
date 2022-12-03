import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const securityApi = createApi({
  reducerPath: "securityApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_BASE_URL}/user` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
    }),
    signin: builder.mutation({
      query: (credentials) => ({
        url: "signin",
        method: "POST",
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    verifyAccount: builder.mutation({
      query: (credentials) => ({
        url: 'verifyAccount',
        method: 'POST',
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
    }),
    getRecoveryPin: builder.mutation({
      query: (credentials) => ({
        url: "generaterecoverypin",
        method: "POST",
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
    }),
    verifyRecoveryPin: builder.mutation({
      query: (credentials) => ({
        url: "verifyrecoverypin",
        method: "POST",
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
    }),
    recoveryChangePassword: builder.mutation({
      query: (credentials) => ({
        url: "recoverychangepassword",
        method: "POST",
        body: credentials,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }),
    }),
    changePass: builder.mutation({
      query: (credentials) => ({
        url: `changePassword`,
        method: 'POST',
        body:credentials,
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    getAll: builder.query({
      query: () => ({
        url: 'all',
        method: 'getALL',
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
    getById: builder.query({
      query: (id) => ({
        url: `profile/${id}`,
        method: 'get',
        params:{
          id:'638715a091b5ed67eddd8579'
        },
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      })
    }),
  }),
});

export const { useLoginMutation, useSigninMutation, useGetRecoveryPinMutation, useVerifyRecoveryPinMutation, useRecoveryChangePasswordMutation, useVerifyAccountMutation,useChangePassMutation, useGetAllQuery } = securityApi;
