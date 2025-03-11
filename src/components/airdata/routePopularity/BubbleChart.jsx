import React, { useState } from 'react';
import { useGetRoutePopularityQuery } from "../../../redux/service/routePopularity";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';

export default function BubbleChart() {
  const { data, error, isLoading } = useGetRoutePopularityQuery();
  const [activeIndex, setActiveIndex] = useState(null);

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div className="p-4 text-red-600">Error loading route data: {error.message}</div>;
  if (!data || data.length === 0) return <div className="p-4">No route data available</div>;

  // Format the data for the bubble chart
  const bubbleData = data.map((route, index) => ({
    x: route.flight_count,
    y: route.passenger_count,
    z: route.avg_passengers_per_flight,
    route: `${route.departure_city} → ${route.arrival_city}`,
    departure: route.departure_city,
    arrival: route.arrival_city,
    index
  }));

  // Custom tooltip to display all the information
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-bold text-lg mb-2">{data.route}</p>
          <p className="text-blue-600">Flights: {data.x.toLocaleString()}</p>
          <p className="text-green-600">Passengers: {data.y.toLocaleString()}</p>
          <p className="text-purple-600">Avg Passengers/Flight: {data.z.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Top 10 Popular Flight Routes</h2>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Flight Count" 
              label={{ value: 'Flight Count', position: 'insideBottomRight', offset: -5 }}
              domain={['dataMin - 500', 'dataMax + 500']}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Passenger Count" 
              label={{ value: 'Passenger Count', angle: -90, position: 'insideLeft' }}
              domain={['dataMin - 5000', 'dataMax + 5000']}
            />
            <ZAxis 
              type="number" 
              dataKey="z" 
              range={[40, 400]} 
              name="Avg Passengers/Flight" 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter 
              name="Route Popularity" 
              data={bubbleData} 
              fill="#8884d8"
              stroke="#8884d8"
              fillOpacity={0.6}
              onMouseOver={(data, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bubbleData.map((item, index) => (
          <div 
            key={index}
            className={`p-2 border rounded ${activeIndex === item.index ? 'bg-blue-50 border-blue-500' : 'border-gray-200'}`}
          >
            <div className="font-medium">{item.route}</div>
            <div className="text-sm grid grid-cols-3 gap-1">
              <div>Flights: {item.x.toLocaleString()}</div>
              <div>Passengers: {item.y.toLocaleString()}</div>
              <div>Avg: {item.z.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}