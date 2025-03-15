import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetAgeRangeDistributionQuery } from '../../../redux/service/food-beverages/ageRangeDistribution';

export default function AgeRangeDoughnutChart() {
  const { data: apiData, error, isLoading } = useGetAgeRangeDistributionQuery();

  // Process and standardize the messy age range data
  const processedData = useMemo(() => {
    if (!apiData) return null;

    const standardRanges = [
      { label: '18-20', min: 18, max: 20 },
      { label: '21-25', min: 21, max: 25 },
      { label: '26-30', min: 26, max: 30 },
      { label: '31-35', min: 31, max: 35 },
      { label: '36-45', min: 36, max: 45 },
      { label: '46-55', min: 46, max: 55 },
      { label: '56+', min: 56, max: 100 }
    ];

    const standardizedData = standardRanges.map(range => ({
      name: range.label,
      value: 0
    }));

    const parseAgeRange = (rangeStr) => {
      if (rangeStr.endsWith('+')) {
        const min = parseInt(rangeStr.replace('+', ''), 10);
        return { min, max: 100 };
      }
      
      const matches = rangeStr.match(/(\d+)-(\d+)/);
      if (matches) {
        return {
          min: parseInt(matches[1], 10),
          max: parseInt(matches[2], 10)
        };
      }
      
      return { min: 0, max: 0 };
    };

    const getOverlapWeight = (range1, range2) => {
      const overlapStart = Math.max(range1.min, range2.min);
      const overlapEnd = Math.min(range1.max, range2.max);
      
      if (overlapStart > overlapEnd) return 0;
      
      const overlapLength = overlapEnd - overlapStart + 1;
      const rangeLength = range1.max - range1.min + 1;
      
      return overlapLength / rangeLength;
    };

    apiData.forEach(item => {
      const originalRange = parseAgeRange(item.age);
      
      standardRanges.forEach((stdRange, index) => {
        const weight = getOverlapWeight(originalRange, stdRange);
        if (weight > 0) {
          standardizedData[index].value += item.count * weight;
        }
      });
    });

    return standardizedData
      .map(item => ({ ...item, value: Math.round(item.value) }))
      .filter(item => item.value > 0);
  }, [apiData]);

  // Calculate total and prepare chart data
  const totalCustomers = useMemo(() => {
    if (!processedData) return 0;
    return processedData.reduce((sum, item) => sum + item.value, 0);
  }, [processedData]);

  // Color palette
  const COLORS = [
    '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F',
    '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC'
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalCustomers) * 100).toFixed(1);
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc'
        }}>
          <p>{`${data.name}: ${data.value} customers (${percentage}%)`}</p>
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
          const percentage = ((entry.payload.value / totalCustomers) * 100).toFixed(1);
          return (
            <li key={`item-${index}`} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: entry.color,
                marginRight: '10px',
                borderRadius: '50%'
              }}></span>
              <span>{`${entry.value} (${percentage}%)`}</span>
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
      <div className="error-container">
        <h3>Error loading age range distribution data</h3>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  if (!processedData) {
    return <div>No data available</div>;
  }

  return (
    <div className="chart-container" style={{ width: '100%', maxWidth: '700px', margin: 'auto' }}>
      <div className="chart-wrapper" style={{ height: '450px', position: 'relative' }}>
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
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCustomers}</div>
          <div style={{ fontSize: '14px' }}>Customers</div>
        </div>
      </div>
    </div>
  );
}