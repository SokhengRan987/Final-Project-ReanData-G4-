import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Histogram() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSet, setDataSet] = useState("Test Scores");
  const [binSize, setBinSize] = useState("10");
  const [chartData, setChartData] = useState(null);
  const [distribution, setDistribution] = useState({
    mean: "0",
    median: "0",
    stdDev: "0",
  });

  // Generate different datasets for demonstration
  useEffect(() => {
    // Generate or set appropriate datasets based on selection
    let dataArray = [];
    let labels = [];
    let backgroundColor = [];

    if (dataSet === "Test Scores") {
      // Simulating test scores distribution
      dataArray = [2, 5, 13, 20, 25, 18, 10, 5, 2];
      labels = [
        "0-10",
        "11-20",
        "21-30",
        "31-40",
        "41-50",
        "51-60",
        "61-70",
        "71-80",
        "81-90",
        "91-100",
      ];
      backgroundColor = Array(10).fill("rgba(65, 105, 225, 0.7)");
      setDistribution({
        mean: "50.2",
        median: "48.5",
        stdDev: "15.7",
      });
    } else if (dataSet === "Height Distribution") {
      // Simulating height distribution (in cm)
      dataArray = [3, 8, 15, 25, 32, 24, 14, 7, 2];
      labels = [
        "150-155",
        "156-160",
        "161-165",
        "166-170",
        "171-175",
        "176-180",
        "181-185",
        "186-190",
        "191-195",
      ];
      backgroundColor = Array(9).fill("rgba(46, 139, 87, 0.7)");
      setDistribution({
        mean: "173.5",
        median: "174.2",
        stdDev: "8.3",
      });
    } else if (dataSet === "Response Time") {
      // Simulating response time distribution (in ms)
      dataArray = [5, 12, 23, 35, 25, 15, 8, 4, 2, 1];
      labels = [
        "0-50",
        "51-100",
        "101-150",
        "151-200",
        "201-250",
        "251-300",
        "301-350",
        "351-400",
        "401-450",
        "451-500",
      ];
      backgroundColor = Array(10).fill("rgba(220, 20, 60, 0.7)");
      setDistribution({
        mean: "192.3",
        median: "178.5",
        stdDev: "87.4",
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
          borderColor: "rgba(255, 255, 255, 0.8)",
          borderWidth: 1,
          barPercentage: 1.0,
          categoryPercentage: 0.95,
          hoverBackgroundColor: backgroundColor.map((color) =>
            color.replace("0.7", "0.9")
          ),
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 2,
        },
      ],
    };

    setChartData(newChartData);
  }, [dataSet, binSize]);

  // Create and update chart when chartData changes
  useEffect(() => {
    if (!chartData) return;

    // Chart configuration
    const config = {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
        scales: {
          x: {
            title: {
              display: true,
              text: getXAxisLabel(),
              font: {
                size: 14,
                weight: "bold",
              },
              padding: {
                top: 10,
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Frequency",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              font: {
                family: "Roboto",
                size: 12,
                weight: "600",
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
            usePointStyle: true,
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function (context) {
                return `Frequency: ${context.raw}`;
              },
              afterLabel: function (context) {
                const percentage = (
                  (context.raw /
                    context.dataset.data.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(1);
                return `Percentage: ${percentage}%`;
              },
            },
          },
        },
        onClick: () => {
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

  // Helper function to get x-axis label based on dataset
  const getXAxisLabel = () => {
    if (dataSet === "Test Scores") return "Score Range";
    if (dataSet === "Height Distribution") return "Height Range (cm)";
    if (dataSet === "Response Time") return "Response Time (ms)";
    return "Value Range";
  };

  // Handle dataset change
  const handleDataSetChange = (set) => {
    setIsLoaded(false);
    setDataSet(set);
    setIsDropdownOpen(false);
  };

  // Handle bin size change
  const handleBinSizeChange = (size) => {
    setIsLoaded(false);
    setBinSize(size);
    setIsDropdownOpen(false);
  };

  return (
    <div className="main-container w-[90%] sm:w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-8 lg:px-8">
      <span className="block font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-8 sm:leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-4 sm:mt-6 ml-3 sm:ml-4 before:content-[''] before:absolute before:w-2 before:h-6 sm:before:h-8 before:bg-[#3C55A5] before:left-[-12px] sm:before:left-[-16px] before:top-1 before:rounded-sm">
        Histogram
      </span>
      <div className="flex w-full max-w-screen-xl h-[490px] sm:h-[550px] pt-4 sm:pt-6 pr-4 sm:pr-8 pb-4 sm:pb-8 pl-4 sm:pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative mt-4 sm:mt-6 mx-auto transition-all duration-500 border border-[#3C55A5]">
        <div className="flex flex-col sm:flex-row gap-2 items-center self-stretch shrink-0 flex-nowrap relative mt-0 sm:mt-0">
          <span className="h-[20px] sm:h-[25px] grow shrink-0 basis-auto font-['Roboto'] text-md sm:text-lg md:text-xl leading-6 text-[#343a40] relative text-left whitespace-nowrap">
            {dataSet} Distribution
          </span>
          <div className="relative ">
            <div
              className="flex py-2 gap-1 items-center shrink-0 flex-nowrap rounded-lg relative hover:shadow-sm transition-all duration-300 cursor-pointer bg-gray-100"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-32 h-[18px] justify-center items-start shrink-0 font-['Roboto'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
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
              <div className="absolute right-0 mt-1 text-center bg-white rounded-lg shadow-sm z-10 overflow-hidden transition-all duration-300 animate-fadeIn w-48">
                <ul className="py-1">
                  {["Test Scores", "Height Distribution", "Response Time"].map(
                    (set) => (
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
                    )
                  )}
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
              <span className="font-['Roboto'] text-sm text-[#6c757d]">
                Mean
              </span>
              <span className="font-['Roboto'] text-md sm:text-lg font-bold text-[#343a40]">
                {distribution.mean}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Roboto'] text-sm  text-[#6c757d]">
                Median
              </span>
              <span className="font-['Roboto'] text-md sm:text-lg font-bold text-[#343a40]">
                {distribution.median}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Roboto'] text-sm  text-[#6c757d]">
                Std. Deviation
              </span>
              <span className="font-['Roboto'] text-md sm:text-lg font-bold text-[#343a40]">
                {distribution.stdDev}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* information section */}
      <div className="w-full max-w-screen-xl font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-normal leading-6 sm:leading-8 relative text-left mt-4 sm:mt-6 mx-auto p-1 transition-all duration-500">
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is histogram charts?
        </span>
        <span className="font-['Roboto'] text-[16px] sm:text-[18px] md:text-[20px] leading-6 sm:leading-8 text-[#334155] relative text-left block mt-3 sm:mt-4 mb-4 sm:mb-6">
          A histogram shows the distribution of continuous numerical data by
          dividing it into bins or Robotovals, making it useful for visualizing
          frequency distributions.
        </span>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What kind of data that perfect for histogram chart ?
        </span>
        <ul className="mt-3 sm:mt-4 space-y-2 mb-4 sm:mb-6">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Exam Scores Distribution (e.g., how many students scored between
              60-70, 70-80, etc.)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Income Levels (e.g., number of people earning $1,000-$2,000,
              $2,000-$3,000, etc.)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Website Visit Durations (e.g., users spending 0-5 min, 5-10 min,
              etc.)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Product Defect Counts (e.g., how many products have 0-2, 3-5, 6-8
              defects, etc.)
            </span>
          </li>
        </ul>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using Histogram chart ?
        </span>
        <ul className="mt-6 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Understanding Data Distribution – Histograms show how data is
              spread out (e.g., normal, skewed, uniform).
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Identifying Patterns – They help detect trends, such as whether
              most values cluster around a certain range.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Finding Outliers – Histograms highlight unusual data points that
              fall outside normal ranges.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
