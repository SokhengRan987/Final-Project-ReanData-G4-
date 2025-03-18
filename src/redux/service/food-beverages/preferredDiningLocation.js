import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const preferredDiningLocation = createApi({
  reducerPath: "preferredDiningLocation",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", 
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["PreferredDiningLocation"],
  endpoints: (builder) => ({
    getPreferredDiningLocation: builder.query({
      query: () => "/rpc/get_preferred_dining_location", 
      providesTags: ["PreferredDiningLocation"],
    }),
  }),
});

export const { useGetPreferredDiningLocationQuery } = preferredDiningLocation;