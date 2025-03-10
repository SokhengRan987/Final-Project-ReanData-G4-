import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { airportApi } from "./services/AirportSlice";
import { bookingApi } from "./services/BookingSlice";
import { passengerApi } from "./services/PassengerSlice";
import { flightApi } from "./services/Flight";
import { aircraftApi } from "./services/Aircraft";
import { boardingpassApi } from "./services/BoardingPass";
import { fbApi } from "./services/FoodBeverage";

export const store = configureStore({
  reducer: {
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
      .concat(airportApi.middleware)
      .concat(bookingApi.middleware)
      .concat(passengerApi.middleware)
      .concat(flightApi.middleware)
      .concat(aircraftApi.middleware)
      .concat(boardingpassApi.middleware)
      .concat(fbApi.middleware),
});

setupListeners(store.dispatch);
