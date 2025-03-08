import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarChartComponent() {
  const airports = [
    {
      "continent_req": "NA",
      "airport_count": 195,
      "countries_served": 14,
      "cities_served": 145
    },
    {
      "continent_req": "AS",
      "airport_count": 181,
      "countries_served": 35,
      "cities_served": 171
    },
    {
      "continent_req": "EU",
      "airport_count": 153,
      "countries_served": 26,
      "cities_served": 134
    },
    {
      "continent_req": "AF",
      "airport_count": 87,
      "countries_served": 34,
      "cities_served": 79
    },
    {
      "continent_req": "SA",
      "airport_count": 68,
      "countries_served": 10,
      "cities_served": 64
    },
    {
      "continent_req": "OC",
      "airport_count": 10,
      "countries_served": 2,
      "cities_served": 6
    }
  ];

  // Create data for the BarChart based on airports
  const countriesData = airports.map(airport => airport.countries_served);
  const citiesData = airports.map(airport => airport.cities_served);

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: airports.map(airport => airport.continent_req) }]} // Continent names
      series={[
        { data: countriesData, label: 'Countries Served' },
        { data: citiesData, label: 'Cities Served' }
      ]}
      width={1440}
      height={500}
    />
  );
}
