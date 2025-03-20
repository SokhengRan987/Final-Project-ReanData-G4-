import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./pages/Profile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Rootlayout from "./components/Rootlayout.jsx";

import RootLayoutSideBar from "./components/RootLayoutSideBar.jsx";
import BoardingStatistics from "./pages/airdata-visualization/BoardingStatistics.jsx";
import HelpAndSupport from "./pages/HelpAndSupport.jsx";
import Documentation from "./pages/Documentation.jsx";
import LandingPage from "./pages/LadingPage.jsx";
import DataSet from "./pages/DataSet.jsx";
import About from "./pages/About.jsx";
import AircraftFleetAnalysis from "./pages/airdata-visualization/AircraftFleetAnalysis.jsx";
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
import AirportDistributionAnalysis from "./pages/airdata-visualization/AirportDistributionAnalysis.jsx";
import TimeBaseAnalysis from "./pages/airdata-visualization/TimeBaseAnalysis.jsx";
import CohortAnalysisPage from "./pages/airdata-visualization/CohortAnalysisPage.jsx";
import RoutePopularity from "./pages/airdata-visualization/RoutePopularity.jsx";
import PeakTravelTime from "./pages/airdata-visualization/PeakTravelTime.jsx";
import ConnectionAnalysis from "./pages/airdata-visualization/ConnectionAnalysis.jsx";
import AgeRangeDistribution from "./pages/food-beverages/AgeRangeDistribution.jsx";
import GenderDistribution from "./pages/food-beverages/GenderDistribution.jsx";
import PreferredCuisineFrequency from "./pages/food-beverages/PreferredCuisineFrequency.jsx";
import EatingOut from "./pages/food-beverages/EatingOut.jsx";
import AverageSpending from "./pages/food-beverages/AverageSpending.jsx";
import PreferredPromotion from "./pages/food-beverages/PreferredPromotion.jsx";
import AreaChart from "./components/typeOfGraphs/AreaChart.jsx";
import Bar from "./components/typeOfGraphs/BarChart2.jsx";
import BubbleChart from "./components/typeOfGraphs/BubbleChart.jsx";
import DoughnutChart from "./components/typeOfGraphs/DoughnutChart.jsx";
import GaugesChart from "./components/typeOfGraphs/GaugesChart.jsx";
import Histogram from "./components/typeOfGraphs/Histogram.jsx";
import Line from "./components/typeOfGraphs/Line.jsx";
import PieChart from "./components/typeOfGraphs/Pie.jsx";
import RadarChart from "./components/typeOfGraphs/RadarChart.jsx";
import ScatterPlot from "./components/typeOfGraphs/ScatterPlot.jsx";
import StackedBarChart from "./components/typeOfGraphs/StackedBarChart.jsx";
import ColumnChart from "./components/typeOfGraphs/ColumnChart.jsx";
import InternationalFoodPreference from "./pages/food-beverages/InternationalFoodPreference.jsx";
import PreferredBeverages from "./pages/food-beverages/PreferredBeverages.jsx";
import PreferredDiningLocation from "./pages/food-beverages/PreferredDiningLocation.jsx";
import AircraftUtilization from "./pages/airdata-visualization/AircraftUtilization.jsx";
import AirportTraffic from "./pages/airdata-visualization/AirportTraffic.jsx";
import DiningMethod from "./pages/food-beverages/DiningMethod.jsx";
import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";
import ForgetPassword from "./auth/ForgetPassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import Card from "./components/CardAnimation/HeroBannerInLanding.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/" element={<Rootlayout />}>
              <Route path="/hero" element={Card()}/>
              <Route index element={<LandingPage />} />
              <Route path="about-us" element={<About />} />
              <Route path="help&support" element={<HelpAndSupport />} />
              <Route path="documentation" element={<Documentation />} />
              <Route path="dataset" element={<DataSet />} />
            </Route>

            {/* Sidebar Layout */}
            <Route path="/" element={<RootLayoutSideBar />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<ChangePassword />} />
              <Route path="air-data/aircraft" element={<Aircraft />} />
              <Route path="air-data/airport" element={<Airport />} />
              <Route path="air-data/boarding-pass" element={<BoardingPass />} />
              <Route path="air-data/booking" element={<Booking />} />
              <Route path="air-data/flight" element={<Flight />} />
              <Route path="air-data/passenger" element={<Passenger />} />
              <Route path="food-beverage/customer" element={<Customer />} />
              <Route
                path="food-beverage/timeBase"
                element={<TimeBasedFood />}
              />
              <Route path="food-beverage/fb" element={<Foodandbeverage />} />
              <Route
                path="food-beverage/restaurant"
                element={<RestaurantFactors />}
              />
              <Route
                path="/boarding-statistics"
                element={<BoardingStatistics />}
              />
              <Route
                path="/aircaft-fleet-analysis"
                element={<AircraftFleetAnalysis />}
              />
              <Route
                path="/airport-distribution-analysis"
                element={<AirportDistributionAnalysis />}
              />
              <Route
                path="/time-base-analysis"
                element={<TimeBaseAnalysis />}
              />
              <Route path="/cohort-analysis" element={<CohortAnalysisPage />} />
              <Route path="/route-popularity" element={<RoutePopularity />} />
              <Route path="/peak-travel-time" element={<PeakTravelTime />} />
              <Route
                path="/connection-analysis"
                element={<ConnectionAnalysis />}
              />
              <Route
                path="/aircraft-utilization"
                element={<AircraftUtilization />}
              />
              <Route path="/airport-traffic" element={<AirportTraffic />} />
              {/* food and beverages */}
              <Route
                path="/age-range-distribution"
                element={<AgeRangeDistribution />}
              />
              <Route
                path="/gender-distribution"
                element={<GenderDistribution />}
              />
              <Route
                path="/preferred-cuisine-frequency"
                element={<PreferredCuisineFrequency />}
              />
              <Route path="/eating-out-frequency" element={<EatingOut />} />
              <Route
                path="/average-spending-by-value-priorities"
                element={<AverageSpending />}
              />
              <Route
                path="/preferred-dining-location"
                element={<PreferredDiningLocation />}
              />
              <Route
                path="/preferred-promotion"
                element={<PreferredPromotion />}
              />
              <Route
                path="/international-food-preference"
                element={<InternationalFoodPreference />}
              />
              <Route path="/dinging-method" element={<DiningMethod />} />
              <Route
                path="/preferred-beverages-by-occupation"
                element={<PreferredBeverages />}
              />

              {/* type of chart */}
              <Route path="/chart-AreaChart" element={<AreaChart />} />
              <Route path="/chart-BarChart" element={<Bar />} />
              <Route path="/chart-BubbleChart" element={<BubbleChart />} />
              <Route path="/chart-ColumnChart" element={<ColumnChart />} />
              <Route path="/chart-DoughnutChart" element={<DoughnutChart />} />
              <Route path="/chart-GaugesChart" element={<GaugesChart />} />
              <Route path="/chart-HistogramChart" element={<Histogram />} />
              <Route path="/chart-LineChart" element={<Line />} />
              <Route path="/chart-PieChart" element={<PieChart />} />
              <Route path="/chart-RadarChart" element={<RadarChart />} />
              <Route path="/chart-ScatterPlot" element={<ScatterPlot />} />
              <Route
                path="/chart-StackedBarChart"
                element={<StackedBarChart />}
              />
            </Route>
          </Routes>
        </StrictMode>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
