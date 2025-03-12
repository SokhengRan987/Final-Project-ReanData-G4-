import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fbApi = createApi({
  reducerPath: "fbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT2, // Ensure this is defined in your .env file
  }),
  endpoints: (builder) => ({
    getAllFb: builder.query({
      query: ({ limit = 20, offset = 0 } = {}) =>
        `/responses?limit=${limit}&offset=${offset}`,
      // Transform the response to ensure consistent structure
      transformResponse: (response) => {
        return {
          data: response.data || response || [], // Handle various response shapes
          total: response.total || 0, // Expect total from API, default to 0 if not provided
        };
      },
      // Optional: Handle errors
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || "Failed to fetch bookings",
        };
      },
    }),
  }),
});

export const { useGetAllFbQuery } = fbApi;