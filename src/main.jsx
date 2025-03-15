import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import Testing from "./pages/Testing.jsx";
import Rootlayout from "./components/Rootlayout.jsx";
import { store } from "./redux/store.js";


import DistributionPerContinent from "./pages/DistributionPerContinent.jsx";
import RootLayoutSideBar from "./components/RootLayoutSideBar.jsx";
import BoardingStatistics from "./pages/airdata-visualization/BoardingStatistics.jsx";
import AircraftFleetAnalysis from "./pages/airdata-visualization/AircraftFleetAnalysis.jsx";
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

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          {/* Main Layout */}
          <Route element={<Rootlayout />}>
            <Route path="/" element={<App />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/distribution" element={<DistributionPerContinent />}/>
          </Route>

          {/* Sidebar Layout */}
          <Route element={<RootLayoutSideBar />}>
            <Route path="/boarding-statistics" element={<BoardingStatistics />}/>
            <Route path="/aircaft-fleet-analysis" element={<AircraftFleetAnalysis />}/>
            <Route path="/airport-distribution-analysis" element={< AirportDistributionAnalysis/>}/>
            <Route path="/time-base-analysis" element={<TimeBaseAnalysis/>}/>
            <Route path="/cohort-analysis" element={<CohortAnalysisPage/>}/>
            <Route path="/route-popularity" element={< RoutePopularity/>}/>
            <Route path="/peak-travel-time" element={<PeakTravelTime/>}/>
            <Route path="/connection-analysis" element={<ConnectionAnalysis/>}/>
            {/* food and beverages */}
            <Route path="/age-range-distribution" element={<AgeRangeDistribution/>}/>
            <Route path="/gender-distribution" element={<GenderDistribution/>}/>
            <Route path="/preferred-cuisine-frequency" element={<PreferredCuisineFrequency/>}/>
            <Route path="/eating-out-frequency" element={<EatingOut/>}/>
            <Route path="/average-spending-by-value-priorities" element={<AverageSpending/>}/>
            <Route path="/preferred-promotion" element={<PreferredPromotion/>}/>
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
