// src/pages/About.jsx
import React from "react";
import { useGetAirPortDistributionQuery } from "../redux/service/airPortDistributionSlice";
import Chart from "../components/Chart";
import { useResizeDetector } from "react-resize-detector";
// import SemiCircleBubbleChart from "../components/SemiCircleBubbleChart";
import SemiCircleBubbleChartComponent from "../components/SemiCircleBubbleChartComponent";
import HorizontalBarChartComponent from "../components/HorizontalBarChartComponent";
import AircraftRangeVelocityChart from "../components/AircraftRangeVelocityChart";
import AirportStatisticsBarChart from "../components/AirportStatisticsBarChart";
import PreCheckUsagePieChart from "../components/PreCheckUsagePieChart";
import TimeBasedBoardingAnalysis from "../components/TimeBasedBoardingAnalysis";
import CohortAnalysis from "../components/CohortAnalysis";
import CohortAnalysisLineChart from "../components/CohortAnalysisLineChart";
import BubbleChart from "../components/routePopularity/BubbleChart";
import BarChartPopularity from "../components/routePopularity/BarChartPopularity";

export default function Testing() {
  const {
    data: airports,
    isError,
    isLoading,
    error,
    refetch,
  } = useGetAirPortDistributionQuery();
  const { width, height, ref } = useResizeDetector({
    handleHeight: false,
  });
  console.log("Fetched airports:", airports);
  console.log("Error (if any):", error);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error?.message || "An error occurred"}
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  const countriesData =
    airports?.map((airport) => airport.countries_served) || [];
  const citiesData = airports?.map((airport) => airport.cities_served) || [];
  const continents = airports?.map((airport) => airport.continent_req) || [];

  const seriesData = [
    { data: countriesData, label: "Countries Served" },
    { data: citiesData, label: "Cities Served" },
  ];

  if (
    continents.length === 0 ||
    countriesData.length === 0 ||
    citiesData.length === 0
  ) {
    return <div>No data to display</div>;
  }

  const chartWidth = width * 1280;
  const charHeight = height * 0.3125;

  // Ensure airports data is available before mapping
  const airportData =
    airports?.map((airport) => ({
      continent: airport.continent_req,
      airports: airport.airport_count,
      countries: airport.countries_served,
      cities: airport.cities_served,
    })) || [];
  console.log(airportData);

  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8" ref={ref}>
        <h2 className="text-5xl text-center">Countries and Cities Served</h2>
          <Chart
            xAxisData={continents}
            seriesData={seriesData}
            height={400}
            width={1280}
          />
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <h2 className="text-5xl text-center my-8 p-4">
          Airport Distribution by Continent
        </h2>
        <SemiCircleBubbleChartComponent data={airportData} />
      </section>

      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <HorizontalBarChartComponent/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <AircraftRangeVelocityChart/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <AirportStatisticsBarChart/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <PreCheckUsagePieChart/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <TimeBasedBoardingAnalysis/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <CohortAnalysis/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <CohortAnalysisLineChart/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <BubbleChart/>
      </section>
      <section className="max-w-screen-xl mx-auto p-4 overflow-x-auto my-8">
        <BarChartPopularity/>
      </section>
    </>
  );
}
