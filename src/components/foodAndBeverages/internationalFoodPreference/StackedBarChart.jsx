import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetInternationalFoodPreferenceQuery } from '../../../redux/service/food-beverages/internationFoodPreference';

export default function StackedBarChart() {
  const { data, isLoading, error } = useGetInternationalFoodPreferenceQuery();
  
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
    
    // Convert to array and sort by total count (descending)
    return Object.values(groupedByFood).sort((a, b) => b.total - a.total);
  }, [data]);
  
  // Define colors for each frequency
  const frequencyColors = {
    Never: '#8884d8',
    Rarely: '#0088fe',
    Sometimes: '#ff8042',
    Often: '#ffc658',
    Monthly: '#82ca9d'
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value, name) => [value, `${name} orders`]} />
          <Legend />
          <Bar dataKey="Never" stackId="a" fill={frequencyColors.Never} name="Never" />
          <Bar dataKey="Rarely" stackId="a" fill={frequencyColors.Rarely} name="Rarely" />
          <Bar dataKey="Sometimes" stackId="a" fill={frequencyColors.Sometimes} name="Sometimes" />
          <Bar dataKey="Often" stackId="a" fill={frequencyColors.Often} name="Often" />
          <Bar dataKey="Monthly" stackId="a" fill={frequencyColors.Monthly} name="Monthly" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}