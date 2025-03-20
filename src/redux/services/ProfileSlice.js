// profileApi.js - RTK Query API definition
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reandata-api.istad.co:443",
    prepareHeaders: (headers) => {
      // Add auth token if needed
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    // Get user profile
    getProfile: builder.query({
      query: (userId) => ({
        url: `/users/${userId || 'me'}`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    
    // Update user profile
    updateProfile: builder.mutation({
      query: ({ userId, profileData }) => ({
        url: `/users/${userId || 'me'}`,
        method: 'PATCH',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
    
    // Upload profile image
    uploadProfileImage: builder.mutation({
      query: ({ userId, imageFile }) => {
        const formData = new FormData();n
        formData.append('profileImage', imageFile);
        
        return {
          url: `/users/${userId || 'me'}/image`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} = profileApi;