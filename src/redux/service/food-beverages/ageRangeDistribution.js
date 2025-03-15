import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ageRangeDistribution = createApi({
  reducerPath: "ageRangeDistribution",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AgeRangeDistribution"],
  endpoints: (builder) => ({
    getAgeRangeDistribution: builder.query({
      query: () => "/rpc/get_age_range_distribution",
      providesTags: ["AgeRangeDistribution"],
    }),
  }),
});

export const { useGetAgeRangeDistributionQuery } = ageRangeDistribution;
