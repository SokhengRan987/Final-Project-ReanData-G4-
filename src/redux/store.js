import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { airPortDistributionApi } from "./service/airPortDistributionSlice";
import { aircraftFleetAnalysis } from "./service/aircraftFleetAnalysis";
import { boardingStatistics } from "./service/boardingStatistics";
import { timeBaseAnalysis } from "./service/timeBaseAnalysis";
import { chohortAnalysis } from "./service/chohortAnalysis";
import { routePopularity } from "./service/routePopularity";
import { peakTravelTime } from "./service/peakTravelTime";
import { connectionAnalysis } from "./service/connectionAnalysis";

import { ageRangeDistribution } from "./service/food-beverages/ageRangeDistribution";
import { genderDistribution } from "./service/food-beverages/genderDistribution";
import { preferredCuisineFrequency } from "./service/food-beverages/preferredCuisineFrequency";
import { eatingOut } from "./service/food-beverages/eatingOut";
import { averageSpending } from "./service/food-beverages/averageSpending";

export const store = configureStore({
  reducer: {
    [airPortDistributionApi.reducerPath]: airPortDistributionApi.reducer,
    [aircraftFleetAnalysis.reducerPath]: aircraftFleetAnalysis.reducer,
    [boardingStatistics.reducerPath]: boardingStatistics.reducer,
    [timeBaseAnalysis.reducerPath]: timeBaseAnalysis.reducer,
    [chohortAnalysis.reducerPath]: chohortAnalysis.reducer,
    [routePopularity.reducerPath]: routePopularity.reducer,
    [peakTravelTime.reducerPath]: peakTravelTime.reducer,
    [connectionAnalysis.reducerPath]: connectionAnalysis.reducer,
    [ageRangeDistribution.reducerPath]: ageRangeDistribution.reducer,
    [genderDistribution.reducerPath]: genderDistribution.reducer,
    [preferredCuisineFrequency.reducerPath]: preferredCuisineFrequency.reducer,
    [eatingOut.reducerPath]: eatingOut.reducer,
    [averageSpending.reducerPath]: averageSpending.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(airPortDistributionApi.middleware)
      .concat(aircraftFleetAnalysis.middleware)
      .concat(boardingStatistics.middleware)
      .concat(timeBaseAnalysis.middleware)
      .concat(chohortAnalysis.middleware)
      .concat(routePopularity.middleware)
      .concat(peakTravelTime.middleware)
      .concat(connectionAnalysis.middleware)
      .concat(ageRangeDistribution.middleware)
      .concat(genderDistribution.middleware)
      .concat(preferredCuisineFrequency.middleware)
      .concat(eatingOut.middleware)
      .concat(averageSpending.middleware)
});

setupListeners(store.dispatch);
