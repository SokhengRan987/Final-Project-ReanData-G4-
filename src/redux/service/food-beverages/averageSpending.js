import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const averageSpending = createApi({
  reducerPath: "averageSpending",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", 
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AverageSpending"],
  endpoints: (builder) => ({
    getAverageSpending: builder.query({
      query: () => "/rpc/get_spending_vs_value_priority",
      providesTags: ["AverageSpending"],
    }),
  }),
});

export const { useGetAverageSpendingQuery } = averageSpending  ;
