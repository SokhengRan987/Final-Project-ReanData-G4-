import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timeBaseAnalysis = createApi({
  reducerPath: "timeBaseAnalysis",
  baseQuery: fetchBaseQuery({
    baseUrl: "", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["TimeBaseAnalysis"],
  endpoints: (builder) => ({
    getTimeBaseAnalysis: builder.query({
      query: () => "/rpc/get_time_based_analysis", 
      providesTags: ["TimeBaseAnalysis"],
    }),
  }),
});

export const { useGetTimeBaseAnalysisQuery } = timeBaseAnalysis;
