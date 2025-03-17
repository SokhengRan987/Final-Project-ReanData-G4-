import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

// Register gradient plugin for Chart.js
const createGradientPlugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    const { chartArea } = chart;
    
    if (!chartArea) return;
    
    // Create gradient for the area under the line
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(60, 85, 165, 0)');
    gradient.addColorStop(0.5, 'rgba(60, 85, 165, 0.1)');
    gradient.addColorStop(1, 'rgba(60, 85, 165, 0.25)');
    
    chart.data.datasets[0].backgroundColor = gradient;
  }
};

// Custom crosshair plugin
const crosshairPlugin = {
  id: 'crosshair',
  defaults: {
    width: 1,
    color: 'rgba(0, 0, 0, 0.1)',
    dash: [4, 4]
  },
  afterDraw: (chart, args, options) => {
    const { ctx, tooltip, chartArea: { top, bottom, left, right } } = chart;
    
    if (tooltip && tooltip.opacity && tooltip.dataPoints && tooltip.dataPoints.length) {
      const x = tooltip.dataPoints[0].element.x;
      
      // Draw vertical line
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash(options.dash || []);
      ctx.lineWidth = options.width || 1;
      ctx.strokeStyle = options.color || 'rgba(0, 0, 0, 0.1)';
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.stroke();
      ctx.restore();
    }
  }
};

export default function Line() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentValue, setCurrentValue] = useState("$0.00");
  const [percentChange, setPercentChange] = useState("0%");
  const [isPositive, setIsPositive] = useState(true);
  const [timeRange, setTimeRange] = useState("6 months");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [highlightedPoint, setHighlightedPoint] = useState(null);

  // Prepare different datasets for time ranges
  useEffect(() => {
    // Base dataset for 6 months
    const sixMonthsData = {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Product",
          data: [5000, 15000, 10000, 20000, 15000, 20678.89],
          borderColor: "#3C55A5",
          backgroundColor: "rgba(60, 85, 165, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 7,
          pointBackgroundColor: "",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverBorderColor: "#3C55A5",
          pointHoverBorderWidth: 3,
          borderWidth: 3,
          hoverBorderWidth: 4,
        },
      ],
    };

    // Dataset for 3 months (slice of 6 months)
    const threeMonthsData = {
      labels: sixMonthsData.labels.slice(3),
      datasets: [
        {
          ...sixMonthsData.datasets[0],
          data: sixMonthsData.datasets[0].data.slice(3),
        },
      ],
    };

    // Dataset for 12 months (extended)
    const twelveMonthsData = {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          ...sixMonthsData.datasets[0],
          data: [7800, 9200, 12400, 8900, 10500, 13200, 5000, 15000, 10000, 20000, 15000, 20678.89],
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

    // Compute percent change from first to last value
    const firstValue = chartData.datasets[0].data[0];
    const lastValue = chartData.datasets[0].data[chartData.datasets[0].data.length - 1];
    const changePercent = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
    const isPositiveChange = changePercent > 0;
    
    // Chart configuration
    const config = {
      type: "line",
      data: chartData,
      plugins: [createGradientPlugin, crosshairPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          delay: (context) => {
            // Delay animation based on data index for sequential animation
            let index = context.dataIndex;
            let datasetIndex = context.datasetIndex;
            let delay = 0;
            
            if (context.type === 'data') {
              delay = index * 100;
            }
            
            return delay;
          },
          easing: "easeOutCubic",
          onProgress: (animation) => {
            // Update current value display during animation
            const currentProgress = animation.currentStep / animation.numSteps;
            const currentDataValue = firstValue + (lastValue - firstValue) * currentProgress;
            
            setCurrentValue(new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              minimumFractionDigits: 2 
            }).format(currentDataValue));
            
            const currentChangePercent = ((currentDataValue - firstValue) / firstValue * 100).toFixed(1);
            setPercentChange(currentChangePercent + "%");
            setIsPositive(currentChangePercent > 0);
          },
          onComplete: () => {
            // Show points when animation completes
            if (chartInstance.current) {
              chartInstance.current.data.datasets[0].pointRadius = 4;
              chartInstance.current.update();
              setIsLoaded(true);
              
              // Add a subtle pulse animation to the last point
              setTimeout(() => {
                setHighlightedPoint(chartData.labels.length - 1);
              }, 500);
            }
          }
        },
        hover: {
          mode: "nearest",
          Robotosect: false,
          animationDuration: 150
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: "index",
            Robotosect: false,
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
                return tooltipItems[0].label + " 2024";
              },
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD',
                    minimumFractionDigits: 2 
                  }).format(context.parsed.y);
                }
                return label;
              }
            }
          },
          crosshair: {
            width: 1,
            color: 'rgba(60, 85, 165, 0.3)',
            dash: [4, 4]
          }
        },
        scales: {
          x: {
            grid: {
              color: "#eaeaea",
              drawBorder: false,
              tickLength: 8
            },
            ticks: {
              font: {
                family: "Roboto",
                size: 12,
                weight: "600",
              },
              color: "#6c757d",
              padding: 10
            },
            border: {
              dash: [4, 4]
            }
          },
          y: {
            grid: {
              color: "#eaeaea",
              drawBorder: false,
              tickLength: 8
            },
            ticks: {
              font: {
                family: "Roboto",
                size: 12,
                weight: "600",
              },
              color: "#6c757d",
              callback: function(value) {
                if (value === 0) return "0";
                return value.toLocaleString() + " ";
              },
              stepSize: 5000,
              max: Math.max(...chartData.datasets[0].data) * 1.2,
              padding: 10
            },
            beginAtZero: true,
            border: {
              dash: [4, 4]
            }
          },
        },
        Robotoaction: {
          mode: 'index',
          Robotosect: false,
        },
        elements: {
          line: {
            borderWidth: 3,
            tension: 0.4
          },
          point: {
            hitRadius: 8,
            hoverRadius: 7
          }
        },
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
  }, [chartData]);

  // Effect to update highlighted point with animation
  useEffect(() => {
    if (highlightedPoint !== null && chartInstance.current) {
      const pulsePoint = () => {
        // Update point radius temporarily then revert back
        chartInstance.current.data.datasets[0].pointRadius = 
          chartInstance.current.data.datasets[0].pointRadius.map((r, i) => 
            i === highlightedPoint ? 6 : 4
          );
        chartInstance.current.update();
        
        setTimeout(() => {
          chartInstance.current.data.datasets[0].pointRadius = 
            chartInstance.current.data.datasets[0].pointRadius.map(() => 4);
          chartInstance.current.update();
        }, 300);
      };
      
      // Set up initial point radius array if it's not already
      if (!Array.isArray(chartInstance.current.data.datasets[0].pointRadius)) {
        chartInstance.current.data.datasets[0].pointRadius = 
          new Array(chartData.labels.length).fill(4);
      }
      
      pulsePoint();
      
      // Pulse animation Robotoval
      const pulseRobotoval = setRobotoval(pulsePoint, 2000);
      
      return () => clearRobotoval(pulseRobotoval);
    }
  }, [highlightedPoint, chartData]);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setIsLoaded(false);
    setTimeRange(range);
    setIsDropdownOpen(false);
  };

  return (
    <div className="main-container w-full max-w-6xl h-auto text-[24px] relative mx-auto my-0 p-6 ">
      <span className="block font-['Roboto'] text-[24px] font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8  before:left-[-16px] before:top-1  before:bg-[#3C55A5]  before:rounded-sm">
         Line Chart
      </span>
      <div className="flex w-full max-w-4xl h-[482px] pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative  z-[1] mt-9 mx-auto transition-all duration-500  border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative z-[2]">
          <span className="h-[25px] grow shrink-0 basis-auto font-['Roboto'] text-[24px]  leading-6 text-[#343a40] relative text-left whitespace-nowrap z-[3]">
            Revenue Trends
          </span>
          <div className="relative">
            <div 
              className="flex px-4 py-2 opacity-0 gap-1 items-center shrink-0 flex-nowrap bg-white rounded-lg relative shadow-md z-[4] hover:shadow-lg transition-all duration-300 cursor-poRoboto"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-16 h-[18px] justify-end items-start shrink-0 basis-auto font-['Roboto'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
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
                      className={`px-4 py-2 text-sm font-medium cursor-poRoboto hover:bg-[#f8f9fa] transition-colors duration-150 ${range === timeRange ? 'bg-[#f0f4ff] text-[#3C55A5]' : 'text-[#343a40]'}`}
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
          <div className="self-stretch grow shrink-0 basis-0 rounded-lg relative z-[9] border  shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
            {/* Chart.js Canvas */}
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-50">
            <div className="flex gap-2 items-center shrink-0 flex-nowrap relative z-[51]">
              <span className={`shrink-0 basis-auto font-['Roboto'] text-lg font-bold leading-5 tracking-[-0.16px] relative text-left whitespace-nowrap z-[52] transition-all duration-1000 ${isLoaded ? 'text-[#343a40]' : 'text-[#a8a8a8]'}`}>
                {currentValue}
              </span>
              <div className="flex gap-1 items-end shrink-0 flex-nowrap relative z-[53]">
                <span className={`flex justify-center items-start shrink-0 basis-auto font-['Roboto'] text-xs font-semibold leading-4 relative text-center whitespace-nowrap z-[54] transition-all duration-1000 ${isPositive ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                  {isPositive ? "+" : ""}{percentChange}
                </span>
                {/* Arrow icon based on trend with animation */}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-500 ${isPositive ? 'transform-none' : 'rotate-180'}`}
                >
                  <path 
                    d="M8 4L13 9H3L8 4Z" 
                    fill={isPositive ? "#28a745" : "#dc3545"}
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
            <div className="flex gap-1 justify-center items-center shrink-0 flex-nowrap relative z-[56] bg-[#f8f9fa] px-3 py-1 rounded-full transition-all duration-300 hover:bg-[#e9ecef] cursor-poRoboto group">
              {/* Legend color indicator with pulse animation */}
              <div className="w-3 h-3 shrink-0 rounded-full bg-[#3C55A5] relative z-[57] group-hover:animate-pulse"></div>
              <span className="shrink-0 basis-auto font-['Roboto'] text-xs font-semibold leading-3 text-[#5f666c] relative text-left whitespace-nowrap z-[58] ml-1">
                Product
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl font-['Roboto'] text-[24px] font-normal leading-8 relative text-left z-[59] mt-2 mx-auto  p-1  transition-all duration-500 ">
        <span className="font-['Roboto'] text-[24px]  leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
         1.What is Line Chart ?
        </span>
        <span className="font-['Roboto'] text-[20px] font-normal leading-8 text-[#1e293b] relative text-left block mt-3">
        A line chart is a type of graph that represents data points connected by a line, showing trends and changes over time. It is commonly used to display continuous data.
        </span>
        <span className="font-['Roboto'] text-[24px]  leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What kind of data that perfect for line  chart ?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Time Series Data –  This is one of the most common uses for line charts, such as(Example:Monthly sales figures)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3
             text-[20px] text-[#334155]">Trends and Patterns– Data that shows a gradual increase, decrease, or cyclical pattern over time.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Comparisons Over Time – Line charts can display multiple datasets on the same graph to compare their trends over the same period.</span>
          </li>
        </ul>
        <span className="font-['Roboto'] text-[24px]  leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using Bar chart ?
        </span>
        <ul className="mt-6 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Clarity of Trends – Line charts clearly show how data changes over time, making it easy to identify trends (e.g., increasing or decreasing patterns)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Comparing Multiple Data Sets – With multiple lines on the same chart, you can easily compare trends between different data sets, such as comparing sales for two products or performance across different regions.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Predictive Insights – By showing the historical trend, line charts can be used to make forecasts about future data points, helping in planning and forecasting.</span>
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