// src/redux/services/authSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to validate UUID format
const isValidUuid = (uuid) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login endpoint that stores userUuid after successful login
    getLogin: builder.mutation({
      query: ({ user_email, user_pass }) => ({
        url: "/rpc/login",
        method: "POST",
        body: {
          user_email,
          user_pass,
        },
      }),
      // Handle the response to store userUuid and accessToken
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Assuming the login response contains accessToken and user_uuid
          if (data?.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
          if (data?.user_uuid) {
            localStorage.setItem("userUuid", data.user_uuid);
          } else {
            console.warn("user_uuid not found in login response:", data);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
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
