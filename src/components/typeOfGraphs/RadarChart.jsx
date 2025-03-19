import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSet, setDataSet] = useState("Technology Companies");
  const [chartData, setChartData] = useState(null);

  // Generate different datasets for demonstration
  useEffect(() => {
    let labels = [];
    let datasets = [];
    let title = "";

    if (dataSet === "Technology Companies") {
      labels = [
        "Innovation",
        "Market Share",
        "Revenue Growth",
        "Customer Satisfaction",
        "Brand Value",
        "Product Quality",
        "Global Reach",
      ];
      datasets = [
        {
          label: "Company A",
          data: [85, 65, 78, 90, 70, 88, 72],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Company B",
          data: [70, 85, 65, 75, 80, 75, 90],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        },
      ];
      title = "Technology Companies";
    } else if (dataSet === "World Cities") {
      labels = [
        "Safety",
        "Economy",
        "Healthcare",
        "Education",
        "Infrastructure",
        "Culture",
        "Environment",
      ];
      datasets = [
        {
          label: "Tokyo",
          data: [85, 90, 85, 80, 95, 80, 70],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        },
        {
          label: "New York",
          data: [75, 95, 80, 85, 85, 90, 65],
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          pointBackgroundColor: "rgba(255, 159, 64, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 159, 64, 1)",
        },
        {
          label: "London",
          data: [80, 85, 85, 90, 80, 95, 75],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          pointBackgroundColor: "rgba(153, 102, 255, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(153, 102, 255, 1)",
        },
      ];
      title = "World Cities";
    } else if (dataSet === "Education Performance") {
      labels = [
        "Mathematics",
        "Science",
        "Reading",
        "Writing",
        "Problem Solving",
        "Digital Skills",
        "Critical Thinking",
      ];
      datasets = [
        {
          label: "School A",
          data: [90, 85, 75, 80, 85, 65, 90],
          backgroundColor: "rgba(46, 139, 87, 0.2)",
          borderColor: "rgba(46, 139, 87, 1)",
          pointBackgroundColor: "rgba(46, 139, 87, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(46, 139, 87, 1)",
        },
        {
          label: "School B",
          data: [75, 80, 90, 85, 70, 90, 75],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "National Average",
          data: [70, 75, 70, 72, 68, 75, 70],
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          pointBackgroundColor: "rgba(255, 206, 86, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 206, 86, 1)",
        },
      ];
      title = "Education Performance";
    }

    // Prepare the dataset for Chart.js
    const newChartData = {
      labels: labels,
      datasets: datasets,
    };

    setChartData({
      data: newChartData,
      title: title,
    });
  }, [dataSet]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Chart configuration
    const config = {
      type: "radar",
      data: chartData.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
        elements: {
          line: {
            borderWidth: 3,
          },
          point: {
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
          },
        },
        scales: {
          r: {
            angleLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              backdropColor: "rgba(255, 255, 255, 0.8)",
              display: false,
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            pointLabels: {
              font: {
                size: 12,
                family: "Roboto, sans-serif",
              },
              color: "#333",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 12,
                family: "Roboto, sans-serif",
              },
              boxWidth: 15,
              padding: 15,
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
                return `${context.dataset.label}: ${context.parsed.r}`;
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

  // Get entities count (number of datasets)
  const getEntitiesCount = () => {
    if (!chartData || !chartData.data || !chartData.data.datasets) return 0;
    return chartData.data.datasets.length;
  };

  // Get metrics count (number of axes in radar)
  const getMetricsCount = () => {
    if (!chartData || !chartData.data || !chartData.data.labels) return 0;
    return chartData.data.labels.length;
  };

  return (
    <div className="main-container w-[90%] sm:w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-8 lg:px-8">
      <span className="block font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-8 sm:leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-4 sm:mt-6 ml-3 sm:ml-4 before:content-[''] before:absolute before:w-2 before:h-6 sm:before:h-8 before:bg-[#3C55A5] before:left-[-12px] sm:before:left-[-16px] before:top-1 before:rounded-sm">
        Radar/Spider Chart
      </span>
      <div className="flex w-full max-w-screen-xl h-[490px] sm:h-[550px] pt-4 sm:pt-6 pr-4 sm:pr-8 pb-4 sm:pb-8 pl-4 sm:pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative mt-4 sm:mt-6 mx-auto transition-all duration-500 border border-[#3C55A5]">
        <div className="flex flex-col sm:flex-row gap-2 items-center self-stretch shrink-0 flex-nowrap relative mt-0 sm:mt-0">
          <span className="h-[20px] sm:h-[25px] grow shrink-0 basis-auto font-['Roboto'] text-md sm:text-lg md:text-xl leading-6 text-[#343a40] relative text-left whitespace-nowrap">
            {dataSet} Comparison
          </span>
          <div className="relative">
            <div
              className="flex px-4 py-2 gap-1 items-center shrink-0 flex-nowrap bg-gray-100 rounded-lg relative z-[4] hover:shadow-sm transition-all duration-300 hover:cursor-pointer border border-[#e9ecef]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-48 h-[18px] justify-end items-start shrink-0 font-['Roboto'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
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
              <div className="absolute right-0 mt-1 bg-white rounded-lg z-10 overflow-hidden transition-all duration-300 w-48">
                <ul className="py-1">
                  {[
                    "Technology Companies",
                    "World Cities",
                    "Education Performance",
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
              <span className="font-['Roboto'] text-lg font-bold text-[#343a40]">
                {dataSet}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
            <span className="font-['Roboto'] text-sm  text-[#6c757d]">
            Entities
              </span>
              <span className="font-['Roboto'] text-lg font-bold text-[#343a40]">
                {getEntitiesCount()}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
            <span className="font-['Roboto'] text-sm  text-[#6c757d]">
            Metrics
              </span>
              <span className="font-['Roboto'] text-lg font-bold text-[#343a40]">
                {getMetricsCount()}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* information section */}
      <div className="w-full max-w-screen-xl font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-normal leading-6 sm:leading-8 relative text-left mt-4 sm:mt-6 mx-auto p-1 transition-all duration-500">
      <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
      1.What is a Radar (Spider) Chart?
        </span>
        <span className="font-['Roboto'] text-[16px] sm:text-[18px] md:text-[20px] leading-6 sm:leading-8 text-[#334155] relative text-left block mt-3 sm:mt-4 mb-4 sm:mb-6">
          A Radar Chart, also called a Spider Chart or Web Chart, is a graphical
          method used to display multivariate data in a two-dimensional format.
        </span>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for a Radar/Spider Chart?
        </span>
        <ul className="mt-3 sm:mt-4 space-y-2 mb-4 sm:mb-6">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Performance Analysis (e.g., evaluating employee skills:
              communication, teamwork, problem-solving, etc.)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Sports Statistics (e.g., comparing a basketball player's shooting,
              defense, speed, and passing skills)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Product Comparison (e.g., comparing features of different
              smartphones: battery life, camera quality, performance, etc.)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Market Research (e.g., comparing customer satisfaction factors
              across different products)
            </span>
          </li>
        </ul>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using Radar/Spider Charts ?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Easy Comparison of Multiple Variables – Helps in visually
              comparing strengths and weaknesses of different subjects.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Shows Patterns and Relationships – Highlights how different
              attributes relate to each other within a dataset.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Effective for Ranking and Scoring – Useful for evaluating
              performance across different criteria (e.g., rating different
              products).
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
