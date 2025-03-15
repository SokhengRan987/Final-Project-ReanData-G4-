import React, { useEffect, useRef, useState } from "react";
import { Chart, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
Chart.register(LinearScale, PointElement, Tooltip, Legend);

export default function BubbleChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSet, setDataSet] = useState("Technology Companies");
  const [chartData, setChartData] = useState(null);

  // Generate different datasets for demonstration
  useEffect(() => {
    let dataArray = [];
    let backgroundColor = [];
    let title = "";
    let xAxisLabel = "";
    let yAxisLabel = "";

    if (dataSet === "Technology Companies") {
      // Data format: x, y, r (bubble size)
      dataArray = [
        { x: 45, y: 82, r: 30, label: "Company A" },
        { x: 72, y: 65, r: 25, label: "Company B" },
        { x: 30, y: 92, r: 20, label: "Company C" },
        { x: 60, y: 55, r: 15, label: "Company D" },
        { x: 25, y: 40, r: 10, label: "Company E" },
        { x: 90, y: 30, r: 22, label: "Company F" },
        { x: 40, y: 25, r: 18, label: "Company G" }
      ];
      backgroundColor = [
        "rgba(75, 192, 192, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(65, 105, 225, 0.7)"
      ];
      title = "Technology Companies";
      xAxisLabel = "Market Share (%)";
      yAxisLabel = "Innovation Score";
    } else if (dataSet === "World Cities") {
      dataArray = [
        { x: 70, y: 75, r: 35, label: "New York" },
        { x: 65, y: 85, r: 32, label: "London" },
        { x: 80, y: 65, r: 30, label: "Tokyo" },
        { x: 60, y: 80, r: 28, label: "Paris" },
        { x: 50, y: 60, r: 25, label: "Singapore" },
        { x: 40, y: 50, r: 20, label: "Dubai" },
        { x: 45, y: 55, r: 18, label: "Sydney" }
      ];
      backgroundColor = [
        "rgba(65, 105, 225, 0.7)",
        "rgba(46, 139, 87, 0.7)",
        "rgba(220, 20, 60, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(54, 162, 235, 0.7)"
      ];
      title = "World Cities";
      xAxisLabel = "Economic Index";
      yAxisLabel = "Quality of Life Score";
    } else if (dataSet === "Scientific Research") {
      dataArray = [
        { x: 80, y: 30, r: 25, label: "Physics" },
        { x: 65, y: 45, r: 30, label: "Biology" },
        { x: 55, y: 70, r: 20, label: "Chemistry" },
        { x: 85, y: 20, r: 15, label: "Astronomy" },
        { x: 45, y: 60, r: 35, label: "Medicine" },
        { x: 35, y: 50, r: 10, label: "Geology" },
        { x: 75, y: 40, r: 22, label: "Computer Science" }
      ];
      backgroundColor = [
        "rgba(70, 130, 180, 0.7)",
        "rgba(46, 139, 87, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(106, 90, 205, 0.7)",
        "rgba(165, 42, 42, 0.7)",
        "rgba(30, 144, 255, 0.7)"
      ];
      title = "Scientific Research";
      xAxisLabel = "Funding (millions $)";
      yAxisLabel = "Publications Per Year";
    }

    // Prepare the dataset for Chart.js
    const newChartData = {
      datasets: [
        {
          label: title,
          data: dataArray.map(item => ({
            x: item.x,
            y: item.y,
            r: item.r / 2, // Scale radius for better visuals
            label: item.label
          })),
          backgroundColor: backgroundColor,
          borderColor: backgroundColor.map(color => color.replace("0.7", "1")),
          borderWidth: 1,
          hoverBackgroundColor: backgroundColor.map(color => color.replace("0.7", "0.9")),
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 2,
        },
      ],
      labels: dataArray.map(item => item.label)
    };

    setChartData({
      data: newChartData,
      xAxisLabel: xAxisLabel,
      yAxisLabel: yAxisLabel
    });
  }, [dataSet]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Chart configuration
    const config = {
      type: "bubble",
      data: chartData.data,
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
              text: chartData.xAxisLabel,
              font: {
                size: 14,
                weight: 'bold'
              },
              padding: {
                top: 10
              }
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          },
          y: {
            title: {
              display: true,
              text: chartData.yAxisLabel,
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            display: false
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
                return tooltipItems[0].raw.label;
              },
              label: function(context) {
                return [
                  `${chartData.xAxisLabel}: ${context.parsed.x}`,
                  `${chartData.yAxisLabel}: ${context.parsed.y}`,
                  `Size: ${context.parsed.r * 2}`
                ];
              }
            }
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
  }, [chartData]);

  // Handle dataset change
  const handleDataSetChange = (set) => {
    setDataSet(set);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br  relative mx-auto my-0 p-6 rounded-xl">
      <span className="block font-['Inter'] text-2xl font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8 before:bg-[#3C55A5] before:left-[-16px] before:top-1 before:rounded-sm">
        Bubble Chart
      </span>
      <div className="flex w-full max-w-4xl h-[482px] pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative  z-[1] mt-9 mx-auto transition-all duration-500  border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative z-[2]">
          <span className="h-[25px] grow shrink-0 basis-auto font-['Inter'] text-2xl leading-6 text-[#343a40] relative text-left whitespace-nowrap z-[3]">
            {dataSet} Visualization
          </span>
          <div className="relative">
            <div 
              className="flex opacity-0 px-4 py-2 gap-1 items-center shrink-0 flex-nowrap bg-white rounded-lg relative z-[4] hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#e9ecef]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-48 h-[18px] justify-end items-start shrink-0 font-['Inter'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
                {dataSet}
              </span>
              <div className={`w-4 h-4 shrink-0 relative z-[6] transition-transform duration-300 transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#343A40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 w-48">
                <ul className="py-1">
                  {["Technology Companies", "World Cities", "Scientific Research"].map((set) => (
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
                Dataset
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                {dataSet}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Inter'] text-xs text-[#6c757d]">
                Type
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                Bubble Chart
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Inter'] text-xs text-[#6c757d]">
                Items
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                7
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl font-['Roboto'] text-2xl font-normal leading-8 relative text-left z-[59] mt-2 mx-auto p-1 transition-all duration-500">
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
         1. What is a Bubble Chart?
        </span>
        <span className="font-['Inter'] text-xl leading-8 text-[#334155] relative text-left block mt-3">
        A bubble chart is an advanced version of a scatter plot, where each data point is represented by a bubble, and the size of the bubble represents a third variable. .
        </span>
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
         2.What Kind of Data is Perfect for a Bubble Chart?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">Economic Data (e.g., GDP per capita vs. life expectancy, with population size as bubble size)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">Marketing Performance (e.g., ad spend vs. revenue, with number of customers as bubble size)</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">Sales Analysis (e.g., product price vs. sales, with market share as bubble size)</span>
          </li>
        </ul>
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
         2.The importance of using bubble  chart  ?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">Visualizing Three Variables at Once - Unlike scatter plots, bubble charts show an extra dimension (bubble size), making them useful for complex data analysis.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">Comparing Data Points Easily - Helps compare multiple entities in terms of size, position, and trends.</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">Highlighting Relationships and Trends - Shows correlations between variables and how one influences another.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}