import React, { useState } from 'react';
import Loader from "../../../components/loading/Loader";
import { useGetPreferredPromotionQuery } from '../../../redux/service/food-beverages/preferredPromotion';

export default function BarChart() {
  const { data, error, isLoading } = useGetPreferredPromotionQuery();
  const [sortOrder, setSortOrder] = useState('desc');
  const [hoveredItem, setHoveredItem] = useState(null);
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <div className="text-red-500 p-4">Error loading data: {error.message}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div className="text-gray-500 p-4">No promotion data available.</div>;
  }
  
  // Sort the data based on count
  const sortedData = [...data].sort((a, b) => {
    return sortOrder === 'desc' ? b.count - a.count : a.count - b.count;
  });
  
  // Find the maximum count to calculate percentages for bars
  const maxCount = Math.max(...sortedData.map(item => item.count));
  
  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };
  
  return (
    <div className="">
      <div className="flex justify-end mb-6">
        <button 
          onClick={handleSort}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-[20px] hover:bg-blue-100 transition-colors"
        >
          Sort {sortOrder === 'desc' ? '↑' : '↓'}
        </button>
      </div>
      
      <div className="space-y-4">
        {sortedData.map((item) => (
          <div 
            key={item.promotion} 
            className="flex justify-between items-center group cursor-pointer"
            onMouseEnter={() => setHoveredItem(item.promotion)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`w-48 ${hoveredItem === item.promotion ? 'text-blue-700 font-medium' : 'text-gray-700'} transition-colors`}>
              {item.promotion}
            </div>
            <div className="flex-1 flex items-center">
              <div className="relative flex-1 h-8">
                <div 
                  className={`absolute top-0 left-0 h-full ${hoveredItem === item.promotion ? 'bg-blue-600' : 'bg-blue-500'} rounded transition-all duration-200 ease-in-out`}
                  style={{ 
                    width: `${(item.count / maxCount) * 100}%`,
                    transform: hoveredItem === item.promotion ? 'scaleY(1.1)' : 'scaleY(1)'
                  }}
                >
                  {hoveredItem === item.promotion && (
                    <div className="absolute -top-8 right-0 bg-blue-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {((item.count / sortedData.reduce((sum, i) => sum + i.count, 0)) * 100).toFixed(1)}% of total
                    </div>
                  )}
                </div>
              </div>
              <div className={`w-12 text-right ${hoveredItem === item.promotion ? 'text-blue-700 font-bold' : 'text-gray-700 font-medium'} ml-4 transition-colors`}>
                {item.count}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        This visualization helps identify which promotional strategies are most preferred by customers.
      </p>
    </div>
  );
}