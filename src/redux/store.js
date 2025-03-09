import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { airPortDistributionApi } from "./service/airPortDistributionSlice";
import { aircraftFleetAnalysis } from "./service/aircraftFleetAnalysis";
import { boardingStatistics } from "./service/boardingStatistics";
import { timeBaseAnalysis } from "./service/timeBaseAnalysis";
import { chohortAnalysis } from "./service/chohortAnalysis";
import { routePopularity } from "./service/routePopularity";

export const store = configureStore({
  reducer: {
    [airPortDistributionApi.reducerPath]: airPortDistributionApi.reducer,
    [aircraftFleetAnalysis.reducerPath]: aircraftFleetAnalysis.reducer,
    [boardingStatistics.reducerPath]: boardingStatistics.reducer,
    [timeBaseAnalysis.reducerPath]: timeBaseAnalysis.reducer,
    [chohortAnalysis.reducerPath]: chohortAnalysis.reducer,
    [routePopularity.reducerPath]: routePopularity.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(airPortDistributionApi.middleware)
      .concat(aircraftFleetAnalysis.middleware)
      .concat(boardingStatistics.middleware)
      .concat(timeBaseAnalysis.middleware)
      .concat(chohortAnalysis.middleware)
      .concat(routePopularity.middleware)
});

setupListeners(store.dispatch);
