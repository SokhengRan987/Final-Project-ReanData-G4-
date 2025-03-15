import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function ScatterPlot() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeRange, setTimeRange] = useState("6 months");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [pointInfo, setPointInfo] = useState("Select a point");

  // Prepare different datasets for time ranges
  useEffect(() => {
    // Base dataset for 6 months (with x-y coordinates)
    const sixMonthsData = {
      datasets: [
        {
          label: "Sales vs Marketing Spend",
          data: [
            { x: 1200, y: 5000 },   // Apr
            { x: 2500, y: 15000 },  // May
            { x: 1800, y: 10000 },  // Jun
            { x: 3200, y: 20000 },  // Jul
            { x: 2300, y: 15000 },  // Aug
            { x: 3400, y: 20678 },  // Sep
          ],
          backgroundColor: "rgba(60, 85, 165, 0.7)",
          borderColor: "rgba(60, 85, 165, 1)",
          borderWidth: 2,
          pointRadius: 8,
          pointHoverRadius: 12,
          pointBackgroundColor: [
            "rgba(60, 85, 165, 0.8)",
            "rgba(75, 105, 189, 0.8)",
            "rgba(90, 125, 213, 0.8)",
            "rgba(105, 145, 237, 0.8)",
            "rgba(120, 165, 255, 0.8)",
            "rgba(135, 185, 255, 0.8)"
          ],
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverBorderWidth: 3,
        },
      ],
    };

    // Dataset for 3 months (slice of 6 months)
    const threeMonthsData = {
      datasets: [
        {
          ...sixMonthsData.datasets[0],
          data: sixMonthsData.datasets[0].data.slice(3),
          pointBackgroundColor: sixMonthsData.datasets[0].pointBackgroundColor.slice(3),
        },
      ],
    };

    // Dataset for 12 months (extended)
    const twelveMonthsData = {
      datasets: [
        {
          ...sixMonthsData.datasets[0],
          data: [
            { x: 1500, y: 7800 },  // Oct
            { x: 1700, y: 9200 },  // Nov
            { x: 2100, y: 12400 }, // Dec
            { x: 1600, y: 8900 },  // Jan
            { x: 1900, y: 10500 }, // Feb
            { x: 2200, y: 13200 }, // Mar
            { x: 1200, y: 5000 },  // Apr
            { x: 2500, y: 15000 }, // May
            { x: 1800, y: 10000 }, // Jun
            { x: 3200, y: 20000 }, // Jul
            { x: 2300, y: 15000 }, // Aug
            { x: 3400, y: 20678 }, // Sep
          ],
          pointBackgroundColor: [
            "rgba(60, 85, 165, 0.8)",
            "rgba(65, 90, 170, 0.8)",
            "rgba(70, 95, 175, 0.8)",
            "rgba(75, 100, 180, 0.8)",
            "rgba(80, 105, 185, 0.8)",
            "rgba(85, 110, 190, 0.8)",
            "rgba(90, 115, 195, 0.8)",
            "rgba(95, 120, 200, 0.8)",
            "rgba(100, 125, 205, 0.8)",
            "rgba(105, 130, 210, 0.8)",
            "rgba(110, 135, 215, 0.8)",
            "rgba(115, 140, 220, 0.8)"
          ],
        },
      ],
    };

    // Set initial chart data based on selected time range
    if (timeRange === "3 months") {
      setChartData(threeMonthsData);
    } else if (timeRange === "12 months") {
      setChartData(twelveMonthsData);
    } else {
      setChartData(sixMonthsData);
    }
  }, [timeRange]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Chart configuration
    const config = {
      type: "scatter",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutCubic",
          onComplete: () => {
            setIsLoaded(true);
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Marketing Spend ($)',
              font: {
                family: 'Inter',
                size: 14
              },
              padding: 10
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              tickLength: 5
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Sales Revenue ($)',
              font: {
                family: 'Inter',
                size: 14
              },
              padding: 10
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              tickLength: 5
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        hover: {
          mode: "nearest",
          intersect: true,
          animationDuration: 150
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#333",
            bodyColor: "#666",
            borderColor: "#ddd",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            usePointStyle: true,
            callbacks: {
              title: function(tooltipItems) {
                const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
                let monthIndex;
                
                if (timeRange === "3 months") {
                  monthIndex = tooltipItems[0].dataIndex + 6;
                } else if (timeRange === "6 months") {
                  monthIndex = tooltipItems[0].dataIndex + 3;
                } else {
                  monthIndex = tooltipItems[0].dataIndex;
                }
                
                return months[monthIndex % 12] + " 2024";
              },
              label: function(context) {
                return [
                  'Marketing Spend: $' + context.parsed.x.toLocaleString(),
                  'Sales Revenue: $' + context.parsed.y.toLocaleString(),
                  'ROI: ' + ((context.parsed.y / context.parsed.x - 1) * 100).toFixed(1) + '%'
                ];
              }
            }
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            setSelectedPoint(index);
            
            const point = chartData.datasets[0].data[index];
            const roi = ((point.y / point.x - 1) * 100).toFixed(1);
            
            setPointInfo(
              `Marketing: $${point.x.toLocaleString()} | Sales: $${point.y.toLocaleString()} | ROI: ${roi}%`
            );
          }
        }
      },
    };

    // Initialize or update the chart
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, config);
    }

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, timeRange]);

  // Effect to highlight selected point
  useEffect(() => {
    if (selectedPoint !== null && chartInstance.current && isLoaded) {
      // Create a highlight effect for the selected point
      const originalPointRadius = Array(chartData.datasets[0].data.length).fill(8);
      originalPointRadius[selectedPoint] = 12;
      
      chartInstance.current.data.datasets[0].pointRadius = originalPointRadius;
      chartInstance.current.update();
    }
  }, [selectedPoint, chartData, isLoaded]);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setIsLoaded(false);
    setTimeRange(range);
    setIsDropdownOpen(false);
    setSelectedPoint(null);
    setPointInfo("Select a point");
  };

  // Calculate trendline and correlation
  const calculateStats = () => {
    if (!chartData) return { trendline: null, correlation: 0 };
    
    const data = chartData.datasets[0].data;
    const n = data.length;
    
    // Calculate means
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;
    
    // Calculate correlation components
    let sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (const point of data) {
      sumXY += (point.x - meanX) * (point.y - meanY);
      sumX2 += Math.pow(point.x - meanX, 2);
      sumY2 += Math.pow(point.y - meanY, 2);
    }
    
    // Calculate correlation coefficient
    const correlation = sumXY / Math.sqrt(sumX2 * sumY2);
    
    // Calculate linear regression (y = mx + b)
    const slope = sumXY / sumX2;
    const intercept = meanY - slope * meanX;
    
    return {
      trendline: { slope, intercept },
      correlation: correlation.toFixed(2)
    };
  };
  
  const stats = calculateStats();

  return (
    <div className="main-container w-full max-w-screen-xl h-auto text-[24px] bg-gradient-to-br  relative mx-auto my-0 p-6 rounded-xl">
      <span className="block font-['Roboto'] text-[24px] font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8 before:bg-[#3C55A5] before:left-[-16px] before:top-1 before:rounded-sm">
        Scatter Plot
      </span>
      <div className="flex w-full max-w-4xl h-[482px] pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative  z-[1] mt-9 mx-auto transition-all duration-500  border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative z-[2]">
          <span className="h-[25px] grow shrink-0 basis-auto font-['Inter'] text-[24px] leading-6 text-[#343a40] relative text-left whitespace-nowrap z-[3]">
            Sales vs Marketing Spend
          </span>
          <div className="relative">
            <div 
              className="flex opacity-0 px-4 py-2 gap-1 items-center shrink-0 flex-nowrap bg-white rounded-lg relative shadow-md z-[4] hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-16 h-[18px] justify-end items-start shrink-0 basis-auto font-['Inter'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
                {timeRange}
              </span>
              <div className={`w-4 h-4 shrink-0 relative z-[6] transition-transform duration-300 transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#343A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 animate-fadeIn">
                <ul className="py-1">
                  {["3 months", "6 months", "12 months"].map((range) => (
                    <li 
                      key={range}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150 ${range === timeRange ? 'bg-[#f0f4ff] text-[#3C55A5]' : 'text-[#343a40]'}`}
                      onClick={() => handleTimeRangeChange(range)}
                    >
                      {range}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10 items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[8]">
          <div className="self-stretch grow shrink-0 basis-0 rounded-lg relative z-[9] border shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
            {/* Chart.js Canvas */}
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-50">
            <div className="flex gap-2 items-center shrink-0 flex-nowrap relative z-[51]">
              <span className={`shrink-0 basis-auto font-['Inter'] text-lg font-bold leading-5 tracking-[-0.16px] relative text-left whitespace-nowrap z-[52] transition-all duration-1000 ${isLoaded ? 'text-[#343a40]' : 'text-[#a8a8a8]'}`}>
                {pointInfo}
              </span>
            </div>
            <div className="flex gap-2 justify-center items-center shrink-0 flex-nowrap relative z-[56]">
              <div className="flex gap-1 justify-center items-center shrink-0 flex-nowrap relative bg-[#f8f9fa] px-3 py-1 rounded-full transition-all duration-300 hover:bg-[#e9ecef] cursor-pointer group">
                <div className="w-3 h-3 shrink-0 rounded-full bg-[#3C55A5] relative group-hover:animate-pulse"></div>
                <span className="shrink-0 basis-auto font-['Inter'] text-xs font-semibold leading-3 text-[#5f666c] relative text-left whitespace-nowrap ml-1">
                  Data Points
                </span>
              </div>
              <div className="flex gap-1 justify-center items-center shrink-0 flex-nowrap relative bg-[#f8f9fa] px-3 py-1 rounded-full">
                <span className="shrink-0 basis-auto font-['Inter'] text-xs font-semibold leading-3 text-[#5f666c] relative text-left whitespace-nowrap">
                  Correlation: {stats.correlation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl font-['Roboto'] text-[24px] font-normal leading-8 relative text-left z-[59] mt-2 mx-auto p-1 transition-all duration-500">
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
         1. What is a Scatter Plot?
        </span>
        <span className="font-['Inter'] text-[20px] font-normal leading-8 text-[#1e293b] relative text-left block mt-3">
        A scatter plot is a type of graph that shows the relationship between two numerical variables by plotting individual data points on an X-Y coordinate system.
        </span>
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for a Scatter Plot?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Height vs. Weight (e.g., comparing the height and weight of individuals)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Temperature vs. Ice Cream Sales (e.g., does warmer weather lead to higher sales?)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Study Time vs. Exam Scores (e.g., does studying more improve test performance?)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Advertising Spend vs. Revenue (e.g., does more marketing lead to higher sales?)</span>
          </li>
        </ul>
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using scatter plot ?
        </span>
        <ul className="mt-6 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Identifying Relationships - Helps determine if two variables are positively correlated, negatively correlated, or have no relationship.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Detecting Trends and Patterns - Reveals linear or nonlinear trends (e.g., exponential growth, clusters).</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Spotting Outliers - Highlights data points that don’t fit the general pattern, which may indicate errors or special cases.</span>
          </li>
        </ul>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
}