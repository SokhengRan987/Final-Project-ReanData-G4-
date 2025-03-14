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
    getSignUpwithGoogle: builder.mutation({
      query: ({
        p_first_name,
        p_last_name,
        p_user_name,
        p_email,
        p_pass,
        p_confirm_pass,
        p_user_profile,
      }) => ({
        url: "/rpc/signup_user_with_google",
        method: "POST",
        body: {
          p_first_name,
          p_last_name,
          p_user_name,
          p_email,
          p_pass,
          p_confirm_pass,
          p_user_profile,
        },
      }),
    }),
    getLogin: builder.mutation({
      query: ({ user_email, user_pass }) => ({
        url: `/rpc/login`,
        method: "POST",
        body: {
          user_email,
          user_pass,
        },
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
    getUpdateUser: builder.mutation({
      query: ({
        first_name_input,
        last_name_input,
        user_name_input,
        user_uuid_input,
      }) => ({
        url: "/rpc/update_user",
        method: "POST",
        body: {
          first_name_input,
          last_name_input,
          user_name_input,
          user_uuid_input,
        },
      }),
    }),
    getChangePassword: builder.mutation({
      query: ({
        user_email,
        current_password,
        new_password,
        new_confirm_password,
      }) => ({
        url: "/rpc/change_password",
        method: "POST",
        body: {
          user_email,
          current_password,
          new_password,
          new_confirm_password,
        },
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
  useGetSignUpwithGoogleMutation,
  useGetChangePasswordMutation,
  useGetUpdateUserMutation,
} = authApi;

export default authApi;
