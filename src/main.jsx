import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Corrected import for React Router
import { Routes, Route } from "react-router-dom"; // Corrected import for React Router
import { Provider } from "react-redux"; // Missing import for Redux Provider
import "./index.css";
import App from "./App.jsx";
import Testing from "./pages/Testing.jsx";
import Rootlayout from "./components/Rootlayout.jsx";
import { store } from "./redux/store.js";
import DistributionPerContinent from "./pages/DistributionPerContinent.jsx";
import HelpAndSupport from "./pages/HelpAndSupport.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route element={<Rootlayout />}>
            <Route path="/" element={<App />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/help&support" element={<HelpAndSupport />}/>
            <Route
              path="/distribution"
              element={<DistributionPerContinent />}
            />
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
