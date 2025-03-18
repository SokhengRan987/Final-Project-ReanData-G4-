import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eatingOut = createApi({
  reducerPath: "eatingOut",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["EatingOut"],
  endpoints: (builder) => ({
    getEatingOut: builder.query({
      query: () => "/rpc/get_eating_out_frequency_by_age", 
      providesTags: ["GenderDisEatingOuttribution"],
    }),
  }),
});

export const { useGetEatingOutQuery } = eatingOut;
