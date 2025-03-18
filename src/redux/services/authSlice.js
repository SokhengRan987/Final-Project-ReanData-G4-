import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to validate UUID format
const isValidUuid = (uuid) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password strength
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No access token found in localStorage");
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLogin: builder.mutation({
      query: ({ user_email, user_pass }) => {
        if (!isValidEmail(user_email)) {
          throw new Error("Invalid email format");
        }
        if (!user_pass) {
          throw new Error("Password is required");
        }
        return {
          url: "/rpc/login",
          method: "POST",
          body: { user_email, user_pass },
        };
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
          if (data?.user_uuid) {
            localStorage.setItem("userUuid", data.user_uuid);
          }
          if (data?.user_email || arg.user_email) {
            localStorage.setItem("userEmail", data.user_email || arg.user_email);
          } else {
            console.warn("user_email not found in login response:", data);
          }
          localStorage.setItem("userPassword", arg.user_pass);
          console.warn("Password stored in localStorage - this is insecure and should be handled by the backend");
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
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
      }) => {
        if (!isValidEmail(p_email)) {
          throw new Error("Invalid email format");
        }
        if (!p_first_name || !p_last_name || !p_user_name || !p_pass || !p_confirm_pass) {
          throw new Error("All fields are required");
        }
        if (p_pass !== p_confirm_pass) {
          throw new Error("Passwords do not match");
        }
        if (!isValidPassword(p_pass)) {
          throw new Error(
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
          );
        }
        return {
          url: "/rpc/signup_user",
          method: "POST",
          body: { p_first_name, p_last_name, p_user_name, p_email, p_pass, p_confirm_pass },
        };
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
          if (data?.user_uuid) {
            localStorage.setItem("userUuid", data.user_uuid);
          }
          if (data?.p_email || arg.p_email) {
            localStorage.setItem("userEmail", data.p_email || arg.p_email);
          }
          localStorage.setItem("userPassword", arg.p_pass);
          console.warn("Password stored in localStorage - this is insecure and should be handled by the backend");
        } catch (error) {
          console.error("Signup failed:", error);
          throw error;
        }
      },
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
        body: { p_first_name, p_last_name, p_user_name, p_email, p_pass, p_confirm_pass, p_user_profile },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
          if (data?.user_uuid) {
            localStorage.setItem("userUuid", data.user_uuid);
          }
          if (data?.p_email || arg.p_email) {
            localStorage.setItem("userEmail", data.p_email || arg.p_email);
          }
          if (arg.p_pass) {
            localStorage.setItem("userPassword", arg.p_pass);
            console.warn("Password stored in localStorage - this is insecure and should be handled by the backend");
          }
        } catch (error) {
          console.error("Google Signup failed:", error);
          throw error;
        }
      },
    }),
    getRpPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/rpc/request_password_reset",
        method: "POST",
        body: { email },
      }),
    }),
    getResetPassword: builder.mutation({
      query: ({ user_email, otp_codes, new_password, confirm_password }) => {
        if (!isValidEmail(user_email)) {
          throw new Error("Invalid email format");
        }
        if (!otp_codes || !new_password || !confirm_password) {
          throw new Error("All fields are required");
        }
        if (new_password !== confirm_password) {
          throw new Error("Passwords do not match");
        }
        if (!isValidPassword(new_password)) {
          throw new Error(
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
          );
        }
        return {
          url: "/rpc/reset_password",
          method: "POST",
          body: { user_email, otp_codes, new_password, confirm_password },
        };
      },
      transformErrorResponse: (response) => {
        if (response.status === 400) {
          return { message: response.data?.message || "Invalid input data" };
        }
        if (response.status === 401) {
          return { message: "Invalid or expired OTP" };
        }
        if (response.status === 404) {
          return { message: "User not found" };
        }
        if (response.status === 500) {
          return { message: "Server error occurred. Please try again later." };
        }
        return { message: response.data?.message || "Failed to reset password" };
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.setItem("userPassword", arg.new_password);
          console.warn("Password stored in localStorage - this is insecure and should be handled by the backend");
        } catch (error) {
          console.error("Reset password failed:", error);
          // Re-throw the error with a structured message for the frontend
          throw new Error(error?.data?.message || "Failed to reset password");
        }
      },
    }),
    updateUser: builder.mutation({
      query: ({ first_name_input, last_name_input, user_name_input, user_uuid_input }) => {
        if (!isValidUuid(user_uuid_input)) {
          throw new Error("Invalid user_uuid_input format");
        }
        if (!first_name_input || !last_name_input || !user_name_input) {
          throw new Error("All name fields are required");
        }
        return {
          url: "/rpc/update_user",
          method: "POST",
          body: { first_name_input, last_name_input, user_name_input, user_uuid_input },
        };
      },
      transformResponse: (response, meta) => {
        if (meta.response.status === 204) {
          return { success: true, message: "User updated successfully" };
        }
        return response || { success: true, message: "User updated successfully" };
      },
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          return { success: false, message: "Unauthorized: Invalid or missing token" };
        }
        if (response.status === 400) {
          return { success: false, message: "Bad Request: Invalid input data" };
        }
        return { success: false, message: response.data?.message || "Failed to update user" };
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.success === false) {
            throw new Error(data.message || "User update failed");
          }
        } catch (error) {
          console.error("Update user failed:", error);
          throw error;
        }
      },
    }),
    updateUserProfileImage: builder.mutation({
      query: ({ user_uuid, image }) => {
        if (!isValidUuid(user_uuid)) {
          throw new Error("Invalid user_uuid format");
        }
        if (!image) {
          throw new Error("Image is required");
        }
        return {
          url: "/rpc/update_user_profile_img",
          method: "POST",
          body: { user_uuid, image },
        };
      },
      transformResponse: (response, meta) => {
        if (meta.response.status === 204) {
          return { success: true, message: "Profile image updated successfully" };
        }
        return response || { success: true, message: "Profile image updated successfully" };
      },
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          return { success: false, message: "Unauthorized: Invalid or missing token" };
        }
        if (response.status === 400) {
          return { success: false, message: "Bad Request: Invalid input data" };
        }
        return { success: false, message: response.data?.message || "Failed to update profile image" };
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.success === false) {
            throw new Error(data.message || "Profile image update failed");
          }
        } catch (error) {
          console.error("Update profile image failed:", error);
          throw error;
        }
      },
    }),
    getChangePassword: builder.mutation({
      query: ({ user_email, current_password, new_password, new_confirm_password }) => {
        if (!isValidEmail(user_email)) {
          throw new Error("Invalid email format");
        }
        if (!current_password || !new_password || !new_confirm_password) {
          throw new Error("All password fields are required");
        }
        if (new_password !== new_confirm_password) {
          throw new Error("New password and confirmation do not match");
        }
        if (!isValidPassword(new_password)) {
          throw new Error(
            "New password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
          );
        }
        return {
          url: "/rpc/change_password",
          method: "POST",
          body: { user_email, current_password, new_password, new_confirm_password },
        };
      },
      transformResponse: (response) => {
        if (typeof response?.success !== "boolean") {
          throw new Error("Invalid response format from server");
        }
        return response;
      },
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          return { message: "Current password does not match" };
        }
        if (response.status === 404) {
          return { message: "User not found" };
        }
        if (response.status === 422) {
          return { message: "Invalid input data" };
        }
        if (response.status === 500) {
          return { message: "Server error occurred. Please try again later." };
        }
        return { message: response.data?.message || "Failed to change password." };
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.success === false) {
            throw new Error(data.message || "Password change failed");
          }
          localStorage.setItem("userPassword", arg.new_password);
          console.warn("Password stored in localStorage - this is insecure and should be handled by the backend");
        } catch (error) {
          console.error("Change password failed:", error);
          throw error;
        }
      },
    }),
  }),
});

export const {
  useGetSignupMutation,
  useGetLoginMutation,
  useGetRpPasswordMutation,
  useGetResetPasswordMutation,
  useGetSignUpwithGoogleMutation,
  useGetChangePasswordMutation,
  useUpdateUserMutation,
  useUpdateUserProfileImageMutation,
} = authApi;

export { isValidUuid, isValidEmail, isValidPassword };

export default authApi;