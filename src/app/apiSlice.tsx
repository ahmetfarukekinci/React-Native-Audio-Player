import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { Values } from "../screens/LogInScreen";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nox-podcast-api.vercel.app/",
    prepareHeaders: async (headers, { getState }) => {
      // console.log('getState', getState);
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: "login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        };
      },
    }),
    getPodcastList: builder.mutation({
      query: (data) => {
        return {
          url: `search?${data}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLogInMutation, useGetPodcastListMutation } = apiSlice;
