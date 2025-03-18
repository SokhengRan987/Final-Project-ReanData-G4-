import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airportTraffic = createApi({
  reducerPath: "airportTraffic",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT, // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AirportTraffic"],
  endpoints: (builder) => ({
    getAirportTraffic: builder.query({
      query: () => "/rpc/get_airport_traffic_analyze", 
      providesTags: ["AirportTraffic"],
    }),
  }),
});

export const { useGetAirportTrafficQuery } = airportTraffic;
