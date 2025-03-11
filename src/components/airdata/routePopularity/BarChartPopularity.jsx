import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetRoutePopularityQuery } from "../../../redux/service/routePopularity";

export default function BarChartPopularity() {
  const { data, error, isLoading } = useGetRoutePopularityQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading route data: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  // Create route labels for better readability
  const formattedData = data.map((route) => ({
    ...route,
    route: `${route.departure_city} → ${route.arrival_city}`,
  }));

  return (
    <div className="route-popularity-chart">
      <h2>Top 10 Popular Routes</h2>
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <BarChart
            data={formattedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="route" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="passenger_count"
              name="Total Passengers"
              fill="#8884d8"
            />
            <Bar
              yAxisId="right"
              dataKey="flight_count"
              name="Number of Flights"
              fill="#82ca9d"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
