import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const preferredCuisineFrequency = createApi({
  reducerPath: "preferredCuisineFrequency",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["PreferredCuisineFrequency"],
  endpoints: (builder) => ({
    getPreferredCuisineFrequency: builder.query({
      query: () => "/rpc/get_preferred_cuisine_frequency", 
      providesTags: ["PreferredCuisineFrequency"],
    }),
  }),
});

export const { useGetPreferredCuisineFrequencyQuery } = preferredCuisineFrequency;