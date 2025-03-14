"use client"

import { useState } from "react"

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    user_email: "",
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (formData.new_password !== formData.new_confirm_password) {
      alert("New password and confirm password do not match!")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        alert("Password changed successfully!")
        setFormData({
          user_email: "",
          current_password: "",
          new_password: "",
          new_confirm_password: "",
        })
      } else {
        alert(data.message || "Failed to change password.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
      console.error("Error changing password:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-start p-4 sm:p-6 md:p-8">
      {/* Main Container */}
      <div className="mt-[60px] mb-[40px] w-full max-w-7xl relative z-10">
        <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl transform transition-all duration-700 hover:shadow-[0_0_30px_rgba(60,85,165,0.2)]">
          {/* Header */}
          <h2 className="text-h2 md:text-h1 font-heading font-bold text-center mb-4 text-primary-500">
            Secure Your Account
          </h2>
          <p className="text-sub-description font-description text-center mb-10 font-light tracking-wide text-text-700">
            Update your password with a modern twist
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="group relative">
                <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="group relative">
                <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="group relative">
                <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="group relative">
                <label className="block text-extra-small font-description mb-2 transition-all duration-300 group-focus-within:text-primary-500 text-text-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="new_confirm_password"
                  value={formData.new_confirm_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button - Aligned to the right */}
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`relative px-8 py-4 rounded-full text-small font-heading font-semibold text-white transition-all duration-300 transform ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600 hover:scale-105"
                } shadow-lg hover:shadow-[0_0_20px_rgba(60,85,165,0.4)]`}
              >
                <span className="relative z-10">
                  {loading ? (
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
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Update Password"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword

