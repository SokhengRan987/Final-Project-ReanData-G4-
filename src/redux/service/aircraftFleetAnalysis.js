import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aircraftFleetAnalysis = createApi({
  reducerPath: "aircraftFleetAnalysis",
  baseQuery: fetchBaseQuery({
    baseUrl: "", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AircraftFleetAnalysis"],
  endpoints: (builder) => ({
    getAircraftFleetAnalysis: builder.query({
      query: () => "/rpc/get_aircraft_fleet_analysis", // Matches the proxy path
      providesTags: ["AircraftFleetAnalysis"],
    }),
  }),
});

export const { useGetAircraftFleetAnalysisQuery } = aircraftFleetAnalysis;
