import React, { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
  Label,
} from "recharts";
import Loader from "../../loading/Loader";
import { useGetAircraftUtilizationQuery } from "../../../redux/service/aircraftUtilization";

export default function ScatterPlotUtilization() {
  const { data, isLoading, error } = useGetAircraftUtilizationQuery();

  // Process data to create a more suitable format for the scatter plot
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((item) => ({
      name: `Class ${item.aircraft_class}`,
      x: item.avg_flights_per_aircraft,
      y: item.avg_passengers_per_aircraft,
      z: item.aircraft_count,
      aircraftClass: item.aircraft_class,
      avgRange: item.avg_range || "N/A",
      avgVelocity: item.avg_velocity || "N/A",
    }));
  }, [data]);

  // Create color map for different aircraft classes
  const colorMap = {
    0: "#6366F1", // Indigo
    1: "#10B981", // Emerald
    2: "#F59E0B", // Amber
    3: "#EF4444", // Red
    4: "#3B82F6", // Blue
  };

  // Class descriptions (you can replace these with actual descriptions)
  const classDescriptions = {
    0: "Long-range, low-frequency",
    1: "Ultra-long-range, high-capacity",
    2: "Medium-range, high-frequency",
    3: "Regional, high-frequency",
    4: "Short-range, low-capacity",
  };

  // Error handling with more context
  if (isLoading)
    return <Loader aria-label="Loading aircraft utilization data" />;
  if (error)
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
        <h3 className="font-bold">Error loading aircraft utilization data</h3>
        <p>{error.message || "Unknown error occurred"}</p>
        <p className="text-sm mt-2">
          Please check your network connection or try refreshing the page.
        </p>
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="p-4 border border-gray-200 rounded bg-gray-50">
        <p>No aircraft utilization data available. Please check back later.</p>
      </div>
    );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0]?.payload) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow">
          <p className="font-bold text-lg mb-1">{`Aircraft Class ${data.aircraftClass}`}</p>
          <p className="text-gray-600 mb-2">
            {classDescriptions[data.aircraftClass] ||
              "No description available"}
          </p>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Aircraft Count:</span> {data.z}
            </p>
            <p>
              <span className="font-medium">Avg Flights/Aircraft:</span>{" "}
              {data.x ? data.x.toLocaleString() : "N/A"}
            </p>
            <p>
              <span className="font-medium">Avg Passengers/Aircraft:</span>{" "}
              {data.y ? data.y.toLocaleString() : "N/A"}
            </p>
            <p>
              <span className="font-medium">Avg Range:</span> {data.avgRange} km
            </p>
            <p>
              <span className="font-medium">Avg Velocity:</span>{" "}
              {data.avgVelocity} km/h
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Format large number ticks
  const formatYAxisTick = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  const formatXAxisTick = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Aircraft Class Utilization
      </h2>
      <div className="h-96 w-full" style={{ minHeight: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              type="number"
              dataKey="x"
              name="Avg Flights per Aircraft"
              tick={{ fill: "#6B7280" }}
              tickFormatter={formatXAxisTick}
              axisLine={{ stroke: "#9CA3AF" }}
              tickLine={{ stroke: "#9CA3AF" }}
            >
              <Label
                value="Average Flights per Aircraft"
                position="bottom"
                offset={5}
                style={{
                  textAnchor: "middle",
                  fill: "#4B5563",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name="Avg Passengers per Aircraft"
              tick={{ fill: "#6B7280" }}
              tickFormatter={formatYAxisTick}
              axisLine={{ stroke: "#9CA3AF" }}
              tickLine={{ stroke: "#9CA3AF" }}
              width={80}
            >
              <Label
                value="Average Passengers per Aircraft"
                angle={-90}
                position="insideLeft"
                offset={-20}
                style={{
                  textAnchor: "middle",
                  fill: "#4B5563",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              />
            </YAxis>
            <ZAxis
              type="number"
              dataKey="z"
              range={[60, 400]}
              name="Aircraft Count"
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => (
                <span style={{ color: "#4B5563", padding: "0 8px" }}>
                  {value} -{" "}
                  {classDescriptions[value.replace("Class ", "")] || ""}
                </span>
              )}
            />
            {Object.keys(colorMap).map((classKey) => {
              const filteredData = processedData.filter(
                (item) => item.aircraftClass === classKey
              );
              return (
                <Scatter
                  key={`class-${classKey}`}
                  name={`Class ${classKey}`}
                  data={filteredData}
                  fill={colorMap[classKey]}
                  stroke="#fff"
                  strokeWidth={1}
                  legendType="circle"
                />
              );
            })}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 text-sm text-gray-600 flex items-center justify-center">
        <div className="bg-gray-50 px-4 py-2 rounded-lg">
          <p>
            Note: Bubble size represents the number of aircraft in each class
          </p>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
