import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const airportApi = createApi({
  reducerPath: "airportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAllAirports: builder.query({
      query: (params = {}) => {
        const { limit = 0, offset = 0, ...filterParams } = params
        const queryParams = new URLSearchParams()

        // Add pagination parameters
        queryParams.append("limit", String(limit))
        queryParams.append("offset", String(offset))

        // Add proper count header for PostgREST to return total count
        const headers = {
          "Prefer": "count=exact"
        }

        // Handle global search across multiple columns
        if (filterParams.global) {
          const searchValue = `%${filterParams.global}%`
          const searchableFields = [
            "airport_code",
            "airport_name",
            "city",
            "airport_tz",
            "continent",
            "iso_country"
          ]
          const orConditions = searchableFields
            .map(field => `${field}.ilike.${searchValue}`)
            .join(",")
          queryParams.append("or", `(${orConditions})`)
          delete filterParams.global // Remove global from filterParams to avoid further processing
        }

        // Add remaining filter parameters with PostgREST syntax
        Object.entries(filterParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            if (["airport_code", "airport_name", "city", "airport_tz", "continent", "iso_country"].includes(key)) {
              queryParams.append(key, `eq.${value}`)
            } else if (key === "intnl") {
              queryParams.append(key, `is.${value}`)
            } else {
              queryParams.append(key, `eq.${value}`)
            }
          }
        })

        const queryString = queryParams.toString()
        console.log("API Query:", `/airport?${queryString}`)

        return {
          url: `/airport?${queryString}`,
          headers: headers
        }
      },
      transformResponse: (response, meta) => {
        console.log("API Response:", response)
        console.log("API Meta:", meta)

        let data = Array.isArray(response) ? response : []
        let total = 0
        const contentRange = meta?.response?.headers.get('Content-Range')
        if (contentRange) {
          const match = contentRange.match(/\d+-\d+\/(\d+)/)
          if (match && match[1]) {
            total = parseInt(match[1], 10)
          }
        } else {
          total = data.length
        }

        return {
          data,
          total,
        }
      },
      transformErrorResponse: (response) => {
        console.error("API Error:", response)
        return {
          status: response.status,
          message: response.data?.message || "Failed to fetch airports",
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Airports', id })),
              { type: 'Airports', id: 'LIST' }
            ]
          : [{ type: 'Airports', id: 'LIST' }],
    }),
  }),
})

export const { useGetAllAirportsQuery } = airportApi