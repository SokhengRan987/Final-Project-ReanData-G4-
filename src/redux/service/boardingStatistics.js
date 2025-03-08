import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardingStatistics = createApi({
  reducerPath: "boardingStatistics",
  baseQuery: fetchBaseQuery({
    baseUrl: "", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["BoardingStatistics"],
  endpoints: (builder) => ({
    getBoardingStatistics: builder.query({
      query: () => "/rpc/get_boarding_statistics", // Matches the proxy path
      providesTags: ["BoardingStatistics"],
    }),
  }),
});

export const { useGetBoardingStatisticsQuery } = boardingStatistics;
