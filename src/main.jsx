import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import Testing from "./pages/Testing.jsx";
import Rootlayout from "./components/Rootlayout.jsx";
import { store } from "./redux/store.js";
import DistributionPerContinent from "./pages/DistributionPerContinent.jsx";
// import RootLayoutSideBar from "./components/Sidebar.jsx"; // Ensure correct export/import
import AirportStatisticsBarChart from "./components/airdata/boardingPass/AirportStatisticsBarChart.jsx";
import RootLayoutSideBar from "./components/RootLayoutSideBar.jsx";
import BoardingStatistics from "./pages/airdata-visualization/BoardingStatistics.jsx";
import HelpAndSupport from "./pages/HelpAndSupport.jsx";
import AircraftFleetAnalysis from "./pages/airdata-visualization/AircraftFleetAnalysis.jsx";
import AirportDistributionChart from "./components/airdata/airportDistribution/SemiCircleBubbleChartComponent.jsx";
import AirporrtDistributionAnalysis from "./pages/airdata-visualization/AirporrtDistributionAnalysis.jsx";
import RootLayoutSlidBar from "./components/RootLayoutSlidBar.jsx";
import Aircraft from "./pages/airdata/table/Aircraft.jsx";
import Airport from "./pages/airdata/table/Airport.jsx";
import BoardingPass from "./pages/airdata/table/BoardingPass.jsx";
import Booking from "./pages/airdata/table/Booking.jsx";
import Flight from "./pages/airdata/table/Flight.jsx";
import Passenger from "./pages/airdata/table/Passenger.jsx";
import Customer from "./pages/food/table/Customer.jsx";
import Foodandbeverage from "./pages/food/table/fb.jsx";
import RestaurantFactors from "./pages/food/table/RestaurantFactors.jsx";
import TimeBasedFood from "./pages/food/table/TimeBasedFood.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Provider store={store}>
    <BrowserRouter>
        <StrictMode>
          <Routes>
          {/* Main Layout */}
          <Route element={<Rootlayout />}>
              <Route element={<RootLayoutSlidBar />}>
            <Route path="/air-data/aircraft" element={<Aircraft />} />
            <Route path="/air-data/airport" element={<Airport />} />
            <Route path="/air-data/boarding-pass" element={<BoardingPass />} />
            <Route path="/air-data/booking" element={<Booking />} />
            <Route path="/air-data/flight" element={<Flight />} />
            <Route path="/air-data/passenger" element={<Passenger />} />
            <Route path="/food-beverage/customer" element={<Customer />} />
            <Route path="/food-beverage/timeBase" element={<TimeBasedFood />} />
            <Route path="/food-beverage/fb" element={<Foodandbeverage />} />
            <Route
              path="food-beverage/restaurant"
              element={<RestaurantFactors />}
            />
          </Route>
              <Route path="/testing" element={<Testing />} />
            <Route path="/distribution" element={<DistributionPerContinent />} />
            <Route path="/help&support" element={<HelpAndSupport />}/>
          </Route>

          {/* Sidebar Layout */}
          <Route element={<RootLayoutSideBar />}>
            <Route
              path="/boarding-statistics"
              element={<BoardingStatistics />}
            />
            <Route
              path="/aircaft-fleet-analysis"
              element={<AircraftFleetAnalysis />}
            />
            <Route path="/airport-distribution-analysis" element={< AirporrtDistributionAnalysis/>}/>
          </Route>
          </Routes>
        </StrictMode>
      </BrowserRouter>
  </Provider>
  </Provider>
);
