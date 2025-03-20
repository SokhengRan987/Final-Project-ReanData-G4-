import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/reandata.png";

export default function NavbarComponent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [profileData, setProfileData] = useState(null); // State for profile data
  const navigate = useNavigate();
  const location = useLocation();

  const storedData = localStorage.getItem("userData");
  const userDataInitial = storedData ? JSON.parse(storedData) : {};
  const hasAccessToken = !!localStorage.getItem("accessToken"); // Check if logged in

  const [userData, setUserData] = useState({
    profileImage: userDataInitial.profileImage || "https://via.placeholder.com/40",
  });

  // Handle "Get Started" button click
  const handleGetStartedClick = () => {
    if (hasAccessToken) {
      navigate("/boarding-statistics");
    } else {
      navigate("/login");
    }
    setDropdownOpen(false); // Close dropdown on mobile
  };

  // Handle "Login" button click
  const handleLoginRedirect = () => {
    navigate("/login");
    setDropdownOpen(false); // Close dropdown on mobile
  };

  // Handle "Profile" navigation
  const handleProfileRedirect = () => {
    navigate("/profile"); // Adjust this route to your actual profile page
    setDropdownOpen(false); // Close dropdown on mobile
  };

  // Scroll progress effect
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setDropdownOpen(false); // Close mobile menu on navigation
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarElement = document.getElementById("navbar-container");
      if (navbarElement && !navbarElement.contains(event.target) && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav
      id="navbar-container"
      className="sticky top-0 z-50 border-b border-gray-200"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-1 transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "#84e1bc",
          boxShadow: "0 0 10px #84e1bc",
        }}
      ></div>

      {/* Navbar Content */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Reandata logo" className="h-8" />
        </NavLink>

        {/* Right-side Buttons (Desktop) */}
        <div className="hidden md:flex md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
          <button
            onClick={handleGetStartedClick}
            className="text-white bg-[#22B04B] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2"
          >
            Get Started
          </button>
          {!hasAccessToken ? (
            <NavLink
              to="/login"
              className="text-white bg-[#3C55A5] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2"
              onClick={handleLoginRedirect}
            >
              Login
            </NavLink>
          ) : (
            <NavLink
              to="/profile"
              className="flex items-center justify-center w-10 h-10 bg-[#3C55A5] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-full text-sm"
              onClick={handleProfileRedirect}
            >
              <img
                src={userData.profileImage || "https://via.placeholder.com/40"} // Fallback image
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Toggle menu"
          aria-expanded={dropdownOpen}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={dropdownOpen ? "M1 1L16 14M1 14L16 1" : "M1 1h15M1 7h15M1 13h15"}
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            dropdownOpen ? "block" : "hidden"
          } md:block transition-all duration-300`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-200 rounded-lg md:bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <NavLink
                to="/dataset"
                className={({ isActive }) =>
                  `block py-2 px-3 md:p-0 rounded-sm transition-all ${
                    isActive ? "text-blue-700 font-semibold" : "text-gray-900 hover:text-blue-600"
                  }`
                }
                onClick={() => setDropdownOpen(false)}
              >
                Datasets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/documentation"
                className={({ isActive }) =>
                  `block py-2 px-3 md:p-0 rounded-sm transition-all ${
                    isActive ? "text-blue-700 font-semibold" : "text-gray-900 hover:text-blue-600"
                  }`
                }
                onClick={() => setDropdownOpen(false)}
              >
                Documentation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `block py-2 px-3 md:p-0 rounded-sm transition-all ${
                    isActive ? "text-blue-700 font-semibold" : "text-gray-900 hover:text-blue-600"
                  }`
                }
                onClick={() => setDropdownOpen(false)}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help&support"
                className={({ isActive }) =>
                  `block py-2 px-3 md:p-0 rounded-sm transition-all ${
                    isActive ? "text-blue-700 font-semibold" : "text-gray-900 hover:text-blue-600"
                  }`
                }
                onClick={() => setDropdownOpen(false)}
              >
                Help & Support
              </NavLink>
            </li>
           

            {/* Login and Get Started Buttons (Mobile) */}
            <li className="md:hidden mt-4 flex">
              {!hasAccessToken ? (
                <NavLink
                  to="/login"
                  className="block text-center text-white bg-[#3C55A5] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2 mr-2"
                  onClick={handleLoginRedirect}
                >
                  Login
                </NavLink>
              ) : (
                <NavLink
                  to="/profile"
                  className="flex items-center justify-center w-10 h-10 bg-[#3C55A5] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-full text-sm mr-2"
                  onClick={handleProfileRedirect}
                >
                  <img
                    src={profileData?.profileImage || "https://via.placeholder.com/40"} // Fallback image
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </NavLink>
              )}
              <button
                onClick={handleGetStartedClick}
                className="block text-center text-white bg-[#22B04B] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}