import React, { useState, useEffect } from "react";
import Loader from "../loading/Loader";
import { useGetPeakTravelTimeQuery } from "../../redux/service/peakTravelTime";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

export default function PeakTravelTimeComponent() {
  const { data, isLoading, error } = useGetPeakTravelTimeQuery();
  const [formattedData, setFormattedData] = useState([]);
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    if (data) {
      // Find maximum boarding count for color scaling
      const max = Math.max(...data.map((item) => item.boarding_count));
      setMaxCount(max);

      // Format data for the scatter chart
      const formatted = data.map((item) => ({
        x: item.hour_of_day,
        y: item.day_of_week,
        z: item.boarding_count,
        // Add formatted info for tooltip
        hourLabel: `${item.hour_of_day}:00 - ${item.hour_of_day + 1}:00`,
        dayLabel: getDayName(item.day_of_week),
        count: item.boarding_count,
      }));

      setFormattedData(formatted);
    }
  }, [data]);

  // Convert day number to name
  const getDayName = (dayNum) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayNum % 7];
  };

  // Generate color based on boarding count
  const getColor = (count) => {
    // Color scale from light blue to dark blue
    const intensity = Math.min(1, count / maxCount);
    return `rgb(0, ${Math.floor(144 + (1 - intensity) * 111)}, ${Math.floor(
      180 + (1 - intensity) * 75
    )})`;
  };

  // Custom tooltip to display detailed information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-lg">{data.dayLabel}</p>
          <p className="text-gray-700 text-sm">{data.hourLabel}</p>
          <p className="text-blue-600 font-bold text-lg">
            {data.count.toLocaleString()} boardings
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="p-4 text-red-500">
        Error loading peak travel time data
      </div>
    );

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Explore the boarding counts by day of the week and hour of the day.
      </p>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }} // Increased bottom margin
          >
            <XAxis
              type="number"
              dataKey="x"
              name="Hour"
              domain={[0, 23]}
              tickCount={24}
              ticks={[0, 3, 6, 9, 12, 15, 18, 21, 23]}
              label={{ value: "Hour of Day", position: "bottom", offset: 10 }} // Label offset
              tick={{ fontSize: 12, fill: "#333", dy: 10 }} // Add padding to ticks
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Day"
              domain={[0, 6]}
              tickCount={7}
              ticks={[0, 1, 2, 3, 4, 5, 6]}
              tickFormatter={getDayName}
              label={{ value: "Day of Week", angle: -90, position: "left", dx: -6 }}
              tick={{ fontSize: 12, fill: "#333", dx: -5 }}
            />
            <ZAxis type="number" dataKey="z" range={[400, 400]} />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={formattedData} fill="#8884d8">
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.z)} />
              ))}
            </Scatter>
            <Legend
              content={() => (
                <div className="flex justify-center items-center mt-8">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-full h-6 bg-gradient-to-r from-sky-100 to-blue-800"
                      style={{ width: "200px"}}
                    />
                    <div
                      className="flex justify-between w-full"
                      style={{ width: "200px" }}
                    >
                      <span className="text-xs">Low</span>
                      <span className="text-xs">High</span>
                    </div>
                  </div>
                </div>
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
