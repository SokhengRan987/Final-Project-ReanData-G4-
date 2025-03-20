import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoReandata from "../img/reandata.png";
import {
  ChevronDown,
  ChevronRight,
  Home,
  BarChart2,
  LogOut,
  Settings,
  FileText,
  Plane,
  Coffee,
  LineChartIcon as ChartLine,
  Database,
  X
} from "lucide-react";

const MobileSlidComponent = ({ isOpen, onClose }) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const [expanded, setExpanded] = useState({
    airData: false,
    airDataTable: false,
    airDataAnalyze: false,
    foodBeverage: false,
    foodBeverageTable: false,
    foodBeverageAnalyze: false,
    chart: false,
    settings: false,
  });

  const toggleExpand = (section) => {
    setExpanded((prev) => {
      const newState = { ...prev };
      
      // If it's a main section, close all other main sections
      if (["airData", "foodBeverage", "chart", "settings"].includes(section)) {
        // Reset all main sections
        newState.airData = false;
        newState.foodBeverage = false;
        newState.chart = false;
        newState.settings = false;

        // Toggle the clicked section
        newState[section] = !prev[section];
      }
      // Handle Air Data subsections
      else if (section === "airDataTable") {
        // Close the analyze section when table is clicked
        newState.airDataAnalyze = false;
        newState.airDataTable = !prev.airDataTable;
      } else if (section === "airDataAnalyze") {
        // Close the table section when analyze is clicked
        newState.airDataTable = false;
        newState.airDataAnalyze = !prev.airDataAnalyze;
      }
      // Handle Food & Beverage subsections
      else if (section === "foodBeverageTable") {
        // Close the analyze section when table is clicked
        newState.foodBeverageAnalyze = false;
        newState.foodBeverageTable = !prev.foodBeverageTable;
      } else if (section === "foodBeverageAnalyze") {
        // Close the table section when analyze is clicked
        newState.foodBeverageTable = false;
        newState.foodBeverageAnalyze = !prev.foodBeverageAnalyze;
      }
      // For other sections, just toggle them
      else {
        newState[section] = !prev[section];
      }

      return newState;
    });
  };

  const menuItems = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: Home,
      path: "/dashboard"
    },
    {
      label: "Air Data",
      key: "airData",
      icon: Plane,
      subItems: [
        {
          label: "Table",
          key: "airDataTable",
          icon: Database,
          items: [
            { label: "Aircraft", path: "air-data/aircraft" },
            { label: "Airport", path: "/air-data/airport" },
            { label: "Boarding Pass", path: "/air-data/boarding-pass" },
            { label: "Booking", path: "/air-data/booking" },
            { label: "Flight", path: "/air-data/flight" },
            { label: "Passenger", path: "/air-data/passenger" },
          ],
        },
        {
          label: "Analyze",
          key: "airDataAnalyze",
          icon: BarChart2,
          items: [
            {label: "Boarding Passes", path: "/boarding-statistics" },
            {label: "Aircraft Fleet Analysis", path: "/aircaft-fleet-analysis"},
            {label: "Airport Distribution Analysis", path: "/airport-distribution-analysis"},
            {label: "Time Base Analysis", path: "/time-base-analysis"},
            {label: "Cohort Analysis for Frequent Flyers", path: "/cohort-analysis"},
            {label: "Route Popularity", path: "/route-popularity"},
            {label: "Peak Travel Time", path: "/peak-travel-time"},
            {label: "Connection Analysis", path: "/connection-analysis"},
          ],
        },
      ],
    },
    {
      label: "Food & Beverage",
      key: "foodBeverage",
      icon: Coffee,
      subItems: [
        {
          label: "Table",
          key: "foodBeverageTable",
          icon: Database,
          items: [
            { label: "Customer", path: "/food-beverage/customer" },
            { label: "Foods", path: "/food-beverage/fb" },
            { label: "Restaurant", path: "/food-beverage/restaurant" },
            { label: "TimeBase", path: "/food-beverage/timeBase" },
          ],
        },
        {
          label: "Analyze",
          key: "foodBeverageAnalyze",
          icon: BarChart2,
          items: [
            {label: "Age Range Distribution", path: "/age-range-distribution"},
            {label: "Gender Distribution", path: "/gender-distribution"},
            {label: "Preferred Cuisine Frequency", path: "/preferred-cuisine-frequency"},
            {label: "Eating Out Frequency", path: "/eating-out-frequency"},
            {label: "Average Spending by Value Priorities", path: "/average-spending-by-value-priorities"},
            {label: "Preferred Dining Location", path: "/preferred-dining-location"},
            {label: "Preferred Promotion", path: "/preferred-promotion"},
            {label: "International Food Preference", path: "/international-food-preference"},
            {label: "Preferred Beverages by Occupation", path: "/preferred-beverages-by-occupation"},
          ]
        },
      ],
    },
    {
      label: "Chart",
      key: "chart",
      icon: ChartLine,
      subItems: [
        {label: "Area Chart", path: "/chart-AreaChart"},
        {label: "Bar Chart", path: "/chart-BarChart"},
        {label: "Bubble Chart", path: "/chart-BubbleChart"},
        {label: "Column Chart", path: "/chart-ColumnChart"},
        {label: "Doughnut Chart", path: "/chart-DoughnutChart"},
        {label: "Gauges Chart", path: "/chart-GaugesChart"},
        {label: "Histogram Chart", path: "/chart-HistogramChart"},
        {label: "Line Chart", path: "/chart-LineChart"},
        {label: "Pie Chart", path: "/chart-PieChart"},
        {label: "Radar Chart", path: "/chart-RadarChart"},
        {label: "ScatterPlot", path: "/chart-ScatterPlot"},
        {label: "StackedBar Chart", path: "/chart-StackedBarChart"}
      ]
    },
  ];

  // If sidebar is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Sidebar panel */}
      <div className="relative flex flex-col w-[85%] max-w-sm bg-white shadow-xl min-h-screen overflow-hidden">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <img src ={LogoReandata} alt="logo" className="h-10" />
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {/* Scrollable navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {/* Dashboard item */}
          <Link
            to="/"
            className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
              pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
            }`}
            onClick={onClose}
          >
            <Home className="w-5 h-5 mr-3" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          {/* Menu sections */}
          {menuItems.slice(1).map((section) => (
            <div key={section.key} className="mb-1">
              <button
                onClick={() => toggleExpand(section.key)}
                className={`flex items-center justify-between w-full px-4 py-3 mx-2 rounded-lg transition-colors ${
                  expanded[section.key] ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <section.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{section.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expanded[section.key] ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expanded[section.key] && (
                <div className="pl-8 mt-1 space-y-1">
                  {section.subItems.map((subItem) =>
                    typeof subItem === "object" && subItem.key ? (
                      <div key={subItem.key}>
                        <button
                          onClick={() => toggleExpand(subItem.key)}
                          className="flex items-center justify-between w-full px-4 py-2 text-gray-700 
                            hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <subItem.icon className="w-4 h-4 mr-2" />
                            <span>{subItem.label}</span>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              expanded[subItem.key] ? "transform rotate-90" : ""
                            }`}
                          />
                        </button>
                        {expanded[subItem.key] && (
                          <div className="pl-6 mt-1 space-y-1">
                            {subItem.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`block px-4 py-2 text-sm rounded-lg transition-colors
                                  ${
                                    pathname === item.path
                                      ? "bg-blue-100 text-blue-700"
                                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                  }`}
                                onClick={onClose}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors
                          ${
                            pathname === subItem.path
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        onClick={onClose}
                      >
                        {subItem.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
        
        {/* Footer with settings & logout */}
        <div className="border-t border-gray-200 p-4">
          <div className="mb-2">
            <button
              onClick={() => toggleExpand("settings")}
              className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 
                hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors
                ${expanded.settings ? "bg-blue-50 text-blue-600" : ""}`}
            >
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-3" />
                <span className="font-medium">Settings</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expanded.settings ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {expanded.settings && (
              <div className="pl-8 mt-2 space-y-1">
                <Link
                  to="/profile"
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors
                    ${
                      pathname === "/profile"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  onClick={onClose}
                >
                  <FileText className="w-4 h-4 mr-2 inline" />
                  Profile Settings
                </Link>
                <Link
                  to="/password"
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors
                    ${
                      pathname === "/password"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  onClick={onClose}
                >
                  <BarChart2 className="w-4 h-4 mr-2 inline" />
                  Password
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/logout"
            className={`flex items-center px-4 py-2 rounded-lg transition-colors
              ${
                pathname === "/logout"
                  ? "bg-red-100 text-red-700"
                  : "text-red-600 hover:bg-red-50"
              }`}
            onClick={onClose}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSlidComponent;