import React, { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

export default function GaugesChart() {
  const chartRefs = useRef([]);
  const chartInstances = useRef([]);
  const [selectedMetric, setSelectedMetric] = useState("Performance");
  
  // Sample data for different metrics
  const metricsData = {
    "Performance": [
      { label: "System Load", value: 75, maxValue: 100, color: "#4bc0c0" },
      { label: "Memory Usage", value: 62, maxValue: 100, color: "#ff6384" },
      { label: "CPU Utilization", value: 88, maxValue: 100, color: "#36a2eb" }
    ],
    "Financial": [
      { label: "Revenue Target", value: 85, maxValue: 100, color: "#4bc0c0" },
      { label: "Profit Margin", value: 71, maxValue: 100, color: "#ff6384" },
      { label: "Cost Reduction", value: 43, maxValue: 100, color: "#36a2eb" },
      { label: "ROI", value: 67, maxValue: 100, color: "#ffcd56" }
    ],
    "Sustainability": [
      { label: "Carbon Footprint", value: 42, maxValue: 100, color: "#4bc0c0", inverse: true },
      { label: "Renewable Energy", value: 63, maxValue: 100, color: "#ff6384" },
      { label: "Waste Reduction", value: 81, maxValue: 100, color: "#36a2eb" }
    ]
  };

  // Create and render gauges when metric changes
  useEffect(() => {
    const data = metricsData[selectedMetric];
    
    // Cleanup previous charts
    if (chartInstances.current.length > 0) {
      chartInstances.current.forEach(chart => {
        if (chart) chart.destroy();
      });
      chartInstances.current = [];
    }
    
    // Create new charts
    data.forEach((item, index) => {
      if (!chartRefs.current[index]) return;
      
      const ctx = chartRefs.current[index].getContext("2d");
      
      // Adjust value for inverse metrics (where lower is better)
      const displayValue = item.inverse ? 100 - item.value : item.value;
      
      // Create gauge chart
      const gaugeChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [displayValue, 100 - displayValue],
              backgroundColor: [
                item.color,
                "#f1f5f9"
              ],
              borderWidth: 0,
              circumference: 180,
              rotation: 270
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            tooltip: {
              enabled: false
            },
            legend: {
              display: false
            }
          },
          animation: {
            duration: 1500,
            easing: "easeOutQuart"
          }
        }
      });
      
      chartInstances.current.push(gaugeChart);
    });
    
    // Cleanup on unmount
    return () => {
      chartInstances.current.forEach(chart => {
        if (chart) chart.destroy();
      });
    };
  }, [selectedMetric]);

  // Dynamic color class based on value
  const getColorClass = (value, inverse = false) => {
    const adjustedValue = inverse ? 100 - value : value;
    
    if (adjustedValue >= 80) return "text-green-600";
    if (adjustedValue >= 60) return "text-blue-600";
    if (adjustedValue >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="main-container w-full max-w-screen-xl h-auto bg-gradient-to-br relative mx-auto my-8 p-6 rounded-xl">
      <span className="block font-['Inter'] text-2xl font-bold leading-10 text-[#0f172a] relative text-left whitespace-nowrap mt-6 ml-8 before:content-[''] before:absolute before:w-2 before:h-8 before:bg-[#3C55A5] before:left-[-16px] before:top-1 before:rounded-sm">
        Gauges Chart
      </span>
      
      <div className="flex w-full max-w-4xl pt-6 pr-8 pb-8 pl-8 flex-col gap-4 justify-center items-center flex-nowrap rounded-lg relative shadow-lg z-[1] mt-9 mx-auto transition-all duration-500 hover:shadow-xl border border-[#3C55A5]">
        {/* Metrics selector tabs */}
        <div className="flex gap-2 items-center self-stretch shrink-0 flex-nowrap mb-4">
          <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            {Object.keys(metricsData).map((metric) => (
              <button
                key={metric}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  selectedMetric === metric
                    ? "bg-[#3C55A5] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedMetric(metric)}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
        
        {/* Gauges grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {metricsData[selectedMetric].map((item, index) => (
            <div key={index} className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-800 mb-2">{item.label}</h3>
              
              {/* Gauge canvas */}
              <div className="relative w-32 h-16">
                <canvas
                  ref={el => chartRefs.current[index] = el}
                  className="w-full h-full"
                ></canvas>
                <div className="absolute top-12 left-0 right-0 flex justify-center">
                  <span className={`text-lg font-bold ${getColorClass(item.value, item.inverse)}`}>
                    {item.value}%
                  </span>
                </div>
              </div>
              
              {/* Level indicator */}
              <div className="mt-4 w-full">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${item.value}%`, 
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
                <div className="text-center mt-2">
                  <span className={`text-sm font-medium ${getColorClass(item.value, item.inverse)}`}>
                    {item.inverse ? 
                      (item.value < 30 ? "Excellent" : 
                       item.value < 60 ? "Good" : 
                       item.value < 80 ? "Fair" : "Poor") : 
                      (item.value >= 80 ? "Excellent" : 
                       item.value >= 60 ? "Good" : 
                       item.value >= 40 ? "Fair" : "Poor")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary statistics */}
        <div className="mt-6 w-full p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Metrics</span>
              <span className="text-lg font-bold">{metricsData[selectedMetric].length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Average</span>
              <span className="text-lg font-bold">
                {Math.round(metricsData[selectedMetric].reduce((acc, curr) => acc + curr.value, 0) / metricsData[selectedMetric].length)}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Highest</span>
              <span className="text-lg font-bold">
                {Math.max(...metricsData[selectedMetric].map(item => item.value))}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Lowest</span>
              <span className="text-lg font-bold">
                {Math.min(...metricsData[selectedMetric].map(item => item.value))}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Information section */}
      <div className="w-full max-w-4xl font-['Inter'] text-xl relative text-left z-[59] mt-6 mx-auto p-1">
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full">
       1. What is Gauges Charts? 
        </span>
        <p className="mt-4 text-[#334155]">
        Gauges Charts (also known as Gauge or Speedometer Charts) are a type of data visualization used to represent a single data value in a radial format, typically resembling a speedometer or meter.
        </p>
        
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
       2. What kind of data that perfect for  Gauges Charts ? 
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[#334155]">
              KPI Visualization - Ideal for displaying key performance indicators against targets.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[#334155]">
              Goal Progress - Showing progress toward defined goals or quotas.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[#334155]">
              Resource Utilization - Perfect for displaying CPU, memory, disk usage, or any resource capacity metric.
            </span>
          </li>
        </ul>
        
        <span className="font-['Inter'] text-2xl leading-10 text-[#1e293b] relative text-left block before:content-[''] before:absolute before:w-10 before:h-1 before:bg-[#3C55A5] before:bottom-[-4px] before:left-0 before:rounded-full mt-6">
       3. The importance of using Gauges Charts  ?
        </span>
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[#334155]">
              Keep it Simple - Display a single value per gauge for clarity.
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[#334155]">
              Use Color Effectively - Apply color coding to indicate performance levels (red for poor, yellow for fair, green for good).
            </span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[rgba(75,192,192,0.15)] flex items-center justify-center mt-1">
              <div className="h-2 w-2 rounded-full bg-[#3C55A5]"></div>
            </div>
            <span className="ml-3 text-[#334155]">
              Include Context - Show target values or thresholds to provide meaning to the gauge reading.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}