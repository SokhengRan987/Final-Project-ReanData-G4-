import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import Loader from '../../loading/Loader';
import { useGetAirportTrafficQuery } from '../../../redux/service/airportTraffic';

export default function BarChartTraffic() {
  const [viewMode, setViewMode] = useState('continent');
  const [metricType, setMetricType] = useState('passengers');
  const [chartData, setChartData] = useState([]);
  
  // Using RTK Query to fetch data
  const { data, isLoading, error } = useGetAirportTrafficQuery();
  
  // Helper function to get full continent names
  const getContinentName = (code) => {
    const continents = {
      'NA': 'North America',
      'SA': 'South America',
      'EU': 'Europe',
      'AS': 'Asia',
      'AF': 'Africa',
      'OC': 'Oceania'
    };
    return continents[code] || code;
  };

  // Helper function to get country names
  const getCountryName = (code) => {
    const countries = {
      'US': 'United States',
      'CN': 'China',
      'DE': 'Germany',
      'FR': 'France',
      'CA': 'Canada',
      'NL': 'Netherlands',
      'JP': 'Japan',
      'AE': 'United Arab Emirates',
      'BR': 'Brazil',
      'IN': 'India',
      'ES': 'Spain',
      'MX': 'Mexico',
      'IE': 'Ireland',
      'AU': 'Australia',
      'GB': 'United Kingdom',
      'TH': 'Thailand',
      'SE': 'Sweden',
      'NO': 'Norway',
      'SG': 'Singapore',
      'IT': 'Italy',
      'TR': 'Turkey',
      'CH': 'Switzerland',
      'ID': 'Indonesia',
      'CZ': 'Czech Republic',
      'FI': 'Finland',
      'ZA': 'South Africa',
      'PT': 'Portugal',
      'NG': 'Nigeria',
      'NZ': 'New Zealand',
      'PK': 'Pakistan',
      'EG': 'Egypt',
      'JO': 'Jordan',
      'CO': 'Colombia',
      'AT': 'Austria',
      'SN': 'Senegal',
      'MY': 'Malaysia',
      'RO': 'Romania',
      'ET': 'Ethiopia',
      'HU': 'Hungary',
      'HK': 'Hong Kong',
      'UA': 'Ukraine',
      'ZW': 'Zimbabwe',
      'LB': 'Lebanon'
    };
    return countries[code] || code;
  };
  
  // Process data from API
  useEffect(() => {
    if (!data) return;
    
    let processedData = [];
    
    if (viewMode === 'continent') {
      // Group by continent
      const continentData = data.reduce((acc, item) => {
        const continent = item.p_continent;
        if (!acc[continent]) {
          acc[continent] = {
            name: getContinentName(continent),
            flights: 0,
            passengers: 0
          };
        }
        acc[continent].flights += item.p_total_departing_flights;
        acc[continent].passengers += item.p_total_passengers;
        return acc;
      }, {});
      
      // Convert to array and sort
      processedData = Object.values(continentData)
        .sort((a, b) => b[metricType] - a[metricType]);
    } else {
      // Country view
      processedData = data
        .map(item => ({
          name: getCountryName(item.p_country),
          flights: item.p_total_departing_flights,
          passengers: item.p_total_passengers
        }))
        .sort((a, b) => b[metricType] - a[metricType])
        .slice(0, 15);
    }
    
    setChartData(processedData);
  }, [data, viewMode, metricType]);
  
  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };
  
  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error loading data: {error.message}</div>;
  
  return (
    <div>
      <div className="flex flex-col mb-4 md:flex-row md:justify-between md:items-center">
        <h2 className="text-2xl font-medium mb-4 md:mb-0">Airport Traffic Analysis</h2>
        
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
          {/* View Mode Buttons */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-700">View By:</span>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  viewMode === 'continent' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setViewMode('continent')}
              >
                Continent
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  viewMode === 'country' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setViewMode('country')}
              >
                Country
              </button>
            </div>
          </div>
          
          {/* Metric Type Buttons */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-700">Show Data:</span>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  metricType === 'passengers' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setMetricType('passengers')}
              >
                Passengers
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  metricType === 'flights' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setMetricType('flights')}
              >
                Flights
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-96 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              interval={0}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              tickFormatter={formatNumber}
              width={80}
            />
            <Tooltip 
              formatter={(value) => [formatNumber(value), metricType === 'passengers' ? 'Passengers' : 'Flights']}
              contentStyle={{ backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            />
            <Legend />
            <Bar 
              dataKey={metricType} 
              fill={metricType === 'passengers' ? "#8884d8" : "#82ca9d"} 
              name={metricType === 'passengers' ? 'Total Passengers' : 'Total Flights'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        {viewMode === 'continent' ? 
          'Showing continents by ' + (metricType === 'passengers' ? 'passenger volume' : 'flight count') : 
          'Showing top 15 countries by ' + (metricType === 'passengers' ? 'passenger volume' : 'flight count')}
      </div>
    </div>
  );
}