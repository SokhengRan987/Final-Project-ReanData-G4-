import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetBoardingStatisticsQuery } from "../../../redux/service/boardingStatistics";
import Loader from "../../loading/Loader";

const AirportStatisticsBarChart = () => {
  const { data, error, isLoading } = useGetBoardingStatisticsQuery();

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error loading data: {error.message}</div>;
  if (!data || !data.length) return <div>No data available</div>;

  // Prepare data for the bar chart
  const barChartData = [
    {
      name: "Total Boardings",
      value: data[0].total_boardings,
      fill: "#9370DB", // Purple color from image
    },
    {
      name: "Unique Passengers",
      value: data[0].unique_passengers,
      fill: "#8FBC8F", // Green color from image
    },
    {
      name: "Unique Flight Legs",
      value: data[0].unique_flight_legs,
      fill: "#FFD700", // Yellow color from image
    },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p>{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={barChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e0e0e0"
            vertical={false}
          />
          <XAxis dataKey="name" tick={{ fill: "#666" }} />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
            domain={[0, "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            name="value"
            radius={[4, 4, 0, 0]} // Slightly rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AirportStatisticsBarChart;
