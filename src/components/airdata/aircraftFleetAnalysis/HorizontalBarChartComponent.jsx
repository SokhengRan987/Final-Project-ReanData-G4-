import React from "react";
import { useGetAircraftFleetAnalysisQuery } from "../../../redux/service/aircraftFleetAnalysis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Loader from "../../loading/Loader";

const AircraftFleetAnalysisComponent = () => {
  // Use the hook to fetch data from the API
  const { data, error, isLoading } = useGetAircraftFleetAnalysisQuery();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  // Map the class values to the corresponding aircraft types
  const aircraftTypes = {
    0: "Private",
    1: "Cargo",
    2: "Commercial",
    3: "Military",
    4: "Other",
  };

  // Colors for each aircraft type
  const colors = {
    Commercial: "#9370DB", // Purple
    Private: "#8FBC8F", // Green
    Military: "#FFD700", // Yellow
    Cargo: "#FF8C00", // Orange
    Other: "#90EE90", // Light green
  };

  // Format the API response to match the expected format for the chart
  const formattedData = data
    .map((item) => ({
      name: aircraftTypes[item.class] || "Unknown",
      value: item.aircraft_count,
    }))
    // Sort by value decreasing (to match the image)
    .sort((a, b) => b.value - a.value);

  // Custom tooltip to match the image
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 shadow-md">
          <p className="font-medium text-sm sm:text-md">{payload[0].name}</p>
          <p className="text-sm sm:text-md">
            Number of Aircraft : {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section>
      <div className="h-72 sm:h-80 md:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis type="number" domain={[0, "dataMax + 5"]} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#666", fontSize: 12 }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ bottom: 0 }} />
            <Bar dataKey="value" name="Number of Aircraft">
              {formattedData.map((entry) => (
                <Cell key={entry.name} fill={colors[entry.name] || "#8884d8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default AircraftFleetAnalysisComponent;
