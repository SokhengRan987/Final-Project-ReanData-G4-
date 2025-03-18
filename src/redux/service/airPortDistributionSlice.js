import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airPortDistributionApi = createApi({
  reducerPath: "airPortDistributionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT, // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AirportDistribution"],
  endpoints: (builder) => ({
    getAirPortDistribution: builder.query({
      query: () => "/rpc/get_airport_distribution", 
      providesTags: ["AirportDistribution"],
    }),
  }),
});

export const { useGetAirPortDistributionQuery } = airPortDistributionApi;
