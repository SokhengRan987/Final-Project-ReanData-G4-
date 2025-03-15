import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const passengerApi = createApi({
  reducerPath: "passengerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT, // Ensure this is defined in your .env file
  }),
  endpoints: (builder) => ({
    getAllPassengers: builder.query({
      query: (params = {}) => {
        const { limit = 20, offset = 0, ...filterParams } = params;
        const queryParams = new URLSearchParams();

        // Add pagination parameters
        queryParams.append("limit", String(limit));
        queryParams.append("offset", String(offset));

        // Add proper count header for PostgREST
        const headers = {
          "Prefer": "count=exact",
        };

        // Define field types based on the passenger response schema
        const numericFields = ["passenger_id", "booking_id", "age"]; // Integers
        const stringFields = [
          "booking_ref",
          "passenger_no",
          "first_name",
          "last_name",
          "account_id",
        ]; // Strings (account_id and passenger_no can be null, treated as strings)
        const timestampFields = ["update_ts"]; // Timestamps

        // Handle global search across multiple columns
        if (filterParams.global) {
          const searchValue = filterParams.global;
          const numericSearch = Number(searchValue); // Try converting to number
          const stringSearch = `%${searchValue}%`;

          const orConditions = [
            // Numeric fields: use eq if searchValue is a number
            ...(numericSearch && !isNaN(numericSearch)
              ? numericFields.map((field) => `${field}.eq.${numericSearch}`)
              : []),
            // String fields: use ilike
            ...stringFields.map((field) => `${field}.ilike.${stringSearch}`),
            // Timestamp fields: excluded from global search
          ].join(",");

          if (orConditions) {
            queryParams.append("or", `(${orConditions})`);
          }
          delete filterParams.global;
        }

        // Add remaining filter parameters with PostgREST syntax
        Object.entries(filterParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            if (numericFields.includes(key)) {
              queryParams.append(key, `eq.${value}`);
            } else if (stringFields.includes(key)) {
              queryParams.append(key, `ilike.%${value}%`);
            } else if (timestampFields.includes(key)) {
              // For specific timestamp filters, use eq or range operators
              queryParams.append(key, `eq.${value}`);
            } else {
              queryParams.append(key, `eq.${value}`);
            }
          }
        });

        const queryString = queryParams.toString();
        console.log("Base URL:", import.meta.env.VITE_API_ENDPOINT);
        console.log("API Query:", `/passenger?${queryString}`);

        return {
          url: `/passenger?${queryString}`,
          headers: headers,
        };
      },
      transformResponse: (response, meta) => {
        console.log("API Response:", response);
        console.log("API Meta:", meta);

        let data = Array.isArray(response) ? response : [];
        let total = 0;
        const contentRange = meta?.response?.headers.get("Content-Range");
        if (contentRange) {
          const match = contentRange.match(/\d+-\d+\/(\d+)/);
          if (match && match[1]) {
            total = parseInt(match[1], 10);
          }
        } else {
          total = data.length;
        }

        return {
          data,
          total,
        };
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return {
          status: response.status,
          message: response.data?.message || "Failed to fetch passengers",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ passenger_id }) => ({
                type: "passenger",
                id: passenger_id,
              })),
              { type: "passenger", id: "LIST" },
            ]
          : [{ type: "passenger", id: "LIST" }],
    }),
  }),
});

export const { useGetAllPassengersQuery } = passengerApi;