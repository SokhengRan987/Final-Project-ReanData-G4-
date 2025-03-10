import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoArrowBack } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { useGetResetPasswordMutation } from "../redux/services/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access navigation state
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [getResetPassword, { isLoading, error }] = useGetResetPasswordMutation();

  // Retrieve email from navigation state
  const email = location.state?.email || "";

  const formik = useFormik({
    initialValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Code is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must include at least 1 letter")
        .matches(/[0-9]/, "Password must include at least 1 number")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await getResetPassword({
          user_email: email, // Use the email from navigation state
          otp_codes: values.code,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        }).unwrap();
        formik.resetForm();
        navigate("/login");
      } catch (error) {
        formik.setFieldError(
          "apiError",
          error.data?.message || "An error occurred during password reset"
        );
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  // Optional: Redirect back if no email is provided
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8" style={{ background: "#dde2e9" }}>
        <p className="text-red-500">Error: No email provided. Please start from the Forgot Password page.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
      style={{ background: "#dde2e9" }}
    >
      <div className="relative z-10 w-full max-w-md bg-white py-8 px-6 sm:px-8 rounded-3xl shadow-2xl border border-gray-200">
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate("/forgetpassword")}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            <IoArrowBack size={20} className="text-gray-600" />
          </button>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl text-[#3C55A5] mb-6 text-center animate-fade-in">
          Reset Password
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Code Input */}
          <div className="">
            <div className="relative">
              <input
                id="code"
                name="code"
                type="text"
                {...formik.getFieldProps("code")}
                className={`peer w-full px-4 py-3 border ${
                  formik.touched.code && formik.errors.code
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent font-description text-base text-[#0F172A]`}
                placeholder=" "
              />
              <label
                htmlFor="code"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
              >
                Reset Code
              </label>
            </div>
            {formik.touched.code && formik.errors.code && (
              <p className="mt-1 text-extra-small text-red-500 font-description">
                {formik.errors.code}
              </p>
            )}
          </div>

          {/* New Password Input */}
          <div>
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...formik.getFieldProps("newPassword")}
                className={`peer w-full px-4 py-3 border ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent font-description text-base text-[#0F172A]`}
                placeholder=" "
              />
              <label
                htmlFor="newPassword"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
              >
                New Password
              </label>
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#3C55A5] transition-colors"
              >
                {showNewPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="mt-1 text-extra-small text-red-500 font-description">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...formik.getFieldProps("confirmPassword")}
                className={`peer w-full px-4 py-3 border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:border-[#3C55A5] focus:ring-0 transition-all duration-300 bg-transparent font-description text-base text-[#0F172A]`}
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#3C55A5] peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 font-description"
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#3C55A5] transition-colors"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-1 text-extra-small text-red-500 font-description">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="space-y-2 text-gray-600 font-description text-base">
            <div className="flex items-center">
              <FaCheckCircle className="mr-2 text-gray-600" />
              <span>Password must be at least 8 characters</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="mr-2 text-gray-600" />
              <span>Include at least 1 letter and 1 number</span>
            </div>
          </div>

          {/* Submit Button */}
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
              "Reset Password"
            )}
          </button>

          {/* API Error Display */}
          {formik.errors.apiError && (
            <p className="mt-1 text-extra-small text-red-500 font-description text-center">
              {formik.errors.apiError}
            </p>
          )}
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

export default ResetPassword;