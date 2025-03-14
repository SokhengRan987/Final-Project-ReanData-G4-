import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genderDistribution = createApi({
  reducerPath: "genderDistribution",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["GenderDistribution"],
  endpoints: (builder) => ({
    getGenderDistribution: builder.query({
      query: () => "/rpc/get_gender_distribution", 
      providesTags: ["GenderDistribution"],
    }),
  }),
});

export const { useGetGenderDistributionQuery } = genderDistribution;
