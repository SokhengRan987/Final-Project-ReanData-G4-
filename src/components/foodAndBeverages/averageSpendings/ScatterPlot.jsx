import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Loader from "../../loading/Loader";
import { useGetAverageSpendingQuery } from "../../../redux/service/food-beverages/averageSpending";

const ScatterPlot = () => {
  const { data, error, isLoading } = useGetAverageSpendingQuery();
  
  const processedData = useMemo(() => {
    if (!data) return [];
    
    // Transform spending ranges to numerical values for plotting
    return data.map(item => {
      const range = item.p_spending_range;
      
      // Extract range values and calculate midpoint
      const rangeValues = range.replace('$', '').split('-').map(val => parseFloat(val.replace('$', '')));
      const avgSpending = (rangeValues[0] + rangeValues[1]) / 2;
      
      return {
        priority: item.p_value_priority,
        spending: avgSpending,
        count: item.count,
        originalRange: range
      };
    });
  }, [data]);
  
  // Group data by priority and filter out priorities with very low counts
  const priorityGroups = useMemo(() => {
    if (!processedData.length) return [];
    
    // Calculate total count for each priority
    const priorityCounts = {};
    processedData.forEach(item => {
      if (!priorityCounts[item.priority]) {
        priorityCounts[item.priority] = 0;
      }
      priorityCounts[item.priority] += item.count;
    });
    
    // Only include priorities with total count >= 3
    return Object.keys(priorityCounts)
      .filter(priority => priorityCounts[priority] >= 3)
      .sort();
  }, [processedData]);
  
  // Generate colors for each priority group
  const colorMap = useMemo(() => {
    const colors = [
      '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe',
      '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57',
      '#83a6ed', '#8dd1e1', '#9e88f2', '#f28fd5', '#f25e5e'
    ];
    
    const map = {};
    priorityGroups.forEach((priority, index) => {
      map[priority] = colors[index % colors.length];
    });
    
    return map;
  }, [priorityGroups]);
  
  // Filter data to only include significant priorities
  const filteredData = useMemo(() => {
    return processedData.filter(item => priorityGroups.includes(item.priority));
  }, [processedData, priorityGroups]);
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading data: {error.message || 'Unknown error'}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="p-4">No data available</div>;
  }
  
  return (
    <div className="w-full h-full">
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis 
              dataKey="priority" 
              type="category" 
              name="Priority"
              allowDuplicatedCategory={false}
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
              height={80}
              label={{ value: "Value Priority", position: "insideBottom", offset: -5, dy: 70 }}
            />
            <YAxis 
              dataKey="spending" 
              name="Avg. Spending ($)" 
              domain={[0, 'dataMax + 5']}
              tickFormatter={(value) => `$${value}`}
              label={{ value: "Average Spending ($)", angle: -90, position: "insideLeft", dx: -10 }}
            />
            <ZAxis 
              dataKey="count" 
              range={[40, 300]} 
              name="Count"
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-3 border rounded shadow-lg">
                      <p className="font-bold text-base mb-1">{data.priority}</p>
                      <p className="text-sm">Spending Range: {data.originalRange}</p>
                      <p className="text-sm">Average: ${data.spending.toFixed(2)}</p>
                      <p className="text-sm">Count: {data.count}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              layout="horizontal"
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: 10 }}
            />
            
            {priorityGroups.map(priority => (
              <Scatter
                key={priority}
                name={priority}
                data={filteredData.filter(item => item.priority === priority)} 
                fill={colorMap[priority]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 flex justify-center">
        <p>Bubble size represents the number of customers in each category</p>
      </div>
    </div>
  );
};

export default ScatterPlot;