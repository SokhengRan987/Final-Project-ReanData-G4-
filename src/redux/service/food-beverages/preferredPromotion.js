import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const preferredPromotion = createApi({
  reducerPath: "preferredPromotion",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["getPreferredPromotion"],
  endpoints: (builder) => ({
    getPreferredPromotion: builder.query({
      query: () => "/rpc/get_preferred_promotions", 
      providesTags: ["getPreferredPromotion"],
    }),
  }),
});

export const { useGetPreferredPromotionQuery } = preferredPromotion;