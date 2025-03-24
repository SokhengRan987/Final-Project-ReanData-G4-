import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import BarChart from "../../components/foodAndBeverages/genderDistribution/BarChart";
import DoughnutChart from "../../components/foodAndBeverages/genderDistribution/DoughnutChart";

export default function GenderDistribution() {
  const [chartType, setChartType] = useState("doughnut"); // Default to doughnut chart
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      mirror: true,
      once: false,
    });
    AOS.refresh();
  }, []);

  const chartOptions = [
    { id: "bar", label: "Bar Chart" },
    { id: "doughnut", label: "Doughnut Chart" },
  ];

  return (
    <div className="my-6">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-cols-1 border-2 border-gray-100 rounded-[20px] p-6 bg-white shadow-sm"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
            Gender Distribution
          </h2>

          {/* Chart Type Toggle - Dropdown for mobile, Buttons for larger screens */}
          <div className="flex justify-end mb-4">
            {/* Mobile Dropdown */}
            <div className="md:hidden relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-[20px] shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                {chartOptions.find((option) => option.id === chartType)
                  ?.label || "Select Chart Type"}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="py-1">
                    {chartOptions.map((option) => (
                      <li key={option.id}>
                        <button
                          onClick={() => {
                            setChartType(option.id);
                            setDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            chartType === option.id
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Desktop Button Group */}
            <div className="hidden md:inline-flex shadow-sm">
              <button
                onClick={() => setChartType("bar")}
                className={`px-4 py-2 text-sm rounded-l-[20px] font-medium ${
                  chartType === "bar"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Bar Chart
              </button>
              <button
                onClick={() => setChartType("doughnut")}
                className={`px-4 py-2 text-sm rounded-r-[20px] font-medium ${
                  chartType === "doughnut"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Doughnut Chart
              </button>
            </div>
          </div>

          {/* Chart Title */}
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75"></div>

          {/* Render Selected Chart */}
          <div className="w-full">
            {chartType === "bar" && <BarChart />}
            {chartType === "doughnut" && <DoughnutChart />}
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="mt-8 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              This graph shows the gender breakdown of respondents, which is
              essential for understanding gender-related preferences and trends.
              It helps determine whether the target audience is predominantly
              male or female, enabling better-tailored marketing strategies and
              product development.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
