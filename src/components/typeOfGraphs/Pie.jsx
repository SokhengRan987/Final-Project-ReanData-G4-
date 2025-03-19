import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function PieChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentValue, setCurrentValue] = useState("$0.00");
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [timeRange, setTimeRange] = useState("6 months");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Prepare different datasets for time ranges
  useEffect(() => {
    // Base dataset for 6 months
    const sixMonthsData = {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
        {
          label: "Revenue",
          data: [5000, 15000, 10000, 20000, 15000, 20678.89],
          backgroundColor: [
            "rgba(60, 85, 165, 0.8)",
            "rgba(75, 105, 189, 0.8)",
            "rgba(90, 125, 213, 0.8)",
            "rgba(105, 145, 237, 0.8)",
            "rgba(120, 165, 255, 0.8)",
            "rgba(135, 185, 255, 0.8)",
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
          hoverBorderWidth: 4,
          hoverBorderColor: "#ffffff",
          hoverOffset: 15,
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
          backgroundColor: sixMonthsData.datasets[0].backgroundColor.slice(3),
        },
      ],
    };

    // Dataset for 12 months (extended)
    const twelveMonthsData = {
      labels: [
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      datasets: [
        {
          ...sixMonthsData.datasets[0],
          data: [
            7800, 9200, 12400, 8900, 10500, 13200, 5000, 15000, 10000, 20000,
            15000, 20678.89,
          ],
          backgroundColor: [
            "rgba(60, 85, 165, 0.8)",
            "rgba(65, 90, 170, 0.8)",
            "rgba(70, 95, 175, 0.8)",
            "rgba(75, 100, 180, 0.8)",
            "rgba(80, 105, 185, 0.8)",
            "rgba(85, 110, 190, 0.8)",
            "rgba(90, 115, 195, 0.8)",
            "rgba(95, 120, 200, 0.8)",
            "rgba(100, 125, 205, 0.8)",
            "rgba(105, 130, 210, 0.8)",
            "rgba(110, 135, 215, 0.8)",
            "rgba(115, 140, 220, 0.8)",
          ],
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

    // Calculate total revenue
    const totalValue = chartData.datasets[0].data.reduce(
      (acc, val) => acc + val,
      0
    );
    setTotalRevenue(totalValue);

    // Chart configuration
    const config = {
      type: "pie",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1500,
          easing: "easeOutCubic",
          onComplete: () => {
            setIsLoaded(true);
            // Set the largest segment as selected by default
            const maxIndex = chartData.datasets[0].data.indexOf(
              Math.max(...chartData.datasets[0].data)
            );
            setSelectedSegment(maxIndex);
            setCurrentValue(
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              }).format(chartData.datasets[0].data[maxIndex])
            );
          },
        },
        hover: {
          mode: "nearest",
          Robotosect: true,
          animationDuration: 150,
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
            usePointStyle: true,
            callbacks: {
              title: function (tooltipItems) {
                return tooltipItems[0].label + " 2024";
              },
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed !== null) {
                  label += new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  }).format(context.parsed);
                }

                // Add percentage
                const percentage = (
                  (context.parsed / totalValue) *
                  100
                ).toFixed(1);
                label += ` (${percentage}%)`;

                return label;
              },
            },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            setSelectedSegment(index);
            setCurrentValue(
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              }).format(chartData.datasets[0].data[index])
            );
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

  // Effect to highlight selected segment
  useEffect(() => {
    if (selectedSegment !== null && chartInstance.current && isLoaded) {
      // Create a highlight effect by expanding the selected segment
      const newDataset = { ...chartInstance.current.data.datasets[0] };
      const newHoverOffset = new Array(chartData.labels.length).fill(0);
      newHoverOffset[selectedSegment] = 15;

      chartInstance.current.data.datasets[0].hoverOffset = newHoverOffset;
      chartInstance.current.update();
    }
  }, [selectedSegment, chartData, isLoaded]);

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setIsLoaded(false);
    setTimeRange(range);
    setIsDropdownOpen(false);
  };

  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-8 lg:px-8">
      <span className="block font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-bold leading-8 sm:leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-4 sm:mt-6 ml-3 sm:ml-4 before:content-[''] before:absolute before:w-2 before:h-6 sm:before:h-8 before:bg-[#3C55A5] before:left-[-12px] sm:before:left-[-16px] before:top-1 before:rounded-sm">
        Pie Chart
      </span>
      <div className="flex w-full max-w-screen-xl h-[490px] sm:h-[550px] pt-4 sm:pt-6 pr-4 sm:pr-8 pb-4 sm:pb-8 pl-4 sm:pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative mt-4 sm:mt-6 mx-auto transition-all duration-500 border border-[#3C55A5]">
        <div className="flex flex-col sm:flex-row gap-2 items-center self-stretch shrink-0 flex-nowrap relative mt-0 sm:mt-0">
          <span className="h-[20px] sm:h-[25px] grow shrink-0 basis-auto font-['Roboto'] text-md sm:text-lg md:text-xl leading-6 text-[#343a40] relative text-left whitespace-nowrap">
            Revenue Distribution
          </span>
          <div className="relative">
            <div
              className="flex px-4 py-2 gap-1 items-center shrink-0 flex-nowrap bg-gray-100 rounded-lg relative hover:shadow-sm transition-all duration-300 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-16 h-[18px] justify-end items-start shrink-0 basis-auto font-['Roboto'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
                {timeRange}
              </span>
              <div
                className={`w-4 h-4 shrink-0 relative z-[6] transition-transform duration-300 transform ${
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
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-sm z-10 overflow-hidden transition-all duration-300 animate-fadeIn">
                <ul className="py-1">
                  {["3 months", "6 months", "12 months"].map((range) => (
                    <li
                      key={range}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150 ${
                        range === timeRange
                          ? "bg-[#f0f4ff] text-[#3C55A5]"
                          : "text-[#343a40]"
                      }`}
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
        <div className="grid grid-cols-1 sm:gap-6 items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative">
        <div className="self-stretch h-80 sm:h-96 grow shrink-0 basis-0 rounded-lg relative border p-4 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
        {/* Chart.js Canvas */}
            <canvas ref={chartRef} className="w-full h-full"></canvas>
          </div>
          <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative">
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span
                className={`shrink-0 basis-auto font-['Roboto'] text-lg font-bold leading-5 tracking-[-0.16px] relative text-left whitespace-nowrap z-[52] transition-all duration-1000 ${
                  isLoaded ? "text-[#343a40]" : "text-[#a8a8a8]"
                }`}
              >
                {currentValue}
              </span>
              <div className="flex gap-1 items-end shrink-0 flex-nowrap relative z-[53]">
                <span
                  className={`flex justify-center items-start shrink-0 basis-auto font-['Roboto'] text-xs font-semibold leading-4 relative text-center whitespace-nowrap z-[54] transition-all duration-1000 text-[#343a40]`}
                >
                  {isLoaded && chartData && selectedSegment !== null
                    ? `${(
                        (chartData.datasets[0].data[selectedSegment] /
                          totalRevenue) *
                        100
                      ).toFixed(1)}% of total`
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex gap-1 justify-center items-center shrink-0 flex-nowrap relative hover:cursor-pointer bg-[#f8f9fa] px-3 py-1 rounded-full transition-all duration-300 hover:bg-[#e9ecef] cursor-poRoboto group">
              {/* Legend color indicator with pulse animation */}
              <div className="w-3 h-3 shrink-0 rounded-full bg-[#3C55A5] relative z-[57] group-hover:animate-pulse"></div>
              <span className="shrink-0 basis-auto font-['Roboto'] text-xs font-semibold leading-3 text-[#5f666c] relative text-left whitespace-nowrap z-[58] ml-1">
                Revenue
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-xl font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] font-normal leading-6 sm:leading-8 relative text-left mt-4 sm:mt-6 mx-auto p-1 transition-all duration-500">
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is a Pie Chart?
        </span>
        <span className="font-['Roboto'] text-[16px] sm:text-[18px] md:text-[20px] leading-6 sm:leading-8 text-[#334155] relative text-left block mt-3 sm:mt-4 mb-4 sm:mb-6">
          A pie chart is a circular chart divided into slices, where each slice
          represents a proportion of a whole. The entire chart equals 100%, and
          each slice corresponds to a percentage of the total.
        </span>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          2. What Kind of Data is Perfect for a Pie Chart?
        </span>
        <ul className="mt-3 sm:mt-4 space-y-2 mb-4 sm:mb-6">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Market Share (e.g., percentage of market controlled by different
              companies)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Budget Allocation (e.g., percentage of expenses on rent, food,
              transportation, etc.)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Survey Results (e.g., percentage of people preferring different
              brands)
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Sales Distribution (e.g., sales percentage of different product
              categories)
            </span>
          </li>
        </ul>
        <span className="font-['Roboto'] text-[18px] sm:text-[20px] md:text-[24px] leading-8 sm:leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-8 sm:before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          3. The importance of using pie chart ?
        </span>
        <ul className="mt-6 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Easy to Understand – Pie charts provide a quick visual
              representation of proportions, making it easy to see which
              category is the largest or smallest.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Shows Part-to-Whole Relationships – It highlights how different
              categories contribute to the total.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(60,85,165,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-[#334155] mb-2">
              Effective for Non-Technical Audiences – Since it’s intuitive, even
              non-experts can easily Robotopret the data.
            </span>
          </li>
        </ul>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
