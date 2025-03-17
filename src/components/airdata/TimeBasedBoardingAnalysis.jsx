import React, { useState, useEffect } from "react";
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  // Helper function to format hour display - defined at the top so it can be used throughout the component
  const formatHourDisplay = (hour) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  // Use the provided API query hook
  const { data = [], isLoading, error } = useGetTimeBaseAnalysisQuery();

  // Extract available dates from the API data
  useEffect(() => {
    if (data && data.length > 0) {
      // Get unique dates from the data
      const uniqueDates = [...new Set(data.map(item => {
        const date = new Date(item.hour_of_day);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
      }))].sort();
      
      setAvailableDates(uniqueDates);
      
      // Set the default selected date to the most recent date
      if (!selectedDate && uniqueDates.length > 0) {
        setSelectedDate(uniqueDates[uniqueDates.length - 1]);
      }
    }
  }, [data, selectedDate]);

  // Filter data for the selected date
  const filteredData = data.filter(item => {
    if (!selectedDate) return true;
    const date = new Date(item.hour_of_day);
    return date.toISOString().split('T')[0] === selectedDate;
  });

  // Process data for visualization
  const processedData = filteredData.map((item) => {
    // Parse hour from API data
    const date = new Date(item.hour_of_day);
    const hour = date.getHours();

    // Format hour for display - ensuring 12 AM is properly displayed
    const hourFormatted = formatHourDisplay(hour);

    return {
      hour: hourFormatted,
      hourValue: hour, // For sorting and filtering
      count: item.boarding_count,
      originalTime: item.hour_of_day,
    };
  });

  // Create a complete 24-hour range dataset for selected date
  const completeHourRange = [];
  for (let i = 0; i < 24; i++) {
    // Find if we have data for this hour
    const hourData = processedData.find((item) => item.hourValue === i);

    completeHourRange.push({
      hour: formatHourDisplay(i),
      hourValue: i,
      count: hourData ? hourData.count : 0, // Use 0 if no data for this hour
      originalTime: hourData ? hourData.originalTime : null,
    });
  }

  // Sort data by hour
  const sortedData = [...completeHourRange].sort((a, b) => a.hourValue - b.hourValue);

  // Determine color intensity for heatmap
  const maxCount = Math.max(...sortedData.map((item) => item.count), 1);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading)
    return (
      <div>
        <Loader/>
      </div>
    );

  if (error)
    return <div className="text-red-500 p-4">Error loading boarding data</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Boarding Analysis by Hour</h2>
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

      {/* Date selection dropdown */}
      <div className="mb-6">
        <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Date:
        </label>
        <select
          id="date-select"
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        {selectedDate ? `Showing data for ${formatDate(selectedDate)}` : "Select a date to view data"}
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
                tick={{ fontSize: 11 }}
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
                <tr key={index} className={item.hourValue === 0 ? "bg-gray-50" : ""}>
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
        Total Boardings for {formatDate(selectedDate)}:{" "}
        {sortedData.reduce((sum, item) => sum + item.count, 0)}
      </div>
    </div>
  );
};

export default TimeBasedBoardingAnalysis;