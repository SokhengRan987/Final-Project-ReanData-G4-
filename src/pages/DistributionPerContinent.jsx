import React from "react";
import AirportDistributionChart from "../components/SemiCircleBubbleChartComponent";
import { useGetAirPortDistributionQuery } from "../redux/service/airPortDistributionSlice";

function DistributionPerContinent() {
  const {
    data: airports,
    isError,
    isLoading,
    error,
    refetch,
  } = useGetAirPortDistributionQuery();

  console.log("Fetched airports:", airports);
  console.log("Error (if any):", error);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Error: {error?.message || "An error occurred"}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

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
    <div>
      <h2 className="text-5xl text-center my-8">
        Airport Distribution by Continent
      </h2>
      <AirportDistributionChart data={airportData} />
    </div>
  );
}

export default DistributionPerContinent;
