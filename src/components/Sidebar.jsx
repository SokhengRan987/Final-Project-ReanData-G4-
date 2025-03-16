import logo from "../img/reandata.png";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
} from "lucide-react";

const useSidebarState = () => {
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

      if (["airData", "foodBeverage", "chart", "settings"].includes(section)) {
        newState.airData = false;
        newState.foodBeverage = false;
        newState.chart = false;
        newState.settings = false;
        newState[section] = !prev[section];
      }
      else if (section === "airDataTable") {
        newState.airDataAnalyze = false;
        newState.airDataTable = !prev.airDataTable;
      } else if (section === "airDataAnalyze") {
        newState.airDataTable = false;
        newState.airDataAnalyze = !prev.airDataAnalyze;
      }
      else if (section === "foodBeverageTable") {
        newState.foodBeverageAnalyze = false;
        newState.foodBeverageTable = !prev.foodBeverageTable;
      } else if (section === "foodBeverageAnalyze") {
        newState.foodBeverageTable = false;
        newState.foodBeverageAnalyze = !prev.foodBeverageAnalyze;
      }
      else {
        newState[section] = !prev[section];
      }

      return newState;
    });
  };

  return { expanded, toggleExpand };
};

export default function Sidebar() {
  const { expanded, toggleExpand } = useSidebarState();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
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
            {label: "Aircraft Utilization", path: "/aircraft-utilization"},
            {label: "Airport Traffic", path: "/airport-traffic"},
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
            { label: "View", path: "/food-beverage/view" },
            { label: "Edit", path: "/food-beverage/edit" },
            { label: "Export", path: "/food-beverage/export" },
            { label: "Roth", path: "/food-beverage/export" },
            { label: "Polin", path: "/food-beverage/export" },
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

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="sr-only">Toggle Menu</span>
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-1 bg-gray-600 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-1 bg-gray-600 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-1 bg-gray-600 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      <div className={`
        fixed top-0 left-0 h-screen bg-white shadow-lg border-r border-gray-200 flex flex-col
        transition-all duration-300 z-40
        ${isMobileMenuOpen ? 'w-64' : 'w-0 md:w-64'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-hidden md:overflow-visible
      `}>
        <div className="p-4 border-b border-gray-200 flex justify-center items-center">
          <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center">
            <img src={logo} alt="ReAnData Logo" className="h-10 object-contain" />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2">
            <Link
              to="/"
              onClick={() => handleNavClick('/')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors
                ${pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
            >
              <Home className="w-5 h-5 mr-3" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>

          {menuItems.map((section) => (
            <div key={section.key} className="mb-2">
              <button
                onClick={() => toggleExpand(section.key)}
                className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 
                  hover:bg-blue-50 hover:text-blue-600 transition-colors
                  ${expanded[section.key] ? "bg-blue-50 text-blue-600" : ""}`}
              >
                <div className="flex items-center">
                  <section.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{section.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expanded[section.key] ? "transform rotate-180" : ""}`}
                />
              </button>

              {expanded[section.key] && (
                <div className="pl-8 mt-2 space-y-1 relative max-h-[300px] overflow-y-auto custom-scrollbar">
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
                            className={`w-4 h-4 transition-transform ${expanded[subItem.key] ? "transform rotate-90" : ""}`}
                          />
                        </button>
                        {expanded[subItem.key] && (
                          <div className="pl-6 mt-1 space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
                            {subItem.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => handleNavClick(item.path)}
                                className={`block px-4 py-2 text-sm rounded-lg transition-colors
                                  ${pathname === item.path ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}`}
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
                        onClick={() => handleNavClick(subItem.path)}
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors
                          ${pathname === subItem.path ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}`}
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

        <div className="mt-auto border-t border-gray-200 p-4">
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
                className={`w-4 h-4 transition-transform ${expanded.settings ? "transform rotate-180" : ""}`}
              />
            </button>

            {expanded.settings && (
              <div className="pl-8 mt-2 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => handleNavClick('/profile')}
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors
                    ${pathname === "/profile" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}`}
                >
                  <FileText className="w-4 h-4 mr-2 inline" />
                  Profile Settings
                </Link>
                <Link
                  to="/password"
                  onClick={() => handleNavClick('/password')}
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors
                    ${pathname === "/password" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}`}
                >
                  <BarChart2 className="w-4 h-4 mr-2 inline" />
                  Password
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/logout"
            onClick={() => handleNavClick('/logout')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors
              ${pathname === "/logout" ? "bg-red-100 text-red-700" : "text-red-600 hover:bg-red-50"}`}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export function RootLayoutSideBar() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="flex-1 p-4 md:ml-64">
        {/* Outlet will be rendered here */}
      </section>
    </main>
  );
}