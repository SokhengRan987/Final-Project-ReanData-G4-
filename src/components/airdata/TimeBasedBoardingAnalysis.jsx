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

import { useGetTimeBaseAnalysisQuery } from "../../redux/service/timeBaseAnalysis";
import Loader from "../loading/Loader";

const TimeBasedBoardingAnalysis = () => {
  const [viewType, setViewType] = useState("line"); // 'line' or 'heatmap'

  // Use the provided API query hook
  const { data = [], isLoading, error } = useGetTimeBaseAnalysisQuery();

  // Get current hour
  const currentHour = new Date().getHours();

  // Process data for visualization
  const processedData = data.map((item) => {
    // Parse hour from API data
    const date = new Date(item.hour_of_day);
    const hour = date.getHours();

    // Format hour for display
    const hourFormatted =
      hour < 12
        ? `${hour === 0 ? 12 : hour} AM`
        : `${hour === 12 ? 12 : hour - 12} PM`;

    return {
      hour: hourFormatted,
      hourValue: hour, // For sorting and filtering
      count: item.boarding_count,
      originalTime: item.hour_of_day,
    };
  });

  // Create a complete 10-hour range dataset
  const completeHourRange = [];
  for (let i = 0; i <= 10; i++) {
    const hourValue = (currentHour + i) % 24;
    const hourFormatted =
      hourValue < 12
        ? `${hourValue === 0 ? 12 : hourValue} AM`
        : `${hourValue === 12 ? 12 : hourValue - 12} PM`;

    // Find if we have data for this hour
    const hourData = processedData.find((item) => item.hourValue === hourValue);

    completeHourRange.push({
      hour: hourFormatted,
      hourValue: hourValue,
      count: hourData ? hourData.count : 0, // Use 0 if no data for this hour
      originalTime: hourData ? hourData.originalTime : null,
    });
  }

  // Sort data by hour (should already be in order, but just to be safe)
  const sortedData = [...completeHourRange].sort((a, b) => {
    // Custom sort to keep hours in chronological order starting from current hour
    const hourDiffA = (a.hourValue - currentHour + 24) % 24;
    const hourDiffB = (b.hourValue - currentHour + 24) % 24;
    return hourDiffA - hourDiffB;
  });

  // Determine color intensity for heatmap
  const maxCount = Math.max(...sortedData.map((item) => item.count), 1);

  // Generate end hour for display
  const endHourValue = (currentHour + 10) % 24;
  const endHourFormatted =
    endHourValue < 12
      ? `${endHourValue === 0 ? 12 : endHourValue} AM`
      : `${endHourValue === 12 ? 12 : endHourValue - 12} PM`;

  const startHourFormatted =
    currentHour < 12
      ? `${currentHour === 0 ? 12 : currentHour} AM`
      : `${currentHour === 12 ? 12 : currentHour - 12} PM`;

  if (isLoading)
    return (
      <div>
        <Loader/>
      </div>
    );

  if (error)
    return <div className="text-red-500 p-4">Error loading boarding data</div>;

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

      <div className="text-sm text-gray-600 mb-4">
        Showing data from {startHourFormatted} to {endHourFormatted}
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
        <div className="max-h-96 overflow-y-auto">
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

      <div className="mt-4 text-sm text-gray-500">
        Total Boardings (next 10 hours):{" "}
        {sortedData.reduce((sum, item) => sum + item.count, 0)}
      </div>
    </div>
  );
};

export default TimeBasedBoardingAnalysis;
