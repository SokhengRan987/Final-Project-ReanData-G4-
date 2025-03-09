import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ENDPOINT,
    }),
    endpoints:(build)=>({
        getSignup:build.mutation({
            query:({p_first_name,p_last_name,p_user_name,p_email,p_pass,p_confirm_pas})=>({
                url:"/rpc/signup_user",
                method:"POST",
                body:{p_first_name,p_last_name,p_user_name,p_email,p_pass,p_confirm_pas}
            })
        })
    })
})
export const {useGetSignupMutation}=authApi