import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { airPortDistributionApi } from "./service/airPortDistributionSlice";
import { aircraftFleetAnalysis } from "./service/aircraftFleetAnalysis";
import { boardingStatistics } from "./service/boardingStatistics";
import { timeBaseAnalysis } from "./service/timeBaseAnalysis";
import { chohortAnalysis } from "./service/chohortAnalysis";
import { routePopularity } from "./service/routePopularity";
import { airportApi } from "./services/AirportSlice";
import { bookingApi } from "./services/BookingSlice";
import { passengerApi } from "./services/PassengerSlice";
import { flightApi } from "./services/Flight";
import { aircraftApi } from "./services/Aircraft";
import { boardingpassApi } from "./services/BoardingPass";
import { fbApi } from "./services/FoodBeverage";
export const store = configureStore({
  reducer: {
    [airPortDistributionApi.reducerPath]: airPortDistributionApi.reducer,
    [aircraftFleetAnalysis.reducerPath]: aircraftFleetAnalysis.reducer,
    [boardingStatistics.reducerPath]: boardingStatistics.reducer,
    [timeBaseAnalysis.reducerPath]: timeBaseAnalysis.reducer,
    [chohortAnalysis.reducerPath]: chohortAnalysis.reducer,
    [routePopularity.reducerPath]: routePopularity.reducer,
    [airportApi.reducerPath]: airportApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [passengerApi.reducerPath]: passengerApi.reducer,
    [flightApi.reducerPath]: flightApi.reducer,
    [aircraftApi.reducerPath]: aircraftApi.reducer,
    [boardingpassApi.reducerPath]: boardingpassApi.reducer,
    [fbApi.reducerPath]: fbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(airPortDistributionApi.middleware)
      .concat(aircraftFleetAnalysis.middleware)
      .concat(boardingStatistics.middleware)
      .concat(timeBaseAnalysis.middleware)
      .concat(chohortAnalysis.middleware)
      .concat(routePopularity.middleware)
      .concat(airportApi.middleware)
      .concat(bookingApi.middleware)
      .concat(passengerApi.middleware)
      .concat(flightApi.middleware)
      .concat(aircraftApi.middleware)
      .concat(boardingpassApi.middleware)
      .concat(fbApi.middleware),
});

setupListeners(store.dispatch);
