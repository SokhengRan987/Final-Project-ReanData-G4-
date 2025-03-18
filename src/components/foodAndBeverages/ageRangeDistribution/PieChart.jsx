import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetAgeRangeDistributionQuery } from '../../../redux/service/food-beverages/ageRangeDistribution';

export default function AgeRangePieChart() {
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

  // Color palette
  const COLORS = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(46, 204, 113, 0.8)',
  ];

  // Calculate total for percentages
  const totalCount = useMemo(() => {
    if (!processedData) return 0;
    return processedData.reduce((sum, item) => sum + item.value, 0);
  }, [processedData]);

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalCount) * 100).toFixed(1);
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc'
        }}>
          <p>{`${data.name}: ${data.value} customers`}</p>
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
            <li key={`item-${index}`} style={{ marginBottom: '5px' }}>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: entry.color,
                marginRight: '5px'
              }}></span>
              {`${entry.value}: ${entry.payload.value} (${percentage}%)`}
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
    <div className="chart-container" style={{ width: '100%', margin: 'auto', maxWidth: '700px' }}>
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Pie
            data={processedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            animationDuration={1200}
            animationBegin={0}
            labelLine={false}
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
    </div>
  );
}