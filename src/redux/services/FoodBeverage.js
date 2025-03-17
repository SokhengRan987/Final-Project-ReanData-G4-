import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fbApi = createApi({
  reducerPath: "fbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAllFb: builder.query({
      query: (params = {}) => {
        const { limit = 20, offset = 0, ...filterParams } = params;
        const queryParams = new URLSearchParams();

        queryParams.append("limit", String(limit));
        queryParams.append("offset", String(offset));

        const headers = {
          "Prefer": "count=exact",
        };

        const numericFields = ["id"];
        const stringFields = [
          "age_range",
          "occupation",
          "gender",
          "eating_out_frequency",
          "preferred_beverages",
          "average_spending_range",
          "value_priority",
          "payment_preference",
          "travel_time_acceptable",
          "restaurant_discovery_method",
          "preferred_dining_method",
          "preferred_dining_location",
          "usual_dining_time",
          "international_order_frequency",
          "international_food_preference",
          "client_ip",
          "user_agent",
        ];
        const uuidFields = ["response_id"];
        const timestampFields = ["timestamp"];
        const arrayFields = [
          "preferred_promotions",
          "preferred_cuisines",
          "restaurant_selection_factors",
          "morning_preferences",
          "afternoon_preferences",
          "evening_preferences",
          "night_preferences",
        ];

        if (filterParams.global) {
          const searchValue = filterParams.global;
          const numericSearch = Number(searchValue);
          const stringSearch = `%${searchValue}%`;

          const orConditions = [
            ...(numericSearch && !isNaN(numericSearch)
              ? numericFields.map((field) => `${field}.eq.${numericSearch}`)
              : []),
            ...stringFields.map((field) => `${field}.ilike.${stringSearch}`),
            // Optionally include array fields with cs if needed
            // ...arrayFields.map((field) => `${field}.cs.{${stringSearch}}`),
          ].join(",");

          if (orConditions) {
            queryParams.append("or", `(${orConditions})`);
          }
          delete filterParams.global;
        }

        Object.entries(filterParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            if (value.startsWith("eq.") || value.startsWith("ilike.") || value.startsWith("cs.")) {
              queryParams.append(key, value);
            } else if (arrayFields.includes(key)) {
              const formattedValue = value.includes(" ") ? `{"${value}"}` : `{${value}}`;
              queryParams.append(key, `cs.${formattedValue}`);
            } else if (numericFields.includes(key)) {
              queryParams.append(key, `eq.${value}`);
            } else if (uuidFields.includes(key)) {
              queryParams.append(key, `eq.${value}`);
            } else if (stringFields.includes(key)) {
              queryParams.append(key, `ilike.%${value}%`);
            } else if (timestampFields.includes(key)) {
              queryParams.append(key, `eq.${value}`);
            } else {
              queryParams.append(key, `eq.${value}`);
            }
          }
        });

        const queryString = queryParams.toString();
        console.log("Base URL:", import.meta.env.VITE_API_ENDPOINT);
        console.log("API Query:", `/responses?${queryString}`);

        return {
          url: `/responses?${queryString}`,
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
        return { data, total };
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response);
        return {
          status: response.status,
          message: response.data?.message || "Failed to fetch responses",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "fb", id })),
              { type: "fb", id: "LIST" },
            ]
          : [{ type: "fb", id: "LIST" }],
    }),
  }),
});

export const { useGetAllFbQuery } = fbApi;