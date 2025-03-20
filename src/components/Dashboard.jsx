import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import ChartToggle from "./ChartToggle";
import MetricsCard from "./MetricsCard";
import GenderChart from "./GenderChart";
import AgeChart from "./AgeChart";
import DataTable from "./DataTable";
import DoughnutChart from "../components/foodAndBeverages/genderDistribution/DoughnutChart";
import BarChart from "../components/foodAndBeverages/ageRangeDistribution/BarChart";
import TimeBasedFood from "../pages/food/table/TimeBasedFood";
import AircraftRangeVelocityChart from "../components/airdata/aircraftFleetAnalysis/AircraftRangeVelocityChart";
import BeveragesBarChart from "../components/foodAndBeverages/preferenceBeverages/BarChart";
const Dashboard = () => {
  const [filters, setFilters] = useState({
    age_range: "gte.18 and lte.24",
    occupation: "",
    eating_out_frequency: "",
    preferred_cuisines: "",
    average_spending_range: "",
  });

  const [ageData] = useState([
    { name: "18-24", value: 20 },
    { name: "25-34", value: 30 },
    { name: "35-44", value: 40 },
    { name: "45-54", value: 50 },
    { name: "55-64", value: 60 },
    { name: "65+", value: 70 },
  ]);
  const genderData = [
    { name: "Male", value: 50, color: "#8884d8" },
    { name: "Female", value: 50, color: "#83d0ff" },
    { name: "Other", value: 0, color: "#ff8370" },
  ];
  const cuisineData = [
    { name: "American", value: 10 },
    { name: "Mexican", value: 20 },
    { name: "Italian", value: 30 },
    { name: "Chinese", value: 40 },
    { name: "Indian", value: 50 },
    { name: "Other", value: 0 },
  ];

  const subOptionDict = {
    Agerange: [
      { name: "18-24", value: "gte.18 and lte.24" },
      { name: "25-34", value: "gte.25 and lte.34" },
      { name: "35-44", value: "gte.35 and lte.44" },
      { name: "45+", value: "gte.45" },
    ],
    maj: [
      { name: "Engineering", value: "Engineering" },
      { name: "Business", value: "Business" },
      { name: "Arts", value: "Arts" },
    ],
    eat: [
      { name: "Daily", value: "daily" },
      { name: "Weekly", value: "weekly" },
      { name: "Monthly", value: "monthly" },
    ],
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [dateRange] = useState("Mar 28, 2022 - Apr 29, 2022");
  const [activeTab, setActiveTab] = useState("Food & Beverages");
  const [selectedFilter, setSelectedFilter] = useState("age");
  const [subFilterOpen, setSubFilterOpen] = useState(false);
  const [selectedSubOption, setSelectedSubOption] = useState("18-24");
  const [genderChartType, setGenderChartType] = useState("pie");
  const [ageChartType, setAgeChartType] = useState("bar");
  const [subOptions, setSubOptions] = useState();

  const filterOptions = {
    age: "age_range",
    maj: "occupation",
    eat: "eating_out_frequency",
    avg: "average_spending_range",
  };

  const handleFilterSelect = (option) => {
    setGenderChartType(option);
  };

  const onFilterOptionChange = (option) => {
    setSelectedFilter(option);
    setFilterOpen(false);
  };

  const onFilterSubOptionChange = (option) => {
    setSelectedSubOption(option);
    const selectedValue = subOptionDict[selectedFilter].find(
      (obj) => obj.name === option
    ).value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterOptions[selectedFilter]]: selectedValue,
    }));
    setSubFilterOpen(false);
    refetch();
  };
  const dataTab = [
    {
      age: "18-24",
      major: "Engineering",
      sales: 100,
      evening: 50,
      foodcountry: "American",
      pice: 10,
    },
    {
      age: "25-34",
      major: "Business",
      sales: 150,
      evening: 70,
      foodcountry: "American",
      pice: 15,
    },
    {
      age: "35-44",
      major: "Arts",
      sales: 200,
      evening: 100,
      foodcountry: "American",
      pice: 20,
    },
    {
      age: "45-55",
      major: "Engineering",
      sales: 250,
      evening: 120,
      foodcountry: "American",
      pice: 25,
    },
    {
      age: "55-68",
      major: "Business",
      sales: 100,
      evening: 50,
      foodcountry: "Mexican",
      pice: 10,
    },
  ];

  return (
    <div className="min-h-screen max-w-screen-xl m-8">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="dashboard-title flex-1 text-3xl">Dashboard</h3>
          <div className="flex flex-wrap gap-3">
            {/* <Dropdown 
              isOpen={filterOpen}
              toggle={() => setFilterOpen(!filterOpen)}
              options={Object.keys(filterOptions)}
              selected={selectedFilter}
              onSelect={onFilterOptionChange}
              buttonText={
                <div className="flex items-center gap-2 px-6 text-blue-600">
                  <Filter size={16} />
                  <span className="font-medium">Filter by: {selectedFilter}</span>
                </div>
              }
            /> */}
          </div>
        </div>

        {/* Metrics Section
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricsCard
            title="Total Sales"
            value="$156"
            change="+0% from previous period"
            textColor="text-blue-600"
          />
          <MetricsCard
            title="Food Sales"
            value="$33"
            change="+0% from previous period"
            textColor="text-blue-600"
          />
          <MetricsCard
            title="Beverage Sales"
            value="$67"
            change="+0% from previous period"
            textColor="text-blue-600"
          />
          <MetricsCard
            title="Average Sale"
            value="$56"
            change="+0% from previous period"
            textColor="text-blue-600"
          />
        </div> */}

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow mb-6 flex overflow-x-auto">
          {["Overview", "Food & Beverages", "Airdata"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Charts */}
        {activeTab === "Overview" && (
          <div>
            <div className="grid grid-cols-1 p-4 gap-6 mb-6 border rounded-[20px]">
              {/* <DoughnutChart />
              <BarChart /> */}
              <h3 className="text-2xl font-medium text-gray-800">
                Airport Statistics
              </h3>
              <AircraftRangeVelocityChart />
              <BeveragesBarChart />
            </div>
          </div>
        )}
        {activeTab === "Food & Beverages" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 border rounded-[20px] gap-6 mb-6">
              <DoughnutChart />
              <BarChart />
            </div>
            <TimeBasedFood />
          </div>
        )}
        {activeTab === "Airdata" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <GenderChart
                data={genderData}
                chartType={genderChartType}
                setChartType={setGenderChartType}
              />
              <AgeChart
                data={ageData}
                chartType={ageChartType}
                setChartType={setAgeChartType}
              />
            </div>
          </div>
        )}
        {/* DataTable */}
        {/* <div>
          <DataTable
            data={dataTab}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
