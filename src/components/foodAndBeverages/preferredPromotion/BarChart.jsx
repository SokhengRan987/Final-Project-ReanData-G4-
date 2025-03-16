import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import Loader from "../../../components/loading/Loader";
import { useGetPreferredPromotionQuery } from '../../../redux/service/food-beverages/preferredPromotion';

export default function PreferredPromotionsChart() {
  const { data, error, isLoading } = useGetPreferredPromotionQuery();
  const [sortOrder, setSortOrder] = useState('desc');
  const [hoveredBar, setHoveredBar] = useState(null);
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <div className="text-red-500 p-4">Error loading data: {error.message}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="text-gray-500 p-4">No promotion data available.</div>;
  }
  
  // Sort the data based on count
  const sortedData = [...data].sort((a, b) => {
    return sortOrder === 'desc' ? b.count - a.count : a.count - b.count;
  });
  
  const totalCount = sortedData.reduce((sum, item) => sum + item.count, 0);
  
  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.count / totalCount) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-lg rounded">
          <p className="font-medium text-gray-800">{data.promotion}</p>
          <p className="text-blue-600">{data.count} selections</p>
          <p className="text-gray-600">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Preferred Promotions</h2>
        <button 
          onClick={handleSort}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
        >
          Sort {sortOrder === 'desc' ? 'Ascending' : 'Descending'}
          <span>{sortOrder === 'desc' ? '↑' : '↓'}</span>
        </button>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            onMouseMove={(e) => {
              if (e && e.activePayload) {
                setHoveredBar(e.activePayload[0]?.payload.promotion);
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis 
              dataKey="promotion" 
              type="category" 
              tick={{ fill: '#4B5563', fontSize: 12 }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="#3B82F6"
              radius={[0, 4, 4, 0]}
            >
              {sortedData.map((entry) => (
                <Cell 
                  key={entry.promotion}
                  fill={hoveredBar === entry.promotion ? '#2563EB' : '#3B82F6'}
                  cursor="pointer"
                />
              ))}
              <LabelList 
                dataKey="count" 
                position="right" 
                fill="#4B5563"
                formatter={(value) => value}
                style={{ fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}