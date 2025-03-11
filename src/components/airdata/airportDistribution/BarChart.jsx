import React from "react";
import { useGetAirPortDistributionQuery } from "../../../redux/service/airPortDistributionSlice";
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

export default function ContinentBarChart() {
  const { data, error, isLoading } = useGetAirPortDistributionQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 animate-pulse">
        Loading data...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 p-4 animate-pulse">Error loading data</div>
    );

  // Map continent codes to full names for better readability
  const continentNames = {
    NA: "NA",
    AS: "AS",
    EU: "EU",
    AF: "AF",
    SA: "SA",
    OC: "OC",
  };

  // Format data for the chart
  const chartData = data?.map((item) => ({
    continent: continentNames[item.continent_req] || item.continent_req,
    countries_served: item.countries_served,
    cities_served: item.cities_served,
  }));

  const totalCountries =
    chartData?.reduce((sum, item) => sum + item.countries_served, 0) || 0;
  const totalCities =
    chartData?.reduce((sum, item) => sum + item.cities_served, 0) || 0;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 text-center">
        Global Distribution by Continent
      </h2>
      <div className="flex justify-between mb-4">
        <div className="text-center px-4">
          <p className="text-xl font-bold text-blue-600">{totalCountries}</p>
          <p className="text-sm text-gray-600">Countries Served</p>
        </div>
        <div className="text-center px-4">
          <p className="text-xl font-bold text-green-600">{totalCities}</p>
          <p className="text-sm text-gray-600">Cities Served</p>
        </div>
      </div>

      <div className="h-74">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="continent"
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="countries_served"
              name="Countries Served"
              fill="#3b82f6"
            />
            <Bar dataKey="cities_served" name="Cities Served" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
