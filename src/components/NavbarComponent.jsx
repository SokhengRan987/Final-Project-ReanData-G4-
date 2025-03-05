import React, { useState, useEffect } from "react";
import logo from "../img/reandata.png";

export default function NavbarComponent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-transparent shadow-md"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 w-full h-1 transition-all duration-200"
        style={{
          width: `${scrollProgress}%`,
          background: "#84e1bc", // Green color
          boxShadow: "0 0 10px #84e1bc", // Glowing green effect
        }}
      ></div>

      {/* Navbar Content */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Reandata logo" className="h-8" />
        </a>

        {/* Right-side Buttons (Visible on larger screens) */}
        <div className="hidden md:flex md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-[#3C55A5] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2"
          >
            Login
          </button>
          <button
            type="button"
            className="text-white bg-[#22B04B] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2"
          >
            Get started
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
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
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            dropdownOpen ? "block" : "hidden"
          } md:block`} // Always show on larger screens
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Datasets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="/about-us"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Help & Support
              </a>
            </li>

            {/* Login and Get Started Buttons (Visible in dropdown on small screens) */}
            <li className="md:hidden mt-4">
              <button
                type="button"
                className="w-full text-white bg-[#3C55A5] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2 mb-2"
              >
                Login
              </button>
              <button
                type="button"
                className="w-full text-white bg-[#22B04B] opacity-80 hover:opacity-100 hover:scale-105 duration-300 transition-all ease-in-out font-medium rounded-[20px] text-sm px-4 py-2"
              >
                Get started
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}