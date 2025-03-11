import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetChohortAnalysisQuery } from "../../../redux/service/chohortAnalysis";
import Loader from "../../loading/Loader";

export default function CohortAnalysisLineChart() {
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

  return (
    <div className="cohort-analysis">
      <h2>Cohort Analysis</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart
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
            <YAxis
              tickFormatter={(value) =>
                value >= 1000000
                  ? `${(value / 1000000).toFixed(1)}M`
                  : value >= 1000
                  ? `${(value / 1000).toFixed(0)}K`
                  : value
              }
            />
            <Tooltip
              formatter={(value) => [value.toLocaleString(), "Cohort Size"]}
            />
            <Line
              type="monotone"
              dataKey="cohort_size"
              stroke="#3694f2"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
