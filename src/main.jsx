import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx"
import About from "./pages/About.jsx";
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
import Profile from "./pages/Profile.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route element={<RootLayoutSlidBar />}>
          <Route path="/profile" element={<Profile/>} />
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
          <Route path="/about-us" element={<About />} />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
