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
    smallest: "0",
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
        "rgba(65, 105, 225, 0.8)", // Royal Blue
        "rgba(46, 139, 87, 0.8)", // Sea Green
        "rgba(220, 20, 60, 0.8)", // Crimson
        "rgba(255, 165, 0, 0.8)", // Orange
        "rgba(138, 43, 226, 0.8)", // BlueViolet
        "rgba(64, 224, 208, 0.8)", // Turquoise
      ];
      hoverBackgroundColors = [
        "rgba(65, 105, 225, 1)",
        "rgba(46, 139, 87, 1)",
        "rgba(220, 20, 60, 1)",
        "rgba(255, 165, 0, 1)",
        "rgba(138, 43, 226, 1)",
        "rgba(64, 224, 208, 1)",
      ];
      setStatistics({
        total: "$1,000,000",
        largest: "Marketing: 35%",
        smallest: "Admin: 8%",
      });
    } else if (dataSet === "Traffic Sources") {
      // Simulating traffic sources data
      dataArray = [42, 25, 18, 10, 5];
      labels = [
        "Organic Search",
        "Social Media",
        "Direct",
        "Referrals",
        "Other",
      ];
      backgroundColors = [
        "rgba(54, 162, 235, 0.8)", // Blue
        "rgba(255, 99, 132, 0.8)", // Red
        "rgba(255, 206, 86, 0.8)", // Yellow
        "rgba(75, 192, 192, 0.8)", // Green
        "rgba(153, 102, 255, 0.8)", // Purple
      ];
      hoverBackgroundColors = [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ];
      setStatistics({
        total: "125,750 visitors",
        largest: "Organic: 42%",
        smallest: "Other: 5%",
      });
    } else if (dataSet === "Device Usage") {
      // Simulating device usage data
      dataArray = [55, 30, 15];
      labels = ["Mobile", "Desktop", "Tablet"];
      backgroundColors = [
        "rgba(75, 192, 192, 0.8)", // Teal
        "rgba(153, 102, 255, 0.8)", // Purple
        "rgba(255, 159, 64, 0.8)", // Orange
      ];
      hoverBackgroundColors = [
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ];
      setStatistics({
        total: "125,750 users",
        largest: "Mobile: 55%",
        smallest: "Tablet: 15%",
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
          weight: 1,
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
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              font: {
                family: "Roboto",
                size: 12,
                weight: "500",
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
              boxWidth: 10,
            },
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
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function (context) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}% (${value})`;
              },
            },
          },
        },
        cutout: "65%",
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            setSelectedSegment(index);
          } else {
            setSelectedSegment(null);
          }
          setIsLoaded(true);
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

  // Handle dataset change
  const handleDataSetChange = (set) => {
    setIsLoaded(false);
    setSelectedSegment(null);
    setDataSet(set);
    setIsDropdownOpen(false);
  };

  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-8 px-2 sm:px-4 lg:px-8">
      <span className="block font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-8 sm:leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-4 sm:mt-6 ml-2 sm:ml-4 before:content-[''] before:absolute before:w-2 before:h-6 sm:before:h-8 before:bg-[#3C55A5] before:left-[-12px] sm:before:left-[-16px] before:top-1 before:rounded-sm">
        Doughnut Chart
      </span>
      <div className="flex w-full max-w-screen-xl h-auto pt-4 sm:pt-6 flex-col lg:flex-row gap-12 justify-center items-center bg-white rounded-lg relative mt-4 sm:mt-6 mx-auto transition-all duration-500 border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-[#6c757d] text-xs mb-1">Total</div>
            <div className="text-[#343a40] text-xl font-bold">
              {statistics.total.split(" ")[0]}
            </div>
            {statistics.total.split(" ").length > 1 && (
              <div className="text-[#6c757d] text-xs">
                {statistics.total.split(" ")[1]}
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
          <div className="bg-[#f8f9fa] p-6 rounded-lg">
            <h3 className="text-md sm:text-lg font-semibold text-[#343a40] mb-4">
              Key Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] sm:text-sm text-[#6c757d]">Total</span>
                <span className="text-md sm:text-lg font-medium text-[#343a40]">
                  {statistics.total}
                </span>
              </div>
              <div className="h-px bg-[#e9ecef]"></div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] sm:text-sm text-[#6c757d]">Largest Segment</span>
                <span className="text-md sm:text-lg font-medium text-[#343a40]">
                  {statistics.largest}
                </span>
              </div>
              <div className="h-px bg-[#e9ecef]"></div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] sm:text-sm text-[#6c757d]">Smallest Segment</span>
                <span className="text-md sm:text-lg font-medium text-[#343a40]">
                  {statistics.smallest}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {chartData?.labels.map((label, index) => {
            const value = chartData.datasets[0].data[index];
            const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedSegment === index
                    ? "border-[#3C55A5] bg-[rgba(60,85,165,0.05)]"
                    : "border-[#e9ecef] hover:border-[#3C55A5] hover:bg-[rgba(60,85,165,0.02)]"
                }`}
                onClick={() =>
                  setSelectedSegment(index === selectedSegment ? null : index)
                }
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        chartData.datasets[0].backgroundColor[index],
                    }}
                  ></div>
                  <span className="text-sm font-medium text-[#343a40]">
                    {label}
                  </span>
                </div>
                <div className="mt-1 font-bold text-base text-[#343a40]">
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full max-w-screen-xl font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-normal leading-6 sm:leading-8 relative text-left mt-4 sm:mt-6 mx-auto p-1 transition-all duration-500">
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is a Doughnut Chart?
        </span>
        <span className="font-['Roboto'] text-[16px] sm:text-[18px] md:text-[20px] leading-6 sm:leading-8 text-[#334155] relative text-left block mt-3 sm:mt-4 mb-4 sm:mb-6">
          A doughnut chart is a variation of a pie chart, but with a hollow
          center. Like a pie chart, it represents proportions of a whole, but
          the empty center can be used for additional information or to enhance
          readability.
        </span>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for a Doughnut Chart?
        </span>
        <ul className="mt-3 sm:mt-4 space-y-2 mb-4 sm:mb-6">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Market Share Distribution (e.g., different companies' shares in an
              industry)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Budget Allocation (e.g., percentage spent on rent, utilities,
              salaries, etc.)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Sales by Product Category (e.g., electronics, clothing, and
              groceries as percentages of total sales)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Survey Results (e.g., customer preferences for different brands)
            </span>
          </li>
        </ul>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using Doughnut chart ?
        </span>
        <ul className="mt-6 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              mproved Readability – The hollow center makes it easier to read
              compared to a pie chart, especially when dealing with multiple
              categories.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Highlights Part-to-Whole Relationships – Clearly shows how
              different categories contribute to a total.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Useful for Multi-Level Data – Nested (multi-layered) doughnut
              charts can display hierarchical data.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
