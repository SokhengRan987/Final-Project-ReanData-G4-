import React, { useEffect, useRef, useState } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Bar() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalValue, setTotalValue] = useState("$0.00");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataType, setDataType] = useState("Revenue");
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState("12 months");
  const [currentValue, setCurrentValue] = useState("$0.00");
  const [percentChange, setPercentChange] = useState("0%");
  const [isPositive, setIsPositive] = useState(true);

  // Prepare different datasets for data types
  useEffect(() => {
    // Revenue dataset
    const revenueData = {
      labels: ["Products", "Services", "Subscriptions", "Licensing", "Partnerships"],
      datasets: [
        {
          label: "Revenue",
          data: [45678.89, 32456.78, 28765.43, 18543.21, 15432.10],
          backgroundColor: [
            "rgba(60, 85, 165, 0.8)",
            "rgba(75, 135, 185, 0.8)",
            "rgba(90, 185, 205, 0.8)",
            "rgba(105, 220, 225, 0.8)",
            "rgba(120, 190, 195, 0.8)"
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
          hoverBackgroundColor: [
            "rgba(60, 85, 165, 1)",
            "rgba(75, 135, 185, 1)",
            "rgba(90, 185, 205, 1)",
            "rgba(105, 220, 225, 1)",
            "rgba(120, 190, 195, 1)"
          ],
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 3,
        },
      ],
    };

    // Expenses dataset
    const expensesData = {
      labels: ["Operations", "Marketing", "R&D", "Administration", "Infrastructure"],
      datasets: [
        {
          label: "Expenses",
          data: [38765.43, 25432.10, 22345.67, 17654.32, 14321.09],
          backgroundColor: [
            "rgba(220, 53, 69, 0.8)",
            "rgba(240, 103, 79, 0.8)",
            "rgba(255, 153, 89, 0.8)",
            "rgba(255, 193, 99, 0.8)",
            "rgba(255, 223, 109, 0.8)"
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
          hoverBackgroundColor: [
            "rgba(220, 53, 69, 1)",
            "rgba(240, 103, 79, 1)",
            "rgba(255, 153, 89, 1)",
            "rgba(255, 193, 99, 1)",
            "rgba(255, 223, 109, 1)"
          ],
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 3,
        },
      ],
    };

    // Set initial chart data based on selected data type
    if (dataType === "Expenses") {
      setChartData(expensesData);
    } else {
      setChartData(revenueData);
    }
    
    // Set some sample metrics based on the data type
    if (dataType === "Expenses") {
      setCurrentValue("$118,518.61");
      setPercentChange("5.2%");
      setIsPositive(false);
    } else {
      setCurrentValue("$140,876.41");
      setPercentChange("8.3%");
      setIsPositive(true);
    }
  }, [dataType]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Calculate total value
    const total = chartData.datasets[0].data.reduce((acc, val) => acc + val, 0);
    
    // Chart configuration
    const config = {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          delay: (context) => {
            let index = context.dataIndex;
            return index * 100;
          },
          easing: "easeOutCubic",
          onProgress: (animation) => {
            const currentProgress = animation.currentStep / animation.numSteps;
            const currentTotalValue = total * currentProgress;
            setTotalValue(new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              minimumFractionDigits: 2 
            }).format(currentTotalValue));
          },
          onComplete: () => {
            setIsLoaded(true);
            setSelectedCategory(chartData.labels[0]);
            setSelectedValue(new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              minimumFractionDigits: 2 
            }).format(chartData.datasets[0].data[0]));
            setSelectedPercentage(((chartData.datasets[0].data[0] / total) * 100).toFixed(1) + "%");
          }
        },
        hover: {
          mode: "nearest",
          animationDuration: 150
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                family: "Roboto",
                size: 12,
                weight: "600",
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 10
            }
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
              label: function(context) {
                const value = context.raw;
                const percentage = ((value / total) * 100).toFixed(1) + "%";
                return `${context.label}: ${new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 2 
                }).format(value)} (${percentage})`;
              }
            }
          }
        },
        Robotoaction: {
          mode: 'nearest',
          Robotosect: true,
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            setSelectedCategory(chartData.labels[index]);
            setSelectedValue(new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              minimumFractionDigits: 2 
            }).format(chartData.datasets[0].data[index]));
            setSelectedPercentage(((chartData.datasets[0].data[index] / total) * 100).toFixed(1) + "%");
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

    // Set total value
    setTotalValue(new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2 
    }).format(total));

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  // Handle data type change
  const handleDataTypeChange = (type) => {
    setIsLoaded(false);
    setDataType(type);
    setIsDropdownOpen(false);
  };
  
  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-8 px-2 sm:px-4 lg:px-8">
      {/* Title */}
      <span className="block font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-8 sm:leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-4 sm:mt-6 ml-2 sm:ml-4 before:content-[''] before:absolute before:w-2 before:h-6 sm:before:h-8 before:bg-[#3C55A5] before:left-[-12px] sm:before:left-[-16px] before:top-1 before:rounded-sm">
        Bar Chart
      </span>
  
      {/* Chart Container */}
      <div className="flex w-full max-w-screen-xl h-[450px] sm:h-[550px] pt-4 sm:pt-6 pr-4 sm:pr-8 pb-4 sm:pb-8 pl-4 sm:pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative mt-4 sm:mt-6 mx-auto transition-all duration-500 border border-[#3C55A5]">
        {/* Chart Header */}
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative">
          <span className="h-[20px] sm:h-[25px] grow shrink-0 basis-auto font-['Roboto'] text-base sm:text-lg md:text-xl leading-6 text-[#343a40] relative text-left whitespace-nowrap">
            Revenue Trends
          </span>
          <div className="relative">
            {/* <div 
              className="flex px-3 sm:px-4 py-1 gap-1 opacity-0 items-center shrink-0 flex-nowrap bg-white rounded-lg relative shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-16 sm:w-20 h-[16px] sm:h-[18px] justify-end items-start shrink-0 basis-auto font-['Roboto'] text-xs sm:text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap">
                {timeRange}
              </span>
              <div className={`w-4 h-4 shrink-0 relative transition-transform duration-300 transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#343A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div> */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 animate-fadeIn w-32 sm:w-40">
                <ul className="py-1">
                  {["3 months", "6 months", "12 months"].map((range) => (
                    <li 
                      key={range}
                      className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150 ${range === timeRange ? 'bg-[#f0f4ff] text-[#3C55A5]' : 'text-[#343a40]'}`}
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
  
        {/* Chart and Statistics */}
        <div className="grid grid-cols-1 sm:gap-6 items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative">
          <div className="self-stretch h-80 sm:h-96 grow shrink-0 basis-0 rounded-lg relative border shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
            {/* Chart.js Canvas */}
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative">
            <div className="flex gap-2 items-center shrink-0 flex-nowrap relative">
              <span className={`shrink-0 basis-auto font-['Roboto'] text-base sm:text-lg font-bold leading-5 tracking-[-0.16px] relative text-left whitespace-nowrap transition-all duration-1000 ${isLoaded ? 'text-[#343a40]' : 'text-[#a8a8a8]'}`}>
                {currentValue}
              </span>
              <div className="flex gap-1 items-end shrink-0 flex-nowrap relative">
                <span className={`flex justify-center items-start shrink-0 basis-auto font-['Roboto'] text-xs font-semibold leading-4 relative text-center whitespace-nowrap transition-all duration-1000 ${isPositive ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
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
            <div className="flex gap-1 justify-center items-center shrink-0 flex-nowrap relative bg-[#f8f9fa] px-2 sm:px-3 py-1 rounded-full transition-all duration-300 hover:bg-[#e9ecef] cursor-pointer group">
              {/* Legend color indicator with pulse animation */}
              <div className="w-3 h-3 shrink-0 rounded-full bg-[#3C55A5] relative group-hover:animate-pulse"></div>
              <span className="shrink-0 basis-auto font-['Roboto'] text-xs font-semibold leading-3 text-[#5f666c] relative text-left whitespace-nowrap ml-1">
                Product
              </span>
            </div>
          </div>
        </div>
      </div>
  
      {/* FAQ Section */}
      <div className="w-full max-w-screen-xl font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-normal leading-6 sm:leading-8 relative text-left mt-4 sm:mt-6 mx-auto p-1 transition-all duration-500">
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is a Bar Chart?
        </span>
        <span className="font-['Roboto'] text-[16px] sm:text-[18px] md:text-[20px] leading-6 sm:leading-8 text-[#334155] relative text-left block mt-3 sm:mt-4 mb-4 sm:mb-6">
          A bar chart is a type of graph that represents data using rectangular bars. The length or height of each bar corresponds to the value it represents. Bar charts are used to compare different categories or groups.
        </span>
  
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for a Bar Chart?
        </span>
        <ul className="mt-3 sm:mt-4 space-y-2 mb-4 sm:mb-6">
          {["Categorical Data – Data divided into distinct categories (e.g., product types, regions, departments).", "Comparisons – Comparing values between different groups (e.g., sales of different products).", "Discrete Data – Data that falls into separate categories, rather than continuous values (e.g., number of students in different classes).", "Rankings – Showing highest to lowest values (e.g., top 10 best-selling books)"].map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
                <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
              </div>
              <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
                {item}
              </span>
            </li>
          ))}
        </ul>
  
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The Importance of Using a Bar Chart
        </span>
        <ul className="mt-3 sm:mt-4 space-y-2">
          {["Easy to Read and Interpret – Bar charts visually represent data in a clear and straightforward way, making comparisons simple.", "Effective for Comparisons – Helps in comparing different categories, groups, or trends efficiently.", "Shows Rankings Clearly – Useful for displaying rankings, such as the best-selling products or highest revenue-generating companies."].map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
                <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
              </div>
              <span className="ml-2 sm:ml-3 text-[16px] sm:text-[18px] md:text-[20px] text-[#334155]">
                {item}
              </span>
            </li>
          ))}
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