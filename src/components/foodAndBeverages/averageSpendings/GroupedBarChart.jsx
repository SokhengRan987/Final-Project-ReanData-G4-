import React, { useMemo } from 'react';
import Loader from "../../loading/Loader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { useGetAverageSpendingQuery } from "../../../redux/service/food-beverages/averageSpending";

export default function AverageSpendingByPriorityChart() {
  const { data, error, isLoading } = useGetAverageSpendingQuery();
  
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Get unique value priorities
    const valuePriorities = [...new Set(data.map(item => item.p_value_priority))];
    
    // Calculate average spending for each priority
    return valuePriorities.map(priority => {
      const priorityData = data.filter(item => item.p_value_priority === priority);
      const totalCount = priorityData.reduce((sum, item) => sum + item.count, 0);
      
      // Skip priorities with fewer than 3 total counts
      if (totalCount < 3) return null;
      
      // Calculate weighted average spending
      let weightedSum = 0;
      priorityData.forEach(item => {
        // Extract the midpoint of the spending range
        const range = item.p_spending_range;
        const values = range.replace('$', '').split('-').map(v => parseFloat(v.replace('$', '')));
        const midpoint = (values[0] + values[1]) / 2;
        
        // Add to weighted sum
        weightedSum += midpoint * item.count;
      });
      
      const averageSpending = totalCount > 0 ? weightedSum / totalCount : 0;
      
      return {
        priority,
        averageSpending: parseFloat(averageSpending.toFixed(2)),
        count: totalCount
      };
    }).filter(Boolean).sort((a, b) => b.averageSpending - a.averageSpending);
  }, [data]);

  // Calculate overall average spending
  const overallAverage = useMemo(() => {
    if (!processedData || processedData.length === 0) return 0;
    
    const totalWeightedSum = processedData.reduce((sum, item) => sum + (item.averageSpending * item.count), 0);
    const totalCount = processedData.reduce((sum, item) => sum + item.count, 0);
    
    return totalCount > 0 ? parseFloat((totalWeightedSum / totalCount).toFixed(2)) : 0;
  }, [processedData]);
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <div className="p-4 text-red-600">Error loading data: {error.message || 'Unknown error'}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="p-4">No data available</div>;
  }
  
  if (processedData.length === 0) {
    return <div className="p-4">No significant data to display</div>;
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={processedData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis 
            type="number"
            domain={[0, 'dataMax + 2']}
            tickCount={7}
          >
            <Label value="Average Spending ($)" position="bottom" offset={0} />
          </XAxis>
          <YAxis 
            dataKey="priority" 
            type="category" 
            tick={{ fontSize: 12 }}
            width={110}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Average Spending']}
            labelFormatter={(value) => `Priority: ${value}`}
          />
          <Bar 
            dataKey="averageSpending" 
            name="Average Spending" 
            fill="#0066CC"
            barSize={20}
          >
            {processedData.map((entry, index) => (
              <Label
                key={`label-${index}`}
                position="right"
                content={({ x, y, width, height, value }) => (
                  <text
                    x={x + width + 5}
                    y={y + height / 2}
                    fill="#000"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    ${value}
                  </text>
                )}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}