import { useState } from "react";
import DoughnutChart from "../components/foodAndBeverages/genderDistribution/DoughnutChart";
import BarChart from "../components/foodAndBeverages/ageRangeDistribution/BarChart";
import TimeBasedFood from "../pages/food/table/TimeBasedFood";
import AircraftRangeVelocityChart from "../components/airdata/aircraftFleetAnalysis/AircraftRangeVelocityChart";
import BeveragesBarChart from "../components/foodAndBeverages/preferenceBeverages/BarChart";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen w-full max-w-screen-xl mx-auto my-6 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
        <h3 className="dashboard-title text-xl sm:text-2xl md:text-3xl font-medium flex-1">
          Dashboard
        </h3>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-lg shadow mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row flex-wrap">
          {["Overview", "Food & Beverages", "Airdata"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 sm:flex-none px-4 py-2 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium text-center ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Charts */}
      {activeTab === "Overview" && (
        <div className="bg-white border-2 border-gray-100 rounded-[20px] p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Airport Statistics
            </h3>
            <div className="space-y-6 sm:space-y-0">
              <AircraftRangeVelocityChart />
              <BeveragesBarChart />
            </div>
          </div>
        </div>
      )}

      {activeTab === "Food & Beverages" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-2 border-gray-100 rounded-[20px] p-4 sm:p-6 bg-white shadow-sm">
            <DoughnutChart />
            <BarChart />
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <TimeBasedFood />
          </div>
        </div>
      )}

      {activeTab === "Airdata" && (
        <div className="bg-white border-2 border-gray-100 rounded-[20px] p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Will add charts and table component */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;