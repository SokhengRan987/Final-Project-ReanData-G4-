import React, { useState } from "react";
import { useGetAirPortDistributionQuery } from "../../../redux/service/airPortDistributionSlice";

export default function Map() {
  const { data, error, isLoading } = useGetAirPortDistributionQuery();
  const [selectedMetric, setSelectedMetric] = useState("airport_count");

  // Define continent colors
  const continentColors = {
    NA: "#FF7B7B", // Red
    AS: "#5BC0EB", // Light blue
    EU: "#4ECDC4", // Teal
    AF: "#FFA69E", // Coral
    SA: "#3498DB", // Blue
    OC: "#FFD166", // Yellow
  };

  // Get normalized metric value (percentage of max)
  const getNormalizedValue = (item) => {
    if (!data) return 0;
    // Get percentage based on maximum value in the data set
    const maxValue = Math.max(...data.map((d) => d[selectedMetric]));

    // Scale to fit the chart (0-28 range as in the example)
    return (item[selectedMetric] / maxValue) * 28;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  // Sort continents for the x-axis
  const sortedContinents = ["NA", "AS", "EU", "AF", "SA", "OC"];
  const sortedData = [...data].sort(
    (a, b) =>
      sortedContinents.indexOf(a.continent_req) -
      sortedContinents.indexOf(b.continent_req)
  );

  return (
    <div className="w-full p-8">
      <h1 className="text-4xl font-normal text-center mb-16">
        Airport Distribution by Continent
      </h1>

      <div className="relative w-full h-96">
        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-gray-500 w-8">
          <div>28</div>
          <div>21</div>
          <div>14</div>
          <div>7</div>
          <div>0</div>
        </div>

        {/* Chart area */}
        <div className="absolute left-8 right-0 inset-y-0 border-l border-b border-gray-300">
          {/* X-axis grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="border-t border-gray-200 h-0"></div>
            <div className="border-t border-gray-200 h-0"></div>
            <div className="border-t border-gray-200 h-0"></div>
            <div className="border-t border-gray-200 h-0"></div>
            <div className="border-t border-gray-200 h-0"></div>
          </div>

          {/* Data points */}
          <div className="absolute inset-0">
            {sortedData.map((item, index) => {
              const xPosition = `${(index / (sortedData.length - 1)) * 100}%`;
              const yPosition = `${
                100 - (getNormalizedValue(item) / 28) * 100
              }%`;

              return (
                <div
                  key={item.continent_req}
                  className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: xPosition,
                    top: yPosition,
                    backgroundColor: continentColors[item.continent_req],
                  }}
                ></div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 inset-x-0 flex justify-between translate-y-6 text-gray-500">
            {sortedContinents.map((continent) => (
              <div key={continent}>{continent}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center mt-4 gap-4">
        {sortedData.map((item) => (
          <div key={item.continent_req} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: continentColors[item.continent_req] }}
            ></div>
            <span className="text-sm">{item.continent_req}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
