import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import ScatterPlot from "../../components/foodAndBeverages/averageSpendings/ScatterPlot";
import GroupedBarChart from "../../components/foodAndBeverages/averageSpendings/GroupedBarChart";

export default function AverageSpending() {
  const [selectedGraph, setSelectedGraph] = useState("scatter"); // Default to ScatterPlot

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      mirror: true,
      once: false,
    });
  }, []); // Removed AOS.refresh() to match the sample's optimization

  // Dynamic storytelling based on selected graph
  const getStorytellingText = () => {
    switch (selectedGraph) {
      case "scatter":
        return "This scatter plot compares average spending across different value priorities (quality, affordability, ambiance). It helps identify how spending correlates with the factors customers value most.";
      case "bar":
        return "This grouped bar chart displays average spending across different value priorities (quality, affordability, ambiance), making it easy to compare categories side by side.";
      default:
        return "This graph compares average spending across different value priorities (quality, affordability, ambiance), providing insights into customer preferences.";
    }
  };

  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-cols-1 border-2 border-gray-200 rounded-[20px] p-6 bg-white shadow-md"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Graph Selection Toggle */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex shadow-sm">
              <button
                type="button" // Added for accessibility
                onClick={() => setSelectedGraph("scatter")}
                className={`px-4 py-2 text-sm rounded-l-[20px] font-medium ${
                  selectedGraph === "scatter"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
                aria-label="Show Scatter Plot"
              >
                Scatter Plot
              </button>
              <button
                type="button"
                onClick={() => setSelectedGraph("bar")}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedGraph === "bar"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200 rounded-r-[20px]`}
                aria-label="Show Grouped Bar Chart"
              >
                Grouped Bar Chart
              </button>
            </div>
          </div>

          {/* Chart Title */}
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Average Spending by Value Priority
            </h2>
          </div>

          {/* Render Selected Graph */}
          <div className="w-full">
            {selectedGraph === "scatter" && <ScatterPlot />}
            {selectedGraph === "bar" && <GroupedBarChart />}
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="mt-8 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 bg-blue-50 shadow-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">{getStorytellingText()}</p>
          </div>
        </section>
      </div>
    </div>
  );
}