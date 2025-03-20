import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (build) => ({
    getPokemonByName: build.query({
      query: (name) => `pokemon
      ?name=${name}`,

  }),
})
})
export const { useGetPokemonByNameQuery } = pokemonApi;