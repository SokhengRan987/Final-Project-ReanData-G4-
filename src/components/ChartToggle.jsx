import React, { useState } from 'react';
import { BarChart2, PieChart as PieChartIcon } from 'lucide-react';

const ChartToggle = ({ initialChartType = 'pie' }) => {
  const [chartType, setChartType] = useState(initialChartType);

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
      {/* <button
        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
          chartType === "pie" ? "bg-white shadow text-blue-600" : "text-gray-600"
        }`}
        onClick={() => setChartType("pie")}
      >
        <PieChartIcon size={16} />
        <span>Pie</span>
      </button>
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
          chartType === "bar" ? "bg-white shadow text-blue-600" : "text-gray-600"
        }`}
        onClick={() => setChartType("bar")}
      >
        <BarChart2 size={16} />
        <span>Bar</span>
      </button> */}
    </div>
  );
};

export default ChartToggle;


