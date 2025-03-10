import React, { useState, useEffect } from "react";
import logo from "../img/reandata.png";
import { LeafyGreen } from "lucide-react";

export default function NavbarComponent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight === 0 ? 0 : (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/95 shadow-lg transition-all duration-300"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Progress Bar */}
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2 group">
              <img
                src={logo}
                alt="Reandata logo"
                className="h-9 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-semibold text-gray-800 hidden sm:inline">
                {/* Reandata */}
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-8">
              {["Datasets", "Documentation", "About Us", "Help & Support"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={item === "About Us" ? "/about-us" : "#"}
                      className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              className="text-gray-700 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Toggle menu"
              aria-expanded={dropdownOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {dropdownOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {dropdownOpen && (
          <div className="md:hidden">
            <ul className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              {["Datasets", "Documentation", "About Us", "Help & Support"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={item === "About Us" ? "/about-us" : "#"}
                      className="text-gray-700 hover:text-green-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
              <li>
                <button
                  className="w-full text-left text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}