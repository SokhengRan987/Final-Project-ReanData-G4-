import React from 'react';

const MetricsCard = ({ title, value, change, textColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-sm font-medium text-gray-500 mb-1">{title}</h2>
      <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-2">{change}</p>
    </div>
  );
};

export default MetricsCard;