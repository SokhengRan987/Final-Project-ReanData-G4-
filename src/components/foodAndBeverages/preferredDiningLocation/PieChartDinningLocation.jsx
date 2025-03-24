import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from "../../../components/loading/Loader";
import { useGetPreferredDiningLocationQuery } from '../../../redux/service/food-beverages/preferredDiningLocation';

export default function PieChartDiningLocation() {
  const { data, error, isLoading } = useGetPreferredDiningLocationQuery();
  const [chartLayout, setChartLayout] = useState({
    legendPosition: 'right',
    outerRadius: 140,
    labelVisible: true
  });

  // Responsive chart layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartLayout({
          legendPosition: 'bottom',
          outerRadius: 100,
          labelVisible: false
        });
      } else if (window.innerWidth < 768) {
        setChartLayout({
          legendPosition: 'bottom',
          outerRadius: 120,
          labelVisible: true
        });
      } else {
        setChartLayout({
          legendPosition: 'right',
          outerRadius: 140,
          labelVisible: true
        });
      }
    };

    // Initial setup
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8',
    '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57',
    '#83a6ed', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96c7e8',
    '#ff9f1c', '#2ab7ca', '#fe4a49', '#fed766', '#009688',
    '#e91e63'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 sm:p-4 rounded-md shadow-md border border-gray-200 text-sm sm:text-base">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-gray-700">{`Count: ${payload[0].value}`}</p>
          <p className="text-gray-700">{`Percentage: ${(payload[0].percent * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const sortData = (data) => {
    if (!data) return [];
    return [...data].sort((a, b) => b.count - a.count);
  };

  const groupSmallCategories = (data, threshold = 3) => {
    if (!data || !Array.isArray(data) || data.length === 0) return [{ location: "No Data", count: 1 }];

    const sortedData = sortData(data);
    const result = [];
    let otherCount = 0;

    sortedData.forEach(item => {
      if (item.count >= threshold) {
        result.push(item);
      } else {
        otherCount += item.count;
      }
    });

    if (result.length === 0 && otherCount > 0) {
      result.push({ location: "Other", count: otherCount });
    } else if (otherCount > 0) {
      result.push({ location: "Other", count: otherCount });
    } else if (result.length === 0) {
      result.push({ location: "No Data", count: 1 });
    }

    return result;
  };

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [animationActive, setAnimationActive] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error loading data</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  const displayData = showAllCategories ? sortData(data) : groupSmallCategories(data);
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Custom label renderer for both modes
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (!chartLayout.labelVisible) return null;
    
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    // Adjust threshold for showing labels based on mode
    const minPercent = showAllCategories ? 0.03 : 0.05; // Slightly higher threshold in grouped mode to avoid clutter
    if (percent > minPercent) {
      return (
        <text
          x={x}
          y={y}
          fill="#333"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          fontSize={10}
          className="chart-label"
        >
          {`${name} (${(percent * 100).toFixed(0)}%)`}
        </text>
      );
    }
    return null;
  };

  const handleToggleCategories = () => {
    setAnimationActive(false);
    setShowAllCategories(prev => !prev);
    setTimeout(() => setAnimationActive(true), 50);
    setIsDropdownOpen(false);
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
        Preferred Dining Locations
      </h2>

      {/* Toggle Button - Responsive */}
      <div className="flex justify-end mb-4">
        {/* Mobile Dropdown */}
        {/* <div className="relative sm:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded-[20px] hover:bg-blue-600 text-sm transition-colors duration-200 flex items-center"
          >
            <span>Options</span>
            <svg 
              className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <button
                onClick={handleToggleCategories}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {showAllCategories ? "Group Small Categories" : "Show All Categories"}
              </button>
            </div>
          )}
        </div> */}
        
        {/* Desktop Button */}
        <button
          onClick={handleToggleCategories}
          className="px-4 py-2 bg-blue-500 text-white rounded-[20px] hover:bg-blue-600 text-sm transition-colors duration-200"
        >
          {showAllCategories ? "Group Small Categories" : "Show All Categories"}
        </button>
      </div>

      {/* Chart Container */}
      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: -10, left: 0 }}>
            <Pie
              key={showAllCategories ? 'show-all' : 'grouped'}
              data={displayData}
              cx="50%"
              cy="50%"
              labelLine={chartLayout.labelVisible} // Conditional label lines
              label={renderCustomizedLabel}
              outerRadius={chartLayout.outerRadius}
              fill="#8884d8"
              dataKey="count"
              nameKey="location"
              isAnimationActive={animationActive}
              animationDuration={750}
              animationEasing="ease-in-out"
              minAngle={1}
            >
              {displayData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout={chartLayout.legendPosition === 'bottom' ? 'horizontal' : 'vertical'}
              align={chartLayout.legendPosition === 'bottom' ? 'center' : 'right'}
              verticalAlign={chartLayout.legendPosition === 'bottom' ? 'bottom' : 'middle'}
              wrapperStyle={{
                fontSize: '10px',
                maxHeight: chartLayout.legendPosition === 'bottom' ? '80px' : '400px',
                overflowY: 'auto',
                paddingTop: chartLayout.legendPosition === 'bottom' ? '8px' : '0',
                width: chartLayout.legendPosition === 'bottom' ? '100%' : 'auto'
              }}
              iconSize={8}
              itemStyle={{ fontSize: '10px', marginBottom: '2px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Footer */}
      <div className="mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm text-gray-600">
          Total Responses: {total} • Top Location: {displayData[0]?.location} ({Math.round(displayData[0]?.count / total * 100)}%)
        </p>
      </div>
    </div>
  );
}