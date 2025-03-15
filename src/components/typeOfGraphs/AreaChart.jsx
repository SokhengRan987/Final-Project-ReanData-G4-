import React, { useEffect, useRef, useState } from "react";
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from "chart.js";

// Register required Chart.js components
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

export default function AreaChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSet, setDataSet] = useState("Monthly Revenue");
  const [chartData, setChartData] = useState(null);
  const [statistics, setStatistics] = useState({
    total: "0",
    average: "0",
    growth: "0%"
  });

  // Generate different datasets for demonstration
  useEffect(() => {
    // Generate or set appropriate datasets based on selection
    let dataArray = [];
    let labels = [];
    let backgroundColor = "";
    let borderColor = "";

    if (dataSet === "Monthly Revenue") {
      // Simulating monthly revenue data
      dataArray = [4500, 5200, 4800, 5800, 6200, 7500, 8200, 7800, 8500, 9200, 9800, 10500];
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      backgroundColor = "rgba(65, 105, 225, 0.2)";
      borderColor = "rgba(65, 105, 225, 1)";
      setStatistics({
        total: "$88,000",
        average: "$7,333",
        growth: "+133%"
      });
    } else if (dataSet === "Website Traffic") {
      // Simulating website traffic data
      dataArray = [12000, 15000, 18000, 16000, 19000, 22000, 25000, 28000, 26000, 29000, 32000, 35000];
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      backgroundColor = "rgba(46, 139, 87, 0.2)";
      borderColor = "rgba(46, 139, 87, 1)";
      setStatistics({
        total: "277,000",
        average: "23,083",
        growth: "+192%"
      });
    } else if (dataSet === "User Engagement") {
      // Simulating user engagement data
      dataArray = [25, 30, 35, 40, 38, 45, 50, 55, 60, 58, 65, 70];
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      backgroundColor = "rgba(220, 20, 60, 0.2)";
      borderColor = "rgba(220, 20, 60, 1)";
      setStatistics({
        total: "571",
        average: "47.6",
        growth: "+180%"
      });
    }

    // Prepare the dataset for Chart.js
    const newChartData = {
      labels: labels,
      datasets: [
        {
          label: dataSet,
          data: dataArray,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: borderColor,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: borderColor,
          pointHoverBorderColor: "#ffffff",
          tension: 0.4,
          fill: true
        },
      ],
    };

    setChartData(newChartData);
  }, [dataSet]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Chart configuration
    const config = {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutQuart"
        },
        scales: {
          x: {
            title: {
              display: true,
              text: getXAxisLabel(),
              font: {
                size: 14,
                weight: 'bold'
              },
              padding: {
                top: 10
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: getYAxisLabel(),
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                family: "Inter",
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
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                let prefix = "";
                if (dataSet === "Monthly Revenue") {
                  prefix = "$";
                }
                return `${context.dataset.label}: ${prefix}${context.raw.toLocaleString()}`;
              }
            }
          }
        },
        onClick: () => {
          setIsLoaded(true);
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
  }, [chartData, dataSet]);

  // Helper function to get x-axis label based on dataset
  const getXAxisLabel = () => {
    return "Month";
  };

  // Helper function to get y-axis label based on dataset
  const getYAxisLabel = () => {
    if (dataSet === "Monthly Revenue") return "Revenue ($)";
    if (dataSet === "Website Traffic") return "Visitors";
    if (dataSet === "User Engagement") return "Minutes per Session";
    return "Value";
  };

  // Handle dataset change
  const handleDataSetChange = (set) => {
    setIsLoaded(false);
    setDataSet(set);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br  relative mx-auto my-0 p-6 rounded-xl">
      <span className="block font-['Inter'] text-[24px] font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8 before:bg-[#3C55A5] before:left-[-16px] before:top-1 before:rounded-sm">
        Area Chart
      </span>
      <div className="flex w-full max-w-4xl h-[482px] pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap rounded-lg relative  z-[1] mt-9 mx-auto transition-all duration-500  border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative z-[2]">
          <span className="h-[25px] grow shrink-0 basis-auto font-['Inter'] text-[24px] leading-6 text-[#343a40] relative text-left whitespace-nowrap z-[3]">
            {dataSet} Trends
          </span>
          <div className="relative">
            <div 
              className="flex px-4 py-2 gap-1 opacity-0 items-center shrink-0 flex-nowrap bg-white rounded-lg relative z-[4] hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#e9ecef]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-40 h-[18px] justify-end items-start shrink-0 font-['Inter'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
                {dataSet}
              </span>
              <div className={`w-4 h-4 shrink-0 relative z-[6] transition-transform duration-300 transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#343A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 animate-fadeIn w-48">
                <ul className="py-1">
                  {["Monthly Revenue", "Website Traffic", "User Engagement"].map((set) => (
                    <li 
                      key={set}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150 ${set === dataSet ? 'bg-[#f0f4ff] text-[#3C55A5]' : 'text-[#343a40]'}`}
                      onClick={() => handleDataSetChange(set)}
                    >
                      {set}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[8]">
          <div className="self-stretch grow shrink-0 basis-0 rounded-lg relative z-[9] border shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
            {/* Chart.js Canvas */}
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[10] bg-[#f8f9fa] p-4 rounded-lg">
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Inter'] text-xs text-[#6c757d]">
                Total
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                {statistics.total}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Inter'] text-xs text-[#6c757d]">
                Average
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                {statistics.average}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Inter'] text-xs text-[#6c757d]">
                Annual Growth
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                {statistics.growth}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl font-['Roboto'] text-[24px] font-normal leading-8 relative text-left z-[59] mt-2 mx-auto p-1 transition-all duration-500">
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is an Area Chart?
        </span>
        <span className="font-['Inter'] text-[20px] leading-8 text-[#334155] relative text-left block mt-3">
        An area chart is similar to a line chart, but the area beneath the line is filled with color. It is used to represent quantities over time and helps show trends while also emphasizing the magnitude of values.
        </span>
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for an Area Chart?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Stock Market Trends (e.g., company stock prices over time)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Population Growth (e.g., total population changes over years)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Energy Consumption (e.g., electricity usage over different seasons)
            </span>
          </li>
        </ul>
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using area chart ?
        </span>
        <ul className="mt-6 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Shows Trends Clearly - Emphasizes the rise and fall of values over time.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Highlights Magnitude - By filling the area under the line, it visually shows how much a value changes.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Compares Multiple Data Series - A stacked area chart can show how different categories contribute to a total.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}