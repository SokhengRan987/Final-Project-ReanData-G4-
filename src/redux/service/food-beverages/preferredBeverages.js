import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const preferredBeverages = createApi({
  reducerPath: "preferredBeverages",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", 
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["PreferredBeverages"],
  endpoints: (builder) => ({
    getPreferredBeverages: builder.query({
      query: () => "/rpc/get_preferred_beverages_by_occupation", 
      providesTags: ["PreferredBeverages"],
    }),
  }),
});

export const { useGetPreferredBeveragesQuery } = preferredBeverages;