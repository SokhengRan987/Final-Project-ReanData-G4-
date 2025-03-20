import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import BarChart from "../../components/foodAndBeverages/genderDistribution/BarChart";
import DoughnutChart from "../../components/foodAndBeverages/genderDistribution/DoughnutChart";

export default function GenderDistribution() {
  const [chartType, setChartType] = useState("doughnut"); // Default to doughnut chart

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      mirror: true,
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-cols-1 border-2 border-gray-100 rounded-[20px] p-6 bg-white shadow-sm"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Gender Distribution
            </h2>
          {/* Chart Type Toggle */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex shadow-sm">
              <button
                onClick={() => setChartType("bar")}
                className={`px-4 py-2 text-sm rounded-l-[20px] font-medium transition-colors duration-200 ${
                  chartType === "bar"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200 focus:outline-none`}
              >
                Bar Chart
              </button>
              <button
                onClick={() => setChartType("doughnut")}
                className={`px-4 py-2 text-sm font-medium rounded-r-[20px] transition-colors duration-200 ${
                  chartType === "doughnut"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200 focus:outline-none`}
              >
                Doughnut Chart
              </button>
            </div>
          </div>

          {/* Render Selected Chart */}
          <div className="w-full" data-aos="fade-up" data-aos-delay="200">
            {chartType === "bar" && <BarChart />}
            {chartType === "doughnut" && <DoughnutChart />}
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="mt-8 overflow-visible">
          <div 
            className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              This graph shows the gender breakdown of respondents, which is
              essential for understanding gender-related preferences and trends.
              It helps determine whether the target audience is predominantly male
              or female, enabling better-tailored marketing strategies and product development.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}