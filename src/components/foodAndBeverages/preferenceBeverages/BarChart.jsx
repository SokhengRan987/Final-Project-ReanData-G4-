import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useGetPreferredBeveragesQuery } from '../../../redux/service/food-beverages/preferredBeverages';
import Loader from '../../loading/Loader';

export default function BeverageBarChart() {
  const { data, error, isLoading } = useGetPreferredBeveragesQuery();
  const [selectedOccupation, setSelectedOccupation] = useState('All');

  const occupations = useMemo(() => {
    if (!data) return [];
    const uniqueOccupations = [...new Set(data.map(item => item.p_occupation))];
    return ['All', ...uniqueOccupations].sort();
  }, [data]);

  const chartData = useMemo(() => {
    if (!data) return [];
    
    // If "All" is selected, aggregate by beverage across all occupations
    if (selectedOccupation === 'All') {
      const beverageCounts = {};
      data.forEach(item => {
        if (!beverageCounts[item.p_beverage]) {
          beverageCounts[item.p_beverage] = 0;
        }
        beverageCounts[item.p_beverage] += item.count;
      });
      
      return Object.entries(beverageCounts)
        .map(([beverage, count]) => ({ name: beverage, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15); // Show top 15 beverages for readability
    }
    
    // Otherwise, filter by selected occupation
    return data
      .filter(item => item.p_occupation === selectedOccupation)
      .map(item => ({ name: item.p_beverage, count: item.count }))
      .sort((a, b) => b.count - a.count);
  }, [data, selectedOccupation]);

  // Calculate total count for percentage
  const totalCount = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.count, 0);
  }, [chartData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.count / totalCount) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-3 shadow-lg border border-gray-200 rounded">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-blue-600">Count: <span className="font-bold">{data.count}</span></p>
          <p className="text-blue-800">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  // Define custom colors for bars based on their values
  const getBarColor = (entry) => {
    const maxCount = Math.max(...chartData.map(item => item.count));
    const intensity = 0.4 + (entry.count / maxCount) * 0.6;
    return `rgba(59, 130, 246, ${intensity})`;
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Error loading data: {error.message}</div>;
  if (!data || data.length === 0) return <div className="p-4">No data available</div>;

  return (
    <div className="p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-2xl font-medium text-gray-800">Preferred Beverages by Occupation</h3>
        
        <div className="flex items-center">
          <label htmlFor="occupation-select" className="mr-2 font-medium text-gray-600">
            Occupation:
          </label>
          <select
            id="occupation-select"
            value={selectedOccupation}
            onChange={(e) => setSelectedOccupation(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {occupations.map(occupation => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-6 h-96 overflow-y-scroll">
        <ResponsiveContainer width="100%" height="120%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tickFormatter={(value) => Math.round(value)}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              radius={[0, 4, 4, 0]}
              barSize={24}
              animationDuration={800}
              animationEasing="ease-out"
              fill="#3b82f6"
              label={{ 
                position: 'right', 
                formatter: (value) => value,
                fill: '#4B5563',
                fontSize: 12,
                fontWeight: 500
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        {selectedOccupation === 'All' 
          ? `Showing top ${chartData.length} beverages across all occupations (total: ${totalCount})`
          : `Showing all beverages preferred by ${selectedOccupation}s (total: ${totalCount})`}
      </div>
    </div>
  );
}