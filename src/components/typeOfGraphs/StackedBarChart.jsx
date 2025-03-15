import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StackedBarChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataSet, setDataSet] = useState("Revenue Breakdown");
  const [chartData, setChartData] = useState(null);

  // Generate different datasets for demonstration
  useEffect(() => {
    let labels = [];
    let datasets = [];
    let title = "";

    if (dataSet === "Revenue Breakdown") {
      labels = ["Q1", "Q2", "Q3", "Q4"];
      datasets = [
        {
          label: "Product Sales",
          data: [250, 320, 280, 390],
          backgroundColor: "rgba(75, 192, 192, 0.8)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Services",
          data: [180, 190, 220, 240],
          backgroundColor: "rgba(54, 162, 235, 0.8)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Subscription",
          data: [120, 150, 170, 190],
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ];
      title = "Revenue Breakdown";
    } else if (dataSet === "Marketing Budget") {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      datasets = [
        {
          label: "Digital Ads",
          data: [40, 45, 55, 40, 65, 70],
          backgroundColor: "rgba(46, 139, 87, 0.8)",
          borderColor: "rgba(46, 139, 87, 1)",
          borderWidth: 1,
        },
        {
          label: "Events",
          data: [20, 15, 30, 25, 40, 35],
          backgroundColor: "rgba(255, 159, 64, 0.8)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Content Marketing",
          data: [30, 35, 25, 40, 25, 30],
          backgroundColor: "rgba(153, 102, 255, 0.8)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Social Media",
          data: [25, 30, 20, 35, 30, 25],
          backgroundColor: "rgba(255, 206, 86, 0.8)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ];
      title = "Marketing Budget";
    } else if (dataSet === "Energy Consumption") {
      labels = ["2019", "2020", "2021", "2022", "2023"];
      datasets = [
        {
          label: "Fossil Fuels",
          data: [450, 420, 400, 380, 350],
          backgroundColor: "rgba(169, 169, 169, 0.8)",
          borderColor: "rgba(169, 169, 169, 1)",
          borderWidth: 1,
        },
        {
          label: "Nuclear",
          data: [180, 185, 180, 175, 170],
          backgroundColor: "rgba(106, 90, 205, 0.8)",
          borderColor: "rgba(106, 90, 205, 1)",
          borderWidth: 1,
        },
        {
          label: "Hydroelectric",
          data: [120, 125, 135, 140, 145],
          backgroundColor: "rgba(30, 144, 255, 0.8)",
          borderColor: "rgba(30, 144, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Solar",
          data: [50, 70, 90, 110, 140],
          backgroundColor: "rgba(255, 215, 0, 0.8)",
          borderColor: "rgba(255, 215, 0, 1)",
          borderWidth: 1,
        },
        {
          label: "Wind",
          data: [40, 60, 80, 100, 130],
          backgroundColor: "rgba(60, 179, 113, 0.8)",
          borderColor: "rgba(60, 179, 113, 1)",
          borderWidth: 1,
        },
      ];
      title = "Energy Consumption";
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
      type: "bar",
      data: chartData.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: "easeOutQuart",
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "Inter, sans-serif",
                size: 12,
              },
              color: "#333",
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              font: {
                family: "Inter, sans-serif",
                size: 12,
              },
              color: "#333",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            align: "start",
            labels: {
              boxWidth: 15,
              padding: 15,
              font: {
                family: "Inter, sans-serif",
                size: 12,
              },
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
                return `${context.dataset.label}: ${context.parsed.y}`;
              },
              // Add total to tooltip
              afterBody: function (tooltipItems) {
                let sum = 0;
                tooltipItems.forEach(function (tooltipItem) {
                  sum += tooltipItem.parsed.y;
                });
                return `Total: ${sum}`;
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

  // Get categories count (number of x-axis labels)
  const getCategoriesCount = () => {
    if (!chartData || !chartData.data || !chartData.data.labels) return 0;
    return chartData.data.labels.length;
  };

  // Get components count (number of stacked segments)
  const getComponentsCount = () => {
    if (!chartData || !chartData.data || !chartData.data.datasets) return 0;
    return chartData.data.datasets.length;
  };

  // Calculate total value
  const getTotalValue = () => {
    if (!chartData || !chartData.data || !chartData.data.datasets) return 0;

    let total = 0;
    chartData.data.datasets.forEach((dataset) => {
      dataset.data.forEach((value) => {
        total += value;
      });
    });

    return total;
  };

  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br  relative mx-auto my-0 p-6 rounded-xl">
      <span className="block font-['Inter'] text-2xl font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8 before:bg-[#3C55A5] before:left-[-16px] before:top-1 before:rounded-sm">
        Stacked Bar Chart
      </span>
      <div className="flex w-full max-w-4xl h-[550px] pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap bg-white rounded-lg relative shadow-lg z-[1] mt-9 mx-auto transition-all duration-500 hover:shadow-xl border border-[#3C55A5]">
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap relative z-[2]">
          <span className="h-[25px] grow shrink-0 basis-auto font-['Inter'] text-2xl leading-6 text-[#343a40] relative text-left whitespace-nowrap z-[3]">
            {dataSet}
          </span>
          <div className="relative">
            <div
              className="flex opacity-0 px-4 py-2 gap-1 items-center shrink-0 flex-nowrap bg-white rounded-lg relative z-[4] hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#e9ecef]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex w-48 h-[18px] justify-end items-start shrink-0 font-['Inter'] text-sm font-medium leading-[17.5px] text-[#343a40] relative text-right whitespace-nowrap z-[5]">
                {dataSet}
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
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 w-48">
                <ul className="py-1">
                  {[
                    "Revenue Breakdown",
                    "Marketing Budget",
                    "Energy Consumption",
                  ].map((set) => (
                    <li
                      key={set}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150 ${
                        set === dataSet
                          ? "bg-[#f0fffd] text-[#4bc0c0]"
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
        <div className="flex flex-col gap-6 items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[8]">
          <div className="self-stretch grow shrink-0 basis-0 rounded-lg relative z-[9] border shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md p-4">
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
                Categories
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                {getCategoriesCount()}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Inter'] text-xs text-[#6c757d]">
                Components
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                {getComponentsCount()}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start shrink-0 flex-nowrap relative">
              <span className="font-['Inter'] text-xs text-[#6c757d]">
                Total Value
              </span>
              <span className="font-['Inter'] text-lg font-bold text-[#343a40]">
                {getTotalValue()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl font-['Roboto'] text-2xl font-normal leading-8 relative text-left z-[59] mt-2 mx-auto p-1 transition-all duration-500">
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
          1. What is stacked Charts?
        </span>
        <span className="font-['Inter'] text-xl leading-8 text-[#334155] relative text-left block mt-3">
          Stacked Charts are a type of data visualization used to represent the
          composition of a whole over time or categories. These charts are a
          variation of bar charts (or area charts) where each segment of the bar
          (or area) is stacked on top of the previous one.
        </span>
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
          2. What kind of data that perfect for stacked Charts ?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Part-to-Whole Relationships - Data that shows how individual parts
              contribute to a total. For example, sales data broken down by
              region.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Time Series Data - Data over time that shows how each category’s
              contribution changes. For instance, monthly sales of different
              products .
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Comparative Data - Data where you're comparing multiple categories
              within a single time period or across time periods. 
            </span>
          </li>
        </ul>
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
          3. Stacked Bar Chart Best Practices:
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Clear Representation of Composition - They help in visualizing how
              a whole is composed of different parts, making it easier to
              understand the distribution of categories within the total.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Trend Visualization - Stacked charts, especially stacked bar or
              area charts, help identify trends and patterns in data .
            
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Identifying Dominant Categories - By looking at the stacked
              sections.
           
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-xl text-[#334155]">
              Space-Efficient - When you have multiple categories or time
              periods.
            
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}