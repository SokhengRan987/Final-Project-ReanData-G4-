import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { useGetRpPasswordMutation } from "../redux/services/authSlice";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [getRpPassword, { isLoading, error }] = useGetRpPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setFieldError, setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        // Send request to initiate password reset
        const result = await getRpPassword({
          email: values.email,
        }).unwrap();

        console.log("Password reset initiated:", result);

        // Assuming the API returns the OTP in the response
        const otp = result.otp; // Adjust based on your API response structure
        if (!otp) {
          throw new Error("OTP not received from the server.");
        }

        resetForm();
        // Pass both email and OTP to ResetPassword via navigation state
        navigate("/resetpassword", { state: { email: values.email, otp } });
      } catch (error) {
        console.error("Password reset failed:", error);
        if (error?.data?.message) {
          setFieldError("apiError", error.data.message);
        } else {
          setFieldError("apiError", "An error occurred while sending reset email. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
      style={{ background: "#dde2e9" }}
    >
      <div className="relative z-10 w-full max-w-md bg-white py-8 px-6 sm:px-8 rounded-3xl shadow-2xl border border-gray-200">
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate("/login")}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            <IoArrowBack size={20} className="text-gray-600" />
          </button>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-[#3C55A5] mb-6 text-center animate-fade-in">
          Forgot Password
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
                className={`peer w-full px-4 py-3 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent font-description text-base text-[#0F172A]`}
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
              <p className="mt-1 text-extra-small text-red-500 font-description">
                {formik.errors.email}
              </p>
            )}
          </div>

          {formik.errors.apiError && (
            <p className="text-extra-small text-red-500 font-description text-center">
              {formik.errors.apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || formik.isSubmitting}
            className="w-full py-3 px-4 bg-[#3C55A5] text-white rounded-lg hover:bg-[#2A3F7A] transition-all duration-300 transform hover:scale-105 font-description text-base"
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
              "Send Email"
            )}
          </button>

          <p className="text-center text-gray-600 font-description text-base">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#3C55A5] hover:text-[#2A3F7A]">
              Sign Up
            </a>
          </p>
        </form>
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
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
          .max-w-md {
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
        }
      `}</style>
    </div>
  );
};

export default ForgetPassword;