import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";

const NavbarSlidComponent = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement dark mode functionality here
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav 
      className="fixed left-64 right-0 z-50 border-b border-gray-200/30"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        // backgroundColor: "rgba(255, 255, 255, 0.6)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
      }}
    >
      <div 
        className="px-4 py-3 flex justify-between items-center"
      >
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-[20px] border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/30"
              style={{
                transition: "background-color 0.2s ease"
              }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium shadow-sm">
                JD
              </div>
              <span className="hidden md:block font-medium text-gray-800">John Doe</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>

            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 rounded-lg py-2 border border-gray-200/50"
                style={{
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
              >
                <div className="px-4 py-2 border-b border-gray-200/50">
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-gray-500">john.doe@example.com</div>
                </div>
                <Link
                  to="/profile"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-white/50 flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-white/50 flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                <div className="border-t border-gray-200/50 my-1"></div>
                <Link
                  to="/logout"
                  className="px-4 py-2 text-sm text-red-600 hover:bg-white/50 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSlidComponent;