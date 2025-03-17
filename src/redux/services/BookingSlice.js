import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (params = {}) => {
        const { limit = 20, offset = 0, ...filterParams } = params;
        const queryParams = new URLSearchParams();

        queryParams.append("limit", String(limit));
        queryParams.append("offset", String(offset));

        const headers = {
          "Prefer": "count=exact",
        };

        const numericFields = ["booking_id", "account_id"];
        const stringFields = ["booking_ref", "email", "phone"];
        const timestampFields = ["update_ts"];
        const nullableNumericFields = ["price"];
        const nullableStringFields = ["booking_name"];

        // Handle global search
        if (filterParams.global) {
          const searchValue = String(filterParams.global).trim();
          const numericSearch = Number(searchValue);
          const stringSearch = `%${searchValue.replace(/[^a-zA-Z0-9@._-]/g, "")}%`; // Sanitize input
          const isTimestampLike = /^\d+\/\d+\/\d+/.test(searchValue); // Rough check for date-like input

          const orConditions = [
            ...(numericSearch && !isNaN(numericSearch)
              ? [...numericFields, ...nullableNumericFields].map(
                  (field) => `${field}.eq.${numericSearch}`
                )
              : []),
            ...(isTimestampLike
              ? timestampFields.map((field) => `${field}.eq.${searchValue}`)
              : stringFields.map((field) => `${field}.ilike.${stringSearch}`)),
          ].join(",");

          if (orConditions) {
            queryParams.append("or", `(${orConditions})`);
          }
          delete filterParams.global;
        }

        // Handle specific field filters
        Object.entries(filterParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            const cleanValue = String(value).trim();
            if (numericFields.includes(key)) {
              queryParams.append(key, `eq.${cleanValue}`);
            } else if (stringFields.includes(key)) {
              queryParams.append(key, `ilike.%${cleanValue.replace(/[^a-zA-Z0-9@._-]/g, "")}%`);
            } else if (timestampFields.includes(key)) {
              queryParams.append(key, `eq.${cleanValue}`);
            } else if (nullableNumericFields.includes(key)) {
              queryParams.append(key, cleanValue === "null" ? "is.null" : `eq.${cleanValue}`);
            } else if (nullableStringFields.includes(key)) {
              queryParams.append(key, cleanValue === "null" ? "is.null" : `ilike.%${cleanValue}%`);
            } else {
              queryParams.append(key, `eq.${cleanValue}`);
            }
          }
        });

        const queryString = queryParams.toString();
        console.log("Booking API Query:", `/booking?${queryString}`);

        return {
          url: `/booking?${queryString}`,
          headers: headers,
        };
      },
      transformResponse: (response, meta) => {
        const data = Array.isArray(response) ? response : [];
        let total = 0;
        const contentRange = meta?.response?.headers.get("Content-Range");
        if (contentRange) {
          const match = contentRange.match(/\d+-\d+\/(\d+)/);
          total = match && match[1] ? parseInt(match[1], 10) : data.length;
        } else {
          total = data.length;
        }

        return {
          data,
          total,
        };
      },
      transformErrorResponse: (response) => {
        console.error("Booking API Error:", response);
        return {
          status: response.status,
          message: response.data?.message || "Failed to fetch bookings",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ booking_id }) => ({
                type: "booking",
                id: booking_id,
              })),
              { type: "booking", id: "LIST" },
            ]
          : [{ type: "booking", id: "LIST" }],
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingApi;