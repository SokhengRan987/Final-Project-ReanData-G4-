import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetChohortAnalysisQuery } from "../../../redux/service/chohortAnalysis";
import Loader from "../../loading/Loader";

export default function CohortAnalysis() {
  const { data, error, isLoading } = useGetChohortAnalysisQuery();
  console.log(data);

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>Error loading cohort data: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  // Format dates for better display
  const formattedData = data.map((item) => ({
    ...item,
    cohort_month: new Date(item.cohort_month).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }),
  }));

  // Format large numbers for Y-axis (in millions)
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  return (
    <div className="cohort-analysis">
      <h2>Cohort Analysis</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <AreaChart
            data={formattedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cohort_month" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip
              formatter={(value) => [value.toLocaleString(), "Cohort Size"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="cohort_size"
              stroke="#8884d8"
              fill="#3694f2"
              name="Cohort Size"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
