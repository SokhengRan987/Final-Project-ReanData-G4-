import React, { useMemo } from 'react';
import Loader from '../../loading/Loader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetGenderDistributionQuery } from '../../../redux/service/food-beverages/genderDistribution';  

export default function GenderBarChart() {
  const { data: apiData, error, isLoading } = useGetGenderDistributionQuery();

  // Process the API data
  const processedData = useMemo(() => {
    if (!apiData) return null;
    
    // Ensure data matches expected format and filter out any invalid entries
    return apiData
      .filter(item => item.user_gender && typeof item.count === 'number')
      .map(item => ({
        name: item.user_gender,
        count: item.count
      }));
  }, [apiData]);

  // Calculate total for potential future use (e.g., percentages)
  const totalCount = useMemo(() => {
    if (!processedData) return 0;
    return processedData.reduce((sum, item) => sum + item.count, 0);
  }, [processedData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.count / totalCount) * 100).toFixed(1);
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p>{`${data.name}: ${data.count} users`}</p>
          <p>{`(${percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend formatter
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ display: 'inline-block', margin: '0 15px' }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              backgroundColor: entry.color,
              marginRight: '5px',
              verticalAlign: 'middle'
            }}></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '20px' }}>
        <h3>Error loading gender distribution data</h3>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  if (!processedData || processedData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        No data available
      </div>
    );
  }

  return (
    <div className="chart-container" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={processedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(0, 0, 0, 0.1)"
            vertical={false}
          />
          <XAxis 
            dataKey="name"
            label={{ 
              value: 'Gender', 
              position: 'bottom',
              offset: 10,
              fontSize: 14,
              fontWeight: 'bold'
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ 
              value: 'Number of Users', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10,
              fontSize: 14,
              fontWeight: 'bold'
            }}
            domain={[0, 'auto']}
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            content={renderLegend}
          />
          <Bar 
            dataKey="count" 
            fill="#4E79A7"
            radius={[5, 5, 0, 0]}
            animationDuration={1000}
            barSize={80}
          />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ 
        textAlign: 'center', 
        marginTop: '10px',
        fontSize: '14px',
        color: '#666'
      }}>
        Total Users: {totalCount}
      </div>
    </div>
  );
}