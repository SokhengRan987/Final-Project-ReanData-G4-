import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoArrowBack } from "react-icons/io5";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const handleSendEmail = (values, { setSubmitting }) => {
    // In a real app, you'd send an email here
    console.log("Sending reset email to:", values.email);
    setSubmitting(false);
    navigate("/resetpassword");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
      style={{ background: "#dde2e9" }}
    >
      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white py-8 px-6 sm:px-8 rounded-3xl shadow-2xl border border-gray-200">
        {/* Back Arrow */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate("/login")}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            <IoArrowBack size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Form Header */}
        <h2 className="font-heading text-2xl sm:text-3xl text-[#3C55A5] mb-6 text-center animate-fade-in">
          Forgot Password
        </h2>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSendEmail}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-6">
              {/* Email Input */}
              <div className="">
                <div className="relative">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`peer w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
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
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-extra-small text-red-500 font-description"
                />
              </div>

              {/* Send Email Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#3C55A5] text-white rounded-lg hover:bg-[#2A3F7A] transition-all duration-300 transform hover:scale-105 font-description text-base"
              >
                Send Email
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 font-description text-base">
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="text-[#3C55A5] hover:text-[#2A3F7A]"
                >
                  Sign Up
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      {/* Inline Styles for Animations and Responsiveness */}
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