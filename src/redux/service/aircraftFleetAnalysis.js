import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aircraftFleetAnalysis = createApi({
  reducerPath: "aircraftFleetAnalysis",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT, // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AircraftFleetAnalysis"],
  endpoints: (builder) => ({
    getAircraftFleetAnalysis: builder.query({
      query: () => "/rpc/get_aircraft_fleet_analysis", 
      providesTags: ["AircraftFleetAnalysis"],
    }),
  }),
});

export const { useGetAircraftFleetAnalysisQuery } = aircraftFleetAnalysis;
