// /src/components/NavbarSlidComponent.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";

const NavbarSlidComponent = () => {
  // Initialize user data from localStorage or fallback to defaults
  const storedData = localStorage.getItem("userData");
  const userDataInitial = storedData ? JSON.parse(storedData) : {};
  const hasAccessToken = !!localStorage.getItem("accessToken"); // Check if logged in

  const [userData, setUserData] = useState({
    profileImage: userDataInitial.profileImage || "https://via.placeholder.com/40", // Fallback image
    firstName: userDataInitial.firstName || "John",
    lastName: userDataInitial.lastName || "Doe",
    email: userDataInitial.email || "john.doe@example.com",
  });

  const profileRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check screen size for mobile view
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggle profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside); // Fixed cleanup
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="fixed right-0 left-0 md:left-64 z-30 border-b border-gray-200"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="px-4 py-3 flex justify-between md:justify-end items-center">
        {isMobile && <div className="w-8"></div>}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/30"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-medium">
                    {userData.firstName[0]}
                    {userData.lastName[0]}
                  </span>
                )}
              </div>
              <span className="hidden md:block font-medium text-gray-800">
                {userData.firstName} {userData.lastName}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg py-2 border border-gray-200/50"
                style={{
                  backdropFilter: "blur(16px)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <div className="px-4 py-2 border-b border-gray-200/50 flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                    {userData.profileImage ? (
                      <img
                        src={userData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium">
                        {userData.firstName[0]}
                        {userData.lastName[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {userData.firstName} {userData.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{userData.email}</div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-white/50 flex items-center"
                >
                  <User className="h-4 w-4 mr-2" /> Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-white/50 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSlidComponent;

