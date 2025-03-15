import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../loading/Loader';
import { useGetPreferredCuisineFrequencyQuery } from '../../../redux/service/food-beverages/preferredCuisineFrequency';

export default function BarChartCuisine() {
    const { data: apiData, error, isLoading } = useGetPreferredCuisineFrequencyQuery(); // Fixed typo: 'date' -> 'data'

    // Process the API data
    const processedData = useMemo(() => {
        if (!apiData) return null;
        
        // Sort data by count in descending order and map to Recharts format
        return apiData
            .filter(item => item.cuisine_range && typeof item.count === 'number')
            .sort((a, b) => b.count - a.count) // Sort by count, highest to lowest
            .map(item => ({
                name: item.cuisine_range,
                count: item.count
            }));
    }, [apiData]);

    // Calculate total for potential percentage calculations
    const totalCount = useMemo(() => {
        if (!processedData) return 0;
        return processedData.reduce((sum, item) => sum + item.count, 0);
    }, [processedData]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = ((data.count / totalCount) * 100).toFixed(2);
            return (
                <div className="custom-tooltip" style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}>
                    <p>{`${data.name}: ${data.count} preferences`}</p>
                    <p>{`(${percentage}%)`}</p>
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
            <div className="error-container" style={{ textAlign: 'center', padding: '20px' }}>
                <h3>Error loading cuisine preference data</h3>
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
        <div className="chart-container" style={{ width: '100%', margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={processedData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60, // Increased bottom margin for rotated labels
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
                            value: 'Cuisine Type', 
                            position: 'bottom',
                            offset: 40,
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}
                        tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }} // Rotate labels for better fit
                        interval={0} // Show all labels
                        height={80} // Increased height to accommodate rotated labels
                    />
                    <YAxis
                        label={{ 
                            value: 'Number of Preferences', 
                            angle: -90, 
                            position: 'insideLeft',
                            offset: 10,
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}
                        domain={[0, 'auto']}
                        allowDecimals={false}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        verticalAlign="top" 
                        height={40}
                        formatter={() => 'Preferences'}
                    />
                    <Bar 
                        dataKey="count" 
                        fill="#4E79A7"
                        radius={[5, 5, 0, 0]}
                        animationDuration={1000}
                        barSize={30} // Adjusted for many bars
                    />
                </BarChart>
            </ResponsiveContainer>
            <div style={{ 
                textAlign: 'center', 
                marginTop: '10px',
                fontSize: '14px',
                color: '#666'
            }}>
                Total Preferences: {totalCount}
            </div>
        </div>
    );
}