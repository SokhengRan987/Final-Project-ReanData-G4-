// src/pages/Profile.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Add react-router-dom for navigation
import { useUpdateUserMutation, useUpdateUserProfileImageMutation, isValidUuid } from "../redux/services/authSlice";

const Profile = () => {
  const navigate = useNavigate(); // Add navigation
  const [isEditing, setIsEditing] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photoErrorMessage, setPhotoErrorMessage] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    profileImage: null,
    email: "",
  });
  const [originalProfileData, setOriginalProfileData] = useState(null);

  const fileInputRef = useRef(null);

  const [storedUserData, setStoredUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("userData") || "{}");
      return {
        user_uuid: localStorage.getItem("userUuid") || data.user_uuid || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        username: data.username || "",
        profileImage: data.profileImage || null,
        email: data.email || "",
      };
    }
    return { user_uuid: "", firstName: "", lastName: "", username: "", profileImage: null, email: "" };
  });

  const userUuid = localStorage.getItem("userUuid") || storedUserData.user_uuid;

  const [updateUser, { isLoading: isUpdatingUser, error: updateUserError, isSuccess: isUserSuccess }] =
    useUpdateUserMutation();
  const [updateUserProfileImage, { isLoading: isUpdatingImage, error: updateImageError, isSuccess: isImageSuccess }] =
    useUpdateUserProfileImageMutation();

  useEffect(() => {
    console.log("Initial userUuid:", userUuid);
    if (userUuid) {
      const initialData = {
        firstName: storedUserData.firstName,
        lastName: storedUserData.lastName,
        username: storedUserData.username || storedUserData.lastName + "168",
        profileImage: storedUserData.profileImage,
        email: storedUserData.email,
      };
      setProfileData(initialData);
      setOriginalProfileData(initialData);
      setAnimateIn(true);
    } else {
      // Redirect to login if not logged in
      navigate("/login");
    }
  }, [userUuid, navigate]);

  useEffect(() => {
    if (isImageSuccess || isUserSuccess) {
      setSuccessMessage("Successfully updated!");
      setErrorMessage("");
      setPhotoErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
      setOriginalProfileData({ ...profileData });

      const updatedUserData = {
        user_uuid: userUuid,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        username: profileData.username,
        profileImage: profileData.profileImage,
        email: profileData.email,
      };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setStoredUserData(updatedUserData);
    }
  }, [isImageSuccess, isUserSuccess, profileData, userUuid]);

  useEffect(() => {
    if (updateImageError || updateUserError) {
      const error = updateImageError || updateUserError;
      console.error("Update Error Details:", error);
      let detailedMessage = "An unexpected error occurred. Please try again or contact support.";

      if (error?.status === 404) {
        detailedMessage = "Endpoint not found. Please check the server configuration.";
      } else if (error?.status === 409 && error?.data?.details?.includes("Key (user_name)=")) {
        detailedMessage = "The username is already taken. Please choose a different username (e.g., @polin169 or @chaingpolin1).";
      } else if (error.status === "FETCH_ERROR") {
        detailedMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.status === 400) {
        detailedMessage = "Invalid input. Please check your data and try again.";
      } else if (error.status === 401) {
        detailedMessage = "Unauthorized. Please log in again.";
        navigate("/login"); // Redirect to login on 401
      } else if (error.status === 500) {
        detailedMessage = "Server error. Please try again later.";
      }

      setErrorMessage(detailedMessage);
      setSuccessMessage("");
      setProfileData({ ...originalProfileData });
    }
  }, [updateImageError, updateUserError, navigate, originalProfileData]);

  const handleImageChange = (e) => {
    setPhotoErrorMessage("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setPhotoErrorMessage("Please upload a valid image (JPEG, PNG, or GIF).");
        setTimeout(() => setPhotoErrorMessage(""), 3000);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setPhotoErrorMessage("Image size must be less than 5MB.");
        setTimeout(() => setPhotoErrorMessage(""), 3000);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image selected, updating profileData.profileImage");
        setProfileData({ ...profileData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoErrorMessage("No new photo selected. Please choose a photo to upload.");
      setTimeout(() => setPhotoErrorMessage(""), 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const validateProfileData = () => {
    if (!profileData.firstName || profileData.firstName.trim() === "") return "First name is required.";
    if (profileData.firstName.length > 50) return "First name must be less than 50 characters.";
    if (!profileData.lastName || profileData.lastName.trim() === "") return "Last name is required.";
    if (profileData.lastName.length > 50) return "Last name must be less than 50 characters.";
    if (!profileData.username || profileData.username.trim() === "") return "Username is required.";
    if (profileData.username.length > 30) return "Username must be less than 30 characters.";
    if (!/^@?[\w\d]+$/.test(profileData.username)) return "Username must contain only letters, numbers, or underscores.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userUuid) {
      setErrorMessage("Cannot update profile: No user logged in.");
      navigate("/login");
      return;
    }

    const validationError = validateProfileData();
    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage("");
      return;
    }

    try {
      // Validate userUuid format
      if (!isValidUuid(userUuid)) {
        throw new Error("Invalid user UUID format");
      }

      // Only update user data if there are changes
      const hasChanges =
        profileData.firstName !== originalProfileData.firstName ||
        profileData.lastName !== originalProfileData.lastName ||
        profileData.username !== originalProfileData.username;

      if (hasChanges) {
        const userPayload = {
          first_name_input: profileData.firstName,
          last_name_input: profileData.lastName,
          user_name_input: profileData.username,
          user_uuid_input: userUuid,
        };
        console.log("Submitting user update with payload:", userPayload);
        await updateUser(userPayload).unwrap();
      } else {
        console.log("No changes detected in user data, skipping updateUser");
      }

      // Update profile image if it has changed
      if (profileData.profileImage && profileData.profileImage !== originalProfileData.profileImage) {
        const imagePayload = {
          image: profileData.profileImage,
          p_user_uuid: userUuid,
        };
        console.log("Submitting profile image update with payload:", imagePayload);
        await updateUserProfileImage(imagePayload).unwrap();
      }

      setIsEditing(false);
      console.log("Profile data saved:", profileData);
      window.location.reload();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

   // Profile image click handler
   const handleProfileClick = () => {
    if (
      userUuid &&
      isValidUuid(userUuid) &&
      localStorage.getItem("accessToken") &&
      isEditing // Only allow clicking when in edit mode
    ) {
      fileInputRef.current.click();
    } else if (!userUuid || !localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  };


  const isLoggedIn = !!userUuid;

  return (
    <div className="min-h-screen bg-white flex items-start justify-start p-4 sm:p-6 md:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full opacity-40 blur-xl"></div>
        <div className="absolute top-1/4 left-12 w-64 h-64 bg-primary-500/15 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-primary-500/25 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div
        className={`mt-[60px] mb-[40px] w-full max-w-7xl transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-text-100">
          <div className="relative h-56 overflow-hidden bg-primary-500">
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full opacity-20"
                  style={{
                    width: `${Math.random() * 20 + 5}px`,
                    height: `${Math.random() * 20 + 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float${i % 3} ${Math.random() * 10 + 5}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-9 md:px-16 md:py-12 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col items-center md:flex-row md:items-center">
                <div className="relative group">
                  <div
                    className={`h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full border-4 border-white shadow-xl overflow-hidden text-white text-h5 font-heading -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36 relative z-10 bg-gradient-to-br from-primary-500 to-primary-400 transition-transform duration-300 ease-in-out transform ${
                      isLoggedIn ? "group-hover:scale-105 group-hover:cursor-pointer" : ""
                    }`}
                    onClick={handleProfileClick}
                  >
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="flex items-center justify-center h-full w-full">
                        {isLoggedIn ? (profileData.firstName[0] || "") + (profileData.lastName[0] || "") : "?"}
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                  <h1 className="text-h4 font-heading text-primary-500">
                    {profileData.firstName || "Guest"} {profileData.lastName || "User"}
                  </h1>
                  <p className="font-description text-base text-text-700 flex items-center justify-center md:justify-start">
                    <span className="mr-1 text-primary-500">@</span>
                    <span className="truncate">{profileData.username || "guest"}</span>
                  </p>
                  {profileData.email ? (
                    <p className="font-description text-base text-text-700 flex items-center justify-center md:justify-start mt-2">
                      <span className="mr-1 text-primary-500">✉️</span>
                      <span className="truncate">{profileData.email}</span>
                    </p>
                  ) : (
                    <p className="font-description text-base text-text-500 flex items-center justify-center md:justify-start mt-2">
                      Email not available
                    </p>
                  )}
                  {!isLoggedIn && (
                    <p className="font-description text-base text-text-500 flex items-center justify-center md:justify-start mt-2">
                      Please log in to edit your profile
                    </p>
                  )}
                  {photoErrorMessage && (
                    <p className="font-description text-base text-red-600 flex items-center justify-center md:justify-start mt-2">
                      {photoErrorMessage}
                    </p>
                  )}
                </div>
              </div>

              {isLoggedIn && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 md:mt-0 inline-flex items-center px-6 py-2.5 border rounded-[10px] shadow-sm text-base font-heading text-white transition-all duration-300 hover:shadow-md bg-primary-500 border-primary-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

            {isLoggedIn && isEditing && (
              <div className="mt-8 md:mt-10 ">
                <div
                  className={`transition-all duration-500 ${
                    isEditing ? "opacity-100 scale-100 " : "opacity-0 scale-95"
                  }`}
                >
                  <form onSubmit={handleSubmit} className="w-full mx-auto">
                    {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
                    {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                      <div className="group">
                        <label htmlFor="firstName" className="block text-small font-description text-text-700 mb-1.5 group-focus-within:text-primary-500 transition-colors duration-200">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                          disabled={isUpdatingUser || isUpdatingImage}
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="lastName" className="block text-small font-description text-text-700 mb-1.5 group-focus-within:text-primary-500 transition-colors duration-200">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                          disabled={isUpdatingUser || isUpdatingImage}
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="username" className="block text-small font-description text-text-700 mb-1.5 group-focus-within:text-primary-500 transition-colors duration-200">
                          Username
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-primary-500">@</span>
                          </div>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={profileData.username}
                            onChange={handleInputChange}
                            className="block w-full pl-8 pr-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                            disabled={isUpdatingUser || isUpdatingImage}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="w-full sm:w-auto px-4 sm:px-5 py-2.5 border-2 rounded-[10px] shadow-sm text-sm sm:text-base font-heading text-text-700 bg-white hover:bg-text-100 transition-all duration-300 hover:shadow-md"
                        style={{ borderColor: "#E5E7EB" }}
                        disabled={isUpdatingUser || isUpdatingImage}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUpdatingUser || isUpdatingImage}
                        className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 border rounded-[10px] shadow-md text-sm sm:text-base font-heading text-white transition-all duration-300 hover:shadow-md bg-primary-500 border-primary-500 ${
                          (isUpdatingUser || isUpdatingImage) ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isUpdatingUser || isUpdatingImage ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2"
                              viewBox="0 0 24 24"
                            >
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
                            Saving...
                          </span>
                        ) : (
                          "Save Profile"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float0 {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
            100% { transform: translateY(-40px) rotate(360deg); opacity: 0; }
          }
          @keyframes float1 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-30px) translateX(20px) rotate(180deg); opacity: 0.3; }
            100% { transform: translateY(-60px) translateX(40px) rotate(360deg); opacity: 0; }
          }
          @keyframes float2 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-40px) translateX(-20px) rotate(180deg); opacity: 0.3; }
            100% { transform: translateY(-80px) translateX(-40px) rotate(360deg); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Profile;