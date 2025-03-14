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
      let avgSpending;
      
      // Convert spending ranges to their midpoints
      if (range === "$5-$10") avgSpending = 7.5;
      else if (range === "$10-$15") avgSpending = 12.5;
      else if (range === "$5-$15") avgSpending = 10;
      else if (range === "$10-$20") avgSpending = 15;
      else if (range === "$15-$20") avgSpending = 17.5;
      else if (range === "$15-$25") avgSpending = 20;
      else if (range === "$20-$30") avgSpending = 25;
      else if (range === "$25-$40") avgSpending = 32.5;
      else if (range === "$30-$50") avgSpending = 40;
      else avgSpending = 0;
      
      return {
        priority: item.p_value_priority,
        spending: avgSpending,
        count: item.count,
        originalRange: range
      };
    });
  }, [data]);
  
  // Group data by priority for coloring
  const priorityGroups = useMemo(() => {
    if (!processedData.length) return [];
    
    const groups = {};
    processedData.forEach(item => {
      if (!groups[item.priority]) {
        groups[item.priority] = true;
      }
    });
    
    return Object.keys(groups);
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
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading data</div>;
  }
  
  const priorityCategories = [...new Set(processedData.map(item => item.priority))].sort();
  
  return (
    <div className="w-full h-full">
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
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
              height={70}
            />
            <YAxis 
              dataKey="spending" 
              name="Avg. Spending ($)" 
              domain={[0, 45]} 
              tickFormatter={(value) => `$${value}`}
            />
            <ZAxis 
              dataKey="count" 
              range={[30, 250]} 
              name="Count"
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "Avg. Spending ($)") return [`$${value}`, name];
                return [value, name];
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow-lg">
                      <p className="font-bold">{data.priority}</p>
                      <p>Range: {data.originalRange}</p>
                      <p>Count: {data.count}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            
            {priorityGroups.map(priority => (
              <Scatter
                key={priority}
                name={priority}
                data={processedData.filter(item => item.priority === priority)} 
                fill={colorMap[priority]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Bubble size indicates the number of customers in each category</p>
      </div>
    </div>
  );
};

export default ScatterPlot;