import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetInternationalFoodPreferenceQuery } from '../../../redux/service/food-beverages/internationFoodPreference';

export default function EnhancedFoodPreferencesChart() {
  const { data, isLoading, error } = useGetInternationalFoodPreferenceQuery();
  const [sortBy, setSortBy] = useState('total'); // 'total', 'name', or specific frequency
  
  const processedData = useMemo(() => {
    if (!data) return [];
    
    // Group data by food type
    const groupedByFood = {};
    data.forEach(item => {
      if (!groupedByFood[item.international_food]) {
        groupedByFood[item.international_food] = {
          name: item.international_food,
          Never: 0,
          Rarely: 0,
          Sometimes: 0,
          Often: 0,
          Monthly: 0,
          total: 0
        };
      }
      groupedByFood[item.international_food][item.order_frequency] += item.count;
      groupedByFood[item.international_food].total += item.count;
    });
    
    // Convert to array and sort based on current sort method
    const dataArray = Object.values(groupedByFood);
    
    if (sortBy === 'name') {
      return dataArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'total') {
      return dataArray.sort((a, b) => b.total - a.total);
    } else {
      // Sort by specific frequency
      return dataArray.sort((a, b) => b[sortBy] - a[sortBy]);
    }
  }, [data, sortBy]);
  
  // Define colors with better accessibility and contrast
  const frequencyColors = {
    Never: '#8884d8',    // Purple
    Rarely: '#2196f3',   // Blue
    Sometimes: '#ff9800', // Orange
    Often: '#4caf50',    // Green
    Monthly: '#f44336'   // Red
  };
  
  // Order of frequencies from least to most frequent
  const frequencyOrder = ['Never', 'Rarely', 'Sometimes', 'Often', 'Monthly'];

  if (isLoading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Error loading data: {error.message}</div>;
  if (!processedData.length) return <div className="p-4">No data available</div>;

  return (
    <div className="w-full">
      
      {/* <div className="mb-4 flex flex-wrap gap-2 justify-end">
        <span className="font-medium">Sort by:</span>
        <div className="flex gap-2">
          <button 
            onClick={() => setSortBy('total')}
            className={`px-2 py-1 text-sm rounded ${sortBy === 'total' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Total Orders
          </button>
          <button 
            onClick={() => setSortBy('name')}
            className={`px-2 py-1 text-sm rounded ${sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Alphabetical
          </button>
          {frequencyOrder.map(freq => (
            <button
              key={freq}
              onClick={() => setSortBy(freq)}
              className={`px-2 py-1 text-sm rounded ${sortBy === freq ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              style={{ borderLeft: `4px solid ${frequencyColors[freq]}` }}
            >
              {freq}
            </button>
          ))}
        </div>
      </div> */}
      
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            barSize={25}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={80}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis 
              label={{ value: 'Number of Orders', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name, props) => [`${value} orders`, name]} 
              labelFormatter={(label) => `Food Type: ${label}`}
              contentStyle={{ borderRadius: '4px' }}
            />
            <Legend 
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: '10px' }}
            />
            {/* Render bars in order from least to most frequent */}
            {frequencyOrder.map(frequency => (
              <Bar 
                key={frequency}
                dataKey={frequency} 
                stackId="a" 
                fill={frequencyColors[frequency]} 
                name={`${frequency} (${processedData.reduce((sum, item) => sum + (item[frequency] || 0), 0)} total)`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Total entries: {processedData.reduce((sum, item) => sum + item.total, 0)} from {processedData.length} cuisine types</p>
      </div>
    </div>
  );
}