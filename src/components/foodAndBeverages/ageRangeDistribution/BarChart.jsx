import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetAgeRangeDistributionQuery } from '../../../redux/service/food-beverages/ageRangeDistribution';

export default function AgeRangeBarChart() {
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
      count: 0
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
          standardizedData[index].count += item.count * weight;
        }
      });
    });

    return standardizedData.map(item => ({
      ...item,
      count: Math.round(item.count)
    }));
  }, [apiData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc'
        }}>
          <p>{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
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
    <div className="chart-container" style={{ width: '100%', margin: 'auto', height: '450px' }}>
      <ResponsiveContainer width="100%" height="100%">
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
              dy: -8,
              value: 'Age Range', 
              position: 'bottom',
              offset: 10,
              fontSize: 14,
              fontWeight: 'bold'
            }}
          />
          <YAxis
            label={{ 
              value: 'Number of Customers', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10,
              fontSize: 14,
              fontWeight: 'bold'
            }}
            domain={[0, 'auto']}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={() => 'Number of Customers'}
          />
          <Bar 
            dataKey="count" 
            fill="rgba(75, 192, 192, 0.7)"
            radius={[5, 5, 0, 0]}
            animationDuration={1000}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}