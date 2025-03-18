import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const preferredPromotion = createApi({
  reducerPath: "preferredPromotion",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", 
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["PreferredPromotion"],
  endpoints: (builder) => ({
    getPreferredPromotion: builder.query({
      query: () => "/rpc/get_preferred_promotions", 
      providesTags: ["PreferredPromotion"],
    }),
  }),
});

export const { useGetPreferredPromotionQuery } = preferredPromotion;