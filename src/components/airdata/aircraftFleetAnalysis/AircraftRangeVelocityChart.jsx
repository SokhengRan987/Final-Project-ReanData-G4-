import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAircraftFleetAnalysisQuery } from "../../../redux/service/aircraftFleetAnalysis";
import Loader from "../../loading/Loader";

const AircraftRangeVelocityChart = () => {
  const { data, error, isLoading } = useGetAircraftFleetAnalysisQuery();

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  // Map class codes to aircraft types
  const aircraftTypes = {
    0: "Small Prop",
    1: "Medium Jet",
    2: "Large Jet",
    3: "Regional Jet",
    4: "Turboprop",
  };

  // Format data for the chart
  const formattedData = data
    .map((item) => ({
      name: aircraftTypes[item.class] || `Type ${item.class}`,
      range: item.avg_range,
      velocity: item.avg_velocity,
    }))
    .sort((a, b) => {
      // Custom sort order to match the image
      const order = [
        "Small Prop",
        "Medium Jet",
        "Large Jet",
        "Regional Jet",
        "Turboprop",
      ];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

  // Custom tooltip to show both metrics
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-sm sm:text-md p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-purple-600">
            Avg Range: {Number(payload[0].value).toLocaleString()} km
          </p>
          <p className="text-green-600">
            Avg Velocity: {Number(payload[1].value).toLocaleString()} km/h
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 sm:h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#666" }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={[0, "dataMax + 1000"]}
            tickFormatter={(value) => value.toLocaleString()}
            label={{
              value: "Avg Range (km)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#8884d8" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, "dataMax + 100"]}
            tickFormatter={(value) => value.toLocaleString()}
            label={{
              value: "Avg Velocity (km/h)",
              angle: -90,
              position: "insideRight",
              style: { textAnchor: "middle", fill: "#82ca9d" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="range"
            name="Avg Range (km)"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="velocity"
            name="Avg Velocity (km/h)"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AircraftRangeVelocityChart;
