import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const connectionAnalysis = createApi({
  reducerPath: "connectionAnalysis",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["ConnectionAnalysis"],
  endpoints: (builder) => ({
    getConnectionAnalysis: builder.query({
      query: () => "/rpc/get_connection_analysis", 
      providesTags: ["ConnectionAnalysis"],
    }),
  }),
});

export const { useGetConnectionAnalysisQuery } = connectionAnalysis;
