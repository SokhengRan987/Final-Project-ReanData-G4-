import React, { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSet, setDataSet] = useState("Budget Allocation");
  const [chartData, setChartData] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [statistics, setStatistics] = useState({
    total: "0",
    largest: "0",
    smallest: "0"
  });

  // Generate different datasets for demonstration
  useEffect(() => {
    // Generate or set appropriate datasets based on selection
    let dataArray = [];
    let labels = [];
    let backgroundColors = [];
    let hoverBackgroundColors = [];

    if (dataSet === "Budget Allocation") {
      // Simulating budget allocation data
      dataArray = [35, 20, 15, 10, 12, 8];
      labels = ["Marketing", "R&D", "Operations", "HR", "IT", "Admin"];
      backgroundColors = [
        "rgba(65, 105, 225, 0.8)",  // Royal Blue
        "rgba(46, 139, 87, 0.8)",   // Sea Green
        "rgba(220, 20, 60, 0.8)",   // Crimson
        "rgba(255, 165, 0, 0.8)",   // Orange
        "rgba(138, 43, 226, 0.8)",  // BlueViolet
        "rgba(64, 224, 208, 0.8)"   // Turquoise
      ];
      hoverBackgroundColors = [
        "rgba(65, 105, 225, 1)",
        "rgba(46, 139, 87, 1)",
        "rgba(220, 20, 60, 1)",
        "rgba(255, 165, 0, 1)",
        "rgba(138, 43, 226, 1)",
        "rgba(64, 224, 208, 1)"
      ];
      setStatistics({
        total: "$1,000,000",
        largest: "Marketing: 35%",
        smallest: "Admin: 8%"
      });
    } else if (dataSet === "Traffic Sources") {
      // Simulating traffic sources data
      dataArray = [42, 25, 18, 10, 5];
      labels = ["Organic Search", "Social Media", "Direct", "Referrals", "Other"];
      backgroundColors = [
        "rgba(54, 162, 235, 0.8)",  // Blue
        "rgba(255, 99, 132, 0.8)",  // Red
        "rgba(255, 206, 86, 0.8)",  // Yellow
        "rgba(75, 192, 192, 0.8)",  // Green
        "rgba(153, 102, 255, 0.8)"  // Purple
      ];
      hoverBackgroundColors = [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)"
      ];
      setStatistics({
        total: "125,750 visitors",
        largest: "Organic: 42%",
        smallest: "Other: 5%"
      });
    } else if (dataSet === "Device Usage") {
      // Simulating device usage data
      dataArray = [55, 30, 15];
      labels = ["Mobile", "Desktop", "Tablet"];
      backgroundColors = [
        "rgba(75, 192, 192, 0.8)",  // Teal
        "rgba(153, 102, 255, 0.8)",  // Purple
        "rgba(255, 159, 64, 0.8)"   // Orange
      ];
      hoverBackgroundColors = [
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ];
      setStatistics({
        total: "125,750 users",
        largest: "Mobile: 55%",
        smallest: "Tablet: 15%"
      });
    }

    // Prepare the dataset for Chart.js
    const newChartData = {
      labels: labels,
      datasets: [
        {
          data: dataArray,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors,
          borderColor: "white",
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverOffset: 10,
          weight: 1
        }
      ]
    };

    setChartData(newChartData);
  }, [dataSet]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Chart configuration
    const config = {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutQuart"
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              font: {
                family: "Inter",
                size: 12,
                weight: "500"
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
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
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}% (${value})`;
              }
            }
          }
        },
        cutout: "65%",
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            setSelectedSegment(index);
          } else {
            setSelectedSegment(null);
          }
          setIsLoaded(true);
        }
      }
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

  // Handle dataset change
  const handleDataSetChange = (set) => {
    setIsLoaded(false);
    setSelectedSegment(null);
    setDataSet(set);
    setIsDropdownOpen(false);
  };

  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-0 p-6 rounded-xl">
      <span className="block font-['Inter'] text-[24px] font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8 before:bg-[#3C55A5] before:left-[-16px] before:top-1 before:rounded-sm">
        Doughnut Chart
      </span>
      <div className="flex w-full max-w-4xl pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative  z-[1] mt-9 mx-auto transition-all duration-500  border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative z-[2]">
          <span className="h-[25px] grow shrink-0 basis-auto font-['Inter'] text-[24px] leading-6 text-[#343a40] relative text-left whitespace-nowrap z-[3]">
            {dataSet} Breakdown
          </span>
          <div className="relative">
            <div 
              className="flex opacity-0 px-4 py-2 gap-1 items-center shrink-0 flex-nowrap bg-white rounded-lg relative z-[4] hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#e9ecef]"
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
                  {["Budget Allocation", "Traffic Sources", "Device Usage"].map((set) => (
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
        <div className="flex w-full gap-6 mt-4">
          <div className="w-1/2 h-[340px] relative">
            <canvas ref={chartRef} className="w-full h-full"></canvas>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-[#6c757d] text-xs mb-1">Total</div>
              <div className="text-[#343a40] text-xl font-bold">{statistics.total.split(' ')[0]}</div>
              {statistics.total.split(' ').length > 1 && (
                <div className="text-[#6c757d] text-xs">{statistics.total.split(' ')[1]}</div>
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <div className="bg-[#f8f9fa] p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#343a40] mb-4">Key Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6c757d]">Total</span>
                  <span className="text-base font-medium text-[#343a40]">{statistics.total}</span>
                </div>
                
                <div className="h-px bg-[#e9ecef]"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6c757d]">Largest Segment</span>
                  <span className="text-base font-medium text-[#343a40]">{statistics.largest}</span>
                </div>
                
                <div className="h-px bg-[#e9ecef]"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6c757d]">Smallest Segment</span>
                  <span className="text-base font-medium text-[#343a40]">{statistics.smallest}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-sm text-[#6c757d] mb-2">
                  {selectedSegment !== null ? (
                    <span>Click on a segment for details</span>
                  ) : (
                    <span>Selected: {selectedSegment !== null ? chartData.labels[selectedSegment] : "None"}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="grid grid-cols-3 gap-4">
            {chartData && chartData.labels.map((label, index) => {
              const value = chartData.datasets[0].data[index];
              const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              
              return (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    selectedSegment === index ? 'border-[#3C55A5] bg-[rgba(60,85,165,0.05)]' : 'border-[#e9ecef] hover:border-[#3C55A5] hover:bg-[rgba(60,85,165,0.02)]'
                  }`}
                  onClick={() => setSelectedSegment(index === selectedSegment ? null : index)}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                    ></div>
                    <span className="text-sm font-medium text-[#343a40]">{label}</span>
                  </div>
                  <div className="mt-1 font-bold text-base text-[#343a40]">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl font-['Roboto'] text-[24px] font-normal leading-8 relative text-left z-[59] mt-2 mx-auto p-1 transition-all duration-500">
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is a Doughnut Chart?
        </span>
        <span className="font-['Inter'] text-[20px] leading-8 text-[#334155] relative text-left block mt-3">
        A doughnut chart is a variation of a pie chart, but with a hollow center. Like a pie chart, it represents proportions of a whole, but the empty center can be used for additional information or to enhance readability.
        </span>
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for a Doughnut Chart?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Market Share Distribution (e.g., different companies' shares in an industry)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Budget Allocation (e.g., percentage spent on rent, utilities, salaries, etc.)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Sales by Product Category (e.g., electronics, clothing, and groceries as percentages of total sales)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Survey Results (e.g., customer preferences for different brands)</span>
          </li>
        </ul>
        <span className="font-['Inter'] text-[24px] leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using  Doughnut chart  ?
        </span>
        <ul className="mt-6 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">mproved Readability - The hollow center makes it easier to read compared to a pie chart, especially when dealing with multiple categories.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Highlights Part-to-Whole Relationships - Clearly shows how different categories contribute to a total.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[20px] text-[#334155]">Useful for Multi-Level Data - Nested (multi-layered) doughnut charts can display hierarchical data.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}