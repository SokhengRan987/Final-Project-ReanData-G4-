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
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <span className="block font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-8 sm:leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-4 sm:mt-6 ml-3 sm:ml-4 before:content-[''] before:absolute before:w-2 before:h-6 sm:before:h-8 before:bg-[#3C55A5] before:left-[-12px] sm:before:left-[-16px] before:top-1 before:rounded-sm">
        Column Chart
      </span>
      <div className="flex w-full max-w-screen-xl h-[450px] sm:h-[550px] pt-4 sm:pt-6 pr-4 sm:pr-8 pb-4 sm:pb-8 pl-4 sm:pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative mt-4 sm:mt-6 mx-auto transition-all duration-500 border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative">
          <span className="h-[20px] sm:h-[25px] grow shrink-0 basis-auto font-['Roboto'] text-[14px] sm:text-lg md:text-xl leading-6 text-[#343a40] relative text-left whitespace-nowrap">
            {dataSet} Visualization
          </span>
        </div>
        <div className="grid grid-cols-1 sm:gap-6 items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative">
          <div className="self-stretch h-80 sm:h-96 grow shrink-0 basis-0 rounded-lg relative border shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
            {/* Chart.js Canvas */}
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative">
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Roboto'] text-xs text-[#6c757d]">
                Dataset
              </span>
              <span className="font-['Roboto'] text-[13px] sm:text-lg font-bold text-[#343a40]">
                {dataSet}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Roboto'] text-xs text-[#6c757d]">
                Type
              </span>
              <span className="font-['Roboto'] text-[13px] sm:text-lg font-bold text-[#343a40]">
                Column Chart
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Roboto'] text-xs text-[#6c757d]">
                Items
              </span>
              <span className="font-['Roboto'] text-[13px] sm:text-lg font-bold text-[#343a40]">
                7
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* information section */}
      <div className="w-full max-w-screen-xl font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-normal leading-6 sm:leading-8 relative text-left mt-4 sm:mt-6 mx-auto p-1 transition-all duration-500">
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is a Column Chart?
        </span>
        <span className="font-['Roboto'] text-[16px] sm:text-[18px] md:text-[20px] leading-6 sm:leading-8 text-[#334155] relative text-left block mt-3 sm:mt-4 mb-4 sm:mb-6">
          A column chart is a type of bar chart where vertical bars represent
          data values. The height of each bar corresponds to the value it
          represents. Column charts are used to compare different categories or
          track changes over time.
        </span>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for a Column Chart?
        </span>
        <ul className="mt-3 sm:mt-4 space-y-2 mb-4 sm:mb-6">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Monthly Sales Data (e.g., comparing sales revenue from January to
              December)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Population by Country (e.g., comparing population sizes of
              different countries)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Product Performance (e.g., number of units sold for different
              product categories)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Test Scores Comparison (e.g., comparing average scores across
              different subjects)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Survey Results (e.g., number of votes for different response
              options)
            </span>
          </li>
        </ul>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using column Charts ?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Easy Comparison Across Categories –Clearly shows differences
              between groups.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Effective for Trend Analysis – Helps track changes in data over
              time when used with time-series data.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Simple and Easy to Robotopret – Column charts are visually
              intuitive and easy to understand.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
            Can Display Multiple Data Sets – Stacked and clustered column charts allow for comparison of multiple variables within a category
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}