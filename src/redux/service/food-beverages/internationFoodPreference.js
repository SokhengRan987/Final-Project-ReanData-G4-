import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const internationalFoodPreference = createApi({
  reducerPath: "internationalFoodPreference",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["InternationalFoodPreference"],
  endpoints: (builder) => ({
    getInternationalFoodPreference: builder.query({
      query: () => "/rpc/get_international_food_preference_by_frequency", 
      providesTags: ["InternationalFoodPreference"],
    }),
  }),
});

export const { useGetInternationalFoodPreferenceQuery } = internationalFoodPreference;
