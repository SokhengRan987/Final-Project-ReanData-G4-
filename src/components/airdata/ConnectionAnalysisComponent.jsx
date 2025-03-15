import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import Loader from "../loading/Loader";
import { useGetConnectionAnalysisQuery } from "../../redux/service/connectionAnalysis";

export default function ConnectionAnalysisComponent() {
  // Fetch data using RTK Query
  const { data, isLoading, error } = useGetConnectionAnalysisQuery();

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="font-semibold">{data.connection_city}</p>
          <p className="text-gray-700">Total Connections: {data.total_connections.toLocaleString()}</p>
          <p className="text-blue-600">Departure Airports: {data.unique_departure_airports}</p>
          <p className="text-green-600">Arrival Airports: {data.unique_arrival_airports}</p>
        </div>
      );
    }
    return null;
  };

  // Generate random colors for bars
  const getRandomColor = () => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00c49f", "#ffbb28"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (isLoading) return <Loader />;

  if (error) return <div className="p-4 text-red-500">Error loading connection data</div>;

  return (
    <div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
          >
            <XAxis
              dataKey="connection_city"
              tick={{ fontSize: 12, fill: "#333" }}
              label={{ value: "Connection City", position: "insideBottom", offset: -10 }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#333" }}
              label={{ value: "Total Connections", angle: -90, position: "insideLeft", offset: 10}}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
            <Bar
              dataKey="total_connections"
              name="Total Connections"
              fill="#8884d8"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}