import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loader from "../../loading/Loader";

const AirportDistributionChart = ({ data }) => {
  if (!data || data.length === 0) return <div><Loader/></div>;

  // Define the order of continents for consistent x-axis mapping
  const continents = ["NA", "AS", "EU", "AF", "SA", "OC"];

  // Map data for visualization
  const mappedData = data.map((d) => ({
    x: continents.indexOf(d.continent) + 1, // Using the new property name
    y: Math.sqrt(d.airports) * 2, // Adjust scaling for a proper semi-circle effect
    z: d.airports, // Actual airport count
    continent: d.continent,
    countries: d.countries,
    cities: d.cities,
  }));

  // Define colors for continents
  const colors = {
    NA: "#FF6B6B",
    SA: "#36A2EB",
    EU: "#4BC0C0",
    AF: "#FFA07A",
    AS: "#7FB3D5",
    OC: "#FFD700",
  };

  // Custom tooltip to show more information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-bold">{data.continent}</p>
          <p>Airports: {data.z}</p>
          <p>Countries: {data.countries}</p>
          <p>Cities: {data.cities}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis
          type="category"
          dataKey="continent"
          name="Continent"
          allowDuplicatedCategory={false}
          tick={{ fill: "#666" }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Airport Density"
          domain={[0, "auto"]}
          tick={{ fill: "#666" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {continents.map((continent) => {
          const continentData = mappedData.filter(
            (item) => item.continent === continent
          );
          return continentData.length > 0 ? (
            <Scatter
              key={continent}
              name={continent}
              data={continentData}
              fill={colors[continent]}
              shape="circle"
              legendType="circle"
            />
          ) : null;
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default AirportDistributionChart;
