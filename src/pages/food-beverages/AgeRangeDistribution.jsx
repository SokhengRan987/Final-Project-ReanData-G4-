import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import PieChart from "../../components/foodAndBeverages/ageRangeDistribution/PieChart";
import BarChart from "../../components/foodAndBeverages/ageRangeDistribution/BarChart";
import DoughnutChart from "../../components/foodAndBeverages/ageRangeDistribution/DoughnutChart";

export default function AgeRangeDistribution() {
  const [chartType, setChartType] = useState("bar"); // State to manage chart type

  useEffect(() => {
    AOS.init({
      duration: 900, // Default duration for all animations
      easing: "ease-in-out",
      mirror: true, // Animate elements again when scrolling up
      once: false, // Allow animations to repeat
    });
    // Optional: Refresh AOS on component update if dynamic content is added
    AOS.refresh();
  }, []);

  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-cols-1 border-2 border-gray-200 rounded-[20px] p-6 bg-white shadow-md"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          {/* Chart Type Toggle */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex shadow-sm">
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
                onClick={() => setChartType("pie")}
                className={`px-4 py-2 text-sm font-medium ${
                  chartType === "pie"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Pie Chart
              </button>
              <button
                onClick={() => setChartType("doughnut")}
                className={`px-4 py-2 text-sm font-medium ${
                  chartType === "doughnut"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200 rounded-r-[20px]`}
              >
                Doughnut Chart
              </button>
            </div>
          </div>

          {/* Chart Title */}
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Age Range Distribution
            </h2>
          </div>

          {/* Render Selected Chart */}
          <div className="w-full">
            {chartType === "pie" && <PieChart />}
            {chartType === "bar" && <BarChart />}
            {chartType === "doughnut" && <DoughnutChart />}
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="mt-8 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 bg-blue-50 shadow-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">
              This graph helps identify the distribution of users across
              different age ranges, providing insight into the survey's target
              demographic. A pie or doughnut chart effectively shows the
              relative proportions of age groups, while a bar chart offers a
              clear count comparison.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
