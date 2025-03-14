import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loader from '../../loading/Loader';
import { useGetEatingOutQuery } from '../../../redux/service/food-beverages/eatingOut';

const StackedBarChart = () => {
  const { data, error, isLoading } = useGetEatingOutQuery();

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error loading data</div>;

  const normalizeAgeRange = (range) => {
    if (!range) return null;
    const age = parseInt(range, 10);
    if (age >= 18 && age <= 25) return '18-25';
    if (age >= 26 && age <= 35) return '26-35';
    if (age >= 36 && age <= 45) return '36-45';
    if (age >= 46 && age <= 55) return '46-55';
    if (age >= 56) return '56+';
    return null;
  };

  const processData = () => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const dataMap = {};

    data.forEach((item) => {
      if (!item || !item.p_age_range) return;
      const ageRange = normalizeAgeRange(item.p_age_range);
      if (!ageRange) return;

      const frequency = item.p_eating_out_frequency || 'Other';
      const count = item.count || 0;

      if (!dataMap[ageRange]) {
        dataMap[ageRange] = { ageRange };
      }
      dataMap[ageRange][frequency] = (dataMap[ageRange][frequency] || 0) + count;
    });

    const ageOrder = ['18-25', '26-35', '36-45', '46-55', '56+'];
    return Object.values(dataMap).sort((a, b) => ageOrder.indexOf(a.ageRange) - ageOrder.indexOf(b.ageRange));
  };

  const processedData = processData();

  const frequencyColors = {
    Daily: '#8884d8',
    Weekly: '#82ca9d',
    Often: '#ffc658',
    Occasionally: '#ff8042',
    Rarely: '#0088fe',
  };

  return (
    <div className="w-full h-96">
      {processedData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageRange" />
            <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value, name) => [`${value} people`, name]} />
            <Legend />
            {Object.keys(frequencyColors).map((key) => (
              <Bar key={key} dataKey={key} stackId="a" fill={frequencyColors[key]} name={key} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No data available to display</p>
        </div>
      )}
    </div>
  );
};

export default StackedBarChart;