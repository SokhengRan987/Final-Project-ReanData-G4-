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
import { peakTravelTime } from "./service/peakTravelTime";
import { connectionAnalysis } from "./service/connectionAnalysis";

import { ageRangeDistribution } from "./service/food-beverages/ageRangeDistribution";
import { genderDistribution } from "./service/food-beverages/genderDistribution";
import { preferredCuisineFrequency } from "./service/food-beverages/preferredCuisineFrequency";
import { eatingOut } from "./service/food-beverages/eatingOut";
import { averageSpending } from "./service/food-beverages/averageSpending";
import { internationalFoodPreference } from "./service/food-beverages/internationFoodPreference";
import { preferredPromotion } from "./service/food-beverages/preferredPromotion";
import { preferredBeverages } from "./service/food-beverages/preferredBeverages";
import { preferredDiningLocation } from "./service/food-beverages/preferredDiningLocation";
import { aircraftUtilization } from "./service/aircraftUtilization";
import { airportTraffic } from "./service/airportTraffic";
import { diningMethod } from "./service/food-beverages/diningMethod";

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
    [peakTravelTime.reducerPath]: peakTravelTime.reducer,
    [connectionAnalysis.reducerPath]: connectionAnalysis.reducer,
    [ageRangeDistribution.reducerPath]: ageRangeDistribution.reducer,
    [genderDistribution.reducerPath]: genderDistribution.reducer,
    [preferredCuisineFrequency.reducerPath]: preferredCuisineFrequency.reducer,
    [eatingOut.reducerPath]: eatingOut.reducer,
    [averageSpending.reducerPath]: averageSpending.reducer,
    [internationalFoodPreference.reducerPath]: internationalFoodPreference.reducer,
    [preferredPromotion.reducerPath]: preferredPromotion.reducer,
    [preferredBeverages.reducerPath]: preferredBeverages.reducer,
    [preferredDiningLocation.reducerPath]: preferredDiningLocation.reducer,
    [aircraftUtilization.reducerPath]: aircraftUtilization.reducer,
    [airportTraffic.reducerPath]: airportTraffic.reducer,
    [diningMethod.reducerPath]: diningMethod.reducer,
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
      .concat(fbApi.middleware)
      .concat(peakTravelTime.middleware)
      .concat(connectionAnalysis.middleware)
      .concat(ageRangeDistribution.middleware)
      .concat(genderDistribution.middleware)
      .concat(preferredCuisineFrequency.middleware)
      .concat(eatingOut.middleware)
      .concat(averageSpending.middleware)
      .concat(internationalFoodPreference.middleware)
      .concat(preferredPromotion.middleware)
      .concat(preferredBeverages.middleware)
      .concat(preferredDiningLocation.middleware)
      .concat(aircraftUtilization.middleware)
      .concat(airportTraffic.middleware)
      .concat(diningMethod.middleware)
});

setupListeners(store.dispatch);
