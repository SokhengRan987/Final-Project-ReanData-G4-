import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const peakTravelTime = createApi({
  reducerPath: "peakTravelTime",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["PeakTravelTime"],
  endpoints: (builder) => ({
    getPeakTravelTime: builder.query({
      query: () => "/rpc/get_peak_travel_time", 
      providesTags: ["PeakTravelTime"],
    }),
  }),
});

export const { useGetPeakTravelTimeQuery } = peakTravelTime;
