import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chohortAnalysis = createApi({
  reducerPath: "chohortAnalysis",
  baseQuery: fetchBaseQuery({
    baseUrl: "", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["ChohortAnalysis"],
  endpoints: (builder) => ({
    getChohortAnalysis: builder.query({
      query: () => "/rpc/get_cohort_analysis", // Matches the proxy path
      providesTags: ["ChohortAnalysis"],
    }),
  }),
});

export const { useGetChohortAnalysisQuery } = chohortAnalysis;
