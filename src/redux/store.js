import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authApi from "./services/authSlice";
import { authTestApi } from "./services/authTestSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authTestApi.reducerPath]: authTestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(authTestApi.middleware)
});

setupListeners(store.dispatch);

export default store;
