import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getSignup: builder.mutation({
      query: ({
        p_first_name,
        p_last_name,
        p_user_name,
        p_email,
        p_pass,
        p_confirm_pass,
      }) => ({
        url: "/rpc/signup_user",
        method: "POST",
        body: {
          p_first_name,
          p_last_name,
          p_user_name,
          p_email,
          p_pass,
          p_confirm_pass,
        },  
      }),
    }),
    getLogin: builder.mutation({
      query: ({ user_email, user_pass }) => ({
        url: `/rpc/login?user_email=${user_email}&user_pass=${user_pass}`,
        method: "GET",
      }),
    }),
    getRpPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/rpc/request_password_reset",
        method: "POST",
        body: { email },
      }),
    }),
    getResetPassword: builder.mutation({
      query: ({ user_email, otp_codes, new_password, confirm_password }) => ({
        url: "/rpc/reset_password",
        method: "POST",
        body: { user_email, otp_codes, new_password, confirm_password },
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetSignupMutation,
  useGetLoginMutation,
  useGetRpPasswordMutation,
  useGetResetPasswordMutation,
} = authApi;

export default authApi;
