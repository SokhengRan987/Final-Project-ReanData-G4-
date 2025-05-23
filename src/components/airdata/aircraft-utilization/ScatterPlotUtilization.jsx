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
      aircraftClass: Number(item.aircraft_class),
      avgRange: item.avg_range || "N/A",
      avgVelocity: item.avg_velocity || "N/A",
    }));
  }, [data]);

  // Dynamic ZAxis range based on data
  const zRange = useMemo(() => {
    if (!processedData.length) return [20, 100];
    const counts = processedData.map((d) => d.z);
    return [Math.min(20, ...counts), Math.max(100, ...counts)];
  }, [processedData]);

  // Create color map for different aircraft classes with fallback
  const colorMap = {
    0: "#6366F1",
    1: "#10B981",
    2: "#F59E0B",
    3: "#EF4444",
    4: "#3B82F6",
  };

  const getColor = (classKey) => colorMap[classKey] || "#999999";

  const classDescriptions = {
    0: "Long-range, low-frequency",
    1: "Ultra-long-range, high-capacity",
    2: "Medium-range, high-frequency",
    3: "Regional, high-frequency",
    4: "Short-range, low-capacity",
  };

  if (isLoading)
    return <Loader aria-label="Loading aircraft utilization data" />;
  if (error)
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
        <h3 className="font-bold">Error loading aircraft utilization data</h3>
        <p>{error.message || error.toString() || "Unknown error occurred"}</p>
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
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
        Aircraft Class Utilization
      </h3>
      <p className="text-gray-600 mb-6 text-sm">
        Helps assess how efficiently the fleet is being used by showing the
        number of flights per aircraft and the average number of passengers
        carried.
      </p>
      <div className="h-96 w-full" style={{ minHeight: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 30, bottom: 10, left: 80 }}
            aria-label="Aircraft utilization scatter plot"
          >
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
                className="text-gray-600 font-medium text-sm"
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
                className="text-gray-600 font-medium text-sm"
              />
            </YAxis>
            <ZAxis
              type="number"
              dataKey="z"
              range={zRange}
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
                (item) => item.aircraftClass === Number(classKey)
              );
              return (
                <Scatter
                  key={`class-${classKey}`}
                  name={`Class ${classKey}`}
                  data={filteredData}
                  fill={getColor(classKey)}
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
    </div>
  );
}
