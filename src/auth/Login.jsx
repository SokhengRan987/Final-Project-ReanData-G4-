import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import LogoRd from "../img/LogoRd.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetLoginMutation,
  useGetSignUpwithGoogleMutation,
} from "../redux/services/authSlice";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const [getLogin, { isLoading: isEmailLoading }] = useGetLoginMutation();
  const [getSignUpwithGoogle, { isLoading: isGoogleLoading }] =
    useGetSignUpwithGoogleMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoadingState, setIsGoogleLoadingState] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      apiError: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await getLogin({
          user_email: values.email,
          user_pass: values.password,
        }).unwrap();

        console.log("Login Response:", response); // Log the full response for debugging

        if (response?.result?.access_token) {
          localStorage.setItem("accessToken", response.result.access_token);

          // Extract user_uuid from the nested structure
          const userUuid =
            response.result?.user?.user_uuid || // Corrected path based on previous logs
            response.result.user_uuid ||
            response.user_uuid ||
            response.uuid;

          if (userUuid) {
            localStorage.setItem("userUuid", userUuid);
            console.log("Stored userUuid:", userUuid);

            // Optionally store other user data in localStorage
            const userData = response.result?.user || {};
            console.log(userData.user_name)
            // console.log(userData)
            localStorage.setItem(
              "userData",
              JSON.stringify({
                user_uuid: userUuid,
                firstName: userData.first_name || "",
                lastName: userData.last_name || "",
                email: userData.email || "",
                profileImage: userData.profile_img || userData.p_user_profile || null,
                username: userData.user_name  || "Reandata168",
              })
            );
          } else {
            console.warn("user_uuid not found in login response:", response);
            setErrors({ apiError: "Login successful but user ID not found" });
            return;
          }

          navigate("/boarding-statistics");
          // Remove window.location.reload() to avoid unnecessary reloads
        } else {
          setErrors({ apiError: "Invalid email or password" });
        }
      } catch (error) {
        console.error("Login Error:", error);
        setErrors({ apiError: "Invalid email or password" });
      }
    },
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      setIsGoogleLoadingState(true);

      if (res && res.access_token) {
        const accessToken = res.access_token;
        try {
          const userData = await fetch(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
              },
            }
          ).then((response) => response.json());

          if (
            userData?.given_name &&
            userData?.family_name &&
            userData?.email
          ) {
            const generatedPassword = `${userData.given_name}${
              import.meta.env.VITE_SECRET_KEY_PW
            }`;

            try {
              const loginResponse = await getLogin({
                user_email: userData?.email,
                user_pass: generatedPassword,
              }).unwrap();
              console.log("Login Response:", loginResponse);

              if (loginResponse) {
                const token =
                  loginResponse?.access_token ||
                  loginResponse?.result?.access_token;
                if (token) {
                  localStorage.setItem("accessToken", token);

                  // Extract user_uuid from the nested structure
                  const userUuid =
                    loginResponse.result?.user?.user_uuid || // Corrected path
                    loginResponse.result.user_uuid ||
                    loginResponse.user_uuid ||
                    loginResponse.uuid;

                  if (userUuid) {
                    localStorage.setItem("userUuid", userUuid);
                    console.log("Stored userUuid:", userUuid);

                    // Store user data
                    const userData = loginResponse.result?.user || {};
                    localStorage.setItem(
                      "userData",
                      JSON.stringify({
                        user_uuid: userUuid,
                        firstName: userData.first_name || userData.given_name || "",
                        lastName: userData.last_name || userData.family_name || "",
                        email: userData.email || "",
                        profileImage: userData.profile_img || userData.p_user_profile || userData.picture || null,
                        username: userData.role_name || userData.p_user_name || userData.name || "",
                      })
                    );
                  } else {
                    console.warn("user_uuid not found in login response:", loginResponse);
                  }

                  navigate("/boarding-statistics");
                  return;
                }
              }

              if (loginResponse?.result?.success === false) {
                const submitValues = {
                  p_first_name: userData.given_name,
                  p_last_name: userData.family_name,
                  p_user_name: 
                    userData.name ||
                    `${userData.given_name}${userData.family_name}`,
                  p_email: userData.email,
                  p_pass: generatedPassword,
                  p_confirm_pass: generatedPassword,
                  p_user_profile: userData.picture,
                };

                try {
                  const signupResponse = await getSignUpwithGoogle(
                    submitValues
                  ).unwrap();
                  console.log("Signup Response:", signupResponse);

                  if (signupResponse) {
                    const loginUserPassword = `${signupResponse?.first_name}${
                      import.meta.env.VITE_SECRET_KEY_PW
                    }`;
                    const loginResponse = await getLogin({
                      user_email: signupResponse?.email,
                      user_pass: loginUserPassword,
                    }).unwrap();

                    if (loginResponse) {
                      const token =
                        loginResponse?.access_token ||
                        loginResponse?.result?.access_token;
                      if (token) {
                        localStorage.setItem("accessToken", token);

                        // Extract user_uuid from the nested structure
                        const userUuid =
                          loginResponse.result?.user?.user_uuid || // Corrected path
                          loginResponse.result.user_uuid ||
                          loginResponse.user_uuid ||
                          loginResponse.uuid;

                        if (userUuid) {
                          localStorage.setItem("userUuid", userUuid);
                          console.log("Stored userUuid:", userUuid);

                          // Store user data
                          const userData = loginResponse.result?.user || {};
                          localStorage.setItem(
                            "userData",
                            JSON.stringify({
                              user_uuid: userUuid,
                              firstName: userData.first_name || signupResponse.first_name || "",
                              lastName: userData.last_name || signupResponse.last_name || "",
                              email: userData.email || signupResponse.email || "",
                              profileImage: userData.profile_img || signupResponse.p_user_profile || null,
                              username: userData.role_name || signupResponse.p_user_name || "",
                            })
                          );
                        } else {
                          console.warn("user_uuid not found in login response:", loginResponse);
                        }

                        navigate("/profile");
                        return;
                      }
                    }
                  } else {
                    formik.setErrors({
                      apiError:
                        "Signup successful but no access token received",
                    });
                  }
                } catch (signupError) {
                  console.error("Error during Google signup:", signupError);
                  formik.setErrors({
                    apiError:
                      signupError?.data?.message ||
                      "Failed to create account with Google",
                  });
                }
              }
            } catch (loginError) {
              console.log(
                "User not found, proceeding with signup:",
                loginError
              );

              const submitValues = {
                p_first_name: userData.given_name,
                p_last_name: userData.family_name,
                p_user_name:
                  userData.name ||
                  `${userData.given_name}${userData.family_name}`,
                p_email: userData.email,
                p_pass: generatedPassword,
                p_confirm_pass: generatedPassword,
                p_user_profile: userData.picture,
              };

              try {
                const signupResponse = await getSignUpwithGoogle(
                  submitValues
                ).unwrap();
                console.log("Signup Response:", signupResponse);

                const token =
                  signupResponse?.access_token ||
                  signupResponse?.result?.access_token;
                if (token) {
                  localStorage.setItem("accessToken", token);

                  // Extract user_uuid from the nested structure
                  const userUuid =
                    signupResponse.result?.user?.user_uuid || // Corrected path
                    signupResponse.result.user_uuid ||
                    signupResponse.user_uuid ||
                    signupResponse.uuid;

                  if (userUuid) {
                    localStorage.setItem("userUuid", userUuid);
                    console.log("Stored userUuid:", userUuid);

                    // Store user data
                    localStorage.setItem(
                      "userData",
                      JSON.stringify({
                        user_uuid: userUuid,
                        firstName: signupResponse.first_name || userData.given_name || "",
                        lastName: signupResponse.last_name || userData.family_name || "",
                        email: signupResponse.email || userData.email || "",
                        profileImage: signupResponse.p_user_profile || userData.picture || null,
                        username: signupResponse.p_user_name || userData.name || "",
                      })
                    );
                  } else {
                    console.warn("user_uuid not found in signup response:", signupResponse);
                  }

                  navigate("/profile");
                } else {
                  formik.setErrors({
                    apiError: "Signup successful but no access token received",
                  });
                }
              } catch (signupError) {
                console.error("Error during Google signup:", signupError);
                formik.setErrors({
                  apiError:
                    signupError?.data?.message ||
                    "Failed to create account with Google",
                });
              }
            }
          } else {
            formik.setErrors({
              apiError: "Could not retrieve required data from Google",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          formik.setErrors({
            apiError: "Could not fetch user data from Google",
          });
        }
      } else {
        formik.setErrors({
          apiError: "Invalid Google authentication response",
        });
      }
      setIsGoogleLoadingState(false);
    },
    onError: (error) => {
      console.log("Google Login Error:", error);
      formik.setErrors({ apiError: "Google login failed" });
      setIsGoogleLoadingState(false);
    },
  });

  return (
    // [Your existing JSX remains unchanged]
    <div
      className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
      style={{ background: "#dde2e9" }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">
          {/* Left Column - Logo (unchanged) */}
          <div
            className="relative flex items-center justify-center p-6 sm:p-8 order-1 md:order-1"
            style={{
              background: "linear-gradient(45deg, #3C55A5, #5D79C3)",
              overflow: "hidden",
            }}
          >
            <div className="absolute inset-0">
              <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -left-48 animate-pulse"></div>
              <div className="absolute w-72 h-72 bg-blue-200 opacity-20 rounded-full -bottom-36 -right-36 animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 text-center text-white">
              <div className="relative w-32 sm:w-40 h-32 sm:h-40 perspective-1000 mb-6 mx-auto">
                <div className="absolute inset-0 bg-white bg-opacity-20 rounded-2xl transform rotate-12 hover:rotate-24 transition-all duration-700 shadow-xl"></div>
                <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl shadow-2xl flex items-center justify-center transform hover:-rotate-6 transition-all duration-500">
                  <img
                    src={LogoRd}
                    alt="ReanData Logo"
                    className="object-cover w-16 sm:w-20 h-16 sm:h-20 transform hover:scale-110 transition-all duration-300"
                  />
                </div>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl mb-2 animate-bounce-slow text-white">
                REANDATA
              </h2>
              <p className="font-description text-sm sm:text-[16px] text-gray-200">
                Discover Data, Step by Step
              </p>

              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white rounded-full opacity-30 animate-float"
                    style={{
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white py-8 px-6 sm:px-8 relative order-2 md:order-2">
            <div className="absolute top-4 left-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
              >
                <IoArrowBack size={20} className="text-gray-600" />
              </button>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl text-[#3C55A5] mb-6 text-center animate-fade-in">
              Welcome Back
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="peer w-full px-4 py-3 border border-[#3C55A5] border-[0.5px] rounded-lg focus:border-blue-500 focus:border-[0.3px] focus:ring-0 transition-all duration-300 bg-transparent font-description text-base text-[#0F172A]"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
                >
                  E-mail
                </label>
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm font-description !mt-1">
                  {formik.errors.email}
                </p>
              )}

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="peer w-full px-4 py-3 pr-12 border border-[#3C55A5] border-[0.5px] rounded-lg focus:border-blue-500 focus:border-[0.3px] focus:ring-0 transition-all duration-300 bg-transparent font-description text-base text-[#0F172A]"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#3C55A5]"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm font-description !mt-1">
                  {formik.errors.password}
                </p>
              )}

              <div className="flex justify-between items-center">
                <label className="flex items-center text-gray-600 font-description text-base">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#3C55A5] focus:ring-[#3C55A5] border-gray-300 rounded"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <a
                  href="/forgetpassword"
                  className="text-[#3C55A5] hover:text-[#2A3F7A] font-description text-base"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={
                  isEmailLoading || formik.isSubmitting || isGoogleLoadingState
                }
                className="w-full py-3 px-4 bg-[#3C55A5] text-white rounded-lg hover:bg-[#2A3F7A] transition-all duration-300 transform hover:scale-105 font-description text-base"
              >
                {isEmailLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Login"
                )}
              </button>

              {formik.errors.apiError && (
                <p className="text-red-500 text-sm text-center font-description mt-4">
                  {formik.errors.apiError}
                </p>
              )}

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-gray-500 font-description text-sm">
                    Or
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoadingState || isEmailLoading}
                className="w-full py-3 px-4 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 font-description text-base"
              >
                {isGoogleLoadingState ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <FcGoogle className="h-5 w-5 mr-2" />
                )}
                {isGoogleLoadingState ? "Processing..." : "Login with Google"}
              </button>

              <p className="text-center text-gray-600 font-description text-base">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-[#3C55A5] hover:text-[#2A3F7A]"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        input:not(:placeholder-shown) + label {
          top: 0;
          font-size: 0.75rem;
          color: #3c55a5;
          background-color: white;
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }

        @media (max-width: 767px) {
          .grid-cols-1 {
            grid-template-columns: 1fr;
          }
          .md\\:grid-cols-2 {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }
          .order-1 {
            order: 1;
          }
          .order-2 {
            order: 2;
          }
          .max-w-5xl {
            max-width: 100%;
          }
          .py-8 {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          .px-6 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .space-y-6 > * + * {
            margin-top: 1.5rem;
          }
          .text-3xl {
            font-size: 1.875rem;
          }
          .w-40 {
            width: 8rem;
          }
          .h-40 {
            height: 8rem;
          }
          .h-20 {
            height: 4rem;
          }
          .w-20 {
            width: 4rem;
          }
        }

        @media (min-width: 768px) {
          .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .order-1 {
            order: 1;
          }
          .order-2 {
            order: 2;
          }
        }
      `}</style>
    </div>
  );
}