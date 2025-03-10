import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authTestApi = createApi({
  reducerPath: "authTestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers) => {
      headers.set("Cache-Control", "no-cache");
      return headers;
    },
  }),
  tagTypes: ["AuthTestApi"],
  endpoints: (builder) => ({
    getauthTestApi: builder.mutation({
      query: ({
        p_first_name,
        p_last_name,
        p_user_name,
        p_email,
        p_pass,
        p_confirm_pas,
      }) => ({
        url: "/rpc/signup_user",
        providesTags: ["AuthTestApi"],
        method: "POST",
        body: {
          p_first_name,
          p_last_name,
          p_user_name,
          p_email,
          p_pass,
          p_confirm_pas,
        },
      }),
    }),
  }),
});
export const { useGetauthTestApiMutation } = authTestApi;
