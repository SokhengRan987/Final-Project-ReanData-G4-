import React, { useMemo, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetAgeRangeDistributionQuery } from '../../../redux/service/food-beverages/ageRangeDistribution';

export default function AgeRangePieChart() {
  const { data: apiData, error, isLoading } = useGetAgeRangeDistributionQuery();
  const [chartLayout, setChartLayout] = useState({
    legendPosition: 'right',
    outerRadius: 150
  });

  // Handle responsive layout adjustments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartLayout({
          legendPosition: 'bottom',
          outerRadius: 100
        });
      } else if (window.innerWidth < 768) {
        setChartLayout({
          legendPosition: 'right',
          outerRadius: 120
        });
      } else {
        setChartLayout({
          legendPosition: 'right',
          outerRadius: 150
        });
      }
    };

    // Initial setup and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <div className="custom-tooltip bg-white p-2 border border-gray-200 shadow-md rounded text-sm">
          <p className="font-medium">{`${data.name}: ${data.value} customers`}</p>
          <p className="text-gray-600">{`(${percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend formatter
  const renderLegend = (props) => {
    const { payload } = props;
    
    if (!payload || payload.length === 0) return null;
    
    // Determine legend layout based on screen size
    const isHorizontal = chartLayout.legendPosition === 'bottom';
    
    return (
      <div className={`text-xs sm:text-sm ${isHorizontal ? 'pt-4 flex flex-wrap justify-center gap-x-4' : ''}`}>
        <ul className={`list-none p-0 m-0 ${isHorizontal ? 'flex flex-wrap gap-x-4 gap-y-2 justify-center' : ''}`}>
          {payload.map((entry, index) => {
            const percentage = ((entry.payload.value / totalCount) * 100).toFixed(1);
            return (
              <li key={`item-${index}`} className={`mb-1 ${isHorizontal ? 'inline-flex items-center' : ''}`}>
                <span className="inline-block w-3 h-3 mr-1" style={{ backgroundColor: entry.color }}></span>
                {`${entry.value}: ${entry.payload.value} (${percentage}%)`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-container p-4 text-center text-red-600">
        <h3 className="font-bold mb-2">Error loading age range distribution data</h3>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  if (!processedData || processedData.length === 0) {
    return <div className="text-center p-4 text-gray-500">No data available</div>;
  }

  return (
    <div className="flex flex-col h-72 w-full sm:h-80 md:h-96 max-w-2xl mx-auto px-2 md:px-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={processedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={chartLayout.outerRadius}
            // innerRadius={chartLayout.outerRadius * 0.4}
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
            layout={chartLayout.legendPosition === 'bottom' ? 'horizontal' : 'vertical'}
            align={chartLayout.legendPosition === 'bottom' ? 'center' : 'right'}
            verticalAlign={chartLayout.legendPosition === 'bottom' ? 'bottom' : 'middle'}
            content={renderLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}