import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const routePopularity = createApi({
  reducerPath: "routePopularity",
  baseQuery: fetchBaseQuery({
    baseUrl: "", // Empty since we're using the proxy
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["RoutePopularity"],
  endpoints: (builder) => ({
    getRoutePopularity: builder.query({
      query: () => "/rpc/get_route_popularity?limit=1&offset=0", 
      providesTags: ["RoutePopularity"],
    }),
  }),
});

export const { useGetRoutePopularityQuery } = routePopularity;
