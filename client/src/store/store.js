import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice.js";
import userReducer from "../slices/userSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
