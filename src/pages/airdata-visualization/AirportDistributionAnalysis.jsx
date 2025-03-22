import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useGetAirPortDistributionQuery } from "../../redux/service/airPortDistributionSlice";
import { useResizeDetector } from "react-resize-detector";
import Loader from "../../components/loading/Loader";
import SemiCircleBubbleChartComponent from "../../components/airdata/airportDistribution/SemiCircleBubbleChartComponent";
import BarChart from "../../components/airdata/airportDistribution/BarChart";

export default function AirportDistributionAnalysis() {
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
    return (
      <div>
        <Loader />
      </div>
    );
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

  return (
    <div className="my-6">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section className="grid grid-rows-1 lg:grid-rows-2 gap-6 border-2 border-gray-100 rounded-[20px] p-6 bg-white shadow-sm">
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Countries and Cities Served
            </h2>
            <BarChart />
          </div>
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Airport Distribution By Continent
            </h2>
            <SemiCircleBubbleChartComponent data={airportData} />
          </div>
        </section>

        {/* Analysis and Storytelling Section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Analysis
            </h3>
            <div className="text-sm leading-6 sm:text-lg sm:leading-8 space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Airports per Continent: </span>
                Helps us understand airport density in different regions.
              </p>
              <p>
                <span className="font-semibold">
                  Countries and Cities Served:{" "}
                </span>
                Indicates the extent of the airport network.
              </p>
            </div>
          </div>

          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-sm leading-6 sm:text-lg sm:leading-8 space-y-3 text-gray-700">
              The airport distribution analysis shows where the network is most
              concentrated and how widespread the services are globally. It
              provides a view of the airport's international reach and helps
              identify regions where further expansion might be beneficial.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
