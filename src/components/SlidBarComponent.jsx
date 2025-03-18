
import logo from "../img/reandata.png"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
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
} from "lucide-react"

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
  })

  const toggleExpand = (section) => {
    setExpanded((prev) => {
      // Create a copy of the current state
      const newState = { ...prev }

      // If it's a main section, close all other main sections
      if (["airData", "foodBeverage", "chart", "settings"].includes(section)) {
        // Reset all main sections
        newState.airData = false
        newState.foodBeverage = false
        newState.chart = false
        newState.settings = false

        // Toggle the clicked section
        newState[section] = !prev[section]
      }
      // Handle Air Data subsections
      else if (section === "airDataTable") {
        // Close the analyze section when table is clicked
        newState.airDataAnalyze = false
        newState.airDataTable = !prev.airDataTable
      } else if (section === "airDataAnalyze") {
        // Close the table section when analyze is clicked
        newState.airDataTable = false
        newState.airDataAnalyze = !prev.airDataAnalyze
      }
      // Handle Food & Beverage subsections
      else if (section === "foodBeverageTable") {
        // Close the analyze section when table is clicked
        newState.foodBeverageAnalyze = false
        newState.foodBeverageTable = !prev.foodBeverageTable
      } else if (section === "foodBeverageAnalyze") {
        // Close the table section when analyze is clicked
        newState.foodBeverageTable = false
        newState.foodBeverageAnalyze = !prev.foodBeverageAnalyze
      }
      // For other sections, just toggle them
      else {
        newState[section] = !prev[section]
      }

      return newState
    })
  }

  return { expanded, toggleExpand }
}

export default function SlidBarComponent() {
  const { expanded, toggleExpand } = useSidebarState()
  const location = useLocation()
  const pathname = location.pathname

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
            { label: "Aircraft", path: "/air-data/aircraft" },
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
          items: Array.from({ length: 8 }, (_, i) => ({
            label: `Analyze ${i + 1}`,
            path: `/air-data/analyze-${i + 1}`,
          })),
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
            // { label: "Promotions", path: "/food-beverage/promotions" },
            { label: "Restaurant", path: "/food-beverage/restaurant" },
            { label: "TimeBase", path: "/food-beverage/timeBase" },
          ],
        },
        {
          label: "Analyze",
          key: "foodBeverageAnalyze",
          icon: BarChart2,
          items: Array.from({ length: 8 }, (_, i) => ({
            label: `Analyze ${i + 1}`,
            path: `/food-beverage/analyze-${i + 1}`,
          })),
        },
      ],
    },
    {
      label: "Chart",
      key: "chart",
      icon: ChartLine,
      subItems: Array.from({ length: 8 }, (_, i) => ({
        label: `Chart ${i + 1}`,
        path: `/chart-${i + 1}`,
      })),
    },
  ]

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg border-r border-gray-200 flex flex-col ">
      <div className="p-4 border-b border-gray-200 flex justify-center items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="ReAnData Logo" className="h-10 object-contain" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
          <Link
            to="/"
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
                          className={`w-4 h-4 transition-transform ${
                            expanded[subItem.key] ? "transform rotate-90" : ""
                          }`}
                        />
                      </button>
                      {expanded[subItem.key] && (
                        <div className="pl-6 mt-1 space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
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
                    >
                      {subItem.label}
                    </Link>
                  ),
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
                className={`block px-4 py-2 text-sm rounded-lg transition-colors
                  ${
                    pathname === "/profile"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
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
            ${pathname === "/logout" ? "bg-red-100 text-red-700" : "text-red-600 hover:bg-red-50"}`}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  )
}

export function RootLayoutSlidBar() {
  return (
    <main className="flex min-h-screen">
      <SlidBarComponent />
      <section className="flex-1 p-4 ml-64">{/* Outlet will be rendered here */}</section>
    </main>
  )
}
