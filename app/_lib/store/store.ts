// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers"; // Import your root reducer

// Create a makeStore function
const makeStore = () =>
  configureStore({
    reducer: rootReducer, // Your root reducer
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
  });

export const wrapper = createWrapper(makeStore);
