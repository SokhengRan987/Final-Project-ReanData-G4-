import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useGetTimeBaseAnalysisQuery } from "../redux/service/timeBaseAnalysis";

const TimeBasedBoardingAnalysis = () => {
  const [viewType, setViewType] = useState("line"); // 'line' or 'heatmap'

  // Use the provided API query hook
  const { data = [], isLoading, error } = useGetTimeBaseAnalysisQuery();

  // Process data for visualization
  const processedData = data.map((item) => {
    // Format the hour for display
    const date = new Date(item.hour_of_day);
    const hour = date.getHours();
    const hourFormatted =
      hour === 0
        ? "12 AM"
        : hour === 12
        ? "12 PM"
        : hour < 12
        ? `${hour} AM`
        : `${hour - 12} PM`;

    return {
      hour: hourFormatted,
      hourValue: hour, // For sorting
      count: item.boarding_count,
      originalTime: item.hour_of_day,
    };
  });

  // Sort data by hour
  const sortedData = [...processedData].sort(
    (a, b) => a.hourValue - b.hourValue
  );

  // Determine color intensity for heatmap
  const maxCount = Math.max(...sortedData.map((item) => item.count));

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading boarding data...
      </div>
    );

  if (error)
    return <div className="text-red-500 p-4">Error loading boarding data</div>;

  if (!data.length)
    return <div className="p-4">No boarding data available</div>;

  return (
    <div className="w-full bg-white rounded-[20px] shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl mb-8">Boarding Analysis by Hour</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-[20px] ${
              viewType === "line" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setViewType("line")}
          >
            Line Graph
          </button>
          <button
            className={`px-4 py-2 rounded-[20px] ${
              viewType === "heatmap" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setViewType("heatmap")}
          >
            Heatmap
          </button>
        </div>
      </div>

      {viewType === "line" ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sortedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hour"
                label={{
                  value: "Hour of Day",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Boarding Count",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value) => [`${value} boardings`, "Count"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-screen overflow-y-scroll">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Hour of Day</th>
                <th className="px-4 py-2 border">Boarding Count</th>
                <th className="px-4 py-2 border">Visualization</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{item.hour}</td>
                  <td className="px-4 py-2 border text-center">{item.count}</td>
                  <td className="px-4 py-2 border">
                    <div
                      className="h-6"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${
                          item.count / maxCount
                        })`,
                        width: `${(item.count / maxCount) * 100}%`,
                        minWidth: "4px",
                      }}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className=" text-sm text-gray-500 inline">
        Total Boardings: {sortedData.reduce((sum, item) => sum + item.count, 0)}
      </div>
    </div>
  );
};

export default TimeBasedBoardingAnalysis;
