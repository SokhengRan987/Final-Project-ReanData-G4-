import React, { useState } from "react";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import LogoRd from "../img/LogoRd.png";
import { useGetSignupMutation } from "../redux/services/authSlice";
import { useFormik } from "formik";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [getSignUp, { isLoading, error }] = useGetSignupMutation();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Firstname: "",
      Lastname: "",
      Username: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      Firstname: Yup.string().required("First Name is required"),
      Lastname: Yup.string().required("Last Name is required"),
      Username: Yup.string().required("Username is required"),
      Email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(/@gmail\.com$/, "Email must be a Gmail address"),
      Password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must include at least 1 letter")
        .matches(/[0-9]/, "Password must include at least 1 number")
        .required("Password is required"),
      ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      terms: Yup.boolean().oneOf([true], "Required"),
    }),
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        const result = await getSignUp({
          p_first_name: values?.Firstname,
          p_last_name: values?.Lastname,
          p_user_name: values?.Username,
          p_email: values?.Email,
          p_pass: values?.Password,
          p_confirm_pass: values?.ConfirmPassword,
        }).unwrap();

        console.log("Signup successful:", result);
        localStorage.setItem("signUpEmail", values.Email);
        localStorage.setItem("signUpPassword", values.Password);
        navigate("/login");
      } catch (error) {
        console.error("Signup failed:", error);
        if (error?.data?.message === "Username already exists") {
          setFieldError(
            "Username",
            "Username already exists. Please choose a different username."
          );
        } else if (error?.data?.message === "Email already exists") {
          setPopupMessage(
            "This email is already registered. Please login instead."
          );
          setShowPopup(true);
          setFieldError(
            "Email",
            "Email already exists. Please use a different email."
          );
        } else if (error?.data?.message === "Passwords do not match") {
          setFieldError("ConfirmPassword", "Passwords do not match.");
        } else {
          setFieldError(
            "general",
            error?.data?.message ||
              "An unexpected error occurred. Please try again."
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const Popup = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            Email Already Exists
          </h3>
          <p className="mt-2 text-sm text-gray-500">{message}</p>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#3C55A5] border border-transparent rounded-md hover:bg-[#2A3F7A] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #E8ECEF 0%, #D5DCE5 100%)",
      }}
    >
      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => {
            setShowPopup(false);
            if (popupMessage.includes("already registered")) {
              navigate("/login");
            }
          }}
        />
      )}

      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">
          {/* Logo section remains unchanged */}
          <div
            className="relative flex items-center justify-center p-6 sm:p-8 order-1 md:order-2"
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

              <h2 className="text-2xl sm:text-3xl font-heading mb-2 animate-bounce-slow">
                REANDATA
              </h2>
              <p className="text-sm sm:text-[16px] font-description opacity-80">
                Start Your Data Journey Today
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

          {/* Form section */}
          <div className="bg-white py-8 px-6 sm:px-8 relative order-2 md:order-1">
            <div className="absolute top-4 left-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
              >
                <IoArrowBack size={20} className="text-gray-600" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading text-[#3C55A5] mb-6 text-center animate-fade-in">
              Learn Data Now
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Form fields remain unchanged */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="relative">
                    <input
                      id="Firstname"
                      name="Firstname"
                      type="text"
                      {...formik.getFieldProps("Firstname")}
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent text-small font-description"
                      placeholder=" "
                    />
                    <label
                      htmlFor="Firstname"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
                    >
                      First Name
                    </label>
                  </div>
                  {formik.touched.Firstname && formik.errors.Firstname && (
                    <div className="text-red-500 text-extra-small mt-1 font-description">
                      {formik.errors.Firstname}
                    </div>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      id="Lastname"
                      name="Lastname"
                      type="text"
                      {...formik.getFieldProps("Lastname")}
                      className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent text-small font-description"
                      placeholder=" "
                    />
                    <label
                      htmlFor="Lastname"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
                    >
                      Last Name
                    </label>
                  </div>
                  {formik.touched.Lastname && formik.errors.Lastname && (
                    <div className="text-red-500 text-extra-small mt-1 font-description">
                      {formik.errors.Lastname}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    id="Username"
                    name="Username"
                    type="text"
                    {...formik.getFieldProps("Username")}
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent text-small font-description"
                    placeholder=" "
                  />
                  <label
                    htmlFor="Username"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
                  >
                    Username
                  </label>
                </div>
                {formik.touched.Username && formik.errors.Username && (
                  <div className="text-red-500 text-extra-small mt-1 font-description">
                    {formik.errors.Username}
                  </div>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    id="Email"
                    name="Email"
                    type="email"
                    {...formik.getFieldProps("Email")}
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent text-small font-description"
                    placeholder=" "
                  />
                  <label
                    htmlFor="Email"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
                  >
                    E-mail
                  </label>
                </div>
                {formik.touched.Email && formik.errors.Email && (
                  <div className="text-red-500 text-extra-small mt-1 font-description">
                    {formik.errors.Email}
                  </div>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    id="Password"
                    name="Password"
                    type={showPassword ? "text" : "password"}
                    {...formik.getFieldProps("Password")}
                    className="peer w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent text-small font-description"
                    placeholder=" "
                  />
                  <label
                    htmlFor="Password"
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
                {formik.touched.Password && formik.errors.Password && (
                  <div className="text-red-500 text-extra-small mt-1 font-description">
                    {formik.errors.Password}
                  </div>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    id="ConfirmPassword"
                    name="ConfirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...formik.getFieldProps("ConfirmPassword")}
                    className="peer w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent text-small font-description"
                    placeholder=" "
                  />
                  <label
                    htmlFor="ConfirmPassword"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
                  >
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#3C55A5]"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword && (
                    <div className="text-red-500 text-extra-small mt-1 font-description">
                      {formik.errors.ConfirmPassword}
                    </div>
                  )}
              </div>

              {formik.errors.apiError && (
                <p className="text-red-500 text-sm text-center font-description">
                  {formik.errors.apiError}
                </p>
              )}

              <div className="">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                    className="h-5 w-5 text-[#3C55A5] focus:ring-[#3C55A5] border-gray-300 rounded-[5px]"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-gray-600 font-description"
                    style={{ fontSize: "16px" }}
                  >
                    I agree to the{" "}
                    <a href="#" className="text-[#3C55A5] hover:text-[#2A3F7A]">
                      Terms
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-[#3C55A5] hover:text-[#2A3F7A]">
                      Privacy
                    </a>
                  </label>
                </div>
                {formik.touched.terms && formik.errors.terms ? (
                  <p className="text-red-500 text-sm text-start font-description mt-1">
                    {formik.errors.terms}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                className="w-full py-3 px-4 bg-[#3C55A5] text-white rounded-lg hover:bg-[#2A3F7A] transition-all duration-300 transform hover:scale-105 text-small font-description"
              >
                {isLoading ? (
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
                  "Create Account"
                )}
              </button>

              <p className="text-center text-base text-gray-600 font-description">
                Have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-[#3C55A5] hover:text-[#2A3F7A]"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* CSS remains unchanged */}
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
