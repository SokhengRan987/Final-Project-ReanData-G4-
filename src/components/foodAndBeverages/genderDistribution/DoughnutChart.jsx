import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetGenderDistributionQuery } from '../../../redux/service/food-beverages/genderDistribution';

export default function GenderDoughnutChart() {
  const { data: apiData, error, isLoading } = useGetGenderDistributionQuery();

  // Process the API data
  const processedData = useMemo(() => {
    if (!apiData) return null;
    
    // Ensure data matches expected format and filter out invalid entries
    return apiData
      .filter(item => item.user_gender && typeof item.count === 'number')
      .map(item => ({
        name: item.user_gender,
        value: item.count
      }));
  }, [apiData]);

  // Calculate total for percentages and center text
  const totalCount = useMemo(() => {
    if (!processedData) return 0;
    return processedData.reduce((sum, item) => sum + item.value, 0);
  }, [processedData]);

  // Color palette for gender (could be expanded if more genders are added)
  const COLORS = ['#FF6B6B', '#4E79A7']; // Female: Red, Male: Blue

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalCount) * 100).toFixed(1);
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p>{`${data.name}: ${data.value} users`}</p>
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
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {payload.map((entry, index) => {
          const percentage = ((entry.payload.value / totalCount) * 100).toFixed(1);
          return (
            <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                marginRight: '10px',
                borderRadius: '50%'
              }}></span>
              <span>{`${entry.value}: ${entry.payload.value} (${percentage}%)`}</span>
            </li>
          );
        })}
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
      <div className="chart-wrapper" style={{ height: '400px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              animationDuration={1000}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={renderLegend}
            />
          </PieChart>
        </ResponsiveContainer>
        <div 
          className="chart-center-text" 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Total</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCount}</div>
          <div style={{ fontSize: '14px' }}>Users</div>
        </div>
      </div>
    </div>
  );
}