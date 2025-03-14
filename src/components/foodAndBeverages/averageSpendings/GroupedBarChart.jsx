import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from "../../loading/Loader";
import { useGetAverageSpendingQuery } from "../../../redux/service/food-beverages/averageSpending";

export default function GroupedBarChart() {
  const { data, error, isLoading } = useGetAverageSpendingQuery();
  
  const processedData = useMemo(() => {
    if (!data) return [];
    
    // Get unique value priorities and spending ranges
    const valuePriorities = [...new Set(data.map(item => item.p_value_priority))];
    const spendingRanges = [...new Set(data.map(item => item.p_spending_range))];
    
    // Sort spending ranges in ascending order
    spendingRanges.sort((a, b) => {
      const getMinValue = range => parseInt(range.split('-')[0].replace('$', ''));
      return getMinValue(a) - getMinValue(b);
    });
    
    // Group data by value priority
    const groupedByPriority = {};
    valuePriorities.forEach(priority => {
      const priorityData = data.filter(item => item.p_value_priority === priority);
      let totalCount = 0;
      
      // Calculate total count for this priority
      priorityData.forEach(item => {
        totalCount += item.count;
      });
      
      // Only include priorities with significant data (at least 5 total counts)
      if (totalCount >= 5) {
        groupedByPriority[priority] = priorityData;
      }
    });
    
    // Create chart data format
    const chartData = spendingRanges.map(range => {
      const rangeData = { name: range };
      
      Object.keys(groupedByPriority).forEach(priority => {
        const match = groupedByPriority[priority].find(item => item.p_spending_range === range);
        rangeData[priority] = match ? match.count : 0;
      });
      
      return rangeData;
    });
    
    return chartData;
  }, [data]);
  
  // Generate colors for different priorities
  const getBarColors = () => {
    const colors = [
      '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', 
      '#d0ed57', '#83a6ed', '#8dd1e1', '#6b486b', '#a05195'
    ];
    
    if (!data) return [];
    
    const valuePriorities = [...new Set(data.map(item => item.p_value_priority))]
      .filter(priority => {
        const priorityData = data.filter(item => item.p_value_priority === priority);
        let totalCount = 0;
        priorityData.forEach(item => {
          totalCount += item.count;
        });
        return totalCount >= 5;
      });
    
    return valuePriorities.map((priority, index) => ({
      priority,
      color: colors[index % colors.length]
    }));
  };
  
  const barColors = useMemo(() => getBarColors(), [data]);
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <div className="p-4 text-red-600">Error loading data: {error.message || 'Unknown error'}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="p-4">No data available</div>;
  }

  return (
    <div className="w-full h-96 p-4">
      <ResponsiveContainer width="100%" height="90%">
        <BarChart 
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end"
            height={70}
          />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10 }} />
          {barColors.map(({ priority, color }) => (
            <Bar 
              key={priority} 
              dataKey={priority} 
              name={priority} 
              fill={color} 
              barSize={20} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}