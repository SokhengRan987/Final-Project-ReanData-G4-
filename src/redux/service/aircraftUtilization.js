import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aircraftUtilization = createApi({
  reducerPath: "aircraftUtilization",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT, // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AircraftUtilization"],
  endpoints: (builder) => ({
    getAircraftUtilization: builder.query({
      query: () => "/rpc/get_airport_traffic_analyze", 
      providesTags: ["AircraftUtilization"],
    }),
  }),
});

export const { useGetAircraftUtilizationQuery } = aircraftUtilization;
