import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import LogoRd from "../img/LogoRd.png"

// Validation schema using Yup
const validationSchema = Yup.object({
  Firstname: Yup.string().required("First Name is required"),
  Lastname: Yup.string().required("Last Name is required"),
  Username: Yup.string().required("Username is required"),
  Email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  Password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    Firstname: "",
    Lastname: "",
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted:", values);
      resetForm();
    } catch (error) {
      setFieldError("apiError", error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Google signup initiated");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #E8ECEF 0%, #D5DCE5 100%)",
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">
          {/* Right Column - Logo */}
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

          {/* Left Column - Form */}
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

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="relative">
                        <Field
                          id="Firstname"
                          name="Firstname"
                          type="text"
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
                      <ErrorMessage
                        name="Firstname"
                        component="div"
                        className="text-red-500 text-extra-small mt-1 font-description"
                      />
                    </div>

                    <div>
                      <div className="relative">
                        <Field
                          id="Lastname"
                          name="Lastname"
                          type="text"
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
                      <ErrorMessage
                        name="Lastname"
                        component="div"
                        className="text-red-500 text-extra-small mt-1 font-description"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        id="Username"
                        name="Username"
                        type="text"
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
                    <ErrorMessage
                      name="Username"
                      component="div"
                      className="text-red-500 text-extra-small mt-1 font-description"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        id="Email"
                        name="Email"
                        type="email"
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
                    <ErrorMessage
                      name="Email"
                      component="div"
                      className="text-red-500 text-extra-small mt-1 font-description"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        id="Password"
                        name="Password"
                        type={showPassword ? "text" : "password"}
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
                    <ErrorMessage
                      name="Password"
                      component="div"
                      className="text-red-500 text-extra-small mt-1 font-description"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Field
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
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
                    <ErrorMessage
                      name="ConfirmPassword"
                      component="div"
                      className="text-red-500 text-extra-small mt-1 font-description"
                    />
                  </div>

                  {errors.apiError && (
                    <p className="text-red-500 text-sm text-center font-description">
                      {errors.apiError}
                    </p>
                  )}

                  <div className="flex items-center">
                    <Field
                      id="terms"
                      name="terms"
                      type="checkbox"
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

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
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

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500 text-small font-description">
                        Or
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={isLoading}
                    className="w-full py-3 px-4 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 text-small font-description"
                  >
                    <FcGoogle className="h-5 w-5" />
                    Sign up with Google
                  </button>

                  <p className="text-center text-base text-gray-600 font-description">
                    Have an account?{" "}
                    <a
                      href="/login"
                      className="text-[#3C55A5] hover:text-[#2A3F7A]"
                    >
                      Sign in
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* CSS for animations and responsiveness */}
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

        /* Floating Label Logic */
        input:not(:placeholder-shown) + label {
          top: 0;
          font-size: 0.75rem;
          color: #3c55a5;
          background-color: white;
          padding-left: 0.25rem;
          padding-right: 0.25rem;
        }

        /* Responsive Adjustments */
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