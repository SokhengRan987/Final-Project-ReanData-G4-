import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetBoardingStatisticsQuery } from "../../../redux/service/boardingStatistics";
import Loader from "../../loading/Loader";

const PreCheckUsagePieChart = () => {
  const { data, error, isLoading } = useGetBoardingStatisticsQuery();

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>Error loading data: {error.message}</div>;
  if (!data || !data.length) return <div>No data available</div>;

  // Extract PreCheck percentage
  const preCheckPercentage = data[0].precheck_percentage;
  const nonPreCheckPercentage = 100 - preCheckPercentage;

  // Prepare data for the pie chart
  const pieChartData = [
    {
      name: "PreCheck Users",
      value: preCheckPercentage,
      label: `PreCheck Users ${preCheckPercentage}%`,
      fill: "#0088FE", // Blue color from image
    },
    {
      name: "Non-PreCheck Users",
      value: nonPreCheckPercentage,
      label: `Non-PreCheck Users ${nonPreCheckPercentage}%`,
      fill: "#00C49F", // Teal color from image
    },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="font-medium" style={{ color: payload[0].payload.fill }}>
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label for the pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={pieChartData[index].fill}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {pieChartData[index].label}
      </text>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value, entry) => (
              <span style={{ color: entry.color, marginRight: 10 }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PreCheckUsagePieChart;
