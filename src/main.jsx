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
// import RootLayoutSideBar from "./components/Sidebar.jsx"; // Ensure correct export/import
import AirportStatisticsBarChart from "./components/airdata/boardingPass/AirportStatisticsBarChart.jsx";
import RootLayoutSideBar from "./components/RootLayoutSideBar.jsx";
import BoardingStatistics from "./pages/airdata-visualization/BoardingStatistics.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          {/* Main Layout */}
          <Route element={<Rootlayout />}>
            <Route path="/" element={<App />} />
            <Route path="/testing" element={<Testing />} />
            <Route
              path="/distribution"
              element={<DistributionPerContinent />}
            />
          </Route> 

          {/* Sidebar Layout */}
          <Route element={<RootLayoutSideBar />}>
            <Route
              path="/boarding-statistics"
              element={<BoardingStatistics />}
            />
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
