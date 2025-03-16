import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const diningMethod = createApi({
  reducerPath: "diningMethod",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", 
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["DiningMethod"],
  endpoints: (builder) => ({
    getDiningMethod: builder.query({
      query: () => "/rpc/get_dining_method_vs_recommendation",
      providesTags: ["DiningMethod"],
    }),
  }),
});

export const { useGetDiningMethodQuery } = diningMethod;
