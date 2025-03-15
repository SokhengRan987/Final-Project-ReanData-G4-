import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetChangePasswordMutation } from "../redux/services/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading, error: apiError, isSuccess, data }] = useGetChangePasswordMutation();

  // Check if user is logged in and pre-fill email
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = localStorage.getItem("userPassword");

    if (!accessToken || !userEmail || !userPassword) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  // Handle API success or error
  useEffect(() => {
    if (isSuccess && data && data.success) {
      // Invalidate the current session by removing all related data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userUuid");
      // Note: userPassword is updated in authSlice.js after successful change
      console.log("Password changed successfully, session invalidated. Response:", data);
      setTimeout(() => {
        navigate("/login"); // Force re-authentication with new password
      }, 3000);
    }
    if (apiError) {
      console.error("API Error:", apiError);
    }
  }, [isSuccess, apiError, data, navigate]);

  // Yup validation schema
  const validationSchema = Yup.object({
    user_email: Yup.string().email("Invalid email format").required("Email is required"),
    current_password: Yup.string()
      .required("Current password is required")
      .test("match-current-password", "Current password does not match", (value) => {
        // Compare with the password stored in local storage
        const storedPassword = localStorage.getItem("userPassword");
        return value === storedPassword;
      }),
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "New password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "New password must include uppercase, lowercase, number, and special character"
      ),
    new_confirm_password: Yup.string()
      .required("Confirm new password is required")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  // Initial form values
  const initialValues = {
    user_email: localStorage.getItem("userEmail") || "",
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      const response = await changePassword(values).unwrap();
      if (!response.success) {
        // Handle backend-reported failure (e.g., user not found)
        if (response.message === "User not found") {
          setFieldError("user_email", "User not found. Please check your email.");
        } else {
          setFieldError("general", response.message || "Failed to change password.");
        }
      } else {
        resetForm();
      }
    } catch (err) {
      if (err?.status === 404) {
        setFieldError("user_email", "User not found. Please check your email.");
      } else if (err?.status === 422) {
        setFieldError("general", "Invalid input data. Please check your entries.");
      } else if (err?.status === 500) {
        setFieldError("general", "Server error occurred. Please try again later.");
      } else {
        setFieldError("general", err?.message || "Failed to change password. Please try again.");
      }
      console.error("Change password error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-start p-4 sm:p-6 md:p-8">
      <div className="mt-[60px] mb-[40px] w-full max-w-7xl relative z-10">
        <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl transform transition-all duration-700 hover:shadow-[0_0_20px_rgba(60,85,165,0.2)]">
          <h2 className="text-h2 md:text-h1 font-heading font-bold text-center mb-4 text-primary-500">
            Secure Your Account
          </h2>
          <p className="text-sub-description font-description text-center mb-10 font-light tracking-wide text-text-700">
            Update your password with a modern twist
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="relative z-10 max-w-3xl mx-auto">
                <div className="space-y-6">
                  <div className="group relative">
                    <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="user_email"
                      className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                      placeholder="you@example.com"
                      disabled
                    />
                    <ErrorMessage name="user_email" component="p" className="text-red-500 text-small mt-1" />
                  </div>

                  <div className="group relative">
                    <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                      Current Password
                    </label>
                    <Field
                      type="password"
                      name="current_password"
                      className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                      placeholder="••••••••"
                    />
                    <ErrorMessage name="current_password" component="p" className="text-red-500 text-small mt-1" />
                  </div>

                  <div className="group relative">
                    <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                      New Password
                    </label>
                    <Field
                      type="password"
                      name="new_password"
                      className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                      placeholder="••••••••"
                    />
                    <ErrorMessage name="new_password" component="p" className="text-red-500 text-small mt-1" />
                  </div>

                  <div className="group relative">
                    <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                      Confirm New Password
                    </label>
                    <Field
                      type="password"
                      name="new_confirm_password"
                      className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                      placeholder="••••••••"
                    />
                    <ErrorMessage name="new_confirm_password" component="p" className="text-red-500 text-small mt-1" />
                  </div>

                  {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
                  {isSuccess && data?.success && <p className="text-green-500 text-center">Password changed successfully! Redirecting...</p>}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className={`relative px-8 py-4 rounded-full text-small font-heading font-semibold text-white transition-all duration-300 transform ${
                      isSubmitting || isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary-500 hover:bg-primary-600 hover:scale-105"
                    } shadow-lg hover:shadow-[0_0_20px_rgba(60,85,165,0.4)]`}
                  >
                    <span className="relative z-10">
                      {isSubmitting || isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Update Password"
                      )}
                    </span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;