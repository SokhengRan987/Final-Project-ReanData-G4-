import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartToggle from './ChartToggle';

const AgeChart = ({ data, chartType, setChartType, genderData }) => {
  // Define custom colors
  const COLORS = {
    primary: '#4B5EAA',   
    secondary: '#4124e3', 
    grid: '#e5e7eb',      
  };

  const renderChart = () => {
    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              formatter={(value) => [`${value}`, "Users"]}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Bar 
              dataKey="value" 
              fill={COLORS.primary}
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="pv" 
              fill={COLORS.primary}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar 
              dataKey="uv" 
              fill={COLORS.secondary}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Age Range Distribution
          </h2>
          <p className="text-sm text-gray-600">
            Distribution of users across different age ranges
          </p>
        </div>
        <ChartToggle chartType={chartType} setChartType={setChartType} />
      </div>
      <div className="h-72">
        {renderChart()}
      </div>
    </div>
  );
};

export default AgeChart;