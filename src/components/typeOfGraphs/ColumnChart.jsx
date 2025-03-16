import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ColumnChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSet, setDataSet] = useState("Technology Companies");
  const [chartData, setChartData] = useState(null);

  // Generate different datasets for demonstration
  useEffect(() => {
    let labels = [];
    let values = [];
    let backgroundColor = [];
    let title = "";
    let yAxisLabel = "";

    if (dataSet === "Technology Companies") {
      labels = [
        "Company A",
        "Company B",
        "Company C",
        "Company D",
        "Company E",
        "Company F",
        "Company G",
      ];
      values = [82, 65, 92, 55, 40, 30, 25];
      backgroundColor = [
        "rgba(75, 192, 192, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(65, 105, 225, 0.7)",
      ];
      title = "Technology Companies";
      yAxisLabel = "Innovation Score";
    } else if (dataSet === "World Cities") {
      labels = [
        "New York",
        "London",
        "Tokyo",
        "Paris",
        "Singapore",
        "Dubai",
        "Sydney",
      ];
      values = [75, 85, 65, 80, 60, 50, 55];
      backgroundColor = [
        "rgba(65, 105, 225, 0.7)",
        "rgba(46, 139, 87, 0.7)",
        "rgba(220, 20, 60, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(54, 162, 235, 0.7)",
      ];
      title = "World Cities";
      yAxisLabel = "Quality of Life Score";
    } else if (dataSet === "Scientific Research") {
      labels = [
        "Physics",
        "Biology",
        "Chemistry",
        "Astronomy",
        "Medicine",
        "Geology",
        "Computer Science",
      ];
      values = [30, 45, 70, 20, 60, 50, 40];
      backgroundColor = [
        "rgba(70, 130, 180, 0.7)",
        "rgba(46, 139, 87, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(106, 90, 205, 0.7)",
        "rgba(165, 42, 42, 0.7)",
        "rgba(30, 144, 255, 0.7)",
      ];
      title = "Scientific Research";
      yAxisLabel = "Publications Per Year";
    }

    // Prepare the dataset for Chart.js
    const newChartData = {
      labels: labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: backgroundColor,
          borderColor: backgroundColor.map((color) =>
            color.replace("0.7", "1")
          ),
          borderWidth: 1,
          borderRadius: 6,
          hoverBackgroundColor: backgroundColor.map((color) =>
            color.replace("0.7", "0.9")
          ),
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 2,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        },
      ],
    };

    setChartData({
      data: newChartData,
      yAxisLabel: yAxisLabel,
    });
  }, [dataSet]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Chart configuration
    const config = {
      type: "bar",
      data: chartData.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
        indexAxis: "x",
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: chartData.yAxisLabel,
              font: {
                size: 14,
                weight: "bold",
              },
            },
            max: 100,
            ticks: {
              stepSize: 20,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
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
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function (context) {
                return `${chartData.yAxisLabel}: ${context.parsed.y}`;
              },
            },
          },
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
    setDataSet(set);
    setIsDropdownOpen(false);
  };

  return (
    <div className="max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-0 p-6 rounded-xl bg-white">
      <span className="block font-['Inter'] text-2xl font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8 before:bg-[#3C55A5] before:left-[-16px] before:top-1 before:rounded-sm">
        Column Chart
      </span>
      <div className="flex w-full max-w-4xl h-[482px] pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap rounded-lg relative mt-9 mx-auto transition-all duration-500 border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative ">
          <span className="h-[25px] grow shrink-0 basis-auto font-['Inter'] text-2xl leading-6 text-[#343a40] relative text-left whitespace-nowrap">
            {dataSet} Visualization
          </span>
          <div className="relative">
            <div
              className="flex opacity-0 px-4 py-2 gap-1 items-center shrink-0 flex-nowrap bg-white rounded-lg relative hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#e9ecef]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-48 h-[18px] justify-end items-start shrink-0 font-['Inter'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap">
                {dataSet}
              </span>
              <div
                className={`w-4 h-4 shrink-0 relative transition-transform duration-300 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#343A40"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-48">
                <ul className="py-1">
                  {[
                    "Technology Companies",
                    "World Cities",
                    "Scientific Research",
                  ].map((set) => (
                    <li
                      key={set}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150 ${
                        set === dataSet
                          ? "bg-[#f0f4ff] text-[#3C55A5]"
                          : "text-[#343a40]"
                      }`}
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
        <div className="flex flex-col gap-6 items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative">
          <div className="self-stretch grow shrink-0 basis-0 rounded-lg relative border shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
            {/* Chart.js Canvas */}
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative bg-[#f8f9fa] p-4 rounded-lg">
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
                Column Chart
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
      <div className="w-full max-w-4xl font-['Roboto'] text-2xl font-normal leading-8 relative text-left mt-2 mx-auto p-1 transition-all duration-500">
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is a Column Chart?
        </span>
        <span className="font-['Inter'] text-xl leading-8 text-[#334155] relative text-left block mt-3">
          A column chart is a type of bar chart where vertical bars represent
          data values. The height of each bar corresponds to the value it
          represents. Column charts are used to compare different categories or
          track changes over time.
        </span>
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
          2. What Kind of Data is Perfect for a Column Chart?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Monthly Sales Data (e.g., comparing sales revenue from January to
              December)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Population by Country (e.g., comparing population sizes of
              different countries)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Product Performance (e.g., number of units sold for different
              product categories)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Test Scores Comparison (e.g., comparing average scores across
              different subjects)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Survey Results (e.g., number of votes for different response
              options)
            </span>
          </li>
        </ul>
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
          3. The importance of using column Charts ?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Easy Comparison Across Categories - Clearly shows differences
              between groups.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Effective for Trend Analysis - Helps track changes in data over
              time when used with time-series data.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Simple and Easy to Interpret - Column charts are visually
              intuitive and easy to understand.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
            Can Display Multiple Data Sets - Stacked and clustered column charts allow for comparison of multiple variables within a category
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}