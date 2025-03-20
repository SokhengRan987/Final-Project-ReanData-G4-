import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from "../../loading/Loader";
import { useGetDiningMethodQuery } from '../../../redux/service/food-beverages/diningMethod';

export default function StackedBarChartDiningMethod() {
  const { data, error, isLoading } = useGetDiningMethodQuery();

  const formattedData = useMemo(() => {
    if (!data) return [];

    // Group data by dining method
    const groupedData = data.reduce((acc, item) => {
      const method = item.dining_method;
      
      if (!acc[method]) {
        acc[method] = {
          dining_method: method,
          willing: 0,
          not_willing: 0,
          total: 0
        };
      }
      
      if (item.p_willing_to_recommend) {
        acc[method].willing += item.count;
      } else {
        acc[method].not_willing += item.count;
      }
      
      acc[method].total += item.count;
      
      return acc;
    }, {});

    // Convert to array and calculate percentages
    return Object.values(groupedData).map(item => ({
      ...item,
      willing_percentage: Math.round((item.willing / item.total) * 100)
    }));
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;  
  if (!data || data.length === 0) return <div className="text-gray-500">No data available</div>;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">Dining Method vs Willingness to Recommend</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          barSize={60}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="dining_method" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666666' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666666' }}
            domain={[0, 'auto']}
          />
          <Tooltip
            formatter={(value, name) => {
              return [`${value} customers`, name === "willing" ? "Willing to Recommend" : "Not Willing to Recommend"];
            }}
            labelFormatter={(label) => `${label}`}
          />
          <Legend 
            iconType="square"
            wrapperStyle={{ paddingTop: 20 }}
            payload={[
              { value: 'Willing to Recommend', type: 'square', color: '#4CAF50' },
              { value: 'Not Willing to Recommend', type: 'square', color: '#FF5252' }
            ]}
          />
          <Bar dataKey="willing" stackId="a" fill="#4CAF50" />
          <Bar dataKey="not_willing" stackId="a" fill="#FF5252" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-8 border-t pt-4">
        <h3 className="text-xl font-medium mb-2">Key Insights:</h3>
        <ul className="space-y-2">
          {formattedData.map(item => (
            <li key={item.dining_method} className="flex items-center">
              <span className="mr-2">•</span>
              <span>
                <strong>{item.dining_method}:</strong> {item.willing_percentage}% willing to recommend 
                ({item.willing} out of {item.total} customers)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}